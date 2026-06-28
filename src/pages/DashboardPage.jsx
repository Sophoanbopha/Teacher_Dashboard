import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Avatar from "../components/Avatar";
import Badge from "../components/Badge";

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

const STATS = [
  { label: "Total Students", value: 142, sub: "+4 this week", color: C.blue, bg: C.blueBg, icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )},
  { label: "Active Assignments", value: 8, sub: "3 due this week", color: C.amber, bg: C.amberBg, icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  )},
  { label: "Pending Grades", value: 23, sub: "Needs attention", color: C.red, bg: C.redBg, icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  )},
  { label: "Avg. Attendance", value: "87%", sub: "Last 30 days", color: C.green, bg: C.greenBg, icon: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  )},
];

const RECENT_SUBMISSIONS = [
  { student: "Alice Johnson", initials: "AJ", assignment: "Essay: Climate Change Solutions", time: "2h ago", status: "pending" },
  { student: "Carol White", initials: "CW", assignment: "Math Problem Set #4", time: "4h ago", status: "graded" },
  { student: "Bob Martinez", initials: "BM", assignment: "History Research Paper", time: "5h ago", status: "pending" },
  { student: "Eva Nguyen", initials: "EN", assignment: "Essay: Climate Change Solutions", time: "Yesterday", status: "graded" },
  { student: "David Kim", initials: "DK", assignment: "Math Problem Set #4", time: "Yesterday", status: "missing" },
];

const UPCOMING = [
  { title: "Essay: Climate Change Solutions", subject: "Environmental Science", due: "Jun 15", daysLeft: 5, submissions: 3, total: 5 },
  { title: "Math Problem Set #4", subject: "Calculus", due: "Jun 18", daysLeft: 8, submissions: 2, total: 5 },
  { title: "Physics Lab Report", subject: "Physics", due: "Jun 20", daysLeft: 10, submissions: 0, total: 5 },
];

const CLASSES_TODAY = [
  { name: "Calculus – Grade 11A", time: "08:00 – 09:30", room: "Room 204", status: "done" },
  { name: "Environmental Science – Grade 10B", time: "10:00 – 11:30", room: "Lab 3", status: "done" },
  { name: "Physics – Grade 12A", time: "13:00 – 14:30", room: "Room 101", status: "next" },
  { name: "Calculus – Grade 11B", time: "15:00 – 16:30", room: "Room 204", status: "upcoming" },
];

export default function DashboardPage({ sidebarOpen, onToggleSidebar }) {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.blue, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={onToggleSidebar} style={{ width: 34, height: 34, fontSize: 20, color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, border: "none", borderRadius: 8, background: "none" }}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
          </svg>
          <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Dashboard</span>
        </div>
        <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500 }}>{today}</span>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 24px" }}>
        {/* Welcome */}
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: C.slate800, margin: 0 }}>Good morning, Sarah 👋</h1>
          <p style={{ fontSize: 14, color: C.slate400, marginTop: 4 }}>Here's what's happening with your classes today.</p>
        </div>

        {/* Stat cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 12, padding: "18px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: C.slate600 }}>{s.label}</span>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {s.icon}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 28, fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: C.slate400, marginTop: 3 }}>{s.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Two-column lower section */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Recent Submissions */}
          <div style={{ background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.slate100}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.slate800 }}>Recent Submissions</span>
              <span style={{ fontSize: 12, color: C.blue, fontWeight: 600, cursor: "pointer" }}>View all</span>
            </div>
            <div>
              {RECENT_SUBMISSIONS.map((s, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 20px", borderTop: i > 0 ? `1px solid ${C.slate100}` : "none" }}>
                  <Avatar initials={s.initials} size={34} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.slate800, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.student}</div>
                    <div style={{ fontSize: 12, color: C.slate400, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.assignment}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, flexShrink: 0 }}>
                    <Badge status={s.status} />
                    <span style={{ fontSize: 11, color: C.slate400 }}>{s.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Classes */}
          <div style={{ background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.slate100}` }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: C.slate800 }}>Today's Schedule</span>
            </div>
            <div>
              {CLASSES_TODAY.map((cls, i) => {
                const colors = { done: { dot: C.slate400, bg: C.slate100 }, next: { dot: C.green, bg: C.greenBg }, upcoming: { dot: C.blue, bg: C.blueBg } };
                const col = colors[cls.status];
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 20px", borderTop: i > 0 ? `1px solid ${C.slate100}` : "none" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: col.dot, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: cls.status === "done" ? C.slate400 : C.slate800 }}>{cls.name}</div>
                      <div style={{ fontSize: 12, color: C.slate400 }}>{cls.time} · {cls.room}</div>
                    </div>
                    {cls.status === "next" && (
                      <span style={{ background: col.bg, color: col.dot, fontSize: 11, fontWeight: 700, borderRadius: 6, padding: "2px 8px" }}>Next</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div style={{ background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.slate100}` }}>
            <span style={{ fontSize: 15, fontWeight: 700, color: C.slate800 }}>Upcoming Due Dates</span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {UPCOMING.map((a, i) => (
              <div key={i} style={{ padding: "18px 20px", borderLeft: i > 0 ? `1px solid ${C.slate100}` : "none" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.slate800, marginBottom: 2 }}>{a.title}</div>
                <div style={{ fontSize: 12, color: C.blue, fontWeight: 600, marginBottom: 10 }}>{a.subject}</div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: C.slate400 }}>Due: <strong style={{ color: a.daysLeft <= 5 ? C.red : C.slate600 }}>{a.due}</strong></span>
                  <span style={{ fontSize: 12, color: C.slate400 }}>{a.submissions}/{a.total} submitted</span>
                </div>
                <div style={{ height: 5, background: C.slate100, borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: C.blue, width: `${(a.submissions / a.total) * 100}%`, transition: "width 0.4s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}