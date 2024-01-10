import type { JwtUser } from '$/domain/model/userModel';
import { userRepo } from '$/domain/repository/userRepo';
import type { JWT_PROP_NAME } from '$/service/constants';
import { prismaClient } from '$/service/prismaClient';
import assert from 'assert';
import type { UserModel } from '../@types/models';
import { defineHooks } from './$relay';

export type AdditionalRequest = {
  [Key in typeof JWT_PROP_NAME]: JwtUser;
} & { user: UserModel };

export default defineHooks(() => ({
  onRequest: async (req, res) => {
    try {
      await req.jwtVerify({ onlyCookie: true });
    } catch (e) {
      res.status(401).send();
      return;
    }
  },
  preHandler: async (req, res) => {
    assert(req.jwtUser);

    const user = await userRepo.findById(prismaClient, req.jwtUser.sub);

    if (user === null) {
      res.status(401).send();
      return;
    }

    req.user = user;
  },
}));
