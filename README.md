# YASHODA - E-commerce Platform

## Project Description for Resume

**YASHODA (Your All-Season Hyper Online Digital Apparel)** is a full-stack e-commerce web application built with modern technologies, featuring a futuristic design and comprehensive admin dashboard.

### Key Features:
- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Framer Motion animations
- **Backend**: Node.js API routes with MongoDB Atlas integration
- **Authentication**: JWT-based auth system with role-based access (Admin/Customer)
- **Database**: MongoDB Atlas with collections for users, products, orders
- **UI/UX**: Responsive design with animated components, dark theme, gradient effects
- **Admin Panel**: Complete CRUD operations for products, orders, users management
- **Shopping Cart**: Persistent cart with localStorage, checkout process
- **Product Management**: Categories (Fashion, Electronics, Home Decor, Skincare)
- **Payment Ready**: Structured for payment gateway integration

### Technical Implementation:
- **State Management**: React Context API for cart and authentication
- **API Design**: RESTful endpoints for all CRUD operations
- **Security**: Password hashing with bcrypt, JWT tokens, protected routes
- **Performance**: Image optimization, lazy loading, responsive design
- **Deployment Ready**: Configured for Vercel deployment with environment variables

### Business Logic:
- Multi-category product catalog with 24+ sample products
- Indian Rupee pricing with tax calculations
- Inventory management with stock tracking
- Order processing workflow
- User role management (Admin/Customer)
- Real-time cart updates and checkout process

## Local Setup Instructions

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager
- MongoDB Atlas account (free tier works)

### Step-by-Step Setup

1. **Clone/Download the Project**
   \`\`\`bash
   # If using git
   git clone <your-repo-url>
   cd yashoda-ecommerce
   
   # Or extract the downloaded ZIP file
   \`\`\`

2. **Install Dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment Setup**
   - Copy the `.env.local` file (already configured)
   - The MongoDB connection is already set up
   - No additional configuration needed

4. **Initialize Database (Optional)**
   \`\`\`bash
   # Run this to populate sample data
   node scripts/setup-yashoda-database.js
   \`\`\`

5. **Start Development Server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin/login

### Default Login Credentials

**Admin Login:**
- Email: admin@yashoda.com
- Password: admin123

**Customer Login:**
- Email: customer@yashoda.com  
- Password: customer123

### Project Structure
\`\`\`
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── admin/             # Admin dashboard
│   ├── categories/        # Product categories
│   └── components/        # Reusable components
├── components/            # UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── scripts/              # Database setup scripts
\`\`\`

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Features Implemented
✅ User Authentication (Login/Register)
✅ Product Catalog with Categories
✅ Shopping Cart Functionality
✅ Admin Dashboard
✅ Order Management
✅ Responsive Design
✅ MongoDB Integration
✅ JWT Authentication
✅ Role-based Access Control
