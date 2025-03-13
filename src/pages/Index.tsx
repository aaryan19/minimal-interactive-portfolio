
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ProjectsScroll from '@/components/ProjectsScroll';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // handles scroll animations aayo
    const handleScrollAnimations = () => {
      const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-in-right, .scale-in');
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('appear');
            }
          });
        },
        { threshold: 0.1 }
      );
      
      animatedElements.forEach((el) => observer.observe(el));
      
      return () => {
        animatedElements.forEach((el) => observer.unobserve(el));
      };
    };
    
    handleScrollAnimations();
    
    // Clean up any scroll locks when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    // Update page title
    document.title = "Aaryan Shrestha | Software Developer & Creative Technologist";
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <ProjectsScroll />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
