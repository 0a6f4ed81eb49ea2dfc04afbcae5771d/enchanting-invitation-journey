import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://dmodmuwamavwggpshtsu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtb2RtdXdhbWF2d2dncHNodHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNTUyMDksImV4cCI6MjA1MTkzMTIwOX0.V4Xv3tNkDpGzoGCZQAs1fm2wA-rVc59DuboDZzGaM4U'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    detectSessionInUrl: true,
    autoRefreshToken: true,
    storage: localStorage,
    flowType: 'pkce'
  },
})

// Add error handling and logging for authentication events
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN') {
    console.log('User signed in:', session?.user?.email)
  }
  if (event === 'SIGNED_OUT') {
    console.log('User signed out')
  }
  if (event === 'USER_UPDATED') {
    console.log('User updated:', session?.user?.email)
  }
  if (event === 'TOKEN_REFRESHED') {
    console.log('Token refreshed')
  }
})