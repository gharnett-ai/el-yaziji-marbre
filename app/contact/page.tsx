'use client';

import { Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

const content = {
  fr: { title: 'Contactez-nous', phone: 'Téléphone', address: 'Adresse', addressVal: '8HJG+QF, Béni Mellal, Maroc', hours: 'Horaires', hoursVal: 'Lundi - Samedi, 8h30 - 18h30', whatsapp: 'Nous contacter sur WhatsApp' },
  ar: { title: 'اتصل بنا', phone: 'الهاتف', address: 'العنوان', addressVal: '8HJG+QF، بني ملال، المغرب', hours: 'ساعات العمل', hoursVal: 'الإثنين - السبت، 8:30 - 18:30', whatsapp: 'تواصل معنا عبر واتساب' },
  en: { title: 'Contact Us', phone: 'Phone', address: 'Address', addressVal: '8HJG+QF, Beni Mellal, Morocco', hours: 'Hours', hoursVal: 'Monday - Saturday, 8:30 AM - 6:30 PM', whatsapp: 'Contact us on WhatsApp' },
};

export default function ContactPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16">
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-graphite mb-8 text-center">{t.title}</h1>

        <div className="bg-white border border-graphite/10 p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-gold shrink-0 mt-1" />
            <div>
              <p className="font-medium text-graphite">{t.phone}</p>
              <a href="tel:0668547424" className="text-graphite/60">06 68 54 74 24</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
            <div>
              <p className="font-medium text-graphite">{t.address}</p>
              <p className="text-graphite/60">{t.addressVal}</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-gold shrink-0 mt-1" />
            <div>
              <p className="font-medium text-graphite">{t.hours}</p>
              <p className="text-graphite/60">{t.hoursVal}</p>
            </div>
          </div>
        </div>

        
          <a href="https://wa.me/212668547424"
          target="_blank"
          className="block text-center mt-6 bg-graphite text-white py-3 font-semibold hover:bg-graphite-light transition"
        >
          {t.whatsapp}
        </a>
      </div>

      <Footer />
    </div>
  );
}