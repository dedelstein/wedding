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
                <Link href={'/'} className={styles.link}>
                    <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.87224 1.44373L1.69141 7.62471L7.87224 13.8055" stroke="white" stroke-width="2"/>
                    </svg>
                    Back
                </Link>

                <h1 className={styles.title}>Schedule</h1>
                <Image src={schedule_dwg}
                    className={styles.image}
                    layout="responsive"
                    alt="Schedule - Camping October 4th, Ceremony October 5th, Brunch October 6th"
                    aria-label="Schedule Image" />

                <p> We will get to Mountain Lakes Park on <strong>Friday, October 4th, around 3pm</strong>.
                    You are welcome to join us, we have the campground to ourselves until Sunday midday.
                    We will have some food in the evening, you can bring anything that would be nice
                    around a campfire or on a grill.</p>
                <br />
                <p>There are Yurts on the property that you can stay in with
                    some advance notice, and you are also welcome to camp in your own tent or vehicle  
                    -- <Link href={'/stay'} className={styles.textLink}>
                    details for accomodation can be found here
                    </Link>
                    </p>
                <br />
                <h2 className={styles.subtitle}>Saturday Schedule, Oct. 5th</h2>
                <ul className={styles.list}>
                    <li> 11 AM - Breakfast @ Mt. Lakes </li>
                    <li> 4 PM - Please get here by 4! </li>
                    <li> <b>4:30 PM - Ceremony</b> </li>
                    <li> 6 - 11 PM - Reception -- Music, Food, Etc.</li>
                </ul>
                <br />
                <p>On Sunday Morning, we will be getting breakfast at ::LOCATION TBD::, please join us if you are able</p>
                <br />
            </div>
        </div>
    )
}