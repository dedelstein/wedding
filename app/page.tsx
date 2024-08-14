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
            layout="responsive"
            alt="Wedding Landing Image"
            width={1509}
            height={2523}
            priority
          />
          <Link href="/rsvp" className={styles.rsvpButton} aria-label='RSVP' />
        </div>
        <Link href="/directions" className={styles.directionsButton} aria-label='Directions' />
        <Link href="/schedule" className={styles.scheduleButton} aria-label='Schedule' />
        <Link href="/stay" className={styles.stayButton} aria-label='Accommodations' />
      </div>
    </main>
  );
}