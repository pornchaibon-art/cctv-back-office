'use client';

import Sidebar from "@/components/tailgrids/core/sidebar";

import Footer from "./components/Footer";


export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0 p-6">
          {children}
        </main>
      </div>

      <Footer />
    </>
  );
}
