import { useState, useEffect } from 'react'

function App() {
  const path = window.location.pathname
  if (path.startsWith('/p/')) {
    const slug = path.replace('/p/', '')
    return <PublicLandingPage slug={slug} />
  }

  const [view, setView] = useState('admin')

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', padding: '15px', background: '#f0f0f0' }}>
        <button onClick={() => setView('admin')} style={{ padding: '8px 20px', marginRight: '10px' }}>Admin Panel</button>
        <button onClick={() => setView('client')} style={{ padding: '8px 20px' }}>Client Login</button>
      </div>
      {view === 'admin' ? <AdminPanel /> : <ClientLogin />}
    </div>
  )
}

const TEMPLATES = [
  {
    id: 'aurora',
    name: 'Aurora',
    desc: 'গ্রেডিয়েন্ট, মডার্ন কার্ড-বেজড ডিজাইন',
    previewBg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    id: 'noir',
    name: 'Noir',
    desc: 'প্রিমিয়াম ডার্ক, লাক্সারি ব্র্যান্ড স্টাইল',
    previewBg: 'linear-gradient(135deg, #0f0f0f 0%, #2a2a2a 100%)'
  }
]

function TemplatePicker({ selected, onSelect, sampleData }) {
  const [showPicker, setShowPicker] = useState(false)

  return (
    <div style={{ margin: '15px 0' }}>
      <label>Template Design:</label>
      <div
        onClick={() => setShowPicker(!showPicker)}
        style={{
          border: '2px solid #333', borderRadius: '8px', padding: '15px', marginTop: '8px',
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: TEMPLATES.find(t => t.id === selected)?.previewBg || '#eee'
        }}
      >
        <span style={{ color: 'white', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          {TEMPLATES.find(t => t.id === selected)?.name || 'Select Template'}
        </span>
        <span style={{ color: 'white' }}>{showPicker ? '▲' : '▼'} সব ডিজাইন দেখো</span>
      </div>

      {showPicker && (
        <div style={{ marginTop: '10px', display: 'grid', gap: '15px' }}>
          {TEMPLATES.map(t => (
            <div key={t.id} style={{ border: selected === t.id ? '3px solid #27ae60' : '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ padding: '10px', background: '#f8f8f8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>{t.name}</strong>
                  <div style={{ fontSize: '12px', color: '#888' }}>{t.desc}</div>
                </div>
                <button onClick={() => { onSelect(t.id); setShowPicker(false) }} style={{ padding: '6px 16px', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px' }}>
                  Select
                </button>
              </div>
              <div style={{ maxHeight: '350px', overflow: 'hidden', transform: 'scale(0.9)', transformOrigin: 'top center', pointerEvents: 'none' }}>
                <TemplateRenderer style={t.id} content={sampleData} onOrderClick={() => {}} name="" phone="" setName={() => {}} setPhone={() => {}} message="" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function AdminPanel() {
  const [clientName, setClientName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [clients, setClients] = useState([])

  const [selectedClient, setSelectedClient] = useState('')
  const [pageName, setPageName] = useState('')
  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [price, setPrice] = useState('')
  const [buttonText, setButtonText] = useState('অর্ডার করুন')
  const [templateStyle, setTemplateStyle] = useState('aurora')
  const [pageMessage, setPageMessage] = useState('')
  const [pages, setPages] = useState([])

  const loadClients = async () => {
    try { const res = await fetch('/api/clients'); const data = await res.json(); if (data.success) setClients(data.clients) } catch (err) {}
  }
  const loadPages = async () => {
    try { const res = await fetch('/api/pages'); const data = await res.json(); if (data.success) setPages(data.pages) } catch (err) {}
  }
  useEffect(() => { loadClients(); loadPages() }, [])

  const handleAddClient = async () => {
    setMessage('Adding...')
    try {
      const res = await fetch('/api/clients', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ client_name: clientName, email, password }) })
      const data = await res.json()
      if (data.success) { setMessage('✅ Client Added Successfully'); setClientName(''); setEmail(''); setPassword(''); loadClients() }
      else setMessage(`❌ ${data.error}`)
    } catch (err) { setMessage('❌ Something went wrong') }
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) setImageUrl(data.image_url)
      else alert('Upload failed: ' + data.error)
    } catch (err) { alert('Upload failed') }
    setUploading(false)
  }

  const handleCreatePage = async () => {
    setPageMessage('Creating...')
    if (!selectedClient) { setPageMessage('❌ Client Select করো'); return }
    try {
      const res = await fetch('/api/pages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: selectedClient, page_name: pageName, page_url_slug: slug, title, description, image_url: imageUrl, price, button_text: buttonText, template_style: templateStyle })
      })
      const data = await res.json()
      if (data.success) {
        setPageMessage(`✅ Page তৈরি হয়েছে! URL: /p/${data.page_url_slug}`)
        setPageName(''); setSlug(''); setTitle(''); setDescription(''); setImageUrl(''); setPrice('')
        loadPages()
      } else setPageMessage(`❌ ${data.error}`)
    } catch (err) { setPageMessage('❌ Something went wrong') }
  }

  const sampleData = {
    title: title || 'প্রোডাক্টের নাম',
    description: description || 'প্রোডাক্টের বিবরণ এখানে দেখা যাবে',
    image_url: imageUrl,
    price: price || '৯৯৯ টাকা',
    button_text: buttonText
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Founder's Vent - Admin Panel</h1>
      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', maxWidth: '350px', margin: '30px auto' }}>
        <h3>নতুন Client যোগ করো</h3>
        <input type="text" placeholder="Client Name" value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <button onClick={handleAddClient} style={{ padding: '10px 30px', marginTop: '10px' }}>Add Client</button>
        <p>{message}</p>
      </div>

      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', maxWidth: '400px', margin: '30px auto', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center' }}>নতুন Landing Page তৈরি করো</h3>
        <label>Client Select করো:</label>
        <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}>
          <option value="">-- Client বাছাই করো --</option>
          {clients.map(c => <option key={c.client_id} value={c.client_id}>{c.client_name}</option>)}
        </select>

        <input type="text" placeholder="Page Name (internal)" value={pageName} onChange={(e) => setPageName(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="URL Slug (e.g. punching-bag)" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />

        <label>প্রোডাক্ট ছবি:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'block', margin: '10px 0', width: '100%' }} />
        {uploading && <p>Uploading...</p>}
        {imageUrl && <img src={imageUrl} alt="preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />}

        <input type="text" placeholder="Price (e.g. ৯৯৯ টাকা)" value={price} onChange={(e) => setPrice(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="Button Text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />

        <TemplatePicker selected={templateStyle} onSelect={setTemplateStyle} sampleData={sampleData} />

        <button onClick={handleCreatePage} style={{ padding: '10px 30px', marginTop: '10px', width: '100%' }}>Publish Page</button>
        <p style={{ textAlign: 'center' }}>{pageMessage}</p>
      </div>

      <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center' }}>সব Client-এর লিস্ট</h3>
        {clients.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Client নেই এখনো</p> : clients.map((c) => (
          <div key={c.client_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
            <strong>{c.client_name}</strong> — {c.email}
            {c.domain && <div style={{ fontSize: '13px', color: '#888' }}>Domain: {c.domain}</div>}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center' }}>সব Landing Page</h3>
        {pages.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Page নেই এখনো</p> : pages.map((p) => (
          <div key={p.page_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
            <strong>{p.page_name}</strong><br /><a href={`/p/${p.page_url_slug}`} target="_blank" rel="noreferrer">/p/{p.page_url_slug}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

function ClientLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [loggedInClient, setLoggedInClient] = useState(null)
  const [myPages, setMyPages] = useState([])
  const [orders, setOrders] = useState([])
  const [tab, setTab] = useState('pages')

  const [metaPixel, setMetaPixel] = useState('')
  const [ga4, setGa4] = useState('')
  const [fbCapi, setFbCapi] = useState('')
  const [tiktokPixel, setTiktokPixel] = useState('')
  const [trackingMsg, setTrackingMsg] = useState('')

  const [domain, setDomain] = useState('')
  const [domainMsg, setDomainMsg] = useState('')

  const handleLogin = async () => {
    setMessage('Checking...')
    try {
      const res = await fetch('/api/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) })
      const data = await res.json()
      if (data.success) {
        setLoggedInClient(data.client)
        setMessage('')
        loadClientData(data.client.client_id)
      } else setMessage(`❌ ${data.error}`)
    } catch (err) { setMessage('❌ Something went wrong') }
  }

  const loadClientData = async (client_id) => {
    const pagesRes = await fetch(`/api/pages?client_id=${client_id}`)
    const pagesData = await pagesRes.json()
    if (pagesData.success) setMyPages(pagesData.pages)
    await refreshOrders(client_id)
    const trackingRes = await fetch(`/api/tracking?client_id=${client_id}`)
    const trackingData = await trackingRes.json()
    if (trackingData.success && trackingData.tracking) {
      setMetaPixel(trackingData.tracking.meta_pixel_id || '')
      setGa4(trackingData.tracking.ga4_id || '')
      setFbCapi(trackingData.tracking.fb_capi_token || '')
      setTiktokPixel(trackingData.tracking.tiktok_pixel_id || '')
    }
  }

  const refreshOrders = async (client_id) => {
    const ordersRes = await fetch(`/api/orders?client_id=${client_id}`)
    const ordersData = await ordersRes.json()
    if (ordersData.success) setOrders(ordersData.orders)
  }

  const handleUpdateStatus = async (order_id, newStatus) => {
    try {
      await fetch('/api/orders/status', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ order_id, order_status: newStatus }) })
      refreshOrders(loggedInClient.client_id)
    } catch (err) {}
  }

  const handleSaveTracking = async () => {
    setTrackingMsg('Saving...')
    try {
      const res = await fetch('/api/tracking', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: loggedInClient.client_id, meta_pixel_id: metaPixel, ga4_id: ga4, fb_capi_token: fbCapi, tiktok_pixel_id: tiktokPixel })
      })
      const data = await res.json()
      if (data.success) setTrackingMsg('✅ Tracking Settings Saved')
      else setTrackingMsg(`❌ ${data.error}`)
    } catch (err) { setTrackingMsg('❌ Something went wrong') }
  }

  const handleSaveDomain = async () => {
    setDomainMsg('Saving...')
    try {
      const res = await fetch('/api/domain', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: loggedInClient.client_id, domain }) })
      const data = await res.json()
      if (data.success) setDomainMsg('✅ Domain সংরক্ষিত হয়েছে।')
      else setDomainMsg(`❌ ${data.error}`)
    } catch (err) { setDomainMsg('❌ Something went wrong') }
  }

  if (loggedInClient) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h1>Client Dashboard</h1>
        <p>স্বাগতম, <strong>{loggedInClient.client_name}</strong></p>
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setTab('pages')} style={{ padding: '8px 14px', marginRight: '6px', fontWeight: tab === 'pages' ? 'bold' : 'normal' }}>Pages</button>
          <button onClick={() => setTab('orders')} style={{ padding: '8px 14px', marginRight: '6px', fontWeight: tab === 'orders' ? 'bold' : 'normal' }}>Orders</button>
          <button onClick={() => setTab('tracking')} style={{ padding: '8px 14px', marginRight: '6px', fontWeight: tab === 'tracking' ? 'bold' : 'normal' }}>Tracking</button>
          <button onClick={() => setTab('domain')} style={{ padding: '8px 14px', fontWeight: tab === 'domain' ? 'bold' : 'normal' }}>Domain</button>
        </div>

        {tab === 'pages' && (
          <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
            <h3 style={{ textAlign: 'center' }}>আমার Landing Pages</h3>
            {myPages.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Page নেই এখনো</p> : myPages.map((p) => (
              <div key={p.page_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
                <strong>{p.page_name}</strong><br /><a href={`/p/${p.page_url_slug}`} target="_blank" rel="noreferrer">/p/{p.page_url_slug}</a>
              </div>
            ))}
          </div>
        )}

        {tab === 'orders' && (
          <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
            <h3 style={{ textAlign: 'center' }}>আমার Orders</h3>
            {orders.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Order নেই এখনো</p> : orders.map((o) => (
              <div key={o.order_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
                <strong>{o.customer_name}</strong> — {o.customer_phone}<br />
                Product: {o.product_name} | Qty: {o.quantity}<br />
                <label>Status: </label>
                <select value={o.order_status} onChange={(e) => handleUpdateStatus(o.order_id, e.target.value)} style={{ padding: '5px' }}>
                  {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            ))}
          </div>
        )}

        {tab === 'tracking' && (
          <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', maxWidth: '350px', margin: '30px auto', textAlign: 'left' }}>
            <h3 style={{ textAlign: 'center' }}>Tracking Settings</h3>
            <label>Meta Pixel ID</label>
            <input type="text" value={metaPixel} onChange={(e) => setMetaPixel(e.target.value)} style={{ display: 'block', margin: '5px 0 15px', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
            <label>GA4 Measurement ID</label>
            <input type="text" value={ga4} onChange={(e) => setGa4(e.target.value)} style={{ display: 'block', margin: '5px 0 15px', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
            <label>Facebook CAPI Token</label>
            <input type="text" value={fbCapi} onChange={(e) => setFbCapi(e.target.value)} style={{ display: 'block', margin: '5px 0 15px', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
            <label>TikTok Pixel ID</label>
            <input type="text" value={tiktokPixel} onChange={(e) => setTiktokPixel(e.target.value)} style={{ display: 'block', margin: '5px 0 15px', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
            <button onClick={handleSaveTracking} style={{ padding: '10px 30px', width: '100%' }}>Save</button>
            <p style={{ textAlign: 'center' }}>{trackingMsg}</p>
          </div>
        )}

        {tab === 'domain' && (
          <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', maxWidth: '350px', margin: '30px auto', textAlign: 'left' }}>
            <h3 style={{ textAlign: 'center' }}>Custom Domain</h3>
            <label>আপনার Domain (যদি থাকে)</label>
            <input type="text" placeholder="example.com" value={domain} onChange={(e) => setDomain(e.target.value)} style={{ display: 'block', margin: '5px 0 15px', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
            <button onClick={handleSaveDomain} style={{ padding: '10px 30px', width: '100%' }}>Save</button>
            <p style={{ textAlign: 'center' }}>{domainMsg}</p>
          </div>
        )}

        <button onClick={() => setLoggedInClient(null)} style={{ marginTop: '30px', padding: '8px 20px' }}>Logout</button>
      </div>
    )
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Client Login</h1>
      <div style={{ marginTop: '30px' }}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }} />
        <button onClick={handleLogin} style={{ padding: '10px 30px', marginTop: '10px' }}>Login</button>
      </div>
      <p style={{ marginTop: '20px' }}>{message}</p>
    </div>
  )
}

function TemplateRenderer({ style, content, name, phone, setName, setPhone, message, onOrderClick }) {
  if (style === 'noir') {
    return (
      <div style={{ fontFamily: "'Georgia', serif", maxWidth: '500px', margin: '0 auto', background: '#0f0f0f', color: '#f0f0f0', minHeight: '100vh' }}>
        <div style={{ position: 'relative' }}>
          {content.image_url ? (
            <img src={content.image_url} alt={content.title} style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }} />
          ) : (
            <div style={{ width: '100%', height: '380px', background: '#1a1a1a' }} />
          )}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '150px', background: 'linear-gradient(transparent, #0f0f0f)' }} />
        </div>
        <div style={{ padding: '0 28px 28px', marginTop: '-40px', position: 'relative' }}>
          <div style={{ width: '40px', height: '2px', background: '#d4af37', marginBottom: '18px' }} />
          <h1 style={{ fontSize: '30px', fontWeight: '400', letterSpacing: '1px', margin: '0 0 12px' }}>{content.title}</h1>
          <p style={{ fontSize: '15px', color: '#aaa', lineHeight: '1.7', fontFamily: "'Helvetica', sans-serif" }}>{content.description}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '20px 0' }}>
            <span style={{ fontSize: '34px', color: '#d4af37', fontWeight: 'bold' }}>{content.price}</span>
          </div>
          <div style={{ marginTop: '30px', border: '1px solid #333', borderRadius: '4px', padding: '24px', background: '#161616' }}>
            <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1.5px', color: '#888', marginBottom: '16px', fontFamily: "'Helvetica', sans-serif" }}>অর্ডার করতে তথ্য দিন</p>
            <input type="text" placeholder="আপনার নাম" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', marginBottom: '12px', padding: '13px', width: '100%', boxSizing: 'border-box', background: '#0f0f0f', border: '1px solid #333', color: 'white', borderRadius: '3px', fontFamily: "'Helvetica', sans-serif" }} />
            <input type="text" placeholder="ফোন নাম্বার" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ display: 'block', marginBottom: '16px', padding: '13px', width: '100%', boxSizing: 'border-box', background: '#0f0f0f', border: '1px solid #333', color: 'white', borderRadius: '3px', fontFamily: "'Helvetica', sans-serif" }} />
            <button onClick={onOrderClick} style={{ padding: '15px', width: '100%', background: '#d4af37', color: '#0f0f0f', border: 'none', borderRadius: '3px', fontSize: '15px', fontWeight: 'bold', letterSpacing: '1px', fontFamily: "'Helvetica', sans-serif" }}>
              {content.button_text || 'অর্ডার করুন'}
            </button>
            <p style={{ fontSize: '13px', marginTop: '10px', fontFamily: "'Helvetica', sans-serif" }}>{message}</p>
          </div>
        </div>
      </div>
    )
  }

  // Aurora (default)
  return (
    <div style={{ fontFamily: "'Helvetica', sans-serif", maxWidth: '500px', margin: '0 auto', background: '#f7f7fb' }}>
      <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '35px 25px 60px', textAlign: 'center', borderRadius: '0 0 30px 30px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '12px', padding: '5px 14px', borderRadius: '20px', marginBottom: '14px' }}>✨ প্রিমিয়াম অফার</div>
        <h1 style={{ color: 'white', fontSize: '26px', margin: '0 0 8px' }}>{content.title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '14px' }}>{content.description}</p>
      </div>

      <div style={{ margin: '-45px 20px 0', background: 'white', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
        {content.image_url ? (
          <img src={content.image_url} alt={content.title} style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '220px', background: '#eee' }} />
        )}
        <div style={{ padding: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#667eea' }}>{content.price}</span>
            <span style={{ background: '#fdf1f1', color: '#e74c3c', fontSize: '12px', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold' }}>🔥 সীমিত স্টক</span>
          </div>
          <input type="text" placeholder="আপনার নাম" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '13px', width: '100%', boxSizing: 'border-box', border: '1px solid #eee', borderRadius: '10px', background: '#f7f7fb' }} />
          <input type="text" placeholder="ফোন নাম্বার" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ display: 'block', marginBottom: '14px', padding: '13px', width: '100%', boxSizing: 'border-box', border: '1px solid #eee', borderRadius: '10px', background: '#f7f7fb' }} />
          <button onClick={onOrderClick} style={{ padding: '15px', width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}>
            {content.button_text || 'অর্ডার করুন'} →
          </button>
          <p style={{ marginTop: '10px' }}>{message}</p>
        </div>
      </div>
      <div style={{ height: '25px' }} />
    </div>
  )
}

function PublicLandingPage({ slug }) {
  const [page, setPage] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch(`/api/page/${slug}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPage(data.page)
          if (data.tracking && data.tracking.meta_pixel_id) injectMetaPixel(data.tracking.meta_pixel_id)
          if (data.tracking && data.tracking.ga4_id) injectGA4(data.tracking.ga4_id)
        } else setNotFound(true)
      })
      .catch(() => setNotFound(true))
  }, [slug])

  const injectMetaPixel = (pixelId) => {
    if (window.fbq) return
    const script = document.createElement('script')
    script.innerHTML = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId}');
      fbq('track', 'PageView');
    `
    document.head.appendChild(script)
  }

  const injectGA4 = (ga4Id) => {
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`
    document.head.appendChild(script1)
    const script2 = document.createElement('script')
    script2.innerHTML = `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${ga4Id}');`
    document.head.appendChild(script2)
  }

  if (notFound) return <div style={{ padding: '40px', textAlign: 'center' }}><h2>পেজটি খুঁজে পাওয়া যায়নি</h2></div>
  if (!page) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>

  const content = JSON.parse(page.page_content)
  const style = content.template_style || 'aurora'

  const handleOrder = async () => {
    if (!name || !phone) { setMessage('❌ নাম ও ফোন নাম্বার দাও'); return }
    setMessage('Submitting...')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: page.client_id, page_id: page.page_id, customer_name: name, customer_phone: phone, product_name: content.title, quantity: 1 })
      })
      const data = await res.json()
      if (data.success) {
        if (window.fbq) window.fbq('track', 'Lead')
        if (window.gtag) window.gtag('event', 'generate_lead')
        setMessage('✅ অর্ডার সফল হয়েছে! আমরা শীঘ্রই যোগাযোগ করবো।')
        setName(''); setPhone('')
      } else setMessage(`❌ ${data.error}`)
    } catch (err) { setMessage('❌ কিছু ভুল হয়েছে') }
  }

  return <TemplateRenderer style={style} content={content} name={name} phone={phone} setName={setName} setPhone={setPhone} message={message} onOrderClick={handleOrder} />
}

export default App
