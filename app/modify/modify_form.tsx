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
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your email address"
                            className="w-full px-3 py-2 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-600 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-[#70868A] hover:bg-[#81A0AA] text-white font-semibold py-2 px-4 rounded-md transition-colors"
                    >
                        Go To Yurts
                    </button>
                </form>
                {errorMessage && (
                    <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-md">
                        {errorMessage}
                    </div>
                )}
            </div>
        </main>
    );
}