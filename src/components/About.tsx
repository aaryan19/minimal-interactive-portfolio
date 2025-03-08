
import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

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

    const currentElements = elementsRef.current.filter(Boolean) as HTMLElement[];
    currentElements.forEach((el) => observer.observe(el));

    return () => {
      currentElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-secondary/50">
      <div className="container-custom">
        <h2 
          ref={(el) => (elementsRef.current[0] = el)} 
          className="section-title slide-up"
        >
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="slide-up"
            style={{ transitionDelay: '100ms' }}
          >
            <h3 className="text-2xl font-medium mb-4 tracking-tight">Software Developer with an Interdisciplinary Approach</h3>
            <p className="text-muted-foreground mb-6">
              I'm a passionate software developer with a unique background spanning robotics, graphic design, and artificial intelligence. My interdisciplinary approach allows me to bridge technical knowledge with creative problem-solving.
            </p>
            <p className="text-muted-foreground mb-6">
              With a keen eye for design and deep technical expertise, I develop solutions that are not just functional but also intuitive and aesthetically pleasing. I believe that the best digital experiences happen at the intersection of technology and creativity.
            </p>
            <p className="text-muted-foreground">
              My journey in technology is driven by curiosity and a commitment to continuous learning. I thrive in collaborative environments and am always excited about tackling new challenges.
            </p>
          </div>
          
          <div 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="slide-in-right"
            style={{ transitionDelay: '300ms' }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Software Development</h4>
                <p className="text-sm text-muted-foreground">
                  Full-stack development with modern technologies and best practices
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Robotics</h4>
                <p className="text-sm text-muted-foreground">
                  Hardware integration, control systems, and autonomous navigation
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Graphic Design</h4>
                <p className="text-sm text-muted-foreground">
                  Visual communication, UI/UX design, and creative direction
                </p>
              </div>
              
              <div className="bg-background p-6 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Artificial Intelligence</h4>
                <p className="text-sm text-muted-foreground">
                  Machine learning models, computer vision, and natural language processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
