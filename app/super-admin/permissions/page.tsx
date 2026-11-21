"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import Toggle from "@/components/Toggle";
import {
  permissions as initialPermissions,
  type Permission,
  type RoleKey,
} from "@/lib/data";

export default function PermissionsPage() {
  const [perms, setPerms] = useState<Permission[]>(initialPermissions);
  const [search, setSearch] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  function toggle(index: number, roleKey: RoleKey) {
    const newPerms = [...perms];
    newPerms[index] = {
      ...newPerms[index],
      [roleKey]: !newPerms[index][roleKey],
    };
    setPerms(newPerms);
    setMessage("");
  }

  function cancel() {
    setPerms(initialPermissions);
    setMessage("");
  }

  function save() {
    setMessage("บันทึกสิทธิ์เรียบร้อย");
  }

  return (
    <>
      <PageHeader
        title="สิทธิ์ของแต่ละบทบาท"
        search={search}
        onSearch={setSearch}
      />

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>สิทธิ์</th>

              <th className="center">
                <span className="pill pill-admin">ADMIN</span>
              </th>
              <th className="center">
                <span className="pill pill-customer">CUSTOMER</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {perms.map(
              (p, i) =>
                p.label.includes(search) && (
                  <tr key={i}>
                    <td>{p.label}</td>

                    <td className="center">
                      <Toggle on={p.admin} onClick={() => toggle(i, "admin")} />
                    </td>
                    <td className="center">
                      <Toggle
                        on={p.customer}
                        onClick={() => toggle(i, "customer")}
                      />
                    </td>
                  </tr>
                ),
            )}
          </tbody>
        </table>
      </div>

      <div className="footer-bar">
        <span className="small"></span>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {message && <span className="success">{message}</span>}
          <button className="btn btn-ghost" onClick={cancel}>
            ยกเลิก
          </button>
          <button className="btn btn-green" onClick={save}>
            บันทึกสิทธิ์
          </button>
        </div>
      </div>
    </>
  );
}
