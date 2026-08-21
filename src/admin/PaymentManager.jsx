import React, { useState } from "react";

export default function PaymentManager() {
  const [payment, setPayment] = useState({
    cashOnDelivery: true,
    deliveryAdvance: true,
    fullAdvance: true,

    bkash: {
      enabled: true,
      number: "01XXXXXXXXX",
      type: "Personal",
    },

    nagad: {
      enabled: true,
      number: "01XXXXXXXXX",
      type: "Personal",
    },

    rocket: {
      enabled: true,
      number: "01XXXXXXXXX",
      type: "Personal",
    },

    instructions:
      "উপরের যেকোনো একটি নম্বরে Send Money করে Transaction ID নিচের ঘরে লিখুন।",
  });

  const updatePayment = (field, value) => {
    setPayment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateMethod = (
    method,
    field,
    value
  ) => {
    setPayment((prev) => ({
      ...prev,
      [method]: {
        ...prev[method],
        [field]: value,
      },
    }));
  };

  const savePayment = () => {
    console.log(
      "Payment settings:",
      payment
    );

    alert(
      "Payment settings saved successfully!"
    );
  };

  return (
    <div className="payment-manager">
      <style>{styles}</style>

      {/* HEADER */}

      <div className="pay-header">
        <div>
          <span className="pay-kicker">
            PAYMENT MANAGEMENT
          </span>

          <h2>
            Payment Settings
          </h2>

          <p>
            Customer-এর payment method এবং
            payment information এখান থেকে
            নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          className="pay-save"
          onClick={savePayment}
        >
          ✓ Save Changes
        </button>
      </div>

      <div className="pay-layout">

        {/* MAIN */}

        <div className="pay-main">

          {/* PAYMENT METHODS */}

          <section className="pay-card">

            <div className="pay-title">
              <span>
                PAYMENT METHODS
              </span>

              <h3>
                Available Payment Options
              </h3>
            </div>

            <div className="pay-method-list">

              {/* COD */}

              <PaymentMethod
                icon="💵"
                title="Cash on Delivery"
                description="Customer delivery পাওয়ার সময় সম্পূর্ণ টাকা প্রদান করবে।"
                enabled={
                  payment.cashOnDelivery
                }
                onToggle={() =>
                  updatePayment(
                    "cashOnDelivery",
                    !payment.cashOnDelivery
                  )
                }
              />

              {/* DELIVERY ADVANCE */}

              <PaymentMethod
                icon="🚚"
                title="Delivery Charge Advance"
                description="Customer শুধু delivery charge advance হিসেবে প্রদান করবে।"
                enabled={
                  payment.deliveryAdvance
                }
                onToggle={() =>
                  updatePayment(
                    "deliveryAdvance",
                    !payment.deliveryAdvance
                  )
                }
              />

              {/* FULL ADVANCE */}

              <PaymentMethod
                icon="💳"
                title="Full Payment Advance"
                description="Customer order-এর সম্পূর্ণ টাকা আগে payment করবে।"
                enabled={
                  payment.fullAdvance
                }
                onToggle={() =>
                  updatePayment(
                    "fullAdvance",
                    !payment.fullAdvance
                  )
                }
              />

            </div>

          </section>

          {/* PAYMENT ACCOUNTS */}

          <section className="pay-card">

            <div className="pay-title">
              <span>
                PAYMENT ACCOUNTS
              </span>

              <h3>
                bKash / Nagad / Rocket
              </h3>
            </div>

            {/* BKASH */}

            <PaymentAccount
              name="bKash"
              logo="bK"
              data={payment.bkash}
              onToggle={() =>
                updateMethod(
                  "bkash",
                  "enabled",
                  !payment.bkash.enabled
                )
              }
              onChange={(field, value) =>
                updateMethod(
                  "bkash",
                  field,
                  value
                )
              }
            />

            {/* NAGAD */}

            <PaymentAccount
              name="Nagad"
              logo="NG"
              data={payment.nagad}
              onToggle={() =>
                updateMethod(
                  "nagad",
                  "enabled",
                  !payment.nagad.enabled
                )
              }
              onChange={(field, value) =>
                updateMethod(
                  "nagad",
                  field,
                  value
                )
              }
            />

            {/* ROCKET */}

            <PaymentAccount
              name="Rocket"
              logo="RK"
              data={payment.rocket}
              onToggle={() =>
                updateMethod(
                  "rocket",
                  "enabled",
                  !payment.rocket.enabled
                )
              }
              onChange={(field, value) =>
                updateMethod(
                  "rocket",
                  field,
                  value
                )
              }
            />

          </section>

          {/* INSTRUCTIONS */}

          <section className="pay-card">

            <div className="pay-title">
              <span>
                PAYMENT INSTRUCTIONS
              </span>

              <h3>
                Customer Instructions
              </h3>
            </div>

            <div className="pay-field">

              <label>
                Instructions shown to customer
              </label>

              <textarea
                rows="5"
                value={
                  payment.instructions
                }
                onChange={(e) =>
                  updatePayment(
                    "instructions",
                    e.target.value
                  )
                }
                placeholder="Write payment instructions..."
              />

              <small>
                Advance payment select করলে
                এই instruction customer-এর
                কাছে দেখানো হবে।
              </small>

            </div>

          </section>

        </div>

        {/* SIDEBAR */}

        <aside className="pay-side">

          {/* STATUS */}

          <section className="pay-card">

            <div className="pay-title">
              <span>
                CURRENT STATUS
              </span>

              <h3>
                Payment Summary
              </h3>
            </div>

            <div className="pay-summary">

              <StatusRow
                title="Cash on Delivery"
                enabled={
                  payment.cashOnDelivery
                }
              />

              <StatusRow
                title="Delivery Advance"
                enabled={
                  payment.deliveryAdvance
                }
              />

              <StatusRow
                title="Full Advance"
                enabled={
                  payment.fullAdvance
                }
              />

            </div>

          </section>

          {/* ACTIVE ACCOUNTS */}

          <section className="pay-card">

            <div className="pay-title">
              <span>
                ACTIVE ACCOUNTS
              </span>

              <h3>
                Payment Numbers
              </h3>
            </div>

            <div className="pay-number-list">

              {payment.bkash.enabled && (
                <NumberRow
                  name="bKash"
                  number={
                    payment.bkash.number
                  }
                />
              )}

              {payment.nagad.enabled && (
                <NumberRow
                  name="Nagad"
                  number={
                    payment.nagad.number
                  }
                />
              )}

              {payment.rocket.enabled && (
                <NumberRow
                  name="Rocket"
                  number={
                    payment.rocket.number
                  }
                />
              )}

            </div>

          </section>

          {/* INFO */}

          <div className="pay-info">

            <div className="pay-info-icon">
              i
            </div>

            <div>
              <strong>
                How it works
              </strong>

              <p>
                Customer Cash on Delivery
                নির্বাচন করলে সরাসরি order
                confirm হবে। Advance payment
                নির্বাচন করলে active payment
                numbers এবং Transaction ID
                field দেখানো হবে।
              </p>
            </div>

          </div>

        </aside>

      </div>
    </div>
  );
}


/* PAYMENT METHOD COMPONENT */

function PaymentMethod({
  icon,
  title,
  description,
  enabled,
  onToggle,
}) {
  return (
    <div className="pay-method">

      <div className="pay-method-icon">
        {icon}
      </div>

      <div className="pay-method-content">

        <strong>
          {title}
        </strong>

        <p>
          {description}
        </p>

      </div>

      <button
        className={
          enabled
            ? "pay-toggle on"
            : "pay-toggle"
        }
        onClick={onToggle}
      >
        <span></span>
      </button>

    </div>
  );
}


/* PAYMENT ACCOUNT COMPONENT */

function PaymentAccount({
  name,
  logo,
  data,
  onToggle,
  onChange,
}) {
  return (
    <div className="pay-account">

      <div className="pay-account-header">

        <div className="pay-account-brand">

          <div className="pay-logo">
            {logo}
          </div>

          <div>
            <strong>
              {name}
            </strong>

            <small>
              {data.enabled
                ? "Active"
                : "Disabled"}
            </small>
          </div>

        </div>

        <button
          className={
            data.enabled
              ? "pay-toggle on"
              : "pay-toggle"
          }
          onClick={onToggle}
        >
          <span></span>
        </button>

      </div>

      <div className="pay-account-fields">

        <div className="pay-field">

          <label>
            Account Number
          </label>

          <input
            value={data.number}
            onChange={(e) =>
              onChange(
                "number",
                e.target.value
              )
            }
            placeholder="01XXXXXXXXX"
          />

        </div>

        <div className="pay-field">

          <label>
            Account Type
          </label>

          <select
            value={data.type}
            onChange={(e) =>
              onChange(
                "type",
                e.target.value
              )
            }
          >
            <option>
              Personal
            </option>

            <option>
              Agent
            </option>

            <option>
              Merchant
            </option>
          </select>

        </div>

      </div>

    </div>
  );
}


/* STATUS ROW */

function StatusRow({
  title,
  enabled,
}) {
  return (
    <div className="pay-status-row">

      <span>
        {title}
      </span>

      <strong
        className={
          enabled
            ? "active"
            : "inactive"
        }
      >
        {enabled
          ? "Active"
          : "Disabled"}
      </strong>

    </div>
  );
}


/* NUMBER ROW */

function NumberRow({
  name,
  number,
}) {
  return (
    <div className="pay-number-row">

      <span>
        {name}
      </span>

      <strong>
        {number}
      </strong>

    </div>
  );
}


const styles = `
.payment-manager {
  min-height: 100%;
  padding: 30px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.payment-manager * {
  box-sizing: border-box;
}

.pay-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 25px;
}

.pay-kicker {
  color: #2563eb;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .14em;
}

.pay-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.pay-header p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.pay-save {
  padding: 11px 16px;
  border: 0;
  border-radius: 7px;
  background: #2563eb;
  color: white;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
}

.pay-layout {
  display: grid;
  grid-template-columns: 1.5fr .8fr;
  gap: 18px;
  align-items: start;
}

.pay-main,
.pay-side {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pay-card {
  padding: 22px;
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  background: white;
}

.pay-title {
  margin-bottom: 20px;
}

.pay-title span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.pay-title h3 {
  margin: 5px 0 0;
  font-size: 17px;
}

.pay-method-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pay-method {
  padding: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.pay-method-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 8px;
  background: #f3f4f6;
  font-size: 17px;
}

.pay-method-content {
  flex: 1;
}

.pay-method-content strong {
  display: block;
  font-size: 11px;
}

.pay-method-content p {
  margin: 4px 0 0;
  color: #9ca3af;
  font-size: 9px;
  line-height: 1.5;
}

.pay-toggle {
  width: 43px;
  height: 24px;
  padding: 3px;
  border: 0;
  border-radius: 20px;
  background: #d1d5db;
  cursor: pointer;
  flex-shrink: 0;
}

.pay-toggle span {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  transition: .2s;
}

.pay-toggle.on {
  background: #2563eb;
}

.pay-toggle.on span {
  transform: translateX(19px);
}

.pay-account {
  padding: 16px 0;
  border-bottom: 1px solid #eef0f2;
}

.pay-account:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.pay-account:first-of-type {
  padding-top: 0;
}

.pay-account-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 13px;
}

.pay-account-brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.pay-logo {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f3f4f6;
  color: #111827;
  font-size: 9px;
  font-weight: 900;
}

.pay-account-brand strong {
  display: block;
  font-size: 11px;
}

.pay-account-brand small {
  display: block;
  margin-top: 2px;
  color: #16a34a;
  font-size: 8px;
}

.pay-account-fields {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 10px;
}

.pay-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pay-field label {
  color: #374151;
  font-size: 9px;
  font-weight: 800;
}

.pay-field input,
.pay-field select,
.pay-field textarea {
  width: 100%;
  padding: 10px 11px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  outline: none;
  background: white;
  color: #111827;
  font-size: 10px;
  font-family: inherit;
}

.pay-field input:focus,
.pay-field select:focus,
.pay-field textarea:focus {
  border-color: #2563eb;
}

.pay-field textarea {
  resize: vertical;
}

.pay-field small {
  color: #9ca3af;
  font-size: 8px;
  line-height: 1.5;
}

.pay-summary {
  display: flex;
  flex-direction: column;
}

.pay-status-row {
  padding: 12px 0;
  border-bottom: 1px solid #eef0f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.pay-status-row:last-child {
  border-bottom: 0;
}

.pay-status-row span {
  color: #6b7280;
  font-size: 10px;
}

.pay-status-row strong {
  font-size: 9px;
}

.pay-status-row .active {
  color: #16a34a;
}

.pay-status-row .inactive {
  color: #9ca3af;
}

.pay-number-list {
  display: flex;
  flex-direction: column;
}

.pay-number-row {
  padding: 12px 0;
  border-bottom: 1px solid #eef0f2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.pay-number-row:last-child {
  border-bottom: 0;
}

.pay-number-row span {
  color: #6b7280;
  font-size: 9px;
}

.pay-number-row strong {
  font-size: 10px;
}

.pay-info {
  padding: 17px;
  border: 1px solid #bfdbfe;
  border-radius: 9px;
  background: #eff6ff;
  display: flex;
  gap: 11px;
}

.pay-info-icon {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  font-size: 11px;
  font-weight: 900;
}

.pay-info strong {
  display: block;
  font-size: 10px;
}

.pay-info p {
  margin: 5px 0 0;
  color: #6b7280;
  font-size: 9px;
  line-height: 1.6;
}

@media (max-width: 850px) {
  .pay-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .payment-manager {
    padding: 18px;
  }

  .pay-header {
    align-items: stretch;
    flex-direction: column;
  }

  .pay-account-fields {
    grid-template-columns: 1fr;
  }
}
`;
