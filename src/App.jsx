import { useEffect, useMemo, useState } from 'react'

/* =========================================================
   GLOBAL HELPERS
========================================================= */

const TEMPLATE_OPTIONS = [
  {
    id: 'aurora',
    name: 'Aurora Commerce',
    description: 'Clean, modern & versatile',
    icon: '✦',
  },
  {
    id: 'luxury',
    name: 'Luxury Product',
    description: 'Premium & minimalist',
    icon: '◇',
  },
  {
    id: 'conversion',
    name: 'High Conversion',
    description: 'Ad traffic focused',
    icon: '⚡',
  },
  {
    id: 'story',
    name: 'Story Commerce',
    description: 'Visual storytelling',
    icon: '◉',
  },
  {
    id: 'bold-sale',
    name: 'Bold Sale',
    description: 'Strong offer & urgency',
    icon: '🔥',
  },
]

const defaultDetails = [{ key: '', value: '' }]

const safeJsonParse = (value, fallback = {}) => {
  try {
    return typeof value === 'string' ? JSON.parse(value) : value || fallback
  } catch {
    return fallback
  }
}

const formatPrice = (value) => {
  if (!value) return ''
  return String(value)
}

const getTemplate = (id) => {
  return TEMPLATE_OPTIONS.find((t) => t.id === id) || TEMPLATE_OPTIONS[0]
}

/* =========================================================
   ROOT APP
========================================================= */

function App() {
  const path = window.location.pathname

  if (path.startsWith('/p/')) {
    const slug = decodeURIComponent(path.replace('/p/', ''))
    return <PublicLandingPage slug={slug} />
  }

  return <DashboardApp />
}

function DashboardApp() {
  const [view, setView] = useState('admin')

  return (
    <div style={styles.appShell}>
      <div style={styles.topNav}>
        <div style={styles.brandMini}>
          <div style={styles.brandMark}>FV</div>
          <div>
            <div style={{ fontWeight: 800 }}>Founder's Vent</div>
            <div style={{ fontSize: 11, color: '#777' }}>Landing Page Studio</div>
          </div>
        </div>

        <div style={styles.navButtons}>
          <button
            onClick={() => setView('admin')}
            style={view === 'admin' ? styles.navButtonActive : styles.navButton}
          >
            Admin Panel
          </button>

          <button
            onClick={() => setView('client')}
            style={view === 'client' ? styles.navButtonActive : styles.navButton}
          >
            Client Login
          </button>
        </div>
      </div>

      {view === 'admin' ? <AdminPanel /> : <ClientLogin />}
    </div>
  )
}

