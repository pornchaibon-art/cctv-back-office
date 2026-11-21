export const cctv = 
[
  {
    id: 1,
    name: "ห้องประชุม",
    sn: "CAM2026SN000001",
    branch: "สาขาสยาม",
    status: "online"
  },
  {
    id: 2,
    name: "ทางเข้าหลัก",
    sn: "CAM2026SN000002",
    branch: "สาขาอโศก",
    status: "online"
  },
  {
    id: 3,
    name: "คลังสินค้า",
    sn: "CAM2026SN000003",
    branch: "สาขาลาดพร้าว",
    status: "offline",
    issue: ["SD Card","Cloud"]
  },
  {
    id: 4,
    name: "ล็อบบี้",
    sn: "CAM2026SN000004",
    branch: "สาขาบางนา",
    status: "online"
  },
  {
    id: 5,
    name: "ห้องเซิร์ฟเวอร์",
    sn: "CAM2026SN000005",
    branch: "สาขาสยาม",
    status: "online"
  },
  {
    id: 6,
    name: "พื้นที่รับสินค้า",
    sn: "CAM2026SN000006",
    branch: "สาขาอโศก",
    status: "offline",
    issue: ["Cloud"]
  },
  {
    id: 7,
    name: "ทางออกหลัก",
    sn: "CAM2026SN000007",
    branch: "สาขาลาดพร้าว",
    status: "online"
  },
  {
    id: 8,
    name: "สำนักงานฝ่ายบัญชี",
    sn: "CAM2026SN000008",
    branch: "สาขาบางนา",
    status: "online"
  },
  {
    id: 9,
    name: "ประตูทางเข้าพนักงาน",
    sn: "CAM2026SN000009",
    branch: "สาขาสยาม",
    status: "online"
  },
  {
    id: 10,
    name: "โถงทางเดินชั้น 1",
    sn: "CAM2026SN000010",
    branch: "สาขาอโศก",
    status: "online"
  }
] 

export type cctvType = {
    id : number
    name : string
    sn : string
    branch : string
    status : 'online' | 'offline'
    issue?: ('SD Card' | 'Cloud' | 'No-Signal')[]
}
