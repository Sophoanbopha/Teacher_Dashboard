import { useState } from "react";
import Sidebar from "./components/Sidebar";
import AssignmentPage from "./pages/AssignmentPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import AttendancePage from "./pages/AttendancePage";
import DashboardPage from "./pages/DashboardPage";
import ClassesPage from "./pages/ClassesPage";
import NotificationsPage from "./pages/NotificationsPage";
import SettingsPage from "./pages/SettingsPage";

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggle = () => setSidebarOpen((open) => !open);
  const pageProps = { sidebarOpen, onToggleSidebar: toggle };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        body { background: #F8FAFC; font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar is always mounted — just collapses to icon-only strip */}
        <Sidebar
          activeItem={activeNav}
          onNavigate={setActiveNav}
          collapsed={!sidebarOpen}
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          {activeNav === "Dashboard"     && <DashboardPage     {...pageProps} />}
          {activeNav === "Classes"       && <ClassesPage       {...pageProps} />}
          {activeNav === "Assignments"   && <AssignmentPage    {...pageProps} />}
          {activeNav === "Attendance"    && <AttendancePage    {...pageProps} />}
          {activeNav === "Submissions"   && <SubmissionsPage   {...pageProps} />}
          {activeNav === "Notifications" && <NotificationsPage {...pageProps} />}
          {activeNav === "Settings"      && <SettingsPage      {...pageProps} />}
        </div>
      </div>
    </>
  );
}