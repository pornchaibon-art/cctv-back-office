"use client";

import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/tailgrids/core/sidebar";
import { Search, Bell, PersonStanding, PlayCircle, Video } from "lucide-react";

const initialAlerts = [
  {
    id: 1,
    type: "บุคคล",
    title: "ตรวจพบบุคคล",
    location: "ลานจอดรถ . สาขาบางนา",
    time: "14:30",
    unread: true,
  },
  {
    id: 2,
    type: "กล้องออฟไลน์",
    title: "กล้องออฟไลน์",
    location: "คลังสินค้า . สาขารังสิต",
    time: "14:17",
    unread: true,
  },
  {
    id: 3,
    type: "บุคคล",
    title: "ตรวจพบบุคคล",
    location: "หน้าร้าน · สาขาบางนา",
    time: "13:52",
    unread: true,
  },
  {
    id: 4,
    type: "เคลื่อนไหว",
    title: "ตรวจพบการเคลื่อนไหว",
    location: "ประตูหลัง · สาขาสีลม",
    time: "13:10",
    unread: true,
  },
  {
    id: 5,
    type: "บุคคล",
    title: "ตรวจพบบุคคล",
    location: "แคชเชียร์ · สาขาบางนา",
    time: "12:44",
    unread: true,
  },
  {
    id: 6,
    type: "เคลื่อนไหว",
    title: "ตรวจพบการเคลื่อนไหว",
    location: "ลานจอดรถ · สาขาสีลม",
    time: "11:02",
    unread: false,
  },
  {
    id: 7,
    type: "บุคคล",
    title: "ตรวจพบบุคคล",
    location: "ทางเข้าพนักงาน · บางนา",
    time: "09:15",
    unread: false,
  },
];


export default function AlertPage() {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [activeTab, setActiveTab] = useState("ทั้งหมด");
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState<number>(1);

  const unreadCount = alerts.filter((item) => item.unread).length;

  const filteredAlerts = alerts.filter((item) => {
    const matchTab = activeTab === "ทั้งหมด" || item.type === activeTab;
    const matchSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.location.toLowerCase().includes(searchText.toLowerCase());
    return matchTab && matchSearch;
  });

  const selectAlert =
    alerts.find((item) => item.id === selectedId) || filteredAlerts[0];

  const handleSelectAlert = (id: number) => {
    setSelectedId(id);
    setAlerts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, unread: false } : item)),
    );
  };

  const handleMarkAllRead = () => {
    setAlerts((prev) => prev.map((item) => ({ ...item, unread: false })));
  };

  return (
    <div className="flex min-h-screen bg-[#161142] text-white">
      <Sidebar />

      <main className="flex-1 p-8">

        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-extrabold">การแจ้งเตือน</h1>
            <p className="text-xs text-indigo-200/70 mt-1">
              {unreadCount} รายการที่ยังไม่ได้อ่าน
            </p>
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
                text-white placeholder-indigo-300/50 focus:outline-none focus:border-[#72f1b8]"
              />
            </div>

            <button className="w-10 h-10 rounded-full bg-[#1d1752] border border-white/10 flex items-center 
            justify-center hover:bg-white/10">

              <Bell className="w-4 h-4 text-indigo-200" />

            </button>
          </div>
        </header>

        <div className="flex items-center justify-between mb-6">
          <div className="inline-flex rounded-full bg-[#110d2e] p-1 border border-white/10">
            {["ทั้งหมด", "บุคคล", "เคลื่อนไหว", "กล้องออฟไลน์"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 rounded-full text-xs font-semibold cursor-pointer transition-all ${
                  activeTab === tab
                    ? "bg-white text-[#120d3a] shadow"
                    : "text-indigo-200/70 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={handleMarkAllRead}
            className="text-xs font-semibold text-indigo-200/80 hover:text-[#72f1b8] cursor-pointer transition-colors"
          >
            อ่านทั้งหมด
          </button>
        </div>

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 rounded-3xl bg-[#221c5c]/80 border border-white/10 p-5">
            <p className="text-[11px] font-semibold text-indigo-300/60 px-2 mb-3">
              วันนี้
            </p>

            <div className="space-y-2">
              {filteredAlerts.length > 0 ? (
                filteredAlerts.map((item) => {
                  const isSelected = selectAlert?.id === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelectAlert(item.id)}
                      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                        isSelected
                          ? "bg-[#2e2675] border border-white/15 shadow-md"
                          : "hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-xl bg-[#191445] flex items-center justify-center text-indigo-200 shrink-0">
                          <PersonStanding className="w-5 h-5" />
                        </div>

                        <div>
                          <p className="text-xs font-bold">{item.title}</p>
                          <p className="text-[11px] text-indigo-300/60 mt-0.5">
                            {item.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-xs text-indigo-300/60 font-mono">
                          {item.time}
                        </span>
                        {item.unread ? (
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                        ) : (
                          <span className="w-2 h-2" />
                        )}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="py-12 text-center text-xs text-indigo-300/60">
                  ไม่พบรายการแจ้งเตือนที่ค้นหา
                </p>
              )}
            </div>
          </div>

          {/* พรีวิวเหตุการณ์ */}
          {selectAlert && (
            <div className="lg:col-span-5 rounded-3xl bg-[#221c5c]/80 border border-white/30 overflow-hidden shadow-xl">
                <div className="h-60  from-[#2a2270] via-[#171242] to-[#0f0b2e] p-4 relative flex items-center justify-center">
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1 rounded-full bg-[#151140]/60 border border-white/10 px-7 py-2 text-[11px]">
                    แจ้งเตือน
                    </span>

                    <div className="w-20 h-32 rounded-lg border-2 border-[#72f1b8]" />
                </div>

                <div className="p-6">
                    <h2 className="text-lg font-extrabold">{selectAlert.title}</h2>
                    <p className="text-xs text-indigo-300/70 mt-1">
                    {selectAlert.location} . วันนี้ {selectAlert.time}
                    </p>

                    <div className="flex items-center gap-3 mt-5">
                        <Link
                        href="/playback"
                        className="inline-flex items-center gap-2 rounded-full bg-[#72f1b8] text-[#110d2e] font-bold text-xs px-5 py-2 transition-colors"
                        >
                            <PlayCircle className="w-4 h-4" />
                            ดูคลิปเหตุการณ์
                        </Link>

                        <Link
                        href="/live"
                        className="inline-flex items-center gap-2 rounded-full bg-[#2b2369] hover:bg-[#352c80] border border-white/10 text-white font-semibold text-xs px-5 py-2 transition-colors"
                        >
                            <Video className="w-4 h-4" />
                            ดูสด
                        </Link>
                    </div>
                </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
