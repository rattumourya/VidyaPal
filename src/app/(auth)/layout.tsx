import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 items-center justify-center bg-gradient-to-br from-background to-blue-100">
        {children}
      </main>
    </div>
  );
}
