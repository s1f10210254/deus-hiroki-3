import type { User as UserModel } from '$/api/@types';

export type JwtUser = { sub: string; email: string; role: 'authenticated' | 'anon' };

export const userModel = {
  create: (jwtUser: JwtUser): UserModel => {
    return {
      id: jwtUser.sub,
      email: jwtUser.email,
      name: jwtUser.sub.split('-')[0],
      gamesPlayed: 0,
      gamesWon: 0,
      gamesLost: 0,
      gamesTied: 0,
    };
  },
};
