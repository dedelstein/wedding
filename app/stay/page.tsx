'use client';

import Link from 'next/link'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react'

import styles from './Stay.module.css'
import { Manrope } from 'next/font/google'
import CustomPopup from '@/components/custom_popup'

import dog_dwg from '@/public/dink_dwg.jpg'
import yurt_dwg from '@/public/yurt_dwg.jpg'
import motel_dwg from '@/public/motel_dwg.jpg'
import tent_dwg from '@/public/tent_dwg.jpg'

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
    router.push('/');
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
        <div className={styles.section}>
          <div className={styles.sectionImage}>
            <Image src={yurt_dwg} alt='drawing of a yurt' width={250} />
          </div>
          <div className={styles.sectionContent}>
            <p className={styles.paragraph}>
              There's a bunch of Yurts available on the property. Each yurt is a large, circular room with 10 beds. Some of the beds are bunk beds, and it is possible to move them around. Bedding is provided, but privacy is...limited.
              You are welcome to reserve a spot at no charge, but if possible we would appreciate $10 towards the cost of the rented linens.
            </p>
          </div>
        </div>

        <button onClick={handleYurts} className={styles.button}>
          TO RESERVE SPACE IN A YURT, PLEASE CLICK HERE
        </button>
        <button onClick={handleModifyBooking} className={styles.secondaryButton}>
          Modify an Existing Yurt Reservation
        </button>

        <h2 className={styles.subtitle}>Camping</h2>
        <div className={styles.section}>
          <div className={styles.sectionImage}>
            <Image src={tent_dwg} alt='drawing of a tent' width={250} />
          </div>
          <div className={styles.sectionContent}>
            <p className={styles.paragraph}>
              Camping is allowed on the property, we have a pretty big area to ourselves. You're welcome to bring your own tent and/or camp in a vehicle.
            </p>
          </div>
        </div>

        <h2 className={styles.subtitle}>Hotel Rooms</h2>
        <div className={styles.section}>
          <div className={styles.sectionImage}>
            <Image src={motel_dwg} alt='drawing of a motel' width={250} />
          </div>
          <div className={styles.sectionContent}>
            <p className={styles.paragraph}>
              We've arranged discounted rates at a <a href='https://www.choicehotels.com/new-york/brewster/comfort-inn-hotels/ny764' className={styles.link}>nearby hotel</a> for those who prefer it. You can just call up +1 (845) 582-0688 and tell them you're getting a room for Dan and Zody's wedding. They are a ~15 min drive away, but we won't be able get you to/from the venue. We will set up a groupchat for carpooling.
            </p>
          </div>
        </div>

        <h2 className={styles.subtitle}>Nota Bene!</h2>
        <div className={styles.section}>
          <div className={styles.sectionImage}>
            <Image src={dog_dwg} alt='drawing of dogs' width={250} />
          </div>
          <div className={styles.sectionContent}>
            <p className={styles.paragraph}>
              Unfortunately the venue rules prohibit dogs inside any buildings -- this means the Yurts and also the reception hall.
              Dogs are allowed on the property otherwise; tent camping with dogs is OK. Please let us know if you plan to bring a dog.
            </p>
          </div>
        </div>

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