import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import WealthLab from './pages/WealthLab.jsx'
import FVAccordion from './pages/FVAccordion.jsx'
import VocabFlipCards from './pages/VocabFlipCards.jsx'
import HP10BCalcDisplay from './pages/HP10BCalcDisplay.jsx'
import NCollegeFund from './pages/NCollegeFund.jsx'
import TVMInterestRate from './pages/TVMInterestRate.jsx'
import TVMMonthlyPayment from './pages/TVMMonthlyPayment.jsx'
import AnnuityProblemSolver from './pages/AnnuityProblemSolver.jsx'
import WouldYouRather from './pages/WouldYouRather.jsx'
import PerpetuityPractice from './pages/PerpetuityPractice.jsx'
import PVRetentionBonus from './pages/PVRetentionBonus.jsx'

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
        <Route path="/tvm-interest-rate" element={<TVMInterestRate />} />
        <Route path="/tvm-monthly-payment" element={<TVMMonthlyPayment />} />
        <Route path="/annuity-problem-solver" element={<AnnuityProblemSolver />} />
        <Route path="/would-you-rather" element={<WouldYouRather />} />
        <Route path="/perpetuity-practice" element={<PerpetuityPractice />} />
        <Route path="/pv-retention-bonus" element={<PVRetentionBonus />} />
      </Routes>
    </HashRouter>
  )
}
