'use client'

import Sidebar from '@/components/tailgrids/core/sidebar'
import { usePathname } from 'next/navigation'

// หัวข้อหน้า (เดิมอยู่ใน components/Sidebar.tsx ของ Project back office)
const titles: Record<string, string> = {
  '/firmware': 'Update',
  '/report': 'รายงาน',
  '/history': 'ประวัติการใช้งาน',
  '/comment': 'แจ้งเรื่องถึง Admin',
  '/setting': 'ตั้งค่า',
}

export default function PboLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#161142] text-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b border-base-200 bg-background-100 px-6">
          <p className="text-lg font-semibold">{titles[pathname] ?? ""}</p>
        </header>

        {/* เนื้อหาของแต่ละหน้า */}
        <main className="flex-1 overflow-auto p-6 bg-background-50">
          {children}
        </main>
      </div>
    </div>
  )
}
