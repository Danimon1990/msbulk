# Community Food Network - MVP

A community-driven bulk food purchasing platform built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- **User Authentication**: Secure user registration and login with NextAuth.js
- **Role-Based Access**: Admin and Member roles with different permissions
- **Product Management**: Admins can add, edit, and remove products
- **Inventory System**: Real-time stock tracking with movement logging
- **Order Management**: Members can place orders that automatically update stock
- **Product Requests**: Members can request new products and support others' requests
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **UI Components**: Custom components built with Tailwind

## Setup Instructions

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone and setup the project**
   ```bash
   cd bulk-blayne
   npm install
   ```

2. **Database Setup**
   - Create a PostgreSQL database named `bulk_blayne`

3. **Generate Prisma Client and Push Schema**
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Seed the Database** (Optional but recommended)
   ```bash
   npm run db:seed
   ```

5. **Start the Development Server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `https://bulk-blayne-api-885949875267.us-central1.run.appbr`

## Test Accounts

After running the seed script, you can use these test accounts:

## Project Structure

```
src/
├── app/                    # Next.js 13+ app router
│   ├── api/               # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── products/     # Product CRUD operations
│   │   ├── orders/       # Order management
│   │   └── requests/     # Product requests
│   ├── auth/             # Authentication pages
│   ├── inventory/        # Inventory browsing page
│   ├── requests/         # Product requests page
│   ├── admin/           # Admin panel
│   └── layout.tsx       # Root layout
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   ├── forms/           # Form components
│   └── navigation.tsx   # Main navigation
├── lib/                 # Utility libraries
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   └── utils.ts         # General utilities
└── types/               # TypeScript type definitions

prisma/
├── schema.prisma        # Database schema
└── seed.ts             # Seed data script
```

## Database Schema

The application uses the following main entities:

- **Users**: Stores user accounts with roles (ADMIN/MEMBER)
- **Products**: Product catalog with pricing and stock
- **Orders**: Customer orders with status tracking
- **ProductMovements**: Audit trail for all stock changes
- **ProductRequests**: Member requests for new products
- **RequestSupport**: Community support for product requests
- **News**: System announcements and updates

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:seed` - Populate database with sample data

## Features Overview

### For Members
- Browse product inventory with search and filtering
- Place orders (automatically updates stock)
- Submit requests for new products
- Support other members' product requests
- View order history

### For Admins
- Full product management (create, edit, delete)
- View all orders across the system
- Monitor stock levels and movements
- Review product requests from members

## Security Features

- Password hashing with bcryptjs
- JWT-based session management
- Role-based route protection
- CSRF protection
- Input validation and sanitization

## Future Enhancements

- Email notifications for order confirmations
- Advanced analytics dashboard
- Bulk order management
- Payment integration
- Mobile app
- Advanced inventory alerts
- Multi-location support

## Contributing

This is an MVP implementation. For production use, consider adding:

- Comprehensive error handling
- Advanced logging
- Performance monitoring
- Automated testing
- CI/CD pipeline
- Security auditing
- Database migrations
