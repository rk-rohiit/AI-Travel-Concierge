import CTA from "../components/home/CTA";
import Destinations from "../components/home/Destinations";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks";
import Navbar from "../components/home/Navbar";
import Testimonials from "../components/home/Testimonials";


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Destinations />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
};

export default LandingPage;