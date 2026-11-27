export type Branch = 'bangna' | 'silom' | 'rangsit';
export type BranchTab = Branch | 'all';

export type CameraStatus = 'online' | 'offline';

export type Camera = {
  id: string;
  name: string;
  branch: Branch;
  snapshot: string;
  serialNumber: string;
  status: CameraStatus;
  issue?: ("SD Card" | "Cloud" | "No-Signal")[];
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

export const CAMERAS: Camera[] = [
  {
    id: 'cam-01',
    name: 'หน้าร้าน — ประตูหลัก',
    branch: 'bangna',
    snapshot: '/cameras/cam-01.jpg',
    serialNumber: 'CAM2026SN000001',
    status: 'online',
  },
  {
    id: 'cam-02',
    name: 'ลานจอดรถ',
    branch: 'bangna',
    snapshot: '/cameras/cam-02.jpg',
    serialNumber: 'CAM2026SN000002',
    status: 'online',
  },
  {
    id: 'cam-03',
    name: 'แคชเชียร์',
    branch: 'bangna',
    snapshot: '/cameras/cam-03.jpg',
    serialNumber: 'CAM2026SN000003',
    status: 'online',
  },
  {
    id: 'cam-04',
    name: 'คลังสินค้า',
    branch: 'bangna',
    snapshot: '/cameras/cam-04.jpg',
    serialNumber: 'CAM2026SN000004',
    status: 'online',
  },
  {
    id: 'cam-05',
    name: 'ทางเข้าพนักงาน',
    branch: 'bangna',
    snapshot: '/cameras/cam-05.jpg',
    serialNumber: 'CAM2026SN000005',
    status: 'online',
  },
  {
    id: 'cam-06',
    name: 'ประตูหลัง',
    branch: 'bangna',
    snapshot: '/cameras/cam-06.jpg',
    serialNumber: 'CAM2026SN000006',
    status: 'online',
  },
  {
    id: 'cam-07',
    name: 'หน้าร้าน — ทางเข้าหลัก',
    branch: 'silom',
    snapshot: '/cameras/cam-07.jpg',
    serialNumber: 'CAM2026SN000007',
    status: 'online',
  },
  {
    id: 'cam-08',
    name: 'ชั้นขาย',
    branch: 'silom',
    snapshot: '/cameras/cam-08.jpg',
    serialNumber: 'CAM2026SN000008',
    status: 'online',
  },
  {
    id: 'cam-09',
    name: 'หน้าร้าน',
    branch: 'rangsit',
    snapshot: '/cameras/cam-09.jpg',
    serialNumber: 'CAM2026SN000009',
    status: 'online',
  },
  {
    id: 'cam-10',
    name: 'คลังสินค้า',
    branch: 'rangsit',
    snapshot: '/cameras/cam-10.jpg',
    serialNumber: 'CAM2026SN000010',
    status: 'online',
  },
];