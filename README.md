# CCTV Back Office

รวมจาก 5 โปรเจกต์: `ject`, `Project back office`, `cctv-backoffice-v5`, `f`, `cctv-backoffice-super addmin`

```bash
npm install
npm run dev
```

เปิด http://localhost:3000 → หน้าเข้าสู่ระบบ
อีเมลลงท้าย `@customer` → `/customer`, `@admin` → `/admin`, `@superadmin` → `/super-admin`

## เส้นทางหน้า (route)

| ส่วน | URL | ที่มา |
|---|---|---|
| เข้าสู่ระบบ / ลืมรหัส | `/`, `/forget-pass` | ject |
| Customer | `/customer`, `/alert`, `/cloud`, `/company-manager`, `/logout` | ject |
| Customer | `/live`, `/live/screens`, `/playback`, `/devices`, `/devices/[id]`, `/people` | cctv-backoffice-v5 → `app/(v5)/` |
| Customer | `/comment`, `/firmware`, `/history`, `/report`, `/setting` | Project back office → `app/(pbo)/` |
| Admin | `/admin`, `/admin/maintain`, `/admin/comment`, `/admin/storage`, `/admin/setting`, `/admin/profile` | f → `app/admin/` |
| Super Admin | `/super-admin/users`, `/super-admin/permissions`, `/super-admin/history`, `/super-admin/forwarded` | super admin → `app/super-admin/` |

## หมายเหตุ

- Sidebar ทุกหน้าใช้ของ ject (`components/tailgrids/core/sidebar.tsx`) — เลือกชุดเมนูตาม URL (`/admin/*`, `/super-admin/*`, ที่เหลือเป็น Customer)
- CSS ธรรมดาของ v5 และ super admin ถูกครอบด้วย `.v5-scope` / `.sa-scope` เพื่อไม่ให้ชนกับ Tailwind
- รูปกล้องอยู่ที่ `public/cameras/cam-01.jpg` – `cam-10.jpg` แก้ข้อมูลกล้องที่ `lib/cameras.ts`
