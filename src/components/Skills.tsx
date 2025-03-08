
import { useEffect, useRef } from 'react';

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["JavaScript", "TypeScript", "Python", "C++", "Java"]
  },
  {
    title: "Web Technologies",
    skills: ["React", "Node.js", "Next.js", "Three.js", "WebGL", "HTML5/CSS3"]
  },
  {
    title: "Robotics",
    skills: ["ROS", "Sensor Integration", "Computer Vision", "Control Systems", "Arduino"]
  },
  {
    title: "Design",
    skills: ["Figma", "Adobe Creative Suite", "UI/UX", "3D Modeling", "Motion Graphics"]
  },
  {
    title: "AI & ML",
    skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision", "Reinforcement Learning"]
  }
];

const Skills = () => {
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
    <section id="skills" ref={sectionRef} className="py-24">
      <div className="container-custom">
        <h2 
          ref={(el) => (elementsRef.current[0] = el)} 
          className="section-title slide-up"
        >
          Skills & Expertise
        </h2>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={category.title}
              ref={(el) => (elementsRef.current[index + 1] = el)} 
              className="scale-in"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-secondary p-8 rounded-lg h-full">
                <h3 className="text-xl font-medium mb-4">{category.title}</h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary/70"></div>
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
