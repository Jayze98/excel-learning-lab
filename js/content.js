/* Excel Learning Lab - course content: 30 lessons, practice widgets and 300 quiz questions.
   In each quiz question, 'a' is the index (0-3) of the correct option in 'o'. */

const LESSONS = [];
const COURSE = { name: "Excel Learning Lab", subject: "Excel" };
const WEEKS = [
  { n: 1, title: "Getting started", hint: "The Excel window, cells, filling and copying data" },
  { n: 2, title: "Shaping your sheet", hint: "Rows, columns, formatting, sheets, protection and printing" },
  { n: 3, title: "First formulas", hint: "Shortcuts, formulas, order of operations, errors and SUM" },
  { n: 4, title: "Functions & references", hint: "AVERAGE, MAX, MIN, references, names, COUNT, COUNTIF and IF" },
  { n: 5, title: "Logic & data tools", hint: "AND/OR, conditional formatting, sorting, filters and subtotals" },
  { n: 6, title: "Analysis power tools", hint: "Tables, VLOOKUP, data validation, PivotTables, auditing and macros" }
];
const SUPPORT = "https://support.microsoft.com/en-us/office/";

/* ============================ DAY 1 ============================ */
LESSONS.push({
  day: 1, week: 1, mins: 30,
  title: "Welcome to Excel",
  sub: "Spreadsheets, rows, columns and cells",
  goals: ["Explain what a spreadsheet program is used for","Name the parts of a worksheet: rows, columns and cells","Read and write a cell address such as C2","Know which version of Excel you can use for this course"],
  sections: [
    { h: "What is Microsoft Excel?",
      html: `<p><b>Microsoft Excel</b> is a <b>spreadsheet program</b>. A spreadsheet is a big grid where you can type information, organise it into a table, and let the computer do the calculations for you.</p>
<p>Before computers, people kept accounts in paper ledgers with ruled rows and columns. Every total had to be added by hand, and one mistake meant rubbing out and recalculating the whole page. Spreadsheet software copies that paper grid on screen, but it recalculates <b>automatically</b> whenever a number changes. That is why spreadsheets replaced many paper systems, first in accounting and then almost everywhere.</p>`,
      think: `Imagine your school mark sheet on paper. If a teacher corrects one mark, the total and percentage must be redone by hand. In Excel, you fix the one mark and every total updates itself instantly.` },
    { h: "What can you do with it?",
      html: `<ul><li><b>Record</b> information neatly: class marks, attendance, a library list, cricket scores.</li>
<li><b>Calculate</b>: totals, averages, percentages, the highest and lowest values.</li>
<li><b>Analyse</b>: sort, filter and summarise thousands of rows in seconds.</li>
<li><b>Present</b>: colours, borders and charts that make numbers easy to understand.</li>
<li><b>Share</b>: send a workbook to others or work on the same file together online.</li></ul>
<p>Excel is used by students, shopkeepers, teachers, scientists, accountants, engineers and data analysts. Learning it well is one of the most useful computer skills you can have.</p>` },
    { h: "Rows, columns and cells",
      html: `<p>A worksheet is a grid made of:</p>
<ul><li><b>Columns</b>: the vertical strips, named with <b>letters</b> A, B, C … Z, then AA, AB and so on.</li>
<li><b>Rows</b>: the horizontal strips, named with <b>numbers</b> 1, 2, 3 …</li>
<li><b>Cells</b>: the boxes where a column and a row meet. Each cell holds one piece of data: a number, some text, a date or a formula.</li></ul>
<p>Every cell has an <b>address</b> (also called a <b>cell reference</b>): the column letter followed by the row number. The cell in column C and row 2 is <b>C2</b>. Always write the letter first.</p>
<p>A modern worksheet is huge: <b>1,048,576 rows</b> and <b>16,384 columns</b> (the last column is XFD).</p>`,
      diagram: "grid",
      figs: [["012-034","The structure of a worksheet: the Name Box shows the selected cell's address (C2) and the Formula Bar shows what it contains."]] },
    { h: "Which Excel should I use?",
      html: `<p>The reference handbook for this course was written for <b>Excel 2010</b>. Today most people use <b>Microsoft 365</b> (Excel 2021/2024 and newer). The buttons have moved a little and the colours look fresher, but almost everything in this course works the same way.</p>
<ul><li><b>Excel for Windows or Mac</b>: the full program.</li>
<li><b>Excel for the web</b>: a free version that runs in your browser. Sign in with a free Microsoft account at <a href="https://www.office.com" target="_blank" rel="noopener">office.com</a>.</li>
<li><b>Excel mobile app</b>: handy for viewing, harder for real work.</li></ul>`,
      note: `Each lesson has a <b>practice area</b> built into this website, so you can try formulas even before you install Excel. Whenever a screen in a picture looks different from yours, look for the same button name in your version.` },
    { h: "How this course works",
      html: `<p>You will study for 30 days, about 30 to 45 minutes a day. Each day has a lesson, pictures from the handbook, a "Try it yourself" list, links to Microsoft's own help pages and a <b>10-question test</b>. Score 6 or more to pass. All your scores are saved under <b>My Account</b>.</p>`,
      remember: `Columns = letters, rows = numbers, cell address = letter + number (like C2). Excel recalculates for you automatically.` }
  ],
  terms: [["Spreadsheet","A grid of rows and columns used to store and calculate data."],["Worksheet","One sheet (page) of the grid."],["Column","A vertical line of cells, named by letters."],["Row","A horizontal line of cells, named by numbers."],["Cell","The box where a row and a column meet."],["Cell address","The column letter plus row number, like B7."]],
  tryit: ["Open Excel (or Excel for the web) and click on any cell. Look at the Name Box above column A: which address does it show?","Click cell D5, then F12, then A1. Check the Name Box each time.","Press Ctrl + Down arrow on an empty sheet to jump to the very last row. What number do you see? Press Ctrl + Home to come back."],
  links: [["Excel help & learning (Microsoft)","https://support.microsoft.com/en-us/excel"],["Basic tasks in Excel","https://support.microsoft.com/en-us/office/basic-tasks-in-excel-dc775dd1-fa52-430f-9c3c-d998d1735fca"],["Use Excel for the web for free","https://www.office.com"]],
  quiz: [
    {q:"What kind of program is Microsoft Excel?", o:["A spreadsheet program","A web browser","A video editor","A word processor"], a:0, e:"Excel is a spreadsheet program for recording, calculating and analysing data."},
    {q:"How are columns named in Excel?", o:["With letters (A, B, C…)","With numbers (1, 2, 3…)","With colours","With the days of the week"], a:0, e:"Columns use letters; rows use numbers."},
    {q:"How are rows named in Excel?", o:["With numbers","With letters","With symbols","They have no names"], a:0, e:"Rows are numbered 1, 2, 3 and so on."},
    {q:"What is a cell?", o:["The box where a row and a column meet","A whole column","A type of chart","A saved file"], a:0, e:"A cell is the intersection of one row and one column."},
    {q:"Which is a correct cell address?", o:["C2","2C","CC","22"], a:0, e:"Write the column letter first, then the row number: C2."},
    {q:"The cell in column F and row 10 is…", o:["F10","10F","F-10","Row10F"], a:0, e:"Column letter, then row number: F10."},
    {q:"Why did spreadsheets replace paper ledgers?", o:["They recalculate automatically when numbers change","They are always free","They never need electricity","They can't make mistakes"], a:0, e:"Automatic recalculation saves huge amounts of time and reduces errors."},
    {q:"Which version of Excel can you use for free in a web browser?", o:["Excel for the web","Excel 2010","Excel 97","Excel Pro Max"], a:0, e:"Excel for the web is free with a Microsoft account."},
    {q:"Roughly how many rows does a modern Excel worksheet have?", o:["More than one million","Exactly 100","About 5,000","65"], a:0, e:"Modern worksheets have 1,048,576 rows."},
    {q:"Which of these is NOT something Excel is used for?", o:["Frying food","Calculating totals","Sorting data","Making charts"], a:0, e:"Excel records, calculates, analyses and presents data. It can't cook!"}
  ]
});

/* ============================ DAY 2 ============================ */
LESSONS.push({
  day: 2, week: 1, mins: 35,
  title: "The Excel window",
  sub: "Starting Excel, the five screen areas and the Ribbon",
  goals: ["Start Excel on your computer","Name the five main areas of the Excel window","Explain what each Ribbon tab is for","Use the Status Bar to see quick totals"],
  sections: [
    { h: "Starting Excel",
      html: `<p>The handbook describes two ways to start Excel 2010 on Windows:</p>
<ol><li><b>Start menu</b>: Start → All Programs → Microsoft Office → Microsoft Excel 2010.</li>
<li><b>Run box</b>: Start → Run, type <code>excel</code> and press Enter. (In modern Windows, press <b>Windows key + R</b> to open Run.)</li></ol>
<p>In Windows 10 or 11 the quickest way is to press the <b>Windows key</b>, type <b>Excel</b> and press Enter. On the web, go to office.com and click Excel.</p>
<p>When Excel opens, choose <b>Blank workbook</b>, or pick a ready-made <b>template</b> such as a budget or a calendar.</p>` },
    { h: "The five areas of the screen",
      html: `<ol><li><b>Quick Access Toolbar</b> (top-left): small icons for Save, Undo and Redo. You can add any command you use often.</li>
<li><b>Ribbon</b>: the big strip of buttons, grouped into tabs. It's like an expanded menu.</li>
<li><b>Formula Bar</b>: shows what is really inside the selected cell, including formulas.</li>
<li><b>Spreadsheet grid</b>: the rows, columns and cells where your data lives. Scroll bars let you see more of it, and sheet tabs at the bottom switch sheets (Ctrl + Page Up / Page Down).</li>
<li><b>Status Bar</b> (bottom): tells you what Excel is doing, and shows quick summaries of selected cells.</li></ol>`,
      figs: [["009-020","The Excel 2010 window: Quick Access Toolbar, Ribbon, Formula Bar, spreadsheet grid and Status Bar."]] },
    { h: "Exploring the Ribbon",
      html: `<p>Excel has thousands of commands, so the Ribbon groups them into <b>tabs</b>, and each tab into <b>groups</b> (for example the Home tab has Clipboard, Font, Alignment and Number groups). Click a tab name below to see its buttons in Excel 2010.</p>`,
      widget: { type: "ribbon" },
      think: `The Ribbon is like the aisles in a supermarket. Formatting things are in the Home aisle, charts and pictures in Insert, calculations in Formulas, and sorting/filtering in Data. Once you know the aisles, you find things fast.` },
    { h: "The Status Bar trick",
      html: `<p>Select a few cells that contain numbers and look at the bottom-right of the window. The Status Bar instantly shows their <b>Average</b>, <b>Count</b> and <b>Sum</b>, with no formula needed! Right-click the Status Bar to choose extra summaries like <b>Minimum</b> and <b>Maximum</b>.</p>` },
    { h: "What was new in Excel 2010?",
      html: `<p>The handbook lists features that arrived in Excel 2010. All of them are still in Excel today:</p>
<ul><li><b>Slicers</b>: clickable buttons that filter PivotTables (Day 29).</li>
<li><b>Sparklines</b>: tiny charts that fit inside one cell to show a trend.</li>
<li><b>Sharing</b>: several people working on one workbook at the same time.</li>
<li><b>Better conditional formatting</b>: more styles, icons and data bars (Day 22).</li>
<li><b>Protected View</b>: files downloaded from the internet open read-only until you click <i>Enable Editing</i>, for safety.</li>
<li><b>64-bit support</b> and much <b>bigger files</b> than before.</li></ul>`,
      remember: `Quick Access Toolbar → Ribbon (tabs and groups) → Formula Bar → Grid → Status Bar. Select numbers to see their Sum in the Status Bar.` }
  ],
  terms: [["Quick Access Toolbar","Small toolbar with Save, Undo, Redo and your favourite commands."],["Ribbon","The strip of commands arranged in tabs."],["Tab","One page of the Ribbon, like Home or Data."],["Group","A set of related buttons inside a tab, like Font."],["Formula Bar","Shows the real contents of the selected cell."],["Status Bar","The bottom bar showing status and quick summaries."],["Template","A ready-made workbook design you can start from."]],
  tryit: ["Open Excel and find all five areas of the window.","Click each Ribbon tab and name one button you see on it.","Type 10, 20 and 30 into three cells, select them and read the Sum and Average on the Status Bar.","Right-click the Status Bar and turn on Maximum."],
  links: [["Excel help & learning","https://support.microsoft.com/en-us/excel"],["Basic tasks in Excel (create a workbook)","https://support.microsoft.com/en-us/office/basic-tasks-in-excel-dc775dd1-fa52-430f-9c3c-d998d1735fca"]],
  quiz: [
    {q:"Which area of the Excel window holds Save, Undo and Redo by default?", o:["Quick Access Toolbar","Status Bar","Formula Bar","Name Box"], a:0, e:"The Quick Access Toolbar starts with Save, Undo and Redo."},
    {q:"What is the Ribbon?", o:["The strip of commands arranged in tabs","A type of chart","The list of sheet names","A formula"], a:0, e:"The Ribbon holds Excel's commands, organised into tabs and groups."},
    {q:"Which tab would you use to sort and filter data?", o:["Data","Insert","View","Page Layout"], a:0, e:"Sort and Filter live in the Data tab."},
    {q:"Which tab holds the Function Library, Name Manager and Formula Auditing?", o:["Formulas","Home","Review","Insert"], a:0, e:"The Formulas tab contains the function library and auditing tools."},
    {q:"What does the Formula Bar show?", o:["The real contents of the selected cell","The file name","The page number","The time"], a:0, e:"The Formula Bar shows what is really inside a cell, including formulas."},
    {q:"You select five cells with numbers. Where can you instantly see their Sum?", o:["On the Status Bar","On the Ribbon","In the Name Box","In the title bar"], a:0, e:"The Status Bar shows quick summaries like Sum, Average and Count."},
    {q:"Which tab has Freeze Panes, Zoom and Gridlines options?", o:["View","Data","Formulas","Insert"], a:0, e:"The View tab controls how the sheet looks on screen."},
    {q:"Which tab contains Protect Sheet and New Comment?", o:["Review","Home","Insert","Data"], a:0, e:"Protection and comments are on the Review tab."},
    {q:"What are Sparklines?", o:["Tiny charts that fit inside one cell","Shiny cell borders","A kind of password","Fireworks animations"], a:0, e:"Sparklines are miniature charts inside a single cell."},
    {q:"What does Protected View do?", o:["Opens downloaded files read-only until you enable editing","Deletes viruses","Hides all formulas","Locks the keyboard"], a:0, e:"Protected View keeps files from the internet read-only for safety."}
  ]
});

/* ============================ DAY 3 ============================ */
LESSONS.push({
  day: 3, week: 1, mins: 35,
  title: "Workbooks, worksheets & cells",
  sub: "Moving around, the Name Box and selecting ranges",
  goals: ["Tell the difference between a workbook and a worksheet","Use the Name Box and Formula Bar","Move from cell to cell with the keyboard","Select single cells, ranges, rows, columns and non-adjacent cells"],
  sections: [
    { h: "Workbook vs worksheet",
      html: `<p>The file you create in Excel is called a <b>workbook</b>. A workbook contains one or more <b>worksheets</b> (also called <i>spreadsheets</i> or just <i>sheets</i>), just like a notebook contains pages.</p>
<ul><li>Excel 2010 opened new workbooks with <b>three</b> sheets (Sheet1, Sheet2, Sheet3). Newer versions start with <b>one</b>, and you add more with the <b>+</b> button.</li>
<li>Sheet names appear on <b>tabs</b> at the bottom of the window.</li>
<li>Workbooks are saved with the <b>.xlsx</b> extension. Very old versions (Excel 2003 and earlier) used <b>.xls</b>.</li></ul>`,
      think: `Workbook = your whole school notebook. Worksheets = the separate pages inside it: one for Maths marks, one for Science, one for attendance.` },
    { h: "The Name Box and the Formula Bar",
      html: `<p>Above column A is the <b>Name Box</b>. It shows the address of the <b>active cell</b> (the selected cell, which has a thick border). Its column letter and row number are also highlighted in the headings.</p>
<p>Next to it is the <b>Formula Bar</b>, which shows the contents of the active cell. If a cell shows <i>246</i> but the Formula Bar shows <code>=B2+B3</code>, you know the cell contains a formula.</p>
<p>Tip: you can <b>type an address</b> such as <code>K200</code> into the Name Box and press Enter to jump straight there.</p>`,
      figs: [["012-034","The Name Box shows C2, the Formula Bar shows the cell's contents, and the column letter and row number are highlighted."]] },
    { h: "Moving from cell to cell",
      html: `<div class="tbl-wrap"><table class="mini"><tr><th>Press</th><th>To move</th></tr>
<tr><td>Arrow keys</td><td>One cell left, right, up or down</td></tr>
<tr><td>Enter</td><td>Down one cell</td></tr>
<tr><td>Shift + Enter</td><td>Up one cell</td></tr>
<tr><td>Tab</td><td>Right one cell</td></tr>
<tr><td>Shift + Tab</td><td>Left one cell</td></tr>
<tr><td>Ctrl + Home</td><td>To cell A1</td></tr></table></div>
<p>Typing then pressing <b>Tab, Tab, Tab, Enter</b> is the fastest way to fill a table row by row: Excel even returns to the first column of the next row!</p>` },
    { h: "Selecting cells and ranges",
      html: `<p>A group of cells is called a <b>range</b>. It's written with a <b>colon</b>: <code>A1:C5</code> means "from A1 to C5", a block of 3 columns × 5 rows = 15 cells.</p>
<div class="tbl-wrap"><table class="mini"><tr><th>To select</th><th>Do this</th></tr>
<tr><td>One cell</td><td>Click it</td></tr>
<tr><td>A range</td><td>Click the first cell and drag to the last, or click the first and Shift + click the last</td></tr>
<tr><td>Non-adjacent cells</td><td>Select the first, then hold <b>Ctrl</b> while selecting the others</td></tr>
<tr><td>A whole row / column</td><td>Click the row number / column letter</td></tr>
<tr><td>Several rows / columns</td><td>Drag across the headings</td></tr>
<tr><td>The whole sheet</td><td>Click <b>Select All</b> (corner above row 1) or press <b>Ctrl + A</b></td></tr>
<tr><td>Extend a selection</td><td>Hold <b>Shift</b> and press arrow keys</td></tr></table></div>`,
      figs: [["013-037","The handbook's table of ways to select cells, ranges, rows, columns and the whole sheet."]],
      remember: `Workbook = file (.xlsx). Worksheet = one sheet inside it. A1:C5 is a range. Ctrl + click selects cells that aren't next to each other.` }
  ],
  terms: [["Workbook","An Excel file containing one or more worksheets."],["Worksheet","One sheet in a workbook, shown by a tab."],["Active cell","The currently selected cell, with a thick border."],["Name Box","Shows the active cell's address; type an address to jump there."],["Range","A group of cells written like A1:C5."],[".xlsx","The file extension of modern Excel workbooks."]],
  tryit: ["Type the address K200 into the Name Box and press Enter. Then press Ctrl + Home.","Select the range B2:D6. How many cells did you select?","Hold Ctrl and select A1, C3 and E5 together.","Click the Select All corner and then click any cell to cancel."],
  links: [["Select cell contents in Excel","https://support.microsoft.com/en-us/office/select-cell-contents-in-excel-23f64223-2b6b-453a-8688-248355f10fa9"],["Keyboard shortcuts in Excel","https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-excel-1798d9d5-842a-42b8-9c99-9b7213f0040f"]],
  quiz: [
    {q:"What is a workbook?", o:["An Excel file that contains worksheets","One single cell","A row of data","A printed page"], a:0, e:"The Excel file is the workbook; the sheets inside it are worksheets."},
    {q:"What file extension do modern Excel workbooks use?", o:[".xlsx",".docx",".pptx",".txt"], a:0, e:"Modern Excel saves .xlsx files. Old versions used .xls."},
    {q:"What does the Name Box show?", o:["The address of the active cell","The file size","The sheet colour","The printer name"], a:0, e:"The Name Box displays the selected cell's address."},
    {q:"Which key moves one cell to the RIGHT?", o:["Tab","Enter","Shift + Enter","Home"], a:0, e:"Tab moves right; Enter moves down."},
    {q:"Which key moves one cell DOWN?", o:["Enter","Tab","Shift + Tab","Esc"], a:0, e:"Enter moves the selection down one cell."},
    {q:"How many cells are in the range A1:C5?", o:["15","8","5","10"], a:0, e:"3 columns (A, B, C) × 5 rows = 15 cells."},
    {q:"Which symbol separates the first and last cell of a range?", o:["Colon (:)","Comma (,)","Hyphen (-)","Slash (/)"], a:0, e:"Ranges use a colon, e.g. A1:A5."},
    {q:"How do you select cells that are NOT next to each other?", o:["Hold Ctrl while clicking","Hold Alt while typing","Press F12","Double-click the Ribbon"], a:0, e:"Ctrl + click adds separate cells to your selection."},
    {q:"Which shortcut selects the whole worksheet?", o:["Ctrl + A","Ctrl + W","Ctrl + Q","Ctrl + E"], a:0, e:"Ctrl + A selects all cells (or click the Select All corner)."},
    {q:"Which shortcut takes you back to cell A1?", o:["Ctrl + Home","Ctrl + End","Page Down","Alt + F4"], a:0, e:"Ctrl + Home jumps to the beginning of the sheet."}
  ]
});

/* ============================ DAY 4 ============================ */
LESSONS.push({
  day: 4, week: 1, mins: 35,
  title: "Filling data fast",
  sub: "Fill Down, Fill Right, the Fill Handle and smart series",
  goals: ["Fill cells with Ctrl + D and Ctrl + R","Use the Fill Handle to copy or continue a series","Create series of months, days, dates and numbers","Know when Excel copies and when it counts"],
  sections: [
    { h: "Why fill instead of type?",
      html: `<p>Typing the same thing again and again is slow and causes mistakes. Excel can <b>propagate</b> (spread) the contents of one cell into the cells next to it. It can even continue patterns like January, February, March… for you.</p>` },
    { h: "Fill Down and Fill Right",
      html: `<ul><li><b>Ctrl + D</b> (Fill <b>D</b>own): select the cell with data <i>and</i> the empty cells below it, then press Ctrl + D. Everything is filled with the top cell's contents.</li>
<li><b>Ctrl + R</b> (Fill <b>R</b>ight): select the cell with data and the cells to its right, then press Ctrl + R.</li></ul>
<p>You'll find the same commands on <b>Home → Editing → Fill</b>.</p>` },
    { h: "The Fill Handle",
      html: `<p>Look closely at the selected cell: there's a tiny <b>square in its bottom-right corner</b>. That's the <b>Fill Handle</b>.</p>
<ol><li>Select the cell (or cells) you want to use as the starting point.</li>
<li>Point at the Fill Handle until the pointer becomes a thin black <b>+</b>.</li>
<li>Click, hold and drag across or down the cells you want to fill. A grey border shows the area.</li>
<li>Let go. The cells are filled.</li></ol>
<p>Tip: <b>double-click</b> the Fill Handle to fill down automatically as far as the data in the next column goes. It's great for long lists!</p>`,
      think: `The Fill Handle is like a photocopier with a brain. Give it "Monday" and it doesn't just copy "Monday" ten times; it knows the next day is Tuesday.` },
    { h: "Smart series",
      html: `<p>What the Fill Handle does depends on what you start with:</p>
<div class="tbl-wrap"><table class="mini"><tr><th>You start with</th><th>Dragging gives</th></tr>
<tr><td>January (or Jan)</td><td>February, March, April…</td></tr>
<tr><td>Monday (or Mon)</td><td>Tuesday, Wednesday…</td></tr>
<tr><td>A date like 01-06-2026</td><td>02-06-2026, 03-06-2026…</td></tr>
<tr><td>Text with a number: Test 1</td><td>Test 2, Test 3…</td></tr>
<tr><td>One number: 5</td><td>5, 5, 5… (copied!)</td></tr>
<tr><td>Two numbers: 5 and 10 (select both)</td><td>15, 20, 25… (continues the pattern)</td></tr>
<tr><td>Plain text: Present</td><td>Present, Present… (copied)</td></tr></table></div>
<p>A single number is <b>copied</b>. To make Excel count 1, 2, 3…, either type 1 and 2 in two cells and drag both, or hold <b>Ctrl</b> while dragging a single number. After filling, a small <b>Auto Fill Options</b> button appears so you can switch between <i>Copy Cells</i> and <i>Fill Series</i>.</p>
<p>Try it here: type a starting value (and optionally a second one), choose how many cells to drag over, and watch the series.</p>`,
      widget: { type: "fill" } },
    { h: "Filling formulas",
      html: `<p>The Fill Handle also copies <b>formulas</b>. If D2 contains <code>=B2*C2</code> and you drag it down, D3 gets <code>=B3*C3</code>, D4 gets <code>=B4*C4</code>, and so on. The addresses move with the formula. You'll learn exactly why on Day 13 and Day 17.</p>`,
      note: `Newer Excel versions also have <b>Flash Fill</b> (Ctrl + E). Type an example of what you want, for example the first names taken out of a list of full names, and Excel fills in the rest by spotting the pattern.`,
      remember: `Ctrl + D fills down, Ctrl + R fills right. Drag the Fill Handle to copy or continue a series. One number copies; two numbers set a pattern.` }
  ],
  terms: [["Propagate","Spread a cell's contents into nearby cells."],["Fill Handle","The small square at the bottom-right of a selection used to fill."],["Series","A sequence that follows a pattern, like Jan, Feb, Mar."],["Ctrl + D","Fill Down from the top cell of a selection."],["Ctrl + R","Fill Right from the left cell of a selection."],["Auto Fill Options","The button after filling that lets you choose Copy Cells or Fill Series."],["Flash Fill","Fills data by recognising a pattern from your example (Ctrl + E)."]],
  tryit: ["Type January in A1 and drag the Fill Handle down to A12.","Type Mon in B1 and drag to B7.","Type 2 in C1 and 4 in C2, select both and drag down to C10. What pattern appears?","Type 100 in D1, select D1:D5 and press Ctrl + D."],
  links: [["Fill data automatically in worksheet cells","https://support.microsoft.com/en-us/office/fill-data-automatically-in-worksheet-cells-74e31bdd-d993-45da-aa82-35a236c5b5db"],["Using Flash Fill in Excel","https://support.microsoft.com/en-us/office/using-flash-fill-in-excel-3f9bcf1e-db93-4890-94a0-1578341f73f7"]],
  quiz: [
    {q:"Which shortcut fills the selected cells downward from the top cell?", o:["Ctrl + D","Ctrl + R","Ctrl + F","Ctrl + U"], a:0, e:"Ctrl + D = Fill Down."},
    {q:"Which shortcut fills the selected cells to the right?", o:["Ctrl + R","Ctrl + D","Ctrl + L","Ctrl + T"], a:0, e:"Ctrl + R = Fill Right."},
    {q:"Where is the Fill Handle?", o:["The small square at the bottom-right corner of the selection","On the Status Bar","In the File menu","On the sheet tab"], a:0, e:"Drag the tiny square at the bottom-right of the selection."},
    {q:"What does the pointer look like when you can drag the Fill Handle?", o:["A thin black plus sign (+)","A hand","An hourglass","A magnifying glass"], a:0, e:"The pointer becomes a thin black + over the Fill Handle."},
    {q:"You type January and drag the Fill Handle down. What appears?", o:["February, March, April…","January, January, January…","1, 2, 3…","Nothing"], a:0, e:"Excel recognises month names and continues the series."},
    {q:"You type 5 in one cell and drag it down. What do you get (by default)?", o:["5, 5, 5…","6, 7, 8…","10, 15, 20…","An error"], a:0, e:"A single number is copied unless you hold Ctrl or use Fill Series."},
    {q:"You select two cells containing 5 and 10 and drag down. What comes next?", o:["15, 20, 25…","5, 10, 5, 10…","11, 12, 13…","10, 10, 10…"], a:0, e:"Two numbers set a pattern (step of 5), so Excel continues it."},
    {q:"What does dragging 'Test 1' give?", o:["Test 2, Test 3…","Test 1, Test 1…","Test A, Test B…","An error"], a:0, e:"Text ending in a number is continued as a series."},
    {q:"What happens when you double-click the Fill Handle?", o:["It fills down as far as the data in the next column","It deletes the column","It opens the Ribbon","It saves the file"], a:0, e:"Double-clicking fills down to match the length of the neighbouring data."},
    {q:"Which feature fills data by spotting a pattern from your example (Ctrl + E)?", o:["Flash Fill","Freeze Panes","AutoSum","Protected View"], a:0, e:"Flash Fill learns the pattern from your example."}
  ]
});

