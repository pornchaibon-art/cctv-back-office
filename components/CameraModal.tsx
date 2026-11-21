'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { BRANCH_LABEL, type Camera } from '@/lib/cameras';

type Props = {
  camera: Camera;
  time: string;
  onClose: () => void;
};

export default function CameraModal({ camera, time, onClose }: Props) {
  // กด Esc เพื่อปิด
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="cam-media">
          <img
            src={camera.snapshot}
            alt={camera.name}
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <span className="live-badge">
            <i />
            LIVE
          </span>
          <span className="cam-time">{time}</span>
        </div>

        <div className="cam-foot">
          <div>
            <div className="cam-name">{camera.name}</div>
            <div className="cam-branch">{BRANCH_LABEL[camera.branch]}</div>
          </div>
          <div className="row-end">
            <Link href={`/devices/${camera.id}`} className="btn">
              รายละเอียดกล้อง
            </Link>
            <button type="button" className="btn" onClick={onClose}>
              <X size={14} /> ปิด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
