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
  const [originalPrice, setOriginalPrice] = useState('')
  const [buttonText, setButtonText] = useState('এখনই অর্ডার করুন')
  const [themeColor, setThemeColor] = useState('#e74c3c')
  const [logoUrl, setLogoUrl] = useState('')
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [detailRows, setDetailRows] = useState([{ key: '', value: '' }])
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

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setUploadingLogo(true)
    try {
      const formData = new FormData()
      formData.append('image', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (data.success) setLogoUrl(data.image_url)
      else alert('Upload failed: ' + data.error)
    } catch (err) { alert('Upload failed') }
    setUploadingLogo(false)
  }

  const addDetailRow = () => setDetailRows([...detailRows, { key: '', value: '' }])
  const updateDetailRow = (i, field, val) => {
    const updated = [...detailRows]
    updated[i][field] = val
    setDetailRows(updated)
  }
  const removeDetailRow = (i) => setDetailRows(detailRows.filter((_, idx) => idx !== i))

  const handleCreatePage = async () => {
    setPageMessage('Creating...')
    if (!selectedClient) { setPageMessage('❌ Client Select করো'); return }
    try {
      const res = await fetch('/api/pages', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: selectedClient, page_name: pageName, page_url_slug: slug, title, description,
          image_url: imageUrl, price, original_price: originalPrice, button_text: buttonText,
          template_style: 'aurora', logo_url: logoUrl, theme_color: themeColor,
          details: detailRows.filter(d => d.key && d.value)
        })
      })
      const data = await res.json()
      if (data.success) {
        setPageMessage(`✅ Page তৈরি হয়েছে! URL: /p/${data.page_url_slug}`)
        setPageName(''); setSlug(''); setTitle(''); setDescription(''); setImageUrl(''); setPrice(''); setOriginalPrice(''); setDetailRows([{ key: '', value: '' }])
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

      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', maxWidth: '420px', margin: '30px auto', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center' }}>নতুন Landing Page তৈরি করো</h3>

        <label>Client Select করো:</label>
        <select value={selectedClient} onChange={(e) => setSelectedClient(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%' }}>
          <option value="">-- Client বাছাই করো --</option>
          {clients.map(c => <option key={c.client_id} value={c.client_id}>{c.client_name}</option>)}
        </select>

        <input type="text" placeholder="Page Name (internal)" value={pageName} onChange={(e) => setPageName(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <input type="text" placeholder="URL Slug (e.g. baby-bath-tub)" value={slug} onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />

        <label>ব্র্যান্ড লোগো (ঐচ্ছিক):</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: 'block', margin: '8px 0', width: '100%' }} />
        {uploadingLogo && <p>Uploading logo...</p>}
        {logoUrl && <img src={logoUrl} alt="logo" style={{ height: '40px', marginBottom: '10px' }} />}

        <label>থিম কালার:</label>
        <input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={{ display: 'block', margin: '8px 0 15px', width: '100%', height: '40px' }} />

        <input type="text" placeholder="Product Title" value={title} onChange={(e) => setTitle(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />

        <label>প্রোডাক্ট ছবি:</label>
        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'block', margin: '10px 0', width: '100%' }} />
        {uploading && <p>Uploading...</p>}
        {imageUrl && <img src={imageUrl} alt="preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }} />}

        <div style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="বিক্রয় মূল্য (৯৯৯)" value={price} onChange={(e) => setPrice(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '50%', boxSizing: 'border-box' }} />
          <input type="text" placeholder="আসল মূল্য (১৬৯৯)" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '50%', boxSizing: 'border-box' }} />
        </div>

        <input type="text" placeholder="Button Text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />

        <label>প্রোডাক্ট বিবরণ (Table):</label>
        {detailRows.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
            <input type="text" placeholder="যেমন: ম্যাটেরিয়াল" value={row.key} onChange={(e) => updateDetailRow(i, 'key', e.target.value)} style={{ flex: 1, padding: '8px' }} />
            <input type="text" placeholder="যেমন: প্লাস্টিক" value={row.value} onChange={(e) => updateDetailRow(i, 'value', e.target.value)} style={{ flex: 1, padding: '8px' }} />
            <button onClick={() => removeDetailRow(i)} style={{ padding: '8px' }}>✕</button>
          </div>
        ))}
        <button onClick={addDetailRow} style={{ marginTop: '8px', padding: '6px 14px' }}>+ আরেকটা তথ্য যোগ করো</button>

        <button onClick={handleCreatePage} style={{ padding: '12px 30px', marginTop: '20px', width: '100%', background: themeColor, color: 'white', border: 'none', borderRadius: '8px', fontSize: '15px' }}>Publish Page</button>
        <p style={{ textAlign: 'center' }}>{pageMessage}</p>
      </div>

      <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center' }}>সব Client-এর লিস্ট</h3>
        {clients.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Client নেই এখনো</p> : clients.map((c) => (
          <div key={c.client_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
            <strong>{c.client_name}</strong> — {c.email}
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
      if (data.success) { setLoggedInClient(data.client); setMessage(''); loadClientData(data.client.client_id) }
      else setMessage(`❌ ${data.error}`)
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
      setMetaPixel(trackingData.tracking.meta_pixel_id || ''); setGa4(trackingData.tracking.ga4_id || '')
      setFbCapi(trackingData.tracking.fb_capi_token || ''); setTiktokPixel(trackingData.tracking.tiktok_pixel_id || '')
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
      const res = await fetch('/api/tracking', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ client_id: loggedInClient.client_id, meta_pixel_id: metaPixel, ga4_id: ga4, fb_capi_token: fbCapi, tiktok_pixel_id: tiktokPixel }) })
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
              <div key={p.page_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}><strong>{p.page_name}</strong><br /><a href={`/p/${p.page_url_slug}`} target="_blank" rel="noreferrer">/p/{p.page_url_slug}</a></div>
            ))}
          </div>
        )}

        {tab === 'orders' && (
          <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
            <h3 style={{ textAlign: 'center' }}>আমার Orders</h3>
            {orders.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Order নেই এখনো</p> : orders.map((o) => (
              <div key={o.order_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
                <strong>{o.customer_name}</strong> — {o.customer_phone}<br />Product: {o.product_name} | Qty: {o.quantity}<br />
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

function PublicLandingPage({ slug }) {
  const [page, setPage] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [screenState, setScreenState] = useState('product')
  const [orderId, setOrderId] = useState('')
  const [errMsg, setErrMsg] = useState('')

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
  const theme = content.theme_color || '#e74c3c'

  const handleConfirmOrder = async () => {
    if (!name || !phone) { setErrMsg('নাম ও ফোন নাম্বার দাও'); return }
    setErrMsg('Submitting...')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_id: page.client_id, page_id: page.page_id, customer_name: name, customer_phone: phone, customer_address: address, product_name: content.title, quantity: 1 })
      })
      const data = await res.json()
      if (data.success) {
        if (window.fbq) window.fbq('track', 'Lead')
        if (window.gtag) window.gtag('event', 'generate_lead')
        setOrderId(data.order_id)
        setScreenState('thankyou')
        setErrMsg('')
      } else setErrMsg(data.error)
    } catch (err) { setErrMsg('কিছু ভুল হয়েছে') }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto', background: '#f7f7fb', minHeight: '100vh' }}>

      {content.logo_url && (
        <div style={{ padding: '10px 16px', background: 'white', borderBottom: '1px solid #eee' }}>
          <img src={content.logo_url} alt="logo" style={{ height: '32px' }} />
        </div>
      )}

      <div style={{ position: 'relative' }}>
        {content.image_url ? (
          <img src={content.image_url} alt={content.title} style={{ width: '100%', height: '300px', objectFit: 'cover', display: 'block' }} />
        ) : (
          <div style={{ width: '100%', height: '300px', background: '#eee' }} />
        )}
        {content.original_price && (
          <div style={{ position: 'absolute', top: '12px', left: '12px', background: theme, color: 'white', fontSize: '13px', fontWeight: 'bold', padding: '5px 12px', borderRadius: '6px' }}>
            ছাড়ে পাচ্ছেন
          </div>
        )}
      </div>

      <div style={{ padding: '20px 16px' }}>
        <div style={{ marginBottom: '8px' }}>
          {'★'.repeat(parseInt(content.rating || 5))}
          <span style={{ fontSize: '13px', color: '#888', marginLeft: '6px' }}>({content.review_count || 0} রিভিউ)</span>
        </div>

        <h1 style={{ fontSize: '22px', margin: '0 0 10px' }}>{content.title}</h1>
        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '14px' }}>{content.description}</p>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', margin: '16px 0' }}>
          <span style={{ fontSize: '30px', fontWeight: 'bold', color: theme }}>{content.price}</span>
          {content.original_price && <span style={{ fontSize: '16px', color: '#999', textDecoration: 'line-through' }}>{content.original_price}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '20px' }}>
          <div style={{ padding: '10px', background: 'white', borderRadius: '8px', fontSize: '12px', textAlign: 'center' }}>🚚 ফ্রি ডেলিভারি</div>
          <div style={{ padding: '10px', background: 'white', borderRadius: '8px', fontSize: '12px', textAlign: 'center' }}>💵 ক্যাশ অন ডেলিভারি</div>
        </div>

        <button onClick={() => setScreenState('order')} style={{ padding: '16px', width: '100%', background: theme, color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold' }}>
          {content.button_text || 'এখনই অর্ডার করুন'}
        </button>

        {content.details && content.details.length > 0 && (
          <div style={{ marginTop: '25px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
            <h3 style={{ fontSize: '15px' }}>প্রোডাক্ট বিবরণ</h3>
            {content.details.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0', fontSize: '13px' }}>
                <span style={{ color: '#888' }}>{d.key}</span><span>{d.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {screenState === 'order' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100 }}>
          <div style={{ maxWidth: '380px', width: '100%', background: 'white', borderRadius: '16px', padding: '20px', maxHeight: '85vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '17px', margin: 0 }}>অর্ডার সম্পন্ন করুন</h2>
              <button onClick={() => setScreenState('product')} style={{ border: 'none', background: 'none', fontSize: '20px' }}>✕</button>
            </div>
            <div style={{ display: 'flex', gap: '12px', padding: '12px', background: '#f7f7fb', borderRadius: '10px', marginBottom: '18px' }}>
              {content.image_url && <img src={content.image_url} alt="" style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />}
              <div>
                <p style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 4px' }}>{content.title}</p>
                <p style={{ fontSize: '15px', fontWeight: 'bold', color: theme, margin: 0 }}>{content.price}</p>
              </div>
            </div>
            <input type="text" placeholder="আপনার নাম" value={name} onChange={(e) => setName(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '8px' }} />
            <input type="text" placeholder="ফোন নাম্বার" value={phone} onChange={(e) => setPhone(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '8px' }} />
            <input type="text" placeholder="ঠিকানা" value={address} onChange={(e) => setAddress(e.target.value)} style={{ display: 'block', marginBottom: '16px', padding: '12px', width: '100%', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '8px' }} />
            <button onClick={handleConfirmOrder} style={{ padding: '15px', width: '100%', background: theme, color: 'white', border: 'none', borderRadius: '10px', fontSize: '15px', fontWeight: 'bold' }}>অর্ডার কনফার্ম করুন</button>
            <p style={{ textAlign: 'center', color: '#e74c3c' }}>{errMsg}</p>
          </div>
        </div>
      )}

      {screenState === 'thankyou' && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', zIndex: 100 }}>
          <div style={{ maxWidth: '340px', width: '100%', background: 'white', borderRadius: '16px', padding: '32px 24px', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#e8f8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', fontSize: '30px' }}>✓</div>
            <h2 style={{ fontSize: '18px' }}>ধন্যবাদ, আপনার অর্ডার সম্পন্ন হয়েছে</h2>
            <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.6' }}>আমরা শীঘ্রই আপনার সাথে ফোনে যোগাযোগ করে অর্ডারটি কনফার্ম করবো।</p>
            <div style={{ background: '#f7f7fb', borderRadius: '10px', padding: '14px', textAlign: 'left', margin: '20px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}><span style={{ color: '#888' }}>অর্ডার আইডি</span><span>#{orderId}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginTop: '6px' }}><span style={{ color: '#888' }}>মূল্য</span><span style={{ fontWeight: 'bold' }}>{content.price}</span></div>
            </div>
            <button onClick={() => { setScreenState('product'); setName(''); setPhone(''); setAddress('') }} style={{ padding: '13px', width: '100%', background: 'transparent', border: '1px solid #ddd', borderRadius: '10px', fontSize: '14px' }}>প্রোডাক্ট পেজে ফিরে যান</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
