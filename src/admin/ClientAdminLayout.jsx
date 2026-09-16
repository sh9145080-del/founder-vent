import React, { useState } from "react";
import Dashboard from "./Dashboard";
import OrderManager from "./OrderManager";
import EditRequest from "./EditRequest";
import ClientSettings from "./ClientSettings";
import { usePlatform } from "../context/PlatformContext";

export default function ClientAdminLayout({ onLogout, onOpenPreview, onSwitchToMainAdmin }) {
  const { getActiveClient, orders } = usePlatform();
  const client = getActiveClient();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingOrderCount = orders.filter(
    (o) => o.clientId === client?.id && o.orderStatus === "Pending"
  ).length;

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "⌂" },
    { id: "orders", label: "Orders & Fraud Check", icon: "📦", badge: pendingOrderCount },
    { id: "edit-request", label: "Edit Request", icon: "✎" },
    { id: "settings", label: "Domain & Tracking Settings", icon: "⚙" },
  ];

  const pageTitles = {
    dashboard: "Client Dashboard",
    orders: "Orders & Courier Fraud Check",
    "edit-request": "Landing Page Edit Request",
    settings: "Store Settings (Domain & Tracking)",
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <Dashboard
            onNavigateToOrders={() => setActivePage("orders")}
            onNavigateToEditRequests={() => setActivePage("edit-request")}
            onOpenPreview={onOpenPreview}
          />
        );
      case "orders":
        return <OrderManager />;
      case "edit-request":
        return <EditRequest />;
      case "settings":
        return <ClientSettings />;
      default:
        return <Dashboard onOpenPreview={onOpenPreview} />;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "#0f172a",
          color: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #1e293b",
          flexShrink: 0,
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                background: "linear-gradient(135deg, #4f46e5, #06b6d4)",
                borderRadius: 8,
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                color: "#fff",
                fontSize: 16,
              }}
            >
              C
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#fff" }}>
                {client?.brandName || "Client Portal"}
              </h1>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>Client Workspace</span>
            </div>
          </div>

          <div style={{ marginTop: 12, background: "#1e293b", padding: "6px 10px", borderRadius: 6, fontSize: 11, color: "#38bdf8" }}>
            🔗 {client?.domain || `${client?.subdomain}.founder-vent.com`}
          </div>
        </div>

        {/* Navigation items */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: 6,
                  background: isActive ? "#4f46e5" : "transparent",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  border: 0,
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 15 }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span
                    style={{
                      background: isActive ? "#ffffff" : "#ef4444",
                      color: isActive ? "#4f46e5" : "#ffffff",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "2px 6px",
                      borderRadius: 10,
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Security badge & Switcher */}
        <div style={{ padding: 14, borderTop: "1px solid #1e293b" }}>
          <div style={{ background: "#1e293b", padding: "8px 10px", borderRadius: 6, marginBottom: 10 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#10b981" }}>● SECURE ROLE-BASED</div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>
              Landing page creation & template edits managed exclusively by Main Admin.
            </div>
          </div>

          <button
            type="button"
            onClick={onSwitchToMainAdmin}
            style={{
              width: "100%",
              padding: "8px 10px",
              background: "#334155",
              color: "#f1f5f9",
              border: 0,
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 6,
            }}
          >
            🛡️ Switch to Main Admin View
          </button>

          <button
            type="button"
            onClick={onLogout}
            style={{
              width: "100%",
              padding: "7px 10px",
              background: "transparent",
              color: "#94a3b8",
              border: "1px solid #334155",
              borderRadius: 6,
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {/* Top Navbar */}
        <header
          style={{
            height: 56,
            background: "#ffffff",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            position: "sticky",
            top: 0,
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#111827" }}>
              {pageTitles[activePage] || "Client Dashboard"}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Logged in: <strong>{client?.name}</strong>
            </span>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#e2e8f0",
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 700,
                color: "#475569",
              }}
            >
              {client?.name?.charAt(0) || "U"}
            </div>
          </div>
        </header>

        {/* Page Render */}
        <div style={{ flex: 1, paddingBottom: 40 }}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
