'use client'

import { useState } from "react";
import { Monitor, Bell, Video, Download, Upload } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Button } from "@/components/tailgrids/core/button";
import { ButtonGroup } from "@/components/tailgrids/core/button-group";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/tailgrids/core/chart";
import { cn } from "@/utils/cn";
import { ranges, data7, data30, type ReportData } from "@/data/report";

export default function Report() {
  // State
  const [range, setRange] = useState("7 วัน")

  return (
    <div className="space-y-4">

      {/* แถวบน */}
      <div className="flex items-center justify-between">
        {/* ปุ่มเลือกช่วงเวลา */}
        <ButtonGroup variant="secondary" size="sm">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              aria-pressed={range === r}
              className={cn(range === r && "bg-tab-secondary-active-background! text-neutral-brand-color")}
            >
              {r}
            </button>
          ))}
        </ButtonGroup>

        {/* ปุ่มส่งออกรายงาน */}
        <Button size="sm" appearance="outline">
          <Upload /> ส่งออกรายงาน
        </Button>
      </div>

      {/* เนื้อหารายงาน */}
      {range === '7 วัน' && <ReportBody data={data7} />}
      {range === '30 วัน' && <ReportBody data={data30} />}
      {range === 'กำหนดเอง' && <p className="text-white/50">ยังไม่มีข้อมูล</p>}
    </div>
  );
}

// เนื้อหารายงาน
function ReportBody({ data }: { data: ReportData }) {
  // การ์ดสรุป
  const stats = [
    { icon: Monitor, value: data.stats.online, label: "กล้องออนไลน์เฉลี่ย" },
    { icon: Bell, value: data.stats.alerts, label: "แจ้งเตือนทั้งหมด" },
    { icon: Video, value: data.stats.liveHours, label: "ชม. ดูสดรวม" },
    { icon: Download, value: data.stats.downloads, label: "คลิปที่ดาวน์โหลด" },
  ];

  // สไตล์การ์ด
  const cardClass = "md:min-w-0 border border-white/10 bg-white/5";

  return (
    <>
      {/* การ์ดสรุป */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className={cn(cardClass, "p-5")}>
            <div className="inline-flex w-fit rounded-lg bg-primary-500/20 p-2">
              <s.icon size={16} className="text-primary-300" />
            </div>
            <div>
              <p className="text-3xl font-bold text-white">{s.value}</p>
              <p className="mt-1 text-xs text-white/50">{s.label}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* แถวล่าง */}
      <div className="grid grid-cols-3 gap-4">

        {/* กราฟแจ้งเตือนรายวัน */}
        <Card className={cn(cardClass, "col-span-2")}>
          <CardHeader>
            <CardTitle className="text-base md:text-base">แจ้งเตือนรายวัน</CardTitle>
          </CardHeader>

          <CardContent className="pb-5">
            {data.daily.length === 0 ? (
              <p className="flex h-52 items-center justify-center text-sm text-white/40">ยังไม่มีข้อมูล</p>
            ) : (
              <ChartContainer width="100%" height={220}>
                <BarChart data={data.daily} barGap={4}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={32} />
                  <ChartTooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="person" name="บุคคล" fill="var(--color-primary-500)" radius={[4, 4, 0, 0]} barSize={20} />
                  <Bar dataKey="motion" name="เคลื่อนไหว" fill="var(--color-primary-300)" radius={[4, 4, 0, 0]} barSize={20} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>

        {/* กล้องที่แจ้งเตือนบ่อย */}
        <Card className={cn(cardClass, "p-5")}>
          <p className="font-semibold text-white">กล้องที่แจ้งเตือนบ่อย</p>

          {data.topCameras.length === 0 ? (
            <p className="py-6 text-center text-sm text-white/40">ยังไม่มีข้อมูล</p>
          ) : (
            <div className="divide-y divide-white/10">
              {data.topCameras.map((c) => (
                <div key={c.name} className="flex items-center gap-3 py-3">
                  <Video size={16} className="text-white/60" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{c.name}</p>
                    <p className="text-xs text-white/40">{c.branch}</p>
                  </div>
                  <span className="text-sm font-medium text-primary-300">{c.count} ครั้ง</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
