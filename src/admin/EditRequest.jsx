import React, { useState } from "react";
import { usePlatform } from "../context/PlatformContext";

export default function EditRequest({ onEditLandingPage }) {
  const {
    currentRole,
    activeClientId,
    getActiveClient,
    landingPages,
    editRequests,
    submitEditRequest,
    updateEditRequestStatus,
  } = usePlatform();

  const client = getActiveClient();
  const clientPages = landingPages.filter((p) => p.clientId === activeClientId);

  const [selectedPageId, setSelectedPageId] = useState(clientPages[0]?.id || "");
  const [requestCategory, setRequestCategory] = useState("Price & Offer Change");
  const [priority, setPriority] = useState("Normal");
  const [message, setMessage] = useState("");
  const [adminNoteInput, setAdminNoteInput] = useState({});
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Relevant requests based on role
  const relevantRequests =
    currentRole === "client"
      ? editRequests.filter((r) => r.clientId === activeClientId)
      : editRequests;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      alert("কী পরিবর্তন প্রয়োজন তা বিস্তারিত লিখুন।");
      return;
    }

    const pageObj = clientPages.find((p) => p.id === selectedPageId) || clientPages[0];

    submitEditRequest({
      clientId: client?.id || "client_1",
      clientName: client?.brandName || "Client",
      pageId: pageObj?.id || "page_1",
      pageName: pageObj?.pageName || "Landing Page",
      category: requestCategory,
      priority,
      message: message.trim(),
    });

    setMessage("");
    setPriority("Normal");
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 3000);
  };

  const handleAdminStatusChange = (reqId, newStatus) => {
    const note = adminNoteInput[reqId] || "";
    updateEditRequestStatus(reqId, newStatus, note);
  };

  return (
    <div style={{ padding: "20px 24px", maxWidth: 1100, margin: "0 auto", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {currentRole === "client" ? "Client Support" : "Main Admin Task Queue"}
        </span>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "4px 0" }}>
          {currentRole === "client" ? "Landing Page Edit Request" : "Client Edit Requests Queue"}
        </h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
          {currentRole === "client"
            ? "আপনার ল্যান্ডিং পেজের কোনো লেখা, ছবি, মূল্য বা অফার পরিবর্তনের প্রয়োজন হলে এখানে বিস্তারিত জানান।"
            : "ক্লায়েন্টদের কাছ থেকে আসা সকল ল্যান্ডিং পেজ এডিট রিকোয়েস্ট পর্যালোচনা ও সম্পন্ন করুন।"}
        </p>
      </div>

      {/* Notice Banner */}
      {currentRole === "client" && (
        <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 8, padding: "14px 18px", display: "flex", gap: 12, marginBottom: 24 }}>
          <span style={{ fontSize: 20 }}>ℹ️</span>
          <div style={{ fontSize: 12, color: "#1e40af", lineHeight: 1.5 }}>
            <strong>Landing Page changes are exclusively managed by Main Admin:</strong>
            <br />
            নিরাপত্তা ও কনভার্সন অপটিমাইজেশন বজায় রাখতে ক্লায়েন্ট সরাসরি কোড বা টেমপ্লেট এডিট করতে পারেন না। আপনার পরিবর্তনের বিবরণ জমা দিন, আমাদের টিম দ্রুত পরিবর্তন কার্যকর করে দেবে।
          </div>
        </div>
      )}

      {submittedSuccess && (
        <div style={{ padding: "12px 18px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 8, color: "#065f46", fontSize: 13, fontWeight: 700, marginBottom: 20 }}>
          ✅ আপনার এডিট রিকোয়েস্ট সফলভাবে জমা হয়েছে! মেইন এডমিন টিম এটি পর্যবেক্ষণ করছে।
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: currentRole === "client" ? "1.2fr 1.8fr" : "1fr", gap: 24 }}>
        {/* CLIENT SUBMISSION FORM (Only shown for client) */}
        {currentRole === "client" && (
          <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 14px", color: "#111827" }}>
              নতুন রিকোয়েস্ট তৈরি করুন
            </h3>

            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gap: 14 }}>
                {/* Select Page */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                    কোন ল্যান্ডিং পেজ পরিবর্তন করবেন:
                  </label>
                  <select
                    value={selectedPageId}
                    onChange={(e) => setSelectedPageId(e.target.value)}
                    style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 8px", fontSize: 12 }}
                  >
                    {clientPages.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.pageName} (Template {p.templateId})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                    পরিবর্তনের ক্যাটাগরি:
                  </label>
                  <select
                    value={requestCategory}
                    onChange={(e) => setRequestCategory(e.target.value)}
                    style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 8px", fontSize: 12 }}
                  >
                    <option value="Price & Offer Change">প্রাইস ও অফার পরিবর্তন (Price / Discount)</option>
                    <option value="Image Update">প্রোডাক্ট ইমেজ পরিবর্তন বা যোগ (Images)</option>
                    <option value="Product Details / Description">টাইটেল বা বিবরণ পরিবর্তন (Text / Highlights)</option>
                    <option value="Customer Reviews">কাস্টমার রিভিউ আপডেট (Reviews)</option>
                    <option value="Delivery / Payment Numbers">ডেলিভারি চার্জ বা পেমেন্ট নাম্বার (Delivery / Payment)</option>
                    <option value="Other Custom Request">অন্যান্য বিশেষ রিকোয়ারমেন্ট</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                    প্রায়োরিটি:
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 8px", fontSize: 12 }}
                  >
                    <option value="Normal">Normal (স্বাভাবিক - ১২-২৪ ঘন্টা)</option>
                    <option value="High">High (জরুরি লাইভ ক্যাম্পেইন)</option>
                  </select>
                </div>

                {/* Detailed Message */}
                <div>
                  <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                    পরিবর্তনের বিস্তারিত বিবরণ লিখুন:
                  </label>
                  <textarea
                    rows={5}
                    placeholder="যেমন: বর্তমান অফার প্রাইজ ১৪৯০ টাকা থেকে কমিয়ে ১২৯০ টাকা করতে হবে। কাউন্টডাউন টাইমার ৮ ঘন্টা সেট করুন এবং ১ম ইমেজ পরিবর্তন করুন..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "10px", fontSize: 12, fontFamily: "inherit" }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: "10px 18px",
                    background: "#4f46e5",
                    color: "#ffffff",
                    border: 0,
                    borderRadius: 6,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(79, 70, 229, 0.25)",
                  }}
                >
                  সাবমিট করুন (Send Request)
                </button>
              </div>
            </form>
          </div>
        )}

        {/* REQUESTS LIST TABLE */}
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 14px", color: "#111827" }}>
            {currentRole === "client" ? "আপনার পূর্ববর্তী রিকোয়েস্ট হিস্ট্রি" : "ক্লায়েন্টদের জমা দেওয়া রিকোয়েস্টসমূহ"}
          </h3>

          {relevantRequests.length === 0 ? (
            <div style={{ padding: 30, textAlign: "center", color: "#9ca3af" }}>
              কোনো এডিট রিকোয়েস্ট পাওয়া যায়নি।
            </div>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              {relevantRequests.map((req) => {
                const isPending = req.status === "Pending";
                const isCompleted = req.status === "Completed";

                return (
                  <div
                    key={req.id}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: 8,
                      padding: 16,
                      background: isPending ? "#fffefc" : "#fafafa",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontWeight: 800, color: "#111827", fontSize: 13 }}>{req.id}</span>
                          <span style={{ fontSize: 11, background: "#f3f4f6", padding: "2px 6px", borderRadius: 4, fontWeight: 600 }}>
                            {req.category}
                          </span>
                          {currentRole === "admin" && (
                            <span style={{ fontSize: 11, color: "#4f46e5", fontWeight: 700 }}>
                              👤 {req.clientName}
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
                          Landing Page: <strong>{req.pageName}</strong> • Date: {req.date}
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "2px 8px",
                            borderRadius: 12,
                            background: isCompleted ? "#dcfce7" : isPending ? "#fef3c7" : "#e0e7ff",
                            color: isCompleted ? "#15803d" : isPending ? "#b45309" : "#4338ca",
                          }}
                        >
                          ● {req.status}
                        </span>
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 700,
                            padding: "2px 6px",
                            borderRadius: 4,
                            background: req.priority === "High" ? "#fee2e2" : "#f3f4f6",
                            color: req.priority === "High" ? "#dc2626" : "#4b5563",
                          }}
                        >
                          {req.priority}
                        </span>
                      </div>
                    </div>

                    <p style={{ margin: "8px 0", fontSize: 12, color: "#374151", background: "#ffffff", padding: "10px 12px", borderRadius: 6, border: "1px solid #f3f4f6", lineHeight: 1.5 }}>
                      {req.message}
                    </p>

                    {req.adminNotes && (
                      <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 6, padding: "8px 12px", fontSize: 11, color: "#065f46", marginTop: 8 }}>
                        <strong>Main Admin Reply:</strong> {req.adminNotes}
                      </div>
                    )}

                    {/* MAIN ADMIN CONTROLS */}
                    {currentRole === "admin" && (
                      <div style={{ marginTop: 12, borderTop: "1px dashed #e5e7eb", paddingTop: 10 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                          {onEditLandingPage && (
                            <button
                              type="button"
                              onClick={() => {
                                const targetPage = landingPages.find((p) => p.id === req.pageId);
                                if (targetPage) onEditLandingPage(targetPage);
                              }}
                              style={{ padding: "5px 12px", background: "#111827", color: "#fff", border: 0, borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                            >
                              🛠️ Open & Edit Page
                            </button>
                          )}

                          <input
                            type="text"
                            placeholder="Admin resolution reply note..."
                            value={adminNoteInput[req.id] || ""}
                            onChange={(e) => setAdminNoteInput({ ...adminNoteInput, [req.id]: e.target.value })}
                            style={{ flex: 1, minWidth: 200, height: 30, border: "1px solid #d1d5db", borderRadius: 4, padding: "0 8px", fontSize: 11 }}
                          />

                          <button
                            type="button"
                            onClick={() => handleAdminStatusChange(req.id, "Completed")}
                            style={{ padding: "5px 10px", background: "#059669", color: "#fff", border: 0, borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                          >
                            ✓ Mark Completed
                          </button>

                          <button
                            type="button"
                            onClick={() => handleAdminStatusChange(req.id, "In Progress")}
                            style={{ padding: "5px 10px", background: "#d97706", color: "#fff", border: 0, borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: "pointer" }}
                          >
                            In Progress
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
