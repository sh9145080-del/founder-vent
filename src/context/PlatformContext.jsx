import React, { createContext, useContext, useState, useEffect } from "react";

const PlatformContext = createContext(null);

const INITIAL_CLIENTS = [
  {
    id: "client_1",
    name: "Rafiqul Islam",
    brandName: "SmartGadget BD",
    email: "client@smartgadget.com",
    phone: "01712345678",
    subdomain: "smartgadget",
    domain: "smartgadgetbd.com",
    createdAt: "2026-08-10",
  },
  {
    id: "client_2",
    name: "Nusrat Jahan",
    brandName: "Pure Organic Mart",
    email: "nusrat@organicmart.com",
    phone: "01898765432",
    subdomain: "organicmart",
    domain: "",
    createdAt: "2026-08-15",
  },
  {
    id: "client_3",
    name: "Tanvir Hasan",
    brandName: "Aura Fashion House",
    email: "tanvir@aurafashion.com",
    phone: "01911223344",
    subdomain: "aurafashion",
    domain: "shop.aurafashion.com.bd",
    createdAt: "2026-08-18",
  },
];

const INITIAL_TRACKING = {
  client_1: {
    metaPixelId: "982341209384712",
    tiktokPixelId: "TT-C98412894",
    ga4Id: "G-789123456",
    fbCapiToken: "EAABw...capi_token_example",
  },
  client_2: {
    metaPixelId: "123456789012345",
    tiktokPixelId: "",
    ga4Id: "G-112233445",
    fbCapiToken: "",
  },
  client_3: {
    metaPixelId: "456789012345678",
    tiktokPixelId: "TT-F44556677",
    ga4Id: "G-998877665",
    fbCapiToken: "",
  },
};

const INITIAL_PAGES = [
  {
    id: "page_1",
    clientId: "client_1",
    templateId: 1,
    pageName: "T900 Ultra Smartwatch Offer",
    slug: "t900-ultra-smartwatch",
    status: "published",
    createdAt: "2026-08-12",
    product: {
      brand: "SmartGadget BD",
      logo: "",
      title: "T900 Ultra 2 Smartwatch - AMOLED Display & Bluetooth Calling",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=900&auto=format&fit=crop&q=80",
      ],
      price: 1490,
      oldPrice: 2200,
      discount: 32,
      countdownHours: 6,
      description: "আসল ওয়াটারপ্রুফ স্মার্টওয়াচ, ১.৯৯ ইঞ্চি ফুল ডিসপ্লে, ব্লুটুথ কলিং, হার্ট রেট ও স্লিপ মনিটরিং সুবিধা সহ আজই অর্ডার করুন ফ্রি ডেলিভারি অফারে!",
      reviews: [
        { name: "সাইফুল ইসলাম", rating: 5, text: "ঘড়িটা খুব সুন্দর এবং ব্যাটারি ব্যাকআপ ৩ দিন অনায়াসে চলে। ধন্যবাদ।" },
        { name: "নাজমুল হক", rating: 5, text: "প্যাকেজিং দারুণ ছিল। একদম ছবির মতোই পেয়েছি।" },
        { name: "মাহমুদ হাসান", rating: 4, text: "প্রোডাক্ট ভালো, ডেলিভারি একটু আগে পেলে আরও ভালো হতো।" },
      ],
      delivery: { insideDhaka: 70, outsideDhaka: 120 },
      payment: { bkash: "01712345678", nagad: "01712345678", rocket: "01712345678" },
    },
  },
  {
    id: "page_2",
    clientId: "client_2",
    templateId: 2,
    pageName: "সুন্দরবনের খাঁটি মধু ৫০০ গ্রাম",
    slug: "sundarban-pure-honey",
    status: "published",
    createdAt: "2026-08-16",
    product: {
      brand: "Pure Organic Mart",
      logo: "",
      title: "সুন্দরবনের ১০০% খাঁটি প্রাকৃতিক খলিসা ফুলের মধু (৫০০ গ্রাম)",
      images: [
        "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=900&auto=format&fit=crop&q=80",
      ],
      price: 850,
      oldPrice: 1150,
      discount: 26,
      countdownHours: 12,
      description: "কোনো প্রকার ভেজাল বা চিনি মুক্ত সুন্দরবনের প্রাকৃতিক চাকের মধু। পুষ্টিগুণে ভরপুর এবং প্রাকৃতিক স্বাদের নিশ্চয়তা।",
      reviews: [
        { name: "ফারহানা আক্তার", rating: 5, text: "মধুটা খেয়ে খাঁটি বুঝলাম। গন্ধ ও স্বাদ অসাধারণ!" },
        { name: "আব্দুল করিম", rating: 5, text: "খুবই দ্রুত ডেলিভারি পেয়েছি। নিয়মিত নেব ইনশাআল্লাহ।" },
      ],
      delivery: { insideDhaka: 60, outsideDhaka: 110 },
      payment: { bkash: "01898765432", nagad: "01898765432", rocket: "01898765432" },
    },
  },
  {
    id: "page_3",
    clientId: "client_3",
    templateId: 3,
    pageName: "প্রিমিয়াম লেদার ওয়ালেট ও বেল্ট কম্বো",
    slug: "leather-wallet-belt-combo",
    status: "published",
    createdAt: "2026-08-19",
    product: {
      brand: "Aura Fashion House",
      logo: "",
      title: "১০০% খাঁটি গরুর চামড়ার হ্যান্ডক্রাফটেড ওয়ালেট + রিভার্সিবল বেল্ট গিফট বক্স কম্বো",
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&auto=format&fit=crop&q=80",
      ],
      price: 1890,
      oldPrice: 2650,
      discount: 28,
      countdownHours: 8,
      description: "অফিসিয়াল ও ক্যাজুয়াল ব্যবহারের জন্য সেরা লেদার কম্বো। প্রিমিয়াম গিফট বক্স প্যাকিং সহ ৫ বছরের গ্যারান্টি।",
      reviews: [
        { name: "রাশেদ চৌধুরী", rating: 5, text: "চামড়ার কোয়ালিটি দুর্দান্ত, লুক একদম প্রিমিয়াম।" },
        { name: "শরিফুল ইসলাম", rating: 5, text: "গিফট দেওয়ার জন্য পারফেক্ট আইটেম।" },
      ],
      delivery: { insideDhaka: 70, outsideDhaka: 130 },
      payment: { bkash: "01911223344", nagad: "01911223344", rocket: "01911223344" },
    },
  },
];

