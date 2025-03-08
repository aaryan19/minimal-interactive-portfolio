
import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textBannerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      
      if (textBannerRef.current) {
        // Calculate opacity based on scroll position
        const opacity = Math.min(position / 300, 1);
        textBannerRef.current.style.opacity = opacity.toString();
        
        // Calculate translateY for parallax effect
        const translateY = Math.max(0, 50 - position / 5);
        textBannerRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" ref={heroRef} className="relative h-screen overflow-hidden">
      {/* Background Image (fixed ratio container) */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb')`,
            filter: 'grayscale(30%)'
          }}
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90"></div>
      </div>
      
      {/* Foreground Image (fixed ratio container) */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: Math.max(0, 1 - scrollPosition / 400)
        }}
      />
      
      {/* Text Banner that appears on scroll */}
      <div 
        ref={textBannerRef}
        className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-20 text-center px-4 opacity-0 transition-opacity duration-300"
      >
        <div className="bg-background/80 backdrop-blur-md p-8 md:p-12 max-w-4xl mx-auto rounded-lg">
          <h1 className="text-5xl md:text-7xl font-medium leading-tight mb-6 tracking-tighter">
            Software Developer & Creative Technologist
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Specializing in robotics, AI, and graphic design with a passion for creating innovative technological solutions.
          </p>
        </div>
      </div>
      
      {/* Scroll down indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button 
          onClick={scrollToAbout}
          aria-label="Scroll down"
          className="flex flex-col items-center gap-2 text-sm text-white"
        >
          <span>Scroll</span>
          <ArrowDown size={18} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
