import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { emailService } from "./emailService";
import { mockEmailService } from "./mockEmailService";
import { directEmailService } from "./directEmailService";

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
      
      // Use direct email service to log the contact details in a readable format
      try {
        await directEmailService.sendContactNotification(contactMessage);
        console.log('Contact submission recorded successfully');
      } catch (error) {
        console.error('Error recording contact submission:', error);
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
