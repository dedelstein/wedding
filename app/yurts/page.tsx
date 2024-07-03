import BookingForm from './booking-form'
import { createClient } from '@/utils/supabase/server'

export default async function Bookings() {
    const supabase = createClient()

    const { data: yurt_list, error: yurtError } = await supabase
    .from('yurts')
    .select('*');

    if (yurtError) {
        console.error('Error fetching yurts:', yurtError);
        return <div>Error fetching yurts.</div>;
    }
/*
    const { data: guest_list, error: guestError } = await supabase
    .from('guests')
    .select('*');

    if (guestError) {
        console.error('Error fetching guests:', guestError);
        return <div>Error fetching guests.</div>;
    }
*/
    const {
        data: { user },
    } = await supabase.auth.getUser()

    return <BookingForm user={user} yurt_list={yurt_list}/>
}