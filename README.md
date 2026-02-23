# Investtech Next.js Application

A modern, Next.js-based frontend application with Tailwind CSS, powered by REST APIs. This project delivers a fast, maintainable, and financial market analysis and insights.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Overview

This application provides a comprehensive financial market analysis platform with features including:

- Real-time market data visualization
- Company analysis and technical indicators
- Watchlist management
- Research and documentation
- Multi-language support (English, Norwegian, Swedish, Danish, Finnish)

### Legacy Frontend

https://beta.investtech.com

### Authentication Gateway (SSO)

PHP-based SSO at `R:\lib\SSO.php` using the Jumbojett OpenID Connect library.

## Tech Stack

### Frontend

- **Framework:** Next.js 15.5.7 (App Router)
- **React:** 19.0.0
- **TypeScript:** Strict mode enabled
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI + shadcn/ui
- **State Management:** Zustand + TanStack Query
- **Form Handling:** React Hook Form + Zod validation
- **Internationalization:** next-intl
- **URL State:** nuqs
- **Date Handling:** date-fns
- **Security:** DOMPurify (isomorphic-dompurify)

### Backend Integration

- **API:** REST APIs
- **Authentication:** PHP-based SSO (Jumbojett OpenID Connect)
- **Runtime:** Node.js (LTS)

## Architecture

### Frontend Architecture (Next.js App Router)

The application follows Next.js 15 App Router conventions:

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── (web)/    # web-specific routes
│   └── (demo_components)/  # Demo/documentation routes
├── components/             # Reusable React components
│   ├── external-components/  # shadcn/ui components
│   └── custom-components/  # Custom business components
├── lib/                    # Utilities and services
│   ├── hooks/             # Custom React hooks
│   ├── services/          # API service layer
│   └── types/             # TypeScript type definitions
├── store/                  # State management
│   └── api-service/       # API service implementations
├── utils/                  # Helper functions
├── messages/              # i18n translation files
└── environment/           # Environment configurations
```

### Architecture Diagram

```
┌────────────────────────────────────────────────────────────┐
│                     Client Browser                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   React UI   │  │  Zustand     │  │ TanStack     │      │
│  │  Components  │  │  (Global     │  │ Query        │      │
│  │              │  │   State)     │  │ (API State)  │      │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘      │
└─────────┼─────────────────┼─────────────────┼──────────────┘
          │                 │                 │
          └─────────────────┴─────────────────┘
                            │
                    ┌───────▼────────┐
                    │  Next.js App   │
                    │     Router     │
                    └───────┬────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌───────▼────────┐  ┌───────▼────────┐
│   Middleware   │  │ Server         │  │ Client         │
│   (Auth,       │  │ Components     │  │ Components     │
│    Cookies)    │  │ (Data Fetch)   │  │ (Interactive)  │
└───────┬────────┘  └───────┬────────┘  └───────┬────────┘
        │                   │                   │
        └───────────────────┴───────────────────┘
                            │
                    ┌───────▼────────┐
                    │   API Layer    │
                    │  (Axios/Fetch) │
                    └───────┬────────┘
                            │
                    ┌───────▼────────┐
                    │  Backend APIs  │
                    │   (REST)       │
                    └────────────────┘
