import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type CaseStudyProps = {
  image: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  industry: string;
  company: string;
  description: string;
  roi: string;
  delay: number;
};

const CaseStudy = ({ image, tag, tagColor, tagBg, industry, company, description, roi, delay }: CaseStudyProps) => {
  return (
    <motion.div 
      className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <img 
        src={image} 
        alt={`${company} Case Study`} 
        className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300" 
      />
             
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className={`${tagBg} ${tagColor} text-xs font-medium px-3 py-1 rounded-full`}>{tag}</span>
          <span className="text-gray-500 text-sm">{industry}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-2">{company}</h3>
        
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[#3a1d96] font-bold text-xl">{roi}</span>
            <span className="text-gray-500 text-sm ml-1">ROI</span>
          </div>
          
          <a href="#contact" className="text-[#3a1d96] font-medium hover:text-[#2a1570] transition-colors duration-300 inline-flex items-center">
            View details <i className="fas fa-arrow-right ml-2 text-sm"></i>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function CaseStudies() {
  const caseStudies = [
    {
      image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      tag: "SEO & PPC",
      tagColor: "text-[#3a1d96]",
      tagBg: "bg-[#3a1d96]/10",
      industry: "Tech Industry",
      company: "TechVentures Inc.",
      description: "Increased organic traffic by 87% and doubled lead generation through targeted SEO and PPC campaigns.",
      roi: "143%",
      delay: 1
    },
    {
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      tag: "E-commerce",
      tagColor: "text-[#ff3371]",
      tagBg: "bg-[#ff3371]/10",
      industry: "Retail Industry",
      company: "GlobalRetail",
      description: "Boosted online sales by 156% through strategic social media campaigns and conversion optimization.",
      roi: "217%",
      delay: 2
    },
    {
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500&q=80",
      tag: "Email & CRO",
      tagColor: "text-[#00e6c3]",
      tagBg: "bg-[#00e6c3]/10",
      industry: "Finance Industry",
      company: "FinTech Pro",
      description: "Increased app signups by 92% through targeted email campaigns and landing page optimization.",
      roi: "189%",
      delay: 3
    }
  ];

  return (
    <section id="case-studies" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#3a1d96] font-medium uppercase tracking-wide">Success Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mt-2 mb-4">
            Our Client <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how we've helped businesses like yours achieve remarkable growth through strategic digital marketing.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudy key={index} {...study} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button 
            className="bg-[#1e1e24] hover:bg-[#2d2d36] text-white font-medium px-8 py-6 rounded-full"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Become Our Next Success Story
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
