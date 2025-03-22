'use client';

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from './theme-provider';
import { ClerkProvider } from '@clerk/nextjs';
import { ReactNode } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from './header';
import {Footer} from './footer';

interface WrapperProps {
  children: ReactNode;
}

export function Wrapper({ children }: WrapperProps) {
  return (
    <SessionProvider>
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''}
        afterSignOutUrl="/"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </ClerkProvider>
    </SessionProvider>
  );
}
