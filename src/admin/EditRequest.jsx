import React, { useState } from "react";

export default function EditRequest() {
  const [requestType, setRequestType] =
    useState("Product Information");

  const [message, setMessage] =
    useState("");

  const [priority, setPriority] =
    useState("Normal");

  const [requests, setRequests] = useState([
    {
      id: 1,
      type: "Product Information",
      message:
        "Product price update করতে হবে।",
      priority: "Normal",
      status: "Completed",
      date: "21 Aug 2026",
    },
  ]);

  const [submitted, setSubmitted] =
    useState(false);

  const submitRequest = () => {
    if (!message.trim()) {
      alert(
        "আপনি কী পরিবর্তন করতে চান সেটা লিখুন।"
      );
      return;
    }

    const newRequest = {
      id: Date.now(),
      type: requestType,
      message: message.trim(),
      priority,
      status: "Pending",
      date: "21 Aug 2026",
    };

    setRequests((prev) => [
      newRequest,
      ...prev,
    ]);

    setMessage("");
    setPriority("Normal");

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 2500);
  };

  return (
    <div className="edit-request-page">
      <style>{styles}</style>

      {/* HEADER */}

      <div className="er-header">
        <div>
          <span className="er-kicker">
            LANDING PAGE SUPPORT
          </span>

          <h2>
            Edit Request
          </h2>

          <p>
            Landing Page-এ কোনো পরিবর্তন
            প্রয়োজন হলে আমাদের জানান।
          </p>
        </div>
      </div>

      {/* NOTICE */}

      <div className="er-notice">

        <div className="er-notice-icon">
          i
        </div>

        <div>
          <strong>
            Landing Page changes are managed
            by our team
          </strong>

          <p>
            আপনি নিজে Landing Page edit করতে
            পারবেন না। কী পরিবর্তন প্রয়োজন
            সেটা এখানে লিখে পাঠান। আমাদের
            team request দেখে প্রয়োজনীয়
            পরিবর্তন করে দেবে।
          </p>
        </div>

      </div>

      <div className="er-layout">

        {/* REQUEST FORM */}

        <div className="er-card">

          <div className="er-card-header">
            <div>
              <span>
                NEW REQUEST
              </span>

              <h3>
                What would you like to change?
              </h3>
            </div>
          </div>

          <div className="er-form">

            {/* REQUEST TYPE */}

            <div className="er-field">

              <label>
                Request Type
              </label>

              <select
                value={requestType}
                onChange={(e) =>
                  setRequestType(
                    e.target.value
                  )
                }
              >
                <option>
                  Product Information
                </option>

                <option>
                  Product Images
                </option>

                <option>
                  Price / Discount
                </option>

                <option>
                  Reviews
                </option>

                <option>
                  Offer / Countdown
                </option>

                <option>
                  Order Form
                </option>

                <option>
                  Payment Information
                </option>

                <option>
                  Design / Layout
                </option>

                <option>
                  Text / Content
                </option>

                <option>
                  Other
                </option>
              </select>

            </div>

            {/* PRIORITY */}

            <div className="er-field">

              <label>
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value
                  )
                }
              >
                <option value="Normal">
                  Normal
                </option>

                <option value="Important">
                  Important
                </option>

                <option value="Urgent">
                  Urgent
                </option>
              </select>

            </div>

            {/* MESSAGE */}

            <div className="er-field er-full">

              <label>
                Describe your request
              </label>

              <textarea
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                placeholder="Example: Product price 1650 টাকা থেকে 1490 টাকা করতে চাই..."
                rows="8"
              />

              <small>
                যত বিস্তারিত লিখবেন, আমাদের
                team তত সহজে বুঝতে পারবে।
              </small>

            </div>

            {/* SUBMIT */}

            <button
              className="er-submit"
              onClick={submitRequest}
            >
              Send Edit Request
              <span>→</span>
            </button>

          </div>

        </div>

        {/* REQUEST HISTORY */}

        <div className="er-card er-history">

          <div className="er-card-header">

            <div>
              <span>
                REQUEST HISTORY
              </span>

              <h3>
                Your Requests
              </h3>
            </div>

            <div className="er-count">
              {requests.length}
            </div>

          </div>

          <div className="er-request-list">

            {requests.length === 0 ? (
              <div className="er-empty">

                <div>
                  ✎
                </div>

                <strong>
                  No requests yet
                </strong>

                <p>
                  আপনার প্রথম edit request
                  এখানে দেখা যাবে।
                </p>

              </div>
            ) : (
              requests.map((request) => (
                <div
                  className="er-request"
                  key={request.id}
                >

                  <div className="er-request-top">

                    <span className="er-type">
                      {request.type}
                    </span>

                    <span
                      className={`er-status ${
                        request.status
                          .toLowerCase()
                          .replace(" ", "-")
                      }`}
                    >
                      {request.status}
                    </span>

                  </div>

                  <p>
                    {request.message}
                  </p>

                  <div className="er-request-bottom">

                    <span>
                      {request.date}
                    </span>

                    <span
                      className={`er-priority ${
                        request.priority.toLowerCase()
                      }`}
                    >
                      {request.priority}
                    </span>

                  </div>

                </div>
              ))
            )}

          </div>

        </div>

      </div>

      {/* SUCCESS MESSAGE */}

      {submitted && (
        <div className="er-toast">
          <div>
            ✓
          </div>

          <span>
            Edit request sent successfully
          </span>
        </div>
      )}

    </div>
  );
}

