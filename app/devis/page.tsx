'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';

interface Product {
  id: string;
  name: string;
}

const content = {
  fr: {
    title: 'Demander un devis',
    subtitle: 'Remplissez ce formulaire, nous vous contacterons rapidement.',
    fullName: 'Nom complet',
    phone: 'Téléphone',
    product: 'Produit (optionnel)',
    notSpecified: '-- Non spécifié --',
    orderType: 'Type de commande',
    detail: 'Détail',
    gros: 'Gros / Professionnel',
    quantity: 'Quantité approximative',
    quantityPlaceholder: 'ex: 20 m²',
    message: 'Message (optionnel)',
    submit: 'Envoyer la demande',
    sending: 'Envoi en cours...',
    success: 'Votre demande a été envoyée ! Nous vous contacterons rapidement.',
    error: 'Erreur',
  },
  ar: {
    title: 'طلب عرض سعر',
    subtitle: 'املأ هذا النموذج، سنتصل بك في أقرب وقت.',
    fullName: 'الاسم الكامل',
    phone: 'الهاتف',
    product: 'المنتج (اختياري)',
    notSpecified: '-- غير محدد --',
    orderType: 'نوع الطلب',
    detail: 'تقسيط',
    gros: 'جملة / محترف',
    quantity: 'الكمية التقريبية',
    quantityPlaceholder: 'مثال: 20 م²',
    message: 'رسالة (اختياري)',
    submit: 'إرسال الطلب',
    sending: 'جارٍ الإرسال...',
    success: 'تم إرسال طلبك! سنتصل بك قريبًا.',
    error: 'خطأ',
  },
  en: {
    title: 'Request a Quote',
    subtitle: "Fill out this form and we'll get back to you quickly.",
    fullName: 'Full name',
    phone: 'Phone',
    product: 'Product (optional)',
    notSpecified: '-- Not specified --',
    orderType: 'Order type',
    detail: 'Retail',
    gros: 'Bulk / Professional',
    quantity: 'Approximate quantity',
    quantityPlaceholder: 'e.g. 20 m²',
    message: 'Message (optional)',
    submit: 'Send request',
    sending: 'Sending...',
    success: "Your request has been sent! We'll contact you shortly.",
    error: 'Error',
  },
};

function DevisForm() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get('product') || '';
  const { lang } = useLanguage();
  const t = content[lang];

  const [products, setProducts] = useState<Product[]>([]);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [productId, setProductId] = useState(preselectedProduct);
  const [orderType, setOrderType] = useState<'detail' | 'gros'>('detail');
  const [quantityNote, setQuantityNote] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const supabase = createClient();

  useEffect(() => {
    supabase
      .from('products')
      .select('id, name')
      .eq('is_active', true)
      .order('name')
      .then(({ data }) => {
        if (data) setProducts(data);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(t.sending);

    const { error } = await supabase.from('quote_requests').insert({
      full_name: fullName,
      phone,
      product_id: productId || null,
      order_type: orderType,
      quantity_note: quantityNote,
      message,
    });

    if (error) {
      setStatus(`${t.error}: ${error.message}`);
    } else {
      setStatus(t.success);
      setFullName('');
      setPhone('');
      setQuantityNote('');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <div className="max-w-md mx-auto px-6 py-12 md:py-16">
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-graphite mb-2 text-center">{t.title}</h1>
        <p className="text-graphite/60 text-center mb-8 text-sm">{t.subtitle}</p>

        <form onSubmit={handleSubmit} className="bg-white border border-graphite/10 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">{t.fullName}</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">{t.phone}</label>
            <input
              type="tel"
              required
              placeholder="0600000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">{t.product}</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            >
              <option value="">{t.notSpecified}</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-2">{t.orderType}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOrderType('detail')}
                className={`p-2.5 text-sm font-medium border ${orderType === 'detail' ? 'border-gold bg-gold/10 text-gold' : 'border-graphite/15 text-graphite/60'}`}
              >
                {t.detail}
              </button>
              <button
                type="button"
                onClick={() => setOrderType('gros')}
                className={`p-2.5 text-sm font-medium border ${orderType === 'gros' ? 'border-gold bg-gold/10 text-gold' : 'border-graphite/15 text-graphite/60'}`}
              >
                {t.gros}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">{t.quantity}</label>
            <input
              type="text"
              placeholder={t.quantityPlaceholder}
              value={quantityNote}
              onChange={(e) => setQuantityNote(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-graphite/70 mb-1">{t.message}</label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-graphite/15 p-2.5 outline-none focus:ring-2 focus:ring-gold"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-graphite text-white py-2.5 font-semibold hover:bg-graphite-light transition"
          >
            {t.submit}
          </button>
          {status && <p className="text-sm text-center text-graphite/70 mt-2">{status}</p>}
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default function DevisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-ivory" />}>
      <DevisForm />
    </Suspense>
  );
}