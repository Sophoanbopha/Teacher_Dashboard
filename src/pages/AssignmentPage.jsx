// src/pages/AssignmentsPage.jsx

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Modal from "../components/Modal";
import Field from "../components/Field";
import PrimaryBtn from "../components/PrimaryBtn";
import StatusBadge from "../components/Badge";
import Label from "../components/Label";
import Input from "../components/Input";
import Avatar from "../components/Avatar";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const initialAssignments = [
  {
    id: 1,
    title: "Essay: Climate Change Solutions",
    subject: "Environmental Science",
    dueDate: "2026-06-15",
    maxScore: 100,
    status: "active",
    submissions: [
      {
        id: 1,
        student: "Alice Johnson",
        submittedAt: "2026-06-10 09:32",
        score: 88,
        status: "graded",
      },
      {
        id: 2,
        student: "Bob Martinez",
        submittedAt: "2026-06-11 14:20",
        score: null,
        status: "pending",
      },
      {
        id: 3,
        student: "Carol White",
        submittedAt: "2026-06-12 08:05",
        score: 95,
        status: "graded",
      },
      {
        id: 4,
        student: "David Kim",
        submittedAt: null,
        score: null,
        status: "missing",
      },
    ],
  },
  {
    id: 2,
    title: "Math Problem Set #4",
    subject: "Calculus",
    dueDate: "2026-06-18",
    maxScore: 50,
    status: "active",
    submissions: [
      {
        id: 1,
        student: "Alice Johnson",
        submittedAt: "2026-06-13 11:00",
        score: 45,
        status: "graded",
      },
      {
        id: 2,
        student: "Bob Martinez",
        submittedAt: "2026-06-14 16:45",
        score: null,
        status: "pending",
      },
    ],
  },
  {
    id: 3,
    title: "History Research Paper",
    subject: "World History",
    dueDate: "2026-05-30",
    maxScore: 200,
    status: "closed",
    submissions: [
      {
        id: 1,
        student: "Alice Johnson",
        submittedAt: "2026-05-28 10:15",
        score: 185,
        status: "graded",
      },
      {
        id: 2,
        student: "Carol White",
        submittedAt: "2026-05-29 22:50",
        score: 172,
        status: "graded",
      },
      {
        id: 3,
        student: "David Kim",
        submittedAt: "2026-05-30 23:59",
        score: 190,
        status: "graded",
      },
    ],
  },
];

const inputClass =
  "w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white transition-colors";

