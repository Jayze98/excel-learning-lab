(function(){
"use strict";
const PW_HASH = "221bcc45b37cb16b8af60fb819bd90a1683253a97525a9275a18c0db027aebb3";
const KEY = "xlLab.v1";
const N = LESSONS.length;
const PASS_MARK = 6;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

/* ---------------- storage ---------------- */
let storageOK = true;
let mem = { profiles:{}, current:null, data:{} };
function load(){
  try { const raw = localStorage.getItem(KEY); if (raw) mem = Object.assign(mem, JSON.parse(raw)); }
  catch(e){ storageOK = false; }
}
function save(){
  try { localStorage.setItem(KEY, JSON.stringify(mem)); }
  catch(e){ storageOK = false; }
}
function sGet(k){ try { return sessionStorage.getItem(k); } catch(e){ return null; } }
function sSet(k,v){ try { sessionStorage.setItem(k,v); } catch(e){} }
function sDel(k){ try { sessionStorage.removeItem(k); } catch(e){} }
load();

const me = () => mem.current && mem.profiles[mem.current] ? mem.profiles[mem.current] : null;
function myData(){
  const id = mem.current;
  if (!mem.data[id]) mem.data[id] = { read:[], results:[], tried:{}, lastDay:1 };
  return mem.data[id];
}
const initials = n => (n||"?").trim().split(/\s+/).slice(0,2).map(w=>w[0]).join("").toUpperCase();
const fmtDate = iso => { const d = new Date(iso); return d.toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"}) + ", " + d.toLocaleTimeString(undefined,{hour:"2-digit",minute:"2-digit"}); };
const fmtDur = s => s < 60 ? s + "s" : Math.floor(s/60) + "m " + String(s%60).padStart(2,"0") + "s";

function bestFor(day){
  const r = myData().results.filter(x=>x.day===day);
  return r.length ? r.reduce((a,b)=> b.score>a.score ? b : a) : null;
}
function statusFor(day){
  const b = bestFor(day);
  if (b && b.score >= PASS_MARK) return {k:"done", label:"Passed · "+b.score+"/10", cls:"pill-good"};
  if (b) return {k:"retry", label:"Best "+b.score+"/10 · try again", cls:"pill-warn"};
  if (myData().read.includes(day)) return {k:"read", label:"Read · test pending", cls:"pill-brand"};
  return {k:"new", label:"Not started", cls:"pill-muted"};
}

/* ---------------- toast / brand ---------------- */
let toastT;
function toast(msg){ const t=$("#toast"); t.textContent=msg; t.classList.add("show"); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove("show"),2200); }
const BRAND_HTML = `<div class="mark"><img class="mark-logo" src="${window.BRAND_LOGO || "img/logo.png"}" alt="Scrap Analytics"><span class="mark-sep" aria-hidden="true"></span><span class="mark-course">${COURSE.name}<small>${N} days · ${N*10} questions</small></span></div>`;
$$(".brand-slot").forEach(el => el.innerHTML = BRAND_HTML);

/* ---------------- gate ---------------- */
async function sha256(t){
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(t));
  return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,"0")).join("");
}
$("#pwToggle").addEventListener("click", ()=>{
  const i=$("#pw"); const show = i.type==="password"; i.type = show?"text":"password"; $("#pwToggle").textContent = show?"Hide":"Show";
});
$("#gateForm").addEventListener("submit", async e=>{
  e.preventDefault();
  const v = $("#pw").value;
  let ok = false;
  try { ok = (await sha256(v)) === PW_HASH; } catch(err){ ok = v === ["Scrap","@","2026"].join(""); }
  if (ok){ sSet("xlLab.unlocked","1"); $("#pw").value=""; $("#pwErr").textContent=""; afterUnlock(); }
  else {
    $("#pwErr").textContent = "That password isn't right. Check capital letters and symbols, then try again.";
    const c=$("#gateForm"); c.classList.remove("shake"); void c.offsetWidth; c.classList.add("shake");
  }
});
function show(id){ ["gate","setup","app"].forEach(x=> $("#"+x).hidden = x!==id); window.scrollTo(0,0); }
function afterUnlock(){
  if (me()) { startApp(); return; }
  openSetup();
}
function openSetup(){
  const ids = Object.keys(mem.profiles);
  $("#pickWrap").hidden = ids.length===0;
  $("#profileList").innerHTML = ids.map(id=>{
    const p=mem.profiles[id]; const n = (mem.data[id]?.results||[]).length;
    return `<button type="button" class="profile-btn" data-id="${id}"><span class="avatar">${esc(initials(p.name))}</span><span><b>${esc(p.name)}</b><br><span class="hint">${esc([p.grade,p.roll&&("Roll "+p.roll)].filter(Boolean).join(" · ")||"Student")} · ${n} test${n===1?"":"s"} taken</span></span></button>`;
  }).join("");
  $$("#profileList .profile-btn").forEach(b=> b.addEventListener("click", ()=>{ mem.current=b.dataset.id; save(); startApp(); }));
  show("setup");
}
$("#newForm").addEventListener("submit", e=>{
  e.preventDefault();
  const name = $("#fName").value.trim(); if(!name) return;
  const id = "s" + Date.now().toString(36);
  mem.profiles[id] = { name, grade:$("#fClass").value.trim(), roll:$("#fRoll").value.trim(), school:$("#fSchool").value.trim(), created:new Date().toISOString() };
  mem.current = id; save();
  $("#newForm").reset();
  startApp(); toast("Welcome, " + name.split(" ")[0] + "! Your account is ready.");
});
$("#lockBtn").addEventListener("click", ()=>{ sDel("xlLab.unlocked"); show("gate"); setTimeout(()=>$("#pw").focus(),50); });

