import { Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="border-b border-graphite/10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="font-heading text-2xl font-semibold text-graphite">El Yaziji</a>
          <nav className="flex items-center gap-6 text-sm font-medium text-graphite/70">
            <a href="/catalogue" className="hover:text-graphite">Catalogue</a>
            <a href="/contact" className="text-graphite">Contact</a>
            <a href="/devis" className="bg-gold text-white px-4 py-2 hover:bg-gold/90">Demander un devis</a>
          </nav>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-heading text-3xl font-semibold text-graphite mb-8 text-center">Contactez-nous</h1>

        <div className="bg-white border border-graphite/10 p-8 space-y-6">
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-gold shrink-0 mt-1" />
            <div>
              <p className="font-medium text-graphite">Téléphone</p>
              <a href="tel:0668547424" className="text-graphite/60">06 68 54 74 24</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-gold shrink-0 mt-1" />
            <div>
              <p className="font-medium text-graphite">Adresse</p>
              <p className="text-graphite/60">8HJG+QF, Béni Mellal, Maroc</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Clock className="w-6 h-6 text-gold shrink-0 mt-1" />
            <div>
              <p className="font-medium text-graphite">Horaires</p>
              <p className="text-graphite/60">Lundi - Samedi, 8h30 - 18h30</p>
            </div>
          </div>
        </div>

        
          <a href="https://wa.me/212668547424"
          target="_blank"
          className="block text-center mt-6 bg-graphite text-white py-3 font-semibold hover:bg-graphite-light transition"
        >
          Nous contacter sur WhatsApp
        </a>
      </div>
    </div>
  );
}