```

### Data Flow

1. **Request Flow:**
   - User interaction → Client Component → API Service → Backend API
   - Server Component → API Service → Backend API (Server-side)

2. **State Management:**
   - **Server State:** TanStack Query (caching, synchronization)
   - **Client State:** Zustand (UI preferences, local state)
   - **URL State:** nuqs (query parameters)

3. **Authentication Flow:**
   - Middleware validates session → Sets/refreshes cookies
   - API requests include authentication cookies
   - 401 responses trigger redirect to SSO

### Key Features

- **Server Components:** Optimized rendering with Next.js Server Components
- **Client Components:** Interactive features using React hooks
- **Middleware:** Request validation, authentication, and cookie management
- **Error Handling:** Comprehensive error boundaries and logging
- **Security:** XSS protection, secure cookies, CSP headers

### Authentication Flow

1. If no active session token exists:
   - Redirect to PHP-based SSO handler
   - Authenticate using OpenID Connect (via Jumbojett)
   - On success, return token/session data to frontend via cookie or URL param
2. Frontend consumes and persists session data
3. Middleware validates and refreshes authentication tokens

### State Management

- **Zustand:** Global client-side state (user preferences, UI state)
- **TanStack Query:** Server state management, caching, and synchronization
- **Local Storage:** Client-side persistence for user preferences
- **URL State (nuqs):** Query parameter state management

## Getting Started

### Prerequisites

- Node.js 24.x (LTS) or higher
- npm or yarn package manager
- Access to backend APIs
- Environment variables configured (see [Environment Variables]( src/environment/ configuration.local.ts, dev,prod, staging))

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/kjellerdev/investtech-next.git
   cd investtech-next
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   `src/environment/` file in the directory (see [Environment Variables](#src/environment/ configuration.local.ts, dev,prod, staging))

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Visit the application:**
   - Local: http://localhost:3000
   - SSO route: https://beta.investtech.com

### Environment-Specific Configuration

The application supports multiple environment configurations:

- `configuration.local.ts` - Local development
- `configuration.dev.ts` - Development environment
- `configuration.prod.ts` - Production environment
- `configuration.staging.ts` - staging environment

Configuration files are located in `src/environment/`.

## Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Format code
npm run format

# Check formatting
npm run format:check
```

build

- `./build.sh dev` - Development environment
- `./build.sh prod` - Production environment
- `./build.sh staging` - staging environment

### Development Guidelines

1. **Code Style:**
   - Follow TypeScript strict mode
   - Use functional components with hooks
   - Prefer Server Components when possible
   - Use Tailwind CSS for styling

2. **Component Structure:**
   - Keep components focused and reusable
   - Use TypeScript interfaces for props
   - Add JSDoc comments for exported functions

3. **State Management:**
   - Use Server Components for data fetching
   - Use Client Components for interactivity
   - Use TanStack Query for API state
   - Use Zustand for global UI state

4. **Internationalization:**
   - Use `useTranslations()` hook for client components
   - Use `getTranslations()` for server components
   - Avoid hardcoded strings in user-facing text
   - All user-facing text should be in translation files (`src/messages/`)
   - Use translation keys consistently (e.g., `common.button.submit`)

5. **Testing:**
   - Write unit tests for utilities
   - Test components in isolation
   - Use React Testing Library

### Project Structure

- **Pages:** Next.js App Router file-based routing
- **Components:** Reusable UI components
- **Services:** API integration layer
- **Utils:** Helper functions and utilities
- **Types:** TypeScript type definitions
- **Store:** State management (Zustand stores)

## Deployment

### Build Configuration

The application uses Next.js standalone output mode for optimized deployments:

- **Standalone Mode:** Creates minimal production build
- **BasePath:** `/web` (configurable)
- **Asset Prefix:** Matches basePath

### Deployment Options

#### Docker Deployment

See `Dockerfile` for containerized deployment:

```bash
docker build -t investtech-next .
docker run -p 3000:3000 investtech-next
```

#### Traditional Hosting

1. Build the application: `./build.sh dev` or `./build.sh prod`
2. Copy `web/` directory all automatic
3. Set up Node.js runtime

### Production Checklist

- [ ] configuration.prod.ts variables configured
- [ ] BasePath set correctly
- [ ] API endpoints accessible
- [ ] Authentication working
- [ ] Error tracking configured
- [ ] Performance monitoring enabled
- [ ] Security headers verified

### Deployment Troubleshooting

#### Build Failures

**Issue:** Build fails with TypeScript errors

- **Solution:** Run `npm run lint` to identify issues
- Check `tsconfig.json` for strict mode settings
- Ensure all dependencies are installed: `npm install`

**Issue:** Build fails with module resolution errors

- **Solution:** Check `tsconfig.json` path aliases
- Verify `@/` imports are correctly configured
- Clear `.next` directory and rebuild

#### Runtime Issues

**Issue:** Application fails to start in production

- **Solution:** Check environment variables are set
- Verify `NODE_ENV=production` is set
- Check server logs for specific errors
- Ensure all required files are deployed (`.next/standalone`, `web/`)

**Issue:** API requests fail in production

