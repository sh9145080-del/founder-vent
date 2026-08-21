import React, { useState } from "react";

const defaultProduct = {
  brand: "YOUR BRAND",
  logo: "",
  title: "Premium Product",
  subtitle: "Quality you can trust, value you can feel.",
  images: [
    "https://placehold.co/1000x1000?text=Product+1",
    "https://placehold.co/1000x1000?text=Product+2",
    "https://placehold.co/1000x1000?text=Product+3",
  ],
  price: 1290,
  oldPrice: 1690,
  discount: 24,
  description:
    "আপনার দৈনন্দিন প্রয়োজনের জন্য তৈরি একটি নির্ভরযোগ্য ও প্রিমিয়াম মানের প্রোডাক্ট।",
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
      text: "প্রোডাক্টটা হাতে পেয়ে অনেক ভালো লেগেছে। Quality সত্যিই ভালো।",
    },
    {
      name: "Tanvir",
      rating: 5,
      text: "ছবির মতোই পেয়েছি। Delivery দ্রুত এবং packaging সুন্দর ছিল।",
    },
    {
      name: "Mim",
      rating: 4,
      text: "দাম অনুযায়ী খুব ভালো product। আমি সন্তুষ্ট।",
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
    <span className="t5-stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function Template5({
  product = defaultProduct,
  onOrderSubmit,
}) {
  const data = {
    ...defaultProduct,
    ...product,
  };

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [area, setArea] = useState("inside");
  const [payment, setPayment] = useState("cod");
  const [transactionId, setTransactionId] = useState("");
  const [copied, setCopied] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const delivery =
    area === "inside"
      ? data.delivery.insideDhaka
      : data.delivery.outsideDhaka;

  const productTotal =
    Number(data.price) * quantity;

  const total =
    productTotal + delivery;

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  const copyNumber = async (number, type) => {
    try {
      await navigator.clipboard.writeText(number);

      setCopied(type);

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch {}
  };

  const submitOrder = (event) => {
    event.preventDefault();

    const order = {
      productName: data.title,
      quantity,
      area,
      payment,
      transactionId,
      productTotal,
      delivery,
      total,
      orderId:
        "ORD-" +
        Date.now().toString().slice(-8),
    };

    onOrderSubmit?.(order);

    setSubmitted(true);

    setTimeout(() => {
      scrollTo("t5-thank-you");
    }, 100);
  };

  if (submitted) {
    return (
      <div className="template5-page">
        <style>{styles}</style>

        <header className="t5-header">
          {data.logo ? (
            <img
              src={data.logo}
              alt={data.brand}
            />
          ) : (
            <strong>{data.brand}</strong>
          )}
        </header>

        <section
          id="t5-thank-you"
          className="t5-thank-you"
        >
          <div className="t5-thank-card">
            <div className="t5-success">
              ✓
            </div>

            <span className="t5-kicker">
              ORDER CONFIRMED
            </span>

            <h1>
              আপনার অর্ডার
              <br />
              সফলভাবে গ্রহণ করা হয়েছে!
            </h1>

            <p>
              আপনার অর্ডারের জন্য ধন্যবাদ।
              আমাদের প্রতিনিধি শীঘ্রই আপনার
              সাথে যোগাযোগ করবে।
            </p>

            <div className="t5-order-info">
              <div>
                <span>Order ID</span>
                <strong>
                  ORD-{Date.now()
                    .toString()
                    .slice(-8)}
                </strong>
              </div>

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
                <strong>
                  ৳{productTotal}
                </strong>
              </div>

              <div>
                <span>Delivery Charge</span>
                <strong>
                  ৳{delivery}
                </strong>
              </div>

              <div className="t5-total">
                <span>Total</span>
                <strong>
                  ৳{total}
                </strong>
              </div>
            </div>

            <button
              className="t5-back-button"
              onClick={() =>
                setSubmitted(false)
              }
            >
              আবার অর্ডার করুন
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="template5-page">
      <style>{styles}</style>

      {/* HEADER */}

      <header className="t5-header">
        {data.logo ? (
          <img
            src={data.logo}
            alt={data.brand}
          />
        ) : (
          <strong>{data.brand}</strong>
        )}
      </header>

      {/* HERO */}

      <section className="t5-hero">
        <div className="t5-gallery">
          <div className="t5-main-image">
            <div className="t5-sale-tag">
              {data.discount}% OFF
            </div>

            <img
              src={data.images[activeImage]}
              alt={data.title}
            />

            {data.images.length > 1 && (
              <>
                <button
                  className="t5-arrow left"
                  onClick={() =>
                    setActiveImage(
                      (activeImage -
                        1 +
                        data.images.length) %
                        data.images.length
                    )
                  }
                >
                  ‹
                </button>

                <button
                  className="t5-arrow right"
                  onClick={() =>
                    setActiveImage(
                      (activeImage + 1) %
                        data.images.length
                    )
                  }
                >
                  ›
                </button>
              </>
            )}
          </div>

          <div className="t5-thumbnails">
            {data.images.map(
              (image, index) => (
                <button
                  key={image + index}
                  className={
                    activeImage === index
                      ? "t5-thumb active"
                      : "t5-thumb"
                  }
                  onClick={() =>
                    setActiveImage(index)
                  }
                >
                  <img
                    src={image}
                    alt=""
                  />
                </button>
              )
            )}
          </div>
        </div>

        <div className="t5-product">
          <button
            className="t5-review-link"
            onClick={() =>
              scrollTo("t5-reviews")
            }
          >
            <Stars rating={5} />

            <span>
              4.9/5 · {data.reviews.length}+
              Customer Reviews
            </span>
          </button>

          <h1>{data.title}</h1>

          <p className="t5-subtitle">
            {data.subtitle}
          </p>

          <div className="t5-price-row">
            <strong>
              ৳{data.price}
            </strong>

            {data.oldPrice >
              data.price && (
              <del>
                ৳{data.oldPrice}
              </del>
            )}

            <span>
              SAVE {data.discount}%
            </span>
          </div>

          <div className="t5-stock">
            <span className="t5-stock-dot" />

            <strong>
              Limited stock available
            </strong>

            <span>
              — Order before stock runs out
            </span>
          </div>

          <div className="t5-countdown">
            <span>
              OFFER ENDS IN
            </span>

            <strong>
              05 : 00 : 00
            </strong>
          </div>

          <button
            className="t5-order-button"
            onClick={() =>
              scrollTo("t5-order")
            }
          >
            অর্ডার করুন
            <span>→</span>
          </button>

          <div className="t5-assurance">
            <div>
              <b>✓</b>
              <span>
                Authentic Product
              </span>
            </div>

            <div>
              <b>✓</b>
              <span>
                Fast Delivery
              </span>
            </div>

            <div>
              <b>✓</b>
              <span>
                Secure Ordering
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}

      <section className="t5-about">
        <div className="t5-about-title">
          <span className="t5-kicker">
            WHY YOU'LL LOVE IT
          </span>

          <h2>
            Everything you need.
            <br />
            Nothing you don't.
          </h2>
        </div>

        <div className="t5-about-content">
          <p>
            {data.description}
          </p>

          <div className="t5-feature-list">
            {data.features.map(
              (feature, index) => (
                <div
                  className="t5-feature"
                  key={index}
                >
                  <span>
                    ✓
                  </span>

                  <strong>
                    {feature}
                  </strong>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* REVIEWS */}

      <section
        id="t5-reviews"
        className="t5-reviews"
      >
        <div className="t5-review-head">
          <span className="t5-kicker">
            REAL CUSTOMERS
          </span>

          <h2>
            What our customers say
          </h2>

          <p>
            আমাদের কাস্টমারদের বাস্তব
            অভিজ্ঞতা।
          </p>
        </div>

        <div className="t5-review-slider">
          {data.reviews.map(
            (review, index) => (
              <article
                key={index}
                className="t5-review-card"
              >
                <div className="t5-review-top">
                  <Stars
                    rating={
                      review.rating
                    }
                  />

                  <span>
                    ✓ Verified
                  </span>
                </div>

                <p>
                  “{review.text}”
                </p>

                <div className="t5-review-user">
                  <div>
                    {review.name
                      .charAt(0)
                      .toUpperCase()}
                  </div>

                  <strong>
                    {review.name}
                  </strong>
                </div>
              </article>
            )
          )}
        </div>
      </section>

      {/* MID CTA */}

      <section className="t5-mid-cta">
        <div>
          <span className="t5-kicker">
            SPECIAL OFFER
          </span>

          <h2>
            আজকের বিশেষ দামে
            <br />
            অর্ডার করুন।
          </h2>
        </div>

        <button
          onClick={() =>
            scrollTo("t5-order")
          }
        >
          অর্ডার করুন →
        </button>
      </section>

      {/* ORDER */}

      <section
        id="t5-order"
        className="t5-order-section"
      >
        <div className="t5-order-heading">
          <span className="t5-kicker">
            ORDER NOW
          </span>

          <h2>
            অর্ডার সম্পন্ন করতে
            তথ্য দিন
          </h2>

          <p>
            কয়েকটি তথ্য দিলেই আপনার
            অর্ডারটি কনফার্ম হয়ে যাবে।
          </p>
        </div>

        <div className="t5-order-layout">
          <form
            className="t5-form"
            onSubmit={submitOrder}
          >
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
                rows="4"
                placeholder="আপনার সম্পূর্ণ ঠিকানা লিখুন"
                required
              />
            </label>

            <div className="t5-form-row">
              <label>
                Quantity
                <select
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Number(
                        e.target.value
                      )
                    )
                  }
                >
                  {[
                    1, 2, 3, 4, 5,
                    6, 7, 8, 9, 10,
                  ].map(
                    (number) => (
                      <option
                        key={number}
                        value={number}
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
                  value={area}
                  onChange={(e) =>
                    setArea(
                      e.target.value
                    )
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

            <div className="t5-payment">
              <h3>
                Payment Method
              </h3>

              <label className="t5-payment-card">
                <input
                  type="radio"
                  name="t5-payment"
                  checked={
                    payment === "cod"
                  }
                  onChange={() =>
                    setPayment("cod")
                  }
                />

                <div>
                  <strong>
                    Cash on Delivery
                  </strong>

                  <span>
                    পণ্য হাতে পেয়ে
                    পেমেন্ট করুন
                  </span>
                </div>
              </label>

              <label className="t5-payment-card">
                <input
                  type="radio"
                  name="t5-payment"
                  checked={
                    payment ===
                    "delivery-advance"
                  }
                  onChange={() =>
                    setPayment(
                      "delivery-advance"
                    )
                  }
                />

                <div>
                  <strong>
                    Delivery Charge Advance
                  </strong>

                  <span>
                    শুধু delivery charge
                    advance করুন
                  </span>
                </div>
              </label>

              <label className="t5-payment-card">
                <input
                  type="radio"
                  name="t5-payment"
                  checked={
                    payment ===
                    "full-advance"
                  }
                  onChange={() =>
                    setPayment(
                      "full-advance"
                    )
                  }
                />

                <div>
                  <strong>
                    Full Payment Advance
                  </strong>

                  <span>
                    সম্পূর্ণ টাকা
                    advance করুন
                  </span>
                </div>
              </label>
            </div>

            {payment !== "cod" && (
              <div className="t5-advance">
                <h3>
                  Send Money
                </h3>

                <p>
                  নিচের যেকোনো নম্বরে
                  Send Money করুন এবং
                  Transaction ID দিন।
                </p>

                {[
                  [
                    "bKash",
                    data.payment.bkash,
                    "bkash",
                  ],
                  [
                    "Nagad",
                    data.payment.nagad,
                    "nagad",
                  ],
                  [
                    "Rocket",
                    data.payment.rocket,
                    "rocket",
                  ],
                ].map(
                  (item) => (
                    <div
                      className="t5-number"
                      key={item[2]}
                    >
                      <span>
                        {item[0]}
                      </span>

                      <strong>
                        {item[1]}
                      </strong>

                      <button
                        type="button"
                        onClick={() =>
                          copyNumber(
                            item[1],
                            item[2]
                          )
                        }
                      >
                        {copied ===
                        item[2]
                          ? "Copied"
                          : "Copy"}
                      </button>
                    </div>
                  )
                )}

                <label>
                  Transaction ID
                  <input
                    type="text"
                    value={
                      transactionId
                    }
                    onChange={(e) =>
                      setTransactionId(
                        e.target.value
                      )
                    }
                    placeholder="Transaction ID"
                    required
                  />
                </label>
              </div>
            )}

            <button
              type="submit"
              className="t5-confirm"
            >
              অর্ডার কনফার্ম করুন
              <span>→</span>
            </button>
          </form>

          <aside className="t5-summary">
            <div className="t5-summary-top">
              <span className="t5-kicker">
                YOUR ORDER
              </span>
            </div>

            <div className="t5-summary-product">
              <img
                src={data.images[0]}
                alt={data.title}
              />

              <div>
                <strong>
                  {data.title}
                </strong>

                <span>
                  Qty: {quantity}
                </span>
              </div>
            </div>

            <div className="t5-summary-row">
              <span>
                Product Price
              </span>

              <strong>
                ৳{productTotal}
              </strong>
            </div>

            <div className="t5-summary-row">
              <span>
                Delivery Charge
              </span>

              <strong>
                ৳{delivery}
              </strong>
            </div>

            <div className="t5-final">
              <span>
                TOTAL
              </span>

              <strong>
                ৳{total}
              </strong>
            </div>

            <div className="t5-safe">
              <span>✓</span>

              <p>
                আপনার তথ্য নিরাপদে
                সংরক্ষণ করা হবে।
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

const styles = `
.template5-page {
  --t5-primary: #2563eb;
  --t5-primary-dark: #1746a2;
  --t5-bg: #f5f7fb;
  --t5-white: #ffffff;
  --t5-text: #111827;
  --t5-muted: #6b7280;
  --t5-border: #e5e7eb;
  --t5-green: #16a34a;

  min-height: 100vh;
  background: var(--t5-bg);
  color: var(--t5-text);
  font-family: Inter, Arial, sans-serif;
}

.template5-page * {
  box-sizing: border-box;
}

.t5-header {
  height: 70px;
  background: white;
  border-bottom: 1px solid var(--t5-border);
  display: flex;
  justify-content: center;
  align-items: center;
}

.t5-header img {
  max-width: 150px;
  max-height: 45px;
  object-fit: contain;
}

.t5-header strong {
  font-size: 21px;
  font-weight: 900;
}

.t5-hero {
  width: min(1160px, calc(100% - 40px));
  margin: auto;
  padding: 45px 0 70px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 55px;
  align-items: center;
}

.t5-main-image {
  position: relative;
  aspect-ratio: 1;
  background: white;
  border-radius: 18px;
  overflow: hidden;
}

.t5-main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.t5-sale-tag {
  position: absolute;
  z-index: 2;
  top: 16px;
  left: 16px;
  padding: 8px 12px;
  background: var(--t5-primary);
  color: white;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 900;
}

.t5-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: white;
  box-shadow: 0 5px 20px rgba(0,0,0,.12);
  font-size: 28px;
  cursor: pointer;
}

.t5-arrow.left {
  left: 15px;
}

.t5-arrow.right {
  right: 15px;
}

.t5-thumbnails {
  display: flex;
  gap: 9px;
  margin-top: 10px;
  overflow-x: auto;
}

.t5-thumb {
  flex: 0 0 65px;
  width: 65px;
  height: 65px;
  padding: 3px;
  border: 1px solid var(--t5-border);
  background: white;
  border-radius: 8px;
  cursor: pointer;
}

.t5-thumb.active {
  border: 2px solid var(--t5-primary);
}

.t5-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.t5-review-link {
  display: flex;
  gap: 10px;
  align-items: center;
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--t5-muted);
  cursor: pointer;
}

.t5-stars {
  color: #f59e0b;
  letter-spacing: 2px;
}

.t5-product h1 {
  margin: 18px 0 10px;
  font-size: clamp(38px, 5vw, 60px);
  line-height: 1;
  letter-spacing: -.05em;
}

.t5-subtitle {
  color: var(--t5-muted);
  line-height: 1.7;
  font-size: 17px;
}

.t5-price-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin: 22px 0;
}

.t5-price-row strong {
  font-size: 35px;
}

.t5-price-row del {
  color: #9ca3af;
}

.t5-price-row span {
  padding: 6px 10px;
  background: #dbeafe;
  color: var(--t5-primary);
  border-radius: 5px;
  font-size: 11px;
  font-weight: 900;
}

.t5-stock {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  font-size: 12px;
  margin-bottom: 12px;
}

.t5-stock-dot {
  width: 8px;
  height: 8px;
  background: var(--t5-green);
  border-radius: 50%;
}

.t5-stock span:last-child {
  color: var(--t5-muted);
}

.t5-countdown {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 13px 15px;
  margin-bottom: 12px;
  border-radius: 8px;
  background: #eff6ff;
  color: var(--t5-primary);
}

.t5-countdown span {
  font-size: 10px;
  font-weight: 900;
}

.t5-countdown strong {
  font-size: 18px;
}

.t5-order-button {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  border: 0;
  border-radius: 8px;
  background: var(--t5-primary);
  color: white;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
}

.t5-order-button:hover,
.t5-confirm:hover {
  background: var(--t5-primary-dark);
}

.t5-order-button span,
.t5-confirm span {
  font-size: 22px;
}

.t5-assurance {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
  color: var(--t5-muted);
  font-size: 11px;
}

.t5-assurance div {
  display: flex;
  align-items: center;
  gap: 5px;
}

.t5-assurance b {
  color: var(--t5-green);
}

.t5-kicker {
  color: var(--t5-primary);
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .14em;
}

.t5-about {
  width: min(1100px, calc(100% - 40px));
  margin: auto;
  padding: 75px 0;
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 70px;
}

.t5-about-title h2 {
  margin: 12px 0 0;
  font-size: clamp(30px, 4vw, 48px);
  line-height: 1.05;
  letter-spacing: -.04em;
}

.t5-about-content p {
  margin: 0 0 28px;
  color: var(--t5-muted);
  line-height: 1.9;
  font-size: 16px;
}

.t5-feature-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.t5-feature {
  padding: 17px;
  background: white;
  border: 1px solid var(--t5-border);
  border-radius: 8px;
  display: flex;
  gap: 9px;
  align-items: center;
}

.t5-feature span {
  color: var(--t5-green);
  font-weight: 900;
}

.t5-feature strong {
  font-size: 13px;
}

.t5-reviews {
  padding: 75px 0;
  background: white;
}

.t5-review-head {
  width: min(1100px, calc(100% - 40px));
  margin: auto;
  text-align: center;
}

.t5-review-head h2 {
  margin: 10px 0;
  font-size: clamp(31px, 4vw, 48px);
  letter-spacing: -.04em;
}

.t5-review-head p {
  color: var(--t5-muted);
}

.t5-review-slider {
  width: min(1100px, calc(100% - 40px));
  margin: 40px auto 0;
  display: flex;
  gap: 16px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 15px;
}

.t5-review-card {
  flex: 0 0 min(340px, 85vw);
  padding: 24px;
  border: 1px solid var(--t5-border);
  border-radius: 12px;
  scroll-snap-align: start;
}

.t5-review-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.t5-review-top > span {
  color: var(--t5-green);
  font-size: 10px;
  font-weight: 900;
}

.t5-review-card > p {
  min-height: 95px;
  color: var(--t5-muted);
  line-height: 1.7;
}

.t5-review-user {
  display: flex;
  align-items: center;
  gap: 10px;
}

.t5-review-user > div {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #dbeafe;
  color: var(--t5-primary);
  font-weight: 900;
}

.t5-mid-cta {
  width: min(1100px, calc(100% - 40px));
  margin: 65px auto;
  padding: 45px;
  border-radius: 16px;
  background: var(--t5-primary);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

.t5-mid-cta .t5-kicker {
  color: #bfdbfe;
}

.t5-mid-cta h2 {
  margin: 10px 0 0;
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1;
}

.t5-mid-cta button {
  padding: 15px 25px;
  border: 0;
  border-radius: 7px;
  background: white;
  color: var(--t5-primary);
  font-weight: 900;
  cursor: pointer;
}

.t5-order-section {
  padding: 75px 20px;
  background: #eef2f7;
}

.t5-order-heading {
  text-align: center;
  margin-bottom: 40px;
}

.t5-order-heading h2 {
  margin: 10px 0;
  font-size: clamp(32px, 4vw, 50px);
  letter-spacing: -.04em;
}

.t5-order-heading p {
  color: var(--t5-muted);
}

.t5-order-layout {
  width: min(1050px, 100%);
  margin: auto;
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 25px;
  align-items: start;
}

.t5-form {
  padding: 30px;
  background: white;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.t5-form label {
  display: flex;
  flex-direction: column;
  gap: 7px;
  font-size: 13px;
  font-weight: 800;
}

.t5-form input,
.t5-form textarea,
.t5-form select {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--t5-border);
  border-radius: 7px;
  background: white;
  outline: none;
  font: inherit;
}

.t5-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.t5-payment {
  margin-top: 8px;
}

.t5-payment h3 {
  margin-bottom: 10px;
}

.t5-payment-card {
  flex-direction: row !important;
  align-items: center;
  gap: 11px;
  padding: 13px;
  margin-bottom: 8px;
  border: 1px solid var(--t5-border);
  border-radius: 8px;
  cursor: pointer;
}

.t5-payment-card input {
  width: auto;
}

.t5-payment-card div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.t5-payment-card span {
  color: var(--t5-muted);
  font-size: 11px;
  font-weight: 400;
}

.t5-advance {
  padding: 18px;
  background: #eff6ff;
  border-radius: 8px;
}

.t5-advance h3 {
  margin-top: 0;
}

.t5-advance p {
  color: var(--t5-muted);
  font-size: 12px;
}

.t5-number {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 9px;
  align-items: center;
  padding: 8px 0;
}

.t5-number button {
  padding: 7px 10px;
  border: 1px solid var(--t5-border);
  border-radius: 5px;
  background: white;
  cursor: pointer;
}

.t5-confirm {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 17px;
  border: 0;
  border-radius: 8px;
  background: var(--t5-primary);
  color: white;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
}

.t5-summary {
  padding: 25px;
  background: white;
  border-radius: 12px;
  position: sticky;
  top: 20px;
}

.t5-summary-product {
  display: flex;
  gap: 13px;
  align-items: center;
  margin: 18px 0;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--t5-border);
}

.t5-summary-product img {
  width: 75px;
  height: 75px;
  border-radius: 8px;
  object-fit: contain;
  background: #f5f5f5;
}

.t5-summary-product div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.t5-summary-product span {
  color: var(--t5-muted);
  font-size: 12px;
}

.t5-summary-row {
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
  font-size: 13px;
}

.t5-final {
  display: flex;
  justify-content: space-between;
  padding: 17px 0;
  margin-top: 8px;
  border-top: 1px solid var(--t5-border);
  font-size: 20px;
}

.t5-safe {
  margin-top: 15px;
  padding: 12px;
  background: #f0fdf4;
  border-radius: 7px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.t5-safe span {
  color: var(--t5-green);
  font-weight: 900;
}

.t5-safe p {
  margin: 0;
  color: var(--t5-muted);
  font-size: 11px;
}

.t5-thank-you {
  min-height: calc(100vh - 70px);
  padding: 60px 20px;
  display: flex;
  justify-content: center;
}

.t5-thank-card {
  width: min(620px, 100%);
  height: fit-content;
  padding: 40px;
  background: white;
  border-radius: 14px;
  text-align: center;
}

.t5-success {
  width: 65px;
  height: 65px;
  margin: auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #dcfce7;
  color: var(--t5-green);
  font-size: 30px;
  font-weight: 900;
}

.t5-thank-card h1 {
  font-size: 31px;
  line-height: 1.2;
}

.t5-thank-card > p {
  color: var(--t5-muted);
  line-height: 1.7;
}

.t5-order-info {
  margin: 25px 0;
  border: 1px solid var(--t5-border);
  text-align: left;
}

.t5-order-info div {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 13px;
  border-bottom: 1px solid var(--t5-border);
  font-size: 13px;
}

.t5-order-info div:last-child {
  border-bottom: 0;
}

.t5-order-info span {
  color: var(--t5-muted);
}

.t5-total {
  background: #f5f7fb;
  font-size: 18px !important;
}

.t5-back-button {
  padding: 13px 24px;
  border: 1px solid var(--t5-border);
  border-radius: 7px;
  background: white;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 850px) {
  .t5-hero {
    grid-template-columns: 1fr;
  }

  .t5-product {
    max-width: 650px;
  }

  .t5-about {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .t5-order-layout {
    grid-template-columns: 1fr;
  }

  .t5-summary {
    position: static;
    order: -1;
  }
}

@media (max-width: 560px) {
  .t5-hero,
  .t5-about {
    width: calc(100% - 24px);
  }

  .t5-hero {
    padding-top: 25px;
  }

  .t5-feature-list,
  .t5-form-row {
    grid-template-columns: 1fr;
  }

  .t5-mid-cta {
    width: calc(100% - 24px);
    padding: 30px 22px;
    flex-direction: column;
    align-items: flex-start;
  }

  .t5-form {
    padding: 20px;
  }

  .t5-number {
    grid-template-columns: 55px 1fr;
  }

  .t5-number button {
    grid-column: 2;
    justify-self: start;
  }

  .t5-thank-card {
    padding: 25px 18px;
  }
}
`;
