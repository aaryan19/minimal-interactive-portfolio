
import { useState, useEffect, useRef } from 'react';

const projects = [
  {
    id: 1,
    title: "AI-Powered Robotics Interface",
    description: "An intuitive interface for controlling robotic systems using artificial intelligence. This project combines cutting-edge AI algorithms with user-friendly design principles to create a seamless robotics control experience.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1024&auto=format&fit=crop",
    imagePosition: { top: '10%', left: '15%' }
  },
  {
    id: 2,
    title: "Interactive Data Visualization",
    description: "A comprehensive data visualization platform featuring real-time analytics and interactive elements. Designed for complex datasets, this project makes information accessible through innovative visual representations.",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1024&auto=format&fit=crop",
    imagePosition: { top: '25%', left: '20%' }
  },
  {
    id: 3,
    title: "Autonomous Drone Navigation",
    description: "An advanced drone navigation system that uses computer vision to enable autonomous flight in complex environments. This project combines hardware integration with sophisticated software algorithms.",
    imageUrl: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=1024&auto=format&fit=crop",
    imagePosition: { top: '5%', left: '25%' }
  }
];

const ProjectsScroll = () => {
  const [activeProject, setActiveProject] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        } else {
          setIsInView(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let lastTime = Date.now();
    const minScrollTime = 1000; // 1 second cooldown for scroll
    
    const handleScroll = () => {
      if (!isInView || scrollLocked) return;
      
      const now = Date.now();
      const scrollY = window.scrollY;
      const isScrollingDown = scrollY > lastScrollY;
      
      // Check if enough time has passed since last scroll action
      if (now - lastTime < minScrollTime) return;
      
      if (isScrollingDown && activeProject < projects.length - 1) {
        setScrollLocked(true);
        setActiveProject(prev => prev + 1);
        lastTime = now;
        
        // Disable further scrolling for a short duration
        setTimeout(() => setScrollLocked(false), minScrollTime);
        
        // Prevent default scroll if we're handling the transition
        if (sectionRef.current) {
          window.scrollTo({
            top: window.scrollY,
            behavior: 'auto'
          });
        }
      } else if (!isScrollingDown && activeProject > 0) {
        setScrollLocked(true);
        setActiveProject(prev => prev - 1);
        lastTime = now;
        
        setTimeout(() => setScrollLocked(false), minScrollTime);
        
        if (sectionRef.current) {
          window.scrollTo({
            top: window.scrollY,
            behavior: 'auto'
          });
        }
      }
      
      lastScrollY = scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeProject, isInView, scrollLocked]);

  return (
    <section 
      id="projects-scroll" 
      ref={sectionRef} 
      className="min-h-screen relative overflow-hidden py-24"
    >
      <div className="container mx-auto px-4 relative h-[80vh]">
        <h2 className="section-title mb-16 text-center">Featured Projects</h2>
        
        <div className="absolute inset-0 flex items-center">
          {/* Background elements that stay fixed */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute left-0 top-0 w-1/2 h-full border-r border-dashed border-muted-foreground/20"></div>
            
            {/* Vertical hanging strings for all projects */}
            {projects.map((project, idx) => (
              <div 
                key={`string-${idx}`}
                className="absolute w-0.5 bg-gradient-to-b from-muted-foreground/60 to-transparent h-[70%]"
                style={{ 
                  left: `calc(${project.imagePosition.left})`, 
                  top: '0',
                  opacity: activeProject === idx ? 1 : 0.2,
                  transition: 'opacity 0.5s ease-in-out'
                }}
              ></div>
            ))}
          </div>
          
          {/* Project content container */}
          <div className="w-full relative">
            {projects.map((project, idx) => (
              <div 
                key={project.id}
                ref={el => projectRefs.current[idx] = el}
                className={`flex flex-col md:flex-row items-center justify-between transition-all duration-1000 absolute inset-0 ${
                  activeProject === idx 
                    ? 'opacity-100 translate-y-0' 
                    : activeProject > idx 
                      ? 'opacity-0 -translate-y-full' 
                      : 'opacity-0 translate-y-full'
                }`}
              >
                {/* Left side - Hanging image */}
                <div className="md:w-1/2 relative h-[50vh] md:h-full">
                  <div 
                    className="absolute transition-all duration-700"
                    style={{ 
                      top: project.imagePosition.top,
                      left: project.imagePosition.left,
                      transform: 'perspective(1000px) rotateX(5deg)',
                      transformOrigin: 'top center'
                    }}
                  >
                    <div className="relative">
                      {/* Image with shadow */}
                      <img 
                        src={project.imageUrl} 
                        alt={project.title} 
                        className="rounded-lg shadow-2xl max-w-[280px] md:max-w-[360px] object-cover aspect-[4/3]"
                      />
                      
                      {/* Hanging pin */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3 w-4 h-4 bg-primary rounded-full"></div>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Project description */}
                <div className="md:w-1/2 px-6 py-8 md:p-10 bg-secondary/50 backdrop-blur-sm rounded-lg">
                  <h3 className="text-2xl md:text-3xl font-medium mb-4">{project.title}</h3>
                  <p className="text-muted-foreground mb-6">{project.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary"></span>
                    <span className="text-sm text-muted-foreground">Project {idx + 1} of {projects.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Navigation indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {projects.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => setActiveProject(idx)} 
              className={`w-3 h-3 rounded-full transition-colors ${
                activeProject === idx ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              aria-label={`Go to project ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsScroll;
