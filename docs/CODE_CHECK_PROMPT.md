# Code Audit

## Overview

You are a senior code auditor specializing in Next.js 15, React 19, TypeScript, and modern web application security. Your task is to conduct a comprehensive code audit of this Next.js application and provide actionable recommendations.

**IMPORTANT**: This audit must result in a comprehensive audit report. The audit report is a required deliverable and must include all findings, risk assessments, action plans, and remediation recommendations as detailed in the Deliverables section.

## Project Context

- **Framework**: Next.js 15.3.3 (App Router)
- **React Version**: 19.0.0
- **TypeScript**: Strict mode enabled
- **State Management**: Zustand + TanStack Query
- **Form Handling**: React Hook Form + Zod validation
- **UI Components**: Radix UI + shadcn/ui
- **Internationalization**: next-intl
- **URL State Management**: nuqs (for URL query parameter state)
- **Date Handling**: date-fns for date manipulation and formatting
- **Security**: DOMPurify (isomorphic-dompurify) for sanitization
- **Styling**: Tailwind CSS 4

## Audit Scope

### 1. Security Audit

#### 1.1 XSS (Cross-Site Scripting) Vulnerabilities

- [ ] Review all user input handling and rendering
- [ ] Verify DOMPurify usage for all dynamic HTML content
- [ ] Check for `dangerouslySetInnerHTML` usage without sanitization
- [ ] Audit SVG rendering and sanitization (check `sanitize-svg.ts`)
- [ ] Review API response handling for unsanitized data
- [ ] Verify Content Security Policy (CSP) implementation
- [ ] Check for unsafe `eval()`, `innerHTML`, or `document.write()` usage

#### 1.2 Authentication & Authorization

- [ ] Review authentication flow and token storage
- [ ] Check for exposed API keys or secrets in client-side code
- [ ] Verify proper session management
- [ ] Review authorization checks for protected routes
- [ ] Check for privilege escalation vulnerabilities
- [ ] Audit authentication cookie (`websid`) security settings (`httpOnly`, `secure`, `sameSite`, `maxAge`)
- [ ] Review session expiry handling in `src/app/session_expiry/`
- [ ] Verify edge runtime authentication service implementation (`auth_api_service_edge.ts`)
- [ ] Check for secure cookie transmission in production vs development
- [ ] Review authentication error handling and silent failures
- [ ] Verify cookie validation before setting (invalid `websid` rejection)

#### 1.4 Data Validation & Sanitization

- [ ] Verify Zod schemas for all user inputs
- [ ] Check server-side validation for API endpoints
- [ ] Review file upload handling (if applicable)
- [ ] Verify SQL injection protection (if using database)
- [ ] Check for NoSQL injection vulnerabilities

#### 1.5 Dependency Security

- [ ] Review `package.json` for known vulnerabilities
- [ ] Check for outdated dependencies with security patches
- [ ] Verify no usage of deprecated packages
- [ ] Review transitive dependencies

#### 1.6 Security Headers

- [ ] Verify security headers in `next.config.ts`
- [ ] Check for missing security headers
- [ ] Review CSP implementation
- [ ] Verify HSTS configuration

### 2. Performance Audit

#### 2.1 Next.js Optimization

- [ ] Review rendering strategy (SSR, SSG, ISR, CSR) usage
- [ ] Check for unnecessary `'use client'` directives
- [ ] Verify React Server Components usage where appropriate
- [ ] Review `next/image` usage for all images
- [ ] Check for proper code splitting
- [ ] Verify dynamic imports for heavy components
- [ ] Review bundle size and identify optimization opportunities

#### 2.2 React Performance

- [ ] Identify unnecessary re-renders
- [ ] Check for missing `React.memo` where beneficial
- [ ] Review `useEffect` dependencies
- [ ] Verify proper cleanup in effects
- [ ] Check for memory leaks
- [ ] Review state management efficiency

#### 2.3 Data Fetching

- [ ] Verify TanStack Query cache configuration
- [ ] Check for duplicate API calls
- [ ] Review query key structure
- [ ] Verify proper loading and error states
- [ ] Check for N+1 query problems
- [ ] Review data revalidation strategies

#### 2.4 Asset Optimization

