import React, { useState } from "react";

export default function TemplateManager() {
  const [activeTemplate, setActiveTemplate] =
    useState(1);

  const templates = [
    {
      id: 1,
      name: "Classic Store",
      description:
        "Clean product-focused layout with reviews, offer and order form.",
    },
    {
      id: 2,
      name: "Modern Shop",
      description:
        "Modern visual layout for premium products and brands.",
    },
    {
      id: 3,
      name: "Premium Product",
      description:
        "Elegant product presentation with strong conversion focus.",
    },
    {
      id: 4,
      name: "Minimal Store",
      description:
        "Simple, clean and distraction-free shopping experience.",
    },
    {
      id: 5,
      name: "Modern Commerce",
      description:
        "Professional e-commerce style landing page.",
    },
  ];

  const handleSelect = (id) => {
    setActiveTemplate(id);
  };

  return (
    <div className="template-manager">
      <style>{styles}</style>

      <div className="tm-header">
        <div>
          <span className="tm-kicker">
            LANDING PAGE DESIGN
          </span>

          <h2>Template Manager</h2>

          <p>
            আপনার landing page-এর জন্য
            পছন্দের template নির্বাচন করুন।
          </p>
        </div>

        <div className="tm-active">
          <span>ACTIVE TEMPLATE</span>
          <strong>
            Template {activeTemplate}
          </strong>
        </div>
      </div>

      <div className="tm-grid">
        {templates.map((template) => {
          const isActive =
            activeTemplate === template.id;

          return (
            <div
              key={template.id}
              className={
                isActive
                  ? "tm-card active"
                  : "tm-card"
              }
            >
              <div className="tm-preview">
                <div className="tm-preview-header">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className="tm-preview-body">
                  <div className="tm-preview-image">
                    T{template.id}
                  </div>

                  <div className="tm-preview-lines">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>

                  <div className="tm-preview-button">
                    ORDER
                  </div>
                </div>

                {isActive && (
                  <div className="tm-active-badge">
                    ✓ ACTIVE
                  </div>
                )}
              </div>

              <div className="tm-card-body">
                <div>
                  <span className="tm-number">
                    TEMPLATE {template.id}
                  </span>

                  <h3>{template.name}</h3>

                  <p>
                    {template.description}
                  </p>
                </div>

                <button
                  className={
                    isActive
                      ? "tm-select selected"
                      : "tm-select"
                  }
                  onClick={() =>
                    handleSelect(
                      template.id
                    )
                  }
                >
                  {isActive
                    ? "✓ Active"
                    : "Use This Template"}
                </button>
              </div>
            </div>
          );
        })}

        <div className="tm-add-card">
          <div className="tm-add-icon">
            +
          </div>

          <h3>
            Template 6
          </h3>

          <p>
            ভবিষ্যতে নতুন template
            এখানে যোগ করা যাবে।
          </p>

          <span>
            Coming Soon
          </span>
        </div>
      </div>
    </div>
  );
}

const styles = `
.template-manager {
  padding: 30px;
  background: #f5f7fb;
  min-height: 100%;
  font-family: Inter, Arial, sans-serif;
  color: #111827;
}

.template-manager * {
  box-sizing: border-box;
}

.tm-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 25px;
}

.tm-kicker {
  color: #2563eb;
  font-size: 9px;
  font-weight: 900;
  letter-spacing: .14em;
}

.tm-header h2 {
  margin: 7px 0 5px;
  font-size: 28px;
  letter-spacing: -.04em;
}

.tm-header p {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
}

.tm-active {
  padding: 13px 18px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  min-width: 150px;
}

.tm-active span {
  display: block;
  color: #9ca3af;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .1em;
}

.tm-active strong {
  display: block;
  margin-top: 5px;
  color: #2563eb;
  font-size: 15px;
}

.tm-grid {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.tm-card,
.tm-add-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.tm-card.active {
  border: 2px solid #2563eb;
}

.tm-preview {
  height: 230px;
  padding: 15px;
  background: #e9edf4;
  position: relative;
}

.tm-preview-header {
  height: 25px;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.tm-preview-header span {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #d1d5db;
}

.tm-preview-body {
  width: 80%;
  height: 175px;
  margin: 10px auto 0;
  padding: 13px;
  background: white;
  border-radius: 7px;
  box-shadow:
    0 4px 15px
    rgba(0, 0, 0, .05);
}

.tm-preview-image {
  height: 82px;
  border-radius: 5px;
  background: #dbeafe;
  color: #2563eb;
  display: grid;
  place-items: center;
  font-size: 24px;
  font-weight: 900;
}

.tm-preview-lines {
  margin-top: 9px;
}

.tm-preview-lines i {
  display: block;
  height: 5px;
  margin-bottom: 5px;
  background: #e5e7eb;
  border-radius: 5px;
}

.tm-preview-lines i:first-child {
  width: 70%;
}

.tm-preview-lines i:nth-child(2) {
  width: 90%;
}

.tm-preview-lines i:nth-child(3) {
  width: 50%;
}

.tm-preview-button {
  width: 70%;
  margin: 10px auto 0;
  padding: 5px;
  background: #2563eb;
  color: white;
  border-radius: 4px;
  text-align: center;
  font-size: 7px;
  font-weight: 900;
}

.tm-active-badge {
  position: absolute;
  top: 13px;
  right: 13px;
  padding: 6px 9px;
  background: #2563eb;
  color: white;
  border-radius: 5px;
  font-size: 8px;
  font-weight: 900;
}

.tm-card-body {
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 15px;
}

.tm-number {
  color: #2563eb;
  font-size: 8px;
  font-weight: 900;
  letter-spacing: .1em;
}

.tm-card h3 {
  margin: 5px 0;
  font-size: 17px;
}

.tm-card p {
  margin: 0;
  max-width: 390px;
  color: #6b7280;
  font-size: 10px;
  line-height: 1.6;
}

.tm-select {
  flex-shrink: 0;
  padding: 10px 13px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  background: white;
  color: #111827;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.tm-select:hover {
  border-color: #2563eb;
  color: #2563eb;
}

.tm-select.selected {
  border-color: #2563eb;
  background: #eff6ff;
  color: #2563eb;
}

.tm-add-card {
  min-height: 360px;
  border-style: dashed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
}

.tm-add-icon {
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: #eff6ff;
  color: #2563eb;
  font-size: 28px;
}

.tm-add-card h3 {
  margin: 15px 0 5px;
  font-size: 16px;
}

.tm-add-card p {
  max-width: 230px;
  margin: 0;
  color: #9ca3af;
  font-size: 10px;
  line-height: 1.6;
}

.tm-add-card span {
  margin-top: 13px;
  padding: 5px 9px;
  border-radius: 5px;
  background: #f3f4f6;
  color: #9ca3af;
  font-size: 8px;
  font-weight: 900;
}

@media (max-width: 750px) {
  .tm-grid {
    grid-template-columns: 1fr;
  }

  .tm-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .tm-active {
    width: 100%;
  }
}

@media (max-width: 500px) {
  .template-manager {
    padding: 18px;
  }

  .tm-card-body {
    flex-direction: column;
    align-items: stretch;
  }

  .tm-select {
    width: 100%;
  }
}
`;
