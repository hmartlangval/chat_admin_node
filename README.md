# Node.js REST API with Socket.IO

A Node.js application that provides a REST API and WebSocket server with a user-friendly UI, packaged as a single executable.

## Features

- RESTful API using Express.js
- Real-time communication using Socket.IO
- Modern UI with Bootstrap 5
- Packaged as a single .exe file
- IIS integration for deployment on Windows VMs

## Development Setup

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to http://localhost:3000

## Building the Executable

To build a standalone executable:

```bash
npm run build
```

This will create an executable file in the `dist` directory.

## IIS Deployment (Windows VM)

### Prerequisites

- Windows Server with IIS installed
- URL Rewrite Module for IIS
- WebSocket Protocol enabled

### Setup Steps

1. Install the URL Rewrite Module for IIS if not already installed.
2. Create a new website in IIS pointing to the directory containing the application.
3. Place the `web.config` file in the root directory of your website.
4. Copy the built executable and any other needed files to the website directory.
5. Make sure the application pool for the site is set to "No Managed Code".
6. Set up appropriate security permissions for the application pool identity.
7. Start the Node.js application as a Windows service or using a tool like PM2.

### IIS Configuration

The included `web.config` file contains rules to:

1. Redirect HTTP traffic to HTTPS
2. Proxy all web requests to the Node.js application running on port 3000
3. Handle WebSocket connections correctly

## Port Configuration

By default, the application runs on port 3000, but IIS will expose it on ports 80 (HTTP) and 443 (HTTPS). All traffic is routed through IIS to your Node.js application.

## Environment Variables

You can customize the application using the `.env` file:

- `PORT`: The port the Node.js application runs on (default: 3000)
- `PUBLIC_URL`: The public URL for the application

## License

MIT 