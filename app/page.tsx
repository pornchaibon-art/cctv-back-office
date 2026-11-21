"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    const userEmail = email.toLowerCase().trim();

    setTimeout(() => {
      if (userEmail.endsWith("@admin.com") || userEmail.endsWith("@admin")) {
        localStorage.setItem(
          "cctv_user",
          JSON.stringify({
            role: "ADMIN",
            name: "Thanut",
            initials: "TH",
          }),
        );
        // @admin -> admin
        router.push("/admin");
      } else if (
        userEmail.endsWith("@superadmin.com") ||
        userEmail.endsWith("@superadmin")
      ) {
        localStorage.setItem(
          "cctv_user",
          JSON.stringify({
            role: "SUPER ADMIN",
            name: "Ryu Admin",
            initials: "RY",
          }),
        );
        // @superadmin -> super-admin
        router.push("/super-admin");
      } else if (
        userEmail.endsWith("@customer.com") ||
        userEmail.endsWith("@customer")
      ) {
        localStorage.setItem(
          "cctv_user",
          JSON.stringify({
            role: "CUSTOMER",
            name: "Chira",
            initials: "CH",
          }),
        );
        // @customer -> customer
        router.push("/customer");
      } else {
        // กรณีใส่อีเมลอื่นๆ
        setIsLoading(false);
        setErrorMsg("ไม่พบบัญชีผู้ใช้ในระบบ กรุณาตรวจสอบอีเมลอีกครั้ง");
      }
    }, 1000);
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden
    bg-[#120d3a] text-white flex flex-col items-center justify-center px-4"
    >
      {/* main */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-440px">
        <div className="flex gap-3.5 mb-7">
          <div className="relative w-12 ">
            {/* logo */}
            <div
              className="relative w-11 h-11 rounded-2xl
             bg-white flex items-center justify-center shadow-md mt-20"
            >
              <div className="w-5 h-5 rounded-full bg-[#120d3a] relative">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6ee7b7] absolute top-1 left-1" />
              </div>
            </div>
          </div>

          <div className="leading-tight mt-20">
            <h1 className="text-xl font-bold tracking-wide text-white">CCTV</h1>
            <p className="text-xs tracking-[0.18em] text-indigo-200/80 font-medium">
              BACK OFFICE
            </p>
          </div>
        </div>

        <h2
          className="text-center text-3xl sm:text-4xl font-extrabold
        leading-relaxed tracking-tight mb-3"
        >
          ทุกกล้อง ทุกสาขา
          <br />
          ดูได้ในที่เดียว
        </h2>

        {/* frame */}
        <div className="w-120 min-h-400px rounded-3xl bg-[#272154]/70 border border-white/15 sm:p-8 shadow-2xl mt-4 mb-20">

          {/* กล่องข้อความด้านบน */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex rounded-full bg-[#120e33] p-1 border border-white/5">
              <div className="px-6 py-2 rounded-full bg-white text-[#120d3a] text-s font-bold shadow">
                กรุณากรอกอีเมล
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="อีเมล"
                required
                className="w-full rounded-xl bg-[#141038] border border-white/10 px-4 py-3 text-sm placeholder-indigo-300/40"
              />
            </div>

            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="รหัสผ่าน"
                required
                className="w-full rounded-xl bg-[#141038] border border-white/10 px-4 py-3 text-sm
                   placeholder-indigo-300/40 "
              />
            </div>

            {errorMsg && (
              <div className="rounded-xl bg-rose-500/15 border border-rose-500/30 px-4 py-2.5 text-xs font-medium text-rose-300 text-center">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#72f1b8]  text-black font-bold text-sm py-3.5 mt-3 mb-7"
            >
              {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </button>
          </form>

          <div className="mt-3 flex flex-col items-center justify-center gap-3 text-xs">
            <Link
              href="/forget-pass"
              className="text-indigo-300/60 hover:text-indigo-200 transition-colors"
            >
              ลืมรหัสผ่าน?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
