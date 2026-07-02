import Navbar from "../components/common/Navbar";
import HeroSection from "../components/landing/HeroSection";
// import FeaturesSection from "../components/landing/FeaturesSection";
import HowItWorks from "../components/landing/HowItWorks";
import StatsSection from "../components/landing/StatsSection";
import CTASection from "../components/landing/CTASection";
import Footer from "../components/common/Footer";

const LandingPage = () => {
  return (
    <div className="bg-slate-50 overflow-hidden">
      <Navbar />
      <HeroSection />
      {/* <FeaturesSection /> */}
      <HowItWorks />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;