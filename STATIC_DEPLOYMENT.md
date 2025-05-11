# Static Site Deployment Guide

This document explains how to build this React application as a static site and deploy it to HostPapa.

## 1. Prerequisites

Before generating the static site, make sure:

1. You have Node.js installed on your computer
2. You have created a Formspree account and form at https://formspree.io
3. You have replaced "YOUR_FORMSPREE_FORM_ID" in client/src/components/ContactForm.tsx with your actual Formspree form ID

## 2. Building the Static Site

### Step 1: Install dependencies

```bash
npm install
```

### Step 2: Build the site

```bash
npm run build
```

This will create a production build in the `dist` directory.

### Step 3: Generate static HTML

```bash
npx react-snap
```

This will pre-render the React app into static HTML files.

## 3. Testing the Static Build

To test the static build locally:

```bash
npx serve -s dist
```

This will start a local server with your static site.

## 4. Deploying to HostPapa

### Step 1: Download the static files

Download the entire `dist` directory to your computer.

### Step 2: Login to HostPapa

Log in to your HostPapa cPanel account.

### Step 3: Upload files

1. Navigate to the File Manager
2. Go to the `public_html` directory (or your preferred directory)
3. Click "Upload" and select all files from your `dist` directory
4. Make sure `index.html` is at the root level

### Step 4: Configure Formspree (if not done already)

Make sure you've set up a Formspree form and configured it to:
- Accept submissions from your domain
- Forward them to your email

### Step 5: Test your site

Visit your domain to ensure everything is working:
- Check that all pages load correctly
- Test the contact form
- Verify all links work
- Test on mobile devices

## 5. Optional Optimizations

For better performance, consider adding an `.htaccess` file with:

```
# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
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
</IfModule>

# Handle client-side routing
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

## 6. Updating the Site in the Future

When you need to update the site:

1. Make your changes to the code
2. Rebuild with `npm run build` followed by `npx react-snap`
3. Upload the new files to HostPapa, replacing the old ones

## Troubleshooting

If you encounter issues:

1. **Contact form not working**: Check your Formspree form ID and make sure your domain is authorized in Formspree
2. **Blank pages**: Make sure all files were uploaded correctly and the .htaccess file is set up for client-side routing
3. **Missing assets**: Check file paths in your HTML and CSS files