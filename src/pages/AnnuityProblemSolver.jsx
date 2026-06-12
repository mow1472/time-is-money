import { useState, useEffect } from "react";

const BASE = { pmt: 1000, r: 0.05, n: 10 };
const SCENARIOS = {
  "FV-ordinary": {
    text: <>You deposit <mark>$1,000</mark> into a savings account at the <mark>end of each year</mark> for <mark>10 years</mark>. The account earns <mark>5% annual interest</mark>. How much will you have at the end of 10 years?</>,
    ...BASE, sf: "FV", due: false,
  },
  "FV-due": {
    text: <>You deposit <mark>$1,000</mark> into a savings account at the <mark>beginning of each year</mark> for <mark>10 years</mark>. The account earns <mark>5% annual interest</mark>. How much will you have at the end of 10 years?</>,
    ...BASE, sf: "FV", due: true,
  },
  "PV-ordinary": {
    text: <>An investment pays <mark>$1,000</mark> at the <mark>end of each year</mark> for <mark>10 years</mark>. If the discount rate is <mark>5% per year</mark>, what is the investment worth in today's dollars?</>,
    ...BASE, sf: "PV", due: false,
  },
  "PV-due": {
    text: <>An investment pays <mark>$1,000</mark> at the <mark>beginning of each year</mark> for <mark>10 years</mark>. If the discount rate is <mark>5% per year</mark>, what is the investment worth in today's dollars?</>,
    ...BASE, sf: "PV", due: true,
  },
};

const fmt = (n) =>
  "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function computeFinal(sf, r, n, pmt, due) {
  if (sf === "FV") {
    const f = (Math.pow(1 + r, n) - 1) / r;
    return due ? pmt * f * (1 + r) : pmt * f;
  } else {
    const f = (1 - Math.pow(1 + r, -n)) / r;
    return due ? pmt * f * (1 + r) : pmt * f;
  }
}

