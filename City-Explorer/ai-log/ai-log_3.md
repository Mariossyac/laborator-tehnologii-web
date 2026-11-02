## AI Log — Laboratorul 3

* **Unelte folosite:** Gemini
* **Scopul utilizării:** Suport pentru dezvoltarea componentelor React, gestionarea stării (`useState`), transmiterea datelor prin `props` și formulare controlate.
* **Interacțiuni principale:**
  1. **Arhitectură de componente & Props:** Descompunerea interfeței în componente independente (`DestinatieCard`, `ListaDestinatii`, `Rezumat`, `FormularDestinatie`) și transmiterea datelor de sus în jos prin props.
  2. **Gestiunea stării cu `useState`:** Administrarea listei în starea componentei `App` și propagarea evenimentelor în sus prin funcții callback (`handleToggle`, `handleAdd`, `handleDelete`) pentru actualizări imutabile.
  3. **Formulare controlate & Validare:** Legarea câmpurilor de input la starea locală a formularului, oprirea reîncărcării paginii cu `event.preventDefault()` și generarea de id-uri unice cu `crypto.randomUUID()`.

