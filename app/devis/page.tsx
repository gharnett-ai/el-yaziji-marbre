'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface Product {
  id: string;
  name: string;
}

export default function DevisPage() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get('product') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [productId, setProductId] = useState(preselectedProduct);
  const [orderType, setOrderType] = useState<'detail' | 'gros'>('detail');
  const [quantityNote, setQuantityNote] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from('products')
      .select('id, name')
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        if (data) setProducts(data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Envoi en cours...');

    const { error } = await supabase.from('quote_requests').insert({
      full_name: fullName,
      phone,
      product_id: productId || null,
      order_type: orderType,
      quantity_note: quantityNote,
      message,
    });

    if (error) {
      setStatus(`Erreur: ${error.message}`);
    } else {
      setStatus('Votre demande a été envoyée ! Nous vous contacterons rapidement.');
      setFullName('');
      setPhone('');
      setQuantityNote('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <div className="border-b border-graphite/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="font-heading text-2xl font-semibold text-graphite">El Yaziji</a>
          <nav className="flex items-center gap-6 text-sm font-medium text-graphite/70">
            <a href="/catalogue" className="hover:text-graphite">Catalogue</a>
            <a href="/contact" className="hover:text-graphite">Contact</a>
          </nav>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-16">
        <h1 className="font-heading text-3xl font-semibold text-graphite mb-2 text-center">Demander un devis</h1>
        <p className="text-graphite/60 text-center mb-8 text-sm">Remplissez ce formulaire, nous vous contacterons rapidement.</p>

        <form onSubmit={handleSubmit} className="bg-white border border-graphite/10 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">Nom complet</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">Téléphone</label>
            <input
              type="tel"
              required
              placeholder="0600000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">Produit (optionnel)</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="">-- Non spécifié --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-2">Type de commande</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('detail')}
                className={`p-2.5 text-sm font-medium border ${orderType === 'detail' ? 'border-gold bg-gold/10 text-gold' : 'border-graphite/15 text-graphite/60'}`}
              >
                Détail
              </button>
              <button
                type="button"
                onClick={() => setOrderType('gros')}
                className={`p-2.5 text-sm font-medium border ${orderType === 'gros' ? 'border-gold bg-gold/10 text-gold' : 'border-graphite/15 text-graphite/60'}`}
              >
                Gros / Professionnel
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">Quantité approximative</label>
            <input
              type="text"
              placeholder="ex: 20 m²"
              value={quantityNote}
              onChange={(e) => setQuantityNote(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">Message (optionnel)</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-graphite text-white py-2.5 font-semibold hover:bg-graphite-light transition"
          >
            Envoyer la demande
          </button>
          {status && <p className="text-sm text-center text-graphite/70 mt-2">{status}</p>}
        </form>
      </div>
    </div>
  );
}