export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/api/login" && request.method === "POST") return handleLogin(request, env);
    if (path === "/api/clients" && request.method === "POST") return handleCreateClient(request, env);
    if (path === "/api/clients" && request.method === "GET") return handleGetClients(env);
    if (path === "/api/pages" && request.method === "POST") return handleCreatePage(request, env);
    if (path === "/api/pages" && request.method === "GET") return handleGetPages(request, env, url);
    if (path.startsWith("/api/page/") && request.method === "GET") {
      const slug = path.replace("/api/page/", "");
      return handleGetPageBySlug(slug, env);
    }
    if (path === "/api/orders" && request.method === "POST") return handleCreateOrder(request, env);
    if (path === "/api/orders" && request.method === "GET") return handleGetOrders(request, env, url);
    if (path === "/api/orders/status" && request.method === "POST") return handleUpdateOrderStatus(request, env);
    if (path === "/api/tracking" && request.method === "POST") return handleSaveTracking(request, env);
    if (path === "/api/tracking" && request.method === "GET") return handleGetTracking(request, env, url);
    if (path === "/api/upload" && request.method === "POST") return handleImageUpload(request, env);
    if (path.startsWith("/images/") && request.method === "GET") return handleGetImage(path, env);
    if (path === "/api/domain" && request.method === "POST") return handleSaveDomain(request, env);

    return env.ASSETS.fetch(request);
  }
};

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function handleLogin(request, env) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) return jsonResponse({ error: "Email and password required" }, 400);
    const result = await env.DB.prepare(
      "SELECT client_id, client_name, email, password_hash FROM clients WHERE email = ?"
    ).bind(email).first();
    if (!result) return jsonResponse({ error: "Invalid email or password" }, 401);

    const hashedInput = await hashPassword(password);
    const isMatch = hashedInput === result.password_hash || password === result.password_hash;
    if (!isMatch) return jsonResponse({ error: "Invalid email or password" }, 401);

    return jsonResponse({ success: true, client: { client_id: result.client_id, client_name: result.client_name, email: result.email } });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleCreateClient(request, env) {
  try {
    const { client_name, email, password } = await request.json();
    if (!client_name || !email || !password) return jsonResponse({ error: "সব ফিল্ড পূরণ করতে হবে" }, 400);
    const existing = await env.DB.prepare("SELECT client_id FROM clients WHERE email = ?").bind(email).first();
    if (existing) return jsonResponse({ error: "এই ইমেইল আগে থেকেই আছে" }, 400);
    const client_id = "client_" + Date.now();
    const created_at = new Date().toISOString();
    const hashedPassword = await hashPassword(password);
    await env.DB.prepare("INSERT INTO clients (client_id, client_name, email, password_hash, created_at) VALUES (?, ?, ?, ?, ?)")
      .bind(client_id, client_name, email, hashedPassword, created_at).run();
    return jsonResponse({ success: true, client_id });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleGetClients(env) {
  try {
    const result = await env.DB.prepare("SELECT client_id, client_name, email, domain, created_at FROM clients ORDER BY created_at DESC").all();
    return jsonResponse({ success: true, clients: result.results });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleCreatePage(request, env) {
  try {
    const { client_id, page_name, page_url_slug, title, description, image_url, price, button_text, template_style } = await request.json();
    if (!client_id || !page_name || !page_url_slug) return jsonResponse({ error: "সব ফিল্ড পূরণ করতে হবে" }, 400);
    const existing = await env.DB.prepare("SELECT page_id FROM landing_pages WHERE page_url_slug = ?").bind(page_url_slug).first();
    if (existing) return jsonResponse({ error: "এই URL Slug আগে থেকেই আছে, অন্য নাম দাও" }, 400);
    const page_id = "page_" + Date.now();
    const created_at = new Date().toISOString();
    const page_content = JSON.stringify({ title, description, image_url, price, button_text, template_style: template_style || 'classic' });
    await env.DB.prepare(
      "INSERT INTO landing_pages (page_id, client_id, page_name, page_url_slug, page_content, status, created_at) VALUES (?, ?, ?, ?, ?, 'published', ?)"
    ).bind(page_id, client_id, page_name, page_url_slug, page_content, created_at).run();
    return jsonResponse({ success: true, page_id, page_url_slug });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleGetPages(request, env, url) {
  try {
    const client_id = url.searchParams.get("client_id");
    let result;
    if (client_id) {
      result = await env.DB.prepare("SELECT * FROM landing_pages WHERE client_id = ? ORDER BY created_at DESC").bind(client_id).all();
    } else {
      result = await env.DB.prepare("SELECT * FROM landing_pages ORDER BY created_at DESC").all();
    }
    return jsonResponse({ success: true, pages: result.results });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleGetPageBySlug(slug, env) {
  try {
    const page = await env.DB.prepare("SELECT * FROM landing_pages WHERE page_url_slug = ? AND status = 'published'").bind(slug).first();
    if (!page) return jsonResponse({ error: "Page not found" }, 404);
    const tracking = await env.DB.prepare("SELECT * FROM tracking_settings WHERE client_id = ?").bind(page.client_id).first();
    return jsonResponse({ success: true, page, tracking: tracking || null });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleCreateOrder(request, env) {
  try {
    const { client_id, page_id, customer_name, customer_phone, product_name, quantity } = await request.json();
    if (!client_id || !customer_name || !customer_phone) return jsonResponse({ error: "নাম ও ফোন নাম্বার আবশ্যক" }, 400);
    const order_id = "order_" + Date.now();
    const created_at = new Date().toISOString();
    await env.DB.prepare(
      "INSERT INTO orders (order_id, client_id, page_id, customer_name, customer_phone, product_name, quantity, order_status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)"
    ).bind(order_id, client_id, page_id || null, customer_name, customer_phone, product_name || '', quantity || 1, created_at).run();
    return jsonResponse({ success: true, order_id });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleGetOrders(request, env, url) {
  try {
    const client_id = url.searchParams.get("client_id");
    if (!client_id) return jsonResponse({ error: "client_id প্রয়োজন" }, 400);
    const result = await env.DB.prepare("SELECT * FROM orders WHERE client_id = ? ORDER BY created_at DESC").bind(client_id).all();
    return jsonResponse({ success: true, orders: result.results });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleUpdateOrderStatus(request, env) {
  try {
    const { order_id, order_status } = await request.json();
    if (!order_id || !order_status) return jsonResponse({ error: "order_id ও status প্রয়োজন" }, 400);
    await env.DB.prepare("UPDATE orders SET order_status = ? WHERE order_id = ?").bind(order_status, order_id).run();
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleSaveTracking(request, env) {
  try {
    const { client_id, meta_pixel_id, ga4_id, fb_capi_token, tiktok_pixel_id } = await request.json();
    if (!client_id) return jsonResponse({ error: "client_id প্রয়োজন" }, 400);
    const existing = await env.DB.prepare("SELECT tracking_id FROM tracking_settings WHERE client_id = ?").bind(client_id).first();
    if (existing) {
      await env.DB.prepare(
        "UPDATE tracking_settings SET meta_pixel_id = ?, ga4_id = ?, fb_capi_token = ?, tiktok_pixel_id = ? WHERE client_id = ?"
      ).bind(meta_pixel_id || '', ga4_id || '', fb_capi_token || '', tiktok_pixel_id || '', client_id).run();
    } else {
      const tracking_id = "track_" + Date.now();
      const created_at = new Date().toISOString();
      await env.DB.prepare(
        "INSERT INTO tracking_settings (tracking_id, client_id, meta_pixel_id, ga4_id, fb_capi_token, tiktok_pixel_id, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
      ).bind(tracking_id, client_id, meta_pixel_id || '', ga4_id || '', fb_capi_token || '', tiktok_pixel_id || '', created_at).run();
    }
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleGetTracking(request, env, url) {
  try {
    const client_id = url.searchParams.get("client_id");
    if (!client_id) return jsonResponse({ error: "client_id প্রয়োজন" }, 400);
    const result = await env.DB.prepare("SELECT * FROM tracking_settings WHERE client_id = ?").bind(client_id).first();
    return jsonResponse({ success: true, tracking: result || null });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

async function handleImageUpload(request, env) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');
    if (!file) return jsonResponse({ error: "কোনো ফাইল পাওয়া যায়নি" }, 400);
    const ext = file.name.split('.').pop();
    const fileName = "img_" + Date.now() + "." + ext;
    await env.IMAGES.put(fileName, file.stream(), { httpMetadata: { contentType: file.type } });
    const imageUrl = `/images/${fileName}`;
    return jsonResponse({ success: true, image_url: imageUrl });
  } catch (err) {
    return jsonResponse({ error: "Upload failed", details: err.message }, 500);
  }
}

async function handleGetImage(path, env) {
  try {
    const fileName = path.replace("/images/", "");
    const object = await env.IMAGES.get(fileName);
    if (!object) return new Response("Not found", { status: 404 });
    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('cache-control', 'public, max-age=31536000');
    return new Response(object.body, { headers });
  } catch (err) {
    return new Response("Error", { status: 500 });
  }
}

async function handleSaveDomain(request, env) {
  try {
    const { client_id, domain } = await request.json();
    if (!client_id) return jsonResponse({ error: "client_id প্রয়োজন" }, 400);
    await env.DB.prepare("UPDATE clients SET domain = ? WHERE client_id = ?").bind(domain || '', client_id).run();
    return jsonResponse({ success: true });
  } catch (err) {
    return jsonResponse({ error: "Server error", details: err.message }, 500);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}
