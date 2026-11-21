"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2 } from "lucide-react";

export default function ForgetPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // จำลองการส่งเมล
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#120d3a] text-white flex flex-col items-center justify-center px-4">
      <div className="relative z-10 flex flex-col items-center w-full max-w-[440px]">
        <div className="flex gap-3.5 mb-7">
          <div className="relative w-11 h-11 rounded-2xl bg-white flex items-center justify-center shadow-md">
            <div className="w-5 h-5 rounded-full bg-[#120d3a] relative">
              <div className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7] absolute top-1 left-1" />
            </div>
          </div>

          <div className="leading-tight">
            <h1 className="text-xl font-bold tracking-wide text-white">CCTV</h1>
            <p className="text-xs tracking-[0.18em] text-indigo-200/80 font-medium">
              BACK OFFICE
            </p>
          </div>
        </div>

        {/* กรอบ */}
        <div className="w-full rounded-3xl bg-[#272154]/70 border border-white/15 p-6 sm:p-8 shadow-2xl">
          {!isSent ? (
            
            // กรอกอีเมล
            <>
              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#193b47] text-[#72f1b8] flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-extrabold">ลืมรหัสผ่าน?</h2>
                <p className="text-xs text-indigo-200/70 mt-1 leading-relaxed">
                  กรอกอีเมลที่ใช้ลงทะเบียนในระบบ
                  <br />
                  เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ให้คุณ
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="กรอกอีเมลของคุณ..."
                    required
                    className="w-full rounded-xl bg-[#141038] border border-white/10 px-4 py-3 text-sm text-white placeholder-indigo-300/40 focus:outline-none focus:border-[#72f1b8]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-full bg-[#72f1b8] hover:bg-[#5ce0a5] text-black font-bold text-sm py-3 cursor-pointer transition-colors"
                >
                  {isLoading ? "กำลังส่งข้อมูล..." : "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-[#193b47] text-[#72f1b8] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h2 className="text-xs font-extrabold">
                  ส่งอีเมลเรียบร้อยแล้ว!
                </h2>
                <p className="text-xs text-indigo-200/70 mt-2 leading-relaxed">
                  เราได้ส่งลิงก์รีเซ็ตรหัสผ่านไปที่
                  <br />
                  <span className="text-[#72f1b8] font-semibold">{email}</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setIsSent(false);
                  setEmail("");
                }}
                className="text-xs text-indigo-300/70 hover:text-white underline cursor-pointer"
              >
                ไม่ได้รับอีเมล? ส่งอีกครั้ง
              </button>
            </div>
          )}

          {/* ย้อนกลับหน้าล็อกอิน */}
          <div className="mt-6 pt-4 border-t border-white/10 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-200/80 hover:text-[#72f1b8] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
