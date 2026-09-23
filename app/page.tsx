'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Phone, MapPin, Clock, Gem, Package, MapPinned } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

interface Product {
  id: string;
  name: string;
  category: string;
  type: string;
  photos: string[] | null;
}

const content = {
  fr: {
    kicker: 'Marbre & Granite',
    title: 'El Yaziji Sarl — Marbre et Granite à Béni Mellal',
    subtitle: 'Vente au détail et en gros de dalles, carrelages et plans de travail en marbre et granite, pour particuliers et professionnels.',
    ctaDevis: 'Demander un devis',
    ctaCatalogue: 'Voir le catalogue',
    featured: 'Nos produits en vedette',
    quality: 'Qualité',
    qualityDesc: 'Des pierres sélectionnées pour leur qualité et leur beauté naturelle.',
    retailBulk: 'Détail & Gros',
    retailBulkDesc: 'Vente adaptée aux particuliers comme aux professionnels du bâtiment.',
    based: 'Basé à Béni Mellal',
    basedDesc: 'Une entreprise locale au service de la région Béni Mellal-Khénifra.',
    phone: 'Téléphone',
    address: 'Adresse',
    addressVal: 'Béni Mellal, Maroc',
    hours: 'Horaires',
    hoursVal: 'Lun-Sam, 8h30 - 18h30',
  },
  ar: {
    kicker: 'رخام وجرانيت',
    title: 'El Yaziji Sarl — رخام وجرانيت ببني ملال',
    subtitle: 'بيع بالتقسيط والجملة للألواح والبلاط وأسطح العمل من الرخام والجرانيت، للأفراد والمحترفين.',
    ctaDevis: 'طلب عرض سعر',
    ctaCatalogue: 'عرض الكتالوج',
    featured: 'منتجاتنا المميزة',
    quality: 'الجودة',
    qualityDesc: 'أحجار مختارة لجودتها وجمالها الطبيعي.',
    retailBulk: 'تفصيل وجملة',
    retailBulkDesc: 'بيع يناسب الأفراد ومحترفي البناء.',
    based: 'مقرنا ببني ملال',
    basedDesc: 'شركة محلية في خدمة جهة بني ملال خنيفرة.',
    phone: 'الهاتف',
    address: 'العنوان',
    addressVal: 'بني ملال، المغرب',
    hours: 'ساعات العمل',
    hoursVal: 'الإثنين-السبت، 8:30 - 18:30',
  },
  en: {
    kicker: 'Marble & Granite',
    title: 'El Yaziji Sarl — Marble and Granite in Beni Mellal',
    subtitle: 'Retail and wholesale sale of marble and granite slabs, tiles, and countertops, for individuals and professionals.',
    ctaDevis: 'Request a Quote',
    ctaCatalogue: 'View Catalogue',
    featured: 'Featured Products',
    quality: 'Quality',
    qualityDesc: 'Stones selected for their quality and natural beauty.',
    retailBulk: 'Retail & Bulk',
    retailBulkDesc: 'Sales suited to homeowners and construction professionals alike.',
    based: 'Based in Beni Mellal',
    basedDesc: 'A local business serving the Beni Mellal-Khenifra region.',
    phone: 'Phone',
    address: 'Address',
    addressVal: 'Beni Mellal, Morocco',
    hours: 'Hours',
    hoursVal: 'Mon-Sat, 8:30 AM - 6:30 PM',
  },
};

export default function HomePage() {
  const [featured, setFeatured] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  const { lang } = useLanguage();
  const t = content[lang];

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

      <div className="relative overflow-hidden bg-graphite">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(168,132,73,0.4), transparent 40%), radial-gradient(circle at 80% 60%, rgba(255,255,255,0.15), transparent 40%)',
          }}
        />
        <div className="relative max-w-5xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32 text-center">
          <p className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm mb-4">{t.kicker}</p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl font-semibold text-ivory leading-tight max-w-3xl mx-auto">
            {t.title}
          </h1>
          <p className="text-ivory/60 mt-5 max-w-xl mx-auto text-base md:text-lg px-2">
            {t.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <a href="/devis" className="bg-gold text-white px-8 py-3 font-medium hover:bg-gold/90 transition">
              {t.ctaDevis}
            </a>
            <a href="/catalogue" className="border border-ivory/30 text-ivory px-8 py-3 font-medium hover:bg-ivory/10 transition">
              {t.ctaCatalogue}
            </a>
          </div>
        </div>
      </div>

      {!loading && featured.length > 0 && (
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-graphite mb-8 text-center">{t.featured}</h2>
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

      <div className="bg-graphite text-ivory">
        <div className="max-w-5xl mx-auto px-6 py-16 md:py-20 grid sm:grid-cols-3 gap-8 md:gap-10 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <Gem className="w-7 h-7 text-gold mb-3" strokeWidth={1.5} />
            <h3 className="font-heading text-xl font-semibold mb-2">{t.quality}</h3>
            <p className="text-ivory/60 text-sm">{t.qualityDesc}</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <Package className="w-7 h-7 text-gold mb-3" strokeWidth={1.5} />
            <h3 className="font-heading text-xl font-semibold mb-2">{t.retailBulk}</h3>
            <p className="text-ivory/60 text-sm">{t.retailBulkDesc}</p>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <MapPinned className="w-7 h-7 text-gold mb-3" strokeWidth={1.5} />
            <h3 className="font-heading text-xl font-semibold mb-2">{t.based}</h3>
            <p className="text-ivory/60 text-sm">{t.basedDesc}</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16 md:py-20">
        <div className="grid sm:grid-cols-3 gap-6 md:gap-8 text-sm">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-graphite">{t.phone}</p>
                            <a href="tel:0668547424" dir="ltr" className="text-graphite/60 inline-block">06 68 54 74 24</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-graphite">{t.address}</p>
              <p className="text-graphite/60">{t.addressVal}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-graphite">{t.hours}</p>
              <p className="text-graphite/60">{t.hoursVal}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}