'use client';

import { Phone } from 'lucide-react';
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
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-center md:text-left">
        <div>
          <p className="font-logo text-lg text-ivory tracking-widest uppercase">El Yaziji</p>
          <p className="text-ivory/40 text-xs mt-1">{t.tagline}</p>
        </div>

        <div className="flex flex-col items-center md:items-start gap-1">
          <a href="tel:0668547424" dir="ltr" className="hover:text-ivory transition inline-flex items-center gap-2">
            <Phone className="w-4 h-4" /> 06 68 54 74 24
          </a>
          <a href="tel:0634514007" dir="ltr" className="hover:text-ivory transition inline-flex items-center gap-2">
            <Phone className="w-4 h-4" /> 06 34 51 40 07
          </a>
        </div>

        <div className="flex gap-4">
          <a href="https://www.instagram.com/elyaz_stone/" target="_blank" aria-label="Instagram" className="hover:text-ivory transition">
            <svg
  className="w-5 h-5"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  strokeWidth="2"
  strokeLinecap="round"
  strokeLinejoin="round"
  aria-hidden="true"
>
  <rect width="20" height="20" x="2" y="2" rx="5" />
  <circle cx="12" cy="12" r="4" />
  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
</svg>
          </a>
          <a href="https://www.facebook.com/benistoncorp" target="_blank" aria-label="Facebook" className="hover:text-ivory transition">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z" />
            </svg>
          </a>
        </div>

        <p className="text-ivory/40 text-xs">© 2026 El Yaziji Sarl — {t.rights}</p>
      </div>
    </footer>
  );
}