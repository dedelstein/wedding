import Link from 'next/link'
import Image from 'next/image'

import styles from './Directions.module.css'
import { Manrope } from 'next/font/google'
import parking_map from '@/public/parking_map.jpg'

const manrope = Manrope({ subsets: ['latin'] })

export default function Directions() {
  return (
    <div className={manrope.className}>
      <div className={styles.container}>
        <Link href={'/'} className={styles.link}>
          <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.87224 1.44373L1.69141 7.62471L7.87224 13.8055" stroke="white" stroke-width="2"/>
          </svg>
          Back
        </Link>

        <h1 className={styles.title}>Directions</h1>
        <p className={styles.coordinates}>Our location: <a href="https://www.google.com/maps/place/41%C2%B018'28.6%22N+73%C2%B034'07.2%22W" target="_blank" rel="noopener noreferrer">41°18'28.6"N 73°34'07.2"W</a></p>
        <div className='flex items-center justify-center '>
          <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2997.042069711613!2d-73.5712469884326!3d41.30794840079932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE4JzI4LjYiTiA3M8KwMzQnMDcuMiJX!5e0!3m2!1sen!2see!4v1722963430807!5m2!1sen!2see" width="400" height="300" loading="lazy"></iframe>
        </div>
        <h2 className={styles.subtitle}>How to reach us:</h2>
        <ul className={styles.list}>
          <li>By public transport:<br />
            <a href="https://new.mta.info/schedules" className={styles.textLink}>The Metro North</a> Harlem line runs from Grand Central to Purdy's, roughly every 30 minutes on Weekdays and every hour on Weekends.
            Fares are approx. $20 for peak hours (leaving from 6-9 AM or 4-8 PM) and $15 one-way for off-peak hours, with reduced fares for those who qualify.
          </li>
          <li>
            We will provide a shuttle service between the Purdy's train station and the venue Fri-Sun at the following times (this might get updated if train schedules change):

            <strong><ul>
              <br />
              <li>3 PM, 5 PM, 7:15 PM, 9:30 PM - Friday</li>
              <li>10:30 AM, 11:30 AM, 1:30 PM, 2:30 PM, 3:30 PM - Saturday</li>
              <br />
            </ul></strong>
          </li>

          <li>By car: Follow the GPS coordinates to the campground entrance.  Parking is available at the area circled in blue, along with closer spots for those with mobility restrictions.  There will be ample signage to direct you to where you need to go.</li>
          <Image src={parking_map} alt='Map for parking' className={styles.image} />
        </ul>

        <div className={styles.externalMap}>
          <p>View on external map services:</p>
          <a href="https://www.google.com/maps/place/41%C2%B018'28.6%22N+73%C2%B034'07.2%22W" target="_blank" rel="noopener noreferrer" className={styles.textLink}>
            Google Maps
          </a>
          {' | '}
          <a href="https://www.openstreetmap.org/?mlat=41.30925&mlon=-73.57067" target="_blank" rel="noopener noreferrer" className={styles.textLink}>
            OpenStreetMap
          </a>
        </div>
      </div>
    </div>
  )
}