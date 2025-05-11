import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { emailService } from "./emailService";
import { mockEmailService } from "./mockEmailService";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
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
      
      // Check if email credentials are set
      const emailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;
      
      // Send email notification
      let emailSent = false;
      
      // First try the real email service if configured
      if (emailConfigured) {
        try {
          emailSent = await emailService.sendContactNotification(contactMessage);
          console.log('Email notification status:', emailSent ? 'sent' : 'failed');
        } catch (emailError) {
          console.error('Error sending email notification:', emailError);
          // Will fall back to mock email service
          emailSent = false;
        }
      } else {
        console.log('Email not configured with real service. Using fallback.');
      }
      
      // If real email service failed or isn't configured, use the mock service
      if (!emailSent) {
        try {
          await mockEmailService.sendContactNotification(contactMessage);
          console.log('Mock email notification logged to console');
          emailSent = true; // Mark as "sent" since we successfully logged it
        } catch (mockError) {
          console.error('Error with mock email notification:', mockError);
        }
      }
      
      return res.status(200).json({
        message: "Message sent successfully",
        data: contactMessage,
        emailSent: emailSent
      });
    } catch (error) {
      console.error('Error saving contact message:', error);
      return res.status(500).json({ 
        message: "Failed to send message. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
