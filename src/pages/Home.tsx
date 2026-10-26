import { About } from '../components/About';
import { Achievements } from '../components/Achievements';
import { Certifications } from '../components/Certifications';
import { Contact } from '../components/Contact';
import { Experience } from '../components/Experience';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Research } from '../components/Research';
import { Skills } from '../components/Skills';

export function Home() {
  return (
    <main id="main">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Certifications />
      <Research />
      <Contact />
    </main>
  );
}
