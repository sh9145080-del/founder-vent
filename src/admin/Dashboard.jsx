import React from "react";

export default function Dashboard() {
  const stats = [
    {
      label: "TOTAL ORDERS",
      value: "128",
      change: "+12.5%",
      note: "vs last month",
    },
    {
      label: "PENDING ORDERS",
      value: "14",
      change: "+4",
      note: "need attention",
    },
    {
      label: "CONFIRMED ORDERS",
      value: "96",
      change: "+8.2%",
      note: "this month",
    },
    {
      label: "TOTAL SALES",
      value: "৳1,48,650",
      change: "+15.4%",
      note: "this month",
    },
  ];

  const recentOrders = [
    {
      id: "ORD-1008",
      customer: "Sadia Rahman",
      amount: "৳2,650",
      status: "Pending",
      time: "10 min ago",
    },
    {
      id: "ORD-1007",
      customer: "Tanvir Ahmed",
      amount: "৳1,410",
      status: "Confirmed",
      time: "35 min ago",
    },
    {
      id: "ORD-1006",
      customer: "Mim Akter",
      amount: "৳1,360",
      status: "Delivered",
      time: "1 hour ago",
    },
    {
      id: "ORD-1005",
      customer: "Nusrat Jahan",
      amount: "৳2,190",
      status: "Confirmed",
      time: "2 hours ago",
    },
    {
      id: "ORD-1004",
      customer: "Rakib Hasan",
      amount: "৳980",
      status: "Pending",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="client-dashboard">
      <style>{styles}</style>

      {/* HEADER */}

      <div className="dash-header">

        <div>
          <span className="dash-kicker">
            CLIENT DASHBOARD
          </span>

          <h2>
            Good morning 👋
          </h2>

          <p>
            আপনার landing page এবং orders-এর
            বর্তমান অবস্থা এক নজরে দেখুন।
          </p>
        </div>

        <div className="dash-date">
          <span>
            TODAY
          </span>

          <strong>
            21 August 2026
          </strong>
        </div>

      </div>

      {/* STATS */}

      <div className="dash-stats">

        {stats.map((stat) => (
          <div
            className="dash-stat"
            key={stat.label}
          >

            <span className="dash-stat-label">
              {stat.label}
            </span>

            <strong className="dash-stat-value">
              {stat.value}
            </strong>

            <div className="dash-stat-bottom">

              <span className="dash-change">
                ↑ {stat.change}
              </span>

              <small>
                {stat.note}
              </small>

            </div>

          </div>
        ))}

      </div>

      {/* MAIN GRID */}

      <div className="dash-grid">

        {/* RECENT ORDERS */}

        <section className="dash-card dash-orders">

          <div className="dash-card-header">

            <div>
              <span>
                ORDERS
              </span>

              <h3>
                Recent Orders
              </h3>
            </div>

            <button
              onClick={() =>
                alert(
                  "Order Manager will open here."
                )
              }
            >
              View All →
            </button>

          </div>

          <div className="dash-order-list">

            {recentOrders.map(
              (order) => (
                <div
                  className="dash-order"
                  key={order.id}
                >

                  <div className="dash-order-id">
                    <strong>
                      {order.id}
                    </strong>

                    <small>
                      {order.time}
                    </small>
                  </div>

                  <div className="dash-customer">
                    <strong>
                      {order.customer}
                    </strong>

                    <small>
                      Customer
                    </small>
                  </div>

                  <strong className="dash-amount">
                    {order.amount}
                  </strong>

                  <StatusBadge
                    status={
                      order.status
                    }
                  />

                </div>
              )
            )}

          </div>

        </section>

        {/* QUICK ACTIONS */}

        <section className="dash-card">

          <div className="dash-card-header">

            <div>
              <span>
                QUICK ACTIONS
              </span>

              <h3>
                Manage Your Store
              </h3>
            </div>

          </div>

          <div className="dash-actions">

            <QuickAction
              icon="📦"
              title="Products"
              description="Manage product information"
            />

            <QuickAction
              icon="⭐"
              title="Reviews"
              description="Manage customer reviews"
            />

            <QuickAction
              icon="💳"
              title="Payments"
              description="Manage payment methods"
            />

            <QuickAction
              icon="🎨"
              title="Landing Page"
              description="Customize your page"
            />

          </div>

        </section>

      </div>

      {/* SECOND ROW */}

      <div className="dash-grid second">

        {/* LANDING PAGE */}

        <section className="dash-card">

          <div className="dash-card-header">

            <div>
              <span>
                LANDING PAGE
              </span>

              <h3>
                Your Landing Page
              </h3>
            </div>

            <span className="dash-live">
              ● LIVE
            </span>

          </div>

          <div className="dash-page-preview">

            <div className="dash-browser">

              <div className="dash-browser-top">
                <i></i>
                <i></i>
                <i></i>
              </div>

              <div className="dash-browser-body">

                <div className="dash-preview-logo">
                  BRAND
                </div>

                <div className="dash-preview-image">
                  Product Image
                </div>

                <div className="dash-preview-line"></div>

                <div className="dash-preview-line short"></div>

                <div className="dash-preview-button">
                  ORDER NOW
                </div>

              </div>

            </div>

            <div className="dash-page-info">

              <strong>
                Your landing page is live
              </strong>

              <p>
                Customers can currently
                visit your landing page
                and place orders.
              </p>

              <button
                onClick={() =>
                  alert(
                    "Landing page preview will open here."
                  )
                }
              >
                Preview Page →
              </button>

            </div>

          </div>

        </section>

        {/* STORE STATUS */}

        <section className="dash-card">

          <div className="dash-card-header">

            <div>
              <span>
                STORE STATUS
              </span>

              <h3>
                Current Setup
              </h3>
            </div>

          </div>

          <div className="dash-status-list">

            <StatusRow
              title="Landing Page"
              value="Live"
              active
            />

            <StatusRow
              title="Product"
              value="Active"
              active
            />

            <StatusRow
              title="Payment Methods"
              value="3 Active"
              active
            />

            <StatusRow
              title="Order System"
              value="Connected"
              active
            />

            <StatusRow
              title="Reviews"
              value="12 Published"
              active
            />

          </div>

        </section>

      </div>

      {/* HELP BOX */}

      <section className="dash-help">

        <div className="dash-help-icon">
          ?
        </div>

        <div>
          <strong>
            Need help?
          </strong>

          <p>
            Landing page, orders অথবা
            payment settings নিয়ে কোনো
            সমস্যা হলে support-এর সাথে
            যোগাযোগ করুন।
          </p>
        </div>

        <button
          onClick={() =>
            alert(
              "Support section will open here."
            )
          }
        >
          Contact Support
        </button>

      </section>

    </div>
  );
}


/* STATUS BADGE */

function StatusBadge({
  status,
}) {
  const className =
    status.toLowerCase();

  return (
    <span
      className={`dash-status ${className}`}
    >
      <i></i>
      {status}
    </span>
  );
}


/* QUICK ACTION */

function QuickAction({
  icon,
  title,
  description,
}) {
  return (
    <button
      className="dash-action"
      onClick={() =>
        alert(
          `${title} section will open here.`
        )
      }
    >

      <span className="dash-action-icon">
        {icon}
      </span>

      <span className="dash-action-text">

        <strong>
          {title}
        </strong>

        <small>
          {description}
        </small>

      </span>

      <span className="dash-action-arrow">
        →
      </span>

    </button>
  );
}


/* STATUS ROW */

function StatusRow({
  title,
  value,
  active,
}) {
  return (
    <div className="dash-status-row">

      <div>
        <strong>
          {title}
        </strong>

        <small>
          System status
        </small>
      </div>

      <span
        className={
          active
            ? "status-active"
            : "status-inactive"
        }
      >
        ● {value}
      </span>

    </div>
  );
}


const styles = `
.client-dashboard {
  min-height: 100%;
  padding: 30px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.client-dashboard * {
  box-sizing: border-box;
}

.dash-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 25px;
}

.dash-kicker {
  color: #2563eb;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .14em;
}

.dash-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.dash-header p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.dash-date {
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 7px;
  background: white;
  text-align: right;
}

.dash-date span {
  display: block;
  color: #9ca3af;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .12em;
}

.dash-date strong {
  display: block;
  margin-top: 3px;
  font-size: 10px;
}

.dash-stats {
  display: grid;
  grid-template-columns:
    repeat(4, 1fr);
  gap: 13px;
  margin-bottom: 18px;
}

.dash-stat {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
}

.dash-stat-label {
  color: #9ca3af;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.dash-stat-value {
  display: block;
  margin: 8px 0;
  font-size: 23px;
  letter-spacing: -.04em;
}

.dash-stat-bottom {
  display: flex;
  align-items: center;
  gap: 7px;
}

.dash-change {
  color: #16a34a;
  font-size: 8px;
  font-weight: 900;
}

.dash-stat-bottom small {
  color: #9ca3af;
  font-size: 8px;
}

.dash-grid {
  display: grid;
  grid-template-columns:
    1.45fr .9fr;
  gap: 18px;
  margin-bottom: 18px;
}

.dash-grid.second {
  grid-template-columns:
    1.25fr 1fr;
}

.dash-card {
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  background: white;
}

.dash-card-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
}

.dash-card-header span:first-child {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.dash-card-header h3 {
  margin: 5px 0 0;
  font-size: 17px;
}

.dash-card-header button {
  border: 0;
  background: transparent;
  color: #2563eb;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

.dash-order-list {
  display: flex;
  flex-direction: column;
}

.dash-order {
  padding: 13px 0;
  border-top: 1px solid #eef0f2;
  display: grid;
  grid-template-columns:
    1.1fr 1.2fr .7fr .7fr;
  align-items: center;
  gap: 12px;
}

.dash-order strong {
  display: block;
  font-size: 9px;
}

.dash-order small {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 7px;
}

.dash-amount {
  text-align: right;
}

.dash-status {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 7px;
  border-radius: 5px;
  font-size: 7px;
  font-weight: 900;
}

.dash-status i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.dash-status.pending {
  color: #b45309;
  background: #fef3c7;
}

.dash-status.confirmed {
  color: #2563eb;
  background: #dbeafe;
}

.dash-status.delivered {
  color: #15803d;
  background: #dcfce7;
}

.dash-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dash-action {
  width: 100%;
  padding: 11px;
  border: 1px solid #e5e7eb;
  border-radius: 7px;
  background: white;
  display: flex;
  align-items: center;
  gap: 10px;
  text-align: left;
  cursor: pointer;
  transition: .15s;
}

.dash-action:hover {
  border-color: #bfdbfe;
  background: #f8fbff;
}

.dash-action-icon {
  width: 32px;
  height: 32px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: #f3f4f6;
  font-size: 14px;
}

.dash-action-text {
  flex: 1;
}

.dash-action-text strong {
  display: block;
  font-size: 9px;
}

.dash-action-text small {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 7px;
}

.dash-action-arrow {
  color: #9ca3af;
  font-size: 13px;
}

.dash-live {
  color: #16a34a !important;
  font-size: 8px !important;
}

.dash-page-preview {
  display: grid;
  grid-template-columns:
    1fr 1fr;
  gap: 15px;
  align-items: center;
}

.dash-browser {
  overflow: hidden;
  border: 1px solid #dfe3e8;
  border-radius: 7px;
  background: white;
}

.dash-browser-top {
  height: 22px;
  padding-left: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  background: #f3f4f6;
}

.dash-browser-top i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #d1d5db;
}

.dash-browser-body {
  min-height: 170px;
  padding: 14px;
  text-align: center;
}

.dash-preview-logo {
  color: #111827;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .1em;
}

.dash-preview-image {
  height: 72px;
  margin: 12px 0;
  display: grid;
  place-items: center;
  border-radius: 5px;
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 7px;
}

.dash-preview-line {
  width: 80%;
  height: 5px;
  margin: 5px auto;
  border-radius: 4px;
  background: #e5e7eb;
}

.dash-preview-line.short {
  width: 50%;
}

.dash-preview-button {
  width: 80%;
  margin: 12px auto 0;
  padding: 6px;
  border-radius: 4px;
  background: #111827;
  color: white;
  font-size: 6px;
  font-weight: 900;
}

.dash-page-info strong {
  display: block;
  font-size: 11px;
}

.dash-page-info p {
  margin: 7px 0 13px;
  color: #9ca3af;
  font-size: 8px;
  line-height: 1.6;
}

.dash-page-info button {
  padding: 8px 10px;
  border: 0;
  border-radius: 5px;
  background: #111827;
  color: white;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.dash-status-list {
  display: flex;
  flex-direction: column;
}

.dash-status-row {
  padding: 13px 0;
  border-top: 1px solid #eef0f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

.dash-status-row strong {
  display: block;
  font-size: 9px;
}

.dash-status-row small {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 7px;
}

.status-active {
  color: #16a34a;
  font-size: 8px;
  font-weight: 900;
}

.status-inactive {
  color: #9ca3af;
  font-size: 8px;
  font-weight: 900;
}

.dash-help {
  padding: 17px;
  border: 1px solid #bfdbfe;
  border-radius: 9px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  gap: 11px;
}

.dash-help-icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  font-size: 11px;
  font-weight: 900;
}

.dash-help div:nth-child(2) {
  flex: 1;
}

.dash-help strong {
  display: block;
  font-size: 10px;
}

.dash-help p {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 8px;
}

.dash-help button {
  padding: 8px 11px;
  border: 1px solid #bfdbfe;
  border-radius: 5px;
  background: white;
  color: #2563eb;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 950px) {
  .dash-stats {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .dash-grid,
  .dash-grid.second {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 650px) {
  .client-dashboard {
    padding: 18px;
  }

  .dash-header {
    align-items: stretch;
    flex-direction: column;
  }

  .dash-stats {
    grid-template-columns: 1fr;
  }

  .dash-page-preview {
    grid-template-columns: 1fr;
  }

  .dash-order {
    grid-template-columns:
      1fr 1fr;
  }

  .dash-amount,
  .dash-status {
    justify-self: start;
    text-align: left;
  }

  .dash-help {
    align-items: flex-start;
    flex-wrap: wrap;
  }
}
`;
