import type { User as UserModel } from '$/api/@types';
import type { Prisma, User } from '@prisma/client';

const toModel = (prismaUser: User): UserModel => ({
  id: prismaUser.id,
  email: prismaUser.email,
  name: prismaUser.name,
  gamesPlayed: prismaUser.gamesPlayed,
  gamesWon: prismaUser.gamesWon,
  gamesLost: prismaUser.gamesLost,
  gamesTied: prismaUser.gamesTied,
});

export const userRepo = {
  save: async (tx: Prisma.TransactionClient, user: UserModel) => {
    return tx.user.upsert({
      where: { id: user.id },
      update: { email: user.email, name: user.name },
      create: {
        id: user.id,
        email: user.email,
        name: user.name,
        gamesPlayed: user.gamesPlayed,
        gamesWon: user.gamesWon,
        gamesLost: user.gamesLost,
        gamesTied: user.gamesTied,
        createdAt: new Date(),
      },
    });
  },
  findById: (tx: Prisma.TransactionClient, userId: string): Promise<UserModel | null> =>
    tx.user
      .findUnique({ where: { id: userId } })
      .then((user) => (user !== null ? toModel(user) : null)),
};
