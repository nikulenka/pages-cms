import { getHouses } from '@/lib/content';
import About from '@/components/About';
import Activities from '@/components/Activities';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Houses from '@/components/Houses';
import Reviews from '@/components/Reviews';

export default function Home() {
  const houses = getHouses();

  return (
    <main>
      <About />
      <Houses houses={houses} />
      <Activities />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
