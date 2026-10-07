# Excel Learning Lab: step-by-step code guide

A 30-day, password-protected Excel course for students, branded for Scrap Analytics. It's plain HTML, CSS and JavaScript, with no build tools and no server code.

---

## Step 1: The folder structure

```
excel-learning-lab/
├── index.html          ← page skeleton: password screen, student screen, app shell
├── css/
│   └── styles.css      ← colours (logo tokens), layout, practice-widget styles
├── js/
│   ├── logo.js         ← Scrap Analytics logo embedded as text (always visible)
│   ├── content.js      ← 6 weeks, 30 lessons, practice-widget settings, 300 quiz questions
│   ├── engine.js       ← mini Excel formula engine used by the practice sheets
│   ├── widgets.js      ← the interactive practice tools
│   ├── diagrams.js     ← small explanatory SVG diagrams
│   └── app.js          ← password, accounts, lessons, quizzes, results
└── img/                ← 68 pictures from the Excel handbook + logo.png
```

The scripts load in this order: `logo.js → content.js → engine.js → widgets.js → diagrams.js → app.js`.

---

## Step 2: `index.html`

The page has three screens. Only one shows at a time:

| Screen | Purpose |
|---|---|
| `#gate` | Password box ("Unlock course") |
| `#setup` | Pick an existing student or create a new student account |
| `#app` | Top bar (Home, Lessons, My Account, Lock) and `<main id="view">`, which JavaScript fills |

---

## Step 3: `css/styles.css`

The first lines hold the **brand tokens** taken from the logo:

```css
--brand:#D1121E;   /* logo red    */
--accent:#F0542A;  /* logo orange */
--ink:#1E1212;     /* logo black  */
```

Dark-mode versions come right after them. The second half of the file styles the practice tools: the Excel-like grid (`table.xg`), the formula bar (`.fxbar`), tasks, the PivotTable and so on.

---

## Step 4: `js/content.js`, the course

At the top, `WEEKS` lists the 6 weeks. Each day is then added with `LESSONS.push({...})`:

```js
LESSONS.push({
  day: 15, week: 3, mins: 40,
  title: "SUM & AutoSum", sub: "Your first function",
  goals: ["…"],
  sections: [
    { h: "Heading", html: `<p>Lesson text</p>`,
      think: "…", note: "…", remember: "…",          // optional boxes
      diagram: "pemdas",                              // optional diagram
      figs: [["032-124", "Picture caption"]],         // img/032-124.jpg
      widget: { type: "play", data: [...], tasks: [...] } // optional practice tool
    }
  ],
  terms: [["Word","Meaning"]], tryit: ["…"], links: [["Title","https://support.microsoft.com/…"]],
  quiz: [ { q:"Question?", o:["A","B","C","D"], a:0, e:"Explanation" } ]
});
```

`a` is the position of the correct option (0 = first). The app **shuffles the options** on every attempt, so the correct answer can stay first in the file.

### Practice tool types (`widget.type`)

| Type | Used on | What it does |
|---|---|---|
| `ribbon` | Day 2 | Click Ribbon tabs to see each tab's buttons |
| `fill` | Day 4 | Fill Handle series: months, days, dates, numbers, Ctrl |
| `numfmt` | Day 7 | Same value shown in different number formats |
| `play` | Days 12, 14–21, 27 | Live formula sheet with auto-checked tasks |
| `steps` | Day 13 | Order of operations, one step at a time |
| `copy` | Days 13, 17 | Shows how references change when a formula is copied down |
| `refs` | Day 17 | Press F4 to cycle A4 → $A$4 → A$4 → $A4 |
| `cf` | Day 22 | Conditional formatting rule builder with tasks |
| `table` | Days 23–24 | Multi-level sort, and AutoFilter drop-downs |
| `subtotal` | Day 25 | Data → Subtotal with outline levels 1-2-3 |
| `xltable` | Day 26 | Excel Table styles, banding, Total Row, auto-expand |
| `validation` | Day 28 | Drop-down list, whole-number rule, Stop/Warning/Information alerts |
| `pivot` | Day 29 | Build a PivotTable, group dates by month, click to drill down |
| `audit` | Day 30 | Show formulas, trace precedents, dependents and errors, evaluate |

