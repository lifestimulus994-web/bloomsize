import Header from "../components/Header";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Programs from "../components/Programs";
import Panels from "../components/Panels";
import Plans from "../components/Plans";
import Roadmap from "../components/Roadmap";
import Banner from "../components/Banner";
import Testimonials from "../components/Testimonials";
import Workouts from "../components/Workouts";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Programs />
        <Panels />
        <Plans />
        <Roadmap />
        <Banner />
        <Testimonials />
        <Workouts />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
