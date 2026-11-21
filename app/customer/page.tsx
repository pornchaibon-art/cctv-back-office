"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Maximize2, PersonStanding } from "lucide-react";
import { Shield1Check } from "@tailgrids/icons";
import Sidebar from "@/components/tailgrids/core/sidebar";

import {
  Video,
  Bell,
  Monitor,
} from "lucide-react";

const stats = [
  { label: "สาขาทั้งหมด", value: "3", icon: Video },
  { label: "พนักงานที่ได้รับสิทธิ์", value: "86", icon: Monitor },
  { label: "ตำแหน่ง Manager", value: "9", icon: Shield1Check },
  { label: "แจ้งเหตุวันนี้", value: "3", icon: Bell },
];

const pinnedCameras = [
  { name: "หน้าร้าน - ประตูหลัก", branch: "สาขาบางนา", time: "14:32:08" },
  { name: "ลานจอดรถ", branch: "สาขาบางนา", time: "14:32:08" },
];

const recentAlerts = [
  {
    title: "ตรวจพบผู้บุกรุก",
    location: "คลังสินค้า . รังสิต",
    time: "2 นาที",
    unread: true,
  },
  {
    title: "แจ้งเหตุไฟไหม้ / ควัน",
    location: "คลังสินค้า . รังสิต",
    time: "15 นาที",
    unread: true,
  },
  {
    title: "บุคคลนอกเวลาทำการ",
    location: "ประตูหลัง . บางนา",
    time: "1 ชม.",
    unread: false,
  },
  {
    title: "Manager โยกย้ายสาขา",
    location: "กิตติ → สาขาสีลม",
    time: "2 ชม.",
    unread: false,
  },
];

export default function DashboardPage() {
  const [searchText, setSearchText] = useState("");
  const filteredCameras = pinnedCameras.filter(
    (cam) =>
      cam.name.toLowerCase().includes(searchText.toLowerCase()) ||
      cam.branch.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredAlerts = recentAlerts.filter(
    (alert) =>
      alert.title.toLowerCase().includes(searchText.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen bg-[#161142] text-white">
      <Sidebar />

      {/* ขวา: main */}
      <main className="flex-1 p-8">

        {/* header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold">สวัสดี , Chira</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-indigo-300/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="ค้นหากล้อง สาขา..."
                className="w-64 rounded-full bg-[#1d1752] border border-white/10 pl-10 pr-4 py-2 text-sm
                   text-white placeholder-indigo-300/50 focus:outline-none"
              />
            </div>

            <button
              className="w-10 h-10 rounded-full bg-[#1d1752] border border-white/10 flex items-center
                       justify-center hover:bg-white/10 cursor-pointer"
            >
              <Bell className="w-4 h-4 text-indigo-200" />
            </button>
          </div>
        </header>

        <section className="grid grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-3xl bg-[#221c5c]/80 border border-white/10 p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-[#193b47] text-[#72f1b8] flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="text-xs text-indigo-200/70 mt-1">{stat.label}</p>
              </div>
            );
          })}
        </section>

        <section className="grid grid-cols-3 gap-6">
          <div className="col-span-2 rounded-3xl bg-[#221c5c]/80 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold">กล้องทั้งหมด`</h2>
              <Link
                href="/live"
                className="text-xs font-semibold text-[#72f1b8] hover:underline"
              >
                ดูสดทั้งหมด →
              </Link>
            </div>

            {filteredCameras.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {filteredCameras.map((cam) => (
                  <div
                    key={cam.name}
                    className="rounded-2xl bg-[#151138] border border-white/10 overflow-hidden"
                  >
                    <div
                      className="h-44 bg-linear-to-br from-[#1b164a] via-[#130f36] to-[#24295e] 
                  p-3.5 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full bg-rose-500
                      px-2.5 py-0.5 text-[10px] font-bold"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                          LIVE
                        </span>
                        <span className="text-xs font-mono text-white/70">
                          {cam.time}
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <button className="p-1 rounded-lg bg-black/30 hover:bg-black/50 text-white/80 cursor-pointer">
                          <Maximize2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3 flex items-center justify-between bg-[#1b1647]">
                      <div>
                        <p className="text-xs font-bold">{cam.name}</p>
                        <p className="text-[11px] text-indigo-300/60 mt-0.5">
                          {cam.branch}
                        </p>
                      </div>

                      <span
                        className="inline-flex items-center gap-1 rounded-full bg-[#153b3b] text-[#72f1b8]
                    px-2 py-1 text-[11px] font-semibold"
                      >
                        <span className="w-1 h-1 rounded-full bg-[#72f1b8]" />
                        ออนไลน์
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-sm text-indigo-300/60">
                ไม่พบกล้องที่ตรงกับ "{searchText}"
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-[#221c5c]/80 border border-white/10 p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-bold">แจ้งเตือนล่าสุด</h2>
              <Link
                href="/alert"
                className="text-xs font-semibold text-[#72f1b8] hover:underline"
              >
                ทั้งหมด →
              </Link>
            </div>

            <div className="space-y-4">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl bg-[#2e2675]
                    flex items-center justify-center text-indigo-200 shrink-0"
                      >
                        <PersonStanding className="w-5 h-5" />
                      </div>

                      <div>
                        <p className="text-xs font-bold">{alert.title}</p>
                        <p className="text-[11px] text-indigo-300/60 mt-0.5">
                          {alert.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-indigo-300/60">
                        {alert.time}
                      </span>
                      {alert.unread && (
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-10 text-center text-xs text-indigo-300/60">
                  ไม่พบรายการแจ้งเตือนที่ค้นหา
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
