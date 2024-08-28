'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { z } from 'zod'



export async function login() {
  const supabase = createClient()

  const { data, error } = await supabase.auth.signInAnonymously()

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/rsvp')
}

const RSVPSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  attending: z.boolean(),
  plusOne: z.boolean(),
  plusOneName: z.string().optional().nullable(),
  plusOneEmail: z.string().email("Invalid plus one email address").optional().nullable(),
  specialRequests: z.string().optional().nullable(),
  dietaryRestrictions: z.string().optional().nullable()
})

type RSVPData = z.infer<typeof RSVPSchema>

type RSVPResponse = 
  | { success: true; insertedId: string; redirectPath: string }
  | { success: false; errors?: Record<string, string[]>; error?: string }

export async function rsvp(formData: FormData): Promise<RSVPResponse> {
  const supabase = createClient()

  const rawData = {
    name: formData.get('name'),
    email: formData.get('email'),
    attending: formData.get('attending') === 'yes',
    plusOne: formData.get('plusOne') === 'on',
    plusOneName: formData.get('plusOneName') || null,
    plusOneEmail: formData.get('plusOneEmail') || null,
    specialRequests: formData.get('specialRequests') || null,
    dietaryRestrictions: formData.get('dietaryRestrictions') || null
  }

  const result = RSVPSchema.safeParse(rawData)

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  const validatedData: RSVPData = result.data

  const { data, error } = await supabase
    .from('guests')
    .insert([validatedData])
    .select()

  if (error) {
    return { success: false, error: 'Failed to save RSVP' }
  }

  const insertedId = data[0]?.id

  if (!insertedId) {
    return { success: false, error: 'Failed to retrieve inserted ID' }
  }

  const redirectPath = validatedData.attending ? '/stay' : '/'

  return { success: true, insertedId, redirectPath }
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