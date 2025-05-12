import { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';
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
    
    // Set up email configuration
    const emailUser = process.env.GMAIL_USER;
    const emailPass = process.env.GMAIL_APP_PASSWORD;
    
    if (!emailUser || !emailPass) {
      console.error('Email credentials are missing in environment variables');
      return res.status(500).json({ 
        message: "Email configuration error. Please try again later." 
      });
    }
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });
    
    // Create email content
    const emailText = `
      New Contact Form Submission
      --------------------------
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone || 'Not provided'}
      Company: ${data.company || 'Not provided'}
      Message: ${data.message || 'No message provided'}
      --------------------------
      Submitted on: ${new Date().toLocaleString()}
    `;
    
    // Send email
    await transporter.sendMail({
      from: `"Website Contact Form" <${emailUser}>`,
      to: 'cyberdigitalmarketing@protonmail.com',
      subject: 'New Website Contact Form Submission',
      text: emailText,
    });
    
    // Log success
    console.log('Email sent successfully');
    
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