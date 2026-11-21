'use client';

import Sidebar from "@/components/tailgrids/core/sidebar";

import Footer from "./components/Footer";


export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-screen bg-[#0b0826] text-white">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="min-h-screen flex-1 p-6 lg:p-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
