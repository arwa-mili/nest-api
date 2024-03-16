import {  Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import  { dataSourceOptions } from './data-source';
import { ConfigModule } from '@nestjs/config';

@Module({


    imports: [
        TypeOrmModule.forRoot(
            dataSourceOptions
        ),],


        providers: [ ],
      exports: [],

      controllers: [],


})
export class TypeOrmDatabaseModule { }