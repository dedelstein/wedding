'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link'

import { rsvp } from '@/components/actions';
import styles from './RSVPstyle.module.css'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ['latin'] })

export default function RSVPForm(user: any) {
    const [isAttending, setIsAttending] = useState(false);
    const [hasPlusOne, setHasPlusOne] = useState(false);
    const router = useRouter();

    const handleAttendingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAttending(e.target.value === 'yes');
    };

    const handlePlusOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasPlusOne(e.target.checked);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const ret: any = await rsvp(formData);
        const id = ret.insertedId.toString([10]);
        const redirectPath = ret.redirectPath;
        localStorage.setItem('guestId', id);
        return router.push(redirectPath);
    };

    const handleModifyBooking = () => {
        router.push('/modify');
    };

    return (
        <main className={styles.container}>
            <Link href={'/'} className={styles.link}>
                <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.87224 1.44373L1.69141 7.62471L7.87224 13.8055" stroke="white" stroke-width="2"/>
                </svg>
                Back
            </Link>

            <div className={`${manrope.className} ${styles.formContainer}`}>
                <h1 className={styles.title}>RSVP</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <p className={styles.question}>Will you be attending?</p>
                        <div className={styles.radioGroup}>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="attending"
                                    value="yes"
                                    className={styles.radioInput}
                                    onChange={handleAttendingChange}
                                />
                                <span className={styles.radioButton}></span>
                                Yes
                            </label>
                            <label className={styles.radioLabel}>
                                <input
                                    type="radio"
                                    name="attending"
                                    value="no"
                                    className={styles.radioInput}
                                    onChange={handleAttendingChange}
                                />
                                <span className={styles.radioButton}></span>
                                No
                            </label>
                        </div>
                    </div>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        className={styles.input}
                    />

                    {isAttending && (
                        <div className={styles.attendingSection}>
                            <input
                                type="text"
                                name="specialRequests"
                                placeholder="Special Requests"
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="dietaryRestrictions"
                                placeholder="Dietary Restrictions"
                                className={styles.input}
                            />
                            <div className={styles.checkboxGroup}>
                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        name="plusOne"
                                        className={styles.checkboxInput}
                                        onChange={handlePlusOneChange}
                                    />
                                    <span className={`${styles.checkbox} ${hasPlusOne ? styles.checkboxChecked : ''}`}></span>
                                    Request a plus one
                                </label>
                            </div>
                            <p className={styles.plusOneDisclaimer}>
                                Due to venue capacity constraints, while we will make every effort to accommodate +1's,
                                we may not be able to guarantee space for all +1's.<br />We will notify you ASAP if your guest can come<br />
                                If your invitation was addressed to two people,
                                please be assured that we have space for both of you.
                            </p>
                            {hasPlusOne && (
                                <div className={styles.plusOneSection}>
                                    <input
                                        type="text"
                                        name="plusOneName"
                                        placeholder="Plus One Name"
                                        className={styles.input}
                                    />
                                    <input
                                        type="email"
                                        name="plusOneEmail"
                                        placeholder="Plus One Email"
                                        className={styles.input}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    <button type="submit" className={styles.button}>RSVP</button>
                </form>

                <button
                    onClick={handleModifyBooking}
                    className={`${styles.button} ${styles.secondaryButton}`}
                >
                    Change Yurt Booking
                </button>
            </div>
        </main>
    );
}
