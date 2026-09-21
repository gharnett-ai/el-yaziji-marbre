'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Phone, MapPin, Clock, Gem, Package, MapPinned } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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
      <Header />

      {/* Hero */}
      <div className="relative overflow-hidden bg-graphite">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(168,132,73,0.4), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.15), transparent 40%)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <p className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm mb-4">Marbre &amp; Granite</p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-semibold text-ivory leading-tight max-w-3xl mx-auto">
            El Yaziji Sarl — Marbre et Granite à Béni Mellal
          </h1>
          <p className="text-ivory/60 mt-5 max-w-xl mx-auto text-base md:text-lg px-2">
            Vente au détail et en gros de dalles, carrelages et plans de travail en marbre et granite, pour particuliers et professionnels.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="/devis" className="bg-gold text-white px-8 py-3 font-medium hover:bg-gold/90 transition">
              Demander un devis
            </a>
            <a href="/catalogue" className="border border-ivory/30 text-ivory px-8 py-3 font-medium hover:bg-ivory/10 transition">
              Voir le catalogue
            </a>
          </div>
        </div>
      </div>

      {/* Featured products */}
      {!loading && featured.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-graphite mb-8 text-center">Nos produits en vedette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {featured.map((p) => (
              <a key={p.id} href="/catalogue" className="block bg-white border border-graphite/10 group overflow-hidden">
                <div className="aspect-square bg-graphite/5 overflow-hidden">
                  {p.photos && p.photos[0] ? (
                    <img src={p.photos[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
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
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 grid sm:grid-cols-3 gap-8 md:gap-10 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <Gem className="w-7 h-7 text-gold mb-3" strokeWidth={1.5} />
            <h3 className="font-heading text-xl font-semibold mb-2">Qualité</h3>
            <p className="text-ivory/60 text-sm">Des pierres sélectionnées pour leur qualité et leur beauté naturelle.</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <Package className="w-7 h-7 text-gold mb-3" strokeWidth={1.5} />
            <h3 className="font-heading text-xl font-semibold mb-2">Détail &amp; Gros</h3>
            <p className="text-ivory/60 text-sm">Vente adaptée aux particuliers comme aux professionnels du bâtiment.</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <MapPinned className="w-7 h-7 text-gold mb-3" strokeWidth={1.5} />
            <h3 className="font-heading text-xl font-semibold mb-2">Basé à Béni Mellal</h3>
            <p className="text-ivory/60 text-sm">Une entreprise locale au service de la région Béni Mellal-Khénifra.</p>
          </div>
        </div>
      </div>

      {/* Contact strip */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="grid sm:grid-cols-3 gap-6 md:gap-8 text-sm">
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

      <Footer />
    </div>
  );
}