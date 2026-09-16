import React, { useState } from "react";

const defaultProduct = {
  brand: "YOUR BRAND",
  logo: "",
  badge: "LIMITED OFFER",
  title: "Premium Product",
  subtitle: "Smart choice. Better experience.",
  images: [
    "https://placehold.co/1000x1000?text=Product+1",
    "https://placehold.co/1000x1000?text=Product+2",
    "https://placehold.co/1000x1000?text=Product+3",
  ],
  price: 1290,
  oldPrice: 1690,
  discount: 24,
  description:
    "প্রিমিয়াম কোয়ালিটি, সুন্দর ডিজাইন এবং দৈনন্দিন ব্যবহারের জন্য উপযোগী একটি অসাধারণ প্রোডাক্ট।",
  features: [
    "Premium Quality",
    "Modern Design",
    "Easy to Use",
    "Fast Delivery",
  ],
  reviews: [
    {
      name: "Sadia",
      rating: 5,
      text: "প্রোডাক্টটা হাতে পাওয়ার পর সত্যিই অনেক ভালো লেগেছে।",
    },
    {
      name: "Hasan",
      rating: 5,
      text: "Quality অনেক ভালো এবং delivery-ও দ্রুত পেয়েছি।",
    },
    {
      name: "Nabila",
      rating: 4,
      text: "দাম অনুযায়ী খুব ভালো একটি product।",
    },
  ],
  delivery: {
    insideDhaka: 70,
    outsideDhaka: 120,
  },
  payment: {
    bkash: "01XXXXXXXXX",
    nagad: "01XXXXXXXXX",
    rocket: "01XXXXXXXXX",
  },
};

