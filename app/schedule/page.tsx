import Link from "next/link"
import Image from "next/image"

import styles from './Schedule.module.css'
import { Manrope } from 'next/font/google'
import schedule_dwg from '@/public/schedule_img.jpg'

const manrope = Manrope({ subsets: ['latin'] })

export default function Schedule() {
    return (
        <div className={manrope.className}>
            <div className={styles.container}>
                <h1 className={styles.title}>Schedule</h1>
                <Image src={schedule_dwg}
                    layout="responsive"
                    alt="Schedule - Camping October 4th, Ceremony October 5th, Brunch October 6th"
                    aria-label="Schedule Image" />
                <br />
                <p> We will get to Mountain Lakes Park on <strong>Friday, October 4th, around 3pm</strong>.
                    You are welcome to join us, we have the campground to ourselves until Sunday midday.
                    We will have some food in the evening, you can bring anything that would be nice
                    around a campfire or on a grill.</p>
                <br />
                <p>There are Yurts on the property that you can stay in with
                    some advance notice, and you are also welcome to camp in your own tent or vehicle -- details for
                    accomodation can be found HERE.</p>
                <br />
                <h2 className={styles.subtitle}>Saturday Schedule, Oct. 5th</h2>
                <ul className={styles.list}>
                    <li> 11 AM - Breakfast @ Mt. Lakes </li>
                    <li> 4 PM - Please get here by 4! </li>
                    <li> <b>4:30 PM - Ceremony</b> </li>
                    <li> 6 - 11 PM - Reception </li>
                </ul>
                <br />
                <p>On Sunday Morning, we will be getting breakfast at ::LOCATION TBD::, please join us if you are able</p>
                <br />
                <Link href={'/'}>Back</Link>
            </div>
        </div>
    )
}