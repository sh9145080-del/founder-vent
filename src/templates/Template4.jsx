import React, { useState } from "react";

const defaultProduct = {
  brand: "YOUR BRAND",
  logo: "",
  title: "Premium Collection",
  subtitle: "Designed for those who appreciate quality.",
  images: [
    "https://placehold.co/1000x1000?text=Product+1",
    "https://placehold.co/1000x1000?text=Product+2",
    "https://placehold.co/1000x1000?text=Product+3",
  ],
  price: 1490,
  oldPrice: 1990,
  discount: 25,
  description:
    "সুন্দর ডিজাইন, উন্নত মান এবং ব্যবহারকারীর প্রয়োজনকে মাথায় রেখে তৈরি একটি প্রিমিয়াম প্রোডাক্ট।",
  features: [
    "Premium Quality",
    "Elegant Design",
    "Long Lasting",
    "Easy to Use",
  ],
  reviews: [
    {
      name: "Nusrat",
      rating: 5,
      text: "প্রোডাক্টের quality সত্যিই অনেক ভালো। দেখতে যেমন সুন্দর, ব্যবহারেও অসাধারণ।",
    },
    {
      name: "Rahim",
      rating: 5,
      text: "ছবির চেয়েও বাস্তবে বেশি সুন্দর পেয়েছি। Delivery-ও দ্রুত ছিল।",
    },
    {
      name: "Mim",
      rating: 4,
      text: "দাম অনুযায়ী product quality অনেক ভালো।",
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
    <span className="t4-stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function Template4({
  product = defaultProduct,
  onOrderSubmit,
}) {
  const data = {
    ...defaultProduct,
    ...product,
  };

  const [imageIndex, setImageIndex] = useState(0);
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
      scrollTo("t4-thank-you");
    }, 100);
  };

  if (submitted) {
    return (
      <div className="template4-page">
        <style>{styles}</style>

        <header className="t4-header">
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
          id="t4-thank-you"
          className="t4-thank"
        >
          <div className="t4-thank-card">
            <div className="t4-success-icon">
              ✓
            </div>

            <span className="t4-eyebrow">
              ORDER CONFIRMED
            </span>

            <h1>
              ধন্যবাদ!
              <br />
              আপনার অর্ডারটি সফল হয়েছে।
            </h1>

            <p>
              আমাদের প্রতিনিধি খুব শীঘ্রই আপনার
              সাথে যোগাযোগ করবে।
            </p>

            <div className="t4-details">
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
                <strong>৳{productTotal}</strong>
              </div>

              <div>
                <span>Delivery Charge</span>
                <strong>৳{delivery}</strong>
              </div>

              <div className="t4-total">
                <span>Total</span>
                <strong>৳{total}</strong>
              </div>
            </div>

            <button
              onClick={() => setSubmitted(false)}
              className="t4-secondary-button"
            >
              আবার অর্ডার করুন
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="template4-page">
      <style>{styles}</style>

      <header className="t4-header">
        {data.logo ? (
          <img
            src={data.logo}
            alt={data.brand}
          />
        ) : (
          <strong>{data.brand}</strong>
        )}
      </header>

      <main>
        {/* HERO */}

        <section className="t4-hero">
          <div className="t4-gallery">
            <div className="t4-main-image">
              <img
                src={data.images[imageIndex]}
                alt={data.title}
              />

              {data.images.length > 1 && (
                <>
                  <button
                    className="t4-gallery-arrow left"
                    onClick={() =>
                      setImageIndex(
                        (imageIndex -
                          1 +
                          data.images.length) %
                          data.images.length
                      )
                    }
                  >
                    ‹
                  </button>

                  <button
                    className="t4-gallery-arrow right"
                    onClick={() =>
                      setImageIndex(
                        (imageIndex + 1) %
                          data.images.length
                      )
                    }
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            <div className="t4-thumbnails">
              {data.images.map(
                (image, index) => (
                  <button
                    key={image + index}
                    onClick={() =>
                      setImageIndex(index)
                    }
                    className={
                      imageIndex === index
                        ? "t4-thumb active"
                        : "t4-thumb"
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

          <div className="t4-product-info">
            <span className="t4-eyebrow">
              EXCLUSIVE COLLECTION
            </span>

            <button
              className="t4-rating"
              onClick={() =>
                scrollTo("t4-reviews")
              }
            >
              <Stars rating={5} />

              <span>
                {data.reviews.length} Reviews
              </span>
            </button>

            <h1>{data.title}</h1>

            <p className="t4-subtitle">
              {data.subtitle}
            </p>

            <div className="t4-line" />

            <div className="t4-price">
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

            <div className="t4-offer">
              <div>
                <small>
                  SPECIAL OFFER
                </small>

                <strong>
                  Limited time price
                </strong>
              </div>

              <div className="t4-clock">
                04 : 59 : 59
              </div>
            </div>

            <button
              className="t4-primary-button"
              onClick={() =>
                scrollTo("t4-order")
              }
            >
              অর্ডার করুন
              <span>→</span>
            </button>

            <div className="t4-trust">
              <div>
                <strong>✓</strong>
                <span>
                  Authentic Product
                </span>
              </div>

              <div>
                <strong>✓</strong>
                <span>
                  Secure Order
                </span>
              </div>

              <div>
                <strong>✓</strong>
                <span>
                  Fast Delivery
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* DESCRIPTION */}

        <section className="t4-description">
          <div className="t4-heading">
            <span className="t4-eyebrow">
              THE DETAILS
            </span>

            <h2>
              Made to impress.
              <br />
              Built to last.
            </h2>
          </div>

          <div>
            <p>{data.description}</p>

            <div className="t4-features">
              {data.features.map(
                (feature, index) => (
                  <div
                    key={index}
                    className="t4-feature"
                  >
                    <span>
                      0{index + 1}
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
          id="t4-reviews"
          className="t4-reviews"
        >
          <div className="t4-review-heading">
            <span className="t4-eyebrow">
              CUSTOMER STORIES
            </span>

            <h2>
              Loved by our customers.
            </h2>

            <p>
              বাস্তব কাস্টমারদের অভিজ্ঞতা।
            </p>
          </div>

          <div className="t4-review-track">
            {data.reviews.map(
              (review, index) => (
                <article
                  key={index}
                  className="t4-review-card"
                >
                  <Stars
                    rating={
                      review.rating
                    }
                  />

                  <p>
                    “{review.text}”
                  </p>

                  <div>
                    <span className="t4-avatar">
                      {review.name
                        .charAt(0)
                        .toUpperCase()}
                    </span>

                    <strong>
                      {review.name}
                    </strong>
                  </div>
                </article>
              )
            )}
          </div>
        </section>

        {/* CTA */}

        <section className="t4-banner">
          <div>
            <span className="t4-eyebrow">
              LIMITED AVAILABILITY
            </span>

            <h2>
              আপনার পছন্দের
              <br />
              product আজই নিন।
            </h2>
          </div>

          <button
            onClick={() =>
              scrollTo("t4-order")
            }
          >
            ORDER NOW →
          </button>
        </section>

        {/* ORDER */}

        <section
          id="t4-order"
          className="t4-order"
        >
          <div className="t4-order-heading">
            <span className="t4-eyebrow">
              COMPLETE YOUR ORDER
            </span>

            <h2>
              অর্ডার করতে তথ্য দিন
            </h2>

            <p>
              আপনার তথ্য নিরাপদে সংরক্ষণ করা
              হবে।
            </p>
          </div>

          <div className="t4-order-layout">
            <form
              className="t4-form"
              onSubmit={submitOrder}
            >
              <label>
                আপনার নাম
                <input
                  type="text"
                  placeholder="নাম লিখুন"
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
                  placeholder="বাসা, রোড, এলাকা, জেলা"
                  required
                />
              </label>

              <div className="t4-grid">
                <label>
                  কত পিস?
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

              <div className="t4-payment">
                <h3>
                  Payment Method
                </h3>

                <label className="t4-payment-item">
                  <input
                    type="radio"
                    name="payment4"
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

                <label className="t4-payment-item">
                  <input
                    type="radio"
                    name="payment4"
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

                <label className="t4-payment-item">
                  <input
                    type="radio"
                    name="payment4"
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
                      সম্পূর্ণ টাকা advance
                      করুন
                    </span>
                  </div>
                </label>
              </div>

              {payment !== "cod" && (
                <div className="t4-advance">
                  <h3>
                    Send Money
                  </h3>

                  <p>
                    নিচের যেকোনো নম্বরে
                    Send Money করুন।
                  </p>

                  {[
                    [
                      "bKash",
                      data.payment
                        .bkash,
                      "bkash",
                    ],
                    [
                      "Nagad",
                      data.payment
                        .nagad,
                      "nagad",
                    ],
                    [
                      "Rocket",
                      data.payment
                        .rocket,
                      "rocket",
                    ],
                  ].map(
                    (item) => (
                      <div
                        className="t4-number"
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
                      placeholder="Transaction ID লিখুন"
                      required
                    />
                  </label>
                </div>
              )}

              <button
                type="submit"
                className="t4-submit"
              >
                অর্ডার কনফার্ম করুন
                <span>→</span>
              </button>
            </form>

            <aside className="t4-summary">
              <span className="t4-eyebrow">
                ORDER SUMMARY
              </span>

              <img
                src={data.images[0]}
                alt={data.title}
              />

              <h3>{data.title}</h3>

              <div>
                <span>
                  Price × {quantity}
                </span>

                <strong>
                  ৳{productTotal}
                </strong>
              </div>

              <div>
                <span>
                  Delivery
                </span>

                <strong>
                  ৳{delivery}
                </strong>
              </div>

              <div className="t4-summary-total">
                <span>
                  TOTAL
                </span>

                <strong>
                  ৳{total}
                </strong>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = `
.template4-page {
  --t4-black: #171717;
  --t4-cream: #f7f3ed;
  --t4-white: #ffffff;
  --t4-gold: #b58b45;
  --t4-text: #222222;
  --t4-muted: #777777;
  --t4-border: #e6e0d7;

  min-height: 100vh;
  background: var(--t4-cream);
  color: var(--t4-text);
  font-family: Georgia, "Times New Roman", serif;
}

.template4-page * {
  box-sizing: border-box;
}

.t4-header {
  height: 78px;
  background: var(--t4-white);
  border-bottom: 1px solid var(--t4-border);
  display: flex;
  justify-content: center;
  align-items: center;
}

.t4-header img {
  max-width: 155px;
  max-height: 48px;
  object-fit: contain;
}

.t4-header strong {
  font-size: 23px;
  letter-spacing: .12em;
}

.t4-hero {
  width: min(1180px, calc(100% - 40px));
  margin: auto;
  padding: 65px 0 90px;
  display: grid;
  grid-template-columns: 1.05fr .95fr;
  gap: 70px;
  align-items: center;
}

.t4-main-image {
  position: relative;
  aspect-ratio: 1 / 1;
  background: var(--t4-white);
  overflow: hidden;
}

.t4-main-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.t4-gallery-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--t4-border);
  background: rgba(255,255,255,.9);
  font-size: 27px;
  cursor: pointer;
}

.t4-gallery-arrow.left {
  left: 15px;
}

.t4-gallery-arrow.right {
  right: 15px;
}

.t4-thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  overflow-x: auto;
}

.t4-thumb {
  flex: 0 0 68px;
  width: 68px;
  height: 68px;
  padding: 3px;
  background: white;
  border: 1px solid var(--t4-border);
  cursor: pointer;
}

.t4-thumb.active {
  border: 2px solid var(--t4-gold);
}

.t4-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.t4-eyebrow {
  color: var(--t4-gold);
  font-family: Arial, sans-serif;
  font-size: 10px;
  font-weight: 900;
  letter-spacing: .18em;
}

.t4-rating {
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 18px 0;
  padding: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--t4-muted);
  font-family: Arial, sans-serif;
}

.t4-stars {
  color: var(--t4-gold);
  letter-spacing: 2px;
}

.t4-product-info h1 {
  margin: 0;
  font-size: clamp(40px, 5vw, 66px);
  line-height: .98;
  font-weight: 500;
  letter-spacing: -.045em;
}

.t4-subtitle {
  color: var(--t4-muted);
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.7;
  max-width: 500px;
}

.t4-line {
  width: 55px;
  height: 1px;
  background: var(--t4-gold);
  margin: 28px 0;
}

.t4-price {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 13px;
}

.t4-price strong {
  font-family: Arial, sans-serif;
  font-size: 34px;
}

.t4-price del {
  color: #999;
  font-family: Arial, sans-serif;
}

.t4-price span {
  padding: 6px 9px;
  background: var(--t4-black);
  color: white;
  font-family: Arial, sans-serif;
  font-size: 10px;
  font-weight: 900;
}

.t4-offer {
  margin: 25px 0 14px;
  padding: 14px;
  background: var(--t4-white);
  border: 1px solid var(--t4-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.t4-offer small {
  display: block;
  color: var(--t4-gold);
  font-family: Arial, sans-serif;
  font-weight: 900;
  font-size: 9px;
}

.t4-offer strong {
  display: block;
  margin-top: 4px;
  font-family: Arial, sans-serif;
  font-size: 13px;
}

.t4-clock {
  font-family: Arial, sans-serif;
  font-weight: 900;
  color: var(--t4-gold);
}

.t4-primary-button {
  width: 100%;
  padding: 18px 20px;
  border: 0;
  background: var(--t4-black);
  color: white;
  display: flex;
  justify-content: space-between;
  font-family: Arial, sans-serif;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.t4-trust {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  margin-top: 18px;
  font-family: Arial, sans-serif;
  font-size: 11px;
  color: var(--t4-muted);
}

.t4-trust div {
  display: flex;
  gap: 6px;
}

.t4-trust strong {
  color: var(--t4-gold);
}

.t4-description {
  background: var(--t4-white);
  padding: 85px max(20px, calc((100vw - 1100px) / 2));
  display: grid;
  grid-template-columns: .8fr 1.2fr;
  gap: 80px;
}

.t4-heading h2 {
  margin: 12px 0 0;
  font-size: clamp(31px, 4vw, 50px);
  font-weight: 500;
  line-height: 1.05;
}

.t4-description > div > p {
  margin: 0 0 35px;
  color: var(--t4-muted);
  font-family: Arial, sans-serif;
  font-size: 16px;
  line-height: 1.9;
}

.t4-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: var(--t4-border);
}

.t4-feature {
  background: white;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.t4-feature span {
  color: var(--t4-gold);
  font-family: Arial, sans-serif;
  font-size: 10px;
  font-weight: 900;
}

.t4-feature strong {
  font-family: Arial, sans-serif;
}

.t4-reviews {
  padding: 85px 20px;
}

.t4-review-heading {
  width: min(1100px, 100%);
  margin: auto;
  text-align: center;
}

.t4-review-heading h2 {
  margin: 12px 0;
  font-size: clamp(35px, 5vw, 55px);
  font-weight: 500;
}

.t4-review-heading p {
  color: var(--t4-muted);
  font-family: Arial, sans-serif;
}

.t4-review-track {
  width: min(1100px, 100%);
  margin: 45px auto 0;
  display: flex;
  gap: 18px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 15px;
}

.t4-review-card {
  flex: 0 0 min(350px, 85vw);
  padding: 28px;
  background: white;
  scroll-snap-align: start;
  border: 1px solid var(--t4-border);
}

.t4-review-card > p {
  min-height: 100px;
  color: var(--t4-muted);
  font-family: Arial, sans-serif;
  line-height: 1.8;
}

.t4-review-card > div {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: Arial, sans-serif;
}

.t4-avatar {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: var(--t4-black);
  color: white;
}

.t4-banner {
  width: min(1100px, calc(100% - 40px));
  margin: 0 auto 80px;
  padding: 50px;
  background: var(--t4-black);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}

.t4-banner h2 {
  margin: 12px 0 0;
  font-size: clamp(32px, 5vw, 55px);
  font-weight: 500;
  line-height: 1;
}

.t4-banner button {
  padding: 16px 25px;
  background: white;
  color: var(--t4-black);
  border: 0;
  font-family: Arial, sans-serif;
  font-weight: 900;
  cursor: pointer;
}

.t4-order {
  background: var(--t4-white);
  padding: 85px 20px;
}

.t4-order-heading {
  text-align: center;
  margin-bottom: 45px;
}

.t4-order-heading h2 {
  margin: 12px 0;
  font-size: clamp(34px, 5vw, 55px);
  font-weight: 500;
}

.t4-order-heading p {
  color: var(--t4-muted);
  font-family: Arial, sans-serif;
}

.t4-order-layout {
  width: min(1050px, 100%);
  margin: auto;
  display: grid;
  grid-template-columns: 1.3fr .7fr;
  gap: 35px;
  align-items: start;
}

.t4-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.t4-form label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: Arial, sans-serif;
  font-size: 13px;
  font-weight: 800;
}

.t4-form input,
.t4-form textarea,
.t4-form select {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--t4-border);
  outline: none;
  background: white;
  font: inherit;
}

.t4-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.t4-payment {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.t4-payment h3 {
  font-family: Arial, sans-serif;
}

.t4-payment-item {
  display: flex !important;
  flex-direction: row !important;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border: 1px solid var(--t4-border);
  cursor: pointer;
}

.t4-payment-item input {
  width: auto;
}

.t4-payment-item div {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.t4-payment-item span {
  color: var(--t4-muted);
  font-size: 11px;
  font-weight: 400;
}

.t4-advance {
  padding: 20px;
  background: var(--t4-cream);
  font-family: Arial, sans-serif;
}

.t4-advance h3 {
  margin-top: 0;
}

.t4-advance p {
  color: var(--t4-muted);
  font-size: 13px;
}

.t4-number {
  display: grid;
  grid-template-columns: 65px 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 9px 0;
}

.t4-number button {
  padding: 8px 11px;
  border: 1px solid var(--t4-border);
  background: white;
  cursor: pointer;
}

.t4-summary {
  padding: 25px;
  background: var(--t4-cream);
  font-family: Arial, sans-serif;
  position: sticky;
  top: 20px;
}

.t4-summary img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  background: white;
  margin: 18px 0;
}

.t4-summary h3 {
  margin: 0 0 18px;
}

.t4-summary > div {
  display: flex;
  justify-content: space-between;
  padding: 9px 0;
}

.t4-summary-total {
  border-top: 1px solid var(--t4-border);
  margin-top: 8px;
  padding-top: 17px !important;
  font-size: 19px;
}

.t4-submit {
  width: 100%;
  padding: 18px;
  background: var(--t4-black);
  color: white;
  border: 0;
  display: flex;
  justify-content: space-between;
  font-family: Arial, sans-serif;
  font-size: 15px;
  font-weight: 900;
  cursor: pointer;
}

.t4-thank {
  min-height: calc(100vh - 78px);
  padding: 60px 20px;
  display: flex;
  justify-content: center;
}

.t4-thank-card {
  width: min(620px, 100%);
  height: fit-content;
  padding: 45px;
  background: white;
  text-align: center;
}

.t4-success-icon {
  width: 65px;
  height: 65px;
  margin: auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #eaf6ed;
  color: #23853d;
  font-family: Arial, sans-serif;
  font-size: 31px;
  font-weight: 900;
}

.t4-thank-card h1 {
  font-size: 34px;
  font-weight: 500;
}

.t4-thank-card > p {
  color: var(--t4-muted);
  font-family: Arial, sans-serif;
  line-height: 1.7;
}

.t4-details {
  margin: 28px 0;
  text-align: left;
  border: 1px solid var(--t4-border);
}

.t4-details div {
  padding: 13px;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid var(--t4-border);
  font-family: Arial, sans-serif;
  font-size: 13px;
}

.t4-details div:last-child {
  border-bottom: 0;
}

.t4-details span {
  color: var(--t4-muted);
}

.t4-total {
  background: var(--t4-cream);
  font-size: 18px !important;
}

.t4-secondary-button {
  padding: 13px 24px;
  border: 1px solid var(--t4-black);
  background: white;
  font-family: Arial, sans-serif;
  font-weight: 800;
  cursor: pointer;
}

@media (max-width: 850px) {
  .t4-hero {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .t4-product-info {
    max-width: 650px;
  }

  .t4-description {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .t4-order-layout {
    grid-template-columns: 1fr;
  }

  .t4-summary {
    position: static;
    order: -1;
  }
}

@media (max-width: 560px) {
  .t4-hero {
    width: calc(100% - 24px);
    padding-top: 35px;
  }

  .t4-description {
    padding: 60px 18px;
  }

  .t4-features {
    grid-template-columns: 1fr;
  }

  .t4-banner {
    width: calc(100% - 24px);
    padding: 30px 22px;
    flex-direction: column;
    align-items: flex-start;
  }

  .t4-grid {
    grid-template-columns: 1fr;
  }

  .t4-number {
    grid-template-columns: 60px 1fr;
  }

  .t4-number button {
    grid-column: 2;
    justify-self: start;
  }

  .t4-thank-card {
    padding: 25px 18px;
  }

  .t4-details div {
    font-size: 12px;
  }
}
`;