function buildSteps(sf, due, pmt, r, n, final, excelFormula, typeArg) {
  return [
    {
      excelTitle: "Identify Knowns",
      excelDesc: sf === "FV"
        ? "Read the problem carefully and extract every variable before opening your spreadsheet. You are solving for Future Value — the total amount accumulated after all payments."
        : "Read the problem carefully and extract every variable before opening your spreadsheet. You are solving for Present Value — what all future payments are worth in today's dollars.",
      excelVal: `PMT = ${fmt(pmt)} · r = ${(r * 100).toFixed(2)}% · N = ${n} · Solve for: ${sf}`,
      calcTitle: "Identify Knowns",
      calcDesc: sf === "FV"
        ? "Read the problem carefully and write down every variable before touching the calculator. You are solving for Future Value — the total amount accumulated after all payments."
        : "Read the problem carefully and write down every variable before touching the calculator. You are solving for Present Value — what all future payments are worth in today's dollars.",
      calcVal: `PMT = ${fmt(pmt)} · r = ${(r * 100).toFixed(2)}% · N = ${n} · Solve for: ${sf}`,
      excelRevealedRows: [], excelHL: null,
      calcKeys: [{ k: "—", d: "No keys yet — identify your variables first" }],
      calcFilled: { n: false, iyr: false, pmt: false },
    },
    {
      excelTitle: "Enter the Interest Rate",
      excelDesc: sf === "FV"
        ? `The problem states a ${(r * 100).toFixed(0)}% annual rate. Type this into cell B2 as a percentage — it is the rate at which your money grows each period.`
        : `The problem states a ${(r * 100).toFixed(0)}% discount rate. Type this into cell B2 as a percentage — it is used to bring future payments back to today's dollars.`,
      excelVal: `r = ${(r * 100).toFixed(2)}% entered in cell B2`,
      calcTitle: "Enter the Interest Rate",
      calcDesc: sf === "FV"
        ? `The problem states a ${(r * 100).toFixed(0)}% annual rate — the rate at which your money grows each period. Type it and press I/YR to store it.`
        : `The problem states a ${(r * 100).toFixed(0)}% discount rate — used to bring future payments back to today's dollars. Type it and press I/YR to store it.`,
      calcVal: `Type ${(r * 100).toFixed(4)}, then press I/YR`,
      excelRevealedRows: [2], excelHL: 2,
      calcKeys: [{ k: `${(r * 100).toFixed(4)}`, d: "type the rate value" }, { k: "I/YR", y: true, d: "press to store rate" }],
      calcFilled: { n: false, iyr: true, pmt: false },
    },
    {
      excelTitle: "Enter Number of Periods",
      excelDesc: sf === "FV"
        ? `The problem states ${n} years of payments. Type ${n} into cell B3. This is the total number of payments going forward.`
        : `The problem states ${n} years of payments. Type ${n} into cell B3. This is the total number of payments you will receive.`,
      excelVal: `N = ${n} entered in cell B3`,
      calcTitle: "Enter Number of Periods",
      calcDesc: sf === "FV"
        ? `The problem states ${n} years of payments — the total number of payments going forward. Type ${n} and press N to store it.`
        : `The problem states ${n} years of payments — the total number of payments you will receive. Type ${n} and press N to store it.`,
      calcVal: `Type ${n}, then press N`,
      excelRevealedRows: [2, 3], excelHL: 3,
      calcKeys: [{ k: `${n}`, d: "type the number of periods" }, { k: "N", y: true, d: "press to store N" }],
      calcFilled: { n: true, iyr: true, pmt: false },
    },
    {
      excelTitle: "Enter the Payment Amount",
      excelDesc: sf === "FV"
        ? `The problem states a ${fmt(pmt)} deposit each period. Type it as a negative number in cell B4 — it's cash leaving your hands, and =FV() requires outflows to be negative.`
        : `The problem states a ${fmt(pmt)} payment each period. Type it as a negative number in cell B4 — it's cash going out, and =PV() requires outflows to be negative.`,
      excelVal: `PMT = −${fmt(pmt)} entered in cell B4`,
      calcTitle: "Enter the Payment Amount",
      calcDesc: sf === "FV"
        ? `The problem states a ${fmt(pmt)} deposit each period — cash leaving your hands. Type it, press +/− to make it negative, then press PMT to store it.`
        : `The problem states a ${fmt(pmt)} payment each period — cash going out. Type it, press +/− to make it negative, then press PMT to store it.`,
      calcVal: `Type ${pmt}, press +/−, then press PMT`,
      excelRevealedRows: [2, 3, 4], excelHL: 4,
      calcKeys: [{ k: `${pmt}`, d: "type the payment amount" }, { k: "+/−", d: "flip sign to negative" }, { k: "PMT", y: true, d: "press to store PMT" }],
      calcFilled: { n: true, iyr: true, pmt: true },
    },
    {
      excelTitle: due ? "Set Type = 1 (Annuity Due)" : "Set Type = 0 (Ordinary)",
      excelDesc: due
        ? (sf === "FV"
          ? "The problem says payments are at the BEGINNING of each period. Type = 1 tells Excel this is an Annuity Due — each payment earns one extra period of interest, increasing the future value."
          : "The problem says payments are at the BEGINNING of each period. Type = 1 tells Excel this is an Annuity Due — each payment is discounted one fewer period, increasing the present value.")
        : (sf === "FV"
          ? "The problem says payments are at the END of each period. Type = 0 tells Excel this is an Ordinary Annuity — the standard assumption for most savings and loan problems."
          : "The problem says payments are at the END of each period. Type = 0 tells Excel this is an Ordinary Annuity — each payment is discounted by one full period from when it is received."),
      excelVal: due ? "Type = 1 entered in cell B5" : "Type = 0 entered in cell B5",
      calcTitle: due ? "Switch to BEGIN Mode" : "Confirm END Mode",
      calcDesc: due
        ? (sf === "FV"
          ? "The problem says payments are at the BEGINNING of each period — Annuity Due. Press 2ND then BEG/END to activate BEGIN mode. Each payment earns one extra period of interest."
          : "The problem says payments are at the BEGINNING of each period — Annuity Due. Press 2ND then BEG/END to activate BEGIN mode. Each payment is discounted one fewer period.")
        : (sf === "FV"
          ? "The problem says payments are at the END of each period — Ordinary Annuity. The HP 10bII+ defaults to END mode. Confirm no BEGIN indicator appears on the display."
          : "The problem says payments are at the END of each period — Ordinary Annuity. The HP 10bII+ defaults to END mode. Confirm no BEGIN indicator appears on the display."),
      calcVal: due ? "Press 2ND → BEG/END to activate BEGIN mode" : "END mode is default — confirm no BGN shown",
      excelRevealedRows: [2, 3, 4, 5], excelHL: 5,
      calcKeys: due
        ? [{ k: "2ND", y: true, d: "access second function" }, { k: "BEG/END", d: "toggle to BEGIN mode" }]
        : [{ k: "—", d: "END is default — verify no BGN on display" }],
      calcFilled: { n: true, iyr: true, pmt: true },
    },
    {
      excelTitle: sf === "FV" ? "Enter the =FV() Formula" : "Enter the =PV() Formula",
      excelDesc: sf === "FV"
        ? `Type the =FV() formula into cell B6. Excel uses your rate, N, PMT, and type to calculate the total value of all deposits at the end of ${n} years.`
        : `Type the =PV() formula into cell B6. Excel uses your rate, N, PMT, and type to calculate what all ${n} payments are worth in today's dollars.`,
      excelVal: `${sf} = ${fmt(final)}`,
      calcTitle: sf === "FV" ? "Press FV to Compute" : "Press PV to Compute",
      calcDesc: sf === "FV"
        ? `Press the FV key. The calculator uses all stored registers to compute the total value of all deposits at the end of ${n} years.`
        : `Press the PV key. The calculator uses all stored registers to compute what all ${n} payments are worth in today's dollars.`,
      calcVal: `Press ${sf} → result: ${fmt(final)}`,
      excelRevealedRows: [2, 3, 4, 5, 6], excelHL: 6,
      calcKeys: [{ k: sf, y: true, d: `press to compute and display ${sf}` }],
      calcFilled: { n: true, iyr: true, pmt: true },
    },
  ];
}

