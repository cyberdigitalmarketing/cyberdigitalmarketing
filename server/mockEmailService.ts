import { ContactMessage } from '../shared/schema';

/**
 * A simple mock email service that just logs to the console
 * This can be used when you don't want to set up a real email provider
 * or when testing the application
 */
export class MockEmailService {
  private targetEmail: string;

  constructor(targetEmail: string = 'cyberdigitalmarketing@protonmail.com') {
    this.targetEmail = targetEmail;
    console.log('Mock email service initialized. Emails will be logged to console only.');
  }

  async sendContactNotification(message: ContactMessage): Promise<boolean> {
    try {
      console.log('\n==== CONTACT FORM SUBMISSION ====');
      console.log(`TO: ${this.targetEmail}`);
      console.log(`FROM: ${message.name} <${message.email}>`);
      console.log(`SUBJECT: New Contact Form Submission from ${message.name}`);
      console.log('\nCONTENT:');
      console.log(`Name: ${message.name}`);
      console.log(`Email: ${message.email}`);
      console.log(`Phone: ${message.phone || 'Not provided'}`);
      console.log(`Company: ${message.company}`);
      console.log(`Service: ${message.service}`);
      console.log(`Message: ${message.message}`);
      console.log('\nThis is a simulated email. No actual email was sent.');
      console.log('================================\n');
      
      return true;
    } catch (error) {
      console.error('Error with mock email:', error);
      return false;
    }
  }
}

// Create a singleton instance
export const mockEmailService = new MockEmailService();