/* ============================ DAY 5 ============================ */
LESSONS.push({
  day: 5, week: 1, mins: 35,
  title: "Cut, copy & paste",
  sub: "Moving and copying cells the right way",
  goals: ["Cut, copy and paste with the Ribbon, right-click and shortcuts","Know what gets copied along with a cell","Paste into many cells at once","Avoid overwriting data by accident"],
  sections: [
    { h: "Cut vs copy",
      html: `<ul><li><b>Cut</b> (Ctrl + X) <b>moves</b> cells: they disappear from the old place when you paste.</li>
<li><b>Copy</b> (Ctrl + C) makes a <b>duplicate</b>: the original stays where it is.</li>
<li><b>Paste</b> (Ctrl + V) puts the cut or copied cells where you click.</li></ul>
<p>After you cut or copy, Excel draws a moving dashed border around the cells, often called <b>"marching ants"</b>. Press <b>Esc</b> to cancel it (or just start typing in another cell).</p>` },
    { h: "Three ways to do it",
      html: `<ol><li><b>Ribbon</b>: Home tab → Clipboard group → Cut, Copy or Paste.</li>
<li><b>Right-click</b>: right-click the selection → Cut or Copy; then right-click the destination → Paste.</li>
<li><b>Keyboard</b>: Ctrl + X, Ctrl + C, Ctrl + V. This is the fastest way!</li></ol>
<p>You can also <b>drag</b>: point at the border of a selection until the pointer becomes a four-headed arrow, then drag to <b>move</b>. Hold <b>Ctrl</b> while dragging to <b>copy</b> instead.</p>` },
    { h: "What travels with a cell?",
      html: `<p>When you move or copy a cell, Excel takes the <b>entire cell</b>: its value, its <b>formula</b>, its <b>formatting</b> (colours, borders, number format) and any <b>comments</b>.</p>
<p>When you <b>copy</b> a formula, its cell references adjust to the new position. When you <b>cut</b> (move) it, the references stay pointing at the same cells.</p>
<p>Sometimes you only want part of it. <b>Paste Special</b> (right-click → Paste Special, or Ctrl + Alt + V) lets you paste just the <b>Values</b>, just the <b>Formats</b>, just the <b>Formulas</b>, and more. "Paste Values" is especially useful and you'll use it again on Day 27.</p>` },
    { h: "Paste into many cells at once",
      html: `<p>Copy once, paste many times! Copy a cell, then select a whole block of cells (drag from one corner to the opposite corner), then paste. Every selected cell receives the copy.</p>
<p>The copied data stays on the clipboard while the marching ants are visible, so you can keep clicking other cells and pressing Ctrl + V.</p>` },
    { h: "Be careful!",
      html: `<ul><li>Pasting <b>replaces</b> whatever is already in the destination cells, without asking.</li>
<li>If the copied area includes <b>hidden rows or columns</b>, those hidden cells are copied too. Unhide them first if you don't want them.</li>
<li>Made a mistake? <b>Ctrl + Z</b> (Undo) is your best friend. <b>Ctrl + Y</b> redoes.</li></ul>`,
      think: `Cut is like moving your school bag from one desk to another. Copy is like taking a photocopy of your notes: the original stays with you.`,
      remember: `Ctrl + X cut (move), Ctrl + C copy, Ctrl + V paste, Esc stops the marching ants, Ctrl + Z undoes a mistake.` }
  ],
  terms: [["Cut","Remove cells so they can be pasted (moved) elsewhere (Ctrl + X)."],["Copy","Duplicate cells, leaving the originals (Ctrl + C)."],["Paste","Place cut or copied cells (Ctrl + V)."],["Marching ants","The moving dashed border around cut or copied cells."],["Paste Special","Paste only certain parts, such as values or formats."],["Clipboard","The temporary memory that holds what you cut or copied."],["Undo","Reverse your last action (Ctrl + Z)."]],
  tryit: ["Type your name in A1, copy it and paste it into C1:C5 in one go.","Cut A1 and paste it into E1. What happened to A1?","Press Esc to stop the marching ants after copying.","Copy a cell with a coloured background and use Paste Special → Values. Did the colour come across?"],
  links: [["Move or copy cells and cell contents","https://support.microsoft.com/en-us/office/move-or-copy-cells-and-cell-contents-803d65eb-6a3e-4534-8c6f-ff12d1c4139e"],["Paste options","https://support.microsoft.com/en-us/office/paste-options-8ea795b0-87cd-46af-9b59-ed4d8b1669ad"]],
  quiz: [
    {q:"Which shortcut COPIES selected cells?", o:["Ctrl + C","Ctrl + X","Ctrl + V","Ctrl + Z"], a:0, e:"Ctrl + C copies."},
    {q:"Which shortcut CUTS selected cells?", o:["Ctrl + X","Ctrl + C","Ctrl + P","Ctrl + K"], a:0, e:"Ctrl + X cuts (for moving)."},
    {q:"What is the difference between cut and copy?", o:["Cut moves the cells; copy leaves the original in place","They are exactly the same","Copy deletes the cells","Cut only works on text"], a:0, e:"Cut = move, copy = duplicate."},
    {q:"How do you remove the moving dashed border after copying?", o:["Press Esc","Press F1","Close Excel","Press Ctrl + S"], a:0, e:"Esc cancels copy mode and the marching ants."},
    {q:"Which Ribbon group contains Cut, Copy and Paste?", o:["Home → Clipboard","Data → Sort & Filter","View → Window","Insert → Charts"], a:0, e:"They are in the Clipboard group of the Home tab."},
    {q:"When you copy a cell, what is copied?", o:["Its value, formula, formatting and comments","Only the number","Only the colour","Only the column width"], a:0, e:"The entire cell is copied: contents, formatting and comments."},
    {q:"You paste onto cells that already contain data. What happens?", o:["The old data is replaced","Excel asks for a password","The data is added together","Nothing is pasted"], a:0, e:"Pasting overwrites the destination cells."},
    {q:"Which option pastes only the results, not formulas or formatting?", o:["Paste Special → Values","Paste Link","Transpose only","Paste Picture"], a:0, e:"Paste Values keeps just the values."},
    {q:"How do you copy a selection by dragging with the mouse?", o:["Hold Ctrl while dragging the border","Hold Shift and scroll","Double-click the Ribbon","Right-click the Status Bar"], a:0, e:"Dragging the border moves; holding Ctrl while dragging copies."},
    {q:"Which shortcut undoes your last action?", o:["Ctrl + Z","Ctrl + Y","Ctrl + U","Ctrl + O"], a:0, e:"Ctrl + Z undoes; Ctrl + Y redoes."}
  ]
});

/* ============================ DAY 6 ============================ */
LESSONS.push({
  day: 6, week: 2, mins: 40,
  title: "Rows & columns",
  sub: "Insert, delete, resize, AutoFit, hide and unhide",
  goals: ["Insert and delete rows and columns","Set exact column widths and row heights","AutoFit columns to their contents and fix #####","Hide and unhide rows and columns"],
  sections: [
    { h: "Inserting rows and columns",
      html: `<ul><li><b>Insert a row</b>: right-click a row number → <b>Insert</b>. The new row appears <b>above</b> the row you clicked.</li>
<li><b>Insert a column</b>: right-click a column letter → <b>Insert</b>. The new column appears to the <b>left</b>.</li>
<li>Need more? Press <b>F4</b> to repeat the last action and insert another. Or select several rows first to insert that many at once.</li></ul>` },
    { h: "Deleting rows and columns",
      html: `<p>Right-click a row number or column letter → <b>Delete</b>. The row or column is removed and the others move up or left.</p>
<ul><li>Delete several <b>neighbouring</b> rows: drag across their numbers first.</li>
<li>Delete rows that are <b>apart</b>: hold <b>Ctrl</b> while clicking their numbers, then Delete.</li></ul>
<p>⚠️ Don't confuse this with the <b>Delete key</b> on your keyboard. The key only clears the <b>contents</b> of cells; the empty row stays.</p>` },
    { h: "Column width and row height",
      html: `<p>A column can be <b>0 to 255</b> characters wide. The default is <b>8.43</b> characters. A row can be <b>0 to 409</b> points tall; the default in modern Excel is <b>15 points</b>. A width or height of <b>0</b> means the column or row is <b>hidden</b>.</p>
<p><b>Exact size</b>: select the columns or rows → Home → Cells → <b>Format</b> → <b>Column Width</b> or <b>Row Height</b> → type a value → OK.</p>
<p><b>With the mouse</b>: point at the line between two headings. When the pointer becomes a line with arrows, drag. Select several columns first to resize them all to the same width.</p>`,
      figs: [["016-049","The Column Width and Row Height boxes: type an exact size."]] },
    { h: "AutoFit and the ##### signal",
      html: `<p><b>AutoFit</b> makes a column exactly as wide as its longest entry. <b>Double-click</b> the boundary to the right of the column letter. To AutoFit everything, click <b>Select All</b> and double-click any column boundary. Also available at Home → Format → AutoFit Column Width / AutoFit Row Height.</p>
<p>If a cell shows <b>#####</b>, don't panic! It isn't an error. The number or date is simply too wide for the column. Widen the column and the value appears.</p>`,
      think: `##### is Excel's way of saying "my coat is too small for this number". Give the column a bigger coat (make it wider) and the number shows up.` },
    { h: "Hiding and unhiding",
      html: `<p>Hide rows or columns you don't need to see (they're still there, and formulas still use them):</p>
<ul><li><b>Hide</b>: select them → right-click → <b>Hide</b>, or Home → Format → Hide &amp; Unhide → Hide Rows/Columns.</li>
<li><b>Unhide</b>: select the rows or columns on <b>both sides</b> of the hidden ones → right-click → <b>Unhide</b>.</li>
<li>A double line between headings (for example, C jumping to E) tells you something is hidden.</li>
<li>Row 1 or column A is tricky to unhide: type <code>A1</code> in the Name Box, press Enter, then use Format → Hide &amp; Unhide → Unhide.</li></ul>`,
      figs: [["025-101","Home → Cells → Format holds Column Width, AutoFit and Hide & Unhide."]],
      remember: `Rows insert above, columns insert left. F4 repeats. Double-click a boundary to AutoFit. ##### = column too narrow. Hidden ≠ deleted.` }
  ],
  terms: [["Insert","Add a new row (above) or column (left)."],["Delete (row/column)","Remove the whole row or column."],["Column width","How many characters fit in a column (0 to 255)."],["Row height","How tall a row is in points (0 to 409)."],["AutoFit","Resize to fit the longest entry."],["#####","Shown when a number or date is too wide for its column."],["Hide / Unhide","Make rows or columns invisible or visible again."]],
  tryit: ["Type a list of five names in column A. Insert a row above the third name.","Make column A exactly 25 wide using Format → Column Width.","Type 123456789012 in B1 with a narrow column B. Do you see #####? Double-click the boundary to AutoFit.","Hide column C, then unhide it."],
  links: [["Change the column width and row height","https://support.microsoft.com/en-us/office/change-the-column-width-and-row-height-72f5e3cc-994d-43e8-ae58-9774a0905f46"],["Insert or delete rows and columns","https://support.microsoft.com/en-us/office/insert-or-delete-rows-and-columns-6f40e6e4-85af-45e0-b39d-65dd504a3246"],["Hide or show rows or columns","https://support.microsoft.com/en-us/office/hide-or-show-rows-or-columns-659c2cad-802e-44ee-a614-dde8443579f8"]],
  quiz: [
    {q:"When you insert a row, where does it appear?", o:["Above the row you clicked","Below the row you clicked","At the end of the sheet","On a new sheet"], a:0, e:"Excel inserts rows above the selected row."},
    {q:"When you insert a column, where does it appear?", o:["To the left of the column you clicked","To the right","At column Z","In row 1"], a:0, e:"New columns go to the left."},
    {q:"Which key repeats your last action, such as inserting another row?", o:["F4","F1","F12","Esc"], a:0, e:"F4 repeats the last action."},
    {q:"What does pressing the Delete key on the keyboard do to a selected row?", o:["Clears the contents, but the row stays","Removes the whole row","Hides the row","Sorts the row"], a:0, e:"The Delete key only clears contents. Use right-click → Delete to remove the row."},
    {q:"What is the default column width in Excel?", o:["8.43 characters","100 characters","1 character","255 characters"], a:0, e:"The default width is 8.43 characters."},
    {q:"A cell shows #####. What is the most likely reason?", o:["The column is too narrow for the number","The formula is wrong","The file is corrupt","The cell is protected"], a:0, e:"##### means the value is too wide; widen the column."},
    {q:"How do you AutoFit a column quickly?", o:["Double-click the boundary to the right of its heading","Triple-click the cell","Press Ctrl + P","Right-click the Status Bar"], a:0, e:"Double-clicking the boundary AutoFits the column."},
    {q:"What does a column width of 0 mean?", o:["The column is hidden","The column is deleted","The column is locked","The column is empty"], a:0, e:"Width 0 = hidden."},
    {q:"How do you unhide column D (hidden between C and E)?", o:["Select columns C to E, right-click, Unhide","Press Delete","Insert a new column","Save the file"], a:0, e:"Select the columns on both sides of the hidden one, then Unhide."},
    {q:"How do you select rows that are NOT next to each other to delete them?", o:["Hold Ctrl and click their row numbers","Hold Alt and scroll","Press F4","Use Ctrl + A"], a:0, e:"Ctrl + click selects non-adjacent rows."}
  ]
});

/* ============================ DAY 7 ============================ */
LESSONS.push({
  day: 7, week: 2, mins: 45,
  title: "Formatting cells",
  sub: "Wrap text, merge, number formats and borders",
  goals: ["Wrap long text inside a cell","Merge and centre cells, and split them again","Apply number formats like currency, percentage and date","Add and remove borders"],
  sections: [
    { h: "Wrap Text",
      html: `<p>Long text normally spills over into the next cell (or gets cut off). <b>Wrap Text</b> shows it on several lines inside the same cell.</p>
<ol><li>Click the cell.</li><li>Home → Alignment → <b>Wrap Text</b>.</li></ol>
<p>A single very long word won't be split. Widen the column or make the font smaller. If some lines are still hidden, AutoFit the row height (Home → Format → AutoFit Row Height). To start a new line yourself while typing, press <b>Alt + Enter</b>.</p>`,
      figs: [["018-064","Wrap Text is in the Alignment group of the Home tab."]] },
    { h: "Merge and centre",
      html: `<p><b>Merging</b> joins several neighbouring cells into one bigger cell. It's popular for titles across the top of a table.</p>
<ul><li><b>Merge &amp; Center</b>: joins the cells and centres the text.</li>
<li><b>Merge Across</b>: merges each selected row separately.</li>
<li><b>Merge Cells</b>: joins without centring.</li>
<li><b>Unmerge Cells</b> (split): click Merge &amp; Center again. The contents go to the top-left cell.</li></ul>
<p>⚠️ Only the <b>top-left</b> cell's contents are kept when you merge. The rest is lost.</p>`,
      figs: [["017-058","The Merge & Center button with its drop-down options."]],
      note: `Merged cells can cause trouble when you sort, filter or copy data. For a title, a good alternative is <b>Center Across Selection</b> (Format Cells → Alignment → Horizontal). It looks the same but keeps the cells separate.` },
    { h: "Number formats",
      html: `<p>In Excel, <b>what a cell stores</b> and <b>how it looks</b> are two different things. The value <code>0.5</code> can be displayed as 0.5, 50%, ₹0.50 or ½. The number underneath doesn't change, only its "clothes".</p>
<p>Home → Number group → open the <b>Number Format</b> list, or click <b>More Number Formats</b> (Ctrl + 1) for full control: decimal places, currency symbol, how negative numbers show (red, in brackets) and more.</p>
<div class="tbl-wrap"><table class="mini"><tr><th>Format</th><th>Example</th></tr>
<tr><td>General</td><td>1234.5</td></tr><tr><td>Number</td><td>1,234.50</td></tr><tr><td>Currency</td><td>₹1,234.50</td></tr><tr><td>Percentage</td><td>12%</td></tr><tr><td>Date</td><td>28-09-2026</td></tr><tr><td>Text</td><td>Stores numbers as text (like phone numbers)</td></tr></table></div>
<p>Try it: type a value and pick a format to see how the <i>same</i> number looks different.</p>`,
      widget: { type: "numfmt" },
      figs: [["019-070","The Number Format list on the Home tab."],["019-071","Format Cells → Number: choose Currency, set decimal places, the symbol and negative number style."]] },
    { h: "Cell borders",
      html: `<p>The light grey <b>gridlines</b> you see on screen <b>don't print</b>. To draw real lines, add <b>borders</b>:</p>
<ol><li>Select the cells.</li><li>Home → Font group → click the arrow next to the <b>Borders</b> button.</li><li>Choose a style: Bottom Border, All Borders, Outside Borders, Thick Box Border…</li></ol>
<p><b>More Borders</b> opens the Format Cells → Border tab, where you can pick line style and colour. To remove borders, choose <b>No Border</b>. The Borders button remembers the last style you used, so click the button itself to apply it again.</p>`,
      figs: [["020-075","The Borders menu: choose a ready-made border or More Borders for custom styles."]],
      remember: `Wrap Text = many lines in one cell. Merge keeps only the top-left value. Number format changes the look, not the value. Gridlines don't print; borders do.` }
  ],
  terms: [["Wrap Text","Shows long text on several lines within a cell."],["Merge & Center","Joins cells into one and centres the content."],["Unmerge","Splits a merged cell back into separate cells."],["Number format","How a number is displayed, e.g. currency, %, date."],["Format Cells (Ctrl + 1)","Dialog box with all formatting options."],["Border","A printed line around or between cells."],["Gridlines","Light grey guide lines on screen that don't print."]],
  tryit: ["Type a long sentence in A1 and turn on Wrap Text.","Type a title in A1, select A1:E1 and click Merge & Center.","Type 0.25 in B3 and format it as Percentage. What does it show? What does the Formula Bar show?","Draw All Borders around a small table, then a Thick Box Border around the outside."],
  links: [["Wrap text in a cell","https://support.microsoft.com/en-us/office/wrap-text-in-a-cell-2a18cff5-ccc1-4bce-95e4-f0d4f3ff4e84"],["Merge and unmerge cells","https://support.microsoft.com/en-us/office/merge-and-unmerge-cells-5cbd15d5-9375-4540-907f-c673a93fcedf"],["Available number formats","https://support.microsoft.com/en-us/office/available-number-formats-in-excel-0afe8f52-97db-41f1-b972-4b46e9f1e8d2"],["Apply or remove cell borders","https://support.microsoft.com/en-us/office/apply-or-remove-cell-borders-on-a-worksheet-dc8a310b-92e3-46a7-9f17-2ab745810f4a"]],
  quiz: [
    {q:"What does Wrap Text do?", o:["Shows long text on several lines inside one cell","Deletes long text","Makes the text bold","Moves text to the next sheet"], a:0, e:"Wrap Text displays text on multiple lines within the same cell."},
    {q:"Which keys start a new line inside a cell while typing?", o:["Alt + Enter","Ctrl + Enter","Shift + Tab","Esc"], a:0, e:"Alt + Enter inserts a line break in a cell."},
    {q:"When you merge cells that all contain data, what is kept?", o:["Only the top-left cell's contents","All the contents joined together","Only the bottom-right cell","Nothing"], a:0, e:"Merging keeps only the upper-left value."},
    {q:"How do you split (unmerge) a merged cell?", o:["Click Merge & Center again (or choose Unmerge Cells)","Press Delete","Use Ctrl + D","Insert a column"], a:0, e:"Clicking Merge & Center again unmerges the cell."},
    {q:"A cell contains 0.5 formatted as Percentage. What does it display?", o:["50%","0.5%","5%","500%"], a:0, e:"0.5 = 50%. The stored value is still 0.5."},
    {q:"Does changing a number format change the value stored in the cell?", o:["No, only how it looks","Yes, always","Only for dates","Only for currency"], a:0, e:"Number formats change the display, not the value."},
    {q:"Which shortcut opens the Format Cells dialog box?", o:["Ctrl + 1","Ctrl + 9","Alt + F4","Ctrl + Shift + P"], a:0, e:"Ctrl + 1 opens Format Cells."},
    {q:"Which statement about gridlines is true?", o:["They don't print unless you turn on printing gridlines","They always print","They are the same as borders","They can't be hidden"], a:0, e:"Gridlines are screen guides; use borders for printed lines."},
    {q:"Where is the Borders button?", o:["Home tab → Font group","Data tab → Sort group","View tab → Zoom group","Formulas tab"], a:0, e:"Borders are in the Font group of the Home tab."},
    {q:"Why might you use Center Across Selection instead of merging?", o:["It looks similar but keeps cells separate, so sorting still works","It deletes the data","It is the only way to add colour","It makes files smaller than 1 KB"], a:0, e:"Merged cells can break sorting and filtering; Center Across Selection avoids that."}
  ]
});

/* ============================ DAY 8 ============================ */
LESSONS.push({
  day: 8, week: 2, mins: 40,
  title: "Managing worksheets",
  sub: "View, rename, insert, delete, move and copy sheets",
  goals: ["Switch between worksheets","Rename, insert and delete worksheets","Move or copy a sheet within a workbook","Move or copy a sheet to a new or different workbook"],
  sections: [
    { h: "Viewing worksheets",
      html: `<p>Click a sheet's <b>tab</b> at the bottom to view it. Keyboard: <b>Ctrl + Page Down</b> goes to the next sheet, <b>Ctrl + Page Up</b> to the previous one.</p>
<p>If there are too many tabs to see, use the small <b>arrows</b> to the left of the tabs, or <b>right-click</b> the arrows to see a list of all sheets and pick one.</p>
<p>How many sheets can a workbook have? Microsoft says it's limited only by your computer's memory. Keep closely related sheets together, but not so many that you get lost.</p>` },
    { h: "Renaming, inserting and deleting",
      html: `<ul><li><b>Rename</b>: double-click the tab (or right-click → Rename), type a new name, press Enter. "Sheet1" isn't helpful; "Maths Marks" is! Names can be up to 31 characters and can't contain <code>\\ / ? * [ ] :</code></li>
<li><b>Insert</b>: click the <b>+</b> (New sheet) button after the last tab, or press <b>Shift + F11</b>. Right-click → Insert puts the new sheet to the <b>left</b> of the selected one.</li>
<li><b>Delete</b>: right-click the tab → <b>Delete</b>. ⚠️ Deleting a sheet <b>can't be undone</b> with Ctrl + Z, so be sure!</li>
<li><b>Tab Color</b>: right-click → Tab Color to colour-code your sheets.</li></ul>` },
    { h: "Moving a worksheet",
      html: `<p><b>Within the same workbook</b>: drag the tab left or right. A small black arrow shows where it will land. Or right-click the tab → <b>Move or Copy…</b> → choose the sheet it should go <i>before</i> → OK.</p>
<p><b>To a new workbook</b>: right-click → Move or Copy… → under <b>To book</b> choose <b>(new book)</b> → OK. The sheet is removed from the old workbook and appears in a new one. Save it!</p>
<p><b>To another open workbook</b>: open both files first, then Move or Copy… → choose the other workbook under <b>To book</b>.</p>`,
      think: `Move or Copy is like moving a page from one ring binder to another. Tick "Create a copy" and you photocopy the page instead, so both binders have it.` },
    { h: "Copying a worksheet",
      html: `<p>Copying a sheet is a great shortcut when you need a new sheet with the same layout and formulas, such as one sheet per month.</p>
<ul><li>Right-click the tab → <b>Move or Copy…</b> → tick <b>Create a copy</b> → choose where → OK.</li>
<li>Quick way: hold <b>Ctrl</b> and drag the tab. The copy is named like "Maths Marks (2)".</li>
<li>Copying to a new or another workbook works the same way. Just remember to tick <b>Create a copy</b>.</li></ul>
<p>The handbook also shows a "messy" way: select all cells, copy, and paste into another sheet. It works, but Move or Copy is cleaner because it keeps sheet settings like column widths.</p>`,
      remember: `Double-click a tab to rename. + or Shift + F11 inserts. Deleting a sheet can't be undone. Move or Copy + "Create a copy" duplicates a sheet.` }
  ],
  terms: [["Sheet tab","The label at the bottom showing a worksheet's name."],["Rename","Change a sheet's name (double-click the tab)."],["Shift + F11","Insert a new worksheet."],["Move or Copy","Dialog to move or duplicate a sheet within or between workbooks."],["Create a copy","Checkbox that turns a move into a copy."],["(new book)","Option that moves or copies a sheet into a brand-new workbook."]],
  tryit: ["Create three sheets named Maths, Science and English.","Colour the Maths tab blue.","Move English so it is first.","Copy the Maths sheet with Ctrl + drag, then rename the copy 'Maths Term 2'.","Copy the Science sheet into a new workbook."],
  links: [["Insert or delete a worksheet","https://support.microsoft.com/en-us/office/insert-or-delete-a-worksheet-19d3d21e-a3b3-4e13-a422-d1f43f1faaf2"],["Rename a worksheet","https://support.microsoft.com/en-us/office/rename-a-worksheet-3f1f7148-ee83-404d-8ef0-9ff99fbad1f9"],["Move or copy worksheets","https://support.microsoft.com/en-us/office/move-or-copy-worksheets-or-worksheet-data-47207967-bbb2-4e95-9b5c-3c174aa69328"]],
  quiz: [
    {q:"How do you rename a worksheet quickly?", o:["Double-click its tab and type","Press F4","Use Ctrl + R","Delete it and insert a new one"], a:0, e:"Double-clicking the tab lets you type a new name."},
    {q:"Which shortcut inserts a new worksheet?", o:["Shift + F11","Ctrl + F4","Alt + Tab","Ctrl + W"], a:0, e:"Shift + F11 inserts a new sheet."},
    {q:"Which shortcut moves to the NEXT worksheet?", o:["Ctrl + Page Down","Ctrl + Home","Alt + Enter","Shift + Tab"], a:0, e:"Ctrl + Page Down goes right; Ctrl + Page Up goes left."},
    {q:"Using right-click → Insert, where does the new sheet go?", o:["To the left of the selected sheet","To the right","At the very end","Into a new workbook"], a:0, e:"Excel inserts a sheet to the left of the selected one."},
    {q:"Can you undo deleting a worksheet with Ctrl + Z?", o:["No, it can't be undone","Yes, always","Only on Mondays","Only if it was empty"], a:0, e:"Sheet deletion is permanent. Be careful!"},
    {q:"How do you copy a sheet within a workbook by dragging?", o:["Hold Ctrl while dragging the tab","Hold Shift while scrolling","Double-click the tab","Press F2"], a:0, e:"Ctrl + drag makes a copy of the sheet."},
    {q:"In Move or Copy, what turns a move into a copy?", o:["Ticking 'Create a copy'","Choosing a colour","Pressing Esc","Choosing (move to end)"], a:0, e:"The 'Create a copy' checkbox makes a duplicate."},
    {q:"How do you move a sheet into a brand-new workbook?", o:["Move or Copy → To book: (new book)","Right-click → Hide","Ctrl + N","File → Print"], a:0, e:"Choose (new book) under 'To book'."},
    {q:"Which character is NOT allowed in a sheet name?", o:["/","A","5","-"], a:0, e:"Sheet names can't contain \\ / ? * [ ] :"},
    {q:"What must you do before moving a sheet to another existing workbook?", o:["Open both workbooks","Close Excel","Print the sheet","Delete all formulas"], a:0, e:"Both workbooks must be open so the target appears in 'To book'."}
  ]
});