/* ── Styles ── */
const s = {
  body: { fontFamily: "'Open Sans', Arial, sans-serif", color: "#002E5D", background: "#f4f5f7", minHeight: "100vh", padding: "24px 16px" },
  wrap: { maxWidth: 880, margin: "0 auto" },
  hdr: { background: "#002E5D", borderRadius: 12, padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 },
  hdrTitle: { color: "#fff", fontSize: 18, fontWeight: 700 },
  pillGroup: { display: "flex", background: "#EAEAF1", borderRadius: 50, padding: 3, gap: 2 },
  pill: (active) => ({
    padding: "6px 16px", border: "none", borderRadius: 50, cursor: "pointer",
    fontFamily: "'Open Sans', Arial, sans-serif", fontSize: 12, fontWeight: 600,
    color: active ? "#fff" : "#747480",
    background: active ? "#002E5D" : "transparent",
    boxShadow: active ? "0 0 0 3px #FFE60055, 0 0 14px 3px #FFE60044" : "none",
    display: "flex", alignItems: "center", gap: 5, transition: "all 0.22s ease", whiteSpace: "nowrap", outline: "none",
  }),
  controlsRow: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, gap: 12, flexWrap: "wrap" },
  problemCard: { background: "#fff", border: "1.5px solid #C2C2CE", borderRadius: 11, padding: "18px 20px", marginBottom: 18 },
  problemLabel: { fontSize: 10, fontWeight: 700, color: "#747480", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 },
  problemText: { fontSize: 13, color: "#002E5D", lineHeight: 1.7 },
  mainArea: { display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,1.55fr)", gap: 14 },
  stepPanel: { display: "flex", flexDirection: "column" },
  stepCard: { background: "#EAEAF1", borderRadius: 11, padding: "20px 18px", flex: 1, display: "flex", flexDirection: "column", minHeight: 230 },
  stepCounter: { fontSize: 11, fontWeight: 700, color: "#747480", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 8 },
  stepTitle: { fontSize: 17, fontWeight: 700, color: "#002E5D", marginBottom: 8, lineHeight: 1.3 },
  stepDesc: { fontSize: 12, color: "#747480", lineHeight: 1.65, marginBottom: 12, flex: 1 },
  stepVal: { background: "#fff", borderRadius: 7, padding: "11px 13px", fontSize: 13, fontWeight: 700, color: "#0d65c7", borderLeft: "3px solid #FFE600" },
  dotsRow: { display: "flex", gap: 6, justifyContent: "center", marginTop: 11 },
  dot: (state) => ({ width: 7, height: 7, borderRadius: "50%", background: state === "done" ? "#0d65c7" : state === "active" ? "#002E5D" : "#C2C2CE", transition: "background 0.2s" }),
  navRow: { display: "flex", gap: 8, marginTop: 12 },
  navBtn: (disabled) => ({
    flex: 1, padding: 9, border: "1.5px solid #002E5D", borderRadius: 7,
    background: "#fff", color: "#002E5D",
    fontFamily: "'Open Sans', Arial, sans-serif", fontSize: 13, fontWeight: 700,
    cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.28 : 1, transition: "all 0.18s",
  }),
  rightPanel: { borderRadius: 11, border: "1.5px solid #C2C2CE", overflow: "hidden", background: "#fff" },
  rpHeader: { background: "#002E5D", padding: "10px 15px", fontSize: 11, fontWeight: 700, color: "#FFE600", letterSpacing: "0.5px", textTransform: "uppercase" },
  answerRow: { display: "flex", alignItems: "center", justifyContent: "space-between", background: "#FFE600", borderRadius: 10, padding: "14px 20px", marginTop: 14 },
  ansLabel: { fontSize: 11, fontWeight: 700, color: "#002E5D", textTransform: "uppercase", letterSpacing: "0.5px" },
  ansVal: { fontSize: 26, fontWeight: 700, color: "#002E5D" },
};