- [ ] Verify image optimization
- [ ] Check font loading strategy
- [ ] Review CSS bundle size
- [ ] Check for unused CSS
- [ ] Verify lazy loading implementation

#### 2.5 Middleware Performance

- [ ] Review middleware request deduplication logic and cache efficiency
- [ ] Audit in-memory cache size limits and cleanup strategies
- [ ] Check for potential memory leaks in middleware caching
- [ ] Verify cache cleanup interval optimization
- [ ] Review middleware execution time and impact on request latency
- [ ] Check for unnecessary middleware execution on excluded paths
- [ ] Audit URL validation performance in middleware

#### 2.6 Edge Runtime Performance

- [ ] Review edge function performance characteristics
- [ ] Check for edge runtime limitations and workarounds
- [ ] Verify edge-compatible dependencies (no Node.js-specific APIs)
- [ ] Audit edge function execution time and cold starts
- [ ] Review edge function memory usage and limits

#### 2.7 Cookie Management Performance

- [ ] Audit cookie reading/writing operations
- [ ] Review cookie parsing performance
- [ ] Check for unnecessary cookie operations
- [ ] Verify cookie size limits and implications

### 3. Code Quality Audit

#### 3.1 TypeScript

- [ ] Check for `any` types and replace with proper types
- [ ] Verify strict type checking compliance
- [ ] Review type definitions in `lib/types/`
- [ ] Check for missing type annotations
- [ ] Verify proper interface/type usage
- [ ] Review generic type usage

#### 3.2 React Best Practices

- [ ] Verify functional components over class components
- [ ] Check for proper hook usage
- [ ] Review component composition
- [ ] Verify prop types/interfaces
- [ ] Check for prop drilling issues
- [ ] Review custom hooks extraction

#### 3.3 Next.js Best Practices

- [ ] Verify App Router conventions
- [ ] Check route structure and organization
- [ ] Review middleware implementation
- [ ] Verify proper error boundaries
- [ ] Check for proper loading states
- [ ] Review API route structure

#### 3.3.1 Middleware Implementation Audit

- [ ] Review middleware request deduplication logic and cache management
- [ ] Audit URL parameter validation (`validateUrlLanguage`, `validateUrlMarketId`, `validateUrlLimit`)
- [ ] Verify middleware cookie setting logic and security (`ensureDefaultCookies`, `setAuthCookie`)
- [ ] Check for proper error handling in middleware (validation failures, auth failures)
- [ ] Review middleware path exclusion logic (`shouldExcludePath`)
- [ ] Audit middleware cache size limits and cleanup strategies
- [ ] Verify middleware execution order and performance impact
- [ ] Check for race conditions in middleware cache operations
- [ ] Review middleware logging and debug headers
- [ ] Verify cookie security settings in middleware (httpOnly, secure, sameSite)
- [ ] Check for proper handling of edge runtime limitations

#### 3.4 Code Organization

- [ ] Review folder structure
- [ ] Check for circular dependencies
- [ ] Verify proper separation of concerns
- [ ] Review utility function organization
- [ ] Check component file structure

#### 3.5 Error Handling

- [ ] Review error boundary implementation
- [ ] Check for proper try-catch blocks
- [ ] Verify user-friendly error messages
- [ ] Review error logging
- [ ] Check for unhandled promise rejections

#### 3.6 URL State Management (nuqs)

- [ ] Review nuqs usage for URL query parameter state management
- [ ] Verify proper parsing and serialization of URL parameters
- [ ] Check for synchronization issues between URL state and component state
- [ ] Review type safety in URL parameter definitions
- [ ] Verify proper default values and validation for URL parameters
- [ ] Check for URL parameter validation and sanitization
- [ ] Review performance implications of URL state updates

### 4. Accessibility Audit

#### 4.1 ARIA & Semantic HTML

- [ ] Verify proper ARIA labels
- [ ] Check for semantic HTML usage
- [ ] Review keyboard navigation
- [ ] Verify focus management
- [ ] Check for proper heading hierarchy

#### 4.2 WCAG Compliance

- [ ] Review color contrast ratios
- [ ] Check for alt text on images
- [ ] Verify form label associations
- [ ] Review screen reader compatibility
- [ ] Check for keyboard-only navigation

