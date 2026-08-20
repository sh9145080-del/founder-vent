export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/login" && request.method === "POST") {
      return handleLogin(request, env);
    }

    if (url.pathname === "/api/clients" && request.method === "POST") {
      return handleCreateClient(request, env);
    }

    if (url.pathname === "/api/clients" && request.method === "GET") {
      return handleGetClients(env);
    }

    return env.ASSETS.fetch(request);
  }
};

async function handleLogin(request, env) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return jsonResponse({ error: "Email and password required" }, 400);
    }
    const result = await env.DB.prepare(
      "SELECT client_id, client_name, email, password_hash FROM clients WHERE email = ?"
    ).bind(email).first();
    if (!result || result.password_hash !== password) {
      return jsonResponse({ error: "Invalid email or password" }, 401);
    }
    return jsonResponse({
      success: true,
      client: { client_id: result.client_id, client_name: result.client_name, email: result.email }
    });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleCreateClient(request, env) {
  try {
    const { client_name, email, password } = await request.json();
    if (!client_name || !email || !password) {
      return jsonResponse({ error: "সব ফিল্ড পূরণ করতে হবে" }, 400);
    }

    const existing = await env.DB.prepare(
      "SELECT client_id FROM clients WHERE email = ?"
    ).bind(email).first();

    if (existing) {
      return jsonResponse({ error: "এই ইমেইল আগে থেকেই আছে" }, 400);
    }

    const client_id = "client_" + Date.now();
    const created_at = new Date().toISOString();

    await env.DB.prepare(
      "INSERT INTO clients (client_id, client_name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)"
    ).bind(client_id, client_name, email, password, created_at).run();

    return jsonResponse({ success: true, client_id });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleGetClients(env) {
  try {
    const result = await env.DB.prepare(
      "SELECT client_id, client_name, email, created_at FROM clients ORDER BY created_at DESC"
    ).all();
    return jsonResponse({ success: true, clients: result.results });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}