// Helper to simulate realistic Steadfast courier fraud statistics for a phone number
export function getSteadfastFraudCheck(phone) {
  if (!phone) {
    return { totalOrders: 0, delivered: 0, cancelled: 0, successRate: 100, riskLevel: "New Customer", courierName: "Steadfast Courier" };
  }
  const clean = phone.replace(/[^0-9]/g, "");
  // Generate deterministic realistic metrics based on phone digits
  const lastDigits = parseInt(clean.slice(-3) || "123", 10);
  
  if (lastDigits % 7 === 0) {
    // High return / fraud risk customer
    const totalOrders = 8 + (lastDigits % 5);
    const delivered = 2 + (lastDigits % 2);
    const cancelled = totalOrders - delivered;
    const rate = Math.round((delivered / totalOrders) * 100);
    return {
      totalOrders,
      delivered,
      cancelled,
      successRate: rate,
      riskLevel: "High Risk",
      courierName: "Steadfast Courier",
      note: "পূর্বে একাধিকবার পার্সেল রিটার্ন করেছেন। ক্যাশ অন ডেলিভারির আগে নিশ্চিত হোন।"
    };
  } else if (lastDigits % 4 === 0) {
    // Moderate risk
    const totalOrders = 5 + (lastDigits % 3);
    const delivered = totalOrders - 2;
    const cancelled = 2;
    const rate = Math.round((delivered / totalOrders) * 100);
    return {
      totalOrders,
      delivered,
      cancelled,
      successRate: rate,
      riskLevel: "Moderate Risk",
      courierName: "Steadfast Courier",
      note: "মাঝারি ডেলিভারি সাকসেস রেট। ফোন দিয়ে কনফার্ম করুন।"
    };
  } else if (lastDigits % 9 === 0) {
    // Brand new customer
    return {
      totalOrders: 0,
      delivered: 0,
      cancelled: 0,
      successRate: 100,
      riskLevel: "New Customer",
      courierName: "Steadfast Courier",
      note: "নতুন কাস্টমার। কুরিয়ার হিস্ট্রিতে পূর্বের কোনো রেকর্ড নেই।"
    };
  } else {
    // Highly reliable safe customer
    const totalOrders = 12 + (lastDigits % 15);
    const delivered = totalOrders - (lastDigits % 2 === 0 ? 1 : 0);
    const cancelled = totalOrders - delivered;
    const rate = Math.round((delivered / totalOrders) * 100);
    return {
      totalOrders,
      delivered,
      cancelled,
      successRate: rate,
      riskLevel: "Safe",
      courierName: "Steadfast Courier",
      note: "বিশ্বস্ত কাস্টমার! প্রায় সব অর্ডার সফলভাবে গ্রহণ করেছেন।"
    };
  }
}

