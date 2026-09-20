'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  color: string | null;
  photos: string[] | null;
}

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'marbre' | 'granite'>('all');
  const supabase = createClient();

  useEffect(() => {
    async function loadProducts() {
      let query = supabase
        .from('products')
        .select('id, name, category, type, color, photos')
        .eq('is_active', true)
        .order('name');

      if (filter !== 'all') {
        query = query.eq('category', filter);
      }

      const { data, error } = await query;
      if (!error && data) setProducts(data);
      setLoading(false);
    }
    setLoading(true);
    loadProducts();
  }, [filter]);

  return (
    <div className="min-h-screen bg-ivory">
      <div className="border-b border-graphite/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="font-heading text-2xl font-semibold text-graphite">El Yaziji</a>
          <nav className="flex items-center gap-6 text-sm font-medium text-graphite/70">
            <a href="/catalogue" className="text-graphite">Catalogue</a>
            <a href="/contact" className="hover:text-graphite">Contact</a>
            <a href="/devis" className="bg-gold text-white px-4 py-2 hover:bg-gold/90">Demander un devis</a>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="font-heading text-3xl font-semibold text-graphite mb-6">Notre Catalogue</h1>

        <div className="flex gap-2 mb-8">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 text-sm font-medium border ${filter === 'all' ? 'bg-graphite text-white border-graphite' : 'border-graphite/20 text-graphite/60'}`}>Tout</button>
          <button onClick={() => setFilter('marbre')} className={`px-4 py-2 text-sm font-medium border ${filter === 'marbre' ? 'bg-graphite text-white border-graphite' : 'border-graphite/20 text-graphite/60'}`}>Marbre</button>
          <button onClick={() => setFilter('granite')} className={`px-4 py-2 text-sm font-medium border ${filter === 'granite' ? 'bg-graphite text-white border-graphite' : 'border-graphite/20 text-graphite/60'}`}>Granite</button>
        </div>

        {loading ? (
          <p className="text-graphite/50">Chargement...</p>
        ) : products.length === 0 ? (
          <p className="text-graphite/50">Aucun produit disponible pour le moment dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-white border border-graphite/10">
                <div className="aspect-square bg-graphite/5 overflow-hidden">
                  {p.photos && p.photos[0] ? (
                    <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-graphite/20 text-xs">Photo</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-graphite">{p.name}</p>
                  {p.color && <p className="text-sm text-graphite/50">{p.color}</p>}
                  <a href={`/devis?product=${p.id}`} className="inline-block mt-3 text-sm text-gold font-medium">Demander un devis &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}