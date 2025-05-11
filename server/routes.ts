import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { emailService } from "./emailService";
import { mockEmailService } from "./mockEmailService";
import { directEmailService } from "./directEmailService";
import { createGraphEmailService } from "./graphEmailService";

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
      
      // No need to check email credentials anymore as we're using direct email service
      
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

  const httpServer = createServer(app);

  return httpServer;
}
