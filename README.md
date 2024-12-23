# Swift Garden

Swift Garden is a web application designed to streamline the purchase of fresh vegetables from various vendors. The platform includes three main modules:

1. **Customer Interface**: Allows users to browse, select, and purchase vegetables.
2. **Vendor Dashboard**: Empowers vendors to manage their inventory, orders, and sales.
3. **Admin Dashboard**: Offers administrative controls with features for monitoring and managing platform activities.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)

---

## Features

### Customer Interface
- Browse vegetables with filtering and sorting options.
- Add items to a shopping cart and proceed with secure checkout.
- View order history and track orders.

### Vendor Dashboard
- Manage inventory: add, update, or remove products.
- Track and fulfill customer orders.
- View detailed sales reports.

### Admin Dashboard
- Monitor vendor activities and manage accounts.
- Generate reports on platform-wide sales and usage.
- Manage user feedback and resolve issues.

---

## Technologies Used

### Frontend
- **Next.js**: React-based framework for server-side rendering and static site generation.
- **Radix UI**: Accessible and customizable UI components.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **AOS**: Animation library for scroll-based animations.
- **React Redux**: State management library.

### Backend
- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Backend framework for REST APIs.
- **Prisma**: ORM for database operations.
- **PostgreSQL**: Relational database.

### Others
- **Stripe**: Payment gateway integration.
- **Zustand**: Lightweight state management library.
- **TypeScript**: Typed JavaScript for better scalability and maintainability.
- **Docker**: Containerization for deployment.
- **AWS**: Hosting and cloud services.

---

## Folder Structure

```plaintext
D:\level2\swift-garden\swift-garden-frontned
├── .next/                       # Next.js build output
├── .vercel/                     # Vercel deployment config
├── node_modules/                # Node.js modules
├── public/                      # Public assets
├── src/                         # Source code
│   ├── app/                     # Next.js app directory
│   │   ├── (withAdminLayout)/   # Admin layout pages
│   │   ├── (withVendorLayout)/  # Vendor layout pages
│   │   ├── cancel/              # Order cancellation page
│   │   ├── cart/                # Shopping cart page
│   │   ├── categories/          # Product categories page
│   │   ├── flash-sales/         # Flash sales page
│   │   ├── fonts/               # Custom fonts
│   │   ├── login/               # Login page
│   │   ├── order-history/       # Order history page
│   │   ├── products/            # Products page
│   │   ├── recent-products/     # Recent products page
│   │   ├── registration/        # Registration page
│   │   ├── shops/               # Shops page
│   │   ├── stripe-payment/      # Stripe payment integration
│   │   ├── success/             # Order success page
│   │   ├── favicon.ico          # Favicon
│   │   ├── globals.css          # Global styles
│   │   ├── layout.metadata.ts   # Metadata for layouts
│   │   ├── layout.tsx           # Application layout
│   │   ├── loading.tsx          # Loading screen
│   │   └── page.tsx             # Main page
│   ├── components/              # Reusable React components
│   │   ├── Home/                # Home page components
│   │   ├── Layout/              # Layout components
│   │   ├── Shared/              # Shared components
│   │   ├── shop/                # Shop-related components
│   │   ├── Stripe-payment/      # Stripe payment components
│   │   └── ui/                  # UI components
│   ├── helpers/                 # Helper functions
│   ├── hooks/                   # Custom React hooks
│   ├── lib/                     # Libraries and utilities
│   ├── redux/                   # Redux store setup
│   └── store/                   # Zustand stores
│       └── loadingStore.tsx
├── .env                         # Environment variables
├── .eslintrc.json               # ESLint configuration
├── .gitignore                   # Git ignore rules
├── components.json              # Components mapping
├── next-env.d.ts                # Next.js environment types
├── next.config.ts               # Next.js configuration
├── package-lock.json            # Lock file for npm dependencies
├── package.json                 # Project metadata and dependencies
├── postcss.config.mjs           # PostCSS configuration
├── README.md                    # Project README
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

---

## Environment Variables

Ensure that the following environment variables are set in a `.env` file:

```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your-stripe-public-key
```

---

## Setup and Installation

### Prerequisites
- **Node.js**: >= 16.x
- **Docker** (for containerized environments)
- **PostgreSQL** database

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/swift-garden.git
   cd swift-garden/swift-garden-frontned
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Start the production server:
   ```bash
   npm start
   ```

6. Run linting checks:
   ```bash
   npm run lint
   ```

---

## Usage

### Default User Credentials

- **Admin**:
  - Email: `admin123@gmail.com`
  - Password: `admin123`

- **Vendor**:
  - Email: `vendor123@gmail.com`
  - Password: `vendor123`

- **Customer**:
  - Email: `user@gmail.com`
  - Password: `user123`

---



---

## Contributing

We welcome contributions! Please open an issue or submit a pull request to suggest improvements.
