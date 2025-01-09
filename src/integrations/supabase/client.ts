import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dmodmuwamavwggpshtsu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtb2RtdXdhbWF2d2dncHNodHN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNTUyMDksImV4cCI6MjA1MTkzMTIwOX0.V4Xv3tNkDpGzoGCZQAs1fm2wA-rVc59DuboDZzGaM4U";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    db: {
      schema: 'public'
    }
  }
);