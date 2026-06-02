import {
  getHouses, getActivities, getReviews,
  getGeneralSettings, getFaq, getGallery,
} from '@/lib/content';

import Header       from '@/components/Header';
import HeroSlider   from '@/components/HeroSlider';
import Welcome      from '@/components/Welcome';
import WhyUs        from '@/components/WhyUs';
import HomeDetails  from '@/components/HomeDetails';
import Activities   from '@/components/Activities';
import WeddingBlock from '@/components/WeddingBlock';
import Gallery      from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Faq          from '@/components/Faq';
import Prices       from '@/components/Prices';
import Contacts     from '@/components/Contacts';
import Footer       from '@/components/Footer';

export default function Home() {
  const s          = getGeneralSettings();
  const houses     = getHouses();
  const activities = getActivities();
  const reviews    = getReviews();
  const faq        = getFaq();
  const gallery    = getGallery();

  return (
    <>
      <Header phone={s.phone1} />
      <HeroSlider
        images={s.heroImages}
        eyebrow={s.heroEyebrow}
        title={s.heroTitle}
        subtitle={s.heroSubtitle}
      />
      <Welcome      s={s} />
      <WhyUs />
      <HomeDetails  houses={houses} />
      <Activities   activities={activities} />
      <WeddingBlock s={s} />
      <Gallery      images={gallery} />
      <Testimonials reviews={reviews} />
      <Faq          items={faq} />
      <Prices       s={s} />
      <Contacts     s={s} />
      <Footer       s={s} />
    </>
  );
}
