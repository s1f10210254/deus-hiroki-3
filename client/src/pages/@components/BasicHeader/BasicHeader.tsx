import type { UserModel } from '$/api/@types/models';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useState } from 'react';
import { Modal, ModalBody } from 'src/components/Modal/Modal';
import { APP_TITLE } from 'src/utils/constants';
import { supabase } from 'src/utils/supabase';
import styles from './BasicHeader.module.css';

export const BasicHeader = (props: { user: UserModel | null }) => {
  const [opened, setOpened] = useState(false);
  const onLogout = async () => {
    setOpened(false);
    if (confirm('Logout?')) await supabase.auth.signOut();
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.title}>{APP_TITLE}</div>
        {props.user === null ? (
          <div onClick={() => setOpened(true)}>
            <div className={styles.loginBtn}>
              <span>Login with Email</span>
            </div>
          </div>
        ) : (
          <div className={styles.userBtn} onClick={onLogout}>
            <span className={styles.userName}>{props.user.name}</span>
          </div>
        )}
      </div>
      <Modal open={props.user === null && opened} onClose={() => setOpened(false)}>
        <ModalBody>
          <Auth
            supabaseClient={supabase}
            providers={[]}
            appearance={{ theme: ThemeSupa }}
            redirectTo={location.origin}
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
