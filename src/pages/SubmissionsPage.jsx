import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

/* ─── SHARED FONT IMPORT ────────────────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; background: #F8FAFC; }
    input[type=number]::-webkit-inner-spin-button { opacity: 1; }
  `}</style>
);

/* ─── COLOUR TOKENS ─────────────────────────────────────────────────────────── */
const C = {
  blue: "#0b3eac",
  blueHover: "#0b3eac",
  blueBg: "#0b3eac",
  blueMid: "#0b3eac",
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

/* ─── SEED DATA ─────────────────────────────────────────────────────────────── */
const ASSIGNMENTS = [
  {
    id: 1,
    title: "Essay: Climate Change Solutions",
    subject: "Environmental Science",
    dueDate: "2026-06-15",
    maxScore: 100,
    submissions: [
      {
        id: 1,
        student: "Alice Johnson",
        avatar: "AJ",
        submittedAt: "2026-06-10 09:32",
        score: 88,
        feedback: "Great analysis, improve citations.",
        status: "graded",
      },
      {
        id: 2,
        student: "Bob Martinez",
        avatar: "BM",
        submittedAt: "2026-06-11 14:20",
        score: null,
        feedback: "",
        status: "pending",
      },
      {
        id: 3,
        student: "Carol White",
        avatar: "CW",
        submittedAt: "2026-06-12 08:05",
        score: 95,
        feedback: "Excellent work!",
        status: "graded",
      },
      {
        id: 4,
        student: "David Kim",
        avatar: "DK",
        submittedAt: null,
        score: null,
        feedback: "",
        status: "missing",
      },
      {
        id: 5,
        student: "Eva Nguyen",
        avatar: "EN",
        submittedAt: "2026-06-13 17:00",
        score: null,
        feedback: "",
        status: "pending",
      },
    ],
  },
  {
    id: 2,
    title: "Math Problem Set #4",
    subject: "Calculus",
    dueDate: "2026-06-18",
    maxScore: 50,
    submissions: [
      {
        id: 1,
        student: "Alice Johnson",
        avatar: "AJ",
        submittedAt: "2026-06-13 11:00",
        score: 45,
        feedback: "Perfect!",
        status: "graded",
      },
      {
        id: 2,
        student: "Bob Martinez",
        avatar: "BM",
        submittedAt: "2026-06-14 16:45",
        score: null,
        feedback: "",
        status: "pending",
      },
      {
        id: 3,
        student: "Carol White",
        avatar: "CW",
        submittedAt: null,
        score: null,
        feedback: "",
        status: "missing",
      },
    ],
  },
];

const STUDENTS = [
  { id: 1, name: "Alice Johnson", avatar: "AJ" },
  { id: 2, name: "Bob Martinez", avatar: "BM" },
  { id: 3, name: "Carol White", avatar: "CW" },
  { id: 4, name: "David Kim", avatar: "DK" },
  { id: 5, name: "Eva Nguyen", avatar: "EN" },
];

// Generate 30 days of attendance history
const generateHistory = () => {
  const records = {};
  STUDENTS.forEach((s) => {
    records[s.id] = {};
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (d.getDay() === 0 || d.getDay() === 6) continue; // skip weekends
      const key = d.toISOString().slice(0, 10);
      records[s.id][key] = Math.random() > 0.15 ? "present" : "absent";
    }
  });
  return records;
};

const todayKey = new Date().toISOString().slice(0, 10);

/* ─── TINY SHARED COMPONENTS ────────────────────────────────────────────────── */
const Avatar = ({ initials, size = 34 }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: "50%",
      background: C.blueMid,
      color: C.blue,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: size * 0.35,
      fontWeight: 700,
      flexShrink: 0,
      fontFamily: "'DM Sans', sans-serif",
    }}
  >
    {initials}
  </div>
);

