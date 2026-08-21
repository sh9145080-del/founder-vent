import React, { useState } from "react";

export default function ClientManager() {
  const [showCreate, setShowCreate] = useState(false);

  const [clients, setClients] = useState([
    {
      id: "CL-1001",
      name: "Rahman Electronics",
      owner: "Abdullah Rahman",
      phone: "01700-000000",
      email: "rahman@example.com",
      plan: "Professional",
      status: "Active",
      landingPage: "Published",
      template: "Template 1",
      requests: 2,
      orders: 34,
      created: "18 Aug 2026",
    },
    {
      id: "CL-1002",
      name: "Nila Fashion",
      owner: "Nila Akter",
      phone: "01800-000000",
      email: "nila@example.com",
      plan: "Basic",
      status: "Active",
      landingPage: "Draft",
      template: "Template 3",
      requests: 1,
      orders: 12,
      created: "15 Aug 2026",
    },
    {
      id: "CL-1003",
      name: "Smart Gadget BD",
      owner: "Sakib Hasan",
      phone: "01900-000000",
      email: "sakib@example.com",
      plan: "Professional",
      status: "Inactive",
      landingPage: "Unpublished",
      template: "Template 5",
      requests: 4,
      orders: 0,
      created: "09 Aug 2026",
    },
  ]);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    businessName: "",
    ownerName: "",
    phone: "",
    email: "",
    plan: "Basic",
  });

  const filteredClients = clients.filter((client) => {
    const value = search.toLowerCase();

    return (
      client.name.toLowerCase().includes(value) ||
      client.owner.toLowerCase().includes(value) ||
      client.id.toLowerCase().includes(value)
    );
  });

  const handleFormChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const createClient = () => {
    if (
      !form.businessName.trim() ||
      !form.ownerName.trim() ||
      !form.phone.trim()
    ) {
      alert(
        "Business name, owner name এবং phone number দিন।"
      );
      return;
    }

    const newClient = {
      id: `CL-${1000 + clients.length + 1}`,
      name: form.businessName.trim(),
      owner: form.ownerName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      plan: form.plan,
      status: "Active",
      landingPage: "Not Created",
      template: "Not Selected",
      requests: 0,
      orders: 0,
      created: "21 Aug 2026",
    };

    setClients((prev) => [
      newClient,
      ...prev,
    ]);

    setForm({
      businessName: "",
      ownerName: "",
      phone: "",
      email: "",
      plan: "Basic",
    });

    setShowCreate(false);
  };

  return (
    <div className="client-manager">
      <style>{styles}</style>

      {/* HEADER */}

      <div className="cm-header">

        <div>
          <span className="cm-kicker">
            CLIENT MANAGEMENT
          </span>

          <h2>
            Clients
          </h2>

          <p>
            আপনার সকল client account এখান
            থেকে manage করুন।
          </p>
        </div>

        <button
          className="cm-create-button"
          onClick={() =>
            setShowCreate(true)
          }
        >
          <span>+</span>
          Create Client
        </button>

      </div>

      {/* STATS */}

      <div className="cm-stats">

        <StatCard
          label="Total Clients"
          value={clients.length}
          icon="◉"
        />

        <StatCard
          label="Active Clients"
          value={
            clients.filter(
              (c) => c.status === "Active"
            ).length
          }
          icon="✓"
        />

        <StatCard
          label="Published Pages"
          value={
            clients.filter(
              (c) =>
                c.landingPage ===
                "Published"
            ).length
          }
          icon="◈"
        />

        <StatCard
          label="Pending Requests"
          value={clients.reduce(
            (total, client) =>
              total + client.requests,
            0
          )}
          icon="✎"
        />

      </div>

      {/* TABLE CARD */}

      <div className="cm-card">

        <div className="cm-toolbar">

          <div>
            <h3>
              All Clients
            </h3>

            <span>
              Manage your client accounts
            </span>
          </div>

          <div className="cm-search">
            <span>
              ⌕
            </span>

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search client..."
            />
          </div>

        </div>

        <div className="cm-table-wrapper">

          <table className="cm-table">

            <thead>
              <tr>
                <th>CLIENT</th>
                <th>PLAN</th>
                <th>LANDING PAGE</th>
                <th>REQUESTS</th>
                <th>ORDERS</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {filteredClients.map(
                (client) => (
                  <tr key={client.id}>

                    <td>

                      <div className="cm-client">

                        <div className="cm-avatar">
                          {client.name
                            .charAt(0)
                            .toUpperCase()}
                        </div>

                        <div>
                          <strong>
                            {client.name}
                          </strong>

                          <span>
                            {client.owner}
                          </span>

                          <small>
                            {client.id}
                          </small>
                        </div>

                      </div>

                    </td>

                    <td>
                      <span className="cm-plan">
                        {client.plan}
                      </span>
                    </td>

                    <td>

                      <div className="cm-page">

                        <span
                          className={`cm-page-dot ${
                            client.landingPage
                              .toLowerCase()
                              .replace(
                                " ",
                                "-"
                              )
                          }`}
                        ></span>

                        <span>
                          {client.landingPage}
                        </span>

                      </div>

                      <small className="cm-template">
                        {client.template}
                      </small>

                    </td>

                    <td>

                      {client.requests > 0 ? (
                        <span className="cm-request-count">
                          {client.requests}
                        </span>
                      ) : (
                        <span className="cm-zero">
                          0
                        </span>
                      )}

                    </td>

                    <td>
                      <strong className="cm-orders">
                        {client.orders}
                      </strong>
                    </td>

                    <td>

                      <span
                        className={`cm-status ${
                          client.status.toLowerCase()
                        }`}
                      >
                        {client.status}
                      </span>

                    </td>

                    <td>

                      <button
                        className="cm-action"
                        onClick={() =>
                          alert(
                            `Client: ${client.name}\n\nClient details and Landing Page management will be connected here.`
                          )
                        }
                      >
                        View
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {filteredClients.length === 0 && (
            <div className="cm-empty">
              <div>⌕</div>

              <strong>
                No clients found
              </strong>

              <span>
                Try another search.
              </span>
            </div>
          )}

        </div>

      </div>

      {/* CREATE CLIENT MODAL */}

      {showCreate && (
        <div
          className="cm-modal-overlay"
          onClick={() =>
            setShowCreate(false)
          }
        >

          <div
            className="cm-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cm-modal-header">

              <div>
                <span>
                  NEW CLIENT
                </span>

                <h3>
                  Create Client
                </h3>
              </div>

              <button
                onClick={() =>
                  setShowCreate(false)
                }
              >
                ×
              </button>

            </div>

            <div className="cm-form">

              <FormField
                label="Business Name"
                placeholder="Example: Rahman Electronics"
                value={form.businessName}
                onChange={(value) =>
                  handleFormChange(
                    "businessName",
                    value
                  )
                }
              />

              <FormField
                label="Owner Name"
                placeholder="Client owner name"
                value={form.ownerName}
                onChange={(value) =>
                  handleFormChange(
                    "ownerName",
                    value
                  )
                }
              />

              <FormField
                label="Phone Number"
                placeholder="01XXXXXXXXX"
                value={form.phone}
                onChange={(value) =>
                  handleFormChange(
                    "phone",
                    value
                  )
                }
              />

              <FormField
                label="Email"
                placeholder="client@example.com"
                value={form.email}
                onChange={(value) =>
                  handleFormChange(
                    "email",
                    value
                  )
                }
              />

              <div className="cm-field cm-full">

                <label>
                  Plan
                </label>

                <select
                  value={form.plan}
                  onChange={(e) =>
                    handleFormChange(
                      "plan",
                      e.target.value
                    )
                  }
                >
                  <option>
                    Basic
                  </option>

                  <option>
                    Professional
                  </option>

                  <option>
                    Premium
                  </option>
                </select>

              </div>

            </div>

            <div className="cm-modal-footer">

              <button
                className="cm-cancel"
                onClick={() =>
                  setShowCreate(false)
                }
              >
                Cancel
              </button>

              <button
                className="cm-save"
                onClick={createClient}
              >
                Create Client
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}) {
  return (
    <div className="cm-stat">

      <div className="cm-stat-icon">
        {icon}
      </div>

      <div>
        <span>
          {label}
        </span>

        <strong>
          {value}
        </strong>
      </div>

    </div>
  );
}

function FormField({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="cm-field">

      <label>
        {label}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder={placeholder}
      />

    </div>
  );
}

const styles = `
.client-manager {
  min-height: 100%;
  padding: 30px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.client-manager * {
  box-sizing: border-box;
}

/* HEADER */

.cm-header {
  margin-bottom: 22px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.cm-kicker {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .14em;
}

.cm-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.cm-header p {
  margin: 0;
  color: #6b7280;
  font-size: 10px;
}

.cm-create-button {
  padding: 11px 15px;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 0;
  border-radius: 7px;
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

.cm-create-button span {
  font-size: 14px;
}

/* STATS */

.cm-stats {
  margin-bottom: 18px;
  display: grid;
  grid-template-columns:
    repeat(4, 1fr);
  gap: 12px;
}

.cm-stat {
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background: white;
}

.cm-stat-icon {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f3f4f6;
  color: #374151;
  font-size: 12px;
  font-weight: 900;
}

.cm-stat span {
  display: block;
  color: #9ca3af;
  font-size: 7px;
}

.cm-stat strong {
  display: block;
  margin-top: 4px;
  font-size: 18px;
}

/* CARD */

.cm-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  overflow: hidden;
}

.cm-toolbar {
  padding: 16px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid #eef0f2;
}

.cm-toolbar h3 {
  margin: 0;
  font-size: 13px;
}

.cm-toolbar > div:first-child span {
  display: block;
  margin-top: 4px;
  color: #9ca3af;
  font-size: 7px;
}

.cm-search {
  width: 220px;
  height: 32px;
  padding: 0 9px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.cm-search span {
  color: #9ca3af;
  font-size: 13px;
}

.cm-search input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #374151;
  font-size: 8px;
}

/* TABLE */

.cm-table-wrapper {
  overflow-x: auto;
}

.cm-table {
  width: 100%;
  min-width: 850px;
  border-collapse: collapse;
}

.cm-table th {
  padding: 10px 15px;
  border-bottom: 1px solid #eef0f2;
  background: #fafbfc;
  color: #9ca3af;
  text-align: left;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .08em;
}

.cm-table td {
  padding: 13px 15px;
  border-bottom: 1px solid #f1f2f4;
  vertical-align: middle;
}

.cm-table tbody tr:hover {
  background: #fcfcfd;
}

.cm-client {
  min-width: 190px;
  display: flex;
  align-items: center;
  gap: 9px;
}

.cm-avatar {
  width: 31px;
  height: 31px;
  flex: 0 0 31px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 900;
}

.cm-client strong {
  display: block;
  font-size: 8px;
}

.cm-client span {
  display: block;
  margin-top: 2px;
  color: #6b7280;
  font-size: 7px;
}

.cm-client small {
  display: block;
  margin-top: 2px;
  color: #b0b6c0;
  font-size: 6px;
}

.cm-plan {
  padding: 4px 7px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #4b5563;
  font-size: 6px;
  font-weight: 800;
}

.cm-page {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4b5563;
  font-size: 7px;
  font-weight: 700;
}

.cm-page-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9ca3af;
}

.cm-page-dot.published {
  background: #16a34a;
}

.cm-page-dot.draft {
  background: #f59e0b;
}

.cm-page-dot.unpublished {
  background: #ef4444;
}

.cm-page-dot.not-created {
  background: #9ca3af;
}

.cm-template {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 6px;
}

.cm-request-count {
  min-width: 20px;
  padding: 4px 6px;
  display: inline-block;
  border-radius: 10px;
  background: #fff7ed;
  color: #ea580c;
  text-align: center;
  font-size: 6px;
  font-weight: 900;
}

.cm-zero {
  color: #c4c8ce;
  font-size: 7px;
}

.cm-orders {
  color: #374151;
  font-size: 8px;
}

.cm-status {
  padding: 4px 7px;
  border-radius: 4px;
  font-size: 6px;
  font-weight: 900;
}

.cm-status.active {
  background: #dcfce7;
  color: #15803d;
}

.cm-status.inactive {
  background: #f3f4f6;
  color: #6b7280;
}

.cm-action {
  padding: 5px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: white;
  color: #4b5563;
  font-size: 7px;
  font-weight: 800;
  cursor: pointer;
}

.cm-action:hover {
  background: #f9fafb;
}

/* EMPTY */

.cm-empty {
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #9ca3af;
}

.cm-empty div {
  font-size: 25px;
}

.cm-empty strong {
  margin-top: 8px;
  color: #374151;
  font-size: 10px;
}

.cm-empty span {
  margin-top: 4px;
  font-size: 7px;
}

/* MODAL */

.cm-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(17,24,39,.45);
}

.cm-modal {
  width: 100%;
  max-width: 480px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 25px 70px rgba(0,0,0,.18);
  overflow: hidden;
}

.cm-modal-header {
  padding: 18px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eef0f2;
}

.cm-modal-header span {
  color: #2563eb;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .12em;
}

.cm-modal-header h3 {
  margin: 5px 0 0;
  font-size: 15px;
}

.cm-modal-header button {
  width: 27px;
  height: 27px;
  border: 0;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 17px;
  cursor: pointer;
}

.cm-form {
  padding: 18px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.cm-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cm-full {
  grid-column: 1 / -1;
}

.cm-field label {
  color: #4b5563;
  font-size: 8px;
  font-weight: 800;
}

.cm-field input,
.cm-field select {
  width: 100%;
  padding: 10px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  outline: 0;
  background: white;
  color: #111827;
  font-family: inherit;
  font-size: 8px;
}

.cm-field input:focus,
.cm-field select:focus {
  border-color: #93c5fd;
}

.cm-modal-footer {
  padding: 13px 18px;
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  border-top: 1px solid #eef0f2;
  background: #fafbfc;
}

.cm-cancel,
.cm-save {
  padding: 9px 13px;
  border-radius: 6px;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.cm-cancel {
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
}

.cm-save {
  border: 0;
  background: #111827;
  color: white;
}

/* RESPONSIVE */

@media (max-width: 900px) {
  .cm-stats {
    grid-template-columns:
      repeat(2, 1fr);
  }
}

@media (max-width: 650px) {
  .client-manager {
    padding: 18px;
  }

  .cm-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .cm-create-button {
    width: 100%;
    justify-content: center;
  }

  .cm-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .cm-search {
    width: 100%;
  }

  .cm-form {
    grid-template-columns: 1fr;
  }

  .cm-full {
    grid-column: auto;
  }
}
`;
