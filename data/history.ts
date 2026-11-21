// ข้อมูลหน้าประวัติการใช้งาน
import { Monitor, Cloud, Users, Download, ShieldCheck, Upload } from "lucide-react";

// การใช้งานระบบ
export const logs = [
  { group: "xxx", icon: Monitor, title: 'เพิ่มกล้อง "ประตูหลัง" ในสาขาสีลม', by: "Support", ip: "192.168.1.24", time: "14:12" },
  { group: "วันนี้", icon: Cloud, title: "ซื้อแพ็กเกจ Cloud 30 วัน × 2", by: "Owner", ip: "10.0.0.8", time: "11:40" },
  { group: "วันนี้", icon: Users, title: 'เชิญ "พงศ์ แสนดี" เป็นManager', by: "Support", ip: "192.168.1.24", time: "10:05" },
  { group: "วันนี้", icon: Download, title: "ดาวน์โหลดคลิป ลานจอดรถ 09:30–09:35", by: "มานพ ศุภผล", ip: "172.16.2.10", time: "09:41" },
  { group: "เมื่อวาน", icon: ShieldCheck, title: 'เปลี่ยนบทบาทของ "กิตติ ทองดี" เป็น Manager', by: "Super Admin", ip: "10.0.0.15", time: "22:18" },
  { group: "เมื่อวาน", icon: Upload, title: "ส่งออกข้อมูลอุปกรณ์ (102 รายการ)", by: "Support", ip: "192.168.1.24", time: "18:20" },
];

// การดูวิดีโอ
export const views = [
  { group: "วันนี้", type: "live", camera: "ประตูหลัง", branch: "สาขาสีลม", by: "Support", device: "มือถือ", duration: "12 นาที", time: "14:05" },
  { group: "วันนี้", type: "replay", camera: "ลานจอดรถ", branch: "สาขาบางนา", by: "มานพ ศุภผล", clip: "09:30–09:35", duration: "5 นาที", time: "09:41" },
  { group: "วันนี้", type: "live", camera: "หน้าร้าน", branch: "สาขาสีลม", by: "Owner", device: "คอมพิวเตอร์", duration: "34 นาที", time: "08:15" },
  { group: "เมื่อวาน", type: "replay", camera: "ห้องเก็บเงิน", branch: "สาขาบางนา", by: "Super Admin", clip: "17:00–17:20", duration: "20 นาที", time: "21:30" },
  { group: "เมื่อวาน", type: "live", camera: "ประตูหลัง", branch: "สาขาสีลม", by: "Support", device: "มือถือ", duration: "3 นาที", time: "19:02" },
];

// หัวข้อกลุ่ม
export const groups = ["วันนี้", "เมื่อวาน"];
