import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-mobile";
import { Logo } from "@/components/ui/Logo";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full bg-white/90 backdrop-blur-md z-50 shadow-sm transition-all duration-300 ${
      isScrolled ? "py-2" : "py-4"
    }`}>
      <nav className="container mx-auto px-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-800 hover:text-[#3a1d96] transition-colors duration-300">
              About
            </a>
            <a href="#services" className="text-gray-800 hover:text-[#3a1d96] transition-colors duration-300">
              Services
            </a>
            <a href="#case-studies" className="text-gray-800 hover:text-[#3a1d96] transition-colors duration-300">
              Case Studies
            </a>
            <a href="#contact" className="text-gray-800 hover:text-[#3a1d96] transition-colors duration-300">
              Contact
            </a>
            <Button 
              className="bg-[#3a1d96] hover:bg-[#2a1570] text-white px-6 py-2 rounded-full"
              onClick={() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              onClick={toggleMobileMenu} 
              className="text-gray-700 hover:text-[#3a1d96] focus:outline-none p-1"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && isMobile && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4"
            >
              <div className="flex flex-col space-y-4">
                <a 
                  href="#about" 
                  className="text-gray-800 hover:text-[#3a1d96] transition-colors duration-300 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  About
                </a>
                <a 
                  href="#services" 
                  className="text-gray-800 hover:text-[#3a1d96] transition-colors duration-300 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Services
                </a>
                <a 
                  href="#case-studies" 
                  className="text-gray-800 hover:text-[#3a1d96] transition-colors duration-300 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Case Studies
                </a>
                <a 
                  href="#contact" 
                  className="text-gray-800 hover:text-[#3a1d96] transition-colors duration-300 py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    closeMenu();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Contact
                </a>
                <Button 
                  className="bg-[#3a1d96] hover:bg-[#2a1570] text-white w-full rounded-full"
                  onClick={() => {
                    closeMenu();
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
