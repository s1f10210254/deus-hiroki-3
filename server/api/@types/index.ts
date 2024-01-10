/* eslint-disable */
export type User = {
  id: string;
  email: string;
  name?: string | null | undefined;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  gamesTied: number;
};

export type Match = {
  id: string;
  createdAt: string;
  playerOneId: string;
  playerTwoId: string;
  playerOneChoice: HandChoice;
  playerTwoChoice: HandChoice;
  result: MatchResult;
};

export type MatchCreateRequest = {
  playerOneId: string;
  playerTwoId: string;
  playerOneChoice: HandChoice;
};

export type MatchUpdateRequest = {
  playerTwoChoice: HandChoice;
};

export type HandChoice = 'ROCK' | 'PAPER' | 'SCISSORS';

export type MatchResult = 'PLAYER_ONE_WON' | 'PLAYER_TWO_WON' | 'TIE' | 'PENDING';
