import { motion } from "framer-motion";

// This version of the contact form is designed for static site generation
// It uses a standard HTML form that posts directly to Formspree
export default function ContactForm() {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[#3a1d96] font-medium uppercase tracking-wide">Contact Us</span>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mt-2 mb-6">
              Let's Discuss Your <span className="text-gradient">Digital Strategy</span>
            </h2>
            
            <p className="text-gray-600 mb-8">
              Ready to transform your digital presence? Fill out the form, and one of our experts will get back to you within 24 hours to discuss how we can help you achieve your business goals.
            </p>
            
            <div className="space-y-6 mb-8">              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#3a1d96]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <i className="fas fa-envelope text-[#3a1d96]"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Email Us</h4>
                  <p className="text-gray-600">cyberdigitalmarketing@protonmail.com</p>
                  <p className="text-xs text-gray-500 mt-1">(All form submissions will be sent to this address)</p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-[#3a1d96] hover:bg-[#2a1570] text-white rounded-full flex items-center justify-center transition-colors duration-300">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[#3a1d96] hover:bg-[#2a1570] text-white rounded-full flex items-center justify-center transition-colors duration-300">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[#3a1d96] hover:bg-[#2a1570] text-white rounded-full flex items-center justify-center transition-colors duration-300">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-[#3a1d96] hover:bg-[#2a1570] text-white rounded-full flex items-center justify-center transition-colors duration-300">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </motion.div>
          
          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Standard HTML form that will work in static site generation */}
            <form 
              action="https://formspree.io/f/mzzrakaw" 
              method="POST" 
              className="bg-white rounded-xl shadow-lg p-8 border border-gray-100"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-gray-700 font-medium">Full Name</label>
                  <input 
                    name="name" 
                    type="text"
                    placeholder="John Doe" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                    required
                  />
                </div>
                
                <div>
                  <label className="text-gray-700 font-medium">Email Address</label>
                  <input 
                    name="email" 
                    type="email"
                    placeholder="john@example.com" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="text-gray-700 font-medium">Phone Number (Optional)</label>
                  <input 
                    name="phone"
                    type="tel"
                    placeholder="(555) 123-4567" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                  />
                </div>
                
                <div>
                  <label className="text-gray-700 font-medium">Company Name</label>
                  <input 
                    name="company"
                    type="text"
                    placeholder="Your Company" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="text-gray-700 font-medium">Your Message</label>
                <textarea 
                  name="message"
                  placeholder="Tell us about your project and goals..." 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                  rows={4} 
                  required
                ></textarea>
              </div>
              
              <div className="mb-6 flex flex-row items-start space-x-3 space-y-0">
                <input 
                  name="consent"
                  type="checkbox"
                  className="rounded text-[#3a1d96] focus:ring-[#3a1d96] mt-1"
                  required
                />
                <div className="space-y-1 leading-none">
                  <label className="text-gray-700">
                    I agree to the privacy policy and terms of service
                  </label>
                </div>
              </div>
              
              {/* Hidden fields for Formspree configuration */}
              <input type="hidden" name="_subject" value="New Website Inquiry" />
              <input type="hidden" name="_template" value="table" />
              
              <button 
                type="submit" 
                className="w-full bg-gradient-primary hover:bg-[#2a1570] text-white font-medium py-3 rounded-lg"
              >
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