- **Solution:** Verify `BASE_API_URL` is correct
- Check CORS settings on backend
- Verify authentication cookies are being set
- Check network tab for request/response details

**Issue:** Images or assets not loading

- **Solution:** Verify `basePath` and `assetPrefix` are configured correctly
- Check `public/` directory is deployed
- Verify image optimization settings in `next.config.ts`

#### Performance Issues

**Issue:** Slow page loads

- **Solution:** Check bundle size with `npm run build`
- Review Server Components usage (minimize 'use client')
- Enable caching headers
- Check middleware performance

**Issue:** High memory usage

- **Solution:** Monitor middleware cache size
- Review in-memory caches
- Check for memory leaks in components
- Consider external cache (Redis) for production

#### Authentication Issues

**Issue:** Users cannot log in

- **Solution:** Verify SSO endpoint is accessible
- Check `AUTH_ENABLED` environment variable only for dev
- Verify cookie settings (secure, httpOnly, sameSite)
- Check middleware authentication logic

**Issue:** Session expires unexpectedly

- **Solution:** Check cookie `maxAge` settings
- Verify session refresh logic
- Check backend session timeout settings

## API Documentation

### API Service Layer

API services are located in `src/store/api-service/`:

- **Client Services:** Browser-side API calls (using axios)
- **Server Services:** Server-side API calls (using axios)
- **Edge Services:** Edge runtime compatible services

### API Structure

```
/api-service/
├── api-urls.ts          # api endpoints
```

```
/api/v1/web/?context={context_type}
```

### API Endpoints by Feature

#### Companies

- `GET /api/v1/web/?context=company` - Get company listings and search
- `GET /api/v1/web/?context=company_analysis` - Get detailed company analysis

#### Stocks & Market Data

- `GET /api/v1/web/?context=stocks` - Get stock listings
- `GET /api/v1/web/?context=top50` - Get top 50 stocks
- `GET /api/v1/web/?context=index` - Get market indices

#### Watchlist

- `GET /api/v1/web/?context=watchlist` - Get user watchlist

#### User Notes

- `GET /api/v1/web/?context=mynotes` - Get user notes
- `GET /api/v1/web/?context=mynotes&action=modify` - Create/update and delete user notes

#### Research & Content

- `GET /api/v1/web/research/{slug}` - Get research articles
- `GET /api/v1/web/?context=market_commentary` - Get market commentary
- `GET /api/v1/web/?context=todayscase` - Get today's market case studies

#### Portfolio & Analytics

- `GET /api/v1/web/?context=model_portfolio` - Get model portfolios
- `GET /api/v1/web/?context=svgchart` - Get SVG chart data

#### User & Application

- `GET /api/v1/web/?context=home` - Get home page content
- `GET /api/v1/web/?context=user_settings` - Get user settings
- `GET /api/v1/web/?context=authorization` - Get authorization data
- `GET /api/v1/web/?context=static_content` - Get static content (FAQs, help, etc.)

### Authentication

API requests require authentication via:

- **Cookie:** `websid` (httpOnly, secure, sameSite: lax)
- **Headers:** Custom headers as required by backend

### Error Handling

API errors are handled through:

- Axios interceptors for client-side requests
- Try-catch blocks in service functions
- Error boundaries for React components
- Centralized error logging

### Request/Response Format

- **Request:** JSON body for POST/PUT requests
- **Response:** JSON format with standardized error structure
- **Pagination:** Query parameters (`limit`, `offset`)
- **Filtering:** Query parameters for filtering and sorting

## Contributing

### Development Workflow

1. Create a feature branch from `main`
2. Make changes following code style guidelines
3. Write/update tests
4. Update documentation
5. Submit pull request

### Code Review Guidelines

- All code must pass linting
- TypeScript strict mode compliance
- Tests must pass
- Documentation updated
- Security considerations reviewed

### Commit Message Format

```
ticket_id: subject or title

Example

NNJ-33: subject or title
```

## Additional Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Internal Documentation

- Deployment configuration: See deployment documentation
- Security practices: See security guidelines
- Component library: See component documentation

## Support

For issues, questions, or contributions:

1. Check existing documentation
2. Search existing issues
3. Create a new issue with detailed information
4. Contact the development team