const Badge = ({ status }) => {
  const map = {
    graded: { bg: C.greenBg, color: C.green, label: "Graded" },
    pending: { bg: C.amberBg, color: C.amber, label: "Pending" },
    missing: { bg: C.redBg, color: C.red, label: "Missing" },
    present: { bg: C.greenBg, color: C.green, label: "Present" },
    absent: { bg: C.redBg, color: C.red, label: "Absent" },
  };
  const s = map[status] || map.pending;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        borderRadius: 6,
        padding: "3px 10px",
        fontSize: 12,
        fontWeight: 700,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {s.label}
    </span>
  );
};

const Modal = ({ title, subtitle, onClose, children, wide }) => (
  <div
    style={{
      position: "fixed",
      inset: 0,
      zIndex: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}
  >
    <div
      style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }}
      onClick={onClose}
    />
    <div
      style={{
        position: "relative",
        background: C.white,
        borderRadius: 12,
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        width: "100%",
        maxWidth: wide ? 820 : 560,
        display: "flex",
        flexDirection: "column",
        maxHeight: "92vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "18px 24px",
          borderBottom: `1px solid ${C.slate200}`,
          flexShrink: 0,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: C.slate800,
              margin: 0,
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 13, color: C.slate400, marginTop: 2 }}>
              {subtitle}
            </p>
          )}
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            fontSize: 22,
            color: C.slate400,
            cursor: "pointer",
            lineHeight: 1,
            padding: "0 4px",
          }}
        >
          &times;
        </button>
      </div>
      <div style={{ overflowY: "auto", flex: 1, padding: 24 }}>{children}</div>
    </div>
  </div>
);

const Tab = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    style={{
      padding: "10px 22px",
      fontSize: 14,
      fontWeight: 600,
      border: "none",
      background: "none",
      cursor: "pointer",
      color: active ? C.blue : C.slate600,
      borderBottom: active ? `2px solid ${C.blue}` : "2px solid transparent",
      fontFamily: "'DM Sans', sans-serif",
      transition: "color 0.15s",
    }}
  >
    {label}
  </button>
);

const Divider = () => (
  <div style={{ borderTop: `1px solid ${C.slate100}`, margin: "0" }} />
);

/* ─── SECTION HEADER ────────────────────────────────────────────────────────── */
const PageHeader = ({
  title,
  subtitle,
  action,
  sidebarOpen,
  onToggleSidebar,
}) => (
  <div
    style={{
      background: C.blue,
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
          fontSize: 20,
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          flexShrink: 0,
          border: "none",
          borderRadius: 8,
        }}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>
        {title}
      </span>
      {subtitle && (
        <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 14 }}>
          {subtitle}
        </span>
      )}
    </div>
    {action}
  </div>
);

