import { AuthButton } from '@/components/auth-button';

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="container flex h-20 items-center">
        <div className="flex flex-1 items-center justify-end space-x-2">
           <AuthButton />
        </div>
      </div>
    </header>
  );
}
