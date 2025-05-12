import { Request, Response } from 'express';
import express from 'express';
import { registerRoutes } from './routes';
import { serveStatic } from './vite';
import { storage } from "./storage";
import { contactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { emailService } from "./emailService";
import { directEmailService } from "./directEmailService";

// Create a serverless-compatible Express app for Vercel
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define routes directly instead of using registerRoutes since we don't need http server in serverless
app.post('/api/contact', async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validation = contactMessageSchema.safeParse(req.body);
    
    if (!validation.success) {
      const validationError = fromZodError(validation.error);
      return res.status(400).json({ 
        message: "Validation failed", 
        errors: validationError.details 
      });
    }
    
    // Save the contact message
    const contactMessage = await storage.createContactMessage(validation.data);
    
    // Log the contact details using direct email service
    try {
      await directEmailService.sendContactNotification(contactMessage);
      console.log('Contact submission logged successfully');
    } catch (error) {
      console.error('Error logging contact submission:', error);
    }
    
    // Try to send an actual email using nodemailer with Gmail
    let emailSent = false;
    try {
      emailSent = await emailService.sendContactNotification(contactMessage);
      if (emailSent) {
        console.log('Email notification sent successfully via Gmail');
      } else {
        console.log('Failed to send email notification via Gmail');
      }
    } catch (error) {
      console.error('Error sending email with Gmail:', error);
    }
    
    return res.status(200).json({
      message: "Message sent successfully",
      data: contactMessage
    });
  } catch (error) {
    console.error('Error saving contact message:', error);
    return res.status(500).json({ 
      message: "Failed to send message. Please try again later." 
    });
  }
});

// Serve static files for production
serveStatic(app);

// This is a serverless function handler for Vercel
export default async function handler(req: Request, res: Response) {
  return new Promise((resolve, reject) => {
    app(req, res, (err: any) => {
      if (err) {
        return reject(err);
      }
      resolve(undefined);
    });
  });
}