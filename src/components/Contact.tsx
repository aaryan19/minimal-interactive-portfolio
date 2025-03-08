
import { useEffect, useRef, useState } from 'react';
import { useToast } from "@/components/ui/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24">
      <div className="container-custom">
        <h2 
          ref={(el) => (elementsRef.current[0] = el)} 
          className="section-title slide-up text-center"
        >
          Get In Touch
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div 
            ref={(el) => (elementsRef.current[1] = el)} 
            className="slide-up mb-12 text-center"
            style={{ transitionDelay: '100ms' }}
          >
            <p className="text-muted-foreground">
              Have a project in mind or want to collaborate? Feel free to reach out through the form below or connect with me on social media.
            </p>
          </div>
          
          <form 
            ref={(el) => (elementsRef.current[2] = el)} 
            className="slide-up space-y-6"
            style={{ transitionDelay: '200ms' }}
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary rounded-md border-0 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="Your Name"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary rounded-md border-0 focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-secondary rounded-md border-0 focus:ring-2 focus:ring-primary/20 focus:outline-none resize-none"
                placeholder="Your message here..."
              />
            </div>
            
            <div>
              <button 
                type="submit" 
                className="btn-primary w-full md:w-auto"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
