import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL|| '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY|| '')

export async function fetchBookings() {
    const { data, error } = await supabase
      .from('bookings')
      .select('id, yurt_id, guest_id, day, duration, extra_names')
      .order('yurt_id');
  
    if (error) {
      console.error('Error fetching bookings:', error.message);
      return null;
    }
  
    return data;
  }
  
  export async function fetchGuestName(guestId: string) {
    const { data, error } = await supabase
      .from('guests')
      .select('name')
      .eq('id', guestId)
      .single();
  
    if (error) {
      console.error('Error fetching guest:', error.message);
      return null;
    }
  
    return data?.name;
  }
  
  export async function getSortedBookingsWithGuestNames() {
    const bookings = await fetchBookings();
    if (!bookings) return null;
  
    const guestIds = [...new Set(bookings.map((booking) => booking.guest_id))];
    const guestNamePromises = guestIds.map((guestId) => fetchGuestName(guestId));
    const guestNames = await Promise.all(guestNamePromises);
  
    const guestMap: { [key: string]: string } = {};
    guestIds.forEach((guestId, index) => {
      guestMap[guestId] = guestNames[index] || 'Unknown';
    });
  
    const sortedBookings = bookings.map((booking) => ({
      booking_id: booking.id,
      yurt_id: booking.yurt_id,
      guest_name: guestMap[booking.guest_id],
      guest_id: booking.guest_id,
      day: booking.day,
      duration: booking.duration,
      extra_names: booking.extra_names,
    })).sort((a, b) => a.yurt_id - b.yurt_id);
  
    return sortedBookings;
  }