import React, { useMemo, useState } from "react";
import { usePlatform } from "../context/PlatformContext";

export default function OrderManager() {
  const {
    currentRole,
    activeClientId,
    orders,
    confirmOrderWithCourier,
    cancelOrderStrict,
    courierConfig,
  } = usePlatform();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [actionAlert, setActionAlert] = useState(null);

  // If in client role, show orders for that client; if in admin role, show all
  const relevantOrders = useMemo(() => {
    if (currentRole === "client") {
      return orders.filter((o) => o.clientId === activeClientId);
    }
    return orders;
  }, [orders, currentRole, activeClientId]);

  const filteredOrders = useMemo(() => {
    return relevantOrders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.customerPhone.includes(search);

      const matchesFilter = filter === "All" || order.orderStatus === filter;
      return matchesSearch && matchesFilter;
    });
  }, [relevantOrders, search, filter]);

  const pendingCount = relevantOrders.filter((o) => o.orderStatus === "Pending").length;
  const confirmedCount = relevantOrders.filter((o) => o.orderStatus === "Confirmed").length;
  const cancelledCount = relevantOrders.filter((o) => o.orderStatus === "Cancelled").length;
  const totalRevenue = relevantOrders
    .filter((o) => o.orderStatus !== "Cancelled")
    .reduce((sum, o) => sum + (o.total || 0), 0);

  const handleConfirmAndSendCourier = (order) => {
    confirmOrderWithCourier(order.id);
    setActionAlert({
      type: "success",
      message: `অর্ডার ${order.id} কনফার্ম করা হয়েছে এবং ${courierConfig.provider}-এ স্বয়ংক্রিয়ভাবে বুকিং সম্পন্ন হয়েছে!`,
    });
    setTimeout(() => setActionAlert(null), 4000);
  };

  const handleCancelStrict = (order) => {
    cancelOrderStrict(order.id);
    setActionAlert({
      type: "cancel",
      message: `অর্ডার ${order.id} ক্যান্সেল করা হয়েছে। কোনো প্রকার Courier Entry তৈরি হবে না।`,
    });
    setTimeout(() => setActionAlert(null), 4000);
  };

  return (
    <div style={{ padding: "20px 24px", maxWidth: 1200, margin: "0 auto", fontFamily: "Inter, sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Order Management & Courier Automation
          </span>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: "4px 0" }}>
            Orders & Steadfast Fraud Check
          </h2>
          <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
            প্রতিটি অর্ডারের সাথে কাস্টমারের পূর্ববর্তী পার্সেল হিস্ট্রি (অর্ডার সংখ্যা, ডেলিভারি ও ক্যান্সেলেশন রেট) স্বয়ংক্রিয়ভাবে যাচাই হচ্ছে।
          </p>
        </div>

        {/* Courier Provider Badge */}
        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", display: "inline-block" }}></span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>
            Connected: {courierConfig.provider} (Auto API)
          </span>
        </div>
      </div>

      {/* Action Notification */}
      {actionAlert && (
        <div
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            marginBottom: 18,
            fontSize: 13,
            fontWeight: 600,
            background: actionAlert.type === "success" ? "#ecfdf5" : "#fef2f2",
            border: actionAlert.type === "success" ? "1px solid #a7f3d0" : "1px solid #fecaca",
            color: actionAlert.type === "success" ? "#065f46" : "#991b1b",
          }}
        >
          {actionAlert.message}
        </div>
      )}

      {/* Summary KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 20 }}>
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#6b7280", textTransform: "uppercase" }}>Total Orders</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#111827", marginTop: 4 }}>{relevantOrders.length}</div>
          <span style={{ fontSize: 11, color: "#10b981", fontWeight: 600 }}>Lifetime Kept</span>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#d97706", textTransform: "uppercase" }}>Pending Orders</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#d97706", marginTop: 4 }}>{pendingCount}</div>
          <span style={{ fontSize: 11, color: "#d97706", fontWeight: 600 }}>Fraud Check Ready</span>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#059669", textTransform: "uppercase" }}>Confirmed / Dispatched</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#059669", marginTop: 4 }}>{confirmedCount}</div>
          <span style={{ fontSize: 11, color: "#059669", fontWeight: 600 }}>Sent to Courier</span>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", textTransform: "uppercase" }}>Cancelled (Safe)</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#dc2626", marginTop: 4 }}>{cancelledCount}</div>
          <span style={{ fontSize: 11, color: "#dc2626", fontWeight: 600 }}>No Courier Cost</span>
        </div>

        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#4f46e5", textTransform: "uppercase" }}>Total Sales</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#4f46e5", marginTop: 4 }}>৳{totalRevenue.toLocaleString()}</div>
          <span style={{ fontSize: 11, color: "#6b7280" }}>Active Value</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {["All", "Pending", "Confirmed", "Cancelled"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 14px",
                borderRadius: 6,
                border: filter === f ? "1px solid #4f46e5" : "1px solid #d1d5db",
                background: filter === f ? "#eef2ff" : "#ffffff",
                color: filter === f ? "#4f46e5" : "#4b5563",
                fontWeight: filter === f ? 700 : 500,
                fontSize: 12,
                cursor: "pointer",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div style={{ width: 280 }}>
          <input
            type="text"
            placeholder="Search by ID, Name or Phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              height: 36,
              padding: "0 10px",
              border: "1px solid #d1d5db",
              borderRadius: 6,
              fontSize: 12,
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: 12 }}>
            <thead>
              <tr style={{ background: "#f9fafb", borderBottom: "1px solid #e5e7eb", color: "#4b5563", fontWeight: 700 }}>
                <th style={{ padding: "12px 14px" }}>Order ID & Date</th>
                <th style={{ padding: "12px 14px" }}>Customer Details</th>
                <th style={{ padding: "12px 14px" }}>Product & Amount</th>
                <th style={{ padding: "12px 14px", minWidth: 220 }}>Steadfast Courier Fraud Check</th>
                <th style={{ padding: "12px 14px" }}>Status</th>
                <th style={{ padding: "12px 14px", textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "30px", textAlign: "center", color: "#9ca3af" }}>
                    কোনো অর্ডার পাওয়া যায়নি।
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => {
                  const fraud = order.fraudCheck || {
                    totalOrders: 0,
                    delivered: 0,
                    cancelled: 0,
                    successRate: 100,
                    riskLevel: "New Customer",
                  };

                  let riskColor = "#059669";
                  let riskBg = "#ecfdf5";
                  let riskBorder = "#a7f3d0";
                  if (fraud.riskLevel === "High Risk") {
                    riskColor = "#dc2626";
                    riskBg = "#fef2f2";
                    riskBorder = "#fecaca";
                  } else if (fraud.riskLevel === "Moderate Risk") {
                    riskColor = "#d97706";
                    riskBg = "#fffbeb";
                    riskBorder = "#fde68a";
                  } else if (fraud.riskLevel === "New Customer") {
                    riskColor = "#2563eb";
                    riskBg = "#eff6ff";
                    riskBorder = "#bfdbfe";
                  }

                  return (
                    <tr key={order.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                      {/* ID & Date */}
                      <td style={{ padding: "12px 14px", verticalAlign: "top" }}>
                        <div style={{ fontWeight: 800, color: "#111827" }}>{order.id}</div>
                        <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>{order.date}</div>
                        {order.courierTrackingId && (
                          <div style={{ marginTop: 4, display: "inline-block", background: "#f0fdf4", color: "#166534", padding: "1px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>
                            Track: {order.courierTrackingId}
                          </div>
                        )}
                      </td>

                      {/* Customer Info */}
                      <td style={{ padding: "12px 14px", verticalAlign: "top" }}>
                        <strong style={{ color: "#111827", fontSize: 13, display: "block" }}>{order.customerName}</strong>
                        <span style={{ color: "#4f46e5", fontWeight: 700, fontSize: 12 }}>{order.customerPhone}</span>
                        <p style={{ margin: "2px 0 0", color: "#6b7280", fontSize: 11, maxWidth: 180 }}>
                          {order.customerAddress}
                        </p>
                      </td>

                      {/* Product & Price */}
                      <td style={{ padding: "12px 14px", verticalAlign: "top" }}>
                        <div style={{ fontWeight: 600, color: "#111827" }}>
                          {order.productName} × {order.quantity}
                        </div>
                        <div style={{ fontWeight: 800, color: "#111827", marginTop: 2 }}>৳{order.total}</div>
                        <div style={{ fontSize: 10, color: "#6b7280" }}>
                          {order.paymentMethod} ({order.location})
                        </div>
                      </td>

                      {/* Steadfast Courier Fraud Check Box */}
                      <td style={{ padding: "12px 14px", verticalAlign: "top" }}>
                        <div
                          style={{
                            background: riskBg,
                            border: `1px solid ${riskBorder}`,
                            borderRadius: 6,
                            padding: "8px 10px",
                          }}
                        >
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: riskColor, textTransform: "uppercase" }}>
                              {fraud.riskLevel === "Safe" && "✅ "}
                              {fraud.riskLevel === "High Risk" && "⚠️ "}
                              {fraud.riskLevel === "Moderate Risk" && "⚡ "}
                              {fraud.riskLevel === "New Customer" && "ℹ️ "}
                              {fraud.riskLevel}
                            </span>
                            <span style={{ fontSize: 11, fontWeight: 800, color: riskColor }}>
                              {fraud.successRate}% Success
                            </span>
                          </div>

                          <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#374151" }}>
                            <span>অর্ডার: <strong>{fraud.totalOrders}</strong></span>
                            <span style={{ color: "#059669" }}>ডেলিভারি: <strong>{fraud.delivered}</strong></span>
                            <span style={{ color: "#dc2626" }}>ক্যান্সেল: <strong>{fraud.cancelled}</strong></span>
                          </div>

                          {fraud.note && (
                            <div style={{ fontSize: 10, color: "#4b5563", marginTop: 4, borderTop: "1px dashed rgba(0,0,0,0.1)", paddingTop: 3 }}>
                              {fraud.note}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Status */}
                      <td style={{ padding: "12px 14px", verticalAlign: "top" }}>
                        <span
                          style={{
                            display: "inline-block",
                            padding: "3px 8px",
                            borderRadius: 12,
                            fontSize: 11,
                            fontWeight: 700,
                            background:
                              order.orderStatus === "Confirmed"
                                ? "#d1fae5"
                                : order.orderStatus === "Cancelled"
                                ? "#fee2e2"
                                : "#fef3c7",
                            color:
                              order.orderStatus === "Confirmed"
                                ? "#065f46"
                                : order.orderStatus === "Cancelled"
                                ? "#991b1b"
                                : "#92400e",
                          }}
                        >
                          {order.orderStatus}
                        </span>
                        <div style={{ fontSize: 10, color: "#6b7280", marginTop: 4 }}>
                          {order.courierStatus}
                        </div>
                      </td>

                      {/* Action Buttons */}
                      <td style={{ padding: "12px 14px", verticalAlign: "top", textAlign: "right" }}>
                        {order.orderStatus === "Pending" ? (
                          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
                            <button
                              onClick={() => handleConfirmAndSendCourier(order)}
                              style={{
                                padding: "6px 12px",
                                background: "#059669",
                                color: "#ffffff",
                                border: 0,
                                borderRadius: 6,
                                fontWeight: 700,
                                fontSize: 11,
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                whiteSpace: "nowrap",
                              }}
                            >
                              <span>🚀 Confirm & Send to Courier</span>
                            </button>

                            <button
                              onClick={() => handleCancelStrict(order)}
                              style={{
                                padding: "5px 12px",
                                background: "#fee2e2",
                                color: "#dc2626",
                                border: "1px solid #fecaca",
                                borderRadius: 6,
                                fontWeight: 700,
                                fontSize: 11,
                                cursor: "pointer",
                                whiteSpace: "nowrap",
                              }}
                            >
                              ✕ Cancel (No Courier)
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setSelectedOrder(order)}
                            style={{
                              padding: "5px 10px",
                              background: "#f3f4f6",
                              color: "#374151",
                              border: "1px solid #d1d5db",
                              borderRadius: 4,
                              fontSize: 11,
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            View Invoice
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Modal */}
      {selectedOrder && (
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
          <div style={{ background: "#ffffff", borderRadius: 12, padding: 24, maxWidth: 500, width: "100%", boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>Order Details: {selectedOrder.id}</h3>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: "none", border: 0, fontSize: 18, cursor: "pointer", color: "#6b7280" }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: 13, lineHeight: 1.6, color: "#374151" }}>
              <p><strong>Customer:</strong> {selectedOrder.customerName} ({selectedOrder.customerPhone})</p>
              <p><strong>Address:</strong> {selectedOrder.customerAddress}</p>
              <p><strong>Product:</strong> {selectedOrder.productName} (Qty: {selectedOrder.quantity})</p>
              <p><strong>Total Price:</strong> ৳{selectedOrder.total} ({selectedOrder.paymentMethod})</p>
              <p><strong>Courier Status:</strong> {selectedOrder.courierStatus}</p>
              {selectedOrder.courierTrackingId && (
                <p><strong>Tracking Consignment ID:</strong> <code>{selectedOrder.courierTrackingId}</code></p>
              )}
            </div>

            <div style={{ marginTop: 20, textAlign: "right" }}>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ padding: "8px 16px", background: "#111827", color: "#fff", border: 0, borderRadius: 6, fontWeight: 700, fontSize: 12, cursor: "pointer" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
