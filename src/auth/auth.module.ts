import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({secret: process.env.JWT_SECRET, signOptions:{expiresIn: '30d'}})],
  controllers: [AuthController],
  providers:[GoogleStrategy, AuthService, PrismaService, UsersService]
})
export class AuthModule {}
