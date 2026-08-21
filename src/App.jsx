import React, { useState } from "react";

import AdminPanel from "./admin/Admin Panel.jsx";
import ClientManager from "./admin/ClientManager.jsx";
import ClientAdminLayout from "./admin/ClientAdminLayout.jsx";

function App() {
  const [screen, setScreen] = useState("admin-login");

  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [clientLoggedIn, setClientLoggedIn] = useState(false);

  // MAIN ADMIN LOGIN
  if (screen === "admin-login") {
    return (
      <AdminLogin
        onLogin={() => {
          setAdminLoggedIn(true);
          setScreen("admin");
        }}
        onClientLogin={() => {
          setScreen("client-login");
        }}
      />
    );
  }

  // CLIENT LOGIN
  if (screen === "client-login") {
    return (
      <ClientLogin
        onLogin={() => {
          setClientLoggedIn(true);
          setScreen("client");
        }}
        onBack={() => {
          setScreen("admin-login");
        }}
      />
    );
  }

  // CLIENT ADMIN
  if (screen === "client" && clientLoggedIn) {
    return (
      <ClientAdminLayout
        onLogout={() => {
          setClientLoggedIn(false);
          setScreen("admin-login");
        }}
      />
    );
  }

  // MAIN ADMIN
  if (screen === "admin" && adminLoggedIn) {
    return (
      <MainAdmin
        onLogout={() => {
          setAdminLoggedIn(false);
          setScreen("admin-login");
        }}
      />
    );
  }

  return null;
}


// ==========================================
// MAIN ADMIN CONTROLLER
// ==========================================

function MainAdmin({ onLogout }) {
  const [page, setPage] = useState("dashboard");

  // MAIN DASHBOARD
  if (page === "dashboard") {
    return (
      <AdminPanel
        onNavigate={setPage}
        onLogout={onLogout}
      />
    );
  }

  // CLIENT MANAGER
  if (page === "clients") {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f7fb",
        }}
      >
        <AdminTopBar
          currentPage="Clients"
          onDashboard={() => setPage("dashboard")}
          onLogout={onLogout}
        />

        <ClientManager />
      </div>
    );
  }

  // FUTURE ADMIN PAGES
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 40,
        background: "#f5f7fb",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <button
        onClick={() => setPage("dashboard")}
        style={{
          padding: "10px 14px",
          border: 0,
          borderRadius: 7,
          background: "#111827",
          color: "#fff",
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        ← Back to Dashboard
      </button>

      <h2 style={{ marginTop: 30 }}>
        {page}
      </h2>

      <p style={{ color: "#6b7280" }}>
        This section will be connected in the next step.
      </p>
    </div>
  );
}


// ==========================================
// ADMIN TOP BAR
// ==========================================

function AdminTopBar({
  currentPage,
  onDashboard,
  onLogout,
}) {
  return (
    <div
      style={{
        height: 54,
        padding: "0 22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <strong style={{ fontSize: 13 }}>
          Main Admin
        </strong>

        <span
          style={{
            color: "#9ca3af",
            fontSize: 8,
          }}
        >
          /
        </span>

        <span
          style={{
            color: "#6b7280",
            fontSize: 8,
          }}
        >
          {currentPage}
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: 7,
        }}
      >
        <button
          onClick={onDashboard}
          style={{
            padding: "7px 10px",
            border: "1px solid #e5e7eb",
            borderRadius: 5,
            background: "#fff",
            color: "#374151",
            fontSize: 7,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Dashboard
        </button>

        <button
          onClick={onLogout}
          style={{
            padding: "7px 10px",
            border: 0,
            borderRadius: 5,
            background: "#111827",
            color: "#fff",
            fontSize: 7,
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}


// ==========================================
// MAIN ADMIN LOGIN
// ==========================================

function AdminLogin({
  onLogin,
  onClientLogin,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <LoginLayout
      title="Main Admin"
      subtitle="Manage your entire landing page platform."
    >
      <form onSubmit={handleSubmit}>

        <LoginField
          label="Email"
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={setEmail}
        />

        <LoginField
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={setPassword}
        />

        <button
          type="submit"
          style={loginButtonStyle}
        >
          Login as Main Admin
        </button>

        <button
          type="button"
          onClick={onClientLogin}
          style={secondaryLoginButtonStyle}
        >
          Client Login
        </button>

      </form>
    </LoginLayout>
  );
}


// ==========================================
// CLIENT LOGIN
// ==========================================

function ClientLogin({
  onLogin,
  onBack,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <LoginLayout
      title="Client Login"
      subtitle="Access your account and submit edit requests."
    >
      <form onSubmit={handleSubmit}>

        <LoginField
          label="Email"
          type="email"
          placeholder="client@example.com"
          value={email}
          onChange={setEmail}
        />

        <LoginField
          label="Password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={setPassword}
        />

        <button
          type="submit"
          style={loginButtonStyle}
        >
          Login
        </button>

        <button
          type="button"
          onClick={onBack}
          style={secondaryLoginButtonStyle}
        >
          ← Back to Main Login
        </button>

      </form>
    </LoginLayout>
  );
}


// ==========================================
// LOGIN LAYOUT
// ==========================================

function LoginLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        background:
          "linear-gradient(135deg,#f8fafc,#eef2ff)",
        fontFamily: "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          padding: 28,
          border: "1px solid #e5e7eb",
          borderRadius: 14,
          background: "#fff",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.08)",
        }}
      >

        <div
          style={{
            width: 42,
            height: 42,
            marginBottom: 18,
            display: "grid",
            placeItems: "center",
            borderRadius: 10,
            background: "#111827",
            color: "#fff",
            fontWeight: 900,
            fontSize: 14,
          }}
        >
          LP
        </div>

        <h1
          style={{
            margin: "0 0 7px",
            fontSize: 22,
            letterSpacing: "-.04em",
          }}
        >
          {title}
        </h1>

        <p
          style={{
            margin: "0 0 22px",
            color: "#6b7280",
            fontSize: 9,
            lineHeight: 1.5,
          }}
        >
          {subtitle}
        </p>

        {children}

      </div>
    </div>
  );
}


// ==========================================
// LOGIN FIELD
// ==========================================

function LoginField({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div style={{ marginBottom: 13 }}>

      <label
        style={{
          display: "block",
          marginBottom: 6,
          color: "#374151",
          fontSize: 8,
          fontWeight: 800,
        }}
      >
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        style={{
          width: "100%",
          height: 38,
          padding: "0 10px",
          border: "1px solid #e5e7eb",
          borderRadius: 6,
          outline: "none",
          fontSize: 9,
        }}
      />

    </div>
  );
}


// ==========================================
// BUTTON STYLES
// ==========================================

const loginButtonStyle = {
  width: "100%",
  height: 39,
  marginTop: 4,
  border: 0,
  borderRadius: 6,
  background: "#111827",
  color: "#fff",
  fontSize: 8,
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryLoginButtonStyle = {
  width: "100%",
  height: 38,
  marginTop: 8,
  border: "1px solid #e5e7eb",
  borderRadius: 6,
  background: "#fff",
  color: "#374151",
  fontSize: 8,
  fontWeight: 800,
  cursor: "pointer",
};


export default App;
