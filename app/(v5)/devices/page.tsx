import Link from 'next/link';
import { BRANCH_LABEL, CAMERAS } from '@/lib/cameras';
import { PageHead } from '@/components/ui';

export default function DevicesPage() {
  const branches = new Set(CAMERAS.map((c) => c.branch)).size;

  return (
    <>
      <PageHead
        title="อุปกรณ์"
        sub={`${CAMERAS.length} กล้อง · ${branches} สาขา`}
      />

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>กล้อง</th>
              <th>สาขา</th>
              <th>สถานะ</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {CAMERAS.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{BRANCH_LABEL[c.branch]}</td>
                <td>
                  <span className="status">ออนไลน์</span>
                </td>
                <td style={{ textAlign: 'right' }}>
                  <Link href={`/devices/${c.id}`} className="btn">
                    รายละเอียด
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
