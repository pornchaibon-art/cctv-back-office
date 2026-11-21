// ข้อมูลหน้ารายงาน

// ช่วงเวลา
export const ranges = ["7 วัน", "30 วัน", "กำหนดเอง"];

// รูปแบบข้อมูล
export type ReportData = {
  stats: { online: string; alerts: string; liveHours: string; downloads: string }; // การ์ดสรุป
  daily: { day: string; person: number; motion: number }[];                         // กราฟ
  topCameras: { name: string; branch: string; count: number }[];                    // กล้องที่แจ้งเตือนบ่อย
};

// 7 วัน
export const data7: ReportData = {
  stats: { online: "98.2%", alerts: "1,284", liveHours: "312", downloads: "46" },
  daily: [
    { day: "จ.", person: 55, motion: 28 },
    { day: "อ.", person: 75, motion: 38 },
    { day: "พ.", person: 66, motion: 33 },
    { day: "พฤ.", person: 90, motion: 45 },
    { day: "ศ.", person: 100, motion: 50 },
    { day: "ส.", person: 42, motion: 18 },
    { day: "อา.", person: 32, motion: 16 },
  ],
  topCameras: [
    { name: "ลานจอดรถ", branch: "สาขาบางนา", count: 312 },
    { name: "หน้าร้าน", branch: "สาขาบางนา", count: 204 },
    { name: "ประตูหลัง", branch: "สาขาสีลม", count: 158 },
    { name: "คลังสินค้า", branch: "สาขารังสิต", count: 97 },
    { name: "แคชเชียร์", branch: "สาขาสีลม", count: 64 },
  ],
};

// 30 วัน
export const data30: ReportData = {
  stats: { online: "-", alerts: "-", liveHours: "-", downloads: "-" },
  daily: [],
  topCameras: [],
};
