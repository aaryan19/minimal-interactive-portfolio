
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
  }
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<(HTMLElement | null)[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
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

    const currentElements = projectsRef.current.filter(Boolean) as HTMLElement[];
    currentElements.forEach((el) => observer.observe(el));

    return () => {
      currentElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-secondary/50">
      <div className="container-custom">
        <h2 
          ref={(el) => (projectsRef.current[0] = el)} 
          className="section-title slide-up"
        >
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={project.title}
              ref={(el) => (projectsRef.current[index + 1] = el)} 
              className="slide-up group"
              style={{ transitionDelay: `${index * 150}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="bg-background rounded-lg overflow-hidden h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
                    style={{ 
                      backgroundImage: `url(${project.image})`,
                      transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                  <div className="absolute inset-0 bg-primary/30"></div>
                  <div className="absolute top-4 left-4">
                    <span className="text-xs uppercase tracking-wider text-white/90 bg-primary/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-medium mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 flex-grow">{project.description}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-primary/90 hover:text-primary transition-colors group">
                    View Details 
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div 
          ref={(el) => (projectsRef.current[projects.length + 1] = el)} 
          className="fade-in mt-12 text-center"
        >
          <a href="#" className="btn-primary inline-flex items-center gap-2">
            View All Projects
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
