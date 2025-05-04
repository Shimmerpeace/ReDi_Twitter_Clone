/*
import { Auth } from '@supabase/auth-ui-react';
import { supabase } from '@/lib/supabase/client';

export default function LoginPage() {
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: 'default' }}
      providers={['github']}
    />
  );
}
  */

"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";


export default function Login() {

const router = useRouter();
    const supabase = createClientComponentClient();
  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleLogin}
        className="bg-gray-800 text-white px-4 py-2 rounded-2xl"
      >
        Login with GitHub
      </button>
    </div>
  );
}
