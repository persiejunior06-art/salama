'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gxavbglykaseebrotruk.supabase.co',
  'sb_publishable_VBQU1HQXhwhotexm9i0-gQ_B5ApKnLH'
)

const STEPS = ['Account', 'Phone', 'Type', 'Details']

export default function Auth() {
  const [mode, setMode] = useState('signup')
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [accountType, setAccountType] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [businessCategory, setBusinessCategory] = useState('')
  const [businessLocation, setBusinessLocation] = useState('')
  const [businessHours, setBusinessHours] = useState('')
  const [businessOwner, setBusinessOwner] = useState('')
  const [businessDesc, setBusinessDesc] = useState('')
  const [userId, setUserId] = useState(null)

  async function handleSignup() {
    setLoading(true)
    setMessage('')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) { setMessage(error.message); setLoading(false); return }
    setUserId(data.user?.id)
    setStep(2)
    setLoading(false)
  }

  async function handleLogin() {
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setMessage(error.message); setLoading(false); return }
    window.location.href = '/dashboard'
    setLoading(false)
  }

  async function handlePhoneStep() {
    if (!phone) { setMessage('Please enter your phone number'); return }
    setMessage('')
    setStep(3)
  }

  async function handleTypeStep() {
    if (!accountType) { setMessage('Please select an account type'); return }
    setMessage('')
    if (accountType === 'business') { setStep(4) } else { await saveProfile() }
  }

  async function saveProfile() {
    setLoading(true)
    const { error } = await supabase.from('profiles').insert([{
      user_id: userId,
      phone,
      account_type: accountType,
      business_name: businessName || null,
      business_category: businessCategory || null,
      business_location: businessLocation || null,
      business_hours: businessHours || null,
      business_owner: businessOwner || null,
      business_description: businessDesc || null,
      verified: false
    }])
    setLoading(false)
    if (error) { setMessage(error.message); return }
    window.location.href = '/dashboard'
  }

  const inputStyle = {
    width: '100%', padding: '14px 18px', marginBottom: 12,
    background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.1)',
    borderRadius: 12, fontSize: 15, outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box', color: '#fff',
    transition: 'border-color 0.3s'
  }

  const typeCards = [
    { id: 'personal', icon: '👤', label: 'Personal', desc: 'Protect your personal number' },
    { id: 'business', icon: '🏪', label: 'Business', desc: 'Verify your business & build trust' },
    { id: 'freelancer', icon: '💼', label: 'Freelancer', desc: 'Verify yourself as a trusted freelancer' },
    { id: 'ngo', icon: '🤝', label: 'NGO / Charity', desc: 'Verify your organization' },
  ]

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: "'Segoe UI', sans-serif", padding: 24,
      position: 'relative', overflow: 'hidden'
    }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes float { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-20px)} }
        input::placeholder { color: rgba(255,255,255,0.3); }
        textarea::placeholder { color: rgba(255,255,255,0.3); }
      `}</style>

      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', top: '-15%', left: '-10%', pointerEvents: 'none', animation: 'float 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)', bottom: '-10%', right: '-5%', pointerEvents: 'none' }} />

      <div style={{
        background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 24, padding: '40px 36px', width: '100%',
        maxWidth: mode === 'signup' && step === 4 ? 560 : 460,
        backdropFilter: 'blur(20px)', boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
        animation: 'fadeUp 0.6s ease', transition: 'max-width 0.4s ease'
      }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <img src="/logo.png" alt="Vanta" style={{ height: 36, width: 'auto' }} />
        </div>

        {mode === 'signup' && (
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              {STEPS.map((s, i) => (
                <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: step > i + 1 ? 'linear-gradient(135deg, #6366f1, #06b6d4)' : step === i + 1 ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.05)', border: step === i + 1 ? '2px solid #6366f1' : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: step > i + 1 ? '#fff' : step === i + 1 ? '#6366f1' : '#444', fontWeight: 700, transition: 'all 0.3s' }}>{step > i + 1 ? '✓' : i + 1}</div>
                  <div style={{ fontSize: 10, color: step === i + 1 ? '#6366f1' : '#444', fontWeight: 500 }}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ height: 2, background: 'rgba(255,255,255,0.05)', borderRadius: 1, position: 'relative' }}>
              <div style={{ height: '100%', borderRadius: 1, background: 'linear-gradient(90deg, #6366f1, #06b6d4)', width: `${((step - 1) / (STEPS.length - 1)) * 100}%`, transition: 'width 0.4s ease' }} />
            </div>
          </div>
        )}

        {mode === 'login' && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: -0.5 }}>Welcome back</h2>
            <p style={{ fontSize: 14, color: '#555', margin: '0 0 28px' }}>Sign in to your Vanta account</p>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ ...inputStyle, marginBottom: 20 }}
              onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>{loading ? 'Signing in...' : 'Sign in'}</button>
            {message && <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, fontSize: 13, color: '#f87171' }}>{message}</div>}
            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#444' }}>
              Don't have an account?{' '}
              <button onClick={() => { setMode('signup'); setMessage('') }} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>Sign up</button>
            </p>
          </div>
        )}

        {mode === 'signup' && step === 1 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: -0.5 }}>Create your account</h2>
            <p style={{ fontSize: 14, color: '#555', margin: '0 0 28px' }}>Join Vanta and protect Kenya 🇰🇪</p>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address" style={inputStyle}
              onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" style={{ ...inputStyle, marginBottom: 20 }}
              onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              onKeyDown={e => e.key === 'Enter' && handleSignup()} />
            <button onClick={handleSignup} disabled={loading} style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>{loading ? 'Creating account...' : 'Continue →'}</button>
            {message && <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, fontSize: 13, color: '#f87171' }}>{message}</div>}
            <p style={{ textAlign: 'center', marginTop: 24, fontSize: 14, color: '#444' }}>
              Already have an account?{' '}
              <button onClick={() => { setMode('login'); setMessage('') }} style={{ background: 'none', border: 'none', color: '#6366f1', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: 14 }}>Sign in</button>
            </p>
          </div>
        )}

        {mode === 'signup' && step === 2 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: -0.5 }}>Your phone number</h2>
            <p style={{ fontSize: 14, color: '#555', margin: '0 0 28px' }}>This is the number others will see on Vanta</p>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#6366f1', fontWeight: 700, zIndex: 1 }}>🇰🇪 +254</div>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="7XX XXX XXX"
                style={{ ...inputStyle, paddingLeft: 90, marginBottom: 20 }}
                onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                onKeyDown={e => e.key === 'Enter' && handlePhoneStep()} />
            </div>
            <button onClick={handlePhoneStep} style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>Continue →</button>
            {message && <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, fontSize: 13, color: '#f87171' }}>{message}</div>}
          </div>
        )}

        {mode === 'signup' && step === 3 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: -0.5 }}>What best describes you?</h2>
            <p style={{ fontSize: 14, color: '#555', margin: '0 0 24px' }}>Choose your account type</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              {typeCards.map(({ id, icon, label, desc }) => (
                <div key={id} onClick={() => setAccountType(id)} style={{ padding: '20px 16px', borderRadius: 14, cursor: 'pointer', border: `1.5px solid ${accountType === id ? '#6366f1' : 'rgba(255,255,255,0.08)'}`, background: accountType === id ? 'rgba(99,102,241,0.12)' : 'rgba(255,255,255,0.02)', transition: 'all 0.2s' }}
                  onMouseEnter={e => { if (accountType !== id) e.currentTarget.style.borderColor = 'rgba(99,102,241,0.4)' }}
                  onMouseLeave={e => { if (accountType !== id) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
                >
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: accountType === id ? '#6366f1' : '#fff', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: '#555', lineHeight: 1.4 }}>{desc}</div>
                </div>
              ))}
            </div>
            <button onClick={handleTypeStep} style={{ width: '100%', padding: '15px', background: accountType ? 'linear-gradient(135deg, #6366f1, #06b6d4)' : 'rgba(255,255,255,0.05)', color: accountType ? '#fff' : '#444', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: accountType ? 'pointer' : 'not-allowed', fontFamily: 'inherit', boxShadow: accountType ? '0 4px 20px rgba(99,102,241,0.3)' : 'none', transition: 'all 0.3s' }}>{loading ? 'Saving...' : accountType === 'business' ? 'Add business details →' : 'Finish setup →'}</button>
            {message && <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, fontSize: 13, color: '#f87171' }}>{message}</div>}
          </div>
        )}

        {mode === 'signup' && step === 4 && (
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: -0.5 }}>Business details</h2>
            <p style={{ fontSize: 14, color: '#555', margin: '0 0 24px' }}>This information will be shown on your verified profile</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { val: businessName, set: setBusinessName, ph: 'Business name', full: true },
                { val: businessOwner, set: setBusinessOwner, ph: 'Owner full name' },
                { val: businessCategory, set: setBusinessCategory, ph: 'Category (e.g. Electronics)' },
                { val: businessLocation, set: setBusinessLocation, ph: 'Location / Town' },
                { val: businessHours, set: setBusinessHours, ph: 'Working hours (e.g. 8am–6pm)' },
              ].map(({ val, set, ph, full }) => (
                <input key={ph} value={val} onChange={e => set(e.target.value)} placeholder={ph}
                  style={{ ...inputStyle, marginBottom: 0, gridColumn: full ? '1 / -1' : 'auto' }}
                  onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
              ))}
            </div>
            <textarea value={businessDesc} onChange={e => setBusinessDesc(e.target.value)}
              placeholder="Business description — what do you sell or offer?"
              style={{ ...inputStyle, height: 90, resize: 'none', marginTop: 12, marginBottom: 20 }}
              onFocus={e => e.target.style.borderColor = '#6366f1'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
            <button onClick={saveProfile} disabled={loading} style={{ width: '100%', padding: '15px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(99,102,241,0.3)' }}>{loading ? 'Saving...' : 'Complete registration ✓'}</button>
            {message && <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', borderRadius: 10, fontSize: 13, color: '#f87171' }}>{message}</div>}
          </div>
        )}

      </div>
    </main>
  )
}