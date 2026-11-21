'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import CameraCard from '@/components/CameraCard';
import CameraModal from '@/components/CameraModal';
import {
  BRANCH_LABEL,
  BRANCH_TABS,
  CAMERAS,
  type BranchTab,
  type Camera,
} from '@/lib/cameras';

export default function LivePage() {
  const [tab, setTab] = useState<BranchTab>('bangna');
  const [query, setQuery] = useState('');
  const [now, setNow] = useState('');
  const [expanded, setExpanded] = useState<Camera | null>(null);

  // นาฬิกาในการ์ดกล้อง อัปเดตทุกวินาที
  // เริ่มเป็นค่าว่างก่อน เพื่อหลีกเลี่ยง hydration mismatch
  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const cameras = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CAMERAS.filter(
      (c) =>
        (tab === 'all' || c.branch === tab) &&
        (q === '' || c.name.toLowerCase().includes(q)),
    );
  }, [tab, query]);

  const scopeLabel = tab === 'all' ? 'ทุกสาขา' : BRANCH_LABEL[tab];

  return (
    <>
        <header className="page-head">
          <div>
            <h1 className="page-title">ดูสด</h1>
            <p className="page-sub">
              {cameras.length} กล้อง · {scopeLabel}
            </p>
          </div>

          <div className="head-actions">
            <Link href="/live/screens" className="btn">ชุดหน้าจอ & วนแสดง</Link>
          <label className="search">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหากล้อง สาขา..."
            />
          </label>
          </div>
        </header>

        <div className="toolbar">
          <div className="segmented" role="tablist">
            {BRANCH_TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={tab === t.id ? 'active' : ''}
                onClick={() => setTab(t.id)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <section className="grid">
          {cameras.length === 0 ? (
            <div className="empty">ไม่พบกล้องที่ค้นหา</div>
          ) : (
            cameras.map((cam) => (
              <CameraCard
                key={cam.id}
                camera={cam}
                time={now || '--:--:--'}
                branchLabel={BRANCH_LABEL[cam.branch]}
                onExpand={() => setExpanded(cam)}
              />
            ))
          )}
        </section>
      {expanded && (
        <CameraModal
          camera={expanded}
          time={now || '--:--:--'}
          onClose={() => setExpanded(null)}
        />
      )}
    </>
  );
}
