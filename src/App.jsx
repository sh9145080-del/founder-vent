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
  const [price, setPrice] = useState('')
  const [buttonText, setButtonText] = useState('অর্ডার করুন')
  const [pageMessage, setPageMessage] = useState('')
  const [pages, setPages] = useState([])

  const loadClients = async () => {
    try {
      const res = await fetch('/api/clients')
      const data = await res.json()
      if (data.success) setClients(data.clients)
    } catch (err) {}
  }

  const loadPages = async () => {
    try {
      const res = await fetch('/api/pages')
      const data = await res.json()
      if (data.success) setPages(data.pages)
    } catch (err) {}
  }

  useEffect(() => { loadClients(); loadPages() }, [])

  const handleAddClient = async () => {
    setMessage('Adding...')
    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ client_name: clientName, email, password })
      })
      const data = await res.json()
      if (data.success) {
        setMessage('✅ Client Added Successfully')
        setClientName(''); setEmail(''); setPassword('')
        loadClients()
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (err) {
      setMessage('❌ Something went wrong')
    }
  }

  const handleCreatePage = async () => {
    setPageMessage('Creating...')
    if (!selectedClient) { setPageMessage('❌ Client Select করো'); return }
    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: selectedClient, page_name: pageName, page_url_slug: slug,
          title, description, image_url: imageUrl, price, button_text: buttonText
        })
      })
      const data = await res.json()
      if (data.success) {
        setPageMessage(`✅ Page তৈরি হয়েছে! URL: /p/${data.page_url_slug}`)
        setPageName(''); setSlug(''); setTitle(''); setDescription(''); setImageUrl(''); setPrice('')
        loadPages()
      } else {
        setPageMessage(`❌ ${data.error}`)
      }
    } catch (err) {
      setPageMessage('❌ Something went wrong')
    }
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
        <input type="text" placeholder="URL Slug (e.g. punching-bag)" value={slug} onChange={(e) => setSlug(e.target.value)} style={{ display: 'block', margin: '10px 0', padding: '10px', width: '100%', boxSizing: 'border-box' }} />
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
          <div key={c.client_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
            <strong>{c.client_name}</strong> — {c.email}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center' }}>সব Landing Page</h3>
        {pages.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Page নেই এখনো</p> : pages.map((p) => (
          <div key={p.page_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
            <strong>{p.page_name}</strong><br />
            <a href={`/p/${p.page_url_slug}`} target="_blank" rel="noreferrer">/p/{p.page_url_slug}</a>
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

  const handleLogin = async () => {
    setMessage('Checking...')
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (data.success) {
        setLoggedInClient(data.client)
        setMessage('')
        const pagesRes = await fetch(`/api/pages?client_id=${data.client.client_id}`)
        const pagesData = await pagesRes.json()
        if (pagesData.success) setMyPages(pagesData.pages)
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (err) {
      setMessage('❌ Something went wrong')
    }
  }

  if (loggedInClient) {
    return (
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1>Client Dashboard</h1>
        <p>স্বাগতম, <strong>{loggedInClient.client_name}</strong></p>
        <p>Email: {loggedInClient.email}</p>

        <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
          <h3 style={{ textAlign: 'center' }}>আমার Landing Pages</h3>
          {myPages.length === 0 ? <p style={{ textAlign: 'center' }}>কোনো Page নেই এখনো</p> : myPages.map((p) => (
            <div key={p.page_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
              <strong>{p.page_name}</strong><br />
              <a href={`/p/${p.page_url_slug}`} target="_blank" rel="noreferrer">/p/{p.page_url_slug}</a>
            </div>
          ))}
        </div>

        <button onClick={() => setLoggedInClient(null)} style={{ marginTop: '20px', padding: '8px 20px' }}>Logout</button>
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
        if (data.success) setPage(data.page)
        else setNotFound(true)
      })
      .catch(() => setNotFound(true))
  }, [slug])

  if (notFound) return <div style={{ padding: '40px', textAlign: 'center' }}><h2>পেজটি খুঁজে পাওয়া যায়নি</h2></div>
  if (!page) return <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>

  const content = JSON.parse(page.page_content)

  const handleOrder = async () => {
    if (!name || !phone) { setMessage('❌ নাম ও ফোন নাম্বার দাও'); return }
    setMessage('Submitting...')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: page.client_id, page_id: page.page_id,
          customer_name: name, customer_phone: phone, product_name: content.title, quantity: 1
        })
      })
      const data = await res.json()
      if (data.success) {
        setMessage('✅ অর্ডার সফল হয়েছে! আমরা শীঘ্রই যোগাযোগ করবো।')
        setName(''); setPhone('')
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (err) {
      setMessage('❌ কিছু ভুল হয়েছে')
    }
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
