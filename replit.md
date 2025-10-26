# HealthTrack - Personal Health Management Platform

## Overview

HealthTrack is a comprehensive health management web application that enables users to track medications, monitor vital health metrics (blood pressure, heart rate, etc.), and manage their wellness journey. The application features a modern, health-focused design with clinical clarity and trustworthy presentation, drawing inspiration from Apple Health and MyFitnessPal.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing
- React Query (@tanstack/react-query) for server state management and data fetching

**UI Component System**
- Shadcn UI component library with Radix UI primitives
- Tailwind CSS for utility-first styling with custom design tokens
- Custom theme system supporting light/dark modes
- Design system based on Material Design principles with health app references

**State Management Strategy**
- React Query for asynchronous server state
- React Context for global UI state (theme, authentication)
- Local component state with React hooks
- localStorage for authentication token persistence

**Design Philosophy**
- Clinical clarity with scannable information hierarchy
- Professional yet approachable health-focused aesthetic
- Data-first design with charts and metrics prioritized
- Typography system using Inter (body), Plus Jakarta Sans (headings), and JetBrains Mono (numeric data)

### Backend Architecture

**Server Framework**
- Express.js as the HTTP server framework
- Custom middleware for request logging and error handling
- Session-based authentication preparation (connect-pg-simple)
- RESTful API design pattern with `/api` prefix

**Module Structure**
- Route registration system (`registerRoutes`) for API endpoints
- Storage abstraction layer (`IStorage` interface) for data operations
- In-memory storage implementation (`MemStorage`) as development placeholder
- Prepared for database migration with Drizzle ORM integration

**API Design**
- JWT token-based authentication system
- Endpoints for user registration and login
- CRUD operations for medications and health metrics
- User-scoped data access patterns

### Data Storage Solutions

**Database Strategy**
- PostgreSQL as the production database (configured via DATABASE_URL)
- Drizzle ORM for type-safe database queries and migrations
- Schema-first approach with Zod validation integration

**Data Models**
- **Users**: Core authentication and profile data (id, name, email, password, age)
- **Medications**: User medication tracking (name, dosage, frequency, instructions)
- **Health Metrics**: Polymorphic health data storage supporting multiple metric types (blood pressure with systolic/diastolic, or single-value metrics like heart rate)

**Schema Design Decisions**
- UUID primary keys generated via `gen_random_uuid()`
- User ID foreign keys for data isolation
- Flexible metric storage allowing both single-value and multi-value measurements
- Timestamp tracking for temporal data analysis

### Authentication & Authorization

**Authentication Mechanism**
- JWT (JSON Web Token) based authentication
- Tokens stored in localStorage on client
- User profile cached alongside token
- Automatic token validation and refresh handling

**Authorization Pattern**
- Client-side route protection via AuthGuard component
- Unauthorized (401/403) handler for automatic logout and redirect
- User-scoped data queries preventing cross-user data access
- Prepared session management with connect-pg-simple

**Security Considerations**
- Password hashing expected in production implementation
- CORS and credential handling configured
- Secure token storage and transmission patterns

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (dialogs, dropdowns, tooltips, etc.)
- **Recharts**: Chart library for health metric visualization
- **Lucide React**: Icon system for consistent iconography
- **Embla Carousel**: Touch-enabled carousel component

### Development & Build Tools
- **TypeScript**: Static type checking across frontend and backend
- **Vite**: Fast build tool with HMR and optimized production builds
- **PostCSS & Autoprefixer**: CSS processing pipeline
- **ESBuild**: Fast JavaScript bundler for server-side code

### Backend Services
- **Neon Database (@neondatabase/serverless)**: Serverless PostgreSQL database provider
- **Drizzle Kit**: Database migration and schema management tools
- **Connect-pg-simple**: PostgreSQL session store for Express

### Utility Libraries
- **date-fns**: Date manipulation and formatting
- **class-variance-authority**: Type-safe component variant management
- **clsx & tailwind-merge**: Conditional className utilities
- **nanoid**: Unique ID generation

### Form Management
- **React Hook Form**: Performant form state management
- **@hookform/resolvers**: Form validation resolver adapters
- **Zod**: Schema validation integrated with Drizzle and forms

### External API Integration
- Backend API configured to communicate with external health tracking service at `https://healthtrack-backend-redj.onrender.com`
- API wrapper with error handling and automatic token injection
- Unauthorized request handler for session management