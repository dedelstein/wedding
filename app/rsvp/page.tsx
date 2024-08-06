import RSVPForm from './rsvp_form'
import { createClient } from '@/utils/supabase/server'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ['latin']})

export default async function RSVP() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return <RSVPForm user={user} />
}