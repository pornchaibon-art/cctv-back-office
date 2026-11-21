'use client';

import { useState } from 'react';
import { Download, Pause, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { BRANCH_LABEL, CAMERAS } from '@/lib/cameras';
import { PageHead } from '@/components/ui';

const TIMES = ['00:00', '06:00', '12:00', '18:00', '24:00'];

export default function PlaybackPage() {
  const [camId, setCamId] = useState(CAMERAS[0].id);
  const [date, setDate] = useState('2026-11-18');
  const [playing, setPlaying] = useState(false);

  const cam = CAMERAS.find((c) => c.id === camId) ?? CAMERAS[0];

  return (
    <>
      <PageHead
        title="ดูย้อนหลัง"
        sub="เลือกกล้องและวันที่ที่ต้องการดูย้อนหลัง"
      />

      <div className="grid-2">
        <div className="card stack">
          <div className="cam-media">
            <img
              key={cam.id}
              src={cam.snapshot}
              alt={cam.name}
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
            <span className="cam-time">{date}</span>
            <button
              type="button"
              className="play-big"
              aria-label={playing ? 'หยุด' : 'เล่น'}
              onClick={() => setPlaying(!playing)}
            >
              {playing ? <Pause size={26} /> : <Play size={26} />}
            </button>
          </div>

          <div className="timeline">
            <span style={{ left: '8%', width: '22%' }} />
            <span style={{ left: '44%', width: '10%' }} />
            <span style={{ left: '66%', width: '14%' }} />
            <b style={{ left: '52%' }} />
          </div>
          <div className="time-scale">
            {TIMES.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>

          <div className="row-between">
            <div className="ctrl">
              <button type="button" className="icon-btn" aria-label="ย้อนกลับ">
                <SkipBack size={16} />
              </button>
              <button
                type="button"
                className="icon-btn"
                aria-label={playing ? 'หยุด' : 'เล่น'}
                onClick={() => setPlaying(!playing)}
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button type="button" className="icon-btn" aria-label="ไปข้างหน้า">
                <SkipForward size={16} />
              </button>
              <Volume2 size={16} />
            </div>
            <button type="button" className="btn">
              <Download size={14} /> ดาวน์โหลดคลิป
            </button>
          </div>
        </div>

        <aside className="card stack">
          <input
            type="date"
            className="field"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="muted">กล้อง</div>
          {CAMERAS.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`preset${c.id === camId ? ' active' : ''}`}
              onClick={() => {
                setCamId(c.id);
                setPlaying(false);
              }}
            >
              {c.name}
              <small>{BRANCH_LABEL[c.branch]}</small>
            </button>
          ))}
        </aside>
      </div>
    </>
  );
}
