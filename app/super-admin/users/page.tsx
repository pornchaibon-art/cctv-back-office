"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { users as initialUsers, ROLES, roleClass, type Role, type User } from "@/lib/data";

type Tab = "all" | Role;
type UserForm = Omit<User, "id">;

const emptyForm: UserForm = { name: "", email: "", dept: "", role: "Customer" };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [tab, setTab] = useState<Tab>("all");
  const [search, setSearch] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [form, setForm] = useState<UserForm>(emptyForm);

  function countRole(role: Role): number {
    return users.filter((u) => u.role === role).length;
  }

  function changeRole(id: number, newRole: Role) {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
  }

  function updateForm<K extends keyof UserForm>(field: K, value: UserForm[K]) {
    setForm({ ...form, [field]: value });
  }

  function addUser() {
    if (!form.name) return;
    setUsers([...users, { id: Date.now(), ...form }]);
    setForm(emptyForm); // ล้างฟอร์ม
    setShowForm(false);
  }

  const shownUsers = users.filter((u) => {
    const matchTab = tab === "all" || u.role === tab;
    const matchSearch = u.name.includes(search) || u.dept.includes(search);
    return matchTab && matchSearch;
  });

  return (
    <>
      <PageHeader
        title="ผู้ใช้และบทบาท"
        search={search}
        onSearch={setSearch}
      />

      <div className="toolbar">
        <div className="tabs">
          <button className={tab === "all" ? "tab active" : "tab"} onClick={() => setTab("all")}>
            ทั้งหมด {users.length}
          </button>
          <button className={tab === "Admin" ? "tab active" : "tab"} onClick={() => setTab("Admin")}>
            Admin {countRole("Admin")}
          </button>
          <button className={tab === "Customer" ? "tab active" : "tab"} onClick={() => setTab("Customer")}>
            Customer {countRole("Customer")}
          </button>
        </div>
        <button className="btn btn-green" onClick={() => setShowForm(!showForm)}>
          {showForm ? "ปิดฟอร์ม" : "+ เพิ่มผู้ใช้"}
        </button>
      </div>

      {showForm && (
        <div className="card add-form">
          <input placeholder="ชื่อ" value={form.name} onChange={(e) => updateForm("name", e.target.value)} />
          <input placeholder="อีเมล" value={form.email} onChange={(e) => updateForm("email", e.target.value)} />
          <input placeholder="หน่วยงาน" value={form.dept} onChange={(e) => updateForm("dept", e.target.value)} />
          <select value={form.role} onChange={(e) => updateForm("role", e.target.value as Role)}>
            {ROLES.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
          <button className="btn btn-green" onClick={addUser}>บันทึก</button>
        </div>
      )}

      <div className="card">
        <table>
          <thead>
            <tr>
              <th>ผู้ใช้</th>
              <th>หน่วยงาน</th>
              <th>บทบาท</th>
            </tr>
          </thead>
          <tbody>
            {shownUsers.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ fontWeight: 600 }}>{u.name}</div>
                  <div className="small">{u.email}</div>
                </td>
                <td className="small">{u.dept}</td>
                <td>
                  <select
                    className={"role-select " + roleClass(u.role)}
                    value={u.role}
                    onChange={(e) => changeRole(u.id, e.target.value as Role)}
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
