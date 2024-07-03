import ModifyForm from './modify_form'
import { createClient } from '@/utils/supabase/server'

export default async function Modify() {
    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const { data: guest_list, error: guestError } = await supabase
    .from('guests')
    .select('*');

    if (guestError) {
        console.error('Error fetching guests:', guestError);
        return <div>Error fetching guests.</div>;
    }

    return <ModifyForm user={user} guest_list={guest_list}/>
}