import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  company: z.string().min(2, { message: "Company name is required" }),
  service: z.string().min(1, { message: "Please select a service" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  consent: z.boolean().refine(val => val === true, { message: "You must agree to the privacy policy" })
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      service: "",
      message: "",
      consent: false
    }
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/contact', data);
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
                  <i className="fas fa-map-marker-alt text-[#3a1d96]"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Visit Us</h4>
                  <p className="text-gray-600">123 Digital Avenue, Suite 200<br />Tech City, CA 12345</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#3a1d96]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <i className="fas fa-envelope text-[#3a1d96]"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Email Us</h4>
                  <p className="text-gray-600">hello@cyberdigitalmarketing.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-[#3a1d96]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4">
                  <i className="fas fa-phone-alt text-[#3a1d96]"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Call Us</h4>
                  <p className="text-gray-600">(555) 123-4567</p>
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
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Full Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-medium">Email Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="john@example.com" 
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Company Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Company" 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Service You're Interested In</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="seo">Search Engine Optimization</SelectItem>
                          <SelectItem value="ppc">Paid Advertising (PPC)</SelectItem>
                          <SelectItem value="social">Social Media Management</SelectItem>
                          <SelectItem value="email">Email Marketing</SelectItem>
                          <SelectItem value="cro">Conversion Optimization</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel className="text-gray-700 font-medium">Your Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project and goals..." 
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-[#3a1d96]" 
                          rows={4} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem className="mb-6 flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="rounded text-[#3a1d96] focus:ring-[#3a1d96]"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-gray-700">
                          I agree to the privacy policy and terms of service
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:bg-[#2a1570] text-white font-medium py-3 rounded-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
