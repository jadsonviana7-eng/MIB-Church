import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Aviso: Variáveis de ambiente Supabase não configuradas.\n' +
    'Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY em .env.local\n' +
    'Veja .env.example para mais detalhes.'
  );
}

let supabase = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  supabase = {
    auth: {
      signInWithPassword: async () => ({
        error: { message: 'Supabase não configurado. Veja .env.local' }
      }),
      getSession: async () => ({ data: { session: null } }),
      signOut: async () => ({ error: null })
    },
    functions: {
      invoke: async () => ({
        data: null,
        error: { message: 'Supabase não configurado. Veja .env.local' },
      }),
    },
    from: () => ({
      select: async () => ({ data: null, error: { message: 'Supabase não configurado' } })
    })
  };
}

export { supabase };
