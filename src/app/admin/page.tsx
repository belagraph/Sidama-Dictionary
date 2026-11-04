"use client";

import { useMemo, useState } from "react";

type Row = Record<string, string>;
const requiredColumns = ["english", "sidamaLatin", "amharic", "category"];
const allColumns = ["id", "english", "sidamaLatin", "sidamaEthiopic", "amharic", "category", "usage", "pronunciation", "audioUrl", "exampleEnglish", "exampleSidama", "exampleAmharic", "verified"];

function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [], cell = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const char = text[i], next = text[i + 1];
    if (char === '"' && quoted && next === '"') { cell += '"'; i++; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(cell.trim()); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i++;
      row.push(cell.trim()); if (row.some((value) => value !== "")) rows.push(row);
      row = []; cell = "";
    } else cell += char;
  }
  row.push(cell.trim()); if (row.some((value) => value !== "")) rows.push(row);
  return rows;
}

export default function AdminPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const validCount = useMemo(() => rows.filter((row) => requiredColumns.every((key) => row[key]?.trim())).length, [rows]);

  async function handleFile(file?: File) {
    if (!file) return;
    setError(""); setMessage(""); setFileName(file.name);
    try {
      const raw = await file.text();
      if (file.name.toLowerCase().endsWith(".json")) {
        const parsed = JSON.parse(raw);
        if (!Array.isArray(parsed)) throw new Error("JSON file must contain an array of phrase objects.");
        setRows(parsed.map((item) => Object.fromEntries(allColumns.map((key) => [key, String(item?.[key] ?? "")]))));
      } else {
        const parsed = parseCsv(raw);
        if (parsed.length < 2) throw new Error("The CSV needs a header row and at least one phrase row.");
        const headers = parsed[0].map((header) => header.trim());
        const missing = requiredColumns.filter((key) => !headers.includes(key));
        if (missing.length) throw new Error("Missing required columns: " + missing.join(", "));
        setRows(parsed.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]))));
      }
    } catch (err) {
      setRows([]); setError(err instanceof Error ? err.message : "Could not read this file.");
    }
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "sidaamu-phrases-import.json"; anchor.click(); URL.revokeObjectURL(url);
    setMessage("Validated JSON export downloaded. It is not yet published to the public phrasebook.");
  }

  return <main className="admin-page"><header className="admin-header"><a href="/" className="admin-back">← Back to phrasebook</a><span className="admin-tag">CONTENT MANAGEMENT</span></header><div className="admin-wrap"><div className="admin-eyebrow">SIDAAMU AFO · ADMIN</div><h1>Phrase <em>manager.</em></h1><p className="admin-lead">Prepare your spoken-language dictionary content in Google Sheets, then import it here for a quick check.</p>
    <section className="admin-card"><div className="step-number">01</div><div><h2>Use the import template</h2><p>Make a copy of the CSV template or use the same column names in your Google Sheet. Export your sheet as CSV before importing.</p><a className="download-template" href="/phrase-import-template.csv" download>Download CSV template ↧</a></div></section>
    <section className="admin-card"><div className="step-number">02</div><div className="upload-content"><h2>Import your phrases</h2><p>Upload a CSV exported from Google Sheets, or a JSON file. Required columns: English, Sidaamu Afoo (Latin), Amharic and Category.</p><label className="upload-button">Choose CSV or JSON file<input type="file" accept=".csv,.json,text/csv,application/json" onChange={(event) => handleFile(event.target.files?.[0])} /></label>{fileName && <span className="file-name">{fileName}</span>}{error && <p className="error-message">{error}</p>}</div></section>
    {rows.length > 0 && <section className="preview-card"><div className="preview-head"><div><span className="admin-eyebrow">03 · REVIEW IMPORT</span><h2>Import preview</h2></div><div className="preview-count">{validCount} / {rows.length} complete</div></div><p className="preview-note">Rows missing any required field are incomplete. Review all translations before publishing.</p><div className="table-scroll"><table><thead><tr><th>English</th><th>Sidaamu Afoo</th><th>Amharic</th><th>Category</th><th>Status</th></tr></thead><tbody>{rows.slice(0, 30).map((row, index) => <tr key={index}><td>{row.english || "—"}</td><td>{row.sidamaLatin || "—"}</td><td>{row.amharic || "—"}</td><td>{row.category || "—"}</td><td><span className={requiredColumns.every((key) => row[key]?.trim()) ? "status-ok" : "status-missing"}>{requiredColumns.every((key) => row[key]?.trim()) ? "Complete" : "Needs info"}</span></td></tr>)}</tbody></table></div>{rows.length > 30 && <p className="preview-note">Showing first 30 rows of {rows.length}.</p>}<button className="export-button" onClick={downloadJson}>Download validated JSON ↧</button>{message && <p className="success-message">{message}</p>}</section>}
    <section className="admin-note"><strong>Important: publishing is not connected yet.</strong><p>This first version checks your import and prepares a JSON file. It does not save phrases to a shared database or publish them on the public site. The next technical step is connecting a database and admin login so your approved imports appear for every visitor.</p></section>
    <div className="admin-columns"><div><h3>Recommended workflow</h3><ol><li>Prepare translations in Google Sheets.</li><li>Have a fluent speaker review each phrase.</li><li>Export as CSV and check it here.</li><li>Publish approved entries after database connection.</li></ol></div><div><h3>Language order</h3><p><b>1.</b> English — main search and phrase prompt</p><p><b>2.</b> Sidaamu Afoo — Latin and optional Ethiopic script</p><p><b>3.</b> Amharic — supporting translation</p></div></div>
  </div></main>;
}
