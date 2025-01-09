import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { guestData } = await req.json()

    // Send email using Resend
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Andréa & Fernando <convite@casamento.com>',
        to: ['0a6f4ed81eb49ea2dfc04afbcae5771d@FireMail.com.br'],
        subject: 'Nova Confirmação de Presença - Andréa & Fernando',
        html: `
          <h1>Nova Confirmação de Presença</h1>
          <h2>Dados do Convidado:</h2>
          <pre>${JSON.stringify(guestData, null, 2)}</pre>
        `,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error('Failed to send email')
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})