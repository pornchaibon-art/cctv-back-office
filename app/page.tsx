"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const enterAs = (role: "CUSTOMER" | "ADMIN" | "SUPER ADMIN") => {
    if (role === "ADMIN") {
      localStorage.setItem(
        "cctv_user",
        JSON.stringify({
          role: "ADMIN",
          name: "Thanut",
          initials: "TH",
        }),
      );
      router.push("/admin");
      return;
    }

    if (role === "SUPER ADMIN") {
      localStorage.setItem(
        "cctv_user",
        JSON.stringify({
          role: "SUPER ADMIN",
          name: "Ryu Admin",
          initials: "RY",
        }),
      );
      router.push("/super-admin");
      return;
    }

    localStorage.setItem(
      "cctv_user",
      JSON.stringify({
        role: "CUSTOMER",
        name: "Chira",
        initials: "CH",
      }),
    );
    router.push("/customer");
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
                เลือกบทบาทเพื่อเข้าใช้งาน
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {(
              [
                ["CUSTOMER", "Customer", "ลูกค้า"],
                ["ADMIN", "Admin", "ผู้ดูแล"],
                ["SUPER ADMIN", "Super Admin", "ผู้ดูแลระบบ"],
              ] as const
            ).map(([role, label, description]) => (
              <button
                key={role}
                type="button"
                onClick={() => enterAs(role)}
                className="w-full rounded-2xl border border-white/10 bg-[#141038] px-5 py-4 text-left transition-all hover:border-[#72f1b8]/60 hover:bg-[#1b1750]"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-base font-bold text-white">{label}</p>
                    <p className="mt-1 text-xs text-indigo-200/60">{description}</p>
                  </div>
                  <span className="text-xl text-[#72f1b8]">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
