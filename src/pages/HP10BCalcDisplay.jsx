import { Link } from 'react-router-dom'
import hp10bHTML from '../../hp10b-calcdisplay/index.html?raw'

export default function HP10BCalcDisplay() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{
        background: '#16306b',
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
        srcDoc={hp10bHTML}
        style={{ flex: 1, border: 'none', width: '100%' }}
        title="HP 10B — TVM Core Variables"
      />
    </div>
  )
}
