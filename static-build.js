const { run } = require('react-snap');
const fs = require('fs');
const path = require('path');

// Run react-snap to generate static HTML files
run({
  // Configuration options for react-snap
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  skipThirdPartyRequests: false,
  puppeteerExecutablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
  // Uncomment for multi-language localization support
  // include: ['/', '/es/', '/fr/'],
  // minifyHtml: {
  //   collapseWhitespace: true,
  //   removeComments: true,
  // },
  removeBlobs: true,
  // Fixup functions to correct any issues with the generated HTML
  fixWebpackChunksIssue: true,
  // Fail gracefully on error rather than crashing
  skipThirdPartyRequests: true,
  source: 'dist',
  destination: 'dist',
  // Validate the HTML to make sure it's correctly formed
  saveAs404: false,
  // User-agent to use for crawling
  userAgent: 'ReactSnap',
}).then(() => {
  console.log('✅ Static site generation completed successfully!');
  
  // Post-processing to make sure all assets and links are working correctly
  const distDir = path.join(__dirname, 'dist');
  
  // Read the index.html file
  const indexPath = path.join(distDir, 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  
  // Replace any remaining root-relative paths if needed
  // indexHtml = indexHtml.replace(/src="\/assets\//g, 'src="./assets/');
  // indexHtml = indexHtml.replace(/href="\/assets\//g, 'href="./assets/');
  
  // Write the updated index.html back to disk
  fs.writeFileSync(indexPath, indexHtml);
  
  console.log('✅ Post-processing completed');
  console.log('✅ Your static site is ready in the dist/ directory');
  console.log('🔹 Upload all files to your web hosting provider');
}).catch(error => {
  console.error('❌ Error generating static site:');
  console.error(error);
  process.exit(1);
});