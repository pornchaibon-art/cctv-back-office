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
        {!imgFailed && (
          <img
            src={camera.snapshot}
            alt={camera.name}
            onError={() => setImgFailed(true)}
          />
        )}

        <span className="live-badge">
          <i />
          LIVE
        </span>
        <span className="cam-time">{time}</span>

        <button className="expand" aria-label="ขยายภาพ" type="button" onClick={onExpand}>
          <Maximize2 size={14} />
        </button>
      </div>

      <div className="cam-foot">
        <div>
          <div className="cam-name">{camera.name}</div>
          <div className="cam-branch">{branchLabel}</div>
        </div>
        <span className="status">ออนไลน์</span>
      </div>
    </article>
  );
}
