 "use client";

import { useMemo, useState } from "react";
import { categories, searchEntries, type Script } from "@/lib/dictionary";

export default function Home() {
  const [query, setQuery] = useState("");
  const [script, setScript] = useState<Script>("Latin");
  const [category, setCategory] = useState("All words");
  const [activeTab, setActiveTab] = useState("Dictionary");
  const [showSuggest, setShowSuggest] = useState(false);
  const [notice, setNotice] = useState("");

  const results = useMemo(() => {
    const found = searchEntries(query, script);
    return category === "All words" ? found : found.filter((e) => e.category === category);
  }, [query, script, category]);

  function speak(word: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en";
      window.speechSynthesis.speak(utterance);
    } else {
      setNotice("Audio playback is not supported in this browser.");
    }
  }

  return (
    <main>
      <div className="announcement"><span className="dot" /> A community-built resource for Sidaamu Afoo <span className="announce-right">Preserving language. Sharing knowledge.</span></div>
      <header className="header wrap">
        <a className="brand" href="#" aria-label="Sidaamu Afoo Dictionary home">
          <span className="brand-mark">S</span>
          <span><strong>Sidaamu</strong><small>LANGUAGE DICTIONARY</small></span>
        </a>
        <nav className="desktop-nav">
          {["Dictionary", "Categories", "About the language"].map((tab) => (
            <button key={tab} className={activeTab === tab ? "nav-link active" : "nav-link"} onClick={() => { setActiveTab(tab); if (tab === "Dictionary") window.scrollTo({ top: 0, behavior: "smooth" }); else document.getElementById(tab === "Categories" ? "categories" : "about")?.scrollIntoView({ behavior: "smooth" }); }}>{tab}</button>
          ))}
        </nav>
        <button className="contribute top-contribute" onClick={() => setShowSuggest(true)}>＋ Contribute a word</button>
      </header>

      <section className="hero">
        <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
        <div className="wrap hero-inner">
          <div className="eyebrow"><span className="eyebrow-line" /> THE SIDAAMU AFO DICTIONARY</div>
          <h1>Our language.<br /><em>Our words.</em> Our heritage.</h1>
          <p className="hero-copy">Discover the richness of Sidaamu Afoo. Search words, explore meanings, and connect our language with Amharic and English.</p>
          <div className="search-panel">
            <div className="search-top">
              <div className="search-label"><span className="search-icon">⌕</span><span>SEARCH THE DICTIONARY</span></div>
              <div className="script-switch" aria-label="Sidama writing system">
                <button className={script === "Latin" ? "selected" : ""} onClick={() => setScript("Latin")}>Latin</button>
                <button className={script === "Ethiopic" ? "selected" : ""} onClick={() => setScript("Ethiopic")}>Ethiopic</button>
              </div>
            </div>
            <div className="search-row">
              <input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })} placeholder={script === "Latin" ? "Search a Sidaamu Afoo word..." : "በሲዳምኛ ቃል ይፈልጉ..."} aria-label="Search dictionary" />
              <button className="search-button" onClick={() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" })}>Search <span>→</span></button>
            </div>
            <div className="search-hint">You can also search using Amharic or English.</div>
          </div>
          <div className="hero-meta"><span><b>01</b> Sidaamu Afoo first</span><span><b>02</b> Amharic</span><span><b>03</b> English</span></div>
        </div>
      </section>

      <section className="content wrap" id="results">
        <div className="section-heading">
          <div><div className="eyebrow dark"><span className="eyebrow-line" /> EXPLORE THE LANGUAGE</div><h2>Find your <em>word.</em></h2><p className="section-sub">A growing collection of words, meanings, and expressions.</p></div>
          <div className="result-count"><strong>{results.length.toString().padStart(2, "0")}</strong><span>VERIFIED WORDS</span></div>
        </div>
        <div className="dictionary-layout">
          <aside className="sidebar">
            <div className="side-title">BROWSE BY CATEGORY</div>
            {categories.map((item, i) => <button key={item} className={category === item ? "category active-category" : "category"} onClick={() => setCategory(item)}><span className="category-icon">{["✳","⌂","◈","❋","⌁","♧","▤","❝","◉"][i]}</span>{item}<span className="cat-arrow">→</span></button>)}
            <div className="sidebar-note"><span className="note-star">✳</span><strong>Help our language grow.</strong><p>Know a word that should be here? Share it with the community.</p><button onClick={() => setShowSuggest(true)}>Submit a word ↗</button></div>
          </aside>
          <div className="results-area">
            <div className="results-toolbar"><span>{category === "All words" ? "ALL DICTIONARY ENTRIES" : category.toUpperCase()}</span><span className="sort-label">SORTED A–Z <span>⌄</span></span></div>
            {results.length === 0 ? (
              <div className="empty-state">
                <div className="empty-symbol">Aa</div>
                <h3>{query ? "No matching words yet" : "The dictionary is growing."}</h3>
                <p>{query ? "We couldn't find a verified entry for that search. Try another spelling, or help us add it." : "Our word collection is being prepared with the help of Sidaamu Afoo speakers. Be among the first to contribute."}</p>
                <button className="contribute" onClick={() => setShowSuggest(true)}>＋ Contribute a word</button>
                <div className="empty-foot">We publish entries after community review to keep meanings accurate.</div>
              </div>
            ) : results.map((entry) => <article className="word-card" key={entry.id}>
              <div><div className="word-label">SIDAAMU AFO {entry.verified && <span className="verified">✓ VERIFIED</span>}</div><h3>{script === "Latin" ? entry.sidamaLatin : (entry.sidamaEthiopic ?? entry.sidamaLatin)}</h3><p>{entry.pronunciation || "Pronunciation not added"}</p></div>
              <div className="word-translation"><span>AMHARIC</span><strong>{entry.amharic}</strong><span>ENGLISH</span><strong>{entry.english}</strong></div>
              <button className="sound-button" onClick={() => speak(entry.sidamaLatin)} aria-label="Play pronunciation">▶</button>
            </article>)}
            {notice && <p className="notice">{notice}</p>}
          </div>
        </div>
      </section>

      <section className="categories-section" id="categories"><div className="wrap">
        <div className="eyebrow dark"><span className="eyebrow-line" /> DISCOVER MORE</div><h2>Explore by <em>topic.</em></h2>
        <div className="topic-grid">{[
          ["01","Family & relationships","⌂","Words that connect generations."],
          ["02","Culture & traditions","◈","Language, customs, and identity."],
          ["03","Food & agriculture","❋","The land and what it gives."],
          ["04","Nature & environment","⌁","The world around us."],
        ].map(([n,t,icon,desc]) => <button className="topic-card" key={n} onClick={() => { setCategory(t); document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }); }}><span className="topic-number">{n}</span><span className="topic-icon">{icon}</span><strong>{t}</strong><p>{desc}</p><span className="topic-arrow">↗</span></button>)}</div>
      </div></section>

      <section className="about-section" id="about"><div className="wrap about-inner"><div><div className="eyebrow"><span className="eyebrow-line" /> WHY THIS DICTIONARY</div><h2>A language is more than words. It is <em>a world.</em></h2></div><div className="about-copy"><p>This project is dedicated to documenting Sidaamu Afoo and making it easier to learn, share, and pass on to future generations.</p><p>Entries will be reviewed with the help of fluent speakers and language contributors. Each word can include Latin and Ethiopic spellings, explanations, pronunciation, and translations.</p><button onClick={() => setShowSuggest(true)}>Become a contributor <span>↗</span></button></div></div></section>

      <footer className="footer"><div className="wrap footer-inner"><a className="brand footer-brand" href="#"><span className="brand-mark">S</span><span><strong>Sidaamu</strong><small>LANGUAGE DICTIONARY</small></span></a><span>Preserving Sidaamu Afoo, one word at a time.</span><span>© 2026 Sidaamu Dictionary</span></div></footer>

      {showSuggest && <div className="modal-backdrop" onClick={() => setShowSuggest(false)}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setShowSuggest(false)}>×</button><div className="eyebrow dark"><span className="eyebrow-line" /> COMMUNITY CONTRIBUTION</div><h2>Share a <em>word.</em></h2><p className="modal-intro">Help build a reliable Sidaamu Afoo dictionary. Submissions will need review before publication.</p><form onSubmit={(e) => { e.preventDefault(); setShowSuggest(false); setNotice("Thanks for your interest! The contribution form will be connected to the review system in the next development stage."); document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }); }}><label>Sidama word (Latin)<input required placeholder="Enter the word" /></label><label>Sidama spelling (Ethiopic, if known)<input placeholder="Optional" /></label><label>Amharic meaning<input placeholder="የአማርኛ ትርጉም" /></label><label>English meaning<input placeholder="English translation" /></label><label>Your name or contributor ID<input placeholder="Optional" /></label><button className="search-button submit-button" type="submit">Continue <span>→</span></button></form><p className="form-foot">Demo form only — submissions are not saved yet. We will connect it to a secure database and review workflow.</p></div></div>}
    </main>
  );
}
