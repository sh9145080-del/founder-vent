import React, { useState } from "react";
import Dashboard from "./Dashboard";
import OrderManager from "./OrderManager";
import ProductManager from "./ProductManager";
import ReviewManager from "./ReviewManager";

export default function ClientAdminLayout() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "⌂" },
    { id: "orders", label: "Orders", icon: "▣", badge: 14 },
    { id: "products", label: "Products", icon: "□" },
    { id: "reviews", label: "Reviews", icon: "☆" },
    { id: "payments", label: "Payments", icon: "৳" },
    { id: "landing", label: "Landing Page", icon: "◈" },
    { id: "settings", label: "Settings", icon: "⚙" },
  ];

  const pageTitles = {
    dashboard: "Dashboard",
    orders: "Orders",
    products: "Products",
    reviews: "Reviews",
    payments: "Payments",
    landing: "Landing Page",
    settings: "Settings",
  };

  const handleNavigation = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;

      case "orders":
        return <OrderManager />;

      case "products":
        return <ProductManager />;

      case "reviews":
        return <ReviewManager />;

      case "payments":
        return (
          <PlaceholderPage
            title="Payments"
            description="Payment settings will be connected here."
            icon="৳"
          />
        );

      case "landing":
        return (
          <PlaceholderPage
            title="Landing Page"
            description="Landing page customization will be connected here."
            icon="◈"
          />
        );

      case "settings":
        return (
          <PlaceholderPage
            title="Settings"
            description="Client account settings will be connected here."
            icon="⚙"
          />
        );

      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="client-admin-shell">
      <style>{styles}</style>

      {sidebarOpen && (
        <div
          className="ca-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`ca-sidebar ${
          sidebarOpen ? "ca-sidebar-open" : ""
        }`}
      >
        <div className="ca-brand">
          <div className="ca-brand-mark">
            LP
          </div>

          <div>
            <strong>LandingPro</strong>
            <span>Client Panel</span>
          </div>

          <button
            className="ca-mobile-close"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            ×
          </button>
        </div>

        <div className="ca-store">
          <div className="ca-store-avatar">
            S
          </div>

          <div className="ca-store-info">
            <strong>Store Name</strong>
            <span>Active Store</span>
          </div>

          <span className="ca-store-dot">
            ●
          </span>
        </div>

        <nav className="ca-nav">
          <span className="ca-nav-label">
            MAIN MENU
          </span>

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`ca-nav-item ${
                activePage === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                handleNavigation(item.id)
              }
            >
              <span className="ca-nav-icon">
                {item.icon}
              </span>

              <span className="ca-nav-text">
                {item.label}
              </span>

              {item.badge && (
                <span className="ca-nav-badge">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="ca-sidebar-bottom">
          <div className="ca-support">
            <div className="ca-support-icon">
              ?
            </div>

            <div>
              <strong>Need help?</strong>
              <span>Contact support</span>
            </div>
          </div>

          <button
            className="ca-logout"
            onClick={() =>
              alert(
                "Logout system will be connected later."
              )
            }
          >
            <span>⇥</span>
            Logout
          </button>
        </div>
      </aside>

      <main className="ca-main">
        <header className="ca-topbar">
          <div className="ca-topbar-left">
            <button
              className="ca-menu-button"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              ☰
            </button>

            <div>
              <span className="ca-breadcrumb">
                Client Admin
              </span>

              <strong>/</strong>

              <span>
                {pageTitles[activePage]}
              </span>
            </div>
          </div>

          <div className="ca-topbar-right">
            <button
              className="ca-preview"
              onClick={() =>
                alert(
                  "Landing page preview will open here."
                )
              }
            >
              <span>◉</span>
              Preview
            </button>

            <button
              className="ca-notification"
              onClick={() =>
                alert(
                  "Notifications will appear here."
                )
              }
            >
              ♧
              <i></i>
            </button>

            <button
              className="ca-profile"
              onClick={() =>
                handleNavigation("settings")
              }
            >
              <span className="ca-profile-avatar">
                S
              </span>

              <span className="ca-profile-info">
                <strong>Store Owner</strong>
                <small>Client</small>
              </span>

              <span className="ca-profile-arrow">
                ▾
              </span>
            </button>
          </div>
        </header>

        <div className="ca-content">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

function PlaceholderPage({
  title,
  description,
  icon,
}) {
  return (
    <div className="ca-placeholder">
      <div className="ca-placeholder-icon">
        {icon}
      </div>

      <h2>{title}</h2>

      <p>{description}</p>

      <span>
        This section is ready for development.
      </span>
    </div>
  );
}

const styles = `
.client-admin-shell {
  min-height: 100vh;
  display: flex;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.client-admin-shell * {
  box-sizing: border-box;
}

.ca-sidebar {
  width: 238px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 18px 13px;
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
}

.ca-brand {
  height: 42px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 5px;
}

.ca-brand-mark {
  width: 30px;
  height: 30px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: #111827;
  color: white;
  font-size: 8px;
  font-weight: 900;
}

.ca-brand strong {
  display: block;
  font-size: 12px;
}

.ca-brand span {
  display: block;
  margin-top: 2px;
  color: #9ca3af;
  font-size: 7px;
}

.ca-mobile-close {
  display: none;
  margin-left: auto;
  border: 0;
  background: transparent;
  color: #6b7280;
  font-size: 20px;
  cursor: pointer;
}

.ca-store {
  margin: 18px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #eef0f2;
  border-radius: 8px;
  background: #fafbfc;
}

.ca-store-avatar {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 900;
}

.ca-store-info {
  min-width: 0;
  flex: 1;
}

.ca-store-info strong {
  display: block;
  color: #374151;
  font-size: 8px;
}

.ca-store-info span {
  display: block;
  margin-top: 2px;
  color: #16a34a;
  font-size: 7px;
}

.ca-store-dot {
  color: #16a34a;
  font-size: 7px;
}

.ca-nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ca-nav-label {
  margin: 5px 9px 7px;
  color: #b0b6c0;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .13em;
}

.ca-nav-item {
  width: 100%;
  min-height: 36px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #6b7280;
  text-align: left;
  cursor: pointer;
}

.ca-nav-item:hover {
  background: #f5f7fa;
  color: #111827;
}

.ca-nav-item.active {
  background: #111827;
  color: white;
}

.ca-nav-icon {
  width: 16px;
  text-align: center;
  font-size: 12px;
}

.ca-nav-text {
  flex: 1;
  font-size: 9px;
  font-weight: 700;
}

.ca-nav-badge {
  min-width: 18px;
  padding: 3px 5px;
  border-radius: 10px;
  background: #ef4444;
  color: white;
  text-align: center;
  font-size: 6px;
  font-weight: 900;
}

.ca-sidebar-bottom {
  margin-top: auto;
}

.ca-support {
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 7px;
  background: #f8fafc;
}

.ca-support-icon {
  width: 25px;
  height: 25px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #e5e7eb;
  color: #6b7280;
  font-size: 9px;
  font-weight: 900;
}

.ca-support strong {
  display: block;
  font-size: 8px;
}

.ca-support span {
  display: block;
  margin-top: 2px;
  color: #9ca3af;
  font-size: 7px;
}

.ca-logout {
  width: 100%;
  padding: 9px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #9ca3af;
  text-align: left;
  font-size: 8px;
  cursor: pointer;
}

.ca-main {
  width: calc(100% - 238px);
  min-height: 100vh;
  margin-left: 238px;
}

.ca-topbar {
  height: 64px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.ca-topbar-left,
.ca-topbar-right {
  display: flex;
  align-items: center;
}

.ca-topbar-left {
  gap: 10px;
  color: #9ca3af;
  font-size: 9px;
}

.ca-topbar-left strong {
  margin: 0 5px;
  color: #d1d5db;
}

.ca-topbar-left > div > span:last-child {
  color: #374151;
  font-weight: 800;
}

.ca-menu-button {
  display: none;
  border: 0;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.ca-topbar-right {
  gap: 10px;
}

.ca-preview {
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #374151;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.ca-notification {
  width: 31px;
  height: 31px;
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #6b7280;
  cursor: pointer;
}

.ca-notification i {
  width: 5px;
  height: 5px;
  position: absolute;
  top: 6px;
  right: 6px;
  border-radius: 50%;
  background: #ef4444;
}

.ca-profile {
  padding: 3px 5px;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.ca-profile-avatar {
  width: 29px;
  height: 29px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #e5e7eb;
  color: #374151;
  font-size: 9px;
  font-weight: 900;
}

.ca-profile-info {
  text-align: left;
}

.ca-profile-info strong {
  display: block;
  font-size: 8px;
}

.ca-profile-info small {
  display: block;
  margin-top: 2px;
  color: #9ca3af;
  font-size: 7px;
}

.ca-profile-arrow {
  color: #9ca3af;
  font-size: 8px;
}

.ca-content {
  min-height: calc(100vh - 64px);
}

.ca-placeholder {
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
}

.ca-placeholder-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  display: grid;
  place-items: center;
  border-radius: 14px;
  background: white;
  border: 1px solid #e5e7eb;
  color: #2563eb;
  font-size: 24px;
}

.ca-placeholder h2 {
  margin: 0;
  font-size: 20px;
}

.ca-placeholder p {
  max-width: 400px;
  margin: 8px 0;
  color: #6b7280;
  font-size: 10px;
}

.ca-placeholder span {
  color: #9ca3af;
  font-size: 8px;
}

@media (max-width: 800px) {
  .ca-sidebar {
    transform: translateX(-100%);
    transition: transform .2s ease;
    box-shadow: 15px 0 40px rgba(0,0,0,.08);
  }

  .ca-sidebar-open {
    transform: translateX(0);
  }

  .ca-mobile-close {
    display: block;
  }

  .ca-overlay {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 90;
    background: rgba(17,24,39,.35);
  }

  .ca-main {
    width: 100%;
    margin-left: 0;
  }

  .ca-menu-button {
    display: block;
  }

  .ca-profile-info,
  .ca-profile-arrow {
    display: none;
  }
}

@media (max-width: 520px) {
  .ca-topbar {
    padding: 0 15px;
  }

  .ca-preview {
    display: none;
  }
}
`;
