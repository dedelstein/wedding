'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/supabase-js';
import RSVPForm from './rsvp_form';
import styles from './RSVPstyle.module.css';

type RSVPClientProps = {
  initialSession: Session | null;
};

export default function RSVPClient({ initialSession }: RSVPClientProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!initialSession);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const authenticateAnonymously = async () => {
      if (!isAuthenticated) {
        try {
          const { error } = await supabase.auth.signInAnonymously();
          if (error) throw error;
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Anonymous authentication failed:', error);
        }
      }
    };

    authenticateAnonymously();
  }, [isAuthenticated, supabase.auth]);

  return (
    <main className={styles.container}>
      {isAuthenticated ? (
        <RSVPForm />
      ) : (
        <p>Preparing your RSVP form...</p>
      )}
    </main>
  );
}