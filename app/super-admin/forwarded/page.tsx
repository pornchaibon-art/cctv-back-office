"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { tickets as initialTickets, type Ticket, type TicketStatus, type TicketType } from "@/lib/data";

const TYPES: TicketType[] = ["ปัญหากล้อง", "ระบบเล่น", "แจ้งเหตุ"];
const EDIT_STATUSES: TicketStatus[] = ["กำลังแก้ไข", "แก้ไขแล้ว"];

function statusClass(status: TicketStatus): string {
  if (status === "กำลังแก้ไข") return "status status-doing";
  if (status === "แก้ไขแล้ว") return "status status-done";
  return "status status-wait";
}

export default function ForwardedPage() {
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [selectedId, setSelectedId] = useState<number>(initialTickets[0].id);
  const [status, setStatus] = useState<TicketStatus>("กำลังแก้ไข");
  const [type, setType] = useState<TicketType>(initialTickets[0].type);
  const [text, setText] = useState<string>(initialTickets[0].detail);

  function selectTicket(t: Ticket) {
    setSelectedId(t.id);
    setType(t.type);
    setText(t.detail);
    setStatus(t.status === "แก้ไขแล้ว" ? "แก้ไขแล้ว" : "กำลังแก้ไข");
  }

  function reply() {
    setTickets(
      tickets.map((t) =>
        t.id === selectedId ? { ...t, status, type, reply: text } : t
      )
    );
  }

  return (
    <>
      <PageHeader
        title="เรื่องส่งต่อจาก Admin"
        showSearch={false}
      />

      <div className="grid-2">
        <div className="card">
          <div className="label" style={{ marginTop: 0 }}>สถานะการแก้ไข</div>
          <div className="tabs">
            {EDIT_STATUSES.map((s) => (
              <button key={s} className={status === s ? "tab active" : "tab"} onClick={() => setStatus(s)}>
                {s}
              </button>
            ))}
          </div>

          <div className="label">ประเภท</div>
          <div className="chips">
            {TYPES.map((t) => (
              <button key={t} className={type === t ? "chip active" : "chip"} onClick={() => setType(t)}>
                {t}
              </button>
            ))}
          </div>

          <div className="label">รายละเอียดจาก Admin (Doe)</div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} />

          <div className="footer-bar" style={{ justifyContent: "flex-end" }}>
            <button className="btn btn-green" onClick={reply}>ตอบกลับ Admin</button>
          </div>
        </div>

        <div className="card">
          <div style={{ fontWeight: 600, marginBottom: 12 }}>เรื่องที่ Admin ส่งต่อ</div>

          {tickets.map((t) => (
            <div
              key={t.id}
              className={t.id === selectedId ? "ticket active" : "ticket"}
              onClick={() => selectTicket(t)}
            >
              <div style={{ fontWeight: 600, fontSize: 14 }}>{t.title}</div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
                <span className={statusClass(t.status)}>{t.status}</span>
                <span className="small">{t.ago}</span>
              </div>
              {t.reply && (
                <div className="note">
                  <b style={{ color: "var(--cyan)" }}>ตอบกลับแล้ว</b>
                  <div>{t.reply}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
