'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, RotateCw, Trash2 } from 'lucide-react';
import CameraCard from '@/components/CameraCard';
import CameraModal from '@/components/CameraModal';
import { PageHead, Toggle } from '@/components/ui';
import { BRANCH_LABEL } from '@/lib/cameras';
import { useCameras } from '@/lib/useCameras';

const QUALITY = ['HD', 'Full HD', '2K'];

export default function DeviceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const cameras = useCameras();
  const cam = cameras.find((c) => c.id === id);

  const [now, setNow] = useState('--:--:--');
  const [expanded, setExpanded] = useState(false);
  const [quality, setQuality] = useState('Full HD');
  const [light, setLight] = useState(true);
  const [mic, setMic] = useState(false);
  const [person, setPerson] = useState(true);

  useEffect(() => {
    const tick = () =>
      setNow(new Date().toLocaleTimeString('en-GB', { hour12: false }));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!cam) {
    return (
      <>
        <PageHead title="ไม่พบกล้อง" sub="กล้องนี้ไม่มีในระบบ" />
        <Link href="/devices" className="btn">
          <ArrowLeft size={14} /> กลับไปหน้าอุปกรณ์
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/devices" className="back">
        <ArrowLeft size={14} /> กลับไปหน้าอุปกรณ์
      </Link>
      <PageHead
        title={cam.name}
        sub={`${BRANCH_LABEL[cam.branch]} · SN ${cam.serialNumber}`}
      />
      

      <div className="grid-2">
        <div className="stack">
          <CameraCard
            camera={cam}
            time={now}
            branchLabel={BRANCH_LABEL[cam.branch]}
            onExpand={() => setExpanded(true)}
          />
          <div className="card">
            <dl className="spec">
              <dt>รุ่น</dt>
              <dd>IPC-F42FEP</dd>
              <dt>เวอร์ชันเฟิร์มแวร์</dt>
              <dd>2.840.0</dd>
              <dt>IP</dt>
              <dd>192.168.1.41</dd>
              <dt>Cloud</dt>
              <dd>เก็บย้อนหลัง 30 วัน</dd>
              <dt>SD card</dt>
              <dd>128 GB · ใช้ไป 62%</dd>
            </dl>
          </div>
        </div>

        <div className="card stack">
          <div className="row">
            <div>
              ชื่อกล้อง
              <small>แสดงในหน้าดูสด</small>
            </div>
            <span className="muted">{cam.name}</span>
          </div>

          <div className="row">
            <div>
              คุณภาพวิดีโอ
              <small>ความคมชัดของภาพ</small>
            </div>
            <div className="segmented">
              {QUALITY.map((q) => (
                <button
                  key={q}
                  type="button"
                  className={quality === q ? 'active' : ''}
                  onClick={() => setQuality(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <div className="row">
            <div>
              ไฟส่องสว่างอัตโนมัติ
              <small>เปิดไฟเมื่อมีความเคลื่อนไหวตอนมืด</small>
            </div>
            <Toggle on={light} onChange={setLight} />
          </div>

          <div className="row">
            <div>
              ไมโครโฟน
              <small>บันทึกเสียงพร้อมวิดีโอ</small>
            </div>
            <Toggle on={mic} onChange={setMic} />
          </div>

          <div className="row">
            <div>
              ตรวจจับบุคคล
              <small>แจ้งเตือนเมื่อพบคนในพื้นที่</small>
            </div>
            <Toggle on={person} onChange={setPerson} />
          </div>

          <div className="row">
            <div>
              ช่วงเวลาตรวจจับ
              <small>ทุกวัน 20:00 – 06:00</small>
            </div>
            <button type="button" className="link">
              แก้ไข →
            </button>
          </div>

          <div className="row-end">
            <button type="button" className="btn">
              <RotateCw size={14} /> รีสตาร์ทกล้อง
            </button>
            <button type="button" className="btn btn-danger">
              <Trash2 size={14} /> ลบกล้องออก
            </button>
          </div>
        </div>
      </div>

      {expanded && (
        <CameraModal
          camera={cam}
          time={now}
          onClose={() => setExpanded(false)}
        />
      )}
    </>
  );
}
