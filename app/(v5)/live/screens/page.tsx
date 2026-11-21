'use client';

import { useState } from 'react';
import { Play, Plus, Save } from 'lucide-react';
import { PageHead, Toggle } from '@/components/ui';
import { BRANCH_LABEL, CAMERAS } from '@/lib/cameras';

// กล้องในแต่ละชุด เรียงตามช่อง ใส่ id ของกล้องจาก lib/cameras.ts
const PRESETS = [
  {
    name: 'หน้าร้านทุกสาขา',
    cams: ['cam-01', 'cam-07', 'cam-09'],
    layout: '2-2',
  },
  {
    name: 'สาขาบางนาทั้งหมด',
    cams: ['cam-01', 'cam-02', 'cam-03', 'cam-04', 'cam-05', 'cam-06'],
    layout: '3-2',
  },
  {
    name: 'กะดึก',
    cams: CAMERAS.slice(0, 9).map((c) => c.id),
    layout: '3-3',
  },
];

const LAYOUTS = [
  { id: '1', cols: 1, slots: 1, label: '1' },
  { id: '2-2', cols: 2, slots: 4, label: '2×2' },
  { id: '3-2', cols: 3, slots: 6, label: '3×2' },
  { id: '3-3', cols: 3, slots: 9, label: '3×3' },
];

const INTERVALS = ['10 วินาที', '30 วินาที', '1 นาที'];

export default function ScreensPage() {
  const [preset, setPreset] = useState(0);
  const [layout, setLayout] = useState('2-2');
  const [step, setStep] = useState(1);
  const [autoLoop, setAutoLoop] = useState(true);
  const [skipOffline, setSkipOffline] = useState(true);
  const [looping, setLooping] = useState(false);

  const cfg = LAYOUTS.find((l) => l.id === layout) ?? LAYOUTS[0];
  const current = PRESETS[preset];

  return (
    <>
      <PageHead
        title="ชุดหน้าจอ & การวนแสดง"
        sub="สร้างชุดกล้องไว้ดูพร้อมกัน และให้ระบบสลับหน้าจออัตโนมัติ"
      />

      <div className="split">
        <aside className="card stack">
          <div className="row-between">
            <strong>ชุดหน้าจอของฉัน</strong>
            <button type="button" className="btn">
              <Plus size={14} /> สร้าง
            </button>
          </div>
          {PRESETS.map((p, i) => (
            <button
              key={p.name}
              type="button"
              className={`preset${preset === i ? ' active' : ''}`}
              onClick={() => {
                setPreset(i);
                setLayout(p.layout);
              }}
            >
              {p.name}
              <small>
                {p.cams.length} กล้อง · {p.layout}
              </small>
            </button>
          ))}
        </aside>

        <section className="card stack">
          <div className="row-between">
            <strong>{current.name}</strong>
            <div className="segmented">
              {LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={layout === l.id ? 'active' : ''}
                  onClick={() => setLayout(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div
            className="wall"
            style={{ gridTemplateColumns: `repeat(${cfg.cols}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: cfg.slots }, (_, i) => {
              const cam = CAMERAS.find((c) => c.id === current.cams[i]);
              return cam ? (
                <div key={`${cam.id}-${i}`} className="slot">
                  <img
                    src={cam.snapshot}
                    alt={cam.name}
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                  <div className="slot-label">
                    <strong>{cam.name}</strong>
                    <small>{BRANCH_LABEL[cam.branch]}</small>
                  </div>
                </div>
              ) : (
                <div key={`add-${i}`} className="slot add">
                  <Plus size={18} />
                  เพิ่มช่อง
                </div>
              );
            })}
          </div>

          <div className="row">
            <div>
              วนแสดงอัตโนมัติ
              <small>สลับหน้าจอตามเวลาที่ตั้งไว้</small>
            </div>
            <Toggle on={autoLoop} onChange={setAutoLoop} />
          </div>

          <div className="row">
            <div>
              สลับทุก
              <small>เวลาในการเปลี่ยนหน้าจอ</small>
            </div>
            <div className="segmented">
              {INTERVALS.map((t, i) => (
                <button
                  key={t}
                  type="button"
                  className={step === i ? 'active' : ''}
                  onClick={() => setStep(i)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="row">
            <div>
              อ้างอิงกล้องที่ออฟไลน์
              <small>ข้ามกล้องที่ไม่พร้อมใช้งาน</small>
            </div>
            <Toggle on={skipOffline} onChange={setSkipOffline} />
          </div>

          <div className="row-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setLooping(!looping)}
            >
              <Play size={14} />
              {looping ? 'หยุดวนแสดง' : 'เริ่มวนแสดง'}
            </button>
            <button type="button" className="btn">
              <Save size={14} /> บันทึกชุด
            </button>
          </div>
        </section>
      </div>
    </>
  );
}
