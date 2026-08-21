import React, { useState } from "react";

export default function ReviewManager() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: "Sadia",
      rating: 5,
      text: "প্রোডাক্টটা অনেক ভালো লেগেছে। Quality সত্যিই ভালো।",
      date: "21 Aug 2026",
    },
    {
      id: 2,
      name: "Tanvir",
      rating: 5,
      text: "দাম অনুযায়ী খুব ভালো একটি প্রোডাক্ট।",
      date: "20 Aug 2026",
    },
    {
      id: 3,
      name: "Mim",
      rating: 4,
      text: "Delivery দ্রুত পেয়েছি এবং product ভালো ছিল।",
      date: "19 Aug 2026",
    },
  ]);

  const [showForm, setShowForm] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    rating: 5,
    text: "",
  });

  const resetForm = () => {
    setForm({
      name: "",
      rating: 5,
      text: "",
    });

    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addReview = () => {
    if (!form.name.trim() || !form.text.trim()) {
      alert("Name এবং review লিখুন।");
      return;
    }

    const newReview = {
      id: Date.now(),
      name: form.name.trim(),
      rating: Number(form.rating),
      text: form.text.trim(),
      date: new Date().toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      ),
    };

    setReviews((prev) => [
      newReview,
      ...prev,
    ]);

    resetForm();
  };

  const updateReview = () => {
    if (!form.name.trim() || !form.text.trim()) {
      alert("Name এবং review লিখুন।");
      return;
    }

    setReviews((prev) =>
      prev.map((review) =>
        review.id === editingId
          ? {
              ...review,
              name: form.name.trim(),
              rating: Number(form.rating),
              text: form.text.trim(),
            }
          : review
      )
    );

    resetForm();
  };

  const editReview = (review) => {
    setForm({
      name: review.name,
      rating: review.rating,
      text: review.text,
    });

    setEditingId(review.id);
    setShowForm(true);
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
            Review Management
          </h2>

          <p>
            Landing page-এর customer
            reviews এখান থেকে পরিচালনা করুন।
          </p>
        </div>

        <button
          className="rm-add-button"
          onClick={() => {
            setEditingId(null);

            setForm({
              name: "",
              rating: 5,
              text: "",
            });

            setShowForm(true);
          }}
        >
          + Add Review
        </button>
      </div>

      {/* SUMMARY */}

      <div className="rm-summary-grid">

        <div className="rm-summary-card">
          <span>
            TOTAL REVIEWS
          </span>

          <strong>
            {reviews.length}
          </strong>

          <small>
            Customer feedback
          </small>
        </div>

        <div className="rm-summary-card">
          <span>
            AVERAGE RATING
          </span>

          <strong>
            {reviews.length
              ? (
                  reviews.reduce(
                    (sum, review) =>
                      sum + review.rating,
                    0
                  ) / reviews.length
                ).toFixed(1)
              : "0.0"}
          </strong>

          <small>
            ⭐ out of 5
          </small>
        </div>

        <div className="rm-summary-card">
          <span>
            FIVE STAR REVIEWS
          </span>

          <strong>
            {
              reviews.filter(
                (review) =>
                  review.rating === 5
              ).length
            }
          </strong>

          <small>
            Excellent reviews
          </small>
        </div>

      </div>

      {/* FORM */}

      {showForm && (
        <section className="rm-form-card">

          <div className="rm-form-header">
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
              onClick={resetForm}
            >
              ×
            </button>
          </div>

          <div className="rm-form-grid">

            <div className="rm-field">
              <label>
                Customer Name
              </label>

              <input
                value={form.name}
                onChange={(e) =>
                  handleChange(
                    "name",
                    e.target.value
                  )
                }
                placeholder="Customer name"
              />
            </div>

            <div className="rm-field">
              <label>
                Rating
              </label>

              <select
                value={form.rating}
                onChange={(e) =>
                  handleChange(
                    "rating",
                    e.target.value
                  )
                }
              >
                <option value="5">
                  5 Stars
                </option>

                <option value="4">
                  4 Stars
                </option>

                <option value="3">
                  3 Stars
                </option>

                <option value="2">
                  2 Stars
                </option>

                <option value="1">
                  1 Star
                </option>
              </select>
            </div>

            <div className="rm-field full">
              <label>
                Review
              </label>

              <textarea
                value={form.text}
                onChange={(e) =>
                  handleChange(
                    "text",
                    e.target.value
                  )
                }
                rows="5"
                placeholder="Customer review..."
              />
            </div>

          </div>

          <div className="rm-form-actions">

            <button
              className="rm-cancel"
              onClick={resetForm}
            >
              Cancel
            </button>

            <button
              className="rm-save"
              onClick={
                editingId
                  ? updateReview
                  : addReview
              }
            >
              {editingId
                ? "✓ Update Review"
                : "+ Add Review"}
            </button>

          </div>

        </section>
      )}

      {/* REVIEWS */}

      <section className="rm-list-card">

        <div className="rm-list-header">

          <div>
            <span>
              ALL REVIEWS
            </span>

            <h3>
              Customer Feedback
            </h3>
          </div>

          <small>
            {reviews.length} reviews
          </small>

        </div>

        <div className="rm-list">

          {reviews.length === 0 ? (
            <div className="rm-empty">
              <div>
                ★
              </div>

              <h3>
                No reviews yet
              </h3>

              <p>
                প্রথম customer review
                যোগ করুন।
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                className="rm-review"
                key={review.id}
              >

                <div className="rm-avatar">
                  {review.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="rm-review-content">

                  <div className="rm-review-top">

                    <div>
                      <strong>
                        {review.name}
                      </strong>

                      <span>
                        {review.date}
                      </span>
                    </div>

                    <div className="rm-rating">
                      {"★".repeat(
                        review.rating
                      )}

                      <em>
                        {review.rating}.0
                      </em>
                    </div>

                  </div>

                  <p>
                    {review.text}
                  </p>

                </div>

                <div className="rm-actions">

                  <button
                    onClick={() =>
                      editReview(review)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete"
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
            ))
          )}

        </div>

      </section>
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
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 25px;
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
  padding: 11px 16px;
  border: 0;
  border-radius: 7px;
  background: #2563eb;
  color: white;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
}

