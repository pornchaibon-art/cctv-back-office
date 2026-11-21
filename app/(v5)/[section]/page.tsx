'use client';

import { useParams } from 'next/navigation';
import { PageHead } from '@/components/ui';

// หน้าที่ยังไม่มี mockup ใช้หน้าว่างนี้ไปก่อน
const TITLES: Record<string, string> = {
  overview: 'ภาพรวมองค์กร',
  alerts: 'การแจ้งเตือน',
  reports: 'รายงาน',
  history: 'ประวัติการใช้งาน',
  cloud: 'Cloud & แพ็กเกจ',
  'admin-message': 'แจ้งเรื่องถึง Admin',
  settings: 'ตั้งค่า',
};

export default function SectionPlaceholder() {
  const { section } = useParams<{ section: string }>();
  const title = TITLES[section];

  if (!title) {
    return (
      <>
        <PageHead title="ไม่พบหน้านี้" />
      </>
    );
  }

  return (
    <>
      <PageHead title={title} sub="" />
      <div className="card empty-card"></div>
    </>
  );
}
