'use client'

import { useState } from "react";
import { Upload, Funnel, Video, CirclePlay } from "lucide-react";
import { logs, views, groups } from "@/data/history";

export default function History() {

  // State
  const [tab, setTab] = useState<'system' | 'video'>('system')
  const [showFilter, setShowFilter] = useState(false)
  const [who, setWho] = useState('ทั้งหมด')

  // ตัวกรอง
  const names = tab === 'system' ? logs.map((l) => l.by) : views.map((v) => v.by)
  const people = ['ทั้งหมด', ...new Set(names)]

  const shown = who === 'ทั้งหมด' ? logs : logs.filter((l) => l.by === who)
  const shownViews = who === 'ทั้งหมด' ? views : views.filter((v) => v.by === who)

  // เปลี่ยนแท็บ
  function changeTab(t: 'system' | 'video') {
    setTab(t)
    setWho('ทั้งหมด')
    setShowFilter(false)
  }

  return (
    <div>
      {/* แถวบน */}
      <div className="flex items-center justify-between">

        {/* แท็บ */}
        <nav className="flex rounded-full bg-white/5 p-1">
          <button
            onClick={() => changeTab('system')}
            className={`rounded-full px-4 py-1.5 text-sm ${
              tab === 'system' ? 'bg-white font-medium text-black' : 'text-white/70'
            }`}
          >
            การใช้งานระบบ
          </button>
          <button
            onClick={() => changeTab('video')}
            className={`rounded-full px-4 py-1.5 text-sm ${
              tab === 'video' ? 'bg-white font-medium text-black' : 'text-white/70'
            }`}
          >
            การดูวิดีโอ
          </button>
        </nav>

        <div className="flex gap-2">
          {/* ตัวกรอง */}
          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white"
            >
              <Funnel size={14} /> {who === 'ทั้งหมด' ? 'ตัวกรอง' : who}
            </button>

            {showFilter && (
              <div className="absolute right-0 z-10 mt-2 w-40 rounded-lg border border-white/10 bg-[#1a1150] p-1">
                {people.map((p) => (
                  <button
                    key={p}
                    onClick={() => { setWho(p); setShowFilter(false) }}
                    className="block w-full rounded-md px-3 py-2 text-left text-sm text-white hover:bg-white/10"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ปุ่มส่งออก */}
          <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
            <Upload size={14} /> ส่งออก
          </button>
        </div>
      </div>

      <div className="mt-4">
        {/* การใช้งานระบบ */}
        {tab === 'system' && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            {groups.filter((g) => shown.some((l) => l.group === g)).map((g) => (
              <div key={g}>
                <p className="mb-1 mt-2 text-xs text-white/40">{g}</p>

                <div className="divide-y divide-white/10">
                  {shown
                    .filter((l) => l.group === g)
                    .map((l) => (
                      <div key={l.title} className="flex items-center gap-3 py-3">
                        <div className="rounded-lg bg-white/10 p-2">
                          <l.icon size={16} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{l.title}</p>
                          <p className="text-xs text-white/40">โดย {l.by}</p>
                        </div>
                        <span className="w-32 text-xs text-white/40">IP {l.ip}</span>
                        <span className="w-12 text-right text-sm font-medium text-white">{l.time}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* การดูวิดีโอ */}
        {tab === 'video' && (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            {groups.filter((g) => shownViews.some((v) => v.group === g)).map((g) => (
              <div key={g}>
                <p className="mb-1 mt-2 text-xs text-white/40">{g}</p>

                <div className="divide-y divide-white/10">
                  {shownViews
                    .filter((v) => v.group === g)
                    .map((v) => (
                      <div key={v.camera + v.time} className="flex items-center gap-3 py-3">
                        <div className="rounded-lg bg-white/10 p-2">
                          {v.type === 'live'
                            ? <Video size={16} className="text-white" />
                            : <CirclePlay size={16} className="text-white" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white">{v.camera} · {v.branch}</p>
                          <p className="text-xs text-white/40">
                            โดย {v.by} · {v.type === 'live' ? v.device : `คลิป ${v.clip}`}
                          </p>
                        </div>
                        <span
                          className={`w-20 rounded-full px-2 py-0.5 text-center text-xs ${
                            v.type === 'live' ? 'bg-red-500/20 text-red-300' : 'bg-sky-500/20 text-sky-300'
                          }`}
                        >
                          {v.type === 'live' ? 'ดูสด' : 'ย้อนหลัง'}
                        </span>
                        <span className="w-16 text-right text-xs text-white/40">{v.duration}</span>
                        <span className="w-12 text-right text-sm font-medium text-white">{v.time}</span>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
