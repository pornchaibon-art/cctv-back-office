// ข้อมูลหน้าแจ้งเรื่องถึง Admin

// ตัวเลือก
export const recipients = ["Admin ผู้ให้บริการ"];
export const topics = ["ขอเพิ่มสาขา", "ขอเพิ่มกล้อง", "แจ้งปัญหา"];
export const MAX_IMAGES = 4;

// รูปแบบข้อมูลคำขอ
export type Status = "รอดำเนินการ" | "กำลังดำเนินการ" | "ดำเนินการแล้ว" | "ส่งต่อถึง Dev";

export type Request = {
  id: number;
  title: string;
  status: Status;
  date: string;
  reply?: string; // คำตอบจาก Admin
};

// คำขอของฉัน
export const initialRequests: Request[] = [
  { id: 1, title: 'ขอสร้างสาขา "รังสิต 2"', status: "ดำเนินการแล้ว", date: "5 พ.ย." },
  { id: 2, title: "ขอเพิ่มกล้อง 4 ตัว · รังสิต", status: "กำลังดำเนินการ", date: "3 พ.ย." },
  {
    id: 3,
    title: "แจ้งปัญหา Playback ค้างที่ 16×",
    status: "ส่งต่อถึง Dev",
    date: "31 ต.ค.",
    reply: "สร้างสาขารังสิต 2 แล้ว ส่วนปัญหา Playback ส่งต่อ Super Admin แล้วครับ",
  },
];
