# ShotLinks - URL Shortener

A modern, full-featured URL shortening web application built with Next.js, MongoDB, and Clerk Authentication.

## 🚀 Features

### Core Functionality
- **URL Shortening**: Create short, memorable links from long URLs
- **Real-time Analytics**: Track clicks and performance metrics
- **User Authentication**: Secure sign-up/login with Clerk
- **URL Management**: View, search, and delete your shortened URLs
- **Rate Limiting**: Protection against abuse for non-authenticated users

### User Experience
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Copy to Clipboard**: One-click copying of shortened URLs
- **Loading States**: Smooth user feedback during operations
- **Error Handling**: Comprehensive error messages and validation

### Technical Features
- **SEO Optimized**: Proper meta tags and structured data
- **TypeScript**: Full type safety throughout the application
- **API Routes**: RESTful API endpoints for all functionality
- **Database Indexing**: Optimized queries for performance
- **Security**: Input validation, rate limiting, and authentication

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: MongoDB Atlas with Mongoose ODM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Validation**: Zod

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js 18+ 
- npm or yarn
- MongoDB Atlas account
- Clerk account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd shotlinks-url-shortener
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
CLERK_SECRET_KEY=your_clerk_secret_key_here

# MongoDB Atlas
MONGODB_URI=your_mongodb_atlas_connection_string_here

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Configure Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Copy your publishable key and secret key
4. Add `http://localhost:3000` to your allowed origins

### 5. Configure MongoDB Atlas

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get your connection string
4. Replace `your_mongodb_atlas_connection_string_here` with your actual connection string

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
shotlinks-url-shortener/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── urls/          # URL-related API endpoints
│   ├── about/             # About page
│   ├── faq/               # FAQ page
│   ├── history/           # User history page (protected)
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── Navigation.tsx     # Navigation component
│   └── UrlShortener.tsx   # URL shortening form
├── lib/                   # Utility functions
│   ├── database.ts        # Database connection
│   └── utils.ts           # Helper functions
├── models/                # Database models
│   └── Url.ts             # URL model schema
├── middleware.ts          # Clerk middleware
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies and scripts
```

## 🔧 Configuration

### Database Schema

The application uses a MongoDB collection with the following schema:

```typescript
interface Url {
  originalUrl: string;      // The original long URL
  shortCode: string;        // 6-8 character unique code
  userId?: string;          // Clerk user ID (optional)
  clickCount: number;       // Number of clicks
  createdAt: Date;          // Creation timestamp
  lastAccessed?: Date;      // Last access timestamp
  isActive: boolean;        // Soft delete flag
}
```

### API Endpoints

- `POST /api/urls/create` - Create a new shortened URL
- `GET /api/urls/redirect/[shortCode]` - Redirect to original URL
- `GET /api/urls/history` - Get user's URL history (authenticated)
- `DELETE /api/urls/[id]` - Delete a URL (authenticated)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- **Input Validation**: All inputs are validated using Zod
- **Rate Limiting**: Non-authenticated users are limited to 1 URL per minute
- **Authentication**: Protected routes require Clerk authentication
- **CORS Protection**: Configured middleware for security
- **SQL Injection Protection**: Using Mongoose ODM
- **XSS Protection**: React's built-in XSS protection

## 📱 Mobile Responsiveness

The application is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🎨 Customization

### Styling

The application uses Tailwind CSS with a custom color scheme. You can modify the colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your primary color palette
      },
      secondary: {
        // Your secondary color palette
      }
    }
  }
}
```

### Branding

Update the following files to customize branding:
- `app/layout.tsx` - Meta tags and title
- `components/Navigation.tsx` - Logo and navigation
- `app/page.tsx` - Hero section content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [FAQ page](/faq)
2. Review the [documentation](docs/)
3. Open an issue on GitHub
4. Contact support at support@shotlinks.com

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for authentication
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [MongoDB](https://www.mongodb.com/) for the database
- [Lucide](https://lucide.dev/) for beautiful icons

---

Made with ❤️ by the ShotLinks team 