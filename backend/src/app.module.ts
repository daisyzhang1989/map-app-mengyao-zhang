import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotsModule } from './spots/spots.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mapapp',
      autoLoadEntities: true,
      synchronize: true,
    }),
    SpotsModule,
  ],
})
export class AppModule {}