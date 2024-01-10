import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

export default defineController(() => ({
  get: async ({ params }) => {
    const { userId } = params;
    const user = await prismaClient.user.findUnique({ where: { id: userId } });
    if (!user) {
      return { status: 404, body: 'User not found' };
    }

    const gamesPlayed = await prismaClient.match.count({
      where: {
        OR: [{ playerOneId: userId }, { playerTwoId: userId }],
      },
    });
    const gamesWon = await prismaClient.match.count({
      where: {
        OR: [
          { playerOneId: userId, result: 'PLAYER_ONE_WON' },
          { playerTwoId: userId, result: 'PLAYER_TWO_WON' },
        ],
      },
    });
    const gamesLost = await prismaClient.match.count({
      where: {
        OR: [
          { playerOneId: userId, result: 'PLAYER_TWO_WON' },
          { playerTwoId: userId, result: 'PLAYER_ONE_WON' },
        ],
      },
    });
    const gamesTied = await prismaClient.match.count({
      where: {
        OR: [
          { playerOneId: userId, result: 'TIE' },
          { playerTwoId: userId, result: 'TIE' },
        ],
      },
    });

    const userProfile = {
      id: user.id,
      email: user.email,
      name: user.name,
      gamesPlayed,
      gamesWon,
      gamesLost,
      gamesTied,
    };

    return { status: 200, body: userProfile };
  },
}));
