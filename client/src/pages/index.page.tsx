import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';
import styles from './index.module.css';

const Home = () => {
  const [userId, setUserId] = useState<string>('');
  const [opponentId, setOpponentId] = useState<string>('');
  const [userHand, setUserHand] = useState<'ROCK' | 'PAPER' | 'SCISSORS'>('ROCK');
  const [matchId, setMatchId] = useState<string | null>(null);

  const startMatch = async () => {
    if (!userId || !opponentId) return;

    const match = await apiClient.api.private.matches.$post({
      body: {
        playerOneId: userId,
        playerTwoId: opponentId,
        playerOneChoice: userHand
      }
    });

    setMatchId(match.id);
  };

  const playAgain = () => {
    setMatchId(null);
  };

  return (
    <div className={styles.container}>
      <h1>じゃんけんアプリ</h1>
      <div>
        <label>
          Your ID:
          <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Opponent ID:
          <input type="text" value={opponentId} onChange={(e) => setOpponentId(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Your Hand:
          <select value={userHand} onChange={(e) => setUserHand(e.target.value as 'ROCK' | 'PAPER' | 'SCISSORS')}>
            <option value="ROCK">Rock</option>
            <option value="PAPER">Paper</option>
            <option value="SCISSORS">Scissors</option>
          </select>
        </label>
      </div>
      <button onClick={startMatch}>Start Match</button>
      {matchId && (
        <div>
          <p>Match ID: {matchId}</p>
          <button onClick={playAgain}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default Home;
