import type { UserModel } from '$/api/@types/models';
import type { JwtUser } from '$/domain/model/userModel';
import { userModel } from '$/domain/model/userModel';
import { userRepo } from '$/domain/repository/userRepo';
import { transaction } from '$/service/prismaClient';

export const userUseCase = {
  findOrCreate: (jwtUser: JwtUser) =>
    transaction<UserModel>('RepeatableRead', async (tx) => {
      const user = await userRepo.findById(tx, jwtUser.sub);
      if (user !== null) return user;

      const newUser = userModel.create(jwtUser);
      await userRepo.save(tx, newUser);

      return newUser;
    }),
};
