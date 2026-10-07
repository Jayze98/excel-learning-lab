/* =====================================================================
   Interactive practice widgets for the Excel Learning Lab
   Each widget: mount(el, spec, ctx)  ctx = { id, done:[], save(arr), toast(msg) }
   ===================================================================== */
const WIDGETS = (function(){
  "use strict";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const REF_COLORS = ["ref1","ref2","ref3","ref4"];
  let uid = 0;

  /* ---------- shared grid renderer ---------- */
  function gridHTML(data, opt){
    opt = opt || {};
    const rows = Math.max(opt.minRows || 0, data.length);
    const cols = Math.max(opt.minCols || 0, data.reduce((m,r)=>Math.max(m,(r||[]).length),0));
    let h = `<div class="xg-wrap"><table class="xg"><thead><tr><th class="xg-corner"></th>`;
    for (let c = 1; c <= cols; c++) h += `<th>${XL.numToCol(c)}</th>`;
    h += `</tr></thead><tbody>`;
    for (let r = 1; r <= rows; r++){
      h += `<tr><th>${r}</th>`;
      for (let c = 1; c <= cols; c++){
        const a = XL.addr(r,c);
        const shown = opt.cell ? opt.cell(r,c) : fmtCell((data[r-1]||[])[c-1]);
        const cls = (opt.cls ? opt.cls(r,c) : "") + (r === 1 && opt.headerRow !== false ? " xg-h" : "");
        h += `<td data-a="${a}" class="${cls}">${shown}</td>`;
      }
      h += `</tr>`;
    }
    return h + `</tbody></table></div>`;
  }
  function fmtCell(v){
    if (v === null || v === undefined) return "";
    if (typeof v === "number") return `<span class="n">${esc(XL.fmtGeneral(v))}</span>`;
    if (XL.isErr(v)) return `<span class="err">${esc(v.code)}</span>`;
    if (typeof v === "boolean") return `<span class="n">${v ? "TRUE" : "FALSE"}</span>`;
    return esc(v);
  }
  function resultMatches(r, a){
    if (XL.isErr(r)) return typeof a === "string" && r.code === a;
    if (typeof a === "number") return typeof r === "number" && Math.abs(r - a) < 0.005 * Math.max(1, Math.abs(a) > 1000 ? Math.abs(a)/1000 : 1);
    if (typeof a === "boolean") return r === a;
    return String(r).toLowerCase() === String(a).toLowerCase();
  }
  function mustOK(f, must){
    if (!must) return true; const F = f.toUpperCase().replace(/\s+/g,"");
    return must.every(m => { const mm = /^(.*)\*(\d+)$/.exec(m); if (mm){ return F.split(mm[1].toUpperCase()).length - 1 >= +mm[2]; } return F.includes(m.toUpperCase().replace(/\s+/g,"")); });
  }
  function tasksHTML(tasks, done){
    if (!tasks || !tasks.length) return "";
    return `<div class="tasks"><div class="tasks-head"><b>Tasks</b><span class="pill ${done.length===tasks.length?"pill-good":"pill-muted"}" data-count>${done.length} / ${tasks.length} done</span></div><ol>${tasks.map((t,i)=>`<li class="${done.includes(i)?"done":""}" data-t="${i}"><span class="chk" aria-hidden="true">${done.includes(i)?"✓":i+1}</span><span class="tt">${esc(t.t)}</span><button type="button" class="hint-btn" data-hint="${i}">Hint</button><code class="hint" hidden>${esc(t.hint)}</code></li>`).join("")}</ol></div>`;
  }
  function bindTasks(el, ctx, tasks){
    el.querySelectorAll("[data-hint]").forEach(b => b.addEventListener("click", () => { const c = b.nextElementSibling; c.hidden = !c.hidden; b.textContent = c.hidden ? "Hint" : "Hide"; }));
  }
  function markDone(el, ctx, tasks, i){
    if (ctx.done.includes(i)) return false;
    ctx.done.push(i); ctx.save(ctx.done);
    const li = el.querySelector(`[data-t="${i}"]`); if (li){ li.classList.add("done"); li.querySelector(".chk").textContent = "✓"; }
    const cnt = el.querySelector("[data-count]"); if (cnt){ cnt.textContent = `${ctx.done.length} / ${tasks.length} done`; if (ctx.done.length === tasks.length){ cnt.classList.remove("pill-muted"); cnt.classList.add("pill-good"); } }
    return true;
  }

  /* ---------- PLAY: formula practice sheet ---------- */
  function play(el, spec, ctx){
    const id = "fx" + (++uid);
    const namesNote = spec.names ? `<p class="hint-line">Named ranges: ${Object.entries(spec.names).map(([k,v])=>`<code>${esc(k)}</code> = ${esc(v)}`).join(", ")}</p>` : "";
    el.innerHTML = `<div class="xw xw-play">
      <div class="fxbar"><span class="nbox" data-nbox>A1</span><label class="fxl" for="${id}">fx</label><input id="${id}" class="fxin" spellcheck="false" autocomplete="off" value="${esc(spec.start||"=")}"><button type="button" class="btn btn-primary btn-sm" data-go>Enter</button></div>
      <div class="xres" data-res aria-live="polite"></div>
      ${gridHTML(spec.data, { minRows: spec.data.length + 1, minCols: (spec.data[0]||[]).length + 1, cell:(r,c)=>{ const v = new XL.Sheet(spec.data, spec.names).val(r,c); return fmtCell(v); } })}
      <p class="hint-line">Tip: click cells in the grid to add their address to your formula.</p>${namesNote}
      ${tasksHTML(spec.tasks, ctx.done)}</div>`;
    const inp = el.querySelector(".fxin"), res = el.querySelector("[data-res]");
    function highlight(){
      el.querySelectorAll(".xg td").forEach(td => td.classList.remove(...REF_COLORS));
      const refs = XL.refsIn(inp.value, spec.names ? Object.fromEntries(Object.entries(spec.names).map(([k,v])=>[k.toUpperCase(),v])) : null);
      refs.forEach((rg,i) => { for (let r = rg.r1; r <= rg.r2; r++) for (let c = rg.c1; c <= rg.c2; c++){ const td = el.querySelector(`td[data-a="${XL.addr(r,c)}"]`); if (td) td.classList.add(REF_COLORS[i % 4]); } });
    }
    function go(){
      const f = inp.value.trim();
      if (!f){ res.innerHTML = ""; return; }
      if (f[0] !== "="){ res.innerHTML = `<span class="pill pill-warn">Text, not a formula</span> <span>Excel would treat this as text. Formulas must start with <b>=</b></span>`; return; }
      const v = XL.run(f, new XL.Sheet(spec.data, spec.names));
      const isE = XL.isErr(v);
      let msg = "";
      if (isE && v.code === "#ERROR") msg = "Excel would say: There's a problem with this formula. Check brackets, commas and quotes.";
      else if (isE) msg = ({"#DIV/0!":"Dividing by zero or an empty cell.","#NAME?":"Excel doesn't recognise a name. Is a function misspelt, or is text missing its quotes? (This practice sheet knows the functions used in this course.)","#VALUE!":"A value is the wrong type, e.g. text used in maths.","#N/A":"No match was found.","#REF!":"The reference points outside the table.","#NUM!":"A problem with a number."})[v.code] || "";
      res.innerHTML = `<span class="res-lbl">Result</span><b class="res-val ${isE?"err":""}">${esc(XL.display(v))}</b>${msg?`<span class="res-msg">${esc(msg)}</span>`:""}`;
      (spec.tasks||[]).some((t,i) => { if (!ctx.done.includes(i) && resultMatches(v, t.a) && mustOK(f, t.must)){ markDone(el, ctx, spec.tasks, i); res.innerHTML += `<span class="pill pill-good">✓ Task ${i+1} complete</span>`; ctx.toast && ctx.toast("Task complete!"); return true; } return false; });
    }
    inp.addEventListener("input", highlight);
    inp.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); go(); } });
    el.querySelector("[data-go]").addEventListener("click", go);
    el.querySelectorAll(".xg td").forEach(td => td.addEventListener("click", () => {
      el.querySelector("[data-nbox]").textContent = td.dataset.a;
      if (inp.value.trim().startsWith("=")){
        const pos = inp.selectionStart ?? inp.value.length; const before = inp.value.slice(0,pos), after = inp.value.slice(pos);
        const add = /[=+\-*/^(,:&<>]$/.test(before.trim()) ? td.dataset.a : "";
        if (add){ inp.value = before + add + after; inp.focus(); inp.setSelectionRange(pos+add.length, pos+add.length); highlight(); }
      }
    }));
    bindTasks(el, ctx, spec.tasks); highlight(); go();
  }

  /* ---------- COPY: how references move when a formula is copied down ---------- */
  function copy(el, spec, ctx){
    const base = XL.parseAddr(spec.cell); const id = "cp" + (++uid);
    el.innerHTML = `<div class="xw">
      <div class="fxbar"><span class="nbox">${esc(spec.cell)}</span><label class="fxl" for="${id}">fx</label><input id="${id}" class="fxin" spellcheck="false" value="${esc(spec.f)}"><button type="button" class="btn btn-primary btn-sm" data-go>Copy down</button></div>
      <div class="presets">${(spec.presets||[]).map(p=>`<button type="button" class="chip" data-p="${esc(p)}">${esc(p)}</button>`).join("")}<label class="chk-inline"><input type="checkbox" data-sf> Show formulas</label></div>
      <div data-grid></div><div class="copylist" data-list></div></div>`;
    const inp = el.querySelector(".fxin");
    function render(){
      const f = inp.value.trim().startsWith("=") ? inp.value.trim() : "=" + inp.value.trim();
      const data = spec.data.map(r => (r||[]).slice());
      const formulas = [];
      for (let k = 0; k < spec.rows; k++){ const r = base.r + k; while (data.length < r) data.push([]); const row = data[r-1]; while (row.length < base.c) row.push(null); const ff = XL.shift(f, k, 0); row[base.c-1] = ff; formulas.push([XL.addr(r, base.c), ff]); }
      const sh = new XL.Sheet(data); const showF = el.querySelector("[data-sf]").checked;
      el.querySelector("[data-grid]").innerHTML = gridHTML(data, { minCols: Math.max(...data.map(r=>r.length)), cell:(r,c)=>{ const raw = sh.raw(r,c); if (typeof raw === "string" && raw[0] === "=") return showF ? `<code class="f">${esc(raw)}</code>` : fmtCell(sh.val(r,c)); return fmtCell(raw); }, cls:(r,c)=> (c === base.c && r >= base.r && r < base.r + spec.rows) ? "xg-f" : "" });
      el.querySelector("[data-list]").innerHTML = formulas.map(([a,ff],i) => { const v = sh.val(XL.parseAddr(a).r, base.c); return `<div class="${i===0?"orig":""}"><b>${a}</b><code>${esc(ff)}</code><span>→ ${esc(XL.display(v))}</span>${i===0?'<em>original</em>':'<em>copied</em>'}</div>`; }).join("");
    }
    el.querySelector("[data-go]").addEventListener("click", render);
    inp.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); render(); } });
    el.querySelector("[data-sf]").addEventListener("change", render);
    el.querySelectorAll("[data-p]").forEach(b => b.addEventListener("click", () => { inp.value = b.dataset.p; render(); }));
    render();
  }

  /* ---------- REFS: F4 cycler ---------- */
  function refs(el, spec, ctx){
    const id = "rf" + (++uid);
    el.innerHTML = `<div class="xw xw-refs">
      <div class="refs-row"><label for="${id}">Cell reference</label><input id="${id}" class="fxin short" value="A4" maxlength="8"><button type="button" class="btn btn-accent btn-sm" data-f4>Press F4</button></div>
      <div class="refs-states" data-states></div><p class="refs-exp" data-exp></p><p class="hint-line" data-demo></p></div>`;
    let state = 0; const inp = el.querySelector("input");
    const kinds = [["Relative","Column and row both move when copied."],["Absolute","Locked: always points to the same cell."],["Mixed: row locked","The column moves; the row stays."],["Mixed: column locked","The row moves; the column stays."]];
    function forms(){ const a = XL.parseAddr(inp.value.replace(/\$/g,"")) || {r:4,c:1}; const C = XL.numToCol(a.c), R = a.r; return [C+R, "$"+C+"$"+R, C+"$"+R, "$"+C+R]; }
    function render(){ const f = forms();
      el.querySelector("[data-states]").innerHTML = f.map((x,i)=>`<span class="rstate ${i===state?"on":""}"><code>${x}</code><small>${kinds[i][0]}</small></span>`).join('<span class="arr" aria-hidden="true">→</span>');
      el.querySelector("[data-exp]").innerHTML = `<b>${esc(f[state])}</b>: ${kinds[state][1]}`;
      el.querySelector("[data-demo]").innerHTML = `Copy <code>=${esc(f[state])}</code> one row down and one column right and it becomes <code>${esc(XL.shift("="+f[state],1,1))}</code>.`;
    }
    el.querySelector("[data-f4]").addEventListener("click", () => { state = (state+1)%4; render(); });
    inp.addEventListener("input", () => { state = 0; render(); });
    render();
  }

  /* ---------- STEPS: order of operations ---------- */
  function steps(el, spec, ctx){
    const id = "st" + (++uid);
    el.innerHTML = `<div class="xw"><div class="fxbar"><span class="nbox">=</span><label class="fxl" for="${id}">fx</label><input id="${id}" class="fxin" spellcheck="false" value="${esc(spec.start)}"><button type="button" class="btn btn-accent btn-sm" data-next>Next step</button><button type="button" class="btn btn-ghost btn-sm" data-reset>Start again</button></div>
      <div class="presets">${["4+2*3","(2*4)+3^2-8/4","3^(6/3)+(3*3)-2*(6-3)","10-4/2","(10-4)/2","100/10*2"].map(p=>`<button type="button" class="chip" data-p="${esc(p)}">${esc(p)}</button>`).join("")}</div>
      <ol class="steplist" data-list></ol></div>`;
    const inp = el.querySelector("input"); let toks = null, list = [];
    function tokenize(s){ s = s.replace(/^=/,""); const out = []; let i = 0;
      while (i < s.length){ const ch = s[i];
        if (/\s/.test(ch)){ i++; continue; }
        const prev = out[out.length-1];
        const unary = ch === "-" && (!prev || (prev.t === "op") || prev.v === "(");
        const m = /^(\d+\.?\d*|\.\d+)/.exec(s.slice(unary ? i+1 : i));
        if (m && (unary || /[\d.]/.test(ch))){ out.push({t:"n", v:(unary?-1:1)*parseFloat(m[1])}); i += m[1].length + (unary?1:0); continue; }
        if ("+-*/^".includes(ch)){ out.push({t:"op", v:ch}); i++; continue; }
        if (ch === "(" || ch === ")"){ out.push({t:"p", v:ch}); i++; continue; }
        throw new Error("Use only numbers, + - * / ^ and brackets.");
      } return out; }
    const fmt = n => XL.fmtGeneral(n);
    const show = (t, hi) => t.map((x,i)=> { const s = x.t === "n" ? (x.v < 0 && i > 0 && t[i-1].t !== "p" ? `(${fmt(x.v)})` : fmt(x.v)) : x.v; return i === hi ? `<mark>${esc(s)}</mark>` : esc(s); }).join("");
    function step(){
      let lo = 0, hi = toks.length, inParen = false;
      const close = toks.findIndex(x => x.v === ")");
      if (close >= 0){ let open = -1; for (let i = close; i >= 0; i--) if (toks[i].v === "("){ open = i; break; } if (open < 0) throw new Error("Brackets don't match."); lo = open+1; hi = close; inParen = true; }
      else if (toks.some(x => x.v === "(")) throw new Error("Brackets don't match.");
      const seg = toks.slice(lo, hi);
      if (seg.length === 1 && inParen){ toks.splice(lo-1, 3, seg[0]); return { label:"Brackets", text:`Remove the brackets around ${fmt(seg[0].v)}`, hi: lo-1 }; }
      if (seg.length === 1) return null;
      let k = seg.findIndex(x => x.v === "^"), label = "Exponents";
      if (k < 0){ k = seg.findIndex(x => x.v === "*" || x.v === "/"); label = "Multiply / divide"; }
      if (k < 0){ k = seg.findIndex(x => x.v === "+" || x.v === "-"); label = "Add / subtract"; }
      if (k < 1 || !seg[k-1] || !seg[k+1] || seg[k-1].t !== "n" || seg[k+1].t !== "n") throw new Error("That calculation isn't complete.");
      const a = seg[k-1].v, b = seg[k+1].v, o = seg[k].v; let r;
      if (o === "^") r = Math.pow(a,b); if (o === "*") r = a*b; if (o === "/"){ if (b === 0) throw new Error("#DIV/0! Dividing by zero."); r = a/b; } if (o === "+") r = a+b; if (o === "-") r = a-b;
      toks.splice(lo+k-1, 3, {t:"n", v:r});
      let hiIdx = lo+k-1;
      if (inParen && toks[lo-1] && toks[lo-1].v === "(" && toks[lo+1] && toks[lo+1].v === ")"){ toks.splice(lo-1, 3, toks[lo]); hiIdx = lo-1; }
      return { label: inParen ? "Brackets: " + label.toLowerCase() : label, text:`${fmt(a)} ${o} ${fmt(b)} = ${fmt(r)}`, hi: hiIdx };
    }
    function reset(){ try { toks = tokenize(inp.value); list = [`<li class="start"><span class="lbl">Start</span><code>${show(toks,-1)}</code></li>`]; } catch(e){ toks = null; list = [`<li class="bad">${esc(e.message)}</li>`]; } el.querySelector("[data-list]").innerHTML = list.join(""); }
    function next(){ if (!toks) return; try { const s = step();
        if (!s){ list.push(`<li class="final"><span class="lbl">Answer</span><code><b>${esc(fmt(toks[0].v))}</b></code></li>`); toks = null; }
        else list.push(`<li><span class="lbl">${esc(s.label)}</span><span class="calc">${esc(s.text)}</span><code>${show(toks, s.hi)}</code></li>`);
      } catch(e){ list.push(`<li class="bad">${esc(e.message)}</li>`); toks = null; }
      el.querySelector("[data-list]").innerHTML = list.join(""); }
    el.querySelector("[data-next]").addEventListener("click", next);
    el.querySelector("[data-reset]").addEventListener("click", reset);
    inp.addEventListener("input", reset);
    inp.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); next(); } });
    el.querySelectorAll("[data-p]").forEach(b => b.addEventListener("click", () => { inp.value = b.dataset.p; reset(); }));
    reset();
  }

  /* ---------- FILL: fill handle series ---------- */
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
  function caseLike(src, w){ if (src === src.toUpperCase()) return w.toUpperCase(); if (src === src.toLowerCase()) return w.toLowerCase(); return w; }
  function listIdx(v, list){ const s = v.trim().toLowerCase(); let i = list.findIndex(x => x.toLowerCase() === s); if (i >= 0) return {i, short:false}; i = list.findIndex(x => x.slice(0,3).toLowerCase() === s); if (i >= 0) return {i, short:true}; return null; }
  function parseDate(v){ const m = /^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/.exec(v.trim()); if (!m) return null; const d = new Date(Date.UTC(+m[3], +m[2]-1, +m[1])); return isNaN(d) ? null : {d, sep: v.trim().match(/[-/.]/)[0]}; }
  const fmtDate = (d, sep) => [String(d.getUTCDate()).padStart(2,"0"), String(d.getUTCMonth()+1).padStart(2,"0"), d.getUTCFullYear()].join(sep);
  function series(a, b, n, ctrl){
    a = a.trim(); b = (b||"").trim(); const out = [a]; if (b) out.push(b);
    const isNum = s => s !== "" && !isNaN(+s);
    const tn = s => { const m = /^(.*?)(\d+)$/.exec(s); return m && m[1] !== "" ? {p:m[1], n:+m[2]} : null; };
    let gen = null, note = "";
    if (isNum(a) && b && isNum(b)){ const step = +b - +a; gen = i => XL.fmtGeneral(+a + step*i); note = `Two numbers → Excel continues the pattern (step ${XL.fmtGeneral(step)}).`; }
    else if (isNum(a) && !b){ if (ctrl){ gen = i => XL.fmtGeneral(+a + i); note = "Ctrl + drag on one number → counts up by 1."; } else { gen = () => a; note = "One number → copied. Type a second number, or tick Ctrl, to make a series."; } }
    else if (listIdx(a, MONTHS) && !ctrl){ const s = listIdx(a, MONTHS); const st = b && listIdx(b, MONTHS) ? (listIdx(b, MONTHS).i - s.i + 12) % 12 || 12 : 1; gen = i => caseLike(a, (s.short ? MONTHS[(s.i+i*st)%12].slice(0,3) : MONTHS[(s.i+i*st)%12])); note = "Excel knows the months and continues them."; }
    else if (listIdx(a, DAYS) && !ctrl){ const s = listIdx(a, DAYS); const st = b && listIdx(b, DAYS) ? (listIdx(b, DAYS).i - s.i + 7) % 7 || 7 : 1; gen = i => caseLike(a, (s.short ? DAYS[(s.i+i*st)%7].slice(0,3) : DAYS[(s.i+i*st)%7])); note = "Excel knows the days of the week."; }
    else if (parseDate(a) && !ctrl){ const p = parseDate(a); const p2 = b && parseDate(b); const st = p2 ? Math.round((p2.d - p.d)/86400000) : 1; gen = i => fmtDate(new Date(p.d.getTime() + st*i*86400000), p.sep); note = `Dates go up by ${st} day${st===1?"":"s"} each cell.`; }
    else if (tn(a) && !ctrl){ const t = tn(a); const t2 = b && tn(b); const st = t2 && t2.p === t.p ? t2.n - t.n : 1; gen = i => t.p + (t.n + st*i); note = "Text ending in a number → the number counts up."; }
    else { gen = () => a; note = ctrl ? "Holding Ctrl reverses the normal behaviour, so the series is copied." : "Plain text is simply copied."; }
    const res = []; for (let i = 0; i < n; i++) res.push(i < out.length && (i === 0 || b) ? out[i] : gen(i));
    return { res, note };
  }
  function fill(el, spec, ctx){
    const a = "fa"+(++uid), b = "fb"+uid, n = "fn"+uid, c = "fc"+uid;
    el.innerHTML = `<div class="xw xw-fill"><div class="fill-ctl">
      <div class="field"><label for="${a}">First cell</label><input id="${a}" value="January"></div>
      <div class="field"><label for="${b}">Second cell (optional)</label><input id="${b}" value="" placeholder="leave empty"></div>
      <div class="field"><label for="${n}">Drag over <b data-nv>10</b> cells</label><input id="${n}" type="range" min="3" max="14" value="10"></div>
      <label class="chk-inline"><input type="checkbox" id="${c}"> Hold Ctrl while dragging</label></div>
      <div class="presets">${["January","Mon","5","Test 1","01-06-2026","Present","Q1"].map(p=>`<button type="button" class="chip" data-p="${esc(p)}">${esc(p)}</button>`).join("")}<button type="button" class="chip" data-p2="5|10">5 and 10</button></div>
      <div class="fill-out"><div class="fill-col" data-col></div><p class="fill-note" data-note></p></div></div>`;
    const A = el.querySelector("#"+a), B = el.querySelector("#"+b), N = el.querySelector("#"+n), C = el.querySelector("#"+c);
    function render(){ el.querySelector("[data-nv]").textContent = N.value; const s = series(A.value, B.value, +N.value, C.checked);
      el.querySelector("[data-col]").innerHTML = s.res.map((v,i)=>`<div class="fcell ${i===0||(i===1&&B.value.trim())?"src":""}" style="animation-delay:${i*40}ms"><span>${i+1}</span>${esc(v)}</div>`).join("");
      el.querySelector("[data-note]").textContent = s.note; }
    [A,B,N,C].forEach(x => x.addEventListener("input", render)); C.addEventListener("change", render);
    el.querySelectorAll("[data-p]").forEach(x => x.addEventListener("click", () => { A.value = x.dataset.p; B.value = ""; render(); }));
    el.querySelectorAll("[data-p2]").forEach(x => x.addEventListener("click", () => { const [p,q] = x.dataset.p2.split("|"); A.value = p; B.value = q; render(); }));
    render();
  }

  /* ---------- NUMFMT: number format previewer ---------- */
  function numfmt(el, spec, ctx){
    const v = "nv"+(++uid), f = "nf"+uid, d = "nd"+uid, ng = "ng"+uid;
    const FORMATS = ["General","Number","Currency","Accounting","Percentage","Fraction","Scientific","Short Date","Long Date","Time","Text"];
    el.innerHTML = `<div class="xw"><div class="fill-ctl">
      <div class="field"><label for="${v}">Value typed in the cell</label><input id="${v}" value="1234.5"></div>
      <div class="field"><label for="${f}">Number format</label><select id="${f}">${FORMATS.map(x=>`<option>${x}</option>`).join("")}</select></div>
      <div class="field"><label for="${d}">Decimal places</label><input id="${d}" type="number" min="0" max="6" value="2"></div>
      <label class="chk-inline"><input type="checkbox" id="${ng}"> Negatives in red brackets</label></div>
      <div class="nf-out"><div class="nf-cell"><span class="lbl">Cell shows</span><b data-o></b></div><div class="nf-cell"><span class="lbl">Formula Bar (real value)</span><code data-r></code></div></div>
      <p class="hint-line" data-n></p>
      <div class="presets">${["1234.5","0.25","-850","46293","0.75","9876543210"].map(p=>`<button type="button" class="chip" data-p="${p}">${p}</button>`).join("")}</div></div>`;
    const V = el.querySelector("#"+v), F = el.querySelector("#"+f), D = el.querySelector("#"+d), NG = el.querySelector("#"+ng);
    function frac(x){ const w = Math.trunc(x), r = Math.abs(x - w); if (r < 1e-9) return String(w); let best = [0,1,1]; for (let q = 1; q <= 9; q++){ const p = Math.round(r*q); const e = Math.abs(r - p/q); if (e < best[2] - 1e-12) best = [p,q,e]; } return (w ? w + " " : (x < 0 ? "-" : "")) + best[0] + "/" + best[1]; }
    function render(){
      const raw = V.value.trim(); const n = +raw; const dp = Math.max(0, Math.min(6, +D.value || 0)); let out = raw, note = "";
      const isN = raw !== "" && !isNaN(n);
      const grp = (x, dd) => Math.abs(x).toLocaleString("en-IN", {minimumFractionDigits:dd, maximumFractionDigits:dd});
      const neg = (s, x) => x < 0 ? (NG.checked ? `<span class="neg">(${s})</span>` : "-" + s) : s;
      if (F.value === "Text"){ out = esc(raw); note = "Text format stores what you type as text, e.g. phone numbers with leading zeros. Text can't be used in maths."; }
      else if (!isN){ out = esc(raw); note = "That isn't a number, so number formats don't change it."; }
      else switch (F.value){
        case "General": out = esc(XL.fmtGeneral(n)); note = "General shows the number as typed, with no special formatting."; break;
        case "Number": out = neg(grp(n,dp), n); note = "Number: fixed decimal places and thousands separators (Indian grouping shown)."; break;
        case "Currency": out = neg("₹" + grp(n,dp), n); note = "Currency puts the symbol right next to the number."; break;
        case "Accounting": out = `<span class="acc"><span>₹</span><span>${n<0?"("+grp(n,dp)+")":grp(n,dp)}</span></span>`; note = "Accounting lines up the symbol at the left edge and shows negatives in brackets."; break;
        case "Percentage": out = esc((n*100).toFixed(dp) + "%"); note = "Percentage multiplies by 100 for display: 0.25 shows as 25%."; break;
        case "Fraction": out = esc(frac(n)); note = "Fraction shows the nearest simple fraction (up to one digit)."; break;
        case "Scientific": out = esc(n.toExponential(dp).replace("e+","E+").replace("e-","E-")); note = "Scientific notation: 1.23E+03 means 1.23 × 10³."; break;
        case "Short Date": case "Long Date": { const dt = new Date(Date.UTC(1899,11,30) + Math.floor(n)*86400000); out = esc(F.value === "Short Date" ? dt.toLocaleDateString("en-GB",{timeZone:"UTC"}) : dt.toLocaleDateString("en-GB",{timeZone:"UTC",weekday:"long",day:"numeric",month:"long",year:"numeric"})); note = "Dates are numbers! Excel counts days from 1 January 1900, so 46293 is a date in 2026."; break; }
        case "Time": { const fr = ((n % 1) + 1) % 1; const mins = Math.round(fr*1440); out = esc(String(Math.floor(mins/60)%24).padStart(2,"0") + ":" + String(mins%60).padStart(2,"0")); note = "Times are fractions of a day: 0.5 = 12:00 noon, 0.75 = 18:00."; break; }
      }
      el.querySelector("[data-o]").innerHTML = out; el.querySelector("[data-r]").textContent = raw; el.querySelector("[data-n]").textContent = note;
    }
    [V,F,D,NG].forEach(x => { x.addEventListener("input", render); x.addEventListener("change", render); });
    el.querySelectorAll("[data-p]").forEach(b => b.addEventListener("click", () => { V.value = b.dataset.p; render(); }));
    render();
  }

  /* ---------- RIBBON: tab explorer ---------- */
  function ribbon(el){
    const TABS = [["Home","010-023","Clipboard (cut, copy, paste), Font, Alignment (wrap text, merge), Number formats, Styles (conditional formatting, cell styles), Cells (insert, delete, format) and Editing (AutoSum, fill, sort & filter, find)."],
      ["Insert","011-026","PivotTables and Tables, Pictures and Shapes, Charts, Sparklines, Slicers, Hyperlinks, Text boxes, Header & Footer and Symbols."],
      ["Page Layout","011-027","Themes, Page Setup (margins, orientation, size, print area, breaks, print titles), Scale to Fit and Sheet Options (gridlines, headings)."],
      ["Formulas","011-028","Insert Function and the Function Library, Defined Names (Name Manager), Formula Auditing (trace precedents, show formulas, evaluate) and Calculation options."],
      ["Data","011-029","Get External Data, Connections, Sort & Filter (sort, filter, advanced), Data Tools (text to columns, remove duplicates, data validation) and Outline (group, subtotal)."],
      ["Review","011-030","Proofing (spelling), Comments (new, show all) and Changes (protect sheet, protect workbook, share)."],
      ["View","012-033","Workbook Views (normal, page layout, page break preview), Show (gridlines, formula bar, headings), Zoom, Window (freeze panes, split, new window) and Macros."]];
    el.innerHTML = `<div class="xw xw-ribbon"><div class="rtabs" role="tablist">${TABS.map((t,i)=>`<button type="button" role="tab" aria-selected="${i===0}" data-i="${i}">${t[0]}</button>`).join("")}</div><div data-body></div></div>`;
    function show(i){ el.querySelectorAll("[data-i]").forEach(b => b.setAttribute("aria-selected", String(+b.dataset.i === i)));
      const t = TABS[i]; el.querySelector("[data-body]").innerHTML = `<div class="rimg"><img src="img/${t[1]}.jpg" alt="The ${t[0]} tab of the Excel 2010 Ribbon"></div><p><b>${t[0]} tab:</b> ${t[2]}</p>`; }
    el.querySelectorAll("[data-i]").forEach(b => b.addEventListener("click", () => show(+b.dataset.i)));
    show(0);
  }

  /* ---------- CF: conditional formatting rule builder ---------- */
  function cf(el, spec, ctx){
    const u = ++uid;
    const RULES = ["Greater Than","Less Than","Between","Equal To","Text that Contains","Duplicate Values","Top 3","Above Average","Use a formula"];
    el.innerHTML = `<div class="xw"><div class="fill-ctl">
      <div class="field"><label for="cr${u}">Apply to range</label><input id="cr${u}" value="${esc(spec.range)}"></div>
      <div class="field"><label for="ct${u}">Rule</label><select id="ct${u}">${RULES.map(r=>`<option ${r==="Use a formula"?"selected":""}>${r}</option>`).join("")}</select></div>
      <div class="field" data-v1><label for="cv${u}" data-v1l>Formula (for the top-left cell)</label><input id="cv${u}" value="${esc(spec.start||"")}" spellcheck="false"></div>
      <div class="field" data-v2 hidden><label for="cw${u}">and</label><input id="cw${u}" value="90"></div>
      <div class="field"><label for="cs${u}">Format</label><select id="cs${u}"><option value="hl-red">Light red fill</option><option value="hl-green">Green fill</option><option value="hl-yellow">Yellow fill</option></select></div>
      <button type="button" class="btn btn-primary btn-sm" data-apply>Apply rule</button></div>
      <div data-grid></div><p class="hint-line" data-info></p>${tasksHTML(spec.tasks, ctx.done)}</div>`;
    const R = el.querySelector("#cr"+u), T = el.querySelector("#ct"+u), V = el.querySelector("#cv"+u), W = el.querySelector("#cw"+u), S = el.querySelector("#cs"+u);
    const sh = new XL.Sheet(spec.data);
    let on = new Set();
    function syncFields(){ const t = T.value; el.querySelector("[data-v2]").hidden = t !== "Between";
      el.querySelector("[data-v1]").hidden = ["Duplicate Values","Top 3","Above Average"].includes(t);
      el.querySelector("[data-v1l]").textContent = t === "Use a formula" ? "Formula (for the top-left cell)" : t === "Text that Contains" ? "Text" : t === "Between" ? "Between" : "Value";
      if (t !== "Use a formula" && V.value.startsWith("=")) V.value = t === "Text that Contains" ? "Red" : "80"; if (t === "Use a formula" && !V.value.startsWith("=")) V.value = spec.start || "="; }
    function compute(){
      const rg = XL.parseRange(R.value.trim().replace(/\$/g,"")); const res = new Set(); let err = "";
      if (!rg){ return {res, err:"Type a range like C2:D8."}; }
      const list = []; for (let r = rg.r1; r <= rg.r2; r++) for (let c = rg.c1; c <= rg.c2; c++) list.push([r,c,sh.val(r,c)]);
      const t = T.value; const numVals = list.map(x=>x[2]).filter(x=>typeof x === "number");
      const num = s => +s;
      list.forEach(([r,c,v]) => { let hit = false;
        switch (t){
          case "Greater Than": hit = typeof v === "number" && v > num(V.value); break;
          case "Less Than": hit = typeof v === "number" && v < num(V.value); break;
          case "Between": hit = typeof v === "number" && v >= Math.min(num(V.value),num(W.value)) && v <= Math.max(num(V.value),num(W.value)); break;
          case "Equal To": hit = v !== null && String(v).toLowerCase() === V.value.trim().toLowerCase(); break;
          case "Text that Contains": hit = typeof v === "string" && V.value.trim() !== "" && v.toLowerCase().includes(V.value.trim().toLowerCase()); break;
          case "Duplicate Values": hit = v !== null && list.filter(x => x[2] !== null && String(x[2]).toLowerCase() === String(v).toLowerCase()).length > 1; break;
          case "Top 3": { const top = numVals.slice().sort((a,b)=>b-a).slice(0,3); hit = typeof v === "number" && v >= top[top.length-1]; break; }
          case "Above Average": { const av = numVals.reduce((a,b)=>a+b,0)/(numVals.length||1); hit = typeof v === "number" && v > av; break; }
          case "Use a formula": { const f = XL.shift(V.value.trim().startsWith("=") ? V.value.trim() : "="+V.value.trim(), r - rg.r1, c - rg.c1); const x = XL.run(f, sh); if (XL.isErr(x)){ if (x.code !== "#VALUE!") err = "The formula gives " + XL.display(x) + " for some cells."; hit = false; } else hit = x === true || (typeof x === "number" && x !== 0); break; }
        }
        if (hit) res.add(XL.addr(r,c)); });
      return {res, err, rg};
    }
    function render(){
      const {res, err, rg} = compute(); on = res;
      el.querySelector("[data-grid]").innerHTML = gridHTML(spec.data, { cls:(r,c)=>{ const a = XL.addr(r,c); let k = res.has(a) ? S.value : ""; if (rg && r>=rg.r1 && r<=rg.r2 && c>=rg.c1 && c<=rg.c2) k += " inrange"; return k; }, cell:(r,c)=>fmtCell(sh.val(r,c)) });
      el.querySelector("[data-info]").textContent = err || `${res.size} cell${res.size===1?"":"s"} highlighted.`;
      (spec.tasks||[]).some((tk,i) => { if (ctx.done.includes(i)) return false; if (tk.cells.length === res.size && tk.cells.every(a => res.has(a))){ markDone(el, ctx, spec.tasks, i); ctx.toast && ctx.toast("Task complete!"); return true; } return false; });
    }
    T.addEventListener("change", () => { syncFields(); render(); });
    [R,V,W,S].forEach(x => x.addEventListener("change", render));
    [V,R].forEach(x => x.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); render(); } }));
    el.querySelector("[data-apply]").addEventListener("click", render);
    bindTasks(el, ctx, spec.tasks); syncFields(); render();
  }

  /* ---------- TABLE: sort / filter ---------- */
  function table(el, spec, ctx){
    const u = ++uid; const head = spec.data[0], body = spec.data.slice(1).map((r,i)=>({r, n:i+2}));
    const numCol = head.map((_,c) => body.every(x => typeof x.r[c] === "number"));
    let rows = body.slice(), filters = {};
    const colOpts = head.map((h,i)=>`<option value="${i}">${esc(h)}</option>`).join("");
    const sortCtl = `<div class="fill-ctl">
      <div class="field"><label for="s1${u}">Sort by</label><select id="s1${u}">${colOpts}</select></div>
      <div class="field"><label for="o1${u}">Order</label><select id="o1${u}"><option value="1">A to Z / Smallest to Largest</option><option value="-1">Z to A / Largest to Smallest</option></select></div>
      <div class="field"><label for="s2${u}">Then by</label><select id="s2${u}"><option value="">(none)</option>${colOpts}</select></div>
      <div class="field"><label for="o2${u}">Order</label><select id="o2${u}"><option value="1">A to Z / Smallest to Largest</option><option value="-1">Z to A / Largest to Smallest</option></select></div>
      <button type="button" class="btn btn-primary btn-sm" data-sort>Sort</button><button type="button" class="btn btn-ghost btn-sm" data-reset>Original order</button></div>`;
    el.innerHTML = `<div class="xw">${spec.mode === "sort" ? sortCtl : `<div class="fill-ctl"><span class="hint-line" style="margin:0">Use the drop-downs under each heading, like AutoFilter arrows.</span><button type="button" class="btn btn-ghost btn-sm" data-clear>Clear all filters</button></div>`}<div data-grid></div><p class="hint-line" data-info></p></div>`;
    if (spec.mode === "sort"){ el.querySelector(`#s1${u}`).value = String(head.indexOf("Designation")); el.querySelector(`#s2${u}`).value = String(head.indexOf("Location")); }
    function numFilterOK(v, f){ const vals = body.map(x=>x.r[+f.c]).filter(x=>typeof x === "number"); const av = vals.reduce((a,b)=>a+b,0)/vals.length;
      if (f.v === "top3") return v >= vals.slice().sort((a,b)=>b-a)[2]; if (f.v === "above") return v > av; if (f.v === "below") return v < av; if (f.v === "ge30") return v >= 30000; if (f.v === "lt20") return v < 20000; return true; }
    function render(){
      let shown = rows;
      if (spec.mode === "filter") shown = body.filter(x => Object.entries(filters).every(([c,v]) => v === "" || (numCol[c] ? numFilterOK(x.r[c], {c, v}) : String(x.r[c]) === v)));
      const active = Object.values(filters).some(v => v !== "");
      let h = `<div class="xg-wrap"><table class="xg"><thead><tr><th class="xg-corner"></th>${head.map((_,c)=>`<th>${XL.numToCol(c+1)}</th>`).join("")}</tr></thead><tbody>`;
      h += `<tr><th>1</th>${head.map((x,c)=>`<td class="xg-h">${esc(x)}${spec.mode === "filter" ? `<select class="flt" data-c="${c}" aria-label="Filter ${esc(x)}"><option value="">(All)</option>${numCol[c] ? `<option value="top3">Top 3</option><option value="above">Above Average</option><option value="below">Below Average</option><option value="ge30">≥ 30,000</option><option value="lt20">&lt; 20,000</option>` : [...new Set(body.map(b=>b.r[c]))].sort().map(v=>`<option ${filters[c]===String(v)?"selected":""}>${esc(v)}</option>`).join("")}</select>` : ""}</td>`).join("")}</tr>`;
      shown.forEach((x,i) => { h += `<tr><th class="${active?"filtered":""}">${spec.mode === "filter" ? x.n : i+2}</th>${x.r.map(v=>`<td>${fmtCell(v)}</td>`).join("")}</tr>`; });
      h += `</tbody></table></div>`;
      el.querySelector("[data-grid]").innerHTML = h;
      el.querySelectorAll(".flt").forEach(s => { if (filters[s.dataset.c]) s.value = filters[s.dataset.c]; s.addEventListener("change", () => { filters[s.dataset.c] = s.value; render(); }); });
      el.querySelector("[data-info]").textContent = spec.mode === "filter" ? `${shown.length} of ${body.length} records found${active ? " · blue row numbers mean a filter is on; hidden rows are still there." : "."}` : "Each whole row moves together, so every employee keeps their own details.";
    }
    if (spec.mode === "sort"){
      el.querySelector("[data-sort]").addEventListener("click", () => {
        const k1 = +el.querySelector(`#s1${u}`).value, d1 = +el.querySelector(`#o1${u}`).value, k2v = el.querySelector(`#s2${u}`).value, d2 = +el.querySelector(`#o2${u}`).value;
        rows = body.slice().sort((a,b) => { let c = XL.cmp(a.r[k1], b.r[k1]) * d1; if (!c && k2v !== ""){ c = XL.cmp(a.r[+k2v], b.r[+k2v]) * d2; } return c; }); render(); });
      el.querySelector("[data-reset]").addEventListener("click", () => { rows = body.slice(); render(); });
    } else el.querySelector("[data-clear]").addEventListener("click", () => { filters = {}; render(); });
    render();
  }

  /* ---------- SUBTOTAL ---------- */
  function subtotal(el, spec, ctx){
    const u = ++uid; const head = spec.data[0], body = spec.data.slice(1);
    const FUN = { Sum:a=>a.reduce((x,y)=>x+y,0), Count:a=>a.length, Average:a=>a.reduce((x,y)=>x+y,0)/a.length, Max:a=>Math.max(...a), Min:a=>Math.min(...a) };
    el.innerHTML = `<div class="xw"><div class="fill-ctl">
      <div class="field"><label for="g${u}">At each change in</label><select id="g${u}">${spec.groups.map(g=>`<option>${esc(g)}</option>`).join("")}</select></div>
      <div class="field"><label for="f${u}">Use function</label><select id="f${u}">${Object.keys(FUN).map(f=>`<option>${f}</option>`).join("")}</select></div>
      <div class="field"><span class="lbl-like">Add subtotal to</span><label class="chk-inline"><input type="checkbox" checked disabled> ${esc(spec.values[0])}</label></div>
      <label class="chk-inline"><input type="checkbox" id="so${u}" checked> Sort data first</label>
      <label class="chk-inline"><input type="checkbox" id="sb${u}" checked> Summary below data</label>
      <button type="button" class="btn btn-primary btn-sm" data-ok>OK</button><button type="button" class="btn btn-ghost btn-sm" data-rm>Remove All</button></div>
      <div class="outline-btns" data-ob hidden><span>Outline level</span><button type="button" data-l="1">1</button><button type="button" data-l="2">2</button><button type="button" data-l="3" class="on">3</button></div>
      <div data-grid></div><p class="hint-line" data-info></p></div>`;
    let lines = null, level = 3;
    const gi = () => head.indexOf(el.querySelector(`#g${u}`).value), vi = head.indexOf(spec.values[0]);
    function build(){
      const g = gi(), fn = el.querySelector(`#f${u}`).value, f = FUN[fn], below = el.querySelector(`#sb${u}`).checked;
      let rows = body.slice(); if (el.querySelector(`#so${u}`).checked) rows.sort((a,b)=>XL.cmp(a[g],b[g]));
      const groups = []; rows.forEach(r => { const last = groups[groups.length-1]; if (last && last.k === r[g]) last.rows.push(r); else groups.push({k:r[g], rows:[r]}); });
      const out = []; const grand = {t:"grand", label:`Grand ${fn==="Sum"?"Total":fn}`, v:f(rows.map(r=>r[vi]))};
      if (!below) out.push(grand);
      groups.forEach(gr => { const st = {t:"sub", label:`${gr.k} ${fn==="Sum"?"Total":fn}`, v:f(gr.rows.map(r=>r[vi]))}; if (!below) out.push(st); gr.rows.forEach(r => out.push({t:"row", r})); if (below) out.push(st); });
      if (below) out.push(grand);
      lines = { out, groups: groups.length, dupes: groups.length !== new Set(groups.map(x=>x.k)).size };
      level = 3; render();
    }
    function render(){
      el.querySelector("[data-ob]").hidden = !lines;
      el.querySelectorAll("[data-l]").forEach(b => b.classList.toggle("on", +b.dataset.l === level));
      const show = !lines ? body.map(r=>({t:"row", r})) : lines.out.filter(x => level === 3 || (level === 2 && x.t !== "row") || (level === 1 && x.t === "grand"));
      const fmt = v => XL.fmtGeneral(Math.round(v*100)/100);
      let h = `<div class="xg-wrap"><table class="xg"><thead><tr><th class="xg-corner"></th>${head.map((_,c)=>`<th>${XL.numToCol(c+1)}</th>`).join("")}</tr></thead><tbody><tr><th>1</th>${head.map(x=>`<td class="xg-h">${esc(x)}</td>`).join("")}</tr>`;
      show.forEach((x,i) => { if (x.t === "row") h += `<tr><th>${i+2}</th>${x.r.map(v=>`<td>${fmtCell(v)}</td>`).join("")}</tr>`;
        else { const g = gi(); h += `<tr class="${x.t}"><th>${i+2}</th>${head.map((_,c)=> c === g ? `<td><b>${esc(x.label)}</b></td>` : c === vi ? `<td><b class="n">${fmt(x.v)}</b></td>` : "<td></td>").join("")}</tr>`; } });
      el.querySelector("[data-grid]").innerHTML = h + `</tbody></table></div>`;
      el.querySelector("[data-info]").textContent = !lines ? "Choose the options and click OK to insert subtotals." : lines.dupes ? `⚠️ The data wasn't sorted, so some groups appear more than once and get separate subtotals (${lines.groups} subtotal rows). Tick "Sort data first".` : `${lines.groups} subtotal rows plus a grand total. Try the outline levels 1, 2 and 3.`;
    }
    el.querySelector("[data-ok]").addEventListener("click", build);
    el.querySelector("[data-rm]").addEventListener("click", () => { lines = null; render(); });
    el.querySelectorAll("[data-l]").forEach(b => b.addEventListener("click", () => { level = +b.dataset.l; render(); }));
    render();
  }

  /* ---------- XLTABLE: Excel Table styling ---------- */
  function xltable(el, spec, ctx){
    const u = ++uid; const head = spec.data[0]; let body = spec.data.slice(1).map(r=>r.slice());
    const extra = [["Rita","Kapoor",27,28800],["Sam","Lee",45,41200],["Zoya","Ali",24,23600]]; let ex = 0;
    el.innerHTML = `<div class="xw"><div class="fill-ctl">
      <label class="chk-inline"><input type="checkbox" id="t${u}" checked> Convert to Table</label>
      <label class="chk-inline"><input type="checkbox" id="h${u}" checked> Header Row</label>
      <label class="chk-inline"><input type="checkbox" id="b${u}" checked> Banded Rows</label>
      <label class="chk-inline"><input type="checkbox" id="r${u}"> Total Row</label>
      <div class="field"><label for="s${u}">Table Style</label><select id="s${u}"><option value="ts-brand">Brand red</option><option value="ts-blue">Blue</option><option value="ts-plain">Plain grey</option></select></div>
      <div class="field"><label for="f${u}">Total Row for Salary</label><select id="f${u}"><option>Sum</option><option>Average</option><option>Count</option><option>Max</option><option>Min</option></select></div>
      <button type="button" class="btn btn-ghost btn-sm" data-add>+ Type a new row below</button></div>
      <div data-grid></div><p class="hint-line" data-info></p></div>`;
    const q = s => el.querySelector(s);
    function render(){
      const isT = q(`#t${u}`).checked, hdr = q(`#h${u}`).checked, band = q(`#b${u}`).checked, tot = q(`#r${u}`).checked && isT, fn = q(`#f${u}`).value, st = q(`#s${u}`).value;
      const sal = body.map(r=>r[3]); const val = {Sum:sal.reduce((a,b)=>a+b,0), Average:sal.reduce((a,b)=>a+b,0)/sal.length, Count:sal.length, Max:Math.max(...sal), Min:Math.min(...sal)}[fn];
      const code = {Sum:109, Average:101, Count:103, Max:104, Min:105}[fn];
      let h = `<div class="xg-wrap"><table class="xg ${isT?"xtbl "+st+(band?" banded":""):""}"><thead><tr><th class="xg-corner"></th>${head.map((_,c)=>`<th>${XL.numToCol(c+1)}</th>`).join("")}</tr></thead><tbody>`;
      let n = 1;
      if (!isT || hdr) h += `<tr><th>${n++}</th>${head.map(x=>`<td class="xg-h">${esc(x)}${isT?'<span class="tf" aria-hidden="true">▾</span>':""}</td>`).join("")}</tr>`;
      body.forEach((r,i) => { h += `<tr class="${i>=spec.data.length-1?"newrow":""}"><th>${n++}</th>${r.map(v=>`<td>${fmtCell(v)}</td>`).join("")}</tr>`; });
      if (tot) h += `<tr class="totrow"><th>${n++}</th><td><b>Total</b></td><td></td><td></td><td title="=SUBTOTAL(${code},[Salary])"><b class="n">${XL.fmtGeneral(Math.round(val*100)/100)}</b></td></tr>`;
      q("[data-grid]").innerHTML = h + `</tbody></table></div>`;
      q("[data-info]").innerHTML = !isT ? "A plain range: no filter buttons, no stripes, no automatic growth." : tot ? `The Total Row uses <code>=SUBTOTAL(${code},[Salary])</code>, a structured reference to the Salary column.` : "A Table: filter buttons on each heading, banded rows, and it grows when you type below it.";
    }
    el.querySelectorAll("input,select").forEach(x => x.addEventListener("change", render));
    q("[data-add]").addEventListener("click", () => { if (ex < extra.length){ body.push(extra[ex++].slice()); render(); ctx.toast && ctx.toast(q(`#t${u}`).checked ? "The table grew to include the new row" : "New row added (a plain range doesn't know it's part of the data)"); } else ctx.toast && ctx.toast("That's enough rows for this demo"); });
    render();
  }

  /* ---------- VALIDATION ---------- */
  function validation(el, spec, ctx){
    const u = ++uid;
    el.innerHTML = `<div class="xw xw-val">
      <div class="val-grid">
        <div class="vrow"><label for="vh${u}">House</label><div class="vcell"><select id="vh${u}"><option value="">Choose…</option><option>Red</option><option>Blue</option><option>Green</option><option>Yellow</option></select></div><span class="vrule">List: Red, Blue, Green, Yellow</span></div>
        <div class="vrow"><label for="vm${u}">Marks</label><div class="vcell"><input id="vm${u}" inputmode="numeric" autocomplete="off"><div class="imsg" hidden><b>Marks</b><br>Type a whole number from 0 to 100.</div></div><span class="vrule">Whole number between 0 and 100</span></div>
        <div class="vrow"><label for="vr${u}">Roll no.</label><div class="vcell"><input id="vr${u}" autocomplete="off"></div><span class="vrule">Text length exactly 4</span></div>
      </div>
      <div class="fill-ctl"><div class="field"><label for="vs${u}">Error Alert style for Marks and Roll no.</label><select id="vs${u}"><option>Stop</option><option>Warning</option><option>Information</option></select></div></div>
      <div data-alert></div>
      <div class="val-log" data-log><b>Entered so far</b><ul></ul></div></div>`;
    const q = s => el.querySelector(s); const log = [];
    const addLog = (f,v) => { log.unshift(`${f}: ${v}`); q("[data-log] ul").innerHTML = log.slice(0,6).map(x=>`<li>${esc(x)}</li>`).join(""); };
    q(`#vh${u}`).addEventListener("change", e => { if (e.target.value) addLog("House", e.target.value); });
    const M = q(`#vm${u}`), Rn = q(`#vr${u}`);
    M.addEventListener("focus", () => q(".imsg").hidden = false); M.addEventListener("blur", () => q(".imsg").hidden = true);
    function check(inp, field, ok, msg){
      const v = inp.value.trim(); if (v === "") return;
      if (ok(v)){ addLog(field, v); inp.value = ""; q("[data-alert]").innerHTML = ""; return; }
      const style = q(`#vs${u}`).value;
      const icon = {Stop:"⛔", Warning:"⚠️", Information:"ℹ️"}[style];
      const btns = style === "Stop" ? `<button type="button" class="btn btn-primary btn-sm" data-a="retry">Retry</button><button type="button" class="btn btn-ghost btn-sm" data-a="cancel">Cancel</button>`
        : style === "Warning" ? `<span>Continue?</span><button type="button" class="btn btn-primary btn-sm" data-a="yes">Yes</button><button type="button" class="btn btn-ghost btn-sm" data-a="retry">No</button><button type="button" class="btn btn-ghost btn-sm" data-a="cancel">Cancel</button>`
        : `<button type="button" class="btn btn-primary btn-sm" data-a="yes">OK</button><button type="button" class="btn btn-ghost btn-sm" data-a="cancel">Cancel</button>`;
      q("[data-alert]").innerHTML = `<div class="xalert ${style.toLowerCase()}" role="alertdialog" aria-label="${style} alert"><div class="xalert-t">${icon} Invalid ${esc(field)}</div><p>${esc(msg)}</p><div class="xalert-b">${btns}</div></div>`;
      q("[data-alert]").querySelectorAll("[data-a]").forEach(b => b.addEventListener("click", () => { const a = b.dataset.a; q("[data-alert]").innerHTML = "";
        if (a === "yes"){ addLog(field, v + " (allowed despite rule)"); inp.value = ""; } else if (a === "retry"){ inp.focus(); inp.select(); } else { inp.value = ""; } }));
    }
    const okM = v => /^-?\d+$/.test(v) && +v >= 0 && +v <= 100, okR = v => v.length === 4;
    M.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); check(M, "Marks", okM, "Marks must be a whole number from 0 to 100."); } });
    M.addEventListener("change", () => check(M, "Marks", okM, "Marks must be a whole number from 0 to 100."));
    Rn.addEventListener("keydown", e => { if (e.key === "Enter"){ e.preventDefault(); check(Rn, "Roll no.", okR, "Roll number must be exactly 4 characters, e.g. 0123."); } });
    Rn.addEventListener("change", () => check(Rn, "Roll no.", okR, "Roll number must be exactly 4 characters, e.g. 0123."));
  }

  /* ---------- PIVOT ---------- */
  function pivot(el, spec, ctx){
    const u = ++uid; const head = spec.data[0]; const rows = spec.data.slice(1);
    const MN = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const FIELDS = ["Sales Rep.","Region","Date"];
    el.innerHTML = `<div class="xw"><div class="fill-ctl">
      <div class="field"><label for="pr${u}">Rows</label><select id="pr${u}">${FIELDS.map(f=>`<option>${f}</option>`).join("")}</select></div>
      <div class="field"><label for="pc${u}">Columns</label><select id="pc${u}"><option value="">(none)</option>${FIELDS.map(f=>`<option>${f}</option>`).join("")}</select></div>
      <div class="field"><label for="pv${u}">Σ Values</label><select id="pv${u}"><option value="Sum">Sum of Amount</option><option value="Count">Count of Amount</option><option value="Average">Average of Amount</option><option value="Max">Max of Amount</option><option value="Min">Min of Amount</option></select></div>
      <div class="field"><label for="pf${u}">Filter: Region</label><select id="pf${u}"><option value="">(All)</option><option>North</option><option>South</option></select></div>
      <label class="chk-inline"><input type="checkbox" id="pg${u}" checked> Group dates into months</label></div>
      <div data-grid></div><div data-drill></div></div>`;
    const q = s => el.querySelector(s);
    const key = (r, f) => { if (!f) return ""; const v = r[head.indexOf(f)]; if (f === "Date" && q(`#pg${u}`).checked) return MN[+v.slice(5,7)-1]; if (f === "Date"){ const [y,m,d] = v.split("-"); return `${d}-${MN[+m-1]}`; } return v; };
    const order = (f, ks) => { if (f === "Date" && q(`#pg${u}`).checked) return ks.sort((a,b)=>MN.indexOf(a)-MN.indexOf(b)); if (f === "Date") return ks.sort((a,b)=>{ const pa=a.split("-"), pb=b.split("-"); return (MN.indexOf(pa[1])-MN.indexOf(pb[1])) || (+pa[0]-+pb[0]); }); return ks.sort(); };
    const AGG = { Sum:a=>a.reduce((x,y)=>x+y,0), Count:a=>a.length, Average:a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0, Max:a=>a.length?Math.max(...a):0, Min:a=>a.length?Math.min(...a):0 };
    const fmt = (v, fn) => fn === "Count" ? String(v) : "$" + Math.round(v).toLocaleString("en-US");
    let cellMap = {};
    function render(){
      const rf = q(`#pr${u}`).value, cfld = q(`#pc${u}`).value === rf ? "" : q(`#pc${u}`).value, fn = q(`#pv${u}`).value, flt = q(`#pf${u}`).value;
      const data = rows.filter(r => !flt || r[4] === flt); const ai = head.indexOf("Amount");
      const rk = order(rf, [...new Set(data.map(r=>key(r,rf)))]), ck = cfld ? order(cfld, [...new Set(data.map(r=>key(r,cfld)))]) : [];
      const pick = (rv, cv) => data.filter(r => (rv === null || key(r,rf) === rv) && (cv === null || !cfld || key(r,cfld) === cv));
      cellMap = {}; let id = 0;
      const cell = (rv, cv) => { const sub = pick(rv, cv); const k = "c"+(id++); cellMap[k] = {sub, label:`${rv ?? "All"}${cfld ? " · " + (cv ?? "All") : ""}`}; return `<td class="pv" data-k="${k}" tabindex="0">${sub.length ? fmt(AGG[fn](sub.map(r=>r[ai])), fn) : ""}</td>`; };
      let h = `<div class="xg-wrap"><table class="xg pivot"><thead>` + (cfld
        ? `<tr><th class="ph">${esc(fn)} of Amount</th><th class="ph" colspan="${ck.length+1}">Column Labels ▾ (${esc(cfld)})</th></tr><tr><th class="ph">Row Labels ▾</th>${ck.map(c=>`<th class="ph">${esc(c)}</th>`).join("")}<th class="ph">Grand Total</th></tr>`
        : `<tr><th class="ph">Row Labels ▾</th><th class="ph">${esc(fn)} of Amount</th></tr>`) + `</thead><tbody>`;
      rk.forEach(r => { h += `<tr><th class="rl">${esc(r)}</th>${cfld ? ck.map(c=>cell(r,c)).join("") : ""}${cell(r,null)}</tr>`; });
      h += `<tr class="gt"><th class="rl">Grand Total</th>${cfld ? ck.map(c=>cell(null,c)).join("") : ""}${cell(null,null)}</tr></tbody></table></div><p class="hint-line">Click (or press Enter on) a number to drill down.</p>`;
      q("[data-grid]").innerHTML = h; q("[data-drill]").innerHTML = "";
      el.querySelectorAll(".pv").forEach(td => { const open = () => drill(td.dataset.k); td.addEventListener("click", open); td.addEventListener("keydown", e => { if (e.key === "Enter") open(); }); });
    }
    function drill(k){ const c = cellMap[k]; if (!c) return;
      q("[data-drill]").innerHTML = `<div class="drill"><div class="drill-h"><b>Details: ${esc(c.label)}</b><span class="pill pill-muted">${c.sub.length} sales</span><button type="button" class="icon-btn" data-x>Close</button></div><div class="xg-wrap"><table class="xg"><thead><tr>${head.map(x=>`<th>${esc(x)}</th>`).join("")}</tr></thead><tbody>${c.sub.map(r=>`<tr>${r.map(v=>`<td>${fmtCell(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div></div>`;
      q("[data-x]").addEventListener("click", () => q("[data-drill]").innerHTML = ""); }
    el.querySelectorAll("select,input").forEach(x => x.addEventListener("change", render));
    render();
  }

  /* ---------- AUDIT ---------- */
  function audit(el, spec, ctx){
    const sh = new XL.Sheet(spec.data); let sel = "D6", showF = false, marks = {};
    el.innerHTML = `<div class="xw"><div class="fxbar"><span class="nbox" data-nb>D6</span><span class="fxl">fx</span><code class="fxshow" data-fx></code></div>
      <div class="presets"><button type="button" class="chip" data-a="sf">Show Formulas (Ctrl + &#96;)</button><button type="button" class="chip" data-a="tp">Trace Precedents</button><button type="button" class="chip" data-a="td">Trace Dependents</button><button type="button" class="chip" data-a="te">Trace Error</button><button type="button" class="chip" data-a="ev">Evaluate Formula</button><button type="button" class="chip" data-a="ra">Remove Arrows</button></div>
      <div data-grid></div><div class="xres" data-info></div></div>`;
    const q = s => el.querySelector(s);
    const all = []; for (let r = 1; r <= sh.maxRow(); r++) for (let c = 1; c <= sh.maxCol(); c++) all.push([r,c]);
    const precOf = a => { const p = XL.parseAddr(a); const raw = sh.raw(p.r,p.c); if (!(typeof raw === "string" && raw[0] === "=")) return []; const out = []; XL.refsIn(raw).forEach(rg => { for (let r = rg.r1; r <= rg.r2; r++) for (let c = rg.c1; c <= rg.c2; c++) out.push(XL.addr(r,c)); }); return out; };
    const depOf = a => all.map(([r,c])=>XL.addr(r,c)).filter(x => precOf(x).includes(a));
    function render(){
      q("[data-grid]").innerHTML = gridHTML(spec.data, { cell:(r,c)=>{ const raw = sh.raw(r,c); if (typeof raw === "string" && raw[0] === "=") return showF ? `<code class="f">${esc(raw)}</code>` : fmtCell(sh.val(r,c)); return fmtCell(raw); },
        cls:(r,c)=>{ const a = XL.addr(r,c); return (a === sel ? "sel " : "") + (marks[a] || ""); } });
      el.querySelectorAll(".xg td").forEach(td => td.addEventListener("click", () => { sel = td.dataset.a; marks = {}; q("[data-info]").innerHTML = ""; render(); }));
      const p = XL.parseAddr(sel); const raw = sh.raw(p.r,p.c); q("[data-nb]").textContent = sel; q("[data-fx]").textContent = raw === null ? "" : String(raw);
    }
    function act(a){
      const p = XL.parseAddr(sel); const raw = sh.raw(p.r,p.c); const isF = typeof raw === "string" && raw[0] === "="; let msg = "";
      if (a === "sf"){ showF = !showF; msg = showF ? "Showing formulas instead of results. Click again to switch back." : ""; }
      if (a === "ra"){ marks = {}; }
      if (a === "tp"){ marks = {}; if (!isF) msg = `${sel} contains a value, not a formula, so it has no precedents.`; else { const pr = precOf(sel); pr.forEach(x => marks[x] = "prec"); msg = `<b>${sel}</b> uses ${pr.length} cell${pr.length===1?"":"s"}: ${pr.join(", ")}. These are its <b>direct precedents</b> (blue).`; } }
      if (a === "td"){ marks = {}; const d = depOf(sel); d.forEach(x => marks[x] = "dep"); msg = d.length ? `${d.length} formula${d.length===1?"":"s"} use <b>${sel}</b>: ${d.join(", ")}. These are its <b>dependents</b> (green). Delete ${sel} and they'd break!` : `No formulas use <b>${sel}</b>, so it has no dependents.`; }
      if (a === "te"){ marks = {}; const v = sh.val(p.r,p.c); if (!XL.isErr(v)) msg = `${sel} doesn't show an error. Try the cell showing #DIV/0!.`; else { const pr = precOf(sel); pr.forEach(x => marks[x] = "errsrc"); const vals = pr.map(x => { const q2 = XL.parseAddr(x); return `${x} = ${XL.display(sh.val(q2.r,q2.c)) || "(empty)"}`; }); msg = `<b>${sel}</b> shows <b>${v.code}</b>. It uses ${vals.join(", ")}. A divisor of 0 or an empty cell causes #DIV/0!. Fix the Qty, or wrap the formula: <code>=IFERROR(${esc(raw.slice(1))},0)</code>.`; } }
      if (a === "ev"){ if (!isF) msg = `${sel} isn't a formula.`; else { const sub = raw.replace(/(\$?[A-Z]{1,3}\$?\d+)(?::(\$?[A-Z]{1,3}\$?\d+))?/g, (m) => { if (m.includes(":")) { const rg = XL.parseRange(m); const vs = []; for (let r = rg.r1; r <= rg.r2; r++) for (let c = rg.c1; c <= rg.c2; c++) vs.push(XL.display(sh.val(r,c)) || "0"); return "{" + vs.join(",") + "}"; } const q2 = XL.parseAddr(m); return XL.display(sh.val(q2.r,q2.c)) || "0"; });
        msg = `<span class="evl"><code>${esc(raw)}</code><span>→</span><code>${esc(sub)}</code><span>→</span><b>${esc(XL.display(sh.val(p.r,p.c)))}</b></span>`; } }
      render(); q("[data-info]").innerHTML = msg;
    }
    el.querySelectorAll("[data-a]").forEach(b => b.addEventListener("click", () => act(b.dataset.a)));
    render(); act("tp");
  }

  const REG = { play, copy, refs, steps, fill, numfmt, ribbon, cf, table, subtotal, xltable, validation, pivot, audit };
  return { mount(el, spec, ctx){ const f = REG[spec.type]; if (f) { try { f(el, spec, ctx); } catch(e){ el.innerHTML = `<p class="hint-line">This practice tool couldn't load.</p>`; console.error(e); } } } };
})();
