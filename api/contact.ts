import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { z } from 'zod';

// Simple contact schema for validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().optional(),
});

type ContactData = z.infer<typeof contactSchema>;

// Vercel API function for the contact form
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS for Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Validate the request body
    const parseResult = contactSchema.safeParse(req.body);
    
    if (!parseResult.success) {
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: parseResult.error.errors 
      });
    }

    const data = parseResult.data;
    
    // Set up Resend configuration
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.error('Resend API key is missing in environment variables');
      return res.status(500).json({ 
        message: "Email configuration error. Please try again later." 
      });
    }
    
    // Initialize Resend
    const resend = new Resend(resendApiKey);
    
    // Create email content (HTML for better formatting)
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <hr />
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Company:</strong> ${data.company || 'Not provided'}</p>
      <p><strong>Message:</strong> ${data.message || 'No message provided'}</p>
      <hr />
      <p>Submitted on: ${new Date().toLocaleString()}</p>
    `;
    
    // Send email using Resend
    const emailResult = await resend.emails.send({
      from: 'Cyber Digital Marketing <onboarding@resend.dev>', // Use your verified domain once set up
      to: 'cyberdigitalmarketing@protonmail.com',
      subject: 'New Website Contact Form Submission',
      html: htmlContent,
      // Add replyTo so client can directly reply to the sender
      replyTo: data.email
    });
    
    // Check for errors
    if (emailResult.error) {
      console.error('Resend error:', emailResult.error);
      return res.status(500).json({ 
        message: "Failed to send message. Please try again later.",
        error: emailResult.error.message
      });
    }
    
    // Log success
    console.log('Email sent successfully with Resend. ID:', emailResult.data?.id);
    
    // Return success response
    return res.status(200).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ 
      message: "Failed to send message. Please try again later." 
    });
  }
}