const INITIAL_ORDERS = [
  {
    id: "ORD-9201",
    clientId: "client_1",
    pageId: "page_1",
    customerName: "আব্দুল্লাহ আল মামুন",
    customerPhone: "01711223344",
    customerAddress: "বাড়ি ১২, রোড ৪, ব্লক সি, মিরপুর ১০, ঢাকা",
    productName: "T900 Ultra 2 Smartwatch",
    quantity: 1,
    location: "Inside Dhaka",
    paymentMethod: "Cash on Delivery",
    productPrice: 1490,
    deliveryCharge: 70,
    total: 1560,
    orderStatus: "Pending",
    courierStatus: "Unsent",
    courierTrackingId: "",
    date: "15 Sep 2026, 07:15 PM",
    timestamp: Date.now() - 1000 * 60 * 35,
    fraudCheck: getSteadfastFraudCheck("01711223344"),
  },
  {
    id: "ORD-9202",
    clientId: "client_1",
    pageId: "page_1",
    customerName: "মেহজাবিন হক",
    customerPhone: "01855667788",
    customerAddress: "আগ্রাবাদ বাণিজ্যিক এলাকা, চট্টগ্রাম",
    productName: "T900 Ultra 2 Smartwatch",
    quantity: 2,
    location: "Outside Dhaka",
    paymentMethod: "Cash on Delivery",
    productPrice: 2980,
    deliveryCharge: 120,
    total: 3100,
    orderStatus: "Confirmed",
    courierStatus: "Booked - Steadfast",
    courierTrackingId: "ST-88294120",
    date: "15 Sep 2026, 05:40 PM",
    timestamp: Date.now() - 1000 * 60 * 140,
    fraudCheck: getSteadfastFraudCheck("01855667788"),
  },
  {
    id: "ORD-9203",
    clientId: "client_1",
    pageId: "page_1",
    customerName: "রাকিবুর রহমান",
    customerPhone: "01977889900",
    customerAddress: "চৌহাট্টা, সিলেট সদর",
    productName: "T900 Ultra 2 Smartwatch",
    quantity: 1,
    location: "Outside Dhaka",
    paymentMethod: "Cash on Delivery",
    productPrice: 1490,
    deliveryCharge: 120,
    total: 1610,
    orderStatus: "Cancelled",
    courierStatus: "Cancelled (No Courier Entry)",
    courierTrackingId: "",
    date: "15 Sep 2026, 03:20 PM",
    timestamp: Date.now() - 1000 * 60 * 280,
    fraudCheck: {
      totalOrders: 9,
      delivered: 2,
      cancelled: 7,
      successRate: 22,
      riskLevel: "High Risk",
      courierName: "Steadfast Courier",
      note: "বিগত ৭টি পার্সেল রিসিভ না করে ফেরত পাঠিয়েছেন। ফেক অর্ডার হওয়ার প্রবল সম্ভাবনা।"
    },
  },
  {
    id: "ORD-9204",
    clientId: "client_2",
    pageId: "page_2",
    customerName: "শামীমা নাসরিন",
    customerPhone: "01633445566",
    customerAddress: "সেক্টর ৭, উত্তরা, ঢাকা",
    productName: "সুন্দরবনের ১০০% খাঁটি প্রাকৃতিক মধু (৫০০ গ্রাম)",
    quantity: 2,
    location: "Inside Dhaka",
    paymentMethod: "Cash on Delivery",
    productPrice: 1700,
    deliveryCharge: 60,
    total: 1760,
    orderStatus: "Pending",
    courierStatus: "Unsent",
    courierTrackingId: "",
    date: "15 Sep 2026, 06:10 PM",
    timestamp: Date.now() - 1000 * 60 * 95,
    fraudCheck: getSteadfastFraudCheck("01633445566"),
  },
  {
    id: "ORD-9205",
    clientId: "client_3",
    pageId: "page_3",
    customerName: "জাহিদ হাসান",
    customerPhone: "01522334455",
    customerAddress: "শিবগঞ্জ, বগুড়া",
    productName: "১০০% খাঁটি গরুর চামড়ার হ্যান্ডক্রাফটেড ওয়ালেট + বেল্ট কম্বো",
    quantity: 1,
    location: "Outside Dhaka",
    paymentMethod: "bKash Advance",
    productPrice: 1890,
    deliveryCharge: 130,
    total: 2020,
    orderStatus: "Confirmed",
    courierStatus: "Booked - Steadfast",
    courierTrackingId: "ST-88294991",
    date: "15 Sep 2026, 02:00 PM",
    timestamp: Date.now() - 1000 * 60 * 360,
    fraudCheck: getSteadfastFraudCheck("01522334455"),
  },
];