const styles = `
.edit-request-page {
  min-height: 100%;
  padding: 30px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.edit-request-page * {
  box-sizing: border-box;
}

/* HEADER */

.er-header {
  margin-bottom: 20px;
}

.er-kicker {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .14em;
}

.er-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.er-header p {
  margin: 0;
  color: #6b7280;
  font-size: 10px;
}

/* NOTICE */

.er-notice {
  margin-bottom: 18px;
  padding: 14px 16px;
  display: flex;
  gap: 12px;
  border: 1px solid #dbeafe;
  border-radius: 9px;
  background: #eff6ff;
}

.er-notice-icon {
  width: 27px;
  height: 27px;
  flex: 0 0 27px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  font-size: 10px;
  font-weight: 900;
}

.er-notice strong {
  display: block;
  color: #1e40af;
  font-size: 9px;
}

.er-notice p {
  max-width: 750px;
  margin: 5px 0 0;
  color: #4b6b9b;
  font-size: 8px;
  line-height: 1.6;
}

/* LAYOUT */

.er-layout {
  display: grid;
  grid-template-columns:
    minmax(0, 1.1fr)
    minmax(300px, .9fr);
  gap: 16px;
}

/* CARD */

.er-card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
  overflow: hidden;
}

.er-card-header {
  padding: 17px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eef0f2;
}

.er-card-header span {
  color: #9ca3af;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .12em;
}

.er-card-header h3 {
  margin: 5px 0 0;
  font-size: 14px;
}

/* FORM */

.er-form {
  padding: 18px;
  display: grid;
  grid-template-columns:
    1fr 1fr;
  gap: 14px;
}

.er-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.er-full {
  grid-column: 1 / -1;
}

.er-field label {
  color: #4b5563;
  font-size: 8px;
  font-weight: 800;
}

.er-field select,
.er-field textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  outline: none;
  background: white;
  color: #111827;
  font-family: inherit;
  font-size: 9px;
}

.er-field textarea {
  resize: vertical;
  line-height: 1.6;
}

.er-field select:focus,
.er-field textarea:focus {
  border-color: #93c5fd;
}

.er-field small {
  color: #9ca3af;
  font-size: 7px;
}

/* BUTTON */

.er-submit {
  grid-column: 1 / -1;
  padding: 11px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 6px;
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

.er-submit:hover {
  background: #1f2937;
}

.er-submit span {
  font-size: 13px;
}

/* HISTORY */

.er-count {
  min-width: 24px;
  height: 24px;
  display: grid;
  place-items: center;
  border-radius: 6px;
  background: #f3f4f6;
  color: #4b5563;
  font-size: 8px;
  font-weight: 900;
}

.er-request-list {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.er-request {
  padding: 12px;
  border: 1px solid #eef0f2;
  border-radius: 7px;
}

.er-request-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.er-type {
  color: #374151 !important;
  font-size: 8px !important;
  letter-spacing: 0 !important;
}

.er-status {
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 6px !important;
  letter-spacing: 0 !important;
}

.er-status.pending {
  background: #fef3c7;
  color: #b45309;
}

.er-status.completed {
  background: #dcfce7;
  color: #15803d;
}

.er-status.in-progress {
  background: #dbeafe;
  color: #1d4ed8;
}

.er-request p {
  margin: 9px 0;
  color: #6b7280;
  font-size: 8px;
  line-height: 1.55;
}

.er-request-bottom {
  padding-top: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f2f4;
}

.er-request-bottom > span:first-child {
  color: #9ca3af;
  font-size: 7px;
}

.er-priority {
  font-size: 6px;
  font-weight: 900;
}

.er-priority.normal {
  color: #6b7280;
}

.er-priority.important {
  color: #d97706;
}

.er-priority.urgent {
  color: #dc2626;
}

/* EMPTY */

.er-empty {
  padding: 45px 15px;
  text-align: center;
}

.er-empty > div {
  color: #d1d5db;
  font-size: 28px;
}

.er-empty strong {
  display: block;
  margin-top: 8px;
  font-size: 10px;
}

.er-empty p {
  margin: 5px 0 0;
  color: #9ca3af;
  font-size: 7px;
}

/* TOAST */

.er-toast {
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 500;
  padding: 11px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 7px;
  background: #111827;
  color: white;
  font-size: 8px;
  font-weight: 800;
  box-shadow: 0 10px 35px rgba(0,0,0,.15);
}

.er-toast div {
  width: 18px;
  height: 18px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #16a34a;
  font-size: 8px;
}

/* RESPONSIVE */

@media (max-width: 850px) {
  .er-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .edit-request-page {
    padding: 18px;
  }

  .er-form {
    grid-template-columns: 1fr;
  }

  .er-full {
    grid-column: auto;
  }

  .er-notice {
    align-items: flex-start;
  }
}
`;
