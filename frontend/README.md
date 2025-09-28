# Community Food Network - Frontend

A modern React application for the Community Food Network, building a stronger Carbondale community through bulk food purchasing.

## Features

- **Community-Focused Homepage**: Welcoming message specifically for Carbondale with Dayemi branding
- **Public Inventory Browsing**: View all bulk items without requiring sign-up
- **Product Requests**: Community-driven feature to request new items
- **User Authentication**: Sign up and sign in functionality
- **Admin Panel**: Management interface for inventory and requests
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Key Updates Made

### Homepage
- Custom greeting: "Hello Carbondale! 👋"
- Dayemi branding and community focus
- Emphasis on building "a solid, strong community"
- Reference to Illinois Ave location
- Visually attractive gradient backgrounds and modern design

### Public Access
- **Inventory page**: Shows all items publicly, no sign-up required to browse
- **Product requests**: Public viewing of community requests
- **Sign-up prompts**: Clear calls-to-action for ordering and requesting

### Visual Design
- Modern, clean interface with Tailwind CSS
- Community-focused color scheme (blues, greens, yellows)
- Attractive cards and hover effects
- Professional typography with Inter font
- Responsive grid layouts

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Building for Production

```bash
npm run build
```

This builds the app for production to the `build` folder.

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   └── Navbar.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── InventoryPage.js
│   │   ├── RequestsPage.js
│   │   ├── AdminPage.js
│   │   ├── SignInPage.js
│   │   └── SignUpPage.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Pages Overview

### Homepage (`/`)
- Welcoming message for Carbondale community
- Dayemi branding and mission statement
- Featured inventory items
- Community benefits section
- Call-to-action for sign-up

### Inventory (`/inventory`)
- Public browsing of all bulk items
- Search and filter functionality
- Item details and pricing
- Sign-up prompts for ordering

### Requests (`/requests`)
- View community product requests
- Submit new requests (requires sign-up)
- Vote on requests (requires sign-up)
- Track request status

### Admin (`/admin`)
- Management interface overview
- Inventory management features
- Community request management
- User and order management

### Authentication
- **Sign Up (`/signup`)**: Create new community member account
- **Sign In (`/signin`)**: Access existing account

## Technology Stack

- **React 18**: Modern React with hooks
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Heroicons**: Beautiful SVG icons
- **Responsive Design**: Mobile-first approach

## Community Focus

This application is specifically designed for the Carbondale community with:

- Local branding (Dayemi, Illinois Ave)
- Community-driven features (product requests, voting)
- Public access to encourage adoption
- Clear value proposition for bulk purchasing
- Professional, trustworthy design

## Next Steps

1. **Backend Integration**: Connect to authentication and database services
2. **Payment Processing**: Add order and payment functionality
3. **Inventory Management**: Connect to inventory management system
4. **Notifications**: Add email/SMS notifications for orders and updates
5. **Mobile App**: Consider React Native version for mobile users

## Contributing

This project is built for the Carbondale community. For contributions or feedback, please contact the Dayemi team at the Illinois Ave location.

---

**Built with ❤️ for the Carbondale Community**