### 5. Internationalization Audit

#### 5.1 i18n Implementation

- [ ] Verify all user-facing text uses next-intl
- [ ] Check for hardcoded strings
- [ ] Review translation file completeness
- [ ] Verify proper locale handling
- [ ] Check for missing translations

#### 5.2 Locale-Specific Issues

- [ ] Review date/time formatting using date-fns
- [ ] Check number formatting
- [ ] Verify currency formatting
- [ ] Review RTL language support (if applicable)
- [ ] Verify date-fns locale imports and usage
- [ ] Check for proper timezone handling in date operations

### 6. Documentation

#### 6.1 Documentation

- [ ] Review code comments
- [ ] Check for README completeness
- [ ] Verify API documentation
- [ ] Review component documentation
- [ ] Check for inline documentation

### 7. Specific File Audits

#### 8.1 Critical Files to Review

- [ ] `src/middleware.ts` - Request deduplication, validation, and routing
- [ ] `src/middleware.config.ts` - URL validation, cookie management, and middleware configuration
- [ ] `src/lib/axios.ts` - Client-side API client configuration and interceptors
- [ ] `src/lib/server_axios.ts` - Server-side API client and error handling
- [ ] `src/lib/server_cookie.ts` - Server-side cookie utilities
- [ ] `src/utils/sanitize-svg.ts` - SVG sanitization and XSS prevention
- [ ] `src/store/api_service/auth_api_service_edge.ts` - Edge runtime authentication service
- [ ] `src/app/company/[id]/components/MainChartSection.tsx` - Complex component
- [ ] `src/app/session_expiry/` - Session expiry handling and redirect logic
- [ ] State management in `src/store/` - Zustand stores and API services
- [ ] API routes in `src/app/nextapi/` - **Note**: Currently empty directory, audit for future API development

#### 8.2 Security-Critical Components

- [ ] Form components with user input
- [ ] Components rendering user-generated content
- [ ] API route handlers (when implemented)
- [ ] Authentication components and session management
- [ ] Session expiry page and redirect logic
- [ ] SVG rendering components using `sanitize-svg.ts`
- [ ] Components with `dangerouslySetInnerHTML` usage
- [ ] File upload components (if any)
- [ ] Components handling URL parameters (nuqs integration)

## Audit Output Format

For each finding, provide:

1. **Severity**: Critical | High | Medium | Low | Info
2. **Category**: Security | Performance | Code Quality | Accessibility | i18n | Other
3. **File Path**: Exact file location
4. **Line Numbers**: Specific lines (if applicable)
5. **Issue Description**: Clear explanation of the problem
6. **Impact**: What could happen if not fixed
7. **Recommendation**: Specific, actionable fix
8. **Code Example**: Show current code and suggested fix
9. **Priority**: Immediate | High | Medium | Low

## Example Finding Format

````markdown
### [CRITICAL] XSS Vulnerability in SVG Rendering

**File**: `src/utils/sanitize-svg.ts:45-52`
**Category**: Security
**Severity**: Critical

**Issue**:
SVG content is being rendered without proper sanitization, potentially allowing XSS attacks through malicious SVG attributes.

**Current Code**:

```typescript
// Current unsafe implementation
const renderSVG = (svgContent: string) => {
  return <div dangerouslySetInnerHTML={{ __html: svgContent }} />;
};
```
````

**Impact**:
An attacker could inject malicious JavaScript through SVG attributes, leading to XSS attacks and potential data theft.

**Recommendation**:
Use DOMPurify to sanitize SVG content before rendering.

**Suggested Fix**:

```typescript
import DOMPurify from 'isomorphic-dompurify';

const renderSVG = (svgContent: string) => {
  const sanitized = DOMPurify.sanitize(svgContent, {
    USE_PROFILES: { svg: true, svgFilters: true }
  });
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
};
```

**Priority**: Immediate

