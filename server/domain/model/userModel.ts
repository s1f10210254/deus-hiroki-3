import type { UserModel } from '$/api/@types/models';

export type JwtUser = { sub: string; email: string; role: 'authenticated' | 'anon' };

export const userModel = {
  create: (jwtUser: JwtUser): UserModel => {
    return {
      id: jwtUser.sub,
      email: jwtUser.email,
      name: jwtUser.sub.split('-')[0],
      createdTime: Date.now(),
    };
  },
};