/* =========================================================
   ADMIN PANEL
========================================================= */

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

  const [detailRows, setDetailRows] = useState(defaultDetails)
  const [rating, setRating] = useState('5')
  const [reviewCount, setReviewCount] = useState('0')

  const [templateStyle, setTemplateStyle] = useState('aurora')

  const [pageMessage, setPageMessage] = useState('')
  const [pages, setPages] = useState([])

  const loadClients = async () => {
    try {
      const res = await fetch('/api/clients')
      const data = await res.json()
      if (data.success) setClients(data.clients || [])
    } catch {}
  }

  const loadPages = async () => {
    try {
      const res = await fetch('/api/pages')
      const data = await res.json()
      if (data.success) setPages(data.pages || [])
    } catch {}
  }

  useEffect(() => {
    loadClients()
    loadPages()
  }, [])

  const handleAddClient = async () => {
    if (!clientName || !email || !password) {
      setMessage('❌ সব তথ্য পূরণ করো')
      return
    }

    setMessage('Adding...')

    try {
      const res = await fetch('/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName,
          email,
          password,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setMessage('✅ Client Added Successfully')
        setClientName('')
        setEmail('')
        setPassword('')
        loadClients()
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch {
      setMessage('❌ Something went wrong')
    }
  }

  const uploadImage = async (file, type) => {
    if (!file) return

    if (type === 'logo') setUploadingLogo(true)
    else setUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        if (type === 'logo') setLogoUrl(data.image_url)
        else setImageUrl(data.image_url)
      } else {
        alert('Upload failed: ' + data.error)
      }
    } catch {
      alert('Upload failed')
    }

    if (type === 'logo') setUploadingLogo(false)
    else setUploading(false)
  }

  const handleImageUpload = (e) => {
    uploadImage(e.target.files?.[0], 'product')
  }

  const handleLogoUpload = (e) => {
    uploadImage(e.target.files?.[0], 'logo')
  }

  const addDetailRow = () => {
    setDetailRows((prev) => [...prev, { key: '', value: '' }])
  }

  const updateDetailRow = (i, field, value) => {
    setDetailRows((prev) => {
      const updated = [...prev]
      updated[i] = {
        ...updated[i],
        [field]: value,
      }
      return updated
    })
  }

  const removeDetailRow = (i) => {
    setDetailRows((prev) => {
      const next = prev.filter((_, idx) => idx !== i)
      return next.length ? next : [{ key: '', value: '' }]
    })
  }

  const handleCreatePage = async () => {
    if (!selectedClient) {
      setPageMessage('❌ Client Select করো')
      return
    }

    if (!pageName || !slug || !title) {
      setPageMessage('❌ Page Name, Slug এবং Product Title দিতে হবে')
      return
    }

    setPageMessage('Creating...')

    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: selectedClient,
          page_name: pageName,
          page_url_slug: slug,
          title,
          description,
          image_url: imageUrl,
          price,
          original_price: originalPrice,
          button_text: buttonText,

          template_style: templateStyle,

          logo_url: logoUrl,
          theme_color: themeColor,

          rating,
          review_count: reviewCount,

          details: detailRows.filter((d) => d.key && d.value),
        }),
      })

      const data = await res.json()

      if (data.success) {
        setPageMessage(
          `✅ Page তৈরি হয়েছে! URL: /p/${data.page_url_slug}`
        )

        setPageName('')
        setSlug('')
        setTitle('')
        setDescription('')
        setImageUrl('')
        setPrice('')
        setOriginalPrice('')
        setLogoUrl('')
        setDetailRows(defaultDetails)
        setRating('5')
        setReviewCount('0')
        setTemplateStyle('aurora')

        loadPages()
      } else {
        setPageMessage(`❌ ${data.error}`)
      }
    } catch {
      setPageMessage('❌ Something went wrong')
    }
  }

  return (
    <div style={styles.adminContainer}>
      <div style={styles.pageHeader}>
        <div>
          <div style={styles.eyebrow}>LANDING PAGE STUDIO</div>
          <h1 style={styles.pageTitle}>Admin Dashboard</h1>
          <p style={styles.pageSubtitle}>
            Create premium conversion-focused landing pages for your clients.
          </p>
        </div>
      </div>

      <div style={styles.adminGrid}>
        {/* ADD CLIENT */}
        <section style={styles.card}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardEyebrow}>CLIENT MANAGEMENT</div>
              <h2 style={styles.cardTitle}>নতুন Client যোগ করো</h2>
            </div>
          </div>

          <input
            type="text"
            placeholder="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            style={styles.input}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />

          <button onClick={handleAddClient} style={styles.primaryButton}>
            Add Client
          </button>

          {message && <p style={styles.statusText}>{message}</p>}
        </section>

        {/* PAGE CREATOR */}
        <section style={{ ...styles.card, gridColumn: '1 / -1' }}>
          <div style={styles.cardHeader}>
            <div>
              <div style={styles.cardEyebrow}>PAGE BUILDER</div>
              <h2 style={styles.cardTitle}>নতুন Landing Page তৈরি করো</h2>
              <p style={styles.cardSubtitle}>
                Choose a premium template and customize the content.
              </p>
            </div>
          </div>

          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Client</label>

              <select
                value={selectedClient}
                onChange={(e) => setSelectedClient(e.target.value)}
                style={styles.input}
              >
                <option value="">-- Client বাছাই করো --</option>

                {clients.map((c) => (
                  <option key={c.client_id} value={c.client_id}>
                    {c.client_name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label style={styles.label}>Page Name</label>

              <input
                type="text"
                placeholder="Product Landing Page"
                value={pageName}
                onChange={(e) => setPageName(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <label style={styles.label}>URL Slug</label>

          <input
            type="text"
            placeholder="baby-bath-tub"
            value={slug}
            onChange={(e) =>
              setSlug(
                e.target.value
                  .toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/[^a-z0-9-_]/g, '')
              )
            }
            style={styles.input}
          />

          {/* TEMPLATE SELECTOR */}
          <TemplateSelector
            selected={templateStyle}
            onSelect={setTemplateStyle}
          />

          {/* BRAND */}
          <div style={styles.sectionDivider}>
            <span>Brand & Appearance</span>
          </div>

          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Brand Logo</label>

              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={styles.fileInput}
              />

              {uploadingLogo && (
                <div style={styles.miniLoading}>Uploading logo...</div>
              )}

              {logoUrl && (
                <div style={styles.logoPreview}>
                  <img
                    src={logoUrl}
                    alt="logo"
                    style={{ maxHeight: 45, maxWidth: 180 }}
                  />
                </div>
              )}
            </div>

            <div>
              <label style={styles.label}>Theme Color</label>

              <div style={styles.colorRow}>
                <input
                  type="color"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  style={styles.colorPicker}
                />

                <input
                  type="text"
                  value={themeColor}
                  onChange={(e) => setThemeColor(e.target.value)}
                  style={{ ...styles.input, marginBottom: 0 }}
                />
              </div>
            </div>
          </div>

          {/* PRODUCT */}
          <div style={styles.sectionDivider}>
            <span>Product Information</span>
          </div>

          <label style={styles.label}>Product Title</label>

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
          />

          <label style={styles.label}>Description</label>

          <textarea
            placeholder="Write a compelling product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
          />

          <label style={styles.label}>Product Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={styles.fileInput}
          />

          {uploading && (
            <div style={styles.miniLoading}>Uploading product image...</div>
          )}

          {imageUrl && (
            <div style={styles.uploadPreview}>
              <img src={imageUrl} alt="preview" />
            </div>
          )}

          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Selling Price</label>

              <input
                type="text"
                placeholder="999"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Original Price</label>

              <input
                type="text"
                placeholder="1699"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.formGrid}>
            <div>
              <label style={styles.label}>Button Text</label>

              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Rating</label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={styles.input}
              >
                <option value="5">★★★★★ — 5</option>
                <option value="4">★★★★☆ — 4</option>
                <option value="3">★★★☆☆ — 3</option>
                <option value="2">★★☆☆☆ — 2</option>
                <option value="1">★☆☆☆☆ — 1</option>
              </select>
            </div>
          </div>

          <label style={styles.label}>Review Count</label>

          <input
            type="number"
            placeholder="128"
            value={reviewCount}
            onChange={(e) => setReviewCount(e.target.value)}
            style={styles.input}
          />

          {/* DETAILS */}
          <div style={styles.sectionDivider}>
            <span>Product Details</span>
          </div>

          {detailRows.map((row, i) => (
            <div key={i} style={styles.detailRow}>
              <input
                type="text"
                placeholder="যেমন: ম্যাটেরিয়াল"
                value={row.key}
                onChange={(e) =>
                  updateDetailRow(i, 'key', e.target.value)
                }
                style={styles.input}
              />

              <input
                type="text"
                placeholder="যেমন: Premium Plastic"
                value={row.value}
                onChange={(e) =>
                  updateDetailRow(i, 'value', e.target.value)
                }
                style={styles.input}
              />

              <button
                onClick={() => removeDetailRow(i)}
                style={styles.removeButton}
              >
                ×
              </button>
            </div>
          ))}

          <button onClick={addDetailRow} style={styles.secondaryButton}>
            + আরেকটা তথ্য যোগ করো
          </button>

          <button
            onClick={handleCreatePage}
            style={{
              ...styles.publishButton,
              background: themeColor,
            }}
          >
            <span>Publish Premium Landing Page</span>
            <span>→</span>
          </button>

          {pageMessage && (
            <div style={styles.publishMessage}>{pageMessage}</div>
          )}
        </section>
      </div>

      {/* CLIENT LIST */}
      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <div style={styles.cardEyebrow}>CLIENTS</div>
            <h2 style={styles.cardTitle}>সব Client</h2>
          </div>

          <div style={styles.countBadge}>{clients.length}</div>
        </div>

        {clients.length === 0 ? (
          <EmptyState text="কোনো Client নেই এখনো" />
        ) : (
          <div style={styles.list}>
            {clients.map((c) => (
              <div key={c.client_id} style={styles.listItem}>
                <div style={styles.avatar}>
                  {(c.client_name || 'C').charAt(0).toUpperCase()}
                </div>

                <div style={{ flex: 1 }}>
                  <strong>{c.client_name}</strong>
                  <div style={styles.muted}>{c.email}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* PAGES */}
      <section style={styles.card}>
        <div style={styles.cardHeader}>
          <div>
            <div style={styles.cardEyebrow}>LANDING PAGES</div>
            <h2 style={styles.cardTitle}>সব Landing Page</h2>
          </div>

          <div style={styles.countBadge}>{pages.length}</div>
        </div>

        {pages.length === 0 ? (
          <EmptyState text="কোনো Page নেই এখনো" />
        ) : (
          <div style={styles.list}>
            {pages.map((p) => {
              const template = getTemplate(p.template_style)

              return (
                <div key={p.page_id} style={styles.pageListItem}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800 }}>
                      {p.page_name}
                    </div>

                    <div style={styles.pageMeta}>
                      {template.icon} {template.name}
                    </div>

                    <a
                      href={`/p/${p.page_url_slug}`}
                      target="_blank"
                      rel="noreferrer"
                      style={styles.pageLink}
                    >
                      /p/{p.page_url_slug} ↗
                    </a>
                  </div>

                  <div
                    style={{
                      ...styles.templateDot,
                      background:
                        template.id === 'luxury'
                          ? '#111'
                          : template.id === 'bold-sale'
                          ? '#ef4444'
                          : themeColor,
                    }}
                  />
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

/* =========================================================
   TEMPLATE SELECTOR
========================================================= */

function TemplateSelector({ selected, onSelect }) {
  return (
    <div style={styles.templateSection}>
      <div style={styles.templateHeader}>
        <div>
          <div style={styles.cardEyebrow}>DESIGN SYSTEM</div>
          <h3 style={styles.templateTitle}>Landing Page Template</h3>
          <p style={styles.templateSubtitle}>
            Choose the layout that best matches the client's product.
          </p>
        </div>

        <div style={styles.selectedTemplateBadge}>
          {getTemplate(selected).icon} {getTemplate(selected).name}
        </div>
      </div>

      <div style={styles.templateGrid}>
        {TEMPLATE_OPTIONS.map((template) => {
          const active = selected === template.id

          return (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              style={{
                ...styles.templateCard,
                ...(active ? styles.templateCardActive : {}),
              }}
            >
              <TemplateMiniPreview
                type={template.id}
                active={active}
              />

              <div style={styles.templateCardBottom}>
                <div>
                  <div style={styles.templateName}>
                    {template.icon} {template.name}
                  </div>

                  <div style={styles.templateDesc}>
                    {template.description}
                  </div>
                </div>

                <div
                  style={{
                    ...styles.radio,
                    ...(active ? styles.radioActive : {}),
                  }}
                >
                  {active ? '✓' : ''}
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TemplateMiniPreview({ type, active }) {
  const base = {
    borderRadius: 14,
    height: 155,
    overflow: 'hidden',
    position: 'relative',
    background: '#f5f5f5',
    border: active
      ? '2px solid rgba(0,0,0,.12)'
      : '1px solid #eee',
  }

  if (type === 'luxury') {
    return (
      <div style={{ ...base, background: '#111' }}>
        <div
          style={{
            height: 95,
            margin: 12,
            borderRadius: 10,
            background:
              'linear-gradient(135deg,#2a2a2a,#555)',
          }}
        />

        <div
          style={{
            height: 7,
            width: '58%',
            background: '#fff',
            marginLeft: 14,
            borderRadius: 10,
          }}
        />

        <div
          style={{
            height: 6,
            width: '35%',
            background: '#777',
            margin: '8px 14px',
            borderRadius: 10,
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 14,
            bottom: 12,
            width: 55,
            height: 18,
            borderRadius: 20,
            background: '#fff',
          }}
        />
      </div>
    )
  }

  if (type === 'conversion') {
    return (
      <div style={{ ...base, background: '#fff7f2' }}>
        <div
          style={{
            height: 22,
            background: '#111',
          }}
        />

        <div
          style={{
            height: 72,
            margin: 12,
            borderRadius: 12,
            background: 'linear-gradient(135deg,#ff8a5b,#ffb36b)',
          }}
        />

        <div
          style={{
            height: 7,
            width: '70%',
            background: '#222',
            marginLeft: 14,
            borderRadius: 10,
          }}
        />

        <div
          style={{
            height: 6,
            width: '45%',
            background: '#bbb',
            margin: '8px 14px',
            borderRadius: 10,
          }}
        />

        <div
          style={{
            position: 'absolute',
            bottom: 10,
            left: 14,
            right: 14,
            height: 22,
            borderRadius: 8,
            background: '#ff6b35',
          }}
        />
      </div>
    )
  }

  if (type === 'story') {
    return (
      <div style={{ ...base, background: '#eef7f3' }}>
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: '50%',
            background: '#d7e9e1',
            margin: '12px auto',
          }}
        />

        <div
          style={{
            height: 7,
            width: '50%',
            background: '#1d3d32',
            margin: '0 auto',
            borderRadius: 10,
          }}
        />

        <div
          style={{
            height: 6,
            width: '65%',
            background: '#a5b9b0',
            margin: '8px auto',
            borderRadius: 10,
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: 7,
            margin: '15px 12px',
          }}
        >
          {[1, 2, 3].map((x) => (
            <div
              key={x}
              style={{
                flex: 1,
                height: 24,
                borderRadius: 7,
                background: '#d7e9e1',
              }}
            />
          ))}
        </div>
      </div>
    )
  }

  if (type === 'bold-sale') {
    return (
      <div style={{ ...base, background: '#fafafa' }}>
        <div
          style={{
            height: 30,
            background: '#ef3340',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 9,
            fontWeight: 900,
          }}
        >
          SPECIAL OFFER
        </div>

        <div
          style={{
            height: 66,
            margin: 10,
            borderRadius: 8,
            background:
              'linear-gradient(135deg,#222,#777)',
          }}
        />

        <div
          style={{
            height: 9,
            width: '60%',
            background: '#111',
            marginLeft: 12,
            borderRadius: 10,
          }}
        />

        <div
          style={{
            height: 6,
            width: '35%',
            background: '#aaa',
            margin: '6px 12px',
            borderRadius: 10,
          }}
        />

        <div
          style={{
            position: 'absolute',
            right: 12,
            bottom: 12,
            background: '#ef3340',
            width: 62,
            height: 20,
            borderRadius: 6,
          }}
        />
      </div>
    )
  }

  return (
    <div style={{ ...base, background: '#eef3ff' }}>
      <div
        style={{
          height: 95,
          margin: 12,
          borderRadius: 12,
          background:
            'linear-gradient(135deg,#8ba7ff,#d5ddff)',
        }}
      />

      <div
        style={{
          height: 8,
          width: '62%',
          background: '#1c2850',
          marginLeft: 14,
          borderRadius: 10,
        }}
      />

      <div
        style={{
          height: 6,
          width: '40%',
          background: '#9aa5c4',
          margin: '8px 14px',
          borderRadius: 10,
        }}
      />

      <div
        style={{
          position: 'absolute',
          right: 14,
          bottom: 12,
          width: 65,
          height: 20,
          background: '#546dff',
          borderRadius: 8,
        }}
      />
    </div>
  )
}

/* =========================================================
   CLIENT LOGIN
========================================================= */

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
    if (!email || !password) {
      setMessage('❌ Email এবং Password দাও')
      return
    }

    setMessage('Checking...')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setLoggedInClient(data.client)
        setMessage('')
        loadClientData(data.client.client_id)
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch {
      setMessage('❌ Something went wrong')
    }
  }

  const loadClientData = async (client_id) => {
    try {
      const pagesRes = await fetch(`/api/pages?client_id=${client_id}`)
      const pagesData = await pagesRes.json()

      if (pagesData.success) {
        setMyPages(pagesData.pages || [])
      }
    } catch {}

    await refreshOrders(client_id)

    try {
      const trackingRes = await fetch(
        `/api/tracking?client_id=${client_id}`
      )

      const trackingData = await trackingRes.json()

      if (trackingData.success && trackingData.tracking) {
        setMetaPixel(trackingData.tracking.meta_pixel_id || '')
        setGa4(trackingData.tracking.ga4_id || '')
        setFbCapi(trackingData.tracking.fb_capi_token || '')
        setTiktokPixel(
          trackingData.tracking.tiktok_pixel_id || ''
        )
      }
    } catch {}
  }

  const refreshOrders = async (client_id) => {
    try {
      const ordersRes = await fetch(
        `/api/orders?client_id=${client_id}`
      )

      const ordersData = await ordersRes.json()

      if (ordersData.success) {
        setOrders(ordersData.orders || [])
      }
    } catch {}
  }

  const handleUpdateStatus = async (order_id, newStatus) => {
    try {
      await fetch('/api/orders/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order_id,
          order_status: newStatus,
        }),
      })

      refreshOrders(loggedInClient.client_id)
    } catch {}
  }

  const handleSaveTracking = async () => {
    setTrackingMsg('Saving...')

    try {
      const res = await fetch('/api/tracking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: loggedInClient.client_id,
          meta_pixel_id: metaPixel,
          ga4_id: ga4,
          fb_capi_token: fbCapi,
          tiktok_pixel_id: tiktokPixel,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setTrackingMsg('✅ Tracking Settings Saved')
      } else {
        setTrackingMsg(`❌ ${data.error}`)
      }
    } catch {
      setTrackingMsg('❌ Something went wrong')
    }
  }

  const handleSaveDomain = async () => {
    setDomainMsg('Saving...')

    try {
      const res = await fetch('/api/domain', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: loggedInClient.client_id,
          domain,
        }),
      })

      const data = await res.json()

      if (data.success) {
        setDomainMsg('✅ Domain সংরক্ষিত হয়েছে।')
      } else {
        setDomainMsg(`❌ ${data.error}`)
      }
    } catch {
      setDomainMsg('❌ Something went wrong')
    }
  }

  if (loggedInClient) {
    return (
      <div style={styles.clientDashboard}>
        <div style={styles.clientHero}>
          <div>
            <div style={styles.eyebrow}>CLIENT PORTAL</div>
            <h1 style={{ ...styles.pageTitle, marginBottom: 4 }}>
              Welcome back
            </h1>

            <p style={styles.pageSubtitle}>
              স্বাগতম,{' '}
              <strong>{loggedInClient.client_name}</strong>
            </p>
          </div>

          <button
            onClick={() => setLoggedInClient(null)}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>

        <div style={styles.tabs}>
          {[
            ['pages', 'Pages'],
            ['orders', 'Orders'],
            ['tracking', 'Tracking'],
            ['domain', 'Domain'],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={tab === id ? styles.tabActive : styles.tab}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === 'pages' && (
          <div style={styles.dashboardCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardEyebrow}>YOUR PAGES</div>
                <h3 style={styles.cardTitle}>
                  আমার Landing Pages
                </h3>
              </div>

              <div style={styles.countBadge}>{myPages.length}</div>
            </div>

            {myPages.length === 0 ? (
              <EmptyState text="কোনো Page নেই এখনো" />
            ) : (
              <div style={styles.list}>
                {myPages.map((p) => {
                  const template = getTemplate(p.template_style)

                  return (
                    <div
                      key={p.page_id}
                      style={styles.pageListItem}
                    >
                      <div style={{ flex: 1 }}>
                        <strong>{p.page_name}</strong>

                        <div style={styles.pageMeta}>
                          {template.icon} {template.name}
                        </div>

                        <a
                          href={`/p/${p.page_url_slug}`}
                          target="_blank"
                          rel="noreferrer"
                          style={styles.pageLink}
                        >
                          Open Page ↗
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'orders' && (
          <div style={styles.dashboardCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardEyebrow}>SALES</div>
                <h3 style={styles.cardTitle}>আমার Orders</h3>
              </div>

              <div style={styles.countBadge}>{orders.length}</div>
            </div>

            {orders.length === 0 ? (
              <EmptyState text="কোনো Order নেই এখনো" />
            ) : (
              <div style={styles.list}>
                {orders.map((o) => (
                  <div
                    key={o.order_id}
                    style={styles.orderCard}
                  >
                    <div style={styles.orderTop}>
                      <div>
                        <strong>{o.customer_name}</strong>
                        <div style={styles.muted}>
                          {o.customer_phone}
                        </div>
                      </div>

                      <div style={styles.orderId}>
                        #{o.order_id}
                      </div>
                    </div>

                    <div style={styles.orderProduct}>
                      {o.product_name} · Qty {o.quantity}
                    </div>

                    <select
                      value={o.order_status}
                      onChange={(e) =>
                        handleUpdateStatus(
                          o.order_id,
                          e.target.value
                        )
                      }
                      style={styles.input}
                    >
                      {[
                        'pending',
                        'confirmed',
                        'shipped',
                        'delivered',
                        'cancelled',
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'tracking' && (
          <div style={styles.dashboardCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardEyebrow}>ANALYTICS</div>
                <h3 style={styles.cardTitle}>
                  Tracking Settings
                </h3>
              </div>
            </div>

            <label style={styles.label}>Meta Pixel ID</label>

            <input
              type="text"
              value={metaPixel}
              onChange={(e) => setMetaPixel(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>GA4 Measurement ID</label>

            <input
              type="text"
              value={ga4}
              onChange={(e) => setGa4(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>
              Facebook CAPI Token
            </label>

            <input
              type="password"
              value={fbCapi}
              onChange={(e) => setFbCapi(e.target.value)}
              style={styles.input}
            />

            <label style={styles.label}>TikTok Pixel ID</label>

            <input
              type="text"
              value={tiktokPixel}
              onChange={(e) =>
                setTiktokPixel(e.target.value)
              }
              style={styles.input}
            />

            <button
              onClick={handleSaveTracking}
              style={styles.primaryButton}
            >
              Save Tracking Settings
            </button>

            {trackingMsg && (
              <p style={styles.statusText}>{trackingMsg}</p>
            )}
          </div>
        )}

        {tab === 'domain' && (
          <div style={styles.dashboardCard}>
            <div style={styles.cardHeader}>
              <div>
                <div style={styles.cardEyebrow}>DOMAIN</div>
                <h3 style={styles.cardTitle}>Custom Domain</h3>
              </div>
            </div>

            <label style={styles.label}>
              আপনার Domain
            </label>

            <input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              style={styles.input}
            />

            <button
              onClick={handleSaveDomain}
              style={styles.primaryButton}
            >
              Save Domain
            </button>

            {domainMsg && (
              <p style={styles.statusText}>{domainMsg}</p>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={styles.loginPage}>
      <div style={styles.loginCard}>
        <div style={styles.loginLogo}>FV</div>

        <div style={styles.eyebrow}>CLIENT PORTAL</div>

        <h1 style={styles.loginTitle}>Welcome back</h1>

        <p style={styles.loginSubtitle}>
          Login to manage your landing pages and orders.
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button
          onClick={handleLogin}
          style={styles.primaryButton}
        >
          Login
        </button>

        {message && (
          <p style={styles.statusText}>{message}</p>
        )}
      </div>
    </div>
  )
}

/* =========================================================
   PUBLIC LANDING PAGE
========================================================= */

function PublicLandingPage({ slug }) {
  const [page, setPage] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const [screenState, setScreenState] = useState('product')
  const [orderId, setOrderId] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let mounted = true

    fetch(`/api/page/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return

        if (data.success) {
          setPage(data.page)

          if (
            data.tracking &&
            data.tracking.meta_pixel_id
          ) {
            injectMetaPixel(
              data.tracking.meta_pixel_id
            )
          }

          if (
            data.tracking &&
            data.tracking.ga4_id
          ) {
            injectGA4(data.tracking.ga4_id)
          }
        } else {
          setNotFound(true)
        }
      })
      .catch(() => {
        if (mounted) setNotFound(true)
      })

    return () => {
      mounted = false
    }
  }, [slug])

  const injectMetaPixel = (pixelId) => {
    if (!pixelId || window.fbq) return

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
    if (!ga4Id) return

    const script1 = document.createElement('script')
    script1.async = true
    script1.src =
      `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`

    document.head.appendChild(script1)

    const script2 = document.createElement('script')

    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${ga4Id}');
    `

    document.head.appendChild(script2)
  }

  const openOrder = () => {
    setErrMsg('')
    setScreenState('order')

    setTimeout(() => {
      document
        .querySelector('[data-order-name]')
        ?.focus()
    }, 350)
  }

  const closeOrder = () => {
    if (submitting) return
    setScreenState('product')
    setErrMsg('')
  }

  const handleConfirmOrder = async () => {
    if (!name.trim() || !phone.trim()) {
      setErrMsg('নাম ও ফোন নাম্বার দিন')
      return
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setErrMsg('সঠিক ফোন নাম্বার দিন')
      return
    }

    setSubmitting(true)
    setErrMsg('')

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: page.client_id,
          page_id: page.page_id,
          customer_name: name,
          customer_phone: phone,
          customer_address: address,
          product_name: content.title,
          quantity: 1,
        }),
      })

      const data = await res.json()

      if (data.success) {
        if (window.fbq) {
          window.fbq('track', 'Lead')
        }

        if (window.gtag) {
          window.gtag('event', 'generate_lead')
        }

        setOrderId(data.order_id)
        setScreenState('thankyou')
        setErrMsg('')
      } else {
        setErrMsg(data.error || 'অর্ডার সম্পন্ন করা যায়নি')
      }
    } catch {
      setErrMsg('কিছু ভুল হয়েছে। আবার চেষ্টা করুন।')
    }

    setSubmitting(false)
  }

  if (notFound) {
    return <NotFoundPage />
  }

  if (!page) {
    return <LoadingPage />
  }

  const content = safeJsonParse(page.page_content, {})

  const template =
    content.template_style ||
    page.template_style ||
    'aurora'

  const theme = content.theme_color || '#e74c3c'

  const commonProps = {
    content,
    theme,
    openOrder,
    orderId,
  }

  return (
    <>
      {template === 'luxury' && (
        <LuxuryTemplate {...commonProps} />
      )}

      {template === 'conversion' && (
        <ConversionTemplate {...commonProps} />
      )}

      {template === 'story' && (
        <StoryTemplate {...commonProps} />
      )}

      {template === 'bold-sale' && (
        <BoldSaleTemplate {...commonProps} />
      )}

      {template === 'aurora' && (
        <AuroraTemplate {...commonProps} />
      )}

      {screenState === 'order' && (
        <PremiumOrderModal
          content={content}
          theme={theme}
          name={name}
          phone={phone}
          address={address}
          setName={setName}
          setPhone={setPhone}
          setAddress={setAddress}
          onClose={closeOrder}
          onSubmit={handleConfirmOrder}
          error={errMsg}
          submitting={submitting}
        />
      )}

      {screenState === 'thankyou' && (
        <SuccessModal
          content={content}
          theme={theme}
          orderId={orderId}
          onClose={() => {
            setScreenState('product')
            setName('')
            setPhone('')
            setAddress('')
          }}
        />
      )}

      <style>{publicCSS}</style>
    </>
  )
}

/* =========================================================
   TEMPLATE 01 — AURORA
========================================================= */

function AuroraTemplate({ content, theme, openOrder }) {
  return (
    <div
      style={{
        ...publicStyles.page,
        background:
          'linear-gradient(180deg,#f7f9ff 0%,#ffffff 45%,#f8f9fc 100%)',
      }}
    >
      <div style={publicStyles.auroraGlow} />

      <header style={publicStyles.publicHeader}>
        {content.logo_url ? (
          <img
            src={content.logo_url}
            alt="logo"
            style={publicStyles.logo}
          />
        ) : (
          <div style={publicStyles.textLogo}>
            {content.title}
          </div>
        )}
      </header>

      <main>
        <div style={publicStyles.auroraHero}>
          <div style={publicStyles.imageFrame}>
            {content.image_url ? (
              <img
                src={content.image_url}
                alt={content.title}
                style={publicStyles.heroImage}
              />
            ) : (
              <div style={publicStyles.imagePlaceholder}>
                Product
              </div>
            )}

            {content.original_price && (
              <div
                style={{
                  ...publicStyles.floatingOffer,
                  background: theme,
                }}
              >
                SPECIAL OFFER
              </div>
            )}
          </div>

          <div style={publicStyles.contentPadding}>
            <RatingRow content={content} theme={theme} />

            <h1 style={publicStyles.heroTitle}>
              {content.title}
            </h1>

            <p style={publicStyles.heroDescription}>
              {content.description}
            </p>

            <PriceBlock
              content={content}
              theme={theme}
            />

            <TrustGrid />

            <button
              onClick={openOrder}
              style={{
                ...publicStyles.mainCTA,
                background: theme,
              }}
            >
              <span>
                {content.button_text ||
                  'এখনই অর্ডার করুন'}
              </span>
              <span>→</span>
            </button>

            <ProductDetails
              content={content}
              theme={theme}
            />
          </div>
        </div>
      </main>

      <StickyCTA
        theme={theme}
        text={content.button_text}
        onClick={openOrder}
      />
    </div>
  )
}

/* =========================================================
   TEMPLATE 02 — LUXURY
========================================================= */

function LuxuryTemplate({ content, theme, openOrder }) {
  return (
    <div style={luxuryStyles.page}>
      <header style={luxuryStyles.header}>
        {content.logo_url ? (
          <img
            src={content.logo_url}
            alt="logo"
            style={luxuryStyles.logo}
          />
        ) : (
          <div style={luxuryStyles.logoText}>
            {content.title}
          </div>
        )}
      </header>

      <main>
        <section style={luxuryStyles.hero}>
          <div style={luxuryStyles.heroImageWrap}>
            {content.image_url ? (
              <img
                src={content.image_url}
                alt={content.title}
                style={luxuryStyles.heroImage}
              />
            ) : (
              <div style={luxuryStyles.darkPlaceholder}>
                Product
              </div>
            )}
          </div>

          <div style={luxuryStyles.info}>
            <div style={luxuryStyles.luxuryEyebrow}>
              SIGNATURE COLLECTION
            </div>

            <h1 style={luxuryStyles.title}>
              {content.title}
            </h1>

            <p style={luxuryStyles.description}>
              {content.description}
            </p>

            <RatingRow
              content={content}
              theme="#fff"
              dark
            />

            <div style={luxuryStyles.priceRow}>
              <span style={luxuryStyles.price}>
                {formatPrice(content.price)}
              </span>

              {content.original_price && (
                <span style={luxuryStyles.oldPrice}>
                  {formatPrice(
                    content.original_price
                  )}
                </span>
              )}
            </div>

            <button
              onClick={openOrder}
              style={{
                ...luxuryStyles.cta,
                borderColor: theme,
                background: theme,
              }}
            >
              {content.button_text ||
                'অর্ডার করুন'}{' '}
              <span>→</span>
            </button>

            <div style={luxuryStyles.guarantee}>
              <span>✓</span>
              Secure Order
            </div>
          </div>
        </section>

        <section style={luxuryStyles.detailsSection}>
          <div style={luxuryStyles.detailsInner}>
            <div>
              <div style={luxuryStyles.sectionNumber}>
                01
              </div>
              <h2 style={luxuryStyles.sectionTitle}>
                Designed for those who value quality.
              </h2>
            </div>

            <ProductDetails
              content={content}
              theme={theme}
              dark
            />
          </div>
        </section>
      </main>

      <StickyCTA
        theme={theme}
        text={content.button_text}
        onClick={openOrder}
      />
    </div>
  )
}

/* =========================================================
   TEMPLATE 03 — HIGH CONVERSION
========================================================= */

function ConversionTemplate({
  content,
  theme,
  openOrder,
}) {
  return (
    <div style={conversionStyles.page}>
      <div
        style={{
          ...conversionStyles.topOffer,
          background: theme,
        }}
      >
        🚚 ক্যাশ অন ডেলিভারি · সীমিত সময়ের অফার
      </div>

      <header style={conversionStyles.header}>
        {content.logo_url ? (
          <img
            src={content.logo_url}
            alt="logo"
            style={conversionStyles.logo}
          />
        ) : (
          <div style={conversionStyles.logoText}>
            {content.title}
          </div>
        )}
      </header>

      <main>
        <section style={conversionStyles.hero}>
          <div style={conversionStyles.imageWrap}>
            {content.image_url ? (
              <img
                src={content.image_url}
                alt={content.title}
                style={conversionStyles.image}
              />
            ) : (
              <div style={conversionStyles.placeholder}>
                Product
              </div>
            )}

            {content.original_price && (
              <div
                style={{
                  ...conversionStyles.discount,
                  background: theme,
                }}
              >
                SALE
              </div>
            )}
          </div>

          <div style={conversionStyles.content}>
            <RatingRow content={content} theme={theme} />

            <h1 style={conversionStyles.title}>
              {content.title}
            </h1>

            <p style={conversionStyles.description}>
              {content.description}
            </p>

            <PriceBlock
              content={content}
              theme={theme}
            />

            <div style={conversionStyles.benefits}>
              <Benefit
                icon="✓"
                title="Premium Quality"
                text="Quality checked product"
              />

              <Benefit
                icon="🚚"
                title="Cash on Delivery"
                text="অর্ডার করে পেমেন্ট করুন"
              />

              <Benefit
                icon="↻"
                title="Easy Support"
                text="প্রয়োজনে আমাদের সাথে যোগাযোগ করুন"
              />
            </div>

            <button
              onClick={openOrder}
              style={{
                ...conversionStyles.cta,
                background: theme,
              }}
            >
              {content.button_text ||
                'এখনই অর্ডার করুন'}
              <span>→</span>
            </button>

            <div style={conversionStyles.reassurance}>
              🔒 আপনার তথ্য নিরাপদ রাখা হবে
            </div>
          </div>
        </section>

        <section style={conversionStyles.whiteSection}>
          <div style={conversionStyles.sectionInner}>
            <div style={conversionStyles.sectionHeading}>
              কেন এই প্রোডাক্টটি আপনার জন্য?
            </div>

            <ProductDetails
              content={content}
              theme={theme}
            />
          </div>
        </section>
      </main>

      <StickyCTA
        theme={theme}
        text={content.button_text}
        onClick={openOrder}
      />
    </div>
  )
}

/* =========================================================
   TEMPLATE 04 — STORY
========================================================= */

function StoryTemplate({ content, theme, openOrder }) {
  return (
    <div style={storyStyles.page}>
      <header style={storyStyles.header}>
        {content.logo_url ? (
          <img
            src={content.logo_url}
            alt="logo"
            style={storyStyles.logo}
          />
        ) : (
          <div style={storyStyles.logoText}>
            {content.title}
          </div>
        )}
      </header>

      <section style={storyStyles.hero}>
        <div style={storyStyles.heroImageWrap}>
          {content.image_url ? (
            <img
              src={content.image_url}
              alt={content.title}
              style={storyStyles.heroImage}
            />
          ) : (
            <div style={storyStyles.placeholder}>
              Product
            </div>
          )}
        </div>

        <div style={storyStyles.heroContent}>
          <div style={storyStyles.smallLabel}>
            MADE FOR EVERYDAY LIFE
          </div>

          <h1 style={storyStyles.title}>
            {content.title}
          </h1>

          <p style={storyStyles.description}>
            {content.description}
          </p>

          <RatingRow
            content={content}
            theme={theme}
          />

          <PriceBlock
            content={content}
            theme={theme}
          />

          <button
            onClick={openOrder}
            style={{
              ...storyStyles.cta,
              background: theme,
            }}
          >
            {content.button_text ||
              'অর্ডার করুন'}{' '}
            <span>→</span>
          </button>
        </div>
      </section>

      <section style={storyStyles.storySection}>
        <div style={storyStyles.storyNumber}>01</div>

        <h2 style={storyStyles.storyTitle}>
          Simple. Useful. Beautiful.
        </h2>

        <p style={storyStyles.storyText}>
          একটি ভালো product শুধু দেখতে সুন্দর নয়—
          ব্যবহারেও যেন সহজ, নির্ভরযোগ্য এবং
          everyday life-এর জন্য useful হয়।
        </p>
      </section>

      <section style={storyStyles.featureGrid}>
        <StoryFeature
          number="01"
          title="Quality"
          text="Carefully selected materials and thoughtful design."
        />

        <StoryFeature
          number="02"
          title="Comfort"
          text="Made to fit naturally into your daily routine."
        />

        <StoryFeature
          number="03"
          title="Value"
          text="Premium experience without unnecessary complexity."
        />
      </section>

      <section style={storyStyles.details}>
        <ProductDetails
          content={content}
          theme={theme}
        />
      </section>

      <StickyCTA
        theme={theme}
        text={content.button_text}
        onClick={openOrder}
      />
    </div>
  )
}

/* =========================================================
   TEMPLATE 05 — BOLD SALE
========================================================= */

function BoldSaleTemplate({
  content,
  theme,
  openOrder,
}) {
  return (
    <div style={boldStyles.page}>
      <div
        style={{
          ...boldStyles.saleBar,
          background: theme,
        }}
      >
        LIMITED TIME OFFER · ORDER TODAY
      </div>

      <header style={boldStyles.header}>
        {content.logo_url ? (
          <img
            src={content.logo_url}
            alt="logo"
            style={boldStyles.logo}
          />
        ) : (
          <div style={boldStyles.logoText}>
            {content.title}
          </div>
        )}
      </header>

      <main>
        <section style={boldStyles.hero}>
          <div style={boldStyles.imageWrap}>
            {content.image_url ? (
              <img
                src={content.image_url}
                alt={content.title}
                style={boldStyles.image}
              />
            ) : (
              <div style={boldStyles.placeholder}>
                Product
              </div>
            )}

            {content.original_price && (
              <div
                style={{
                  ...boldStyles.discountBadge,
                  background: theme,
                }}
              >
                SAVE
              </div>
            )}
          </div>

          <div style={boldStyles.content}>
            <div
              style={{
                ...boldStyles.offerTag,
                color: theme,
              }}
            >
              ★ SPECIAL OFFER
            </div>

            <h1 style={boldStyles.title}>
              {content.title}
            </h1>

            <p style={boldStyles.description}>
              {content.description}
            </p>

            <RatingRow
              content={content}
              theme={theme}
            />

            <div style={boldStyles.priceBox}>
              <div style={boldStyles.priceLabel}>
                TODAY'S PRICE
              </div>

              <div style={boldStyles.priceRow}>
                <span
                  style={{
                    ...boldStyles.price,
                    color: theme,
                  }}
                >
                  {formatPrice(content.price)}
                </span>

                {content.original_price && (
                  <span style={boldStyles.oldPrice}>
                    {formatPrice(
                      content.original_price
                    )}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={openOrder}
              style={{
                ...boldStyles.cta,
                background: theme,
              }}
            >
              {content.button_text ||
                'এখনই অর্ডার করুন'}
              <span>→</span>
            </button>

            <div style={boldStyles.delivery}>
              <span>✓</span>
              Cash on Delivery Available
            </div>
          </div>
        </section>

        <section style={boldStyles.detailsSection}>
          <h2 style={boldStyles.sectionTitle}>
            Product Details
          </h2>

          <ProductDetails
            content={content}
            theme={theme}
          />
        </section>
      </main>

      <StickyCTA
        theme={theme}
        text={content.button_text}
        onClick={openOrder}
      />
    </div>
  )
}

/* =========================================================
   SHARED PUBLIC COMPONENTS
========================================================= */

function RatingRow({ content, theme, dark = false }) {
  const rating = Math.max(
    0,
    Math.min(5, parseInt(content.rating || 5))
  )

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
      }}
    >
      <span
        style={{
          color: theme || '#f5a623',
          fontSize: 14,
          letterSpacing: 1,
        }}
      >
        {'★'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </span>

      <span
        style={{
          fontSize: 12,
          color: dark ? '#999' : '#777',
        }}
      >
        {content.review_count || 0} reviews
      </span>
    </div>
  )
}

function PriceBlock({ content, theme }) {
  return (
    <div style={publicStyles.priceBlock}>
      <span
        style={{
          ...publicStyles.price,
          color: theme,
        }}
      >
        {formatPrice(content.price)}
      </span>

      {content.original_price && (
        <span style={publicStyles.oldPrice}>
          {formatPrice(content.original_price)}
        </span>
      )}

      {content.original_price && (
        <span
          style={{
            ...publicStyles.saveBadge,
            background: `${theme}18`,
            color: theme,
          }}
        >
          অফার
        </span>
      )}
    </div>
  )
}

function TrustGrid() {
  return (
    <div style={publicStyles.trustGrid}>
      <div style={publicStyles.trustCard}>
        <span>🚚</span>
        <div>
          <strong>Fast Delivery</strong>
          <small>দেশজুড়ে delivery</small>
        </div>
      </div>

      <div style={publicStyles.trustCard}>
        <span>💳</span>
        <div>
          <strong>Cash on Delivery</strong>
          <small>পণ্য পেয়ে payment</small>
        </div>
      </div>

      <div style={publicStyles.trustCard}>
        <span>✓</span>
        <div>
          <strong>Quality Checked</strong>
          <small>Verified product</small>
        </div>
      </div>

      <div style={publicStyles.trustCard}>
        <span>🔒</span>
        <div>
          <strong>Secure Order</strong>
          <small>Your data is safe</small>
        </div>
      </div>
    </div>
  )
}

function ProductDetails({
  content,
  theme,
  dark = false,
}) {
  const details = Array.isArray(content.details)
    ? content.details
    : []

  if (!details.length) return null

  return (
    <div
      style={{
        ...publicStyles.details,
        color: dark ? '#fff' : '#111',
      }}
    >
      <div style={publicStyles.detailsHeading}>
        Product Details
      </div>

      <div
        style={{
          borderTop: dark
            ? '1px solid #292929'
            : '1px solid #eee',
        }}
      >
        {details.map((d, i) => (
          <div
            key={i}
            style={{
              ...publicStyles.detailLine,
              borderBottom: dark
                ? '1px solid #292929'
                : '1px solid #eee',
            }}
          >
            <span
              style={{
                color: dark ? '#888' : '#777',
              }}
            >
              {d.key}
            </span>

            <strong>{d.value}</strong>
          </div>
        ))}
      </div>
    </div>
  )
}

function Benefit({ icon, title, text }) {
  return (
    <div style={conversionStyles.benefit}>
      <div style={conversionStyles.benefitIcon}>
        {icon}
      </div>

      <div>
        <strong>{title}</strong>
        <div>{text}</div>
      </div>
    </div>
  )
}

function StoryFeature({ number, title, text }) {
  return (
    <div style={storyStyles.feature}>
      <div style={storyStyles.featureNumber}>
        {number}
      </div>

      <h3>{title}</h3>

      <p>{text}</p>
    </div>
  )
}

function StickyCTA({ theme, text, onClick }) {
  return (
    <div style={publicStyles.stickyCTAWrap}>
      <button
        onClick={onClick}
        style={{
          ...publicStyles.stickyCTA,
          background: theme,
        }}
      >
        <span>{text || 'এখনই অর্ডার করুন'}</span>
        <span>→</span>
      </button>
    </div>
  )
}

/* =========================================================
   PREMIUM ORDER MODAL
========================================================= */

function PremiumOrderModal({
  content,
  theme,
  name,
  phone,
  address,
  setName,
  setPhone,
  setAddress,
  onClose,
  onSubmit,
  error,
  submitting,
}) {
  return (
    <div
      style={orderStyles.overlay}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !submitting) {
          onClose()
        }
      }}
    >
      <div style={orderStyles.sheet}>
        <div style={orderStyles.dragHandle} />

        <div style={orderStyles.sheetHeader}>
          <div>
            <div style={orderStyles.sheetEyebrow}>
              SECURE CHECKOUT
            </div>

            <h2 style={orderStyles.sheetTitle}>
              অর্ডার সম্পন্ন করুন
            </h2>

            <p style={orderStyles.sheetSubtitle}>
              আপনার তথ্য দিন, আমরা ফোনে confirm করবো।
            </p>
          </div>

          <button
            onClick={onClose}
            disabled={submitting}
            style={orderStyles.closeButton}
          >
            ×
          </button>
        </div>

        <div style={orderStyles.productSummary}>
          {content.image_url ? (
            <img
              src={content.image_url}
              alt=""
              style={orderStyles.productImage}
            />
          ) : (
            <div style={orderStyles.productPlaceholder}>
              Product
            </div>
          )}

          <div style={{ flex: 1 }}>
            <div style={orderStyles.productName}>
              {content.title}
            </div>

            <div style={orderStyles.productPrice}>
              {content.price}
            </div>

            {content.original_price && (
              <div style={orderStyles.productOldPrice}>
                {content.original_price}
              </div>
            )}
          </div>

          <div
            style={{
              ...orderStyles.quantity,
              color: theme,
            }}
          >
            ×1
          </div>
        </div>

        <div style={orderStyles.form}>
          <PremiumInput
            label="আপনার নাম"
            placeholder="আপনার পূর্ণ নাম লিখুন"
            value={name}
            onChange={setName}
            icon="◯"
            autoFocus
          />

          <PremiumInput
            label="ফোন নাম্বার"
            placeholder="01XXXXXXXXX"
            value={phone}
            onChange={setPhone}
            icon="☎"
            type="tel"
          />

          <PremiumInput
            label="ঠিকানা"
            placeholder="আপনার delivery address"
            value={address}
            onChange={setAddress}
            icon="⌖"
          />
        </div>

        <div style={orderStyles.trustRow}>
          <span>🔒 Secure</span>
          <span>🚚 COD</span>
          <span>✓ Verified Order</span>
        </div>

        {error && (
          <div style={orderStyles.error}>
            <span>!</span>
            {error}
          </div>
        )}

        <button
          onClick={onSubmit}
          disabled={submitting}
          style={{
            ...orderStyles.submitButton,
            background: theme,
            opacity: submitting ? 0.8 : 1,
          }}
        >
          {submitting ? (
            <>
              <span style={orderStyles.spinner} />
              অর্ডার প্রসেস হচ্ছে...
            </>
          ) : (
            <>
              <span>অর্ডার কনফার্ম করুন</span>
              <span>→</span>
            </>
          )}
        </button>

        <div style={orderStyles.bottomNote}>
          অর্ডার করার পর আমাদের একজন প্রতিনিধি
          ফোনে আপনার order confirm করবেন।
        </div>
      </div>
    </div>
  )
}

function PremiumInput({
  label,
  placeholder,
  value,
  onChange,
  icon,
  type = 'text',
  autoFocus = false,
}) {
  return (
    <label style={orderStyles.inputGroup}>
      <span style={orderStyles.inputLabel}>
        {label}
      </span>

      <div style={orderStyles.inputWrap}>
        <span style={orderStyles.inputIcon}>
          {icon}
        </span>

        <input
          data-order-name={autoFocus ? true : undefined}
          autoFocus={autoFocus}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={orderStyles.input}
        />
      </div>
    </label>
  )
}

/* =========================================================
   SUCCESS MODAL
========================================================= */

function SuccessModal({
  content,
  theme,
  orderId,
  onClose,
}) {
  return (
    <div style={successStyles.overlay}>
      <div style={successStyles.card}>
        <div
          style={{
            ...successStyles.successCircle,
            background: `${theme}16`,
            color: theme,
          }}
        >
          <div style={successStyles.check}>✓</div>
        </div>

        <div style={successStyles.eyebrow}>
          ORDER CONFIRMED
        </div>

        <h2 style={successStyles.title}>
          ধন্যবাদ! 🎉
        </h2>

        <p style={successStyles.text}>
          আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।
          আমাদের প্রতিনিধি শীঘ্রই আপনার সাথে
          ফোনে যোগাযোগ করবেন।
        </p>

        <div style={successStyles.orderBox}>
          <div>
            <span>Order ID</span>
            <strong>#{orderId}</strong>
          </div>

          <div>
            <span>Product</span>
            <strong>{content.title}</strong>
          </div>

          <div>
            <span>Total</span>
            <strong>{content.price}</strong>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            ...successStyles.button,
            background: theme,
          }}
        >
          প্রোডাক্ট পেজে ফিরে যান
        </button>
      </div>
    </div>
  )
}

/* =========================================================
   LOADING / NOT FOUND
========================================================= */

function LoadingPage() {
  return (
    <div style={loadingStyles.page}>
      <div style={loadingStyles.loader} />
      <div style={loadingStyles.text}>
        Loading experience...
      </div>
    </div>
  )
}

function NotFoundPage() {
  return (
    <div style={loadingStyles.page}>
      <div style={loadingStyles.notFoundIcon}>404</div>
      <h2>পেজটি খুঁজে পাওয়া যায়নি</h2>
      <p>আপনার দেওয়া landing page URL সঠিক নয়।</p>
    </div>
  )
}

function EmptyState({ text }) {
  return (
    <div style={styles.emptyState}>
      <div style={styles.emptyIcon}>○</div>
      <div>{text}</div>
    </div>
  )
}

/* =========================================================
   ADMIN STYLES
========================================================= */

const styles = {
  appShell: {
    minHeight: '100vh',
    background: '#f7f8fb',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#111827',
  },

  topNav: {
    minHeight: 70,
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: 'rgba(255,255,255,.92)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid #e9ebef',
    position: 'sticky',
    top: 0,
    zIndex: 50,
  },

  brandMini: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  brandMark: {
    width: 38,
    height: 38,
    borderRadius: 12,
    background: '#111827',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 900,
  },

  navButtons: {
    display: 'flex',
    gap: 6,
  },

  navButton: {
    border: 0,
    background: 'transparent',
    padding: '9px 13px',
    borderRadius: 9,
    cursor: 'pointer',
    color: '#667085',
  },

  navButtonActive: {
    border: 0,
    background: '#111827',
    color: '#fff',
    padding: '9px 13px',
    borderRadius: 9,
    cursor: 'pointer',
    fontWeight: 700,
  },

  adminContainer: {
    maxWidth: 1050,
    margin: '0 auto',
    padding: '45px 20px 80px',
  },

  pageHeader: {
    marginBottom: 28,
  },

  eyebrow: {
    fontSize: 11,
    letterSpacing: 1.6,
    fontWeight: 900,
    color: '#8b95a7',
    marginBottom: 7,
  },

  pageTitle: {
    margin: 0,
    fontSize: 34,
    letterSpacing: '-1.2px',
  },

  pageSubtitle: {
    color: '#697386',
    margin: '8px 0 0',
    lineHeight: 1.6,
  },

  adminGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 18,
  },

  card: {
    background: '#fff',
    border: '1px solid #e8eaf0',
    borderRadius: 20,
    padding: 24,
    marginBottom: 18,
    boxShadow: '0 8px 30px rgba(16,24,40,.035)',
  },

  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 15,
    marginBottom: 22,
  },

  cardEyebrow: {
    fontSize: 10,
    fontWeight: 900,
    letterSpacing: 1.4,
    color: '#9aa3b2',
    marginBottom: 5,
  },

  cardTitle: {
    fontSize: 20,
    margin: 0,
    letterSpacing: '-.4px',
  },

  cardSubtitle: {
    fontSize: 13,
    color: '#7b8494',
    margin: '7px 0 0',
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px solid #dfe3e8',
    background: '#fff',
    borderRadius: 10,
    padding: '12px 13px',
    fontSize: 14,
    outline: 'none',
    marginBottom: 12,
    color: '#111827',
  },

  textarea: {
    width: '100%',
    minHeight: 105,
    boxSizing: 'border-box',
    border: '1px solid #dfe3e8',
    background: '#fff',
    borderRadius: 10,
    padding: '12px 13px',
    fontSize: 14,
    outline: 'none',
    marginBottom: 12,
    resize: 'vertical',
    fontFamily: 'inherit',
  },

  label: {
    display: 'block',
    fontSize: 12,
    fontWeight: 800,
    color: '#555f70',
    marginBottom: 7,
  },

  primaryButton: {
    width: '100%',
    border: 0,
    background: '#111827',
    color: '#fff',
    borderRadius: 10,
    padding: '13px 16px',
    fontSize: 14,
    fontWeight: 800,
    cursor: 'pointer',
  },

  secondaryButton: {
    border: '1px solid #dfe3e8',
    background: '#fff',
    color: '#344054',
    borderRadius: 9,
    padding: '9px 13px',
    cursor: 'pointer',
    fontWeight: 700,
  },

  statusText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#667085',
    margin: '12px 0 0',
  },

  formGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
  },

  sectionDivider: {
    margin: '25px 0 18px',
    borderTop: '1px solid #edf0f4',
    paddingTop: 18,
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 1.2,
    color: '#9aa3b2',
    textTransform: 'uppercase',
  },

  fileInput: {
    width: '100%',
    boxSizing: 'border-box',
    border: '1px dashed #cfd5df',
    background: '#fafbfc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },

  colorRow: {
    display: 'flex',
    gap: 8,
  },

  colorPicker: {
    width: 52,
    height: 44,
    border: '1px solid #dfe3e8',
    borderRadius: 9,
    padding: 3,
    background: '#fff',
  },

  logoPreview: {
    border: '1px solid #edf0f4',
    background: '#fafbfc',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  uploadPreview: {
    width: '100%',
    height: 180,
    background: '#f5f6f8',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 14,
  },

  detailRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 42px',
    gap: 7,
  },

  removeButton: {
    height: 44,
    border: '1px solid #f0d6d6',
    background: '#fff7f7',
    color: '#dc2626',
    borderRadius: 9,
    cursor: 'pointer',
    fontSize: 18,
  },

  publishButton: {
    width: '100%',
    marginTop: 22,
    border: 0,
    color: '#fff',
    borderRadius: 12,
    padding: '15px 18px',
    fontSize: 15,
    fontWeight: 900,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 10px 25px rgba(0,0,0,.1)',
  },

  publishMessage: {
    marginTop: 12,
    padding: 12,
    background: '#f7f8fa',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 13,
  },

  miniLoading: {
    fontSize: 12,
    color: '#667085',
    marginBottom: 10,
  },

  templateSection: {
    marginTop: 25,
    padding: 18,
    border: '1px solid #e8eaf0',
    borderRadius: 16,
    background: '#fafbfc',
  },

  templateHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 15,
    alignItems: 'flex-start',
    marginBottom: 17,
  },

  templateTitle: {
    margin: 0,
    fontSize: 18,
  },

  templateSubtitle: {
    margin: '5px 0 0',
    color: '#7b8494',
    fontSize: 12,
  },

  selectedTemplateBadge: {
    padding: '8px 10px',
    borderRadius: 20,
    background: '#111827',
    color: '#fff',
    fontSize: 11,
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },

  templateGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: 10,
  },

  templateCard: {
    padding: 6,
    borderRadius: 16,
    border: '1px solid #e5e7eb',
    background: '#fff',
    cursor: 'pointer',
    textAlign: 'left',
    overflow: 'hidden',
  },

  templateCardActive: {
    border: '2px solid #111827',
    padding: 5,
    boxShadow: '0 8px 24px rgba(0,0,0,.08)',
  },

  templateCardBottom: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 6,
    padding: '10px 5px 6px',
    alignItems: 'center',
  },

  templateName: {
    fontSize: 11,
    fontWeight: 900,
    lineHeight: 1.3,
  },

  templateDesc: {
    color: '#98a1b2',
    fontSize: 9,
    marginTop: 3,
  },

  radio: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    border: '1px solid #d8dce3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: 11,
  },

  radioActive: {
    background: '#111827',
    color: '#fff',
    borderColor: '#111827',
  },

  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },

  listItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    border: '1px solid #edf0f4',
    borderRadius: 12,
  },

  avatar: {
    width: 38,
    height: 38,
    borderRadius: 11,
    background: '#111827',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
  },

  muted: {
    color: '#8992a2',
    fontSize: 12,
    marginTop: 3,
  },

  countBadge: {
    minWidth: 30,
    height: 30,
    padding: '0 8px',
    borderRadius: 20,
    background: '#f1f3f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    fontWeight: 900,
  },

  pageListItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    border: '1px solid #edf0f4',
    borderRadius: 13,
    padding: 14,
  },

  pageMeta: {
    fontSize: 11,
    color: '#858e9d',
    marginTop: 4,
  },

  pageLink: {
    display: 'inline-block',
    marginTop: 7,
    fontSize: 12,
    color: '#2563eb',
    textDecoration: 'none',
  },

  templateDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
  },

  emptyState: {
    textAlign: 'center',
    color: '#8a94a4',
    padding: 35,
    fontSize: 13,
  },

  emptyIcon: {
    fontSize: 30,
    marginBottom: 8,
    color: '#c8ced7',
  },

  clientDashboard: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '45px 20px 80px',
  },

  clientHero: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
    marginBottom: 28,
  },

  logoutButton: {
    border: '1px solid #e1e5ea',
    background: '#fff',
    borderRadius: 9,
    padding: '9px 14px',
    cursor: 'pointer',
    fontWeight: 700,
  },

  tabs: {
    display: 'flex',
    gap: 6,
    background: '#eef0f4',
    padding: 5,
    borderRadius: 12,
    marginBottom: 18,
    overflowX: 'auto',
  },

  tab: {
    border: 0,
    background: 'transparent',
    padding: '10px 15px',
    borderRadius: 8,
    cursor: 'pointer',
    color: '#667085',
    whiteSpace: 'nowrap',
  },

  tabActive: {
    border: 0,
    background: '#fff',
    padding: '10px 15px',
    borderRadius: 8,
    cursor: 'pointer',
    color: '#111827',
    fontWeight: 900,
    boxShadow: '0 2px 8px rgba(0,0,0,.05)',
    whiteSpace: 'nowrap',
  },

  dashboardCard: {
    background: '#fff',
    border: '1px solid #e8eaf0',
    borderRadius: 20,
    padding: 24,
    boxShadow: '0 8px 30px rgba(16,24,40,.035)',
  },

  orderCard: {
    border: '1px solid #edf0f4',
    borderRadius: 14,
    padding: 14,
  },

  orderTop: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 10,
  },

  orderId: {
    fontSize: 11,
    color: '#8b95a7',
  },

  orderProduct: {
    fontSize: 13,
    color: '#667085',
    margin: '12px 0',
  },

  loginPage: {
    minHeight: 'calc(100vh - 70px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    background:
      'radial-gradient(circle at 50% 20%,#edf2ff,#f7f8fb 45%)',
  },

  loginCard: {
    width: '100%',
    maxWidth: 390,
    background: '#fff',
    border: '1px solid #e7e9ee',
    borderRadius: 22,
    padding: 32,
    boxShadow: '0 20px 60px rgba(16,24,40,.08)',
  },

  loginLogo: {
    width: 52,
    height: 52,
    background: '#111827',
    color: '#fff',
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    marginBottom: 22,
  },

  loginTitle: {
    fontSize: 30,
    margin: 0,
    letterSpacing: '-1px',
  },

  loginSubtitle: {
    color: '#7b8494',
    fontSize: 13,
    lineHeight: 1.6,
    margin: '8px 0 22px',
  },
}

/* =========================================================
   PUBLIC BASE STYLES
========================================================= */

const publicStyles = {
  page: {
    minHeight: '100vh',
    width: '100%',
    maxWidth: 560,
    margin: '0 auto',
    position: 'relative',
    overflow: 'hidden',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: '#111827',
  },

  auroraGlow: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: '50%',
    background: 'rgba(120,145,255,.14)',
    filter: 'blur(70px)',
    top: -120,
    right: -100,
    pointerEvents: 'none',
  },

  publicHeader: {
    height: 64,
    padding: '0 18px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(255,255,255,.8)',
    backdropFilter: 'blur(18px)',
    borderBottom: '1px solid rgba(0,0,0,.05)',
    position: 'relative',
    zIndex: 2,
  },

  logo: {
    maxWidth: 160,
    maxHeight: 38,
    objectFit: 'contain',
  },

  textLogo: {
    fontSize: 15,
    fontWeight: 900,
  },

  auroraHero: {
    position: 'relative',
  },

  imageFrame: {
    position: 'relative',
    margin: '14px 14px 0',
    borderRadius: 24,
    overflow: 'hidden',
    background: '#eef1f7',
    boxShadow: '0 20px 50px rgba(40,55,90,.1)',
  },

  heroImage: {
    width: '100%',
    height: 370,
    display: 'block',
    objectFit: 'cover',
  },

  imagePlaceholder: {
    height: 370,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9aa3b2',
  },

  floatingOffer: {
    position: 'absolute',
    top: 16,
    left: 16,
    padding: '7px 11px',
    color: '#fff',
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: 900,
    borderRadius: 30,
    boxShadow: '0 8px 20px rgba(0,0,0,.16)',
  },

  contentPadding: {
    padding: '25px 18px 100px',
  },

  heroTitle: {
    fontSize: 29,
    lineHeight: 1.13,
    letterSpacing: '-1.1px',
    margin: '0 0 10px',
  },

  heroDescription: {
    color: '#687386',
    fontSize: 14,
    lineHeight: 1.7,
    margin: 0,
  },

  priceBlock: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 9,
    flexWrap: 'wrap',
    margin: '19px 0',
  },

  price: {
    fontSize: 31,
    fontWeight: 950,
    letterSpacing: '-1px',
  },

  oldPrice: {
    fontSize: 15,
    color: '#9aa3b2',
    textDecoration: 'line-through',
  },

  saveBadge: {
    fontSize: 10,
    padding: '5px 8px',
    borderRadius: 20,
    fontWeight: 900,
  },

  trustGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 8,
    margin: '18px 0',
  },

  trustCard: {
    background: 'rgba(255,255,255,.88)',
    border: '1px solid #edf0f4',
    borderRadius: 12,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },

  mainCTA: {
    width: '100%',
    border: 0,
    borderRadius: 14,
    padding: '16px 18px',
    color: '#fff',
    fontSize: 16,
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    boxShadow: '0 12px 25px rgba(0,0,0,.13)',
    transition: 'transform .2s ease, box-shadow .2s ease',
  },

  details: {
    marginTop: 27,
  },

  detailsHeading: {
    fontSize: 16,
    fontWeight: 900,
    marginBottom: 12,
  },

  detailLine: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 15,
    padding: '12px 0',
    fontSize: 13,
  },

  stickyCTAWrap: {
    position: 'fixed',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 0,
    width: '100%',
    maxWidth: 560,
    padding: '10px 14px 12px',
    background:
      'linear-gradient(transparent,rgba(255,255,255,.95) 25%)',
    zIndex: 80,
    boxSizing: 'border-box',
  },

  stickyCTA: {
    width: '100%',
    border: 0,
    borderRadius: 13,
    padding: '14px 17px',
    color: '#fff',
    fontSize: 15,
    fontWeight: 900,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 10px 30px rgba(0,0,0,.16)',
  },
}

/* =========================================================
   LUXURY STYLES
========================================================= */

const luxuryStyles = {
  page: {
    minHeight: '100vh',
    background: '#0b0b0b',
    color: '#fff',
    maxWidth: 560,
    margin: '0 auto',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, sans-serif',
    paddingBottom: 80,
  },

  header: {
    height: 64,
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #222',
  },

  logo: {
    maxWidth: 150,
    maxHeight: 35,
    objectFit: 'contain',
  },

  logoText: {
    fontSize: 14,
    fontWeight: 900,
    letterSpacing: 1,
  },

  hero: {
    padding: 14,
  },

  heroImageWrap: {
    borderRadius: 18,
    overflow: 'hidden',
    background: '#1a1a1a',
  },

  heroImage: {
    width: '100%',
    height: 390,
    objectFit: 'cover',
    display: 'block',
  },

  darkPlaceholder: {
    height: 390,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#555',
  },

  info: {
    padding: '30px 6px',
  },

  luxuryEyebrow: {
    fontSize: 9,
    letterSpacing: 2.3,
    color: '#777',
    fontWeight: 900,
    marginBottom: 13,
  },

  title: {
    fontSize: 36,
    lineHeight: 1.08,
    letterSpacing: '-1.6px',
    margin: 0,
  },

  description: {
    color: '#999',
    fontSize: 14,
    lineHeight: 1.75,
    margin: '15px 0',
  },

  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    margin: '20px 0',
  },

  price: {
    fontSize: 31,
    fontWeight: 900,
  },

  oldPrice: {
    color: '#666',
    textDecoration: 'line-through',
  },

  cta: {
    width: '100%',
    color: '#fff',
    padding: '16px',
    border: '1px solid',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 900,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
  },

  guarantee: {
    textAlign: 'center',
    color: '#777',
    fontSize: 11,
    marginTop: 13,
  },

  detailsSection: {
    borderTop: '1px solid #222',
    padding: '40px 20px',
  },

  detailsInner: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 25,
  },

  sectionNumber: {
    fontSize: 10,
    letterSpacing: 2,
    color: '#666',
  },

  sectionTitle: {
    fontSize: 25,
    lineHeight: 1.2,
    margin: '10px 0 0',
    maxWidth: 400,
  },
}

/* =========================================================
   CONVERSION STYLES
========================================================= */

const conversionStyles = {
  page: {
    minHeight: '100vh',
    maxWidth: 560,
    margin: '0 auto',
    background: '#f8f8f7',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, sans-serif',
    color: '#111',
    paddingBottom: 80,
  },

  topOffer: {
    color: '#fff',
    textAlign: 'center',
    padding: '9px 12px',
    fontSize: 11,
    fontWeight: 900,
  },

  header: {
    height: 62,
    padding: '0 17px',
    background: '#fff',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
  },

  logo: {
    maxWidth: 145,
    maxHeight: 34,
    objectFit: 'contain',
  },

  logoText: {
    fontSize: 14,
    fontWeight: 900,
  },

  hero: {
    padding: 14,
  },

  imageWrap: {
    position: 'relative',
    borderRadius: 18,
    overflow: 'hidden',
    background: '#eee',
  },

  image: {
    width: '100%',
    height: 350,
    objectFit: 'cover',
    display: 'block',
  },

  placeholder: {
    height: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
  },

  discount: {
    position: 'absolute',
    top: 12,
    right: 12,
    color: '#fff',
    borderRadius: 50,
    padding: '8px 12px',
    fontSize: 10,
    fontWeight: 900,
  },

  content: {
    background: '#fff',
    borderRadius: 18,
    marginTop: -18,
    position: 'relative',
    padding: '22px 18px',
    boxShadow: '0 15px 40px rgba(0,0,0,.06)',
  },

  title: {
    fontSize: 28,
    lineHeight: 1.12,
    letterSpacing: '-1px',
    margin: 0,
  },

  description: {
    color: '#697386',
    lineHeight: 1.65,
    fontSize: 14,
  },

  benefits: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    margin: '18px 0',
  },

  benefit: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    padding: 10,
    borderRadius: 11,
    background: '#fafafa',
    border: '1px solid #eee',
    fontSize: 11,
    color: '#777',
  },

  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    background: '#f0f1f3',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 900,
    color: '#222',
  },

  cta: {
    width: '100%',
    border: 0,
    borderRadius: 12,
    padding: '16px',
    color: '#fff',
    fontSize: 16,
    fontWeight: 900,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },

  reassurance: {
    textAlign: 'center',
    fontSize: 10,
    color: '#9aa3b2',
    marginTop: 11,
  },

  whiteSection: {
    background: '#fff',
    marginTop: 12,
    padding: '30px 18px',
  },

  sectionInner: {
    maxWidth: 500,
    margin: '0 auto',
  },

  sectionHeading: {
    fontSize: 20,
    fontWeight: 900,
    marginBottom: 10,
  },
}

