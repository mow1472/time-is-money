import { Link } from 'react-router-dom'

const APPS = [
  {
    path: '/wealthlab',
    title: 'WealthLab',
    desc: 'Interactive compound interest & portfolio growth calculator',
    icon: '📈',
    accent: '#002E5D',
  },
  {
    path: '/fv-accordion',
    title: 'Saving for a Down Payment',
    desc: 'Step-by-step TVM walkthrough using HP 10B, Excel, and formulas',
    icon: '🏠',
    accent: '#1A3A5C',
  },
  {
    path: '/vocab-flipcards',
    title: 'TVM Vocabulary',
    desc: 'Flip cards to learn essential Time Value of Money terms',
    icon: '🃏',
    accent: '#002E5D',
  },
  {
    path: '/hp10b',
    title: 'HP 10B — Core TVM Keys',
    desc: 'Interactive guide to N, I/YR, PV, PMT, and FV',
    icon: '🔢',
    accent: '#16306b',
  },
  {
    path: '/n-college-fund',
    title: 'College Fund — Solving for N',
    desc: 'How long to save $50,000 with a lump sum and annual contributions',
    icon: '🎓',
    accent: '#1A3A5C',
  },
  {
    path: '/tvm-interest-rate',
    title: 'TVM — Interest Rate: Investment Return',
    desc: 'Work backwards to find your annual return using HP 10BII+, Excel, and formulas',
    icon: '📊',
    accent: '#1A3A5C',
  },
]

export default function Home() {
  return (
    <div style={{
      fontFamily: "'Open Sans', Arial, sans-serif",
      background: '#f0f4f8',
      minHeight: '100vh',
      padding: '48px 24px',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ marginBottom: 36 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: '#747480', marginBottom: 8,
          }}>
            EYARC Financial Literacy
          </div>
          <h1 style={{ fontSize: 32, fontWeight: 700, color: '#002E5D', margin: 0, lineHeight: 1.2 }}>
            Time is Money
          </h1>
          <p style={{ fontSize: 15, color: '#747480', marginTop: 10, lineHeight: 1.6 }}>
            Interactive tools for learning the Time Value of Money.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 14,
        }}>
          {APPS.map(app => (
            <Link key={app.path} to={app.path} style={{ textDecoration: 'none' }}>
              <div
                style={{
                  background: '#fff',
                  borderRadius: 12,
                  border: '1px solid #dce4ed',
                  padding: '20px 22px',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,46,93,0.1)'
                  e.currentTarget.style.borderColor = '#0d65c7'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.borderColor = '#dce4ed'
                }}
              >
                <span style={{ fontSize: 28, lineHeight: 1, flexShrink: 0, marginTop: 2 }}>{app.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, color: '#002E5D', fontSize: 15, marginBottom: 5 }}>
                    {app.title}
                  </div>
                  <div style={{ color: '#747480', fontSize: 13, lineHeight: 1.55 }}>
                    {app.desc}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p style={{
          marginTop: 48, fontSize: 10, color: '#c2c2ce',
          textAlign: 'center', letterSpacing: '0.04em',
        }}>
          © 2026 Ernst &amp; Young Foundation (US). All Rights Reserved.
        </p>
      </div>
    </div>
  )
}
