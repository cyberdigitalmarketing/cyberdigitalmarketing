import { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Check if API key is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      return res.status(500).json({ 
        success: false,
        message: "Resend API key not found in environment variables"
      });
    }
    
    // Initialize Resend
    const resend = new Resend(resendApiKey);
    
    // Just return the API key status (not the actual key)
    return res.status(200).json({ 
      success: true,
      message: "Resend API key found in environment",
      apiKeyConfigured: true
    });
    
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      message: "Error checking Resend configuration",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
}