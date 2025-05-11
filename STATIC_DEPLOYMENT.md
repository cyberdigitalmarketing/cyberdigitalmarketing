# Static Site Deployment Guide

This guide will help you deploy the Cyber Digital Marketing website as a static site that can be hosted on any standard web hosting service like HostPapa or similar providers.

## Why Static Deployment?

Static deployment offers several advantages:
- **Faster loading times** - Pre-rendered HTML loads instantly
- **Improved SEO** - Search engines can crawl content immediately
- **Reduced hosting costs** - No need for specialized Node.js hosting
- **Better security** - Smaller attack surface with no server-side code
- **Higher reliability** - No server maintenance or runtime errors

## Prerequisites

Before proceeding, you'll need:
1. A Formspree account (https://formspree.io) for the contact form
2. Access to your HostPapa web hosting account
3. FTP credentials or File Manager access to upload files

## Step 1: Set Up Formspree

1. Sign up at https://formspree.io (the free plan is sufficient for most needs)
2. Create a new form in your Formspree dashboard
3. Copy the form ID (it will look like `xaydpbvz`)

## Step 2: Update the Contact Form

Edit the `client/src/components/ContactForm.tsx` file:

```jsx
// Find this line around line 64:
action="https://formspree.io/f/YOUR_FORMSPREE_FORM_ID"

// Replace it with your actual Formspree form ID:
action="https://formspree.io/f/xaydpbvz" // Use your actual form ID
```

## Step 3: Build the Static Site

```bash
# Install dependencies if you haven't already
npm install

# Build the site for production
npm run build

# Generate static HTML (post-build)
node static-build.js
```

This process will:
1. Create optimized production assets in the `dist` folder
2. Pre-render all pages to static HTML using react-snap
3. Process links and assets to ensure they work correctly as static files

## Step 4: Test the Static Site Locally

Before uploading, you can verify everything works correctly:

```bash
# Install a simple HTTP server if you don't have one
npm install -g serve

# Serve the static files
serve -s dist
```

Visit http://localhost:3000 and check that:
- All pages render correctly
- Links between pages work
- The contact form submits to Formspree without errors

## Step 5: Upload to HostPapa

1. Log in to your HostPapa control panel
2. Navigate to File Manager or use FTP to connect to your web hosting
3. Upload the entire contents of the `dist` directory to your web hosting:
   - For the root domain (example.com): Upload to `public_html/`
   - For a subdomain or subfolder: Upload to the appropriate directory

## Step 6: Verify the Deployment

1. Visit your website in a browser
2. Check that all pages and images load correctly
3. Test the contact form by submitting a test message
4. Verify you receive the test message in your email

## Additional Optimization Tips

### Enable GZIP Compression

Create a `.htaccess` file in your website's root directory with:

```apache
# Enable GZIP compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/x-javascript application/json
</IfModule>
```

### Add Browser Caching

Add these rules to your `.htaccess` file:

```apache
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
```

## Troubleshooting

### Broken Links or Missing Assets

If links or assets don't work correctly, check:

1. Open the HTML source of your page and look for paths that start with `/`
2. These absolute paths might need to be changed to relative paths (e.g., `./assets/` instead of `/assets/`)
3. You can fix this by editing the `static-build.js` file and uncommenting lines 39-40

### Form Submission Issues

If the contact form doesn't work:

1. Check that your Formspree form ID is correct
2. Verify Formspree account is active and hasn't reached submission limits
3. Temporarily disable any security plugins that might block form submissions

### 404 Errors

You may need to create a custom 404 page:

1. Copy `dist/index.html` to `dist/404.html`
2. Edit the file to display a user-friendly error message
3. Make sure your web hosting is configured to use this custom 404 page

## Getting Help

If you encounter any issues with your static deployment, contact the developer for assistance or refer to these resources:

- Formspree documentation: https://help.formspree.io/
- HostPapa help center: https://hostpapasupport.com/
- React Snap documentation: https://github.com/stereobooster/react-snap
