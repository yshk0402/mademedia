import { createClient } from '@supabase/supabase-js';

export type WaitlistEntry = {
  id: string;
  name: string;
  email: string;
  created_at?: string;
};

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const adminToken = process.env.ADMIN_TOKEN;

function getClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    return {
      client: null,
      error: 'Supabaseの環境変数 (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) を設定してください。',
    };
  }

  return {
    client: createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }),
    error: null,
  };
}

export async function addWaitlistEntry(name: string, email: string) {
  const supabase = getClient();
  if (!supabase.client) {
    return { error: supabase.error };
  }

  const { data, error } = await supabase.client
    .from('waitlists')
    .insert([{ name, email }])
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { entry: data as WaitlistEntry };
}

export async function fetchWaitlistEntries() {
  const supabase = getClient();
  if (!supabase.client) {
    return { error: supabase.error };
  }

  const { data, error } = await supabase.client
    .from('waitlists')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return { error: error.message };
  }

  return { entries: (data || []) as WaitlistEntry[] };
}

export async function deleteWaitlistEntry(id: string) {
  const supabase = getClient();
  if (!supabase.client) {
    return { error: supabase.error };
  }

  const { error } = await supabase.client.from('waitlists').delete().eq('id', id);

  if (error) {
    return { error: error.message };
  }

  return { ok: true };
}
