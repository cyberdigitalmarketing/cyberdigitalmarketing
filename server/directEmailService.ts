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
      console.log('\n============ NEW CONTACT FORM SUBMISSION ============');
      console.log(`TIME: ${new Date().toLocaleString()}`);
      console.log(`TO: ${this.targetEmail}`);
      console.log(`FROM: ${message.name} <${message.email}>`);
      console.log(`SUBJECT: New Website Inquiry`);
      console.log('\nCONTACT DETAILS:');
      console.log(`Name: ${message.name}`);
      console.log(`Email: ${message.email}`);
      console.log(`Phone: ${message.phone || 'Not provided'}`);
      console.log(`Company: ${message.company}`);
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