const INITIAL_EDIT_REQUESTS = [
  {
    id: "REQ-101",
    clientId: "client_1",
    clientName: "SmartGadget BD",
    pageId: "page_1",
    pageName: "T900 Ultra Smartwatch Offer",
    category: "Price & Offer Change",
    priority: "High",
    message: "আমাদের ডিসকাউন্ট প্রাইজ ১৪৯০ টাকা থেকে কমিয়ে ১২৯০ টাকা করতে হবে এবং সাথে ফ্রি এক্সট্রা স্ট্র্যাপ অফার ব্যানার যোগ করতে হবে।",
    status: "Pending",
    date: "15 Sep 2026, 11:20 AM",
    adminNotes: "",
  },
  {
    id: "REQ-102",
    clientId: "client_2",
    clientName: "Pure Organic Mart",
    pageId: "page_2",
    pageName: "সুন্দরবনের খাঁটি মধু ৫০০ গ্রাম",
    category: "Image Update",
    priority: "Normal",
    message: "মধু বোতলের নতুন ল্যাব টেস্ট সার্টিফিকেট ও বিএসটিআই লোগোর ছবি প্রোডাক্ট গ্যালারিতে এড করতে চাই।",
    status: "Completed",
    date: "14 Sep 2026, 04:45 PM",
    adminNotes: "নতুন ল্যাব টেস্ট ছবি ৩ নম্বর স্লাইডে যুক্ত করে দেওয়া হয়েছে।",
  },
];

// 7-day Rolling visitor generator and auto-purge simulator
function generateInitialVisitorStats() {
  const dates = [];
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0];
    const displayStr = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    dates.push({
      dateStr,
      displayStr,
      client_1: 420 + Math.floor(Math.sin(i * 1.5) * 80) + (i === 0 ? 145 : 0),
      client_2: 260 + Math.floor(Math.cos(i * 1.2) * 50) + (i === 0 ? 82 : 0),
      client_3: 310 + Math.floor(Math.sin(i * 2.1) * 70) + (i === 0 ? 110 : 0),
    });
  }
  return dates;
}

