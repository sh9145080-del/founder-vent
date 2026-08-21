import React, { useState } from "react";

export default function AdminPanel() {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "▦",
    },
    {
      id: "templates",
      label: "Templates",
      icon: "◫",
    },
    {
      id: "product",
      label: "Product",
      icon: "□",
    },
    {
      id: "reviews",
      label: "Reviews",
      icon: "★",
    },
    {
      id: "delivery",
      label: "Delivery",
      icon: "⌁",
    },
    {
      id: "payment",
      label: "Payment",
      icon: "৳",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙",
    },
  ];

  return (
    <div className="admin-page">
      <style>{adminStyles}</style>

      {/* SIDEBAR */}

      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="admin-logo-mark">
            L
          </div>

          <div>
            <strong>Landing Admin</strong>
            <span>Control Panel</span>
          </div>
        </div>

        <nav className="admin-nav">
          <p className="admin-nav-title">
            MANAGEMENT
          </p>

          {menuItems.map((item) => (
            <button
              key={item.id}
              className={
                activeMenu === item.id
                  ? "admin-nav-item active"
                  : "admin-nav-item"
              }
              onClick={() =>
                setActiveMenu(item.id)
              }
            >
              <span className="admin-nav-icon">
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-user">
            <div className="admin-avatar">
              A
            </div>

            <div>
              <strong>Administrator</strong>
              <span>Admin Access</span>
            </div>
          </div>

          <button className="admin-logout">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}

      <main className="admin-main">
        <header className="admin-header">
          <div>
            <span className="admin-breadcrumb">
              ADMIN PANEL
            </span>

            <h1>
              {menuItems.find(
                (item) =>
                  item.id === activeMenu
              )?.label || "Dashboard"}
            </h1>
          </div>

          <div className="admin-header-actions">
            <span className="admin-status">
              <i></i>
              System Online
            </span>

            <button className="admin-view-button">
              View Landing Page ↗
            </button>
          </div>
        </header>

        {/* DASHBOARD */}

        {activeMenu === "dashboard" && (
          <section className="admin-content">
            <div className="admin-welcome">
              <div>
                <span>
                  WELCOME BACK
                </span>

                <h2>
                  Manage your landing page
                  <br />
                  from one place.
                </h2>

                <p>
                  এখানে আপনার landing page-এর
                  সব গুরুত্বপূর্ণ তথ্য
                  নিয়ন্ত্রণ করতে পারবেন।
                </p>
              </div>

              <div className="admin-welcome-icon">
                ✦
              </div>
            </div>

            <div className="admin-stat-grid">
              <div className="admin-stat-card">
                <span>
                  ACTIVE TEMPLATE
                </span>

                <strong>
                  Template 1
                </strong>

                <small>
                  Currently selected
                </small>
              </div>

              <div className="admin-stat-card">
                <span>
                  PRODUCT
                </span>

                <strong>
                  Your Product
                </strong>

                <small>
                  Product information
                </small>
              </div>

              <div className="admin-stat-card">
                <span>
                  REVIEWS
                </span>

                <strong>
                  0
                </strong>

                <small>
                  Customer reviews
                </small>
              </div>

              <div className="admin-stat-card">
                <span>
                  ORDERS
                </span>

                <strong>
                  0
                </strong>

                <small>
                  Total orders
                </small>
              </div>
            </div>

            <div className="admin-section-grid">
              <div className="admin-panel-card">
                <div className="admin-card-header">
                  <div>
                    <span>
                      QUICK ACTIONS
                    </span>

                    <h3>
                      Manage your page
                    </h3>
                  </div>
                </div>

                <div className="admin-quick-grid">
                  <button
                    onClick={() =>
                      setActiveMenu(
                        "templates"
                      )
                    }
                  >
                    <b>◫</b>
                    <strong>
                      Change Template
                    </strong>
                    <span>
                      Select a design
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveMenu(
                        "product"
                      )
                    }
                  >
                    <b>□</b>
                    <strong>
                      Edit Product
                    </strong>
                    <span>
                      Name, price & images
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveMenu(
                        "reviews"
                      )
                    }
                  >
                    <b>★</b>
                    <strong>
                      Manage Reviews
                    </strong>
                    <span>
                      Add or edit reviews
                    </span>
                  </button>

                  <button
                    onClick={() =>
                      setActiveMenu(
                        "payment"
                      )
                    }
                  >
                    <b>৳</b>
                    <strong>
                      Payment Settings
                    </strong>
                    <span>
                      bKash, Nagad & Rocket
                    </span>
                  </button>
                </div>
              </div>

              <div className="admin-panel-card">
                <div className="admin-card-header">
                  <div>
                    <span>
                      SYSTEM
                    </span>

                    <h3>
                      Status
                    </h3>
                  </div>
                </div>

                <div className="admin-system-list">
                  <div>
                    <span>
                      Landing Page
                    </span>

                    <strong className="online">
                      ● Online
                    </strong>
                  </div>

                  <div>
                    <span>
                      Templates
                    </span>

                    <strong className="online">
                      ● Connected
                    </strong>
                  </div>

                  <div>
                    <span>
                      Order System
                    </span>

                    <strong className="pending">
                      ● Setup Pending
                    </strong>
                  </div>

                  <div>
                    <span>
                      Payment System
                    </span>

                    <strong className="pending">
                      ● Setup Pending
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* OTHER SECTIONS */}

        {activeMenu !== "dashboard" && (
          <section className="admin-placeholder">
            <div className="admin-placeholder-icon">
              {menuItems.find(
                (item) =>
                  item.id === activeMenu
              )?.icon}
            </div>

            <h2>
              {
                menuItems.find(
                  (item) =>
                    item.id === activeMenu
                )?.label
              }
            </h2>

            <p>
              এই section-এর actual
              functionality আমরা পরের
              ধাপে তৈরি করব।
            </p>
          </section>
        )}
      </main>
    </div>
  );
}

