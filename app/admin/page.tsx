'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface QuoteRequest {
  id: string;
  full_name: string;
  phone: string;
  order_type: string;
  quantity_note: string | null;
  message: string | null;
  status: string;
  created_at: string;
  products: { name: string } | null;
}

export default function AdminPage() {
  const [requests, setRequests] = useState<QuoteRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    async function init() {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push('/admin/login');
        return;
      }
      await loadRequests();
    }
    init();
  }, []);

  async function loadRequests() {
    const { data, error } = await supabase
      .from('quote_requests')
      .select('id, full_name, phone, order_type, quantity_note, message, status, created_at, products(name)')
      .order('created_at', { ascending: false });

    if (!error && data) setRequests(data as any);
    setLoading(false);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from('quote_requests').update({ status }).eq('id', id);
    loadRequests();
  }

  const statusColor: Record<string, string> = {
    nouveau: 'bg-gold/15 text-gold',
    contacte: 'bg-graphite/10 text-graphite',
    ferme: 'bg-emerald-100 text-emerald-700',
    perdu: 'bg-red-100 text-red-700',
  };

  return (
    <div className="min-h-screen bg-ivory px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-heading text-2xl font-semibold text-graphite mb-6">Demandes de devis</h1>

        {loading ? (
          <p className="text-graphite/50">Chargement...</p>
        ) : requests.length === 0 ? (
          <p className="text-graphite/50">Aucune demande pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {requests.map((r) => (
              <div key={r.id} className="bg-white border border-graphite/10 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-graphite">{r.full_name}</p>
                    <a href={`tel:${r.phone}`} className="text-sm text-gold">{r.phone}</a>
                  </div>
                  <span className={`text-xs px-2 py-1 font-medium ${statusColor[r.status]}`}>{r.status}</span>
                </div>
                {r.products && <p className="text-sm text-graphite/70">Produit: {r.products.name}</p>}
                <p className="text-sm text-graphite/70">Type: {r.order_type === 'gros' ? 'Gros / Professionnel' : 'Détail'}</p>
                {r.quantity_note && <p className="text-sm text-graphite/70">Quantité: {r.quantity_note}</p>}
                {r.message && <p className="text-sm text-graphite/60 mt-1 italic">"{r.message}"</p>}
                <div className="flex gap-2 mt-3">
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                    className="text-sm border border-graphite/15 px-2 py-1"
                  >
                    <option value="nouveau">Nouveau</option>
                    <option value="contacte">Contacté</option>
                    <option value="ferme">Fermé</option>
                    <option value="perdu">Perdu</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}