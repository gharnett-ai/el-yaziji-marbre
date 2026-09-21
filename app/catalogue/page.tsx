'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  color: string | null;
  photos: string[] | null;
}

const content = {
  fr: { title: 'Notre Catalogue', all: 'Tout', marbre: 'Marbre', granite: 'Granite', loading: 'Chargement...', empty: 'Aucun produit disponible pour le moment dans cette catégorie.', quote: 'Demander un devis' },
  ar: { title: 'الكتالوج', all: 'الكل', marbre: 'رخام', granite: 'جرانيت', loading: 'جار التحميل...', empty: 'لا يوجد منتج متاح حاليًا في هذه الفئة.', quote: 'طلب عرض سعر' },
  en: { title: 'Our Catalogue', all: 'All', marbre: 'Marble', granite: 'Granite', loading: 'Loading...', empty: 'No products available in this category yet.', quote: 'Request a quote' },
};

export default function CataloguePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'marbre' | 'granite'>('all');
  const supabase = createClient();
  const { lang } = useLanguage();
  const t = content[lang];

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
      <Header />

      <div className="max-w-5xl mx-auto px-6 py-10 md:py-12">
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-graphite mb-6">{t.title}</h1>

        <div className="flex gap-2 mb-8 flex-wrap">
          <button onClick={() => setFilter('all')} className={`px-4 py-2 text-sm font-medium border ${filter === 'all' ? 'bg-graphite text-white border-graphite' : 'border-graphite/20 text-graphite/60'}`}>{t.all}</button>
          <button onClick={() => setFilter('marbre')} className={`px-4 py-2 text-sm font-medium border ${filter === 'marbre' ? 'bg-graphite text-white border-graphite' : 'border-graphite/20 text-graphite/60'}`}>{t.marbre}</button>
          <button onClick={() => setFilter('granite')} className={`px-4 py-2 text-sm font-medium border ${filter === 'granite' ? 'bg-graphite text-white border-graphite' : 'border-graphite/20 text-graphite/60'}`}>{t.granite}</button>
        </div>

        {loading ? (
          <p className="text-graphite/50">{t.loading}</p>
        ) : products.length === 0 ? (
          <p className="text-graphite/50">{t.empty}</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
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
                  <a href={`/devis?product=${p.id}`} className="inline-block mt-3 text-sm text-gold font-medium">{t.quote} &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}