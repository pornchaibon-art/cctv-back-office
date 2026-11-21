'use client';

import { Card, CardContent } from "@/components/tailgrids/core/card";
import { ArrowRight, Bell, Server, Settings } from "lucide-react";
import { Kanit } from "next/font/google";
import { nvrData } from "@/data/storage";


const kanit = Kanit({
    subsets: ["thai", "latin"],
    weight: ['300', '400', '500', '600', '700'],
})

export default function Page() {
    return (
        <div>
            <div>
                <main className="flex-1 min-w-0 p-6 bg-[#211778] border w-full">
                    <div className="flex items-center justify-between gap-4">
                        <h1 className={`${kanit.className} text-2xl font-medium text-white`}>
                            อุปกรณ์
                        </h1>
                        <div className="flex items-center gap-3">

                            <button className="flex size-10 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-[#292253] text-white transition hover:bg-[#393080]">
                                <Bell size={18} />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">

                        {nvrData.map((nvr) => (
                            <Card
                                key={nvr.id}
                                className="bg-[#211B63] border border-[#393477] rounded-2xl shadow-none"
                            >
                                <CardContent className="p-4">

                                    {/* Header */}
                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-2.5">

                                            <div
                                                className={`w-9 h-9 rounded-lg flex items-center justify-center ${nvr.status === "offline"
                                                    ? "bg-[#393477] text-[#9691C5]"
                                                    : "bg-[#087C70] text-[#62F5C3]"
                                                    }`}
                                            >
                                                <Server size={19} />
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold text-white">
                                                    {nvr.id} {nvr.branch}
                                                </h3>

                                                <p className="text-[10px] text-[#A6A1D0]">
                                                    {nvr.branch} · {nvr.connected}/{nvr.total} ช่องที่ใช้
                                                </p>
                                            </div>

                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`px-2.5 py-1 rounded-full text-[10px] flex items-center gap-1.5 ${nvr.status === "online"
                                                ? "bg-[#087C7040] text-[#62F5C3]"
                                                : nvr.status === "warning"
                                                    ? "bg-[#A17B1940] text-[#FFD45C]"
                                                    : "bg-[#514A9140] text-[#A6A1D0]"
                                                }`}
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-current" />

                                            {nvr.status === "online"
                                                ? "ออนไลน์"
                                                : nvr.status === "warning"
                                                    ? "ใกล้เต็มความจุ"
                                                    : "ออฟไลน์"}
                                        </span>

                                    </div>

                                    {/* Storage */}
                                    <div className="mt-4">

                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-[10px] text-[#A6A1D0]">
                                                พื้นที่ฮาร์ดดิสก์
                                            </span>

                                            <span
                                                className={`text-[10px] ${nvr.status === "warning"
                                                    ? "text-[#FFD45C]"
                                                    : "text-[#A6A1D0]"
                                                    }`}
                                            >
                                                {nvr.status === "offline"
                                                    ? "—"
                                                    : `${nvr.storage}% ของ 4 TB`}
                                            </span>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-full h-1.5 rounded-full bg-[#100D35] overflow-hidden">

                                            <div
                                                className={`h-full rounded-full transition-all duration-300 ${nvr.status === "warning"
                                                    ? "bg-[#FFD45C]"
                                                    : nvr.status === "offline"
                                                        ? "bg-transparent"
                                                        : "bg-[#55E8B5]"
                                                    }`}
                                                style={{ width: `${nvr.storage}%` }}
                                            />

                                        </div>

                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center gap-4 mt-3">

                                        <button
                                            type="button"
                                            disabled={nvr.status === "offline"}
                                            className="flex items-center gap-1 text-xs font-medium text-[#55E8B5] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            ดูกล้องที่เชื่อมอยู่
                                            <ArrowRight size={13} />
                                        </button>

                                    </div>

                                </CardContent>
                            </Card>
                        ))}
                    </div>

                </main>
            </div>
        </div>
    );
}
