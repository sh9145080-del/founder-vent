import React, { useState } from "react";

export default function ProductManager() {
  const [product, setProduct] = useState({
    name: "Premium Product",
    subtitle: "Your product short description",
    price: 1290,
    oldPrice: 1590,
    discount: 19,
    stock: 25,
    description:
      "এখানে আপনার প্রোডাক্টের বিস্তারিত description লিখুন।",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80",
    ],
    offerEnabled: true,
    offerHours: 4,
    offerMinutes: 35,
  });

  const [activeImage, setActiveImage] =
    useState(0);

  const [saved, setSaved] =
    useState(false);

  const [imageUrl, setImageUrl] =
    useState("");

  const updateField = (
    field,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSaved(false);
  };

  const addImage = () => {
    const url = imageUrl.trim();

    if (!url) return;

    setProduct((prev) => ({
      ...prev,
      images: [
        ...prev.images,
        url,
      ],
    }));

    setImageUrl("");
    setSaved(false);
  };

  const removeImage = (index) => {
    setProduct((prev) => {
      const newImages =
        prev.images.filter(
          (_, i) => i !== index
        );

      return {
        ...prev,
        images:
          newImages.length > 0
            ? newImages
            : prev.images,
      };
    });

    setActiveImage(0);
    setSaved(false);
  };

  const saveProduct = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <div className="product-manager">
      <style>{styles}</style>

      {/* HEADER */}

      <div className="pm-header">

        <div>
          <span className="pm-kicker">
            PRODUCT MANAGEMENT
          </span>

          <h2>
            Product Settings
          </h2>

          <p>
            Landing page-এ যে product
            information দেখাবে তা এখান
            থেকে manage করুন।
          </p>
        </div>

        <button
          className="pm-save-top"
          onClick={saveProduct}
        >
          {saved
            ? "✓ Saved"
            : "Save Changes"}
        </button>

      </div>

      {/* MAIN GRID */}

      <div className="pm-grid">

        {/* LEFT */}

        <div>

          {/* BASIC INFO */}

          <section className="pm-card">

            <div className="pm-card-title">

              <div>
                <span>
                  BASIC INFORMATION
                </span>

                <h3>
                  Product Details
                </h3>
              </div>

            </div>

            <div className="pm-form">

              <div className="pm-field">

                <label>
                  Product Name
                </label>

                <input
                  value={product.name}
                  onChange={(e) =>
                    updateField(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Product name"
                />

              </div>

              <div className="pm-field">

                <label>
                  Short Description
                </label>

                <input
                  value={
                    product.subtitle
                  }
                  onChange={(e) =>
                    updateField(
                      "subtitle",
                      e.target.value
                    )
                  }
                  placeholder="Short product description"
                />

              </div>

              <div className="pm-field full">

                <label>
                  Product Description
                </label>

                <textarea
                  value={
                    product.description
                  }
                  onChange={(e) =>
                    updateField(
                      "description",
                      e.target.value
                    )
                  }
                  rows="6"
                  placeholder="Write product description..."
                />

              </div>

            </div>

          </section>


          {/* PRICING */}

          <section className="pm-card">

            <div className="pm-card-title">

              <div>
                <span>
                  PRICING
                </span>

                <h3>
                  Price & Discount
                </h3>
              </div>

            </div>

            <div className="pm-pricing-grid">

              <div className="pm-field">

                <label>
                  Current Price (৳)
                </label>

                <input
                  type="number"
                  value={
                    product.price
                  }
                  onChange={(e) =>
                    updateField(
                      "price",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="pm-field">

                <label>
                  Old Price (৳)
                </label>

                <input
                  type="number"
                  value={
                    product.oldPrice
                  }
                  onChange={(e) =>
                    updateField(
                      "oldPrice",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="pm-field">

                <label>
                  Discount (%)
                </label>

                <input
                  type="number"
                  value={
                    product.discount
                  }
                  onChange={(e) =>
                    updateField(
                      "discount",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

              <div className="pm-field">

                <label>
                  Stock Quantity
                </label>

                <input
                  type="number"
                  value={
                    product.stock
                  }
                  onChange={(e) =>
                    updateField(
                      "stock",
                      Number(
                        e.target.value
                      )
                    )
                  }
                />

              </div>

            </div>

          </section>


          {/* OFFER */}

          <section className="pm-card">

            <div className="pm-card-title">

              <div>
                <span>
                  OFFER COUNTDOWN
                </span>

                <h3>
                  Limited Time Offer
                </h3>
              </div>

              <label className="pm-switch">

                <input
                  type="checkbox"
                  checked={
                    product.offerEnabled
                  }
                  onChange={(e) =>
                    updateField(
                      "offerEnabled",
                      e.target.checked
                    )
                  }
                />

                <span></span>

              </label>

            </div>

            {product.offerEnabled && (
              <div className="pm-countdown">

                <div className="pm-field">

                  <label>
                    Hours
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      product.offerHours
                    }
                    onChange={(e) =>
                      updateField(
                        "offerHours",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="pm-count-separator">
                  :
                </div>

                <div className="pm-field">

                  <label>
                    Minutes
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="59"
                    value={
                      product.offerMinutes
                    }
                    onChange={(e) =>
                      updateField(
                        "offerMinutes",
                        Number(
                          e.target.value
                        )
                      )
                    }
                  />

                </div>

                <div className="pm-offer-note">
                  Landing page-এ
                  countdown timer দেখানো হবে।
                </div>

              </div>
            )}

          </section>

        </div>


        {/* RIGHT */}

        <div>

          {/* IMAGE MANAGER */}

          <section className="pm-card">

            <div className="pm-card-title">

              <div>
                <span>
                  PRODUCT IMAGES
                </span>

                <h3>
                  Image Gallery
                </h3>
              </div>

              <small>
                {product.images.length} images
              </small>

            </div>

            {/* MAIN IMAGE */}

            <div className="pm-main-image">

              <img
                src={
                  product.images[
                    activeImage
                  ]
                }
                alt="Product"
              />

              <span className="pm-image-count">
                {activeImage + 1} /{" "}
                {product.images.length}
              </span>

            </div>

            {/* THUMBNAILS */}

            <div className="pm-thumbnails">

              {product.images.map(
                (image, index) => (
                  <div
                    key={index}
                    className={`pm-thumb ${
                      activeImage === index
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      setActiveImage(
                        index
                      )
                    }
                  >

                    <img
                      src={image}
                      alt={`Product ${
                        index + 1
                      }`}
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(
                          index
                        );
                      }}
                    >
                      ×
                    </button>

                  </div>
                )
              )}

            </div>

            {/* ADD IMAGE */}

            <div className="pm-add-image">

              <input
                value={imageUrl}
                onChange={(e) =>
                  setImageUrl(
                    e.target.value
                  )
                }
                placeholder="Paste image URL..."
              />

              <button
                type="button"
                onClick={addImage}
              >
                + Add
              </button>

            </div>

            <p className="pm-image-help">
              একাধিক image ব্যবহার করা যাবে।
              Landing page-এ customer swipe
              করে image দেখতে পারবে।
            </p>

          </section>


          {/* LIVE PREVIEW */}

          <section className="pm-card">

            <div className="pm-card-title">

              <div>
                <span>
                  LIVE PREVIEW
                </span>

                <h3>
                  Product Preview
                </h3>
              </div>

            </div>

            <div className="pm-preview">

              <div className="pm-preview-image">

                <img
                  src={
                    product.images[
                      activeImage
                    ]
                  }
                  alt="Preview"
                />

              </div>

              <div className="pm-preview-content">

                <h4>
                  {product.name}
                </h4>

                <p>
                  {product.subtitle}
                </p>

                <div className="pm-preview-price">

                  <strong>
                    ৳
                    {Number(
                      product.price
                    ).toLocaleString()}
                  </strong>

                  <del>
                    ৳
                    {Number(
                      product.oldPrice
                    ).toLocaleString()}
                  </del>

                  <span>
                    {product.discount}%
                    OFF
                  </span>

                </div>

                {product.offerEnabled && (
                  <div className="pm-mini-countdown">
                    Offer ends in{" "}
                    <strong>
                      {String(
                        product.offerHours
                      ).padStart(2, "0")}
                      :
                      {String(
                        product.offerMinutes
                      ).padStart(2, "0")}
                    </strong>
                  </div>
                )}

              </div>

            </div>

          </section>

        </div>

      </div>

      {/* BOTTOM SAVE */}

      <div className="pm-bottom-bar">

        <div>
          <strong>
            Product changes
          </strong>

          <span>
            Save your changes before leaving this page.
          </span>
        </div>

        <button
          onClick={saveProduct}
        >
          {saved
            ? "✓ Changes Saved"
            : "Save Product"}
        </button>

      </div>

    </div>
  );
}


const styles = `
.product-manager {
  min-height: 100%;
  padding: 30px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.product-manager * {
  box-sizing: border-box;
}

.pm-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.pm-kicker {
  color: #2563eb;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .14em;
}

.pm-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.pm-header p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.pm-save-top,
.pm-bottom-bar button {
  padding: 10px 15px;
  border: 0;
  border-radius: 6px;
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

.pm-grid {
  display: grid;
  grid-template-columns:
    1.25fr .9fr;
  gap: 18px;
}

.pm-card {
  margin-bottom: 18px;
  padding: 20px;
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  background: white;
}

.pm-card-title {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 18px;
}

.pm-card-title span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.pm-card-title h3 {
  margin: 5px 0 0;
  font-size: 16px;
}

.pm-card-title small {
  color: #9ca3af;
  font-size: 8px;
}

.pm-form {
  display: grid;
  grid-template-columns:
    1fr 1fr;
  gap: 13px;
}

.pm-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pm-field.full {
  grid-column: 1 / -1;
}

.pm-field label {
  color: #6b7280;
  font-size: 8px;
  font-weight: 800;
}

.pm-field input,
.pm-field textarea,
.pm-add-image input {
  width: 100%;
  padding: 10px 11px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  outline: none;
  background: white;
  color: #111827;
  font-family: inherit;
  font-size: 9px;
  resize: vertical;
}

.pm-field input:focus,
.pm-field textarea:focus,
.pm-add-image input:focus {
  border-color: #93c5fd;
}

.pm-pricing-grid {
  display: grid;
  grid-template-columns:
    1fr 1fr;
  gap: 13px;
}

/* OFFER */

.pm-switch {
  position: relative;
  width: 35px;
  height: 19px;
  cursor: pointer;
}

.pm-switch input {
  display: none;
}

.pm-switch span {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  background: #d1d5db;
  transition: .2s;
}

.pm-switch span:before {
  content: "";
  position: absolute;
  width: 13px;
  height: 13px;
  left: 3px;
  top: 3px;
  border-radius: 50%;
  background: white;
  transition: .2s;
}

.pm-switch input:checked + span {
  background: #111827;
}

.pm-switch input:checked + span:before {
  transform: translateX(16px);
}

.pm-countdown {
  display: flex;
  align-items: flex-end;
  gap: 10px;
}

.pm-countdown .pm-field {
  width: 90px;
}

.pm-count-separator {
  padding-bottom: 9px;
  color: #9ca3af;
  font-weight: 900;
}

.pm-offer-note {
  flex: 1;
  padding: 9px;
  border-radius: 6px;
  background: #f8fafc;
  color: #6b7280;
  font-size: 8px;
  line-height: 1.5;
}

/* IMAGE */

.pm-main-image {
  height: 280px;
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  background: #f3f4f6;
}

.pm-main-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: contain;
}

.pm-image-count {
  position: absolute;
  right: 9px;
  bottom: 9px;
  padding: 5px 7px;
  border-radius: 5px;
  background: rgba(17,24,39,.75);
  color: white;
  font-size: 7px;
}

.pm-thumbnails {
  margin: 10px 0;
  display: flex;
  gap: 7px;
  overflow-x: auto;
}

.pm-thumb {
  width: 54px;
  height: 54px;
  flex: 0 0 54px;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent;
  border-radius: 6px;
  background: #f3f4f6;
  cursor: pointer;
}

.pm-thumb.active {
  border-color: #111827;
}

.pm-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pm-thumb button {
  width: 16px;
  height: 16px;
  position: absolute;
  right: 2px;
  top: 2px;
  display: grid;
  place-items: center;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(17,24,39,.75);
  color: white;
  font-size: 11px;
  line-height: 1;
  cursor: pointer;
}

.pm-add-image {
  display: flex;
  gap: 6px;
}

.pm-add-image input {
  flex: 1;
}

.pm-add-image button {
  padding: 0 11px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  background: white;
  color: #111827;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.pm-image-help {
  margin: 8px 0 0;
  color: #9ca3af;
  font-size: 7px;
  line-height: 1.5;
}

/* PREVIEW */

.pm-preview {
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.pm-preview-image {
  height: 190px;
  background: #f8fafc;
}

.pm-preview-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.pm-preview-content {
  padding: 14px;
}

.pm-preview-content h4 {
  margin: 0;
  font-size: 13px;
}

.pm-preview-content p {
  margin: 5px 0 10px;
  color: #9ca3af;
  font-size: 8px;
}

.pm-preview-price {
  display: flex;
  align-items: center;
  gap: 7px;
}

.pm-preview-price strong {
  font-size: 15px;
}

.pm-preview-price del {
  color: #9ca3af;
  font-size: 8px;
}

.pm-preview-price span {
  padding: 4px 5px;
  border-radius: 4px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 7px;
  font-weight: 900;
}

.pm-mini-countdown {
  margin-top: 10px;
  padding: 7px;
  border-radius: 5px;
  background: #111827;
  color: white;
  text-align: center;
  font-size: 7px;
}

.pm-mini-countdown strong {
  margin-left: 4px;
}

/* BOTTOM */

.pm-bottom-bar {
  position: sticky;
  bottom: 15px;
  z-index: 10;
  padding: 12px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background: rgba(255,255,255,.94);
  box-shadow: 0 8px 30px rgba(17,24,39,.07);
  backdrop-filter: blur(10px);
}

.pm-bottom-bar strong {
  display: block;
  font-size: 9px;
}

.pm-bottom-bar span {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 7px;
}

@media (max-width: 900px) {
  .pm-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .product-manager {
    padding: 18px;
  }

  .pm-header {
    align-items: stretch;
    flex-direction: column;
  }

  .pm-form,
  .pm-pricing-grid {
    grid-template-columns: 1fr;
  }

  .pm-field.full {
    grid-column: auto;
  }

  .pm-countdown {
    align-items: stretch;
    flex-wrap: wrap;
  }

  .pm-countdown .pm-field {
    width: calc(50% - 12px);
  }

  .pm-offer-note {
    width: 100%;
    flex-basis: 100%;
  }

  .pm-bottom-bar {
    align-items: stretch;
    flex-direction: column;
  }
}
`;
