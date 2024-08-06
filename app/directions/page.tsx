import Link from 'next/link'
import styles from './Directions.module.css'

export default function Directions() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Directions</h1>
      <p className={styles.coordinates}>Our location: <a href="https://www.google.com/maps?q=41°18'33.3%22N+73°34'14.4%22W" target="_blank" rel="noopener noreferrer">41°18'33.3"N 73°34'14.4"W</a></p>
  

      <h2 className={styles.subtitle}>How to reach us:</h2>
      <ul className={styles.list}>
        <li>By car: Follow the GPS coordinates.  Parking is available, along with closer spots for those with mobility restrictions</li>
        <li>By public transport:<br/>
          <a href="https://new.mta.info/schedules" className={styles.link}>The Metro North</a> Harlem line runs from Grand Central to Purdy's, roughly every 30 minutes on Weekdays and every hour on Weekends.
          Fares are approx. $20 for peak hours (leaving from 6-9 AM or 4-8 PM) and $15 one-way for off-peak hours, with reduced fares for those who qualify.
        </li>
        <li>
          We will provide a shuttle service between the Purdy's train station and the venue Fri-Sun at the following times (this might get updated if train schedules change):
          </li>
      </ul>

      <div className={styles.externalMap}>
        <p>View on external map services:</p>
        <a href="https://www.google.com/maps?q=41°18'33.3%22N+73°34'14.4%22W" target="_blank" rel="noopener noreferrer" className={styles.link}>
          Google Maps
        </a>
        {' | '}
        <a href="https://www.openstreetmap.org/?mlat=41.30925&mlon=-73.57067" target="_blank" rel="noopener noreferrer" className={styles.link}>
          OpenStreetMap
        </a>
      </div>
      <br/>
      <Link href={'/'}>Back</Link>
    </div>
  )
}