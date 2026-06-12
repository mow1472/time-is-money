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
  introStrong: { fontWeight: 700, color: "#1A3A5C" },
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
  tdLast: { padding: "9px 12px", borderBottom: "0.5px solid rgba(0,0,0,0.09)", color: "#5f5f5f", fontSize: 13, verticalAlign: "top" },
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
      {open && (
        <div style={styles.accInner}>
          {children}
        </div>
      )}
    </div>
  );
};

const Code = ({ children }) => <code style={styles.code}>{children}</code>;

export default function TVMInterestRate() {
  const [activeTab, setActiveTab] = useState("Calculator");

  return (
    <div style={styles.body}>
      <div style={styles.page}>
        {/* Intro box */}
        <div style={styles.introBox}>
          Knowing your actual rate of return helps you evaluate whether an investment is truly
          performing well. TVM lets you work backwards — if you know what you put in and what you
          got out, you can calculate exactly what annual return you earned.
          <p style={styles.scenarioLabel}>Consider the following scenario:</p>
          <ul style={styles.scenarioList}>
            {[
              <>You invested a lump sum of <strong style={styles.scenarioStrong}>$5,000</strong> six years ago</>,
              <>You made <strong style={styles.scenarioStrong}>no additional contributions</strong> during that time</>,
              <>Your investment has grown to <strong style={styles.scenarioStrong}>$9,000</strong> today</>,
              <>What <strong style={styles.scenarioStrong}>annual return (I/YR)</strong> did your investment earn?</>,
            ].map((item, i) => (
              <li key={i} style={styles.scenarioLi}>
                <span style={{ flexShrink: 0 }}><Bullet /></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Accordion */}
        <div style={styles.accordion}>

          {/* Calculator */}
          <AccordionItem title="Financial calculator (HP 10BII+)">
            <p style={styles.sectionNote}>
              Enter the following values into your HP 10BII+ calculator in any order, then solve for I/YR.
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
                  ["6", "N", "Total periods (6 years)"],
                  ["−5000", "PV", "Initial investment (cash out = negative)"],
                  ["0", "PMT", "No recurring payments"],
                  ["9000", "FV", "Current value of the investment"],
                ].map(([input, key, desc], i, arr) => (
                  <tr key={i}>
                    <td style={{ ...styles.td, borderBottom: i === arr.length - 1 ? "none" : styles.td.borderBottom }}>
                      <Code>{input}</Code>
                    </td>
                    <td style={{ ...styles.td, borderBottom: i === arr.length - 1 ? "none" : styles.td.borderBottom }}>
                      <Code>{key}</Code>
                    </td>
                    <td style={{ ...styles.tdLast, borderBottom: i === arr.length - 1 ? "none" : styles.tdLast.borderBottom }}>
                      {desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={styles.sectionNote}>Press <Code>I/YR</Code> to solve.</p>
            <div style={styles.resultLine}>I/YR = 10.29%</div>
            <div style={styles.tip}>
              PV is entered as negative because it represents money leaving your pocket at the time of investment.
              FV is positive because it is money coming back to you. The calculator solves for the annual rate that
              connects the two.
            </div>
          </AccordionItem>

          {/* Excel */}
          <AccordionItem title="Excel">
            <p style={styles.sectionNote}>
              Use Excel's built-in <Code>=RATE()</Code> function. Set up your spreadsheet by entering labels in
              column A and values in column B, then write the formula in cell B5.
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
                  ["1", "Periods (nper)", "6"],
                  ["2", "Payment (pmt)", "0"],
                  ["3", "Present value (pv)", "−5000"],
                  ["4", "Future value (fv)", "9000"],
                  ["5", "Annual rate (I/YR)", "=RATE(B1,B2,B3,B4)"],
                ].map(([row, a, b], i, arr) => (
                  <tr key={i}>
                    <td style={{ ...styles.td, borderBottom: i === arr.length - 1 ? "none" : styles.td.borderBottom }}>{row}</td>
                    <td style={{ ...styles.td, borderBottom: i === arr.length - 1 ? "none" : styles.td.borderBottom }}>{a}</td>
                    <td style={{ ...styles.tdLast, borderBottom: i === arr.length - 1 ? "none" : styles.tdLast.borderBottom }}>
                      {i === 4 ? <Code>{b}</Code> : b}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={styles.resultLine}>Result in B5: 10.29%</div>
            <div style={styles.tip}>
              Excel may return the result as a decimal (0.1029). Format cell B5 as a percentage to display it as 10.29%.
            </div>
          </AccordionItem>

          {/* Formula */}
          <AccordionItem title="Formula">
            <p style={styles.sectionNote}>
              When there are no recurring payments, solving for the interest rate only requires one step — take the
              nth root of the growth ratio and subtract 1.
            </p>
            <p style={styles.partHeading}>Interest rate formula</p>
            <div style={styles.formulaBlock}>r = (FV / PV)^(1/n) − 1</div>
            <p style={styles.partHeading}>Substitute the known values</p>
            <div style={styles.formulaBlock}>
              r = (9,000 / 5,000)^(1/6) − 1<br />
              r = (1.8)^(0.1667) − 1<br />
              r = 1.1027 − 1<br />
              <span style={styles.formulaAnswer}>r = 0.1029 = 10.29%</span>
            </div>
            <div style={styles.tip}>
              Where: n = total periods (6 years). The expression (1/n) is the same as taking the nth root — you are
              asking: what single annual rate, compounded 6 times, turns $5,000 into $9,000?
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
