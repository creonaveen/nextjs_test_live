## Nordnet Partner Solution - Next.js, Tailwind CSS

A modern, Next.js-based frontend with Tailwind CSS, powered by a PHP backend serving REST APIs. This project aims to deliver a fast, maintainable, and scalable partner integration platform.

## Overview

### Legacy Frontend:

http://10.10.1.4/partners/nordnetsso/

### New Frontend (WIP):

http://10.10.1.30:3030/

### Authentication Gateway (SSO):

PHP-based SSO at `R:\lib\nordnetSSO.php` using the Jumbojett OpenID Connect library.

## Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **SSO Authentication:** PHP (Jumbojett OpenID Connect)
- **Runtime Requirements:** Node.js (LTS), PHP backend

## Authentication Flow

- If no active session token exists:
  - Redirect to the PHP-based SSO handler.
  - Authenticate using OpenID Connect (via Jumbojett).
  - On success, return token/session data to frontend via cookie or URL param.
- Frontend consumes and persists session data.

## Architecture Overview

### Frontend (Next.js)

- Modern React component structure
- Tailwind CSS-based design system
- Page-based routing with Next.js
- SSR/SSG for performance optimization

### Authentication (PHP)

- SSO built with Jumbojett (OpenID Connect)
- Logic in `R:\lib\nordnetSSO.php`
- Session returned via cookies or headers

### State Management

- Lightweight session handling using Zustand
- Auto-expiration, token verification, and secure route guarding

### Local Development Instructions

1. Clone the repository:

   ```bash
      git clone https://github.com/varunsat/investtech-nordnet-next.git
      cd nordnet-next
   ```

2. Install dependencies:

   ```bash
      npm install
   ```

3. Start development server:

```bash
   npm run dev
```

4. Visit:
   http://localhost:3000 (locally)
   https://www.investtech.com/partners/nordnetsso/index.php?MarketID=1&product=0 (SSO route)

### Objectives Recap

- Replicate legacy UI using new design
- Integrate with existing PHP SSO flow
- Secure session persistence
- Mobile-first, responsive layout
- Logging and error monitoring
- Token refresh/renewal support
