"use client";

import { useState } from "react";
import { Mail, Phone, Pencil, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/tailgrids/core/avatar";
import { Badge } from "@/components/tailgrids/core/badge";
import { Button } from "@/components/tailgrids/core/button";
import { Toggle } from "@/components/tailgrids/core/toggle";
import { profile, notiItems, notiDefaults } from "@/data/setting";

export default function Setting() {
  // State
  const [noti, setNoti] = useState(notiDefaults);

  // สลับสวิตช์
  const toggle = (key: string) => setNoti((n) => ({ ...n, [key]: !n[key] }));

  return (
    <div className="flex flex-col gap-6 text-white lg:flex-row">
      {/* ฝั่งซ้าย: การ์ดโปรไฟล์ */}
      <div className="w-full shrink-0 rounded-2xl border border-white/10 bg-white/5 p-6 lg:w-[300px]">
        {/* รูป ชื่อ บทบาท */}
        <div className="flex flex-col items-center text-center">
          <Avatar size="xxl">
            <AvatarFallback className="bg-linear-to-r from-cyan-500 to-blue-500 text-2xl text-white">
              {profile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <p className="mt-4 text-lg font-semibold">{profile.name}</p>
          <Badge color="warning" size="md" className="mt-1">
            {profile.role}
          </Badge>
        </div>

        {/* ข้อมูลติดต่อ */}
        <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
          <div className="flex items-center gap-3 text-white/70">
            <Mail size={16} className="text-white/40" /> {profile.email}
          </div>
          <div className="flex items-center gap-3 text-white/70">
            <Phone size={16} className="text-white/40" /> {profile.phone}
          </div>
        </div>

        {/* ปุ่ม */}
        <div className="mt-6 space-y-2">
          <Button size="sm" className="w-full">
            <Pencil /> แก้ไขโปรไฟล์
          </Button>
          <Button size="sm" variant="danger" appearance="outline" className="w-full">
            <LogOut /> ออกจากระบบ
          </Button>
        </div>
      </div>

      {/* ฝั่งขวา: การแจ้งเตือน */}
      <div className="flex-1 rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-lg font-semibold">การแจ้งเตือน</p>
        <p className="text-sm text-white/40">เลือกเรื่องที่ต้องการให้ระบบแจ้งเตือน</p>

        {/* รายการสวิตช์ */}
        <div className="mt-4 divide-y divide-white/10">
          {notiItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="text-sm">{item.title}</p>
                <p className="text-xs text-white/40">{item.desc}</p>
              </div>
              <Toggle
                size="md"
                checked={noti[item.key]}
                onChange={() => toggle(item.key)}
                aria-label={item.title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
