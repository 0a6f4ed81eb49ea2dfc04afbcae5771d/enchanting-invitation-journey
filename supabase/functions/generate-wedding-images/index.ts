import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { HfInference } from 'https://esm.sh/@huggingface/inference@2.3.2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { type } = await req.json()
    const hf = new HfInference(Deno.env.get('HUGGING_FACE_ACCESS_TOKEN'))

    const prompts = {
      couple1: "A romantic wedding photo of a happy couple in formal attire, elegant and joyful, professional photography style",
      couple2: "A candid moment of a bride and groom sharing a tender moment in a garden setting, natural lighting",
      couple3: "An artistic wedding portrait of newlyweds, soft lighting, romantic atmosphere",
      envelope: "A luxurious red wax seal on an elegant cream-colored envelope, wedding invitation style, detailed texture",
      invitation: "An elegant wedding invitation with floral details, cream and gold colors, sophisticated design",
      pattern: "A subtle, elegant wedding-themed background pattern with small floral elements, very light and delicate, cream colored"
    }

    const image = await hf.textToImage({
      inputs: prompts[type] || prompts.couple1,
      model: 'black-forest-labs/FLUX.1-schnell',
    })

    const arrayBuffer = await image.arrayBuffer()
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    return new Response(
      JSON.stringify({ image: `data:image/png;base64,${base64}` }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})