.rm-summary-grid {
  display: grid;
  grid-template-columns:
    repeat(3, 1fr);
  gap: 14px;
  margin-bottom: 18px;
}

.rm-summary-card {
  padding: 19px;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  background: white;
}

.rm-summary-card span {
  color: #9ca3af;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.rm-summary-card strong {
  display: block;
  margin: 7px 0 3px;
  font-size: 23px;
}

.rm-summary-card small {
  color: #9ca3af;
  font-size: 9px;
}

.rm-form-card,
.rm-list-card {
  margin-bottom: 18px;
  padding: 22px;
  border: 1px solid #e5e7eb;
  border-radius: 11px;
  background: white;
}

.rm-form-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.rm-form-header span,
.rm-list-header span {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .12em;
}

.rm-form-header h3,
.rm-list-header h3 {
  margin: 5px 0 0;
  font-size: 17px;
}

.rm-close {
  width: 30px;
  height: 30px;
  border: 0;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 18px;
  cursor: pointer;
}

.rm-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
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
  color: #374151;
  font-size: 10px;
  font-weight: 800;
}

.rm-field input,
.rm-field select,
.rm-field textarea {
  width: 100%;
  padding: 11px 12px;
  border: 1px solid #dfe3e8;
  border-radius: 6px;
  outline: none;
  background: white;
  color: #111827;
  font-size: 11px;
  font-family: inherit;
}

.rm-field textarea {
  resize: vertical;
}

.rm-field input:focus,
.rm-field select:focus,
.rm-field textarea:focus {
  border-color: #2563eb;
}

.rm-form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 18px;
}

.rm-cancel,
.rm-save {
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 10px;
  font-weight: 900;
  cursor: pointer;
}

.rm-cancel {
  border: 1px solid #d1d5db;
  background: white;
  color: #374151;
}

.rm-save {
  border: 1px solid #2563eb;
  background: #2563eb;
  color: white;
}

.rm-list-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 18px;
}

.rm-list-header small {
  color: #9ca3af;
  font-size: 9px;
}

.rm-list {
  display: flex;
  flex-direction: column;
}

.rm-review {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  gap: 12px;
  align-items: flex-start;
  padding: 17px 0;
  border-top: 1px solid #eef0f2;
}

.rm-avatar {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #eff6ff;
  color: #2563eb;
  font-size: 12px;
  font-weight: 900;
}

.rm-review-top {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.rm-review-top strong {
  display: block;
  font-size: 11px;
}

.rm-review-top span {
  display: block;
  margin-top: 3px;
  color: #9ca3af;
  font-size: 8px;
}

.rm-rating {
  color: #f59e0b;
  white-space: nowrap;
  font-size: 11px;
}

.rm-rating em {
  margin-left: 5px;
  color: #6b7280;
  font-style: normal;
  font-size: 8px;
}

.rm-review-content p {
  margin: 8px 0 0;
  color: #4b5563;
  font-size: 10px;
  line-height: 1.7;
}

.rm-actions {
  display: flex;
  gap: 5px;
}

.rm-actions button {
  padding: 6px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  background: white;
  color: #2563eb;
  font-size: 8px;
  font-weight: 800;
  cursor: pointer;
}

.rm-actions button.delete {
  color: #dc2626;
}

.rm-empty {
  padding: 50px 20px;
  text-align: center;
}

.rm-empty > div {
  width: 50px;
  height: 50px;
  margin: auto;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: #fef3c7;
  color: #d97706;
  font-size: 22px;
}

.rm-empty h3 {
  margin: 12px 0 5px;
  font-size: 15px;
}

.rm-empty p {
  margin: 0;
  color: #9ca3af;
  font-size: 10px;
}

@media (max-width: 700px) {
  .review-manager {
    padding: 18px;
  }

  .rm-header {
    align-items: stretch;
    flex-direction: column;
  }

  .rm-summary-grid {
    grid-template-columns: 1fr;
  }

  .rm-form-grid {
    grid-template-columns: 1fr;
  }

  .rm-field.full {
    grid-column: auto;
  }

  .rm-review {
    grid-template-columns: 38px 1fr;
  }

  .rm-actions {
    grid-column: 2;
  }

  .rm-review-top {
    flex-direction: column;
    gap: 7px;
  }
}
`;
