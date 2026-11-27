'use client';

import { useState } from 'react';
import { Maximize2 } from 'lucide-react';
import type { Camera } from '@/lib/cameras';

type Props = {
  camera: Camera;
  time: string;
  branchLabel: string;
  onExpand?: () => void;
};

export default function CameraCard({ camera, time, branchLabel, onExpand }: Props) {
  // ถ้ารูปโหลดไม่ได้ (ยังไม่ได้วางไฟล์) จะแสดงพื้นหลังไล่สีแทน
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className="cam-card">
      <div className="cam-media">
  {camera.status === 'online' && !imgFailed ? (
    <img
      src={camera.snapshot}
      alt={camera.name}
      onError={() => setImgFailed(true)}
    />
  ) : (
    <div className="flex h-full w-full items-center justify-center bg-[#100D35]">
      <div className="text-center">
        <p className="text-red-400 font-medium">กล้องออฟไลน์</p>
        <p className="text-sm text-gray-400">ไม่สามารถแสดงภาพได้</p>
      </div>
    </div>
  )}

  {camera.status === 'online' && (
    <>
      <span className="live-badge">
        <i />
        LIVE
      </span>

      <span className="cam-time">{time}</span>

      <button
        className="expand"
        aria-label="ขยายภาพ"
        type="button"
        onClick={onExpand}
      >
        <Maximize2 size={14} />
      </button>
    </>
  )}
</div>
    </article>
  );
}
