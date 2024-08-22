'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { rsvp } from '@/components/actions';
import styles from './RSVPstyle.module.css'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ['latin'] })

export default function RSVPForm(user: any) {
    const [isAttending, setIsAttending] = useState(false);
    const [hasPlusOne, setHasPlusOne] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Disable body scrolling when the form is open
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);

    const handleAttendingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsAttending(e.target.value === 'yes');
    };

    const handlePlusOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHasPlusOne(e.target.checked);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData(event.currentTarget);
            const ret: any = await rsvp(formData);
            const id = ret.insertedId.toString([10]);
            const redirectPath = ret.redirectPath;
            localStorage.setItem('guestId', id);
            router.push(redirectPath);
        } catch (err) {
            setError('An error occurred while submitting the form. Please try again.');
            console.error('Form submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className={`${styles.variables} ${styles.container}`}>
            <div className={manrope.className}>
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
                        autoComplete="name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email Address"
                        className={styles.input}
                        autoComplete="email"
                        required
                    />

                    {isAttending && (
                        <div className={styles.attendingSection}>
                            <textarea
                                name="specialRequests"
                                placeholder="Special Requests"
                                className={styles.input}
                                rows={3}
                            />
                            <textarea
                                name="dietaryRestrictions"
                                placeholder="Dietary Restrictions"
                                className={styles.input}
                                rows={3}
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
                                we may not be able to guarantee space for all +1's. We will notify you ASAP if your guest can come.
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

                    <button type="submit" className={styles.button} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'RSVP'}
                    </button>

                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>
        </main>
    );
}