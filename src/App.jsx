import { useState } from 'react'

function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

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
        setMessage(`✅ Login Successful! Welcome, ${data.client.client_name}`)
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (err) {
      setMessage('❌ Something went wrong')
    }
  }

  return (
    <div style={{ padding: '40px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Founder's Vent Platform</h1>
      <div style={{ marginTop: '30px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: 'block', margin: '10px auto', padding: '10px', width: '250px' }}
        />
        <button onClick={handleLogin} style={{ padding: '10px 30px', marginTop: '10px' }}>
          Login
        </button>
      </div>
      <p style={{ marginTop: '20px' }}>{message}</p>
    </div>
  )
}

export default AppApp
