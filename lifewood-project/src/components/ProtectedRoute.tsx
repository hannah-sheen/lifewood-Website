// // components/ProtectedRoute.tsx
// import { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { supabase } from '../lib/supabase';
// import { Loader2 } from 'lucide-react';

// export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true);
//   const [isAdmin, setIsAdmin] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const { data: { session } } = await supabase.auth.getSession();
        
//         if (!session) {
//           setIsAdmin(false);
//           setLoading(false);
//           return;
//         }

//         // Use auth_uid (not auth_id) - match your table column name
//         const { data: adminData, error } = await supabase
//           .from('admin')
//           .select('id')
//           .eq('auth_uid', session.user.id)
//           .single();

//         const isValidAdmin = !!adminData && !error;
//         setIsAdmin(isValidAdmin);
        
//         if (!isValidAdmin) {
//           await supabase.auth.signOut();
//         }
//       } catch (err) {
//         console.error('Auth check error:', err);
//         setIsAdmin(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();

//     const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
//       if (event === 'SIGNED_OUT') {
//         setIsAdmin(false);
//         setLoading(false);
//       } else if (session) {
//         const { data: adminData } = await supabase
//           .from('admin')
//           .select('id')
//           .eq('auth_uid', session.user.id)
//           .single();
//         setIsAdmin(!!adminData);
//         setLoading(false);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-seaSalt">
//         <Loader2 className="w-8 h-8 text-saffaron animate-spin" />
//       </div>
//     );
//   }

//   if (!isAdmin) {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// }

// components/ProtectedRoute.tsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Use auth_uid (not auth_id) - match your table column name
        const { data: adminData, error } = await supabase
          .from('admin')
          .select('id')
          .eq('auth_uid', session.user.id)
          .single();

        const isValidAdmin = !!adminData && !error;
        setIsAdmin(isValidAdmin);
        
        if (!isValidAdmin) {
          await supabase.auth.signOut();
        }
      } catch (err) {
        console.error('Auth check error:', err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (event === 'SIGNED_OUT') {
          setIsAdmin(false);
          setLoading(false);
        } else if (session) {
          const { data: adminData } = await supabase
            .from('admin')
            .select('id')
            .eq('auth_uid', session.user.id)
            .single();
          setIsAdmin(!!adminData);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-seaSalt">
        <Loader2 className="w-8 h-8 text-saffaron animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}