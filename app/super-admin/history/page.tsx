"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { history } from "@/lib/data";

export default function HistoryPage() {
  const [search, setSearch] = useState<string>("");

  const shownHistory = history.filter((h) => h.text.includes(search) || h.by.includes(search));

  return (
    <>
      <PageHeader
        title="ประวัติการเปลี่ยนสิทธิ์"
        search={search}
        onSearch={setSearch}
      />

      <div className="card">
        {shownHistory.map((h) => (
          <div key={h.id} className="history-item">
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{h.text}</div>
              <div className="small">{h.by}</div>
            </div>
            <div className="history-time">{h.time}</div>
          </div>
        ))}

        {shownHistory.length === 0 && <p className="small">ไม่พบประวัติ</p>}
      </div>
    </>
  );
}