/* ============================ DAY 9 ============================ */
LESSONS.push({
  day: 9, week: 2, mins: 40,
  title: "Protecting & reviewing work",
  sub: "Locking cells, protecting sheets and adding comments",
  goals: ["Explain the two steps of protecting cells","Unlock input cells and protect a sheet","Add, show, edit and delete comments (notes)","Know the difference between notes and threaded comments in new Excel"],
  sections: [
    { h: "Why protect a worksheet?",
      html: `<p>You've built a mark sheet with clever formulas. A classmate types over a formula by accident and now every total is wrong! Protection stops important cells from being overwritten or deleted.</p>
<p>Protection is a <b>two-step</b> process:</p>
<ol><li>The cell must be <b>locked</b>.</li><li>The worksheet must be <b>protected</b>.</li></ol>
<p>The surprise: <b>every cell is already locked</b> by default! Locking does nothing until you protect the sheet. So the real job is to <b>unlock</b> the cells people <i>should</i> be allowed to type in.</p>`,
      diagram: "protect" },
    { h: "Step by step",
      html: `<ol><li>Select the cells people may edit (for example, the marks entry area).</li>
<li>Press <b>Ctrl + 1</b> → <b>Protection</b> tab → <b>untick Locked</b> → OK.</li>
<li>Go to <b>Review → Protect Sheet</b>.</li>
<li>Optionally type a <b>password</b>, and tick what users may still do (select cells, format, sort…).</li>
<li>Click OK (and confirm the password).</li></ol>
<p>Now the unlocked cells can be edited and everything else is safe. To change things later, use <b>Review → Unprotect Sheet</b>. <b>Review → Protect Workbook</b> protects the <i>structure</i>, so nobody can add, delete, rename or move sheets.</p>`,
      note: `⚠️ If you forget the password, Microsoft can't recover it. Write it somewhere safe. Also, sheet protection is meant to prevent <i>accidents</i>. It isn't strong security for secret data.` },
    { h: "Comments: notes on cells",
      html: `<p>A <b>comment</b> is a small note attached to a cell. A red triangle in the cell's corner shows it has one; hover over the cell to read it. Use comments to:</p>
<ul><li>Ask questions about the data</li><li>Leave feedback for another person</li><li>Explain what a value means</li><li>Explain how a formula works</li></ul>
<p><b>Add one</b> (Excel 2010): select the cell and then Review → <b>New Comment</b>, or right-click → <b>Insert Comment</b>, or press <b>Shift + F2</b>. Type your note and click outside the box.</p>`,
      figs: [["080-297","A comment attached to a cell, shown in a yellow box."],["081-304","Review → Show All Comments displays every comment at once."]] },
    { h: "Showing, editing and deleting",
      html: `<ul><li><b>Previous / Next</b> (Review tab): jump through comments one by one.</li>
<li><b>Show All Comments</b>: display every comment at once; click again to hide.</li>
<li><b>Show/Hide Comment</b>: right-click a cell to keep just that comment visible.</li>
<li><b>Edit</b>: select the cell → Review → Edit Comment (or right-click → Edit Comment).</li>
<li><b>Delete</b>: select the cell → Review → Delete (or right-click → Delete Comment).</li></ul>`,
      figs: [["082-308","Right-click a cell with a comment to Edit, Delete or Show/Hide it."]],
      note: `In <b>Microsoft 365</b> the old yellow comments are now called <b>Notes</b> (Shift + F2 still inserts one). The new <b>Comments</b> are conversation threads where people can reply to each other, which is great for teamwork.`,
      remember: `All cells start locked; unlock the input cells, then Review → Protect Sheet. Shift + F2 adds a note/comment. Red triangle = the cell has a comment.` }
  ],
  terms: [["Locked","A cell property; only takes effect when the sheet is protected."],["Protect Sheet","Stops changes to locked cells (Review tab)."],["Protect Workbook","Protects the workbook's structure (sheets)."],["Unprotect","Removes protection (password may be needed)."],["Comment / Note","A note attached to a cell, shown by a red triangle."],["Shift + F2","Inserts a comment (note) on the selected cell."]],
  tryit: ["Build a tiny sheet: names in A2:A5, marks in B2:B5 and =SUM(B2:B5) in B6.","Unlock B2:B5 (Ctrl + 1 → Protection → untick Locked).","Protect the sheet. Try typing in B6, then in B3. What happens?","Add a comment to B6 saying 'Total of all marks'. Show all comments, then hide them."],
  links: [["Protect a worksheet","https://support.microsoft.com/en-us/office/protect-a-worksheet-3179efdb-1285-4d49-a9c3-f4ca36276de6"],["Lock or unlock specific areas of a protected worksheet","https://support.microsoft.com/en-us/office/lock-or-unlock-specific-areas-of-a-protected-worksheet-75481b72-db8a-4267-8c43-042a5f2cd93a"],["Insert comments and notes in Excel","https://support.microsoft.com/en-us/office/insert-comments-and-notes-in-excel-bdcc9f5d-38e2-45b4-9a92-0b2b5c7bf6f8"]],
  quiz: [
    {q:"What are the two steps to protect important cells?", o:["Lock the cells, then protect the sheet","Hide the cells, then delete them","Bold the cells, then print","Copy the cells, then paste values"], a:0, e:"Cells must be locked AND the sheet protected."},
    {q:"By default, are cells locked or unlocked?", o:["Locked","Unlocked","Hidden","Deleted"], a:0, e:"All cells start locked, but it only matters once the sheet is protected."},
    {q:"Where do you unlock a cell?", o:["Format Cells (Ctrl + 1) → Protection tab","Data → Filter","View → Zoom","Insert → Picture"], a:0, e:"Untick Locked on the Protection tab of Format Cells."},
    {q:"Where is the Protect Sheet button?", o:["Review tab","Home tab","Insert tab","Data tab"], a:0, e:"Protect Sheet is on the Review tab."},
    {q:"What does Protect Workbook protect?", o:["The structure: adding, deleting, renaming or moving sheets","Every cell's formula","The printer","The file name"], a:0, e:"Protect Workbook guards the sheet structure."},
    {q:"What happens if you forget a protection password?", o:["Microsoft can't recover it for you","Excel emails it to you","It resets after a day","Any password works"], a:0, e:"Lost passwords can't be recovered, so keep them safe."},
    {q:"Which shortcut inserts a comment (note)?", o:["Shift + F2","Ctrl + F2","Alt + C","F7"], a:0, e:"Shift + F2 inserts a comment/note."},
    {q:"How can you tell a cell has a comment?", o:["A small red triangle in its corner","The cell turns blue","The row is hidden","The font becomes bold"], a:0, e:"A red triangle marks a cell with a comment/note."},
    {q:"Which button displays every comment at once?", o:["Show All Comments","Freeze Panes","Wrap Text","AutoSum"], a:0, e:"Review → Show All Comments."},
    {q:"In Microsoft 365, what are the old-style yellow comments called?", o:["Notes","Threads","Labels","Tags"], a:0, e:"They're called Notes; new Comments are threaded conversations."}
  ]
});

/* ============================ DAY 10 ============================ */
LESSONS.push({
  day: 10, week: 2, mins: 40,
  title: "Page setup & printing",
  sub: "Margins, orientation, size, breaks, print titles and preview",
  goals: ["Use the Page Setup group on the Page Layout tab","Set margins, orientation and paper size","Set a print area, insert page breaks and repeat heading rows","Preview a worksheet before printing"],
  sections: [
    { h: "Worksheets aren't pages",
      html: `<p>A worksheet is one huge grid, not a set of pages. When you print, Excel has to cut the grid into paper-sized pieces, and without planning the result can be messy: one lonely column on page 2, or headings only on the first page.</p>
<p>The tools to fix this are in <b>Page Layout → Page Setup</b>.</p>`,
      figs: [["085-317","The Page Setup group: Margins, Orientation, Size, Print Area, Breaks, Background and Print Titles."]] },
    { h: "Margins, orientation and size",
      html: `<ul><li><b>Margins</b>: the empty space around the edge of the page. Choose Normal, Wide or Narrow, or <i>Custom Margins</i>. The small arrow in the corner of the Page Setup group opens the full dialog box.</li>
<li><b>Orientation</b>: <b>Portrait</b> (tall) or <b>Landscape</b> (wide). Wide tables usually fit better in landscape.</li>
<li><b>Size</b>: the paper size. In India and most countries it's <b>A4</b>; in the USA, <b>Letter</b>.</li></ul>` },
    { h: "Print Area, Breaks and Print Titles",
      html: `<ul><li><b>Print Area</b>: select just the cells you want → Print Area → <b>Set Print Area</b>. Only those cells print. <i>Clear Print Area</i> removes it.</li>
<li><b>Breaks</b>: decide where a new page starts. Select a row → Breaks → <b>Insert Page Break</b>. View → <b>Page Break Preview</b> shows the blue page lines, which you can drag.</li>
<li><b>Print Titles</b>: repeat heading rows (or columns) on <b>every</b> printed page. Click Print Titles → <b>Rows to repeat at top</b> → select row 1 → OK. Now page 2 still has the column headings!</li></ul>
<p>Also useful: <b>Scale to Fit</b> (Width: 1 page) squeezes a slightly-too-wide table onto one page, and <b>Sheet Options → Gridlines → Print</b> prints the grey gridlines.</p>`,
      think: `Print Titles is like the header row on every page of a long class register, so you never forget which column is which.` },
    { h: "Print Preview",
      html: `<p>Always preview before printing to save paper. Go to <b>File → Print</b> (or press <b>Ctrl + P</b>). The right side shows exactly how each page will look; use the arrows at the bottom to flip through pages.</p>
<p>From the same screen you can change printer, number of copies, orientation, paper size, margins and scaling (<i>Fit Sheet on One Page</i>).</p>`,
      figs: [["087-336","File → Print shows the print settings on the left and a preview of the page on the right."]],
      remember: `Page Layout → Margins, Orientation, Size, Print Area, Breaks, Print Titles. Ctrl + P shows the print preview. Print Titles repeats headings on every page.` }
  ],
  terms: [["Margins","Blank space around the edges of a printed page."],["Orientation","Portrait (tall) or Landscape (wide)."],["Print Area","The range of cells chosen for printing."],["Page break","Where one printed page ends and the next begins."],["Print Titles","Rows or columns repeated on every printed page."],["Print Preview","A view of how pages will print (File → Print, Ctrl + P)."]],
  tryit: ["Fill A1:H60 with sample data (type a few values and use the Fill Handle).","Press Ctrl + P and see how many pages it takes.","Change to Landscape and set Print Titles to repeat row 1.","Use Page Break Preview and drag a blue line to change where a page ends."],
  links: [["Print a worksheet or workbook","https://support.microsoft.com/en-us/office/print-a-worksheet-or-workbook-f4ad7962-b1d5-4eb9-a24f-0907f36c4b94"],["Print rows with column headers on top of every page","https://support.microsoft.com/en-us/office/print-rows-with-column-headers-on-top-of-every-page-d3550133-f6a1-4c72-ad70-5309a2e8fe8c"],["Set or clear a print area","https://support.microsoft.com/en-us/office/set-or-clear-a-print-area-on-a-worksheet-27048af8-a321-416d-ba1b-e99ae2182a7e"]],
  quiz: [
    {q:"Which tab contains the Page Setup group?", o:["Page Layout","Home","Data","Review"], a:0, e:"Page Setup is on the Page Layout tab."},
    {q:"Which orientation is usually better for a wide table?", o:["Landscape","Portrait","Diagonal","Upside down"], a:0, e:"Landscape pages are wider."},
    {q:"What does Print Area do?", o:["Prints only the cells you choose","Prints every sheet in the workbook","Changes the paper colour","Adds page numbers"], a:0, e:"Set Print Area limits printing to the selected range."},
    {q:"Which feature repeats the heading row on every printed page?", o:["Print Titles","Breaks","Background","Margins"], a:0, e:"Print Titles → Rows to repeat at top."},
    {q:"What does inserting a page break do?", o:["Starts a new printed page at that point","Deletes a row","Hides a column","Protects the sheet"], a:0, e:"A page break forces a new page."},
    {q:"Which shortcut opens Print / Print Preview?", o:["Ctrl + P","Ctrl + Shift + P","Alt + P","F5"], a:0, e:"Ctrl + P opens the print screen with a preview."},
    {q:"Do the grey gridlines print by default?", o:["No","Yes","Only in colour","Only on A4 paper"], a:0, e:"Gridlines don't print unless you tick Gridlines → Print."},
    {q:"Which view shows blue lines where pages break, which you can drag?", o:["Page Break Preview","Normal view","Full Screen","Reading view"], a:0, e:"View → Page Break Preview."},
    {q:"Which paper size is standard in India?", o:["A4","Letter","A0","Legal only"], a:0, e:"A4 is the standard in India and most countries."},
    {q:"Your table is slightly too wide for one page. What's a quick fix?", o:["Scale to fit: Width 1 page (or Fit Sheet on One Page)","Delete half the columns","Print twice","Change the font to Wingdings"], a:0, e:"Scaling shrinks the printout to fit the page."}
  ]
});

/* ---------- shared practice data ---------- */
const DATA_MARKS = [["Name","Maths","Science","English"],["Aarav",78,85,69],["Diya",92,88,95],["Kabir",55,61,58],["Meera",84,79,90],["Rohan",67,72,64],["Sara",88,94,81]];
const DATA_SHOP = [["Item","Price","Qty","Total"],["Notebook",45,4,null],["Pen",10,6,null],["Pencil box",120,1,null],["Eraser",5,3,null]];

/* ============================ DAY 11 ============================ */
LESSONS.push({
  day: 11, week: 3, mins: 40,
  title: "Shortcuts, freeze & split",
  sub: "Move like a pro and keep headings in view",
  goals: ["Use navigation keys and Ctrl shortcuts to move quickly","Learn the everyday shortcuts people use most","Freeze the top row or first column","Split the window into panes"],
  sections: [
    { h: "Moving around with the keyboard",
      html: `<div class="tbl-wrap"><table class="mini"><tr><th>Keystroke</th><th>Where you go</th></tr>
<tr><td>→ ← ↑ ↓</td><td>One cell in that direction</td></tr>
<tr><td>Page Up / Page Down</td><td>Up / down one screen</td></tr>
<tr><td>Home</td><td>Start of the current row</td></tr>
<tr><td>Ctrl + →</td><td>Last cell with data in the current row (edge of the data)</td></tr>
<tr><td>Ctrl + ←</td><td>First cell with data in the current row</td></tr>
<tr><td>Ctrl + ↑</td><td>First cell with data in the current column</td></tr>
<tr><td>Ctrl + ↓</td><td>Last cell with data in the current column</td></tr>
<tr><td>Ctrl + Page Up / Page Down</td><td>Previous / next worksheet</td></tr>
<tr><td>Ctrl + Home</td><td>Beginning of the sheet (A1)</td></tr>
<tr><td>Ctrl + End</td><td>Last used cell of the sheet</td></tr></table></div>
<p>Add <b>Shift</b> to any of these to <b>select</b> while you move. <b>Ctrl + Shift + ↓</b> selects a whole column of data in one go!</p>` },
    { h: "Everyday shortcuts",
      html: `<div class="tbl-wrap"><table class="mini"><tr><th>Shortcut</th><th>Does</th><th>Shortcut</th><th>Does</th></tr>
<tr><td>Ctrl + N</td><td>New workbook</td><td>Ctrl + S</td><td>Save</td></tr>
<tr><td>Ctrl + O</td><td>Open</td><td>Ctrl + P</td><td>Print</td></tr>
<tr><td>Ctrl + Z</td><td>Undo</td><td>Ctrl + Y</td><td>Redo / repeat</td></tr>
<tr><td>Ctrl + B / I / U</td><td>Bold / Italic / Underline</td><td>Ctrl + 1</td><td>Format Cells</td></tr>
<tr><td>Ctrl + F</td><td>Find</td><td>Ctrl + H</td><td>Find &amp; Replace</td></tr>
<tr><td>F2</td><td>Edit the active cell</td><td>F4</td><td>Repeat / toggle $ in formulas</td></tr>
<tr><td>Ctrl + ;</td><td>Insert today's date</td><td>Alt + =</td><td>AutoSum</td></tr>
<tr><td>Ctrl + Space</td><td>Select the column</td><td>Shift + Space</td><td>Select the row</td></tr>
<tr><td>Ctrl + &#96;</td><td>Show formulas</td><td>F7</td><td>Spelling check</td></tr></table></div>`,
      think: `Shortcuts are like learning to touch-type. Slow for the first two days, then you'll never go back to hunting with the mouse.` },
    { h: "Freeze panes",
      html: `<p>In a long list, the heading row scrolls away and you forget which column is which. <b>Freeze Panes</b> keeps chosen rows or columns always visible.</p>
<p>View tab → Window group → <b>Freeze Panes</b>, then:</p>
<ul><li><b>Freeze Top Row</b>: keeps row 1 visible.</li>
<li><b>Freeze First Column</b>: keeps column A visible.</li>
<li><b>Freeze Panes</b>: freezes everything <b>above and to the left</b> of the selected cell. To freeze rows 1–2 and column A, select <b>B3</b> first.</li></ul>
<p>A thin solid line shows the frozen edge. Freezing works only at the top and left of the sheet, not in the middle. To undo: Freeze Panes → <b>Unfreeze Panes</b>.</p>`,
      figs: [["026-105","A frozen top row: the headings stay visible as you scroll down to Boise, Denver, Chicago…"]] },
    { h: "Split panes",
      html: `<p><b>Split</b> divides the window into two or four areas that scroll separately, each showing a different part of the same sheet. It's great for comparing row 5 with row 500.</p>
<ul><li>Select a cell and click View → <b>Split</b>. The split happens above and to the left of that cell.</li>
<li>Drag the split bars to adjust; click Split again (or double-click a bar) to remove it.</li>
<li>In Excel 2010 you could also drag the small <i>split box</i> at the top of the vertical scroll bar.</li></ul>
<p>You can't freeze and split at the same time. <b>View → New Window</b> opens a second window of the same workbook, which is another way to see two places at once.</p>`,
      figs: [["026-106","A worksheet split into four panes, each with its own view of the data."],["027-110","The Window group on the View tab: New Window, Arrange All, Freeze Panes, Split, Hide and Unhide."]],
      remember: `Ctrl + arrows jump to the edge of data. Add Shift to select. View → Freeze Panes keeps headings visible. View → Split shows two parts of the same sheet.` }
  ],
  terms: [["Ctrl + arrow","Jump to the edge of the current block of data."],["Ctrl + Home / End","Go to A1 / the last used cell."],["F2","Edit the active cell."],["Freeze Panes","Keep rows/columns visible while scrolling."],["Freeze Top Row","Keep row 1 visible."],["Split","Divide the window into panes that scroll separately."],["Unfreeze Panes","Remove freezing."]],
  tryit: ["Fill A1:A300 with numbers (type 1 and 2, then drag). Press Ctrl + ↓ and Ctrl + ↑.","Type headings in row 1, then use Freeze Top Row and scroll down.","Select B2 and click Freeze Panes. Scroll right and down. What stays still?","Use View → Split and compare row 1 with row 250."],
  links: [["Keyboard shortcuts in Excel","https://support.microsoft.com/en-us/office/keyboard-shortcuts-in-excel-1798d9d5-842a-42b8-9c99-9b7213f0040f"],["Freeze panes to lock rows and columns","https://support.microsoft.com/en-us/office/freeze-panes-to-lock-rows-and-columns-dab2ffc9-020d-4026-8121-67dd25f2508f"],["Split panes to lock rows or columns in separate areas","https://support.microsoft.com/en-us/office/split-panes-to-lock-rows-or-columns-in-separate-worksheet-areas-516a7001-b3ed-4122-a6bb-fd6d4a9d6434"]],
  quiz: [
    {q:"Which shortcut jumps to the last cell with data in the current column?", o:["Ctrl + ↓","Ctrl + Home","Page Down","Tab"], a:0, e:"Ctrl + Down arrow jumps to the edge of the data."},
    {q:"What does Ctrl + End do?", o:["Goes to the last used cell of the sheet","Closes Excel","Deletes the row","Goes to A1"], a:0, e:"Ctrl + End jumps to the last used cell."},
    {q:"Which key lets you edit the active cell?", o:["F2","F5","F9","F12"], a:0, e:"F2 puts the cell into edit mode."},
    {q:"Which shortcut inserts today's date?", o:["Ctrl + ;","Ctrl + D","Alt + D","Ctrl + T"], a:0, e:"Ctrl + semicolon enters today's date."},
    {q:"Which shortcut is AutoSum?", o:["Alt + =","Ctrl + S","Ctrl + +","Shift + S"], a:0, e:"Alt + = inserts a SUM formula automatically."},
    {q:"Where is Freeze Panes?", o:["View tab → Window group","Home tab → Font","Data tab → Sort","Insert tab → Tables"], a:0, e:"Freeze Panes is in the Window group of the View tab."},
    {q:"You want rows 1–2 and column A to stay visible. Which cell do you select before Freeze Panes?", o:["B3","A1","C2","A3"], a:0, e:"Freeze Panes freezes everything above and to the left of the selected cell."},
    {q:"Can you freeze rows in the middle of a sheet (like rows 50–60)?", o:["No, only at the top and left","Yes, anywhere","Only on Sundays","Only with a password"], a:0, e:"Freezing only works at the top rows and left columns."},
    {q:"What does Split do?", o:["Divides the window into panes that scroll separately","Splits a merged cell","Divides numbers by 2","Splits the workbook into two files"], a:0, e:"Split creates separate scrolling panes of the same sheet."},
    {q:"Can you use Split and Freeze Panes at the same time?", o:["No","Yes","Only in landscape","Only for charts"], a:0, e:"You can't split and freeze panes at the same time."}
  ]
});

