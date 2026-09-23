'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/lib/LanguageContext';
import { Award, Truck, Globe2 } from 'lucide-react';

const content = {
  fr: {
    kicker: 'Notre histoire',
    title: 'Un leader régional, une ambition nationale',
    intro: "El Yaziji Sarl s'est imposée comme un acteur de référence dans la fourniture de marbre, de granite et de pierres naturelles dans la région de Béni Mellal-Khénifra. Notre engagement envers la qualité et notre connaissance approfondie des matériaux font de nous le partenaire de confiance des particuliers comme des professionnels du bâtiment.",
    p2: "Nous sélectionnons rigoureusement chaque bloc et chaque dalle, en travaillant aussi bien avec des artisans locaux qu'avec des fournisseurs internationaux, pour proposer une gamme qui va des marbres et granites naturels aux pierres frittées de nouvelle génération comme Dekton et Silestone.",
    p3: "Aujourd'hui reconnus dans le centre du Maroc, notre ambition est claire : devenir une référence à l'échelle nationale, puis à l'international, en apportant le savoir-faire marocain de la pierre au-delà de nos frontières.",
    v1: 'Excellence & Qualité',
    v1d: "Chaque pierre est sélectionnée avec la même exigence, qu'il s'agisse d'un petit projet ou d'une commande en gros.",
    v2: 'Fiabilité logistique',
    v2d: 'Une capacité à servir aussi bien les particuliers que les grands chantiers, dans les délais convenus.',
    v3: 'Vision internationale',
    v3d: "De leader régional aujourd'hui à ambition nationale et internationale demain.",
  },
  ar: {
    kicker: 'قصتنا',
    title: 'رائد جهوي، طموح وطني',
    intro: 'ترسخت El Yaziji Sarl كفاعل مرجعي في توريد الرخام والجرانيت والأحجار الطبيعية بجهة بني ملال-خنيفرة. التزامنا بالجودة ومعرفتنا العميقة بالمواد يجعلان منا الشريك الموثوق للأفراد ومحترفي البناء على حد سواء.',
    p2: 'نختار بدقة كل كتلة وكل لوح، بالتعاون مع الحرفيين المحليين والموردين الدوليين، لنقدم تشكيلة تمتد من الرخام والجرانيت الطبيعيين إلى الأحجار المصنعة من الجيل الجديد مثل Dekton و Silestone.',
    p3: 'ومع اعترافنا اليوم في وسط المغرب، فإن طموحنا واضح: أن نصبح مرجعًا على المستوى الوطني، ثم الدولي، حاملين الخبرة المغربية في الحجر إلى ما وراء حدودنا.',
    v1: 'التميز والجودة',
    v1d: 'كل حجر يُختار بنفس الدقة، سواء تعلق الأمر بمشروع صغير أو طلبية بالجملة.',
    v2: 'موثوقية لوجستية',
    v2d: 'القدرة على خدمة الأفراد وأوراش البناء الكبرى في الآجال المتفق عليها.',
    v3: 'رؤية دولية',
    v3d: 'من رائد جهوي اليوم إلى طموح وطني ودولي غدًا.',
  },
  en: {
    kicker: 'Our story',
    title: 'A regional leader, a national ambition',
    intro: 'El Yaziji Sarl has established itself as a benchmark supplier of marble, granite, and natural stone in the Béni Mellal-Khénifra region. Our commitment to quality and deep knowledge of materials make us the trusted partner for homeowners and construction professionals alike.',
    p2: 'We rigorously select every block and slab, working with both local artisans and international suppliers, to offer a range spanning natural marble and granite to next-generation sintered stones like Dekton and Silestone.',
    p3: "Already recognized across central Morocco, our ambition is clear: to become a reference at the national level, and eventually internationally, carrying Moroccan stone craftsmanship beyond our borders.",
    v1: 'Excellence & Quality',
    v1d: 'Every stone is selected with the same rigor, whether for a small project or a bulk order.',
    v2: 'Logistical Reliability',
    v2d: 'The ability to serve both individuals and large construction sites, on agreed timelines.',
    v3: 'International Vision',
    v3d: "From regional leader today to national and international ambition tomorrow.",
  },
};

export default function AboutPage() {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <div className="min-h-screen bg-ivory">
      <Header />

      <div className="bg-graphite text-ivory">
        <div className="max-w-3xl mx-auto px-6 py-16 md:py-20 text-center">
          <p className="text-gold font-medium tracking-widest uppercase text-xs md:text-sm mb-4">{t.kicker}</p>
          <h1 className="font-heading text-3xl md:text-5xl font-semibold leading-tight">{t.title}</h1>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-14 md:py-16 space-y-5 text-graphite/80 leading-relaxed">
        <p>{t.intro}</p>
        <p>{t.p2}</p>
        <p>{t.p3}</p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-16 md:pb-20 grid sm:grid-cols-3 gap-8 md:gap-10 text-center">
        <div className="flex flex-col items-center">
          <Award className="w-8 h-8 text-gold mb-3" strokeWidth={1.5} />
          <h3 className="font-heading text-xl font-semibold text-graphite mb-2">{t.v1}</h3>
          <p className="text-graphite/60 text-sm">{t.v1d}</p>
        </div>
        <div className="flex flex-col items-center">
          <Truck className="w-8 h-8 text-gold mb-3" strokeWidth={1.5} />
          <h3 className="font-heading text-xl font-semibold text-graphite mb-2">{t.v2}</h3>
          <p className="text-graphite/60 text-sm">{t.v2d}</p>
        </div>
        <div className="flex flex-col items-center">
          <Globe2 className="w-8 h-8 text-gold mb-3" strokeWidth={1.5} />
          <h3 className="font-heading text-xl font-semibold text-graphite mb-2">{t.v3}</h3>
          <p className="text-graphite/60 text-sm">{t.v3d}</p>
        </div>
      </div>

      <Footer />
    </div>
  );
}