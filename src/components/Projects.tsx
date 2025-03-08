
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const projects = [
  {
    title: "AI-Powered Robotics Interface",
    description: "An intuitive interface for controlling robotic systems using AI, featuring natural language processing for command interpretation.",
    category: "Robotics & AI",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=1024&auto=format&fit=crop"
  },
  {
    title: "Interactive Data Visualization Platform",
    description: "A WebGL-based platform for visualizing complex datasets with smooth animations and interactive features.",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1548611716-4ae13260d30c?q=80&w=1024&auto=format&fit=crop"
  },
  {
    title: "Autonomous Drone Navigation System",
    description: "A computer vision system enabling drones to navigate complex environments autonomously.",
    category: "Robotics & Computer Vision",
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=1024&auto=format&fit=crop"
  },
  {
    title: "Minimalist Brand Identity System",
    description: "A comprehensive brand identity system featuring clean typography and versatile design elements.",
    category: "Graphic Design",
    image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1024&auto=format&fit=crop"
  },
  {
    title: "Smart Home Automation Interface",
    description: "A user-friendly interface for controlling smart home devices with voice commands and customizable routines.",
    category: "IoT & UI Design",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=80&w=1024&auto=format&fit=crop"
  },
  {
    title: "Neural Network Visualization Tool",
    description: "An educational tool for visualizing how neural networks process and transform data.",
    category: "AI & Education",
    image: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1024&auto=format&fit=crop"
  }
];

const Projects = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSlideChange = (direction: 'next' | 'prev') => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % projects.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  const visibleProjects = () => {
    // Calculate how many projects to show based on current index
    const result = [];
    const itemsToShow = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (activeIndex + i) % projects.length;
      result.push(projects[index]);
    }
    
    return result;
  };

  return (
    <section id="projects" className="py-24 bg-secondary/50 overflow-hidden">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="section-title slide-up m-0">Featured Projects</h2>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleSlideChange('prev')}
              disabled={isAnimating}
              className="p-2 rounded-full bg-background hover:bg-muted transition-colors disabled:opacity-50"
              aria-label="Previous project"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={() => handleSlideChange('next')}
              disabled={isAnimating}
              className="p-2 rounded-full bg-background hover:bg-muted transition-colors disabled:opacity-50"
              aria-label="Next project"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
        
        <div 
          ref={sliderRef}
          className="relative overflow-hidden"
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1)}%)` }}
          >
            {projects.map((project, index) => (
              <div 
                key={index}
                className="w-full min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1rem)] px-2"
              >
                <div className="bg-background rounded-lg overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs uppercase tracking-wider text-white/90 bg-primary/80 backdrop-blur-sm px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                    <p className="text-muted-foreground text-sm mb-6">{project.description}</p>
                    <a href="#" className="inline-flex items-center gap-2 text-primary/90 hover:text-primary transition-colors group">
                      View Details 
                      <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
