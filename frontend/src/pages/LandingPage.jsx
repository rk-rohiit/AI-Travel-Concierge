import CTA from "../components/home/CTA";
import Destinations from "../components/home/Destinations";
import FAQ from "../components/home/FAQ";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import Navbar from "../components/home/Navbar";
import Partners from "../components/home/Partners";
import PopularTrips from "../components/home/PopularTrips";
import Testimonials from "../components/home/Testimonials";


const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <Features /> */}
      <PopularTrips />
      {/* <HowItWorks /> */}
      <Partners />
      <Destinations />
      <Testimonials />
      <FAQ />
      <Footer />
    </>
  );
};

export default LandingPage;