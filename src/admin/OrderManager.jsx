import React, { useMemo, useState } from "react";

export default function OrderManager() {
  const [orders, setOrders] = useState([
    {
      id: "ORD-1001",
      customer: "Sadia Rahman",
      phone: "017XXXXXXXX",
      address: "Mirpur, Dhaka",
      quantity: 2,
      location: "Inside Dhaka",
      payment: "Cash on Delivery",
      productPrice: 2580,
      delivery: 70,
      total: 2650,
      status: "Pending",
      date: "21 Aug 2026, 10:42 AM",
    },
    {
      id: "ORD-1002",
      customer: "Tanvir Ahmed",
      phone: "018XXXXXXXX",
      address: "Chattogram",
      quantity: 1,
      location: "Outside Dhaka",
      payment: "Delivery Charge Advance",
      productPrice: 1290,
      delivery: 120,
      total: 1410,
      status: "Confirmed",
      date: "21 Aug 2026, 09:18 AM",
    },
    {
      id: "ORD-1003",
      customer: "Mim Akter",
      phone: "019XXXXXXXX",
      address: "Uttara, Dhaka",
      quantity: 1,
      location: "Inside Dhaka",
      payment: "Full Payment Advance",
      productPrice: 1290,
      delivery: 70,
      total: 1360,
      status: "Delivered",
      date: "20 Aug 2026, 04:35 PM",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customer
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.phone.includes(search);

      const matchesFilter =
        filter === "All" ||
        order.status === filter;

      return (
        matchesSearch && matchesFilter
      );
    });
  }, [orders, search, filter]);

  const updateStatus = (id, status) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id
          ? { ...order, status }
          : order
      )
    );

    if (
      selectedOrder &&
      selectedOrder.id === id
    ) {
      setSelectedOrder((prev) => ({
        ...prev,
        status,
      }));
    }
  };

  const deleteOrder = (id) => {
    const confirmed = window.confirm(
      "এই order টি delete করতে চান?"
    );

    if (!confirmed) return;

    setOrders((prev) =>
      prev.filter(
        (order) => order.id !== id
      )
    );

    if (
      selectedOrder &&
      selectedOrder.id === id
    ) {
      setSelectedOrder(null);
    }
  };

  const pendingCount = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const confirmedCount = orders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const deliveredCount = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const totalSales = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return (
    <div className="order-manager">
      <style>{styles}</style>

      {/* HEADER */}

      <div className="om-header">
        <div>
          <span className="om-kicker">
            ORDER MANAGEMENT
          </span>

          <h2>
            Customer Orders
          </h2>

          <p>
            আপনার landing page থেকে আসা
            customer orders এখান থেকে
            পরিচালনা করুন।
          </p>
        </div>

        <button
          className="om-refresh"
          onClick={() =>
            alert(
              "Orders will be synced with the database after backend connection."
            )
          }
        >
          ↻ Refresh Orders
        </button>
      </div>

      {/* STATS */}

      <div className="om-stats">

        <StatCard
          label="TOTAL ORDERS"
          value={orders.length}
          sub="All customer orders"
        />

        <StatCard
          label="PENDING"
          value={pendingCount}
          sub="Need attention"
        />

        <StatCard
          label="CONFIRMED"
          value={confirmedCount}
          sub="Ready to process"
        />

        <StatCard
          label="TOTAL SALES"
          value={`৳${totalSales.toLocaleString()}`}
          sub={`${deliveredCount} delivered`}
        />

      </div>

      {/* TOOLBAR */}

      <section className="om-card">

        <div className="om-toolbar">

          <div className="om-search">
            <span>⌕</span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search order ID, customer or phone..."
            />
          </div>

          <div className="om-filters">

            {[
              "All",
              "Pending",
              "Confirmed",
              "Delivered",
              "Cancelled",
            ].map((status) => (
              <button
                key={status}
                className={
                  filter === status
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(status)
                }
              >
                {status}
              </button>
            ))}

          </div>

        </div>

      </section>

      {/* ORDER LIST */}

      <section className="om-card om-orders-card">

        <div className="om-list-header">

          <div>
            <span>
              ORDERS
            </span>

            <h3>
              Recent Orders
            </h3>
          </div>

          <small>
            Showing {filteredOrders.length} of{" "}
            {orders.length}
          </small>

        </div>

        <div className="om-table-wrap">

          <table className="om-table">

            <thead>
              <tr>
                <th>ORDER</th>
                <th>CUSTOMER</th>
                <th>LOCATION</th>
                <th>PAYMENT</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>

              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="om-empty"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(
                  (order) => (
                    <tr key={order.id}>

                      <td>
                        <strong className="om-order-id">
                          {order.id}
                        </strong>

                        <small>
                          {order.date}
                        </small>
                      </td>

                      <td>
                        <strong>
                          {order.customer}
                        </strong>

                        <small>
                          {order.phone}
                        </small>
                      </td>

                      <td>
                        <span className="om-location">
                          {order.location}
                        </span>
                      </td>

                      <td>
                        <span className="om-payment">
                          {order.payment}
                        </span>
                      </td>

                      <td>
                        <strong>
                          ৳
                          {order.total.toLocaleString()}
                        </strong>

                        <small>
                          {order.quantity} piece
                        </small>
                      </td>

                      <td>
                        <StatusBadge
                          status={
                            order.status
                          }
                        />
                      </td>

                      <td>
                        <div className="om-actions">

                          <button
                            onClick={() =>
                              setSelectedOrder(
                                order
                              )
                            }
                          >
                            View
                          </button>

                          <select
                            value={
                              order.status
                            }
                            onChange={(e) =>
                              updateStatus(
                                order.id,
                                e.target.value
                              )
                            }
                          >
                            <option>
                              Pending
                            </option>

                            <option>
                              Confirmed
                            </option>

                            <option>
                              Delivered
                            </option>

                            <option>
                              Cancelled
                            </option>
                          </select>

                        </div>
                      </td>

                    </tr>
                  )
                )
              )}

            </tbody>

          </table>

        </div>

      </section>

      {/* ORDER DETAILS MODAL */}

      {selectedOrder && (
        <div
          className="om-modal-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="om-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="om-modal-header">

              <div>
                <span>
                  ORDER DETAILS
                </span>

                <h3>
                  {selectedOrder.id}
                </h3>
              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>

            </div>

            <div className="om-detail-status">
              <StatusBadge
                status={
                  selectedOrder.status
                }
              />
            </div>

            {/* CUSTOMER */}

            <div className="om-detail-section">

              <h4>
                Customer Information
              </h4>

              <DetailRow
                label="Name"
                value={
                  selectedOrder.customer
                }
              />

              <DetailRow
                label="Phone"
                value={
                  selectedOrder.phone
                }
              />

              <DetailRow
                label="Address"
                value={
                  selectedOrder.address
                }
              />

            </div>

            {/* ORDER */}

            <div className="om-detail-section">

              <h4>
                Order Information
              </h4>

              <DetailRow
                label="Quantity"
                value={`${selectedOrder.quantity} piece`}
              />

              <DetailRow
                label="Location"
                value={
                  selectedOrder.location
                }
              />

              <DetailRow
                label="Payment"
                value={
                  selectedOrder.payment
                }
              />

            </div>

            {/* PAYMENT */}

            <div className="om-total-box">

              <div>
                <span>
                  Product Price
                </span>

                <strong>
                  ৳
                  {selectedOrder.productPrice.toLocaleString()}
                </strong>
              </div>

              <div>
                <span>
                  Delivery Charge
                </span>

                <strong>
                  ৳
                  {selectedOrder.delivery.toLocaleString()}
                </strong>
              </div>

              <div className="total">
                <span>
                  Total Amount
                </span>

                <strong>
                  ৳
                  {selectedOrder.total.toLocaleString()}
                </strong>
              </div>

            </div>

            {/* ACTIONS */}

            <div className="om-modal-actions">

              <select
                value={
                  selectedOrder.status
                }
                onChange={(e) =>
                  updateStatus(
                    selectedOrder.id,
                    e.target.value
                  )
                }
              >
                <option>
                  Pending
                </option>

                <option>
                  Confirmed
                </option>

                <option>
                  Delivered
                </option>

                <option>
                  Cancelled
                </option>
              </select>

              <button
                className="om-delete"
                onClick={() =>
                  deleteOrder(
                    selectedOrder.id
                  )
                }
              >
                Delete Order
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}


/* STAT CARD */

function StatCard({
  label,
  value,
  sub,
}) {
  return (
    <div className="om-stat">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

      <small>
        {sub}
      </small>

    </div>
  );
}


/* STATUS BADGE */

function StatusBadge({
  status,
}) {
  const className =
    status
      .toLowerCase()
      .replace(" ", "-");

  return (
    <span
      className={`om-status ${className}`}
    >
      <i></i>
      {status}
    </span>
  );
}


/* DETAIL ROW */

function DetailRow({
  label,
  value,
}) {
  return (
    <div className="om-detail-row">

      <span>
        {label}
      </span>

      <strong>
        {value}
      </strong>

    </div>
  );
}


const styles = `
.order-manager {
  min-height: 100%;
  padding: 30px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.order-manager * {
  box-sizing: border-box;
}

.om-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 25px;
}

.om-kicker {
  color: #2563eb;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .14em;
}

.om-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.om-header p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.om-refresh {
  padding: 11px 15px;
  border: 1px solid #dbe2ea;
  border-radius: 7px;
  background: white;
  color: #374151;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.om-stats {
  display: grid;
  grid-template-columns:
    repeat(4, 1fr);
  gap: 13px;
  margin-bottom: 18px;
}

.om-stat {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
}

.om-stat span {
  color: #9ca3af;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.om-stat strong {
  display: block;
  margin: 7px 0 3px;
  font-size: 23px;
  letter-spacing: -.03em;
}

.om-stat small {
  color: #9ca3af;
  font-size: 8px;
}

.om-card {
  margin-bottom: 18px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  background: white;
}

.om-toolbar {
  display: flex;
  align-items: center;
  gap: 15px;
}

.om-search {
  min-width: 260px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 11px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  background: white;
}

.om-search span {
  color: #9ca3af;
  font-size: 17px;
}

.om-search input {
  width: 100%;
  padding: 10px 0;
  border: 0;
  outline: 0;
  font-size: 10px;
}

.om-filters {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.om-filters button {
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: white;
  color: #6b7280;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.om-filters button.active {
  border-color: #2563eb;
  background: #2563eb;
  color: white;
}

.om-orders-card {
  padding: 0;
  overflow: hidden;
}

.om-list-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.om-list-header span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.om-list-header h3 {
  margin: 5px 0 0;
  font-size: 17px;
}

.om-list-header small {
  color: #9ca3af;
  font-size: 9px;
}

.om-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.om-table {
  width: 100%;
  min-width: 920px;
  border-collapse: collapse;
}

.om-table th {
  padding: 11px 15px;
  border-top: 1px solid #eef0f2;
  border-bottom: 1px solid #eef0f2;
  background: #fafbfc;
  color: #9ca3af;
  text-align: left;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .1em;
}

.om-table td {
  padding: 14px 15px;
  border-bottom: 1px solid #eef0f2;
  vertical-align: middle;
}

.om-table tbody tr:hover {
  background: #fafbfc;
}

.om-table td strong {
  display: block;
  font-size: 10px;
}

.om-table td small {
  display: block;
  margin-top: 4px;
  color: #9ca3af;
  font-size: 8px;
}

.om-order-id {
  color: #2563eb;
}

.om-location,
.om-payment {
  color: #4b5563;
  font-size: 9px;
}

.om-status {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 7px;
  border-radius: 5px;
  font-size: 7px;
  font-weight: 900;
  white-space: nowrap;
}

.om-status i {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
}

.om-status.pending {
  background: #fef3c7;
  color: #b45309;
}

.om-status.confirmed {
  background: #dbeafe;
  color: #2563eb;
}

.om-status.delivered {
  background: #dcfce7;
  color: #15803d;
}

.om-status.cancelled {
  background: #fee2e2;
  color: #dc2626;
}

.om-actions {
  display: flex;
  align-items: center;
  gap: 5px;
}

.om-actions button,
.om-actions select {
  padding: 6px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: white;
  color: #2563eb;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.om-actions select {
  color: #374151;
}

.om-empty {
  padding: 50px !important;
  text-align: center;
  color: #9ca3af;
  font-size: 11px;
}

.om-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17, 24, 39, .45);
}

.om-modal {
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 23px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 20px 60px rgba(0,0,0,.15);
}

.om-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 15px;
}

.om-modal-header span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.om-modal-header h3 {
  margin: 5px 0 0;
  font-size: 19px;
}

.om-modal-header button {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 18px;
  cursor: pointer;
}

.om-detail-status {
  margin: 18px 0;
}

.om-detail-section {
  padding: 15px 0;
  border-top: 1px solid #eef0f2;
}

.om-detail-section h4 {
  margin: 0 0 10px;
  font-size: 11px;
}

.om-detail-row {
  padding: 7px 0;
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.om-detail-row span {
  color: #9ca3af;
  font-size: 9px;
}

.om-detail-row strong {
  max-width: 65%;
  color: #374151;
  text-align: right;
  font-size: 9px;
  line-height: 1.5;
}

.om-total-box {
  margin-top: 8px;
  padding: 14px;
  border-radius: 8px;
  background: #f8fafc;
}

.om-total-box > div {
  padding: 6px 0;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.om-total-box span {
  color: #6b7280;
  font-size: 9px;
}

.om-total-box strong {
  font-size: 10px;
}

.om-total-box .total {
  margin-top: 6px;
  padding-top: 12px;
  border-top: 1px solid #e5e7eb;
}

.om-total-box .total span {
  color: #111827;
  font-weight: 800;
}

.om-total-box .total strong {
  color: #2563eb;
  font-size: 15px;
}

.om-modal-actions {
  margin-top: 18px;
  display: flex;
  justify-content: flex-end;
  gap: 7px;
}

.om-modal-actions select {
  padding: 9px 10px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  background: white;
  font-size: 9px;
}

.om-delete {
  padding: 9px 11px;
  border: 1px solid #fecaca;
  border-radius: 6px;
  background: #fef2f2;
  color: #dc2626;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 900px) {
  .om-stats {
    grid-template-columns:
      repeat(2, 1fr);
  }

  .om-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .om-search {
    min-width: 0;
  }
}

@media (max-width: 600px) {
  .order-manager {
    padding: 18px;
  }

  .om-header {
    align-items: stretch;
    flex-direction: column;
  }

  .om-stats {
    grid-template-columns: 1fr;
  }
}
`;