```

## Priority Guidelines

- **Immediate**: Security vulnerabilities, data leaks, critical bugs
- **High**: Performance issues affecting user experience, accessibility violations
- **Medium**: Code quality improvements, optimization opportunities
- **Low**: Code style, minor refactoring, documentation improvements

## Deliverables

**A comprehensive audit report is REQUIRED.** The audit report must include all of the following components:

### 1. Executive Summary
- High-level overview of findings categorized by severity
- Summary statistics (total issues found, breakdown by category)
- Critical issues that require immediate attention
- Overall risk assessment of the codebase
- Key recommendations at a glance

### 2. Comprehensive Audit Report
A detailed audit report documenting all findings across all audit categories:

#### 2.1 Security Audit Report
- Complete findings from all security audit sections (XSS, Authentication, etc.)
- Security vulnerabilities categorized by severity
- Security compliance status

#### 2.2 Performance Audit Report
- Performance bottlenecks identified
- Optimization opportunities
- Bundle size analysis
- Middleware and edge runtime performance findings

#### 2.3 Code Quality Audit Report
- TypeScript type safety issues
- React and Next.js best practices violations
- Code organization and maintainability issues
- Error handling gaps

#### 2.4 Accessibility Audit Report
- WCAG compliance status
- Accessibility violations
- Keyboard navigation issues
- Screen reader compatibility issues

#### 2.5 Internationalization Audit Report
- Missing translations
- Hardcoded strings
- Locale-specific issues
- Date/number formatting issues

#### 2.6 Documentation Report
- Documentation gaps
- Code commenting quality
- README completeness
- API documentation status

### 3. Risk Assessment
- Prioritized list of all issues by severity (Critical, High, Medium, Low, Info)
- Risk matrix showing impact vs. likelihood
- Timeline estimates for remediation
- Business impact analysis for critical issues

### 4. Detailed Findings Documentation
Each finding must include:
- **Severity**: Critical | High | Medium | Low | Info
- **Category**: Security | Performance | Code Quality | Accessibility | i18n | Other
- **File Path**: Exact file location
- **Line Numbers**: Specific lines (if applicable)
- **Issue Description**: Clear explanation of the problem
- **Impact**: What could happen if not fixed
- **Recommendation**: Specific, actionable fix
- **Code Example**: Current code and suggested fix (as per Example Finding Format)
- **Priority**: Immediate | High | Medium | Low

### 5. Remediation Action Plan
- Step-by-step remediation plan for all findings
- Prioritized action items by severity and impact
- Estimated effort for each remediation
- Dependencies between fixes
- Recommended implementation order
- Timeline and milestones for remediation

### 6. Code Fixes
- Specific code changes for critical and high-priority issues
- Code examples showing before/after for each fix
- Implementation-ready code snippets
- Migration guides for breaking changes

### 7. Recommendations Summary
- Best practices recommendations
- Architecture improvements
- Security hardening recommendations
- Performance optimization roadmap
- Documentation improvement suggestions

### 8. Audit Methodology
- Description of audit approach and tools used
- Files and directories reviewed
- Limitations and scope of the audit

### 9. Rating

Code Analytic Audit Report — (Template / Initial Assessment)

**Overall Rating**: **
## Rating **
**Security** | **
**Performance** | **
**Code Quality** | **
**Accessibility** | **
**Internationalization** | **
**Documentation** | **

**Rating Methodology**:
- **A (90-100)**: Excellent - Production ready, minimal improvements
- **B (80-89)**: Good - Production ready, some improvements recommended
- **C (70-79)**: Fair - Needs improvements before production
- **D (60-69)**: Poor - Significant improvements required
- **F (<60)**: Critical - Not production ready


**Note**: The audit report should be comprehensive, well-structured, and actionable. All findings must be documented with sufficient detail to enable immediate remediation.

## Additional Considerations

- Review recent changes in git history for regression risks
- Check for compliance with project coding standards
- Verify alignment with Next.js 15 best practices
- Review React 19 compatibility and new features usage
- Check for deprecated patterns or APIs
- Review date-fns usage patterns and locale handling (replaced Moment.js)
- Verify nuqs URL state management implementation and best practices
- Audit middleware request deduplication and caching strategies
- Verify edge runtime compatibility for middleware and auth services
- Review Tailwind CSS 4 implementation and migration from v3 (if applicable)

---

**Note**: This audit should be thorough, actionable, and prioritize security and performance issues. All recommendations should include specific code examples and be immediately implementable.
```
