import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { ContactMessage } from '../shared/schema';

interface MailgunConfig {
  apiKey: string;
  domain: string;
  fromEmail: string;
}

export class MailgunEmailService {
  private mailgun: any;
  private config: MailgunConfig;
  private targetEmail: string;

  constructor(
    config: MailgunConfig,
    targetEmail: string = 'cyberdigitalmarketing@protonmail.com'
  ) {
    if (!config.apiKey) {
      throw new Error('Mailgun API key is required');
    }
    
    this.config = config;
    this.targetEmail = targetEmail;
    
    // Initialize Mailgun
    const mailgun = new Mailgun(formData);
    this.mailgun = mailgun.client({
      username: 'api',
      key: config.apiKey,
      url: 'https://api.mailgun.net'
    });
    
    console.log(`Mailgun service initialized for domain: ${config.domain}`);
  }

  async sendContactNotification(message: ContactMessage): Promise<boolean> {
    try {
      const messageData = {
        from: `Cyber Digital Marketing Website <${this.config.fromEmail}>`,
        to: this.targetEmail,
        subject: `New Contact Form Submission from ${message.name}`,
        text: this.createEmailText(message),
        html: this.createEmailHtml(message)
      };

      const response = await this.mailgun.messages.create(this.config.domain, messageData);
      console.log('Mailgun response:', response);
      return true;
    } catch (error) {
      console.error('Mailgun error:', error);
      return false;
    }
  }

  private createEmailText(message: ContactMessage): string {
    return `
      New Contact Form Submission
      ---------------------------
      Name: ${message.name}
      Email: ${message.email}
      Phone: ${message.phone || 'Not provided'}
      Company: ${message.company || 'Not provided'}
      Service: ${message.service}
      Message: ${message.message}
      Submitted on: ${message.createdAt ? new Date(message.createdAt).toLocaleString() : new Date().toLocaleString()}
    `;
  }

  private createEmailHtml(message: ContactMessage): string {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
        <h2 style="color: #3a1d96; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="margin: 20px 0;">
          <p><strong>Name:</strong> ${message.name}</p>
          <p><strong>Email:</strong> ${message.email}</p>
          <p><strong>Phone:</strong> ${message.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${message.company || 'Not provided'}</p>
          <p><strong>Service:</strong> ${message.service}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 5px;">
            ${message.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        
        <div style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 10px;">
          <p>This message was sent from the Cyber Digital Marketing website contact form on ${message.createdAt ? new Date(message.createdAt).toLocaleString() : new Date().toLocaleString()}</p>
        </div>
      </div>
    `;
  }
}

// Export a factory function to create the service once we have the API key
export function createMailgunService(
  apiKey: string, 
  domain: string,
  fromEmail: string = 'website@cyberdigitalmarketing.com'
): MailgunEmailService {
  return new MailgunEmailService({
    apiKey,
    domain,
    fromEmail
  });
}