/* =========================================================
   STORY STYLES
========================================================= */

const storyStyles = {
  page: {
    minHeight: '100vh',
    maxWidth: 560,
    margin: '0 auto',
    background: '#f4f7f4',
    color: '#183027',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, sans-serif',
    paddingBottom: 80,
  },

  header: {
    height: 62,
    padding: '0 18px',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(244,247,244,.85)',
    backdropFilter: 'blur(15px)',
    position: 'sticky',
    top: 0,
    zIndex: 5,
  },

  logo: {
    maxWidth: 150,
    maxHeight: 35,
    objectFit: 'contain',
  },

  logoText: {
    fontSize: 14,
    fontWeight: 900,
  },

  hero: {
    padding: 16,
  },

  heroImageWrap: {
    borderRadius: '50% 50% 18px 18px',
    overflow: 'hidden',
    background: '#dce8e1',
  },

  heroImage: {
    width: '100%',
    height: 350,
    objectFit: 'cover',
    display: 'block',
  },

  placeholder: {
    height: 350,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#82958d',
  },

  heroContent: {
    padding: '28px 8px',
  },

  smallLabel: {
    fontSize: 9,
    letterSpacing: 2,
    fontWeight: 900,
    color: '#789087',
    marginBottom: 10,
  },

  title: {
    fontSize: 34,
    lineHeight: 1.08,
    letterSpacing: '-1.3px',
    margin: 0,
  },

  description: {
    color: '#64766f',
    fontSize: 14,
    lineHeight: 1.75,
    margin: '14px 0',
  },

  cta: {
    width: '100%',
    color: '#fff',
    border: 0,
    borderRadius: 12,
    padding: '16px',
    fontSize: 15,
    fontWeight: 900,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },

  storySection: {
    background: '#183027',
    color: '#fff',
    padding: '50px 22px',
  },

  storyNumber: {
    fontSize: 11,
    color: '#8fa79e',
    letterSpacing: 2,
  },

  storyTitle: {
    fontSize: 31,
    lineHeight: 1.15,
    letterSpacing: '-1px',
    margin: '12px 0',
  },

  storyText: {
    color: '#b7c8c1',
    fontSize: 14,
    lineHeight: 1.8,
    maxWidth: 450,
  },

  featureGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 1,
    background: '#cad8d1',
  },

  feature: {
    background: '#f4f7f4',
    padding: '28px 20px',
  },

  featureNumber: {
    fontSize: 10,
    color: '#80938b',
    letterSpacing: 1,
    marginBottom: 8,
  },

  "feature h3": {
  fontSize: 19,
},
"feature p": {
    color: '#697a73',
    lineHeight: 1.7,
    fontSize: 13,
  },

  details: {
    padding: '30px 20px',
    background: '#fff',
  },
}

