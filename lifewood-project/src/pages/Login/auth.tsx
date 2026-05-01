// import { supabase } from '../../lib/supabase';

// export async function loginAuth(email: string, password: string) {
//   const { data, error } = await supabase.auth.signInWithPassword({
//     email: email.trim(),
//     password: password,
//   });

//   if (error) throw new Error(error.message);
  
//   return data;
// }

import { supabase } from '../../lib/supabase';

export async function loginAuth(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password: password,
  });

  if (error) throw new Error(error.message);
  
  return data;
}