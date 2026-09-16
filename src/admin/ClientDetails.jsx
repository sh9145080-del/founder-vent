import React, { useState, useEffect } from "react";

export default function ClientDetails({
  client,
  onBack,
}) {
  const [activeTab, setActiveTab] =
    useState("overview");

  const [selectedTemplate, setSelectedTemplate] =
    useState("Template 1");

  const [templates, setTemplates] = useState([]);
  const [templatesLoading, setTemplatesLoading] =
    useState(true);

  const [pageStatus, setPageStatus] =
    useState(
      client?.landingPage === "Published"
        ? "Published"
        : "Draft"
    );

  const [showTemplateModal, setShowTemplateModal] =
    useState(false);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  useEffect(() => {
    fetch("/api/templates")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTemplates(data.templates || []);
        }
      })
      .catch((error) => {
        console.error(
          "Failed to load templates:",
          error
        );
      })
      .finally(() => {
        setTemplatesLoading(false);
      });
  }, []);

  const requests = [
    {
      id: "REQ-102",
      type: "Price / Discount",
      message:
        "Product price needs to be updated.",
      status: "Pending",
      date: "21 Aug 2026",
    },
    {
      id: "REQ-101",
      type: "Product Images",
      message:
        "Please replace the first product image.",
      status: "In Progress",
      date: "20 Aug 2026",
    },
  ];

  const selectTemplate = (template) => {
    setSelectedTemplate(
      template.name || template.id
    );
    setShowTemplateModal(false);
  };

  const createLandingPage = () => {
    setPageStatus("Draft");
    setShowCreateModal(false);
  };

  const togglePublish = () => {
    setPageStatus((prev) =>
      prev === "Published"
        ? "Draft"
        : "Published"
    );
  };

  if (!client) {
    return (
      <div className="cd-empty-page">
        <style>{styles}</style>

        <div className="cd-empty-icon">
          ?
        </div>

        <h2>
          Client not found
        </h2>

        <p>
          The selected client could not be loaded.
        </p>

        <button
          onClick={onBack}
          className="cd-back-button"
        >
          ← Back to Clients
        </button>
      </div>
    );
  }

  return (
    <div className="client-details">
      <style>{styles}</style>

      <div className="cd-top-header">

        <button
          className="cd-back"
          onClick={onBack}
        >
          ←
          <span>
            Back to Clients
          </span>
        </button>

        <div className="cd-actions">

          <button
            className="cd-secondary"
            onClick={() =>
              alert(
                "Landing page preview will be connected here."
              )
            }
          >
            ◉ Preview
          </button>

          <button
            className={`cd-publish ${
              pageStatus === "Published"
                ? "published"
                : ""
            }`}
            onClick={togglePublish}
          >
            {pageStatus === "Published"
              ? "✓ Published"
              : "Publish Landing Page"}
          </button>

        </div>

      </div>

      <div className="cd-client-card">

        <div className="cd-client-main">

          <div className="cd-client-avatar">
            {client.name
              ?.charAt(0)
              .toUpperCase()}
          </div>

          <div>

            <div className="cd-client-title-row">

              <h1>
                {client.name}
              </h1>

              <span
                className={`cd-client-status ${
                  client.status?.toLowerCase()
                }`}
              >
                {client.status}
              </span>

            </div>

            <p>
              {client.owner}
              <span>•</span>
              {client.phone}
              {client.email && (
                <>
                  <span>•</span>
                  {client.email}
                </>
              )}
            </p>

          </div>

        </div>

        <div className="cd-client-id">

          <span>
            CLIENT ID
          </span>

          <strong>
            {client.id}
          </strong>

        </div>

      </div>

      <div className="cd-tabs">

        <button
          className={
            activeTab === "overview"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("overview")
          }
        >
          Overview
        </button>

        <button
          className={
            activeTab === "landing"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("landing")
          }
        >
          Landing Page
        </button>

        <button
          className={
            activeTab === "requests"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("requests")
          }
        >
          Edit Requests
          <span className="cd-tab-count">
            {requests.length}
          </span>
        </button>

        <button
          className={
            activeTab === "settings"
              ? "active"
              : ""
          }
          onClick={() =>
            setActiveTab("settings")
          }
        >
          Client Settings
        </button>

      </div>

      {activeTab === "overview" && (
        <Overview
          client={client}
          pageStatus={pageStatus}
          selectedTemplate={selectedTemplate}
          onCreate={() =>
            setShowCreateModal(true)
          }
          onTemplate={() =>
            setShowTemplateModal(true)
          }
          onLanding={() =>
            setActiveTab("landing")
          }
          onRequests={() =>
            setActiveTab("requests")
          }
        />
      )}

      {activeTab === "landing" && (
        <LandingPageManager
          selectedTemplate={selectedTemplate}
          pageStatus={pageStatus}
          onTemplate={() =>
            setShowTemplateModal(true)
          }
          onCreate={() =>
            setShowCreateModal(true)
          }
          onPublish={togglePublish}
        />
      )}

      {activeTab === "requests" && (
        <RequestManager
          requests={requests}
        />
      )}

      {activeTab === "settings" && (
        <ClientSettings
          client={client}
        />
      )}

      {showTemplateModal && (
        <div
          className="cd-modal-overlay"
          onClick={() =>
            setShowTemplateModal(false)
          }
        >

          <div
            className="cd-template-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cd-modal-header">

              <div>
                <span>
                  LANDING PAGE
                </span>

                <h2>
                  Choose Template
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowTemplateModal(false)
                }
              >
                ×
              </button>

            </div>

            <div className="cd-template-grid">

              {templatesLoading ? (

                <div className="cd-template-loading">
                  Loading templates...
                </div>

              ) : templates.length === 0 ? (

                <div className="cd-template-loading">
                  No templates available.
                </div>

              ) : (

                templates.map(
                  (template) => {

                    const templateKey =
                      template.name ||
                      template.id;

                    return (
                      <button
                        key={
                          template.id ||
                          templateKey
                        }
                        className={`cd-template-card ${
                          selectedTemplate ===
                          templateKey
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          selectTemplate(
                            template
                          )
                        }
                      >

                        <div className="cd-template-preview">

                          <div className="tp-header">
                            <span />
                            <span />
                          </div>

                          <div className="tp-image" />

                          <div className="tp-line" />

                          <div className="tp-price" />

                          <div className="tp-button" />

                        </div>

                        <div className="cd-template-info">

                          <div>
                            <strong>
                              {template.name}
                            </strong>

                            <span>
                              {template.id}
                            </span>
                          </div>

                          {selectedTemplate ===
                            templateKey && (
                            <div className="cd-selected">
                              ✓
                            </div>
                          )}

                        </div>

                        <p>
                          {template.description}
                        </p>

                      </button>
                    );
                  }
                )

              )}

            </div>

          </div>

        </div>
      )}

      {showCreateModal && (
        <div
          className="cd-modal-overlay"
          onClick={() =>
            setShowCreateModal(false)
          }
        >

          <div
            className="cd-create-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <div className="cd-modal-header">

              <div>
                <span>
                  NEW LANDING PAGE
                </span>

                <h2>
                  Create Landing Page
                </h2>
              </div>

              <button
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                ×
              </button>

            </div>

            <div className="cd-create-content">

              <div className="cd-create-icon">
                ◈
              </div>

              <h3>
                Ready to create?
              </h3>

              <p>
                A new landing page will be
                created for{" "}
                <strong>
                  {client.name}
                </strong>{" "}
                using{" "}
                <strong>
                  {selectedTemplate}
                </strong>
                .
              </p>

              <div className="cd-create-summary">

                <div>
                  <span>
                    TEMPLATE
                  </span>

                  <strong>
                    {selectedTemplate}
                  </strong>
                </div>

                <div>
                  <span>
                    STATUS
                  </span>

                  <strong>
                    Draft
                  </strong>
                </div>

              </div>

            </div>

            <div className="cd-modal-footer">

              <button
                className="cd-cancel"
                onClick={() =>
                  setShowCreateModal(false)
                }
              >
                Cancel
              </button>

              <button
                className="cd-confirm"
                onClick={createLandingPage}
              >
                Create Landing Page
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

/* =========================
   OVERVIEW
========================= */

function Overview({
  client,
  pageStatus,
  selectedTemplate,
  onCreate,
  onTemplate,
  onLanding,
  onRequests,
}) {
  return (
    <div className="cd-content">

      <div className="cd-grid">

        <div className="cd-card cd-page-card">

          <div className="cd-card-header">

            <div>
              <span>
                LANDING PAGE
              </span>

              <h3>
                Page Status
              </h3>
            </div>

            <span
              className={`cd-status ${
                pageStatus.toLowerCase()
              }`}
            >
              {pageStatus}
            </span>

          </div>

          <div className="cd-page-body">

            <div className="cd-page-preview">

              <div className="fake-browser">

                <div className="browser-top">
                  <i />
                  <i />
                  <i />
                </div>

                <div className="fake-site">

                  <div className="fake-logo" />

                  <div className="fake-product" />

                  <div className="fake-lines">
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="fake-cta" />

                </div>

              </div>

            </div>

            <div className="cd-page-info">

              <span className="cd-small-label">
                SELECTED TEMPLATE
              </span>

              <strong>
                {selectedTemplate}
              </strong>

              <p>
                {pageStatus === "Draft"
                  ? "Landing page is ready to be configured and published."
                  : "Landing page is currently live for this client."}
              </p>

              <div className="cd-page-buttons">

                <button
                  className="cd-primary-small"
                  onClick={onLanding}
                >
                  Manage Landing Page
                </button>

                <button
                  className="cd-secondary-small"
                  onClick={onTemplate}
                >
                  Change Template
                </button>

              </div>

            </div>

          </div>

        </div>

        <div className="cd-card">

          <div className="cd-card-header">

            <div>
              <span>
                SUBSCRIPTION
              </span>

              <h3>
                Current Plan
              </h3>
            </div>

          </div>

          <div className="cd-plan-body">

            <div className="cd-plan-name">
              {client.plan}
            </div>

            <p>
              Active client subscription
            </p>

            <div className="cd-plan-row">

              <span>
                Client since
              </span>

              <strong>
                {client.created}
              </strong>

            </div>

            <div className="cd-plan-row">

              <span>
                Total orders
              </span>

              <strong>
                {client.orders}
              </strong>

            </div>

          </div>

        </div>

        <div className="cd-card cd-quick">

          <div className="cd-card-header">

            <div>
              <span>
                QUICK ACTIONS
              </span>

              <h3>
                Manage Client
              </h3>
            </div>

          </div>

          <div className="cd-quick-grid">

            <button
              onClick={onCreate}
            >
              <span>
                +
              </span>

              <strong>
                Create Landing Page
              </strong>

              <small>
                Start a new page
              </small>

            </button>

            <button
              onClick={onTemplate}
            >
              <span>
                ▤
              </span>

              <strong>
                Change Template
              </strong>

              <small>
                Choose Template 1–5
              </small>

            </button>

            <button
              onClick={onRequests}
            >
              <span>
                ✎
              </span>

              <strong>
                Edit Requests
              </strong>

              <small>
                Review client requests
              </small>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================
   LANDING PAGE MANAGER
========================= */

function LandingPageManager({
  selectedTemplate,
  pageStatus,
  onTemplate,
  onCreate,
  onPublish,
}) {
  return (
    <div className="cd-content">

      <div className="cd-section-header">

        <div>
          <span>
            LANDING PAGE MANAGEMENT
          </span>

          <h2>
            Landing Page
          </h2>

          <p>
            এই client-এর Landing Page-এর
            পুরো control আপনার কাছে।
          </p>
        </div>

        <div className="cd-section-actions">

          <button
            className="cd-secondary"
            onClick={() =>
              alert(
                "Preview will be connected later."
              )
            }
          >
            ◉ Preview
          </button>

          <button
            className="cd-primary"
            onClick={onPublish}
          >
            {pageStatus === "Published"
              ? "Unpublish"
              : "Publish"}
          </button>

        </div>

      </div>

      <div className="cd-management-grid">

        <div className="cd-card">

          <div className="cd-card-header">

            <div>
              <span>
                TEMPLATE
              </span>

              <h3>
                Selected Template
              </h3>
            </div>

            <span
              className={`cd-status ${
                pageStatus.toLowerCase()
              }`}
            >
              {pageStatus}
            </span>

          </div>

          <div className="cd-selected-template">

            <div className="cd-large-preview">

              <div className="fake-browser">

                <div className="browser-top">
                  <i />
                  <i />
                  <i />
                </div>

                <div className="fake-site">

                  <div className="fake-logo" />

                  <div className="fake-product" />

                  <div className="fake-lines">
                    <i />
                    <i />
                    <i />
                  </div>

                  <div className="fake-cta" />

                </div>

              </div>

            </div>

            <div className="cd-selected-details">

              <span>
                CURRENT TEMPLATE
              </span>

              <h3>
                {selectedTemplate}
              </h3>

              <p>
                This template controls the
                visual structure of the client's
                landing page.
              </p>

              <button
                className="cd-primary-small"
                onClick={onTemplate}
              >
                Change Template
              </button>

            </div>

          </div>

        </div>

        <div className="cd-card cd-control-card">

          <div className="cd-card-header">

            <div>
              <span>
                PAGE CONTROL
              </span>

              <h3>
                Management
              </h3>
            </div>

          </div>

          <div className="cd-control-list">

            <button
              onClick={() =>
                alert(
                  "Landing Page editor will be connected in the next step."
                )
              }
            >
              <span>
                ✎
              </span>

              <div>
                <strong>
                  Edit Landing Page
                </strong>

                <small>
                  Product, price, reviews,
                  offer and order form
                </small>
              </div>

              <b>
                →
              </b>

            </button>

            <button
              onClick={() =>
                alert(
                  "Mobile/Desktop settings will be connected later."
                )
              }
            >
              <span>
                ▣
              </span>

              <div>
                <strong>
                  Responsive Settings
                </strong>

                <small>
                  Mobile and desktop layouts
                </small>
              </div>

              <b>
                →
              </b>

            </button>

            <button
              onClick={onCreate}
            >
              <span>
                +
              </span>

              <div>
                <strong>
                  Recreate Page
                </strong>

                <small>
                  Create a fresh landing page
                </small>
              </div>

              <b>
                →
              </b>

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

/* =========================
   REQUEST MANAGER
========================= */

function RequestManager({
  requests,
}) {
  return (
    <div className="cd-content">

      <div className="cd-section-header">

        <div>
          <span>
            CLIENT COMMUNICATION
          </span>

          <h2>
            Edit Requests
          </h2>

          <p>
            Client কী পরিবর্তন চেয়েছে
            এখান থেকে দেখুন এবং manage করুন।
          </p>
        </div>

      </div>

      <div className="cd-card">

        <div className="cd-request-list">

          {requests.map((request) => (

            <div
              className="cd-request"
              key={request.id}
            >

              <div className="cd-request-icon">
                ✎
              </div>

              <div className="cd-request-main">

                <div className="cd-request-top">

                  <div>

                    <span>
                      {request.id}
                    </span>

                    <strong>
                      {request.type}
                    </strong>

                  </div>

                  <span
                    className={`cd-request-status ${
                      request.status
                        .toLowerCase()
                        .replace(
                          " ",
                          "-"
                        )
                    }`}
                  >
                    {request.status}
                  </span>

                </div>

                <p>
                  {request.message}
                </p>

                <div className="cd-request-bottom">

                  <span>
                    {request.date}
                  </span>

                  <button
                    onClick={() =>
                      alert(
                        "Request action will be connected later."
                      )
                    }
                  >
                    Manage Request →
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

/* =========================
   CLIENT SETTINGS
========================= */

function ClientSettings({
  client,
}) {
  return (
    <div className="cd-content">

      <div className="cd-section-header">

        <div>
          <span>
            CLIENT ACCOUNT
          </span>

          <h2>
            Client Settings
          </h2>

          <p>
            Client account information and
            access settings.
          </p>
        </div>

      </div>

      <div className="cd-card">

        <div className="cd-settings-grid">

          <SettingRow
            label="Business Name"
            value={client.name}
          />

          <SettingRow
            label="Owner"
            value={client.owner}
          />

          <SettingRow
            label="Phone"
            value={client.phone}
          />

          <SettingRow
            label="Email"
            value={
              client.email ||
              "Not provided"
            }
          />

          <SettingRow
            label="Plan"
            value={client.plan}
          />

          <SettingRow
            label="Account Status"
            value={client.status}
          />

        </div>

        <div className="cd-access-notice">

          <div>
            🔒
          </div>

          <div>

            <strong>
              Landing Page access is restricted
            </strong>

            <p>
              এই client-এর কোনো direct
              Landing Page editing access নেই।
              Landing Page-এর template, design,
              content এবং publishing control
              শুধুমাত্র Main Admin-এর কাছে থাকবে।
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function SettingRow({
  label,
  value,
}) {
  return (
    <div className="cd-setting-row">

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
.client-details {
  min-height: 100%;
  padding: 25px 30px 40px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.client-details * {
  box-sizing: border-box;
}

.cd-top-header {
  margin-bottom: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.cd-back {
  padding: 7px 0;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 0;
  background: transparent;
  color: #6b7280;
  font-size: 8px;
  cursor: pointer;
}

.cd-actions,
.cd-section-actions {
  display: flex;
  gap: 7px;
}

.cd-secondary,
.cd-primary,
.cd-publish {
  padding: 9px 12px;
  border-radius: 6px;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.cd-secondary {
  border: 1px solid #e5e7eb;
  background: white;
  color: #374151;
}

.cd-primary,
.cd-publish {
  border: 0;
  background: #111827;
  color: white;
}

.cd-publish.published {
  background: #15803d;
}

.cd-client-card {
  margin-bottom: 17px;
  padding: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
}

.cd-client-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cd-client-avatar {
  width: 47px;
  height: 47px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: #111827;
  color: white;
  font-size: 14px;
  font-weight: 900;
}

.cd-client-title-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cd-client-title-row h1 {
  margin: 0;
  font-size: 18px;
  letter-spacing: -.03em;
}

.cd-client-main p {
  margin: 5px 0 0;
  color: #6b7280;
  font-size: 8px;
}

.cd-client-main p span {
  margin: 0 5px;
  color: #d1d5db;
}

.cd-client-status,
.cd-status {
  padding: 4px 7px;
  border-radius: 4px;
  font-size: 6px;
  font-weight: 900;
}

.cd-client-status.active {
  background: #dcfce7;
  color: #15803d;
}

.cd-client-status.inactive {
  background: #f3f4f6;
  color: #6b7280;
}

.cd-client-id {
  text-align: right;
}

.cd-client-id span {
  display: block;
  color: #9ca3af;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .1em;
}

.cd-client-id strong {
  display: block;
  margin-top: 4px;
  font-size: 8px;
}

.cd-tabs {
  margin-bottom: 17px;
  padding: 4px;
  display: flex;
  gap: 3px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  overflow-x: auto;
}

.cd-tabs button {
  padding: 8px 11px;
  white-space: nowrap;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: #6b7280;
  font-size: 8px;
  font-weight: 700;
  cursor: pointer;
}

.cd-tabs button.active {
  background: #111827;
  color: white;
}

.cd-tab-count {
  margin-left: 5px;
  padding: 2px 5px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 6px;
}

.cd-tabs button.active .cd-tab-count {
  background: rgba(255,255,255,.15);
  color: white;
}

.cd-content {
  min-height: 400px;
}

.cd-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1.5fr)
    minmax(280px, .7fr);
  gap: 14px;
}

.cd-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  overflow: hidden;
}

.cd-page-card,
.cd-quick {
  grid-column: 1 / -1;
}

.cd-card-header {
  padding: 15px 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eef0f2;
}

.cd-card-header span:first-child {
  color: #9ca3af;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .12em;
}

.cd-card-header h3 {
  margin: 5px 0 0;
  font-size: 13px;
}

.cd-status.published {
  background: #dcfce7;
  color: #15803d;
}

.cd-status.draft {
  background: #fef3c7;
  color: #b45309;
}

.cd-page-body {
  padding: 17px;
  display: grid;
  grid-template-columns:
    1fr 1fr;
  gap: 20px;
  align-items: center;
}

.cd-page-preview {
  overflow: hidden;
}

.fake-browser {
  width: 100%;
  max-width: 430px;
  margin: auto;
  border: 1px solid #e5e7eb;
  border-radius: 7px;
  overflow: hidden;
  background: white;
}

.browser-top {
  height: 19px;
  padding: 0 7px;
  display: flex;
  align-items: center;
  gap: 3px;
  background: #f3f4f6;
}

.browser-top i {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #d1d5db;
}

.fake-site {
  min-height: 175px;
  padding: 15px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.fake-logo {
  width: 45px;
  height: 7px;
  grid-column: 1 / -1;
  border-radius: 3px;
  background: #111827;
}

.fake-product {
  min-height: 105px;
  grid-row: span 3;
  border-radius: 5px;
  background: #eef0f2;
}

.fake-lines {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.fake-lines i {
  height: 7px;
  border-radius: 3px;
  background: #e5e7eb;
}

.fake-lines i:first-child {
  width: 90%;
}

.fake-lines i:nth-child(2) {
  width: 65%;
}

.fake-lines i:nth-child(3) {
  width: 75%;
}

.fake-cta {
  width: 70%;
  height: 16px;
  border-radius: 4px;
  background: #111827;
}

.cd-page-info {
  padding: 5px;
}

.cd-small-label,
.cd-selected-details > span {
  color: #9ca3af;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .1em;
}

.cd-page-info > strong {
  display: block;
  margin-top: 6px;
  font-size: 14px;
}

.cd-page-info p {
  margin: 7px 0 13px;
  color: #6b7280;
  font-size: 8px;
  line-height: 1.6;
}

.cd-page-buttons {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}

.cd-primary-small,
.cd-secondary-small {
  padding: 8px 10px;
  border-radius: 5px;
  font-size: 7px;
  font-weight: 800;
  cursor: pointer;
}

.cd-primary-small {
  border: 0;
  background: #111827;
  color: white;
}

.cd-secondary-small {
  border: 1px solid #e5e7eb;
  background: white;
  color: #4b5563;
}

.cd-plan-body {
  padding: 17px;
}

.cd-plan-name {
  font-size: 20px;
  font-weight: 900;
}

.cd-plan-body > p {
  margin: 5px 0 17px;
  color: #9ca3af;
  font-size: 8px;
}

.cd-plan-row {
  padding: 10px 0;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #f1f2f4;
}

.cd-plan-row span {
  color: #9ca3af;
  font-size: 7px;
}

.cd-plan-row strong {
  color: #374151;
  font-size: 7px;
}

.cd-quick-grid {
  padding: 12px;
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  gap: 8px;
}

.cd-quick-grid button {
  padding: 13px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #eef0f2;
  border-radius: 7px;
  background: #fafbfc;
  text-align: left;
  cursor: pointer;
}

.cd-quick-grid button:hover {
  border-color: #d1d5db;
  background: white;
}

.cd-quick-grid button > span {
  width: 26px;
  height: 26px;
  margin-bottom: 9px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: #f3f4f6;
  color: #374151;
  font-size: 11px;
}

.cd-quick-grid strong {
  font-size: 8px;
}

.cd-quick-grid small {
  margin-top: 4px;
  color: #9ca3af;
  font-size: 6px;
}

.cd-section-header {
  margin-bottom: 17px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
}

.cd-section-header > div:first-child > span {
  color: #2563eb;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .13em;
}

.cd-section-header h2 {
  margin: 6px 0 4px;
  font-size: 22px;
}

.cd-section-header p {
  margin: 0;
  color: #6b7280;
  font-size: 8px;
}

.cd-management-grid {
  display: grid;
  grid-template-columns:
    minmax(0, 1.5fr)
    minmax(280px, .7fr);
  gap: 14px;
}

.cd-selected-template {
  padding: 17px;
  display: grid;
  grid-template-columns:
    1.4fr .8fr;
  gap: 20px;
  align-items: center;
}

.cd-large-preview .fake-browser {
  max-width: 550px;
}

.cd-selected-details h3 {
  margin: 7px 0;
  font-size: 16px;
}

.cd-selected-details p {
  margin: 0 0 15px;
  color: #6b7280;
  font-size: 8px;
  line-height: 1.6;
}

.cd-control-list {
  padding: 8px;
}

.cd-control-list button {
  width: 100%;
  padding: 12px 9px;
  display: flex;
  align-items: center;
  gap: 9px;
  border: 0;
  border-bottom: 1px solid #f1f2f4;
  background: white;
  text-align: left;
  cursor: pointer;
}

.cd-control-list button:last-child {
  border-bottom: 0;
}

.cd-control-list button > span {
  width: 27px;
  height: 27px;
  display: grid;
  place-items: center;
  flex: 0 0 27px;
  border-radius: 6px;
  background: #f3f4f6;
  color: #374151;
  font-size: 10px;
}

.cd-control-list button > div {
  flex: 1;
}

.cd-control-list strong {
  display: block;
  font-size: 8px;
}

.cd-control-list small {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 6px;
}

.cd-control-list b {
  color: #9ca3af;
  font-size: 10px;
}

.cd-request-list {
  padding: 10px;
}

.cd-request {
  padding: 13px;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #f1f2f4;
}

.cd-request:last-child {
  border-bottom: 0;
}

.cd-request-icon {
  width: 31px;
  height: 31px;
  flex: 0 0 31px;
  display: grid;
  place-items: center;
  border-radius: 7px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 10px;
}

.cd-request-main {
  flex: 1;
}

.cd-request-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.cd-request-top > div {
  display: flex;
  align-items: center;
  gap: 7px;
}

.cd-request-top > div span {
  color: #9ca3af;
  font-size: 6px;
}

.cd-request-top strong {
  font-size: 8px;
}

.cd-request-status {
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 6px;
  font-weight: 900;
}

.cd-request-status.pending {
  background: #fef3c7;
  color: #b45309;
}

.cd-request-status.in-progress {
  background: #dbeafe;
  color: #1d4ed8;
}

.cd-request p {
  margin: 7px 0;
  color: #6b7280;
  font-size: 8px;
}

.cd-request-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cd-request-bottom > span {
  color: #9ca3af;
  font-size: 6px;
}

.cd-request-bottom button {
  border: 0;
  background: transparent;
  color: #2563eb;
  font-size: 7px;
  font-weight: 800;
  cursor: pointer;
}

.cd-settings-grid {
  padding: 17px;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.cd-setting-row {
  padding: 13px;
  border-bottom: 1px solid #f1f2f4;
}

.cd-setting-row span {
  display: block;
  color: #9ca3af;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .08em;
}

.cd-setting-row strong {
  display: block;
  margin-top: 5px;
  color: #374151;
  font-size: 8px;
}

.cd-access-notice {
  margin: 0 17px 17px;
  padding: 13px;
  display: flex;
  gap: 10px;
  border: 1px solid #dbeafe;
  border-radius: 7px;
  background: #eff6ff;
}

.cd-access-notice > div:first-child {
  font-size: 13px;
}

.cd-access-notice strong {
  display: block;
  color: #1e40af;
  font-size: 8px;
}

.cd-access-notice p {
  margin: 4px 0 0;
  color: #4b6b9b;
  font-size: 7px;
  line-height: 1.6;
}

.cd-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(17,24,39,.45);
}

.cd-template-modal {
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  background: white;
  box-shadow: 0 25px 70px rgba(0,0,0,.18);
}

.cd-create-modal {
  width: 100%;
  max-width: 470px;
  border-radius: 12px;
  background: white;
  box-shadow: 0 25px 70px rgba(0,0,0,.18);
  overflow: hidden;
}

.cd-modal-header {
  padding: 17px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border-bottom: 1px solid #eef0f2;
}

.cd-modal-header span {
  color: #2563eb;
  font-size: 6px;
  font-weight: 900;
  letter-spacing: .13em;
}

.cd-modal-header h2 {
  margin: 5px 0 0;
  font-size: 15px;
}

.cd-modal-header button {
  width: 27px;
  height: 27px;
  border: 0;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 17px;
  cursor: pointer;
}

.cd-template-grid {
  padding: 17px;
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  gap: 10px;
}

.cd-template-loading {
  grid-column: 1 / -1;
  padding: 50px 20px;
  text-align: center;
  color: #9ca3af;
  font-size: 9px;
}

.cd-template-card {
  padding: 9px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  text-align: left;
  cursor: pointer;
}

.cd-template-card:hover,
.cd-template-card.selected {
  border-color: #111827;
}

.cd-template-card.selected {
  box-shadow: 0 0 0 1px #111827;
}

.cd-template-preview {
  min-height: 135px;
  padding: 9px;
  border-radius: 5px;
  background: #f3f4f6;
}

.tp-header {
  height: 8px;
  display: flex;
  justify-content: space-between;
}

.tp-header span:first-child {
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: #111827;
}

.tp-header span:last-child {
  width: 18px;
  height: 4px;
  border-radius: 2px;
  background: #d1d5db;
}

.tp-image {
  height: 55px;
  margin-top: 9px;
  border-radius: 4px;
  background: white;
}

.tp-line {
  width: 70%;
  height: 5px;
  margin-top: 7px;
  border-radius: 2px;
  background: #d1d5db;
}

.tp-price {
  width: 35%;
  height: 7px;
  margin-top: 6px;
  border-radius: 2px;
  background: #9ca3af;
}

.tp-button {
  width: 55%;
  height: 10px;
  margin-top: 7px;
  border-radius: 3px;
  background: #111827;
}

.cd-template-info {
  margin-top: 9px;
  display: flex;
  justify-content: space-between;
}

.cd-template-info strong {
  display: block;
  font-size: 8px;
}

.cd-template-info span {
  display: block;
  margin-top: 2px;
  color: #9ca3af;
  font-size: 6px;
}

.cd-selected {
  width: 19px;
  height: 19px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #111827;
  color: white;
  font-size: 8px;
}

.cd-template-card p {
  margin: 6px 0 1px;
  color: #9ca3af;
  font-size: 6px;
  line-height: 1.5;
}

.cd-create-content {
  padding: 25px;
  text-align: center;
}

.cd-create-icon {
  width: 52px;
  height: 52px;
  margin: 0 auto 11px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 20px;
}

.cd-create-content h3 {
  margin: 0;
  font-size: 14px;
}

.cd-create-content > p {
  margin: 7px auto 17px;
  max-width: 340px;
  color: #6b7280;
  font-size: 8px;
  line-height: 1.6;
}

.cd-create-summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #eef0f2;
  border-radius: 7px;
  overflow: hidden;
}

.cd-create-summary div {
  padding: 11px;
}

.cd-create-summary div + div {
  border-left: 1px solid #eef0f2;
}

.cd-create-summary span {
  display: block;
  color: #9ca3af;
  font-size: 6px;
  font-weight: 900;
}

.cd-create-summary strong {
  display: block;
  margin-top: 5px;
  font-size: 8px;
}

.cd-modal-footer {
  padding: 12px 17px;
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  border-top: 1px solid #eef0f2;
  background: #fafbfc;
}

.cd-cancel,
.cd-confirm {
  padding: 9px 12px;
  border-radius: 6px;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.cd-cancel {
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
}

.cd-confirm {
  border: 0;
  background: #111827;
  color: white;
}

.cd-empty-page {
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.cd-empty-icon {
  width: 55px;
  height: 55px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  background: white;
  border: 1px solid #e5e7eb;
  color: #9ca3af;
  font-size: 20px;
}

.cd-empty-page h2 {
  margin: 13px 0 5px;
  font-size: 18px;
}

.cd-empty-page p {
  margin: 0 0 13px;
  color: #9ca3af;
  font-size: 8px;
}

.cd-back-button {
  padding: 9px 12px;
  border: 0;
  border-radius: 6px;
  background: #111827;
  color: white;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 900px) {

  .cd-grid,
  .cd-management-grid {
    grid-template-columns: 1fr;
  }

  .cd-page-body,
  .cd-selected-template {
    grid-template-columns: 1fr;
  }

  .cd-quick-grid {
    grid-template-columns: 1fr;
  }

  .cd-template-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }

}

@media (max-width: 650px) {

  .client-details {
    padding: 18px;
  }

  .cd-top-header,
  .cd-client-card,
  .cd-section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .cd-actions,
  .cd-section-actions {
    width: 100%;
  }

  .cd-actions button,
  .cd-section-actions button {
    flex: 1;
  }

  .cd-client-id {
    text-align: left;
  }

  .cd-settings-grid {
    grid-template-columns: 1fr;
  }

  .cd-template-grid {
    grid-template-columns: 1fr;
  }

}
`;
