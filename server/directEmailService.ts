import { ContactMessage } from '../shared/schema';

/**
 * A direct email service that avoids SMTP authentication issues by generating
 * an email with proper format that can be sent manually.
 */
export class DirectEmailService {
  private targetEmail: string;

  constructor(targetEmail: string = 'cyberdigitalmarketing@protonmail.com') {
    this.targetEmail = targetEmail;
    console.log('Direct email service initialized. Submissions will be stored in the database and displayed in logs.');
  }

  async sendContactNotification(message: ContactMessage): Promise<boolean> {
    try {
      // Convert service code to human-readable name
      const serviceNames: {[key: string]: string} = {
        seo: "Search Engine Optimization",
        ppc: "Paid Advertising (PPC)",
        social: "Social Media Management",
        email: "Email Marketing",
        cro: "Conversion Optimization",
        other: "Other Services"
      };
      
      const serviceName = serviceNames[message.service] || message.service;
      
      console.log('\n============ NEW CONTACT FORM SUBMISSION ============');
      console.log(`TIME: ${new Date().toLocaleString()}`);
      console.log(`TO: ${this.targetEmail}`);
      console.log(`FROM: ${message.name} <${message.email}>`);
      console.log(`SUBJECT: New Website Inquiry - ${serviceName}`);
      console.log('\nCONTACT DETAILS:');
      console.log(`Name: ${message.name}`);
      console.log(`Email: ${message.email}`);
      console.log(`Phone: ${message.phone || 'Not provided'}`);
      console.log(`Company: ${message.company}`);
      console.log(`Service: ${serviceName}`);
      console.log(`Message: \n${message.message}`);
      console.log('\nThe contact form submission has been saved to the database.');
      console.log('================================================\n');
      
      return true;
    } catch (error) {
      console.error('Error with direct email service:', error);
      return false;
    }
  }
}

// Create a singleton instance
export const directEmailService = new DirectEmailService();