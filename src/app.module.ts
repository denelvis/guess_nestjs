import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

import AppDataSource from '../data-source';
import { GameModule } from './game/game.module';

@Module({
  imports: [
    GameModule,
    TypeOrmModule.forRootAsync({
      useFactory() {
        return AppDataSource.options as TypeOrmModuleOptions;
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }

        return addTransactionalDataSource(new DataSource(options));
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