/* ---------------- router ---------------- */
let cur = { view:"home", day:1 };
function startApp(){
  $("#whoAvatar").textContent = initials(me().name);
  $("#whoAvatar").title = me().name;
  show("app");
  go(cur.view==="quiz" ? "home" : cur.view, cur.day);
}
$$(".nav button").forEach(b=> b.addEventListener("click", ()=> go(b.dataset.view, b.dataset.view==="lesson" ? myData().lastDay || 1 : undefined)));
function go(view, day){
  cur.view = view; if (day) cur.day = day;
  $$(".nav button").forEach(b=> { if (b.dataset.view === (view==="quiz"?"lesson":view)) b.setAttribute("aria-current","page"); else b.removeAttribute("aria-current"); });
  const v = $("#view");
  const banner = storageOK ? "" : `<div class="banner">This browser is blocking saved data (maybe a private window). Your scores will be lost when you close the page.</div>`;
  if (view==="home") v.innerHTML = banner + homeHTML();
  if (view==="lesson") { myData().lastDay = cur.day; save(); v.innerHTML = banner + lessonHTML(cur.day); }
  if (view==="account") v.innerHTML = banner + accountHTML();
  if (view==="quiz") { v.innerHTML = banner; startQuiz(cur.day); }
  bind(view);
  window.scrollTo({top:0});
}

/* ---------------- HOME ---------------- */
const practiceCount = l => l.sections.reduce((n,s)=> n + (s.widget && s.widget.tasks ? s.widget.tasks.length : 0), 0);
function homeHTML(){
  const d = myData(); const p = me();
  const passed = LESSONS.filter(l => (bestFor(l.day)?.score ?? -1) >= PASS_MARK).length;
  const tests = d.results.length;
  const avg = tests ? Math.round(d.results.reduce((a,r)=>a+r.score,0)/tests*10) : null;
  const next = LESSONS.find(l => (bestFor(l.day)?.score ?? -1) < PASS_MARK) || LESSONS[LESSONS.length-1];
  const nextSt = statusFor(next.day);
  const hour = new Date().getHours();
  const greet = hour<12 ? "Good morning" : hour<17 ? "Good afternoon" : "Good evening";
  const card = l => { const s = statusFor(l.day); return `<button class="day-card" data-go-day="${l.day}">
    <span class="num"><b>Day ${l.day}</b><span class="pill ${s.cls}">${s.label}</span></span>
    <span><h3>${esc(l.title)}</h3><p>${esc(l.sub)}</p></span>
    <span class="meta"><span>⏱ ${l.mins} min · 10 questions${practiceCount(l)?` · ${practiceCount(l)} practice tasks`:""}</span></span></button>`; };
  return `
  <section class="hello"><div><p class="eyebrow">${greet}</p><h1>${esc(p.name.split(" ")[0])}, let's learn ${COURSE.subject}</h1></div>
    <button class="btn btn-ghost" data-nav="account">View my test results</button></section>
  <section class="kpis" aria-label="Your progress">
    <div class="kpi"><span class="kpi-lbl">Days passed</span><span class="kpi-val">${passed}<small style="font-size:1rem;color:var(--muted)"> / ${N}</small></span><span class="kpi-bar"><i style="width:${passed/N*100}%"></i></span></div>
    <div class="kpi"><span class="kpi-lbl">Tests taken</span><span class="kpi-val">${tests}</span><span class="hint">including retakes</span></div>
    <div class="kpi"><span class="kpi-lbl">Average score</span><span class="kpi-val">${avg===null?"–":avg+"%"}</span><span class="hint">across all attempts</span></div>
    <div class="kpi"><span class="kpi-lbl">Lessons read</span><span class="kpi-val">${d.read.length}<small style="font-size:1rem;color:var(--muted)"> / ${N}</small></span><span class="kpi-bar"><i style="width:${d.read.length/N*100}%;background:var(--accent)"></i></span></div>
  </section>
  <section class="continue">
    <div><p class="eyebrow" style="color:inherit;opacity:.8">${passed===N?"Course complete · review any day":"Up next"}</p><h2>Day ${next.day}: ${esc(next.title)}</h2><p>${esc(next.sub)} · ${nextSt.label}</p></div>
    <button class="btn" data-go-day="${next.day}">${nextSt.k==="new"?"Start Day "+next.day:"Continue Day "+next.day} →</button>
  </section>
  ${WEEKS.map(w=>`<section class="week"><div class="week-head"><h2>Week ${w.n}: ${esc(w.title)}</h2><span class="hint">${esc(w.hint)}</span></div>
    <div class="days">${LESSONS.filter(l=>l.week===w.n).map(card).join("")}</div></section>`).join("")}`;
}

