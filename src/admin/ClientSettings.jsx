import React, { useState } from "react";
import { usePlatform } from "../context/PlatformContext";

export default function ClientSettings() {
  const { getActiveClient, trackingSettings, updateClientTracking, updateClientDomain } = usePlatform();
  const client = getActiveClient();
  const currentTracking = trackingSettings[client?.id] || {
    metaPixelId: "",
    tiktokPixelId: "",
    ga4Id: "",
    fbCapiToken: "",
  };

  const [domain, setDomain] = useState(client?.domain || "");
  const [metaPixelId, setMetaPixelId] = useState(currentTracking.metaPixelId || "");
  const [tiktokPixelId, setTiktokPixelId] = useState(currentTracking.tiktokPixelId || "");
  const [ga4Id, setGa4Id] = useState(currentTracking.ga4Id || "");
  const [fbCapiToken, setFbCapiToken] = useState(currentTracking.fbCapiToken || "");

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    if (!client) return;

    updateClientDomain(client.id, domain);
    updateClientTracking(client.id, {
      metaPixelId: metaPixelId.trim(),
      tiktokPixelId: tiktokPixelId.trim(),
      ga4Id: ga4Id.trim(),
      fbCapiToken: fbCapiToken.trim(),
    });

    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  const subdomainUrl = `https://${client?.subdomain || "yourshop"}.founder-vent.com`;

  return (
    <div className="client-settings-container" style={{ padding: "24px 28px", maxWidth: 960, margin: "0 auto", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: "#4f46e5", textTransform: "uppercase" }}>
          Store Configuration
        </span>
        <h2 style={{ fontSize: 24, fontWeight: 800, color: "#111827", margin: "4px 0 8px" }}>
          Settings & Integrations
        </h2>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0, lineHeight: 1.5 }}>
          আপনার কাস্টম ডোমেন এবং ট্র্যাকিং পিক্সেল আইডি এখানে যুক্ত করুন। মেইন এডমিন যখন আপনার ল্যান্ডিং পেজ তৈরি করবেন তখন এই তথ্যগুলো স্বয়ংক্রিয়ভাবে আপনার পেজে সেট হয়ে যাবে।
        </p>
      </div>

      {savedSuccess && (
        <div style={{ padding: "14px 18px", background: "#ecfdf5", border: "1px solid #a7f3d0", borderRadius: 8, color: "#065f46", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
          <span>✅</span>
          <span>আপনার ডোমেন ও ট্র্যাকিং সেটিংস সফলভাবে সেভ হয়েছে! আপনার ল্যান্ডিং পেজে এই ট্র্যাকিং আইডি স্বয়ংক্রিয়ভাবে কাজ করবে।</span>
        </div>
      )}

      <form onSubmit={handleSave}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          {/* OPTION 1: DOMAIN SETTING */}
          <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#eef2ff", color: "#4f46e5", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 16 }}>
                🌐
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>
                  ১. ডোমেইন সেট করার অপশন (Domain Setup)
                </h3>
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  কাস্টম ডোমেন অথবা ডিফল্ট সাবডোমেন কনফিগারেশন
                </span>
              </div>
            </div>

            {/* Subdomain Notice */}
            <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 8, padding: "14px 16px", marginBottom: 18 }}>
              <div style={{ fontSize: 12, color: "#4b5563", marginBottom: 4, fontWeight: 600 }}>
                আপনার ডিফল্ট ফ্রি সাবডোমেন (Free Subdomain):
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
                <code style={{ fontSize: 13, color: "#1d4ed8", background: "#eff6ff", padding: "4px 10px", borderRadius: 6, fontWeight: 700 }}>
                  {subdomainUrl}
                </code>
                <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700, background: "#d1fae5", padding: "3px 8px", borderRadius: 12 }}>
                  Active & SSL Ready
                </span>
              </div>
              <p style={{ fontSize: 11, color: "#6b7280", margin: "6px 0 0" }}>
                যদি নিজস্ব কোনো ডোমেন না থাকে, তবে গ্রাহকরা স্বয়ংক্রিয়ভাবে এই ফ্রি সাবডোমেনের মাধ্যমেই আপনার ল্যান্ডিং পেজে অর্ডার করতে পারবেন।
              </p>
            </div>

            {/* Custom Domain Input */}
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                আপনার নিজস্ব কাস্টম ডোমেন (Optional):
              </label>
              <input
                type="text"
                placeholder="যেমন: shop.yourbrand.com অথবা yourbrand.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                style={{
                  width: "100%",
                  height: 42,
                  padding: "0 14px",
                  border: "1px solid #d1d5db",
                  borderRadius: 8,
                  fontSize: 13,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <div style={{ marginTop: 8, fontSize: 11, color: "#6b7280", lineHeight: 1.5 }}>
                💡 <strong>DNS সেটআপ গাইড:</strong> নিজস্ব ডোমেন কানেক্ট করতে আপনার DNS প্রোভাইডারে গিয়ে একটি <strong>CNAME</strong> রেকর্ড তৈরি করে টার্গেট হিসেবে <code>cname.founder-vent.com</code> বসিয়ে দিন।
              </div>
            </div>
          </div>

          {/* OPTION 2: TRACKING PIXELS & ANALYTICS */}
          <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#fdf2f8", color: "#db2777", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 16 }}>
                📊
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#111827" }}>
                  ২. ট্র্যাকিং অপশন (Tracking Pixels & Analytics)
                </h3>
                <span style={{ fontSize: 12, color: "#6b7280" }}>
                  বিজ্ঞাপন ট্র্যাকিং এবং ভিজিটর এনালিটিক্স আইডি বসানোর ঘর
                </span>
              </div>
            </div>

            <p style={{ fontSize: 12, color: "#4b5563", marginBottom: 18, background: "#fafafa", padding: "10px 14px", borderRadius: 6, borderLeft: "3px solid #6366f1" }}>
              এখানে আপনার ট্র্যাকিং আইডিগুলো বসিয়ে সেভ বাটনে ক্লিক করুন। যখন মেইন এডমিন আপনার ল্যান্ডিং পেজ তৈরি ও আপডেট করবে, তখন এই কোডগুলো পেজে স্বয়ংক্রিয়ভাবে ইনজেক্ট হয়ে ভিজিটর ও পারচেস ডাটা ট্র্যাক করবে।
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
              {/* Meta Pixel */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                  <span>🔵</span> Meta (Facebook) Pixel ID:
                </label>
                <input
                  type="text"
                  placeholder="যেমন: 18294102938471"
                  value={metaPixelId}
                  onChange={(e) => setMetaPixelId(e.target.value)}
                  style={{
                    width: "100%",
                    height: 40,
                    padding: "0 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, display: "block" }}>
                  Facebook Ads Manager থেকে প্রাপ্ত Pixel ID
                </span>
              </div>

              {/* TikTok Pixel */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                  <span>⚫</span> TikTok Pixel ID:
                </label>
                <input
                  type="text"
                  placeholder="যেমন: C912837461928"
                  value={tiktokPixelId}
                  onChange={(e) => setTiktokPixelId(e.target.value)}
                  style={{
                    width: "100%",
                    height: 40,
                    padding: "0 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, display: "block" }}>
                  TikTok Ads Manager থেকে প্রাপ্ত Pixel Code
                </span>
              </div>

              {/* Google Analytics GA4 */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                  <span>🟡</span> Google Analytics 4 (GA4) ID:
                </label>
                <input
                  type="text"
                  placeholder="যেমন: G-XXXXXXXXXX"
                  value={ga4Id}
                  onChange={(e) => setGa4Id(e.target.value)}
                  style={{
                    width: "100%",
                    height: 40,
                    padding: "0 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, display: "block" }}>
                  Google Analytics Measurement ID
                </span>
              </div>

              {/* FB CAPI Token */}
              <div>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 6 }}>
                  <span>🔐</span> Facebook Conversions API (CAPI) Token:
                </label>
                <input
                  type="password"
                  placeholder="EAABw... (Optional for Server-side tracking)"
                  value={fbCapiToken}
                  onChange={(e) => setFbCapiToken(e.target.value)}
                  style={{
                    width: "100%",
                    height: 40,
                    padding: "0 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <span style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, display: "block" }}>
                  সার্ভার-সাইড পারচেস ইভেন্ট ট্র্যাকিংয়ের জন্য টোকেন
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            style={{
              padding: "12px 28px",
              background: "#4f46e5",
              color: "#ffffff",
              border: 0,
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(79, 70, 229, 0.3)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>💾</span>
            <span>সেটিংস সেভ করুন (Save Settings)</span>
          </button>
        </div>
      </form>
    </div>
  );
}
