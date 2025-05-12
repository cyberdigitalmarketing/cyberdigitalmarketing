import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  // This is just for debugging - don't include in production
  const envCheck = {
    gmail_user_exists: !!process.env.GMAIL_USER,
    gmail_password_exists: !!process.env.GMAIL_APP_PASSWORD,
    node_env: process.env.NODE_ENV,
    vercel_region: process.env.VERCEL_REGION || 'not set'
  };
  
  res.status(200).json({
    message: 'Debug information',
    env_check: envCheck,
    headers: req.headers,
    timestamp: new Date().toISOString()
  });
}