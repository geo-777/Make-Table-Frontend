import Navbar from "./components/Navbar/Navbar_landingpage";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Workflow from "./components/Workflow/Workflow";
import Customers from "./components/Customers/Customers";
import Compare from "./components/Compare/Compare";
import FAQ from "./components/FAQ/FAQ";
import CTA from "./components/CTA/CTA";
import Footer from "./components/Footer/Footer";
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