/* ── Excel panel ── */
function ExcelPanel({ step, D, atype, isLast }) {
  const { r, n, pmt, sf, final, excelFormula, typeArg } = D;
  const { excelRevealedRows: revealed, excelHL: hl } = step;
  const allRows = [
    { r: 2, lbl: "Rate per period (r)",           v: (r * 100).toFixed(2) + "%", f: "" },
    { r: 3, lbl: "Periods (N)",                   v: n,                           f: "" },
    { r: 4, lbl: "PMT (payment)",                 v: "−" + fmt(pmt),             f: "" },
    { r: 5, lbl: "Annuity type (0=end, 1=begin)", v: typeArg,                     f: "" },
    { r: 6, lbl: sf + " — answer",                v: fmt(final),                  f: excelFormula },
  ];
  const cellBase = { padding: "5px 8px", border: "1px solid #ddd", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" };
  return (
    <div>
      <div style={{ background: "#f0f0f0", borderBottom: "1px solid #ddd", padding: "3px 9px", fontSize: 10, color: "#888", fontFamily: "Arial, sans-serif", display: "flex", gap: 12 }}>
        <span>File</span><span>Edit</span><span style={{ color: "#002E5D", fontWeight: 700 }}>Annuity.xlsx</span>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "Arial, sans-serif", fontSize: 12, tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ ...cellBase, background: "#e8e8e8", color: "#555", fontWeight: 700, fontSize: 10, textAlign: "center", width: 28 }}></th>
            <th style={{ ...cellBase, background: "#e8e8e8", color: "#555", fontWeight: 700, fontSize: 10, width: "42%" }}>A — description</th>
            <th style={{ ...cellBase, background: "#e8e8e8", color: "#555", fontWeight: 700, fontSize: 10, width: "22%" }}>B — value</th>
            <th style={{ ...cellBase, background: "#e8e8e8", color: "#555", fontWeight: 700, fontSize: 10, width: "32%" }}>C — formula</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ ...cellBase, background: "#f5f5f5", fontSize: 10, color: "#888", textAlign: "center", fontWeight: 700 }}>1</td>
            <td colSpan={3} style={{ ...cellBase, background: "#002E5D", color: "#FFE600", fontSize: 11, fontWeight: 700, padding: "6px 9px" }}>
              {atype === "due" ? "Annuity Due" : "Ordinary Annuity"} solver
            </td>
          </tr>
          {allRows.map((row) => {
            const show = revealed.includes(row.r);
            const isHL = hl === row.r;
            const isFin = row.r === 6 && isLast;
            return (
              <tr key={row.r} style={isHL ? { background: "#fffde7" } : {}}>
                <td style={{ ...cellBase, background: "#f5f5f5", fontSize: 10, color: "#888", textAlign: "center", fontWeight: 700 }}>{row.r}</td>
                <td style={{ ...cellBase, color: show ? "#222" : "#fff", fontWeight: isHL ? 700 : "normal" }}>{show ? row.lbl : ""}</td>
                <td style={{ ...cellBase, color: show ? (isFin ? "#FFE600" : "#0d65c7") : "#fff", fontWeight: show ? 600 : "normal", background: isFin && show ? "#002E5D" : "transparent" }}>{show ? row.v : ""}</td>
                <td style={{ ...cellBase, color: show && row.f ? "#0a6b0a" : "#fff", fontStyle: "italic", fontSize: 11 }}>{show && row.f ? row.f : ""}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ── Calculator panel ── */
function CalcPanel({ step, D, isLast }) {
  const { r, n, pmt, sf, final } = D;
  const { calcKeys: keys, calcFilled: f } = step;
  const regs = [
    { name: "N",    val: n,                                           filled: f.n },
    { name: "I/YR", val: (r * 100).toFixed(2) + "%",                 filled: f.iyr },
    { name: "PV",   val: sf === "PV" && isLast ? fmt(final) : "0",   filled: sf === "PV" && isLast },
    { name: "PMT",  val: "−" + fmt(pmt),                             filled: f.pmt },
    { name: "FV",   val: sf === "FV" && isLast ? fmt(final) : "0",   filled: sf === "FV" && isLast },
  ];
  const screenTxt = isLast ? fmt(final) : keys.length ? keys[keys.length - 1].k : "…";
  return (
    <div style={{ padding: 13, display: "flex", flexDirection: "column", gap: 11 }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#747480", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>Display</div>
        <div style={{ background: "#002E5D", borderRadius: 7, padding: "11px 15px", fontFamily: "'Courier New', monospace", color: "#aaeeff", fontSize: 14, minHeight: 44, display: "flex", alignItems: "center" }}>
          {screenTxt}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#747480", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>Keys to press</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {keys.map((k, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 9, padding: "7px 11px", background: "#EAEAF1", borderRadius: 7 }}>
              <span style={{ background: k.y ? "#FFE600" : "#002E5D", color: k.y ? "#002E5D" : "#fff", borderRadius: 5, padding: "4px 9px", fontSize: 11, fontWeight: 700, fontFamily: "'Courier New', monospace", whiteSpace: "nowrap", flexShrink: 0 }}>{k.k}</span>
              <span style={{ fontSize: 11, color: "#747480" }}>{k.d}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: "#747480", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>Register status</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 5 }}>
          {regs.map((reg) => (
            <div key={reg.name} style={{ borderRadius: 6, padding: "6px 4px", textAlign: "center", background: reg.filled ? "#0d65c7" : "#EAEAF1", transition: "background 0.2s" }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: reg.filled ? "#aaeeff" : "#747480", textTransform: "uppercase", letterSpacing: "0.3px" }}>{reg.name}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: reg.filled ? "#fff" : "#002E5D", marginTop: 2 }}>{reg.filled ? reg.val : "—"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnnuityProblemSolver() {
  const [mode, setMode] = useState("calc");
  const [atype, setAtype] = useState("ordinary");
  const [sf, setSf] = useState("FV");
  const [cur, setCur] = useState(0);

  const scKey = `${sf}-${atype}`;
  const sc = SCENARIOS[scKey];
  const { pmt, r, n, due } = sc;
  const final = computeFinal(sf, r, n, pmt, due);
  const typeArg = due ? 1 : 0;
  const excelFormula = sf === "FV"
    ? `=FV(${(r * 100).toFixed(2)}%,${n},${-pmt},0,${typeArg})`
    : `=PV(${(r * 100).toFixed(2)}%,${n},${-pmt},0,${typeArg})`;
  const D = { pmt, r, n, sf, due, final, excelFormula, typeArg };
  const steps = buildSteps(sf, due, pmt, r, n, final, excelFormula, typeArg);
  const isLast = cur === steps.length - 1;
  const step = steps[cur];

  // Reset step when scenario changes
  useEffect(() => { setCur(0); }, [sf, atype]);

  const handleSetMode = (m) => setMode(m);
  const handleSetAtype = (t) => setAtype(t);
  const handleSetSf = (v) => setSf(v);

  return (
    <div style={s.body}>
      <div style={s.wrap}>
        {/* Header */}
        <div style={s.hdr}>
          <div>
            <div style={s.hdrTitle}>Annuity Problem: A Step-by-Step Walkthrough</div>
          </div>
        </div>

        {/* Toggles */}
        <div style={s.controlsRow}>
          <div style={s.pillGroup}>
            <button style={s.pill(mode === "calc")} onClick={() => handleSetMode("calc")}>HP 10bII+</button>
            <button style={s.pill(mode === "excel")} onClick={() => handleSetMode("excel")}>Excel</button>
          </div>
          <div style={s.pillGroup}>
            <button style={s.pill(sf === "FV")} onClick={() => handleSetSf("FV")}>Future Value</button>
            <button style={s.pill(sf === "PV")} onClick={() => handleSetSf("PV")}>Present Value</button>
          </div>
          <div style={s.pillGroup}>
            <button style={s.pill(atype === "ordinary")} onClick={() => handleSetAtype("ordinary")}>Ordinary</button>
            <button style={s.pill(atype === "due")} onClick={() => handleSetAtype("due")}>Annuity Due</button>
          </div>
        </div>

        {/* Word problem */}
        <div style={s.problemCard}>
          <div style={s.problemLabel}>Problem</div>
          <div style={{ ...s.problemText }}>
            <style>{`mark { background: #fffde7; border-radius: 3px; padding: 0 2px; font-weight: 700; color: #002E5D; }`}</style>
            {sc.text}
          </div>
        </div>

        {/* Main area */}
        <div style={s.mainArea}>
          {/* Step panel */}
          <div style={s.stepPanel}>
            <div style={s.stepCard}>
              <div style={s.stepCounter}>Step {cur + 1} of {steps.length}</div>
              <div style={s.stepTitle}>{mode === "excel" ? step.excelTitle : step.calcTitle}</div>
              <div style={s.stepDesc}>{mode === "excel" ? step.excelDesc : step.calcDesc}</div>
              <div style={s.stepVal}>{mode === "excel" ? step.excelVal : step.calcVal}</div>
            </div>
            {/* Progress dots */}
            <div style={s.dotsRow}>
              {steps.map((_, i) => (
                <div key={i} style={s.dot(i < cur ? "done" : i === cur ? "active" : "empty")} />
              ))}
            </div>
            {/* Nav */}
            <div style={s.navRow}>
              <button style={s.navBtn(cur === 0)} disabled={cur === 0} onClick={() => setCur(c => c - 1)}>← Back</button>
              <button style={s.navBtn(isLast)} disabled={isLast} onClick={() => setCur(c => c + 1)}>Next →</button>
            </div>
          </div>

          {/* Right panel */}
          <div style={s.rightPanel}>
            <div style={s.rpHeader}>{mode === "calc" ? "HP 10bII+ calculator" : "Excel sheet"}</div>
            {mode === "excel"
              ? <ExcelPanel step={step} D={D} atype={atype} isLast={isLast} />
              : <CalcPanel step={step} D={D} isLast={isLast} />
            }
          </div>
        </div>

        {/* Answer banner */}
        {isLast && (
          <div style={s.answerRow}>
            <div style={s.ansLabel}>{sf === "FV" ? "Future Value (FV)" : "Present Value (PV)"}</div>
            <div style={s.ansVal}>{fmt(final)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
