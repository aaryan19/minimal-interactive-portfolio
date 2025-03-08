
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!parallaxRef.current || !textRef.current) return;
      
      const x = (window.innerWidth - e.pageX * 2) / 100;
      const y = (window.innerHeight - e.pageY * 2) / 100;
      
      parallaxRef.current.style.transform = `translateX(${x}px) translateY(${y}px)`;
      textRef.current.style.transform = `translateX(${x * 0.5}px) translateY(${y * 0.5}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center opacity-70"
          style={{ 
            backgroundImage: `url('/lovable-uploads/dda52f04-de48-45ea-9d2c-c40444280f7c.png')`,
            filter: 'grayscale(30%)'
          }}
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]"></div>
      </div>
      
      <div 
        ref={parallaxRef}
        className="absolute inset-0 z-10 pointer-events-none"
      >
        <div className="absolute top-1/3 left-1/4 w-24 h-24 rounded-full bg-primary/5 blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="container-custom relative z-20">
        <div 
          ref={textRef}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-medium leading-tight mb-6 tracking-tighter">
            Software Developer & Creative Technologist
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Specializing in robotics, AI, and graphic design with a passion for creating innovative technological solutions.
          </p>
          <div className="flex justify-center">
            <button onClick={scrollToAbout} className="btn-primary flex items-center gap-2">
              Explore My Work
              <ArrowDown size={16} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <button 
          onClick={scrollToAbout}
          aria-label="Scroll down"

          className="flex flex-col items-center gap-2 text-sm text-muted-foreground"
        >
          <span>Scroll</span>
          <ArrowDown size={18} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
