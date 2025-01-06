import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
  try {
    const payload = await req.json()
    
    // Only handle new bookings
    if (payload.type !== 'INSERT') {
      return new Response('Not a new booking', { status: 200 })
    }

    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

    // Get pilot info
    const { data: pilot } = await supabase
      .from('profiles')
      .select('full_name')
      .eq('id', payload.record.pilot_id)
      .single()

    const pilotName = pilot?.full_name || 'Other pilot'
    const startTime = new Date(payload.record.start_time)
    const endTime = new Date(payload.record.end_time)

    // Get all user emails
    const { data: users } = await supabase
      .from('profiles')
      .select('email')

    if (!users?.length) {
      throw new Error('No users found')
    }

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'COPLANE Notifications <notifications@coplane.app>',
        to: users.map(user => user.email),
        subject: 'New Flight Schedule Entry',
        html: `
          <h1>New Flight Schedule Entry</h1>
          <p><strong>Title:</strong> ${payload.record.title}</p>
          <p><strong>Pilot:</strong> ${pilotName}</p>
          <p><strong>Date:</strong> ${startTime.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}</p>
          ${payload.record.notes ? `<p><strong>Notes:</strong> ${payload.record.notes}</p>` : ''}
        `,
      }),
    })

    if (!res.ok) {
      throw new Error('Failed to send email')
    }

    return new Response('Email sent successfully', { status: 200 })
  } catch (error) {
    console.error('Error:', error)
    return new Response(error.message, { status: 500 })
  }
})