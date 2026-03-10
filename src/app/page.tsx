import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import GallerySection from '@/components/GallerySection';
import WhyChooseUs from '@/components/WhyChooseUs';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <GallerySection />
      <WhyChooseUs />
      <OrderForm />
      <Footer />
    </main>
  );
}
