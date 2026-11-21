"use client";

import Sidebar from "@/components/tailgrids/core/sidebar";
import { Cloud, HardDrive, ShieldCheck } from "lucide-react";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#0b0826] text-white">
      <Sidebar />
      <main className="min-w-0 flex-1 p-6 lg:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold">คลาวด์</h1>
            <p className="mt-1 text-sm text-indigo-200/60">สถานะการสำรองข้อมูลและพื้นที่จัดเก็บ</p>
          </div>
          <div className="flex size-11 items-center justify-center rounded-2xl bg-[#72f1b8]/15 text-[#72f1b8]">
            <Cloud size={22} />
          </div>
        </div>
        <section className="grid gap-4 md:grid-cols-3">
          {[
            ["พื้นที่จัดเก็บ", "2.4 TB", HardDrive],
            ["สำรองข้อมูลล่าสุด", "14:30 น.", ShieldCheck],
            ["สถานะคลาวด์", "ใช้งานปกติ", Cloud],
          ].map(([title, value, Icon]) => (
            <div key={String(title)} className="rounded-3xl border border-white/10 bg-[#221c5c]/80 p-6">
              <div className="mb-5 flex size-11 items-center justify-center rounded-2xl bg-[#72f1b8]/10 text-[#72f1b8]">
                <Icon size={20} />
              </div>
              <p className="text-2xl font-extrabold">{String(value)}</p>
              <p className="mt-1 text-xs text-indigo-200/60">{String(title)}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}