/* =========================================================
   BOLD SALE STYLES
========================================================= */

const boldStyles = {
  page: {
    minHeight: '100vh',
    maxWidth: 560,
    margin: '0 auto',
    background: '#fff',
    color: '#111',
    fontFamily:
      'Inter, ui-sans-serif, system-ui, sans-serif',
    paddingBottom: 80,
  },

  saleBar: {
    color: '#fff',
    padding: '9px 10px',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 950,
    letterSpacing: 1,
  },

  header: {
    height: 64,
    padding: '0 18px',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #eee',
  },

  logo: {
    maxWidth: 150,
    maxHeight: 36,
    objectFit: 'contain',
  },

  logoText: {
    fontWeight: 950,
    fontSize: 15,
  },

  hero: {
    padding: 14,
  },

  imageWrap: {
    position: 'relative',
    borderRadius: 14,
    overflow: 'hidden',
    background: '#eee',
  },

  image: {
    width: '100%',
    height: 370,
    display: 'block',
    objectFit: 'cover',
  },

  placeholder: {
    height: 370,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
  },

  discountBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    color: '#fff',
    padding: '10px 14px',
    borderRadius: 8,
    fontWeight: 950,
    fontSize: 11,
  },

  content: {
    padding: '24px 4px',
  },

  offerTag: {
    fontSize: 10,
    fontWeight: 950,
    letterSpacing: 1,
    marginBottom: 9,
  },

  title: {
    fontSize: 31,
    lineHeight: 1.06,
    letterSpacing: '-1.3px',
    margin: 0,
  },

  description: {
    fontSize: 14,
    color: '#707887',
    lineHeight: 1.65,
  },

  priceBox: {
    background: '#f6f6f6',
    borderRadius: 13,
    padding: '13px 15px',
    margin: '18px 0',
  },

  priceLabel: {
    fontSize: 9,
    fontWeight: 950,
    color: '#8b95a7',
    letterSpacing: 1.3,
  },

  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 10,
    marginTop: 4,
  },

  price: {
    fontSize: 32,
    fontWeight: 950,
  },

  oldPrice: {
    color: '#9aa3b2',
    textDecoration: 'line-through',
    fontSize: 14,
  },

  cta: {
    width: '100%',
    border: 0,
    color: '#fff',
    borderRadius: 10,
    padding: '16px',
    fontSize: 16,
    fontWeight: 950,
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  },

  delivery: {
    textAlign: 'center',
    marginTop: 11,
    color: '#7c8695',
    fontSize: 11,
  },

  detailsSection: {
    padding: '28px 18px',
    background: '#f7f7f7',
  },

  sectionTitle: {
    fontSize: 22,
    margin: '0 0 15px',
  },
}

