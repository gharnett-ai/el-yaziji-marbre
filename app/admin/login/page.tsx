'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Connexion...');

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(`Erreur: ${error.message}`);
    } else {
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-graphite flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="bg-white p-8">
          <h1 className="font-heading text-2xl font-semibold text-graphite mb-6 text-center">Espace Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-graphite/70 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-graphite/70 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
              />
            </div>
            <button type="submit" className="w-full bg-graphite text-white py-2.5 font-semibold hover:bg-graphite-light transition">
              Se connecter
            </button>
            {message && <p className="text-sm text-center text-graphite/70 mt-2">{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}