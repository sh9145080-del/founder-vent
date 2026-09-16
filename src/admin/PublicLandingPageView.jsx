import React, { useState } from "react";
import Template1 from "../templates/Template1";
import Template2 from "../templates/Template2";
import Template3 from "../templates/Template3";
import Template4 from "../templates/Template4";
import Template5 from "../templates/Template5";
import { usePlatform } from "../context/PlatformContext";

const TEMPLATE_COMPONENTS = {
  1: Template1,
  2: Template2,
  3: Template3,
  4: Template4,
  5: Template5,
};

export default function PublicLandingPageView({ page, onClose }) {
  const { clients, trackingSettings, addCustomerOrder } = usePlatform();
  const [orderNotice, setOrderNotice] = useState(null);

  if (!page) return null;

  const client = clients.find((c) => c.id === page.clientId);
  const tracking = trackingSettings[page.clientId] || {};
  const SelectedTemplateComponent = TEMPLATE_COMPONENTS[page.templateId] || Template1;

  const handleOrderSubmit = (orderFormData) => {
    // orderFormData from template
    const newOrder = addCustomerOrder({
      clientId: page.clientId,
      pageId: page.id,
      customerName: orderFormData.name || orderFormData.customer || "Anonymous Customer",
      customerPhone: orderFormData.phone || "01700000000",
      customerAddress: orderFormData.address || "Address not provided",
      productName: page.product?.title || "Product",
      quantity: orderFormData.quantity || 1,
      location: orderFormData.location === "outside" ? "Outside Dhaka" : "Inside Dhaka",
      paymentMethod: orderFormData.paymentMethod || "Cash on Delivery",
      productPrice: (page.product?.price || 1490) * (orderFormData.quantity || 1),
      deliveryCharge: orderFormData.location === "outside" ? (page.product?.delivery?.outsideDhaka || 120) : (page.product?.delivery?.insideDhaka || 70),
      total: orderFormData.total || ((page.product?.price || 1490) * (orderFormData.quantity || 1) + 70),
    });

    setOrderNotice({
      orderId: newOrder.id,
      phone: newOrder.customerPhone,
      fraud: newOrder.fraudCheck,
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "#ffffff",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top Preview Control Bar */}
      <div
        style={{
          background: "#0f172a",
          color: "#ffffff",
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          fontFamily: "Inter, sans-serif",
          fontSize: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
          <span style={{ background: "#4f46e5", padding: "3px 8px", borderRadius: 4, fontWeight: 800 }}>
            PREVIEW MODE
          </span>
          <span style={{ fontWeight: 700 }}>
            {page.pageName} (Template {page.templateId})
          </span>
          <span style={{ color: "#94a3b8" }}>|</span>
          <span style={{ color: "#38bdf8" }}>
            🔗 {client?.domain ? `https://${client.domain}/${page.slug}` : `https://${client?.subdomain || "brand"}.founder-vent.com/${page.slug}`}
          </span>
        </div>

        {/* Tracking Badges Display */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {tracking.metaPixelId ? (
              <span style={{ background: "#1e3a8a", color: "#93c5fd", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                Meta Pixel: {tracking.metaPixelId}
              </span>
            ) : null}
            {tracking.tiktokPixelId ? (
              <span style={{ background: "#334155", color: "#f1f5f9", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                TikTok: {tracking.tiktokPixelId}
              </span>
            ) : null}
            {tracking.ga4Id ? (
              <span style={{ background: "#713f12", color: "#fde047", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                GA4: {tracking.ga4Id}
              </span>
            ) : null}
          </div>

          <button
            onClick={onClose}
            style={{
              padding: "5px 14px",
              background: "#ef4444",
              border: 0,
              borderRadius: 4,
              color: "#fff",
              fontWeight: 800,
              fontSize: 12,
              cursor: "pointer",
            }}
          >
            ✕ Close Preview
          </button>
        </div>
      </div>

      {/* Order Placed Simulation Alert */}
      {orderNotice && (
        <div
          style={{
            background: "#ecfdf5",
            borderBottom: "2px solid #10b981",
            padding: "16px 24px",
            color: "#065f46",
            fontFamily: "Inter, sans-serif",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div>
            <strong style={{ fontSize: 15 }}>🎉 টেস্ট অর্ডার সফলভাবে সম্পন্ন হয়েছে! (Order ID: {orderNotice.orderId})</strong>
            <p style={{ margin: "4px 0 0", fontSize: 13 }}>
              এই অর্ডারটি ক্লায়েন্ট ড্যাশবোর্ড এবং মেইন এডমিন অর্ডারে যুক্ত হয়েছে। কুরিয়ার ফ্রড চেক রেজাল্ট: <strong>{orderNotice.fraud.riskLevel}</strong> ({orderNotice.fraud.successRate}% Success Rate)
            </p>
          </div>
          <button
            onClick={() => setOrderNotice(null)}
            style={{ padding: "4px 10px", background: "#10b981", color: "#fff", border: 0, borderRadius: 4, cursor: "pointer", fontSize: 12, fontWeight: 700 }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Actual Template Rendering */}
      <div style={{ flex: 1 }}>
        <SelectedTemplateComponent
          product={page.product}
          onOrderSubmit={handleOrderSubmit}
        />
      </div>
    </div>
  );
}
