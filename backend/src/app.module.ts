import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpotsModule } from './spots/spots.module';
import { ConfigModule } from '@nestjs/config';
import { GeocodeModule } from './geocode/geocode.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    GeocodeModule,
  ],
})
export class AppModule {}