export function PlatformProvider({ children }) {
  const [currentRole, setCurrentRole] = useState("admin"); // 'admin' | 'client'
  const [activeClientId, setActiveClientId] = useState("client_1");

  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem("lp_clients");
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [landingPages, setLandingPages] = useState(() => {
    const saved = localStorage.getItem("lp_pages");
    return saved ? JSON.parse(saved) : INITIAL_PAGES;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("lp_orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [editRequests, setEditRequests] = useState(() => {
    const saved = localStorage.getItem("lp_edit_requests");
    return saved ? JSON.parse(saved) : INITIAL_EDIT_REQUESTS;
  });

  const [trackingSettings, setTrackingSettings] = useState(() => {
    const saved = localStorage.getItem("lp_tracking");
    return saved ? JSON.parse(saved) : INITIAL_TRACKING;
  });

  const [visitorStats, setVisitorStats] = useState(() => {
    const saved = localStorage.getItem("lp_visitor_stats");
    return saved ? JSON.parse(saved) : generateInitialVisitorStats();
  });

  const [courierConfig, setCourierConfig] = useState(() => {
    const saved = localStorage.getItem("lp_courier_config");
    return saved ? JSON.parse(saved) : {
      provider: "Steadfast Courier",
      apiKey: "st_live_key_9942a0b12",
      secretKey: "st_sec_8849120bc",
      autoBookingOnConfirm: true,
      fraudCheckThreshold: 50, // Flag high risk if success rate below 50%
      supportedCouriers: ["Steadfast Courier", "Pathao Courier", "RedX Logistics", "Paperfly"],
    };
  });

  // State for preview modal
  const [previewModalPage, setPreviewModalPage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("lp_clients", JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem("lp_pages", JSON.stringify(landingPages));
  }, [landingPages]);

  useEffect(() => {
    localStorage.setItem("lp_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("lp_edit_requests", JSON.stringify(editRequests));
  }, [editRequests]);

  useEffect(() => {
    localStorage.setItem("lp_tracking", JSON.stringify(trackingSettings));
  }, [trackingSettings]);

  useEffect(() => {
    localStorage.setItem("lp_visitor_stats", JSON.stringify(visitorStats));
  }, [visitorStats]);

  useEffect(() => {
    localStorage.setItem("lp_courier_config", JSON.stringify(courierConfig));
  }, [courierConfig]);

  // Client actions
  const getActiveClient = () => {
    return clients.find((c) => c.id === activeClientId) || clients[0];
  };

  const updateClientDomain = (clientId, newDomain) => {
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, domain: newDomain.trim() } : c))
    );
  };

  const updateClientTracking = (clientId, trackingData) => {
    setTrackingSettings((prev) => ({
      ...prev,
      [clientId]: { ...prev[clientId], ...trackingData },
    }));
  };

  // Main Admin Landing Page actions
  const saveLandingPage = (pageData) => {
    if (pageData.id) {
      setLandingPages((prev) =>
        prev.map((p) => (p.id === pageData.id ? { ...p, ...pageData } : p))
      );
    } else {
      const newPage = {
        ...pageData,
        id: "page_" + Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setLandingPages((prev) => [newPage, ...prev]);
    }
  };

  const deleteLandingPage = (pageId) => {
    setLandingPages((prev) => prev.filter((p) => p.id !== pageId));
  };

  // Edit Request actions
  const submitEditRequest = ({ clientId, clientName, pageId, pageName, category, priority, message }) => {
    const newReq = {
      id: "REQ-" + Math.floor(100 + Math.random() * 900),
      clientId,
      clientName,
      pageId,
      pageName,
      category,
      priority,
      message,
      status: "Pending",
      date: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      adminNotes: "",
    };
    setEditRequests((prev) => [newReq, ...prev]);
    return newReq;
  };

  const updateEditRequestStatus = (reqId, status, adminNotes = "") => {
    setEditRequests((prev) =>
      prev.map((r) =>
        r.id === reqId ? { ...r, status, adminNotes: adminNotes || r.adminNotes } : r
      )
    );
  };

  // Order actions & Courier dispatch
  const confirmOrderWithCourier = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const trackingNumber = "ST-" + Math.floor(10000000 + Math.random() * 90000000);
          return {
            ...o,
            orderStatus: "Confirmed",
            courierStatus: `Booked - ${courierConfig.provider}`,
            courierTrackingId: trackingNumber,
          };
        }
        return o;
      })
    );
  };

  const cancelOrderStrict = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          return {
            ...o,
            orderStatus: "Cancelled",
            courierStatus: "Cancelled (No Courier Entry)",
            courierTrackingId: "",
          };
        }
        return o;
      })
    );
  };

  const addCustomerOrder = (newOrderData) => {
    const fraud = getSteadfastFraudCheck(newOrderData.customerPhone);
    const orderObj = {
      id: "ORD-" + Math.floor(1000 + Math.random() * 9000),
      clientId: newOrderData.clientId || activeClientId,
      pageId: newOrderData.pageId || "page_1",
      customerName: newOrderData.customerName,
      customerPhone: newOrderData.customerPhone,
      customerAddress: newOrderData.customerAddress,
      productName: newOrderData.productName || "Product",
      quantity: newOrderData.quantity || 1,
      location: newOrderData.location || "Inside Dhaka",
      paymentMethod: newOrderData.paymentMethod || "Cash on Delivery",
      productPrice: newOrderData.productPrice || 1490,
      deliveryCharge: newOrderData.deliveryCharge || 70,
      total: newOrderData.total || 1560,
      orderStatus: "Pending",
      courierStatus: "Unsent",
      courierTrackingId: "",
      date: new Date().toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      timestamp: Date.now(),
      fraudCheck: fraud,
    };
    setOrders((prev) => [orderObj, ...prev]);

    // Record visitor hit
    recordVisitor(orderObj.clientId);

    return orderObj;
  };

  const recordVisitor = (clientId) => {
    setVisitorStats((prev) => {
      const copy = [...prev];
      const todayIndex = copy.length - 1;
      if (todayIndex >= 0) {
        copy[todayIndex] = {
          ...copy[todayIndex],
          [clientId]: (copy[todayIndex][clientId] || 0) + 1,
        };
      }
      return copy;
    });
  };

  return (
    <PlatformContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activeClientId,
        setActiveClientId,
        clients,
        setClients,
        getActiveClient,
        landingPages,
        setLandingPages,
        saveLandingPage,
        deleteLandingPage,
        orders,
        setOrders,
        confirmOrderWithCourier,
        cancelOrderStrict,
        addCustomerOrder,
        editRequests,
        submitEditRequest,
        updateEditRequestStatus,
        trackingSettings,
        updateClientTracking,
        updateClientDomain,
        visitorStats,
        recordVisitor,
        courierConfig,
        setCourierConfig,
        previewModalPage,
        setPreviewModalPage,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error("usePlatform must be used within PlatformProvider");
  }
  return context;
}
