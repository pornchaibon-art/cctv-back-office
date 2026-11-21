import type { ReactNode } from "react";
import "./super-admin.css";
import Sidebar from "@/components/tailgrids/core/sidebar";

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#0b0826]">
      <Sidebar />
      {/* .sa-scope: CSS ของ super admin มีผลเฉพาะในส่วนนี้ */}
      <div className="sa-scope flex-1 min-w-0">
        <main className="main">{children}</main>
      </div>
    </div>
  );
}
