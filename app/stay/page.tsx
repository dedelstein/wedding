'use client';

import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

import styles from './Stay.module.css'
import { Manrope } from 'next/font/google'
import CustomPopup from '@/components/custom_popup'

const manrope = Manrope({ subsets: ['latin'] })


export default function Stay() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleYurts = () => {
    const getNumber = localStorage.getItem('guestId');
    if (getNumber === null) {
      setIsPopupOpen(true);
    } else {
      router.push('/yurts');
    }
  };

  const handlePopupConfirm = () => {
    setIsPopupOpen(false);
    router.push('/rsvp');
  };

  const handleModifyBooking = () => {
    router.push('/modify');
  };

  return (
    <div className={manrope.className}>
      <div className={styles.container}>
        <h1 className={styles.title}>Accommodations</h1>

        <p className={styles.paragraph}>
          We have a few options for you to stay on or nearby the venue:
        </p>

        <h2 className={styles.subtitle}>Yurts</h2>
        <p className={styles.paragraph}>
          There's a bunch of Yurts available on the property. Each yurt is a large, circular room with 10 beds. Bedding is provided, but privacy is...limited.
          You are welcome to reserve a spot at no charge, but if possible we would appreciate $10 towards the cost of the rented linens.
        </p>
        <button onClick={handleYurts} className={styles.button}>
          TO RESERVE SPACE IN A YURT, PLEASE CLICK HERE
        </button>
        <button onClick={handleModifyBooking} className={styles.secondaryButton}>
          Modify an Existing Yurt Reservation
        </button>

        <h2 className={styles.subtitle}>Camping</h2>
        <p className={styles.paragraph}>
          Camping is allowed on the property, we have a pretty big area to ourselves. You're welcome to bring your own tent and/or camp in a vehicle.
        </p>

        <h2 className={styles.subtitle}>Hotel Rooms</h2>
        <p className={styles.paragraph}>
          We've arranged discounted rates at a nearby hotel for those who prefer it. You can just call up This Number: and tell them ______.  They are a ~15 min drive away, but we can't get you to/from the venue; we will set up a groupchat for carpooling.
        </p>

        <h2 className={styles.subtitle}>Nota Bene!</h2>
        <p className={styles.paragraph}>
          Unfortunately the venue rules prohibit dogs inside any buildings -- this means the Yurts and also the reception hall.  Dogs are still allowed on the property otherwise.
        </p>

        <br />
        <Link href={'/'} className={styles.link}>Back</Link>
      </div>
      <CustomPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handlePopupConfirm}
      />
    </div>
  )
}