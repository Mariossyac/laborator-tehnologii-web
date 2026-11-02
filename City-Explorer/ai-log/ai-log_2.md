## AI Log — Laboratorul 2

* **Unelte folosite:** Gemini
* **Scopul utilizării:** Suport pentru debugging și clarificarea unor concepte de JavaScript modern (ES6 Modules, imutabilitate și Fetch API).
* **Interacțiuni principale:**
  1. **Debugging Vite & ES Modules:** Identificarea cauzei pentru erorile `Failed to resolve import "./assets/hero.png"` (rămasă în `App.jsx` după curățarea template-ului) și `does not provide an export named 'adaugaDestinatie'` (cauzată de nesalvarea fișierului `utils/destinatii.js` după adăugarea exporturilor).
  2. **Sintaxă Arrow Functions & Imutabilitate:** Clarificarea încadrării în paranteze rotunde `({ ... })` la returnarea implicită a unui obiect în metoda `.reduce()` și utilizarea copiei `[...list]` înainte de aplicarea metodei `.sort()`, pentru a nu modifica lista originală.
  3. **Fetch API & Async/Await:** Clarificarea comportamentului `response.ok` pentru captarea erorii `HTTP 404` în blocul `try/catch` la interogarea unui ID inexistent pe `jsonplaceholder`.