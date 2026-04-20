import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsBar from './components/StatsBar';
import About from './components/About';
import Services from './components/Services';
import VideoSection from './components/VideoSection';
import VisaTypes from './components/VisaTypes';
import Process from './components/Process';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import InstagramFeed from './components/InstagramFeed';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import './styles/index.css';

export default function App() {
  return (
    <div className="grain-overlay">
      <Navbar />
      <main>
        <Hero />
        {/* <StatsBar /> */}
        <About />
        <Services />
        <VideoSection />
        <VisaTypes />
        <Process />
        <Testimonials />
        <FAQ />
        <InstagramFeed />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
}
