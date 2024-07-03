'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


export async function login() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/rsvp')
}


export async function rsvp(formData: FormData) {
  const supabase = createClient()

  const datum = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    attending: formData.get('attending') === 'yes' ? true : false,
    plusOne: formData.get('plusOne') === 'on' ? true : false,
    plusOneName: formData.get('plusOneName') as string,
    plusOneEmail: formData.get('plusOneEmail') as string,
    specialRequests: formData.get('specialRequests') as string,
    dietaryRestrictions: formData.get('dietaryRestrictions') as string
  }

  const { data, error } = await supabase.from('guests').insert([datum]).select();

  if (error !== null) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')

  const insertedId = data[0]?.id;
  let redirectPath = '/';
  if (datum.attending) {
    redirectPath = '/yurts';
  }

  return { insertedId, redirectPath };
}


export async function booking(formData: FormData) {
  const supabase = createClient()

  const datum = {
    guest_id: formData.get('guest_id') as string,
    yurt_id: formData.get('yurt_id') as string,
    num_guests: formData.get('num_guests') as string,
    day: formData.get('day') as string,
    duration: formData.get('duration') as string,
    extra_names: formData.get('extra_names') as string
  }

  const { data, error } = await supabase.from('bookings').insert([datum]).select();

  let redirectPath = '/yurts';
  if (error !== null) {
    redirectPath = '/error';
  }

  revalidatePath('/', 'layout')

  return redirectPath;
}

export async function modifyBooking(formData: FormData) {
  const supabase = createClient();
  const email = formData.get('email') as string;

  const { data, error } = await supabase.from('guests').select('id').eq('email', email).single();

  if (error || !data) {
    return { success: false, message: 'Guest not found' };
  }

  const guestId = data.id;

  return { success: true, guestId };
}

export async function deleteBooking(bookingId: number) {
  const supabase = createClient();

  console.log('bookingid:', bookingId)
  const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);
  console.log(data)

  let redirectPath = '/yurts';
  if (error !== null) {
    redirectPath = '/error';
  }

  revalidatePath('/', 'layout');

  return redirectPath;
}