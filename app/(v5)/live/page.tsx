
"use client";

import Link from "next/link";
import Image from "next/image";
import { BRANCH_LABEL } from "@/lib/cameras";
import { useCameras } from "@/lib/useCameras";

export default function LivePage() {
  const cameras = useCameras();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

      {cameras.map((camera) => (
        <div
          key={camera.id}
          className="rounded-xl bg-[#100D35] p-4"
        >
          {/* ชื่อกล้องและสถานะ */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white">
              {camera.name}
            </h3>

            <span
              className={
                camera.status === "online"
                  ? "text-green-400"
                  : "text-red-400"
              }
            >
              {camera.status === "online"
                ? "ออนไลน์"
                : "ออฟไลน์"}
            </span>
          </div>

          {/* ภาพกล้อง */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-black">

            {camera.status === "online" ? (
              <Image
                src={camera.snapshot}
                alt={camera.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                กล้องออฟไลน์
              </div>
            )}

          </div>

          {/* สาขา */}
          <p className="mt-3 text-sm text-gray-400">
            {BRANCH_LABEL[camera.branch]}
          </p>

          {/* รายละเอียด */}
          <Link
            href={`/devices/${camera.id}`}
            className="mt-3 block text-center text-sm text-white"
          >
            รายละเอียด
          </Link>
        </div>
      ))}

      {cameras.length === 0 && (
        <div className="col-span-full text-center text-gray-400 py-10">
          ยังไม่มีกล้องในระบบ
        </div>
      )}

    </div>
  );
}
