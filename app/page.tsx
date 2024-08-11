import Image from 'next/image';
import Link from 'next/link'

import { login } from '@/components/actions'
import wedding_landing from '@/public/wedding_landing_sm.jpg'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-2xl items-center justify-between font-mono text-sm lg:flex relative">
        <form>
          <Image
            src={wedding_landing}
            layout="responsive"
            alt="Wedding Landing Image"
            width={1509}
            height={2523}
          />
          <button
            formAction={login}
            style={{
              position: 'absolute',
              top: '46%',
              left: '43%',
              width: '15%', // Set the width to match the area you want to cover
              height: '5%', // Set the height to match the area you want to cover
              background: 'transparent', // Make the button invisible
              border: 'none',
              cursor: 'pointer',
            }}
            aria-label='RSVP'
          />
        </form>
        <Link href={'/directions'}
          style={{
            position: 'absolute',
            top: '52%',
            left: '35%',
            width: '31%', // Set the width to match the area you want to cover
            height: '5%', // Set the height to match the area you want to cover
            background: 'transparent', // Make the button invisible
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label='Directions' />
        <Link href={'/schedule'}
          style={{
            position: 'absolute',
            top: '58%',
            left: '37%',
            width: '28%', // Set the width to match the area you want to cover
            height: '5%', // Set the height to match the area you want to cover
            background: 'transparent', // Make the button invisible
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label='Schedule'
        />
        <Link href={'/stay'}
          style={{
            position: 'absolute',
            top: '64%',
            left: '29%',
            width: '43%', // Set the width to match the area you want to cover
            height: '5%', // Set the height to match the area you want to cover
            background: 'transparent', // Make the button invisible
            border: 'none',
            cursor: 'pointer',
          }}
          aria-label='Accommodations'
        />
      </div>
    </main>
  );
}
