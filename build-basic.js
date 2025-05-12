/**
 * Basic Build Script
 * 
 * This script builds the website for static hosting with Formspree integration
 * without trying to pre-render pages.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DIST_DIR = path.join(__dirname, 'dist');

// Main function
async function buildStatic() {
  try {
    console.log('🔹 Starting static build process...');
    
    // Step 1: Build the site with Vite
    console.log('🔹 Building with Vite...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Step 2: Create a simple .htaccess file for Apache hosting
    console.log('🔹 Creating .htaccess file...');
    
    if (!fs.existsSync(DIST_DIR)) {
      fs.mkdirSync(DIST_DIR, { recursive: true });
    }
    
    const htaccessContent = `# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json
</IfModule>

# Set browser caching
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
  ExpiresByType text/javascript "access plus 1 month"
  ExpiresByType text/html "access plus 1 day"
</IfModule>

# Set up redirects for SPA (Single Page Application)
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
`;
    
    fs.writeFileSync(path.join(DIST_DIR, '.htaccess'), htaccessContent);
    
    console.log('✅ Basic build complete!');
    console.log('');
    console.log('The dist folder now contains your website files ready for uploading.');
    console.log('');
    console.log('To deploy to your web host:');
    console.log('  1. Download the entire "dist" directory from Replit');
    console.log('  2. Upload all files from the "dist" directory to your HostPapa account');
    console.log('');
    console.log('For detailed instructions, see STATIC_DEPLOYMENT.md');
    
  } catch (error) {
    console.error('❌ Error in build process:');
    console.error(error);
    process.exit(1);
  }
}

// Run the build process
buildStatic().catch(console.error);