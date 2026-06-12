import { useState, useRef } from "react";

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap');
:root{--navy:#002E5D;--navy2:#003f7f;--yellow:#FFE600;--yellowD:#F2BA05;--blue:#0d65c7;--blueL:#B5E2FA;--blueP:#ddeeff;--gL:#EAEAF1;--gM:#C2C2CE;--gD:#747480;--white:#ffffff;--green:#6E9600;--greenL:#eef5d9;--orange:#F88400;--orangeL:#fff3e0;}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
.wyr-body{font-family:'Open Sans',Arial,sans-serif;background:#f0f0f5;color:var(--navy);min-height:100vh}
.hdr{background:var(--navy);border-bottom:4px solid var(--yellow)}
.hdr-in{max-width:800px;margin:0 auto;padding:1rem 1.5rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;flex-wrap:wrap}
.logo{display:flex;align-items:center;gap:12px}
.logo-mark{background:var(--yellow);width:42px;height:42px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.logo h1{font-size:.95rem;font-weight:800;color:#fff;line-height:1.2}
.logo p{font-size:10px;color:var(--blueL);font-weight:600;text-transform:uppercase;letter-spacing:.08em;margin-top:2px}
.hdr-score{display:flex;gap:8px;align-items:center}
.schip{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:20px;padding:5px 14px;text-align:center;min-width:58px}
.schip .n{font-size:1.1rem;font-weight:800;color:var(--yellow);line-height:1;display:block}
.schip .l{font-size:10px;text-transform:uppercase;letter-spacing:.09em;color:rgba(255,255,255,.5);font-weight:600}
.prog{background:var(--navy2);height:4px}
.prog-fill{height:100%;background:var(--yellow);transition:width .5s ease;width:0%}
.wyr-main{max-width:800px;margin:0 auto;padding:2rem 1.5rem 3rem}
.intro{background:var(--navy);border-radius:16px;padding:3.5rem 2rem;text-align:center;border-bottom:5px solid var(--yellow)}
.eyebrow{display:inline-block;background:var(--yellow);color:var(--navy);font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.12em;padding:4px 14px;border-radius:999px;margin-bottom:1.5rem}
.intro h2{font-size:clamp(2rem,5vw,3rem);font-weight:800;color:#fff;line-height:1.1;margin-bottom:1rem;letter-spacing:-.02em}
.intro h2 em{color:var(--yellow);font-style:normal}
.intro p{font-size:15px;color:var(--blueL);max-width:480px;margin:0 auto 2rem;line-height:1.7}
.btn-start{background:var(--yellow);color:var(--navy);font-family:'Open Sans',Arial,sans-serif;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;border:none;border-radius:8px;padding:.9rem 2.5rem;cursor:pointer;transition:background .15s,transform .1s}
.btn-start:hover{background:var(--yellowD);transform:translateY(-1px)}
.qmeta{display:flex;align-items:center;gap:10px;margin-bottom:1.25rem}
.ctag{background:var(--blue);color:#fff;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:4px 12px;border-radius:999px}
.qnum{font-size:12px;font-weight:700;color:var(--gD);text-transform:uppercase;letter-spacing:.08em;margin-left:auto}
.scene{width:100%;perspective:1400px;margin-bottom:1.25rem}
.ci{position:relative;width:100%;transform-style:preserve-3d;transition:transform .65s cubic-bezier(.4,0,.2,1)}
.ci.flipped{transform:rotateY(180deg)}
.face{width:100%;backface-visibility:hidden;-webkit-backface-visibility:hidden}
.face-back{position:absolute;top:0;left:0;transform:rotateY(180deg)}
.front-card{background:var(--white);border-radius:20px;overflow:hidden;box-shadow:0 2px 12px rgba(0,46,93,.1)}
.front-accent{height:6px;background:var(--yellow)}
.front-body{padding:2.25rem 2rem 0}
.wyr-label{text-align:center;font-size:clamp(1.4rem,3.5vw,2rem);font-weight:800;color:var(--navy);letter-spacing:-.01em;margin-bottom:.5rem;line-height:1.15}
.opts{display:grid;grid-template-columns:1fr auto 1fr;align-items:stretch;border-top:1px solid var(--gL)}
.opt-btn{background:transparent;border:none;padding:1.5rem 1.25rem;cursor:pointer;text-align:center;transition:background .18s;display:flex;flex-direction:column;align-items:center;gap:6px}
.opt-btn:hover:not(:disabled){background:var(--blueP)}
.opt-btn:disabled{cursor:default}
.opt-letter{width:32px;height:32px;border-radius:50%;background:var(--navy);color:var(--yellow);font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .18s}
.opt-btn:hover:not(:disabled) .opt-letter{background:var(--blue)}
.opt-title{font-size:13px;font-weight:700;color:var(--navy);line-height:1.5;text-align:center}
.vs-col{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;width:48px;flex-shrink:0;position:relative}
.vs-col::before{content:'';position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:1px;background:var(--gL)}
.vs-col span{position:relative;z-index:1;background:var(--white);padding:6px 4px;font-size:11px;font-weight:800;color:var(--gM);letter-spacing:.1em}
.answer-input{width:100%;padding:7px 10px;border:2px solid var(--gM);border-radius:8px;font-family:'Open Sans',Arial,sans-serif;font-size:13px;font-weight:600;color:var(--navy);background:var(--white);outline:none;transition:border-color .15s;cursor:text}
.answer-input:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(13,101,199,.12)}
.answer-input.filled{border-color:var(--blue)}
.answer-input:disabled{background:var(--gL);color:var(--gD);border-color:var(--gM)}
.select-prompt{border-top:1px solid var(--gL);padding:.85rem 1.5rem;text-align:center;font-size:12px;font-weight:700;color:var(--gD);background:var(--white);letter-spacing:.03em;transition:color .2s}
.select-prompt.ready{color:var(--blue)}
.opt-btn.picked-correct{background:var(--greenL)!important}
.opt-btn.picked-correct .opt-letter{background:var(--green);color:#fff}
.opt-btn.picked-correct .opt-title{color:var(--green)}
.opt-btn.picked-wrong{background:var(--orangeL)!important}
.opt-btn.picked-wrong .opt-letter{background:var(--orange);color:#fff}
.opt-btn.picked-wrong .opt-title{color:var(--orange)}
.opt-btn.reveal-winner{background:var(--greenL)!important}
.opt-btn.reveal-winner .opt-letter{background:var(--green);color:#fff}
.opt-btn.reveal-winner .opt-title{color:var(--green)}
.back-card{background:var(--navy);border-radius:20px;overflow:hidden;box-shadow:0 2px 12px rgba(0,46,93,.2)}
.back-accent{height:6px;background:var(--yellow)}
.back-verdict-row{display:flex;align-items:center;justify-content:space-between;padding:1.25rem 1.75rem 1rem;border-bottom:1px solid rgba(255,255,255,.08)}
.verdict-badge{display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.06em}
.verdict-badge.correct{color:#8fcc2e}
.verdict-badge.wrong{color:var(--orange)}
.verdict-icon{width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:900;color:#fff;flex-shrink:0}
.verdict-badge.correct .verdict-icon{background:var(--green)}
.verdict-badge.wrong .verdict-icon{background:var(--orange)}
.ctag-back{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--yellow);background:rgba(255,230,0,.1);border:1px solid rgba(255,230,0,.25);border-radius:999px;padding:3px 10px}
.back-section{padding:1.25rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.07)}
.back-slbl{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.15em;color:var(--yellow);margin-bottom:.75rem}
.calc-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.calc-block{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:10px;overflow:hidden}
.calc-block-label{background:rgba(255,230,0,.12);border-bottom:1px solid rgba(255,230,0,.2);padding:6px 12px;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--yellow)}
.calc-rows{padding:6px 0}
.calc-row{display:flex;align-items:center;padding:5px 12px;gap:8px}
.calc-row:not(:last-child){border-bottom:1px solid rgba(255,255,255,.05)}
.calc-key{font-size:11px;font-weight:800;color:rgba(255,230,0,.7);min-width:44px;flex-shrink:0;text-transform:uppercase;letter-spacing:.04em}
.calc-val{font-size:12px;color:rgba(255,255,255,.85);font-weight:600}
.calc-solve-row{background:rgba(110,150,0,.2);border-top:1px solid rgba(110,150,0,.4)!important}
.calc-solve-row .calc-key{color:#8fcc2e}
.calc-solve-row .calc-val{color:#8fcc2e;font-weight:800}
.winner-row{background:rgba(110,150,0,.15);border:1px solid rgba(110,150,0,.35);border-radius:8px;padding:8px 12px;display:flex;align-items:center;gap:8px;margin-top:10px}
.winner-icon{width:20px;height:20px;background:var(--green);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#fff;flex-shrink:0}
.winner-text{font-size:13px;font-weight:700;color:#8fcc2e}
.back-lesson{padding:1.5rem 1.75rem}
.back-ltext{font-size:13.5px;color:rgba(255,255,255,.85);line-height:1.75}
.back-ltext strong{color:var(--yellow);font-weight:700}
.nav-row{display:flex;justify-content:flex-end;gap:10px}
.btn-return{display:flex;align-items:center;background:transparent;color:var(--navy);font-family:'Open Sans',Arial,sans-serif;font-size:13px;font-weight:700;border:2px solid var(--navy);border-radius:8px;padding:.7rem 1.5rem;cursor:pointer;transition:background .15s,color .15s}
.btn-return:hover{background:var(--navy);color:var(--yellow)}
.btn-next{display:flex;align-items:center;gap:8px;background:var(--navy);color:var(--yellow);font-family:'Open Sans',Arial,sans-serif;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;border:none;border-radius:8px;padding:.75rem 1.75rem;cursor:pointer;transition:background .15s,transform .1s}
.btn-next:hover{background:var(--navy2);transform:translateY(-1px)}
.res-screen{animation:fadeUp .35s ease}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.res-hero{background:var(--navy);border-radius:16px;padding:2.5rem 2rem;text-align:center;margin-bottom:1.25rem;border-bottom:5px solid var(--yellow)}
.res-trophy{font-size:3rem;margin-bottom:.5rem;display:block}
.res-score{font-size:clamp(3rem,10vw,5rem);font-weight:800;color:var(--yellow);line-height:1;letter-spacing:-.03em;margin-bottom:.4rem}
.res-msg{font-size:15px;color:var(--blueL)}
.res-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:1.25rem}
.rstat{background:var(--white);border:1px solid var(--gM);border-radius:12px;padding:1rem;text-align:center}
.rstat .val{font-size:2rem;font-weight:800;color:var(--navy);line-height:1;margin-bottom:4px}
.rstat .lbl{font-size:10px;text-transform:uppercase;letter-spacing:.09em;color:var(--gD);font-weight:700}
.bd-wrap{background:var(--white);border:1px solid var(--gM);border-radius:12px;overflow:hidden;margin-bottom:1.5rem}
.bd-hdr{background:var(--gL);padding:.6rem 1rem;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.1em;color:var(--gD);border-bottom:1px solid var(--gM)}
.bd-row{display:flex;align-items:center;justify-content:space-between;padding:.65rem 1rem;font-size:13px;color:var(--navy);font-weight:600;border-bottom:1px solid var(--gL)}
.bd-row.reviewable{cursor:pointer;transition:background .15s}
.bd-row.reviewable:hover{background:var(--orangeL)}
.bd-row:last-child{border-bottom:none}
.bd-badge{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;padding:3px 10px;border-radius:999px}
.bd-badge.hit{background:var(--greenL);color:var(--green)}
.bd-badge.miss{background:var(--orangeL);color:var(--orange)}
.res-btns{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
.btn-ol{background:var(--white);color:var(--navy);font-family:'Open Sans',Arial,sans-serif;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;border:2px solid var(--navy);border-radius:8px;padding:.7rem 1.5rem;cursor:pointer;transition:background .15s,color .15s}
.btn-ol:hover{background:var(--navy);color:var(--yellow)}
@media(max-width:520px){.opts{grid-template-columns:1fr}.vs-col{padding:.5rem;border-top:1px solid var(--gL);border-bottom:1px solid var(--gL)}}
`;

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const QUESTIONS = [
  {
    concept:"Future Value",conceptFull:"Future Value (FV)",
    a:{title:"Invest $4,500 today at 7% APR for 12 years. Solve for the Future Value (FV)."},
    b:{title:"Invest $6,000 today at 5% APR for 12 years. Solve for the Future Value (FV)."},
    correct:"b",
    inputs:[
      {label:"Option A",rows:[["N","12"],["I/YR","7"],["PV","-4,500"],["PMT","0"],["Solve","FV = $10,134.86"]]},
      {label:"Option B",rows:[["N","12"],["I/YR","5"],["PV","-6,000"],["PMT","0"],["Solve","FV = $10,775.14"]]}
    ],
    winner:"Option B wins by $640.28",
    lesson:"<strong>Principal size can outweigh rate advantage.</strong> Option A’s 7% rate is 2 points higher, but Option B’s $1,500 larger principal produces $640 more after 12 years. Always calculate both sides — a bigger starting amount can overcome a lower rate."
  },
  {
    concept:"FV of Monthly Deposits",conceptFull:"Future Value — Monthly PMT",
    a:{title:"Save $350 per month for 8 years at 5% APR compounded monthly. Solve for the Future Value (FV)."},
    b:{title:"Save $500 per month for 5 years at 6% APR compounded monthly. Solve for the Future Value (FV)."},
    correct:"a",
    inputs:[
      {label:"Option A",rows:[["N","96"],["I/YR","0.4167"],["PV","0"],["PMT","-350"],["Solve","FV = $41,209.18"]]},
      {label:"Option B",rows:[["N","60"],["I/YR","0.5"],["PV","0"],["PMT","-500"],["Solve","FV = $34,885.02"]]}
    ],
    winner:"Option A wins by $6,324.16",
    lesson:"<strong>Time in the market matters more than deposit size.</strong> Option A’s extra 3 years of compounding (96 months vs. 60) overcomes Option B’s higher monthly deposit and rate. Always convert APR ÷ 12 for the monthly rate, and multiply years × 12 for N."
  },
  {
    concept:"Present Value",conceptFull:"Present Value (PV)",
    a:{title:"Receive $18,000 in 6 years at a 5% discount rate. Solve for the Present Value (PV)."},
    b:{title:"Receive $14,500 today. This is already the Present Value (PV)."},
    correct:"b",
    inputs:[
      {label:"Option A — Discount to today",rows:[["N","6"],["I/YR","5"],["PMT","0"],["FV","18,000"],["Solve","PV = $13,431.88"]]},
      {label:"Option B",rows:[["PV","$14,500 (already today)"],["","No discounting needed"]]}
    ],
    winner:"Option B wins by $1,068.12",
    lesson:"<strong>A bigger future number isn’t always worth more today.</strong> $18,000 in 6 years is only worth $13,432 in today’s dollars at 5% — $1,068 less than $14,500 in hand right now. Always discount future cash flows before comparing."
  },
  {
    concept:"Number of Periods (N)",conceptFull:"Solving for N",
    a:{title:"Invest $7,000 today at 4.5% APR with a target of $12,000. Solve for the Number of Years (N)."},
    b:{title:"Invest $9,000 today at 6% APR with a target of $15,000. Solve for the Number of Years (N)."},
    correct:"b",
    inputs:[
      {label:"Option A",rows:[["I/YR","4.5"],["PV","-7,000"],["PMT","0"],["FV","12,000"],["Solve","N = 12.25 years"]]},
      {label:"Option B",rows:[["I/YR","6"],["PV","-9,000"],["PMT","0"],["FV","15,000"],["Solve","N = 8.77 years"]]}
    ],
    winner:"Option B reaches target 3.48 years faster",
    lesson:"<strong>A higher rate dramatically shortens time to goal.</strong> Even though Option B needs $6,000 more in growth, its 6% rate gets it there 3.48 years sooner. The higher the rate, the faster compounding closes the gap between PV and FV."
  },
  {
    concept:"Interest Rate (I/YR)",conceptFull:"Solving for I/YR",
    a:{title:"Invest $5,500 today and grow it to $10,000 over 9 years. Solve for the annual Interest Rate (I/YR)."},
    b:{title:"Invest $8,000 today and grow it to $14,000 over 11 years. Solve for the annual Interest Rate (I/YR)."},
    correct:"a",
    inputs:[
      {label:"Option A",rows:[["N","9"],["PV","-5,500"],["PMT","0"],["FV","10,000"],["Solve","I/YR = 6.87%"]]},
      {label:"Option B",rows:[["N","11"],["PV","-8,000"],["PMT","0"],["FV","14,000"],["Solve","I/YR = 5.22%"]]}
    ],
    winner:"Option A earned 1.65% more per year",
    lesson:"<strong>Solving for I/YR reveals your true annual return.</strong> Enter PV as negative (cash out), FV as positive (cash back), PMT as 0, and solve. Option A’s 6.87% vs. Option B’s 5.22% — a 1.65-point difference that compounds significantly over time."
  },
  {
    concept:"FV with Lump Sum + PMT",conceptFull:"Future Value — PV and PMT Combined",
    a:{title:"Deposit $4,000 today and contribute $1,500 annually for 8 years at 6% APR. Solve for the Future Value (FV)."},
    b:{title:"Deposit $6,000 today and contribute $1,000 annually for 8 years at 7% APR. Solve for the Future Value (FV)."},
    correct:"a",
    inputs:[
      {label:"Option A",rows:[["N","8"],["I/YR","6"],["PV","-4,000"],["PMT","-1,500"],["Solve","FV = $21,221.59"]]},
      {label:"Option B",rows:[["N","8"],["I/YR","7"],["PV","-6,000"],["PMT","-1,000"],["Solve","FV = $20,568.92"]]}
    ],
    winner:"Option A wins by $652.67",
    lesson:"<strong>When both PV and PMT exist, enter both.</strong> PV and PMT are both negative because money is flowing out of your pocket. The calculator compounds the lump sum and accumulates the payment stream, then adds them. Option A’s higher contributions outweigh Option B’s higher rate."
  },
  {
    concept:"Monthly Loan Payment",conceptFull:"Payments (PMT) — Loan Comparison",
    a:{title:"Borrow $20,000 for 4 years at 7% APR with monthly payments. Solve for the Monthly Payment (PMT)."},
    b:{title:"Borrow $25,000 for 5 years at 5.5% APR with monthly payments. Solve for the Monthly Payment (PMT)."},
    correct:"b",
    inputs:[
      {label:"Option A",rows:[["N","48"],["I/YR","0.5833"],["PV","20,000"],["FV","0"],["Solve","PMT = -$478.92/mo"]]},
      {label:"Option B",rows:[["N","60"],["I/YR","0.4583"],["PV","25,000"],["FV","0"],["Solve","PMT = -$477.53/mo"]]}
    ],
    winner:"Option B is $1.39/month lower",
    lesson:"<strong>Always divide APR by 12 for monthly loans.</strong> PV is positive (money coming in), PMT solves as negative (payments going out), FV = 0 (loan fully repaid)."
  },
  {
    concept:"PV of an Annuity",conceptFull:"Present Value of Monthly Payments",
    a:{title:"Receive $700 per month for 4 years at a 5% APR discount rate. Solve for the Present Value (PV)."},
    b:{title:"Receive $550 per month for 6 years at a 4% APR discount rate. Solve for the Present Value (PV)."},
    correct:"b",
    inputs:[
      {label:"Option A",rows:[["N","48"],["I/YR","0.4167"],["PMT","700"],["FV","0"],["Solve","PV = $30,396.07"]]},
      {label:"Option B",rows:[["N","72"],["I/YR","0.3333"],["PMT","550"],["FV","0"],["Solve","PV = $35,154.59"]]}
    ],
    winner:"Option B wins by $4,758.52",
    lesson:"<strong>Duration and a lower discount rate both lift present value.</strong> PMT is positive (money coming in to you), FV = 0, and solve for PV. Option B’s 24 extra months of cash flows and lower discount rate push its present value $4,759 higher despite the smaller monthly payment."
  },
  {
    concept:"Solving for N with PMT",conceptFull:"Number of Periods (N) with Payments",
    a:{title:"Start with $8,000 today and add $1,500 per year at 6% APR, targeting $25,000. Solve for the Number of Years (N)."},
    b:{title:"Start with $12,000 today and add $1,000 per year at 5% APR, targeting $25,000. Solve for the Number of Years (N)."},
    correct:"b",
    inputs:[
      {label:"Option A",rows:[["I/YR","6"],["PV","-8,000"],["PMT","-1,500"],["FV","25,000"],["Solve","N = 7.13 years"]]},
      {label:"Option B",rows:[["I/YR","5"],["PV","-12,000"],["PMT","-1,000"],["FV","25,000"],["Solve","N = 6.99 years"]]}
    ],
    winner:"Option B reaches $25,000 about 7 weeks faster",
    lesson:"<strong>PV and PMT are both negative — money flowing out of your pocket. FV is positive — the goal you’re solving toward.</strong> Option B’s $4,000 larger starting balance earns compound interest every year, narrowing the gap to $25,000 slightly faster despite the lower rate and smaller payments."
  },
  {
    concept:"Comparing Investments",conceptFull:"Future Value Comparison",
    a:{title:"Investor A deposits $9,000 at 6% APR for 15 years. Solve for the Future Value (FV)."},
    b:{title:"Investor B deposits $7,000 at 8% APR for 15 years. Solve for the Future Value (FV)."},
    correct:"b",
    inputs:[
      {label:"Investor A",rows:[["N","15"],["I/YR","6"],["PV","-9,000"],["PMT","0"],["Solve","FV = $21,569.02"]]},
      {label:"Investor B",rows:[["N","15"],["I/YR","8"],["PV","-7,000"],["PMT","0"],["Solve","FV = $22,205.18"]]}
    ],
    winner:"Investor B wins by $636.16",
    lesson:"<strong>Over long horizons, rate advantage overtakes principal advantage.</strong> With 15 years to compound, Investor B’s 8% rate overcomes starting $2,000 behind. The longer the time horizon, the more rate dominates principal size."
  },
  {
    concept:"APR with Monthly Compounding",conceptFull:"Solving for APR — Monthly Compounding",
    a:{title:"Invest $3,000 today and grow it to $5,200 in 5 years with monthly compounding. Solve for the APR."},
    b:{title:"Invest $4,500 today and grow it to $7,000 in 7 years with monthly compounding. Solve for the APR."},
    correct:"a",
    inputs:[
      {label:"Option A",rows:[["N","60"],["PV","-3,000"],["PMT","0"],["FV","5,200"],["Solve","I/YR = 11.05% APR"]]},
      {label:"Option B",rows:[["N","84"],["PV","-4,500"],["PMT","0"],["FV","7,000"],["Solve","I/YR = 6.33% APR"]]}
    ],
    winner:"Option A earned 4.72% more per year",
    lesson:"<strong>With monthly compounding, use months for N.</strong> N = years × 12. The calculator returns a monthly rate — multiply by 12 to get APR. Option A earned 11.05% APR and Option B earned 6.33% APR — a difference of 4.72 percentage points."
  },
  {
    concept:"FV of Monthly Deposits",conceptFull:"Future Value — Monthly PMT Comparison",
    a:{title:"Deposit $250 per month for 10 years at 7% APR compounded monthly. Solve for the Future Value (FV)."},
    b:{title:"Deposit $400 per month for 6 years at 8% APR compounded monthly. Solve for the Future Value (FV)."},
    correct:"a",
    inputs:[
      {label:"Option A",rows:[["N","120"],["I/YR","0.5833"],["PV","0"],["PMT","-250"],["Solve","FV = $43,271.20"]]},
      {label:"Option B",rows:[["N","72"],["I/YR","0.6667"],["PV","0"],["PMT","-400"],["Solve","FV = $36,810.13"]]}
    ],
    winner:"Option A wins by $6,461.07",
    lesson:"<strong>Time compounds everything — starting earlier wins.</strong> PMT is negative (money going out each month), PV = 0 (nothing saved today). Option A’s 120 months of compounding vs. Option B’s 72 creates a $6,461 advantage despite the lower deposit and rate."
  },
  {
    concept:"Comparing Cash Flows",conceptFull:"Present Value Comparison",
    a:{title:"Receive $6,500 in 4 years at a 9% discount rate. Solve for the Present Value (PV)."},
    b:{title:"Receive $4,800 today. This is already the Present Value (PV)."},
    correct:"b",
    inputs:[
      {label:"Option A — Discount to today",rows:[["N","4"],["I/YR","9"],["PMT","0"],["FV","6,500"],["Solve","PV = $4,604.76"]]},
      {label:"Option B",rows:[["PV","$4,800 (already today)"],["","No discounting needed"]]}
    ],
    winner:"Option B wins by $195.24",
    lesson:"<strong>Never compare cash flows at different points in time by face value.</strong> Discount the future amount back to today first. At 9%, waiting 4 years turns $6,500 into only $4,605 — $195 less than $4,800 in hand. The higher the discount rate, the more future money loses its value."
  },
  {
    concept:"Long-Term Savings",conceptFull:"FV — Retirement Savings Comparison",
    a:{title:"Save for retirement by depositing $550 per month for 30 years at 6% APR compounded monthly. Solve for the Future Value (FV)."},
    b:{title:"Save for retirement by depositing $700 per month for 20 years at 8% APR compounded monthly. Solve for the Future Value (FV)."},
    correct:"a",
    inputs:[
      {label:"Option A",rows:[["N","360"],["I/YR","0.5"],["PV","0"],["PMT","-550"],["Solve","FV = $552,483.27"]]},
      {label:"Option B",rows:[["N","240"],["I/YR","0.6667"],["PV","0"],["PMT","-700"],["Solve","FV = $412,314.29"]]}
    ],
    winner:"Option A wins by $140,169",
    lesson:"<strong>30 years of compounding dominates 20, even at a lower rate.</strong> Option A produces $140,000 more despite $150/month less and a lower rate. The extra decade of compounding is the decisive factor."
  },
  {
    concept:"Perpetuity",conceptFull:"Perpetuity — PV = PMT ÷ r",
    a:{title:"Own a perpetuity paying $3,000 per year forever at 6% interest. Solve for the Present Value."},
    b:{title:"Own a perpetuity paying $2,400 per year forever at 4% interest. Solve for the Present Value."},
    correct:"b",
    inputs:[
      {label:"Option A",rows:[["Formula","PV = PMT ÷ r"],["","PV = $3,000 ÷ 0.06"],["Solve","PV = $50,000"]]},
      {label:"Option B",rows:[["Formula","PV = PMT ÷ r"],["","PV = $2,400 ÷ 0.04"],["Solve","PV = $60,000"]]}
    ],
    winner:"Option B wins by $10,000",
    lesson:"<strong>Perpetuities cannot be solved on a financial calculator in the traditional sense</strong> — there is no finite N. Use the formula: PV = PMT ÷ r. Option B’s lower 4% discount rate means each dollar of payment is discounted less aggressively, pushing its present value $10,000 higher despite the smaller annual payment."
  }
];

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sanitize(val) {
  let v = val.replace(/[^0-9.\-]/g, "");
  v = v.replace(/(?!^)-/g, "");
  const parts = v.split(".");
  if (parts.length > 2) v = parts[0] + "." + parts.slice(1).join("");
  if (parts.length === 2 && parts[1].length > 2) v = parts[0] + "." + parts[1].slice(0, 2);
  return v;
}

function isValid(v) {
  const t = v.trim();
  return t !== "" && t !== "-" && t !== "." && /^-?\d*\.?\d{0,2}$/.test(t);
}

/* ─── COMPONENT ───────────────────────────────────────────────────────────── */
export default function WouldYouRather() {
  const [screen, setScreen] = useState("intro");
  const [shuffled, setShuffled] = useState([]);
  const [current, setCurrent] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [conceptTrack, setConceptTrack] = useState({});
  const [reviewingFromResults, setReviewingFromResults] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [picked, setPicked] = useState(null);
  const [ansA, setAnsA] = useState("");
  const [ansB, setAnsB] = useState("");
  const [minH, setMinH] = useState(0);

  const frontRef = useRef(null);
  const backRef = useRef(null);

  const q = shuffled[current] || null;
  const bothValid = isValid(ansA) && isValid(ansB);
  const total = shuffled.length;
  const progPct = screen === "results" ? 100 : total > 0 ? (current / total) * 100 : 0;
  const scorePct = (correctCount + wrongCount) > 0 ? Math.round(correctCount / (correctCount + wrongCount) * 100) + "%" : "—";

  function resetQ() {
    setAnswered(false);
    setPicked(null);
    setFlipped(false);
    setAnsA("");
    setAnsB("");
    setMinH(0);
  }

  function startGame() {
    setShuffled(shuffle(QUESTIONS));
    setCurrent(0);
    setCorrectCount(0);
    setWrongCount(0);
    setConceptTrack({});
    setReviewingFromResults(false);
    resetQ();
    setScreen("game");
  }

  function pick(choice) {
    if (answered || !bothValid) return;
    const ok = choice === q.correct;
    setAnswered(true);
    setPicked(choice);
    if (ok) setCorrectCount(c => c + 1);
    else setWrongCount(c => c + 1);
    setConceptTrack(prev => ({ ...prev, [q.concept]: { label: q.conceptFull, hit: ok } }));
    setTimeout(() => {
      if (frontRef.current && backRef.current) {
        setMinH(Math.max(frontRef.current.offsetHeight, backRef.current.scrollHeight));
      }
      setFlipped(true);
    }, 60);
  }

  function nextQ() {
    if (current + 1 >= shuffled.length) setScreen("results");
    else { setCurrent(c => c + 1); resetQ(); }
  }

  function reviewQuestion(idx) {
    setReviewingFromResults(true);
    setCurrent(idx);
    setConceptTrack(prev => {
      const next = { ...prev };
      delete next[shuffled[idx].concept];
      return next;
    });
    resetQ();
    setScreen("game");
  }

  function returnToResults() {
    setReviewingFromResults(false);
    setScreen("results");
  }

  function restart() {
    setShuffled(shuffle(QUESTIONS));
    setCurrent(0);
    setCorrectCount(0);
    setWrongCount(0);
    setConceptTrack({});
    setReviewingFromResults(false);
    resetQ();
    setScreen("game");
  }

  function getBtnClass(option) {
    if (!answered || !q) return "opt-btn";
    const ok = option === q.correct;
    const isPicked = option === picked;
    if (isPicked && ok) return "opt-btn picked-correct";
    if (isPicked && !ok) return "opt-btn picked-wrong";
    if (!isPicked && ok) return "opt-btn reveal-winner";
    return "opt-btn";
  }

  const finalPct = total > 0 ? Math.round(correctCount / total * 100) : 0;
  let trophy = "📚", resMsg = "";
  if (finalPct === 100) { trophy = "🏆"; resMsg = "Perfect score — excellent command of TVM!"; }
  else if (finalPct >= 87) { trophy = "🎓"; resMsg = "Strong work — solid TVM fundamentals."; }
  else if (finalPct >= 62) { trophy = "📈"; resMsg = "Good start — review the concepts you missed."; }
  else { trophy = "📖"; resMsg = "TVM takes practice — re-read the explanations and try again!"; }

  return (
    <div className="wyr-body">
      <style>{STYLE}</style>

      {/* Header */}
      <header className="hdr">
        <div className="hdr-in">
          <div className="logo">
            <div className="logo-mark">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <polygon points="5,21 13,5 21,21 17,21 13,13 9,21" fill="#002E5D" />
              </svg>
            </div>
            <div>
              <h1>Would You Rather?</h1>
              <p>Time Value of Money</p>
            </div>
          </div>
          {screen !== "intro" && (
            <div className="hdr-score">
              <div className="schip"><span className="n">{correctCount}</span><span className="l">Correct</span></div>
              <div className="schip"><span className="n">{wrongCount}</span><span className="l">Wrong</span></div>
              <div className="schip"><span className="n">{scorePct}</span><span className="l">Score</span></div>
            </div>
          )}
        </div>
        {screen !== "intro" && (
          <div className="prog"><div className="prog-fill" style={{ width: progPct + "%" }} /></div>
        )}
      </header>

      <main className="wyr-main">
        {/* ── INTRO ── */}
        {screen === "intro" && (
          <div className="intro">
            <h2>Would You<br /><em>Rather...?</em></h2>
            <p>You've read about Time Value of Money. Now put your instincts to the test. Choose between two financial scenarios — then flip the card to see the math.</p>
            <button className="btn-start" onClick={startGame}>Start Activity →</button>
          </div>
        )}

        {/* ── GAME ── */}
        {screen === "game" && q && (
          <>
            <div className="qmeta">
              <div className="ctag">{q.concept}</div>
              <div className="qnum">Question {current + 1} of {shuffled.length}</div>
            </div>

            <div className="scene">
              <div
                className={"ci" + (flipped ? " flipped" : "")}
                style={{ minHeight: minH ? minH + "px" : undefined }}
              >
                {/* FRONT */}
                <div className="face face-front" ref={frontRef}>
                  <div className="front-card">
                    <div className="front-accent" />
                    <div className="front-body" style={{ paddingBottom: "1.25rem" }}>
                      <div className="wyr-label">Would You Rather?</div>
                    </div>
                    <div className="opts">
                      <button
                        className={getBtnClass("a")}
                        onClick={() => pick("a")}
                        disabled={!bothValid || answered}
                      >
                        <div className="opt-letter">A</div>
                        <div className="opt-title">{q.a.title}</div>
                        <input
                          className={"answer-input" + (isValid(ansA) ? " filled" : "")}
                          type="text"
                          placeholder="e.g. 102584.45"
                          value={ansA}
                          disabled={answered}
                          inputMode="decimal"
                          autoComplete="off"
                          onClick={e => e.stopPropagation()}
                          onChange={e => setAnsA(sanitize(e.target.value))}
                        />
                      </button>
                      <div className="vs-col"><span>VS</span></div>
                      <button
                        className={getBtnClass("b")}
                        onClick={() => pick("b")}
                        disabled={!bothValid || answered}
                      >
                        <div className="opt-letter">B</div>
                        <div className="opt-title">{q.b.title}</div>
                        <input
                          className={"answer-input" + (isValid(ansB) ? " filled" : "")}
                          type="text"
                          placeholder="e.g. 102584.45"
                          value={ansB}
                          disabled={answered}
                          inputMode="decimal"
                          autoComplete="off"
                          onClick={e => e.stopPropagation()}
                          onChange={e => setAnsB(sanitize(e.target.value))}
                        />
                      </button>
                    </div>
                    <div className={"select-prompt" + (bothValid ? " ready" : "")}>
                      Enter both answers above, then select the winner
                    </div>
                  </div>
                </div>

                {/* BACK */}
                <div className="face face-back" ref={backRef}>
                  <div className="back-card">
                    <div className="back-accent" />
                    <div className="back-verdict-row">
                      <div className={"verdict-badge " + (answered && picked === q.correct ? "correct" : "wrong")}>
                        <div className="verdict-icon">{answered && picked === q.correct ? "✓" : "✗"}</div>
                        <span>{answered && picked === q.correct ? "Correct!" : "Not quite"}</span>
                      </div>
                      <span className="ctag-back">{q.concept}</span>
                    </div>
                    <div className="back-section">
                      <div className="back-slbl">Calculator Inputs</div>
                      <div className="calc-grid">
                        {q.inputs.map((block, bi) => (
                          <div key={bi} className="calc-block">
                            <div className="calc-block-label">{block.label}</div>
                            <div className="calc-rows">
                              {block.rows.map((row, ri) => (
                                <div key={ri} className={"calc-row" + (row[0].toLowerCase() === "solve" ? " calc-solve-row" : "")}>
                                  <span className="calc-key">{row[0]}</span>
                                  <span className="calc-val">{row[1]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="winner-row">
                        <div className="winner-icon">✓</div>
                        <div className="winner-text">{q.winner}</div>
                      </div>
                    </div>
                    <div className="back-lesson">
                      <div className="back-slbl">Key Concept</div>
                      <div className="back-ltext" dangerouslySetInnerHTML={{ __html: q.lesson }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-row">
              {reviewingFromResults && (
                <button className="btn-return" onClick={returnToResults}>← Return to Results</button>
              )}
              {answered && !reviewingFromResults && (
                <button className="btn-next" onClick={nextQ}>
                  {current < shuffled.length - 1 ? "Next Question" : "See Results"} →
                </button>
              )}
            </div>
          </>
        )}

        {/* ── RESULTS ── */}
        {screen === "results" && (
          <div className="res-screen">
            <div className="res-hero">
              <span className="res-trophy">{trophy}</span>
              <div className="res-score">{correctCount}/{total}</div>
              <div className="res-msg">{resMsg}</div>
            </div>
            <div className="res-stats">
              <div className="rstat"><div className="val">{correctCount}</div><div className="lbl">Correct</div></div>
              <div className="rstat"><div className="val">{wrongCount}</div><div className="lbl">Wrong</div></div>
              <div className="rstat"><div className="val">{finalPct}%</div><div className="lbl">Accuracy</div></div>
            </div>
            <div className="bd-wrap">
              <div className="bd-hdr">Concept Breakdown</div>
              {Object.values(conceptTrack).map((c, i) => {
                const qIdx = shuffled.findIndex(sq => sq.conceptFull === c.label);
                return (
                  <div
                    key={i}
                    className={"bd-row" + (c.hit ? "" : " reviewable")}
                    onClick={!c.hit && qIdx !== -1 ? () => reviewQuestion(qIdx) : undefined}
                  >
                    <span>{c.label}</span>
                    <span className={"bd-badge " + (c.hit ? "hit" : "miss")}>
                      {c.hit ? "Correct" : "▶ Review"}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="res-btns">
              <button className="btn-ol" onClick={restart}>↺ Play Again</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
