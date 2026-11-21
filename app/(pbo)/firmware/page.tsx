"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, Clock, Download } from "lucide-react";
import { Badge } from "@/components/tailgrids/core/badge";
import { Button } from "@/components/tailgrids/core/button";
import { Card } from "@/components/tailgrids/core/card";
import { Checkbox } from "@/components/tailgrids/core/checkbox";
import { cn } from "@/utils/cn";
import { LATEST, changelog, initialCameras, initialSelected } from "@/data/firmware";

export default function Firmware() {
  // State
  const [cameras, setCameras] = useState(initialCameras);
  const [selected, setSelected] = useState(initialSelected);

  // กล้องที่ยังไม่อัปเดต
  const outdated = cameras.filter((c) => c.version !== LATEST);
  const allSelected = outdated.length > 0 && outdated.every((c) => selected.includes(c.id));

  // เลือกทีละกล้อง
  function toggle(id: number) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }

  // เลือกทั้งหมด
  function toggleAll() {
    setSelected(allSelected ? [] : outdated.map((c) => c.id));
  }

  // อัปเดต
  function update() {
    setCameras((cs) => cs.map((c) => (selected.includes(c.id) ? { ...c, version: LATEST } : c)));
    setSelected([]);
  }

  // สไตล์การ์ด
  const cardClass = "md:min-w-0 border border-white/10 bg-white/5";

  return (
    <div className="space-y-4 text-white">
      {/* หัวข้อ */}
      <div>
        <h1 className="text-2xl font-bold">อัปเกรดเฟิร์มแวร์</h1>
        <p className="text-sm text-white/50">มีเวอร์ชันใหม่สำหรับ {outdated.length} กล้อง</p>
      </div>

      {/* ลิงก์กลับ */}
      <Link href="/devices" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white">
        <ArrowLeft size={14} /> กลับไปหน้าอุปกรณ์
      </Link>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        {/* ฝั่งซ้าย: รายการกล้อง */}
        <Card className={cn(cardClass, "flex-1 gap-0 px-5 py-2")}>
          {/* เลือกทั้งหมด */}
          <div className="flex items-center gap-3 border-b border-white/10 py-3">
            <Checkbox
              checked={allSelected}
              onChange={toggleAll}
              disabled={outdated.length === 0}
              aria-label="เลือกทั้งหมด"
            />
            <span className="flex-1 text-sm font-medium">เลือกทั้งหมด ({outdated.length})</span>
            <span className="text-xs text-white/40">เวอร์ชันปัจจุบัน → ใหม่</span>
          </div>

          {/* แถวกล้อง */}
          <div className="divide-y divide-white/10">
            {cameras.map((c) => {
              const upToDate = c.version === LATEST;
              return (
                <div key={c.id} className="flex items-center gap-3 py-3">
                  <Checkbox
                    checked={selected.includes(c.id)}
                    onChange={() => toggle(c.id)}
                    disabled={upToDate}
                    aria-label={c.name}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{c.name}</p>
                    <p className="text-xs text-white/40">{c.branch}</p>
                  </div>

                  {upToDate ? (
                    <Badge color="success" size="sm">{LATEST} · ล่าสุดแล้ว</Badge>
                  ) : (
                    <span className="flex items-center gap-2 text-sm">
                      <span className="text-white/40">{c.version}</span>
                      <ArrowRight size={14} className="text-white/40" />
                      <span className="font-semibold text-success-500">{LATEST}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* ฝั่งขวา */}
        <div className="flex flex-col gap-4 lg:w-[340px] lg:shrink-0">
          {/* มีอะไรใหม่ */}
          <Card className={cn(cardClass, "p-5")}>
            <p className="font-semibold">มีอะไรใหม่ใน {LATEST}</p>
            <ul className="space-y-2">
              {changelog.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/70">
                  <Check size={14} className="shrink-0 text-success-500" /> {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* ปุ่มอัปเดต */}
          <Card className={cn(cardClass, "p-5")}>
            <p className="flex gap-2 text-xs text-white/60">
              <Clock size={14} className="mt-0.5 shrink-0 text-warning-500" />
              ระหว่างอัปเดต กล้องจะออฟไลน์ประมาณ 3–5 นาที และรีสตาร์ทเอง
            </p>
            <Button
              size="sm"
              variant="success"
              className="w-full rounded-full"
              disabled={selected.length === 0}
              onPress={update}
            >
              <Download /> อัปเดต {selected.length} กล้อง
            </Button>
            <button className="flex items-center gap-1 text-sm text-success-500 hover:underline">
              หรือตั้งเวลาอัปเดตตอนตี 2 <ArrowRight size={14} />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
