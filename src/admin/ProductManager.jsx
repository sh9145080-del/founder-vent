import React, { useState } from "react";

export default function ProductManager() {
  const [product, setProduct] = useState({
    brand: "YOUR BRAND",
    title: "Your Product Name",
    description:
      "এখানে আপনার প্রোডাক্টের description লিখুন।",
    price: 1290,
    oldPrice: 1690,
    discount: 24,
    images: [
      "https://placehold.co/600x600?text=Product+1",
      "https://placehold.co/600x600?text=Product+2",
    ],
    features: [
      "Premium Quality",
      "Modern Design",
      "Easy to Use",
    ],
  });

  const [newFeature, setNewFeature] =
    useState("");

  const updateProduct = (field, value) => {
    setProduct((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;

    setProduct((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        newFeature.trim(),
      ],
    }));

    setNewFeature("");
  };

  const removeFeature = (index) => {
    setProduct((prev) => ({
      ...prev,
      features: prev.features.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const saveProduct = () => {
    console.log("Product saved:", product);
    alert("Product information saved successfully!");
  };

  return (
    <div className="product-manager">
      <style>{styles}</style>

      <div className="pm-header">
        <div>
          <span className="pm-kicker">
            PRODUCT MANAGEMENT
          </span>

          <h2>Product Information</h2>

          <p>
            আপনার landing page-এর
            product information এখান থেকে
            নিয়ন্ত্রণ করুন।
          </p>
        </div>

        <button
          className="pm-save"
          onClick={saveProduct}
        >
          ✓ Save Changes
        </button>
      </div>

      <div className="pm-layout">

        {/* LEFT SIDE */}

        <div className="pm-main">

          {/* BASIC INFORMATION */}

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

            <div className="pm-form-grid">

              <div className="pm-field full">
                <label>
                  Brand Name
                </label>

                <input
                  value={product.brand}
                  onChange={(e) =>
                    updateProduct(
                      "brand",
                      e.target.value
                    )
                  }
                  placeholder="Your Brand"
                />
              </div>

              <div className="pm-field full">
                <label>
                  Product Title
                </label>

                <input
                  value={product.title}
                  onChange={(e) =>
                    updateProduct(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Product name"
                />
              </div>

              <div className="pm-field full">
                <label>
                  Product Description
                </label>

                <textarea
                  value={product.description}
                  onChange={(e) =>
                    updateProduct(
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
                  Product Pricing
                </h3>
              </div>
            </div>

            <div className="pm-form-grid">

              <div className="pm-field">
                <label>
                  Current Price (৳)
                </label>

                <input
                  type="number"
                  value={product.price}
                  onChange={(e) =>
                    updateProduct(
                      "price",
                      Number(e.target.value)
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
                  value={product.oldPrice}
                  onChange={(e) =>
                    updateProduct(
                      "oldPrice",
                      Number(e.target.value)
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
                  value={product.discount}
                  onChange={(e) =>
                    updateProduct(
                      "discount",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

            </div>

            <div className="pm-price-preview">
              <span>
                Customer sees:
              </span>

              <strong>
                ৳{product.price}
              </strong>

              <del>
                ৳{product.oldPrice}
              </del>

              <b>
                {product.discount}% OFF
              </b>
            </div>

          </section>

          {/* FEATURES */}

          <section className="pm-card">

            <div className="pm-card-title">
              <div>
                <span>
                  PRODUCT FEATURES
                </span>

                <h3>
                  Features
                </h3>
              </div>
            </div>

            <div className="pm-feature-list">

              {product.features.map(
                (feature, index) => (
                  <div
                    className="pm-feature"
                    key={index}
                  >
                    <span>✓</span>

                    <strong>
                      {feature}
                    </strong>

                    <button
                      onClick={() =>
                        removeFeature(index)
                      }
                    >
                      ×
                    </button>
                  </div>
                )
              )}

            </div>

            <div className="pm-add-feature">

              <input
                value={newFeature}
                onChange={(e) =>
                  setNewFeature(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addFeature();
                  }
                }}
                placeholder="Add a new feature..."
              />

              <button
                onClick={addFeature}
              >
                + Add
              </button>

            </div>

          </section>

        </div>

        {/* RIGHT SIDE */}

        <aside className="pm-side">

          {/* IMAGE MANAGER */}

          <section className="pm-card">

            <div className="pm-card-title">
              <div>
                <span>
                  PRODUCT MEDIA
                </span>

                <h3>
                  Product Images
                </h3>
              </div>
            </div>

            <div className="pm-image-grid">

              {product.images.map(
                (image, index) => (
                  <div
                    className="pm-image-box"
                    key={index}
                  >
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                    />

                    <span>
                      Image {index + 1}
                    </span>
                  </div>
                )
              )}

            </div>

            <button className="pm-upload">
              + Add Product Image
            </button>

            <p className="pm-help">
              Multiple images can be used
              in the landing page slider.
            </p>

          </section>

          {/* LIVE PREVIEW */}

          <section className="pm-card">

            <div className="pm-card-title">
              <div>
                <span>
                  PREVIEW
                </span>

                <h3>
                  Product Preview
                </h3>
              </div>
            </div>

            <div className="pm-preview">

              <div className="pm-preview-image">
                <img
                  src={product.images[0]}
                  alt="Product"
                />
              </div>

              <span className="pm-preview-brand">
                {product.brand}
              </span>

              <h4>
                {product.title}
              </h4>

              <div className="pm-preview-price">
                <strong>
                  ৳{product.price}
                </strong>

                <del>
                  ৳{product.oldPrice}
                </del>

                <span>
                  {product.discount}% OFF
                </span>
              </div>

            </div>

          </section>

        </aside>

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
  margin-bottom: 25px;
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

.pm-save {
  border: 0;
  border-radius: 7px;
  background: #2563eb;
  color: white;
  padding: 11px 16px;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
}

.pm-save:hover {
  background: #1d4ed8;
}

.pm-layout {
  display: grid;
  grid-template-columns: 1.5fr .8fr;
  gap: 18px;
  align-items: start;
}

.pm-main,
.pm-side {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.pm-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  padding: 22px;
}

.pm-card-title {
  margin-bottom: 20px;
}

.pm-card-title span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.pm-card-title h3 {
  margin: 5px 0 0;
  font-size: 17px;
}

.pm-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
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
  color: #374151;
  font-size: 10px;
  font-weight: 800;
}

.pm-field input,
.pm-field textarea,
.pm-add-feature input {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  background: white;
  color: #111827;
  outline: none;
  font-size: 11px;
  font-family: inherit;
  resize: vertical;
}

.pm-field input:focus,
.pm-field textarea:focus,
.pm-add-feature input:focus {
  border-color: #2563eb;
}

.pm-price-preview {
  margin-top: 17px;
  padding: 13px;
  border-radius: 7px;
  background: #f8fafc;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.pm-price-preview span {
  color: #6b7280;
  font-size: 9px;
}

.pm-price-preview strong {
  font-size: 18px;
}

.pm-price-preview del {
  color: #9ca3af;
  font-size: 11px;
}

.pm-price-preview b {
  padding: 4px 7px;
  border-radius: 4px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 8px;
}

.pm-feature-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pm-feature {
  min-height: 40px;
  padding: 8px 10px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 9px;
}

.pm-feature > span {
  width: 22px;
  height: 22px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #dcfce7;
  color: #16a34a;
  font-size: 10px;
  font-weight: 900;
}

.pm-feature strong {
  flex: 1;
  font-size: 10px;
}

.pm-feature button {
  width: 24px;
  height: 24px;
  border: 0;
  border-radius: 5px;
  background: #fef2f2;
  color: #dc2626;
  cursor: pointer;
  font-size: 15px;
}

.pm-add-feature {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.pm-add-feature button {
  flex-shrink: 0;
  padding: 0 14px;
  border: 1px solid #2563eb;
  border-radius: 6px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
}

.pm-image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
}

.pm-image-box {
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 7px;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
}

.pm-image-box img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.pm-image-box span {
  position: absolute;
  left: 7px;
  bottom: 7px;
  padding: 4px 6px;
  border-radius: 4px;
  background: rgba(17, 24, 39, .75);
  color: white;
  font-size: 7px;
  font-weight: 800;
}

.pm-upload {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border: 1px dashed #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
  color: #2563eb;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.pm-help {
  margin: 9px 0 0;
  color: #9ca3af;
  text-align: center;
  font-size: 9px;
  line-height: 1.5;
}

.pm-preview {
  padding: 13px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.pm-preview-image {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 6px;
  background: #f3f4f6;
}

.pm-preview-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pm-preview-brand {
  display: block;
  margin-top: 12px;
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  text-transform: uppercase;
}

.pm-preview h4 {
  margin: 5px 0 9px;
  font-size: 14px;
}

.pm-preview-price {
  display: flex;
  align-items: center;
  gap: 7px;
}

.pm-preview-price strong {
  font-size: 18px;
}

.pm-preview-price del {
  color: #9ca3af;
  font-size: 10px;
}

.pm-preview-price span {
  padding: 4px 6px;
  border-radius: 4px;
  background: #fee2e2;
  color: #dc2626;
  font-size: 7px;
  font-weight: 900;
}

@media (max-width: 850px) {
  .pm-layout {
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

  .pm-form-grid {
    grid-template-columns: 1fr;
  }

  .pm-field.full {
    grid-column: auto;
  }
}
`;
