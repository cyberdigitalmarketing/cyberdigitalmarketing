import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

type ServiceCardProps = {
  icon: string;
  iconColor: string;
  bgColor: string;
  title: string;
  description: string;
  features: string[];
  delay: number;
};

const ServiceCard = ({ icon, iconColor, bgColor, title, description, features, delay }: ServiceCardProps) => {
  return (
    <motion.div 
      className="service-card bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:border-[#3a1d96]/30"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
    >
      <div className={`service-icon w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center mb-6`}>
        <i className={`fas ${icon} ${iconColor} text-2xl`}></i>
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      <a href="#contact" className="text-[#3a1d96] font-medium hover:text-[#2a1570] transition-colors duration-300 inline-flex items-center">
        Learn more <i className="fas fa-arrow-right ml-2 text-sm"></i>
      </a>
    </motion.div>
  );
};

export default function Services() {
  const services = [
    {
      icon: "fa-search",
      iconColor: "text-[#3a1d96]",
      bgColor: "bg-[#3a1d96]/10",
      title: "Search Engine Optimization",
      description: "Boost your organic visibility with our data-driven SEO strategies that drive qualified traffic and improve rankings.",
      features: [
        "Keyword research & strategy",
        "On-page & technical SEO",
        "Content optimization"
      ],
      delay: 1
    },
    {
      icon: "fa-ad",
      iconColor: "text-[#ff3371]",
      bgColor: "bg-[#ff3371]/10",
      title: "Paid Advertising (PPC)",
      description: "Maximize ROI with strategic paid campaigns across search, social, and display networks to reach your ideal audience.",
      features: [
        "Google & Bing Ads",
        "Social media advertising",
        "Retargeting campaigns"
      ],
      delay: 2
    },
    {
      icon: "fa-share-alt",
      iconColor: "text-[#00e6c3]",
      bgColor: "bg-[#00e6c3]/10",
      title: "Social Media Management",
      description: "Build a strong social presence with strategic content that engages your audience and strengthens brand loyalty.",
      features: [
        "Content strategy & creation",
        "Community management",
        "Analytics & reporting"
      ],
      delay: 3
    },
    {
      icon: "fa-envelope",
      iconColor: "text-[#3a1d96]",
      bgColor: "bg-[#3a1d96]/10",
      title: "Email Marketing",
      description: "Connect directly with your audience through personalized email campaigns that drive conversions and foster relationships.",
      features: [
        "Campaign strategy & design",
        "Automation & workflows",
        "A/B testing & optimization"
      ],
      delay: 4
    },
    {
      icon: "fa-chart-line",
      iconColor: "text-[#ff3371]",
      bgColor: "bg-[#ff3371]/10",
      title: "Conversion Optimization",
      description: "Turn more visitors into customers with data-backed CRO strategies that enhance user experience and boost conversions.",
      features: [
        "UX/UI analysis & improvement",
        "A/B & multivariate testing",
        "Landing page optimization"
      ],
      delay: 5
    },
    {
      icon: "fa-chart-pie",
      iconColor: "text-[#00e6c3]",
      bgColor: "bg-[#00e6c3]/10",
      title: "Analytics & Reporting",
      description: "Gain actionable insights with comprehensive analytics and clear reporting that demonstrate your ROI and inform strategy.",
      features: [
        "Custom dashboard setup",
        "KPI tracking & analysis",
        "Regular performance reports"
      ],
      delay: 6
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[#3a1d96] font-medium uppercase tracking-wide">Our Services</span>
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mt-2 mb-4">
            Comprehensive Digital Marketing <span className="text-gradient">Solutions</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a full suite of digital marketing services designed to help your brand grow, engage, and convert.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Button className="bg-gradient-primary hover:bg-[#2a1570] text-white font-medium px-8 py-6 rounded-full">
            Book a Strategy Call
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
