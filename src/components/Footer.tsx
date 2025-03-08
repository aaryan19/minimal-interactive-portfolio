
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 bg-secondary/50 border-t border-border/50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h3 className="text-lg font-medium mb-1">AARYAN SHRESTHA</h3>
            <p className="text-sm text-muted-foreground">Software Developer & Creative Technologist</p>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="#" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a 
              href="#" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:contact@example.com" 
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/30 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} Aaryan Shrestha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
