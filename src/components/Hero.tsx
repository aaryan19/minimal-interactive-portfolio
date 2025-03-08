
import { useRef } from 'react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section id="home" ref={heroRef} className="relative pt-20 pb-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Hero image container with fixed aspect ratio */}
        <div className="relative mx-auto" style={{ maxWidth: "1000px" }}>
          {/* The aspect ratio container */}
          <div className="relative w-full" style={{ paddingBottom: "43%" }}>
            <img 
              src="/lovable-uploads/acd11440-4883-4b2a-a76b-34aadd263c90.png" 
              alt="Aaryan Shrestha in mountains" 
              className="absolute inset-0 w-full h-full object-cover"
            />
            
            {/* Name overlay on the bottom of the image */}
            <div className="absolute bottom-4 right-4 text-white text-right">
              <h1 className="text-2xl font-medium tracking-wider">AARYAN SHRESTHA</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
