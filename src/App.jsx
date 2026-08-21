import React, { useState } from "react";

import Template1 from "./templates/Template1";
import Template2 from "./templates/Template2";
import Template3 from "./templates/Template3";
import Template4 from "./templates/Template4";
import Template5 from "./templates/Template5";

const templates = {
  1: Template1,
  2: Template2,
  3: Template3,
  4: Template4,
  5: Template5,
};

function App() {
  const [selectedTemplate, setSelectedTemplate] =
    useState(1);

  const SelectedTemplate =
    templates[selectedTemplate];

  const product = {
    brand: "YOUR BRAND",
    logo: "",
    title: "Your Product Name",
    subtitle: "Your product short description",
    images: [
      "https://placehold.co/1000x1000?text=Product+1",
      "https://placehold.co/1000x1000?text=Product+2",
      "https://placehold.co/1000x1000?text=Product+3",
    ],

    price: 1290,
    oldPrice: 1690,
    discount: 24,

    description:
      "এখানে আপনার প্রোডাক্টের সম্পূর্ণ description থাকবে।",

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
        text: "প্রোডাক্টটা অনেক ভালো লেগেছে।",
      },
      {
        name: "Tanvir",
        rating: 5,
        text: "Quality সত্যিই ভালো।",
      },
      {
        name: "Mim",
        rating: 4,
        text: "দাম অনুযায়ী খুব ভালো।",
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

  const handleOrderSubmit = (order) => {
    console.log("New Order:", order);
  };

  return (
    <>
      {/* TEMPORARY TEMPLATE SWITCHER */}
      <div
        style={{
          position: "fixed",
          top: 10,
          left: 10,
          zIndex: 99999,
          display: "flex",
          gap: 5,
          padding: 6,
          background: "#ffffff",
          borderRadius: 8,
          boxShadow: "0 4px 20px rgba(0,0,0,.15)",
        }}
      >
        {Object.keys(templates).map((number) => (
          <button
            key={number}
            onClick={() =>
              setSelectedTemplate(Number(number))
            }
            style={{
              padding: "7px 10px",
              border: "1px solid #ddd",
              borderRadius: 5,
              background:
                selectedTemplate === Number(number)
                  ? "#2563eb"
                  : "#ffffff",
              color:
                selectedTemplate === Number(number)
                  ? "#ffffff"
                  : "#111111",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            T{number}
          </button>
        ))}
      </div>

      <SelectedTemplate
        product={product}
        onOrderSubmit={handleOrderSubmit}
      />
    </>
  );
}

export default App;
