import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import Field from "../components/Field";
import Input from "../components/Input";
import PrimaryBtn from "../components/PrimaryBtn";
import Avatar from "../components/Avatar";

const C = {
  blue: "#0b3eac",
  blueBg: "#DCE8FF",
  green: "#16A34A",
  greenBg: "#DCFCE7",
  amber: "#B45309",
  amberBg: "#FEF3C7",
  red: "#DC2626",
  redBg: "#FEE2E2",
  slate800: "#1E293B",
  slate600: "#475569",
  slate400: "#94A3B8",
  slate200: "#E2E8F0",
  slate100: "#F1F5F9",
  white: "#FFFFFF",
  bg: "#F8FAFC",
};

const INITIAL_CLASSES = [
  {
    id: 1,
    name: "Calculus",
    grade: "Grade 11A",
    room: "Room 204",
    schedule: "Mon / Wed / Fri · 08:00–09:30",
    students: [
      { id: 1, name: "Alice Johnson", initials: "AJ", email: "alice@school.edu" },
      { id: 2, name: "Bob Martinez", initials: "BM", email: "bob@school.edu" },
      { id: 3, name: "Carol White", initials: "CW", email: "carol@school.edu" },
      { id: 4, name: "David Kim", initials: "DK", email: "david@school.edu" },
      { id: 5, name: "Eva Nguyen", initials: "EN", email: "eva@school.edu" },
    ],
    color: C.blue,
    colorBg: C.blueBg,
  },
  {
    id: 2,
    name: "Environmental Science",
    grade: "Grade 10B",
    room: "Lab 3",
    schedule: "Tue / Thu · 10:00–11:30",
    students: [
      { id: 1, name: "Fiona Lee", initials: "FL", email: "fiona@school.edu" },
      { id: 2, name: "George Patel", initials: "GP", email: "george@school.edu" },
      { id: 3, name: "Hannah Brown", initials: "HB", email: "hannah@school.edu" },
      { id: 4, name: "Ivan Torres", initials: "IT", email: "ivan@school.edu" },
    ],
    color: C.green,
    colorBg: C.greenBg,
  },
  {
    id: 3,
    name: "Physics",
    grade: "Grade 12A",
    room: "Room 101",
    schedule: "Mon / Wed · 13:00–14:30",
    students: [
      { id: 1, name: "Jane Foster", initials: "JF", email: "jane@school.edu" },
      { id: 2, name: "Kevin Chan", initials: "KC", email: "kevin@school.edu" },
      { id: 3, name: "Laura Santos", initials: "LS", email: "laura@school.edu" },
    ],
    color: C.amber,
    colorBg: C.amberBg,
  },
  {
    id: 4,
    name: "Calculus",
    grade: "Grade 11B",
    room: "Room 204",
    schedule: "Mon / Wed / Fri · 15:00–16:30",
    students: [
      { id: 1, name: "Michael Osei", initials: "MO", email: "michael@school.edu" },
      { id: 2, name: "Nina Russo", initials: "NR", email: "nina@school.edu" },
      { id: 3, name: "Oscar Wright", initials: "OW", email: "oscar@school.edu" },
      { id: 4, name: "Paula Diaz", initials: "PD", email: "paula@school.edu" },
      { id: 5, name: "Quinn Adams", initials: "QA", email: "quinn@school.edu" },
      { id: 6, name: "Rachel Green", initials: "RG", email: "rachel@school.edu" },
    ],
    color: C.red,
    colorBg: C.redBg,
  },
];

const inputClass = "w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 bg-white";

