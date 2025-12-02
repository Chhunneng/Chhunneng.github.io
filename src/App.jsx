import Hero from './components/Hero';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <div id="home">
          <Hero />
        </div>
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <footer className="bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Chhunneng Chrea. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