// ─── Assignment Form ──────────────────────────────────────────────────────────
const AssignmentForm = ({ initial, onSave, onCancel }) => {
  const [form, setForm] = useState(
    initial || {
      title: "",
      subject: "",
      dueDate: "",
      maxScore: "",
      status: "active",
      description: "",
    },
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.title.trim() && form.subject.trim() && form.dueDate;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Field label="Title" required>
        <Input
          value={form.title}
          onChange={(e) => set("title", e.target.value)}
          placeholder="e.g. Programming Assignment #1"
        />
      </Field>
      <Field label="Subject" required>
        <Input
          value={form.subject}
          onChange={(e) => set("subject", e.target.value)}
          placeholder="e.g. Computer Science"
        />
      </Field>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Field label="Due Date" required>
          <Input
            type="date"
            value={form.dueDate}
            onChange={(e) => set("dueDate", e.target.value)}
          />
        </Field>
        <Field label="Total Marks">
          <Input
            type="number"
            value={form.maxScore}
            onChange={(e) => set("maxScore", e.target.value)}
            placeholder="100"
          />
        </Field>
      </div>
      <Field label="Description">
        <textarea
          className={inputClass}
          value={form.description || ""}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Assignment instructions or details..."
          rows={3}
          style={{ resize: "vertical" }}
        />
      </Field>
      <Field label="Status">
        <select
          className={inputClass}
          value={form.status}
          onChange={(e) => set("status", e.target.value)}
        >
          <option value="active">Active</option>
          <option value="closed">Closed</option>
          <option value="draft">Draft</option>
        </select>
      </Field>
      <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
        <button
          onClick={onCancel}
          style={{
            flex: 1,
            border: "1px solid #CBD5E1",
            background: "white",
            color: "#475569",
            borderRadius: 8,
            padding: "10px 0",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => valid && onSave(form)}
          style={{
            flex: 1,
            background: valid ? "#0b3eac" : "#0b3eac",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "10px 0",
            fontSize: 14,
            fontWeight: 600,
            cursor: valid ? "pointer" : "not-allowed",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {initial ? "Save Changes" : "Create Assignment"}
        </button>
      </div>
    </div>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function AssignmentsPage({ sidebarOpen, onToggleSidebar }) {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [modal, setModal] = useState(null);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [nextId, setNextId] = useState(4);
  const [scoreEdits, setScoreEdits] = useState({});

  const handleScoreSave = (assignmentId, submissionId, rawValue) => {
    const score = rawValue === "" ? null : Number(rawValue);
    const updater = (a) =>
      a.id !== assignmentId
        ? a
        : {
            ...a,
            submissions: a.submissions.map((s) =>
              s.id !== submissionId
                ? s
                : {
                    ...s,
                    score,
                    status:
                      score !== null
                        ? "graded"
                        : s.submittedAt
                          ? "pending"
                          : "missing",
                  },
            ),
          };
    setAssignments((prev) => prev.map(updater));
    setSelected((prev) => (prev ? updater(prev) : prev));
    setScoreEdits((prev) => {
      const n = { ...prev };
      delete n[submissionId];
      return n;
    });
  };

  const filtered = assignments.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleCreate = (form) => {
    setAssignments((prev) => [
      ...prev,
      {
        ...form,
        id: nextId,
        maxScore: Number(form.maxScore) || 100,
        submissions: [],
      },
    ]);
    setNextId((n) => n + 1);
    setModal(null);
  };

  const handleEdit = (form) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === selected.id
          ? { ...a, ...form, maxScore: Number(form.maxScore) }
          : a,
      ),
    );
    setModal(null);
  };

  const handleDelete = () => {
    setAssignments((prev) => prev.filter((a) => a.id !== selected.id));
    setModal(null);
  };

  const openModal = (type, assignment = null) => {
    setSelected(assignment);
    setModal(type);
    if (type === "submissions") setScoreEdits({});
  };

  const submissionStats = (a) => ({
    total: a.submissions.length,
    graded: a.submissions.filter((s) => s.status === "graded").length,
    pending: a.submissions.filter((s) => s.status === "pending").length,
    missing: a.submissions.filter((s) => s.status === "missing").length,
  });

  const avgScore = (a) => {
    const scored = a.submissions.filter((s) => s.score !== null);
    if (!scored.length) return null;
    return Math.round(
      scored.reduce((sum, s) => sum + s.score, 0) / scored.length,
    );
  };

  const fmt = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#F8FAFC",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* ── Page Content ── */}
      <div
        style={{
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* ── Top Header ── */}
        <div
          style={{
            background: "#0b3eac",
            padding: "0 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 60,
            position: "sticky",
            top: 0,
            zIndex: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
              onClick={onToggleSidebar}
              style={{
                width: 34,
                height: 34,
                color: "white",
                fontSize: 20,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: 18,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Assignments
            </span>
          </div>
          <PrimaryBtn variant="outline" onClick={() => openModal("create")}>
            <span style={{ fontSize: 18, lineHeight: 1 }}>+</span>&nbsp;Create
            Assignment
          </PrimaryBtn>
        </div>

        {/* ── Body ── */}
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "28px 24px",
            width: "100%",
          }}
        >
          {/* ── Search & Filter ── */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginBottom: 24,
              flexWrap: "wrap",
            }}
          >
            <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
              <svg
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#94A3B8",
                }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search assignments..."
                style={{
                  width: "100%",
                  padding: "8px 12px 8px 32px",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  fontSize: 14,
                  color: "#0b3eac",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {["all", "active", "closed"].map((s) => (
                <PrimaryBtn
                  key={s}
                  small
                  variant={filterStatus === s ? "primary" : "outline"}
                  onClick={() => setFilterStatus(s)}
                >
                  {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                </PrimaryBtn>
              ))}
            </div>
          </div>

          {/* ── Assignment Cards ── */}
          {filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "64px 0",
                color: "#94A3B8",
              }}
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>📭</div>
              <p style={{ fontSize: 16, fontWeight: 600, color: "#64748B" }}>
                No assignments found
              </p>
              <p style={{ fontSize: 14, marginTop: 6 }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {filtered.map((a) => {
                const stats = submissionStats(a);
                const avg = avgScore(a);
                const isPast = new Date(a.dueDate) < new Date();

                return (
                  <div
                    key={a.id}
                    style={{
                      background: "white",
                      border: "1px solid #E2E8F0",
                      borderRadius: 12,
                      padding: "20px 24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 16,
                      }}
                    >
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 6,
                          }}
                        >
                          <h3
                            style={{
                              fontSize: 16,
                              fontWeight: 700,
                              color: "#1E293B",
                              margin: 0,
                            }}
                          >
                            {a.title}
                          </h3>
                          <StatusBadge status={a.status} />
                        </div>
                        <div
                          style={{ display: "flex", gap: 20, flexWrap: "wrap" }}
                        >
                          <span
                            style={{
                              fontSize: 14,
                              color: "#0b3eac",
                              fontWeight: 600,
                            }}
                          >
                            {a.subject}
                          </span>
                          <span
                            style={{
                              fontSize: 14,
                              color:
                                isPast && a.status === "active"
                                  ? "#EF4444"
                                  : "#64748B",
                            }}
                          >
                            Due: {fmt(a.dueDate)}
                          </span>
                          <span style={{ fontSize: 14, color: "#64748B" }}>
                            Total Marks: {a.maxScore}
                          </span>
                          {avg !== null && (
                            <span style={{ fontSize: 14, color: "#64748B" }}>
                              Avg:{" "}
                              <strong style={{ color: "#1E293B" }}>
                                {avg}/{a.maxScore}
                              </strong>
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                        <PrimaryBtn
                          small
                          variant="outline"
                          onClick={() => openModal("submissions", a)}
                        >
                          View
                        </PrimaryBtn>
                        <PrimaryBtn
                          small
                          variant="outline"
                          onClick={() => openModal("edit", a)}
                        >
                          Edit
                        </PrimaryBtn>
                        <PrimaryBtn
                          small
                          variant="danger"
                          onClick={() => openModal("delete", a)}
                        >
                          Delete
                        </PrimaryBtn>
                      </div>
                    </div>

                    <div
                      style={{
                        borderTop: "1px solid #F1F5F9",
                        margin: "14px 0",
                      }}
                    />

                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                      {[
                        {
                          label: "Submissions",
                          value: stats.total,
                          color: "#1E293B",
                        },
                        {
                          label: "Graded",
                          value: stats.graded,
                          color: "#22C55E",
                        },
                        {
                          label: "Pending",
                          value: stats.pending,
                          color: "#F59E0B",
                        },
                        {
                          label: "Missing",
                          value: stats.missing,
                          color: "#EF4444",
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 15,
                              fontWeight: 700,
                              color: item.color,
                            }}
                          >
                            {item.value}
                          </span>
                          <span style={{ fontSize: 13, color: "#64748B" }}>
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Create Modal ── */}
      {modal === "create" && (
        <Modal title="Create Assignment" onClose={() => setModal(null)}>
          <AssignmentForm
            onSave={handleCreate}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}

      {/* ── Edit Modal ── */}
      {modal === "edit" && selected && (
        <Modal title="Edit Assignment" onClose={() => setModal(null)}>
          <AssignmentForm
            initial={selected}
            onSave={handleEdit}
            onCancel={() => setModal(null)}
          />
        </Modal>
      )}

      {/* ── Delete Modal ── */}
      {modal === "delete" && selected && (
        <Modal title="Delete Assignment" onClose={() => setModal(null)}>
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: "#FEE2E2",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6" />
                <path d="M14 11v6" />
                <path d="M9 6V4h6v2" />
              </svg>
            </div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1E293B",
                marginBottom: 8,
              }}
            >
              Delete "{selected.title}"?
            </p>
            <p style={{ fontSize: 14, color: "#64748B", marginBottom: 24 }}>
              This will permanently remove the assignment and all{" "}
              {selected.submissions.length} submission
              {selected.submissions.length !== 1 ? "s" : ""}. This action cannot
              be undone.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => setModal(null)}
                style={{
                  flex: 1,
                  border: "1px solid #E2E8F0",
                  background: "white",
                  color: "#475569",
                  borderRadius: 8,
                  padding: "10px 0",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                style={{
                  flex: 1,
                  background: "#EF4444",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  padding: "10px 0",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Submissions Modal ── */}
      {modal === "submissions" && selected && (
        <Modal title={selected.title} onClose={() => setModal(null)} wide>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 14, color: "#64748B" }}>
              {selected.subject} &nbsp;·&nbsp; Due: {fmt(selected.dueDate)}{" "}
              &nbsp;·&nbsp; Max Marks: {selected.maxScore}
            </p>
          </div>

          {selected.submissions.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                color: "#94A3B8",
              }}
            >
              <p style={{ fontSize: 15 }}>No submissions yet</p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0" }}>
                  {["Student Name", "Submission Date", "Score", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "8px 12px",
                          fontSize: 12,
                          fontWeight: 700,
                          color: "#475569",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        <Label>{h}</Label>
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {selected.submissions.map((s, i) => (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom:
                        i < selected.submissions.length - 1
                          ? "1px solid #F1F5F9"
                          : "none",
                      background: i % 2 === 0 ? "white" : "#F8FAFC",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1E293B",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <Avatar
                          initials={s.student
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                          size={32}
                        />
                        {s.student}
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontSize: 14,
                        color: s.submittedAt ? "#475569" : "#EF4444",
                      }}
                    >
                      {s.submittedAt || "Not submitted"}
                    </td>
                    <td
                      style={{
                        padding: "12px",
                        fontSize: 14,
                        color: "#1E293B",
                        fontWeight: 600,
                      }}
                    >
                      {s.submittedAt ? (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Input
                            type="number"
                            min={0}
                            max={selected.maxScore}
                            value={
                              scoreEdits[s.id] !== undefined
                                ? scoreEdits[s.id]
                                : (s.score ?? "")
                            }
                            onChange={(e) =>
                              setScoreEdits((prev) => ({
                                ...prev,
                                [s.id]: e.target.value,
                              }))
                            }
                            placeholder="—"
                            style={{
                              width: 64,
                              padding: "4px 8px",
                              textAlign: "center",
                            }}
                          />
                          <span
                            style={{
                              color: "#94A3B8",
                              fontWeight: 400,
                              fontSize: 13,
                            }}
                          >
                            /{selected.maxScore}
                          </span>
                          {scoreEdits[s.id] !== undefined && (
                            <button
                              onClick={() =>
                                handleScoreSave(
                                  selected.id,
                                  s.id,
                                  scoreEdits[s.id],
                                )
                              }
                              style={{
                                background: "#0b3eac",
                                color: "white",
                                border: "none",
                                borderRadius: 6,
                                padding: "4px 10px",
                                fontSize: 12,
                                fontWeight: 700,
                                cursor: "pointer",
                                fontFamily: "'DM Sans', sans-serif",
                              }}
                            >
                              Save
                            </button>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: "#CBD5E1" }}>—</span>
                      )}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <StatusBadge status={s.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div
            style={{
              marginTop: 24,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <PrimaryBtn variant="primary" onClick={() => setModal(null)}>
              Close
            </PrimaryBtn>
          </div>
        </Modal>
      )}
    </div>
  );
}
