
'use client'
import { Header } from "@/components/shared/header";
import type { ReactNode } from "react";
import { usePathname } from 'next/navigation'


export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isStudyRoom = pathname.includes('/study-room/')

  return (
    <div className="flex min-h-screen w-full flex-col">
      {!isStudyRoom && <Header />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
