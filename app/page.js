'use client'
import { useState } from 'react'
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
    <main style={{
      minHeight: '100vh',
      background: '#0d0d0d',
      color: '#fff',
      fontFamily: "'Segoe UI', sans-serif",
      padding: '0 0 60px 0'
    }}>
      {/* Header */}
      <div style={{
        background: '#111',
        borderBottom: '2px solid #00ff88',
        padding: '16px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 40, height: 40, background: '#00ff88',
            borderRadius: 8, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 20
          }}>🛡️</div>
          <div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, color: '#00ff88' }}>SALAMA</div>
            <div style={{ fontSize: 11, color: '#666', letterSpacing: 1 }}>KENYA DIGITAL SAFETY</div>
          </div>
        </div>
        <div style={{
          padding: '6px 14px', border: '1px solid #00ff88',
          borderRadius: 4, color: '#00ff88', fontSize: 12, letterSpacing: 1
        }}>● SYSTEM ONLINE</div>
      </div>

      {/* Hero */}
      <div style={{
        textAlign: 'center', padding: '60px 20px 40px',
        background: 'linear-gradient(180deg, #111 0%, #0d0d0d 100%)'
      }}>
        <div style={{ fontSize: 13, color: '#00ff88', letterSpacing: 3, marginBottom: 16 }}>// CROWDSOURCED SCAM REGISTRY</div>
        <h1 style={{ fontSize: 42, fontWeight: 900, margin: 0, letterSpacing: 2 }}>
          STAY <span style={{ color: '#00ff88' }}>PROTECTED</span>
        </h1>
        <p style={{ color: '#666', marginTop: 12, fontSize: 15 }}>
          Search & report fraudulent numbers, M-Pesa tills, and fake vendors in Kenya
        </p>
      </div>

      {/* Search */}
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          background: '#111', border: '1px solid #222',
          borderRadius: 8, padding: 24, marginBottom: 24
        }}>
          <div style={{ fontSize: 12, color: '#00ff88', letterSpacing: 2, marginBottom: 16 }}>// SEARCH DATABASE</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && searchScam()}
              placeholder="Enter phone number, till, paybill, or @handle..."
              style={{
                flex: 1, padding: '12px 16px',
                background: '#0d0d0d', border: '1px solid #333',
                borderRadius: 6, color: '#fff', fontSize: 14,
                outline: 'none'
              }}
            />
            <button onClick={searchScam} style={{
              padding: '12px 24px', background: '#00ff88',
              color: '#000', border: 'none', borderRadius: 6,
              fontWeight: 700, cursor: 'pointer', fontSize: 14,
              letterSpacing: 1
            }}>SCAN</button>
          </div>

          {searched && results.length === 0 && (
            <div style={{
              marginTop: 16, padding: 12,
              background: '#0a1a0f', border: '1px solid #00ff88',
              borderRadius: 6, color: '#00ff88', fontSize: 13
            }}>✅ No reports found — this number appears clean.</div>
          )}

          {results.map(r => (
            <div key={r.id} style={{
              marginTop: 16, padding: 16,
              background: '#1a0a0a', border: '1px solid #ff3c3c',
              borderRadius: 6
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#ff3c3c', fontWeight: 700, fontSize: 16 }}>⚠ {r.number}</span>
                <span style={{
                  background: '#ff3c3c', color: '#fff',
                  padding: '3px 10px', borderRadius: 4, fontSize: 11, fontWeight: 700
                }}>HIGH RISK</span>
              </div>
              <div style={{ color: '#aaa', fontSize: 13, marginTop: 6 }}>{r.category}</div>
              <div style={{ color: '#ccc', fontSize: 13, marginTop: 4 }}>{r.description}</div>
              <div style={{ color: '#555', fontSize: 11, marginTop: 8 }}>{r.reports_count} report(s) filed</div>
            </div>
          ))}
        </div>

        {/* Report */}
        <div style={{
          background: '#111', border: '1px solid #222',
          borderRadius: 8, padding: 24
        }}>
          <div style={{ fontSize: 12, color: '#ff3c3c', letterSpacing: 2, marginBottom: 16 }}>// REPORT A SCAM</div>
          <input
            value={number}
            onChange={e => setNumber(e.target.value)}
            placeholder="Phone number, till, or @handle..."
            style={{
              width: '100%', padding: '11px 16px', marginBottom: 10,
              background: '#0d0d0d', border: '1px solid #333',
              borderRadius: 6, color: '#fff', fontSize: 14, outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <input
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="Category (e.g. M-Pesa fraud, fake vendor...)"
            style={{
              width: '100%', padding: '11px 16px', marginBottom: 10,
              background: '#0d0d0d', border: '1px solid #333',
              borderRadius: 6, color: '#fff', fontSize: 14, outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe what happened..."
            style={{
              width: '100%', padding: '11px 16px', marginBottom: 10,
              background: '#0d0d0d', border: '1px solid #333',
              borderRadius: 6, color: '#fff', fontSize: 14, outline: 'none',
              height: 90, resize: 'none', boxSizing: 'border-box'
            }}
          />
          <button onClick={reportScam} style={{
            width: '100%', padding: '13px',
            background: 'transparent', border: '1px solid #ff3c3c',
            borderRadius: 6, color: '#ff3c3c', fontWeight: 700,
            cursor: 'pointer', fontSize: 14, letterSpacing: 2
          }}>⚑ SUBMIT REPORT</button>
          {message && (
            <div style={{ marginTop: 12, color: '#00ff88', fontSize: 13 }}>{message}</div>
          )}
        </div>
      </div>
    </main>
  )
}