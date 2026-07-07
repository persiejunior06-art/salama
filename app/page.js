'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://gxavbglykaseebrotruk.supabase.co',
  'sb_publishable_VBQU1HQXhwhotexm9i0-gQ_B5ApKnLH'
)

function FadeIn({ children, delay = 0 }) {
  const ref = useRef()
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(32px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>{children}</div>
  )
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([])
  const [number, setNumber] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [searched, setSearched] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [heroVisible, setHeroVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100)
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  async function searchScam() {
    if (!search.trim()) return
    const { data } = await supabase
      .from('scam_reports')
      .select('*')
      .ilike('number', `%${search}%`)
    setResults(data || [])
    setSearched(true)
  }

  async function reportScam() {
    if (!number || !category) return
    const { error } = await supabase
      .from('scam_reports')
      .insert([{ number, category, description, reports_count: 1 }])
    if (error) {
      setMessage('Something went wrong. Please try again.')
    } else {
      setMessage('Report submitted. Thank you for protecting Kenya.')
      setNumber('')
      setCategory('')
      setDescription('')
    }
  }

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const inputStyle = {
    width: '100%', padding: '15px 18px', marginBottom: 12,
    background: '#f9f9f9', border: '1.5px solid #ececec',
    borderRadius: 12, fontSize: 15, outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box',
    transition: 'border-color 0.2s, background 0.2s', color: '#0a0a0a'
  }

  return (
    <main style={{ background: '#fff', color: '#0a0a0a', fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif", overflowX: 'hidden' }}>

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 64, padding: '0 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrollY > 10 ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrollY > 10 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 10 ? '1px solid rgba(0,0,0,0.06)' : 'none',
        transition: 'all 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, #0a0a0a, #3a3a3a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 17, boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}>🛡</div>
          <img src="/logo.png" alt="Vanta" style={{ height: 36, width: 'auto' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {[['search', 'Registry'], ['how', 'How it works'], ['report', 'Report'], ['about', 'About']].map(([id, label]) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              padding: '8px 14px', border: 'none', background: 'none',
              fontSize: 14, color: '#555', fontWeight: 500,
              cursor: 'pointer', borderRadius: 8, transition: 'all 0.2s',
              fontFamily: 'inherit'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.color = '#0a0a0a' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#555' }}
            >{label}</button>
          ))}
          <button onClick={() => scrollTo('search')} style={{
            marginLeft: 8, padding: '9px 22px',
            background: '#0a0a0a', color: '#fff',
            border: 'none', borderRadius: 10, fontSize: 14,
            fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            fontFamily: 'inherit', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)' }}
          >Get protected</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '120px 24px 100px', textAlign: 'center',
        position: 'relative', overflow: 'hidden',
        background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #f0f9ff 0%, #ffffff 70%)'
      }}>
        {/* Floating orbs */}
        <div style={{
          position: 'absolute', width: 500, height: 500, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)',
          top: '10%', left: '10%', pointerEvents: 'none',
          animation: 'float1 8s ease-in-out infinite'
        }} />
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
          top: '20%', right: '5%', pointerEvents: 'none',
          animation: 'float2 10s ease-in-out infinite'
        }} />

        <style>{`
          @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(30px,-20px)} }
          @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,30px)} }
          @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        `}</style>

        <div style={{
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease',
          display: 'flex', flexDirection: 'column', alignItems: 'center'
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 16px', background: '#f0fdf4',
            border: '1px solid #bbf7d0', borderRadius: 100,
            fontSize: 13, color: '#16a34a', fontWeight: 500, marginBottom: 36
          }}>
            <span style={{ width: 6, height: 6, background: '#16a34a', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
            Kenya's first crowdsourced scam registry
          </div>

          <h1 style={{
            fontSize: 'clamp(44px, 7vw, 88px)',
            fontWeight: 800, lineHeight: 1.08,
            letterSpacing: -3, margin: '0 0 28px', maxWidth: 860,
            color: '#0a0a0a'
          }}>
            Protect yourself<br />
            from digital fraud<br />
            <span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>in Kenya.</span>
          </h1>

          <p style={{
            fontSize: 18, color: '#666', maxWidth: 480,
            lineHeight: 1.75, margin: '0 0 44px', fontWeight: 400
          }}>
            Search any phone number, M-Pesa till, or vendor before you send money. Built for Kenyans, by Kenyans.
          </p>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={() => scrollTo('search')} style={{
              padding: '15px 36px', background: '#0a0a0a', color: '#fff',
              border: 'none', borderRadius: 12, fontSize: 15,
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s',
              fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,0,0,0.18)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)' }}
            >Search a number →</button>
            <button onClick={() => scrollTo('report')} style={{
              padding: '15px 36px', background: '#fff', color: '#0a0a0a',
              border: '1.5px solid #e5e5e5', borderRadius: 12, fontSize: 15,
              fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s',
              fontFamily: 'inherit'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e5e5'; e.currentTarget.style.transform = 'translateY(0)' }}
            >Report a scam</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 0, marginTop: 80,
          border: '1px solid #f0f0f0', borderRadius: 20,
          overflow: 'hidden', background: '#fff',
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          opacity: heroVisible ? 1 : 0,
          transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s ease 0.3s'
        }}>
          {[['34,812', 'Numbers flagged'], ['1,247', 'Reports this month'], ['4,301', 'Kenyans protected']].map(([val, label], i) => (
            <div key={label} style={{
              padding: '28px 48px', textAlign: 'center',
              borderRight: i < 2 ? '1px solid #f5f5f5' : 'none'
            }}>
              <div style={{ fontSize: 32, fontWeight: 800, letterSpacing: -1.5, color: '#0a0a0a' }}>{val}</div>
              <div style={{ fontSize: 13, color: '#aaa', marginTop: 6, fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={{ padding: '120px 24px', background: '#fafafa' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ textAlign: 'center', marginBottom: 64 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, color: '#aaa', marginBottom: 16, textTransform: 'uppercase', fontWeight: 600 }}>How it works</div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: -2, margin: 0 }}>Simple. Fast. Reliable.</h2>
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {[
              { icon: '🔍', title: 'Search', desc: 'Enter any phone number, M-Pesa till, paybill, or social handle to check our live database instantly.', delay: 0 },
              { icon: '⚡', title: 'Get alerted', desc: 'See risk level, number of reports, and real experiences from other Kenyans before you send a shilling.', delay: 0.1 },
              { icon: '🚩', title: 'Report fraud', desc: 'Spotted a scammer? Report them in seconds. Your report protects thousands of other Kenyans.', delay: 0.2 }
            ].map(({ icon, title, desc, delay }) => (
              <FadeIn key={title} delay={delay}>
                <div style={{
                  background: '#fff', border: '1px solid #f0f0f0',
                  borderRadius: 20, padding: '36px 28px',
                  transition: 'all 0.3s ease', cursor: 'default'
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  <div style={{ fontSize: 36, marginBottom: 20 }}>{icon}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: -0.5 }}>{title}</div>
                  <div style={{ fontSize: 14, color: '#777', lineHeight: 1.7 }}>{desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section id="search" style={{ padding: '120px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, color: '#aaa', marginBottom: 16, textTransform: 'uppercase', fontWeight: 600 }}>Registry</div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: -2, margin: '0 0 16px' }}>Is this number safe?</h2>
              <p style={{ fontSize: 16, color: '#777', lineHeight: 1.7, margin: 0 }}>Search before you send money. Our database is updated in real-time by Kenyans like you.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{
              display: 'flex', border: '1.5px solid #e8e8e8',
              borderRadius: 16, overflow: 'hidden', background: '#fff',
              boxShadow: '0 4px 32px rgba(0,0,0,0.07)',
              transition: 'box-shadow 0.3s, border-color 0.3s'
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#0a0a0a' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#e8e8e8' }}
            >
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && searchScam()}
                placeholder="0712 345 678  ·  Till 123456  ·  @vendor"
                style={{
                  flex: 1, padding: '18px 22px', border: 'none',
                  fontSize: 15, outline: 'none', fontFamily: 'inherit',
                  background: 'transparent', color: '#0a0a0a'
                }}
              />
              <button onClick={searchScam} style={{
                padding: '18px 28px', background: '#0a0a0a', color: '#fff',
                border: 'none', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap',
                transition: 'background 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.background = '#222'}
                onMouseLeave={e => e.currentTarget.style.background = '#0a0a0a'}
              >Search →</button>
            </div>

            <div style={{ marginTop: 16 }}>
              {searched && results.length === 0 && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '20px 24px', background: '#f0fdf4',
                  border: '1px solid #bbf7d0', borderRadius: 14
                }}>
                  <div style={{
                    width: 40, height: 40, background: '#16a34a', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 18, flexShrink: 0, fontWeight: 700
                  }}>✓</div>
                  <div>
                    <div style={{ fontWeight: 700, color: '#15803d', fontSize: 15 }}>No reports found</div>
                    <div style={{ fontSize: 13, color: '#4ade80', marginTop: 3 }}>This number hasn't been flagged in our database.</div>
                  </div>
                </div>
              )}
              {results.map(r => (
                <div key={r.id} style={{
                  padding: '24px', background: '#fff9f9',
                  border: '1.5px solid #fecaca', borderRadius: 14, marginBottom: 12,
                  transition: 'transform 0.2s'
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.01)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                      padding: '5px 12px', background: '#fef2f2',
                      border: '1px solid #fecaca', borderRadius: 100,
                      fontSize: 12, color: '#dc2626', fontWeight: 600
                    }}>⚠ High Risk</span>
                    <span style={{ fontSize: 12, color: '#bbb', fontWeight: 500 }}>{r.reports_count} report(s)</span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5, marginBottom: 6 }}>{r.number}</div>
                  <div style={{ fontSize: 13, color: '#dc2626', fontWeight: 600, marginBottom: 10 }}>{r.category}</div>
                  <div style={{ fontSize: 14, color: '#777', lineHeight: 1.65 }}>{r.description}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* REPORT */}
      <section id="report" style={{ padding: '120px 24px', background: '#fafafa' }}>
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
          <FadeIn>
            <div style={{ marginBottom: 48 }}>
              <div style={{ fontSize: 12, letterSpacing: 2, color: '#aaa', marginBottom: 16, textTransform: 'uppercase', fontWeight: 600 }}>Report</div>
              <h2 style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 800, letterSpacing: -2, margin: '0 0 16px' }}>Seen a scam?</h2>
              <p style={{ fontSize: 16, color: '#777', lineHeight: 1.7, margin: 0 }}>Help protect other Kenyans by reporting fraudulent numbers, tills, and vendors.</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{
              background: '#fff', border: '1px solid #f0f0f0',
              borderRadius: 20, padding: '36px',
              boxShadow: '0 4px 32px rgba(0,0,0,0.05)'
            }}>
              {[
                { val: number, set: setNumber, ph: 'Phone number, M-Pesa till, paybill, or @handle' },
                { val: category, set: setCategory, ph: 'Category — e.g. M-Pesa fraud, fake vendor, SIM swap' }
              ].map(({ val, set, ph }) => (
                <input key={ph} value={val} onChange={e => set(e.target.value)}
                  placeholder={ph} style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = '#0a0a0a'; e.target.style.background = '#fff' }}
                  onBlur={e => { e.target.style.borderColor = '#ececec'; e.target.style.background = '#f9f9f9' }}
                />
              ))}
              <textarea value={description} onChange={e => setDescription(e.target.value)}
                placeholder="Describe what happened in detail..."
                style={{ ...inputStyle, height: 120, resize: 'none', marginBottom: 20 }}
                onFocus={e => { e.target.style.borderColor = '#0a0a0a'; e.target.style.background = '#fff' }}
                onBlur={e => { e.target.style.borderColor = '#ececec'; e.target.style.background = '#f9f9f9' }}
              />
              <button onClick={reportScam} style={{
                width: '100%', padding: '16px',
                background: '#0a0a0a', color: '#fff',
                border: 'none', borderRadius: 12,
                fontSize: 15, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
                transition: 'all 0.2s',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#222'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.style.transform = 'translateY(0)' }}
              >Submit report</button>
              {message && (
                <div style={{
                  marginTop: 16, padding: '14px 18px',
                  background: '#f0fdf4', border: '1px solid #bbf7d0',
                  borderRadius: 10, fontSize: 14, color: '#15803d', fontWeight: 500
                }}>{message}</div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '120px 24px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <div style={{ fontSize: 12, letterSpacing: 2, color: '#555', marginBottom: 20, textTransform: 'uppercase', fontWeight: 600 }}>About Vanta</div>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 800, letterSpacing: -2, color: '#fff', margin: '0 0 24px' }}>
              Built to protect Kenya
            </h2>
            <p style={{ fontSize: 17, color: '#666', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 56px' }}>
              Vanta was built because Kenyans deserve a tool to fight back against digital fraud. Every report makes the platform smarter and every Kenyan safer.
            </p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['M-Pesa fraud', 'SIM swapping', 'Fake vendors', 'Phishing SMS', 'Job scams', 'Investment fraud'].map(tag => (
                <span key={tag} style={{
                  padding: '9px 18px', border: '1px solid #1f1f1f',
                  borderRadius: 100, fontSize: 13, color: '#555',
                  fontWeight: 500, transition: 'all 0.2s', cursor: 'default'
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#fff' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1f1f1f'; e.currentTarget.style.color = '#555' }}
                >{tag}</span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '32px 48px', background: '#0a0a0a',
        borderTop: '1px solid #141414',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, borderRadius: 8,
            background: '#fff', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: 15
          }}>🛡</div>
          <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>Vanta</span>
        </div>
        <div style={{ fontSize: 13, color: '#333' }}>© 2024 Vanta · Protecting Kenya</div>
        <div style={{ fontSize: 13, color: '#333' }}>Built in Nairobi 🇰🇪</div>
      </footer>

    </main>
  )
}