import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails } = profile;

    const email = emails[0].value;
    const fullName = name.givenName + ' ' + name.familyName;

    // Verifica se o usuário já existe no banco
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    // Se não existir, cria um novo usuário com senha aleatória
    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);

      user = await this.prisma.user.create({
        data: {
          email,
          name: fullName,
          password: randomPassword,
        },
      });
    }

    done(null, user);
  }
}