/* =========================================================
   ORDER MODAL STYLES
========================================================= */

const orderStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(9,13,22,.56)',
    backdropFilter: 'blur(9px)',
    zIndex: 200,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 0,
    animation: 'fadeIn .22s ease',
  },

  sheet: {
    width: '100%',
    maxWidth: 560,
    maxHeight: '92vh',
    overflowY: 'auto',
    background: '#fff',
    borderRadius: '28px 28px 0 0',
    padding: '10px 18px 25px',
    boxSizing: 'border-box',
    boxShadow: '0 -25px 70px rgba(0,0,0,.22)',
    animation: 'sheetUp .35s cubic-bezier(.2,.8,.2,1)',
  },

  dragHandle: {
    width: 42,
    height: 4,
    borderRadius: 20,
    background: '#d8dce3',
    margin: '2px auto 17px',
  },

  sheetHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 15,
    alignItems: 'flex-start',
  },

  sheetEyebrow: {
    fontSize: 9,
    fontWeight: 950,
    letterSpacing: 1.6,
    color: '#929bab',
    marginBottom: 5,
  },

  sheetTitle: {
    margin: 0,
    fontSize: 22,
    letterSpacing: '-.6px',
  },

  sheetSubtitle: {
    margin: '5px 0 0',
    color: '#7c8695',
    fontSize: 12,
  },

  closeButton: {
    width: 34,
    height: 34,
    border: 0,
    background: '#f1f3f5',
    borderRadius: '50%',
    fontSize: 21,
    cursor: 'pointer',
    flexShrink: 0,
  },

  productSummary: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    background: '#f7f8fa',
    border: '1px solid #edf0f3',
    padding: 10,
    borderRadius: 15,
    margin: '18px 0',
  },

  productImage: {
    width: 66,
    height: 66,
    borderRadius: 11,
    objectFit: 'cover',
  },

  productPlaceholder: {
    width: 66,
    height: 66,
    borderRadius: 11,
    background: '#e7e9ed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#999',
    fontSize: 10,
  },

  productName: {
    fontSize: 12,
    fontWeight: 800,
    lineHeight: 1.4,
  },

  productPrice: {
    fontSize: 17,
    fontWeight: 950,
    marginTop: 4,
  },

  productOldPrice: {
    fontSize: 10,
    color: '#999',
    textDecoration: 'line-through',
  },

  quantity: {
    fontSize: 12,
    fontWeight: 950,
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },

  inputGroup: {
    display: 'block',
  },

  inputLabel: {
    display: 'block',
    fontSize: 11,
    fontWeight: 900,
    color: '#454e5d',
    marginBottom: 6,
  },

  inputWrap: {
    display: 'flex',
    alignItems: 'center',
    border: '1px solid #dfe3e8',
    borderRadius: 12,
    background: '#fff',
    transition: 'border-color .2s, box-shadow .2s',
  },

  inputIcon: {
    width: 38,
    textAlign: 'center',
    color: '#98a1b2',
    fontSize: 14,
  },

  input: {
    flex: 1,
    minWidth: 0,
    border: 0,
    outline: 0,
    padding: '13px 12px 13px 0',
    fontSize: 14,
    fontFamily: 'inherit',
    background: 'transparent',
    color: '#111827',
  },

  trustRow: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 6,
    margin: '15px 0',
    fontSize: 9,
    color: '#7f8999',
  },

  error: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '10px 12px',
    background: '#fff3f3',
    color: '#d92d20',
    border: '1px solid #ffd6d3',
    borderRadius: 10,
    fontSize: 12,
    marginBottom: 10,
  },

  submitButton: {
    width: '100%',
    border: 0,
    borderRadius: 13,
    padding: '15px',
    color: '#fff',
    fontSize: 15,
    fontWeight: 950,
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    minHeight: 52,
    boxShadow: '0 10px 25px rgba(0,0,0,.14)',
  },

  spinner: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,.4)',
    borderTopColor: '#fff',
    animation: 'spin .7s linear infinite',
  },

  bottomNote: {
    textAlign: 'center',
    color: '#9aa3b2',
    fontSize: 9,
    lineHeight: 1.6,
    marginTop: 11,
  },
}

