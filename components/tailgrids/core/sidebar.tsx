"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import {
  Home,
  Video,
  PlayCircle,
  Bell,
  Monitor,
  Users,
  BarChart2,
  Clock,
  Cloud,
  MessageSquare,
  Settings,
  LogOut,
  Network,
  MonitorActivity,
  MessageSquareText,
  HardDrive,
  ShieldCheck,
} from "lucide-react";

const topMenus = [
  { name: "ภาพรวม", icon: Home, href: "/customer" },
  { name: "ดูสด", href: "/live", icon: Video },
  { name: "ดูย้อนหลัง", href: "/playback", icon: PlayCircle },
  { name: "การแจ้งเหตุ", href: "/alert", icon: Bell, badge: "" },
  { name: "อุปกรณ์", href: "/devices", icon: Monitor },
  { name: "บุคลากร & Manager", href: "/people", icon: Users },
  { name: "Update", href: "/firmware", icon: Network },
  { name: "รายงาน", href: "/report", icon: BarChart2 },
  { name: "ประวัติการใช้งาน", href: "/history", icon: Clock },
];

const bottomMenus = [
  { name: "แจ้งเรื่องถึง Admin", href: "/comment", icon: MessageSquare },
  { name: "การตั้งค่า", href: "/setting", icon: Settings },
];

// เมนู Admin (มาจาก sidebar เดิมของโปรเจกต์ f)
const adminTopMenus = [
  { name: "อุปกรณ์", href: "/admin", icon: Monitor },
  { name: "ดูแลอุปกรณ์", href: "/admin/maintain", icon: MonitorActivity },
  {
    name: "เรื่องแจ้งจากลูกค้า",
    href: "/admin/comment",
    icon: MessageSquareText,
  },
  { name: "พื้นที่", href: "/admin/storage", icon: HardDrive },
];

const adminBottomMenus: typeof bottomMenus = [];

// เมนู Super Admin (มาจาก sidebar เดิมของโปรเจกต์ super admin)
const superAdminTopMenus = [
  { name: "ผู้ใช้และบทบาท", href: "/super-admin/users", icon: Users },
  {
    name: "สิทธิ์ของแต่ละบทบาท",
    href: "/super-admin/permissions",
    icon: ShieldCheck,
  },
  {
    name: "ประวัติการเปลี่ยนสิทธิ์",
    href: "/super-admin/history",
    icon: Clock,
  },
  {
    name: "เรื่องส่งต่อจาก Admin",
    href: "/super-admin/forwarded",
    icon: MessageSquareText,
  },
];

const superAdminBottomMenus: typeof bottomMenus = [];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // เลือกชุดเมนูตามส่วนของเว็บ
  const isSuperAdmin = pathname.startsWith("/super-admin");
  const isAdmin = !isSuperAdmin && pathname.startsWith("/admin");
  const menus = isSuperAdmin
    ? superAdminTopMenus
    : isAdmin
      ? adminTopMenus
      : topMenus;
  const footerMenus = isSuperAdmin
    ? superAdminBottomMenus
    : isAdmin
      ? adminBottomMenus
      : bottomMenus;

  const [user, setUser] = useState({
    role: "CUSTOMER", //ค่าเริ่มต้นเผื่อยังไม่ล็อกอิน
    name: "Chira",
    initials: "CH",
  });

  // อ่านจาก local ถ้ามีคนล็อกอิน
  useEffect(() => {
    const saveUser = localStorage.getItem("cctv_user");
    if (saveUser) {
      setUser((prev) => ({ ...prev, ...JSON.parse(saveUser) }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("cctv_user");
    router.push("/");
  };

  return (
    <aside
      className="sticky top-0 h-screen w-60 shrink-0 border-r border-white/8
      bg-[linear-gradient(180deg,#17113f_0%,#100d32_100%)] p-4
      flex flex-col justify-between text-white shadow-[12px_0_40px_rgba(5,3,24,0.14)]"
    >
      {/* menu */}
      <div>
        <div className="px-2 mb-6">
          <h1 className="text-lg font-bold">CCTV</h1>
          <p className="text-[10px] tracking-widest text-indigo-300">
            BACK OFFICE
          </p>
          <span
            className="inline-block mt-2 rounded-full bg-[#72f1b8]/90
          text-[#0f172a] text-[10px] font-extrabold px-2 py-1"
          >
            {user.role}
          </span>
        </div>

        <nav className="space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center justify-between px-2 py-2 rounded-xl text-sm ${
                  isActive
                    ? "bg-[#231d52] text-white font-semibold border border-white/10"
                    : "text-indigo-200/70 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* setting & profile */}
      <div className="space-y-3 pt-6">
        <nav className="space-y-1">
          {footerMenus.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                  isActive
                    ? "bg-[#231d52] text-white font-semibold border border-white/10"
                    : "text-indigo-200/70 hover:bg-white/5"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="rounded-2xl bg-[#1d1847] border border-white/10 p-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-full bg-[#72f1b8] text-[#110d2e] font-extrabold text-sm flex items-center justify-center shrink-0">
            {user.initials}
          </div>
        </div>

        <button
          onClick={handleLogout}
          title="ออกจากระบบ"
          className="p-2 text-indigo-300/70 hover:text-rose-400 transition-colors cursor-pointer shrink-0"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
}
