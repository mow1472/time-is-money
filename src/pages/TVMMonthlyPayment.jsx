import { useState } from "react";

const styles = {
  body: {
    fontFamily: "Arial, Helvetica, sans-serif",
    background: "#f0f0ed",
    color: "#1a1a1a",
    minHeight: "100vh",
    padding: "2.5rem 1rem 4rem",
  },
  page: { maxWidth: 680, margin: "0 auto" },
  introBox: {
    background: "#ffffff",
    border: "0.5px solid rgba(0,0,0,0.09)",
    borderLeft: "4px solid #F5C518",
    borderRadius: "0 10px 10px 0",
    padding: "1.25rem 1.5rem",
    marginBottom: "1.5rem",
    fontSize: 15,
    lineHeight: 1.75,
    color: "#1a1a1a",
  },
  scenarioLabel: { fontSize: 14, fontWeight: 400, color: "#1a1a1a", margin: "1rem 0 0.4rem" },
  scenarioList: { listStyle: "none", padding: 0, margin: 0 },
  scenarioLi: { display: "flex", alignItems: "baseline", gap: 8, padding: "3px 0", fontSize: 14.5, color: "#1a1a1a", lineHeight: 1.6 },
  scenarioStrong: { fontWeight: 700, color: "#1A3A5C" },
  accordion: { display: "flex", flexDirection: "column", gap: 8 },
  accItem: (open) => ({
    background: "#ffffff",
    border: `0.5px solid ${open ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.09)"}`,
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: open ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  }),
  accHeader: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "15px 18px", cursor: "pointer", userSelect: "none",
    fontWeight: 600, fontSize: 15, color: "#1A3A5C",
    background: "transparent", border: "none", width: "100%", textAlign: "left",
    gap: 12, fontFamily: "Arial, Helvetica, sans-serif",
  },
  accIcon: (open) => ({
    width: 26, height: 26, borderRadius: "50%",
    background: "#F5C518", color: "#1a1a1a",
    fontSize: 20, fontWeight: 400,
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0,
    transform: open ? "rotate(45deg)" : "rotate(0deg)",
    transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
    lineHeight: 1, paddingBottom: 1,
  }),
  accInner: { padding: "0 18px 18px", borderTop: "0.5px solid rgba(0,0,0,0.09)" },
  sectionNote: { fontSize: 13.5, color: "#5f5f5f", margin: "12px 0 10px", lineHeight: 1.6 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13.5, margin: "12px 0" },
  th: {
    textAlign: "left", padding: "9px 12px",
    background: "#eef0f4", color: "#5f5f5f",
    fontWeight: 600, fontSize: 12,
    textTransform: "uppercase", letterSpacing: "0.05em",
    borderBottom: "0.5px solid rgba(0,0,0,0.15)",
  },
  td: { padding: "9px 12px", borderBottom: "0.5px solid rgba(0,0,0,0.09)", color: "#1a1a1a", verticalAlign: "top" },
  tdMuted: { padding: "9px 12px", borderBottom: "0.5px solid rgba(0,0,0,0.09)", color: "#5f5f5f", fontSize: 13, verticalAlign: "top" },
  code: {
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 12.5, background: "#eef2f7",
    padding: "2px 6px", borderRadius: 5,
    color: "#1e4976", fontWeight: 700,
  },
  resultLine: {
    display: "inline-flex", alignItems: "center", gap: 8,
    background: "#FFFBEA", border: "0.5px solid #e8d06a",
    borderRadius: 8, padding: "9px 14px",
    fontSize: 15, fontWeight: 600, color: "#7a6200", margin: "10px 0",
  },
  tip: {
    background: "#EAF2FB",
    borderLeft: "3px solid #2d6fa8",
    borderRadius: "0 8px 8px 0",
    padding: "10px 14px", fontSize: 13,
    color: "#1a1a1a", lineHeight: 1.65, marginTop: 10,
  },
  partHeading: {
    fontSize: 12, fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.08em",
    color: "#5f5f5f", margin: "16px 0 6px",
  },
  formulaBlock: {
    background: "#f2f4f7", borderRadius: 8,
    padding: "12px 16px", fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: 13, color: "#1a1a1a", lineHeight: 2, margin: "6px 0",
  },
  formulaAnswer: { color: "#1e4976", fontWeight: 600 },
  costTable: { width: "100%", borderCollapse: "collapse", fontSize: 14, margin: "10px 0" },
  costTd: { padding: "10px 14px", borderBottom: "0.5px solid rgba(0,0,0,0.09)" },
  costTdLabel: { padding: "10px 14px", borderBottom: "0.5px solid rgba(0,0,0,0.09)", color: "#5f5f5f", fontSize: 13 },
  costTdValue: { padding: "10px 14px", borderBottom: "0.5px solid rgba(0,0,0,0.09)", fontWeight: 600, color: "#1a1a1a", textAlign: "right" },
  costTdLabelHL: { padding: "10px 14px", borderBottom: "none", color: "#7a6200", fontWeight: 600, background: "#FFFBEA" },
  costTdValueHL: { padding: "10px 14px", borderBottom: "none", fontWeight: 600, color: "#7a6200", textAlign: "right", background: "#FFFBEA" },
  videoTabs: { display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" },
  vtab: (active) => ({
    padding: "7px 18px", borderRadius: 999,
    border: `0.5px solid ${active ? "#c9a000" : "rgba(0,0,0,0.15)"}`,
    fontSize: 13, fontWeight: active ? 600 : 500, cursor: "pointer",
    background: active ? "#F5C518" : "#f0f2f5",
    color: active ? "#1a1a1a" : "#5f5f5f",
    fontFamily: "Arial, Helvetica, sans-serif",
    transition: "all 0.15s",
  }),
  videoFrame: {
    background: "#eaecf0", border: "0.5px solid rgba(0,0,0,0.15)",
    borderRadius: 10, aspectRatio: "16/9",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    gap: 14, position: "relative", overflow: "hidden",
  },
  playCircle: {
    width: 60, height: 60, borderRadius: "50%",
    background: "#1A3A5C", display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 4px 20px rgba(26,58,92,0.25)",
  },
  videoTitle: { fontSize: 15, fontWeight: 500, color: "#1a1a1a" },
  videoBadge: { fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#aaa" },
};

const Bullet = () => (
  <svg width="9" height="11" viewBox="0 0 9 11" fill="none" style={{ display: "block" }}>
    <path d="M0 0.5L9 5.5L0 10.5V0.5Z" fill="#F5C518" />
  </svg>
);

const AccordionItem = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={styles.accItem(open)}>
      <button style={styles.accHeader} onClick={() => setOpen(!open)}>
        {title}
        <span style={styles.accIcon(open)}>+</span>
      </button>
      {open && <div style={styles.accInner}>{children}</div>}
    </div>
  );
};

