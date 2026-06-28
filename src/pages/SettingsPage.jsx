import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Field from "../components/Field";
import Input from "../components/Input";
import PrimaryBtn from "../components/PrimaryBtn";

const C = {
  blue: "#0b3eac",
  blueBg: "#DCE8FF",
  green: "#16A34A",
  greenBg: "#DCFCE7",
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

const TABS = ["Profile", "Notifications", "Appearance", "Security"];

const Toggle = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    style={{
      width: 44, height: 24, borderRadius: 99, border: "none", cursor: "pointer",
      background: checked ? C.blue : C.slate200,
      position: "relative", transition: "background 0.2s", flexShrink: 0,
    }}
  >
    <span style={{
      position: "absolute", top: 3, left: checked ? 23 : 3,
      width: 18, height: 18, borderRadius: "50%", background: C.white,
      transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
    }} />
  </button>
);

const Section = ({ title, children }) => (
  <div style={{ marginBottom: 32 }}>
    <h2 style={{ fontSize: 15, fontWeight: 700, color: C.slate800, margin: "0 0 16px" }}>{title}</h2>
    <div style={{ background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 12, overflow: "hidden" }}>
      {children}
    </div>
  </div>
);

const Row = ({ label, desc, children, last }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20, padding: "16px 20px", borderBottom: last ? "none" : `1px solid ${C.slate100}` }}>
    <div>
      <div style={{ fontSize: 14, fontWeight: 600, color: C.slate800 }}>{label}</div>
      {desc && <div style={{ fontSize: 12, color: C.slate400, marginTop: 2 }}>{desc}</div>}
    </div>
    <div style={{ flexShrink: 0 }}>{children}</div>
  </div>
);

