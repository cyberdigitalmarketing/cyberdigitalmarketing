import nodemailer from 'nodemailer';
import { ContactMessage } from '../shared/schema';

// To use Gmail:
// username: your Gmail address
// password: an app password (not your regular Gmail password)
// Note: You need to enable 2-step verification and then create an app password

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls?: {
    rejectUnauthorized: boolean;
  };
}

// Default config using Gmail
const defaultConfig: EmailConfig = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || ''
  },
  tls: {
    // Do not fail on invalid certs
    rejectUnauthorized: false
  }
};

export class EmailService {
  private transporter: nodemailer.Transporter;
  private targetEmail: string;

  constructor(
    config: EmailConfig = defaultConfig,
    targetEmail: string = 'cyberdigitalmarketing@protonmail.com'
  ) {
    this.transporter = nodemailer.createTransport(config);
    this.targetEmail = targetEmail;
    
    // Log email configuration (without showing password)
    console.log('Email service configured with:', {
      host: config.host,
      port: config.port,
      secure: config.secure,
      user: process.env.EMAIL_USER ? process.env.EMAIL_USER.substring(0, 3) + '***' : 'not set',
      passwordProvided: !!process.env.EMAIL_PASSWORD
    });
  }

  async sendContactNotification(message: ContactMessage): Promise<boolean> {
    try {
      if (!this.transporter || !process.env.EMAIL_USER) {
        console.log('Email service not configured properly');
        return false;
      }

      const mailOptions = {
        from: `"Cyber Digital Marketing Website" <${process.env.EMAIL_USER}>`,
        to: this.targetEmail,
        subject: `New Contact Form Submission from ${message.name}`,
        text: this.createEmailText(message),
        html: this.createEmailHtml(message),
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
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

// Create a singleton instance
export const emailService = new EmailService();