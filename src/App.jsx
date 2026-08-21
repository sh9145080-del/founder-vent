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
  { id: 'classic', name: 'Classic (সাদা-কালো, সাধারণ)' },
  { id: 'bold', name: 'Bold (উজ্জ্বল রং, বড় টেক্সট)' },
  { id: 'minimal', name: 'Minimal (হালকা, প্রফেশনাল)' }
]

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
  const [price, setPrice] = useState('')
  const [buttonText, setButtonText] = useState('অর্ডার করুন')
  const [templateStyle, setTemplateStyle] = useState('classic')
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

        <label>Template Style:</label>
        <select value={templateStyle} onChange={(e) => setTemplateStyle(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}>
          {TEMPLATES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
        </select>

        <input type="text" placeholder="Page Name (internal)" value={pageName} onChange={(e) => setPageName(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="URL Slug (e.g. punching-bag)" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="Price (e.g. ৯৯৯ টাকা)" value={price} onChange={(e) => setPrice(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="Button Text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <button onClick={handleCreatePage} style={{ padding: '10px 30px', marginTop: '10px', width: '100%' }}>Publish Page</button>
        <p style={{ textAlign: 'center' }}>{pageMessage}</p>
      </div>

      <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center' }}>সব Client-এর লিস্ট</h3>
        {clients.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Client নেই এখনো</p> : clients.map((c) => (
          <div key={c.client_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}><strong>{c.client_name}</strong> — {c.email}</div>
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

    const ordersRes = await fetch(`/api/orders?client_id=${client_id}`)
    const ordersData = await ordersRes.json()
    if (ordersData.success) setOrders(ordersData.orders)

    const trackingRes = await fetch(`/api/tracking?client_id=${client_id}`)
    const trackingData = await trackingRes.json()
    if (trackingData.success && trackingData.tracking) {
      setMetaPixel(trackingData.tracking.meta_pixel_id || '')
      setGa4(trackingData.tracking.ga4_id || '')
      setFbCapi(trackingData.tracking.fb_capi_token || '')
      setTiktokPixel(trackingData.tracking.tiktok_pixel_id || '')
    }
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

  if (loggedInClient) {
    return (
      <div style={{ padding: '30px', textAlign: 'center' }}>
        <h1>Client Dashboard</h1>
        <p>স্বাগতম, <strong>{loggedInClient.client_name}</strong></p>

        <div style={{ marginTop: '20px' }}>
          <button onClick={() => setTab('pages')} style={{ padding: '8px 16px', marginRight: '8px', fontWeight: tab === 'pages' ? 'bold' : 'normal' }}>Pages</button>
          <button onClick={() => setTab('orders')} style={{ padding: '8px 16px', marginRight: '8px', fontWeight: tab === 'orders' ? 'bold' : 'normal' }}>Orders</button>
          <button onClick={() => setTab('tracking')} style={{ padding: '8px 16px', fontWeight: tab === 'tracking' ? 'bold' : 'normal' }}>Tracking Settings</button>
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
                Status: {o.order_status}
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
  const style = content.template_style || 'classic'

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

  if (style === 'bold') {
    return (
      <div style={{ fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto', background: '#1a1a2e', color: 'white', minHeight: '100vh' }}>
        {content.image_url && <img src={content.image_url} alt={content.title} style={{ width: '100%' }} />}
        <div style={{ padding: '25px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', textTransform: 'uppercase', color: '#ffd700' }}>{content.title}</h1>
          <p style={{ fontSize: '16px', color: '#ccc' }}>{content.description}</p>
          <h2 style={{ fontSize: '40px', color: '#ff4757' }}>{content.price}</h2>
          <div style={{ marginTop: '25px', background: '#16213e', padding: '20px', borderRadius: '10px' }}>
            <input type="text" placeholder="আপনার নাম" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '14px', width: '100%', boxSizing: 'border-box', borderRadius: '6px', border: 'none' }} />
            <input type="text" placeholder="ফোন নাম্বার" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '14px', width: '100%', boxSizing: 'border-box', borderRadius: '6px', border: 'none' }} />
            <button onClick={handleOrder} style={{ padding: '16px 30px', width: '100%', background: '#ff4757', color: 'white', border: 'none', borderRadius: '6px', fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }}>
              {content.button_text || 'অর্ডার করুন'}
            </button>
            <p>{message}</p>
          </div>
        </div>
      </div>
    )
  }

  if (style === 'minimal') {
    return (
      <div style={{ fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', padding: '40px 25px', color: '#333' }}>
        {content.image_url && <img src={content.image_url} alt={content.title} style={{ width: '100%', borderRadius: '4px', marginBottom: '25px' }} />}
        <h1 style={{ fontSize: '24px', fontWeight: '400', letterSpacing: '0.5px' }}>{content.title}</h1>
        <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6' }}>{content.description}</p>
        <h2 style={{ fontSize: '22px', fontWeight: '500', marginTop: '15px' }}>{content.price}</h2>
        <div style={{ marginTop: '30px', borderTop: '1px solid #eee', paddingTop: '25px' }}>
          <input type="text" placeholder="আপনার নাম" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', margin: '0 0 12px', padding: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '2px' }} />
          <input type="text" placeholder="ফোন নাম্বার" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ display: 'block', margin: '0 0 12px', padding: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '2px' }} />
          <button onClick={handleOrder} style={{ padding: '13px 30px', width: '100%', background: '#333', color: 'white', border: 'none', borderRadius: '2px', fontSize: '14px', letterSpacing: '1px' }}>
            {content.button_text || 'অর্ডার করুন'}
          </button>
          <p style={{ fontSize: '13px' }}>{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '500px', margin: '0 auto' }}>
      {content.image_url && <img src={content.image_url} alt={content.title} style={{ width: '100%', borderRadius: '8px' }} />}
      <h1>{content.title}</h1>
      <p style={{ color: '#555' }}>{content.description}</p>
      <h2 style={{ color: '#c0392b' }}>{content.price}</h2>
      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
        <input type="text" placeholder="আপনার নাম" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="ফোন নাম্বার" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <button onClick={handleOrder} style={{ padding: '12px 30px', width: '100%', background: '#27ae60', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px' }}>
          {content.button_text || 'অর্ডার করুন'}
        </button>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default App
