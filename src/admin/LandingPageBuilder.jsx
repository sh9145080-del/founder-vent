import React, { useState } from "react";
import { usePlatform } from "../context/PlatformContext";

const TEMPLATES = [
  {
    id: 1,
    name: "Template 1 (Classic Store)",
    tag: "High Conversion",
    description: "প্রোডাক্ট ফোকাসড লেআউট, বড় ইমেজ গ্যালারি, স্টার রিভিউ, ডিসকাউন্ট কাউন্টডাউন এবং ক্যাশ অন ডেলিভারি ফর্ম।",
    badge: "Most Popular",
    color: "#4f46e5",
  },
  {
    id: 2,
    name: "Template 2 (Organic & Modern)",
    tag: "Clean & Fresh",
    description: "অর্গানিক ফুড, কসমেটিকস ও হেলথকেয়ার প্রোডাক্টের জন্য ফ্রেশ গ্রিন ও মডার্ন ভিজ্যুয়াল লেআউট।",
    badge: "Organic Best",
    color: "#059669",
  },
  {
    id: 3,
    name: "Template 3 (Premium Luxury)",
    tag: "High-End",
    description: "ঘড়ি, লেদার গুডস, জুয়েলারি বা প্রিমিয়াম ব্র্যান্ডের জন্য লাক্সারি ডার্ক অ্যাকসেন্ট সহ কনভার্সন পেজ।",
    badge: "Premium",
    color: "#d97706",
  },
  {
    id: 4,
    name: "Template 4 (Minimal Commerce)",
    tag: "Clean Minimal",
    description: "সিম্পল, স্পষ্ট টাইপোগ্রাফি এবং কোনো প্রকার বিভ্রান্তি ছাড়া দ্রুত অর্ডার সম্পন্ন করার মিনিমালিস্ট ডিজাইন।",
    badge: "Fast Load",
    color: "#2563eb",
  },
  {
    id: 5,
    name: "Template 5 (Modern Commerce)",
    tag: "E-Commerce Pro",
    description: "ফুল ই-কমার্স স্টাইল ফিচারস, কাস্টমার ট্রাস্ট ব্যাজ এবং আধুনিক মোবাইল-ফ্রেন্ডলি শপ লেআউট।",
    badge: "Trending",
    color: "#dc2626",
  },
];