export default function ClassesPage({ sidebarOpen, onToggleSidebar }) {
  const [classes, setClasses] = useState(INITIAL_CLASSES);
  const [modal, setModal] = useState(null); // "view" | "create" | "edit" | "delete" | "add-student"
  const [selected, setSelected] = useState(null);
  const [nextId, setNextId] = useState(5);
  const [form, setForm] = useState({ name: "", grade: "", room: "", schedule: "" });
  const [newStudent, setNewStudent] = useState({ name: "", email: "" });
  const [search, setSearch] = useState("");

  const setF = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const openCreate = () => {
    setForm({ name: "", grade: "", room: "", schedule: "" });
    setModal("create");
  };

  const openEdit = (cls) => {
    setSelected(cls);
    setForm({ name: cls.name, grade: cls.grade, room: cls.room, schedule: cls.schedule });
    setModal("edit");
  };

  const handleCreate = () => {
    if (!form.name.trim() || !form.grade.trim()) return;
    const colors = [C.blue, C.green, C.amber, C.red];
    const bgs = [C.blueBg, C.greenBg, C.amberBg, C.redBg];
    const idx = nextId % 4;
    setClasses((prev) => [...prev, { ...form, id: nextId, students: [], color: colors[idx], colorBg: bgs[idx] }]);
    setNextId((n) => n + 1);
    setModal(null);
  };

  const handleEdit = () => {
    setClasses((prev) => prev.map((c) => c.id === selected.id ? { ...c, ...form } : c));
    setModal(null);
  };

  const handleDelete = () => {
    setClasses((prev) => prev.filter((c) => c.id !== selected.id));
    setModal(null);
    setSelected(null);
  };

  const handleAddStudent = () => {
    if (!newStudent.name.trim()) return;
    const initials = newStudent.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const updated = { ...selected, students: [...selected.students, { id: Date.now(), name: newStudent.name, email: newStudent.email, initials }] };
    setClasses((prev) => prev.map((c) => c.id === selected.id ? updated : c));
    setSelected(updated);
    setNewStudent({ name: "", email: "" });
    setModal("view");
  };

  const handleRemoveStudent = (studentId) => {
    const updated = { ...selected, students: selected.students.filter((s) => s.id !== studentId) };
    setClasses((prev) => prev.map((c) => c.id === selected.id ? updated : c));
    setSelected(updated);
  };

  const filtered = classes.filter((c) => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.grade.toLowerCase().includes(q);
  });

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.blue, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={onToggleSidebar} style={{ width: 34, height: 34, fontSize: 20, color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none", borderRadius: 8, background: "none" }}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Classes</span>
        </div>
        <PrimaryBtn variant="outline" onClick={openCreate}>
          <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>&nbsp;New Class
        </PrimaryBtn>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "28px 24px" }}>
        {/* Search */}
        <div style={{ position: "relative", marginBottom: 24, maxWidth: 340 }}>
          <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: C.slate400 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search classes..." style={{ width: "100%", border: `1px solid ${C.slate200}`, borderRadius: 8, padding: "9px 12px 9px 36px", fontSize: 14, color: C.slate800, fontFamily: "'DM Sans', sans-serif", outline: "none", background: C.white }} />
        </div>

        {/* Class grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {filtered.map((cls) => (
            <div key={cls.id} style={{ background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 12, overflow: "hidden" }}>
              {/* Color bar */}
              <div style={{ height: 6, background: cls.color }} />
              <div style={{ padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: C.slate800, margin: 0 }}>{cls.name}</h3>
                    <p style={{ fontSize: 13, color: cls.color, fontWeight: 600, margin: "2px 0 0" }}>{cls.grade}</p>
                  </div>
                  <div style={{ background: cls.colorBg, color: cls.color, borderRadius: 8, padding: "4px 10px", fontSize: 12, fontWeight: 700 }}>
                    {cls.students.length} students
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
                  {[
                    { icon: "📍", text: cls.room },
                    { icon: "🕐", text: cls.schedule },
                  ].map((item) => (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: C.slate600 }}>
                      <span>{item.icon}</span>{item.text}
                    </div>
                  ))}
                </div>
                {/* Student avatars */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
                  {cls.students.slice(0, 5).map((s) => (
                    <Avatar key={s.id} initials={s.initials} size={28} />
                  ))}
                  {cls.students.length > 5 && (
                    <span style={{ fontSize: 12, color: C.slate400, fontWeight: 600 }}>+{cls.students.length - 5}</span>
                  )}
                  {cls.students.length === 0 && (
                    <span style={{ fontSize: 12, color: C.slate400, fontStyle: "italic" }}>No students yet</span>
                  )}
                </div>
                {/* Actions */}
                <div style={{ display: "flex", gap: 8 }}>
                  <PrimaryBtn small variant="outline" onClick={() => { setSelected(cls); setModal("view"); }}>View</PrimaryBtn>
                  <PrimaryBtn small variant="outline" onClick={() => openEdit(cls)}>Edit</PrimaryBtn>
                  <PrimaryBtn small variant="danger" onClick={() => { setSelected(cls); setModal("delete"); }}>Delete</PrimaryBtn>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "64px 0", color: C.slate400 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🏫</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: C.slate600 }}>No classes found</p>
          </div>
        )}
      </div>

      {/* View / roster modal */}
      {modal === "view" && selected && (
        <Modal title={`${selected.name} — ${selected.grade}`} subtitle={`${selected.room} · ${selected.schedule}`} onClose={() => setModal(null)}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.slate600 }}>{selected.students.length} students</span>
            <PrimaryBtn small onClick={() => setModal("add-student")}>+ Add Student</PrimaryBtn>
          </div>
          {selected.students.length === 0 ? (
            <div style={{ textAlign: "center", padding: "32px 0", color: C.slate400 }}>
              <p>No students enrolled yet.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {selected.students.map((s, i) => (
                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderTop: i > 0 ? `1px solid ${C.slate100}` : "none" }}>
                  <Avatar initials={s.initials} size={34} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.slate800 }}>{s.name}</div>
                    <div style={{ fontSize: 12, color: C.slate400 }}>{s.email}</div>
                  </div>
                  <button onClick={() => handleRemoveStudent(s.id)} style={{ background: "none", border: "none", cursor: "pointer", color: C.slate400, fontSize: 18, lineHeight: 1, padding: "0 4px" }} title="Remove student">&times;</button>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}

      {/* Add student modal */}
      {modal === "add-student" && selected && (
        <Modal title="Add Student" subtitle={`${selected.name} – ${selected.grade}`} onClose={() => setModal("view")}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Full Name" required>
              <Input value={newStudent.name} onChange={(e) => setNewStudent((p) => ({ ...p, name: e.target.value }))} placeholder="e.g. John Smith" />
            </Field>
            <Field label="Email">
              <Input type="email" value={newStudent.email} onChange={(e) => setNewStudent((p) => ({ ...p, email: e.target.value }))} placeholder="student@school.edu" />
            </Field>
            <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
              <button onClick={() => setModal("view")} style={{ flex: 1, border: `1px solid ${C.slate200}`, background: C.white, color: C.slate600, borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              <button onClick={handleAddStudent} style={{ flex: 2, background: C.blue, color: C.white, border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Add Student</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create modal */}
      {modal === "create" && (
        <Modal title="Create New Class" onClose={() => setModal(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Subject Name" required><Input value={form.name} onChange={(e) => setF("name", e.target.value)} placeholder="e.g. Mathematics" /></Field>
            <Field label="Grade / Section" required><Input value={form.grade} onChange={(e) => setF("grade", e.target.value)} placeholder="e.g. Grade 10A" /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Room"><Input value={form.room} onChange={(e) => setF("room", e.target.value)} placeholder="e.g. Room 204" /></Field>
              <Field label="Schedule"><Input value={form.schedule} onChange={(e) => setF("schedule", e.target.value)} placeholder="e.g. Mon/Wed 09:00" /></Field>
            </div>
            <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, border: `1px solid ${C.slate200}`, background: C.white, color: C.slate600, borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              <button onClick={handleCreate} style={{ flex: 2, background: C.blue, color: C.white, border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: !form.name.trim() || !form.grade.trim() ? "not-allowed" : "pointer", opacity: !form.name.trim() || !form.grade.trim() ? 0.6 : 1, fontFamily: "'DM Sans', sans-serif" }}>Create Class</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit modal */}
      {modal === "edit" && selected && (
        <Modal title="Edit Class" onClose={() => setModal(null)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Subject Name" required><Input value={form.name} onChange={(e) => setF("name", e.target.value)} /></Field>
            <Field label="Grade / Section" required><Input value={form.grade} onChange={(e) => setF("grade", e.target.value)} /></Field>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <Field label="Room"><Input value={form.room} onChange={(e) => setF("room", e.target.value)} /></Field>
              <Field label="Schedule"><Input value={form.schedule} onChange={(e) => setF("schedule", e.target.value)} /></Field>
            </div>
            <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, border: `1px solid ${C.slate200}`, background: C.white, color: C.slate600, borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              <button onClick={handleEdit} style={{ flex: 2, background: C.blue, color: C.white, border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Save Changes</button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete modal */}
      {modal === "delete" && selected && (
        <Modal title="Delete Class" onClose={() => setModal(null)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, background: C.redBg, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
              </svg>
            </div>
            <p style={{ fontSize: 16, fontWeight: 700, color: C.slate800, marginBottom: 8 }}>Delete "{selected.name} – {selected.grade}"?</p>
            <p style={{ fontSize: 14, color: C.slate600, marginBottom: 24 }}>This will remove the class and its {selected.students.length} student record{selected.students.length !== 1 ? "s" : ""}. This action cannot be undone.</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setModal(null)} style={{ flex: 1, border: `1px solid ${C.slate200}`, background: C.white, color: C.slate600, borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancel</button>
              <button onClick={handleDelete} style={{ flex: 1, background: C.red, color: C.white, border: "none", borderRadius: 8, padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Delete</button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}