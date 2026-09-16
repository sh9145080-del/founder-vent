import React, { useState } from "react";
import AdminPanel from "./admin/AdminPanel.jsx";
import ClientAdminLayout from "./admin/ClientAdminLayout.jsx";
import PublicLandingPageView from "./admin/PublicLandingPageView.jsx";
import { PlatformProvider, usePlatform } from "./context/PlatformContext.jsx";

function AppContent() {
  const {
    currentRole,
    setCurrentRole,
    activeClientId,
    setActiveClientId,
    clients,
    previewModalPage,
    setPreviewModalPage,
  } = usePlatform();

  const [screen, setScreen] = useState("app"); // 'app' | 'admin-login' | 'client-login'

  // If user clicked Logout, show login screen
  if (screen === "admin-login") {
    return (
      <AdminLogin
        onLogin={() => {
          setCurrentRole("admin");
          setScreen("app");
        }}
        onClientLogin={() => setScreen("client-login")}
      />
    );
  }

  if (screen === "client-login") {
    return (
      <ClientLogin
        clients={clients}
        onSelectClient={(cId) => {
          setActiveClientId(cId);
          setCurrentRole("client");
          setScreen("app");
        }}
        onBack={() => setScreen("admin-login")}
      />
    );
  }

  const activeClient = clients.find((c) => c.id === activeClientId) || clients[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Top Universal Environment & Role Switcher Bar */}
      <div
        style={{
          background: "#090d16",
          borderBottom: "1px solid #1e293b",
          color: "#94a3b8",
          padding: "8px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          fontFamily: "Inter, sans-serif",
          zIndex: 1000,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 15 }}>🚀</span>
            <strong style={{ color: "#ffffff", fontWeight: 800 }}>Founder's Vent Platform</strong>
          </div>
          <span style={{ color: "#334155" }}>|</span>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 11, color: "#64748b" }}>Active Role:</span>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                padding: "2px 8px",
                borderRadius: 4,
                background: currentRole === "admin" ? "#4338ca" : "#059669",
                color: "#ffffff",
              }}
            >
              {currentRole === "admin" ? "👑 MAIN ADMIN" : `👤 CLIENT (${activeClient?.brandName})`}
            </span>
          </div>
        </div>

        {/* Quick Switch Buttons for Testing Both Perspectives */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", background: "#1e293b", padding: 3, borderRadius: 6, gap: 2 }}>
            <button
              type="button"
              onClick={() => setCurrentRole("admin")}
              style={{
                padding: "4px 12px",
                borderRadius: 4,
                border: 0,
                background: currentRole === "admin" ? "#4f46e5" : "transparent",
                color: currentRole === "admin" ? "#ffffff" : "#94a3b8",
                fontWeight: 700,
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              👑 Main Admin
            </button>
            <button
              type="button"
              onClick={() => setCurrentRole("client")}
              style={{
                padding: "4px 12px",
                borderRadius: 4,
                border: 0,
                background: currentRole === "client" ? "#059669" : "transparent",
                color: currentRole === "client" ? "#ffffff" : "#94a3b8",
                fontWeight: 700,
                fontSize: 11,
                cursor: "pointer",
              }}
            >
              👤 Client View
            </button>
          </div>

          {/* Client selector dropdown */}
          {currentRole === "client" && (
            <select
              value={activeClientId}
              onChange={(e) => setActiveClientId(e.target.value)}
              style={{
                background: "#1e293b",
                color: "#ffffff",
                border: "1px solid #334155",
                borderRadius: 6,
                padding: "4px 8px",
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.brandName}
                </option>
              ))}
            </select>
          )}

          <button
            type="button"
            onClick={() => setScreen("admin-login")}
            style={{
              padding: "4px 10px",
              background: "transparent",
              border: "1px solid #334155",
              color: "#94a3b8",
              borderRadius: 4,
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            Switch/Logout
          </button>
        </div>
      </div>

      {/* Main View Render */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {currentRole === "admin" ? (
          <AdminPanel
            onLogout={() => setScreen("admin-login")}
            onOpenPreview={(page) => setPreviewModalPage(page)}
            onSwitchToClient={() => setCurrentRole("client")}
          />
        ) : (
          <ClientAdminLayout
            onLogout={() => setScreen("client-login")}
            onOpenPreview={(page) => setPreviewModalPage(page)}
            onSwitchToMainAdmin={() => setCurrentRole("admin")}
          />
        )}
      </div>

      {/* Public Landing Page Interactive Preview Modal */}
      {previewModalPage && (
        <PublicLandingPageView
          page={previewModalPage}
          onClose={() => setPreviewModalPage(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <PlatformProvider>
      <AppContent />
    </PlatformProvider>
  );
}

// ==========================================
// LOGIN SCREENS
// ==========================================

function AdminLogin({ onLogin, onClientLogin }) {
  const [email, setEmail] = useState("admin@founder-vent.com");
  const [password, setPassword] = useState("••••••••");

  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif", padding: 20 }}>
      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 32, maxWidth: 420, width: "100%", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "#111827", color: "#fff", display: "grid", placeItems: "center", fontSize: 20, marginBottom: 16 }}>
          👑
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#111827", margin: "0 0 6px" }}>Main Admin Login</h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 24px", lineHeight: 1.5 }}>
          প্ল্যাটফর্মের সকল ক্লায়েন্ট, ল্যান্ডিং পেজ, ৫টি টেমপ্লেট ও কুরিয়ার ফ্রড চেক পরিচালনা করতে প্রবেশ করুন।
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
              Admin Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "100%", height: 42, padding: "0 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13 }}
            />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", height: 42, padding: "0 12px", border: "1px solid #cbd5e1", borderRadius: 8, fontSize: 13 }}
            />
          </div>

          <button
            type="submit"
            style={{ width: "100%", height: 42, background: "#111827", color: "#fff", border: 0, borderRadius: 8, fontWeight: 800, fontSize: 14, cursor: "pointer", marginBottom: 10 }}
          >
            Login as Main Admin
          </button>

          <button
            type="button"
            onClick={onClientLogin}
            style={{ width: "100%", height: 42, background: "#f1f5f9", color: "#334155", border: "1px solid #cbd5e1", borderRadius: 8, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
          >
            Switch to Client Login →
          </button>
        </form>
      </div>
    </div>
  );
}

function ClientLogin({ clients, onSelectClient, onBack }) {
  return (
    <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", background: "#f8fafc", fontFamily: "Inter, sans-serif", padding: 20 }}>
      <div style={{ background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 32, maxWidth: 440, width: "100%", boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)" }}>
        <div style={{ width: 44, height: 44, borderRadius: 10, background: "#4f46e5", color: "#fff", display: "grid", placeItems: "center", fontSize: 20, marginBottom: 16 }}>
          👤
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 900, color: "#111827", margin: "0 0 6px" }}>Client Portal Login</h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px", lineHeight: 1.5 }}>
          আপনার স্টোরের দৈনিক ৭ দিনের ট্রাফিক, অর্ডার ও কুরিয়ার ফ্রড চেক রেজাল্ট দেখতে লগইন করুন:
        </p>

        <div style={{ display: "grid", gap: 10, marginBottom: 20 }}>
          {clients.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectClient(c.id)}
              style={{
                padding: "12px 14px",
                border: "1px solid #e2e8f0",
                borderRadius: 8,
                background: "#ffffff",
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#4f46e5")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#e2e8f0")}
            >
              <div>
                <strong style={{ display: "block", fontSize: 14, color: "#111827" }}>{c.brandName}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>{c.email}</span>
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#4f46e5" }}>Login →</span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onBack}
          style={{ width: "100%", height: 38, background: "transparent", color: "#64748b", border: "1px solid #cbd5e1", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
        >
          ← Back to Main Admin Login
        </button>
      </div>
    </div>
  );
}
