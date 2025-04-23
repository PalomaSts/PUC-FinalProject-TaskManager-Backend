import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { GoogleStrategy } from './google.strategy';
import { AuthController } from './auth.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [GoogleStrategy, PrismaService],
})
export class AuthModule {}
