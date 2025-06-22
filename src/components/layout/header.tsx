import Link from 'next/link';
import { AuthButton } from '@/components/auth-button';
import { Logo } from '@/components/logo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
                <Logo className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">TeamUp</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
           <AuthButton />
        </div>
      </div>
    </header>
  );
}
