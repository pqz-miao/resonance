# AGENTS.md - Developer Guide for Resonance

This document provides guidelines for AI agents working on this codebase.

## Project Overview

- **Framework**: Next.js 16 with React 19
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui pattern (Radix UI primitives)
- **Path Alias**: `@/*` maps to `./src/*`

## Build / Lint / Test Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint -- --fix    # Auto-fix ESLint issues
npx tsc --noEmit     # TypeScript type checker
```

**Note**: This project has no test suite. Do not write tests unless explicitly requested.

---

## Code Style Guidelines

### General Principles
- Use functional components with hooks over class components
- Prefer composition over inheritance
- Keep components small and focused
- Extract reusable logic into custom hooks in `src/hooks/`
- Use TypeScript for all files (`.ts` or `.tsx`)

### Imports
Order: React/Next → External libraries → Internal components/hooks (`@/` alias) → Type imports.

```typescript
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import type { User } from "@/types"
```

### File Naming
- Components: `kebab-case.tsx` (e.g., `button.tsx`)
- Hooks/Utils: `kebab-case.ts` (e.g., `use-mobile.ts`, `utils.ts`)
- Types: `kebab-case.ts` or `types.ts`

### Component Structure
```tsx
import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

### Types and Interfaces
- Use `interface` for public APIs and component props
- Use `type` for unions, intersections, and utility types
- Avoid `any` - use `unknown` if type is truly unknown

### Error Handling
- Use Zod for runtime validation and type inference
- Handle errors gracefully with user-friendly messages
- Use `try/catch` for async operations

### Tailwind CSS
- Use `@apply` sparingly (prefer utility classes in JSX)
- Use semantic color tokens (e.g., `bg-primary`, `text-muted-foreground`)
- Use `cn()` utility for conditional class merging

### Server vs Client Components
- Default to Server Components in Next.js App Router
- Add `"use client"` only when needed (hooks, event handlers, browser APIs)
- Keep `"use client"` at the top of the file, before imports

### Naming Conventions
- Components: PascalCase (e.g., `Button`)
- Functions: camelCase (e.g., `formatDate`)
- Constants: UPPER_SNAKE_CASE for true constants
- Files: kebab-case (e.g., `user-profile.tsx`)

### Accessibility
- Use semantic HTML elements
- Include proper ARIA attributes when needed
- Ensure keyboard navigation works

### Git Conventions
- Write concise commit messages
- Run `npm run lint` and `npm run build` before committing
- Do not commit `node_modules`, `.next`, or environment files

---

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/ui/        # shadcn/ui components
├── hooks/                # Custom React hooks
└── lib/                  # Utilities (utils.ts)
```

---

## Common Tasks

### Adding a new UI component
1. Use shadcn CLI: `npx shadcn add <component-name>`
2. Or copy an existing component from `src/components/ui/` as reference

### Adding a new page
1. Create `src/app/<path>/page.tsx`
2. Use Server Component by default
3. Add `"use client"` only if interactivity is needed

### Using Zod for form validation
```typescript
import { z } from "zod"

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})
```
