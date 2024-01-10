import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { userAtom } from 'src/atoms/user';
import { apiClient } from 'src/utils/apiClient';
import { returnNull } from 'src/utils/returnNull';
import { supabase } from 'src/utils/supabase';

export const AuthLoader = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (session === null && user?.id !== null) {
        await apiClient.session.$delete().catch(returnNull);
        setUser(null);
      } else if (session !== null && user?.id !== session.user.id) {
        await apiClient.session.$post({ body: { jwt: session?.access_token } }).catch(returnNull);
        await apiClient.private.me.$post().catch(returnNull).then(setUser);
      }
    });

    return subscription.unsubscribe;
  }, [user?.id, setUser]);

  return <></>;
};
