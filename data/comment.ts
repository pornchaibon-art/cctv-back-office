
// ประเภท Role
export type Role = "Admin" | "Super Admin" | "Manager";

// สถานะคำร้อง
export type Status =
  | "รอดำเนินการ"
  | "กำลังตรวจสอบ"
  | "ส่งต่อถึง Super Admin"
  | "กำลังดำเนินการ"
  | "ดำเนินการแล้ว"
  | "ไม่อนุมัติ";

// ข้อความตอบกลับ
export type RequestMessage = {
  id: number;
  senderId: string;
  senderRole: Role;
  message: string;
  createdAt: string;
};

// ไฟล์แนบ
export type RequestAttachment = {
  id: number;
  fileName: string;
  fileUrl: string;
};

// ข้อมูลคำร้อง
export type Request = {
  id: number;
  title: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  recipientRole: Role;
  topic: string;
  detail: string;
  status: Status;
  forwardedTo: Role | null;
  attachments: RequestAttachment[];
  messages: RequestMessage[];
  date: string;
  forwardedBy?: string;

  // รองรับโค้ด Comment เดิมชั่วคราว
  reply?: string;
};

// ประเภทเรื่องที่แจ้ง
export const topics = [
  "แจ้งปัญหา CCTV",
  "ขอเพิ่มกล้อง",
  "ขอเพิ่มสาขา",
  "แจ้งเหตุการณ์",
  "อื่น ๆ",
];

// ผู้รับคำร้องของ Manager
export const recipients: Role[] = ["Admin"];

// จำนวนรูปภาพสูงสุด
export const MAX_IMAGES = 5;

// Mock Data เริ่มต้น
export const initialRequests: Request[] = [
  {
    id: 1,
    title: "แจ้งปัญหา CCTV · กล้อง CCTV-001 ไม่แสดงภาพ",
    senderId: "manager_01",
    senderName: "Manager สาขาสยาม",
    senderRole: "Manager",
    recipientRole: "Admin",
    topic: "แจ้งปัญหา CCTV",
    detail: "กล้อง CCTV-001 ไม่สามารถแสดงภาพสดได้",
    status: "รอดำเนินการ",
    forwardedTo: null,
    attachments: [],
    messages: [],
    date: "22 พ.ย.",
  },
];

// ตัวแปรกลางเก็บคำร้อง

let requests: Request[] = [...initialRequests];

const listeners = new Set<() => void>();
const STORAGE_KEY = "cctv_requests";

function notifyRequests() {
  listeners.forEach((listener) => listener());
}

// โหลดข้อมูลจาก localStorage
function loadStoredRequests() {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      requests = JSON.parse(stored) as Request[];
    }
  } catch (error) {
    console.error("ไม่สามารถโหลดข้อมูลคำร้องได้:", error);
  }
}

// บันทึกข้อมูลลง localStorage
function saveStoredRequests() {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  } catch (error) {
    console.error("ไม่สามารถบันทึกข้อมูลคำร้องได้:", error);
  }
}

// รับข้อมูลเมื่อแท็บอื่นมีการเปลี่ยนแปลง
function handleStorageChange(event: StorageEvent) {
  if (event.key !== STORAGE_KEY) return;

  try {
    requests = event.newValue
      ? (JSON.parse(event.newValue) as Request[])
      : [...initialRequests];

    notifyRequests();
  } catch (error) {
    console.error("ไม่สามารถซิงก์ข้อมูลคำร้องได้:", error);
  }
}

let storageListenerAttached = false;

export function getRequests() {
  return requests;
}

export function subscribeRequests(listener: () => void) {
  listeners.add(listener);

  if (typeof window !== "undefined") {
    loadStoredRequests();

    if (!storageListenerAttached) {
      window.addEventListener("storage", handleStorageChange);
      storageListenerAttached = true;
    }

    listener();
  }

  return () => {
    listeners.delete(listener);
  };
}

export function addRequest(request: Request) {
  requests = [request, ...requests];

  saveStoredRequests();
  notifyRequests();
}

export function updateRequest(id: number, updates: Partial<Request>) {
  requests = requests.map((request) =>
    request.id === id ? { ...request, ...updates } : request
  );

  saveStoredRequests();
  notifyRequests();
}

export function getStatusColor(status: Status) {
  switch (status) {
    case "รอดำเนินการ":
      return "bg-yellow-500/20 text-yellow-400";

    case "กำลังตรวจสอบ":
      return "bg-blue-500/20 text-blue-400";

    case "ส่งต่อถึง Super Admin":
      return "bg-purple-500/20 text-purple-400";

    case "กำลังดำเนินการ":
      return "bg-cyan-500/20 text-cyan-400";

    case "ดำเนินการแล้ว":
      return "bg-green-500/20 text-green-400";

    case "ไม่อนุมัติ":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-gray-500/20 text-gray-400";
  }
}
