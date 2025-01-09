import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://dmodmuwamavwggpshtsu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtb2RtdXdhbWF2d2dncHNodHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0OTY5NzAsImV4cCI6MjAyNTA3Mjk3MH0.Wd_jqxGhVJKBKEQHOQcYQqOXEZJGqEBtbFGxZLxYPBE'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)