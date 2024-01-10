import type { PropsWithChildren } from 'react';
import React from 'react';
import { Portal } from '../Portal';
import styles from './Modal.module.css';

export const ModalHeader = (props: { text: string }) => {
  return <div className={styles.header}>{props.text}</div>;
};

export const ModalBody = (props: { children: React.ReactNode }) => {
  return <div className={styles.body}>{props.children}</div>;
};

export const Modal = (props: PropsWithChildren<{ open: boolean; onClose?: () => void }>) => {
  return (
    <Portal>
      {props.open && (
        <div className={styles.container}>
          <div className={styles.background} onClick={props.onClose} />
          <div className={styles.card}>{props.children}</div>
        </div>
      )}
    </Portal>
  );
};