function Stars({ rating = 5 }) {
  return (
    <span className="t3-stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function Template3({
  product = defaultProduct,
  onOrderSubmit,
}) {
  const data = { ...defaultProduct, ...product };

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("inside");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const deliveryCharge =
    location === "inside"
      ? data.delivery.insideDhaka
      : data.delivery.outsideDhaka;

  const productTotal = Number(data.price) * quantity;
  const total = productTotal + deliveryCharge;

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const copyNumber = async (number, type) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(type);

      setTimeout(() => setCopied(""), 1500);
    } catch {
      setCopied("");
    }
  };

  const submitOrder = (event) => {
    event.preventDefault();

    const order = {
      productName: data.title,
      quantity,
      location,
      paymentMethod,
      transactionId,
      productTotal,
      deliveryCharge,
      total,
      orderId: `ORD-${Date.now().toString().slice(-8)}`,
    };

    onOrderSubmit?.(order);

    setSubmitted(true);

    setTimeout(() => {
      scrollTo("t3-thank-you");
    }, 100);
  };

  if (submitted) {
    return (
      <div className="template3-page">
        <style>{styles}</style>

        <header className="t3-header">
          {data.logo ? (
            <img src={data.logo} alt={data.brand} />
          ) : (
            <strong>{data.brand}</strong>
          )}
        </header>

        <section id="t3-thank-you" className="t3-thank-section">
          <div className="t3-thank-card">
            <div className="t3-check">✓</div>

            <span className="t3-label">
              ORDER SUCCESSFUL
            </span>

            <h1>অর্ডার সফলভাবে গ্রহণ করা হয়েছে!</h1>

            <p>
              আপনার অর্ডারের জন্য ধন্যবাদ। খুব শীঘ্রই আমাদের
              প্রতিনিধি আপনার সাথে যোগাযোগ করবে।
            </p>

            <div className="t3-order-details">
              <div>
                <span>Product</span>
                <strong>{data.title}</strong>
              </div>

              <div>
                <span>Quantity</span>
                <strong>{quantity} pcs</strong>
              </div>

              <div>
                <span>Product Price</span>
                <strong>৳{productTotal}</strong>
              </div>

              <div>
                <span>Delivery Charge</span>
                <strong>৳{deliveryCharge}</strong>
              </div>

              <div className="t3-final-total">
                <span>Total</span>
                <strong>৳{total}</strong>
              </div>
            </div>

            <button
              className="t3-outline-button"
              onClick={() => setSubmitted(false)}
            >
              আবার অর্ডার করুন
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="template3-page">
      <style>{styles}</style>

      <header className="t3-header">
        {data.logo ? (
          <img src={data.logo} alt={data.brand} />
        ) : (
          <strong>{data.brand}</strong>
        )}
      </header>

      <main>
        <section className="t3-hero">
          <div className="t3-hero-image-area">
            <span className="t3-offer-badge">
              {data.badge}
            </span>

            <div className="t3-main-image">
              <img
                src={data.images[activeImage]}
                alt={data.title}
              />

              {data.images.length > 1 && (
                <>
                  <button
                    className="t3-image-arrow t3-image-left"
                    onClick={() =>
                      setActiveImage(
                        (activeImage - 1 + data.images.length) %
                          data.images.length
                      )
                    }
                  >
                    ←
                  </button>

                  <button
                    className="t3-image-arrow t3-image-right"
                    onClick={() =>
                      setActiveImage(
                        (activeImage + 1) %
                          data.images.length
                      )
                    }
                  >
                    →
                  </button>
                </>
              )}
            </div>

            <div className="t3-thumbnails">
              {data.images.map((image, index) => (
                <button
                  key={image + index}
                  className={
                    activeImage === index
                      ? "t3-thumb active"
                      : "t3-thumb"
                  }
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="t3-hero-content">
            <button
              className="t3-rating"
              onClick={() => scrollTo("t3-reviews")}
            >
              <Stars rating={5} />
              <span>
                {data.reviews.length} verified reviews
              </span>
            </button>

            <h1>{data.title}</h1>

            <p className="t3-subtitle">
              {data.subtitle}
            </p>

            <div className="t3-price-area">
              <strong>৳{data.price}</strong>

              {data.oldPrice > data.price && (
                <del>৳{data.oldPrice}</del>
              )}

              <span>{data.discount}% OFF</span>
            </div>

            <div className="t3-countdown">
              <div>
                <small>LIMITED TIME OFFER</small>
                <strong>অফারটি শেষ হওয়ার আগে অর্ডার করুন</strong>
              </div>

              <div className="t3-time">
                05 : 00 : 00
              </div>
            </div>

            <button
              className="t3-order-button"
              onClick={() => scrollTo("t3-order")}
            >
              অর্ডার করুন
              <span>→</span>
            </button>

            <div className="t3-benefits">
              <span>✓ Genuine Product</span>
              <span>✓ Fast Delivery</span>
              <span>✓ Easy Ordering</span>
            </div>
          </div>
        </section>

        <section className="t3-intro">
          <div>
            <span className="t3-label">PRODUCT DETAILS</span>
            <h2>আপনার জন্য কেন এটি সঠিক choice?</h2>
          </div>

          <p>{data.description}</p>
        </section>

        <section className="t3-feature-section">
          <div className="t3-section-title">
            <span className="t3-label">KEY FEATURES</span>
            <h2>এক নজরে গুরুত্বপূর্ণ বৈশিষ্ট্য</h2>
          </div>

          <div className="t3-feature-grid">
            {data.features.map((feature, index) => (
              <div className="t3-feature-card" key={index}>
                <span>0{index + 1}</span>

                <h3>{feature}</h3>

                <p>
                  Quality এবং usability-এর কথা মাথায় রেখে
                  তৈরি করা হয়েছে।
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="t3-reviews" className="t3-review-section">
          <div className="t3-section-title">
            <span className="t3-label">
              CUSTOMER REVIEWS
            </span>

            <h2>যারা ব্যবহার করেছেন তাদের মতামত</h2>
          </div>

          <div className="t3-review-track">
            {data.reviews.map((review, index) => (
              <article
                className="t3-review-card"
                key={index}
              >
                <div className="t3-review-top">
                  <Stars rating={review.rating} />

                  <span>Verified</span>
                </div>

                <p>“{review.text}”</p>

                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="t3-cta">
          <div>
            <span className="t3-label">READY TO ORDER?</span>

            <h2>আজই আপনার অর্ডারটি কনফার্ম করুন</h2>

            <p>
              সীমিত সময়ের অফারটি শেষ হওয়ার আগেই অর্ডার করুন।
            </p>
          </div>

          <button
            className="t3-cta-button"
            onClick={() => scrollTo("t3-order")}
          >
            অর্ডার করুন →
          </button>
        </section>

        <section id="t3-order" className="t3-order-section">
          <div className="t3-order-card">
            <div className="t3-order-header">
              <span className="t3-label">ORDER FORM</span>

              <h2>অর্ডার করতে তথ্য দিন</h2>

              <p>
                সঠিক তথ্য দিয়ে নিচের ফর্মটি পূরণ করুন।
              </p>
            </div>

            <form onSubmit={submitOrder}>
              <label>
                নাম
                <input
                  type="text"
                  placeholder="আপনার নাম"
                  required
                />
              </label>

              <label>
                ফোন নম্বর
                <input
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  required
                />
              </label>

              <label>
                সম্পূর্ণ ঠিকানা
                <textarea
                  rows="3"
                  placeholder="আপনার সম্পূর্ণ ঠিকানা"
                  required
                />
              </label>

              <div className="t3-form-grid">
                <label>
                  Quantity
                  <select
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(
                        Number(event.target.value)
                      )
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                      (number) => (
                        <option
                          value={number}
                          key={number}
                        >
                          {number} pcs
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label>
                  Delivery Area
                  <select
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                  >
                    <option value="inside">
                      ঢাকার ভিতরে
                    </option>

                    <option value="outside">
                      ঢাকার বাইরে
                    </option>
                  </select>
                </label>
              </div>

              <div className="t3-payment">
                <h3>Payment Method</h3>

                <label className="t3-payment-option">
                  <input
                    type="radio"
                    name="t3-payment"
                    checked={paymentMethod === "cod"}
                    onChange={() =>
                      setPaymentMethod("cod")
                    }
                  />

                  <span>Cash on Delivery</span>
                </label>

                <label className="t3-payment-option">
                  <input
                    type="radio"
                    name="t3-payment"
                    checked={
                      paymentMethod ===
                      "delivery-advance"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "delivery-advance"
                      )
                    }
                  />

                  <span>
                    Delivery Charge Advance
                  </span>
                </label>

                <label className="t3-payment-option">
                  <input
                    type="radio"
                    name="t3-payment"
                    checked={
                      paymentMethod === "full-advance"
                    }
                    onChange={() =>
                      setPaymentMethod(
                        "full-advance"
                      )
                    }
                  />

                  <span>Full Payment Advance</span>
                </label>
              </div>

              {paymentMethod !== "cod" && (
                <div className="t3-payment-box">
                  <h3>Send Money</h3>

                  <p>
                    নিচের যেকোনো নম্বরে Send Money করে
                    Transaction ID দিন।
                  </p>

                  {[
                    ["bKash", data.payment.bkash, "bkash"],
                    ["Nagad", data.payment.nagad, "nagad"],
                    ["Rocket", data.payment.rocket, "rocket"],
                  ].map(([name, number, key]) => (
                    <div
                      className="t3-payment-number"
                      key={key}
                    >
                      <span>{name}</span>

                      <strong>{number}</strong>

                      <button
                        type="button"
                        onClick={() =>
                          copyNumber(number, key)
                        }
                      >
                        {copied === key
                          ? "Copied"
                          : "Copy"}
                      </button>
                    </div>
                  ))}

                  <label>
                    Transaction ID
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(event) =>
                        setTransactionId(
                          event.target.value
                        )
                      }
                      placeholder="Transaction ID"
                      required
                    />
                  </label>
                </div>
              )}

              <div className="t3-order-summary">
                <div>
                  <span>Product Price</span>
                  <strong>৳{productTotal}</strong>
                </div>

                <div>
                  <span>Delivery Charge</span>
                  <strong>৳{deliveryCharge}</strong>
                </div>

                <div className="t3-summary-total">
                  <span>Total</span>
                  <strong>৳{total}</strong>
                </div>
              </div>

              <button
                type="submit"
                className="t3-confirm-button"
              >
                অর্ডার কনফার্ম করুন
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = `
.template3-page {
  --t3-primary: #111111;
  --t3-accent: #e63946;
  --t3-background: #f7f7f5;
  --t3-card: #ffffff;
  --t3-text: #111111;
  --t3-muted: #707070;
  --t3-border: #e4e4e4;

  min-height: 100vh;
  background: var(--t3-background);
  color: var(--t3-text);
  font-family: Inter, Arial, sans-serif;
}

.template3-page * {
  box-sizing: border-box;
}

.t3-header {
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
  border-bottom: 1px solid var(--t3-border);
}

.t3-header img {
  max-width: 150px;
  max-height: 46px;
  object-fit: contain;
}

.t3-header strong {
  font-size: 22px;
  font-weight: 900;
  letter-spacing: .05em;
}

.t3-hero {
  width: min(1180px, calc(100% - 40px));
  margin: auto;
  padding: 45px 0 65px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.t3-hero-image-area {
  position: relative;
}

.t3-offer-badge {
  position: absolute;
  z-index: 2;
  top: 16px;
  left: 16px;
  padding: 9px 13px;
  background: var(--t3-accent);
  color: white;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .08em;
}

.t3-main-image {
  position: relative;
  aspect-ratio: 1 / 1;
  background: white;
  overflow: hidden;
}

.t3-main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.t3-image-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  font-size: 19px;
  box-shadow: 0 5px 20px rgba(0,0,0,.12);
}

.t3-image-left {
  left: 15px;
}

.t3-image-right {
  right: 15px;
}

.t3-thumbnails {
  display: flex;
  gap: 9px;
  overflow-x: auto;
  padding-top: 12px;
}

.t3-thumb {
  flex: 0 0 65px;
  width: 65px;
  height: 65px;
  padding: 3px;
  background: white;
  border: 1px solid var(--t3-border);
  cursor: pointer;
}

.t3-thumb.active {
  border: 2px solid var(--t3-accent);
}

.t3-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.t3-hero-content {
  max-width: 530px;
}

.t3-rating {
  border: 0;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  color: var(--t3-muted);
}

.t3-stars {
  color: #f4a51c;
  letter-spacing: 2px;
}

.t3-hero-content h1 {
  margin: 17px 0 12px;
  font-size: clamp(38px, 5vw, 64px);
  line-height: 1;
  letter-spacing: -.05em;
}

.t3-subtitle {
  color: var(--t3-muted);
  font-size: 18px;
  line-height: 1.6;
}

.t3-price-area {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin: 22px 0;
}

.t3-price-area strong {
  font-size: 36px;
}

.t3-price-area del {
  color: #999;
  font-size: 19px;
}

.t3-price-area span {
  background: var(--t3-accent);
  color: white;
  padding: 6px 10px;
  font-size: 12px;
  font-weight: 900;
}

.t3-countdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding: 15px;
  margin-bottom: 15px;
  background: #fff1f2;
  border-left: 4px solid var(--t3-accent);
}

.t3-countdown small {
  display: block;
  color: var(--t3-accent);
  font-weight: 900;
  margin-bottom: 4px;
}

.t3-countdown strong {
  font-size: 13px;
}

.t3-time {
  color: var(--t3-accent);
  font-size: 19px;
  font-weight: 900;
  white-space: nowrap;
}

.t3-order-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 0;
  padding: 18px 20px;
  background: var(--t3-primary);
  color: white;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;
}

.t3-order-button span {
  font-size: 23px;
}

.t3-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
  margin-top: 17px;
  color: var(--t3-muted);
  font-size: 13px;
}

.t3-label {
  display: block;
  color: var(--t3-accent);
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .14em;
  margin-bottom: 8px;
}

.t3-intro {
  width: min(1050px, calc(100% - 40px));
  margin: auto;
  padding: 70px 0;
  border-top: 1px solid var(--t3-border);
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 60px;
}

.t3-intro h2,
.t3-section-title h2,
.t3-cta h2 {
  margin: 0;
  font-size: clamp(28px, 4vw, 45px);
  line-height: 1.1;
  letter-spacing: -.04em;
}

.t3-intro p {
  color: var(--t3-muted);
  line-height: 1.9;
  font-size: 17px;
  margin: 0;
}

.t3-feature-section {
  padding: 75px 0;
  background: var(--t3-primary);
  color: white;
}

.t3-section-title {
  width: min(1050px, calc(100% - 40px));
  margin: auto;
  text-align: center;
}

.t3-feature-section .t3-label {
  color: #ff6874;
}

.t3-feature-grid {
  width: min(1050px, calc(100% - 40px));
  margin: 40px auto 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: #333;
}

.t3-feature-card {
  min-height: 210px;
  padding: 25px;
  background: var(--t3-primary);
}

.t3-feature-card > span {
  color: #ff6874;
  font-weight: 900;
}

.t3-feature-card h3 {
  margin-top: 45px;
  font-size: 19px;
}

.t3-feature-card p {
  color: #aaa;
  line-height: 1.6;
  font-size: 13px;
}

.t3-review-section {
  width: min(1100px, calc(100% - 40px));
  margin: auto;
  padding: 80px 0;
}

.t3-review-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  padding: 5px 2px 18px;
  scroll-snap-type: x mandatory;
}

.t3-review-card {
  flex: 0 0 min(350px, 85vw);
  padding: 25px;
  background: white;
  border: 1px solid var(--t3-border);
  scroll-snap-align: start;
}

.t3-review-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.t3-review-top > span {
  font-size: 11px;
  color: #218838;
  font-weight: 800;
}

.t3-review-card p {
  min-height: 90px;
  color: var(--t3-muted);
  line-height: 1.7;
}

.t3-cta {
  width: min(1100px, calc(100% - 40px));
  margin: auto;
  padding: 45px;
  background: var(--t3-accent);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

.t3-cta .t3-label {
  color: white;
}

.t3-cta h2 {
  max-width: 600px;
}

.t3-cta p {
  opacity: .85;
}

.t3-cta-button {
  flex: 0 0 auto;
  padding: 16px 28px;
  border: 0;
  background: white;
  color: var(--t3-primary);
  font-weight: 900;
  cursor: pointer;
}

.t3-order-section {
  width: min(760px, calc(100% - 40px));
  margin: auto;
  padding: 80px 0;
}

.t3-order-card {
  background: white;
  padding: 38px;
  border: 1px solid var(--t3-border);
}

.t3-order-header {
  text-align: center;
  margin-bottom: 30px;
}

.t3-order-header h2 {
  margin: 0;
  font-size: 34px;
}

.t3-order-header p {
  color: var(--t3-muted);
}

.t3-order-card form {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.t3-order-card label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 800;
}

.t3-order-card input,
.t3-order-card textarea,
.t3-order-card select {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--t3-border);
  background: white;
  font: inherit;
  outline: none;
}

.t3-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.t3-payment {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.t3-payment h3 {
  margin: 10px 0;
}

.t3-payment-option {
  flex-direction: row !important;
  align-items: center;
  padding: 13px;
  border: 1px solid var(--t3-border);
  cursor: pointer;
}

.t3-payment-option input {
  width: auto !important;
}

.t3-payment-box {
  padding: 18px;
  background: #f7f7f7;
}

.t3-payment-box p {
  color: var(--t3-muted);
  line-height: 1.6;
}

.t3-payment-number {
  display: grid;
  grid-template-columns: 70px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 9px 0;
}

.t3-payment-number button {
  border: 1px solid var(--t3-border);
  background: white;
  padding: 8px 12px;
  cursor: pointer;
}

.t3-order-summary {
  border-top: 1px solid var(--t3-border);
  padding-top: 15px;
}

.t3-order-summary div {
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
}

.t3-summary-total {
  margin-top: 7px;
  padding-top: 15px !important;
  border-top: 1px solid var(--t3-border);
  font-size: 20px;
}

.t3-confirm-button {
  width: 100%;
  border: 0;
  padding: 18px;
  background: var(--t3-primary);
  color: white;
  font-size: 17px;
  font-weight: 900;
  cursor: pointer;
}

.t3-thank-section {
  min-height: calc(100vh - 72px);
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

.t3-thank-card {
  width: min(600px, 100%);
  height: fit-content;
  padding: 40px;
  background: white;
  text-align: center;
  border: 1px solid var(--t3-border);
}

.t3-check {
  width: 65px;
  height: 65px;
  display: grid;
  place-items: center;
  margin: auto;
  border-radius: 50%;
  background: #e7f7eb;
  color: #218838;
  font-size: 32px;
  font-weight: 900;
}

.t3-thank-card h1 {
  font-size: 30px;
}

.t3-thank-card p {
  color: var(--t3-muted);
  line-height: 1.7;
}

.t3-order-details {
  margin: 25px 0;
  text-align: left;
  border: 1px solid var(--t3-border);
}

.t3-order-details div {
  display: flex;
  justify-content: space-between;
  padding: 13px;
  border-bottom: 1px solid var(--t3-border);
}

.t3-order-details div:last-child {
  border-bottom: 0;
}

.t3-order-details span {
  color: var(--t3-muted);
}

.t3-final-total {
  font-size: 19px;
  background: #f7f7f7;
}

.t3-outline-button {
  padding: 13px 22px;
  border: 1px solid var(--t3-primary);
  background: white;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 850px) {
  .t3-hero {
    grid-template-columns: 1fr;
  }

  .t3-hero-content {
    max-width: none;
  }

  .t3-feature-grid {
    grid-template-columns: 1fr 1fr;
  }

  .t3-intro {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .t3-cta {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 560px) {
  .t3-hero,
  .t3-intro,
  .t3-feature-grid,
  .t3-review-section,
  .t3-cta,
  .t3-order-section {
    width: calc(100% - 24px);
  }

  .t3-feature-grid {
    grid-template-columns: 1fr;
  }

  .t3-form-grid {
    grid-template-columns: 1fr;
  }

  .t3-countdown {
    align-items: flex-start;
    flex-direction: column;
  }

  .t3-payment-number {
    grid-template-columns: 60px 1fr;
  }

  .t3-payment-number button {
    grid-column: 2;
    justify-self: start;
  }

  .t3-order-card,
  .t3-thank-card {
    padding: 22px;
  }
}
`;
