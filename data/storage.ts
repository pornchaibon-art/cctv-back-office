
import { cctv } from "@/data/cctv";

const storageConfig = [
  {
    id: "NVR-01",
    branch: "สาขาสยาม",
    storage: 72,
    capacity: 4,
    total: 32,
  },
  {
    id: "NVR-02",
    branch: "สาขาอโศก",
    storage: 48,
    capacity: 4,
    total: 32,
  },
  {
    id: "NVR-05",
    branch: "สาขาลาดพร้าว",
    storage: 91,
    capacity: 4,
    total: 32,
  },
  {
    id: "NVR-03",
    branch: "สาขาบางนา",
    storage: 35,
    capacity: 4,
    total: 32,
  },
];

export const nvrData = storageConfig.map((nvr) => {

  // ดึงกล้องตามสาขา
  const cameras = cctv.filter(
    (camera) => camera.branch === nvr.branch
  );

  // นับกล้องออนไลน์
  const online = cameras.filter(
    (camera) => camera.status === "online"
  ).length;

  // นับกล้องออฟไลน์
  const offline = cameras.filter(
    (camera) => camera.status === "offline"
  ).length;

  return {
    ...nvr,
    connected: cameras.length,
    online,
    offline,

    // สถานะความจุ Storage
    status: nvr.storage >= 90 ? "warning" : "online",
  };
});
