import React, { useState } from "react";

const initialReviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    rating: 5,
    text: "Product quality অনেক ভালো। Delivery-ও খুব দ্রুত পেয়েছি।",
    image: "",
    verified: true,
    status: "Published",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    rating: 5,
    text: "ছবির মতোই product পেয়েছি। ব্যবহার করে বেশ ভালো লাগছে।",
    image: "",
    verified: true,
    status: "Published",
  },
  {
    id: 3,
    name: "Sakib Hasan",
    rating: 4,
    text: "Overall খুব ভালো experience হয়েছে। আবারও কিনব।",
    image: "",
    verified: false,
    status: "Published",
  },
];

const emptyReview = {
  name: "",
  rating: 5,
  text: "",
  image: "",
  verified: true,
  status: "Published",
};

export default function ReviewManager() {
  const [reviews, setReviews] =
    useState(initialReviews);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState(emptyReview);

  const [saved, setSaved] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const updateForm = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyReview);
    setShowForm(true);
  };

  const openEditForm = (review) => {
    setEditingId(review.id);

    setForm({
      name: review.name,
      rating: review.rating,
      text: review.text,
      image: review.image,
      verified: review.verified,
      status: review.status,
    });

    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyReview);
  };

  const saveReview = () => {
    if (!form.name.trim()) {
      alert("Customer name লিখুন।");
      return;
    }

    if (!form.text.trim()) {
      alert("Review লিখুন।");
      return;
    }

    if (editingId) {
      setReviews((prev) =>
        prev.map((review) =>
          review.id === editingId
            ? {
                ...review,
                ...form,
              }
            : review
        )
      );
    } else {
      const newReview = {
        id: Date.now(),
        ...form,
      };

      setReviews((prev) => [
        newReview,
        ...prev,
      ]);
    }

    setSaved(true);
    setShowForm(false);
    setEditingId(null);
    setForm(emptyReview);

    setTimeout(() => {
      setSaved(false);
    }, 2200);
  };

  const deleteReview = (id) => {
    const confirmed = window.confirm(
      "এই review টি delete করতে চান?"
    );

    if (!confirmed) return;

    setReviews((prev) =>
      prev.filter(
        (review) => review.id !== id
      )
    );
  };

  const toggleStatus = (id) => {
    setReviews((prev) =>
      prev.map((review) =>
        review.id === id
          ? {
              ...review,
              status:
                review.status ===
                "Published"
                  ? "Draft"
                  : "Published",
            }
          : review
      )
    );
  };

  const filteredReviews =
    reviews.filter((review) => {
      const keyword =
        search.toLowerCase().trim();

      if (!keyword) return true;

      return (
        review.name
          .toLowerCase()
          .includes(keyword) ||
        review.text
          .toLowerCase()
          .includes(keyword)
      );
    });

  const totalReviews = reviews.length;

  const publishedReviews =
    reviews.filter(
      (review) =>
        review.status === "Published"
    ).length;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) =>
              sum + Number(review.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="review-manager">
      <style>{styles}</style>

      {/* HEADER */}

      <div className="rm-header">

        <div>
          <span className="rm-kicker">
            CUSTOMER REVIEWS
          </span>

          <h2>
            Review Manager
          </h2>

          <p>
            Landing page-এ customer reviews
            manage করুন।
          </p>
        </div>

        <button
          className="rm-add-button"
          onClick={openAddForm}
        >
          <span>+</span>
          Add Review
        </button>

      </div>

      {/* STATS */}

      <div className="rm-stats">

        <div className="rm-stat-card">

          <div className="rm-stat-icon">
            ☆
          </div>

          <div>
            <span>
              Average Rating
            </span>

            <strong>
              {averageRating}
            </strong>
          </div>

        </div>

        <div className="rm-stat-card">

          <div className="rm-stat-icon">
            #
          </div>

          <div>
            <span>
              Total Reviews
            </span>

            <strong>
              {totalReviews}
            </strong>
          </div>

        </div>

        <div className="rm-stat-card">

          <div className="rm-stat-icon">
            ✓
          </div>

          <div>
            <span>
              Published
            </span>

            <strong>
              {publishedReviews}
            </strong>
          </div>

        </div>

      </div>

      {/* TOOLBAR */}

      <div className="rm-toolbar">

        <div className="rm-search">

          <span>
            ⌕
          </span>

          <input
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search reviews..."
          />

        </div>

        <div className="rm-toolbar-info">
          {filteredReviews.length} reviews
        </div>

      </div>

      {/* REVIEW LIST */}

      <div className="rm-list">

        {filteredReviews.length === 0 ? (
          <div className="rm-empty">

            <div>
              ☆
            </div>

            <h3>
              No reviews found
            </h3>

            <p>
              Search অন্য কিছু দিয়ে চেষ্টা করুন
              অথবা নতুন review যোগ করুন।
            </p>

          </div>
        ) : (
          filteredReviews.map(
            (review) => (
              <div
                className="rm-review-card"
                key={review.id}
              >

                {/* CUSTOMER */}

                <div className="rm-customer">

                  <div className="rm-avatar">

                    {review.image ? (
                      <img
                        src={review.image}
                        alt={review.name}
                      />
                    ) : (
                      review.name
                        .charAt(0)
                        .toUpperCase()
                    )}

                  </div>

                  <div className="rm-customer-info">

                    <strong>
                      {review.name}
                    </strong>

                    <div className="rm-rating">

                      <span>
                        {"★".repeat(
                          Number(
                            review.rating
                          )
                        )}
                      </span>

                      <small>
                        {review.rating}/5
                      </small>

                    </div>

                  </div>

                </div>

                {/* REVIEW */}

                <div className="rm-review-body">

                  <p>
                    "{review.text}"
                  </p>

                  <div className="rm-review-meta">

                    {review.verified && (
                      <span className="rm-verified">
                        ✓ Verified Purchase
                      </span>
                    )}

                    <span
                      className={`rm-status ${
                        review.status ===
                        "Published"
                          ? "published"
                          : "draft"
                      }`}
                    >
                      {review.status}
                    </span>

                  </div>

                </div>

                {/* ACTIONS */}

                <div className="rm-actions">

                  <button
                    onClick={() =>
                      toggleStatus(
                        review.id
                      )
                    }
                    title="Change status"
                  >
                    {review.status ===
                    "Published"
                      ? "Draft"
                      : "Publish"}
                  </button>

                  <button
                    onClick={() =>
                      openEditForm(
                        review
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="danger"
                    onClick={() =>
                      deleteReview(
                        review.id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            )
          )
        )}

      </div>

      {/* FORM MODAL */}

      {showForm && (
        <div className="rm-modal-overlay">

          <div className="rm-modal">

            <div className="rm-modal-header">

              <div>
                <span>
                  {editingId
                    ? "EDIT REVIEW"
                    : "NEW REVIEW"}
                </span>

                <h3>
                  {editingId
                    ? "Edit Customer Review"
                    : "Add Customer Review"}
                </h3>
              </div>

              <button
                className="rm-close"
                onClick={closeForm}
              >
                ×
              </button>

            </div>

            <div className="rm-form">

              {/* NAME */}

              <div className="rm-field">

                <label>
                  Customer Name
                </label>

                <input
                  value={form.name}
                  onChange={(e) =>
                    updateForm(
                      "name",
                      e.target.value
                    )
                  }
                  placeholder="Customer name"
                />

              </div>

              {/* RATING */}

              <div className="rm-field">

                <label>
                  Rating
                </label>

                <select
                  value={form.rating}
                  onChange={(e) =>
                    updateForm(
                      "rating",
                      Number(
                        e.target.value
                      )
                    )
                  }
                >
                  <option value={5}>
                    5 Stars
                  </option>

                  <option value={4}>
                    4 Stars
                  </option>

                  <option value={3}>
                    3 Stars
                  </option>

                  <option value={2}>
                    2 Stars
                  </option>

                  <option value={1}>
                    1 Star
                  </option>
                </select>

              </div>

              {/* REVIEW */}

              <div className="rm-field full">

                <label>
                  Review Text
                </label>

                <textarea
                  rows="5"
                  value={form.text}
                  onChange={(e) =>
                    updateForm(
                      "text",
                      e.target.value
                    )
                  }
                  placeholder="Write customer review..."
                />

              </div>

              {/* IMAGE */}

              <div className="rm-field full">

                <label>
                  Customer Image URL
                  <span>
                    (Optional)
                  </span>
                </label>

                <input
                  value={form.image}
                  onChange={(e) =>
                    updateForm(
                      "image",
                      e.target.value
                    )
                  }
                  placeholder="Paste customer image URL..."
                />

              </div>

              {/* STATUS */}

              <div className="rm-form-options">

                <label className="rm-check">

                  <input
                    type="checkbox"
                    checked={
                      form.verified
                    }
                    onChange={(e) =>
                      updateForm(
                        "verified",
                        e.target.checked
                      )
                    }
                  />

                  <span></span>

                  Verified Purchase

                </label>

                <select
                  value={form.status}
                  onChange={(e) =>
                    updateForm(
                      "status",
                      e.target.value
                    )
                  }
                >
                  <option value="Published">
                    Published
                  </option>

                  <option value="Draft">
                    Draft
                  </option>
                </select>

              </div>

            </div>

            {/* FORM ACTIONS */}

            <div className="rm-modal-footer">

              <button
                className="rm-cancel"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button
                className="rm-save"
                onClick={saveReview}
              >
                {editingId
                  ? "Save Changes"
                  : "Add Review"}
              </button>

            </div>

          </div>

        </div>
      )}

      {/* SAVE MESSAGE */}

      {saved && (
        <div className="rm-toast">
          ✓ Review saved successfully
        </div>
      )}

    </div>
  );
}

const styles = `
.review-manager {
  min-height: 100%;
  padding: 30px;
  background: #f5f7fb;
  color: #111827;
  font-family: Inter, Arial, sans-serif;
}

.review-manager * {
  box-sizing: border-box;
}

.rm-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 22px;
}

.rm-kicker {
  color: #2563eb;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .14em;
}

.rm-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.rm-header p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.rm-add-button {
  padding: 11px 15px;
  display: flex;
  align-items: center;
  gap: 7px;
  border: 0;
  border-radius: 6px;
  background: #111827;
  color: white;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

.rm-add-button span {
  font-size: 15px;
  line-height: 10px;
}

/* STATS */

.rm-stats {
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.rm-stat-card {
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 11px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background: white;
}

.rm-stat-icon {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: #f3f4f6;
  color: #374151;
  font-size: 14px;
  font-weight: 900;
}

.rm-stat-card span {
  display: block;
  color: #9ca3af;
  font-size: 7px;
}

.rm-stat-card strong {
  display: block;
  margin-top: 3px;
  font-size: 17px;
}

/* TOOLBAR */

.rm-toolbar {
  margin-bottom: 12px;
  padding: 11px 13px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.rm-search {
  width: 280px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.rm-search span {
  color: #9ca3af;
  font-size: 14px;
}

.rm-search input {
  width: 100%;
  border: 0;
  outline: 0;
  color: #111827;
  font-size: 9px;
}

.rm-toolbar-info {
  color: #9ca3af;
  font-size: 8px;
}

/* REVIEW CARD */

.rm-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.rm-review-card {
  padding: 16px;
  display: grid;
  grid-template-columns:
    180px 1fr auto;
  align-items: center;
  gap: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background: white;
}

.rm-customer {
  display: flex;
  align-items: center;
  gap: 9px;
}

.rm-avatar {
  width: 39px;
  height: 39px;
  flex: 0 0 39px;
  display: grid;
  place-items: center;
  overflow: hidden;
  border-radius: 50%;
  background: #e5e7eb;
  color: #374151;
  font-size: 12px;
  font-weight: 900;
}

.rm-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rm-customer-info strong {
  display: block;
  font-size: 9px;
}

.rm-rating {
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.rm-rating span {
  color: #f59e0b;
  font-size: 9px;
  letter-spacing: 1px;
}

.rm-rating small {
  color: #9ca3af;
  font-size: 7px;
}

.rm-review-body p {
  margin: 0;
  color: #4b5563;
  font-size: 9px;
  line-height: 1.6;
}

.rm-review-meta {
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.rm-verified {
  color: #16a34a;
  font-size: 7px;
  font-weight: 800;
}

.rm-status {
  padding: 3px 6px;
  border-radius: 4px;
  font-size: 6px;
  font-weight: 900;
}

.rm-status.published {
  background: #dcfce7;
  color: #15803d;
}

.rm-status.draft {
  background: #f3f4f6;
  color: #6b7280;
}

.rm-actions {
  display: flex;
  align-items: center;
  gap: 5px;
}

.rm-actions button {
  padding: 7px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: white;
  color: #4b5563;
  font-size: 7px;
  font-weight: 800;
  cursor: pointer;
}

.rm-actions button:hover {
  background: #f9fafb;
}

.rm-actions button.danger {
  color: #dc2626;
}

.rm-empty {
  padding: 70px 20px;
  text-align: center;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background: white;
}

.rm-empty > div {
  color: #d1d5db;
  font-size: 32px;
}

.rm-empty h3 {
  margin: 10px 0 5px;
  font-size: 14px;
}

.rm-empty p {
  margin: 0;
  color: #9ca3af;
  font-size: 8px;
}

/* MODAL */

.rm-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(17,24,39,.45);
}

.rm-modal {
  width: min(570px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 12px;
  background: white;
  box-shadow: 0 25px 70px rgba(0,0,0,.18);
}

.rm-modal-header {
  padding: 19px 20px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-bottom: 1px solid #eef0f2;
}

.rm-modal-header > div > span {
  color: #2563eb;
  font-size: 7px;
  font-weight: 900;
  letter-spacing: .12em;
}

.rm-modal-header h3 {
  margin: 5px 0 0;
  font-size: 16px;
}

.rm-close {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 17px;
  cursor: pointer;
}

.rm-form {
  padding: 20px;
  display: grid;
  grid-template-columns:
    1fr 1fr;
  gap: 14px;
}

.rm-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.rm-field.full {
  grid-column: 1 / -1;
}

.rm-field label {
  color: #6b7280;
  font-size: 8px;
  font-weight: 800;
}

.rm-field label span {
  margin-left: 4px;
  color: #9ca3af;
  font-weight: 400;
}

.rm-field input,
.rm-field textarea,
.rm-field select,
.rm-form-options select {
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

.rm-field textarea {
  resize: vertical;
}

.rm-field input:focus,
.rm-field textarea:focus,
.rm-field select:focus {
  border-color: #93c5fd;
}

.rm-form-options {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.rm-form-options select {
  width: 130px;
}

.rm-check {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #4b5563;
  font-size: 8px;
  cursor: pointer;
}

.rm-check input {
  display: none;
}

.rm-check span {
  width: 16px;
  height: 16px;
  position: relative;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}

.rm-check input:checked + span {
  border-color: #111827;
  background: #111827;
}

.rm-check input:checked + span:after {
  content: "✓";
  position: absolute;
  left: 3px;
  top: -1px;
  color: white;
  font-size: 11px;
}

.rm-modal-footer {
  padding: 13px 20px;
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  border-top: 1px solid #eef0f2;
}

.rm-cancel,
.rm-save {
  padding: 9px 13px;
  border-radius: 6px;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.rm-cancel {
  border: 1px solid #e5e7eb;
  background: white;
  color: #6b7280;
}

.rm-save {
  border: 0;
  background: #111827;
  color: white;
}

.rm-toast {
  position: fixed;
  right: 25px;
  bottom: 25px;
  z-index: 700;
  padding: 11px 14px;
  border-radius: 7px;
  background: #111827;
  color: white;
  font-size: 8px;
  font-weight: 800;
  box-shadow: 0 10px 35px rgba(0,0,0,.15);
}

@media (max-width: 850px) {
  .rm-review-card {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .rm-actions {
    justify-content: flex-end;
  }
}

@media (max-width: 650px) {
  .review-manager {
    padding: 18px;
  }

  .rm-header {
    align-items: stretch;
    flex-direction: column;
  }

  .rm-stats {
    grid-template-columns: 1fr;
  }

  .rm-form {
    grid-template-columns: 1fr;
  }

  .rm-field.full {
    grid-column: auto;
  }

  .rm-form-options {
    align-items: stretch;
    flex-direction: column;
  }

  .rm-form-options select {
    width: 100%;
  }

  .rm-search {
    width: 100%;
  }

  .rm-toolbar {
    align-items: stretch;
    flex-direction: column;
  }
}
`;
