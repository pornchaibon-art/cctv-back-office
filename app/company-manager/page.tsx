"use client";

import Sidebar from "@/components/tailgrids/core/sidebar";
import { Building2, Users, UserCog } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#0b0826] text-white">
      <Sidebar />
      <main className="min-w-0 flex-1 p-6 lg:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold">ผู้บริหารหน่วยงาน</h1>
          <p className="mt-1 text-sm text-indigo-200/60">ภาพรวมสาขาและผู้ใช้งานในหน่วยงาน</p>
        </div>
        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["สาขาทั้งหมด", "3", Building2],
            ["ผู้ใช้งาน", "86", Users],
            ["ตำแหน่ง Manager", "9", UserCog],
          ].map(([title, value, Icon]) => (
            <div key={String(title)} className="rounded-3xl border border-white/10 bg-[#221c5c]/80 p-6">
              <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-[#72f1b8]/10 text-[#72f1b8]">
                <Icon size={20} />
              </div>
              <p className="text-3xl font-extrabold">{String(value)}</p>
              <p className="mt-1 text-xs text-indigo-200/60">{String(title)}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}