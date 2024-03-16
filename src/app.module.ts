import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
//import { DiseaseManagementModule } from './modules/disease-management/disease-management.module';
import { LoggingMiddleware } from './shared/middlewares/logging.middleware';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { dataSourceOptions } from './configs/Typeorm/data-source';
import { TypeOrmDatabaseModule } from './configs/Typeorm/TypeormDatabase.module';
import { DiseaseManagementModule } from './modules/disease-management/disease-management.module';

@Module({
  imports: [TypeOrmDatabaseModule,  UsersModule, AuthModule, ConfigModule.forRoot({
    
    isGlobal: true,
  }), ConfigModule.forRoot({isGlobal:true}), DiseaseManagementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*')
  }
}
