import React, { useState } from "react";
import ClientDetails from "./ClientDetails";

export default function ClientManager() {
  const [selectedClient, setSelectedClient] =
    useState(null);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [showAddClient, setShowAddClient] =
    useState(false);

  const [clients, setClients] = useState([
    {
      id: "CL-001",
      name: "Kevion",
      owner: "Md. Dilower Hossain",
      phone: "+880 1700-000000",
      email: "hello@kevion.com",
      plan: "Premium",
      status: "Active",
      landingPage: "Published",
      created: "15 Aug 2026",
      orders: "124",
    },
    {
      id: "CL-002",
      name: "Smart Gadgets BD",
      owner: "Rahim Ahmed",
      phone: "+880 1800-000000",
      email: "smartgadgets@example.com",
      plan: "Business",
      status: "Active",
      landingPage: "Draft",
      created: "12 Aug 2026",
      orders: "87",
    },
    {
      id: "CL-003",
      name: "Baby World",
      owner: "Sadia Rahman",
      phone: "+880 1900-000000",
      email: "babyworld@example.com",
      plan: "Starter",
      status: "Active",
      landingPage: "Published",
      created: "08 Aug 2026",
      orders: "51",
    },
    {
      id: "CL-004",
      name: "Tech Corner",
      owner: "Arif Khan",
      phone: "+880 1600-000000",
      email: "techcorner@example.com",
      plan: "Business",
      status: "Inactive",
      landingPage: "Draft",
      created: "02 Aug 2026",
      orders: "23",
    },
    {
      id: "CL-005",
      name: "Home Essentials",
      owner: "Nusrat Jahan",
      phone: "+880 1500-000000",
      email: "homeessentials@example.com",
      plan: "Premium",
      status: "Active",
      landingPage: "Published",
      created: "29 Jul 2026",
      orders: "76",
    },
  ]);

  const filteredClients = clients.filter(
    (client) => {
      const matchesSearch =
        client.name
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        client.owner
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        client.id
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All" ||
        client.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    }
  );

  const openClient = (client) => {
    setSelectedClient(client);
  };

  const closeClient = () => {
    setSelectedClient(null);
  };

  const addClient = (newClient) => {
    setClients((prev) => [
      {
        ...newClient,
        id: `CL-${String(
          prev.length + 1
        ).padStart(3, "0")}`,
        created: "21 Aug 2026",
        orders: "0",
        landingPage: "Draft",
      },
      ...prev,
    ]);

    setShowAddClient(false);
  };

  if (selectedClient) {
    return (
      <ClientDetails
        client={selectedClient}
        onBack={closeClient}
      />
    );
  }

  return (
    <div className="client-manager">
      <style>{styles}</style>

      {/* HEADER */}

      <div className="cm-header">

        <div>
          <span className="cm-eyebrow">
            MAIN ADMIN
          </span>

          <h1>
            Clients
          </h1>

          <p>
            Manage your landing page
            clients and their services.
          </p>
        </div>

        <button
          className="cm-add-button"
          onClick={() =>
            setShowAddClient(true)
          }
        >
          <span>+</span>
          Add New Client
        </button>

      </div>

      {/* STATS */}

      <div className="cm-stats">

        <StatCard
          label="TOTAL CLIENTS"
          value={clients.length}
          icon="◉"
        />

        <StatCard
          label="ACTIVE CLIENTS"
          value={
            clients.filter(
              (c) =>
                c.status === "Active"
            ).length
          }
          icon="✓"
        />

        <StatCard
          label="PUBLISHED PAGES"
          value={
            clients.filter(
              (c) =>
                c.landingPage ===
                "Published"
            ).length
          }
          icon="▣"
        />

        <StatCard
          label="DRAFT PAGES"
          value={
            clients.filter(
              (c) =>
                c.landingPage ===
                "Draft"
            ).length
          }
          icon="✎"
        />

      </div>

      {/* TOOLBAR */}

      <div className="cm-toolbar">

        <div className="cm-search">

          <span>
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search clients..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

        </div>

        <div className="cm-filters">

          {[
            "All",
            "Active",
            "Inactive",
          ].map((filter) => (
            <button
              key={filter}
              className={
                statusFilter ===
                filter
                  ? "active"
                  : ""
              }
              onClick={() =>
                setStatusFilter(
                  filter
                )
              }
            >
              {filter}
            </button>
          ))}

        </div>

      </div>

      {/* CLIENT TABLE */}

      <div className="cm-table-card">

        <div className="cm-table-header">

          <div>
            <span>
              CLIENT DIRECTORY
            </span>

            <h2>
              All Clients
            </h2>
          </div>

          <div className="cm-result-count">
            {filteredClients.length}{" "}
            clients
          </div>

        </div>

        <div className="cm-table-wrapper">

          <table>

            <thead>
              <tr>
                <th>
                  CLIENT
                </th>

                <th>
                  CONTACT
                </th>

                <th>
                  PLAN
                </th>

                <th>
                  LANDING PAGE
                </th>

                <th>
                  STATUS
                </th>

                <th>
                  ACTION
                </th>
              </tr>
            </thead>

            <tbody>

              {filteredClients.map(
                (client) => (
                  <tr
                    key={client.id}
                  >

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
                            {client.id}
                          </span>

                        </div>

                      </div>

                    </td>

                    <td>

                      <div className="cm-contact">

                        <strong>
                          {client.owner}
                        </strong>

                        <span>
                          {client.phone}
                        </span>

                      </div>

                    </td>

                    <td>

                      <span className="cm-plan">
                        {client.plan}
                      </span>

                    </td>

                    <td>

                      <div className="cm-page-status">

                        <span
                          className={
                            client.landingPage ===
                            "Published"
                              ? "published"
                              : "draft"
                          }
                        >
                          {client.landingPage}
                        </span>

                      </div>

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
                        className="cm-view-button"
                        onClick={() =>
                          openClient(
                            client
                          )
                        }
                      >
                        View
                        <span>
                          →
                        </span>
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

          {filteredClients.length ===
            0 && (
            <div className="cm-empty">
              <div>
                ⌕
              </div>

              <h3>
                No clients found
              </h3>

              <p>
                Try changing your
                search or filter.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* ADD CLIENT MODAL */}

      {showAddClient && (
        <AddClientModal
          onClose={() =>
            setShowAddClient(false)
          }
          onAdd={addClient}
        />
      )}

    </div>
  );
}

/* =========================
   STAT CARD
========================= */

function StatCard({
  label,
  value,
  icon,
}) {
  return (
    <div className="cm-stat-card">

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

/* =========================
   ADD CLIENT MODAL
========================= */

function AddClientModal({
  onClose,
  onAdd,
}) {
  const [form, setForm] =
    useState({
      name: "",
      owner: "",
      phone: "",
      email: "",
      plan: "Starter",
      status: "Active",
    });

  const updateField = (
    field,
    value
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.owner.trim() ||
      !form.phone.trim()
    ) {
      alert(
        "Please fill in the required fields."
      );
      return;
    }

    onAdd(form);
  };

  return (
    <div
      className="cm-modal-overlay"
      onClick={onClose}
    >

      <div
        className="cm-add-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        <div className="cm-modal-header">

          <div>

            <span>
              CLIENT MANAGEMENT
            </span>

            <h2>
              Add New Client
            </h2>

          </div>

          <button
            onClick={onClose}
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
        >

          <div className="cm-form">

            <FormField
              label="Business Name"
              required
              value={form.name}
              onChange={(value) =>
                updateField(
                  "name",
                  value
                )
              }
              placeholder="e.g. Kevion"
            />

            <FormField
              label="Owner Name"
              required
              value={form.owner}
              onChange={(value) =>
                updateField(
                  "owner",
                  value
                )
              }
              placeholder="Client owner name"
            />

            <FormField
              label="Phone Number"
              required
              value={form.phone}
              onChange={(value) =>
                updateField(
                  "phone",
                  value
                )
              }
              placeholder="+880..."
            />

            <FormField
              label="Email"
              value={form.email}
              onChange={(value) =>
                updateField(
                  "email",
                  value
                )
              }
              placeholder="client@example.com"
            />

            <div className="cm-field">

              <label>
                Plan
              </label>

              <select
                value={form.plan}
                onChange={(e) =>
                  updateField(
                    "plan",
                    e.target.value
                  )
                }
              >
                <option>
                  Starter
                </option>

                <option>
                  Business
                </option>

                <option>
                  Premium
                </option>
              </select>

            </div>

            <div className="cm-field">

              <label>
                Account Status
              </label>

              <select
                value={form.status}
                onChange={(e) =>
                  updateField(
                    "status",
                    e.target.value
                  )
                }
              >
                <option>
                  Active
                </option>

                <option>
                  Inactive
                </option>

              </select>

            </div>

          </div>

          <div className="cm-modal-footer">

            <button
              type="button"
              className="cm-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="cm-save"
            >
              Create Client
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

/* =========================
   FORM FIELD
========================= */

function FormField({
  label,
  required,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="cm-field">

      <label>
        {label}

        {required && (
          <span>
            *
          </span>
        )}
      </label>

      <input
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={
          placeholder
        }
      />

    </div>
  );
}

/* =========================
   STYLES
========================= */

const styles = `
.client-manager {
  min-height: 100%;
  padding: 25px 30px 45px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.client-manager * {
  box-sizing: border-box;
}

/* HEADER */

.cm-header {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
}

.cm-eyebrow {
  color: #2563eb;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .13em;
}

.cm-header h1 {
  margin: 5px 0 4px;
  font-size: 24px;
  letter-spacing: -.04em;
}

.cm-header p {
  margin: 0;
  color: #6b7280;
  font-size: 8px;
}

.cm-add-button {
  padding: 10px 13px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  border-radius: 6px;
  background: #111827;
  color: white;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.cm-add-button span {
  font-size: 13px;
}

/* STATS */

.cm-stats {
  margin-bottom: 17px;
  display: grid;
  grid-template-columns:
    repeat(4, 1fr);
  gap: 9px;
}

.cm-stat-card {
  padding: 13px;
  display: flex;
  align-items: center;
  gap: 10px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.cm-stat-icon {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: #f3f4f6;
  color: #374151;
  font-size: 11px;
}

.cm-stat-card span {
  display: block;
  color: #9ca3af;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .08em;
}

.cm-stat-card strong {
  display: block;
  margin-top: 4px;
  font-size: 17px;
}

/* TOOLBAR */

.cm-toolbar {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.cm-search {
  width: 270px;
  height: 32px;
  padding: 0 9px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
}

.cm-search span {
  color: #9ca3af;
  font-size: 12px;
}

.cm-search input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #374151;
  font-size: 8px;
  background: transparent;
}

.cm-search input::placeholder {
  color: #b0b5bd;
}

.cm-filters {
  display: flex;
  padding: 3px;
  gap: 2px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: white;
}

.cm-filters button {
  padding: 6px 9px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: #6b7280;
  font-size: 7px;
  font-weight: 700;
  cursor: pointer;
}

.cm-filters button.active {
  background: #111827;
  color: white;
}

/* TABLE */

.cm-table-card {
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background: white;
  overflow: hidden;
}

.cm-table-header {
  padding: 14px 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eef0f2;
}

.cm-table-header span {
  color: #9ca3af;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .12em;
}

.cm-table-header h2 {
  margin: 5px 0 0;
  font-size: 13px;
}

.cm-result-count {
  color: #9ca3af;
  font-size: 7px;
}

.cm-table-wrapper {
  overflow-x: auto;
}

.cm-table-wrapper table {
  width: 100%;
  min-width: 750px;
  border-collapse: collapse;
}

.cm-table-wrapper th {
  padding: 9px 14px;
  background: #fafbfc;
  color: #9ca3af;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .08em;
  text-align: left;
}

.cm-table-wrapper td {
  padding: 11px 14px;
  border-top: 1px solid #f1f2f4;
  vertical-align: middle;
}

.cm-client {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cm-avatar {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  flex: 0 0 31px;
  border-radius: 7px;
  background: #111827;
  color: white;
  font-size: 8px;
  font-weight: 900;
}

.cm-client strong,
.cm-contact strong {
  display: block;
  font-size: 8px;
}

.cm-client span,
.cm-contact span {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 6px;
}

.cm-plan {
  padding: 4px 6px;
  border-radius: 4px;
  background: #f3f4f6;
  color: #374151;
  font-size: 6px;
  font-weight: 800;
}

.cm-page-status span,
.cm-status {
  display: inline-block;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 6px;
  font-weight: 900;
}

.cm-page-status .published {
  background: #dcfce7;
  color: #15803d;
}

.cm-page-status .draft {
  background: #fef3c7;
  color: #b45309;
}

.cm-status.active {
  background: #dcfce7;
  color: #15803d;
}

.cm-status.inactive {
  background: #f3f4f6;
  color: #6b7280;
}

.cm-view-button {
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: white;
  color: #374151;
  font-size: 7px;
  font-weight: 800;
  cursor: pointer;
}

.cm-view-button:hover {
  border-color: #111827;
  color: #111827;
}

.cm-view-button span {
  font-size: 9px;
}

/* EMPTY */

.cm-empty {
  padding: 55px 20px;
  text-align: center;
}

.cm-empty > div {
  width: 40px;
  height: 40px;
  margin: auto;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 16px;
}

.cm-empty h3 {
  margin: 10px 0 4px;
  font-size: 12px;
}

.cm-empty p {
  margin: 0;
  color: #9ca3af;
  font-size: 7px;
}

/* MODAL */

.cm-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17,24,39,.45);
}

.cm-add-modal {
  width: 100%;
  max-width: 560px;
  border-radius: 11px;
  background: white;
  box-shadow: 0 25px 70px rgba(0,0,0,.18);
  overflow: hidden;
}

.cm-modal-header {
  padding: 17px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eef0f2;
}

.cm-modal-header span {
  color: #2563eb;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .12em;
}

.cm-modal-header h2 {
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
  padding: 17px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;
}

.cm-field {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.cm-field label {
  color: #374151;
  font-size: 7px;
  font-weight: 800;
}

.cm-field label span {
  color: #ef4444;
  margin-left: 2px;
}

.cm-field input,
.cm-field select {
  width: 100%;
  height: 32px;
  padding: 0 9px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  outline: none;
  background: white;
  color: #374151;
  font-size: 8px;
}

.cm-field input:focus,
.cm-field select:focus {
  border-color: #9ca3af;
}

.cm-modal-footer {
  padding: 12px 17px;
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  border-top: 1px solid #eef0f2;
  background: #fafbfc;
}

.cm-cancel,
.cm-save {
  padding: 9px 12px;
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

@media (max-width: 600px) {

  .client-manager {
    padding: 18px;
  }

  .cm-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .cm-add-button {
    width: 100%;
    justify-content: center;
  }

  .cm-stats {
    grid-template-columns: 1fr;
  }

  .cm-toolbar {
    align-items: stretch;
    flex-direction: column;
  }

  .cm-search {
    width: 100%;
  }

  .cm-filters {
    width: max-content;
  }

  .cm-form {
    grid-template-columns: 1fr;
  }

}
`;
