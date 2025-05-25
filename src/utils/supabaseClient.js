import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rxxipydjomsycacdfoqp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4eGlweWRqb21zeWNhY2Rmb3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4OTU2OTAsImV4cCI6MjA2MzQ3MTY5MH0.T630P6tBrkc63Ru2f78DNalTzCLxXLsitXs8i5qoMhE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);