export type Branch = 'bangna' | 'silom' | 'rangsit';
export type BranchTab = Branch | 'all';

export type Camera = {
  id: string;
  name: string;
  branch: Branch;
  snapshot: string; // รูปภาพกล้อง อยู่ใน public/cameras/
};

export const BRANCH_LABEL: Record<Branch, string> = {
  bangna: 'สาขาบางนา',
  silom: 'สาขาสีลม',
  rangsit: 'สาขารังสิต',
};

export const BRANCH_TABS: { id: BranchTab; label: string }[] = [
  { id: 'bangna', label: 'สาขาบางนา' },
  { id: 'silom', label: 'สาขาสีลม' },
  { id: 'rangsit', label: 'สาขารังสิต' },
  { id: 'all', label: 'ทั้งหมด' },
];

// ข้อมูลตัวอย่าง สาขาสีลม/รังสิตเป็นข้อมูลสมมติ ให้แก้ตามข้อมูลจริง
export const CAMERAS: Camera[] = [
  { id: 'cam-01', name: 'หน้าร้าน — ประตูหลัก', branch: 'bangna', snapshot: '/cameras/cam-01.jpg' },
  { id: 'cam-02', name: 'ลานจอดรถ', branch: 'bangna', snapshot: '/cameras/cam-02.jpg' },
  { id: 'cam-03', name: 'แคชเชียร์', branch: 'bangna', snapshot: '/cameras/cam-03.jpg' },
  { id: 'cam-04', name: 'คลังสินค้า', branch: 'bangna', snapshot: '/cameras/cam-04.jpg' },
  { id: 'cam-05', name: 'ทางเข้าพนักงาน', branch: 'bangna', snapshot: '/cameras/cam-05.jpg' },
  { id: 'cam-06', name: 'ประตูหลัง', branch: 'bangna', snapshot: '/cameras/cam-06.jpg' },
  { id: 'cam-07', name: 'หน้าร้าน — ทางเข้าหลัก', branch: 'silom', snapshot: '/cameras/cam-07.jpg' },
  { id: 'cam-08', name: 'ชั้นขาย', branch: 'silom', snapshot: '/cameras/cam-08.jpg' },
  { id: 'cam-09', name: 'หน้าร้าน', branch: 'rangsit', snapshot: '/cameras/cam-09.jpg' },
  { id: 'cam-10', name: 'คลังสินค้า', branch: 'rangsit', snapshot: '/cameras/cam-10.jpg' },
];
