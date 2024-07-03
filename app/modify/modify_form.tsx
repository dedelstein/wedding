'use client';

import { modifyBooking } from '@/components/actions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ModifyForm(user: any, guest_list: any) {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const result = await modifyBooking(formData);

        if (result.success) {
            localStorage.setItem('guestId', result.guestId.toString());
            router.push('/yurts');
        } else {
            setErrorMessage('Guest not found. Redirecting to RSVP page...');
            setTimeout(() => {
                router.push('/rsvp');
            }, 3000); // Redirect after 3 seconds
        }
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email address"
                            className="block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-600"
                            required
                        />
                    </div>
                    <br />
                    <button type="submit">Modify Booking</button>
                </form>
                {errorMessage && (
                    <div className="alert alert-warning mt-4">
                        {errorMessage}
                    </div>
                )}
            </div>
        </main>
    );
}