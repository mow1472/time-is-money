import { Link } from 'react-router-dom'
import pvHTML from '../../pv-retention-bonus/index.html?raw'

export default function PVRetentionBonus() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{
        background: '#1A3A5C',
        padding: '0 16px',
        height: 40,
        display: 'flex',
        alignItems: 'center',
        flexShrink: 0,
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <Link to="/" style={{
          color: 'rgba(255,255,255,0.7)',
          textDecoration: 'none',
          fontSize: 13,
          fontFamily: 'Arial, sans-serif',
        }}>
          ← All Tools
        </Link>
      </div>
      <iframe
        srcDoc={pvHTML}
        style={{ flex: 1, border: 'none', width: '100%' }}
        title="TVM — Present Value of a Retention Bonus"
      />
    </div>
  )
}
