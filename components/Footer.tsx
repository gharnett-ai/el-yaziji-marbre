'use client';

import { useLanguage } from '@/lib/LanguageContext';

const content = {
  fr: { tagline: 'Marbre et Granite à Béni Mellal', rights: 'Tous droits réservés' },
  ar: { tagline: 'رخام وجرانيت ببني ملال', rights: 'جميع الحقوق محفوظة' },
  en: { tagline: 'Marble and Granite in Beni Mellal', rights: 'All rights reserved' },
};

export default function Footer() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <footer className="bg-graphite text-ivory/70">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-center md:text-left">
        <div>
          <p className="font-heading text-lg text-ivory">El Yaziji Sarl</p>
          <p className="text-ivory/40 text-xs">{t.tagline}</p>
        </div>
        <div className="flex gap-6">
          <a href="https://www.instagram.com/elyaz_stone/" target="_blank" className="hover:text-ivory transition">Instagram</a>
          <a href="https://www.facebook.com/benistoncorp" target="_blank" className="hover:text-ivory transition">Facebook</a>
          <a href="tel:0668547424" className="hover:text-ivory transition">06 68 54 74 24</a>
        </div>
        <p className="text-ivory/40">© 2026 El Yaziji Sarl — {t.rights}</p>
      </div>
    </footer>
  );
}