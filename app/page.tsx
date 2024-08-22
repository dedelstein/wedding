import Image from 'next/image';
import Link from 'next/link';
import wedding_landing from '@/public/wedding_landing_sm.jpg';
import styles from './Index.module.css';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.imageContainer}>
          <Image
            src={wedding_landing}
            alt="Wedding Landing Image"
            layout="fill"
            objectFit="contain"
            priority
          />
          <div className={styles.buttonContainer}>
            <Link href="/rsvp" className={styles.rsvpButton} aria-label='RSVP' />
            <Link href="/directions" className={styles.directionsButton} aria-label='Directions' />
            <Link href="/schedule" className={styles.scheduleButton} aria-label='Schedule' />
            <Link href="/stay" className={styles.stayButton} aria-label='Accommodations' />
          </div>
        </div>
      </div>
    </main>
  );
}