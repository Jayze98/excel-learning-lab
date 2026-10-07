/* =====================================================================
   Mini formula engine: enough Excel to practise the course formulas.
   ===================================================================== */
const XL = (function(){
  "use strict";
  class XErr { constructor(c){ this.code = c; } toString(){ return this.code; } }
  const E = c => new XErr(c);
  const isErr = v => v instanceof XErr;

  function colToNum(s){ let n = 0; for (const ch of s.toUpperCase()) n = n*26 + (ch.charCodeAt(0)-64); return n; }
  function numToCol(n){ let s = ""; while (n > 0){ const m = (n-1)%26; s = String.fromCharCode(65+m)+s; n = Math.floor((n-1)/26); } return s; }
  function parseAddr(a){ const m = /^\$?([A-Za-z]{1,3})\$?(\d+)$/.exec(a); return m ? { r:+m[2], c:colToNum(m[1]) } : null; }
  const addr = (r,c) => numToCol(c) + r;
  function parseRange(s){ const p = s.split(":"); const a = parseAddr(p[0]); const b = p[1] ? parseAddr(p[1]) : a; if (!a || !b) return null;
    return { r1:Math.min(a.r,b.r), c1:Math.min(a.c,b.c), r2:Math.max(a.r,b.r), c2:Math.max(a.c,b.c) }; }

  /* ---------- tokenizer & parser ---------- */
  function tokenize(src){
    const t = []; let i = 0;
    while (i < src.length){
      const ch = src[i];
      if (/\s/.test(ch)){ i++; continue; }
      if (ch === '"'){ let j = i+1, s = ""; for (;;){ if (j >= src.length) throw E("#ERROR"); if (src[j] === '"'){ if (src[j+1] === '"'){ s += '"'; j += 2; continue; } break; } s += src[j++]; } t.push({t:"str", v:s}); i = j+1; continue; }
      const rest = src.slice(i); let m;
      if ((m = /^(\d+\.?\d*|\.\d+)(e[+-]?\d+)?/i.exec(rest)) && !/^[A-Za-z]/.test(rest.slice(m[0].length)) ){ t.push({t:"num", v:parseFloat(m[0])}); i += m[0].length; continue; }
      if ((m = /^\$?[A-Za-z]{1,3}\$?\d+(?![A-Za-z0-9_(.])/.exec(rest))){ t.push({t:"ref", v:m[0]}); i += m[0].length; continue; }
      if ((m = /^[A-Za-z_][A-Za-z0-9_.]*/.exec(rest))){ const w = m[0]; i += w.length;
        if (src[i] === "(") t.push({t:"fn", v:w.toUpperCase()});
        else if (/^(TRUE|FALSE)$/i.test(w)) t.push({t:"bool", v:w.toUpperCase() === "TRUE"});
        else t.push({t:"name", v:w});
        continue; }
      if ((m = /^(<=|>=|<>)/.exec(rest))){ t.push({t:"op", v:m[0]}); i += 2; continue; }
      if ("+-*/^&=<>(),:%".includes(ch)){ t.push({t:"op", v:ch}); i++; continue; }
      throw E("#ERROR");
    }
    return t;
  }
  function parse(src){
    const toks = tokenize(src); let p = 0;
    const peek = () => toks[p], next = () => toks[p++];
    const isOp = v => peek() && peek().t === "op" && peek().v === v;
    const expr = () => comparison();
    function comparison(){ let l = concat(); while (peek() && peek().t === "op" && ["=","<>","<",">","<=",">="].includes(peek().v)){ const o = next().v; l = {k:"bin", o, l, r:concat()}; } return l; }
    function concat(){ let l = additive(); while (isOp("&")){ next(); l = {k:"bin", o:"&", l, r:additive()}; } return l; }
    function additive(){ let l = mult(); while (isOp("+") || isOp("-")){ const o = next().v; l = {k:"bin", o, l, r:mult()}; } return l; }
    function mult(){ let l = power(); while (isOp("*") || isOp("/")){ const o = next().v; l = {k:"bin", o, l, r:power()}; } return l; }
    function power(){ let l = unary(); while (isOp("^")){ next(); l = {k:"bin", o:"^", l, r:unary()}; } return l; }
    function unary(){ if (isOp("-")){ next(); return {k:"neg", e:unary()}; } if (isOp("+")){ next(); return unary(); } return postfix(); }
    function postfix(){ let e = primary(); while (isOp("%")){ next(); e = {k:"pct", e}; } return e; }
    function primary(){
      const tk = next(); if (!tk) throw E("#ERROR");
      if (tk.t === "num") return {k:"num", v:tk.v};
      if (tk.t === "str") return {k:"str", v:tk.v};
      if (tk.t === "bool") return {k:"bool", v:tk.v};
      if (tk.t === "ref"){ if (isOp(":")){ next(); const t2 = next(); if (!t2 || t2.t !== "ref") throw E("#ERROR"); return {k:"range", a:tk.v, b:t2.v}; } return {k:"ref", a:tk.v}; }
      if (tk.t === "name") return {k:"name", v:tk.v};
      if (tk.t === "fn"){ next(); const args = [];
        if (!isOp(")")){ for (;;){ if (isOp(",") || isOp(")")) args.push({k:"empty"}); else args.push(expr()); if (isOp(",")){ next(); continue; } break; } }
        if (!isOp(")")) throw E("#ERROR"); next(); return {k:"fn", n:tk.v, args}; }
      if (tk.t === "op" && tk.v === "("){ const e = expr(); if (!isOp(")")) throw E("#ERROR"); next(); return e; }
      throw E("#ERROR");
    }
    const ast = expr(); if (p < toks.length) throw E("#ERROR"); return ast;
  }

  /* ---------- sheet ---------- */
  function Sheet(data, names){ this.data = data || []; this.names = {}; Object.keys(names||{}).forEach(k => this.names[k.toUpperCase()] = names[k]); this.cache = new Map(); this.stack = new Set(); this.circular = false; }
  Sheet.prototype.raw = function(r,c){ const row = this.data[r-1]; if (!row) return null; const v = row[c-1]; return v === undefined ? null : v; };
  Sheet.prototype.val = function(r,c){
    const v = this.raw(r,c);
    if (typeof v === "string" && v[0] === "="){
      const k = r + "," + c;
      if (this.cache.has(k)) return this.cache.get(k);
      if (this.stack.has(k)){ this.circular = true; return 0; }
      this.stack.add(k); const res = run(v, this); this.stack.delete(k);
      this.cache.set(k, res); return res;
    }
    return v;
  };
  Sheet.prototype.maxRow = function(){ return this.data.length; };
  Sheet.prototype.maxCol = function(){ return this.data.reduce((m,r)=>Math.max(m,(r||[]).length),0); };

  /* ---------- coercion ---------- */
  const mkRange = (sh, o) => ({ range:true, sh, r1:o.r1, c1:o.c1, r2:o.r2, c2:o.c2 });
  function scalar(v){ if (v && v.range){ if (v.r1 === v.r2 && v.c1 === v.c2) return v.sh.val(v.r1, v.c1); throw E("#VALUE!"); } return v; }
  function toNum(v){ v = scalar(v); if (isErr(v)) throw v; if (v === null || v === "") return 0; if (typeof v === "boolean") return v ? 1 : 0; if (typeof v === "number") return v;
    const s = String(v).trim(); if (s !== "" && !isNaN(+s)) return +s; if (/^-?\d+(\.\d+)?%$/.test(s)) return parseFloat(s)/100; throw E("#VALUE!"); }
  function toStr(v){ v = scalar(v); if (isErr(v)) throw v; if (v === null) return ""; if (typeof v === "boolean") return v ? "TRUE" : "FALSE"; if (typeof v === "number") return fmtGeneral(v); return String(v); }
  function toBool(v){ v = scalar(v); if (isErr(v)) throw v; if (v === null) return false; if (typeof v === "boolean") return v; if (typeof v === "number") return v !== 0;
    const s = String(v).toUpperCase(); if (s === "TRUE") return true; if (s === "FALSE") return false; throw E("#VALUE!"); }
  function fmtGeneral(n){ if (!isFinite(n)) return "#NUM!"; if (Number.isInteger(n) && Math.abs(n) < 1e15) return String(n); const s = parseFloat(n.toPrecision(10)); return String(s); }
  function* cells(rg){ for (let r = rg.r1; r <= rg.r2; r++) for (let c = rg.c1; c <= rg.c2; c++) yield rg.sh.val(r,c); }
  function rank(v){ return typeof v === "number" ? 0 : typeof v === "string" ? 1 : typeof v === "boolean" ? 2 : 0; }
  function cmp(a,b){
    a = scalar(a); b = scalar(b); if (isErr(a)) throw a; if (isErr(b)) throw b;
    if (a === null) a = typeof b === "string" ? "" : typeof b === "boolean" ? false : 0;
    if (b === null) b = typeof a === "string" ? "" : typeof a === "boolean" ? false : 0;
    const ra = rank(a), rb = rank(b); if (ra !== rb) return ra - rb;
    if (typeof a === "string"){ const x = a.toLowerCase(), y = b.toLowerCase(); return x < y ? -1 : x > y ? 1 : 0; }
    if (typeof a === "boolean") return (a?1:0) - (b?1:0);
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function nums(args, opts){ const out = [];
    for (const a of args){
      if (a && a.range){ for (const v of cells(a)){ if (isErr(v)) throw v; if (typeof v === "number") out.push(v); } }
      else { if (isErr(a)) throw a; if (a === null) continue; if (opts && opts.skipText && typeof a === "string" && isNaN(+a)) continue; out.push(toNum(a)); }
    }
    return out; }
  function matcher(crit){
    crit = scalar(crit); if (isErr(crit)) throw crit;
    if (typeof crit === "number") return v => (typeof v === "number" && v === crit) || (typeof v === "string" && v.trim() !== "" && !isNaN(+v) && +v === crit);
    if (typeof crit === "boolean") return v => v === crit;
    let s = crit === null ? "" : String(crit), op = "=";
    const m = /^(<=|>=|<>|=|<|>)/.exec(s); if (m){ op = m[1]; s = s.slice(op.length); }
    if (s.trim() !== "" && !isNaN(+s)){
      const n = +s; const f = {"=":a=>a===n, "<>":a=>a!==n, "<":a=>a<n, ">":a=>a>n, "<=":a=>a<=n, ">=":a=>a>=n}[op];
      return v => typeof v === "number" ? f(v) : (op === "<>");
    }
    if (s === ""){ if (op === "=") return v => v === null || v === ""; if (op === "<>") return v => !(v === null || v === ""); return () => false; }
    const reSrc = s.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/~\*/g,"\u0001").replace(/~\?/g,"\u0002").replace(/\*/g, ".*").replace(/\?/g, ".").replace(/\u0001/g,"\\*").replace(/\u0002/g,"\\?");
    const re = new RegExp("^" + reSrc + "$", "i");
    if (op === "=") return v => typeof v === "string" && re.test(v);
    if (op === "<>") return v => !(typeof v === "string" && re.test(v));
    const t = s.toLowerCase(); const f = {"<":x=>x<t, ">":x=>x>t, "<=":x=>x<=t, ">=":x=>x>=t}[op];
    return v => typeof v === "string" && f(v.toLowerCase());
  }
  function needRange(v){ if (!(v && v.range)) throw E("#VALUE!"); return v; }

  /* ---------- functions ---------- */
  const FN = {
    SUM: a => nums(a.map(f=>f())).reduce((x,y)=>x+y,0),
    PRODUCT: a => nums(a.map(f=>f())).reduce((x,y)=>x*y,1),
    AVERAGE: a => { const n = nums(a.map(f=>f())); if (!n.length) throw E("#DIV/0!"); return n.reduce((x,y)=>x+y,0)/n.length; },
    MIN: a => { const n = nums(a.map(f=>f())); return n.length ? Math.min(...n) : 0; },
    MAX: a => { const n = nums(a.map(f=>f())); return n.length ? Math.max(...n) : 0; },
    MEDIAN: a => { const n = nums(a.map(f=>f())).sort((x,y)=>x-y); if (!n.length) throw E("#NUM!"); const h = Math.floor(n.length/2); return n.length%2 ? n[h] : (n[h-1]+n[h])/2; },
    COUNT: a => { let c = 0; for (const f of a){ const v = f(); if (v && v.range){ for (const x of cells(v)) if (typeof x === "number") c++; } else if (typeof v === "number" || typeof v === "boolean" || (typeof v === "string" && v.trim() !== "" && !isNaN(+v))) c++; } return c; },
    COUNTA: a => { let c = 0; for (const f of a){ let v; try { v = f(); } catch(e){ c++; continue; } if (v && v.range){ for (const x of cells(v)) if (x !== null && x !== "") c++; } else if (v !== null) c++; } return c; },
    COUNTBLANK: a => { const r = needRange(a[0]()); let c = 0; for (const x of cells(r)) if (x === null || x === "") c++; return c; },
    COUNTIF: a => { const r = needRange(a[0]()); const m = matcher(a[1]()); let c = 0; for (const x of cells(r)) if (!isErr(x) && m(x)) c++; return c; },
    COUNTIFS: a => { const pairs = []; for (let i = 0; i < a.length; i += 2) pairs.push([needRange(a[i]()), matcher(a[i+1]())]);
      const R = pairs[0][0]; let c = 0; for (let r = 0; r <= R.r2-R.r1; r++) for (let k = 0; k <= R.c2-R.c1; k++){ if (pairs.every(([rg,m]) => { const x = rg.sh.val(rg.r1+r, rg.c1+k); return !isErr(x) && m(x); })) c++; } return c; },
    SUMIF: a => { const r = needRange(a[0]()); const m = matcher(a[1]()); const s = a[2] ? needRange(a[2]()) : r; let t = 0;
      for (let i = 0; i <= r.r2-r.r1; i++) for (let j = 0; j <= r.c2-r.c1; j++){ const x = r.sh.val(r.r1+i, r.c1+j); if (!isErr(x) && m(x)){ const y = s.sh.val(s.r1+i, s.c1+j); if (typeof y === "number") t += y; } } return t; },
    AVERAGEIF: a => { const r = needRange(a[0]()); const m = matcher(a[1]()); const s = a[2] ? needRange(a[2]()) : r; let t = 0, n = 0;
      for (let i = 0; i <= r.r2-r.r1; i++) for (let j = 0; j <= r.c2-r.c1; j++){ const x = r.sh.val(r.r1+i, r.c1+j); if (!isErr(x) && m(x)){ const y = s.sh.val(s.r1+i, s.c1+j); if (typeof y === "number"){ t += y; n++; } } } if (!n) throw E("#DIV/0!"); return t/n; },
    IF: a => { const t = toBool(a[0]()); if (t) return a[1] ? scalar(a[1]()) : true; return a[2] ? scalar(a[2]()) : false; },
    IFS: a => { for (let i = 0; i < a.length; i += 2){ if (toBool(a[i]())) return scalar(a[i+1]()); } throw E("#N/A"); },
    IFERROR: a => { try { const v = scalar(a[0]()); if (isErr(v)) throw v; return v; } catch(e){ if (isErr(e)) return scalar(a[1]()); throw e; } },
    AND: a => { let any = false, res = true; for (const f of a){ const v = f(); if (v && v.range){ for (const x of cells(v)){ if (isErr(x)) throw x; if (typeof x === "boolean" || typeof x === "number"){ any = true; if (!x) res = false; } } } else { any = true; if (!toBool(v)) res = false; } } if (!any) throw E("#VALUE!"); return res; },
    OR: a => { let any = false, res = false; for (const f of a){ const v = f(); if (v && v.range){ for (const x of cells(v)){ if (isErr(x)) throw x; if (typeof x === "boolean" || typeof x === "number"){ any = true; if (x) res = true; } } } else { any = true; if (toBool(v)) res = true; } } if (!any) throw E("#VALUE!"); return res; },
    NOT: a => !toBool(a[0]()),
    ROUND: a => { const x = toNum(a[0]()), d = a[1] ? toNum(a[1]()) : 0; const p = Math.pow(10, d); return Math.sign(x)*Math.round(Math.abs(x)*p + 1e-9)/p; },
    ROUNDUP: a => { const x = toNum(a[0]()), d = a[1] ? toNum(a[1]()) : 0; const p = Math.pow(10, d); return Math.sign(x)*Math.ceil(Math.abs(x)*p - 1e-9)/p; },
    ROUNDDOWN: a => { const x = toNum(a[0]()), d = a[1] ? toNum(a[1]()) : 0; const p = Math.pow(10, d); return Math.sign(x)*Math.floor(Math.abs(x)*p + 1e-9)/p; },
    INT: a => Math.floor(toNum(a[0]())),
    ABS: a => Math.abs(toNum(a[0]())),
    SQRT: a => { const x = toNum(a[0]()); if (x < 0) throw E("#NUM!"); return Math.sqrt(x); },
    POWER: a => Math.pow(toNum(a[0]()), toNum(a[1]())),
    MOD: a => { const x = toNum(a[0]()), y = toNum(a[1]()); if (y === 0) throw E("#DIV/0!"); return x - y*Math.floor(x/y); },
    ROWS: a => { const v = a[0](); if (v && v.range) return v.r2 - v.r1 + 1; return 1; },
    COLUMNS: a => { const v = a[0](); if (v && v.range) return v.c2 - v.c1 + 1; return 1; },
    VLOOKUP: a => lookup(a, true),
    HLOOKUP: a => lookup(a, false),
    UPPER: a => toStr(a[0]()).toUpperCase(),
    LOWER: a => toStr(a[0]()).toLowerCase(),
    PROPER: a => toStr(a[0]()).toLowerCase().replace(/(^|[^a-z])([a-z])/g, (m,p,c)=>p+c.toUpperCase()),
    LEN: a => toStr(a[0]()).length,
    TRIM: a => toStr(a[0]()).trim().replace(/\s+/g," "),
    LEFT: a => toStr(a[0]()).slice(0, a[1] ? toNum(a[1]()) : 1),
    RIGHT: a => { const s = toStr(a[0]()), n = a[1] ? toNum(a[1]()) : 1; return n ? s.slice(-n) : ""; },
    MID: a => toStr(a[0]()).substr(toNum(a[1]())-1, toNum(a[2]())),
    CONCATENATE: a => a.map(f=>toStr(f())).join(""),
    CONCAT: a => a.map(f=>{ const v = f(); if (v && v.range){ let s=""; for (const x of cells(v)) s += toStr(x); return s; } return toStr(v); }).join(""),
    TODAY: () => Math.floor((Date.now() - Date.UTC(1899,11,30))/86400000),
    NOW: () => (Date.now() - Date.UTC(1899,11,30))/86400000,
    RANDBETWEEN: a => { const lo = Math.ceil(toNum(a[0]())), hi = Math.floor(toNum(a[1]())); return lo + Math.floor(Math.random()*(hi-lo+1)); }
  };
  FN.AVERAGEA = FN.AVERAGE;
  function lookup(a, vertical){
    const val = scalar(a[0]()); if (isErr(val)) throw val;
    const t = needRange(a[1]()); const idx = Math.trunc(toNum(a[2]())); const approx = a[3] ? (function(){ const v = a[3](); return v === null ? false : toBool(v); })() : true;
    const n = vertical ? t.r2 - t.r1 + 1 : t.c2 - t.c1 + 1; const width = vertical ? t.c2 - t.c1 + 1 : t.r2 - t.r1 + 1;
    if (idx < 1) throw E("#VALUE!"); if (idx > width) throw E("#REF!");
    const key = i => vertical ? t.sh.val(t.r1+i, t.c1) : t.sh.val(t.r1, t.c1+i);
    const out = i => vertical ? t.sh.val(t.r1+i, t.c1+idx-1) : t.sh.val(t.r1+idx-1, t.c1+i);
    if (!approx){ const m = matcher(typeof val === "string" ? val.replace(/^([<>=])/, "=$1") : val);
      for (let i = 0; i < n; i++){ const k = key(i); if (typeof val === "string" ? (typeof k === "string" && m(k)) : (k !== null && cmp(k,val) === 0)) return out(i) === null ? 0 : out(i); } throw E("#N/A"); }
    let best = -1; for (let i = 0; i < n; i++){ const k = key(i); if (k === null || rank(k) !== rank(val)) continue; if (cmp(k, val) <= 0) best = i; else break; }
    if (best < 0) throw E("#N/A"); const r = out(best); return r === null ? 0 : r;
  }

  /* ---------- evaluator ---------- */
  function ev(n, sh, asRange){
    switch (n.k){
      case "num": case "str": case "bool": return n.v;
      case "empty": return null;
      case "ref": { const a = parseAddr(n.a); if (asRange) return mkRange(sh, {r1:a.r, c1:a.c, r2:a.r, c2:a.c}); return sh.val(a.r, a.c); }
      case "range": { const r = parseRange(n.a + ":" + n.b); return mkRange(sh, r); }
      case "name": { const d = sh.names[n.v.toUpperCase()]; if (!d) throw E("#NAME?"); if (typeof d === "number") return d; const r = parseRange(d); if (!r) throw E("#NAME?"); const rg = mkRange(sh, r); return asRange ? rg : (r.r1 === r.r2 && r.c1 === r.c2 ? sh.val(r.r1, r.c1) : rg); }
      case "neg": return -toNum(ev(n.e, sh));
      case "pct": return toNum(ev(n.e, sh))/100;
      case "bin": {
        if (n.o === "&") return toStr(ev(n.l, sh)) + toStr(ev(n.r, sh));
        if (["=","<>","<",">","<=",">="].includes(n.o)){ const c = cmp(ev(n.l, sh), ev(n.r, sh)); return {"=":c===0, "<>":c!==0, "<":c<0, ">":c>0, "<=":c<=0, ">=":c>=0}[n.o]; }
        const x = toNum(ev(n.l, sh)), y = toNum(ev(n.r, sh));
        if (n.o === "+") return x + y; if (n.o === "-") return x - y; if (n.o === "*") return x * y;
        if (n.o === "/"){ if (y === 0) throw E("#DIV/0!"); return x / y; }
        if (n.o === "^"){ const r = Math.pow(x, y); if (!isFinite(r) || isNaN(r)) throw E("#NUM!"); return r; }
        throw E("#ERROR");
      }
      case "fn": { const f = FN[n.n]; if (!f) throw E("#NAME?"); return f(n.args.map(a => () => ev(a, sh, true))); }
    }
    throw E("#ERROR");
  }
  function run(formula, sh){
    try {
      let src = String(formula).trim(); if (src[0] === "=") src = src.slice(1);
      let v = ev(parse(src), sh);
      v = scalar(v);
      if (v === null) v = 0;
      if (typeof v === "number" && !isFinite(v)) return E("#NUM!");
      return v;
    } catch (e){ if (isErr(e)) return e; return E("#ERROR"); }
  }
  function display(v){ if (isErr(v)) return v.code === "#ERROR" ? "Formula problem" : v.code; if (v === null) return ""; if (typeof v === "boolean") return v ? "TRUE" : "FALSE"; if (typeof v === "number") return fmtGeneral(v); return String(v); }

  /* ---------- reference helpers ---------- */
  function splitOutsideQuotes(f, fn){ return f.split(/("(?:[^"]|"")*")/).map((part,i) => i % 2 ? part : fn(part)).join(""); }
  const REF_RE = /(^|[^A-Za-z0-9_$.])(\$?)([A-Za-z]{1,3})(\$?)(\d+)(?![A-Za-z0-9_(.])/g;
  function shift(formula, dr, dc){
    return splitOutsideQuotes(formula, part => part.replace(REF_RE, (m, pre, d1, col, d2, row) => {
      let c = colToNum(col), r = +row;
      if (!d1) c += dc; if (!d2) r += dr;
      if (c < 1 || r < 1) return pre + "#REF!";
      return pre + d1 + numToCol(c) + d2 + r;
    }));
  }
  function refsIn(formula, names){
    const out = []; let src = String(formula);
    splitOutsideQuotes(src, part => { const re = /(^|[^A-Za-z0-9_$.])(\$?[A-Za-z]{1,3}\$?\d+)(?::(\$?[A-Za-z]{1,3}\$?\d+))?(?![A-Za-z0-9_(.])/g; let m;
      while ((m = re.exec(part))){ const r = parseRange(m[2] + (m[3] ? ":" + m[3] : "")); if (r) out.push(r); }
      if (names){ const nre = /[A-Za-z_][A-Za-z0-9_.]*/g; let k; while ((k = nre.exec(part))){ const d = names[k[0].toUpperCase()]; if (d && part[k.index + k[0].length] !== "(") { const r = parseRange(d); if (r) out.push(r); } } }
      return part; });
    return out;
  }
  return { Sheet, run, display, isErr, E, parseAddr, parseRange, addr, colToNum, numToCol, shift, refsIn, fmtGeneral, cmp };
})();