const adminStyles = `
.admin-page {
  min-height: 100vh;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
  display: flex;
}

.admin-page * {
  box-sizing: border-box;
}

.admin-sidebar {
  width: 250px;
  min-height: 100vh;
  background: #111827;
  color: white;
  padding: 24px 15px;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}

.admin-logo {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 5px 10px 28px;
}

.admin-logo-mark {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 9px;
  background: #2563eb;
  font-weight: 900;
  font-size: 18px;
}

.admin-logo strong {
  display: block;
  font-size: 14px;
}

.admin-logo span {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 10px;
}

.admin-nav-title {
  margin: 0 10px 9px;
  color: #6b7280;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .13em;
}

.admin-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.admin-nav-item {
  width: 100%;
  padding: 11px 12px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: #9ca3af;
  display: flex;
  align-items: center;
  gap: 11px;
  text-align: left;
  font-size: 12px;
  cursor: pointer;
}

.admin-nav-item:hover {
  background: #1f2937;
  color: white;
}

.admin-nav-item.active {
  background: #2563eb;
  color: white;
}

.admin-nav-icon {
  width: 18px;
  text-align: center;
  font-size: 15px;
}

.admin-sidebar-bottom {
  margin-top: auto;
  padding-top: 20px;
  border-top: 1px solid #1f2937;
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 7px 13px;
}

.admin-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #374151;
  font-size: 12px;
  font-weight: 900;
}

.admin-user strong {
  display: block;
  font-size: 11px;
}

.admin-user span {
  display: block;
  margin-top: 3px;
  color: #6b7280;
  font-size: 9px;
}

.admin-logout {
  width: 100%;
  padding: 9px;
  border: 1px solid #374151;
  border-radius: 6px;
  background: transparent;
  color: #9ca3af;
  cursor: pointer;
  font-size: 11px;
}

.admin-main {
  width: calc(100% - 250px);
  margin-left: 250px;
  min-height: 100vh;
}

.admin-header {
  min-height: 85px;
  padding: 18px 35px;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.admin-breadcrumb {
  color: #2563eb;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .13em;
}

.admin-header h1 {
  margin: 5px 0 0;
  font-size: 22px;
  letter-spacing: -.03em;
}

.admin-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.admin-status {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 10px;
}

.admin-status i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #16a34a;
}

.admin-view-button {
  padding: 9px 13px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.admin-content {
  padding: 30px 35px 50px;
}

.admin-welcome {
  min-height: 190px;
  padding: 30px;
  border-radius: 13px;
  background: #111827;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}

.admin-welcome span {
  color: #60a5fa;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .15em;
}

.admin-welcome h2 {
  margin: 10px 0;
  font-size: clamp(25px, 3vw, 38px);
  line-height: 1.05;
  letter-spacing: -.04em;
}

.admin-welcome p {
  margin: 0;
  color: #9ca3af;
  font-size: 12px;
}

.admin-welcome-icon {
  width: 130px;
  height: 130px;
  border: 1px solid #374151;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #60a5fa;
  font-size: 55px;
}

.admin-stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-top: 18px;
}

.admin-stat-card {
  padding: 20px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.admin-stat-card span {
  color: #9ca3af;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.admin-stat-card strong {
  display: block;
  margin: 8px 0 4px;
  font-size: 20px;
}

.admin-stat-card small {
  color: #9ca3af;
  font-size: 9px;
}

.admin-section-grid {
  display: grid;
  grid-template-columns: 1.4fr .8fr;
  gap: 18px;
  margin-top: 18px;
}

.admin-panel-card {
  padding: 23px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
}

.admin-card-header span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.admin-card-header h3 {
  margin: 6px 0 20px;
  font-size: 18px;
}

.admin-quick-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.admin-quick-grid button {
  padding: 16px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
}

.admin-quick-grid button:hover {
  border-color: #2563eb;
}

.admin-quick-grid b {
  display: block;
  margin-bottom: 10px;
  color: #2563eb;
  font-size: 19px;
}

.admin-quick-grid strong {
  display: block;
  font-size: 11px;
}

.admin-quick-grid span {
  display: block;
  margin-top: 4px;
  color: #9ca3af;
  font-size: 9px;
}

.admin-system-list {
  display: flex;
  flex-direction: column;
}

.admin-system-list div {
  padding: 13px 0;
  border-bottom: 1px solid #f0f1f3;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  font-size: 10px;
}

.admin-system-list div:last-child {
  border-bottom: 0;
}

.online {
  color: #16a34a;
}

.pending {
  color: #d97706;
}

.admin-placeholder {
  min-height: calc(100vh - 85px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
  text-align: center;
}

.admin-placeholder-icon {
  width: 70px;
  height: 70px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: #dbeafe;
  color: #2563eb;
  font-size: 28px;
}

.admin-placeholder h2 {
  margin: 18px 0 7px;
  font-size: 25px;
}

.admin-placeholder p {
  margin: 0;
  color: #9ca3af;
  font-size: 12px;
}

@media (max-width: 900px) {
  .admin-sidebar {
    width: 210px;
  }

  .admin-main {
    width: calc(100% - 210px);
    margin-left: 210px;
  }

  .admin-stat-grid {
    grid-template-columns: 1fr 1fr;
  }

  .admin-section-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .admin-sidebar {
    width: 65px;
    padding: 15px 8px;
  }

  .admin-logo {
    justify-content: center;
    padding: 5px 0 25px;
  }

  .admin-logo > div:last-child,
  .admin-nav-title,
  .admin-nav-item > span:last-child,
  .admin-user > div:last-child,
  .admin-logout {
    display: none;
  }

  .admin-nav-item {
    justify-content: center;
  }

  .admin-main {
    width: calc(100% - 65px);
    margin-left: 65px;
  }

  .admin-header {
    padding: 15px 18px;
  }

  .admin-header-actions {
    display: none;
  }

  .admin-content {
    padding: 18px;
  }

  .admin-stat-grid {
    grid-template-columns: 1fr 1fr;
  }

  .admin-welcome {
    padding: 23px;
  }

  .admin-welcome-icon {
    display: none;
  }

  .admin-quick-grid {
    grid-template-columns: 1fr;
  }
}
`;
