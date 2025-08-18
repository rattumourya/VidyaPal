import { BottomNavbar } from "@/components/shared/bottom-navbar";
import type { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 pb-20">{children}</main>
      <BottomNavbar />
    </div>
  );
}
