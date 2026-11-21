"use client";

import { useState } from "react";
import { ImagePlus, Plus, X } from "lucide-react";
import { Badge } from "@/components/tailgrids/core/badge";
import { Button } from "@/components/tailgrids/core/button";
import { Card } from "@/components/tailgrids/core/card";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { cn } from "@/utils/cn";
import { recipients, topics, MAX_IMAGES, initialRequests, type Status } from "@/data/comment";

// สีป้ายสถานะ
const statusColor: Record<Status, "primary" | "warning" | "success" | "gray"> = {
  "รอดำเนินการ": "primary",
  "กำลังดำเนินการ": "warning",
  "ดำเนินการแล้ว": "success",
  "ส่งต่อถึง Dev": "gray",
};

export default function Comment() {
  // State: ฟอร์ม
  const [recipient, setRecipient] = useState(recipients[0]);
  const [topic, setTopic] = useState(topics[0]);
  const [detail, setDetail] = useState("");
  const [images, setImages] = useState<string[]>([]);

  // State: คำขอของฉัน
  const [requests, setRequests] = useState(initialRequests);

  // เพิ่มรูป
  function addImages(files: FileList | null) {
    if (!files) return;
    const urls = [...files].map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls].slice(0, MAX_IMAGES));
  }

  // ลบรูป
  function removeImage(url: string) {
    URL.revokeObjectURL(url);
    setImages((prev) => prev.filter((u) => u !== url));
  }

  // ส่งคำขอ
  function submit() {
    if (!detail.trim()) return;
    const today = new Date().toLocaleDateString("th-TH", { day: "numeric", month: "short" });
    setRequests((prev) => [
      { id: Date.now(), title: `${topic} · ${detail.trim()}`, status: "รอดำเนินการ", date: today },
      ...prev,
    ]);
    setDetail("");
    images.forEach((u) => URL.revokeObjectURL(u));
    setImages([]);
  }

  // สไตล์การ์ด
  const cardClass = "md:min-w-0 border border-white/10 bg-white/5 p-6";

  return (
    <div className="space-y-6 text-white">
      {/* คำอธิบายหน้า */}
      <p className="text-sm text-white/50">
        ทุกเรื่องต้องแจ้งผ่าน Admin ก่อนถึง Super Admin — ทั้งแจ้งเหตุ แจ้งปัญหา และขอเพิ่มสาขา/กล้อง
      </p>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        {/* ฝั่งซ้าย: ฟอร์มแจ้งเรื่อง */}
        <Card className={cn(cardClass, "flex-1 gap-5")}>
          {/* ส่งถึง */}
          <div>
            <p className="mb-2 text-sm text-white/60">ส่งถึง</p>
            <div className="flex flex-wrap gap-2">
              {recipients.map((r) => (
                <Chip key={r} label={r} active={recipient === r} onPress={() => setRecipient(r)} />
              ))}
            </div>
          </div>

          {/* เรื่อง */}
          <div>
            <p className="mb-2 text-sm text-white/60">เรื่อง</p>
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => (
                <Chip key={t} label={t} active={topic === t} onPress={() => setTopic(t)} />
              ))}
            </div>
          </div>

          {/* รายละเอียด */}
          <div>
            <p className="mb-2 text-sm text-white/60">รายละเอียด</p>
            <TextArea
              rows={5}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              placeholder='เช่น ขอเพิ่มกล้อง 4 ตัวที่คลังสินค้าใหม่ และสร้างสาขา "รังสิต 2"'
              aria-label="รายละเอียด"
            />
          </div>

          {/* แนบรูป */}
          <div className="flex flex-wrap gap-3">
            {images.map((url) => (
              <button
                key={url}
                onClick={() => removeImage(url)}
                aria-label="ลบรูป"
                className="group relative size-16 overflow-hidden rounded-lg border border-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={url} alt="" className="size-full object-cover" />
                <span className="absolute inset-0 hidden items-center justify-center bg-black/60 group-hover:flex">
                  <X size={16} />
                </span>
              </button>
            ))}

            {images.length < MAX_IMAGES && (
              <label className="flex size-16 cursor-pointer items-center justify-center rounded-lg border border-dashed border-white/20 text-white/50 hover:bg-white/5">
                {images.length === 0 ? <ImagePlus size={18} /> : <Plus size={18} />}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => {
                    addImages(e.target.files);
                    e.target.value = "";
                  }}
                />
              </label>
            )}
          </div>

          {/* ปุ่มส่ง */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-white/40">แนบรูปได้สูงสุด {MAX_IMAGES} รูป</p>
            <Button size="sm" variant="success" className="rounded-full" disabled={!detail.trim()} onPress={submit}>
              ส่งคำขอถึง Admin
            </Button>
          </div>
        </Card>

        {/* ฝั่งขวา: คำขอของฉัน */}
        <Card className={cn(cardClass, "gap-0 lg:w-[340px] lg:shrink-0")}>
          <p className="mb-2 font-semibold">คำขอของฉัน</p>

          <div className="divide-y divide-white/10">
            {requests.map((r) => (
              <div key={r.id} className="space-y-2 py-4 last:pb-0">
                <p className="text-sm font-medium">{r.title}</p>
                <div className="flex items-center gap-2">
                  <Badge color={statusColor[r.status]} size="sm">{r.status}</Badge>
                  <span className="text-xs text-white/40">{r.date}</span>
                </div>

                {/* คำตอบจาก Admin */}
                {r.reply && (
                  <div className="rounded-lg bg-black/30 p-3">
                    <p className="text-xs font-medium text-success-500">คำตอบจาก Admin</p>
                    <p className="mt-1 text-xs text-white/70">{r.reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ปุ่มตัวเลือก
function Chip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Button
      size="xs"
      appearance="outline"
      variant={active ? "success" : "primary"}
      aria-pressed={active}
      onPress={onPress}
      className="rounded-full py-2"
    >
      {label}
    </Button>
  );
}
