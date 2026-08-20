import { useState, useEffect } from 'react'

function App() {
  const [clientName, setClientName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [clients, setClients] = useState([])

  const loadClients = async () => {
    try {
      const res = await fetch('/api/clients')
      const data = await res.json()
      if (data.success) {
        setClients(data.clients)
      }
    } catch (err) {
      console.log('Error loading clients')
    }
  }

  useEffect(() => {
    loadClients()
  }, [])

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
        setClientName('')
        setEmail('')
        setPassword('')
        loadClients()
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (err) {
      setMessage('❌ Something went wrong')
    }
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Founder's Vent - Admin Panel</h1>

      <div style={{ marginTop: '30px', border: '1px solid #ccc', padding: '20px', maxWidth: '350px', margin: '30px auto' }}>
        <h3>নতুন Client যোগ করো</h3>
        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%', boxSizing: 'border-box' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '100%', boxSizing: 'border-box' }}
        />
        <button onClick={handleAddClient} style={{ padding: '10px 30px', marginTop: '10px' }}>
          Add Client
        </button>
        <p>{message}</p>
      </div>

      <div style={{ marginTop: '30px', maxWidth: '500px', margin: '30px auto', textAlign: 'left' }}>
        <h3 style={{ textAlign: 'center' }}>সব Client-এর লিস্ট</h3>
        {clients.length === 0 ? (
          <p style={{ textAlign: 'center' }}>কোনো Client নেই এখনো</p>
        ) : (
          clients.map((c) => (
            <div key={c.client_id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '8px' }}>
              <strong>{c.client_name}</strong> — {c.email}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
