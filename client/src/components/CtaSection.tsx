import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-[#3a1d96] to-[#2a1570] text-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
              Ready to Supercharge Your <span className="text-[#ff3371]">Digital Growth?</span>
            </h2>
            
            <p className="text-white/80 text-lg mb-8">
              Let's discuss how our tailored digital marketing strategies can help you achieve your business goals and drive measurable results.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-[#3a1d96] hover:bg-gray-100 font-medium px-8 py-6 rounded-full"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started Now
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium px-8 py-6 rounded-full"
                onClick={() => {
                  document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Case Studies
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Client testimonial" 
                  className="w-16 h-16 rounded-full border-2 border-white" 
                />
              </div>
              <div>
                <h4 className="font-semibold">Sarah Johnson</h4>
                <p className="text-white/70 text-sm">Marketing Director, TechVentures Inc.</p>
              </div>
            </div>
            
            <blockquote className="text-white/90 italic mb-6">
              "Working with Cyber Digital Marketing transformed our online presence. Their strategic approach to SEO and paid campaigns increased our leads by 143% in just three months. Their team is responsive, knowledgeable, and truly cares about our success."
            </blockquote>
            
            <div className="flex items-center text-yellow-400">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
