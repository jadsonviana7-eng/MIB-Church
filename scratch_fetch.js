import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://guznbiqposfhqalqjggw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1em5iaXFwb3NmaHFhbHFqZ2d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MDY2NjMsImV4cCI6MjA5NDQ4MjY2M30._y___M1wxX-JkW6Lc2x5qCw2zDz73xUKaA_eqv_3YdE';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  const { data, error } = await supabase
    .from('pessoas')
    .select('id, nome, status, created_at')
    .limit(10);

  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Any members:', JSON.stringify(data, null, 2));
  }
}

main();
