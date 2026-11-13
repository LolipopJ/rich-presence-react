import "./App.css";
import "rich-presence-react/style.css";

import React, { useEffect, useState } from "react";
import RichPresence, {
  type RichPresenceActivity,
  type RichPresenceLocale,
} from "rich-presence-react";

import {
  DEMO_CATEGORIES,
  type DemoCategory,
  DOCS_PACKAGE_NAME,
  DOCS_PACKAGE_VERSION,
  DOCS_REPOSITORY_URL,
  HIGHLIGHT_CDN,
  HIGHLIGHT_SCRIPT_ID,
  HIGHLIGHT_STYLE_ID,
  RICH_PRESENCES,
} from "./constants";

declare global {
  interface Window {
    hljs?: {
      highlightElement: (element: Element) => void;
    };
  }
}

type ThemeOption = "light" | "dark";
type SizeOption = "normal" | "large";

const getReactSnippet = (
  activityData: RichPresenceActivity,
  theme: ThemeOption,
  size: SizeOption,
  locale: RichPresenceLocale,
): string => {
  const activity = JSON.stringify(activityData, null, 2);

  return `import RichPresence from "rich-presence-react";
import "rich-presence-react/style.css";

const activity = ${activity};

<RichPresence
  activity={activity}
  theme="${theme}"
  size="${size}"
  locale="${locale}"
/>`;
};

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    DemoCategory | "all"
  >("all");
  const [theme, setTheme] = useState<ThemeOption>("light");
  const [size, setSize] = useState<SizeOption>("normal");
  const [locale, setLocale] = useState<RichPresenceLocale>("en");

  const filteredPresences =
    selectedCategory === "all"
      ? RICH_PRESENCES
      : RICH_PRESENCES.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    const highlightBlocks = () => {
      if (!window.hljs) {
        return;
      }

      document
        .querySelectorAll<HTMLElement>(".demo-card__code code")
        .forEach((block) => {
          if (block.dataset.highlighted !== "yes") {
            window.hljs?.highlightElement(block);
          }
        });
    };

    if (!document.getElementById(HIGHLIGHT_STYLE_ID)) {
      const style = document.createElement("link");
      style.id = HIGHLIGHT_STYLE_ID;
      style.rel = "stylesheet";
      style.href = `${HIGHLIGHT_CDN}/styles/atom-one-dark.min.css`;
      document.head.appendChild(style);
    }

    if (window.hljs) {
      highlightBlocks();
      return;
    }

    const existingScript = document.getElementById(
      HIGHLIGHT_SCRIPT_ID,
    ) as HTMLScriptElement | null;

    if (existingScript) {
      existingScript.addEventListener("load", highlightBlocks);
      return () => {
        existingScript.removeEventListener("load", highlightBlocks);
      };
    }

    const script = document.createElement("script");
    script.id = HIGHLIGHT_SCRIPT_ID;
    script.src = `${HIGHLIGHT_CDN}/highlight.min.js`;
    script.defer = true;
    script.addEventListener("load", highlightBlocks);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener("load", highlightBlocks);
    };
  }, [selectedCategory, theme, size, locale]);

  return (
    <main className="docs-shell">
      <header className="docs-header">
        <div className="docs-header__top">
          <div className="docs-header__labels">
            <p className="docs-header__eyebrow">{DOCS_PACKAGE_NAME}</p>
            <span className="docs-header__version">
              v{DOCS_PACKAGE_VERSION}
            </span>
          </div>
          <a
            className="docs-header__github"
            href={DOCS_REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Open GitHub repository"
            title="Open GitHub repository"
          >
            <svg
              className="docs-header__github-icon"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 0.3a12 12 0 0 0-3.8 23.4c0.6 0.1 0.8-0.2 0.8-0.6v-2.2c-3.4 0.8-4.1-1.4-4.1-1.4-0.6-1.4-1.4-1.8-1.4-1.8-1.1-0.8 0.1-0.8 0.1-0.8 1.2 0.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 0.1-0.8 0.4-1.3 0.8-1.6-2.7-0.3-5.6-1.4-5.6-6a4.7 4.7 0 0 1 1.2-3.2 4.3 4.3 0 0 1 0.1-3.2s1-0.3 3.3 1.2a11.2 11.2 0 0 1 6 0c2.3-1.6 3.3-1.2 3.3-1.2a4.3 4.3 0 0 1 0.1 3.2 4.7 4.7 0 0 1 1.2 3.2c0 4.6-2.8 5.6-5.6 6a2.9 2.9 0 0 1 0.8 2.2v3.2c0 0.4 0.2 0.8 0.8 0.6A12 12 0 0 0 12 0.3" />
            </svg>
          </a>
        </div>
        <h1>Rich Presence Preview</h1>
        <p className="docs-header__subtitle">
          Preview each rich presence card alongside its React usage snippet.
        </p>
      </header>

      <section className="docs-controls" aria-label="Preview controls">
        <div className="docs-toolbar">
          <div className="docs-toolbar__group" role="group" aria-label="Theme">
            <span className="docs-toolbar__label">Theme</span>
            <div className="docs-segmented">
              {(["light", "dark"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`docs-segmented__btn${
                    theme === option ? " is-active" : ""
                  }`}
                  onClick={() => setTheme(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="docs-toolbar__group" role="group" aria-label="Size">
            <span className="docs-toolbar__label">Size</span>
            <div className="docs-segmented">
              {(["normal", "large"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`docs-segmented__btn${
                    size === option ? " is-active" : ""
                  }`}
                  onClick={() => setSize(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="docs-toolbar__group" role="group" aria-label="Locale">
            <span className="docs-toolbar__label">Locale</span>
            <div className="docs-segmented">
              {(["en", "zh"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  className={`docs-segmented__btn${
                    locale === option ? " is-active" : ""
                  }`}
                  onClick={() => setLocale(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <nav className="docs-categories" aria-label="Activity types">
          {DEMO_CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`docs-category-pill${
                selectedCategory === category.id ? " is-active" : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </section>

      <section className="demo-list">
        {filteredPresences.map((richPresence) => {
          const snippet = getReactSnippet(
            richPresence.activity,
            theme,
            size,
            locale,
          );

          return (
            <article
              className="demo-card"
              data-theme={theme}
              key={richPresence.id}
            >
              <div className="demo-card__preview">
                <div className="demo-card__meta">
                  <span className="demo-card__title">{richPresence.title}</span>
                  <span className="demo-card__config">
                    {theme} / {size} / {locale}
                  </span>
                </div>
                <div className="demo-card__presence-frame">
                  <div className="demo-card__presence">
                    <RichPresence
                      activity={richPresence.activity}
                      theme={theme}
                      size={size}
                      locale={locale}
                    />
                  </div>
                </div>
              </div>

              <div className="demo-card__code">
                <div className="demo-card__code-label">React</div>
                <pre>
                  <code className="language-jsx" key={snippet}>
                    {snippet}
                  </code>
                </pre>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default App;
