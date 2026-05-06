// pages/login/authService.tsx
import { supabase } from '../../lib/supabase';

export async function loginAuth(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password,
  });

  if (error) throw new Error(error.message);
  
  // Use auth_uid (not auth_id) - match your table column name
  const { data: adminData, error: adminError } = await supabase
    .from('admin')
    .select('id, firstname, lastname, username')
    .eq('auth_uid', data.user.id)
    .single();

  if (adminError || !adminData) {
    await supabase.auth.signOut();
    throw new Error('Unauthorized. Admin access only.');
  }

  return { 
    user: data.user, 
    session: data.session, 
    admin: adminData 
  };
}