/* =========================================================
   SUCCESS STYLES
========================================================= */

const successStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    zIndex: 250,
    background: 'rgba(9,13,22,.58)',
    backdropFilter: 'blur(10px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    animation: 'fadeIn .25s ease',
  },

  card: {
    width: '100%',
    maxWidth: 380,
    background: '#fff',
    borderRadius: 25,
    padding: '34px 22px 22px',
    textAlign: 'center',
    boxShadow: '0 30px 80px rgba(0,0,0,.25)',
    animation: 'successPop .4s cubic-bezier(.2,.8,.2,1)',
  },

  successCircle: {
    width: 76,
    height: 76,
    borderRadius: '50%',
    margin: '0 auto 18px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  check: {
    fontSize: 37,
    fontWeight: 900,
    animation: 'checkPop .45s ease .15s both',
  },

  eyebrow: {
    fontSize: 9,
    fontWeight: 950,
    letterSpacing: 1.7,
    color: '#98a1b2',
  },

  title: {
    margin: '8px 0',
    fontSize: 27,
    letterSpacing: '-1px',
  },

  text: {
    color: '#707887',
    fontSize: 13,
    lineHeight: 1.7,
    margin: '0 auto',
    maxWidth: 310,
  },

  orderBox: {
    background: '#f7f8fa',
    border: '1px solid #edf0f3',
    borderRadius: 14,
    padding: 14,
    margin: '20px 0',
    textAlign: 'left',
  },

  orderBoxRow: {},

  button: {
    width: '100%',
    border: 0,
    borderRadius: 12,
    color: '#fff',
    padding: '14px',
    fontSize: 13,
    fontWeight: 900,
    cursor: 'pointer',
  },
}

