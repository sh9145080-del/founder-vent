import React, { useState } from "react";

export default function DeliveryManager() {
  const [delivery, setDelivery] = useState({
    insideDhaka: 70,
    outsideDhaka: 120,
    freeDelivery: false,
    freeDeliveryMinimum: 0,
  });

  const updateDelivery = (field, value) => {
    setDelivery((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveDelivery = () => {
    console.log("Delivery settings:", delivery);
    alert("Delivery settings saved successfully!");
  };

  return (
    <div className="delivery-manager">
      <style>{styles}</style>

      <div className="dm-header">
        <div>
          <span className="dm-kicker">
            DELIVERY MANAGEMENT
          </span>

          <h2>Delivery Settings</h2>

          <p>
            আপনার landing page-এর delivery
            charge এবং delivery rules এখান
            থেকে নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          className="dm-save"
          onClick={saveDelivery}
        >
          ✓ Save Changes
        </button>
      </div>

      <div className="dm-grid">
        <div className="dm-main">

          {/* DELIVERY CHARGES */}

          <section className="dm-card">
            <div className="dm-title">
              <span>DELIVERY CHARGES</span>
              <h3>Set Delivery Charges</h3>
            </div>

            <div className="dm-charge-grid">

              <div className="dm-charge-card">
                <div className="dm-charge-icon">
                  🏠
                </div>

                <span>
                  INSIDE DHAKA
                </span>

                <h4>
                  ঢাকা শহরের মধ্যে
                </h4>

                <div className="dm-price-input">
                  <span>৳</span>

                  <input
                    type="number"
                    value={
                      delivery.insideDhaka
                    }
                    onChange={(e) =>
                      updateDelivery(
                        "insideDhaka",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />
                </div>

                <small>
                  Delivery charge per order
                </small>
              </div>

              <div className="dm-charge-card">
                <div className="dm-charge-icon">
                  🚚
                </div>

                <span>
                  OUTSIDE DHAKA
                </span>

                <h4>
                  ঢাকার বাইরে
                </h4>

                <div className="dm-price-input">
                  <span>৳</span>

                  <input
                    type="number"
                    value={
                      delivery.outsideDhaka
                    }
                    onChange={(e) =>
                      updateDelivery(
                        "outsideDhaka",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />
                </div>

                <small>
                  Delivery charge per order
                </small>
              </div>

            </div>
          </section>

          {/* FREE DELIVERY */}

          <section className="dm-card">

            <div className="dm-title">
              <span>
                FREE DELIVERY
              </span>

              <h3>
                Free Delivery Option
              </h3>
            </div>

            <div className="dm-toggle-row">

              <div>
                <strong>
                  Enable Free Delivery
                </strong>

                <p>
                  নির্দিষ্ট amount-এর বেশি
                  order হলে free delivery
                  দিতে পারবেন।
                </p>
              </div>

              <button
                className={
                  delivery.freeDelivery
                    ? "dm-toggle on"
                    : "dm-toggle"
                }
                onClick={() =>
                  updateDelivery(
                    "freeDelivery",
                    !delivery.freeDelivery
                  )
                }
              >
                <span></span>
              </button>

            </div>

            {delivery.freeDelivery && (
              <div className="dm-free-field">

                <label>
                  Minimum Order Amount
                </label>

                <div className="dm-input-with-prefix">
                  <span>৳</span>

                  <input
                    type="number"
                    value={
                      delivery.freeDeliveryMinimum
                    }
                    onChange={(e) =>
                      updateDelivery(
                        "freeDeliveryMinimum",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />
                </div>

                <small>
                  এই amount-এর বেশি order
                  হলে delivery charge হবে 0৳।
                </small>

              </div>
            )}

          </section>

        </div>

        {/* SUMMARY */}

        <aside className="dm-side">

          <section className="dm-card">

            <div className="dm-title">
              <span>
                CURRENT SETTINGS
              </span>

              <h3>
                Delivery Summary
              </h3>
            </div>

            <div className="dm-summary">

              <div>
                <span>
                  Inside Dhaka
                </span>

                <strong>
                  ৳{delivery.insideDhaka}
                </strong>
              </div>

              <div>
                <span>
                  Outside Dhaka
                </span>

                <strong>
                  ৳{delivery.outsideDhaka}
                </strong>
              </div>

              <div>
                <span>
                  Free Delivery
                </span>

                <strong
                  className={
                    delivery.freeDelivery
                      ? "enabled"
                      : "disabled"
                  }
                >
                  {delivery.freeDelivery
                    ? "Enabled"
                    : "Disabled"}
                </strong>
              </div>

              {delivery.freeDelivery && (
                <div>
                  <span>
                    Minimum Amount
                  </span>

                  <strong>
                    ৳
                    {
                      delivery.freeDeliveryMinimum
                    }
                  </strong>
                </div>
              )}

            </div>

          </section>

          <section className="dm-info">

            <div className="dm-info-icon">
              i
            </div>

            <div>
              <strong>
                Order Calculation
              </strong>

              <p>
                Customer যখন checkout করবে,
                selected location অনুযায়ী
                delivery charge automatically
                total order amount-এর সাথে
                যোগ হবে।
              </p>
            </div>

          </section>

        </aside>
      </div>
    </div>
  );
}

const styles = `
.delivery-manager {
  min-height: 100%;
  padding: 30px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.delivery-manager * {
  box-sizing: border-box;
}

.dm-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 25px;
}

.dm-kicker {
  color: #2563eb;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .14em;
}

.dm-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.dm-header p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.dm-save {
  padding: 11px 16px;
  border: 0;
  border-radius: 7px;
  background: #2563eb;
  color: white;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
}

.dm-grid {
  display: grid;
  grid-template-columns: 1.5fr .8fr;
  gap: 18px;
  align-items: start;
}

.dm-main,
.dm-side {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.dm-card {
  padding: 22px;
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  background: white;
}

.dm-title {
  margin-bottom: 20px;
}

.dm-title span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.dm-title h3 {
  margin: 5px 0 0;
  font-size: 17px;
}

.dm-charge-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.dm-charge-card {
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background: #fafbfc;
}

.dm-charge-icon {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  margin-bottom: 15px;
  border-radius: 8px;
  background: #eff6ff;
  font-size: 17px;
}

.dm-charge-card > span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .1em;
}

.dm-charge-card h4 {
  margin: 5px 0 14px;
  font-size: 13px;
}

.dm-price-input {
  display: flex;
  align-items: center;
  overflow: hidden;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  background: white;
}

.dm-price-input span {
  padding-left: 11px;
  color: #6b7280;
  font-size: 12px;
  font-weight: 800;
}

.dm-price-input input {
  width: 100%;
  padding: 11px 8px;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 16px;
  font-weight: 800;
}

.dm-charge-card small {
  display: block;
  margin-top: 7px;
  color: #9ca3af;
  font-size: 8px;
}

.dm-toggle-row {
  padding: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.dm-toggle-row strong {
  display: block;
  font-size: 11px;
}

.dm-toggle-row p {
  margin: 5px 0 0;
  color: #9ca3af;
  font-size: 9px;
  line-height: 1.5;
}

.dm-toggle {
  width: 43px;
  height: 24px;
  padding: 3px;
  border: 0;
  border-radius: 20px;
  background: #d1d5db;
  cursor: pointer;
  transition: .2s;
}

.dm-toggle span {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: white;
  transition: .2s;
}

.dm-toggle.on {
  background: #2563eb;
}

.dm-toggle.on span {
  transform: translateX(19px);
}

.dm-free-field {
  margin-top: 15px;
}

.dm-free-field label {
  display: block;
  margin-bottom: 6px;
  font-size: 10px;
  font-weight: 800;
}

.dm-input-with-prefix {
  display: flex;
  align-items: center;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  background: white;
}

.dm-input-with-prefix span {
  padding-left: 11px;
  color: #6b7280;
  font-weight: 800;
}

.dm-input-with-prefix input {
  width: 100%;
  padding: 11px 8px;
  border: 0;
  outline: 0;
  font-size: 12px;
}

.dm-free-field small {
  display: block;
  margin-top: 6px;
  color: #9ca3af;
  font-size: 8px;
}

.dm-summary {
  display: flex;
  flex-direction: column;
}

.dm-summary > div {
  padding: 13px 0;
  border-bottom: 1px solid #eef0f2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.dm-summary > div:last-child {
  border-bottom: 0;
}

.dm-summary span {
  color: #6b7280;
  font-size: 10px;
}

.dm-summary strong {
  font-size: 12px;
}

.dm-summary .enabled {
  color: #16a34a;
}

.dm-summary .disabled {
  color: #9ca3af;
}

.dm-info {
  padding: 17px;
  border: 1px solid #bfdbfe;
  border-radius: 9px;
  background: #eff6ff;
  display: flex;
  gap: 11px;
}

.dm-info-icon {
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

.dm-info strong {
  display: block;
  font-size: 10px;
}

.dm-info p {
  margin: 5px 0 0;
  color: #6b7280;
  font-size: 9px;
  line-height: 1.6;
}

@media (max-width: 850px) {
  .dm-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .delivery-manager {
    padding: 18px;
  }

  .dm-header {
    align-items: stretch;
    flex-direction: column;
  }

  .dm-charge-grid {
    grid-template-columns: 1fr;
  }
}
`;
