import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './reservation/reservation/reservation.module';
import { AdminModule } from './admin/admin/admin.module';

@Module({
  imports: [
    JwtModule.register({
      secret : 'SecretKey',
      signOptions : {expiresIn : '4h'},
      global : true
    }),ConfigModule.forRoot({
      isGlobal: true, // Sprawia, że ConfigModule jest dostępny globalnie
    }),
    
    // 2. Konfiguracja połączenia TypeORM z użyciem zmiennych środowiskowych
    TypeOrmModule.forRoot({
      type: 'postgres', // Określenie typu bazy danych
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      
      // Lokalizacja Encji i Migracji
      // Wskazuje, gdzie TypeORM ma szukać klas encji (tabel)
      // Użyj 'dist/**/*.entity{.ts,.js}' w środowisku produkcyjnym
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      
      // Synchronizacja schematu bazy danych z Encjami (TYLKO na Dev/Test)
      // Na produkcji ustaw na 'false' i używaj Migracji!
      synchronize: true, 
      
      // Wyświetlanie zapytań SQL w konsoli
      logging: true,
    }),AuthModule, ReservationModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
