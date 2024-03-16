import { Module, forwardRef } from '@nestjs/common';
import { DiseaseController } from './controllers/disease.controller';
import { DiseaseService } from './Service/disease.service';
import { MeasureController } from './controllers/measure.controller';
import { DiseaseRepository } from './repository/disease.repository';
import { MeasureService } from './Service/measure.service';
import { MeasureRepository } from './repository/measure.repository';
import { ScheduleController } from './controllers/schedule.controller';


import { AuthModule } from '../auth/auth.module';
import { MeasureScheduleRepository } from './repository/measure-schedule.repository';
import { UserRepository } from '../users/repository/users.repository';
import { UsersService } from '../users/services/users.service';
import { ScheduleService } from './Service/schedule.service';
import { ScheduleRepository } from './repository/schedule.repository';
import { MeasureScheduleService } from './Service/measure-schedule.service';
import { DiseaseUserScheduleRepository } from './repository/disease-user-schedule.repository';
import { DiseaseUserScheduleService } from './Service/disease-user-schedule.service';
import { MeasureHistoryRepository } from './repository/measure-history.repository';
import { UsersModule } from '../users/users.module';


@Module({


  imports: [
    AuthModule,
    forwardRef(() =>   UsersModule)
   

  ],

  providers: [DiseaseService,MeasureHistoryRepository,DiseaseUserScheduleRepository,DiseaseUserScheduleService, MeasureScheduleRepository, MeasureScheduleService, UserRepository, ScheduleService, ScheduleRepository, UsersService, DiseaseRepository, MeasureService, MeasureRepository, MeasureScheduleRepository],
  exports : [MeasureScheduleRepository,MeasureRepository,MeasureHistoryRepository,MeasureRepository, MeasureService],
  controllers: [DiseaseController, MeasureController, ScheduleController],
})
export class DiseaseManagementModule {


}
