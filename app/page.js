import Header from "../components/Header";
import Hero from "../components/Hero";
import Programs from "../components/Programs";
import Panels from "../components/Panels";
import Plans from "../components/Plans";
import Roadmap from "../components/Roadmap";
import Faq from "../components/Faq";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Programs />
        <Panels />
        <Plans />
        <Roadmap />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
