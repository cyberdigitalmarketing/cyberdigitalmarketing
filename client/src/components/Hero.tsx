import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import dashboardImage from "../assets/dashboard.jpg";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-dark">
      {/* Circuit background overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center mix-blend-screen"
        style={{ 
          backgroundImage: "url('https://pixabay.com/get/gc67f8075ee31703b609912780b5b592c47d34e6ccba2f01c6e275f0ad14b973ce5203094fb7b78ab602fadf6a5ed23d118558c0e149814b2ac9694efed4d6f66_1280.jpg')" 
        }}
      ></div>
      
      {/* Hero content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins text-white leading-tight mb-6">
              Empowering Brands Through <span className="text-gradient">Digital Innovation</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl">
              We help ambitious brands scale through strategic digital marketing solutions tailored to your unique goals and audience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-[#ff3371] hover:bg-[#e62460] text-white font-medium px-8 py-6 rounded-full"
              >
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-8 py-6 rounded-full"
              >
                Our Services
              </Button>
            </div>
            
            <div className="mt-12 flex items-center space-x-6">
              <div className="flex -space-x-2">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Client testimonial" 
                  className="w-10 h-10 rounded-full border-2 border-white" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Client testimonial" 
                  className="w-10 h-10 rounded-full border-2 border-white" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="Client testimonial" 
                  className="w-10 h-10 rounded-full border-2 border-white" 
                />
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <p className="text-sm text-gray-300">Trusted by <span className="font-semibold">200+</span> businesses</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <img 
              src={dashboardImage} 
              alt="Digital Marketing Dashboard Results" 
              className="rounded-xl shadow-2xl neon-shadow-secondary floating w-full max-w-lg mx-auto" 
            />
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg max-w-xs hidden md:block">
              <div className="flex items-start space-x-3">
                <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Sales Growth</h3>
                  <p className="text-gray-600 text-sm">104% increase in monthly sales revenue</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scrolling brands ticker */}
        <div className="mt-20 overflow-hidden py-8 border-t border-b border-white/10">
          <div className="flex space-x-16 animate-pulse items-center">
            <span className="text-white/50 font-medium text-lg whitespace-nowrap">Trusted by leading brands</span>
            <span className="text-white/50 text-xl font-medium">•</span>
            <span className="text-white/70 font-semibold text-lg whitespace-nowrap">TechCorp</span>
            <span className="text-white/50 text-xl font-medium">•</span>
            <span className="text-white/70 font-semibold text-lg whitespace-nowrap">GlobalRetail</span>
            <span className="text-white/50 text-xl font-medium">•</span>
            <span className="text-white/70 font-semibold text-lg whitespace-nowrap">InnovateSolutions</span>
            <span className="text-white/50 text-xl font-medium">•</span>
            <span className="text-white/70 font-semibold text-lg whitespace-nowrap">FintechPro</span>
            <span className="text-white/50 text-xl font-medium">•</span>
            <span className="text-white/70 font-semibold text-lg whitespace-nowrap">EcoVentures</span>
          </div>
        </div>
      </div>
    </section>
  );
}
