import Navbar from "./components/Navbar/Navbar_landingpage";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Workflow from "./components/Workflow/Workflow";
import Customers from "./components/Customers/Customers";
import Compare from "./components/Compare/Compare";
import FAQ from "./components/FAQ/FAQ";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";
export const easeOut = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut, delay: i * 0.06 },
  }),
};
const LandingPage = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <Features />
      <Workflow />
      <Customers />
      <Compare />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
