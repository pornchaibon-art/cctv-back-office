'use client';

import { useState } from 'react';
import { Pencil, Plus } from 'lucide-react';
import { PageHead } from '@/components/ui';

type Role = 'Manager' | 'Operator';
type Tab = 'all' | Role;

type Staff = {
  name: string;
  email: string;
  branches: string[];
  role: Role;
};

// ข้อมูลตัวอย่าง แก้เป็นข้อมูลจริงจากระบบ
const INITIAL: Staff[] = [
  { name: 'นภา พรหมมา', email: 'nopa@example.co.th', branches: ['บางนา', 'สีลม'], role: 'Manager' },
  { name: 'กิตติ ทองดี', email: 'kitti@example.co.th', branches: ['บางนา', 'สีลม'], role: 'Manager' },
  { name: 'สมชาย ใจดี', email: 'somchai@example.co.th', branches: ['บางนา'], role: 'Operator' },
  { name: 'วนิดา แสงทอง', email: 'wanida@example.co.th', branches: ['สีลม'], role: 'Operator' },
  { name: 'อรุณ ศรีสุข', email: 'arun@example.co.th', branches: ['รังสิต'], role: 'Operator' },
  { name: 'พงษ์ บุญดี', email: 'pong@example.co.th', branches: ['สีลม', 'รังสิต'], role: 'Manager' },
];

const TABS: { id: Tab; label: string }[] = [
  { id: 'all', label: 'ทั้งหมด' },
  { id: 'Manager', label: 'Manager' },
  { id: 'Operator', label: 'Operator' },
];

export default function PeoplePage() {
  const [staff, setStaff] = useState(INITIAL);
  const [tab, setTab] = useState<Tab>('all');

  const shown = staff.filter((s) => tab === 'all' || s.role === tab);

  const setRole = (email: string, role: Role) =>
    setStaff((list) =>
      list.map((s) => (s.email === email ? { ...s, role } : s)),
    );

  return (
    <>
      <PageHead
        title="บุคลากร & Manager"
        sub="ตรวจสอบบุคลากรและสิทธิ์ของแต่ละคน"
        action={
          <button type="button" className="btn btn-primary">
            <Plus size={14} /> ขอเพิ่มสาขา / กล้อง
          </button>
        }
      />

      <div className="toolbar">
        <div className="segmented" role="tablist">
          {TABS.map((t) => {
            const count =
              t.id === 'all'
                ? staff.length
                : staff.filter((s) => s.role === t.id).length;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                className={tab === t.id ? 'active' : ''}
                onClick={() => setTab(t.id)}
              >
                {t.label} {count}
              </button>
            );
          })}
        </div>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>บุคลากร</th>
              <th>สาขาที่ดูแล</th>
              <th>หน้าที่</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {shown.map((s) => (
              <tr key={s.email}>
                <td>
                  <div className="user">
                    <span className="avatar">{s.name.slice(0, 2)}</span>
                    <div>
                      <div>{s.name}</div>
                      <div className="muted">{s.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {s.branches.map((b) => (
                    <span key={b} className="chip">
                      {b}
                    </span>
                  ))}
                </td>
                <td>
                  <select
                    className="select"
                    value={s.role}
                    onChange={(e) => setRole(s.email, e.target.value as Role)}
                  >
                    <option value="Manager">Manager</option>
                    <option value="Operator">Operator</option>
                  </select>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Pencil size={14} className="muted" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="muted note">
        Operator ประจำได้ 1 สาขา · Manager ดูแลได้หลายสาขา
      </p>
    </>
  );
}