/* ============================ DAY 12 ============================ */
LESSONS.push({
  day: 12, week: 3, mins: 40,
  title: "Your first formulas",
  sub: "The five golden rules and the maths operators",
  goals: ["Write formulas that start with =","Use cell references instead of typing numbers","Use + − * / ^ correctly","Understand automatic recalculation and #DIV/0!"],
  sections: [
    { h: "Why formulas?",
      html: `<p>A <b>formula</b> is an instruction that tells Excel to calculate something. The magic is that whenever a number used by the formula changes, <b>Excel recalculates the answer automatically</b>. That's what makes spreadsheets so powerful.</p>` },
    { h: "The five golden rules",
      html: `<ol><li>Every formula starts with an <b>equals sign (=)</b>. Without it, Excel thinks you typed text.</li>
<li>The <b>answer</b> appears in the cell where you typed the formula. (The formula itself shows in the Formula Bar.)</li>
<li>Refer to cells by their <b>address</b>, like A1 or B2, instead of typing the numbers.</li>
<li>The maths symbols are <b>+</b> add, <b>−</b> subtract, <b>*</b> multiply, <b>/</b> divide (and <b>^</b> for powers).</li>
<li>Capital letters don't matter: type <code>=b2*c2</code> and Excel changes it to <code>=B2*C2</code>.</li></ol>`,
      think: `Using =B2*C2 instead of =45*4 is like writing "my age × 12" instead of "14 × 12". Next year the first one is still correct; the second one is out of date.` },
    { h: "Examples",
      html: `<div class="tbl-wrap"><table class="mini"><tr><th>Formula</th><th>Means</th></tr>
<tr><td><code>=A1+A6</code></td><td>Add A1 and A6</td></tr>
<tr><td><code>=A1+A2+A3</code></td><td>Add three cells (SUM is easier for many, Day 15)</td></tr>
<tr><td><code>=A3-A1</code></td><td>Subtract A1 from A3</td></tr>
<tr><td><code>=B2*B3</code></td><td>Multiply B2 by B3</td></tr>
<tr><td><code>=G5/A5</code></td><td>Divide G5 by A5</td></tr>
<tr><td><code>=G5^2</code></td><td>G5 squared (<code>^3</code> would cube it)</td></tr>
<tr><td><code>=(C1+C3)/C4</code></td><td>Add C1 and C3, then divide by C4</td></tr>
<tr><td><code>=4*(A2+A5)+3</code></td><td>Add A2 and A5, multiply by 4, then add 3</td></tr></table></div>
<p>If you see <b>#DIV/0!</b>, you're dividing by zero or by an empty cell, which isn't allowed.</p>
<p>You can type a formula, or type <code>=</code> and then <b>click the cells</b> you want. Excel writes the addresses for you and colours them so you can check.</p>` },
    { h: "Practice sheet",
      html: `<p>This is a live mini-sheet. Type a formula in the box and press <b>Enter</b>. Complete the tasks. A tick appears when your answer is right.</p>`,
      widget: { type: "play", data: [["Item","Price","Qty"],["Notebook",45,4],["Pen",10,6],["Pencil box",120,1],["Eraser",5,3],["Water bottle",250,1]],
        start: "=B2*C2",
        tasks: [
          { t: "Cost of the notebooks (price × quantity)", a: 180, hint: "=B2*C2" },
          { t: "Add up the prices of all five items", a: 430, hint: "=B2+B3+B4+B5+B6" },
          { t: "How much more the water bottle costs than the pencil box", a: 130, hint: "=B6-B4" },
          { t: "Share the water bottle's cost equally among 5 friends", a: 50, hint: "=B6/5" },
          { t: "The pen price squared", a: 100, hint: "=B3^2" }
        ] },
      remember: `= first, cell addresses not numbers, + − * / ^. Change a number and the answer updates by itself.` }
  ],
  terms: [["Formula","An instruction that calculates a result, starting with =."],["Operator","A symbol for a calculation: + − * / ^."],["Cell reference","Using an address like B2 inside a formula."],["Recalculation","Excel updating answers automatically when data changes."],["^ (caret)","Raises to a power: 3^2 = 9."],["#DIV/0!","Error when dividing by zero or an empty cell."]],
  tryit: ["In Excel, type 45 in B2 and 4 in C2, then =B2*C2 in D2.","Change C2 to 10. Did D2 change on its own?","Type =B2/0 somewhere. Which error do you get?","Type b2+c2 (without =). What happens?"],
  links: [["Overview of formulas in Excel","https://support.microsoft.com/en-us/office/overview-of-formulas-in-excel-ecfdc708-9162-49e8-b993-c311f47ca173"],["Use Excel as your calculator","https://support.microsoft.com/en-us/office/use-excel-as-your-calculator-a1abc057-ed11-443a-a635-68216555ad0a"]],
  quiz: [
    {q:"What must every Excel formula start with?", o:["=","+","#","@"], a:0, e:"Formulas always begin with an equals sign."},
    {q:"Which symbol means MULTIPLY in Excel?", o:["*","x","×","#"], a:0, e:"Excel uses the asterisk * for multiplication."},
    {q:"Which symbol means DIVIDE?", o:["/","\\","÷",":"], a:0, e:"The forward slash / divides."},
    {q:"What does =G5^2 do?", o:["Squares the value in G5","Doubles G5","Divides G5 by 2","Adds 2 to G5"], a:0, e:"^ raises to a power; ^2 means squared."},
    {q:"Why use =B2*C2 instead of =45*4?", o:["The answer updates when B2 or C2 changes","It's shorter","It looks nicer","Excel can't multiply numbers"], a:0, e:"Cell references keep formulas up to date automatically."},
    {q:"What does the error #DIV/0! mean?", o:["You divided by zero or an empty cell","The file is broken","The text is too long","You typed a date"], a:0, e:"Dividing by zero (or an empty cell) gives #DIV/0!."},
    {q:"You type b2+c2 without =. What does Excel do?", o:["Treats it as plain text","Calculates the answer","Shows #VALUE!","Deletes the cell"], a:0, e:"Without = Excel sees text, not a formula."},
    {q:"Where does the answer to a formula appear?", o:["In the cell where you typed the formula","In cell A1","In the Status Bar only","In a pop-up window"], a:0, e:"The result shows in the formula's own cell."},
    {q:"What does =(C1+C3)/C4 do?", o:["Adds C1 and C3, then divides by C4","Divides C3 by C4, then adds C1","Multiplies everything","Adds all three cells"], a:0, e:"Brackets are calculated first, then the division."},
    {q:"Do you need capital letters in cell references?", o:["No, Excel capitalises them for you","Yes, or the formula fails","Only for column A","Only in the first cell"], a:0, e:"Excel automatically capitalises references."}
  ]
});

/* ============================ DAY 13 ============================ */
LESSONS.push({
  day: 13, week: 3, mins: 45,
  title: "Order of operations & copying formulas",
  sub: "PEMDAS / BODMAS and how references move when copied",
  goals: ["Apply the order of operations correctly","Use brackets to control the order","Copy formulas with Ctrl + C / Ctrl + V and the Fill Handle","Predict how references change when a formula is copied"],
  sections: [
    { h: "Which part goes first?",
      html: `<p>What is <code>4+2*3</code>? If you work left to right you get 18, but Excel says <b>10</b>. Excel follows the mathematical <b>order of operations</b>, which you may know as <b>BODMAS</b> or <b>PEMDAS</b> ("Please Excuse My Dear Aunt Sally"):</p>
<ol><li><b>P</b>arentheses (brackets) first</li><li><b>E</b>xponents (powers, ^)</li><li><b>M</b>ultiplication and <b>D</b>ivision, together, from left to right</li><li><b>A</b>ddition and <b>S</b>ubtraction, together, from left to right</li></ol>
<p>Careful: multiplication doesn't always come before division, and addition doesn't always come before subtraction. Each pair is done in <b>the same pass</b>, left to right.</p>`,
      diagram: "pemdas" },
    { h: "Worked examples from the handbook",
      html: `<p><b><code>(2*4)+3^2-8/4</code></b></p>
<ol><li>Brackets: 2*4 = 8 → 8+3^2−8/4</li><li>Exponents: 3^2 = 9 → 8+9−8/4</li><li>Multiply/divide: 8/4 = 2 → 8+9−2</li><li>Add/subtract: <b>15</b></li></ol>
<p><b><code>3^(6/3)+(3*3)-2*(6-3)</code></b></p>
<ol><li>Brackets: 6/3 = 2, 3*3 = 9, 6−3 = 3 → 3^2+9−2*3</li><li>Exponents: 3^2 = 9 → 9+9−2*3</li><li>Multiply: 2*3 = 6 → 9+9−6</li><li>Add/subtract: <b>12</b></li></ol>
<p>Now try the step-by-step solver. Type any calculation and press <b>Next step</b> to see Excel's order.</p>`,
      widget: { type: "steps", start: "3^(6/3)+(3*3)-2*(6-3)" },
      note: `Excel quirk: a minus sign at the start is applied <i>before</i> powers, so <code>=-2^2</code> gives <b>4</b> in Excel (not −4). Use brackets, <code>=-(2^2)</code>, if you mean −4.` },
    { h: "Copying formulas",
      html: `<p>Copy a formula like any cell: <b>Ctrl + C</b>, click the destination, <b>Ctrl + V</b> (press Enter or Esc afterwards to remove the marching ants). Or drag the <b>Fill Handle</b>. You only need to copy once; keep pasting into other cells.</p>
<p>Here's the clever part: when you copy <code>=B2*C2</code> one row down, Excel changes it to <code>=B3*C3</code>. The references are <b>relative</b>: they mean "the price two columns to my left times the quantity one column to my left". Edit the formula in D2 below and watch every copy update.</p>`,
      widget: { type: "copy", data: DATA_SHOP, cell: "D2", f: "=B2*C2", rows: 4, presets: ["=B2*C2","=B2*C2*1.18","=(B2+C2)*2"] },
      remember: `Brackets → powers → × ÷ (left to right) → + − (left to right). Copied formulas adjust their references automatically.` }
  ],
  terms: [["Order of operations","The rule for which part of a calculation is done first."],["BODMAS / PEMDAS","Memory aids: Brackets, Orders/Exponents, Division/Multiplication, Addition/Subtraction."],["Parentheses","Brackets ( ) that force a part to be calculated first."],["Exponent","A power, written with ^."],["Relative reference","A reference that changes when the formula is copied."]],
  tryit: ["Work out 10-4/2 in your head, then check with =10-4/2 in Excel.","Add brackets to make it give 3.","Type =B2*C2 in D2 of a shop list and drag it down. Click D5: what does the Formula Bar show?"],
  links: [["Calculation operators and precedence in Excel","https://support.microsoft.com/en-us/office/calculation-operators-and-precedence-in-excel-48be406d-4975-4d31-b2b8-7af9e0e2878a"],["Move or copy a formula","https://support.microsoft.com/en-us/office/move-or-copy-a-formula-1f5cf825-9b07-41b1-8719-bf88b07450c6"]],
  quiz: [
    {q:"What is the result of =4+2*3?", o:["10","18","24","9"], a:0, e:"Multiplication first: 2*3 = 6, then 4+6 = 10."},
    {q:"What is calculated FIRST in a formula?", o:["Anything inside brackets","Addition","Subtraction","The leftmost number"], a:0, e:"Parentheses (brackets) always come first."},
    {q:"What is the result of =(2*4)+3^2-8/4?", o:["15","13","17","11"], a:0, e:"8 + 9 − 2 = 15."},
    {q:"Multiplication and division are done…", o:["In the same pass, from left to right","Multiplication always first","Division always first","Last of all"], a:0, e:"They share a step and go left to right."},
    {q:"What is the result of =10-4/2?", o:["8","3","2","6"], a:0, e:"4/2 = 2 first, then 10 − 2 = 8."},
    {q:"Which formula gives 3?", o:["=(10-4)/2","=10-4/2","=10-(4/2)","=10/2-4"], a:0, e:"Brackets make the subtraction happen first: 6/2 = 3."},
    {q:"What does =3^(6/3)+(3*3)-2*(6-3) equal?", o:["12","18","15","9"], a:0, e:"9 + 9 − 6 = 12."},
    {q:"D2 contains =B2*C2. You copy it to D3. What does D3 contain?", o:["=B3*C3","=B2*C2","=B3*C2","=C3*D3"], a:0, e:"Relative references move down one row with the formula."},
    {q:"In Excel, what does =-2^2 give?", o:["4","-4","0","#VALUE!"], a:0, e:"Excel applies the leading minus before the power, giving 4."},
    {q:"What does the memory phrase 'Please Excuse My Dear Aunt Sally' stand for?", o:["Parentheses, Exponents, Multiplication, Division, Addition, Subtraction","Paste, Edit, Move, Delete, Add, Save","Print, Export, Merge, Draw, Align, Sort","Page, Excel, Macro, Data, Area, Sheet"], a:0, e:"PEMDAS: the order of operations."}
  ]
});

/* ============================ DAY 14 ============================ */
LESSONS.push({
  day: 14, week: 3, mins: 40,
  title: "Formula mistakes & error values",
  sub: "Avoid common errors and decode #N/A, #VALUE! and friends",
  goals: ["Avoid the most common formula-writing mistakes","Recognise Excel's error values","Know what causes each error and how to fix it"],
  sections: [
    { h: "Mistakes to avoid",
      html: `<div class="tbl-wrap"><table class="mini"><tr><th>Make sure you…</th><th>Why</th></tr>
<tr><td>Match all opening and closing brackets</td><td>Every ( needs a ). Excel colours bracket pairs as you type to help you.</td></tr>
<tr><td>Use a colon for ranges</td><td><code>A1:A5</code> means A1 to A5. A comma means separate items.</td></tr>
<tr><td>Enter all required arguments</td><td>Some functions need certain inputs. Don't give too many either.</td></tr>
<tr><td>Nest no more than 64 functions</td><td>Excel allows up to 64 levels of functions inside functions.</td></tr>
<tr><td>Put other sheet names with spaces in single quotes</td><td><code>='Term 1'!B2</code>. Names with spaces or symbols need ' '.</td></tr>
<tr><td>Type numbers without formatting</td><td>Type <code>1000</code>, not <code>₹1,000</code> or <code>1,000</code>, inside formulas.</td></tr></table></div>` },
    { h: "Excel's error values",
      html: `<p>When a formula can't produce an answer, Excel shows an <b>error value</b> starting with #. Each one is a clue:</p>
<div class="tbl-wrap"><table class="mini"><tr><th>Error</th><th>Meaning</th><th>Typical fix</th></tr>
<tr><td><b>#DIV/0!</b></td><td>Dividing by zero or by an empty cell</td><td>Check the divisor; use IF or IFERROR</td></tr>
<tr><td><b>#NAME?</b></td><td>Excel doesn't recognise a name: misspelt function (=SUMM) or text without quotes</td><td>Fix the spelling; put text in "quotes"</td></tr>
<tr><td><b>#N/A</b></td><td>A value is <i>not available</i>, usually a lookup that found no match</td><td>Check the lookup value (Day 27)</td></tr>
<tr><td><b>#VALUE!</b></td><td>Wrong type of value, like multiplying text ("absent"*2)</td><td>Make sure cells contain numbers</td></tr>
<tr><td><b>#REF!</b></td><td>The formula refers to a cell that no longer exists (it was deleted)</td><td>Undo the delete or rewrite the reference</td></tr>
<tr><td><b>#NUM!</b></td><td>A problem with a number, like the square root of a negative</td><td>Check the inputs</td></tr>
<tr><td><b>#NULL!</b></td><td>Two ranges that don't intersect, often a space instead of a comma or colon</td><td>Use , or : correctly</td></tr>
<tr><td><b>#####</b></td><td>Not an error: the column is too narrow (or a negative date)</td><td>Widen the column</td></tr></table></div>`,
      figs: [["079-292","The handbook's table of Excel error values and their explanations."]] },
    { h: "Make (and fix) some errors",
      html: `<p>The best way to understand errors is to cause them on purpose. Use this practice sheet: some tasks ask for a correct result, others ask you to <b>produce</b> a specific error.</p>`,
      widget: { type: "play", data: [["Student","Marks","Out of"],["Aarav",42,50],["Diya",38,null],["Kabir","absent",50],["Meera",47,50]],
        start: "=B2/C2*100",
        tasks: [
          { t: "Aarav's percentage (marks ÷ out of × 100)", a: 84, hint: "=B2/C2*100" },
          { t: "Try Diya's percentage. Which error appears?", a: "#DIV/0!", hint: "=B3/C3*100" },
          { t: "Double Kabir's marks. Which error appears?", a: "#VALUE!", hint: "=B4*2" },
          { t: "Misspell SUM, e.g. total the marks with SUMM", a: "#NAME?", hint: "=SUMM(B2:B5)" },
          { t: "Meera's percentage", a: 94, hint: "=B5/C5*100" }
        ] },
      think: `Error values are like the warning lights on a car dashboard. Each light means something different, and once you know the code, the fix is usually quick.`,
      remember: `#DIV/0! divide by zero · #NAME? misspelt name · #N/A no match · #VALUE! wrong type · #REF! deleted cell · ##### column too narrow.` }
  ],
  terms: [["Error value","A code like #VALUE! shown when a formula can't calculate."],["Argument","An input given to a function inside its brackets."],["Nesting","Putting a function inside another function."],["#NAME?","Excel doesn't recognise a name or function."],["#REF!","The formula refers to a cell that no longer exists."],["#N/A","A value is not available (e.g. lookup not found)."]],
  tryit: ["In Excel, type =SUM(A1:A3 and press Enter. How does Excel help with the missing bracket?","Put 5 in A1 and =A1*2 in B1. Now delete column A. What does B1 (now A1) show?","Type =\"hello\"*2. Which error appears?"],
  links: [["How to avoid broken formulas","https://support.microsoft.com/en-us/office/how-to-avoid-broken-formulas-8309381d-33e8-42f6-b889-84ef6df1d586"],["Detect errors in formulas","https://support.microsoft.com/en-us/office/detect-errors-in-formulas-3a8acca5-1d61-4702-80e0-99a36a2822c1"]],
  quiz: [
    {q:"Which error appears when you divide by zero?", o:["#DIV/0!","#N/A","#REF!","#NAME?"], a:0, e:"#DIV/0! means division by zero or an empty cell."},
    {q:"You typed =SUMM(A1:A5). Which error appears?", o:["#NAME?","#VALUE!","#NULL!","#NUM!"], a:0, e:"Excel doesn't recognise SUMM, so it shows #NAME?."},
    {q:"What does #N/A usually mean?", o:["A value is not available, e.g. a lookup found no match","The number is too big","The sheet is protected","The column is too narrow"], a:0, e:"#N/A = not available, common with VLOOKUP."},
    {q:"=\"absent\"*2 gives which error?", o:["#VALUE!","#DIV/0!","#REF!","#####"], a:0, e:"You can't multiply text, so it's #VALUE!."},
    {q:"Which error appears when a referenced cell has been deleted?", o:["#REF!","#N/A","#NAME?","#NUM!"], a:0, e:"#REF! means an invalid reference."},
    {q:"A cell shows #####. What should you do?", o:["Widen the column","Delete the formula","Restart Excel","Change the sheet name"], a:0, e:"##### only means the column is too narrow."},
    {q:"How should you type one thousand inside a formula?", o:["1000","1,000","₹1,000","one thousand"], a:0, e:"Type numbers without formatting in formulas."},
    {q:"A sheet is named Term 1. How do you refer to its cell B2?", o:["='Term 1'!B2","=Term 1!B2","=Term 1.B2","=[Term 1]B2"], a:0, e:"Sheet names with spaces go inside single quotes."},
    {q:"How many levels of functions can be nested?", o:["64","7","3","Unlimited"], a:0, e:"Excel allows up to 64 nested levels."},
    {q:"Which symbol should separate the first and last cell of a range?", o:["Colon (:)","Space","Semicolon (;) only","Hash (#)"], a:0, e:"Use a colon, like A1:A5. A stray space can cause #NULL!."}
  ]
});

/* ============================ DAY 15 ============================ */
LESSONS.push({
  day: 15, week: 3, mins: 40,
  title: "SUM & AutoSum",
  sub: "Your first function",
  goals: ["Understand what a function is","Write SUM with ranges, cells and numbers","Use AutoSum (Alt + =)","Combine SUM with other maths"],
  sections: [
    { h: "What is a function?",
      html: `<p>A <b>function</b> is a ready-made formula with a name. Instead of writing <code>=B2+B3+B4+B5+B6+B7</code>, you write <code>=SUM(B2:B7)</code>. Functions save typing and mistakes, especially with long columns.</p>
<p>Every function has the same shape: <code>=NAME(arguments)</code>. The <b>arguments</b> are the inputs, separated by commas.</p>` },
    { h: "The SUM function",
      html: `<p><b>Syntax:</b> <code>SUM(number1, number2, number3, …)</code>. You can give from 1 to 255 arguments, and each can be a number, a cell, a range, a formula or another function. SUM ignores text and empty cells.</p>
<div class="tbl-wrap"><table class="mini"><tr><th>Example</th><th>Result</th></tr>
<tr><td><code>=SUM(2,1,3)</code></td><td>6</td></tr>
<tr><td><code>=SUM(B6:M6,R6)</code></td><td>B6 through M6, plus R6</td></tr>
<tr><td><code>=SUM(A2:A23)/150</code></td><td>The total of A2:A23 divided by 150</td></tr>
<tr><td><code>=10*SUM(A1:D1)</code></td><td>The total of A1:D1 multiplied by 10</td></tr>
<tr><td><code>=SUM(A2:A14,C4:C29)</code></td><td>Two separate ranges added together</td></tr>
<tr><td><code>=SUM(6/3,4*2,33)</code></td><td>2 + 8 + 33 = 43</td></tr></table></div>` },
    { h: "AutoSum: one click",
      html: `<p>Click the cell just <b>below</b> a column of numbers (or to the right of a row) and press <b>Alt + =</b>, or click <b>Home → Editing → AutoSum (Σ)</b>. Excel guesses the range, shows it with a moving border, and you press Enter.</p>
<p>The little arrow next to AutoSum also offers Average, Count Numbers, Max and Min.</p>
<p>Always check the guessed range. If there's a gap in your data, Excel might stop too early.</p>`,
      think: `SUM is like a cashier's till: scan everything in the basket (the range) and it tells you the total, ignoring anything that isn't a price.` },
    { h: "Practice with class marks",
      html: `<p>Use SUM for each task. Remember the colon for ranges and commas between separate items.</p>`,
      widget: { type: "play", data: DATA_MARKS, start: "=SUM(B2:B7)",
        tasks: [
          { t: "Total of all Maths marks", a: 464, hint: "=SUM(B2:B7)", must: ["SUM"] },
          { t: "Aarav's total across all three subjects", a: 232, hint: "=SUM(B2:D2)", must: ["SUM"] },
          { t: "Grand total of every mark in the table", a: 1400, hint: "=SUM(B2:D7)", must: ["SUM"] },
          { t: "Maths plus Science totals using two ranges in one SUM", a: 943, hint: "=SUM(B2:B7,C2:C7)", must: ["SUM", ","] },
          { t: "The handbook example =SUM(6/3,4*2,33)", a: 43, hint: "=SUM(6/3,4*2,33)", must: ["SUM"] }
        ] },
      remember: `=SUM(first:last). Commas separate items. Alt + = is AutoSum. SUM ignores text.` }
  ],
  terms: [["Function","A named, ready-made formula like SUM."],["Syntax","The correct way to write a function."],["Argument","An input inside the function's brackets."],["SUM","Adds numbers, cells and ranges."],["AutoSum","Inserts a SUM automatically (Alt + =)."]],
  tryit: ["Type 10 numbers in A1:A10 and use AutoSum below them.","Write =SUM(A1:A5,A8) and check the answer by hand.","Type a word in A3. Does SUM give an error?"],
  links: [["SUM function","https://support.microsoft.com/en-us/office/sum-function-043e1c7d-7726-4e80-8f32-07b23e057f89"],["Use AutoSum to sum numbers","https://support.microsoft.com/en-us/office/use-autosum-to-sum-numbers-543941e7-e783-44ef-8317-7d1bb85fe706"]],
  quiz: [
    {q:"What does =SUM(2,1,3) return?", o:["6","213","3","1"], a:0, e:"2 + 1 + 3 = 6."},
    {q:"What is the shortcut for AutoSum?", o:["Alt + =","Ctrl + S","Ctrl + =","Shift + +"], a:0, e:"Alt + = inserts AutoSum."},
    {q:"What does =SUM(A2:A14,C4:C29) add?", o:["Two separate ranges together","Only A2 and C29","Only A14","Every cell from A2 to C29 including column B"], a:0, e:"The comma separates two ranges; both are added."},
    {q:"What does =SUM(6/3,4*2,33) return?", o:["43","39","6","56"], a:0, e:"2 + 8 + 33 = 43."},
    {q:"How many arguments can SUM take?", o:["Up to 255","Only 2","Exactly 10","Only 1"], a:0, e:"SUM accepts 1 to 255 arguments."},
    {q:"What does SUM do with a cell containing text?", o:["Ignores it","Shows #VALUE!","Counts it as 1","Stops adding"], a:0, e:"SUM skips text in ranges."},
    {q:"What does =10*SUM(A1:D1) do?", o:["Adds A1 to D1, then multiplies by 10","Multiplies each cell by 10 and stops","Adds 10 to the total","Counts 10 cells"], a:0, e:"The SUM is calculated, then multiplied by 10."},
    {q:"Which is the correct SUM for B2 through B7?", o:["=SUM(B2:B7)","=SUM(B2-B7)","=SUM(B2;B7)","=SUM[B2:B7]"], a:0, e:"Ranges use a colon inside round brackets."},
    {q:"Where is the AutoSum button?", o:["Home → Editing (and Formulas tab)","View → Zoom","Review → Comments","Page Layout → Margins"], a:0, e:"AutoSum (Σ) is in the Editing group of Home and on the Formulas tab."},
    {q:"Besides Sum, what else does the AutoSum drop-down offer?", o:["Average, Count Numbers, Max, Min","Bold, Italic, Underline","Cut, Copy, Paste","Print, Save, Close"], a:0, e:"AutoSum's list includes Average, Count Numbers, Max and Min."}
  ]
});

