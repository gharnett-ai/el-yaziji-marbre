'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-graphite/10">
      <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-heading text-2xl font-semibold text-graphite">El Yaziji</a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-graphite/70">
          <a href="/catalogue" className="hover:text-graphite transition">Catalogue</a>
          <a href="/contact" className="hover:text-graphite transition">Contact</a>
          <a href="/devis" className="bg-gold text-white px-4 py-2 hover:bg-gold/90 transition">Demander un devis</a>
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-graphite" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="md:hidden border-t border-graphite/10 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-graphite/70 bg-ivory">
          <a href="/catalogue" onClick={() => setOpen(false)}>Catalogue</a>
          <a href="/contact" onClick={() => setOpen(false)}>Contact</a>
          <a href="/devis" onClick={() => setOpen(false)} className="bg-gold text-white px-4 py-2 text-center">Demander un devis</a>
        </nav>
      )}
    </div>
  );
}