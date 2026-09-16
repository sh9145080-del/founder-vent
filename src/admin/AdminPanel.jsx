import React, { useState } from "react";
import ClientManager from "./ClientManager";
import TemplateManager from "./TemplateManager";
import LandingPageBuilder from "./LandingPageBuilder";
import OrderManager from "./OrderManager";
import EditRequest from "./EditRequest";
import { usePlatform } from "../context/PlatformContext";

export default function AdminPanel({ onLogout, onOpenPreview, onSwitchToClient }) {
  const {
    clients,
    landingPages,
    orders,
    editRequests,
    visitorStats,
    courierConfig,
    setCourierConfig,
    deleteLandingPage,
  } = usePlatform();

  const [activePage, setActivePage] = useState("dashboard");
  const [builderPage, setBuilderPage] = useState(null); // When editing or creating a landing page
  const [isCreatingNewPage, setIsCreatingNewPage] = useState(false);

  // Aggregated 7-Day Visitor Totals across all clients
  const aggregated7DayVisitors = visitorStats.map((item) => {
    let sum = 0;
    clients.forEach((c) => {
      sum += item[c.id] || 0;
    });
    return {
      date: item.displayStr,
      count: sum,
    };
  });
  const totalPlatformVisitors7Days = aggregated7DayVisitors.reduce((sum, d) => sum + d.count, 0);
  const todayTotalVisitors = aggregated7DayVisitors[aggregated7DayVisitors.length - 1]?.count || 0;

  // Order stats across platform
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.orderStatus === "Pending").length;
  const confirmedOrders = orders.filter((o) => o.orderStatus === "Confirmed").length;
  const totalRevenue = orders
    .filter((o) => o.orderStatus !== "Cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const pendingEditRequests = editRequests.filter((r) => r.status === "Pending").length;

  const menuItems = [
    { id: "dashboard", label: "Main Dashboard", icon: "⌂" },
    { id: "clients", label: "Clients Manager", icon: "👥", badge: clients.length },
    { id: "landing-pages", label: "Landing Pages (5 Templates)", icon: "🌐", badge: landingPages.length },
    { id: "orders", label: "All Orders & Fraud Check", icon: "📦", badge: pendingOrders },
    { id: "edit-requests", label: "Edit Requests Queue", icon: "✎", badge: pendingEditRequests },
    { id: "templates", label: "Template Showcase", icon: "🎨" },
    { id: "courier-settings", label: "Steadfast & Settings", icon: "🚚" },
  ];

  const handleEditLandingPage = (page) => {
    setBuilderPage(page);
    setIsCreatingNewPage(false);
    setActivePage("landing-pages");
  };

  const handleCreateNewLandingPage = () => {
    setBuilderPage(null);
    setIsCreatingNewPage(true);
    setActivePage("landing-pages");
  };

  // Courier settings state
  const [apiKey, setApiKey] = useState(courierConfig.apiKey);
  const [secretKey, setSecretKey] = useState(courierConfig.secretKey);
  const [provider, setProvider] = useState(courierConfig.provider);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const handleSaveCourierSettings = (e) => {
    e.preventDefault();
    setCourierConfig((prev) => ({
      ...prev,
      apiKey,
      secretKey,
      provider,
    }));
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#f8fafc", fontFamily: "Inter, sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "#111827",
          color: "#f9fafb",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid #1f2937",
          flexShrink: 0,
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: "20px 20px 16px", borderBottom: "1px solid #1f2937" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                background: "linear-gradient(135deg, #4f46e5, #ec4899)",
                borderRadius: 8,
                display: "grid",
                placeItems: "center",
                fontWeight: 900,
                color: "#fff",
                fontSize: 16,
              }}
            >
              👑
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: 15, fontWeight: 900, color: "#fff" }}>
                Main Admin
              </h1>
              <span style={{ fontSize: 11, color: "#9ca3af" }}>Landing Page Platform</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4, overflowY: "auto" }}>
          {menuItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  if (item.id !== "landing-pages") {
                    setIsCreatingNewPage(false);
                    setBuilderPage(null);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  borderRadius: 6,
                  background: isActive ? "#4f46e5" : "transparent",
                  color: isActive ? "#ffffff" : "#9ca3af",
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
                {item.badge !== undefined && (
                  <span
                    style={{
                      background: isActive ? "#ffffff" : "#374151",
                      color: isActive ? "#4f46e5" : "#e5e7eb",
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

        {/* Footer controls & Switch to client view */}
        <div style={{ padding: 14, borderTop: "1px solid #1f2937" }}>
          <button
            type="button"
            onClick={onSwitchToClient}
            style={{
              width: "100%",
              padding: "9px 12px",
              background: "#1f2937",
              color: "#38bdf8",
              border: "1px solid #374151",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              marginBottom: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <span>👤 Switch to Client View</span>
          </button>

          <button
            type="button"
            onClick={onLogout}
            style={{
              width: "100%",
              padding: "7px 10px",
              background: "transparent",
              color: "#9ca3af",
              border: "1px solid #374151",
              borderRadius: 6,
              fontSize: 11,
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {/* Top Header */}
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 800, background: "#e0e7ff", color: "#4338ca", padding: "3px 8px", borderRadius: 4 }}>
              MAIN ADMIN CONTROLLER
            </span>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>
              {activePage === "dashboard" && "Platform Overview & Total Traffic"}
              {activePage === "clients" && "Client Accounts & Access Management"}
              {activePage === "landing-pages" && "Landing Pages Manager"}
              {activePage === "orders" && "All Orders & Steadfast Courier Fraud"}
              {activePage === "edit-requests" && "Incoming Edit Requests"}
              {activePage === "templates" && "5 Conversion Templates"}
              {activePage === "courier-settings" && "Steadfast Courier & API Configuration"}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={handleCreateNewLandingPage}
              style={{
                padding: "7px 14px",
                background: "#4f46e5",
                color: "#ffffff",
                border: 0,
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span>+ Create Landing Page</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div style={{ flex: 1, paddingBottom: 40 }}>
          {/* 1. DASHBOARD */}
          {activePage === "dashboard" && (
            <div style={{ padding: "20px 28px", maxWidth: 1200, margin: "0 auto" }}>
              {/* Stat Cards */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 24 }}>
                <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                    <span>Total Platform Clients</span>
                    <span>👥</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginTop: 6 }}>{clients.length}</div>
                  <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>সকল ক্লায়েন্ট সক্রিয়</div>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                    <span>Published Landing Pages</span>
                    <span>🌐</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#4f46e5", marginTop: 6 }}>{landingPages.length}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>৫টি টেমপ্লেট ব্যবহারযোগ্য</div>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                    <span>Total 7-Day Visitors</span>
                    <span>📊</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#059669", marginTop: 6 }}>{totalPlatformVisitors7Days}</div>
                  <div style={{ fontSize: 11, color: "#059669", marginTop: 4 }}>আজকের মোট ট্রাফিক: {todayTotalVisitors}</div>
                </div>

                <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "#6b7280", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                    <span>Total Platform Orders</span>
                    <span>📦</span>
                  </div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#111827", marginTop: 6 }}>{totalOrders}</div>
                  <div style={{ fontSize: 11, color: "#4f46e5", marginTop: 4 }}>মোট বিক্রয়: ৳{totalRevenue.toLocaleString()}</div>
                </div>
              </div>

              {/* TOTAL VISITORS 7-DAY AGGREGATED BREAKDOWN */}
              <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 22, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>
                      📈 সকল ক্লায়েন্টের সম্মিলিত ৭ দিনের দৈনিক ভিজিটর ট্র্যাকিং
                    </h3>
                    <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>
                      মেইন এডমিন হিসেবে আপনি সকল ক্লায়েন্টের ল্যান্ডিং পেজে আগত দৈনিক ভিজিটর দেখতে পাচ্ছেন। প্রতিদিনের ট্রাফিক ৭ দিন ধরে সংরক্ষিত থাকে এবং ৭ দিনের বেশি পুরনো ভিজিটর ডাটা স্বয়ংক্রিয়ভাবে ক্লিন হয়ে যায় (অর্ডার ডাটা স্থায়ীভাবে থাকে)।
                    </p>
                  </div>
                  <div style={{ background: "#f3f4f6", padding: "6px 12px", borderRadius: 6, fontSize: 11, fontWeight: 700, color: "#374151" }}>
                    7-Day Rolling Window Active
                  </div>
                </div>

                {/* Aggregated Bar Chart */}
                <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 140, padding: "10px 0 24px", borderBottom: "1px solid #f3f4f6" }}>
                  {aggregated7DayVisitors.map((day, idx) => {
                    const maxVal = Math.max(...aggregated7DayVisitors.map((d) => d.count), 1);
                    const heightPercent = Math.max(15, Math.round((day.count / maxVal) * 95));
                    const isToday = idx === aggregated7DayVisitors.length - 1;

                    return (
                      <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: isToday ? "#4f46e5" : "#374151", marginBottom: 4 }}>
                          {day.count}
                        </span>
                        <div
                          style={{
                            width: "70%",
                            height: `${heightPercent}%`,
                            background: isToday ? "linear-gradient(180deg, #6366f1, #4f46e5)" : "#cbd5e1",
                            borderRadius: "4px 4px 0 0",
                            transition: "height 0.3s ease",
                          }}
                        ></div>
                        <span style={{ fontSize: 11, color: isToday ? "#4f46e5" : "#6b7280", fontWeight: isToday ? 800 : 500, marginTop: 6 }}>
                          {day.date} {isToday && "(Today)"}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Per-Client Visitor Breakdown Table */}
                <div style={{ marginTop: 18 }}>
                  <h4 style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700, color: "#374151" }}>
                    ক্লায়েন্ট অনুযায়ী ট্রাফিক ভাগ:
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                    {clients.map((c) => {
                      const client7DaySum = visitorStats.reduce((sum, item) => sum + (item[c.id] || 0), 0);
                      return (
                        <div key={c.id} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: 12 }}>
                          <div style={{ fontWeight: 800, fontSize: 13, color: "#111827" }}>{c.brandName}</div>
                          <div style={{ fontSize: 11, color: "#6b7280" }}>{c.domain || `${c.subdomain}.founder-vent.com`}</div>
                          <div style={{ marginTop: 6, fontSize: 12, color: "#4f46e5", fontWeight: 700 }}>
                            বিগত ৭ দিনের ভিজিটর: {client7DaySum}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pending Edit Requests Alert Box */}
              {pendingEditRequests > 0 && (
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 20 }}>⚠️</span>
                    <div>
                      <strong style={{ fontSize: 13, color: "#92400e" }}>
                        {pendingEditRequests}টি নতুন এডিট রিকোয়েস্ট জমা হয়েছে!
                      </strong>
                      <p style={{ margin: 0, fontSize: 12, color: "#b45309" }}>
                        ক্লায়েন্টরা তাদের ল্যান্ডিং পেজের প্রাইস বা ইমেজ পরিবর্তনের অনুরোধ পাঠিয়েছেন।
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActivePage("edit-requests")}
                    style={{ padding: "6px 14px", background: "#d97706", color: "#fff", border: 0, borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                  >
                    View Edit Requests →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. CLIENTS MANAGER */}
          {activePage === "clients" && <ClientManager />}

          {/* 3. LANDING PAGES (BUILDER & LIST) */}
          {activePage === "landing-pages" && (
            <div>
              {builderPage || isCreatingNewPage ? (
                <LandingPageBuilder
                  initialPage={builderPage}
                  onBack={() => {
                    setBuilderPage(null);
                    setIsCreatingNewPage(false);
                  }}
                  onOpenPreview={onOpenPreview}
                />
              ) : (
                <div style={{ padding: "20px 28px", maxWidth: 1140, margin: "0 auto" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800, color: "#111827" }}>
                        Landing Pages List
                      </h3>
                      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>
                        মেইন এডমিন হিসেবে আপনি প্রতিটি ক্লায়েন্টের জন্য ৫টি টেমপ্লেট থেকে যেকোনো একটি বেছে নিয়ে ল্যান্ডিং পেজ তৈরি, ইমেজ, প্রাইজ, রিভিউ ও পেমেন্ট সেট করতে পারবেন।
                      </p>
                    </div>

                    <button
                      onClick={handleCreateNewLandingPage}
                      style={{ padding: "8px 18px", background: "#4f46e5", color: "#fff", border: 0, borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
                    >
                      + Create Landing Page
                    </button>
                  </div>

                  <div style={{ display: "grid", gap: 14 }}>
                    {landingPages.map((page) => {
                      const client = clients.find((c) => c.id === page.clientId);
                      const liveUrl = client?.domain
                        ? `https://${client.domain}/${page.slug}`
                        : `https://${client?.subdomain || "shop"}.founder-vent.com/${page.slug}`;

                      return (
                        <div
                          key={page.id}
                          style={{
                            background: "#ffffff",
                            border: "1px solid #e5e7eb",
                            borderRadius: 10,
                            padding: 16,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexWrap: "wrap",
                            gap: 14,
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <div
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 8,
                                background: "#eef2ff",
                                color: "#4f46e5",
                                display: "grid",
                                placeItems: "center",
                                fontWeight: 900,
                                fontSize: 15,
                              }}
                            >
                              T{page.templateId}
                            </div>

                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <h4 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#111827" }}>
                                  {page.pageName}
                                </h4>
                                <span style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 8px", borderRadius: 4, fontWeight: 700, color: "#4f46e5" }}>
                                  Client: {client?.brandName || "Unknown"}
                                </span>
                                <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>
                                  ● {page.status.toUpperCase()}
                                </span>
                              </div>

                              <div style={{ fontSize: 12, color: "#2563eb", marginTop: 4 }}>
                                <code>{liveUrl}</code>
                              </div>

                              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
                                Product: <strong>{page.product?.title}</strong> | Price: <strong>৳{page.product?.price}</strong> (Old: ৳{page.product?.oldPrice})
                              </div>
                            </div>
                          </div>

                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <button
                              type="button"
                              onClick={() => onOpenPreview && onOpenPreview(page)}
                              style={{ padding: "6px 12px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                            >
                              👁️ Live Preview
                            </button>

                            <button
                              type="button"
                              onClick={() => handleEditLandingPage(page)}
                              style={{ padding: "6px 14px", background: "#111827", color: "#fff", border: 0, borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                            >
                              ✏️ Edit Content & Template
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm("Are you sure you want to delete this landing page?")) {
                                  deleteLandingPage(page.id);
                                }
                              }}
                              style={{ padding: "6px 10px", background: "#fee2e2", color: "#dc2626", border: 0, borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. ORDERS & FRAUD CHECK */}
          {activePage === "orders" && <OrderManager />}

          {/* 5. EDIT REQUESTS QUEUE */}
          {activePage === "edit-requests" && (
            <EditRequest onEditLandingPage={handleEditLandingPage} />
          )}

          {/* 6. TEMPLATES SHOWCASE */}
          {activePage === "templates" && <TemplateManager />}

          {/* 7. COURIER & SETTINGS */}
          {activePage === "courier-settings" && (
            <div style={{ padding: "20px 28px", maxWidth: 960, margin: "0 auto" }}>
              <div style={{ marginBottom: 20 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase" }}>
                  Integrations & Courier API
                </span>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "4px 0" }}>
                  Steadfast Courier & Multi-Courier Setup
                </h3>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                  কাস্টমার ল্যান্ডিং পেজে অর্ডার করলে সরাসরি তার ফোন নাম্বার দিয়ে কুরিয়ার ফ্রড চেক (অর্ডার ও ক্যান্সেলেশন হিস্ট্রি) স্বয়ংক্রিয়ভাবে কার্যকর হয়। কনফার্ম করার পর এখানে কনফিগার করা API-তে পার্সেল বুকিং চলে যায়।
                </p>
              </div>

              {settingsSaved && (
                <div style={{ padding: "12px 18px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 8, color: "#065f46", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
                  ✅ Courier Configuration saved successfully!
                </div>
              )}

              <form onSubmit={handleSaveCourierSettings} style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 24 }}>
                <div style={{ display: "grid", gap: 18 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                      Primary Courier Provider:
                    </label>
                    <select
                      value={provider}
                      onChange={(e) => setProvider(e.target.value)}
                      style={{ width: "100%", height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
                    >
                      {courierConfig.supportedCouriers.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                      Steadfast API Key:
                    </label>
                    <input
                      type="text"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      style={{ width: "100%", height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                      Steadfast Secret Key:
                    </label>
                    <input
                      type="password"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                      style={{ width: "100%", height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
                    />
                  </div>

                  <div style={{ background: "#f8fafc", padding: 14, borderRadius: 8, border: "1px solid #e2e8f0" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                      Modular Multi-Courier Expansion Architecture:
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 11, color: "#64748b" }}>
                      বর্তমানে Steadfast Courier সংযুক্ত রয়েছে। ভবিষ্যতে Pathao, RedX ও Paperfly চালু করতে শুধুমাত্র Provider নির্বাচন করলেই অটোমেটিক ফ্রড চেক ও কনসাইনমেন্ট তৈরি হবে।
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      type="submit"
                      style={{ padding: "10px 24px", background: "#4f46e5", color: "#fff", border: 0, borderRadius: 6, fontSize: 13, fontWeight: 700, cursor: "pointer" }}
                    >
                      Save Configuration
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