### Adding a practice task

In a `play` widget, each task has the text, the expected answer and a hint:

```js
{ t: "Total of all Maths marks", a: 464, hint: "=SUM(B2:B7)", must: ["SUM"] }
```

- `a` can be a number, text (`"Pass"`), `true`/`false` or an error code (`"#DIV/0!"`).
- `must` (optional) means the formula has to contain those words, so the student really used SUM. `"IF(*2"` means "IF( at least twice".

---

## Step 5: `js/engine.js`, the formula engine

A small Excel calculator used by the practice tools. It supports cell references, ranges, `$` references and named ranges; the operators `+ - * / ^ & % = <> < > <= >=`; and Excel's rule that `-2^2 = 4`. It also understands these functions:

SUM, AVERAGE, MIN, MAX, MEDIAN, PRODUCT, COUNT, COUNTA, COUNTBLANK, COUNTIF, COUNTIFS, SUMIF, AVERAGEIF, IF, IFS, IFERROR, AND, OR, NOT, ROUND, ROUNDUP, ROUNDDOWN, INT, ABS, SQRT, POWER, MOD, ROWS, COLUMNS, VLOOKUP, HLOOKUP, UPPER, LOWER, PROPER, LEN, TRIM, LEFT, RIGHT, MID, CONCATENATE, CONCAT, TODAY, NOW and RANDBETWEEN.

It returns Excel's error values (#DIV/0!, #VALUE!, #NAME?, #N/A, #REF!, #NUM!). COUNTIF criteria support operators, `&`, the `*` and `?` wildcards, and `""` for empty cells.

---

## Step 6: `js/app.js`, the app logic

- **Storage**: everything is saved in the browser's `localStorage` under the key `xlLab.v1`: profiles, lessons read, practice tasks completed, and every test result (`{day, title, score, total, date, secs, attempt}`).
- **Password**: only a SHA-256 fingerprint of `Scrap@2026` is stored (`PW_HASH`). Unlocking lasts until the tab closes; the Lock button locks it again.
- **Views**: `go("home")`, `go("lesson", 5)`, `go("quiz", 5)`, `go("account")`.
- **Quiz**: 10 questions with instant feedback. The score is saved automatically, and the pass mark is `PASS_MARK = 6`.
- **My Account**: profile, summary, best-score chart for all 30 days, Test Results table (filter by test, best attempt marked), **Copy results** and switch student.

---

## Step 7: Run it

Double-click `index.html`. That's it. Or run `python -m http.server 8000` in the folder and open http://localhost:8000.

## Step 8: Put it online

Upload the whole folder to GitHub Pages, Netlify, Cloudflare Pages or any web host. Share the link and the password with students.

> Results are stored in each student's own browser. A new device or cleared browser data starts fresh. Students use **Copy results** to send scores to the trainer.

## Step 9: Common changes

**Password.** In the browser console (F12) run the snippet below with your new password, then paste the printed code into `PW_HASH` in `js/app.js`:

```js
crypto.subtle.digest("SHA-256", new TextEncoder().encode("NewPassword"))
  .then(b => console.log([...new Uint8Array(b)].map(x => x.toString(16).padStart(2,"0")).join("")));
```

Also update the fallback line `["Scrap","@","2026"].join("")`, which is only used on very old browsers.

**Pass mark.** Change `PASS_MARK` in `js/app.js`.

**Add a day.** Add a `LESSONS.push({...})` block with the next day number. If it starts a new week, add that week to `WEEKS`. Home, the lesson list and the charts adjust automatically.

**Colours.** Change the brand tokens at the top of `css/styles.css`, and the matching dark-mode block.

---

Security note: the password keeps casual visitors out, but everything runs in the browser, so don't put confidential information in the tool.

Content is based on the *Microsoft Excel Handbook* (Dr. MCR HRD Institute of Telangana), updated with current Microsoft Support documentation.
