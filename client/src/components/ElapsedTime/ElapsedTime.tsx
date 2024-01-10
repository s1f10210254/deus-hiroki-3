import { useEffect, useState } from 'react';
import styles from './ElapsedTime.module.css';

export const ElapsedTime = (props: { createdTime: number }) => {
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    const now = Date.now();
    const secondsPast = (now - props.createdTime) / 1000;

    let result;
    if (secondsPast < 60) {
      result = `${Math.round(secondsPast)}s`;
    } else if (secondsPast < 3600) {
      result = `${Math.round(secondsPast / 60)}m`;
    } else if (secondsPast <= 86400) {
      result = `${Math.round(secondsPast / 3600)}h`;
    } else {
      const date = new Date(props.createdTime);
      const day = date.getDate();
      const month = date.toLocaleString('en-US', { month: 'short' });
      const year = date.getFullYear() === new Date().getFullYear() ? '' : ` ${date.getFullYear()}`;
      result = `${month} ${day}${year}`;
    }

    setDisplayDate(result);
  }, [props.createdTime]);

  return <span className={styles.date}>{displayDate}</span>;
};