/* ---------------- LESSON ---------------- */
function figHTML(figs){
  if (!figs || !figs.length) return "";
  const one = f => `<figure class="fig"><button type="button" data-zoom="img/${f[0]}.jpg" data-cap="${esc(f[1])}" aria-label="Enlarge picture"><img src="img/${f[0]}.jpg" alt="${esc(f[1])}" loading="lazy"></button><figcaption><b>Picture</b><span>${esc(f[1])}</span></figcaption></figure>`;
  return figs.length > 1 ? `<div class="figs-2">${figs.map(one).join("")}</div>` : one(figs[0]);
}
function lessonHTML(day){
  const L = LESSONS[day-1]; const d = myData();
  const tried = d.tried[day] || [];
  const rail = WEEKS.map(w=>`<div class="wk">Week ${w.n} · ${esc(w.title)}</div>` + LESSONS.filter(l=>l.week===w.n).map(l=>{
    const s = statusFor(l.day); const dc = s.k==="done" ? "done" : s.k==="retry" ? "retry" : "";
    return `<button data-go-day="${l.day}" ${l.day===day?'aria-current="true"':""}><span class="dot ${dc}">${s.k==="done"?"✓":l.day}</span><span class="t">${esc(l.title)}</span></button>`;
  }).join("")).join("");
  const st = statusFor(day); const best = bestFor(day);
  const secs = L.sections.map((s,i)=>`<section class="sec">
      <h2><span class="n">${day}.${i+1}</span>${esc(s.h)}</h2>
      ${(s.html||"").replace(/<table class="mini">/g,'<div class="tbl-wrap"><table class="mini">').replace(/<\/table>/g,"</table></div>")}
      ${s.diagram ? `<div class="diagram">${DIAGRAMS[s.diagram]}</div>` : ""}
      ${s.widget ? `<div class="widget" data-widget="${i}"><p class="hint-line">Loading practice…</p></div>` : ""}
      ${s.think ? `<div class="box box-think"><b class="k">Think of it like this</b><span>${s.think}</span></div>` : ""}
      ${figHTML(s.figs)}
      ${s.note ? `<div class="box box-note"><b class="k">Good to know</b><span>${s.note}</span></div>` : ""}
      ${s.remember ? `<div class="box box-remember"><b class="k">Remember</b><span>${esc(s.remember)}</span></div>` : ""}
    </section>`).join("");
  return `<div class="lesson-wrap">
    <nav class="rail" aria-label="Days">${rail}</nav>
    <article class="lesson">
      <header class="lesson-head">
        <p class="eyebrow">Week ${L.week} · Day ${day} of ${N}</p>
        <h1>${esc(L.title)}</h1>
        <p class="sub">${esc(L.sub)}</p>
        <div class="meta"><span class="pill pill-muted">⏱ About ${L.mins} minutes</span><span class="pill pill-muted">${L.sections.length} topics</span><span class="pill ${st.cls}">${st.label}</span></div>
      </header>
      <div class="goals"><h2>By the end of today you will be able to…</h2><ul>${L.goals.map(g=>`<li>${esc(g)}</li>`).join("")}</ul></div>
      ${secs}
      <section class="sec"><h2><span class="n">★</span>Key words</h2><p class="hint">Test yourself: tap a card to hide or show its meaning.</p>
        <div class="terms">${L.terms.map(t=>`<button type="button" class="term" data-hidden="0"><b>${esc(t[0])}</b><span>${esc(t[1])}</span></button>`).join("")}</div>
        <p><button type="button" class="btn btn-ghost" id="hideAll" style="margin-top:.8rem">Hide all meanings</button></p></section>
      <section class="sec"><h2><span class="n">✎</span>Try it yourself</h2>
        <ol class="tryit">${L.tryit.map((t,i)=>`<li><input type="checkbox" id="try-${day}-${i}" data-try="${i}" ${tried.includes(i)?"checked":""}><label for="try-${day}-${i}">${esc(t)}</label></li>`).join("")}</ol></section>
      <section class="sec"><h2><span class="n">↗</span>Read more on Microsoft's website</h2>
        <ul class="links">${L.links.map(k=>`<li><a href="${k[1]}" target="_blank" rel="noopener">${esc(k[0])}<span>${k[1].includes("support.microsoft.com")?"Microsoft Support":k[1].includes("learn.microsoft.com")?"Microsoft Learn":"Microsoft"} ↗</span></a></li>`).join("")}</ul></section>
      <div class="lesson-end">
        <div><h2>Ready for the Day ${day} test?</h2><p>10 questions. Score ${PASS_MARK} or more to pass. Your score is saved to My Account.${best?` Your best so far: <b>${best.score}/10</b>.`:""}</p></div>
        <button class="btn btn-accent" data-quiz="${day}">${best?"Retake":"Take"} Test ${day} →</button>
      </div>
      <div class="pager">
        ${day>1?`<button class="btn btn-ghost" data-go-day="${day-1}">← Day ${day-1}</button>`:"<span></span>"}
        ${day<N?`<button class="btn btn-ghost" data-go-day="${day+1}">Day ${day+1} →</button>`:""}
      </div>
    </article></div>`;
}