/* ============================ DAY 16 ============================ */
LESSONS.push({
  day: 16, week: 4, mins: 40,
  title: "AVERAGE, MAX & MIN",
  sub: "The mean, the highest and the lowest",
  goals: ["Calculate an average (mean) with AVERAGE","Find the highest value with MAX","Find the lowest value with MIN","Mix ranges, cells and numbers as arguments"],
  sections: [
    { h: "AVERAGE",
      html: `<p>The <b>average</b> (or <b>mean</b>) is the total divided by how many numbers there are. <code>AVERAGE(number1, number2, …)</code> does both steps for you.</p>
<ul><li><code>=AVERAGE(4,5,2)</code> → 11 ÷ 3 = 3.6666… (shows <b>3.67</b> with 2 decimal places)</li>
<li><code>=AVERAGE(C1,C4)</code> → two separate cells</li>
<li><code>=AVERAGE(C1:C3)</code> → a range</li>
<li><code>=AVERAGE(C1:C2,5)</code> → a range plus a number</li></ul>
<p>Averages often have long decimals, so format the cell to show 1 or 2 decimal places. AVERAGE <b>ignores empty cells and text</b>, but a <b>0</b> is a real number and <b>does</b> count.</p>` },
    { h: "MAX and MIN",
      html: `<p><code>MAX(number1, …)</code> finds the <b>largest</b> value; <code>MIN(number1, …)</code> finds the <b>smallest</b>. Both accept up to 255 arguments.</p>
<ul><li><code>=MAX(A1:A5,500)</code> → the biggest of A1:A5 and 500</li>
<li><code>=MAX(A1:B5)</code> → the biggest in a 2-column block</li>
<li><code>=MIN(B1:B5,100)</code> → the smallest of B1:B5 and 100</li>
<li><code>=MIN(A1,B1,A5,B5)</code> → the smallest of four specific cells</li></ul>`,
      figs: [["032-124","Examples of MAX: the answers 755, 900, 923 and 502 come from the grid on the left."],["033-127","Examples of MIN: the results 20, 65, 10 and 89."]] },
    { h: "Practice",
      html: `<p>Class marks again. Tip: the answers with decimals are checked to 2 decimal places.</p>`,
      widget: { type: "play", data: DATA_MARKS, start: "=AVERAGE(B2:B7)",
        tasks: [
          { t: "Average Maths mark", a: 77.3333, hint: "=AVERAGE(B2:B7)", must: ["AVERAGE"] },
          { t: "Highest Science mark", a: 94, hint: "=MAX(C2:C7)", must: ["MAX"] },
          { t: "Lowest English mark", a: 58, hint: "=MIN(D2:D7)", must: ["MIN"] },
          { t: "Diya's average across her three subjects", a: 91.6667, hint: "=AVERAGE(B3:D3)", must: ["AVERAGE"] },
          { t: "The lowest mark anywhere in the table", a: 55, hint: "=MIN(B2:D7)", must: ["MIN"] },
          { t: "The larger of the top Maths mark and 90 (use MAX with a number)", a: 92, hint: "=MAX(B2:B7,90)", must: ["MAX", ","] }
        ] },
      think: `MAX and MIN are like finding the tallest and shortest students in a line. AVERAGE is like everyone standing on a ruler to find the "typical" height.`,
      remember: `AVERAGE = total ÷ count (ignores blanks, counts zeros). MAX = largest. MIN = smallest. All take ranges, cells and numbers.` }
  ],
  terms: [["AVERAGE","Returns the mean of the numbers."],["Mean","Total divided by the number of values."],["MAX","Returns the largest value."],["MIN","Returns the smallest value."],["Decimal places","How many digits show after the decimal point."]],
  tryit: ["Type five test scores and find their AVERAGE, MAX and MIN.","Leave one score blank, then type 0 instead. How does the average change?","Use Increase/Decrease Decimal (Home → Number) on the average."],
  links: [["AVERAGE function","https://support.microsoft.com/en-us/office/average-function-047bac88-d466-426c-a32b-8f33eb960cf6"],["MAX function","https://support.microsoft.com/en-us/office/max-function-e0012414-9ac8-4b34-9a47-73e662c08098"],["MIN function","https://support.microsoft.com/en-us/office/min-function-61635d12-920f-4ce2-a70f-96f202dcc152"]],
  quiz: [
    {q:"What does =AVERAGE(4,5,2) return (to 2 decimal places)?", o:["3.67","11","3.00","5"], a:0, e:"11 ÷ 3 = 3.666…, shown as 3.67."},
    {q:"The mean of a group of numbers is…", o:["The total divided by how many numbers there are","The biggest number","The middle letter","The first number"], a:0, e:"Mean = sum ÷ count."},
    {q:"Which function returns the largest value?", o:["MAX","MIN","TOP","BIG"], a:0, e:"MAX returns the largest value."},
    {q:"Which function returns the smallest value?", o:["MIN","SMALLEST","LOW","AVERAGE"], a:0, e:"MIN returns the smallest value."},
    {q:"=MAX(A1:A5,900) when all of A1:A5 are below 900 returns…", o:["900","The largest cell value","0","#VALUE!"], a:0, e:"900 is bigger than everything in the range."},
    {q:"Does AVERAGE count empty cells?", o:["No, it ignores them","Yes, as zero","Yes, as one","It shows an error"], a:0, e:"Blank cells are ignored by AVERAGE."},
    {q:"Does AVERAGE count cells containing 0?", o:["Yes, 0 is a number","No, never","Only if bold","Only in column A"], a:0, e:"Zero is a real value and lowers the average."},
    {q:"What does =MIN(A1,B1,A5,B5) look at?", o:["Only those four cells","The whole range A1:B5","Only A1","Row 1 only"], a:0, e:"It compares exactly the four cells listed."},
    {q:"=AVERAGE(C1:C2,5) with C1 = 3 and C2 = 4 gives…", o:["4","3.5","12","5"], a:0, e:"(3 + 4 + 5) ÷ 3 = 4."},
    {q:"How many arguments can MAX and MIN take?", o:["Up to 255","Only 1","Only 2","Exactly 5"], a:0, e:"Like SUM, they accept up to 255 arguments."}
  ]
});

/* ============================ DAY 17 ============================ */
LESSONS.push({
  day: 17, week: 4, mins: 50,
  title: "Cell references & named ranges",
  sub: "Relative, absolute, mixed, the F4 key and names",
  goals: ["Explain relative, absolute and mixed references","Use $ and the F4 key","Fix a formula that breaks when copied","Create and use a named range"],
  sections: [
    { h: "Three kinds of reference",
      html: `<ul><li><b>Relative</b> (<code>A4</code>): changes when copied. Think of it as a direction: "two cells to my left". Copied elsewhere, it still means "two cells to my left" from the new position.</li>
<li><b>Absolute</b> (<code>$A$4</code>): never changes. It always points to exactly A4, wherever you copy it.</li>
<li><b>Mixed</b> (<code>A$4</code> or <code>$A4</code>): half and half. The part with <b>$</b> is locked; the other part moves.</li></ul>
<p>The <b>$</b> sign is the lock. You can type it, or put the cursor on a reference while editing and press <b>F4</b> to cycle through the four versions. Try it:</p>`,
      widget: { type: "refs" },
      figs: [["059-219","Relative, absolute and mixed references for a single cell and for a range."]] },
    { h: "When copying breaks a formula",
      html: `<p>Here's the classic problem. GST is 18%, stored once in <b>E2</b>. In C2 we write <code>=B2*E2</code> and copy it down… but in C3 it becomes <code>=B3*E3</code>, and E3 is empty, so the answer is 0!</p>
<p>The fix: lock the rate with <code>=B2*$E$2</code>. Try both presets below and watch the copied rows.</p>`,
      widget: { type: "copy", data: [["Item","Price","GST amount",null,"GST rate"],["Notebook",45,null,null,0.18],["Pen",10],["Bag",650],["Bottle",250]], cell: "C2", f: "=B2*E2", rows: 4, presets: ["=B2*E2","=B2*$E$2","=B2*E$2"] },
      think: `A relative reference is like saying "the house next door". An absolute reference is like a full postal address: it points to the same house no matter where you say it from.` },
    { h: "Named ranges",
      html: `<p>Instead of an address, you can give a cell or range a <b>name</b>. <code>=SUM(B2:B13)</code> becomes the much clearer <code>=SUM(SalesValue)</code>.</p>
<p><b>To define a name:</b></p>
<ol><li>Select the range (e.g. B2:B13).</li><li>Formulas tab → Defined Names → <b>Define Name</b>.</li><li>Type the name; choose the <b>Scope</b>: <i>Workbook</i> (usable on every sheet) or one sheet.</li><li>Check <b>Refers to</b> and click OK.</li></ol>
<p>Quick way: select the range, click in the <b>Name Box</b>, type the name and press Enter.</p>
<p><b>Rules:</b> one word (use an underscore: <code>Total_Income</code>), can mix letters and numbers but can't start with a number, and can't look like a cell address (e.g. "AB12"). Names are absolute by default and workbook-level unless you choose otherwise. Manage them later with <b>Name Manager</b> (Ctrl + F3).</p>`,
      figs: [["061-226","The New Name box: name SalesValue, scope Workbook, refers to =Sheet1!$B$2:$B$13."],["061-227","Name Manager lists your names so you can edit or delete them."]] },
    { h: "Practice with names",
      html: `<p>In this sheet the range B2:B13 is already named <b>SalesValue</b>. Use the name in your formulas.</p>`,
      widget: { type: "play", data: [["Month","Sales"],["Jan",12500],["Feb",11800],["Mar",14250],["Apr",9800],["May",10500],["Jun",13200],["Jul",15600],["Aug",14900],["Sep",12100],["Oct",16800],["Nov",17500],["Dec",19200]],
        names: { SalesValue: "B2:B13" }, start: "=SUM(SalesValue)",
        tasks: [
          { t: "Total sales for the year, using the name", a: 168150, hint: "=SUM(SalesValue)", must: ["SalesValue"] },
          { t: "Best month's sales, using the name", a: 19200, hint: "=MAX(SalesValue)", must: ["SalesValue"] },
          { t: "Average monthly sales, using the name", a: 14012.5, hint: "=AVERAGE(SalesValue)", must: ["SalesValue"] },
          { t: "December sales as a share of the year (Dec ÷ total)", a: 0.1142, hint: "=B13/SUM(SalesValue)", must: ["SalesValue"] }
        ] },
      remember: `A4 moves, $A$4 is locked, A$4/$A4 lock one part. F4 cycles them. Names make formulas readable: =SUM(SalesValue).` }
  ],
  terms: [["Relative reference","Changes when the formula is copied (A4)."],["Absolute reference","Stays fixed when copied ($A$4)."],["Mixed reference","Locks only the row or the column (A$4, $A4)."],["F4","Cycles a reference through its $ versions."],["Named range","A meaningful name given to a cell or range."],["Scope","Where a name can be used: workbook or one sheet."],["Name Manager","Tool to view, edit and delete names (Ctrl + F3)."]],
  tryit: ["Put a tax rate in F1 and prices in B2:B6. Write =B2*F1 in C2 and copy down. What goes wrong?","Fix it with $F$1 using F4.","Name F1 as Rate and rewrite the formula as =B2*Rate.","Open Name Manager and look at your name."],
  links: [["Switch between relative, absolute, and mixed references","https://support.microsoft.com/en-us/office/switch-between-relative-absolute-and-mixed-references-dfec08cd-ae65-4f56-839e-5f0d8d0baca9"],["Define and use names in formulas","https://support.microsoft.com/en-us/office/define-and-use-names-in-formulas-4d0f13ac-53b7-422e-afd2-abd7ff379c64"]],
  quiz: [
    {q:"Which reference stays exactly the same when copied?", o:["$A$4","A4","A$4","$A4"], a:0, e:"Both parts are locked in $A$4."},
    {q:"What does the $ sign do in a reference?", o:["Locks the column or row that follows it","Formats it as money","Deletes the cell","Makes it bold"], a:0, e:"$ locks the part it's in front of."},
    {q:"Which key cycles A4 → $A$4 → A$4 → $A4?", o:["F4","F2","F9","F11"], a:0, e:"F4 toggles through the reference types."},
    {q:"In A$4, what is locked?", o:["The row (4)","The column (A)","Both","Neither"], a:0, e:"The $ is before 4, so the row is locked."},
    {q:"=B2*E2 copied from C2 to C3 becomes…", o:["=B3*E3","=B2*E2","=B3*E2","=C3*F3"], a:0, e:"Both references are relative, so both move down one row."},
    {q:"How do you keep the GST rate in E2 fixed when copying =B2*E2 down?", o:["Change it to =B2*$E$2","Change it to =$B$2*E2","Type the rate as text","Merge E2 and E3"], a:0, e:"Lock the rate cell with $E$2."},
    {q:"Which is a valid range name?", o:["Total_Income","Total Income","2025Sales","AB12"], a:0, e:"No spaces, not starting with a number, not a cell address."},
    {q:"Where is Define Name?", o:["Formulas tab → Defined Names","Home tab → Font","Data tab → Filter","View tab → Zoom"], a:0, e:"Formulas → Defined Names → Define Name."},
    {q:"What is a quick way to name a selected range?", o:["Type the name in the Name Box and press Enter","Double-click the sheet tab","Press Ctrl + N","Right-click the Status Bar"], a:0, e:"The Name Box can create names instantly."},
    {q:"By default, a new name's scope is…", o:["The whole workbook","Only cell A1","Only the current row","Another workbook"], a:0, e:"Names are workbook-level by default."}
  ]
});

/* ============================ DAY 18 ============================ */
LESSONS.push({
  day: 18, week: 4, mins: 45,
  title: "COUNT & COUNTIF",
  sub: "Counting numbers, filled cells and cells that match",
  goals: ["Count numeric cells with COUNT","Count non-empty and empty cells with COUNTA and COUNTBLANK","Count cells that meet a condition with COUNTIF","Use comparison operators inside quotes"],
  sections: [
    { h: "COUNT",
      html: `<p><code>COUNT(value1, [value2], …)</code> counts how many cells contain <b>numbers</b>. value1 is required; value2… are optional (up to 255 in total).</p>
<ul><li><code>=COUNT(5,10,15)</code> → 3</li><li><code>=COUNT(A1:A5)</code> → how many of A1:A5 hold numbers</li><li><code>=COUNT(A1:A5,10)</code> → that count, plus 1 for the number 10</li><li><code>=COUNT(A1:A5,B1:B5)</code> → numbers across two ranges</li></ul>
<p>Dates count as numbers (Excel stores dates as numbers behind the scenes). Text, blanks and errors don't count.</p>`,
      figs: [["034-130","COUNT examples: COUNT(A1:A5) = 3, COUNT(A1:A5,10) = 4, COUNT(A1:A5,B1:B5) = 5."]] },
    { h: "COUNTA and COUNTBLANK",
      html: `<ul><li><code>COUNTA(range)</code> counts cells that are <b>not empty</b>: numbers, text, anything. Great for "how many students are on the list?".</li>
<li><code>COUNTBLANK(range)</code> counts <b>empty</b> cells. Great for "how many marks are still missing?".</li></ul>` },
    { h: "COUNTIF: count with a condition",
      html: `<p><code>COUNTIF(range, criteria)</code> counts the cells in <b>range</b> that meet the <b>criteria</b>. The default test is "equals".</p>
<ul><li><code>=COUNTIF(B1:B9,4)</code> → cells equal to 4</li>
<li><code>=COUNTIF(B1:B9,A1)</code> → cells equal to whatever is in A1</li>
<li><code>=COUNTIF(B1:B9,"yes")</code> → cells containing yes. <b>Text must be in quotes.</b> (Upper/lower case doesn't matter.)</li></ul>
<p>Other comparison operators, which <b>must be in quotation marks</b>:</p>
<div class="tbl-wrap"><table class="mini"><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr>
<tr><td>&gt;</td><td>greater than</td><td><code>=COUNTIF(C2:C9,"&gt;10")</code></td></tr>
<tr><td>&lt;</td><td>less than</td><td><code>=COUNTIF(C2:C9,"&lt;10")</code></td></tr>
<tr><td>&gt;=</td><td>greater than or equal to</td><td><code>=COUNTIF(C2:C9,"&gt;=10")</code></td></tr>
<tr><td>&lt;=</td><td>less than or equal to</td><td><code>=COUNTIF(C2:C9,"&lt;=10")</code></td></tr>
<tr><td>&lt;&gt;</td><td>not equal to</td><td><code>=COUNTIF(B2:B9,"&lt;&gt;Red")</code></td></tr></table></div>` },
    { h: "Practice: sports day",
      html: `<p>Some cells are empty and one student was absent. Watch how each function treats them.</p>`,
      widget: { type: "play", data: [["Name","House","Points","Medal"],["Aarav","Red",12,"yes"],["Diya","Blue",8,"no"],["Kabir","Green",null,"no"],["Meera","Red",15,"yes"],["Rohan","Yellow","absent","no"],["Sara","Blue",10,"yes"],["Ishaan","Red",6,"no"],["Tara",null,9,"no"]],
        start: "=COUNT(C2:C9)",
        tasks: [
          { t: "How many Points cells contain numbers?", a: 6, hint: "=COUNT(C2:C9)", must: ["COUNT("] },
          { t: "How many names are in the list?", a: 8, hint: "=COUNTA(A2:A9)", must: ["COUNTA"] },
          { t: "How many Points cells are empty?", a: 1, hint: "=COUNTBLANK(C2:C9)", must: ["COUNTBLANK"] },
          { t: "How many students are in Red house?", a: 3, hint: "=COUNTIF(B2:B9,\"Red\")", must: ["COUNTIF", "RED"] },
          { t: "How many scored 10 points or more?", a: 3, hint: "=COUNTIF(C2:C9,\">=10\")", must: ["COUNTIF", ">"] },
          { t: "How many won a medal (yes)?", a: 3, hint: "=COUNTIF(D2:D9,\"yes\")", must: ["COUNTIF", "YES"] }
        ] },
      remember: `COUNT = numbers only. COUNTA = not empty. COUNTBLANK = empty. COUNTIF(range,"criteria"); operators and text go in quotes.` }
  ],
  terms: [["COUNT","Counts cells containing numbers."],["COUNTA","Counts cells that are not empty."],["COUNTBLANK","Counts empty cells."],["COUNTIF","Counts cells that meet one condition."],["Criteria","The condition a cell must meet to be counted."],["Comparison operator","> < >= <= <> used to compare values."]],
  tryit: ["List 10 classmates' houses and count each house with COUNTIF.","Count how many marks are 35 or above (pass).","Count the students with no mark entered yet using COUNTBLANK."],
  links: [["COUNT function","https://support.microsoft.com/en-us/office/count-function-a59cd7fc-b623-4d93-87a4-d23bf411294c"],["COUNTIF function","https://support.microsoft.com/en-us/office/countif-function-e0de10c6-f885-4e71-abb4-1f464816df34"],["COUNTA function","https://support.microsoft.com/en-us/office/counta-function-7dc98875-d5c1-46f1-9a82-53f3219e2509"]],
  quiz: [
    {q:"What does COUNT count?", o:["Cells containing numbers","All non-empty cells","Empty cells","Cells with text only"], a:0, e:"COUNT counts numeric values only."},
    {q:"=COUNT(5,10,15) returns…", o:["3","30","15","1"], a:0, e:"Three numeric arguments → 3."},
    {q:"Which function counts cells that are NOT empty (text or numbers)?", o:["COUNTA","COUNT","COUNTBLANK","SUM"], a:0, e:"COUNTA counts any non-empty cell."},
    {q:"Which function counts EMPTY cells?", o:["COUNTBLANK","COUNTA","COUNTIF","MIN"], a:0, e:"COUNTBLANK counts blanks."},
    {q:"What is the default test in COUNTIF if you give just a value?", o:["Equals","Greater than","Less than","Not equal"], a:0, e:"COUNTIF(range,4) counts cells equal to 4."},
    {q:"Which is correct for counting cells that say yes?", o:["=COUNTIF(B1:B9,\"yes\")","=COUNTIF(B1:B9,yes)","=COUNT(B1:B9,\"yes\")","=COUNTIF(\"yes\",B1:B9)"], a:0, e:"Text criteria must be in quotation marks."},
    {q:"Which counts cells greater than 10?", o:["=COUNTIF(C2:C9,\">10\")","=COUNTIF(C2:C9,>10)","=COUNTIF(>10,C2:C9)","=COUNT(C2:C9>10)"], a:0, e:"Operators go inside quotes with the number."},
    {q:"What does <> mean?", o:["Not equal to","Less than or equal","Greater than","Between"], a:0, e:"<> means not equal to."},
    {q:"Are dates counted by COUNT?", o:["Yes, dates are stored as numbers","No, never","Only this year's dates","Only if bold"], a:0, e:"Excel stores dates as numbers, so COUNT includes them."},
    {q:"Does COUNTIF care about upper or lower case (\"YES\" vs \"yes\")?", o:["No, it's not case-sensitive","Yes, exact case only","Only for the first letter","Only in column A"], a:0, e:"COUNTIF ignores case."}
  ]
});

/* ============================ DAY 19 ============================ */
LESSONS.push({
  day: 19, week: 4, mins: 50,
  title: "COUNTIF: advanced tricks",
  sub: "Cell references with &, wildcards, blanks and percentages",
  goals: ["Combine an operator with a cell reference using &","Use the * and ? wildcards","Count empty, non-empty and non-text cells","Count above-average values and work out percentages"],
  sections: [
    { h: "Operator + cell reference: use &",
      html: `<p>To count cells less than the value <i>in B2</i>, you can't write <code>"&lt;B2"</code>: Excel would look for the text "B2". Instead, keep the operator in quotes and <b>join</b> it to the cell with the <b>&amp;</b> (ampersand, the joining operator):</p>
<p><code>=COUNTIF(B2:B8,"&lt;"&amp;B2)</code></p>
<p>Two rules: (1) the operator is in quotation marks, (2) an <b>&amp;</b> comes before the cell address. The same idea works with functions: <code>"&gt;"&amp;AVERAGE(B2:B8)</code> counts values above the average.</p>`,
      think: `& is like glue. "<" & B2 glues the less-than sign to whatever number is in B2, making "<40".` },
    { h: "Wildcards and blanks",
      html: `<ul><li><b>*</b> means "any number of characters": <code>"A*"</code> = anything starting with A; <code>"*"</code> = any text.</li>
<li><b>?</b> means "exactly one character": <code>"R?m"</code> matches Ram and Rim.</li>
<li><code>"&lt;&gt;*"</code> counts cells that do <b>not contain text</b> (numbers, blanks).</li>
<li><code>"&lt;&gt;"&amp;""</code> (or simply <code>"&lt;&gt;"</code>) counts cells that are <b>not empty</b>. A pair of quotes "" means empty.</li>
<li><code>"&lt;&gt;Smith"</code> counts every cell that isn't Smith, <b>including empty ones</b>.</li></ul>
<p>⚠️ A cell "cleared" by pressing the <b>space bar</b> isn't empty: it contains a space character! Always clear cells with the <b>Delete</b> key.</p>` },
    { h: "Alphabet, averages and percentages",
      html: `<ul><li><code>=COUNTIF(A2:A8,"&lt;N")</code> counts text that comes <b>before N</b> in the alphabet (A–M). For the second half use <code>"&gt;=N"</code>. Always use &lt; on the first letter <i>after</i> your range, and &gt;= on the first letter <i>of</i> it.</li>
<li><code>=COUNTIF(B2:B8,"&gt;"&amp;AVERAGE(B2:B8))</code> counts above-average scores.</li>
<li>Percentage of Smiths among the names:<br><code>=COUNTIF(A2:A8,"Smith")/(ROWS(A2:A8)-COUNTIF(A2:A8,"&lt;&gt;*"))</code><br>ROWS counts the rows in the range (7); we subtract the cells without text (1) to get 6 names; 2 ÷ 6 = 33%. The brackets make sure the subtraction happens before the division.</li></ul>`,
      figs: [["036-135","Seven advanced COUNTIF examples from the handbook, with each formula shown in column D."]] },
    { h: "Practice",
      html: `<p>Row 5 is deliberately empty. Several answers are the same number, so each task checks that you used the right idea.</p>`,
      widget: { type: "play", data: [["Name","Score"],["Baker",40],["Hall",10],["May",110],[null,30],["Smith",70],["Smith",30],["Vine",60]],
        start: "=COUNTIF(A2:A8,\"<>Smith\")",
        tasks: [
          { t: "Cells in A2:A8 that are not Smith", a: 5, hint: "=COUNTIF(A2:A8,\"<>Smith\")", must: ["<>SMITH"] },
          { t: "Scores less than Baker's score (use \"<\"&B2)", a: 3, hint: "=COUNTIF(B2:B8,\"<\"&B2)", must: ["&B2"] },
          { t: "Cells in A2:A8 that do not contain text", a: 1, hint: "=COUNTIF(A2:A8,\"<>*\")", must: ["<>*"] },
          { t: "Cells in A2:A8 that are not empty", a: 6, hint: "=COUNTIF(A2:A8,\"<>\"&\"\")", must: ["COUNTIF", "<>"] },
          { t: "Names in the first half of the alphabet (A–M)", a: 3, hint: "=COUNTIF(A2:A8,\"<N\")", must: ["\"<N\""] },
          { t: "Scores above the average", a: 3, hint: "=COUNTIF(B2:B8,\">\"&AVERAGE(B2:B8))", must: ["AVERAGE"] },
          { t: "Share of Smiths among the names (a fraction like 0.33)", a: 0.3333, hint: "=COUNTIF(A2:A8,\"Smith\")/(ROWS(A2:A8)-COUNTIF(A2:A8,\"<>*\"))", must: ["ROWS"] }
        ] },
      note: `Modern Excel also has <b>COUNTIFS</b> (several conditions at once) and <b>SUMIF</b> (add up only the matching cells). Once you understand COUNTIF, they're easy to pick up.`,
      remember: `"<"&B2 joins an operator to a cell. * = any characters, ? = one character. "<>" = not empty. Clear cells with Delete, not the space bar.` }
  ],
  terms: [["& (ampersand)","Joins text together, e.g. \"<\"&B2."],["Wildcard","A symbol standing for unknown characters (* or ?)."],["*","Any number of characters."],["?","Exactly one character."],["\"\"","Two quotes = an empty value."],["ROWS","Returns how many rows a range has."]],
  tryit: ["Count the names starting with S using \"S*\".","Count the scores above the value typed in a cell D1 using \">\"&D1.","Press the space bar in an 'empty' cell, then check COUNTBLANK. What changed?"],
  links: [["COUNTIF function","https://support.microsoft.com/en-us/office/countif-function-e0de10c6-f885-4e71-abb4-1f464816df34"],["COUNTIFS function","https://support.microsoft.com/en-us/office/countifs-function-dda3dc6e-f74e-4aee-88bc-aa8c2a866842"],["Using wildcard characters in searches","https://support.microsoft.com/en-us/office/using-wildcard-characters-in-searches-ef94362e-9999-4350-ad74-4d2371110adb"]],
  quiz: [
    {q:"How do you count values less than the number in B2?", o:["=COUNTIF(B2:B8,\"<\"&B2)","=COUNTIF(B2:B8,\"<B2\")","=COUNTIF(B2:B8,<B2)","=COUNTIF(B2,B2:B8)"], a:0, e:"Keep the operator in quotes and join the cell with &."},
    {q:"What does the & symbol do in a formula?", o:["Joins pieces of text together","Adds numbers","Divides","Makes an absolute reference"], a:0, e:"& is the concatenation (joining) operator."},
    {q:"Which wildcard stands for ANY number of characters?", o:["*","?","#","!"], a:0, e:"* matches any number of characters."},
    {q:"Which wildcard stands for exactly ONE character?", o:["?","*","&","~"], a:0, e:"? matches exactly one character."},
    {q:"What does =COUNTIF(A1:A7,\"<>*\") count?", o:["Cells that do not contain text","Cells with text","Only empty cells with spaces","Cells equal to *"], a:0, e:"<>* = not any text: numbers, blanks, errors."},
    {q:"How do you count cells that are NOT empty with COUNTIF?", o:["=COUNTIF(A1:A7,\"<>\"&\"\")","=COUNTIF(A1:A7,\"\")","=COUNTIF(A1:A7,\"=*\")","=COUNTIF(A1:A7,0)"], a:0, e:"\"<>\"&\"\" means not equal to empty."},
    {q:"To count names in the first half of the alphabet (A–M), use…", o:["\"<N\"","\"<=M\"","\">M\"","\"A-M\""], a:0, e:"Use < on the first letter after the range: \"<N\"."},
    {q:"How do you count values above the average of B1:B7?", o:["=COUNTIF(B1:B7,\">\"&AVERAGE(B1:B7))","=COUNTIF(B1:B7,>AVERAGE)","=AVERAGE(COUNTIF(B1:B7))","=COUNTIF(\">AVERAGE\")"], a:0, e:"Join the operator to the AVERAGE function with &."},
    {q:"Why shouldn't you 'clear' a cell with the space bar?", o:["It leaves a space character, so the cell isn't really empty","It deletes the column","It locks the cell","It changes the font"], a:0, e:"A space is a character; use the Delete key."},
    {q:"What does ROWS(A1:A7) return?", o:["7","1","A7","0"], a:0, e:"ROWS gives the number of rows in the range."}
  ]
});

