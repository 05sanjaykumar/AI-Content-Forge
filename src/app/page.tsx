import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { CallToActionSection } from '@/components/CallToActionSection';
import { Footer } from '@/components/Footer';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16"> {/* Add pt-16 to offset fixed navbar */}
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        {/* You could add other sections here like Testimonials, Pricing, FAQ */}
        <CallToActionSection />
      </main>
      <Footer />
    </div>
  );
}