
"use client";

import Link from "next/link";
import { BRANCH_LABEL } from "@/lib/cameras";
import { PageHead } from "@/components/ui";
import { useCameras } from "@/lib/useCameras";

export default function DevicesPage() {
  const cameras = useCameras();

  const branches = new Set(cameras.map((c) => c.branch)).size;

  return (
    <>
      <PageHead
        title="อุปกรณ์"
        sub={`${cameras.length} กล้อง · ${branches} สาขา`}
      />

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>กล้อง</th>
              <th>สาขา</th>
              <th>สถานะ</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {cameras.map((camera) => (
              <tr key={camera.id}>
                <td>{camera.name}</td>

                <td>{BRANCH_LABEL[camera.branch]}</td>

                <td>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${camera.status === "online"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                      }`}
                  >
                    {camera.status === "online" ? "ออนไลน์" : "ออฟไลน์"}
                  </span>
                </td>

                <td style={{ textAlign: "right" }}>
                  <Link
                    href={`/devices/${camera.id}`}
                    className="btn"
                  >
                    รายละเอียด
                  </Link>
                </td>
              </tr>
            ))}

            {cameras.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  ยังไม่มีกล้องในระบบ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
