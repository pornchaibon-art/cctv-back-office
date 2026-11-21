// ข้อมูลหน้าตั้งค่า

// โปรไฟล์
export const profile = {
  name: "สมชาย ใจดี",
  role: "Customer",
  email: "somchai@example.com",
  phone: "081-234-5678",
};

// รายการการแจ้งเตือน
export const notiItems = [
  { key: "motion", title: "ตรวจพบการเคลื่อนไหว", desc: "แจ้งเตือนเมื่อกล้องตรวจจับความเคลื่อนไหว" },
  { key: "offline", title: "กล้องออฟไลน์", desc: "แจ้งเตือนเมื่อกล้องขาดการเชื่อมต่อ" },
  { key: "cloud", title: "แพ็กเกจ Cloud ใกล้หมด", desc: "แจ้งเตือนล่วงหน้า 7 วันก่อนหมดอายุ" },
  { key: "member", title: "สมาชิกใหม่", desc: "แจ้งเตือนเมื่อมีสมาชิกเข้าร่วมองค์กร" },
  { key: "email", title: "ส่งสรุปทางอีเมล", desc: "รับรายงานสรุปรายสัปดาห์ทางอีเมล" },
];

// ค่าเริ่มต้นของสวิตช์
export const notiDefaults: Record<string, boolean> = {
  motion: true,
  offline: true,
  cloud: true,
  member: false,
  email: false,
};
