import type { MatchCreateRequest, MatchResult, MatchUpdateRequest, HandChoice } from '$/api/@types';
import { prismaClient } from '$/service/prismaClient';
import { defineController } from './$relay';

const determineResult = (playerOneChoice: HandChoice, playerTwoChoice: HandChoice): MatchResult => {
  const winningCombinations: { [key in HandChoice]: HandChoice } = {
    ROCK: 'SCISSORS',
    PAPER: 'ROCK',
    SCISSORS: 'PAPER',
  };

  if (playerOneChoice === playerTwoChoice) return 'TIE';
  if (winningCombinations[playerOneChoice] === playerTwoChoice) return 'PLAYER_ONE_WON';
  return 'PLAYER_TWO_WON';
};

export default defineController(() => ({
  post: async ({ body }) => {
    const match: MatchCreateRequest = body;
    const result: MatchResult = 'PENDING';

    const createdMatch = await prismaClient.match.create({
      data: {
        playerOneId: match.playerOneId,
        playerTwoId: match.playerTwoId,
        playerOneChoice: match.playerOneChoice,
        playerTwoChoice: null,
        result,
      },
    });

    return { status: 201, body: createdMatch };
  },
  put: async ({ params, body }) => {
    const { matchId } = params;
    const matchUpdate: MatchUpdateRequest = body;

    const existingMatch = await prismaClient.match.findUnique({ where: { id: matchId } });
    if (!existingMatch || existingMatch.result !== 'PENDING') {
      return { status: 400, body: 'Match not found or already concluded' };
    }

    const result = determineResult(
      existingMatch.playerOneChoice as HandChoice,
      matchUpdate.playerTwoChoice
    );

    const updatedMatch = await prismaClient.match.update({
      where: { id: matchId },
      data: { playerTwoChoice: matchUpdate.playerTwoChoice, result },
    });

    return { status: 200, body: updatedMatch };
  },
}));