/* ---------------- QUIZ ---------------- */
let Q = null;
function shuffle(a){ a=a.slice(); for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; }
function startQuiz(day){
  const L = LESSONS[day-1];
  if (!myData().read.includes(day)) { myData().read.push(day); save(); }
  Q = { day, i:0, answers:[], started:Date.now(),
        qs: L.quiz.map(q=>{ const order = shuffle([0,1,2,3].slice(0,q.o.length)); return { q:q.q, e:q.e, o:order.map(k=>q.o[k]), a:order.indexOf(q.a) }; }) };
  renderQ();
}
function renderQ(){
  const L = LESSONS[Q.day-1]; const q = Q.qs[Q.i];
  const prog = Q.qs.map((_,k)=> k<Q.answers.length ? (Q.answers[k].ok?"ok":"no") : k===Q.i?"cur":"").map(c=>`<i class="${c}"></i>`).join("");
  $("#view").innerHTML = `<div class="quiz">
    <div class="quiz-top"><div><p class="eyebrow">Test ${Q.day} · ${esc(L.title)}</p></div><button class="icon-btn" id="quitQ">Leave test</button></div>
    <div class="progress" aria-hidden="true">${prog}</div>
    <div class="qcard">
      <p class="eyebrow">Question ${Q.i+1} of ${Q.qs.length}</p>
      <h2>${esc(q.q)}</h2>
      <div class="opts">${q.o.map((o,k)=>`<button class="opt" data-k="${k}"><span class="l">${"ABCD"[k]}</span><span>${esc(o)}</span></button>`).join("")}</div>
      <div id="fb"></div>
      <div class="q-actions"><button class="btn btn-primary" id="nextQ" hidden>${Q.i===Q.qs.length-1?"See my score":"Next question →"}</button></div>
    </div></div>`;
  $$(".opt").forEach(b=> b.addEventListener("click", ()=> answer(+b.dataset.k)));
  $("#quitQ").addEventListener("click", ()=> quitConfirm());
  $("#nextQ").addEventListener("click", ()=>{ Q.i++; if (Q.i>=Q.qs.length) finishQuiz(); else renderQ(); });
}
function quitConfirm(){
  const fb = $("#fb");
  fb.innerHTML = `<div class="confirm" style="margin-top:1rem"><b>Leave this test?</b><span>Your answers so far will not be saved.</span><div class="actions" style="justify-content:flex-start"><button class="btn btn-danger" id="qYes">Leave test</button><button class="btn btn-ghost" id="qNo">Keep going</button></div></div>`;
  $("#qYes").onclick = ()=>{ Q=null; go("lesson", cur.day); };
  $("#qNo").onclick = ()=>{ fb.innerHTML=""; };
}
function answer(k){
  const q = Q.qs[Q.i]; const ok = k===q.a;
  Q.answers.push({k, ok});
  $$(".opt").forEach(b=>{ const kk=+b.dataset.k; b.disabled=true; if(kk===q.a) b.classList.add("correct"); else if(kk===k) b.classList.add("wrong"); });
  $("#fb").innerHTML = `<div class="feedback ${ok?"ok":"no"}"><b>${ok?"Correct!":"Not quite."}</b>${ok?"":"The right answer is <b style='display:inline;font-size:1em'>"+esc(q.o[q.a])+"</b>. "}${esc(q.e)}</div>`;
  const n=$("#nextQ"); n.hidden=false; n.focus();
  const p = $$(".progress i")[Q.i]; if (p) p.className = ok?"ok":"no";
}
function finishQuiz(){
  const score = Q.answers.filter(a=>a.ok).length; const total = Q.qs.length;
  const secs = Math.round((Date.now()-Q.started)/1000);
  const d = myData(); const prevBest = bestFor(Q.day);
  const attempt = d.results.filter(r=>r.day===Q.day).length + 1;
  d.results.push({ id:"r"+Date.now().toString(36), day:Q.day, title:LESSONS[Q.day-1].title, score, total, date:new Date().toISOString(), secs, attempt });
  save();
  const pct = Math.round(score/total*100); const pass = score>=PASS_MARK;
  const isBest = !prevBest || score>prevBest.score;
  const R=70, C=2*Math.PI*R;
  const msg = score===10 ? "Perfect score! You're an Excel star." : pass ? "Well done, you passed!" : "Good try! Read the lesson again and have another go.";
  const wrong = Q.qs.map((q,k)=>({q,a:Q.answers[k]})).filter(x=>!x.a.ok);
  $("#view").innerHTML = `<div class="quiz"><div class="qcard result">
    <p class="eyebrow">Test ${Q.day} complete · attempt ${attempt}</p>
    <svg class="ring" viewBox="0 0 170 170" role="img" aria-label="Score ${score} out of ${total}">
      <circle cx="85" cy="85" r="${R}" fill="none" stroke="var(--surface-2)" stroke-width="14"/>
      <circle cx="85" cy="85" r="${R}" fill="none" stroke="${pass?"var(--good)":"var(--warn)"}" stroke-width="14" stroke-linecap="round" stroke-dasharray="${C*score/total} ${C}" transform="rotate(-90 85 85)"/>
      <text x="85" y="92" text-anchor="middle" font-size="40" fill="var(--ink)">${score}/${total}</text>
      <text x="85" y="116" text-anchor="middle" font-size="14" fill="var(--muted)" style="font-family:var(--f-body);font-weight:400">${pct}%</text>
    </svg>
    <h2 style="margin:0">${msg}</h2>
    <p style="margin:0" class="hint">Time taken: ${fmtDur(secs)} · ${isBest && prevBest ? "New personal best! " : ""}Saved to <b>My Account → Test results</b>.</p>
    <div class="actions">
      ${Q.day<N?`<button class="btn btn-primary" data-go-day="${Q.day+1}">Go to Day ${Q.day+1} →</button>`:`<button class="btn btn-primary" data-nav="home">Back to Home</button>`}
      <button class="btn btn-ghost" data-quiz="${Q.day}">Retake test</button>
      <button class="btn btn-ghost" data-nav="account">See all my results</button>
    </div>
    ${wrong.length?`<div class="review"><p class="eyebrow" style="margin:0">Review the ${wrong.length} question${wrong.length>1?"s":""} you missed</p>${wrong.map(x=>`<div><p class="q" style="margin:0 0 .25rem">${esc(x.q.q)}</p><span>Correct answer: <b>${esc(x.q.o[x.q.a])}</b>. ${esc(x.q.e)}</span></div>`).join("")}</div>`:""}
  </div></div>`;
  cur.view = "lesson";
  bind("result");
  window.scrollTo({top:0});
}

