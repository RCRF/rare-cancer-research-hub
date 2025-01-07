# Rare Cancer Research Hub

A Next.js frontend application with authentication and admin capabilities.

## Overview

This project is a Next.js frontend application that works in conjunction with a separate Node/Express backend. It features:

- Modern React-based architecture using Next.js
- Authentication powered by Clerk
- Admin dashboard with CRUD operations
- Multi-organization support

## Prerequisites

- Node.js (LTS version recommended)
- npm or yarn
- A Clerk account for authentication
- Access to the companion backend repository

## Environment Variables

Create a `.env.local` file in the root directory with the following:

```env
# Authentication
JWT_SECRET=your_jwt_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000 # or your deployment URL

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key

# Application Configuration
NEXT_PUBLIC_ADMIN_EMAIL=your_admin_email
CLERK_APPROVED_USER=your_admin_user_id
NEXT_PUBLIC_ORG_ID=your_organization_id
```

### Required Environment Variables Explanation

- **Authentication**
  - `JWT_SECRET`: Secret key for JWT token generation
  - `NEXTAUTH_SECRET`: Secret key for NextAuth.js
  - `NEXTAUTH_URL`: Your application's URL

- **Clerk Authentication**
  - `CLERK_SECRET_KEY`: Your Clerk secret key
  - `NEXT_PUBLIC_CLERK_SIGN_IN_URL`: Custom sign-in URL path
  - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key

- **Application Configuration**
  - `NEXT_PUBLIC_ADMIN_EMAIL`: Email address for admin access
  - `CLERK_APPROVED_USER`: Clerk user ID for admin privileges
  - `NEXT_PUBLIC_ORG_ID`: Organization ID for CRUD operations

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Authentication

- Public routes are accessible to all users
- Admin features require authentication through Clerk
  - Route /login will take you to login to Clerk then select the settings icon to toggle to Admin
- Admin access is controlled via the `CLERK_APPROVED_USER` environment variable
- Future updates will include role-based access management

## Roadmap

- [ ] Role-based access management
- [ ] Organization selector for multi-org support
- [ ] Enhanced admin dashboard
- [ ] Additional customization options

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

