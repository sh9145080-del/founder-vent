import React, { useState } from "react";
import ClientManager from "./ClientManager";
import TemplateManager from "./TemplateManager";

export default function AdminPanel() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "⌂",
    },
    {
      id: "clients",
      label: "Clients",
      icon: "♙",
    },
    {
      id: "landing-pages",
      label: "Landing Pages",
      icon: "▣",
    },
    {
      id: "templates",
      label: "Templates",
      icon: "▤",
    },
    {
      id: "orders",
      label: "Orders",
      icon: "□",
      badge: 28,
    },
    {
      id: "edit-requests",
      label: "Edit Requests",
      icon: "✎",
      badge: 6,
    },
    {
      id: "payments",
      label: "Payments",
      icon: "৳",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙",
    },
  ];

  const pageTitles = {
    dashboard: "Dashboard",
    clients: "Clients",
    "landing-pages": "Landing Pages",
    templates: "Templates",
    orders: "Orders",
    "edit-requests": "Edit Requests",
    payments: "Payments",
    settings: "Settings",
  };

  const navigate = (page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const renderPage = () => {
    switch (activePage) {
      case "clients":
        return <ClientManager />;

      case "templates":
        return <TemplateManager />;

      case "dashboard":
        return (
          <PlaceholderPage
            title="Main Dashboard"
            description="Your complete business overview will appear here."
            icon="⌂"
          />
        );

      case "landing-pages":
        return (
          <PlaceholderPage
            title="Landing Pages"
            description="Manage every client's landing page from one place."
            icon="▣"
          />
        );

      case "orders":
        return (
          <PlaceholderPage
            title="All Orders"
            description="Orders from all client landing pages will appear here."
            icon="□"
          />
        );

      case "edit-requests":
        return (
          <PlaceholderPage
            title="Edit Requests"
            description="Client edit requests will be managed here."
            icon="✎"
          />
        );

      case "payments":
        return (
          <PlaceholderPage
            title="Payments"
            description="Payment and transaction management will be connected here."
            icon="৳"
          />
        );

      case "settings":
        return (
          <PlaceholderPage
            title="Main Settings"
            description="Your platform settings will be available here."
            icon="⚙"
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="main-admin">
      <style>{styles}</style>

      {sidebarOpen && (
        <div
          className="ma-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`ma-sidebar ${
          sidebarOpen ? "ma-sidebar-open" : ""
        }`}
      >
        <div className="ma-brand">
          <div className="ma-brand-logo">
            LP
          </div>

          <div>
            <strong>
              LandingPro
            </strong>

            <span>
              Main Admin
            </span>
          </div>

          <button
            className="ma-mobile-close"
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            ×
          </button>
        </div>

        <div className="ma-admin-card">
          <div className="ma-admin-avatar">
            A
          </div>

          <div className="ma-admin-info">
            <strong>
              Super Admin
            </strong>

            <span>
              Full Access
            </span>
          </div>

          <span className="ma-online">
            ●
          </span>
        </div>

        <nav className="ma-nav">
          <span className="ma-nav-title">
            MANAGEMENT
          </span>

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`ma-nav-item ${
                activePage === item.id
                  ? "active"
                  : ""
              }`}
              onClick={() =>
                navigate(item.id)
              }
            >
              <span className="ma-nav-icon">
                {item.icon}
              </span>

              <span className="ma-nav-label">
                {item.label}
              </span>

              {item.badge && (
                <span className="ma-nav-badge">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="ma-sidebar-bottom">
          <div className="ma-system-status">
            <span className="ma-system-dot">
              ●
            </span>

            <div>
              <strong>
                System Online
              </strong>

              <span>
                All services operational
              </span>
            </div>
          </div>

          <button
            className="ma-logout"
            onClick={() =>
              alert(
                "Logout system will be connected later."
              )
            }
          >
            <span>
              ⇥
            </span>

            Logout
          </button>
        </div>
      </aside>

      <main className="ma-main">
        <header className="ma-topbar">
          <div className="ma-top-left">
            <button
              className="ma-menu-button"
              onClick={() =>
                setSidebarOpen(true)
              }
            >
              ☰
            </button>

            <div className="ma-breadcrumb">
              <span>
                Main Admin
              </span>

              <b>
                /
              </b>

              <strong>
                {pageTitles[activePage]}
              </strong>
            </div>
          </div>

          <div className="ma-top-right">
            <button
              className="ma-site-button"
              onClick={() =>
                alert(
                  "Main website preview will be connected later."
                )
              }
            >
              <span>
                ◉
              </span>

              View Website
            </button>

            <button
              className="ma-notification"
              onClick={() =>
                alert(
                  "Notifications will be connected later."
                )
              }
            >
              ♧

              <i />
            </button>

            <button
              className="ma-profile"
              onClick={() =>
                navigate("settings")
              }
            >
              <span className="ma-profile-avatar">
                A
              </span>

              <span className="ma-profile-info">
                <strong>
                  Super Admin
                </strong>

                <small>
                  Administrator
                </small>
              </span>

              <span className="ma-profile-arrow">
                ▾
              </span>
            </button>
          </div>
        </header>

        <div className="ma-content">
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
    <div className="ma-placeholder">
      <div className="ma-placeholder-icon">
        {icon}
      </div>

      <h2>
        {title}
      </h2>

      <p>
        {description}
      </p>

      <span>
        This section is ready for development.
      </span>
    </div>
  );
}

const styles = `
.main-admin {
  min-height: 100vh;
  display: flex;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.main-admin * {
  box-sizing: border-box;
}

.ma-sidebar {
  width: 245px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  padding: 18px 13px;
  border-right: 1px solid #e5e7eb;
  background: white;
}

.ma-brand {
  min-height: 42px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 5px;
}

.ma-brand-logo {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: #111827;
  color: white;
  font-size: 8px;
  font-weight: 900;
}

.ma-brand strong {
  display: block;
  font-size: 12px;
}

.ma-brand span {
  display: block;
  margin-top: 2px;
  color: #9ca3af;
  font-size: 7px;
}

.ma-mobile-close {
  display: none;
  margin-left: auto;
  border: 0;
  background: transparent;
  color: #6b7280;
  font-size: 20px;
  cursor: pointer;
}

.ma-admin-card {
  margin: 18px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #eef0f2;
  border-radius: 8px;
  background: #fafbfc;
}

.ma-admin-avatar {
  width: 29px;
  height: 29px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 900;
}

.ma-admin-info {
  flex: 1;
}

.ma-admin-info strong {
  display: block;
  font-size: 8px;
}

.ma-admin-info span {
  display: block;
  margin-top: 2px;
  color: #2563eb;
  font-size: 7px;
}

.ma-online {
  color: #16a34a;
  font-size: 7px;
}

.ma-nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ma-nav-title {
  margin: 5px 9px 7px;
  color: #b0b6c0;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .13em;
}

.ma-nav-item {
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

.ma-nav-item:hover {
  background: #f5f7fa;
  color: #111827;
}

.ma-nav-item.active {
  background: #111827;
  color: white;
}

.ma-nav-icon {
  width: 16px;
  text-align: center;
  font-size: 12px;
}

.ma-nav-label {
  flex: 1;
  font-size: 9px;
  font-weight: 700;
}

.ma-nav-badge {
  min-width: 18px;
  padding: 3px 5px;
  border-radius: 10px;
  background: #ef4444;
  color: white;
  text-align: center;
  font-size: 6px;
  font-weight: 900;
}

.ma-sidebar-bottom {
  margin-top: auto;
}

.ma-system-status {
  margin-bottom: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 7px;
  background: #f8fafc;
}

.ma-system-dot {
  color: #16a34a;
  font-size: 7px;
}

.ma-system-status strong {
  display: block;
  font-size: 8px;
}

.ma-system-status span:last-child {
  display: block;
  margin-top: 2px;
  color: #9ca3af;
  font-size: 7px;
}

.ma-logout {
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

.ma-main {
  width: calc(100% - 245px);
  min-height: 100vh;
  margin-left: 245px;
}

.ma-topbar {
  height: 64px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e5e7eb;
  background: white;
}

.ma-top-left,
.ma-top-right {
  display: flex;
  align-items: center;
}

.ma-breadcrumb {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #9ca3af;
  font-size: 8px;
}

.ma-breadcrumb b {
  color: #d1d5db;
}

.ma-breadcrumb strong {
  color: #374151;
}

.ma-menu-button {
  display: none;
  margin-right: 8px;
  border: 0;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
}

.ma-top-right {
  gap: 9px;
}

.ma-site-button {
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

.ma-notification {
  width: 31px;
  height: 31px;
  position: relative;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #6b7280;
  cursor: pointer;
}

.ma-notification i {
  width: 5px;
  height: 5px;
  position: absolute;
  top: 6px;
  right: 6px;
  border-radius: 50%;
  background: #ef4444;
}

.ma-profile {
  padding: 3px 5px;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 0;
  background: transparent;
  cursor: pointer;
}

.ma-profile-avatar {
  width: 29px;
  height: 29px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 900;
}

.ma-profile-info {
  text-align: left;
}

.ma-profile-info strong {
  display: block;
  font-size: 8px;
}

.ma-profile-info small {
  display: block;
  margin-top: 2px;
  color: #9ca3af;
  font-size: 7px;
}

.ma-profile-arrow {
  color: #9ca3af;
  font-size: 8px;
}

.ma-content {
  min-height: calc(100vh - 64px);
}

.ma-placeholder {
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  text-align: center;
}

.ma-placeholder-icon {
  width: 60px;
  height: 60px;
  margin-bottom: 15px;
  display: grid;
  place-items: center;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  background: white;
  color: #2563eb;
  font-size: 24px;
}

.ma-placeholder h2 {
  margin: 0;
  font-size: 20px;
}

.ma-placeholder p {
  max-width: 420px;
  margin: 8px 0;
  color: #6b7280;
  font-size: 10px;
}

.ma-placeholder span {
  color: #9ca3af;
  font-size: 8px;
}

@media (max-width: 800px) {
  .ma-sidebar {
    transform: translateX(-100%);
    transition: transform .2s ease;
    box-shadow: 15px 0 40px rgba(0,0,0,.08);
  }

  .ma-sidebar-open {
    transform: translateX(0);
  }

  .ma-mobile-close {
    display: block;
  }

  .ma-overlay {
    position: fixed;
    inset: 0;
    z-index: 90;
    background: rgba(17,24,39,.35);
  }

  .ma-main {
    width: 100%;
    margin-left: 0;
  }

  .ma-menu-button {
    display: block;
  }

  .ma-profile-info,
  .ma-profile-arrow {
    display: none;
  }
}

@media (max-width: 520px) {
  .ma-topbar {
    padding: 0 15px;
  }

  .ma-site-button {
    display: none;
  }
}
`;