/* ---------------- ACCOUNT ---------------- */
let resFilter = "all"; let confirmDel = false; let editing = false;
function chartSVG(){
  const W=960,H=260,ml=36,mr=10,mt=16,mb=44; const iw=W-ml-mr, ih=H-mt-mb; const bw=iw/N;
  const y = v => mt + ih - v/10*ih;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Best score for each day's test">`;
  for (let v=0; v<=10; v+=2){ s += `<line class="ch-grid" x1="${ml}" x2="${W-mr}" y1="${y(v)}" y2="${y(v)}"/><text class="ch-lbl" x="${ml-8}" y="${y(v)+4}" text-anchor="end">${v}</text>`; }
  LESSONS.forEach((l,i)=>{
    const b = bestFor(l.day); const x = ml + i*bw + bw*0.18; const w = bw*0.64;
    if (b){ s += `<rect class="ch-bar ${b.score<PASS_MARK?"low":""}" x="${x}" y="${y(b.score)}" width="${w}" height="${Math.max(ih - (y(b.score)-mt),0)}" rx="4"><title>Day ${l.day}: best ${b.score}/10</title></rect><text class="ch-val" x="${x+w/2}" y="${y(b.score)-6}" text-anchor="middle">${b.score}</text>`; }
    else { s += `<rect class="ch-empty" x="${x}" y="${y(10)}" width="${w}" height="${ih}" rx="4" opacity=".55"/>`; }
    s += `<text class="ch-lbl" x="${ml+i*bw+bw/2}" y="${H-mb+18}" text-anchor="middle">D${l.day}</text>`;
  });
  s += `<line class="ch-pass" x1="${ml}" x2="${W-mr}" y1="${y(PASS_MARK)}" y2="${y(PASS_MARK)}"/><text class="ch-lbl" x="${W-mr}" y="${y(PASS_MARK)-6}" text-anchor="end" style="fill:var(--warn)">pass mark ${PASS_MARK}</text>`;
  s += `<text class="ch-lbl" x="${ml}" y="${H-6}">Best score out of 10, by day (grey = not taken yet)</text></svg>`;
  return s;
}
function accountHTML(){
  const p = me(); const d = myData();
  const tests = d.results.length;
  const passed = LESSONS.filter(l => (bestFor(l.day)?.score ?? -1) >= PASS_MARK).length;
  const avg = tests ? Math.round(d.results.reduce((a,r)=>a+r.score,0)/tests*10) : 0;
  const rows = d.results.slice().filter(r => resFilter==="all" || r.day===+resFilter).sort((a,b)=> b.date.localeCompare(a.date));
  const bestIds = new Set(LESSONS.map(l=>bestFor(l.day)?.id).filter(Boolean));
  const others = Object.keys(mem.profiles).filter(id=>id!==mem.current);
  const profileView = editing ? `
    <form id="editForm" class="stack">
      <div class="field"><label for="eName">Full name</label><input id="eName" value="${esc(p.name)}" required maxlength="60"></div>
      <div class="field"><label for="eClass">Class / Grade</label><input id="eClass" value="${esc(p.grade)}" maxlength="30"></div>
      <div class="field"><label for="eRoll">Roll number / ID</label><input id="eRoll" value="${esc(p.roll)}" maxlength="30"></div>
      <div class="field"><label for="eSchool">School or batch</label><input id="eSchool" value="${esc(p.school)}" maxlength="60"></div>
      <div class="actions" style="justify-content:flex-start"><button class="btn btn-primary" type="submit">Save changes</button><button class="btn btn-ghost" type="button" id="cancelEdit">Cancel</button></div>
    </form>` : `
    <dl class="dl"><dt>Class</dt><dd>${esc(p.grade||"–")}</dd><dt>Roll / ID</dt><dd>${esc(p.roll||"–")}</dd><dt>School</dt><dd>${esc(p.school||"–")}</dd><dt>Joined</dt><dd>${new Date(p.created).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})}</dd></dl>
    <button class="btn btn-ghost" id="editBtn">Edit details</button>`;
  return `<div class="hello"><div><p class="eyebrow">My Account</p><h1>${esc(p.name)}</h1></div></div>
  <div class="acct-grid">
    <aside class="stack">
      <div class="panel profile-card">
        <div class="big"><span class="avatar">${esc(initials(p.name))}</span><div><p class="eyebrow" style="margin:0">Student</p><h2>${esc(p.name)}</h2></div></div>
        ${profileView}
      </div>
      <div class="panel">
        <h2>Summary</h2>
        <div class="mini-kpis"><div><b>${passed}/${N}</b><span>days passed</span></div><div><b>${tests}</b><span>tests taken</span></div><div><b>${tests?avg+"%":"–"}</b><span>average</span></div></div>
      </div>
      <div class="panel stack">
        <h2 style="margin:0">Switch student</h2>
        <p class="hint" style="margin:0">Sharing this device? Each student keeps their own results.</p>
        ${others.map(id=>`<button class="profile-btn" data-switch="${id}"><span class="avatar">${esc(initials(mem.profiles[id].name))}</span><b>${esc(mem.profiles[id].name)}</b></button>`).join("")}
        <button class="btn btn-ghost" id="addStudent">+ Add another student</button>
      </div>
    </aside>
    <div class="stack">
      <div class="panel">
        <h2>Best score by day</h2>
        <div class="chart-wrap">${chartSVG()}</div>
      </div>
      <div class="panel">
        <div class="results-head"><h2>Test results</h2>
          <div class="ctl">
            <label for="resF" class="hint">Show</label>
            <select id="resF"><option value="all">All tests</option>${LESSONS.map(l=>`<option value="${l.day}" ${resFilter==l.day?"selected":""}>Test ${l.day}</option>`).join("")}</select>
            <button class="btn btn-ghost" id="copyRes" ${tests?"":"disabled"}>Copy results</button>
          </div></div>
        ${rows.length ? `<div class="tbl-wrap"><table class="res"><thead><tr><th>Test</th><th>Topic</th><th>Attempt</th><th>Score</th><th>%</th><th>Result</th><th>Time</th><th>Date</th></tr></thead><tbody>
          ${rows.map(r=>`<tr class="${bestIds.has(r.id)?"best":""}"><td class="num">Test ${r.day}</td><td>${esc(r.title)}</td><td>#${r.attempt}</td><td class="num">${r.score}/${r.total}</td><td class="num">${Math.round(r.score/r.total*100)}%</td><td>${r.score>=PASS_MARK?'<span class="pill pill-good">Pass</span>':'<span class="pill pill-warn">Retry</span>'}${bestIds.has(r.id)?' <span class="pill pill-muted">Best</span>':""}</td><td>${fmtDur(r.secs)}</td><td>${fmtDate(r.date)}</td></tr>`).join("")}
          </tbody></table></div>` : `<div class="empty">${tests? "No attempts for this test yet." : "No tests taken yet. Finish a lesson and take its test. Your score will appear here."}</div>`}
        <p class="hint" style="margin:.7rem 0 0">"Copy results" copies this table so you can paste it into an email, chat or spreadsheet for your trainer.</p>
      </div>
      <div class="panel stack">
        <h2 style="margin:0">Reset</h2>
        ${confirmDel ? `<div class="confirm"><b>Delete ${esc(p.name)}'s account and all ${tests} test result${tests===1?"":"s"}?</b><span>This can't be undone.</span><div class="actions" style="justify-content:flex-start"><button class="btn btn-danger" id="delYes">Yes, delete everything</button><button class="btn btn-ghost" id="delNo">Cancel</button></div></div>`
          : `<p class="hint" style="margin:0">Remove this student account and its results from this device.</p><div><button class="btn btn-ghost" id="delBtn" style="color:var(--bad)">Delete this account</button></div>`}
      </div>
    </div>
  </div>`;
}
function resultsText(){
  const p = me(); const d = myData();
  const head = `Scrap Analytics · ${COURSE.name} - results for ${p.name}${p.grade?" ("+p.grade+")":""}${p.roll?" - Roll "+p.roll:""}\n`;
  const lines = ["Test\tTopic\tAttempt\tScore\tPercent\tResult\tTime\tDate"].concat(
    d.results.slice().sort((a,b)=>a.day-b.day||a.attempt-b.attempt).map(r=>[`Test ${r.day}`, r.title, r.attempt, `${r.score}/${r.total}`, Math.round(r.score/r.total*100)+"%", r.score>=PASS_MARK?"Pass":"Retry", fmtDur(r.secs), fmtDate(r.date)].join("\t")));
  return head + lines.join("\n");
}

