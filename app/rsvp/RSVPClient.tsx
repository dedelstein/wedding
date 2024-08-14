'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import RSVPForm from './rsvp_form';
import styles from './RSVPstyle.module.css';

export default function RSVPClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      } else {
        await authenticateAnonymously();
      }
      setIsLoading(false);
    };

    const authenticateAnonymously = async () => {
      try {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Anonymous authentication failed:', error);
      }
    };

    checkSession();
  }, [supabase.auth]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>RSVP</h1>
      {isAuthenticated ? (
        <RSVPForm />
      ) : (
        <p>Preparing your RSVP form...</p>
      )}
    </main>
  );
}