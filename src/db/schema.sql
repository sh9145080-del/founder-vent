-- Cloudflare D1 Database Schema for Landing Page Platform
-- Database Name: landingpro-core

-- 1. Clients Table
CREATE TABLE IF NOT EXISTS clients (
    client_id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone TEXT,
    brand_name TEXT,
    subdomain TEXT UNIQUE,
    domain TEXT,
    logo_url TEXT,
    status TEXT DEFAULT 'active',
    created_at TEXT NOT NULL
);

-- 2. Landing Pages Table (Supports 5+ Templates)
CREATE TABLE IF NOT EXISTS landing_pages (
    page_id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    template_id INTEGER DEFAULT 1,
    page_name TEXT NOT NULL,
    page_url_slug TEXT UNIQUE NOT NULL,
    page_content TEXT NOT NULL, -- JSON storing title, price, oldPrice, discount, images, reviews, delivery, payment
    status TEXT DEFAULT 'published', -- 'published' | 'draft'
    created_at TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- 3. Orders Table (Permanent Storage - Never Deleted)
CREATE TABLE IF NOT EXISTS orders (
    order_id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    page_id TEXT,
    customer_name TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    customer_address TEXT,
    product_name TEXT,
    quantity INTEGER DEFAULT 1,
    product_price REAL DEFAULT 0,
    delivery_charge REAL DEFAULT 0,
    total_amount REAL DEFAULT 0,
    payment_method TEXT DEFAULT 'Cash on Delivery',
    order_status TEXT DEFAULT 'Pending', -- 'Pending' | 'Confirmed' | 'Delivered' | 'Cancelled'
    courier_status TEXT DEFAULT 'Unsent', -- 'Unsent' | 'Booked - Steadfast' | 'Cancelled'
    courier_tracking_id TEXT,
    fraud_check_result TEXT, -- JSON caching Steadfast check
    created_at TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- 4. Tracking & Analytics Settings (Meta Pixel, TikTok, GA4, CAPI)
CREATE TABLE IF NOT EXISTS tracking_settings (
    tracking_id TEXT PRIMARY KEY,
    client_id TEXT UNIQUE NOT NULL,
    meta_pixel_id TEXT,
    tiktok_pixel_id TEXT,
    ga4_id TEXT,
    fb_capi_token TEXT,
    updated_at TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- 5. Daily Visitor Logs (7-Day Rolling Retention Window)
-- Cleaned automatically: DELETE FROM visitor_logs WHERE visit_date < date('now', '-7 days')
CREATE TABLE IF NOT EXISTS visitor_logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    client_id TEXT NOT NULL,
    visit_date TEXT NOT NULL, -- YYYY-MM-DD
    visitor_count INTEGER DEFAULT 1,
    UNIQUE(client_id, visit_date),
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- 6. Edit Requests Table (Client-to-Admin workflow)
CREATE TABLE IF NOT EXISTS edit_requests (
    request_id TEXT PRIMARY KEY,
    client_id TEXT NOT NULL,
    page_id TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Price & Offer Change', 'Image Update', 'Description', etc.
    priority TEXT DEFAULT 'Normal', -- 'Normal' | 'High'
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Pending', -- 'Pending' | 'In Progress' | 'Completed' | 'Rejected'
    admin_notes TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY (client_id) REFERENCES clients(client_id)
);

-- 7. Courier & API Settings
CREATE TABLE IF NOT EXISTS courier_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    provider TEXT DEFAULT 'Steadfast Courier',
    api_key TEXT,
    secret_key TEXT,
    auto_booking INTEGER DEFAULT 1,
    updated_at TEXT
);
