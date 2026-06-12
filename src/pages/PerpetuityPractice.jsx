import { useState } from "react";

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500;600&display=swap');
.pp-body { font-family: 'DM Sans', Arial, sans-serif; background: #f7f8fc; color: #002E5D; min-height: 100vh; }
.pp-main { max-width: 860px; margin: 0 auto; padding: 40px 24px 60px; }
.pp-progress-section { margin-bottom: 28px; }
.pp-progress-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.pp-progress-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #747480; font-weight: 600; }
.pp-progress-count { font-size: 13px; color: #002E5D; font-weight: 600; }
.pp-progress-track { height: 5px; background: #EAEAF1; border-radius: 3px; overflow: hidden; }
.pp-progress-fill { height: 100%; background: linear-gradient(90deg, #0d65c7, #002E5D); border-radius: 3px; transition: width 0.5s ease; }
.pp-dot-row { display: flex; gap: 7px; margin-top: 10px; }
.pp-dot { width: 9px; height: 9px; border-radius: 50%; background: #C2C2CE; transition: background 0.3s; }
.pp-dot.active { background: #002E5D; box-shadow: 0 0 0 3px rgba(0,46,93,0.18); }
.pp-dot.correct { background: #6E9600; }
.pp-dot.wrong { background: #F84725; }
.pp-q-header { background: #002E5D; border-radius: 10px; padding: 14px 22px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; animation: pp-slideUp 0.3s ease; }
.pp-q-header-left { display: flex; align-items: center; gap: 12px; }
.pp-q-num { font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; color: #B5E2FA; font-weight: 600; }
.pp-q-badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; }
.pp-badge-pv { background: #FFE600; color: #002E5D; }
.pp-badge-rate { background: #B5E2FA; color: #002E5D; }
.pp-badge-pmt { background: #6E9600; color: white; }
.pp-q-prompt { font-size: 16px; font-weight: 500; color: #002E5D; margin-bottom: 24px; line-height: 1.5; animation: pp-slideUp 0.35s ease; }
.pp-scenarios { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 28px; animation: pp-slideUp 0.4s ease; }
.pp-scenario-card { background: #ffffff; border: 1.5px solid #EAEAF1; border-radius: 12px; padding: 20px 22px; }
.pp-scenario-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; font-weight: 700; color: #747480; margin-bottom: 12px; padding-bottom: 10px; border-bottom: 1.5px solid #EAEAF1; }
.pp-scenario-label.a { color: #0d65c7; border-color: #0d65c7; }
.pp-scenario-label.b { color: #F2BA05; border-color: #F2BA05; }
.pp-scenario-text { font-size: 14px; line-height: 1.75; color: #002E5D; font-weight: 300; }
.pp-scenario-text strong { font-weight: 600; background: #FFE600; padding: 1px 4px; border-radius: 3px; color: #002E5D; }
.pp-options { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 20px; animation: pp-slideUp 0.45s ease; }
.pp-option-btn { flex: 1; min-width: 160px; padding: 14px 18px; border: 2px solid #C2C2CE; border-radius: 10px; background: #ffffff; font-family: 'DM Sans', Arial, sans-serif; font-size: 14px; font-weight: 600; color: #002E5D; cursor: pointer; transition: all 0.15s; text-align: center; line-height: 1.4; }
.pp-option-btn:hover:not(:disabled) { border-color: #002E5D; background: #EAEAF1; }
.pp-option-btn.selected { border-color: #002E5D; background: #002E5D; color: white; }
.pp-option-btn.correct { border-color: #6E9600; background: #f0fce8; color: #6E9600; }
.pp-option-btn.wrong { border-color: #F84725; background: #fff4f2; color: #F84725; }
.pp-option-btn.reveal-correct { border-color: #6E9600; background: #f0fce8; color: #6E9600; }
.pp-option-btn:disabled { cursor: default; }
.pp-option-sub { font-size: 11px; font-weight: 400; opacity: 0.75; display: block; margin-top: 2px; }
.pp-feedback-box { border-radius: 10px; padding: 16px 20px; margin-bottom: 18px; animation: pp-fadeIn 0.25s ease; }
.pp-feedback-correct { background: #f0fce8; border: 1.5px solid #6E9600; }
.pp-feedback-wrong { background: #fff4f2; border: 1.5px solid #F84725; }
.pp-feedback-title { font-size: 14px; font-weight: 700; margin-bottom: 6px; }
.pp-feedback-correct .pp-feedback-title { color: #6E9600; }
.pp-feedback-wrong .pp-feedback-title { color: #F84725; }
.pp-feedback-body { font-size: 13px; color: #333; line-height: 1.65; }
.pp-calc-line { font-family: 'DM Serif Display', serif; font-size: 13px; color: #002E5D; background: rgba(0,0,0,0.04); border-radius: 6px; padding: 8px 12px; margin-top: 8px; line-height: 1.9; white-space: pre-line; }
.pp-btn-row { display: flex; gap: 10px; flex-wrap: wrap; }
.pp-btn { padding: 11px 24px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer; border: 2px solid transparent; transition: all 0.15s; font-family: 'DM Sans', Arial, sans-serif; }
.pp-btn-primary { background: #002E5D; color: white; border-color: #002E5D; }
.pp-btn-primary:hover { background: #0d65c7; border-color: #0d65c7; }
.pp-btn-secondary { background: transparent; color: #002E5D; border-color: #C2C2CE; }
.pp-btn-secondary:hover { border-color: #002E5D; background: #EAEAF1; }
.pp-btn-hint { background: transparent; color: #0d65c7; border-color: #B5E2FA; font-size: 13px; }
.pp-btn-hint:hover { background: #B5E2FA; }
.pp-hint-box { background: #fffbe6; border: 1.5px solid #F2BA05; border-radius: 10px; padding: 13px 18px; margin-bottom: 16px; font-size: 13px; color: #002E5D; line-height: 1.6; animation: pp-fadeIn 0.2s ease; }
.pp-completion { text-align: center; padding: 60px 24px; animation: pp-slideUp 0.4s ease; }
.pp-completion-icon { font-size: 52px; margin-bottom: 18px; display: block; animation: pp-pop 0.5s ease 0.15s both; }
@keyframes pp-pop { 0% { transform: scale(0.4); opacity: 0; } 75% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
.pp-completion h2 { font-family: 'DM Serif Display', serif; font-size: 30px; color: #002E5D; margin-bottom: 8px; }
.pp-completion p { color: #747480; font-size: 15px; margin-bottom: 24px; }
.pp-score-cards { display: flex; justify-content: center; gap: 14px; margin: 20px 0 32px; flex-wrap: wrap; }
.pp-score-card { background: white; border-radius: 12px; padding: 16px 24px; border: 1px solid #EAEAF1; min-width: 90px; }
.pp-score-card-num { font-family: 'DM Serif Display', serif; font-size: 34px; color: #002E5D; display: block; }
.pp-score-card-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.07em; color: #747480; font-weight: 600; }
@keyframes pp-slideUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pp-fadeIn { from { opacity: 0; } to { opacity: 1; } }
@media (max-width: 600px) {
  .pp-main { padding: 20px 16px 40px; }
  .pp-scenarios { grid-template-columns: 1fr; }
  .pp-options { flex-direction: column; }
}
`;

const QUESTIONS = [
  {
    type:"pv", badge:"Higher Present Value?", badgeClass:"pp-badge-pv",
    prompt:"Which perpetuity has a higher present value?",
    scenarioA:'A local arts foundation receives a donation that will pay <strong>$6,000 every year</strong> forever. The foundation earns an annual return of <strong>9%</strong> on its investments.',
    scenarioB:'A university scholarship fund is set up to pay <strong>$4,500 every year</strong> forever. The fund earns an annual return of <strong>6%</strong>.',
    answer:"B",
    hint:"Calculate PV = PMT ÷ r for each. A bigger payment with a higher rate does not automatically mean a bigger PV.",
    explanation:"Scenario A has both a larger payment and a higher rate. The rate effect wins here — B's lower rate means less discounting, giving it a higher PV despite the smaller payment.",
    calc:"A: PV = $6,000 ÷ 0.09 = $66,667\nB: PV = $4,500 ÷ 0.06 = $75,000\nScenario B has the higher present value."
  },
  {
    type:"rate", badge:"Higher Rate of Return?", badgeClass:"pp-badge-rate",
    prompt:"Which investment offers the higher annual rate of return?",
    scenarioA:'Marcus pays <strong>$320,000</strong> for a preferred stock that pays him <strong>$19,200 every year</strong> indefinitely.',
    scenarioB:'Priya pays <strong>$275,000</strong> for a similar preferred stock that pays <strong>$17,050 every year</strong> indefinitely.',
    answer:"B",
    hint:"r = PMT ÷ PV for each. Do not assume the higher price means a better deal.",
    explanation:"Marcus paid more and receives more — but relative to what he paid, his return is actually lower. Priya gets more per dollar invested.",
    calc:"A: r = $19,200 ÷ $320,000 = 6.0%\nB: r = $17,050 ÷ $275,000 = 6.2%\nScenario B has the higher rate of return."
  },
  {
    type:"pv", badge:"Higher Present Value?", badgeClass:"pp-badge-pv",
    prompt:"Which perpetuity has a higher present value?",
    scenarioA:'A city parks fund pays out <strong>$800 every month</strong> to maintain a community garden — forever. The fund earns <strong>8% per year</strong>.',
    scenarioB:'A neighborhood association fund pays out <strong>$9,600 every year</strong> for the same purpose — forever. The fund earns <strong>9% per year</strong>.',
    answer:"A",
    hint:"For A, use the monthly rate (8% ÷ 12). The annual totals look the same — but are the rates the same?",
    explanation:"$800/month × 12 = $9,600/year — the same annual payout. But A uses a lower rate, so each dollar is discounted less, giving A a higher PV.",
    calc:"A: r = 8%÷12 = 0.667% → PV = $800 ÷ 0.00667 = $120,000\nB: r = 9% → PV = $9,600 ÷ 0.09 = $106,667\nScenario A has the higher present value."
  },
  {
    type:"pmt", badge:"Higher Annual Payout?", badgeClass:"pp-badge-pmt",
    prompt:"Two endowment funds are set up. Which one pays out more money per year?",
    scenarioA:'Westfield University receives a <strong>$1,200,000 gift</strong> invested at an annual return of <strong>4.5%</strong>. The earnings are distributed as an annual scholarship.',
    scenarioB:'Eastridge University receives a <strong>$900,000 gift</strong> invested at an annual return of <strong>6.5%</strong>. The earnings are also distributed as an annual scholarship.',
    answer:"B",
    hint:"PMT = PV × r for each. A larger fund does not automatically generate more income.",
    explanation:"A higher rate on a smaller fund can generate more income than a lower rate on a larger one — you have to run the numbers.",
    calc:"A: PMT = $1,200,000 × 0.045 = $54,000/year\nB: PMT = $900,000 × 0.065 = $58,500/year\nScenario B pays out more each year."
  },
  {
    type:"rate", badge:"Higher Annual Return?", badgeClass:"pp-badge-rate",
    prompt:"Both perpetuities pay quarterly. Which offers the higher annual rate of return?",
    scenarioA:'An investor buys a fund for <strong>$480,000</strong> that pays <strong>$8,400 every quarter</strong>, forever.',
    scenarioB:'Another investor buys a fund for <strong>$350,000</strong> that pays <strong>$6,300 every quarter</strong>, forever.',
    answer:"B",
    hint:"Find quarterly r = PMT ÷ PV for each, then multiply by 4 to get the annual rate.",
    explanation:"Both funds look similar in size, but Scenario B generates a slightly higher return per dollar invested. You have to calculate both sides to see it.",
    calc:"A: r = $8,400 ÷ $480,000 = 1.75%/qtr × 4 = 7.0%/year\nB: r = $6,300 ÷ $350,000 = 1.8%/qtr × 4 = 7.2%/year\nScenario B has the higher annual return."
  },
  {
    type:"pv", badge:"Which Loses More Value?", badgeClass:"pp-badge-pv",
    prompt:"Interest rates just increased. Which perpetuity loses more dollar value?",
    scenarioA:'A bond fund pays <strong>$6,000 per year</strong> forever. The required annual return rises from <strong>4% to 5%</strong>.',
    scenarioB:'A second bond fund pays <strong>$10,000 per year</strong> forever. Its required annual return rises from <strong>8% to 10%</strong>.',
    answer:"A",
    hint:"Calculate PV before and after for each. Dollar loss = old PV − new PV.",
    explanation:"Scenario A has a lower rate, so its starting PV is very high. A small rate change causes a large dollar drop.",
    calc:"A: was $6,000÷0.04=$150,000 → now $6,000÷0.05=$120,000 → loss of $30,000\nB: was $10,000÷0.08=$125,000 → now $10,000÷0.10=$100,000 → loss of $25,000\nScenario A loses more despite the smaller payment."
  },
  {
    type:"pv", badge:"Higher Present Value?", badgeClass:"pp-badge-pv",
    prompt:"Which perpetuity has a higher present value?",
    scenarioA:'A pension fund pays <strong>$1,500 every month</strong> to a retired employee — forever. The fund earns <strong>7.2% per year</strong>.',
    scenarioB:'A second pension fund pays <strong>$4,800 every quarter</strong> to a different retiree — forever. This fund earns <strong>8% per year</strong>.',
    answer:"A",
    hint:"Convert to the correct periodic rate for each — monthly for A, quarterly for B.",
    explanation:"Even though B pays more per year in total, A uses a lower rate which raises its PV enough to come out ahead.",
    calc:"A: r = 7.2%÷12 = 0.6% → PV = $1,500 ÷ 0.006 = $250,000\nB: r = 8%÷4 = 2% → PV = $4,800 ÷ 0.02 = $240,000\nScenario A has the higher present value."
  },
  {
    type:"pmt", badge:"Higher Monthly Income?", badgeClass:"pp-badge-pmt",
    prompt:"Both investors put in the same amount. Whose monthly income is higher?",
    scenarioA:'Aaliya invests <strong>$360,000</strong> in a fund earning <strong>5% per year</strong>. The fund pays out earnings every month — forever.',
    scenarioB:'Ben invests <strong>$360,000</strong> in a fund earning <strong>5.4% per year</strong>. His fund pays out earnings every quarter — forever, but he wants to know his monthly equivalent.',
    answer:"B",
    hint:"For A: monthly PMT = PV × (annual rate ÷ 12). For B: quarterly PMT = PV × (annual rate ÷ 4), then divide by 3 for monthly equivalent.",
    explanation:"Same principal, but B earns a slightly higher rate — so B generates more income per month even after converting from quarterly.",
    calc:"A: monthly PMT = $360,000 × 0.004167 = $1,500/month\nB: quarterly PMT = $360,000 × 0.0135 = $4,860/qtr ÷ 3 = $1,620/month equivalent\nScenario B generates more monthly income."
  },
  {
    type:"rate", badge:"Higher Annual Return?", badgeClass:"pp-badge-rate",
    prompt:"One perpetuity pays monthly, one pays annually. Which offers the higher annual rate of return?",
    scenarioA:'Devon pays <strong>$240,000</strong> for an investment that pays <strong>$1,100 every month</strong>, indefinitely.',
    scenarioB:'Sam pays <strong>$195,000</strong> for an investment that pays <strong>$13,650 every year</strong>, indefinitely.',
    answer:"B",
    hint:"For A: find monthly r then × 12. For B: r = PMT ÷ PV gives you the annual rate directly.",
    explanation:"Devon paid more but earns a lower annual return. Always calculate — price alone tells you nothing about return.",
    calc:"A: r = $1,100 ÷ $240,000 = 0.458%/mo × 12 = 5.5%/year\nB: r = $13,650 ÷ $195,000 = 7%/year\nScenario B has the higher annual return."
  },
  {
    type:"pv", badge:"Larger Donation Needed?", badgeClass:"pp-badge-pv",
    prompt:"Two scholarships are being endowed forever. Which requires the larger initial donation?",
    scenarioA:'The Chen family wants to fund a scholarship paying <strong>$1,500 every month</strong> to a student — forever. The endowment earns <strong>9% per year</strong>.',
    scenarioB:'The Rivera family wants to fund a scholarship paying <strong>$5,500 every quarter</strong> to a student — forever. The endowment earns <strong>9% per year</strong>.',
    answer:"B",
    hint:"Use the matching periodic rate for each — monthly for A (9%÷12), quarterly for B (9%÷4).",
    explanation:"The Chen scholarship pays $18,000/year. The Rivera scholarship pays $22,000/year. Same rate, but a larger annual payout requires a larger endowment.",
    calc:"A: r = 9%÷12 = 0.75% → PV = $1,500 ÷ 0.0075 = $200,000\nB: r = 9%÷4 = 2.25% → PV = $5,500 ÷ 0.0225 = $244,444\nScenario B requires the larger donation."
  }
];

export default function PerpetuityPractice() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState([]); // 'correct' | 'wrong' per question
  const [picked, setPicked] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [screen, setScreen] = useState("game"); // 'game' | 'results'

  const q = QUESTIONS[current];
  const done = results.length;
  const progPct = (done / QUESTIONS.length) * 100;

  function selectAnswer(choice) {
    if (answered) return;
    const correct = choice === q.answer;
    setAnswered(true);
    setPicked(choice);
    const newResults = [...results, correct ? "correct" : "wrong"];
    setResults(newResults);
    if (correct) setScore(s => s + 1);
  }

  function nextQuestion() {
    if (current + 1 >= QUESTIONS.length) {
      setScreen("results");
    } else {
      setCurrent(c => c + 1);
      setAnswered(false);
      setPicked(null);
      setShowHint(false);
    }
  }

  function restart() {
    setCurrent(0);
    setScore(0);
    setAnswered(false);
    setPicked(null);
    setShowHint(false);
    setResults([]);
    setScreen("game");
  }

  function getBtnClass(option) {
    if (!answered) return "pp-option-btn";
    const isPicked = option === picked;
    const isCorrect = option === q.answer;
    if (isPicked && isCorrect) return "pp-option-btn correct";
    if (isPicked && !isCorrect) return "pp-option-btn wrong";
    if (!isPicked && isCorrect) return "pp-option-btn reveal-correct";
    return "pp-option-btn";
  }

  const finalPct = Math.round(score / QUESTIONS.length * 100);
  let compIcon = "★", compTitle = "", compMsg = "";
  if (finalPct >= 90) { compIcon = "★"; compTitle = "Outstanding!"; compMsg = "You have a strong conceptual grasp of perpetuities. Excellent work."; }
  else if (finalPct >= 70) { compIcon = "✓"; compTitle = "Good Work!"; compMsg = "Solid understanding. Review the questions you missed and pay attention to payment frequency."; }
  else if (finalPct >= 50) { compIcon = "↑"; compTitle = "Keep Practicing"; compMsg = "Remember: the rate must match the payment frequency, and small rate differences can swing PV dramatically."; }
  else { compIcon = "→"; compTitle = "Keep Going!"; compMsg = "Review the formula and focus on how rate and payment interact. Try again — you'll get it."; }

  return (
    <div className="pp-body">
      <style>{STYLE}</style>
      <div className="pp-main">

        {/* Progress */}
        <div className="pp-progress-section">
          <div className="pp-progress-header">
            <div className="pp-progress-label">Progress</div>
            <div className="pp-progress-count">{done} of {QUESTIONS.length} complete</div>
          </div>
          <div className="pp-progress-track">
            <div className="pp-progress-fill" style={{ width: progPct + "%" }} />
          </div>
          <div className="pp-dot-row">
            {QUESTIONS.map((_, i) => {
              let cls = "pp-dot";
              if (i === current && screen === "game") cls += " active";
              else if (results[i] === "correct") cls += " correct";
              else if (results[i] === "wrong") cls += " wrong";
              return <div key={i} className={cls} />;
            })}
          </div>
        </div>

        {/* Game screen */}
        {screen === "game" && (
          <>
            <div className="pp-q-header">
              <div className="pp-q-header-left">
                <div className="pp-q-num">Question {current + 1} of {QUESTIONS.length}</div>
                <div className={"pp-q-badge " + q.badgeClass}>{q.badge}</div>
              </div>
            </div>

            <div className="pp-q-prompt">{q.prompt}</div>

            <div className="pp-scenarios">
              <div className="pp-scenario-card">
                <div className="pp-scenario-label a">Scenario A</div>
                <p className="pp-scenario-text" dangerouslySetInnerHTML={{ __html: q.scenarioA }} />
              </div>
              <div className="pp-scenario-card">
                <div className="pp-scenario-label b">Scenario B</div>
                <p className="pp-scenario-text" dangerouslySetInnerHTML={{ __html: q.scenarioB }} />
              </div>
            </div>

            {showHint && (
              <div className="pp-hint-box">
                <strong>Hint:</strong> {q.hint}
              </div>
            )}

            {answered && (
              <div className={"pp-feedback-box " + (picked === q.answer ? "pp-feedback-correct" : "pp-feedback-wrong")}>
                <div className="pp-feedback-title">{picked === q.answer ? "✅ Correct!" : "✗ Not quite"}</div>
                <div className="pp-feedback-body">
                  {q.explanation}
                  <div className="pp-calc-line">{q.calc}</div>
                </div>
              </div>
            )}

            <div className="pp-options">
              {["A", "same", "B"].map(opt => (
                <button
                  key={opt}
                  className={getBtnClass(opt)}
                  disabled={answered}
                  onClick={() => selectAnswer(opt)}
                >
                  {opt === "same" ? "They're Equal" : "Scenario " + opt}
                  <span className="pp-option-sub">
                    {opt === "A" ? "A is higher" : opt === "B" ? "B is higher" : "Same value"}
                  </span>
                </button>
              ))}
            </div>

            <div className="pp-btn-row">
              {!answered && (
                <button className="pp-btn pp-btn-hint" onClick={() => setShowHint(h => !h)}>
                  💡 {showHint ? "Hide Hint" : "Hint"}
                </button>
              )}
              {answered && current < QUESTIONS.length - 1 && (
                <button className="pp-btn pp-btn-secondary" onClick={nextQuestion}>
                  Next Question →
                </button>
              )}
              {answered && current === QUESTIONS.length - 1 && (
                <button className="pp-btn pp-btn-primary" onClick={() => setScreen("results")}>
                  See Results →
                </button>
              )}
            </div>
          </>
        )}

        {/* Results screen */}
        {screen === "results" && (
          <div className="pp-completion">
            <span className="pp-completion-icon">{compIcon}</span>
            <h2>{compTitle}</h2>
            <p>{compMsg}</p>
            <div className="pp-score-cards">
              <div className="pp-score-card">
                <span className="pp-score-card-num">{score}</span>
                <div className="pp-score-card-label">Correct</div>
              </div>
              <div className="pp-score-card">
                <span className="pp-score-card-num">{finalPct}%</span>
                <div className="pp-score-card-label">Score</div>
              </div>
            </div>
            <button className="pp-btn pp-btn-primary" onClick={restart}>Try Again ↺</button>
          </div>
        )}

      </div>
    </div>
  );
}
