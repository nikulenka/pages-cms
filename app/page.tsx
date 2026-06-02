import About from "@/components/About";
import Activities from "@/components/Activities";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import Houses from "@/components/Houses";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <main>
      <About />
      <Houses />
      <Activities />
      <Gallery />
      <Reviews />
      <Contact />
      <Footer />
    </main>
  );
}
