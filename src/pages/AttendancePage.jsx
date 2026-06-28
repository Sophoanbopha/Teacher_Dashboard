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
          // background: "rgba(255,255,255,0.14)",
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
const AttendancePage = ({ sidebarOpen, onToggleSidebar }) => {
  const [attendance, setAttendance] = useState(() => generateHistory());
  const [historyStudent, setHistoryStudent] = useState(null);
  const [historyTab, setHistoryTab] = useState("calendar");

  const mark = (studentId, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], [todayKey]: status },
    }));
  };

  const getStatus = (studentId) => attendance[studentId]?.[todayKey] || null;

  const calcPercentage = (studentId) => {
    const rec = attendance[studentId] || {};
    const days = Object.values(rec);
    if (!days.length) return 0;
    return Math.round(
      (days.filter((d) => d === "present").length / days.length) * 100,
    );
  };

  const getHistory = (studentId) => {
    const rec = attendance[studentId] || {};
    return Object.entries(rec)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, status]) => ({ date, status }));
  };

  const todayStats = () => {
    const present = STUDENTS.filter(
      (s) => getStatus(s.id) === "present",
    ).length;
    const absent = STUDENTS.filter((s) => getStatus(s.id) === "absent").length;
    const unmarked = STUDENTS.filter((s) => !getStatus(s.id)).length;
    return { present, absent, unmarked };
  };

  const t = todayStats();

  const fmtDate = (dateStr) =>
    new Date(dateStr + "T00:00:00").toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });

  // Calendar view — last 4 weeks
  const calendarDays = (() => {
    const days = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      days.push(d.toISOString().slice(0, 10));
    }
    return days;
  })();

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <PageHeader
        title="Attendance Tracking"
        subtitle={`Today: ${fmtDate(todayKey)}`}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={onToggleSidebar}
      />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 24px" }}>
        {/* Today summary bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 24,
          }}
        >
          {[
            {
              label: "Present Today",
              value: t.present,
              bg: C.greenBg,
              color: C.green,
            },
            {
              label: "Absent Today",
              value: t.absent,
              bg: C.redBg,
              color: C.red,
            },
            {
              label: "Unmarked",
              value: t.unmarked,
              bg: C.amberBg,
              color: C.amber,
            },
          ].map(({ label, value, bg, color }) => (
            <div
              key={label}
              style={{
                background: C.white,
                border: `1px solid ${C.slate200}`,
                borderRadius: 10,
                padding: "16px 20px",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 800,
                  color,
                  flexShrink: 0,
                }}
              >
                {value}
              </div>
              <span
                style={{ fontSize: 14, fontWeight: 600, color: C.slate600 }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Student attendance table */}
        <div
          style={{
            background: C.white,
            border: `1px solid ${C.slate200}`,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {/* Table head */}
          <div
            style={{
              background: C.slate100,
              padding: "10px 20px",
              borderBottom: `1px solid ${C.slate200}`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                gap: 8,
                alignItems: "center",
              }}
            >
              {[
                "Student",
                "Today's Attendance",
                "Attendance %",
                "This Month",
                "History",
              ].map((h) => (
                <span
                  key={h}
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.slate600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
          </div>

          {STUDENTS.map((student, i) => {
            const status = getStatus(student.id);
            const pct = calcPercentage(student.id);
            const history = getHistory(student.id);
            const presentCount = history.filter(
              (h) => h.status === "present",
            ).length;
            const totalCount = history.length;

            return (
              <div key={student.id}>
                {i > 0 && <Divider />}
                <div
                  style={{
                    padding: "14px 20px",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                    gap: 8,
                    alignItems: "center",
                    background: i % 2 === 0 ? C.white : C.bg,
                  }}
                >
                  {/* Student */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <Avatar initials={student.avatar} />
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: C.slate800,
                      }}
                    >
                      {student.name}
                    </span>
                  </div>

                  {/* Present / Absent buttons */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => mark(student.id, "present")}
                      style={{
                        border: `1px solid ${status === "present" ? C.green : C.slate200}`,
                        background: status === "present" ? C.greenBg : C.white,
                        color: status === "present" ? C.green : C.slate400,
                        borderRadius: 7,
                        padding: "5px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.15s",
                      }}
                    >
                      ✓ Present
                    </button>
                    <button
                      onClick={() => mark(student.id, "absent")}
                      style={{
                        border: `1px solid ${status === "absent" ? C.red : C.slate200}`,
                        background: status === "absent" ? C.redBg : C.white,
                        color: status === "absent" ? C.red : C.slate400,
                        borderRadius: 7,
                        padding: "5px 12px",
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "'DM Sans', sans-serif",
                        transition: "all 0.15s",
                      }}
                    >
                      ✗ Absent
                    </button>
                  </div>

                  {/* Percentage with bar */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color:
                            pct >= 80 ? C.green : pct >= 60 ? C.amber : C.red,
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 5,
                        background: C.slate100,
                        borderRadius: 99,
                        overflow: "hidden",
                        width: 80,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          borderRadius: 99,
                          background:
                            pct >= 80 ? C.green : pct >= 60 ? "#F59E0B" : C.red,
                          width: `${pct}%`,
                          transition: "width 0.4s",
                        }}
                      />
                    </div>
                  </div>

                  {/* This month count */}
                  <span
                    style={{ fontSize: 14, color: C.slate600, fontWeight: 600 }}
                  >
                    {presentCount}
                    <span style={{ fontWeight: 400, color: C.slate400 }}>
                      /{totalCount} days
                    </span>
                  </span>

                  {/* History button */}
                  <button
                    onClick={() => {
                      setHistoryStudent(student);
                      setHistoryTab("calendar");
                    }}
                    style={{
                      border: `1px solid ${C.blue}`,
                      background: C.white,
                      color: C.blue,
                      borderRadius: 7,
                      padding: "5px 12px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                      width: "fit-content",
                    }}
                  >
                    View History
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Attendance History Modal ── */}
      {historyStudent && (
        <Modal
          title={`${historyStudent.name} — Attendance History`}
          subtitle={`Overall: ${calcPercentage(historyStudent.id)}% attendance`}
          onClose={() => setHistoryStudent(null)}
          wide
        >
          {/* Tabs */}
          <div
            style={{
              borderBottom: `1px solid ${C.slate200}`,
              marginBottom: 20,
              display: "flex",
            }}
          >
            <Tab
              label="Calendar View"
              active={historyTab === "calendar"}
              onClick={() => setHistoryTab("calendar")}
            />
            <Tab
              label="List View"
              active={historyTab === "list"}
              onClick={() => setHistoryTab("list")}
            />
          </div>

          {/* Stats chips */}
          {(() => {
            const history = getHistory(historyStudent.id);
            const present = history.filter(
              (h) => h.status === "present",
            ).length;
            const absent = history.filter((h) => h.status === "absent").length;
            const pct = calcPercentage(historyStudent.id);
            return (
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 20,
                  flexWrap: "wrap",
                }}
              >
                {[
                  {
                    label: "Present",
                    value: present,
                    bg: C.greenBg,
                    color: C.green,
                  },
                  { label: "Absent", value: absent, bg: C.redBg, color: C.red },
                  {
                    label: "Total",
                    value: history.length,
                    bg: C.blueBg,
                    color: C.blue,
                  },
                  {
                    label: "Rate",
                    value: `${pct}%`,
                    bg: pct >= 80 ? C.greenBg : pct >= 60 ? C.amberBg : C.redBg,
                    color: pct >= 80 ? C.green : pct >= 60 ? C.amber : C.red,
                  },
                ].map(({ label, value, bg, color }) => (
                  <div
                    key={label}
                    style={{
                      background: bg,
                      borderRadius: 8,
                      padding: "8px 16px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 18, fontWeight: 800, color }}>
                      {value}
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        color,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            );
          })()}

          {historyTab === "calendar" ? (
            /* Calendar grid */
            <div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 6,
                }}
              >
                {/* Day headers */}
                {["Mon", "Tue", "Wed", "Thu", "Fri"].map((d) => (
                  <div
                    key={d}
                    style={{
                      textAlign: "center",
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.slate400,
                      paddingBottom: 4,
                    }}
                  >
                    {d}
                  </div>
                ))}
                {/* Padding for first week start */}
                {(() => {
                  if (!calendarDays.length) return null;
                  const firstDay = new Date(
                    calendarDays[0] + "T00:00:00",
                  ).getDay(); // 1=Mon
                  const pad =
                    firstDay === 1 ? 0 : firstDay === 0 ? 4 : firstDay - 1;
                  return Array.from({ length: pad }).map((_, i) => (
                    <div key={`pad-${i}`} />
                  ));
                })()}
                {calendarDays.map((date) => {
                  const s = attendance[historyStudent.id]?.[date];
                  const isToday = date === todayKey;
                  return (
                    <div
                      key={date}
                      title={fmtDate(date)}
                      style={{
                        borderRadius: 8,
                        padding: "8px 4px",
                        textAlign: "center",
                        background:
                          s === "present"
                            ? C.greenBg
                            : s === "absent"
                              ? C.redBg
                              : C.slate100,
                        border: isToday
                          ? `2px solid ${C.blue}`
                          : "2px solid transparent",
                        cursor: "default",
                      }}
                    >
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 700,
                          color:
                            s === "present"
                              ? C.green
                              : s === "absent"
                                ? C.red
                                : C.slate400,
                        }}
                      >
                        {new Date(date + "T00:00:00").getDate()}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color:
                            s === "present"
                              ? C.green
                              : s === "absent"
                                ? C.red
                                : C.slate300,
                        }}
                      >
                        {s === "present" ? "✓" : s === "absent" ? "✗" : "—"}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
                {[
                  { bg: C.greenBg, color: C.green, label: "Present" },
                  { bg: C.redBg, color: C.red, label: "Absent" },
                  {
                    bg: C.slate100,
                    color: C.slate400,
                    label: "Weekend / No class",
                  },
                ].map(({ bg, color, label }) => (
                  <div
                    key={label}
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: 4,
                        background: bg,
                      }}
                    />
                    <span style={{ fontSize: 12, color: C.slate600 }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* List view */
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 0,
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.slate400,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "8px 12px",
                    background: C.slate100,
                  }}
                >
                  Date
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: C.slate400,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "8px 12px",
                    background: C.slate100,
                  }}
                >
                  Status
                </span>
              </div>
              {getHistory(historyStudent.id).map(({ date, status }, i) => (
                <div
                  key={date}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    borderTop: `1px solid ${C.slate100}`,
                    background: i % 2 === 0 ? C.white : C.bg,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: C.slate700,
                      padding: "10px 12px",
                      fontWeight: date === todayKey ? 700 : 400,
                    }}
                  >
                    {fmtDate(date)}
                    {date === todayKey && (
                      <span
                        style={{ color: C.blue, fontSize: 11, marginLeft: 6 }}
                      >
                        Today
                      </span>
                    )}
                  </span>
                  <span style={{ padding: "10px 12px" }}>
                    <Badge status={status} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default AttendancePage;
