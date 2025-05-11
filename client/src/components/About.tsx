import { motion } from "framer-motion";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6 text-gray-900">
              We're Not Just Another <span className="text-gradient">Marketing Agency</span>
            </h2>
            
            <p className="text-gray-700 mb-6">
              At Cyber Digital Marketing, we understand that every brand has unique challenges and goals. We're not interested in one-size-fits-all solutions—we're interested in what works for <em>you</em>.
            </p>
            
            <p className="text-gray-700 mb-8">
              Our data-driven approach, combined with creative excellence, allows us to deliver measurable results that drive real business growth. We're obsessed with performance and committed to transparency at every step.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="text-[#3a1d96] text-2xl font-bold mb-1">98%</div>
                <p className="text-gray-600">Client retention rate</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="text-[#3a1d96] text-2xl font-bold mb-1">187%</div>
                <p className="text-gray-600">Average ROI increase</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="text-[#3a1d96] text-2xl font-bold mb-1">200+</div>
                <p className="text-gray-600">Brands scaled</p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="text-[#3a1d96] text-2xl font-bold mb-1">24/7</div>
                <p className="text-gray-600">Support & monitoring</p>
              </div>
            </div>
            
            <a href="#services" className="inline-flex items-center text-[#3a1d96] font-semibold hover:text-[#2a1570] transition-colors duration-300">
              Explore our services <i className="fas fa-arrow-right ml-2"></i>
            </a>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Cyber Digital Marketing team" 
              className="rounded-xl shadow-xl" 
            />
                 
            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-[220px] hidden md:block">
              <div className="flex flex-col gap-3">
                <div className="flex justify-center -space-x-2">
                  <img 
                    src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80" 
                    alt="Team member" 
                    className="w-9 h-9 rounded-full border-2 border-white" 
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80" 
                    alt="Team member" 
                    className="w-9 h-9 rounded-full border-2 border-white" 
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=60&h=60&q=80" 
                    alt="Team member" 
                    className="w-9 h-9 rounded-full border-2 border-white" 
                  />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-700 font-semibold">15+ Years Combined Experience</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <div className="mt-24">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <h3 className="text-2xl md:text-3xl font-bold font-poppins mb-4">Our Approach</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven process that combines data-driven insights with creative excellence to deliver exceptional results.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              variants={fadeIn}
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#3a1d96] text-white flex items-center justify-center font-bold">1</div>
              <h4 className="text-xl font-semibold mb-3 mt-2">Discover</h4>
              <p className="text-gray-600">
                We begin by understanding your brand, audience, and business goals through in-depth analysis.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              variants={fadeIn}
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#3a1d96] text-white flex items-center justify-center font-bold">2</div>
              <h4 className="text-xl font-semibold mb-3 mt-2">Strategize</h4>
              <p className="text-gray-600">
                We create a tailored digital strategy aligned with your goals and competitive landscape.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              variants={fadeIn}
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#3a1d96] text-white flex items-center justify-center font-bold">3</div>
              <h4 className="text-xl font-semibold mb-3 mt-2">Execute</h4>
              <p className="text-gray-600">
                We implement campaigns across channels with meticulous attention to detail and optimization.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-gray-50 rounded-xl p-8 border border-gray-100 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              variants={fadeIn}
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 rounded-full bg-[#3a1d96] text-white flex items-center justify-center font-bold">4</div>
              <h4 className="text-xl font-semibold mb-3 mt-2">Optimize</h4>
              <p className="text-gray-600">
                We continuously monitor, analyze, and refine our approach to maximize performance.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