/* ============================ DAY 20 ============================ */
LESSONS.push({
  day: 20, week: 4, mins: 50,
  title: "The IF function",
  sub: "Making decisions, and nested IFs",
  goals: ["Write IF with a logical test, a value-if-true and a value-if-false","Use comparison operators and text in quotes","Build nested IF formulas for grades and awards","Lay out long formulas so the brackets are easy to check"],
  sections: [
    { h: "Teaching Excel to decide",
      html: `<p><code>IF(logical_test, value_if_true, value_if_false)</code></p>
<ul><li><b>logical_test</b>: a question with a TRUE or FALSE answer, like <code>B2&gt;=35</code>.</li>
<li><b>value_if_true</b>: what to show if the answer is TRUE.</li>
<li><b>value_if_false</b>: what to show if it's FALSE.</li></ul>
<p><code>=IF(B2&gt;=35,"Pass","Fail")</code> shows Pass for 35 and above, Fail otherwise. <b>Text must be in quotation marks.</b> Numbers and formulas don't need them.</p>`,
      diagram: "iftree" },
    { h: "Examples from the handbook",
      html: `<div class="tbl-wrap"><table class="mini"><tr><th>Formula</th><th>Meaning</th></tr>
<tr><td><code>=IF(D1&gt;26,33,44)</code></td><td>If D1 is above 26 show 33, otherwise 44</td></tr>
<tr><td><code>=IF(A5&lt;&gt;"","Done","Open")</code></td><td>Done if A5 isn't empty, otherwise Open</td></tr>
<tr><td><code>=IF(D1&lt;100,"OK","Over Budget")</code></td><td>Budget check</td></tr>
<tr><td><code>=IF(SUM(A1:A3)=50,"Slow","Fast")</code></td><td>A function inside the test</td></tr>
<tr><td><code>=IF(A2&gt;1000,985,B2+245)</code></td><td>A calculation as the false value</td></tr></table></div>` },
    { h: "Nested IFs: more than two outcomes",
      html: `<p>An IF can go <b>inside</b> another IF's value_if_true or value_if_false. That's called <b>nesting</b> (up to 64 levels).</p>
<p><code>=IF(B9&gt;=18,"Adult",IF(B9&gt;12,"Teen","Child"))</code></p>
<p><b>Medals:</b> two rounds are added. 12 or more = Gold, 8 to 11 = Silver, otherwise No Prize:<br><code>=IF((C2+D2)&gt;11,"Gold",IF((C2+D2)&gt;7,"Silver","No Prize"))</code></p>
<p><b>Letter grades:</b><br><code>=IF(B4&gt;89,"A",IF(B4&gt;79,"B",IF(B4&gt;69,"C",IF(B4&gt;59,"D","F"))))</code></p>
<p>Excel checks the tests <b>in order</b> and stops at the first TRUE. For a score of 55: not &gt;89, not &gt;79, not &gt;69, not &gt;59 → <b>F</b>.</p>
<p>Tip: plan long formulas in Notepad on separate lines so you can check the brackets, then remove the line breaks:</p>
<pre class="code">=IF(B4>89,"A",
 IF(B4>79,"B",
  IF(B4>69,"C",
   IF(B4>59,"D","F"))))</pre>`,
      figs: [["041-149","Nested IF for medals: Team A scored 7 + 3 = 10, so it gets Silver."],["042-152","Nested IF for letter grades: Cole's 55 gives F."]],
      note: `Newer Excel (2019 and Microsoft 365) also has <b>IFS</b>, which lists conditions without nesting: <code>=IFS(B4&gt;89,"A",B4&gt;79,"B",TRUE,"F")</code>. The nested IF still works everywhere.` },
    { h: "Practice",
      widget: { type: "play", data: [["Name","Score"],["Bell",65],["Cass",95],["Cole",55],["David",95],["Dean",75],["Frank",85]],
        start: "=IF(B2>=60,\"Pass\",\"Fail\")",
        tasks: [
          { t: "Bell's result: Pass if 60 or more, otherwise Fail", a: "Pass", hint: "=IF(B2>=60,\"Pass\",\"Fail\")", must: ["IF(", "B2"] },
          { t: "Cole's result with the same rule", a: "Fail", hint: "=IF(B4>=60,\"Pass\",\"Fail\")", must: ["IF(", "B4"] },
          { t: "Cole's letter grade (A >89, B >79, C >69, D >59, else F)", a: "F", hint: "=IF(B4>89,\"A\",IF(B4>79,\"B\",IF(B4>69,\"C\",IF(B4>59,\"D\",\"F\"))))", must: ["IF(*2"] },
          { t: "Dean's letter grade with the same nested IF", a: "C", hint: "=IF(B6>89,\"A\",IF(B6>79,\"B\",IF(B6>69,\"C\",IF(B6>59,\"D\",\"F\"))))", must: ["IF(*2"] },
          { t: "Frank: show a bonus of 100 if he scored over 80, else 0", a: 100, hint: "=IF(B7>80,100,0)", must: ["IF("] }
        ] },
      remember: `IF(test, if_true, if_false). Text in "quotes". Nested IFs check in order and stop at the first TRUE. Keep brackets balanced.` }
  ],
  terms: [["IF","Returns one value if a test is TRUE, another if FALSE."],["Logical test","A comparison that is TRUE or FALSE."],["value_if_true","Result when the test is TRUE."],["value_if_false","Result when the test is FALSE."],["Nested IF","An IF inside another IF."],["IFS","Newer function that checks several conditions in order."]],
  tryit: ["Write a Pass/Fail IF for your own marks list.","Change the pass mark to be stored in a cell (use an absolute reference, e.g. $E$1).","Write a nested IF that gives Gold, Silver or Bronze."],
  links: [["IF function","https://support.microsoft.com/en-us/office/if-function-69aed7c9-4e8a-4755-a9bc-aa8bbff73be2"],["IF function: nested formulas and avoiding pitfalls","https://support.microsoft.com/en-us/office/if-function-nested-formulas-and-avoiding-pitfalls-0b22ff44-f149-44ba-aeb5-4ef99da241c8"],["IFS function","https://support.microsoft.com/en-us/office/ifs-function-36329a26-37b2-467c-972b-4a39bd951d45"]],
  quiz: [
    {q:"What are the three parts of IF?", o:["logical_test, value_if_true, value_if_false","range, criteria, sum","number1, number2, number3","lookup, table, column"], a:0, e:"IF(logical_test, value_if_true, value_if_false)."},
    {q:"=IF(D1>26,33,44) with D1 = 30 returns…", o:["33","44","30","TRUE"], a:0, e:"30 > 26 is TRUE, so 33."},
    {q:"=IF(D1<100,\"OK\",\"Over Budget\") with D1 = 150 returns…", o:["Over Budget","OK","150","FALSE"], a:0, e:"150 < 100 is FALSE."},
    {q:"Why are \"Pass\" and \"Fail\" in quotation marks?", o:["Text in formulas must be in quotes","To make them bold","Quotes are optional decoration","To make them numbers"], a:0, e:"Text values need quotation marks."},
    {q:"=IF(A5<>\"\",\"Done\",\"Open\") shows Done when…", o:["A5 is not empty","A5 is empty","A5 equals Done","Always"], a:0, e:"<>\"\" means not empty."},
    {q:"What is a nested IF?", o:["An IF inside another IF","An IF with no brackets","An IF on a hidden sheet","Two IFs added together"], a:0, e:"Nesting puts one IF inside another."},
    {q:"With =IF(B4>89,\"A\",IF(B4>79,\"B\",IF(B4>69,\"C\",IF(B4>59,\"D\",\"F\")))) and B4 = 75, the result is…", o:["C","B","D","F"], a:0, e:"75 fails >89 and >79 but passes >69 → C."},
    {q:"Team scores 7 + 3 = 10 with =IF((C2+D2)>11,\"Gold\",IF((C2+D2)>7,\"Silver\",\"No Prize\")). Result?", o:["Silver","Gold","No Prize","10"], a:0, e:"10 is not >11 but is >7 → Silver."},
    {q:"How many levels of IF can be nested?", o:["64","3","10","1"], a:0, e:"Excel allows up to 64 nested levels."},
    {q:"Which newer function checks several conditions without nesting?", o:["IFS","IFNOT","MULTIIF","CHOOSEIF"], a:0, e:"IFS (Excel 2019 / Microsoft 365) checks conditions in order."}
  ]
});

/* ---------- more practice data ---------- */
const DATA_EMP = [["Emp Code","Name","Dept","Location","Designation","Basic"],
 ["E101","Rahul Jain","Finance","Delhi","Manager",56699],
 ["E104","Priya Nair","HR","Mumbai","Executive",28500],
 ["E109","Arjun Rao","Procurement","Chennai","Assistant Manager",33900],
 ["E112","Neha Gupta","Finance","Mumbai","Assistant Manager",14200],
 ["E118","Vikram Das","IT","Bangalore","Manager",61250],
 ["E121","Anita Roy","HR","Delhi","Manager",47800],
 ["E127","Kiran Shah","IT","Mumbai","Executive",29900],
 ["E133","Sameer Khan","Procurement","Delhi","Executive",21400],
 ["E140","Meena Iyer","Finance","Chennai","Executive",18750],
 ["E146","Rohit Verma","IT","Delhi","Assistant Manager",38600],
 ["E152","Divya Menon","Procurement","Mumbai","Manager",52300],
 ["E164","Sahiba Tandon","Finance","Mumbai","Executive",43381],
 ["E172","Vimi Gupta","Procurement","Mumbai","Executive",42028],
 ["E178","Tarun Bose","HR","Chennai","Executive",19900]];
const DATA_SALES = (function(){
  const reps = ["Barnes","Brown","Jones","Smith"], regionOf = {Barnes:"North",Brown:"South",Jones:"South",Smith:"North"};
  const amts = [819,456,538,1009,486,948,740,543,820,712,993,1938,654,1784,905,377,1210,688,1422,560,845,1102,630,970,1330,415,1068,799,1185,720];
  const rows = [["Date","Invoice Ref","Amount","Sales Rep.","Region"]];
  amts.forEach((a,i)=>{ const m = 1 + Math.floor(i/10); const d = 1 + (i%10)*3; const rep = reps[(i*3+Math.floor(i/4))%4];
    rows.push([`2026-${String(m).padStart(2,"0")}-${String(d).padStart(2,"0")}`, `2026-${String(i+1).padStart(4,"0")}`, a, rep, regionOf[rep]]); });
  return rows;
})();

/* ============================ DAY 21 ============================ */
LESSONS.push({
  day: 21, week: 5, mins: 45,
  title: "AND & OR with IF",
  sub: "Testing more than one condition",
  goals: ["Use AND to require every condition","Use OR to require at least one condition","Put AND/OR inside IF","Remember the key rules for combining functions"],
  sections: [
    { h: "AND and OR on their own",
      html: `<ul><li><code>AND(logical1, logical2, …)</code> is TRUE only if <b>all</b> conditions are TRUE.</li>
<li><code>OR(logical1, logical2, …)</code> is TRUE if <b>at least one</b> condition is TRUE.</li></ul>
<div class="tbl-wrap"><table class="mini"><tr><th>Test A</th><th>Test B</th><th>AND(A,B)</th><th>OR(A,B)</th></tr>
<tr><td>TRUE</td><td>TRUE</td><td>TRUE</td><td>TRUE</td></tr><tr><td>TRUE</td><td>FALSE</td><td>FALSE</td><td>TRUE</td></tr>
<tr><td>FALSE</td><td>TRUE</td><td>FALSE</td><td>TRUE</td></tr><tr><td>FALSE</td><td>FALSE</td><td>FALSE</td><td>FALSE</td></tr></table></div>`,
      think: `AND is a strict teacher: "You get the prize only if your homework is done AND your room is tidy." OR is a relaxed one: "You get the prize if your homework is done OR your room is tidy."` },
    { h: "IF + AND: the sales bonus",
      html: `<p>Sales reps earn a <b>500</b> bonus if they sell <b>more than 10 units AND</b> their cost is <b>more than 800</b>. Otherwise they get <b>250</b>. Put AND in IF's logical_test:</p>
<p><code>=IF(AND(B2&gt;10,C2&gt;800),500,250)</code></p>
<ul><li><b>Raju</b>: 11 units, 810 → both TRUE → <b>500</b></li>
<li><b>Kiran</b>: 9 units, 850 → units fails → <b>250</b></li>
<li><b>Sam</b>: 14 units, 860 → both TRUE → <b>500</b></li>
<li><b>Uma</b>: 14 units, 770 → cost fails → <b>250</b></li></ul>
<p>Because units are whole numbers, <code>B2&gt;10</code> is the same as <code>B2&gt;=11</code>, just easier to type.</p>`,
      figs: [["045-164","IF with AND: Raju and Sam meet both conditions and earn 500."]] },
    { h: "IF + OR: the team bonus",
      html: `<p>A sales team qualifies for a weekly bonus if it sold <b>at least 4 systems OR at least 9,000</b> in sales:</p>
<p><code>=IF(OR(B2&gt;=4,C2&gt;=9000),"Yes","No")</code></p>`,
      figs: [["047-170","IF with OR: Team 1 and Team 2 qualify; Team 3 (3 systems, 8,800) doesn't."]] },
    { h: "Rules to remember",
      html: `<ul><li>If Excel can't get TRUE or FALSE from a test, it returns <b>#VALUE!</b>.</li>
<li>Text in arguments must be in <b>quotation marks</b>.</li>
<li>"Not equal" is written <b>&lt;&gt;</b>.</li>
<li>A function placed inside another function sits inside its brackets <b>without its own = sign</b>: <code>=IF(AND(…),…)</code>, not <code>=IF(=AND(…),…)</code>.</li>
<li><b>NOT</b>(test) flips TRUE to FALSE and vice versa.</li></ul>` },
    { h: "Practice",
      widget: { type: "play", data: [["Name","Units","Cost","Bonus"],["Raju",11,810,null],["Kiran",9,850,null],["Sam",14,860,null],["Uma",14,770,null]],
        start: "=IF(AND(B2>10,C2>800),500,250)",
        tasks: [
          { t: "Raju's bonus with the AND rule", a: 500, hint: "=IF(AND(B2>10,C2>800),500,250)", must: ["AND(", "B2"] },
          { t: "Uma's bonus with the AND rule", a: 250, hint: "=IF(AND(B5>10,C5>800),500,250)", must: ["AND(", "B5"] },
          { t: "Kiran's bonus if the rule were OR instead of AND", a: 500, hint: "=IF(OR(B3>10,C3>800),500,250)", must: ["OR(", "B3"] },
          { t: "Just the test: does Sam meet both conditions? (TRUE/FALSE)", a: true, hint: "=AND(B4>10,C4>800)", must: ["AND("] }
        ] },
      remember: `AND = all must be TRUE. OR = at least one TRUE. Put them inside IF's first argument: =IF(AND(…),yes,no).` }
  ],
  terms: [["AND","TRUE only when every condition is TRUE."],["OR","TRUE when at least one condition is TRUE."],["NOT","Reverses TRUE and FALSE."],["Logical value","TRUE or FALSE."],["#VALUE!","Returned when a test can't give TRUE or FALSE."]],
  tryit: ["Write a rule: 'Selected' if a student has attendance ≥ 75 AND marks ≥ 60.","Change it to OR. Who else gets selected?","Use NOT to show TRUE for students who are NOT in Red house."],
  links: [["AND function","https://support.microsoft.com/en-us/office/and-function-5f19b2e8-e1df-4408-897a-ce285a19e9d9"],["OR function","https://support.microsoft.com/en-us/office/or-function-7d17ad14-8700-4281-b308-00b131e22af0"],["Using IF with AND, OR and NOT functions","https://support.microsoft.com/en-us/office/using-if-with-and-or-and-not-functions-in-excel-d895f58c-b36c-419e-b1f2-5c193a236d97"]],
  quiz: [
    {q:"When is AND(A,B) TRUE?", o:["Only when both A and B are TRUE","When either is TRUE","When both are FALSE","Never"], a:0, e:"AND needs every condition to be TRUE."},
    {q:"When is OR(A,B) TRUE?", o:["When at least one of A or B is TRUE","Only when both are TRUE","Only when both are FALSE","Always"], a:0, e:"OR needs just one TRUE condition."},
    {q:"=IF(AND(B2>10,C2>800),500,250) with B2 = 9 and C2 = 850 gives…", o:["250","500","TRUE","#VALUE!"], a:0, e:"9 is not > 10, so AND is FALSE → 250."},
    {q:"=IF(AND(B2>10,C2>800),500,250) with B2 = 14 and C2 = 860 gives…", o:["500","250","FALSE","14"], a:0, e:"Both conditions are TRUE → 500."},
    {q:"=IF(OR(B2>=4,C2>=9000),\"Yes\",\"No\") with 3 systems and 8,800 sales gives…", o:["No","Yes","3","TRUE"], a:0, e:"Neither condition is met → No."},
    {q:"Where does AND go when combined with IF?", o:["In IF's logical_test (first argument)","In value_if_false only","Outside the brackets","In a different cell only"], a:0, e:"AND replaces IF's logical_test."},
    {q:"Which is written correctly?", o:["=IF(AND(A1>5,B1>5),\"Yes\",\"No\")","=IF(=AND(A1>5,B1>5),\"Yes\",\"No\")","=IF AND(A1>5,B1>5) Yes No","=AND(IF(A1>5),B1>5)"], a:0, e:"Inner functions don't get their own = sign."},
    {q:"What does NOT(TRUE) return?", o:["FALSE","TRUE","0","#VALUE!"], a:0, e:"NOT reverses the logical value."},
    {q:"What does Excel return when a test can't produce TRUE or FALSE?", o:["#VALUE!","#N/A","0","Blank"], a:0, e:"#VALUE! appears when the test is invalid."},
    {q:"For whole numbers, B2>10 is the same as…", o:["B2>=11","B2>=10","B2<11","B2=10"], a:0, e:"With integers, more than 10 means 11 or more."}
  ]
});

/* ============================ DAY 22 ============================ */
LESSONS.push({
  day: 22, week: 5, mins: 50,
  title: "Conditional formatting",
  sub: "Let the data colour itself",
  goals: ["Apply built-in rules: highlight cells, top/bottom, data bars, colour scales, icons","Write your own rule with a formula","Use $ to highlight whole rows","Manage and clear rules"],
  sections: [
    { h: "What is conditional formatting?",
      html: `<p><b>Conditional formatting</b> changes a cell's look (fill, font colour, icons, bars) <b>automatically</b> when its value meets a condition. Change the data and the colours update themselves. Use it to spot top scorers, overdue dates, duplicates or typing mistakes at a glance.</p>
<p>Home → Styles → <b>Conditional Formatting</b>:</p>
<ul><li><b>Highlight Cells Rules</b>: Greater Than, Less Than, Between, Equal To, Text that Contains, A Date Occurring, Duplicate Values.</li>
<li><b>Top/Bottom Rules</b>: Top 10 items, Top 10%, Above Average…</li>
<li><b>Data Bars</b>, <b>Color Scales</b> and <b>Icon Sets</b>: mini-graphics inside cells.</li></ul>` },
    { h: "Rules with your own formula",
      html: `<p>The presets can't do everything. Choose <b>New Rule → Use a formula to determine which cells to format</b>. The formula must give TRUE or FALSE, and it's written for the <b>top-left cell</b> of the range; Excel adjusts it for the other cells, just like copying a formula.</p>
<ul><li>Highlight apple, kiwi or lime in B4:F8 with one rule: <code>=OR(B4="apple",B4="kiwi",B4="lime")</code></li>
<li>Highlight the <b>whole row</b> of orders from Texas: <code>=$F5="TX"</code>. The $ locks column F so every cell in the row checks the State column.</li>
<li>Dates in the next 30 days: <code>=AND(B4&gt;TODAY(),B4&lt;=TODAY()+30)</code> (the handbook uses NOW(), which also includes the time).</li>
<li>Differences between two columns: <code>=$B4&lt;&gt;$C4</code></li></ul>`,
      figs: [["048-174","Edit the Rule Description: format values where =OR(B4=\"apple\",B4=\"kiwi\",B4=\"lime\") is true."],["048-175","Whole rows highlighted for Texas orders using =$F5=\"TX\"."],["049-178","Dates in the next 30 days highlighted (current date 18 August 2016)."],["049-179","Highlighting the differences between two columns with =$B4<>$C4."]] },
    { h: "Try the rule builder",
      html: `<p>Choose a preset or write your own formula. The rule applies to the range shown, and the formula is written for its top-left cell. Complete the tasks by highlighting exactly the right cells.</p>`,
      widget: { type: "cf", data: [["Name","House","Maths","Science"],["Aarav","Red",78,85],["Diya","Blue",92,88],["Kabir","Green",55,61],["Meera","Red",84,79],["Rohan","Yellow",67,72],["Sara","Blue",88,94],["Ishaan","Red",49,58]],
        range: "C2:D8", start: "=C2>80",
        tasks: [
          { t: "Highlight every mark above 80 in C2:D8", range: "C2:D8", cells: ["C3","C5","C7","D2","D3","D7"], hint: "Greater Than 80, or =C2>80" },
          { t: "Highlight marks below 60 in C2:D8", range: "C2:D8", cells: ["C4","C8","D8"], hint: "Less Than 60, or =C2<60" },
          { t: "Highlight whole rows (A2:D8) for students in Red house", range: "A2:D8", cells: ["A2","B2","C2","D2","A5","B5","C5","D5","A8","B8","C8","D8"], hint: "=$B2=\"Red\"" },
          { t: "Highlight names (A2:A8) where Science is higher than Maths", range: "A2:A8", cells: ["A2","A4","A6","A7","A8"], hint: "=$D2>$C2" }
        ] },
      think: `A conditional format is like a traffic light that switches by itself: you set the rule once, and the colour changes whenever the situation changes.` },
    { h: "Managing rules",
      html: `<ul><li><b>Manage Rules</b>: see, edit, reorder or delete every rule on the sheet.</li>
<li><b>Clear Rules</b>: from selected cells or the entire sheet.</li>
<li>Several rules can apply to the same cells; the order in Manage Rules decides which wins.</li></ul>`,
      remember: `Home → Conditional Formatting. Presets for quick jobs; "Use a formula" for anything else. Write the formula for the top-left cell; use $ to lock a column for whole-row highlights.` }
  ],
  terms: [["Conditional formatting","Formatting that applies automatically when a condition is met."],["Highlight Cells Rules","Presets like Greater Than and Duplicate Values."],["Data Bars","Bars inside cells showing relative size."],["Color Scales","Cell colours that shade from low to high."],["Icon Sets","Arrows, flags or traffic lights inside cells."],["Formula rule","A custom rule using a TRUE/FALSE formula."],["Manage Rules","Where you edit, order and delete rules."]],
  tryit: ["Apply Data Bars to a column of marks.","Highlight Duplicate Values in a list of names.","Create a formula rule that shades the whole row of anyone who scored below 35."],
  links: [["Use conditional formatting to highlight information","https://support.microsoft.com/en-us/office/use-conditional-formatting-to-highlight-information-fed60dfa-1d3f-4e13-9ecb-f1951ff89d7f"]],
  quiz: [
    {q:"What does conditional formatting do?", o:["Changes a cell's formatting automatically when a condition is met","Deletes cells that fail a test","Sorts data","Protects the sheet"], a:0, e:"It formats cells based on their values."},
    {q:"Where is Conditional Formatting on the Ribbon?", o:["Home → Styles","Data → Tools","Review → Changes","Insert → Tables"], a:0, e:"Home tab, Styles group."},
    {q:"Which preset would highlight names that appear twice?", o:["Duplicate Values","Top 10 Items","Data Bars","Between"], a:0, e:"Highlight Cells Rules → Duplicate Values."},
    {q:"A custom rule's formula must return…", o:["TRUE or FALSE","A colour name","Text","A cell address"], a:0, e:"Cells are formatted when the formula is TRUE."},
    {q:"Which formula highlights apple, kiwi or lime in one rule?", o:["=OR(B4=\"apple\",B4=\"kiwi\",B4=\"lime\")","=AND(B4=\"apple\",B4=\"kiwi\",B4=\"lime\")","=B4=apple+kiwi+lime","=IF(B4,\"fruit\")"], a:0, e:"OR is TRUE if the cell matches any one of them."},
    {q:"Why is the formula =$F5=\"TX\" written with $ before F?", o:["So every cell in the row checks column F","To format as currency","To make it faster","It's a typing mistake"], a:0, e:"Locking the column lets the whole row respond to column F."},
    {q:"For a rule applied to B4:F8, the formula should be written for which cell?", o:["B4, the top-left cell","F8","A1","Any random cell"], a:0, e:"Write it for the top-left cell; Excel adjusts it for the rest."},
    {q:"Which formula highlights differences between columns B and C?", o:["=$B4<>$C4","=$B4=$C4","=B4+C4","=SUM(B4:C4)"], a:0, e:"<> means not equal."},
    {q:"Which feature shows small bars inside cells to compare sizes?", o:["Data Bars","Borders","Sparklines only","Wrap Text"], a:0, e:"Data Bars are a conditional formatting option."},
    {q:"Where do you edit or delete existing rules?", o:["Conditional Formatting → Manage Rules","Data → Filter","File → Print","View → Zoom"], a:0, e:"Manage Rules lists every rule."}
  ]
});

