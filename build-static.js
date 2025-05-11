/**
 * Static Build Script
 * 
 * This script builds the website for static hosting with Formspree integration.
 * Run this with: node build-static.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const DIST_DIR = path.join(__dirname, 'dist');
const INDEX_HTML = path.join(DIST_DIR, 'index.html');

// Main function
async function buildStatic() {
  try {
    console.log('🔹 Starting static build process...');
    
    // Step 1: Build the site with Vite
    console.log('🔹 Building with Vite...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Step 2: Run react-snap to pre-render HTML
    console.log('🔹 Pre-rendering with react-snap...');
    
    const { run } = require('react-snap');
    await run({
      puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
      skipThirdPartyRequests: true,
      removeBlobs: true,
      fixWebpackChunksIssue: true,
      source: 'dist',
      destination: 'dist',
      saveAs404: false,
      userAgent: 'ReactSnap',
    });
    
    // Step 3: Post-processing
    console.log('🔹 Post-processing static files...');
    
    // Fix any root-relative paths if needed
    if (fs.existsSync(INDEX_HTML)) {
      let indexHtml = fs.readFileSync(INDEX_HTML, 'utf8');
      
      // Uncomment these lines if you have path issues with assets
      // indexHtml = indexHtml.replace(/src="\/assets\//g, 'src="./assets/');
      // indexHtml = indexHtml.replace(/href="\/assets\//g, 'href="./assets/');
      
      fs.writeFileSync(INDEX_HTML, indexHtml);
    }
    
    // Step 4: Create a simple .htaccess file for Apache hosting
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
    
    // Create 404.html (copy of index.html)
    if (fs.existsSync(INDEX_HTML)) {
      fs.copyFileSync(INDEX_HTML, path.join(DIST_DIR, '404.html'));
    }
    
    console.log('✅ Static build complete!');
    console.log('');
    console.log('To test the static site locally:');
    console.log('  npx serve -s dist');
    console.log('');
    console.log('To deploy to your web host:');
    console.log('  1. Upload all files from the "dist" directory to your hosting');
    console.log('  2. Your Formspree ID (mzzrakaw) is already set in the contact form');
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