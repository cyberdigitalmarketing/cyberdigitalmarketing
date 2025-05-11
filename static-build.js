// Static Build Script
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// Step 1: Build the site with Vite
console.log('Building site with Vite...');
execSync('vite build', { stdio: 'inherit' });

// Step 2: Generate static HTML using react-snap
console.log('Generating static HTML with react-snap...');
execSync('npx react-snap', { stdio: 'inherit' });

// Step 3: Copy additional assets
console.log('Copying additional assets...');
// Copy any additional assets here if needed

// Step 4: Create a simple server.js file for optional NodeJS hosting
console.log('Creating simple server.js for optional NodeJS hosting...');
const serverJs = `const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Handle form submissions
app.post('/api/contact', express.json(), (req, res) => {
  // This is a fallback server for the form
  // It can be used if you decide to use Node.js hosting
  console.log('Form submission received');
  console.log(req.body);
  
  // In a real environment, you might want to send an email here
  // For a static site, the form will be handled by Formspree
  
  res.json({ success: true });
});

// All other GET requests redirect to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`;

fs.writeFileSync('server.js', serverJs);

console.log('Static build complete! Your files are in the dist folder.');
console.log('To deploy, upload the contents of the dist folder to your hosting.');