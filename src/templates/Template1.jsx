import React, { useMemo, useState } from "react";

const defaultProduct = {
  brand: "YOUR BRAND",
  logo: "",
  title: "Premium Product",
  images: [
    "https://placehold.co/900x900?text=Product+Image+1",
    "https://placehold.co/900x900?text=Product+Image+2",
    "https://placehold.co/900x900?text=Product+Image+3",
  ],
  price: 1490,
  oldPrice: 1990,
  discount: 25,
  countdownHours: 5,
  description:
    "আপনার প্রোডাক্ট সম্পর্কে বিস্তারিত তথ্য এখানে সুন্দরভাবে দেখানো হবে।",
  reviews: [
    {
      name: "Rahim",
      rating: 5,
      text: "খুব ভালো প্রোডাক্ট। কোয়ালিটি দেখে আমি সন্তুষ্ট।",
    },
    {
      name: "Nusrat",
      rating: 5,
      text: "ছবির মতোই পেয়েছি। ব্যবহার করেও ভালো লেগেছে।",
    },
    {
      name: "Sakib",
      rating: 4,
      text: "ডেলিভারি দ্রুত পেয়েছি এবং প্রোডাক্ট ভালো ছিল।",
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
    <span className="stars" aria-label={`${rating} out of 5`}>
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function Template1({
  product = defaultProduct,
  onOrderSubmit,
}) {
  const data = { ...defaultProduct, ...product };

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState("inside");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [paymentNumber, setPaymentNumber] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const deliveryCharge =
    location === "inside"
      ? data.delivery.insideDhaka
      : data.delivery.outsideDhaka;

  const productTotal = Number(data.price) * Number(quantity);
  const total = productTotal + deliveryCharge;

  const averageRating = useMemo(() => {
    if (!data.reviews?.length) return 5;

    const totalRating = data.reviews.reduce(
      (sum, review) => sum + Number(review.rating || 0),
      0
    );

    return Math.round(totalRating / data.reviews.length);
  }, [data.reviews]);

  const scrollToReviews = () => {
    document
      .getElementById("reviews")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToOrder = () => {
    document
      .getElementById("order-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const copyNumber = async (number, type) => {
    try {
      await navigator.clipboard.writeText(number);
      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
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
      paymentNumber,
      transactionId,
      productTotal,
      deliveryCharge,
      total,
      orderId: `ORD-${Date.now().toString().slice(-8)}`,
    };

    if (onOrderSubmit) {
      onOrderSubmit(order);
    }

    setSubmitted(true);

    setTimeout(() => {
      document
        .getElementById("thank-you")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (submitted) {
    return (
      <div className="template1-page">
        <style>{styles}</style>

        <header className="brand-header">
          {data.logo ? (
            <img src={data.logo} alt={data.brand} className="brand-logo" />
          ) : (
            <div className="brand-name">{data.brand}</div>
          )}
        </header>

        <main id="thank-you" className="thank-you-wrapper">
          <div className="thank-you-card">
            <div className="success-icon">✓</div>

            <h1>অর্ডার সফল হয়েছে!</h1>

            <p className="thank-message">
              আপনার অর্ডারটি আমরা সফলভাবে গ্রহণ করেছি।
            </p>

            <div className="order-summary">
              <div>
                <span>Product</span>
                <strong>{data.title}</strong>
              </div>

              <div>
                <span>Order ID</span>
                <strong>
                  ORD-{Date.now().toString().slice(-8)}
                </strong>
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

              <div className="total-row">
                <span>Total</span>
                <strong>৳{total}</strong>
              </div>
            </div>

            <button
              className="secondary-button"
              onClick={() => {
                setSubmitted(false);

                setTimeout(() => {
                  document
                    .getElementById("order-form")
                    ?.scrollIntoView({ behavior: "smooth" });
                }, 50);
              }}
            >
              আবার অর্ডার করুন
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="template1-page">
      <style>{styles}</style>

      <header className="brand-header">
        {data.logo ? (
          <img src={data.logo} alt={data.brand} className="brand-logo" />
        ) : (
          <div className="brand-name">{data.brand}</div>
        )}
      </header>

      <main>
        <section className="hero-section">
          <div className="gallery">
            <div className="main-image-wrapper">
              <img
                src={data.images[activeImage]}
                alt={`${data.title} ${activeImage + 1}`}
                className="main-product-image"
              />

              {data.images.length > 1 && (
                <>
                  <button
                    className="gallery-arrow left"
                    onClick={() =>
                      setActiveImage(
                        (activeImage - 1 + data.images.length) %
                          data.images.length
                      )
                    }
                    aria-label="Previous image"
                  >
                    ‹
                  </button>

                  <button
                    className="gallery-arrow right"
                    onClick={() =>
                      setActiveImage(
                        (activeImage + 1) % data.images.length
                      )
                    }
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {data.images.length > 1 && (
              <div className="thumbnail-row">
                {data.images.map((image, index) => (
                  <button
                    key={image + index}
                    className={`thumbnail ${
                      activeImage === index ? "active" : ""
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hero-info">
            <button className="review-link" onClick={scrollToReviews}>
              <Stars rating={averageRating} />
              <span>
                {data.reviews.length} Reviews
              </span>
            </button>

            <h1>{data.title}</h1>

            <div className="price-row">
              <strong className="current-price">
                ৳{data.price}
              </strong>

              {data.oldPrice > data.price && (
                <span className="old-price">
                  ৳{data.oldPrice}
                </span>
              )}

              {data.discount > 0 && (
                <span className="discount">
                  {data.discount}% OFF
                </span>
              )}
            </div>

            <div className="countdown">
              <span>অফারটি শেষ হতে বাকি</span>

              <strong>
                {String(data.countdownHours).padStart(2, "0")}:00:00
              </strong>
            </div>

            <button className="primary-order-button" onClick={scrollToOrder}>
              অর্ডার করুন
            </button>
          </div>
        </section>

        <section className="content-section description-section">
          <h2>প্রোডাক্ট সম্পর্কে</h2>
          <p>{data.description}</p>
        </section>

        <section id="reviews" className="content-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">CUSTOMER REVIEWS</span>
              <h2>আমাদের কাস্টমাররা কী বলছেন</h2>
            </div>

            <button className="review-link" onClick={scrollToOrder}>
              অর্ডার করুন
            </button>
          </div>

          <div className="reviews-track">
            {data.reviews.map((review, index) => (
              <article className="review-card" key={index}>
                <Stars rating={review.rating} />

                <p>“{review.text}”</p>

                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </section>

        <section id="order-form" className="content-section order-section">
          <div className="order-card">
            <div className="section-heading centered">
              <span className="eyebrow">ORDER NOW</span>
              <h2>আপনার অর্ডারটি সম্পন্ন করুন</h2>
              <p>নিচের তথ্যগুলো সঠিকভাবে পূরণ করুন।</p>
            </div>

            <form onSubmit={submitOrder}>
              <label>
                নাম
                <input
                  type="text"
                  name="name"
                  placeholder="আপনার নাম"
                  required
                />
              </label>

              <label>
                ফোন নম্বর
                <input
                  type="tel"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  required
                />
              </label>

              <label>
                সম্পূর্ণ ঠিকানা
                <textarea
                  name="address"
                  placeholder="আপনার সম্পূর্ণ ঠিকানা"
                  rows="3"
                  required
                />
              </label>

              <div className="form-grid">
                <label>
                  কত পিস?
                  <select
                    value={quantity}
                    onChange={(event) =>
                      setQuantity(Number(event.target.value))
                    }
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                      <option value={number} key={number}>
                        {number} পিস
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  ডেলিভারি
                  <select
                    value={location}
                    onChange={(event) =>
                      setLocation(event.target.value)
                    }
                  >
                    <option value="inside">ঢাকার ভিতরে</option>
                    <option value="outside">ঢাকার বাইরে</option>
                  </select>
                </label>
              </div>

              <div className="payment-methods">
                <h3>Payment Method</h3>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />
                  <span>Cash on Delivery</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="delivery-advance"
                    checked={paymentMethod === "delivery-advance"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />
                  <span>Delivery Charge Advance</span>
                </label>

                <label className="payment-option">
                  <input
                    type="radio"
                    name="payment"
                    value="full-advance"
                    checked={paymentMethod === "full-advance"}
                    onChange={(event) =>
                      setPaymentMethod(event.target.value)
                    }
                  />
                  <span>Full Payment Advance</span>
                </label>
              </div>

              {paymentMethod !== "cod" && (
                <div className="payment-box">
                  <h3>Payment Information</h3>

                  <p>
                    Send Money করে নিচের Transaction ID দিন।
                  </p>

                  <div className="payment-number">
                    <span>bKash</span>
                    <strong>{data.payment.bkash}</strong>

                    <button
                      type="button"
                      onClick={() =>
                        copyNumber(data.payment.bkash, "bkash")
                      }
                    >
                      {copied === "bkash" ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <div className="payment-number">
                    <span>Nagad</span>
                    <strong>{data.payment.nagad}</strong>

                    <button
                      type="button"
                      onClick={() =>
                        copyNumber(data.payment.nagad, "nagad")
                      }
                    >
                      {copied === "nagad" ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <div className="payment-number">
                    <span>Rocket</span>
                    <strong>{data.payment.rocket}</strong>

                    <button
                      type="button"
                      onClick={() =>
                        copyNumber(data.payment.rocket, "rocket")
                      }
                    >
                      {copied === "rocket" ? "Copied" : "Copy"}
                    </button>
                  </div>

                  <label>
                    Transaction ID
                    <input
                      type="text"
                      value={transactionId}
                      onChange={(event) =>
                        setTransactionId(event.target.value)
                      }
                      placeholder="Transaction ID লিখুন"
                      required
                    />
                  </label>
                </div>
              )}

              <div className="order-total">
                <div>
                  <span>Product</span>
                  <strong>৳{productTotal}</strong>
                </div>

                <div>
                  <span>Delivery</span>
                  <strong>৳{deliveryCharge}</strong>
                </div>

                <div className="grand-total">
                  <span>Total</span>
                  <strong>৳{total}</strong>
                </div>
              </div>

              <button type="submit" className="confirm-button">
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
.template1-page {
  --primary: #111827;
  --accent: #e11d48;
  --surface: #ffffff;
  --soft: #f8fafc;
  --border: #e5e7eb;
  --text: #111827;
  --muted: #6b7280;
  min-height: 100vh;
  background: var(--surface);
  color: var(--text);
  font-family: Inter, Arial, sans-serif;
}

.template1-page * {
  box-sizing: border-box;
}

.brand-header {
  min-height: 72px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--border);
}

.brand-logo {
  max-width: 150px;
  max-height: 48px;
  object-fit: contain;
}

.brand-name {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: 0.02em;
}

.hero-section {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 36px 0 48px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 0.85fr);
  gap: 48px;
  align-items: center;
}

.gallery {
  min-width: 0;
}

.main-image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  background: var(--soft);
  aspect-ratio: 1 / 1;
}

.main-product-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,.92);
  box-shadow: 0 5px 20px rgba(0,0,0,.12);
  cursor: pointer;
  font-size: 28px;
  line-height: 1;
}

.gallery-arrow.left {
  left: 14px;
}

.gallery-arrow.right {
  right: 14px;
}

.thumbnail-row {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-top: 12px;
}

.thumbnail {
  flex: 0 0 68px;
  width: 68px;
  height: 68px;
  padding: 3px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: white;
  cursor: pointer;
}

.thumbnail.active {
  border: 2px solid var(--primary);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 7px;
}

.hero-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.review-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--muted);
  cursor: pointer;
}

.stars {
  color: #f59e0b;
  letter-spacing: 1px;
}

.hero-info h1 {
  margin: 14px 0 18px;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.12;
}

.price-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.current-price {
  font-size: 34px;
}

.old-price {
  color: #9ca3af;
  text-decoration: line-through;
  font-size: 20px;
}

.discount {
  background: var(--accent);
  color: white;
  padding: 6px 10px;
  border-radius: 7px;
  font-weight: 800;
}

.countdown {
  width: 100%;
  margin: 20px 0;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--soft);
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.countdown strong {
  color: var(--accent);
}

.primary-order-button,
.confirm-button {
  width: 100%;
  border: 0;
  border-radius: 12px;
  padding: 17px 20px;
  background: var(--primary);
  color: white;
  font-size: 17px;
  font-weight: 800;
  cursor: pointer;
}

.content-section {
  width: min(900px, calc(100% - 32px));
  margin: 0 auto;
  padding: 64px 0;
}

.description-section {
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.content-section h2 {
  margin: 0 0 14px;
  font-size: clamp(25px, 3vw, 34px);
}

.description-section p {
  margin: 0;
  color: var(--muted);
  line-height: 1.8;
  font-size: 17px;
}

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.section-heading.centered {
  display: block;
  text-align: center;
}

.eyebrow {
  display: block;
  margin-bottom: 8px;
  color: var(--accent);
  font-size: 12px;
  font-weight: 900;
  letter-spacing: .12em;
}

.reviews-track {
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding: 4px 2px 18px;
}

.review-card {
  flex: 0 0 min(340px, 85vw);
  scroll-snap-align: start;
  padding: 22px;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: white;
}

.review-card p {
  min-height: 80px;
  color: var(--muted);
  line-height: 1.7;
}

.review-card strong {
  display: block;
  margin-top: 14px;
}

.order-section {
  max-width: 760px;
}

.order-card {
  padding: 30px;
  border: 1px solid var(--border);
  border-radius: 20px;
  background: white;
  box-shadow: 0 12px 40px rgba(0,0,0,.06);
}

.order-card form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.order-card label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 700;
}

.order-card input,
.order-card textarea,
.order-card select {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 13px 14px;
  font: inherit;
  outline: none;
  background: white;
}

.order-card input:focus,
.order-card textarea:focus,
.order-card select:focus {
  border-color: var(--primary);
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.payment-methods {
  padding-top: 10px;
}

.payment-methods h3,
.payment-box h3 {
  margin: 0 0 12px;
}

.payment-option {
  flex-direction: row !important;
  align-items: center;
  padding: 13px;
  border: 1px solid var(--border);
  border-radius: 10px;
  cursor: pointer;
}

.payment-option input {
  width: auto;
}

.payment-box {
  padding: 18px;
  border-radius: 14px;
  background: var(--soft);
}

.payment-box > p {
  color: var(--muted);
  margin-top: 0;
}

.payment-number {
  display: grid;
  grid-template-columns: 70px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px 0;
}

.payment-number button {
  border: 1px solid var(--border);
  background: white;
  border-radius: 8px;
  padding: 8px 12px;
  cursor: pointer;
}

.order-total {
  padding: 18px 0;
  border-top: 1px solid var(--border);
}

.order-total > div {
  display: flex;
  justify-content: space-between;
  padding: 7px 0;
}

.grand-total {
  margin-top: 8px;
  padding-top: 14px !important;
  border-top: 1px solid var(--border);
  font-size: 20px;
}

.thank-you-wrapper {
  min-height: calc(100vh - 72px);
  display: flex;
  justify-content: center;
  padding: 50px 16px;
  background: var(--soft);
}

.thank-you-card {
  width: min(600px, 100%);
  align-self: flex-start;
  padding: 32px;
  border-radius: 20px;
  background: white;
  text-align: center;
  box-shadow: 0 15px 50px rgba(0,0,0,.08);
}

.success-icon {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: #dcfce7;
  color: #15803d;
  font-size: 32px;
  font-weight: 900;
}

.thank-you-card h1 {
  margin: 0 0 10px;
}

.thank-message {
  color: var(--muted);
}

.order-summary {
  margin: 24px 0;
  text-align: left;
  border: 1px solid var(--border);
  border-radius: 14px;
  overflow: hidden;
}

.order-summary > div {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 13px 15px;
  border-bottom: 1px solid var(--border);
}

.order-summary > div:last-child {
  border-bottom: 0;
}

.order-summary span {
  color: var(--muted);
}

.total-row {
  background: var(--soft);
  font-size: 18px;
}

.secondary-button {
  border: 1px solid var(--border);
  background: white;
  border-radius: 10px;
  padding: 13px 20px;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 760px) {
  .hero-section {
    grid-template-columns: 1fr;
    gap: 26px;
    padding-top: 20px;
  }

  .hero-info h1 {
    font-size: 30px;
  }

  .content-section {
    padding: 46px 0;
  }

  .section-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .order-card,
  .thank-you-card {
    padding: 22px;
  }

  .payment-number {
    grid-template-columns: 60px 1fr;
  }

  .payment-number button {
    grid-column: 2;
    justify-self: start;
  }
}
`;
