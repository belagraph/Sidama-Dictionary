"use client";

import { useMemo, useState } from "react";
import { categories, phrases, searchPhrases, type Phrase } from "@/lib/dictionary";

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All phrases");
  const [selected, setSelected] = useState<Phrase | null>(null);

  const results = useMemo(() => {
    const found = searchPhrases(query);
    return category === "All phrases" ? found : found.filter((item) => item.category === category);
  }, [query, category]);

  const categoryCounts = (name: string) => phrases.filter((item) => item.category === name).length;

  function speak(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
    }
  }

  return (
    <main>
      <div className="topline"><span className="live-dot" /> A simple guide to everyday Sidaamu Afoo <span className="topline-right">Learn a phrase. Connect with people.</span></div>
      <header className="site-header wrap">
        <a className="brand" href="#"><span className="brand-mark">S</span><span><strong>Sidaamu Afoo</strong><small>SPOKEN LANGUAGE GUIDE</small></span></a>
        <nav><a href="#categories">Categories</a><a href="#about">About</a></nav>
        <a className="header-action" href="#categories">Explore phrases <span>↗</span></a>
      </header>

      <section className="hero">
        <div className="hero-decoration" />
        <div className="wrap hero-content">
          <div className="eyebrow"><span /> ENGLISH · SIDAAMU AFO · AMHARIC</div>
          <h1>Speak a little.<br /><em>Connect a lot.</em></h1>
          <p className="hero-description">A friendly spoken-language guide for everyday conversations in Sidaamu Afoo.</p>
          <div className="search-box">
            <span className="search-symbol">⌕</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setCategory("All phrases"); }} placeholder="Search a phrase in English, Sidaamu Afoo or Amharic..." aria-label="Search phrases" />
            {query && <button className="clear-search" onClick={() => setQuery("")} aria-label="Clear search">×</button>}
            <button className="search-submit" onClick={() => document.getElementById("phrase-results")?.scrollIntoView({ behavior: "smooth" })}>Search <span>→</span></button>
          </div>
          <div className="language-order"><span><b>01</b> English</span><span><b>02</b> Sidaamu Afoo</span><span><b>03</b> Amharic</span></div>
        </div>
      </section>

      <section className="quick-categories wrap" id="categories">
        <div className="section-top"><div><div className="eyebrow dark"><span /> START WITH A SITUATION</div><h2>What do you want to <em>say?</em></h2></div><p>Choose a topic and find the right expression for the moment.</p></div>
        <div className="category-grid">
          {categories.map((item, index) => (
            <button key={item.name} className={category === item.name ? "category-card active" : "category-card"} onClick={() => { setCategory(item.name); setQuery(""); document.getElementById("phrase-results")?.scrollIntoView({ behavior: "smooth" }); }}>
              <span className="category-index">{String(index + 1).padStart(2, "0")}</span><span className="category-icon">{item.icon}</span><strong>{item.name}</strong><small>{item.description}</small><span className="category-count">{categoryCounts(item.name)} phrases <b>↗</b></span>
            </button>
          ))}
        </div>
      </section>

      <section className="phrase-section" id="phrase-results">
        <div className="wrap">
          <div className="phrase-heading"><div><div className="eyebrow dark"><span /> PHRASEBOOK</div><h2>{category === "All phrases" ? "Everyday expressions" : category}</h2><p>English first, followed by Sidaamu Afoo and Amharic.</p></div><button className="all-button" onClick={() => setCategory("All phrases")}>All categories <span>↗</span></button></div>
          <div className="filter-row"><span>{category === "All phrases" ? "ALL CATEGORIES" : category.toUpperCase()}</span><span>{results.length} {results.length === 1 ? "PHRASE" : "PHRASES"}</span></div>
          {results.length === 0 ? (
            <div className="empty-phrases"><div className="empty-icon">“ ”</div><h3>{query ? "No phrase found yet" : "Your conversations start here."}</h3><p>{query ? "Try another search, or add this expression through the admin import sheet." : "Phrases for this category will appear here as you add them from the admin side. No unverified translations are shown."}</p><a href="/admin" className="admin-link">Go to phrase manager <span>→</span></a></div>
          ) : (
            <div className="phrase-list">{results.map((item) => <article className="phrase-card" key={item.id}><button className="phrase-main" onClick={() => setSelected(item)}><span className="phrase-label">ENGLISH</span><strong>{item.english}</strong><span className="phrase-use">{item.usage || item.category}</span></button><div className="phrase-translations"><span>SIDAAMU AFO</span><strong>{item.sidamaLatin || "Translation pending"}</strong>{item.sidamaEthiopic && <strong className="ethiopic">{item.sidamaEthiopic}</strong>}<span>AMHARIC</span><strong>{item.amharic || "Translation pending"}</strong></div><button className="listen-button" onClick={() => speak(item.english)} aria-label="Play English pronunciation">▶</button></article>)}</div>
          )}
        </div>
      </section>

      <section className="how-section"><div className="wrap how-inner"><div><div className="eyebrow"><span /> EASY TO USE</div><h2>Learn it. Hear it.<br /><em>Use it.</em></h2></div><div className="steps"><div><b>01</b><span><strong>Choose a category</strong><small>Find expressions by everyday situation.</small></span></div><div><b>02</b><span><strong>Compare the languages</strong><small>Read English, Sidaamu Afoo and Amharic side by side.</small></span></div><div><b>03</b><span><strong>Listen and practise</strong><small>Use pronunciation audio when it is added to a phrase.</small></span></div></div></div></section>

      <section className="about-section" id="about"><div className="wrap about-inner"><div><div className="eyebrow dark"><span /> ABOUT THIS PROJECT</div><h2>Language lives in the way we <em>speak.</em></h2></div><p>This phrasebook is designed to make spoken Sidaamu Afoo easier to explore. It focuses on useful expressions, real-life situations, and clear translations. Community-reviewed contributions help keep every phrase accurate.</p></div></section>
      <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#"><span className="brand-mark">S</span><span><strong>Sidaamu Afoo</strong><small>SPOKEN LANGUAGE GUIDE</small></span></a><span>Preserving everyday expressions, together.</span><a href="/admin">Admin phrase manager ↗</a></div></footer>

      {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><section className="phrase-modal" onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)}>×</button><span className="phrase-label">ENGLISH</span><h2>{selected.english}</h2>{selected.usage && <p className="modal-usage">{selected.usage}</p>}<div className="detail-language"><span>SIDAAMU AFO · LATIN</span><strong>{selected.sidamaLatin || "Translation pending"}</strong></div>{selected.sidamaEthiopic && <div className="detail-language"><span>SIDAAMU AFO · ETHIOPIC</span><strong>{selected.sidamaEthiopic}</strong></div>}<div className="detail-language"><span>AMHARIC</span><strong>{selected.amharic || "Translation pending"}</strong></div>{selected.exampleEnglish && <div className="example-box"><span>EXAMPLE</span><p>{selected.exampleEnglish}</p>{selected.exampleSidama && <p>{selected.exampleSidama}</p>}</div>}<button className="search-submit modal-listen" onClick={() => speak(selected.english)}>Listen to English <span>▶</span></button></section></div>}
    </main>
  );
}