export default function LandingPageBuilder({ initialPage, onBack, onOpenPreview }) {
  const { clients, saveLandingPage, trackingSettings } = usePlatform();

  const [selectedClientId, setSelectedClientId] = useState(
    initialPage?.clientId || (clients[0]?.id || "client_1")
  );
  const [selectedTemplate, setSelectedTemplate] = useState(initialPage?.templateId || 1);
  const [pageName, setPageName] = useState(initialPage?.pageName || "");
  const [slug, setSlug] = useState(initialPage?.slug || "");
  const [status, setStatus] = useState(initialPage?.status || "published");

  // Product content state
  const [brand, setBrand] = useState(initialPage?.product?.brand || "Brand Name");
  const [title, setTitle] = useState(initialPage?.product?.title || "");
  const [price, setPrice] = useState(initialPage?.product?.price || 1490);
  const [oldPrice, setOldPrice] = useState(initialPage?.product?.oldPrice || 1990);
  const [discount, setDiscount] = useState(initialPage?.product?.discount || 25);
  const [countdownHours, setCountdownHours] = useState(initialPage?.product?.countdownHours || 6);
  const [description, setDescription] = useState(initialPage?.product?.description || "");
  
  // Images
  const [imageUrls, setImageUrls] = useState(
    initialPage?.product?.images || [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&auto=format&fit=crop&q=80",
    ]
  );
  const [newImageUrl, setNewImageUrl] = useState("");

  // Delivery & Payment
  const [insideDhaka, setInsideDhaka] = useState(initialPage?.product?.delivery?.insideDhaka || 70);
  const [outsideDhaka, setOutsideDhaka] = useState(initialPage?.product?.delivery?.outsideDhaka || 120);
  const [bkash, setBkash] = useState(initialPage?.product?.payment?.bkash || "017XXXXXXXX");
  const [nagad, setNagad] = useState(initialPage?.product?.payment?.nagad || "018XXXXXXXX");
  const [rocket, setRocket] = useState(initialPage?.product?.payment?.rocket || "019XXXXXXXX");

  // Reviews
  const [reviews, setReviews] = useState(
    initialPage?.product?.reviews || [
      { name: "আব্দুর রহমান", rating: 5, text: "অসাধারণ প্রোডাক্ট এবং খুব দ্রুত ডেলিভারি পেয়েছি।" },
      { name: "মারুফা বেগম", rating: 5, text: "ছবির চেয়েও বাস্তবে দেখতে চমৎকার।" },
    ]
  );
  const [newReviewName, setNewReviewName] = useState("");
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState("");

  const [activeTab, setActiveTab] = useState("template"); // template | product | images | pricing | reviews | delivery
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Selected client's tracking info preview
  const clientTracking = trackingSettings[selectedClientId] || {};
  const selectedClient = clients.find((c) => c.id === selectedClientId);

  const handleAddImage = () => {
    if (!newImageUrl.trim()) return;
    setImageUrls([...imageUrls, newImageUrl.trim()]);
    setNewImageUrl("");
  };

  const handleRemoveImage = (index) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleAddReview = () => {
    if (!newReviewName.trim() || !newReviewText.trim()) return;
    setReviews([
      ...reviews,
      { name: newReviewName.trim(), rating: Number(newReviewRating), text: newReviewText.trim() },
    ]);
    setNewReviewName("");
    setNewReviewText("");
  };

  const handleRemoveReview = (index) => {
    setReviews(reviews.filter((_, i) => i !== index));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!pageName.trim() || !title.trim()) {
      alert("দয়া করে ল্যান্ডিং পেজের নাম এবং প্রোডাক্টের টাইটেল পূরণ করুন।");
      return;
    }

    const generatedSlug = slug.trim() || pageName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

    const payload = {
      id: initialPage?.id,
      clientId: selectedClientId,
      templateId: selectedTemplate,
      pageName: pageName.trim(),
      slug: generatedSlug,
      status,
      product: {
        brand: brand.trim(),
        logo: "",
        title: title.trim(),
        images: imageUrls.length > 0 ? imageUrls : ["https://placehold.co/900x900?text=Product+Image"],
        price: Number(price),
        oldPrice: Number(oldPrice),
        discount: Number(discount),
        countdownHours: Number(countdownHours),
        description: description.trim(),
        reviews,
        delivery: { insideDhaka: Number(insideDhaka), outsideDhaka: Number(outsideDhaka) },
        payment: { bkash, nagad, rocket },
      },
    };

    saveLandingPage(payload);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      if (onBack) onBack();
    }, 1200);
  };

  return (
    <div style={{ padding: "20px 28px", maxWidth: 1100, margin: "0 auto", fontFamily: "Inter, sans-serif" }}>
      {/* Top action header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div>
          <button
            onClick={onBack}
            style={{ background: "none", border: 0, color: "#4f46e5", fontWeight: 700, fontSize: 13, cursor: "pointer", padding: 0, marginBottom: 4 }}
          >
            ← Back to Landing Pages
          </button>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#111827", margin: 0 }}>
            {initialPage ? `Edit Landing Page: ${initialPage.pageName}` : "Create New Landing Page for Client"}
          </h2>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {initialPage && (
            <button
              type="button"
              onClick={() => onOpenPreview && onOpenPreview(initialPage)}
              style={{
                padding: "8px 16px",
                background: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: 6,
                fontWeight: 700,
                fontSize: 13,
                color: "#1f2937",
                cursor: "pointer",
              }}
            >
              👁️ Live Preview
            </button>
          )}

          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: "8px 20px",
              background: "#111827",
              color: "#ffffff",
              border: 0,
              borderRadius: 6,
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            {saveSuccess ? "Saved! ✓" : "Publish / Save Page"}
          </button>
        </div>
      </div>

      {/* Auto-Linked Client & Tracking Notice */}
      <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "12px 16px", marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 18 }}>🔗</span>
          <div style={{ fontSize: 12, color: "#166534" }}>
            <strong>Auto-Linked Client Tracking:</strong> এই ল্যান্ডিং পেজে ক্লায়েন্ট <strong>{selectedClient?.brandName}</strong>-এর কাস্টম ডোমেন <code>{selectedClient?.domain || `${selectedClient?.subdomain}.founder-vent.com`}</code> এবং মেটা পিক্সেল <code>{clientTracking.metaPixelId || "None"}</code>, টিকটক <code>{clientTracking.tiktokPixelId || "None"}</code>, GA4 <code>{clientTracking.ga4Id || "None"}</code> স্বয়ংক্রিয়ভাবে সংযুক্ত হচ্ছে।
          </div>
        </div>
        <span style={{ fontSize: 11, background: "#dcfce7", color: "#15803d", padding: "3px 8px", borderRadius: 12, fontWeight: 700 }}>
          Tracking Synchronized
        </span>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: "flex", gap: 8, borderBottom: "1px solid #e5e7eb", marginBottom: 24, overflowX: "auto" }}>
        {[
          { id: "template", label: "১. Template Selection", icon: "🎨" },
          { id: "product", label: "২. Product Details", icon: "📦" },
          { id: "images", label: "৩. Images Gallery", icon: "🖼️" },
          { id: "pricing", label: "৪. Pricing & Offers", icon: "🏷️" },
          { id: "reviews", label: "৫. Reviews", icon: "⭐" },
          { id: "delivery", label: "৬. Delivery & Payment", icon: "🚚" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "10px 16px",
              background: activeTab === tab.id ? "#ffffff" : "transparent",
              border: 0,
              borderBottom: activeTab === tab.id ? "2px solid #4f46e5" : "2px solid transparent",
              fontWeight: activeTab === tab.id ? 800 : 600,
              color: activeTab === tab.id ? "#4f46e5" : "#6b7280",
              fontSize: 13,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: TEMPLATE SELECTION */}
      {activeTab === "template" && (
        <div>
          <div style={{ marginBottom: 18 }}>
            <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 6px", color: "#111827" }}>
              Choose a Template for this Landing Page
            </h3>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
              বর্তমান প্ল্যাটফর্মে ৫টি সম্পূর্ণ প্রিমিয়াম টেমপ্লেট অন্তর্ভুক্ত রয়েছে (পরবর্তীতে আরও নতুন টেমপ্লেট সহজে যোগ করার জন্য আর্কিটেকচার প্রস্তুত)।
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
            {TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplate === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  onClick={() => setSelectedTemplate(tmpl.id)}
                  style={{
                    border: isSelected ? `2px solid ${tmpl.color}` : "1px solid #e5e7eb",
                    borderRadius: 12,
                    padding: 16,
                    background: isSelected ? "#fafafe" : "#ffffff",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    position: "relative",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: tmpl.color, background: "#f3f4f6", padding: "2px 8px", borderRadius: 4 }}>
                      {tmpl.tag}
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#6b7280" }}>
                      {tmpl.badge}
                    </span>
                  </div>

                  <div
                    style={{
                      height: 110,
                      background: isSelected ? `${tmpl.color}15` : "#f3f4f6",
                      borderRadius: 8,
                      display: "grid",
                      placeItems: "center",
                      color: tmpl.color,
                      fontWeight: 800,
                      fontSize: 20,
                      marginBottom: 12,
                    }}
                  >
                    Template {tmpl.id}
                  </div>

                  <h4 style={{ margin: "0 0 6px", fontSize: 14, fontWeight: 800, color: "#111827" }}>
                    {tmpl.name}
                  </h4>
                  <p style={{ margin: 0, fontSize: 12, color: "#6b7280", lineHeight: 1.4 }}>
                    {tmpl.description}
                  </p>

                  <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: isSelected ? tmpl.color : "#9ca3af", fontWeight: 700 }}>
                      {isSelected ? "● Selected Template" : "Click to select"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 24, padding: 18, background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 700, color: "#374151" }}>
              Client Assignment & Page URL Settings
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#4b5563", marginBottom: 4 }}>
                  Assign to Client:
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  style={{ width: "100%", height: 38, borderRadius: 6, border: "1px solid #d1d5db", padding: "0 8px", fontSize: 12 }}
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.brandName} ({c.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#4b5563", marginBottom: 4 }}>
                  Page Internal Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Smartwatch Eid Offer"
                  value={pageName}
                  onChange={(e) => setPageName(e.target.value)}
                  style={{ width: "100%", height: 38, borderRadius: 6, border: "1px solid #d1d5db", padding: "0 8px", fontSize: 12 }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#4b5563", marginBottom: 4 }}>
                  URL Slug:
                </label>
                <input
                  type="text"
                  placeholder="smartwatch-offer"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  style={{ width: "100%", height: 38, borderRadius: 6, border: "1px solid #d1d5db", padding: "0 8px", fontSize: 12 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCT DETAILS */}
      {activeTab === "product" && (
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 16px", color: "#111827" }}>
            Product Headline & Description
          </h3>
          <div style={{ display: "grid", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                Brand / Store Name:
              </label>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                Landing Page Product Title (বাংলা বা ইংরেজি):
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="যেমন: T900 Ultra 2 Smartwatch - AMOLED Display with Bluetooth Calling"
                style={{ width: "100%", height: 42, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                Product Description & Highlights:
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="প্রোডাক্ট সম্পর্কে আকর্ষণীয় বর্ণনা, ফিচারসমূহ ও গ্যারান্টি তথ্য..."
                style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "10px", fontSize: 13, fontFamily: "inherit" }}
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: IMAGES GALLERY */}
      {activeTab === "images" && (
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 6px", color: "#111827" }}>
            Product Images (Cloudflare R2 Optimized)
          </h3>
          <p style={{ fontSize: 12, color: "#6b7280", margin: "0 0 16px" }}>
            ল্যান্ডিং পেজে প্রদর্শিত সব ইমেজ এখানে পরিবর্তন, যোগ বা ডিলিট করুন।
          </p>

          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            <input
              type="text"
              placeholder="ইমেজ URL পেস্ট করুন (যেমন: https://...)"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              style={{ flex: 1, height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
            />
            <button
              type="button"
              onClick={handleAddImage}
              style={{ padding: "0 18px", background: "#4f46e5", color: "#fff", border: 0, borderRadius: 6, fontWeight: 700, fontSize: 13, cursor: "pointer" }}
            >
              + Add Image
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14 }}>
            {imageUrls.map((url, idx) => (
              <div key={idx} style={{ position: "relative", border: "1px solid #e5e7eb", borderRadius: 8, overflow: "hidden", background: "#f9fafb" }}>
                <img
                  src={url}
                  alt={`Product ${idx}`}
                  style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: "#6b7280" }}>Image #{idx + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    style={{ background: "#fee2e2", color: "#dc2626", border: 0, borderRadius: 4, padding: "2px 6px", fontSize: 11, cursor: "pointer", fontWeight: 700 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: PRICING & OFFERS */}
      {activeTab === "pricing" && (
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 16px", color: "#111827" }}>
            Price, Discount & Countdown Offer
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                বিক্রয় মূল্য (Sale Price ৳):
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: "100%", height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 14, fontWeight: 700 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                পূর্বের মূল্য (Regular Price ৳):
              </label>
              <input
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                style={{ width: "100%", height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                ডিসকাউন্ট পার্সেন্ট (% OFF Badge):
              </label>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                style={{ width: "100%", height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                অফার কাউন্টডাউন টাইমার (Hours):
              </label>
              <input
                type="number"
                value={countdownHours}
                onChange={(e) => setCountdownHours(e.target.value)}
                style={{ width: "100%", height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 14 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                পাবলিশ স্ট্যাটাস:
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ width: "100%", height: 40, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
              >
                <option value="published">Published (Live to Public)</option>
                <option value="draft">Draft (Private / Under Review)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: REVIEWS */}
      {activeTab === "reviews" && (
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 16px", color: "#111827" }}>
            Customer Reviews & Social Proof
          </h3>

          <div style={{ background: "#f9fafb", padding: 14, borderRadius: 8, marginBottom: 18, border: "1px solid #e5e7eb" }}>
            <h4 style={{ margin: "0 0 8px", fontSize: 12, fontWeight: 700, color: "#374151" }}>Add New Review</h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 120px", gap: 10, marginBottom: 8 }}>
              <input
                type="text"
                placeholder="কাস্টমারের নাম"
                value={newReviewName}
                onChange={(e) => setNewReviewName(e.target.value)}
                style={{ height: 36, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 8px", fontSize: 12 }}
              />
              <select
                value={newReviewRating}
                onChange={(e) => setNewReviewRating(e.target.value)}
                style={{ height: 36, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 8px", fontSize: 12 }}
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Star)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Star)</option>
                <option value={3}>⭐⭐⭐ (3 Star)</option>
              </select>
            </div>
            <textarea
              rows={2}
              placeholder="কাস্টমারের পজিটিভ রিভিউ মন্তব্য..."
              value={newReviewText}
              onChange={(e) => setNewReviewText(e.target.value)}
              style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "8px", fontSize: 12, marginBottom: 8 }}
            />
            <button
              type="button"
              onClick={handleAddReview}
              style={{ padding: "6px 14px", background: "#059669", color: "#fff", border: 0, borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer" }}
            >
              + Add Review
            </button>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            {reviews.map((rev, idx) => (
              <div key={idx} style={{ border: "1px solid #e5e7eb", borderRadius: 6, padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <strong style={{ fontSize: 13, color: "#111827" }}>{rev.name}</strong>
                    <span style={{ color: "#f59e0b", fontSize: 12 }}>{"★".repeat(rev.rating)}</span>
                  </div>
                  <p style={{ margin: "4px 0 0", fontSize: 12, color: "#4b5563" }}>{rev.text}</p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveReview(idx)}
                  style={{ background: "none", border: 0, color: "#dc2626", fontSize: 12, cursor: "pointer", fontWeight: 700 }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: DELIVERY & PAYMENT */}
      {activeTab === "delivery" && (
        <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 10, padding: 20 }}>
          <h3 style={{ fontSize: 15, fontWeight: 800, margin: "0 0 16px", color: "#111827" }}>
            Delivery Charges & Merchant Payment Numbers
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                ঢাকার ভিতরে ডেলিভারি চার্জ (Inside Dhaka ৳):
              </label>
              <input
                type="number"
                value={insideDhaka}
                onChange={(e) => setInsideDhaka(e.target.value)}
                style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                ঢাকার বাইরে ডেলিভারি চার্জ (Outside Dhaka ৳):
              </label>
              <input
                type="number"
                value={outsideDhaka}
                onChange={(e) => setOutsideDhaka(e.target.value)}
                style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                বিকাশ মার্চেন্ট/পার্সোনাল নাম্বার (bKash):
              </label>
              <input
                type="text"
                value={bkash}
                onChange={(e) => setBkash(e.target.value)}
                style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4 }}>
                নগদ মার্চেন্ট/পার্সোনাল নাম্বার (Nagad):
              </label>
              <input
                type="text"
                value={nagad}
                onChange={(e) => setNagad(e.target.value)}
                style={{ width: "100%", height: 38, border: "1px solid #d1d5db", borderRadius: 6, padding: "0 10px", fontSize: 13 }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
