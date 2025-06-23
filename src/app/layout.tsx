import type {Metadata} from 'next';
import './globals.css';
import { cn } from "@/lib/utils";
import { AuthProvider } from '@/components/providers/auth-provider';
import { Toaster } from "@/components/ui/toaster";
import { Inter, Roboto, Ruslan_Display } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-roboto' });
const ruslan = Ruslan_Display({ subsets: ['latin'], weight: ['400'], variable: '--font-ruslan' });


export const metadata: Metadata = {
  title: 'HackUp',
  description: 'Find your perfect hackathon team.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased min-h-screen bg-background", inter.variable, roboto.variable, ruslan.variable)}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