export default function SettingsPage({ sidebarOpen, onToggleSidebar }) {
  const [activeTab, setActiveTab] = useState("Profile");
  const [saved, setSaved] = useState(false);

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Reynolds",
    email: "s.reynolds@tuxglobal.edu",
    phone: "+1 (555) 012-3456",
    department: "Mathematics",
    bio: "Senior mathematics teacher with 12 years of experience specialising in calculus and applied math.",
  });
  const setP = (k, v) => setProfile((p) => ({ ...p, [k]: v }));

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState({
    newSubmission: true,
    missingSubmission: true,
    attendanceReminder: true,
    gradingReminder: true,
    lowAttendance: true,
    emailDigest: false,
  });
  const setN = (k, v) => setNotifPrefs((p) => ({ ...p, [k]: v }));

  // Appearance
  const [appearance, setAppearance] = useState({
    language: "en",
    timezone: "UTC-5",
    dateFormat: "MM/DD/YYYY",
    compactMode: false,
  });
  const setA = (k, v) => setAppearance((p) => ({ ...p, [k]: v }));

  // Security
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [twoFactor, setTwoFactor] = useState(false);
  const setPw = (k, v) => setPasswords((p) => ({ ...p, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const selectStyle = {
    border: `1px solid ${C.slate200}`, borderRadius: 8, padding: "8px 12px", fontSize: 14,
    color: C.slate800, fontFamily: "'DM Sans', sans-serif", background: C.white, outline: "none",
    cursor: "pointer",
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'DM Sans', sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.blue, padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button type="button" onClick={onToggleSidebar} style={{ width: 34, height: 34, fontSize: 20, color: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "none", borderRadius: 8, background: "none" }}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          <span style={{ color: "white", fontWeight: 700, fontSize: 18 }}>Settings</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {saved && (
            <span style={{ background: C.greenBg, color: C.green, borderRadius: 8, padding: "6px 14px", fontSize: 13, fontWeight: 700 }}>
              ✓ Saved
            </span>
          )}
          <PrimaryBtn variant="outline" onClick={handleSave}>Save Changes</PrimaryBtn>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "28px 24px" }}>
        {/* Tab bar */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.slate200}`, marginBottom: 28 }}>
          {TABS.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: "10px 22px", fontSize: 14, fontWeight: 600, border: "none", background: "none", cursor: "pointer", color: activeTab === tab ? C.blue : C.slate600, borderBottom: activeTab === tab ? `2px solid ${C.blue}` : "2px solid transparent", fontFamily: "'DM Sans', sans-serif", transition: "color 0.15s", marginBottom: -1 }}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── Profile ── */}
        {activeTab === "Profile" && (
          <div>
            {/* Avatar section */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28, padding: "20px 24px", background: C.white, border: `1px solid ${C.slate200}`, borderRadius: 12 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 800, color: C.white, flexShrink: 0 }}>SR</div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: C.slate800, margin: 0 }}>Sarah Reynolds</p>
                <p style={{ fontSize: 13, color: C.slate400, margin: "3px 0 10px" }}>{profile.department} Department</p>
                <button style={{ background: C.blueBg, color: C.blue, border: "none", borderRadius: 7, padding: "6px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Change Photo</button>
              </div>
            </div>

            <Section title="Personal Information">
              <div style={{ padding: "20px 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <Field label="First Name"><Input value={profile.firstName} onChange={(e) => setP("firstName", e.target.value)} /></Field>
                <Field label="Last Name"><Input value={profile.lastName} onChange={(e) => setP("lastName", e.target.value)} /></Field>
                <Field label="Email Address"><Input type="email" value={profile.email} onChange={(e) => setP("email", e.target.value)} /></Field>
                <Field label="Phone Number"><Input value={profile.phone} onChange={(e) => setP("phone", e.target.value)} /></Field>
                <Field label="Department">
                  <Input value={profile.department} onChange={(e) => setP("department", e.target.value)} />
                </Field>
              </div>
              <div style={{ padding: "0 20px 20px" }}>
                <Field label="Bio">
                  <textarea value={profile.bio} onChange={(e) => setP("bio", e.target.value)} rows={3} style={{ width: "100%", border: `1px solid ${C.slate200}`, borderRadius: 8, padding: "9px 12px", fontSize: 14, color: C.slate800, fontFamily: "'DM Sans', sans-serif", outline: "none", resize: "vertical", lineHeight: 1.6 }} onFocus={(e) => (e.target.style.borderColor = C.blue)} onBlur={(e) => (e.target.style.borderColor = C.slate200)} />
                </Field>
              </div>
            </Section>
          </div>
        )}

        {/* ── Notifications ── */}
        {activeTab === "Notifications" && (
          <Section title="Notification Preferences">
            <Row label="New submission received" desc="Get notified when a student submits an assignment">
              <Toggle checked={notifPrefs.newSubmission} onChange={(v) => setN("newSubmission", v)} />
            </Row>
            <Row label="Missing submission alert" desc="Alert when a student misses a deadline">
              <Toggle checked={notifPrefs.missingSubmission} onChange={(v) => setN("missingSubmission", v)} />
            </Row>
            <Row label="Attendance reminder" desc="Daily reminder to mark class attendance">
              <Toggle checked={notifPrefs.attendanceReminder} onChange={(v) => setN("attendanceReminder", v)} />
            </Row>
            <Row label="Grading reminder" desc="Remind me when submissions need grading">
              <Toggle checked={notifPrefs.gradingReminder} onChange={(v) => setN("gradingReminder", v)} />
            </Row>
            <Row label="Low attendance warning" desc="Alert when a student's attendance falls below 75%">
              <Toggle checked={notifPrefs.lowAttendance} onChange={(v) => setN("lowAttendance", v)} />
            </Row>
            <Row label="Weekly email digest" desc="Receive a weekly summary via email" last>
              <Toggle checked={notifPrefs.emailDigest} onChange={(v) => setN("emailDigest", v)} />
            </Row>
          </Section>
        )}

        {/* ── Appearance ── */}
        {activeTab === "Appearance" && (
          <div>
            <Section title="Regional Settings">
              <Row label="Language" desc="Display language for the interface">
                <select value={appearance.language} onChange={(e) => setA("language", e.target.value)} style={selectStyle}>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="es">Español</option>
                  <option value="km">ខ្មែរ</option>
                </select>
              </Row>
              <Row label="Timezone">
                <select value={appearance.timezone} onChange={(e) => setA("timezone", e.target.value)} style={selectStyle}>
                  <option value="UTC-8">Pacific Time (UTC−8)</option>
                  <option value="UTC-5">Eastern Time (UTC−5)</option>
                  <option value="UTC+0">GMT (UTC+0)</option>
                  <option value="UTC+7">Indochina Time (UTC+7)</option>
                  <option value="UTC+8">China Standard (UTC+8)</option>
                </select>
              </Row>
              <Row label="Date Format" last>
                <select value={appearance.dateFormat} onChange={(e) => setA("dateFormat", e.target.value)} style={selectStyle}>
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </Row>
            </Section>

            <Section title="Display">
              <Row label="Compact mode" desc="Show more content with reduced spacing" last>
                <Toggle checked={appearance.compactMode} onChange={(v) => setA("compactMode", v)} />
              </Row>
            </Section>
          </div>
        )}

        {/* ── Security ── */}
        {activeTab === "Security" && (
          <div>
            <Section title="Change Password">
              <div style={{ padding: "20px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                <Field label="Current Password">
                  <Input type="password" value={passwords.current} onChange={(e) => setPw("current", e.target.value)} placeholder="Enter current password" />
                </Field>
                <Field label="New Password">
                  <Input type="password" value={passwords.next} onChange={(e) => setPw("next", e.target.value)} placeholder="At least 8 characters" />
                </Field>
                <Field label="Confirm New Password">
                  <Input type="password" value={passwords.confirm} onChange={(e) => setPw("confirm", e.target.value)} placeholder="Repeat new password" />
                </Field>
                {passwords.next && passwords.confirm && passwords.next !== passwords.confirm && (
                  <p style={{ fontSize: 13, color: C.red, margin: 0 }}>Passwords do not match.</p>
                )}
                <div style={{ paddingTop: 4 }}>
                  <PrimaryBtn onClick={() => setPasswords({ current: "", next: "", confirm: "" })} disabled={!passwords.current || !passwords.next || passwords.next !== passwords.confirm}>
                    Update Password
                  </PrimaryBtn>
                </div>
              </div>
            </Section>

            <Section title="Two-Factor Authentication">
              <Row label="Enable 2FA" desc="Add an extra layer of security to your account" last>
                <Toggle checked={twoFactor} onChange={setTwoFactor} />
              </Row>
            </Section>

            <Section title="Danger Zone">
              <Row label="Sign out of all devices" desc="Revoke all active sessions" last>
                <button style={{ background: C.redBg, color: C.red, border: "none", borderRadius: 8, padding: "7px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Sign Out All</button>
              </Row>
            </Section>
          </div>
        )}
      </div>
    </div>
  );
}