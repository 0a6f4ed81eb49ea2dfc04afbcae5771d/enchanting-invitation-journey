import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.38.4"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_ANON_KEY!)
    const { guest_id, app_url } = await req.json()

    // Get guest data
    const { data: guest, error: guestError } = await supabase
      .from('guests')
      .select('*')
      .eq('id', guest_id)
      .single()

    if (guestError) throw guestError

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Andréa & Fernando <convite@casamento.com>',
        to: [guest.email],
        subject: 'Convite de Casamento - Andréa & Fernando',
        html: `
          <h1>Olá ${guest.name}!</h1>
          <p>Você foi convidado(a) para o nosso casamento!</p>
          <p>Para acessar o convite digital, clique no link abaixo:</p>
          <a href="${app_url}?guest_id=${guest_id}">Acessar Convite</a>
        `,
      }),
    })

    const data = await res.json()

    if (res.ok) {
      // Update invitation sent timestamp
      await supabase
        .from('guests')
        .update({ invitation_sent_at: new Date().toISOString() })
        .eq('id', guest_id)

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    } else {
      throw new Error('Failed to send email')
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})