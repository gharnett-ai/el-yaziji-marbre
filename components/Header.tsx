'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';

const content = {
  fr: { catalogue: 'Catalogue', contact: 'Contact', devis: 'Demander un devis' },
  ar: { catalogue: 'الكتالوج', contact: 'اتصل بنا', devis: 'طلب عرض سعر' },
  en: { catalogue: 'Catalogue', contact: 'Contact', devis: 'Request a Quote' },
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { lang, setLang } = useLanguage();
  const t = content[lang];

  return (
    <div className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-graphite/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-heading text-2xl font-semibold text-graphite">El Yaziji</a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-graphite/70">
          <a href="/catalogue" className="hover:text-graphite transition">{t.catalogue}</a>
          <a href="/contact" className="hover:text-graphite transition">{t.contact}</a>
          <div className="flex gap-1 border border-graphite/15">
            <button onClick={() => setLang('fr')} className={`px-2 py-1 text-xs font-medium ${lang === 'fr' ? 'bg-graphite text-white' : 'text-graphite/60'}`}>FR</button>
            <button onClick={() => setLang('ar')} className={`px-2 py-1 text-xs font-medium ${lang === 'ar' ? 'bg-graphite text-white' : 'text-graphite/60'}`}>ع</button>
            <button onClick={() => setLang('en')} className={`px-2 py-1 text-xs font-medium ${lang === 'en' ? 'bg-graphite text-white' : 'text-graphite/60'}`}>EN</button>
          </div>
          <a href="/devis" className="bg-gold text-white px-4 py-2 hover:bg-gold/90 transition">{t.devis}</a>
        </nav>

        <button className="md:hidden text-graphite" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-graphite/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-graphite/70 bg-ivory">
          <a href="/catalogue" onClick={() => setOpen(false)}>{t.catalogue}</a>
          <a href="/contact" onClick={() => setOpen(false)}>{t.contact}</a>
          <div className="flex gap-1 border border-graphite/15 w-fit">
            <button onClick={() => setLang('fr')} className={`px-3 py-1.5 text-xs font-medium ${lang === 'fr' ? 'bg-graphite text-white' : 'text-graphite/60'}`}>FR</button>
            <button onClick={() => setLang('ar')} className={`px-3 py-1.5 text-xs font-medium ${lang === 'ar' ? 'bg-graphite text-white' : 'text-graphite/60'}`}>ع</button>
            <button onClick={() => setLang('en')} className={`px-3 py-1.5 text-xs font-medium ${lang === 'en' ? 'bg-graphite text-white' : 'text-graphite/60'}`}>EN</button>
          </div>
          <a href="/devis" onClick={() => setOpen(false)} className="bg-gold text-white px-4 py-2 text-center">{t.devis}</a>
        </nav>
      )}
    </div>
  );
}