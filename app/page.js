'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gxavbglykaseebrotruk.supabase.co',
  'sb_publishable_VBQU1HQXhwhotexm9i0-gQ_B5ApKnLH'
)

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [number, setNumber] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [searched, setSearched] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  async function searchScam() {
    const { data } = await supabase
      .from('scam_reports')
      .select('*')
      .ilike('number', `%${search}%`)
    setResults(data || [])
    setSearched(true)
  }

  async function reportScam() {
    const { error } = await supabase
      .from('scam_reports')
      .insert([{ number, category, description, reports_count: 1 }])
    if (error) {
      setMessage('Error submitting report.')
    } else {
      setMessage('✅ Report submitted successfully!')
      setNumber('')
      setCategory('')
      setDescription('')
    }
  }

  return (
    <main style={{ background: '#050505', color: '#fff', fontFamily: "'Segoe UI', sans-serif", overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '20px 48px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        background: scrollY > 50 ? 'rgba(5,5,5,0.95)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid #1a1a1a' : 'none',
        transition: 'all .3s'
      }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: 3, color: '#00ff88' }}>VANTA</div>
        <div style={{ display: 'flex', gap: 32, fontSize: 13, color: '#666', letterSpacing: 1 }}>
          <span style={{ cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#666'}>REGISTRY</span>
          <span style={{ cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#666'}>REPORT</span>
          <span style={{ cursor: 'pointer', transition: 'color .2s' }} onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='#666'}>ABOUT</span>
        </div>
        <div style={{
          padding: '10px 24px', border: '1px solid #00ff88',
          borderRadius: 2, fontSize: 12, fontWeight: 700,
          letterSpacing: 2, color: '#00ff88', cursor: 'pointer',
          transition: 'all .2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#00ff88'; e.currentTarget.style.color = '#000' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#00ff88' }}
        >PROTECT ME →</div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 48px 80px', textAlign: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Animated background orbs */}
        <div style={{
          position: 'absolute', width: 600, height: 600,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)',
          top: '50%', left: '50%', transform: `translate(-50%, -50%) translateY(${scrollY * 0.2}px)`,
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,60,60,0.06) 0%, transparent 70%)',
          top: '30%', left: '20%', transform: `translateY(${scrollY * 0.1}px)`,
          pointerEvents: 'none'
        }} />

        <div style={{ fontSize: 12, letterSpacing: 4, color: '#00ff88', marginBottom: 24, opacity: 0.8 }}>
          KENYA DIGITAL SAFETY PLATFORM
        </div>

        <h1 style={{
          fontSize: 'clamp(56px, 10vw, 120px)',
          fontWeight: 900, lineHeight: 1, margin: 0,
          letterSpacing: -2
        }}>
          DIGITAL<br />
          <span style={{
            WebkitTextStroke: '1px #333',
            color: 'transparent',
            display: 'block'
          }}>THREATS</span>
          <span style={{ color: '#00ff88' }}>DON'T</span> SLEEP.
        </h1>

        <p style={{
          maxWidth: 480, margin: '32px auto', fontSize: 16,
          color: '#555', lineHeight: 1.7
        }}>
          Vanta is Kenya's first crowdsourced scam registry. Search, report, and protect yourself from M-Pesa fraud, fake vendors, and phishing attacks.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#search" style={{
            padding: '16px 40px', background: '#00ff88', color: '#000',
            fontWeight: 900, fontSize: 14, letterSpacing: 2,
            textDecoration: 'none', borderRadius: 2,
            transition: 'all .2s'
          }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >SEARCH A NUMBER</a>
          <a href="#report" style={{
            padding: '16px 40px', border: '1px solid #222', color: '#fff',
            fontWeight: 700, fontSize: 14, letterSpacing: 2,
            textDecoration: 'none', borderRadius: 2,
            transition: 'all .2s'
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#222' }}
          >REPORT A SCAM</a>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 64, marginTop: 80,
          borderTop: '1px solid #111', paddingTop: 48
        }}>
          {[['34,812', 'Numbers flagged'], ['1,247', 'Reports this month'], ['4,301', 'Kenyans protected']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#00ff88' }}>{val}</div>
              <div style={{ fontSize: 11, color: '#444', letterSpacing: 2, marginTop: 4 }}>{label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SEARCH SECTION */}
      <section id="search" style={{ padding: '80px 48px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: '#00ff88', marginBottom: 16 }}>// 001 — REGISTRY</div>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, margin: '0 0 48px', letterSpacing: -1 }}>
          IS THIS NUMBER<br />A SCAM?
        </h2>

        <div style={{ display: 'flex', gap: 0, marginBottom: 24 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && searchScam()}
            placeholder="0712 345 678 or M-Pesa till or @handle..."
            style={{
              flex: 1, padding: '20px 24px',
              background: '#0d0d0d', border: '1px solid #1a1a1a',
              borderRight: 'none', color: '#fff', fontSize: 16,
              outline: 'none', borderRadius: '2px 0 0 2px',
              fontFamily: 'inherit'
            }}
          />
          <button onClick={searchScam} style={{
            padding: '20px 40px', background: '#00ff88',
            color: '#000', border: 'none', fontWeight: 900,
            fontSize: 14, letterSpacing: 2, cursor: 'pointer',
            borderRadius: '0 2px 2px 0', fontFamily: 'inherit'
          }}>SCAN →</button>
        </div>

        {searched && results.length === 0 && (
          <div style={{
            padding: '24px', border: '1px solid #1a3a1a',
            borderRadius: 2, background: '#0a1a0a',
            display: 'flex', alignItems: 'center', gap: 16
          }}>
            <div style={{ fontSize: 24 }}>✓</div>
            <div>
              <div style={{ color: '#00ff88', fontWeight: 700 }}>Clean — no reports found</div>
              <div style={{ color: '#444', fontSize: 13, marginTop: 4 }}>This number has not been flagged in our database.</div>
            </div>
          </div>
        )}

        {results.map(r => (
          <div key={r.id} style={{
            padding: '24px', border: '1px solid #3a1a1a',
            borderRadius: 2, background: '#1a0a0a', marginBottom: 12
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: 3, color: '#ff3c3c', marginBottom: 8 }}>⚠ HIGH RISK DETECTED</div>
                <div style={{ fontSize: 24, fontWeight: 900 }}>{r.number}</div>
                <div style={{ color: '#666', marginTop: 4, fontSize: 14 }}>{r.category}</div>
              </div>
              <div style={{
                padding: '6px 16px', border: '1px solid #ff3c3c',
                color: '#ff3c3c', fontSize: 11, letterSpacing: 2, fontWeight: 700
              }}>FLAGGED</div>
            </div>
            <div style={{ color: '#888', fontSize: 14, marginTop: 16, lineHeight: 1.6 }}>{r.description}</div>
            <div style={{ color: '#333', fontSize: 12, marginTop: 12, letterSpacing: 1 }}>{r.reports_count} REPORT(S) FILED</div>
          </div>
        ))}
      </section>

      {/* REPORT SECTION */}
      <section id="report" style={{ padding: '80px 48px', maxWidth: 800, margin: '0 auto' }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: '#ff3c3c', marginBottom: 16 }}>// 002 — REPORT</div>
        <h2 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, margin: '0 0 48px', letterSpacing: -1 }}>
          SEEN A SCAM?<br />
          <span style={{ color: '#ff3c3c' }}>REPORT IT.</span>
        </h2>

        {[
          { val: number, set: setNumber, ph: 'Phone number, M-Pesa till, or @handle...' },
          { val: category, set: setCategory, ph: 'Category — e.g. M-Pesa fraud, fake vendor, SIM swap...' },
        ].map(({ val, set, ph }) => (
          <input key={ph} value={val} onChange={e => set(e.target.value)} placeholder={ph}
            style={{
              width: '100%', padding: '20px 24px', marginBottom: 12,
              background: '#0d0d0d', border: '1px solid #1a1a1a',
              color: '#fff', fontSize: 15, outline: 'none',
              borderRadius: 2, fontFamily: 'inherit', boxSizing: 'border-box'
            }}
          />
        ))}

        <textarea value={description} onChange={e => setDescription(e.target.value)}
          placeholder="Describe what happened in detail..."
          style={{
            width: '100%', padding: '20px 24px', marginBottom: 12,
            background: '#0d0d0d', border: '1px solid #1a1a1a',
            color: '#fff', fontSize: 15, outline: 'none',
            borderRadius: 2, fontFamily: 'inherit', height: 120,
            resize: 'none', boxSizing: 'border-box'
          }}
        />

        <button onClick={reportScam} style={{
          width: '100%', padding: '20px',
          background: 'transparent', border: '1px solid #ff3c3c',
          color: '#ff3c3c', fontWeight: 900, fontSize: 14,
          letterSpacing: 3, cursor: 'pointer', borderRadius: 2,
          fontFamily: 'inherit', transition: 'all .2s'
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ff3c3c'; e.currentTarget.style.color = '#fff' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ff3c3c' }}
        >⚑ SUBMIT REPORT</button>

        {message && <div style={{ marginTop: 16, color: '#00ff88', fontSize: 14, letterSpacing: 1 }}>{message}</div>}
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '48px', borderTop: '1px solid #111',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ fontSize: 20, fontWeight: 900, letterSpacing: 3, color: '#00ff88' }}>VANTA</div>
        <div style={{ fontSize: 12, color: '#333', letterSpacing: 1 }}>PROTECTING KENYA · 2024</div>
      </footer>

    </main>
  )
}