/* ============================ DAY 23 ============================ */
LESSONS.push({
  day: 23, week: 5, mins: 40,
  title: "Sorting data",
  sub: "A to Z, largest to smallest and multi-level sorts",
  goals: ["Sort text, numbers and dates in either direction","Use the Sort dialog box","Sort by more than one column with Add Level","Avoid scrambling your data when sorting"],
  sections: [
    { h: "Why sort?",
      html: `<p>Sorting rearranges rows into an order: names A → Z, marks highest first, dates oldest first. It helps you find things and spot the top and bottom.</p>
<div class="tbl-wrap"><table class="mini"><tr><th>Data type</th><th>Sort orders</th></tr>
<tr><td>Text</td><td>A to Z, Z to A</td></tr><tr><td>Numbers</td><td>Smallest to Largest, Largest to Smallest</td></tr>
<tr><td>Dates</td><td>Oldest to Newest, Newest to Oldest</td></tr><tr><td>Special</td><td>Custom list (e.g. Mon, Tue, Wed or Jan, Feb, Mar)</td></tr></table></div>
<p>You can also sort by <b>cell colour</b>, <b>font colour</b> or <b>cell icon</b> (from conditional formatting).</p>` },
    { h: "The Sort dialog box",
      html: `<p>Click any cell in your data, then <b>Data → Sort &amp; Filter → Sort</b>.</p>
<ol><li>Tick <b>My data has headers</b> so row 1 stays on top.</li><li><b>Sort by</b>: choose the column.</li><li><b>Sort On</b>: Values (or colour/icon).</li><li><b>Order</b>: A to Z, Largest to Smallest, etc.</li></ol>
<p>For a quick one-column sort, click a cell in that column and use the <b>A→Z</b> or <b>Z→A</b> buttons.</p>`,
      figs: [["050-183","The Sort & Filter group on the Data tab: quick A→Z / Z→A buttons, Sort, Filter, Clear, Reapply and Advanced."],["050-182","The Sort dialog: Sort by, Sort On and Order."]] },
    { h: "Sorting by several columns",
      html: `<p>Click <b>Add Level</b> to sort within a sort. For example: sort by <b>Designation</b>, then by <b>Location</b>. All Managers come together, and <i>within</i> the Managers, the locations are in order. Excel allows up to <b>64 levels</b>.</p>`,
      figs: [["051-188","A multi-level sort: Sort by Designation, then by Location."]],
      think: `Multi-level sorting is like arranging a school assembly: first by class, then within each class by height.` },
    { h: "Try sorting",
      html: `<p>Choose the first and second sort levels and watch the rows rearrange. Notice that each whole row moves together.</p>`,
      widget: { type: "table", data: DATA_EMP, mode: "sort" } },
    { h: "Sort safely",
      html: `<ul><li>Select just <b>one cell</b> in the data (not a whole column) before sorting, so Excel picks up the whole table.</li>
<li>If you select one column only, Excel warns you. Choose <b>Expand the selection</b>, otherwise that column gets sorted on its own and your rows are mixed up!</li>
<li>No blank rows or columns inside the data, and avoid merged cells.</li>
<li>Made a mess? <b>Ctrl + Z</b> straight away.</li></ul>`,
      remember: `Data → Sort. Tick "My data has headers". Add Level for sort-within-sort (up to 64). Always expand the selection so rows stay together.` }
  ],
  terms: [["Sort","Rearrange rows into an order."],["Ascending","Smallest to largest, A to Z, oldest to newest."],["Descending","Largest to smallest, Z to A, newest to oldest."],["Sort level","One column in a multi-column sort."],["Add Level","Adds another column to sort by."],["Custom list","A special order like Mon, Tue, Wed."]],
  tryit: ["Sort a list of students by marks, highest first.","Sort by House, then by Name within each house.","Try sorting only one column and read Excel's warning. Choose Expand the selection."],
  links: [["Sort data in a range or table","https://support.microsoft.com/en-us/office/sort-data-in-a-range-or-table-62d0b95d-2a90-4610-a6ae-2e545c4a4654"],["Sort by dates","https://support.microsoft.com/en-us/office/sort-by-dates-60baffa5-341e-4dc4-af58-2d72e83b4412"]],
  quiz: [
    {q:"Where is the Sort button?", o:["Data → Sort & Filter","Home → Font","Insert → Charts","Review → Comments"], a:0, e:"Data tab → Sort & Filter group."},
    {q:"Which order is 'ascending' for numbers?", o:["Smallest to Largest","Largest to Smallest","Random","By colour"], a:0, e:"Ascending goes up: smallest first."},
    {q:"What does ticking 'My data has headers' do?", o:["Keeps the heading row at the top, out of the sort","Deletes the headers","Makes headers bold","Sorts only the headers"], a:0, e:"The header row isn't sorted with the data."},
    {q:"Which button adds a second column to sort by?", o:["Add Level","Copy Level","Options","Reapply"], a:0, e:"Add Level creates another sort level."},
    {q:"How many sort levels does Excel allow?", o:["64","2","10","Unlimited"], a:0, e:"Up to 64 levels."},
    {q:"You sort by Designation, then Location. What happens?", o:["Rows are grouped by designation, and within each designation ordered by location","Only Location is sorted","Designation is ignored","Columns swap places"], a:0, e:"The second level sorts within the first."},
    {q:"Besides values, what else can you sort by?", o:["Cell colour, font colour or cell icon","File size","Sheet name","Font name"], a:0, e:"Sort On lets you choose values, colours or icons."},
    {q:"You selected only one column and clicked Sort. What should you choose?", o:["Expand the selection","Continue with the current selection","Cancel Excel","Delete the column"], a:0, e:"Expanding keeps each row's data together."},
    {q:"Which sorts Mon, Tue, Wed in weekday order instead of alphabetical?", o:["A custom list","Z to A","Largest to Smallest","Sort by colour"], a:0, e:"Custom lists sort by a special order."},
    {q:"What should your data NOT contain for sorting to work well?", o:["Blank rows or merged cells","Headings","Numbers","Dates"], a:0, e:"Blank rows split the data; merged cells cause errors."}
  ]
});

/* ============================ DAY 24 ============================ */
LESSONS.push({
  day: 24, week: 5, mins: 50,
  title: "Filters & Advanced Filter",
  sub: "Show only the rows you need",
  goals: ["Prepare data for filtering","Use AutoFilter with text, number and date filters","Set up a criteria range for Advanced Filter","Use AND (same row) and OR (different rows) criteria"],
  sections: [
    { h: "What are filters?",
      html: `<p><b>Filtering</b> shows only the rows that meet your conditions and <b>hides</b> the rest. Unlike sorting, it doesn't rearrange anything. You can then copy, format, chart or print just the visible rows.</p>
<p><b>Prepare your data first:</b></p>
<ul><li><b>Use headings</b> in the top row of every column.</li><li><b>Don't mix</b> data types in a column (all numbers or all text).</li><li><b>Don't interrupt</b>: no blank rows or columns (single blank cells are OK).</li><li><b>Keep separate</b>: other data should be on another sheet, or separated by a blank row/column.</li><li>No merged cells.</li></ul>` },
    { h: "AutoFilter",
      html: `<p>Click in the data → <b>Data → Filter</b> (or Ctrl + Shift + L). A drop-down arrow appears on every heading.</p>
<ul><li>Untick the values you don't want to see (or use the search box).</li>
<li><b>Text Filters</b>: Equals, Begins With, Contains…</li><li><b>Number Filters</b>: Greater Than, Between, Top 10, Above Average…</li><li><b>Date Filters</b>: This Month, Last Year, Between…</li><li><b>Custom Filter</b> (last option in each list): combine two conditions.</li></ul>
<p>Filtered row numbers turn blue, and the arrow becomes a funnel icon. <b>Clear</b> removes the filters.</p>`,
      figs: [["052-193","AutoFilter drop-down: tick the values you want to see."]] },
    { h: "Try filtering",
      widget: { type: "table", data: DATA_EMP, mode: "filter" } },
    { h: "Advanced Filter",
      html: `<p>When you need several sets of conditions, or conditions with formulas, use <b>Data → Sort &amp; Filter → Advanced</b>. It uses a <b>criteria range</b>: a copy of the headings with conditions typed underneath.</p>
<ul><li>Conditions in the <b>same row</b> must <b>all</b> be true (AND).</li><li>Conditions in <b>different rows</b>: <b>any</b> row may be true (OR).</li></ul>`,
      diagram: "criteria" },
    { h: "Advanced Filter step by step",
      html: `<p>Goal: everyone in <b>Finance with Basic ≥ 15,000</b>, plus everyone in <b>Procurement with Basic ≥ 30,000</b>.</p>
<ol><li>Insert a few blank rows above the data; copy the headings into row 1.</li>
<li>Type the criteria: row 2 → Dept <i>Finance</i>, Basic <i>&gt;=15000</i>; row 3 → Dept <i>Procurement</i>, Basic <i>&gt;=30000</i>.</li>
<li>Click in the data → Data → <b>Advanced</b>.</li>
<li><b>List range</b>: the data (e.g. $A$7:$G$43). <b>Criteria range</b>: the headings plus condition rows (e.g. $A$1:$G$3). Don't include empty criteria rows, or everything matches!</li>
<li><b>Action</b>: <i>Filter the list, in-place</i> (hide rows) or <i>Copy to another location</i> (then choose where in <b>Copy to</b>). Tick <b>Unique records only</b> to drop duplicates.</li>
<li>OK. To remove it, <b>Data → Clear</b>.</li></ol>`,
      figs: [["054-199","The Advanced Filter dialog: Action, List range, Criteria range, Copy to and Unique records only."],["054-200","Clear in the Sort & Filter group turns the filter off."]],
      remember: `Filter hides rows; it doesn't move them. Ctrl + Shift + L toggles AutoFilter. Advanced Filter: same row = AND, different rows = OR.` }
  ],
  terms: [["Filter","Show only rows that meet conditions; hide the rest."],["AutoFilter","Drop-down filters on each heading (Data → Filter)."],["Custom Filter","A filter with up to two conditions."],["Advanced Filter","Filter using a separate criteria range."],["Criteria range","Headings with conditions typed beneath them."],["List range","The data being filtered."],["Unique records only","Option to hide duplicate rows."]],
  tryit: ["Turn on AutoFilter and show only the Mumbai employees.","Use Number Filters → Top 10 to show the 3 highest Basic salaries.","Build an Advanced Filter for HR OR IT employees (two criteria rows)."],
  links: [["Filter data in a range or table","https://support.microsoft.com/en-us/office/filter-data-in-a-range-or-table-01832226-31b5-4568-8806-38c37dcc180e"],["Filter by using advanced criteria","https://support.microsoft.com/en-us/office/filter-by-using-advanced-criteria-4c9222fe-8529-4cd7-a898-3f16abdff32b"]],
  quiz: [
    {q:"How is filtering different from sorting?", o:["Filtering hides rows; sorting rearranges them","They are the same","Filtering deletes rows","Sorting hides rows"], a:0, e:"Filters hide non-matching rows without moving anything."},
    {q:"Which shortcut turns AutoFilter on or off?", o:["Ctrl + Shift + L","Ctrl + F","Alt + F","Ctrl + L only"], a:0, e:"Ctrl + Shift + L toggles filters."},
    {q:"Which is a good rule for preparing data to filter?", o:["No blank rows or columns inside the data","Merge the heading cells","Mix numbers and text in a column","Leave out headings"], a:0, e:"Blank rows break the data range."},
    {q:"Where is the Custom Filter option?", o:["At the end of the Text, Number or Date Filters list","On the Review tab","In File → Options","In the Name Box"], a:0, e:"It's the last option in each filter list."},
    {q:"In an Advanced Filter criteria range, conditions in the SAME row mean…", o:["AND: all must be true","OR: any can be true","Nothing","Sort order"], a:0, e:"Same row = AND."},
    {q:"Conditions in DIFFERENT rows of the criteria range mean…", o:["OR: any row can match","AND","Ignore both","Error"], a:0, e:"Different rows = OR."},
    {q:"Which Advanced Filter option copies the results elsewhere?", o:["Copy to another location","Filter the list, in-place","Unique records only","List range"], a:0, e:"Choose Copy to another location and set Copy to."},
    {q:"Which option removes duplicate rows from the result?", o:["Unique records only","Remove Arrows","Clear Rules","Protect Sheet"], a:0, e:"Tick Unique records only."},
    {q:"How do you turn off an Advanced Filter?", o:["Data → Clear","Ctrl + Z twice","Delete the data","Save and reopen"], a:0, e:"Data → Sort & Filter → Clear."},
    {q:"What happens to filtered row numbers?", o:["They turn blue","They disappear forever","They turn red","They become letters"], a:0, e:"Blue row numbers show a filter is active."}
  ]
});

/* ============================ DAY 25 ============================ */
LESSONS.push({
  day: 25, week: 5, mins: 45,
  title: "Subtotals",
  sub: "Quick summaries by group, with outline levels",
  goals: ["Prepare and sort data before subtotalling","Use Data → Subtotal and its options","Switch between outline levels 1, 2 and 3","Remove subtotals"],
  sections: [
    { h: "What are subtotals?",
      html: `<p><b>Subtotals</b> add a total row after each group in your data, for example the total salary of each department, plus a <b>Grand Total</b> at the end. It's one of the quickest ways to summarise a list.</p>` },
    { h: "Step 1: sort first!",
      html: `<p>Your data must look like a proper table (headings across the top, data below) and must be <b>sorted by the column you want to group by</b>, such as Department.</p>
<p>Why? Subtotal adds a total <b>at each change</b> in that column. If the data isn't sorted, Finance might appear three times, and you'd get three separate Finance subtotals, which is messy and confusing. Try it in the practice below by unticking "Sort first".</p>` },
    { h: "Step 2: Data → Subtotal",
      html: `<ol><li>Click in the data → <b>Data → Outline → Subtotal</b>.</li>
<li><b>At each change in</b>: the grouping column (e.g. Dept). Think carefully: grouping by something meaningless gives meaningless totals.</li>
<li><b>Use function</b>: Sum, Count, Average, Max, Min, Product, Count Numbers, StdDev, StdDevp, Var, Varp.</li>
<li><b>Add subtotal to</b>: tick the column(s) to total (e.g. Basic).</li>
<li>Options: <b>Replace current subtotals</b> (untick to add a second set), <b>Page break between groups</b>, <b>Summary below data</b> (untick to put totals above).</li>
<li>OK.</li></ol>`,
      figs: [["056-207","The Subtotal dialog: At each change in Department Name, use function Sum, add subtotal to Basic."],["056-208","The Use function list: Sum, Count, Average, Max, Min, Product and more."]] },
    { h: "Outline levels",
      html: `<p>Excel adds an <b>outline</b> on the left with buttons <b>1 2 3</b>:</p>
<ul><li><b>3</b>: everything: every row plus subtotals.</li><li><b>2</b>: only the subtotal rows and the grand total.</li><li><b>1</b>: only the grand total.</li></ul>
<p>The small <b>+</b> and <b>−</b> buttons expand or collapse single groups. To start over, open Subtotal again and click <b>Remove All</b>.</p>`,
      figs: [["057-212","Level 3: all rows with a subtotal after each department."],["057-211","Level 2: just the department totals and the grand total."],["058-215","Level 1: only the grand total."]] },
    { h: "Try it",
      widget: { type: "subtotal", data: DATA_EMP, groups: ["Dept","Location","Designation"], values: ["Basic"] },
      think: `Subtotals are like a class register that adds a "total present" line after each section, and a whole-school total at the bottom.`,
      remember: `Sort by the group column first → Data → Subtotal → at each change in / function / add to. Buttons 1-2-3 switch levels. Remove All to undo.` }
  ],
  terms: [["Subtotal","A total for one group of rows."],["Grand Total","The total of all groups."],["At each change in","The column whose changes start a new group."],["Outline","The grouping bar with 1-2-3 and +/− buttons."],["Summary below data","Puts subtotal rows under each group."],["Remove All","Deletes all subtotals and the outline."]],
  tryit: ["Sort the employee list by Dept and add a Sum of Basic at each change in Dept.","Click levels 1, 2 and 3.","Add a second subtotal (Average) with Replace current subtotals unticked.","Remove All."],
  links: [["Insert subtotals in a list of data in a worksheet","https://support.microsoft.com/en-us/office/insert-subtotals-in-a-list-of-data-in-a-worksheet-7881d256-b4fa-4f81-b71e-b0a3d4a52b3a"],["Outline (group) data in a worksheet","https://support.microsoft.com/en-us/office/outline-group-data-in-a-worksheet-08ce98c4-0063-4d42-8ac7-8278c49e9aff"]],
  quiz: [
    {q:"What must you do before adding subtotals?", o:["Sort by the column you will group by","Delete the headings","Protect the sheet","Merge all cells"], a:0, e:"Sorting keeps each group together so there's one subtotal per group."},
    {q:"Where is the Subtotal command?", o:["Data → Outline","Home → Font","Insert → Tables","View → Window"], a:0, e:"Data tab → Outline group → Subtotal."},
    {q:"What does 'At each change in' mean?", o:["The column whose change starts a new group","The column to total","The page break option","The sort order"], a:0, e:"A subtotal is inserted whenever that column's value changes."},
    {q:"Which is NOT a Subtotal function?", o:["VLOOKUP","Sum","Average","Count"], a:0, e:"Subtotal uses Sum, Count, Average, Max, Min, Product, etc."},
    {q:"Outline level 1 shows…", o:["Only the grand total","Every row","Only the headings","Nothing"], a:0, e:"Level 1 is the most collapsed view."},
    {q:"Outline level 2 shows…", o:["Subtotals and the grand total","Every detail row","Only row 1","Hidden sheets"], a:0, e:"Level 2 hides detail rows."},
    {q:"What happens if the data isn't sorted?", o:["You may get several subtotals for the same group","Excel refuses completely","It sorts automatically","Totals become zero"], a:0, e:"A new subtotal starts at every change, even for repeated groups."},
    {q:"Which option puts subtotal rows ABOVE each group?", o:["Untick Summary below data","Tick Page break between groups","Remove All","Replace current subtotals"], a:0, e:"Unticking Summary below data moves totals to the top."},
    {q:"How do you add a second kind of subtotal while keeping the first?", o:["Untick Replace current subtotals","Tick Remove All","Sort again","Delete the outline"], a:0, e:"Unticking Replace current subtotals adds another set."},
    {q:"How do you remove subtotals completely?", o:["Subtotal dialog → Remove All","Press Delete","Hide the rows","Close the file"], a:0, e:"Remove All returns the data to normal."}
  ]
});

/* ============================ DAY 26 ============================ */
LESSONS.push({
  day: 26, week: 6, mins: 40,
  title: "Excel Tables",
  sub: "Turn a range into a smart table",
  goals: ["Explain what an Excel Table is and why it helps","Create a table with Insert → Table or Ctrl + T","Use table styles, banded rows, the Total Row and header filters","Convert a table back to a range or delete it"],
  sections: [
    { h: "What is a Table?",
      html: `<p>A <b>Table</b> is a range of data that Excel treats as one organised object. Each <b>row</b> is one record (one employee, one student) and each <b>column</b> is one field, with a heading like First Name, Last Name, Age, Salary.</p>
<p>Why bother, if Excel handles ordinary data already? Because a table <b>understands</b> your data:</p>
<ul><li>It <b>grows automatically</b> when you add rows, so charts and formulas based on it expand too.</li>
<li>Every heading gets a <b>sort &amp; filter</b> drop-down.</li>
<li><b>Banded rows</b> (alternating colours) make it easy to read.</li>
<li>When you scroll down, the table's headings <b>replace the column letters</b> at the top.</li>
<li>Type a formula in one cell of a new column and it fills the whole column (a <b>calculated column</b>).</li></ul>` },
    { h: "Creating a table",
      html: `<ol><li>Click <b>any one cell</b> in your data. You don't need to select it all; Excel finds the edges and the headings.</li>
<li><b>Insert → Tables → Table</b> (or <b>Ctrl + T</b>).</li>
<li>Check the range and tick <b>My table has headers</b>. OK.</li></ol>
<p>Or use <b>Home → Styles → Format as Table</b> to pick a style at the same time.</p>`,
      figs: [["083-311","Ordinary data before it becomes a table."],["084-314","The same data as an Excel Table: banded rows and filter buttons on each heading."]] },
    { h: "Table Design tools",
      html: `<p>When you click inside a table, the <b>Table Tools / Table Design</b> tab appears:</p>
<ul><li><b>Table Styles</b>: choose colours.</li><li><b>Banded Rows / Columns</b>: turn stripes on or off.</li><li><b>Total Row</b>: adds a row at the bottom where each cell can show Sum, Average, Count, Max…</li><li><b>Table Name</b>: give it a name like <i>Staff</i> and use it in formulas: <code>=SUM(Staff[Salary])</code> (a <b>structured reference</b>).</li></ul>
<p>Play with the options:</p>`,
      widget: { type: "xltable", data: [["First Name","Last Name","Age","Salary"],["Jon","Smith",36,26500],["Helen","Mirren",22,21000],["David","Cameron",29,39000],["Brad","Pitt",52,45000],["Anna","Starolsky",41,22500],["Peter","Piper",20,31500],["David","Duck",19,15700],["Julie","Walters",33,19000]] } },
    { h: "Converting or deleting",
      html: `<ul><li><b>Convert to Range</b>: click in the table → Table Design → Tools → <b>Convert to Range</b>. The data stays, the colours stay, but the table features stop.</li>
<li><b>Delete the table and its data</b>: select the whole table and press Delete.</li></ul>`,
      think: `A plain range is a pile of papers on your desk. A Table is the same papers in a labelled file with dividers: easier to search, sort and add to.`,
      remember: `Click one cell → Ctrl + T → My table has headers. Tables expand automatically, get filter buttons, banded rows and an optional Total Row.` }
  ],
  terms: [["Table","A range Excel manages as one object with headers."],["Record","One row of a table."],["Field","One column of a table."],["Banded rows","Alternating row colours."],["Total Row","An extra row showing totals or other summaries."],["Structured reference","Using table and column names, like Staff[Salary]."],["Convert to Range","Turn a table back into normal cells."]],
  tryit: ["Create a small staff list and press Ctrl + T.","Turn on the Total Row and change Salary's total to Average.","Add a new row directly under the table. Does the table grow?","Name the table Staff and write =SUM(Staff[Salary]) elsewhere."],
  links: [["Overview of Excel tables","https://support.microsoft.com/en-us/office/overview-of-excel-tables-7ab0bb7d-3a9e-4b56-a3c9-6c94334e492c"],["Create and format tables","https://support.microsoft.com/en-us/office/create-and-format-tables-e81aa349-b006-4f8a-9806-5af9df0ac664"],["Total the data in an Excel table","https://support.microsoft.com/en-us/office/total-the-data-in-an-excel-table-6944378f-a222-4449-93d8-474386b11f20"]],
  quiz: [
    {q:"Which shortcut creates a table?", o:["Ctrl + T","Ctrl + B","Ctrl + L only","Alt + T"], a:0, e:"Ctrl + T opens Create Table."},
    {q:"Do you need to select the whole range before creating a table?", o:["No, one cell inside it is enough","Yes, every cell","Only the headings","Only the last row"], a:0, e:"Excel detects the range and headings automatically."},
    {q:"Which checkbox makes the first row the column headings?", o:["My table has headers","Banded Columns","Total Row","First Column"], a:0, e:"Tick My table has headers."},
    {q:"What happens when you add a new row right below a table?", o:["The table expands to include it","Nothing","The table is deleted","The row is hidden"], a:0, e:"Tables grow automatically."},
    {q:"What does a table show on each heading?", o:["A sort & filter drop-down","A comment","A formula","A picture"], a:0, e:"Every heading gets a filter button."},
    {q:"What are banded rows?", o:["Alternating row colours","Hidden rows","Merged rows","Frozen rows"], a:0, e:"Stripes make rows easier to read."},
    {q:"Which option adds a row of sums or averages at the bottom?", o:["Total Row","Header Row","Banded Columns","Convert to Range"], a:0, e:"Turn on Total Row in Table Design."},
    {q:"What is =SUM(Staff[Salary]) an example of?", o:["A structured reference","A mixed reference","A circular reference","An error"], a:0, e:"It uses the table and column names."},
    {q:"What does Convert to Range do?", o:["Keeps the data but removes table features","Deletes all the data","Creates a chart","Protects the table"], a:0, e:"The data and formatting remain; table features stop."},
    {q:"When you scroll down a long table, what replaces the column letters?", o:["The table's headings","Row numbers","Sheet names","Nothing"], a:0, e:"Headings appear in place of A, B, C…"}
  ]
});

