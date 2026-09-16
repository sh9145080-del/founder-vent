import React, { useState } from "react";
import { usePlatform } from "../context/PlatformContext";

export default function Dashboard({ onNavigateToOrders, onNavigateToEditRequests, onOpenPreview }) {
  const {
    getActiveClient,
    landingPages,
    orders,
    visitorStats,
    submitEditRequest,
  } = usePlatform();

  const client = getActiveClient();
  const clientPages = landingPages.filter((p) => p.clientId === client?.id);
  const clientOrders = orders.filter((o) => o.clientId === client?.id);

  // Edit Request Modal State
  const [modalPage, setModalPage] = useState(null);
  const [reqCategory, setReqCategory] = useState("Product Information");
  const [reqPriority, setReqPriority] = useState("Normal");
  const [reqMessage, setReqMessage] = useState("");
  const [submitNotice, setSubmitNotice] = useState(false);

  // 7-day visitor data calculation for this client
  const last7DaysVisitors = visitorStats.map((item) => ({
    date: item.displayStr,
    count: item[client?.id] || 0,
  }));
  const total7DayVisitors = last7DaysVisitors.reduce((sum, d) => sum + d.count, 0);
  const todayVisitors = last7DaysVisitors[last7DaysVisitors.length - 1]?.count || 0;

  // Order stats
  const pendingOrders = clientOrders.filter((o) => o.orderStatus === "Pending").length;
  const confirmedOrders = clientOrders.filter((o) => o.orderStatus === "Confirmed").length;
  const totalSales = clientOrders
    .filter((o) => o.orderStatus !== "Cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const handleSubmitEditRequest = (e) => {
    e.preventDefault();
    if (!reqMessage.trim()) {
      alert("দয়া করে কী পরিবর্তন চান তা বিস্তারিত লিখুন।");
      return;
    }

    submitEditRequest({
      clientId: client.id,
      clientName: client.brandName,
      pageId: modalPage.id,
      pageName: modalPage.pageName,
      category: reqCategory,
      priority: reqPriority,
      message: reqMessage.trim(),
    });

    setSubmitNotice(true);
    setTimeout(() => {
      setSubmitNotice(false);
      setModalPage(null);
      setReqMessage("");
    }, 1800);
  };

  return (
    <div style={{ padding: "20px 24px", maxWidth: 1180, margin: "0 auto", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Client Dashboard
          </span>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", margin: "4px 0" }}>
            স্বাগতম, {client?.brandName || "Client"} 👋
          </h2>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
            আপনার ল্যান্ডিং পেজের বর্তমান ট্রাফিক, অর্ডার হিস্ট্রি ও স্ট্যাটাস এক নজরে দেখুন।
          </p>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, padding: "8px 14px", textAlign: "right" }}>
          <span style={{ fontSize: 11, color: "#9ca3af", display: "block" }}>STORE DOMAIN</span>
          <strong style={{ fontSize: 13, color: "#111827" }}>
            {client?.domain || `${client?.subdomain || "shop"}.founder-vent.com`}
          </strong>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, marginBottom: 24 }}>
        {/* Visitors 7-day */}
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18, position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>
              Today Visitors
            </span>
            <span style={{ fontSize: 10, background: "#eef2ff", color: "#4f46e5", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
              Live Count
            </span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#4f46e5", marginTop: 6 }}>
            {todayVisitors}
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
            বিগত ৭ দিনে মোট: <strong>{total7DayVisitors}</strong> জন
          </div>
        </div>

        {/* Total Orders */}
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>
              Total Orders
            </span>
            <span style={{ fontSize: 10, background: "#ecfdf5", color: "#059669", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
              Lifetime
            </span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#111827", marginTop: 6 }}>
            {clientOrders.length}
          </div>
          <div style={{ fontSize: 11, color: "#059669", marginTop: 4 }}>
            কনফার্মড / ডেলিভারড: <strong>{confirmedOrders}</strong>
          </div>
        </div>

        {/* Pending Orders */}
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#d97706", textTransform: "uppercase" }}>
              Pending Orders
            </span>
            <span style={{ fontSize: 10, background: "#fef3c7", color: "#d97706", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
              Action Needed
            </span>
          </div>
          <div style={{ fontSize: 26, fontWeight: 900, color: "#d97706", marginTop: 6 }}>
            {pendingOrders}
          </div>
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 4 }}>
            কুরিয়ার ফ্রড চেক করে কনফার্ম করুন
          </div>
        </div>

        {/* Total Sales */}
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 18 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>
              Total Revenue
            </span>
            <span style={{ fontSize: 10, background: "#f3f4f6", color: "#4b5563", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
              BDT (৳)
            </span>
          </div>
          <div style={{ fontSize: 24, fontWeight: 900, color: "#111827", marginTop: 6 }}>
            ৳{totalSales.toLocaleString()}
          </div>
          <div style={{ fontSize: 11, color: "#10b981", marginTop: 4 }}>
            অর্ডারের ডাটা আজীবন সংরক্ষিত থাকবে
          </div>
        </div>
      </div>

      {/* SECTION 1: VISITOR TRACKING & RETENTION NOTICE */}
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>
                📊 ৭ দিনের দৈনিক ভিজিটর ট্র্যাকিং (7-Day Visitor Activity)
              </h3>
              <span style={{ background: "#dbeafe", color: "#1e40af", fontSize: 11, padding: "2px 8px", borderRadius: 12, fontWeight: 700 }}>
                Auto-Purge 7 Days Active
              </span>
            </div>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>
              আপনার ল্যান্ডিং পেজে প্রতিদিন কতজন ভিজিটর আসছে তা নিচে ট্র্যাক হচ্ছে। প্ল্যাটফর্মের পারফরম্যান্স ও স্পিড বজায় রাখতে ৭ দিনের বেশি পুরনো ভিজিটর ডাটা স্বয়ংক্রিয়ভাবে ক্লিন হয়ে যায়।
            </p>
          </div>

          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", padding: "6px 12px", borderRadius: 6, fontSize: 11, color: "#166534", fontWeight: 600 }}>
            🛡️ অর্ডার ডাটা সম্পূর্ণ নিরাপদ ও আজীবন সংরক্ষিত থাকে
          </div>
        </div>

        {/* 7-Day Bar Chart */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120, padding: "10px 0 24px", borderBottom: "1px solid #f3f4f6" }}>
          {last7DaysVisitors.map((day, idx) => {
            const maxVal = Math.max(...last7DaysVisitors.map((d) => d.count), 1);
            const heightPercent = Math.max(15, Math.round((day.count / maxVal) * 90));
            const isToday = idx === last7DaysVisitors.length - 1;

            return (
              <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: isToday ? "#4f46e5" : "#4b5563", marginBottom: 4 }}>
                  {day.count}
                </span>
                <div
                  style={{
                    width: "80%",
                    height: `${heightPercent}%`,
                    background: isToday ? "#4f46e5" : "#cbd5e1",
                    borderRadius: "4px 4px 0 0",
                    transition: "height 0.3s ease",
                  }}
                ></div>
                <span style={{ fontSize: 10, color: isToday ? "#4f46e5" : "#9ca3af", fontWeight: isToday ? 800 : 500, marginTop: 6 }}>
                  {day.date} {isToday && "(Today)"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: CLIENT LANDING PAGES & EDIT REQUEST BUTTON */}
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20, marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>
              🌐 আপনার সক্রিয় ল্যান্ডিং পেজসমূহ (Your Landing Pages)
            </h3>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#6b7280" }}>
              ক্লায়েন্ট নিরাপত্তা নীতিমালা: ল্যান্ডিং পেজ তৈরি ও টেমপ্লেট পরিবর্তন মেইন এডমিন টিম দ্বারা পরিচালিত হয়। যেকোনো পরিবর্তনের জন্য পাশের Edit Request বাটন ব্যবহার করুন।
            </p>
          </div>
        </div>

        {clientPages.length === 0 ? (
          <div style={{ padding: 30, textAlign: "center", color: "#9ca3af", background: "#f9fafb", borderRadius: 8 }}>
            আপনার একাউন্টে বর্তমানে কোনো ল্যান্ডিং পেজ তৈরি করা হয়নি। মেইন এডমিন টিম শিগগিরই একটি তৈরি করে দেবে।
          </div>
        ) : (
          <div style={{ display: "grid", gap: 14 }}>
            {clientPages.map((page) => {
              const liveUrl = client?.domain
                ? `https://${client.domain}/${page.slug}`
                : `https://${client?.subdomain || "brand"}.founder-vent.com/${page.slug}`;

              return (
                <div
                  key={page.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: 8,
                    padding: 16,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 12,
                    background: "#fdfdfd",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        background: "#e0e7ff",
                        color: "#4338ca",
                        display: "grid",
                        placeItems: "center",
                        fontWeight: 800,
                        fontSize: 14,
                      }}
                    >
                      T{page.templateId}
                    </div>

                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <h4 style={{ margin: 0, fontSize: 14, fontWeight: 800, color: "#111827" }}>
                          {page.pageName}
                        </h4>
                        <span style={{ fontSize: 10, background: "#dcfce7", color: "#15803d", padding: "2px 6px", borderRadius: 4, fontWeight: 700 }}>
                          ● LIVE
                        </span>
                        <span style={{ fontSize: 11, color: "#6b7280" }}>
                          Template {page.templateId}
                        </span>
                      </div>

                      <div style={{ marginTop: 4, display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#2563eb" }}>
                        <span>🔗</span>
                        <code>{liveUrl}</code>
                      </div>
                    </div>
                  </div>

                  {/* ACTION BUTTONS: Preview + Edit Request */}
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <button
                      type="button"
                      onClick={() => onOpenPreview && onOpenPreview(page)}
                      style={{
                        padding: "8px 14px",
                        background: "#f3f4f6",
                        color: "#1f2937",
                        border: "1px solid #d1d5db",
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <span>👁️ Live Preview</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setModalPage(page)}
                      style={{
                        padding: "8px 16px",
                        background: "#4f46e5",
                        color: "#ffffff",
                        border: 0,
                        borderRadius: 6,
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        boxShadow: "0 2px 6px rgba(79, 70, 229, 0.25)",
                      }}
                    >
                      <span>✏️ Edit Request</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 3: RECENT ORDERS SNAPSHOT WITH STEADFAST FRAUD CHECK */}
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, color: "#111827" }}>
              📦 সাম্প্রতিক অর্ডার ও কুরিয়ার ফ্রড চেক (Recent Orders)
            </h3>
            <span style={{ fontSize: 12, color: "#6b7280" }}>
              Steadfast Courier Fraud Check দ্বারা ভেরিফাইড
            </span>
          </div>

          <button
            type="button"
            onClick={onNavigateToOrders}
            style={{
              background: "none",
              border: 0,
              color: "#4f46e5",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            View All Orders →
          </button>
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          {clientOrders.slice(0, 4).map((order) => {
            const fraud = order.fraudCheck || { riskLevel: "Safe", successRate: 100 };
            return (
              <div
                key={order.id}
                style={{
                  border: "1px solid #f3f4f6",
                  borderRadius: 6,
                  padding: "10px 14px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong style={{ fontSize: 13, color: "#111827" }}>{order.id}</strong>
                    <span style={{ fontSize: 11, color: "#6b7280" }}>{order.customerName} ({order.customerPhone})</span>
                  </div>
                  <div style={{ fontSize: 11, color: "#4b5563", marginTop: 2 }}>
                    {order.productName} • <strong>৳{order.total}</strong> ({order.paymentMethod})
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: fraud.riskLevel === "High Risk" ? "#fee2e2" : "#ecfdf5",
                      color: fraud.riskLevel === "High Risk" ? "#dc2626" : "#059669",
                    }}
                  >
                    {fraud.riskLevel === "Safe" ? "✅ Safe" : fraud.riskLevel} ({fraud.successRate}%)
                  </span>

                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: 4,
                      background: order.orderStatus === "Confirmed" ? "#d1fae5" : "#fef3c7",
                      color: order.orderStatus === "Confirmed" ? "#065f46" : "#92400e",
                    }}
                  >
                    {order.orderStatus}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDIT REQUEST MODAL */}
      {modalPage && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "grid",
            placeItems: "center",
            padding: 20,
          }}
        >
          <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, maxWidth: 540, width: "100%", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase" }}>
                  Main Admin Support
                </span>
                <h3 style={{ margin: "2px 0 0", fontSize: 17, fontWeight: 800, color: "#111827" }}>
                  Submit Edit Request
                </h3>
              </div>
              <button
                onClick={() => setModalPage(null)}
                style={{ background: "none", border: 0, fontSize: 18, cursor: "pointer", color: "#6b7280" }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 16px" }}>
              <strong>ল্যান্ডিং পেজ:</strong> {modalPage.pageName} ({modalPage.slug})
              <br />
              আপনার যা যা পরিবর্তন প্রয়োজন তা বিস্তারিত লিখে সাবমিট করুন। মেইন এডমিন রিকুয়েসমেন্ট অনুযায়ী পেজ এডিট করে দেবে।
            </p>

            {submitNotice && (
              <div style={{ padding: "10px 14px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 6, color: "#065f46", fontSize: 12, fontWeight: 700, marginBottom: 14 }}>
                ✅ আপনার এডিট রিকোয়েস্ট মেইন এডমিনের কাছে সফলভাবে পৌঁছেছে!
              </div>
            )}

            <form onSubmit={handleSubmitEditRequest}>
              <div style={{ display: "grid", gap: 14, marginBottom: 18 }}>
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                    পরিবর্তনের ধরণ (Category):
                  </label>
                  <select
                    value={reqCategory}
                    onChange={(e) => setReqCategory(e.target.value)}
                    style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 8px", fontSize: 12 }}
                  >
                    <option value="Price & Offer Change">প্রাইস ও অফার পরিবর্তন (Price & Discount)</option>
                    <option value="Image Update">প্রোডাক্টের ছবি পরিবর্তন/যোগ (Images Gallery)</option>
                    <option value="Product Details / Description">টাইটেল বা বিবরণ পরিবর্তন (Text / Content)</option>
                    <option value="Customer Reviews">কাস্টমার রিভিউ যোগ বা পরিবর্তন (Reviews)</option>
                    <option value="Delivery / Payment Numbers">ডেলিভারি চার্জ বা বিকাশ/নগদ নাম্বার (Delivery / Payment)</option>
                    <option value="Other Custom Request">অন্যান্য পরিবর্তন (Other)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                    জরুরি অবস্থা (Priority):
                  </label>
                  <select
                    value={reqPriority}
                    onChange={(e) => setReqPriority(e.target.value)}
                    style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 8px", fontSize: 12 }}
                  >
                    <option value="Normal">স্বাভাবিক (Normal - 12 to 24 Hours)</option>
                    <option value="High">জরুরি (High - Urgent Campaign Launch)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                    কী পরিবর্তন চান বিস্তারিত লিখুন (Requirements):
                  </label>
                  <textarea
                    rows={4}
                    placeholder="যেমন: প্রোডাক্টের অফার প্রাইজ ১৫০০ থেকে কমিয়ে ১২৫০ টাকা করুন এবং অফার কাউন্টডাউন ৬ ঘন্টা সেট করুন..."
                    value={reqMessage}
                    onChange={(e) => setReqMessage(e.target.value)}
                    style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 10px", fontSize: 12, fontFamily: "inherit" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setModalPage(null)}
                  style={{ padding: "8px 16px", background: "#f3f4f6", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "8px 20px", background: "#4f46e5", color: "#fff", border: 0, borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
