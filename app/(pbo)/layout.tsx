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
    <div className="flex min-h-screen bg-[#0b0826] text-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center border-b border-white/8 bg-[#100d32]/85 px-6 backdrop-blur-xl lg:px-8">
          <p className="text-lg font-bold">{titles[pathname] ?? ""}</p>
        </header>

        {/* เนื้อหาของแต่ละหน้า */}
        <main className="flex-1 overflow-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
