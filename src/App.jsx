import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import WealthLab from './pages/WealthLab.jsx'
import FVAccordion from './pages/FVAccordion.jsx'
import VocabFlipCards from './pages/VocabFlipCards.jsx'
import HP10BCalcDisplay from './pages/HP10BCalcDisplay.jsx'
import NCollegeFund from './pages/NCollegeFund.jsx'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wealthlab" element={<WealthLab />} />
        <Route path="/fv-accordion" element={<FVAccordion />} />
        <Route path="/vocab-flipcards" element={<VocabFlipCards />} />
        <Route path="/hp10b" element={<HP10BCalcDisplay />} />
        <Route path="/n-college-fund" element={<NCollegeFund />} />
      </Routes>
    </HashRouter>
  )
}