/* ══════════════════════════════════════════════════════════════════════════════
   SECTION 4 — SUBMISSIONS & GRADES
══════════════════════════════════════════════════════════════════════════════ */
const SubmissionsPage = ({ sidebarOpen, onToggleSidebar }) => {
  const [assignments, setAssignments] = useState(ASSIGNMENTS);
  const [selected, setSelected] = useState(null); // assignment
  const [gradingSub, setGradingSub] = useState(null); // submission being graded
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");

  const openGrading = (sub) => {
    setGradingSub(sub);
    setGradeInput(sub.score !== null ? String(sub.score) : "");
    setFeedbackInput(sub.feedback || "");
  };

  const saveGrade = () => {
    const score = gradeInput === "" ? null : Number(gradeInput);
    const updatedSub = {
      ...gradingSub,
      score,
      feedback: feedbackInput,
      status:
        score !== null
          ? "graded"
          : gradingSub.submittedAt
            ? "pending"
            : "missing",
    };
    const updateAssignment = (a) =>
      a.id !== selected.id
        ? a
        : {
            ...a,
            submissions: a.submissions.map((s) =>
              s.id === gradingSub.id ? updatedSub : s,
            ),
          };
    setAssignments((prev) => prev.map(updateAssignment));
    setSelected((prev) => (prev ? updateAssignment(prev) : prev));
    setGradingSub(null);
  };

  const stats = (a) => {
    const total = a.submissions.length;
    const graded = a.submissions.filter((s) => s.status === "graded").length;
    const pending = a.submissions.filter((s) => s.status === "pending").length;
    const missing = a.submissions.filter((s) => s.status === "missing").length;
    const scores = a.submissions
      .filter((s) => s.score !== null)
      .map((s) => s.score);
    const avg = scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : null;
    return { total, graded, pending, missing, avg };
  };

  const filteredSubs = selected
    ? selected.submissions.filter((s) => {
        const q = search.toLowerCase();
        const matchSearch = s.student.toLowerCase().includes(q);
        const matchStatus = filterStatus === "all" || s.status === filterStatus;
        return matchSearch && matchStatus;
      })
    : [];

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <PageHeader
        title="Submissions & Grades"
        subtitle={`${assignments.length} assignments`}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={onToggleSidebar}
      />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 24px" }}>
        {/* Assignment picker */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {assignments.map((a) => {
            const s = stats(a);
            const isSelected = selected?.id === a.id;
            return (
              <div
                key={a.id}
                onClick={() => {
                  setSelected(a);
                  setSearch("");
                  setFilterStatus("all");
                }}
                style={{
                  background: C.white,
                  border: `1px solid ${isSelected ? C.blue : C.slate200}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  boxShadow: isSelected ? `0 0 0 3px ${C.blueBg}` : "none",
                  transition: "all 0.15s",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: C.slate800,
                      }}
                    >
                      {a.title}
                    </span>
                    <span
                      style={{ fontSize: 12, color: C.blue, fontWeight: 600 }}
                    >
                      {a.subject}
                    </span>
                  </div>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    {[
                      { label: "Total", val: s.total, color: C.slate600 },
                      { label: "Graded", val: s.graded, color: C.green },
                      { label: "Pending", val: s.pending, color: C.amber },
                      { label: "Missing", val: s.missing, color: C.red },
                    ].map(({ label, val, color }) => (
                      <span
                        key={label}
                        style={{ fontSize: 13, color: C.slate400 }}
                      >
                        <strong style={{ color }}>{val}</strong> {label}
                      </span>
                    ))}
                    {s.avg !== null && (
                      <span style={{ fontSize: 13, color: C.slate400 }}>
                        Avg:{" "}
                        <strong style={{ color: C.slate800 }}>
                          {s.avg}/{a.maxScore}
                        </strong>
                      </span>
                    )}
                  </div>
                  {/* Progress bar */}
                  <div
                    style={{
                      marginTop: 8,
                      height: 4,
                      background: C.slate100,
                      borderRadius: 99,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 99,
                        background: C.blue,
                        width: `${s.total > 0 ? (s.graded / s.total) * 100 : 0}%`,
                        transition: "width 0.4s",
                      }}
                    />
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: isSelected ? C.blue : C.slate400,
                    flexShrink: 0,
                  }}
                >
                  {isSelected ? "▲ Viewing" : "View →"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submission table */}
        {selected && (
          <div
            style={{
              background: C.white,
              border: `1px solid ${C.slate200}`,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            {/* Table toolbar */}
            <div
              style={{
                padding: "14px 20px",
                borderBottom: `1px solid ${C.slate200}`,
                display: "flex",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: C.slate800,
                  flex: 1,
                }}
              >
                {selected.title}
                <span
                  style={{
                    fontSize: 13,
                    color: C.slate400,
                    fontWeight: 400,
                    marginLeft: 8,
                  }}
                >
                  Max: {selected.maxScore} pts
                </span>
              </span>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search student..."
                  style={{
                    border: `1px solid ${C.slate200}`,
                    borderRadius: 7,
                    padding: "7px 12px 7px 32px",
                    fontSize: 13,
                    color: C.slate800,
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    width: 180,
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: C.slate400,
                    fontSize: 13,
                  }}
                >
                  🔍
                </span>
              </div>
              {/* Filter */}
              <div style={{ display: "flex", gap: 6 }}>
                {["all", "graded", "pending", "missing"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterStatus(f)}
                    style={{
                      border: `1px solid ${filterStatus === f ? C.blue : C.slate200}`,
                      background: filterStatus === f ? C.blue : C.white,
                      color: filterStatus === f ? C.white : C.slate600,
                      borderRadius: 7,
                      padding: "6px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      textTransform: "capitalize",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {f === "all"
                      ? "All"
                      : f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {filteredSubs.length === 0 ? (
              <div
                style={{
                  padding: "48px 0",
                  textAlign: "center",
                  color: C.slate400,
                }}
              >
                <p style={{ fontSize: 15 }}>No submissions match your filter</p>
              </div>
            ) : (
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: C.slate100 }}>
                    {[
                      "Student",
                      "Submitted",
                      "Score",
                      "Feedback",
                      "Status",
                      "Action",
                    ].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "10px 14px",
                          fontSize: 11,
                          fontWeight: 700,
                          color: C.slate600,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredSubs.map((s, i) => (
                    <tr
                      key={s.id}
                      style={{
                        borderTop: `1px solid ${C.slate100}`,
                        background: i % 2 === 0 ? C.white : C.bg,
                      }}
                    >
                      {/* Student */}
                      <td style={{ padding: "12px 14px" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <Avatar initials={s.avatar} />
                          <span
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: C.slate800,
                            }}
                          >
                            {s.student}
                          </span>
                        </div>
                      </td>
                      {/* Submitted */}
                      <td
                        style={{
                          padding: "12px 14px",
                          fontSize: 13,
                          color: s.submittedAt ? C.slate600 : C.red,
                        }}
                      >
                        {s.submittedAt || "Not submitted"}
                      </td>
                      {/* Score */}
                      <td
                        style={{
                          padding: "12px 14px",
                          fontSize: 14,
                          fontWeight: 700,
                          color: C.slate800,
                        }}
                      >
                        {s.score !== null ? (
                          <>
                            {s.score}
                            <span
                              style={{
                                fontSize: 12,
                                fontWeight: 400,
                                color: C.slate400,
                              }}
                            >
                              /{selected.maxScore}
                            </span>
                          </>
                        ) : (
                          <span style={{ color: C.slate200 }}>—</span>
                        )}
                      </td>
                      {/* Feedback preview */}
                      <td
                        style={{
                          padding: "12px 14px",
                          fontSize: 13,
                          color: C.slate400,
                          maxWidth: 180,
                        }}
                      >
                        {s.feedback ? (
                          <span style={{ color: C.slate600 }}>
                            {s.feedback.length > 40
                              ? s.feedback.slice(0, 40) + "…"
                              : s.feedback}
                          </span>
                        ) : (
                          <span style={{ fontStyle: "italic" }}>
                            No feedback
                          </span>
                        )}
                      </td>
                      {/* Status */}
                      <td style={{ padding: "12px 14px" }}>
                        <Badge status={s.status} />
                      </td>
                      {/* Action */}
                      <td style={{ padding: "12px 14px" }}>
                        <button
                          onClick={() => openGrading(s)}
                          style={{
                            background:
                              s.status === "graded" ? C.white : C.blue,
                            color: s.status === "graded" ? C.blue : C.white,
                            border: `1px solid ${C.blue}`,
                            borderRadius: 7,
                            padding: "5px 14px",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            fontFamily: "'DM Sans', sans-serif",
                          }}
                        >
                          {s.status === "graded" ? "Edit" : "Grade"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* ── Grading Modal ── */}
      {gradingSub && selected && (
        <Modal
          title={`Grade: ${gradingSub.student}`}
          subtitle={`${selected.title} · Max ${selected.maxScore} pts`}
          onClose={() => setGradingSub(null)}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Submission info */}
            <div
              style={{
                background: C.bg,
                border: `1px solid ${C.slate200}`,
                borderRadius: 8,
                padding: "12px 16px",
                display: "flex",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.slate400,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 2,
                  }}
                >
                  Submitted
                </p>
                <p
                  style={{
                    fontSize: 14,
                    color: gradingSub.submittedAt ? C.slate800 : C.red,
                    fontWeight: 600,
                  }}
                >
                  {gradingSub.submittedAt || "Not submitted"}
                </p>
              </div>
              <div>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.slate400,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    marginBottom: 2,
                  }}
                >
                  Current Status
                </p>
                <Badge status={gradingSub.status} />
              </div>
            </div>

            {/* Score input */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.slate600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 6,
                }}
              >
                Score{" "}
                <span
                  style={{
                    color: C.slate400,
                    textTransform: "none",
                    fontWeight: 400,
                  }}
                >
                  out of {selected.maxScore}
                </span>
              </label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input
                  type="number"
                  min={0}
                  max={selected.maxScore}
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  placeholder="Enter score"
                  style={{
                    width: 120,
                    border: `1px solid ${C.slate200}`,
                    borderRadius: 8,
                    padding: "10px 14px",
                    fontSize: 18,
                    fontWeight: 700,
                    color: C.slate800,
                    fontFamily: "'DM Sans', sans-serif",
                    outline: "none",
                    textAlign: "center",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = C.blue)}
                  onBlur={(e) => (e.target.style.borderColor = C.slate200)}
                />
                <span style={{ fontSize: 16, color: C.slate400 }}>
                  / {selected.maxScore}
                </span>
                {gradeInput !== "" && (
                  <span
                    style={{
                      background: C.blueBg,
                      color: C.blue,
                      borderRadius: 8,
                      padding: "6px 12px",
                      fontSize: 14,
                      fontWeight: 700,
                    }}
                  >
                    {Math.round((Number(gradeInput) / selected.maxScore) * 100)}
                    %
                  </span>
                )}
              </div>
            </div>

            {/* Feedback */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 13,
                  fontWeight: 700,
                  color: C.slate600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 6,
                }}
              >
                Feedback
              </label>
              <textarea
                value={feedbackInput}
                onChange={(e) => setFeedbackInput(e.target.value)}
                placeholder="Write feedback for the student..."
                rows={4}
                style={{
                  width: "100%",
                  border: `1px solid ${C.slate200}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  fontSize: 14,
                  color: C.slate800,
                  fontFamily: "'DM Sans', sans-serif",
                  outline: "none",
                  resize: "vertical",
                  lineHeight: 1.6,
                }}
                onFocus={(e) => (e.target.style.borderColor = C.blue)}
                onBlur={(e) => (e.target.style.borderColor = C.slate200)}
              />
              <p style={{ fontSize: 12, color: C.slate400, marginTop: 4 }}>
                {feedbackInput.length} characters
              </p>
            </div>

            {/* Quick feedback chips */}
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: C.slate400,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  marginBottom: 8,
                }}
              >
                Quick feedback
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {[
                  "Great work!",
                  "Needs improvement.",
                  "Well structured.",
                  "Improve citations.",
                  "Excellent analysis!",
                  "Submit on time next time.",
                ].map((t) => (
                  <button
                    key={t}
                    onClick={() =>
                      setFeedbackInput((prev) => (prev ? prev + " " + t : t))
                    }
                    style={{
                      border: `1px solid ${C.slate200}`,
                      background: C.white,
                      color: C.slate600,
                      borderRadius: 20,
                      padding: "4px 12px",
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
              <button
                onClick={() => setGradingSub(null)}
                style={{
                  flex: 1,
                  border: `1px solid ${C.slate200}`,
                  background: C.white,
                  color: C.slate600,
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
                onClick={saveGrade}
                style={{
                  flex: 2,
                  border: "none",
                  background: C.blue,
                  color: C.white,
                  borderRadius: 8,
                  padding: "10px 0",
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Save Grade & Feedback
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SubmissionsPage;