/* =========================================================
   LOADING STYLES
========================================================= */

const loadingStyles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    fontFamily: 'Inter, sans-serif',
    color: '#667085',
  },

  loader: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    border: '3px solid #e5e7eb',
    borderTopColor: '#111827',
    animation: 'spin .7s linear infinite',
  },

  text: {
    fontSize: 12,
  },

  notFoundIcon: {
    fontSize: 42,
    fontWeight: 950,
    color: '#d0d5dd',
  },
}

/* =========================================================
   PUBLIC CSS ANIMATIONS
========================================================= */

const publicCSS = `
  * {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    background: #f7f8fb;
  }

  button,
  input,
  textarea,
  select {
    font-family: inherit;
  }

  button {
    -webkit-tap-highlight-color: transparent;
  }

  button:active {
    transform: scale(.98);
  }

  input:focus,
  textarea:focus,
  select:focus {
    border-color: #98a2b3 !important;
    box-shadow: 0 0 0 3px rgba(16,24,40,.06);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes sheetUp {
    from {
      opacity: 0;
      transform: translateY(70px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes successPop {
    from {
      opacity: 0;
      transform: scale(.92) translateY(15px);
    }
    to {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes checkPop {
    from {
      opacity: 0;
      transform: scale(.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (min-width: 700px) {
    .desktop-page {
      max-width: 760px;
    }
  }
`
export default App;
