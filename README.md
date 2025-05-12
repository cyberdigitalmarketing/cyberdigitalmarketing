# Cyber Digital Marketing Website

A modern, responsive marketing website for Cyber Digital Marketing that showcases digital strategy services through an interactive and engaging user interface.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Modern UI with animations and interactive elements
- Contact form with email notifications
- Showcases digital marketing services
- Case studies section for client success stories

## Technology Stack

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js + Express
- **Email Service**: Nodemailer with Gmail
- **Form Validation**: Zod + React Hook Form
- **Animation**: Framer Motion
- **UI Components**: shadcn/ui

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/cyber-digital-marketing.git
cd cyber-digital-marketing
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

Create a `.env` file in the root directory and add the following:

```
GMAIL_USER=your_gmail_address
GMAIL_APP_PASSWORD=your_gmail_app_password
```

Note: For Gmail, you need to create an App Password from your Google Account.

### Running the Project

Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:5000](http://localhost:5000)

### Production Build

To create a production build:

```bash
npm run build
# or
yarn build
```

## Project Structure

- `/client` - Frontend React application
  - `/src/components` - UI components
  - `/src/pages` - Page components
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions and configuration
- `/server` - Backend Express application
  - `/index.ts` - Server entry point
  - `/routes.ts` - API routes
  - `/storage.ts` - Data storage interface
- `/shared` - Shared code between frontend and backend
  - `/schema.ts` - Data models and validation schemas

## Deployment

This project can be deployed to any platform that supports Node.js applications:

- Vercel
- Netlify
- DigitalOcean
- AWS
- Heroku

Make sure to set up the required environment variables on your hosting platform.

## Contact

Cyber Digital Marketing - [cyberdigitalmarketing@protonmail.com](mailto:cyberdigitalmarketing@protonmail.com)

Website: [www.cyberdigitalmarketing.net](https://www.cyberdigitalmarketing.net)