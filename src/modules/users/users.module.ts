import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserRepository } from './repository/users.repository';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { USERTOKEN } from './interfaces/IUser-repository.interface';
import { fileuploadingService } from 'src/shared/modules/file-upload-module/service/file-uploading.service';
import { DiseaseManagementModule } from '../disease-management/disease-management.module';
import { MeasureService } from '../disease-management/Service/measure.service';
import { MeasureHistoryRepository } from '../disease-management/repository/measure-history.repository';
import { MeasureRepository } from '../disease-management/repository/measure.repository';
import { MemoryStoredFile, NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
     NestjsFormDataModule.config({ storage: MemoryStoredFile }),
    forwardRef(() =>   DiseaseManagementModule),
    forwardRef(() => AuthModule),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string | number>('JWT_EXPIRES'),
        },
      }),
    }),

  ],
  providers: [UsersService,fileuploadingService,UserRepository,/*{provide : USERTOKEN }*/],
  exports: [UsersService],

  controllers: [UsersController],
})
export class UsersModule { }
