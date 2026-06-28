import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
  slate300: "#CBD5E1",
  slate200: "#E2E8F0",
  slate100: "#F1F5F9",
  white: "#FFFFFF",
  bg: "#F8FAFC",
};

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: "submission",
    title: "New submission received",
    body: "Alice Johnson submitted Essay: Climate Change Solutions — 2 hours before the deadline.",
    time: "2h ago",
    read: false,
    color: C.blue,
    colorBg: C.blueBg,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    id: 2,
    type: "missing",
    title: "Missing submission alert",
    body: "David Kim has not submitted Math Problem Set #4. Due date passed 1 hour ago.",
    time: "1h ago",
    read: false,
    color: C.red,
    colorBg: C.redBg,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
  },
  {
    id: 3,
    type: "attendance",
    title: "Attendance reminder",
    body: "You haven't marked attendance for Physics – Grade 12A today.",
    time: "3h ago",
    read: false,
    color: C.amber,
    colorBg: C.amberBg,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
        <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/>
        <line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    id: 4,
    type: "grade",
    title: "Grading complete",
    body: "You've graded all submissions for History Research Paper. Average score: 182/200.",
    time: "Yesterday",
    read: true,
    color: C.green,
    colorBg: C.greenBg,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    ),
  },
  {
    id: 5,
    type: "submission",
    title: "New submission received",
    body: "Bob Martinez submitted Math Problem Set #4.",
    time: "Yesterday",
    read: true,
    color: C.blue,
    colorBg: C.blueBg,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    id: 6,
    type: "missing",
    title: "Low attendance warning",
    body: "Carol White's attendance has dropped below 75% this month. Consider reaching out.",
    time: "2 days ago",
    read: true,
    color: C.red,
    colorBg: C.redBg,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    id: 7,
    type: "grade",
    title: "Pending grades reminder",
    body: "You have 5 ungraded submissions for Essay: Climate Change Solutions.",
    time: "2 days ago",
    read: true,
    color: C.amber,
    colorBg: C.amberBg,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

const TYPE_LABELS = { all: "All", submission: "Submissions", missing: "Alerts", attendance: "Attendance", grade: "Grades" };

export default function NotificationsPage({ sidebarOpen, onToggleSidebar }) {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const unread = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const dismiss = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);

  const filtered = notifications.filter((n) => filter === "all" || n.type === filter);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.blue, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={onToggleSidebar} style={{ width: 34, height: 34, fontSize: 20, color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none", borderRadius: 8, background: "none" }}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Notifications</span>
          {unread > 0 && (
            <span style={{ background: C.red, color: C.white, borderRadius: 99, fontSize: 11, fontWeight: 800, padding: "2px 7px", lineHeight: 1.4 }}>{unread}</span>
          )}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {unread > 0 && (
            <button onClick={markAllRead} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button onClick={clearAll} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "white", borderRadius: 8, padding: "7px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Clear all
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 24px" }}>
        {/* Filter tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {Object.entries(TYPE_LABELS).map(([key, label]) => (
            <button key={key} onClick={() => setFilter(key)} style={{ border: `1px solid ${filter === key ? C.blue : C.slate200}`, background: filter === key ? C.blue : C.white, color: filter === key ? C.white : C.slate600, borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>
              {label}
            </button>
          ))}
        </div>

        {/* Notification list */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: C.slate400 }}>
            <div style={{ fontSize: 44, marginBottom: 14 }}>🔔</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: C.slate600 }}>You're all caught up!</p>
            <p style={{ fontSize: 14, marginTop: 6 }}>No notifications to show.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((n) => (
              <div key={n.id} onClick={() => markRead(n.id)} style={{ background: n.read ? C.white : "#EFF6FF", border: `1px solid ${n.read ? C.slate200 : "#BFDBFE"}`, borderRadius: 12, padding: "16px 18px", display: "flex", gap: 14, alignItems: "flex-start", cursor: n.read ? "default" : "pointer", transition: "background 0.2s", position: "relative" }}>
                {/* Icon */}
                <div style={{ width: 40, height: 40, borderRadius: 10, background: n.colorBg, color: n.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {n.icon}
                </div>
                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 14, fontWeight: n.read ? 600 : 700, color: C.slate800 }}>{n.title}</span>
                    {!n.read && <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.blue, flexShrink: 0 }} />}
                  </div>
                  <p style={{ fontSize: 13, color: C.slate600, margin: 0, lineHeight: 1.5 }}>{n.body}</p>
                  <span style={{ fontSize: 12, color: C.slate400, marginTop: 6, display: "block" }}>{n.time}</span>
                </div>
                {/* Dismiss */}
                <button onClick={(e) => { e.stopPropagation(); dismiss(n.id); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.slate300, fontSize: 20, lineHeight: 1, padding: "0 2px", flexShrink: 0 }} title="Dismiss">&times;</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}