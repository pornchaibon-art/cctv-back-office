export type Status = "รอดำเนินการ" | "กำลังดำเนินการ" | "ดำเนินการแล้ว" | "ส่งต่อถึง Dev";
export type Topics = "ขอเพิ่มสาขา" | "ขอเพิ่มกล้อง" | "แจ้งปัญหา";

export type Request = {
  id: number;
  title: string;
  topics: Topics;
  status: Status;
  date: string;
  reply?: string;
};

export const comments: Request[] =
[
  { 
    id: 1, 
    title: 'ขอสร้างสาขา "รังสิต 2"',
    topics : 'ขอเพิ่มสาขา',
    status: "ดำเนินการแล้ว", 
    date: "5 พ.ย." 
  },
  { 
    id: 2, 
    title: "ขอเพิ่มกล้อง 4 ตัว · รังสิต", 
    topics : 'ขอเพิ่มกล้อง',
    status: "กำลังดำเนินการ", 
    date: "3 พ.ย." 
  },
  {
    id: 3,
    title: "แจ้งปัญหา Playback ค้างที่ 16×",
    topics : 'แจ้งปัญหา',
    status: "ส่งต่อถึง Dev",
    date: "31 ต.ค.",
    reply: "สร้างสาขารังสิต 2 แล้ว ส่วนปัญหา Playback ส่งต่อ Super Admin แล้วครับ",
  },
]