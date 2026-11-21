
export type Role = "Super Admin" | "Admin" | "Customer";
export type RoleKey = "super" | "admin" | "customer";

export interface User {
  id: number;
  name: string;
  email: string;
  dept: string;
  role: Role;
}

export interface Permission {
  label: string;
  super: boolean;
  admin: boolean;
  customer: boolean;
}

export interface HistoryItem {
  id: number;
  text: string;
  by: string;
  time: string;
}

export type TicketStatus = "กำลังแก้ไข" | "รอดำเนินการ" | "แก้ไขแล้ว";
export type TicketType = "ปัญหากล้อง" | "ระบบเล่น" | "แจ้งเหตุ";

export interface Ticket {
  id: number;
  title: string;
  status: TicketStatus;
  ago: string;
  type: TicketType;
  detail: string;
  reply?: string;
}


export const ROLES: Role[] = ["Super Admin", "Admin", "Customer"];

export function roleClass(role: Role): string {
  if (role === "Super Admin") return "role-super";
  if (role === "Admin") return "role-admin";
  return "role-customer";
}

export const users: User[] = [
  { id: 1, name: "Support", email: "support@spumail.net", dept: "SPU", role: "Customer" },
  { id: 2, name: "ทีมพัฒนา (Dev / IT)", email: "dev@cctvbackoffice.co.th", dept: "ผู้ให้บริการ", role: "Super Admin" },
  { id: 3, name: "นนท์", email: "non@cctvbackoffice.co.th", dept: "ผู้ให้บริการ", role: "Admin" },
  { id: 4, name: "โด้", email: "doe@spumail.net", dept: "SPU", role: "Customer" },
  { id: 5, name: "ต้า", email: "ta@spumail.net", dept: "EVP019", role: "Customer" },
  { id: 6, name: "พง", email: "pong@spumail.net", dept: "ผู้ให้บริการ", role: "Admin" },
];

export const permissions: Permission[] = [
  { label: "ดูภาพของทุกสาขา (สำนักงาน - พนักงานที่ได้สิทธิ์ - ตำแหน่ง Manager)", super: true, admin: true, customer: true },
  { label: "รับรายงานปัญหา (ลูกค้า - ไลฟ์ฟอร์ม)", super: true, admin: true, customer: true },
  { label: "ตรวจสอบบุคคลภายในหน่วยงาน", super: true, admin: true, customer: true },
  { label: "โยกย้าย Manager ภายในหน่วยงาน", super: true, admin: true, customer: true },
  { label: "จัดการข้อมูลทั่วไปของระบบ", super: true, admin: true, customer: false },
  { label: "รับเรื่องจากลูกค้าก่อน แล้วส่งต่อ Super Admin", super: true, admin: true, customer: true },
  { label: "สร้างหน่วยงานใหม่ / สร้างสาขาใหม่", super: true, admin: true, customer: false },
  { label: "เพิ่ม แก้ไข ลบกล้อง NVR", super: true, admin: true, customer: false },
  { label: "แก้ไขปัญหาเชิงเทคนิค (รับเรื่องต่อจาก Admin)", super: true, admin: false, customer: false },
];

export const history: HistoryItem[] = [
  { id: 1, text: 'เปลี่ยน "" จาก Admin เป็น Customer', by: "โดย Super Admin · SPU", time: "วันนี้ 10:12" },
  { id: 2, text: 'ปิดสิทธิ์ "เพิ่มกล้องและ NVR" ของ Customer', by: "โดย Super Admin · ทุกหน่วยงาน", time: "วันนี้ 09:40" },
  { id: 3, text: 'เพิ่มผู้ใช้ "โด้" เป็น Admin', by: "โดย Super Admin · ผู้ให้บริการ", time: "เมื่อวาน 16:05" },
  { id: 4, text: 'เปิดสิทธิ์ "ต้า" ให้ Customer', by: "โดย Super Admin · ทุกหน่วยงาน", time: "8 พ.ย. 14:22" },
  { id: 5, text: 'ระงับบัญชี "jj@spumail.net"', by: "โดย Super Admin · ปิดใช้งาน", time: "6 พ.ย. 11:20" },
];

export const tickets: Ticket[] = [
  {
    id: 1,
    title: "Playback ค้างที่ 16x · SPU",
    status: "กำลังแก้ไข",
    ago: "5 นาที",
    type: "ปัญหากล้อง",
    detail: "ลูกค้า SPU แจ้ง Playback ค้างเมื่อเร่งเป็น 16x — Admin ตรวจสอบแล้วไม่ใช่ปัญหาฝั่งลูกค้า จึงส่งต่อให้ทีม Dev",
  },
  {
    id: 2,
    title: "กล้องหลุดพร้อมกัน 8 ตัว · EVP019",
    status: "รอดำเนินการ",
    ago: "12 นาที",
    type: "ระบบเล่น",
    detail: "กล้องสาขา EVP019 หลุดการเชื่อมต่อพร้อมกัน 8 ตัว Admin รีสตาร์ท NVR แล้วยังไม่หาย",
  },
  {
    id: 3,
    title: "แจ้งเตือนไม่เข้า · SPU",
    status: "แก้ไขแล้ว",
    ago: "1 ชม.",
    type: "แจ้งเหตุ",
    detail: "ลูกค้าไม่ได้รับแจ้งเตือนเมื่อมีการเคลื่อนไหว",
    reply: "แก้ไขด้วยการอัปเดตเฟิร์มแวร์ 1.10.0 ล่าสุดแล้ว ลูกค้ารับแจ้งเตือนได้ปกติ",
  },
];
