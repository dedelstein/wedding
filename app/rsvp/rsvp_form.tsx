'use client';

import { rsvp } from '@/components/actions';
import { useRouter } from 'next/navigation';

export default function RSVPForm(user: any) {
    const router = useRouter();

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
        <main className="flex min-h-screen flex-col items-center p-24">
            <button onClick={handleModifyBooking} className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Change Yurt Booking
            </button>
            <div className="max-w-5xl">
                <form onSubmit={handleSubmit}>
                    <div>
                        <text>Will you be attending? </text>
                        <input type="radio" name="attending" id="attending-yes" value="yes" />
                        Yes
                        <input type="radio" name="attending" value="no" />
                        No


                        <input type="text" name="name" placeholder="Your Name"
                            className="block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-600"
                        />
                        <input type="email" name="email" placeholder="Your email address"
                            className="block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-600"
                        />

                        <div id="attending-hidden">
                            <input type="text" name="specialRequests" placeholder="Special Requests"
                                className="block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-600"
                            />
                            <input type="text" name="dietaryRestrictions" placeholder="Dietary Restrictions"
                                className="block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-600"
                            />
                            <text>Would you like to request a plus one? </text><input type="checkbox" name="plusOne" className='toggle-plusone' />
                            <input type="text" name="plusOneName" placeholder="Plus One Name"
                                className="plusone-hidden block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-600"
                            />
                            <input type="email" name="plusOneEmail" placeholder="Plus One Email"
                                className="plusone-hidden block w-full px-3 py-2 mt-1 text-sm placeholder-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-base dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-600"
                            />
                        </div>
                    </div>


                    <br />
                    <button type="submit">RSVP</button>
                </form>
            </div >
        </main >
    );
}
