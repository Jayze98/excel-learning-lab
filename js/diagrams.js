/* ---------------- DIAGRAMS (Excel) ---------------- */
const arrow = (x1,y1,x2,y2) => `<line class="dg-line" x1="${x1}" y1="${y1}" x2="${x2-8}" y2="${y2}"/><path class="dg-arrow" d="M${x2} ${y2} l-10 -6 v12 z"/>`;
const dArrowDown = (x,y1,y2) => `<line class="dg-line" x1="${x}" y1="${y1}" x2="${x}" y2="${y2-8}"/><path class="dg-arrow" d="M${x} ${y2} l-6 -10 h12 z"/>`;
const DIAGRAMS = {
  grid: (function(){
    const x0 = 40, y0 = 30, cw = 78, rh = 34, cols = "ABCDE", rows = 5; let s = `<svg viewBox="0 0 640 240" role="img" aria-label="A small worksheet grid with cell C2 highlighted: column C and row 2 meet at cell C2">`;
    s += `<rect class="dg-soft" x="${x0+cw*2}" y="${y0}" width="${cw}" height="${rh*(rows+1)}" opacity=".55"/><rect class="dg-soft" x="${x0}" y="${y0+rh*2}" width="${cw*5}" height="${rh}" opacity=".55"/>`;
    for (let c = 0; c < 5; c++) s += `<rect class="dg-box" x="${x0+cw*c}" y="${y0}" width="${cw}" height="${rh}"/><text class="dg-tb" x="${x0+cw*c+cw/2}" y="${y0+22}" text-anchor="middle">${cols[c]}</text>`;
    for (let r = 1; r <= rows; r++){ s += `<rect class="dg-box" x="${x0-32}" y="${y0+rh*r}" width="32" height="${rh}"/><text class="dg-tb" x="${x0-16}" y="${y0+rh*r+22}" text-anchor="middle">${r}</text>`;
      for (let c = 0; c < 5; c++) s += `<rect x="${x0+cw*c}" y="${y0+rh*r}" width="${cw}" height="${rh}" fill="none" stroke="var(--line)"/>`; }
    s += `<rect class="dg-brand" x="${x0+cw*2+2}" y="${y0+rh*2+2}" width="${cw-4}" height="${rh-4}" rx="3"/><text class="dg-tw" x="${x0+cw*2.5}" y="${y0+rh*2+22}" text-anchor="middle">C2</text>`;
    s += `<text class="dg-tb" x="470" y="70">Column C</text><text class="dg-tm" x="470" y="88">letters name columns</text>`;
    s += `<text class="dg-tb" x="470" y="130">Row 2</text><text class="dg-tm" x="470" y="148">numbers name rows</text>`;
    s += `<text class="dg-tb" x="470" y="190">Cell C2</text><text class="dg-tm" x="470" y="208">where they meet</text>`;
    s += arrow(x0+cw*3+4, y0+rh*2+17, 460, 185);
    return s + `</svg>`;
  })(),
  protect: `<svg viewBox="0 0 760 170" role="img" aria-label="Step one: cells are locked by default, unlock the input cells. Step two: protect the sheet. Result: locked cells are safe and unlocked cells can still be typed in">
    <rect class="dg-box" x="8" y="30" width="220" height="110" rx="12"/><text class="dg-tb" x="118" y="60" text-anchor="middle">Step 1: Lock status</text><text class="dg-tm" x="118" y="84" text-anchor="middle">All cells start Locked.</text><text class="dg-tm" x="118" y="102" text-anchor="middle">Untick Locked for input cells</text><text class="dg-tm" x="118" y="120" text-anchor="middle">(Ctrl + 1 → Protection)</text>
    ${arrow(230,85,272,85)}
    <rect class="dg-brand" x="274" y="30" width="210" height="110" rx="12"/><text class="dg-tw" x="379" y="72" text-anchor="middle">Step 2</text><text class="dg-tw" x="379" y="96" text-anchor="middle">Review → Protect Sheet</text><text class="dg-tw" x="379" y="118" text-anchor="middle" style="font-weight:400;font-size:12.5px">optional password</text>
    ${arrow(486,85,528,85)}
    <rect class="dg-soft" x="530" y="30" width="222" height="110" rx="12"/><text class="dg-tb" x="641" y="62" text-anchor="middle">Result</text><text class="dg-t" x="641" y="88" text-anchor="middle" style="font-size:13px">🔒 Locked cells: can't change</text><text class="dg-t" x="641" y="112" text-anchor="middle" style="font-size:13px">✏️ Unlocked cells: can type</text>
  </svg>`,
  pemdas: `<svg viewBox="0 0 720 200" role="img" aria-label="Order of operations as four steps: brackets, exponents, multiply and divide left to right, add and subtract left to right">
    ${[["1","( )","Brackets","innermost first"],["2","^","Exponents","powers"],["3","× ÷","Multiply & divide","same step, left → right"],["4","+ −","Add & subtract","same step, left → right"]].map((d,i)=>{ const x = 8 + i*178, y = 20 + i*28; const cls = i === 0 ? "dg-brand" : "dg-soft"; const tc = i === 0 ? "dg-tw" : "dg-tb";
      return `<rect class="${cls}" x="${x}" y="${y}" width="166" height="${170 - i*28}" rx="12"/><text class="${tc}" x="${x+14}" y="${y+30}" style="font-size:22px">${d[1]}</text><text class="${tc}" x="${x+14}" y="${y+58}">${d[0]}. ${d[2]}</text><text class="${i===0?"dg-tw":"dg-tm"}" x="${x+14}" y="${y+78}" style="${i===0?"font-weight:400;font-size:12.5px":""}">${d[3]}</text>`; }).join("")}
  </svg>`,
  iftree: `<svg viewBox="0 0 640 210" role="img" aria-label="IF decision: if B2 is at least 35 the result is Pass, otherwise Fail">
    <polygon class="dg-soft" points="200,20 330,90 200,160 70,90"/><text class="dg-tb" x="200" y="86" text-anchor="middle">B2 &gt;= 35 ?</text><text class="dg-tm" x="200" y="106" text-anchor="middle">logical_test</text>
    <path class="dg-line" d="M330 90 H420 V50 H458"/><path class="dg-arrow" d="M468 50 l-10 -6 v12 z"/><text class="dg-tb" x="370" y="80" style="fill:var(--good)">TRUE</text>
    <path class="dg-line" d="M200 160 V190 H458"/><path class="dg-arrow" d="M468 190 l-10 -6 v12 z"/><text class="dg-tb" x="300" y="182" style="fill:var(--bad)">FALSE</text>
    <rect class="dg-brand" x="470" y="22" width="160" height="56" rx="10"/><text class="dg-tw" x="550" y="48" text-anchor="middle">"Pass"</text><text class="dg-tw" x="550" y="67" text-anchor="middle" style="font-weight:400;font-size:12px">value_if_true</text>
    <rect class="dg-box" x="470" y="162" width="160" height="44" rx="10"/><text class="dg-tb" x="550" y="182" text-anchor="middle">"Fail"</text><text class="dg-tm" x="550" y="199" text-anchor="middle">value_if_false</text>
  </svg>`,
  criteria: `<svg viewBox="0 0 720 200" role="img" aria-label="Advanced filter criteria: conditions on the same row are AND; conditions on different rows are OR">
    <text class="dg-tb" x="10" y="22">Same row = AND</text>
    ${[["Dept","Basic"],["Finance",">=15000"]].map((r,i)=>r.map((v,j)=>`<rect class="${i===0?"dg-soft":"dg-box"}" x="${10+j*140}" y="${34+i*36}" width="140" height="36"/><text class="${i===0?"dg-tb":"dg-t"}" x="${80+j*140}" y="${57+i*36}" text-anchor="middle">${v.replace(">","&gt;")}</text>`).join("")).join("")}
    <text class="dg-tm" x="10" y="130">Finance AND Basic ≥ 15,000</text>
    <text class="dg-tb" x="380" y="22">Different rows = OR</text>
    ${[["Dept","Basic"],["Finance",">=15000"],["Procurement",">=30000"]].map((r,i)=>r.map((v,j)=>`<rect class="${i===0?"dg-soft":"dg-box"}" x="${380+j*160}" y="${34+i*36}" width="160" height="36"/><text class="${i===0?"dg-tb":"dg-t"}" x="${460+j*160}" y="${57+i*36}" text-anchor="middle">${v.replace(">","&gt;")}</text>`).join("")).join("")}
    <text class="dg-tm" x="380" y="166">(Finance AND ≥ 15,000) OR (Procurement AND ≥ 30,000)</text>
  </svg>`,
  vlookup: `<svg viewBox="0 0 720 230" role="img" aria-label="VLOOKUP searches the first column for Red Plaid, moves across to column 3 and returns 250">
    <rect class="dg-accent" x="8" y="96" width="120" height="40" rx="8"/><text class="dg-tb" x="68" y="121" text-anchor="middle" style="fill:#1E1212">"Red Plaid"</text><text class="dg-tm" x="68" y="152" text-anchor="middle">lookup_value</text>
    ${arrow(130,116,196,116)}
    ${[["Rug Style","M","L"],["Green weave","200","300"],["Red Plaid","150","250"],["Red Polkadot","275","325"]].map((r,i)=>r.map((v,j)=>{ const x = 200 + [0,150,250][j], w = [150,100,100][j], y = 40 + i*38; const hit = i===2 && j===2; const cls = i===0 ? "dg-soft" : hit ? "dg-brand" : (j===0 ? "dg-soft" : "dg-box"); return `<rect class="${cls}" x="${x}" y="${y}" width="${w}" height="38" ${j===0&&i>0?'opacity=".6"':""}/><text class="${hit?"dg-tw":i===0?"dg-tb":"dg-t"}" x="${x+w/2}" y="${y+24}" text-anchor="middle">${v}</text>`; }).join("")).join("")}
    <text class="dg-tm" x="275" y="210" text-anchor="middle">col 1: searched</text><text class="dg-tm" x="400" y="210" text-anchor="middle">col 2</text><text class="dg-tm" x="500" y="210" text-anchor="middle">col 3</text>
    ${arrow(560,135,610,135)}<rect class="dg-brand" x="614" y="112" width="96" height="46" rx="8"/><text class="dg-tw" x="662" y="141" text-anchor="middle">250</text>
    <text class="dg-tm" x="200" y="26">table_array A1:C4 · col_index_num 3 · FALSE = exact</text>
  </svg>`
};