const Code = ({ children }) => <code style={styles.code}>{children}</code>;

export default function TVMMonthlyPayment() {
  const [activeTab, setActiveTab] = useState("Calculator");

  return (
    <div style={styles.body}>
      <div style={styles.page}>
        {/* Intro box */}
        <div style={styles.introBox}>
          When a business finances new equipment, the monthly payment becomes a fixed operating expense.
          Calculating this payment accurately is vital for cash flow management and determining the true cost of growth.
          <p style={styles.scenarioLabel}>Consider the following scenario:</p>
          <ul style={styles.scenarioList}>
            {[
              <>A business is financing <strong style={styles.scenarioStrong}>$100,000</strong> in new machinery</>,
              <>The loan term is <strong style={styles.scenarioStrong}>5 years</strong> (60 monthly payments)</>,
              <>The interest rate is <strong style={styles.scenarioStrong}>7.0% APR</strong></>,
              <>What is the required <strong style={styles.scenarioStrong}>monthly payment (PMT)?</strong></>,
            ].map((item, i) => (
              <li key={i} style={styles.scenarioLi}>
                <span style={{ flexShrink: 0 }}><Bullet /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={styles.accordion}>
          {/* Calculator */}
          <AccordionItem title="Financial calculator (HP 10BII+)">
            <p style={styles.sectionNote}>
              Business loans are paid monthly, so N and I/YR must be converted to monthly units before solving.
              Enter the following values in any order, then solve for PMT.
            </p>
            <p style={{ ...styles.sectionNote, marginTop: -4 }}>
              Note: Clear your calculator before starting a new TVM problem to avoid using old values.
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Input</th>
                  <th style={styles.th}>Key</th>
                  <th style={styles.th}>What it represents</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["60", "N", "60 months (5 years × 12)"],
                  ["7 ÷ 12", "I/YR", "0.5833% monthly rate"],
                  ["100000", "PV", "Loan amount (cash in = positive)"],
                  ["0", "FV", "Loan is fully paid off at the end"],
                ].map(([input, key, desc], i, arr) => (
                  <tr key={i}>
                    <td style={{ ...styles.td, borderBottom: i === arr.length - 1 ? "none" : styles.td.borderBottom }}>
                      <Code>{input}</Code>
                    </td>
                    <td style={{ ...styles.td, borderBottom: i === arr.length - 1 ? "none" : styles.td.borderBottom }}>
                      <Code>{key}</Code>
                    </td>
                    <td style={{ ...styles.tdMuted, borderBottom: i === arr.length - 1 ? "none" : styles.tdMuted.borderBottom }}>
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={styles.sectionNote}>Press <Code>PMT</Code> to solve.</p>
            <div style={styles.resultLine}>PMT = −$1,980.12 / month</div>
            <div style={styles.tip}>
              PV is entered as positive because the loan proceeds flow into the business. The calculator returns PMT
              as a negative number — money flowing out each month as a payment. The business should budget{" "}
              <strong>$1,980.12</strong> per month for this loan.
            </div>
          </AccordionItem>

          {/* Excel */}
          <AccordionItem title="Excel">
            <p style={styles.sectionNote}>
              Use Excel's built-in <Code>=PMT()</Code> function. Set up your spreadsheet by entering labels in
              column A and values in column B, then write the formulas in cells B2, B6, and B7.
            </p>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Row</th>
                  <th style={styles.th}>A</th>
                  <th style={styles.th}>B</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["1", "APR", "7%"],
                  ["2", "Monthly rate", "=B1/12"],
                  ["3", "Periods (n)", "60"],
                  ["4", "Loan amount (PV)", "100000"],
                  ["5", "Future value (FV)", "0"],
                  ["6", "Monthly payment", "=PMT(B2,B3,B4,B5)"],
                  ["7", "Total interest paid", "=(B6*B3)-B4"],
                ].map(([row, a, b], i, arr) => {
                  const isFormula = b.startsWith("=");
                  return (
                    <tr key={i}>
                      <td style={{ ...styles.td, borderBottom: i === arr.length - 1 ? "none" : styles.td.borderBottom }}>{row}</td>
                      <td style={{ ...styles.td, borderBottom: i === arr.length - 1 ? "none" : styles.td.borderBottom }}>{a}</td>
                      <td style={{ ...styles.tdMuted, borderBottom: i === arr.length - 1 ? "none" : styles.tdMuted.borderBottom }}>
                        {isFormula ? <Code>{b}</Code> : b}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div style={styles.resultLine}>Result in B6: ($1,980.12)</div>
            <div style={styles.tip}>
              Excel displays the result in parentheses to indicate a negative cash flow. Use{" "}
              <Code>=ABS(PMT(...))</Code> if you want to display the payment as a positive number.
            </div>
            <div style={{ ...styles.tip, marginTop: 8 }}>
              The formula in B7 calculates total interest paid over the life of the loan — a useful figure for
              evaluating the true cost of financing.
            </div>
          </AccordionItem>

          {/* Formula */}
          <AccordionItem title="Formula">
            <p style={styles.sectionNote}>
              Because payments are monthly, the annual rate and years must first be converted to monthly equivalents
              before plugging into the PMT formula.
            </p>
            <p style={styles.partHeading}>Step 1 — Convert to monthly units</p>
            <div style={styles.formulaBlock}>
              Monthly rate (r) = 0.07 / 12 = 0.005833<br />
              Periods (n) = 5 × 12 = 60 months
            </div>
            <p style={styles.partHeading}>Step 2 — Apply the PMT formula</p>
            <div style={styles.formulaBlock}>
              PMT = PV × [r × (1 + r)ⁿ] / [(1 + r)ⁿ − 1]<br />
              PMT = 100,000 × [0.005833 × (1.005833)⁶⁰] / [(1.005833)⁶⁰ − 1]<br />
              PMT = 100,000 × [0.005833 × 1.4176] / [1.4176 − 1]<br />
              PMT = 100,000 × 0.008270 / 0.4176<br />
              <span style={styles.formulaAnswer}>PMT = $1,980.12 / month</span>
            </div>
            <p style={styles.partHeading}>Total cost analysis</p>
            <table style={styles.costTable}>
              <tbody>
                <tr>
                  <td style={{ ...styles.costTdLabel, borderBottom: "0.5px solid rgba(0,0,0,0.09)" }}>Total payments (60 × $1,980.12)</td>
                  <td style={{ ...styles.costTdValue, borderBottom: "0.5px solid rgba(0,0,0,0.09)" }}>$118,807.20</td>
                </tr>
                <tr>
                  <td style={{ ...styles.costTdLabel, borderBottom: "0.5px solid rgba(0,0,0,0.09)" }}>Principal borrowed</td>
                  <td style={{ ...styles.costTdValue, borderBottom: "0.5px solid rgba(0,0,0,0.09)" }}>$100,000.00</td>
                </tr>
                <tr>
                  <td style={styles.costTdLabelHL}>Total interest paid</td>
                  <td style={styles.costTdValueHL}>$18,807.20</td>
                </tr>
              </tbody>
            </table>
            <div style={styles.tip}>
              Where: r = monthly rate (7% ÷ 12) and n = total monthly periods (60). The total interest figure shows
              the real cost of borrowing — the business pays $18,807.20 above the original loan amount over the
              5-year term.
            </div>
          </AccordionItem>

          {/* Video */}
          <AccordionItem title="Video walkthrough">
            <div style={{ paddingTop: 12 }}>
              <div style={styles.videoTabs}>
                {["Calculator", "Excel", "Formula"].map((tab) => (
                  <button key={tab} style={styles.vtab(activeTab === tab)} onClick={() => setActiveTab(tab)}>
                    {tab}
                  </button>
                ))}
              </div>
              <div style={styles.videoFrame}>
                <div style={styles.playCircle}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ marginLeft: 5 }}>
                    <path d="M7 4l13 7-13 7V4z" fill="white" />
                  </svg>
                </div>
                <p style={styles.videoTitle}>{activeTab} walkthrough</p>
                <p style={styles.videoBadge}>Coming soon</p>
              </div>
              <p style={{ fontSize: 12, color: "#aaa", marginTop: 10, textAlign: "center" }}>
                Select a method above to switch between video options
              </p>
            </div>
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}
