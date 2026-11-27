
"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  getRequests,
  subscribeRequests,
  type Status,
  type Request,
  updateRequest,
} from "@/data/comment";
const EDIT_STATUSES: Status[] = [
  "กำลังดำเนินการ",
  "ดำเนินการแล้ว",
  "ไม่อนุมัติ",
];

function statusClass(status: Status): string {
  if (status === "กำลังดำเนินการ") return "status status-doing";
  if (status === "ดำเนินการแล้ว") return "status status-done";
  if (status === "ไม่อนุมัติ") return "status status-wait";
  return "status status-wait";
}

export default function ForwardedPage() {
  // ดึงข้อมูลจากระบบกลาง
  const [requests, setRequests] = useState<Request[]>(getRequests());

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("กำลังดำเนินการ");
  const [replyText, setReplyText] = useState("");

  // ติดตามการเปลี่ยนแปลงข้อมูล
  useEffect(() => {
    return subscribeRequests(() => {
      setRequests([...getRequests()]);
    });
  }, []);

  // แสดงเฉพาะคำร้องที่ Admin ส่งต่อ
  const forwardedRequests = requests.filter(
    (request) =>
      request.forwardedTo === "Super Admin"
  );

  // เลือกคำร้องปัจจุบัน
  const selectedRequest =
    forwardedRequests.find(
      (request) => request.id === selectedId
    ) ?? null;

  // เลือกคำร้อง
  function selectRequest(request: Request) {
    setSelectedId(request.id);
    setStatus(
      request.status === "ดำเนินการแล้ว" ||
      request.status === "ไม่อนุมัติ"
        ? request.status
        : "กำลังดำเนินการ"
    );
    setReplyText("");
  }

  // ตอบกลับ Admin
  function handleReply() {
    if (!selectedRequest || !replyText.trim()) return;

    const newMessage = {
      id: Date.now(),
      senderId: "superadmin_01",
      senderRole: "Super Admin" as const,
      message: replyText.trim(),
      createdAt: new Date().toISOString(),
    };

    updateRequest(selectedRequest.id, {
      status,
      messages: [
        ...selectedRequest.messages,
        newMessage,
      ],
    });

    setReplyText("");
  }

  return (
    <>
      <PageHeader
        title="เรื่องส่งต่อจาก Admin"
        showSearch={false}
      />

      <div className="grid-2">

        {/* ฝั่งซ้าย: รายละเอียดและตอบกลับ */}
        <div className="card">
          <div
            className="label"
            style={{ marginTop: 0 }}
          >
            สถานะการดำเนินการ
          </div>

          {selectedRequest ? (
            <>
              <div className="tabs">
                {EDIT_STATUSES.map((s) => (
                  <button
                    key={s}
                    className={
                      status === s
                        ? "tab active"
                        : "tab"
                    }
                    onClick={() => setStatus(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="label">
                หัวข้อคำร้อง
              </div>

              <div className="ticket">
                <div style={{ fontWeight: 600 }}>
                  {selectedRequest.title}
                </div>
                <div className="small">
                  ผู้แจ้ง: {selectedRequest.senderName}
                </div>
              </div>

              <div className="label">
                รายละเอียดจาก Manager
              </div>

              <textarea
                value={selectedRequest.detail}
                readOnly
              />

              <div className="label">
                ส่งต่อโดย
              </div>

              <div className="small">
                {selectedRequest.forwardedBy || "Admin"}
              </div>

              {/* ประวัติข้อความ */}
              <div className="label">
                ประวัติการตอบกลับ
              </div>

              <div className="space-y-3">
                {selectedRequest.messages.map((message) => (
                  <div
                    key={message.id}
                    className="note"
                  >
                    <b>{message.senderRole}</b>
                    <div>{message.message}</div>
                  </div>
                ))}

                {selectedRequest.messages.length === 0 && (
                  <div className="small">
                    ยังไม่มีข้อความตอบกลับ
                  </div>
                )}
              </div>

              <div className="label">
                ข้อความตอบกลับ Admin
              </div>

              <textarea
                value={replyText}
                onChange={(e) =>
                  setReplyText(e.target.value)
                }
                placeholder="พิมพ์ข้อความตอบกลับ Admin..."
              />

              <div
                className="footer-bar"
                style={{ justifyContent: "flex-end" }}
              >
                <button
                  className="btn btn-green"
                  onClick={handleReply}
                  disabled={!replyText.trim()}
                >
                  ตอบกลับ Admin
                </button>
              </div>
            </>
          ) : (
            <div className="small">
              {forwardedRequests.length === 0
                ? "ยังไม่มีคำร้องที่ Admin ส่งต่อ"
                : "กรุณาเลือกคำร้องที่ต้องการตรวจสอบ"}
            </div>
          )}
        </div>

        {/* ฝั่งขวา: รายการคำร้อง */}
        <div className="card">
          <div
            style={{
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            เรื่องที่ Admin ส่งต่อ
          </div>

          {forwardedRequests.map((request) => (
            <div
              key={request.id}
              className={
                request.id === selectedId
                  ? "ticket active"
                  : "ticket"
              }
              onClick={() => selectRequest(request)}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {request.title}
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <span className={statusClass(request.status)}>
                  {request.status}
                </span>

                <span className="small">
                  {request.date}
                </span>
              </div>

              <div className="small">
                จาก {request.senderName}
              </div>

              {request.messages.length > 0 && (
                <div className="note">
                  <b style={{ color: "var(--cyan)" }}>
                    มีข้อความตอบกลับ
                  </b>
                  <div>
                    {request.messages[
                      request.messages.length - 1
                    ].message}
                  </div>
                </div>
              )}
            </div>
          ))}

          {forwardedRequests.length === 0 && (
            <div className="small">
              ไม่มีคำร้องที่ส่งต่อในขณะนี้
            </div>
          )}
        </div>
      </div>
    </>
  );
}
