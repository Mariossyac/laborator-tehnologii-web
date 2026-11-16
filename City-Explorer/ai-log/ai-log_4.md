## AI Log — Laboratorul 4

* **Unelte folosite:** Claude Code
* **Scopul utilizării:** Implementarea etapei 4 (date de la server cu `fetch`, `useEffect`, formular cu validare, randare condiționată, depanare și paginare) după instrucțiunile din PDF.
* **Interacțiuni principale:**
  1. **Server de test & modul API:** configurarea `json-server` pe `db.json` și scrierea `src/api/destinatii.js` (`getDestinatii`, `postDestinatie`, `patchVizitat`) cu verificarea `response.ok`.
  2. **Cele trei stări ale cererii:** încărcare / eroare / date în `App.jsx`, cu oprirea indicatorului în `finally`.
  3. **Formular cu validare:** valori într-un singur obiect, funcția `valideaza`, clasele `invalid` / `eroare-camp`, butonul dezactivat cât timp cererea e în curs.
  4. **Depanare (Ex. 4):** identificarea celor 7 greșeli din `PanouStatistici` (5 în JSX, 2 în CSS).
  5. **Paginare (Ex. 5):** `_page` / `_per_page` cu `pagina` în lista de dependențe a efectului.
