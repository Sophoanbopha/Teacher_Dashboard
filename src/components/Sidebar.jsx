// src/components/Sidebar.jsx
import logo from "../assets/logo.png";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    label: "Classes",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: "Assignments",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: "Attendance",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <polyline points="9 16 11 18 15 14" />
      </svg>
    ),
  },
  {
    label: "Submissions",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 2H6a4 4 0 0 0-4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    label: "Notifications",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
  {
    label: "Settings",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

export default function Sidebar({
  activeItem = "Dashboard",
  onNavigate,
  collapsed = false,
}) {
  return (
    <aside
      style={{
        width: collapsed ? 62 : 216,
        minHeight: "100vh",
        height: "100vh",
        background: "white",
        borderRight: "1px solid #E2E8F0",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'DM Sans', sans-serif",
        position: "sticky",
        top: 0,
        flexShrink: 0,
        alignSelf: "flex-start",
        overflow: "hidden",
        transition: "width 0.22s cubic-bezier(0.4,0,0.2,1)",
      }}
    >
      {/* ── Logo / brand ── */}
      <div
        style={{
          padding: collapsed ? "10px 0" : "10px 20px 10px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 8,
          borderBottom: "1px solid #F1F5F9",
          minHeight: 76,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
            borderRadius: 10,
          }}
        >
          <img
            src={logo}
            alt="TUX Global Institute logo"
            style={{ width: 60, height: 60, objectFit: "contain" }}
          />
        </div>

        {!collapsed && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <p
              style={{
                fontSize: 15,
                fontWeight: 800,
                color: "#0b3eac",
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
              }}
            >
              TUX GLOBAL
            </p>
            <p
              style={{
                fontSize: 11,
                color: "#0b3eac",
                margin: 0,
                fontWeight: 700,
                letterSpacing: "0.06em",
                marginTop: 2,
              }}
            >
              INSTITUTE
            </p>
          </div>
        )}
      </div>

      {/* ── Nav ── */}
      <nav
        style={{
          flex: 1,
          padding: collapsed ? "12px 7px 0" : "12px 12px 0",
          overflow: "hidden",
        }}
      >
        {!collapsed && (
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#94A3B8",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              padding: "8px 8px 4px",
              margin: 0,
            }}
          >
            Workspace
          </p>
        )}

        {NAV_ITEMS.map((item) => {
          const isActive = activeItem === item.label;
          return (
            <div key={item.label} style={{ position: "relative" }}>
              <button
                onClick={() => onNavigate?.(item.label)}
                title={collapsed ? item.label : undefined}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  gap: collapsed ? 0 : 10,
                  padding: collapsed ? "9px 0" : "8px 10px",
                  borderRadius: 8,
                  border: "none",
                  background: isActive ? "#DCE8FF" : "transparent",
                  color: isActive ? "#0b3eac" : "#475569",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  marginBottom: 4,
                  transition: "background 0.15s, color 0.15s",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "#F1F5F9";
                    e.currentTarget.style.color = "#1E293B";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#475569";
                  }
                }}
              >
                <span style={{ flexShrink: 0, display: "flex" }}>
                  {item.icon}
                </span>
                {!collapsed && item.label}
              </button>
            </div>
          );
        })}
      </nav>

      {/* ── Account section ── */}
      <div
        style={{
          padding: collapsed ? "14px 0" : "14px 16px",
          borderTop: "1px solid #F1F5F9",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: collapsed ? 0 : 10,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: "50%",
            background: "#0b3eac",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            color: "#FFFFFF",
            flexShrink: 0,
          }}
        >
          SR
        </div>

        {!collapsed && (
          <div style={{ flex: 1, minWidth: 0, overflow: "hidden" }}>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1E293B",
                margin: 0,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Sarah Reynolds
            </p>
            <p style={{ fontSize: 11, color: "#94A3B8", margin: 0 }}>
              Mathematics Dept.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
