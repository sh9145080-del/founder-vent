export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/login" && request.method === "POST") {
      return handleLogin(request, env);
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

    if (!result) {
      return jsonResponse({ error: "Invalid email or password" }, 401);
    }

    if (result.password_hash !== password) {
      return jsonResponse({ error: "Invalid email or password" }, 401);
    }

    return jsonResponse({
      success: true,
      client: {
        client_id: result.client_id,
        client_name: result.client_name,
        email: result.email
      }
    });
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