/* ---------------- binding ---------------- */
function bind(view){
  const v = $("#view");
  $$("[data-go-day]", v).forEach(b=> b.addEventListener("click", ()=> go("lesson", +b.dataset.goDay)));
  $$("[data-nav]", v).forEach(b=> b.addEventListener("click", ()=> go(b.dataset.nav)));
  $$("[data-quiz]", v).forEach(b=> b.addEventListener("click", ()=> go("quiz", +b.dataset.quiz)));
  $$("[data-zoom]", v).forEach(b=> b.addEventListener("click", ()=> zoom(b.dataset.zoom, b.dataset.cap)));
  if (view==="lesson"){
    $$(".term", v).forEach(t=> t.addEventListener("click", ()=> t.dataset.hidden = t.dataset.hidden==="1"?"0":"1"));
    const ha = $("#hideAll"); if (ha) ha.addEventListener("click", ()=>{ const hide = ha.textContent.startsWith("Hide"); $$(".term",v).forEach(t=>t.dataset.hidden=hide?"1":"0"); ha.textContent = hide?"Show all meanings":"Hide all meanings"; });
    $$("[data-try]", v).forEach(c=> c.addEventListener("change", ()=>{
      const d=myData(); const arr = d.tried[cur.day] || (d.tried[cur.day]=[]); const i=+c.dataset.try;
      if (c.checked && !arr.includes(i)) arr.push(i); if (!c.checked) d.tried[cur.day]=arr.filter(x=>x!==i); save();
    }));
    $$("[data-widget]", v).forEach(w=>{ const i=+w.dataset.widget; const spec=LESSONS[cur.day-1].sections[i].widget; const key=cur.day+"-"+i; const d=myData(); d.play=d.play||{};
      WIDGETS.mount(w, spec, { id:key, done:(d.play[key]||[]).slice(), save:(arr)=>{ const dd=myData(); dd.play=dd.play||{}; dd.play[key]=arr.slice(); save(); }, toast }); });
    const L = LESSONS[cur.day-1];
    if (!myData().read.includes(cur.day)) {
      const end = $(".lesson-end", v);
      if ("IntersectionObserver" in window && end){
        const io = new IntersectionObserver(es=>{ if (es.some(e=>e.isIntersecting)){ const d=myData(); if(!d.read.includes(L.day)){ d.read.push(L.day); save(); } io.disconnect(); } });
        io.observe(end);
      }
    }
    const railCur = $('.rail [aria-current="true"]', v); if (railCur && window.innerWidth<=900) railCur.scrollIntoView({inline:"center",block:"nearest"});
  }
  if (view==="account"){
    const rf=$("#resF"); if(rf){ rf.value = resFilter; rf.addEventListener("change", ()=>{ resFilter=rf.value; go("account"); }); }
    const cp=$("#copyRes"); if(cp) cp.addEventListener("click", ()=>{
      const txt = resultsText();
      if (navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(txt).then(()=>toast("Results copied. Paste them anywhere."), ()=>fallbackCopy(txt)); }
      else fallbackCopy(txt);
    });
    const eb=$("#editBtn"); if(eb) eb.addEventListener("click", ()=>{ editing=true; go("account"); });
    const ce=$("#cancelEdit"); if(ce) ce.addEventListener("click", ()=>{ editing=false; go("account"); });
    const ef=$("#editForm"); if(ef) ef.addEventListener("submit", e=>{ e.preventDefault(); const p=me(); p.name=$("#eName").value.trim()||p.name; p.grade=$("#eClass").value.trim(); p.roll=$("#eRoll").value.trim(); p.school=$("#eSchool").value.trim(); save(); editing=false; $("#whoAvatar").textContent=initials(p.name); go("account"); toast("Details saved"); });
    $$("[data-switch]", v).forEach(b=> b.addEventListener("click", ()=>{ mem.current=b.dataset.switch; save(); resFilter="all"; startApp(); go("home"); toast("Switched to " + me().name); }));
    const as=$("#addStudent"); if(as) as.addEventListener("click", ()=>{ $("#pickWrap").hidden=true; show("setup"); $("#pickWrap").hidden = true; setTimeout(()=>$("#fName").focus(),50); });
    const db=$("#delBtn"); if(db) db.addEventListener("click", ()=>{ confirmDel=true; go("account"); });
    const dn=$("#delNo"); if(dn) dn.addEventListener("click", ()=>{ confirmDel=false; go("account"); });
    const dy=$("#delYes"); if(dy) dy.addEventListener("click", ()=>{ const id=mem.current; delete mem.profiles[id]; delete mem.data[id]; mem.current=null; save(); confirmDel=false; openSetup(); toast("Account deleted"); });
  }
  if (view==="result"){
    // buttons bound above through data-* attributes
  }
}
function fallbackCopy(txt){
  const ta=document.createElement("textarea"); ta.value=txt; ta.style.position="fixed"; ta.style.opacity="0"; document.body.appendChild(ta); ta.select();
  let ok=false; try{ ok=document.execCommand("copy"); }catch(e){}
  ta.remove(); toast(ok?"Results copied. Paste them anywhere.":"Couldn't copy automatically. Select the table and copy it.");
}
function zoom(src, cap){
  const lb=document.createElement("div"); lb.className="lightbox"; lb.setAttribute("role","dialog"); lb.setAttribute("aria-label","Enlarged picture");
  lb.innerHTML=`<div><img src="${src}" alt="${esc(cap)}"><p>${esc(cap)}<br><small style="opacity:.7">Tap anywhere or press Esc to close</small></p></div>`;
  const close=()=>{ lb.remove(); document.removeEventListener("keydown",onK); };
  const onK=e=>{ if(e.key==="Escape") close(); };
  lb.addEventListener("click", close); document.addEventListener("keydown", onK);
  document.body.appendChild(lb);
}

/* ---------------- boot ---------------- */
if (sGet("xlLab.unlocked")==="1") afterUnlock(); else { show("gate"); }
})();
