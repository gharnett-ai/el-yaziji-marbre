'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Phone, MapPin, Clock } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  photos: string[] | null;
}

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function loadFeatured() {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, category, type, photos')
        .eq('is_featured', true)
        .limit(4);

      if (!error && data) setFeatured(data);
      setLoading(false);
    }
    loadFeatured();
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="border-b border-graphite/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="font-heading text-2xl font-semibold text-graphite">El Yaziji</span>
          <nav className="flex items-center gap-6 text-sm font-medium text-graphite/70">
            <a href="/catalogue" className="hover:text-graphite">Catalogue</a>
            <a href="/contact" className="hover:text-graphite">Contact</a>
            <a href="/devis" className="bg-gold text-white px-4 py-2 hover:bg-gold/90">Demander un devis</a>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-16 text-center">
        <p className="text-gold font-medium tracking-widest uppercase text-sm mb-3">Marbre &amp; Granite</p>
        <h1 className="font-heading text-4xl md:text-5xl font-semibold text-graphite leading-tight max-w-2xl mx-auto">
          El Yaziji Sarl — Marbre et Granite à Béni Mellal
        </h1>
        <p className="text-graphite/60 mt-5 max-w-xl mx-auto text-lg">
          Vente au détail et en gros de dalles, carrelages et plans de travail en marbre et granite, pour particuliers et professionnels.
        </p>
        <a href="/devis" className="inline-block mt-8 bg-graphite text-white px-8 py-3 font-medium hover:bg-graphite-light transition">
          Demander un devis
        </a>
      </div>

      {/* Featured products */}
      {!loading && featured.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <h2 className="font-heading text-2xl font-semibold text-graphite mb-6 text-center">Nos produits en vedette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => (
              <a key={p.id} href={`/catalogue`} className="block bg-white border border-graphite/10 group">
                <div className="aspect-square bg-graphite/5 overflow-hidden">
                  {p.photos && p.photos[0] ? (
                    <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-graphite/20 text-xs">Photo</div>
                  )}
                </div>
                <p className="p-3 text-sm font-medium text-graphite">{p.name}</p>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* About strip */}
      <div className="bg-graphite text-ivory">
        <div className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">Qualité</h3>
            <p className="text-ivory/70 text-sm">Des pierres sélectionnées pour leur qualité et leur beauté naturelle.</p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">Détail &amp; Gros</h3>
            <p className="text-ivory/70 text-sm">Vente adaptée aux particuliers comme aux professionnels du bâtiment.</p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold mb-2">Basé à Béni Mellal</h3>
            <p className="text-ivory/70 text-sm">Une entreprise locale au service de la région Béni Mellal-Khénifra.</p>
          </div>
        </div>
      </div>

      {/* Contact strip */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-graphite">Téléphone</p>
              <a href="tel:0668547424" className="text-graphite/60">06 68 54 74 24</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-graphite">Adresse</p>
              <p className="text-graphite/60">Béni Mellal, Maroc</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-graphite">Horaires</p>
              <p className="text-graphite/60">Lun-Sam, 8h30 - 18h30</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}