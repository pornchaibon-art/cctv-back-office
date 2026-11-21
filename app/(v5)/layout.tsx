import { Suspense } from 'react';
import Sidebar from '@/components/tailgrids/core/sidebar';
import './v5.css';

// โครงเดียวกับ app/layout.tsx เดิมของ v5 แต่ใช้ sidebar ของ ject
// .v5-scope: CSS ของ v5 มีผลเฉพาะหน้า live / playback / devices / people ไม่ชนกับ Tailwind
// Suspense: Next 16 (cacheComponents) ต้องมีเมื่อใช้ useParams()/usePathname() ในหน้า devices/[id] และ [section]
export default function V5Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="v5-scope">
      <div className="app">
        <Suspense>
          <Sidebar />
        </Suspense>
        <main className="main">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}
