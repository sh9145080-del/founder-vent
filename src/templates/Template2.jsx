import React, { useState } from "react";

const defaultProduct = {
  brand: "YOUR BRAND",
  logo: "",
  title: "Premium Product",
  subtitle: "Designed for a better everyday experience",
  images: [
    "https://placehold.co/1000x1000?text=Premium+Product",
    "https://placehold.co/1000x1000?text=Product+Detail",
    "https://placehold.co/1000x1000?text=Product+Lifestyle",
  ],
  price: 2490,
  oldPrice: 3290,
  discount: 24,
  description:
    "একটি premium এবং thoughtfully designed product যা quality, performance এবং everyday usability-এর দিকে বিশেষভাবে গুরুত্ব দেয়।",
  features: [
    "Premium quality materials",
    "Modern and elegant design",
    "Easy to use",
    "Long-lasting performance",
  ],
  reviews: [
    {
      name: "Arafat",
      rating: 5,
      text: "প্রোডাক্টের quality সত্যিই premium।",
    },
    {
      name: "Mim",
      rating: 5,
      text: "Packaging এবং product দুটোই অনেক সুন্দর ছিল।",
    },
    {
      name: "Tanvir",
      rating: 4,
      text: "Overall experience খুব ভালো।",
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
    <span className="t2-stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function Template2({
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

  const scrollToOrder = () => {
    document
      .getElementById("template2-order")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToReviews = () => {
    document
      .getElementById("template2-reviews")
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
      document
        .getElementById("template2-thankyou")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (submitted) {
    return (
      <div className="template2-page">
        <style>{styles}</style>

        <header className="t2-header">
          {data.logo ? (
            <img src={data.logo} alt={data.brand} />
          ) : (
            <strong>{data.brand}</strong>
          )}
        </header>

        <section id="template2-thankyou" className="t2-thankyou">
          <div className="t2-thank-card">
            <div className="t2-success">✓</div>

            <span className="t2-eyebrow">ORDER CONFIRMED</span>

            <h1>আপনার অর্ডার সফল হয়েছে</h1>

            <p>
              ধন্যবাদ। আপনার অর্ডারের তথ্য আমরা সফলভাবে পেয়েছি।
            </p>

            <div className="t2-summary">
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

              <div className="t2-total">
                <span>Total</span>
                <strong>৳{total}</strong>
              </div>
            </div>

            <button
              className="t2-outline-button"
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
    <div className="template2-page">
      <style>{styles}</style>

      <header className="t2-header">
        {data.logo ? (
          <img src={data.logo} alt={data.brand} />
        ) : (
          <strong>{data.brand}</strong>
        )}
      </header>

      <main>
        <section className="t2-hero">
          <div className="t2-gallery">
            <div className="t2-main-image">
              <img
                src={data.images[activeImage]}
                alt={data.title}
              />

              {data.images.length > 1 && (
                <>
                  <button
                    className="t2-arrow t2-left"
                    onClick={() =>
                      setActiveImage(
                        (activeImage - 1 + data.images.length) %
                          data.images.length
                      )
                    }
                  >
                    ‹
                  </button>

                  <button
                    className="t2-arrow t2-right"
                    onClick={() =>
                      setActiveImage(
                        (activeImage + 1) % data.images.length
                      )
                    }
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="t2-thumbnails">
              {data.images.map((image, index) => (
                <button
                  key={image + index}
                  className={
                    activeImage === index
                      ? "t2-thumb active"
                      : "t2-thumb"
                  }
                  onClick={() => setActiveImage(index)}
                >
                  <img src={image} alt="" />
                </button>
              ))}
            </div>
          </div>

          <div className="t2-hero-info">
            <button
              className="t2-review-link"
              onClick={scrollToReviews}
            >
              <Stars rating={5} />
              <span>{data.reviews.length} Customer Reviews</span>
            </button>

            <span className="t2-eyebrow">PREMIUM COLLECTION</span>

            <h1>{data.title}</h1>

            <p className="t2-subtitle">{data.subtitle}</p>

            <div className="t2-price">
              <strong>৳{data.price}</strong>

              {data.oldPrice > data.price && (
                <del>৳{data.oldPrice}</del>
              )}

              <span>{data.discount}% OFF</span>
            </div>

            <p className="t2-description">
              {data.description}
            </p>

            <button
              className="t2-primary-button"
              onClick={scrollToOrder}
            >
              অর্ডার করুন
            </button>

            <div className="t2-trust">
              <span>✓ Premium Quality</span>
              <span>✓ Secure Order</span>
              <span>✓ Fast Delivery</span>
            </div>
          </div>
        </section>

        <section className="t2-feature-section">
          <span className="t2-eyebrow">WHY YOU'LL LOVE IT</span>

          <h2>কেন এই প্রোডাক্টটি বেছে নেবেন?</h2>

          <div className="t2-features">
            {data.features.map((feature, index) => (
              <div className="t2-feature" key={index}>
                <div className="t2-feature-number">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3>{feature}</h3>

                <p>
                  Designed to provide a reliable and premium
                  experience every day.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="t2-story">
          <div className="t2-story-image">
            <img src={data.images[1] || data.images[0]} alt="" />
          </div>

          <div className="t2-story-content">
            <span className="t2-eyebrow">THE EXPERIENCE</span>

            <h2>শুধু একটি প্রোডাক্ট নয়, একটি ভালো experience</h2>

            <p>{data.description}</p>

            <button
              className="t2-dark-button"
              onClick={scrollToOrder}
            >
              এখনই অর্ডার করুন
            </button>
          </div>
        </section>

        <section id="template2-reviews" className="t2-reviews">
          <span className="t2-eyebrow">CUSTOMER STORIES</span>

          <h2>আমাদের কাস্টমারদের অভিজ্ঞতা</h2>

          <div className="t2-review-grid">
            {data.reviews.map((review, index) => (
              <article className="t2-review-card" key={index}>
                <Stars rating={review.rating} />

                <p>“{review.text}”</p>

                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section id="template2-order" className="t2-order-section">
          <div className="t2-order-card">
            <div className="t2-order-heading">
              <span className="t2-eyebrow">ORDER NOW</span>

              <h2>আপনার অর্ডারটি সম্পন্ন করুন</h2>

              <p>
                নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন।
              </p>
            </div>

            <form onSubmit={submitOrder}>
              <label>
                নাম
                <input
                  required
                  type="text"
                  placeholder="আপনার নাম"
                />
              </label>

              <label>
                ফোন নম্বর
                <input
                  required
                  type="tel"
                  placeholder="01XXXXXXXXX"
                />
              </label>

              <label>
                ঠিকানা
                <textarea
                  required
                  rows="3"
                  placeholder="আপনার সম্পূর্ণ ঠিকানা"
                />
              </label>

              <div className="t2-form-grid">
                <label>
                  Quantity
                  <select
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
                      (number) => (
                        <option key={number} value={number}>
                          {number} pcs
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label>
                  Delivery
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

              <div className="t2-payment">
                <h3>Payment Method</h3>

                <label className="t2-payment-option">
                  <input
                    type="radio"
                    name="t2-payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  Cash on Delivery
                </label>

                <label className="t2-payment-option">
                  <input
                    type="radio"
                    name="t2-payment"
                    checked={
                      paymentMethod === "delivery-advance"
                    }
                    onChange={() =>
                      setPaymentMethod("delivery-advance")
                    }
                  />
                  Delivery Charge Advance
                </label>

                <label className="t2-payment-option">
                  <input
                    type="radio"
                    name="t2-payment"
                    checked={paymentMethod === "full-advance"}
                    onChange={() =>
                      setPaymentMethod("full-advance")
                    }
                  />
                  Full Payment Advance
                </label>
              </div>

              {paymentMethod !== "cod" && (
                <div className="t2-payment-box">
                  <h3>Send Money</h3>

                  <p>
                    আপনার নির্বাচিত payment অনুযায়ী টাকা Send
                    Money করুন এবং Transaction ID দিন।
                  </p>

                  {[
                    ["bKash", data.payment.bkash, "bkash"],
                    ["Nagad", data.payment.nagad, "nagad"],
                    ["Rocket", data.payment.rocket, "rocket"],
                  ].map(([name, number, key]) => (
                    <div className="t2-number" key={key}>
                      <span>{name}</span>

                      <strong>{number}</strong>

                      <button
                        type="button"
                        onClick={() =>
                          copyNumber(number, key)
                        }
                      >
                        {copied === key ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}

                  <label>
                    Transaction ID
                    <input
                      required
                      value={transactionId}
                      onChange={(event) =>
                        setTransactionId(event.target.value)
                      }
                      placeholder="Transaction ID"
                    />
                  </label>
                </div>
              )}

              <div className="t2-total-box">
                <div>
                  <span>Product</span>
                  <strong>৳{productTotal}</strong>
                </div>

                <div>
                  <span>Delivery</span>
                  <strong>৳{deliveryCharge}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>৳{total}</strong>
                </div>
              </div>

              <button
                type="submit"
                className="t2-confirm-button"
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
.template2-page {
  --t2-primary: #171717;
  --t2-accent: #9a6b38;
  --t2-background: #faf9f6;
  --t2-card: #ffffff;
  --t2-text: #171717;
  --t2-muted: #737373;
  --t2-border: #e8e5df;

  min-height: 100vh;
  background: var(--t2-background);
  color: var(--t2-text);
  font-family: Inter, Arial, sans-serif;
}

.template2-page * {
  box-sizing: border-box;
}

.t2-header {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--t2-card);
  border-bottom: 1px solid var(--t2-border);
}

.t2-header img {
  max-width: 150px;
  max-height: 48px;
  object-fit: contain;
}

.t2-header strong {
  font-size: 21px;
  letter-spacing: .08em;
}

.t2-hero {
  width: min(1180px, calc(100% - 40px));
  margin: auto;
  padding: 55px 0 75px;
  display: grid;
  grid-template-columns: 1.1fr .9fr;
  gap: 70px;
  align-items: center;
}

.t2-main-image {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  background: #f0eee9;
}

.t2-main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.t2-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,.95);
  font-size: 28px;
  cursor: pointer;
}

.t2-left {
  left: 15px;
}

.t2-right {
  right: 15px;
}

.t2-thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-top: 12px;
}

.t2-thumb {
  flex: 0 0 70px;
  width: 70px;
  height: 70px;
  padding: 3px;
  background: white;
  border: 1px solid var(--t2-border);
  cursor: pointer;
}

.t2-thumb.active {
  border: 2px solid var(--t2-accent);
}

.t2-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.t2-hero-info {
  max-width: 520px;
}

.t2-review-link {
  border: 0;
  background: transparent;
  padding: 0;
  display: inline-flex;
  gap: 9px;
  align-items: center;
  cursor: pointer;
  color: var(--t2-muted);
}

.t2-stars {
  color: #c58b3a;
  letter-spacing: 2px;
}

.t2-eyebrow {
  display: block;
  margin: 16px 0 10px;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: .16em;
  color: var(--t2-accent);
}

.t2-hero-info h1 {
  margin: 0;
  font-size: clamp(38px, 5vw, 66px);
  line-height: 1;
  letter-spacing: -.04em;
}

.t2-subtitle {
  margin: 20px 0;
  color: var(--t2-muted);
  font-size: 18px;
  line-height: 1.6;
}

.t2-price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 13px;
}

.t2-price strong {
  font-size: 34px;
}

.t2-price del {
  color: #a3a3a3;
  font-size: 18px;
}

.t2-price span {
  padding: 6px 10px;
  background: var(--t2-accent);
  color: white;
  font-size: 12px;
  font-weight: 800;
}

.t2-description {
  color: var(--t2-muted);
  line-height: 1.8;
}

.t2-primary-button,
.t2-dark-button,
.t2-confirm-button {
  border: 0;
  background: var(--t2-primary);
  color: white;
  padding: 16px 26px;
  font-weight: 800;
  cursor: pointer;
}

.t2-primary-button {
  width: 100%;
  margin-top: 12px;
}

.t2-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
  color: var(--t2-muted);
  font-size: 13px;
}

.t2-feature-section,
.t2-reviews {
  width: min(1100px, calc(100% - 40px));
  margin: auto;
  padding: 75px 0;
  text-align: center;
}

.t2-feature-section h2,
.t2-reviews h2 {
  margin: 0 0 35px;
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -.03em;
}

.t2-features {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--t2-border);
  border: 1px solid var(--t2-border);
}

.t2-feature {
  min-height: 190px;
  padding: 28px 20px;
  background: var(--t2-card);
  text-align: left;
}

.t2-feature-number {
  color: var(--t2-accent);
  font-size: 13px;
  font-weight: 900;
}

.t2-feature h3 {
  margin: 28px 0 10px;
}

.t2-feature p {
  color: var(--t2-muted);
  line-height: 1.6;
  font-size: 14px;
}

.t2-story {
  width: min(1180px, calc(100% - 40px));
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: var(--t2-card);
}

.t2-story-image {
  min-height: 500px;
}

.t2-story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.t2-story-content {
  padding: clamp(35px, 6vw, 75px);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.t2-story-content h2 {
  font-size: clamp(30px, 4vw, 50px);
  line-height: 1.1;
  letter-spacing: -.04em;
}

.t2-story-content p {
  color: var(--t2-muted);
  line-height: 1.8;
}

.t2-dark-button {
  align-self: flex-start;
  margin-top: 15px;
}

.t2-review-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  text-align: left;
}

.t2-review-card {
  padding: 28px;
  background: var(--t2-card);
  border: 1px solid var(--t2-border);
}

.t2-review-card p {
  min-height: 90px;
  color: var(--t2-muted);
  line-height: 1.7;
}

.t2-order-section {
  width: min(760px, calc(100% - 40px));
  margin: auto;
  padding: 75px 0;
}

.t2-order-card {
  padding: 38px;
  background: var(--t2-card);
  border: 1px solid var(--t2-border);
}

.t2-order-heading {
  text-align: center;
  margin-bottom: 30px;
}

.t2-order-heading h2 {
  margin: 0;
  font-size: 34px;
}

.t2-order-heading p {
  color: var(--t2-muted);
}

.t2-order-card form {
  display: flex;
  flex-direction: column;
  gap: 17px;
}

.t2-order-card label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 700;
}

.t2-order-card input,
.t2-order-card textarea,
.t2-order-card select {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--t2-border);
  background: white;
  font: inherit;
  outline: none;
}

.t2-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.t2-payment {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.t2-payment h3 {
  margin: 8px 0;
}

.t2-payment-option {
  flex-direction: row !important;
  align-items: center;
  padding: 13px;
  border: 1px solid var(--t2-border);
}

.t2-payment-option input {
  width: auto !important;
}

.t2-payment-box {
  padding: 18px;
  background: #f7f5f1;
}

.t2-payment-box p {
  color: var(--t2-muted);
  line-height: 1.6;
}

.t2-number {
  display: grid;
  grid-template-columns: 70px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 9px 0;
}

.t2-number button {
  border: 1px solid var(--t2-border);
  background: white;
  padding: 8px 12px;
  cursor: pointer;
}

.t2-total-box {
  border-top: 1px solid var(--t2-border);
  padding-top: 14px;
}

.t2-total-box div {
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
}

.t2-total-box div:last-child {
  padding-top: 15px;
  margin-top: 7px;
  border-top: 1px solid var(--t2-border);
  font-size: 20px;
}

.t2-confirm-button {
  width: 100%;
  font-size: 17px;
}

.t2-thankyou {
  min-height: calc(100vh - 76px);
  display: flex;
  justify-content: center;
  padding: 60px 20px;
}

.t2-thank-card {
  width: min(600px, 100%);
  height: fit-content;
  padding: 40px;
  background: white;
  border: 1px solid var(--t2-border);
  text-align: center;
}

.t2-success {
  width: 64px;
  height: 64px;
  margin: auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #e8f5e9;
  color: #218838;
  font-size: 32px;
  font-weight: 900;
}

.t2-summary {
  margin: 25px 0;
  text-align: left;
  border: 1px solid var(--t2-border);
}

.t2-summary div {
  display: flex;
  justify-content: space-between;
  padding: 13px;
  border-bottom: 1px solid var(--t2-border);
}

.t2-summary div:last-child {
  border-bottom: 0;
}

.t2-summary span {
  color: var(--t2-muted);
}

.t2-total {
  font-size: 19px;
  background: #f7f5f1;
}

.t2-outline-button {
  border: 1px solid var(--t2-primary);
  background: transparent;
  padding: 13px 22px;
  cursor: pointer;
  font-weight: 800;
}

@media (max-width: 850px) {
  .t2-hero {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .t2-hero-info {
    max-width: none;
  }

  .t2-features {
    grid-template-columns: 1fr 1fr;
  }

  .t2-story {
    grid-template-columns: 1fr;
  }

  .t2-story-image {
    min-height: 360px;
  }

  .t2-review-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .t2-hero,
  .t2-feature-section,
  .t2-reviews,
  .t2-order-section,
  .t2-story {
    width: min(100% - 24px, 1180px);
  }

  .t2-hero {
    padding-top: 25px;
  }

  .t2-hero-info h1 {
    font-size: 38px;
  }

  .t2-features {
    grid-template-columns: 1fr;
  }

  .t2-form-grid {
    grid-template-columns: 1fr;
  }

  .t2-number {
    grid-template-columns: 60px 1fr;
  }

  .t2-number button {
    grid-column: 2;
    justify-self: start;
  }

  .t2-order-card,
  .t2-thank-card {
    padding: 22px;
  }
}
`;
