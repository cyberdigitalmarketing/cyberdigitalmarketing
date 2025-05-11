import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { ContactMessage } from '../shared/schema';

/**
 * Microsoft Graph API Email Service
 * 
 * This service uses Microsoft Graph API to send emails through Outlook
 * It requires OAuth2 credentials (client ID, client secret, tenant ID)
 * and proper API permissions in Azure AD.
 */
export class GraphEmailService {
  private client: Client | null = null;
  private fromEmail: string;
  private targetEmail: string;
  private isConfigured: boolean = false;

  constructor(
    fromEmail: string = '', 
    targetEmail: string = 'cyberdigitalmarketing@protonmail.com'
  ) {
    this.fromEmail = fromEmail;
    this.targetEmail = targetEmail;

    // Check if all required environment variables are available
    const clientId = process.env.MS_GRAPH_CLIENT_ID;
    const clientSecret = process.env.MS_GRAPH_CLIENT_SECRET;
    const tenantId = process.env.MS_GRAPH_TENANT_ID;
    const userEmail = process.env.MS_GRAPH_USER_EMAIL;

    if (clientId && clientSecret && tenantId && userEmail) {
      try {
        // Initialize the auth provider
        const credential = new ClientSecretCredential(
          tenantId,
          clientId,
          clientSecret
        );

        // Create the Graph client
        this.client = Client.initWithMiddleware({
          authProvider: {
            getAccessToken: async () => {
              const response = await credential.getToken(["https://graph.microsoft.com/.default"]);
              return response.token;
            }
          }
        });
        
        this.fromEmail = userEmail;
        this.isConfigured = true;
        
        console.log('Microsoft Graph Email Service initialized successfully');
      } catch (error) {
        console.error('Error initializing Microsoft Graph Email Service:', error);
        this.isConfigured = false;
      }
    } else {
      console.log('Microsoft Graph Email Service not configured - missing required credentials');
      this.isConfigured = false;
    }
  }

  async sendContactNotification(message: ContactMessage): Promise<boolean> {
    if (!this.isConfigured || !this.client) {
      console.log('Microsoft Graph Email Service not configured - skipping email');
      return false;
    }
    
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
      
      // Create email body HTML
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #3a1d96; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">New Contact Form Submission</h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${message.name}</p>
            <p><strong>Email:</strong> ${message.email}</p>
            <p><strong>Phone:</strong> ${message.phone || 'Not provided'}</p>
            <p><strong>Company:</strong> ${message.company || 'Not provided'}</p>
            <p><strong>Service:</strong> ${serviceName}</p>
            <p><strong>Message:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 5px;">
              ${message.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="font-size: 12px; color: #666; margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 10px;">
            <p>This message was sent from the Cyber Digital Marketing website contact form on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `;
      
      // Prepare the email message
      const emailMessage = {
        message: {
          subject: `New Website Inquiry - ${serviceName}`,
          body: {
            contentType: 'HTML',
            content: emailHtml
          },
          toRecipients: [
            {
              emailAddress: {
                address: this.targetEmail
              }
            }
          ],
          replyTo: [
            {
              emailAddress: {
                address: message.email
              }
            }
          ]
        },
        saveToSentItems: true
      };
      
      // Send the email
      await this.client.api(`/users/${this.fromEmail}/sendMail`).post(emailMessage);
      
      console.log(`Email sent successfully to ${this.targetEmail} via Microsoft Graph API`);
      return true;
    } catch (error) {
      console.error('Error sending email via Microsoft Graph API:', error);
      return false;
    }
  }
}

// Export a factory function to create the service
export function createGraphEmailService(): GraphEmailService {
  const userEmail = process.env.MS_GRAPH_USER_EMAIL || '';
  const targetEmail = 'cyberdigitalmarketing@protonmail.com';
  
  return new GraphEmailService(userEmail, targetEmail);
}