/* ============================ DAY 27 ============================ */
LESSONS.push({
  day: 27, week: 6, mins: 55,
  title: "VLOOKUP & HLOOKUP",
  sub: "Find a value in a table and bring back related data",
  goals: ["Explain what a lookup does","Write VLOOKUP with approximate and exact match","Lock or name the table range so it can be copied","Use HLOOKUP, and convert formulas to values"],
  sections: [
    { h: "What is a lookup?",
      html: `<p>A <b>lookup</b> finds a value in a table and returns related information from the same row. It's like a phone directory: look up the <b>name</b>, then read across to the <b>phone number</b>.</p>
<p>Excel has VLOOKUP (vertical), HLOOKUP (horizontal) and LOOKUP. VLOOKUP is the one you'll use most.</p>`,
      diagram: "vlookup" },
    { h: "VLOOKUP syntax",
      html: `<p><code>=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])</code></p>
<ul><li><b>lookup_value</b>: what to look for. It's searched in the <b>first column</b> of the table.</li>
<li><b>table_array</b>: the table range.</li>
<li><b>col_index_num</b>: which column to bring back: 1 is the first column, 2 the next, and so on. A number less than 1 or bigger than the table gives an error.</li>
<li><b>range_lookup</b> (optional): <b>FALSE</b> = exact match only; <b>TRUE</b> or left out = approximate match.</li></ul>` },
    { h: "Approximate match: the shipping example",
      html: `<p>Parcels are charged by weight bands: 0, 1, 2, 5, 10, 20 lbs. A 1.5 lb parcel isn't in the list, so with approximate match Excel uses the <b>largest value that is smaller</b> than 1.5, which is 1.</p>
<p><code>=VLOOKUP(B11,D2:F7,2)</code> → handling charge <b>$4.00</b>.</p>
<ul><li>The first column must be sorted in <b>ascending</b> order, or results may be wrong.</li>
<li>Start the table at <b>0</b> so very light parcels still find a band.</li>
<li>To copy the formula down, lock the table: <code>=VLOOKUP(B11,$D$2:$F$7,2)</code>, or <b>name</b> it and write <code>=VLOOKUP(B12,shipping_and_handling,2)</code>. Change 2 to 3 to get the shipping charge instead.</li></ul>`,
      figs: [["063-232","The weight table: Lbs weight, Handling and Shipping."],["064-236","VLOOKUP returns the handling charge for a 1.5 lb parcel."],["065-239","The same lookup using the named range shipping_and_handling."]] },
    { h: "Exact match, IF inside VLOOKUP, and HLOOKUP",
      html: `<p>Sometimes there's no "nearest" answer: a rug style either exists or it doesn't. Use <b>FALSE</b>:</p>
<p><code>=VLOOKUP(A7,A2:C4,IF(B7="M",2,3),FALSE)</code></p>
<p>This finds the rug style in column A and uses <b>IF</b> to choose column 2 (M) or column 3 (L). If the style isn't found, you get <b>#N/A</b>. With FALSE the table doesn't need to be sorted.</p>
<p><b>HLOOKUP</b> works the same way for tables laid out <b>sideways</b>: it searches the <b>top row</b> and returns a value from a row number below.</p>`,
      figs: [["067-246","Exact-match lookup for rug prices, with IF choosing the Medium or Large column."]],
      note: `Microsoft 365 has <b>XLOOKUP</b>, a newer, more flexible lookup: <code>=XLOOKUP(value, lookup_column, return_column)</code>. It can look left, defaults to exact match and has a built-in "not found" message. VLOOKUP is still everywhere, so learn it first.` },
    { h: "Practice lookups",
      html: `<p>Columns A–C hold rug prices; E–G hold the shipping table (named <b>shipping_and_handling</b>). Row 10 holds an order and a parcel weight.</p>`,
      widget: { type: "play", data: [["Rug Style","M","L",null,"Lbs weight","Handling","Shipping"],["Green weave",200,300,null,0,2,4.95],["Red Plaid",150,250,null,1,4,6.95],["Red Polkadot",275,325,null,2,5,10.95],[null,null,null,null,5,5,15],[null,null,null,null,10,7.5,20],[null,null,null,null,20,8.5,25],[],["Order style","Size",null,null,"Parcel lbs"],["Red Plaid","M",null,null,1.5]],
        names: { shipping_and_handling: "E2:G7" }, start: "=VLOOKUP(E10,E2:G7,2)",
        tasks: [
          { t: "Handling charge for the 1.5 lb parcel in E10", a: 4, hint: "=VLOOKUP(E10,E2:G7,2)", must: ["VLOOKUP"] },
          { t: "Shipping charge for a 12 lb parcel (use the name)", a: 20, hint: "=VLOOKUP(12,shipping_and_handling,3)", must: ["VLOOKUP", "SHIPPING_AND_HANDLING"] },
          { t: "Price of a Large Red Plaid rug (exact match)", a: 250, hint: "=VLOOKUP(\"Red Plaid\",A2:C4,3,FALSE)", must: ["VLOOKUP", "FALSE"] },
          { t: "Price for the order in A10/B10 using IF to pick the column", a: 150, hint: "=VLOOKUP(A10,A2:C4,IF(B10=\"M\",2,3),FALSE)", must: ["VLOOKUP", "IF("] },
          { t: "Look up a style that doesn't exist, e.g. \"Blue Stripe\"", a: "#N/A", hint: "=VLOOKUP(\"Blue Stripe\",A2:C4,2,FALSE)", must: ["VLOOKUP"] },
          { t: "HLOOKUP: find \"M\" in the top row and return row 4", a: 275, hint: "=HLOOKUP(\"M\",A1:C4,4,FALSE)", must: ["HLOOKUP"] }
        ] } },
    { h: "Converting formulas to values",
      html: `<p>Sometimes you want to freeze results so they never change, for example random numbers from <code>=RANDBETWEEN(1,100)</code>, which change every time Excel recalculates.</p>
<ol><li>Select the formula cells (e.g. A1:A20).</li><li>Copy (Ctrl + C).</li><li>Home → Paste → <b>Paste Values</b> (V).</li><li>Press Esc.</li></ol>
<p>The formulas are replaced by their current answers.</p>`,
      remember: `VLOOKUP(what, table, column number, FALSE for exact). Approximate match needs the first column sorted ascending. Lock the table with $ or a name. #N/A = not found.` }
  ],
  terms: [["VLOOKUP","Searches the first column of a table and returns a value from another column."],["HLOOKUP","Searches the top row and returns a value from a row below."],["col_index_num","Which column of the table to return (1 = first)."],["range_lookup","TRUE/omitted = approximate, FALSE = exact."],["#N/A","No match found."],["XLOOKUP","Modern, flexible lookup in Microsoft 365."],["Paste Values","Replace formulas with their results."]],
  tryit: ["Build a price list (Item, Price) and use VLOOKUP with FALSE to find prices for an order list.","Make a marks-to-grade table (0 F, 35 D, 50 C, 65 B, 80 A) and use approximate VLOOKUP to grade students.","Use RANDBETWEEN to make 10 random numbers, then Paste Values to freeze them."],
  links: [["VLOOKUP function","https://support.microsoft.com/en-us/office/vlookup-function-0bbc8083-26fe-4963-8ab8-93a18ad188a1"],["HLOOKUP function","https://support.microsoft.com/en-us/office/hlookup-function-a3034eec-b719-4ba3-bb65-e1ad662ed95f"],["XLOOKUP function","https://support.microsoft.com/en-us/office/xlookup-function-b7fd680e-6d10-43e6-84f9-88eae8bf5929"]],
  quiz: [
    {q:"Where does VLOOKUP search for the lookup value?", o:["The first column of the table","The last column","The top row","Every cell"], a:0, e:"VLOOKUP always searches the leftmost column."},
    {q:"In =VLOOKUP(B11,D2:F7,2), what does 2 mean?", o:["Return the value from the 2nd column of the table","Look in row 2","Add 2","Exact match"], a:0, e:"col_index_num 2 = the second column of the table."},
    {q:"Which range_lookup value forces an EXACT match?", o:["FALSE","TRUE","1","Leaving it out"], a:0, e:"FALSE means exact match only."},
    {q:"With approximate match, looking up 1.5 in 0, 1, 2, 5 returns the row for…", o:["1","2","1.5","0"], a:0, e:"The largest value that is smaller than 1.5 is 1."},
    {q:"For approximate match, the first column must be…", o:["Sorted ascending","Sorted descending","Merged","Hidden"], a:0, e:"Otherwise results may be wrong."},
    {q:"What does #N/A mean from VLOOKUP with FALSE?", o:["The value wasn't found","The column number is fine","The table is sorted","The sheet is protected"], a:0, e:"#N/A = not available/not found."},
    {q:"Why write $D$2:$F$7 instead of D2:F7 in a VLOOKUP you'll copy down?", o:["So the table range doesn't move when copied","To format it as money","To make it exact match","It's required by Excel"], a:0, e:"Absolute references keep the table fixed."},
    {q:"Which function searches the TOP ROW of a table?", o:["HLOOKUP","VLOOKUP","COUNTIF","INDEX"], a:0, e:"H = horizontal: HLOOKUP searches the first row."},
    {q:"What does IF(B7=\"M\",2,3) do inside VLOOKUP?", o:["Chooses column 2 for M, otherwise column 3","Returns M","Sorts the table","Makes it approximate"], a:0, e:"IF picks the column number."},
    {q:"How do you replace formulas with their current results?", o:["Copy, then Paste Values","Delete the formulas","Press F4","Use Ctrl + T"], a:0, e:"Paste Values keeps only the results."}
  ]
});

/* ============================ DAY 28 ============================ */
LESSONS.push({
  day: 28, week: 6, mins: 40,
  title: "Data validation",
  sub: "Drop-down lists, rules, input messages and error alerts",
  goals: ["Explain what data validation controls","Create a drop-down list from a range","Restrict entries to whole numbers, dates or text length","Add input messages and error alerts"],
  sections: [
    { h: "What is data validation?",
      html: `<p><b>Data validation</b> controls what people can type into a cell. With it you can:</p>
<ul><li>Create a <b>drop-down list</b> of choices in a cell</li><li>Restrict entries, e.g. <b>whole numbers only</b> or a <b>date range</b></li><li>Set a <b>range of numbers</b> allowed (e.g. marks 0–100)</li><li>Create <b>custom rules</b> with a formula, even based on another cell</li><li>Show a <b>prompt message</b> explaining what's allowed</li><li>Show an <b>error message</b> when something wrong is typed</li></ul>`,
      think: `Data validation is the school gatekeeper: only the right people (values) get in, and there's a sign on the gate explaining the rules.` },
    { h: "Setting it up",
      html: `<p>Select the cells → <b>Data → Data Tools → Data Validation</b>. The dialog has three tabs:</p>
<ul><li><b>Settings</b>: Allow = Any value, Whole number, Decimal, <b>List</b>, Date, Time, Text length or Custom, plus the limits (between 0 and 100, etc.).</li>
<li><b>Input Message</b>: a yellow tip that appears when the cell is selected.</li>
<li><b>Error Alert</b>: the message shown for wrong entries. Style <b>Stop</b> blocks it; <b>Warning</b> asks "Continue?"; <b>Information</b> just informs.</li></ul>` },
    { h: "Drop-down lists",
      html: `<p>In the rug example, choose <b>Allow: List</b> and click in <b>Source</b>, then drag over the rug names (A2:A4). Now the order cell has a drop-down, so nobody can misspell a style, and a VLOOKUP next to it always works and recalculates when the choice changes. You can do the same for the size (M or L) using B1:C1 as the source.</p>
<p>You can also type the choices directly in Source, separated by commas: <code>Red,Blue,Green,Yellow</code>.</p>`,
      figs: [["069-251","Data Validation with Allow: List. The source is the list of rug styles."]] },
    { h: "Try it",
      html: `<p>This form uses the three most common validation types. Try entering good and bad values.</p>`,
      widget: { type: "validation" } },
    { h: "Checking existing data",
      html: `<p>Validation only checks <b>new</b> typing. To find old entries that break the rules, use Data Validation → <b>Circle Invalid Data</b>. <b>Clear Validation Circles</b> removes them. To remove validation, open the dialog and click <b>Clear All</b>.</p>`,
      remember: `Data → Data Validation. Settings (rule), Input Message (tip), Error Alert (Stop / Warning / Information). Allow: List makes a drop-down.` }
  ],
  terms: [["Data validation","Rules controlling what can be entered in cells."],["List","Validation type that creates a drop-down."],["Source","Where the list items come from."],["Input Message","A tip shown when the cell is selected."],["Error Alert","A message shown for invalid entries."],["Stop / Warning / Information","The three error alert styles."],["Circle Invalid Data","Marks existing entries that break the rules."]],
  tryit: ["Create a House drop-down with Red, Blue, Green, Yellow.","Allow only whole numbers between 0 and 100 for marks, with an input message.","Type 120 in the marks cell. Change the alert style to Warning and try again.","Use Circle Invalid Data on a list that already has a mark of 150."],
  links: [["Apply data validation to cells","https://support.microsoft.com/en-us/office/apply-data-validation-to-cells-29fecbcc-d1b9-42c1-9d76-eff3ce5f7249"],["Create a drop-down list","https://support.microsoft.com/en-us/office/create-a-drop-down-list-7693307a-59ef-400a-b769-c5402dce407b"]],
  quiz: [
    {q:"Where is Data Validation?", o:["Data → Data Tools","Home → Font","View → Window","Insert → Charts"], a:0, e:"Data tab → Data Tools group."},
    {q:"Which Allow option creates a drop-down list?", o:["List","Whole number","Text length","Any value"], a:0, e:"Allow: List makes a drop-down."},
    {q:"How can you type list items directly in Source?", o:["Separated by commas: Red,Blue,Green","One per sheet","With plus signs","You can't"], a:0, e:"Comma-separated items work as a list source."},
    {q:"Which tab shows a tip when the cell is selected?", o:["Input Message","Error Alert","Settings","Protection"], a:0, e:"The Input Message appears on selection."},
    {q:"Which Error Alert style completely blocks invalid entries?", o:["Stop","Warning","Information","Notice"], a:0, e:"Stop doesn't allow the invalid value."},
    {q:"Which style asks 'Continue?' but lets the user proceed?", o:["Warning","Stop","Block","List"], a:0, e:"Warning allows the user to continue."},
    {q:"You want marks between 0 and 100 only. Which setting?", o:["Whole number, between 0 and 100","List","Text length 100","Any value"], a:0, e:"Whole number between 0 and 100."},
    {q:"Why pair a drop-down list with VLOOKUP?", o:["Choices are always spelt correctly, so the lookup always finds a match","It makes the file smaller","VLOOKUP needs colours","It hides the table"], a:0, e:"Valid choices prevent #N/A from typos."},
    {q:"Does validation check data that was already typed before the rule?", o:["No; use Circle Invalid Data to find it","Yes, it deletes it","Yes, it fixes it","Only on save"], a:0, e:"Validation checks new entries; Circle Invalid Data finds old ones."},
    {q:"How do you remove validation from cells?", o:["Data Validation → Clear All","Press Ctrl + Z twice","Hide the column","Protect the sheet"], a:0, e:"Clear All removes the rules."}
  ]
});

/* ============================ DAY 29 ============================ */
LESSONS.push({
  day: 29, week: 6, mins: 55,
  title: "PivotTables",
  sub: "Summarise thousands of rows with drag and drop",
  goals: ["Explain what a PivotTable does","Create a PivotTable from a data range","Use Rows, Columns, Values and Filters areas","Group dates and numbers, drill into details and fix grouping errors"],
  sections: [
    { h: "What is a PivotTable?",
      html: `<p>A <b>PivotTable</b> takes a big list and turns it into a <b>summary table</b> in seconds, without a single formula. It can show:</p>
<ol><li>The <b>number</b> of items of each type</li><li>The <b>sum</b> of a column, broken down by type</li><li>The <b>average</b> of a column, broken down by type</li></ol>
<p>Example: a list of every sale in the first quarter (date, invoice, amount, sales rep, region). One PivotTable shows the total for each rep; another breaks it down by month and region.</p>`,
      figs: [["071-258","The source data: one row per sale with Date, Invoice Ref, Amount, Sales Rep. and Region."],["070-254","A simple PivotTable: total sales for each of the four reps."],["070-255","A richer PivotTable: sales by month for each rep and region."]] },
    { h: "Creating a PivotTable",
      html: `<ol><li>Click <b>any cell</b> in the data (Excel selects the whole range).</li>
<li><b>Insert → Tables → PivotTable</b>.</li>
<li>Check the range, choose <b>New Worksheet</b>, OK.</li>
<li>In the <b>PivotTable Fields</b> pane (called <i>Field List</i> in 2010), drag <b>Sales Rep.</b> to <b>Rows</b> (Row Labels) and <b>Amount</b> to <b>Σ Values</b>.</li>
<li>Check it says <b>Sum of Amount</b>, not <i>Count of Amount</i>. If not, click it → Value Field Settings → Sum.</li>
<li>Format the numbers as currency: select them → Home → Number → Currency.</li></ol>`,
      figs: [["072-261","Insert → PivotTable."],["072-262","The Create PivotTable dialog: choose the data and where to place the report."],["073-265","The Field List: drag fields into Row Labels and Σ Values."]] },
    { h: "Build one yourself",
      html: `<p>This is a live PivotTable on 30 sales. Pick fields for Rows, Columns and Values and the summary function. <b>Click any number</b> to drill down and see the sales behind it, just like double-clicking in Excel, which creates a new sheet listing those rows.</p>`,
      widget: { type: "pivot", data: DATA_SALES } },
    { h: "Grouping",
      html: `<p>Excel can group numbers and dates automatically:</p>
<ul><li><b>Dates → months</b>: right-click a date in the PivotTable → <b>Group…</b> → select <b>Months</b> → OK. Daily totals become monthly totals.</li>
<li><b>Numbers → ranges</b>: right-click the ages → Group… → Starting at 5, Ending at 16, <b>By 4</b> → OK. You get 5–8, 9–12, 13–16.</li>
<li><b>Ungroup</b>: right-click → Ungroup.</li></ul>
<p><b>"Cannot group that selection"</b> (or Group greyed out) usually means the source column contains some <b>text or errors</b> among the numbers or dates. Fix the source data, then right-click the PivotTable → <b>Refresh</b>.</p>`,
      figs: [["074-276","The Grouping dialog for dates: choose Months."],["075-279","Sales grouped into Jan, Feb and Mar."],["076-285","The 'Cannot group that selection' error."]],
      note: `PivotTables don't update by themselves when the source data changes. Right-click → <b>Refresh</b> (or Data → Refresh All). <b>Slicers</b> (PivotTable Analyze → Insert Slicer) add big clickable filter buttons.`,
      remember: `Insert → PivotTable → drag fields to Rows, Columns, Values, Filters. Check Sum vs Count. Right-click → Group for months or ranges. Refresh after the data changes.` }
  ],
  terms: [["PivotTable","An interactive summary of a data list."],["Field","A column heading from the source data."],["Rows / Columns","Areas that set the table's row and column labels."],["Values (Σ)","The numbers being summarised (Sum, Count, Average…)."],["Filters","Area for a field that filters the whole PivotTable."],["Group","Combine dates into months or numbers into ranges."],["Refresh","Update the PivotTable after the source data changes."],["Drill down","Double-click a value to list the rows behind it."]],
  tryit: ["Make a PivotTable of total sales by rep.","Add Region to Columns.","Change Sum of Amount to Average of Amount.","Group the dates by month, then double-click one value to drill down."],
  links: [["Create a PivotTable to analyze worksheet data","https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data-a9a84538-bfe9-40a9-a8e9-f99134456576"],["Group or ungroup data in a PivotTable","https://support.microsoft.com/en-us/office/group-or-ungroup-data-in-a-pivottable-c9d1ddd0-6580-47d1-82bc-c84a5a340725"],["Use slicers to filter data","https://support.microsoft.com/en-us/office/use-slicers-to-filter-data-249f966b-a9d5-4b0f-b31a-12651785d29d"]],
  quiz: [
    {q:"What does a PivotTable do?", o:["Summarises a large list without formulas","Deletes duplicate rows","Protects a sheet","Prints labels"], a:0, e:"PivotTables summarise data by dragging fields."},
    {q:"Where do you insert a PivotTable?", o:["Insert → Tables → PivotTable","Data → Filter","Home → Styles","View → Window"], a:0, e:"Insert tab → Tables group."},
    {q:"To show total sales per rep, where does Sales Rep. go?", o:["Rows","Values","Filters","Nowhere"], a:0, e:"The grouping field goes in Rows."},
    {q:"Where does Amount go to be totalled?", o:["Σ Values","Rows","Columns only","Filters"], a:0, e:"Numbers to summarise go in Values."},
    {q:"The Values area shows 'Count of Amount' but you want totals. What do you do?", o:["Change Value Field Settings to Sum","Delete the PivotTable","Sort the data","Add a filter"], a:0, e:"Switch the summary function to Sum."},
    {q:"How do you see the individual sales behind a PivotTable number?", o:["Double-click the number","Press F4","Right-click → Hide","Use Ctrl + T"], a:0, e:"Double-clicking drills down to a new sheet of details."},
    {q:"How do you group daily dates into months?", o:["Right-click a date → Group → Months","Sort by date","Use COUNTIF","Merge the cells"], a:0, e:"Group… with Months selected."},
    {q:"Grouping ages 5–16 'By 4' creates…", o:["5–8, 9–12, 13–16","5–9, 10–14, 15–16","4, 8, 12, 16","Only one group"], a:0, e:"Each group spans 4 years starting at 5."},
    {q:"'Cannot group that selection' usually means…", o:["The source column contains text or errors","The PivotTable is too big","You need a password","The file is read-only"], a:0, e:"Non-numeric or non-date values block grouping."},
    {q:"The source data changed. How do you update the PivotTable?", o:["Right-click → Refresh","It updates instantly by itself","Recreate it every time","Press Esc"], a:0, e:"PivotTables need a Refresh."}
  ]
});

/* ============================ DAY 30 ============================ */
LESSONS.push({
  day: 30, week: 6, mins: 55,
  title: "Auditing, macros & next steps",
  sub: "Find formula problems, automate tasks and finish the course",
  goals: ["Show formulas instead of results","Trace precedents, dependents and errors","Find circular references and evaluate formulas step by step","Know what macros are and how to record one"],
  sections: [
    { h: "Viewing formulas",
      html: `<p>To understand someone else's workbook, show the <b>formulas</b> instead of the results: <b>Formulas → Formula Auditing → Show Formulas</b>, or press <b>Ctrl + &#96;</b> (the grave accent key, usually above Tab). Press again to go back.</p>
<p>Tip: open <b>View → New Window</b> first, so one window shows formulas and the other shows results.</p>` },
    { h: "Precedents and dependents",
      html: `<ul><li><b>Precedents</b> of a formula cell are the cells it uses. In A4 containing <code>=SUM(A1:A3)</code>, A1, A2 and A3 are <b>direct precedents</b>. A cell used by one of those cells is an <b>indirect precedent</b>.</li>
<li><b>Dependents</b> of a cell are the formulas that use it. A1, A2 and A3 each have A4 as a dependent.</li></ul>
<p>Before deleting a cell, check whether it has dependents!</p>
<p><b>Ways to find precedents:</b></p>
<ul><li><b>F2</b>: the used cells are outlined in colours matching the formula.</li>
<li><b>Home → Find &amp; Select → Go To Special → Precedents</b> (Direct only / All levels).</li>
<li><b>Ctrl + [</b> selects direct precedents; <b>Ctrl + Shift + {</b> selects all levels.</li>
<li><b>Formulas → Trace Precedents</b> draws blue arrows (click again for more levels). <b>Trace Dependents</b> does the opposite. <b>Remove Arrows</b> clears them.</li></ul>` },
    { h: "Try the auditing tools",
      html: `<p>Click a cell, then use the buttons. The last row contains an error for you to trace.</p>`,
      widget: { type: "audit", data: [["Item","Price","Qty","Total"],["Notebook",45,4,"=B2*C2"],["Pen",10,6,"=B3*C3"],["Bag",650,1,"=B4*C4"],["Bottle",250,0,"=B5*C5"],["Grand total",null,"=SUM(C2:C5)","=SUM(D2:D5)"],["Average per item",null,null,"=D6/C6"],["Cost per bottle",null,null,"=D5/C5"]] } },
    { h: "Errors, circles and the Formula Evaluator",
      html: `<ul><li><b>Trace Error</b>: select a cell showing an error → Formulas → Error Checking ▾ → <b>Trace Error</b>. Arrows lead to the cell that caused it (errors usually come from a precedent).</li>
<li><b>Circular reference</b>: a formula that refers to itself, directly or indirectly (e.g. A5 contains <code>=SUM(A1:A5)</code>). Excel warns you and shows "Circular References" with the cell address in the Status Bar. Formulas → Error Checking ▾ → <b>Circular References</b> lists the cells to fix.</li>
<li><b>Evaluate Formula</b>: Formulas → <b>Evaluate Formula</b> shows a long formula being calculated one step at a time, which is perfect for nested IFs.</li></ul>` },
    { h: "Macros: record once, replay forever",
      html: `<p>If you repeat the same steps every week (formatting a report, adding the same headings), a <b>macro</b> can do them for you in one click. It saves time and avoids mistakes.</p>
<p>Two ways to create one:</p>
<ul><li><b>Macro Recorder</b> (easiest): View → Macros → <b>Record Macro</b>, give it a name (and an optional shortcut), do your steps, then <b>Stop Recording</b>. Run it with View → Macros → View Macros → Run.</li>
<li><b>Macro editor</b> (VBA, Alt + F11): writing the code yourself. It's very powerful but needs programming skills.</li></ul>
<p>Workbooks with macros must be saved as <b>.xlsm</b> (Excel Macro-Enabled Workbook). Only enable macros in files you trust, because macros can also be used by harmful files.</p>` },
    { h: "Congratulations, and what next?",
      html: `<p>You've covered the whole handbook: the Excel window, formatting, sheets, protection, printing, formulas, functions, references, names, logic, conditional formatting, sorting, filtering, subtotals, tables, lookups, validation, PivotTables, auditing and macros. That's a strong foundation!</p>
<ul><li>Practise with real data: your marks, a family budget, sports scores.</li>
<li>Explore charts (Insert → Charts), XLOOKUP, SUMIFS and Power Query next.</li>
<li>When you're ready, the <b>Microsoft Office Specialist (MOS): Excel Associate</b> certification is a recognised proof of your skills.</li>
<li>Continue with our <b>Power BI Learning Lab</b> to turn Excel data into interactive dashboards.</li></ul>`,
      remember: `Ctrl + \` shows formulas. Trace Precedents / Dependents / Error draw arrows. Circular references refer to themselves. Record Macro automates repeated steps; save as .xlsm.` }
  ],
  terms: [["Show Formulas","Display formulas instead of results (Ctrl + `)."],["Precedent","A cell used by a formula."],["Dependent","A formula that uses a cell."],["Trace Error","Arrows pointing to the source of an error."],["Circular reference","A formula that depends on its own cell."],["Evaluate Formula","Step-by-step calculation of a formula."],["Macro","A recorded set of actions you can replay."],[".xlsm","Macro-enabled workbook file type."]],
  tryit: ["Open a workbook with formulas and press Ctrl + `.","Select a total and click Trace Precedents twice. Remove Arrows.","Create a circular reference on purpose (=A1+1 in A1) and read the Status Bar. Then fix it.","Record a macro that makes the selected cells bold, yellow and bordered, and run it on another range."],
  links: [["Display the relationships between formulas and cells","https://support.microsoft.com/en-us/office/display-the-relationships-between-formulas-and-cells-a59bef2b-3701-46bf-8ff1-d3518771d507"],["Remove or allow a circular reference","https://support.microsoft.com/en-us/office/remove-or-allow-a-circular-reference-8540bd0f-6e97-4483-bcf7-1b49cd50d123"],["Evaluate a nested formula one step at a time","https://support.microsoft.com/en-us/office/evaluate-a-nested-formula-one-step-at-a-time-59a201ae-d1dc-4b15-8586-a70aa409b8a7"],["Automate tasks with the Macro Recorder","https://support.microsoft.com/en-us/office/automate-tasks-with-the-macro-recorder-974ef220-f716-4e01-b015-3ea70e64937b"]],
  quiz: [
    {q:"Which shortcut toggles Show Formulas?", o:["Ctrl + `","Ctrl + F","Ctrl + 1","Alt + F11"], a:0, e:"Ctrl + grave accent shows or hides formulas."},
    {q:"In A4 = SUM(A1:A3), what are A1, A2 and A3?", o:["Direct precedents of A4","Dependents of A4","Circular references","Hidden cells"], a:0, e:"They feed directly into A4's formula."},
    {q:"What is a dependent?", o:["A formula cell that uses a given cell","A cell with a comment","A merged cell","A protected cell"], a:0, e:"Dependents rely on the cell's value."},
    {q:"Which command draws arrows from the cells a formula uses?", o:["Trace Precedents","Trace Dependents","Remove Arrows","Show Formulas"], a:0, e:"Trace Precedents shows where the inputs come from."},
    {q:"Which shortcut selects a formula's direct precedents?", o:["Ctrl + [","Ctrl + ]","Ctrl + P","Ctrl + ;"], a:0, e:"Ctrl + [ selects direct precedents."},
    {q:"What is a circular reference?", o:["A formula that refers to its own cell, directly or indirectly","A round chart","A reference to another workbook","A named range"], a:0, e:"It creates an endless loop."},
    {q:"Which tool calculates a formula one step at a time?", o:["Evaluate Formula","Watch Window","Flash Fill","AutoSum"], a:0, e:"Evaluate Formula shows each step."},
    {q:"What is the easiest way to create a macro?", o:["The Macro Recorder","Writing VBA from scratch","Conditional Formatting","Data Validation"], a:0, e:"Record your steps and Excel writes the macro."},
    {q:"Which file type saves a workbook with macros?", o:[".xlsm",".xlsx",".csv",".pdf"], a:0, e:"Macro-enabled workbooks use .xlsm."},
    {q:"Which shortcut opens the VBA macro editor?", o:["Alt + F11","Ctrl + F11","Shift + F2","F7"], a:0, e:"Alt + F11 opens the Visual Basic Editor."}
  ]
});
