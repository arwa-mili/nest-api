import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './Controllers/auth.controller';
import { AuthService } from './services/auth.service';


import { EmailVerificationService } from './services/email-verification.service';
import { UserOTPVerificationRepository } from './repos/user-code-verification.repository';
import { UsersModule } from '../users/users.module';
import { User } from '../users/entities/user.entity';
import { UserRepository } from '../users/repository/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessTokenStrategy } from './strategies/jwt.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { AccessTokenGuard } from './guards/access-token.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { EmailSendingService } from 'src/shared/modules/email-sender-module/service/email-sending.service';
import { ConfigModule } from '@nestjs/config';
import { constants } from 'src/common/constants/constants';
import { UserCodeVerification } from './entities/user-code-verification.entity';


@Module({
  imports: [

    ConfigModule,


    JwtModule.register({
      //secret: envConfig.get(constants.JWT)
      

    }),
    forwardRef(() => UsersModule),

    TypeOrmModule.forFeature([User, UserCodeVerification])



  ],
  controllers: [AuthController],
  providers: [AuthService, EmailSendingService, AccessTokenStrategy, RefreshTokenStrategy, EmailVerificationService, AccessTokenGuard, RefreshTokenGuard, UserOTPVerificationRepository,
    UserRepository],
  exports: [AccessTokenStrategy, RefreshTokenStrategy, AccessTokenGuard, RefreshTokenGuard, AuthService, EmailVerificationService]
})
export class AuthModule { }
