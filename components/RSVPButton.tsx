'use client';

import { useState } from 'react';
import { login } from '@/components/actions'
import styles from '@/app/Index.module.css'

interface RSVPButtonProps {
  className?: string;
}

export default function RSVPButton({ className }: RSVPButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRSVP = async () => {
    setIsLoading(true);
    await login();
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleRSVP}
      disabled={isLoading}
      className={className}
      aria-label='RSVP'
    >
      {isLoading && (
        <div className={styles.loadingSpinner}>
          <div className={styles.spinnerIcon}></div>
        </div>
      )}
    </button>
  );
}