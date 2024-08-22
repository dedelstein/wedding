'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import RSVPForm from './rsvp_form';
import styles from './RSVPstyle.module.css';

export default function RSVPClient() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const authenticateAnonymously = async () => {
      try {
        const { error } = await supabase.auth.signInAnonymously();
        if (error) throw error;
      } catch (error) {
        console.error('Anonymous authentication failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    authenticateAnonymously();
  }, [supabase.auth]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.container}>
      <RSVPForm />
    </main>
  );
}