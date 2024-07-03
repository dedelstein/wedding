import RSVPForm from './rsvp_form'
import { createClient } from '@/utils/supabase/server'

export default async function RSVP() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    return <RSVPForm user={user} />
}