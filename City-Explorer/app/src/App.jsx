import { useEffect, useState } from 'react'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import { getDestinatii, postDestinatie, patchVizitat } from './api/destinatii.js'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import Rezumat from './components/Rezumat.jsx'
import Cautare from './components/Cautare.jsx'
import PanouStatistici from './components/PanouStatistici.jsx'
import './App.css'

export default function App() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [seTrimite, setSeTrimite] = useState(false)
  const [cautare, setCautare] = useState('')
  const [pagina, setPagina] = useState(1)
  const [totalPagini, setTotalPagini] = useState(1)

  // Ex. 1b + 5c – încărcarea de la server, reluată la fiecare schimbare de pagină
  useEffect(() => {
    async function incarca() {
      try {
        setIncarcare(true)
        const rezultat = await getDestinatii(pagina)
        setDestinatii(rezultat.data)
        setTotalPagini(rezultat.pages)
        setEroare(null)
      } catch (error) {
        setEroare(error.message)
      } finally {
        setIncarcare(false)
      }
    }

    incarca()
  }, [pagina])

  // Ex. 1c – modificarea pleacă întâi la server, apoi se pune în stare răspunsul
  async function handleToggle(id) {
    const destinatie = destinatii.find((d) => d.id === id)
    try {
      const salvata = await patchVizitat(id, !destinatie.vizitat)
      setDestinatii((curent) => curent.map((d) => (d.id === id ? salvata : d)))
    } catch (error) {
      setEroare(error.message)
    }
  }

  // Ex. 2c – butonul e dezactivat cât timp cererea e în curs
  async function handleAdd(destinatie) {
    setSeTrimite(true)
    try {
      const salvata = await postDestinatie(destinatie)
      setDestinatii((curent) => [...curent, salvata])
    } finally {
      setSeTrimite(false)
    }
  }

  // Ex. 1b – starea de încărcare
  if (incarcare && destinatii.length === 0) {
    return (
      <main>
        <h1>City Explorer</h1>
        <p className="stare">Se încarcă destinațiile...</p>
      </main>
    )
  }

  // Ex. 1b – starea de eroare
  if (eroare) {
    return (
      <main>
        <h1>City Explorer</h1>
        <p className="stare eroare">Nu am putut încărca datele: {eroare}</p>
      </main>
    )
  }

  const nevizitate = getNevizitate(destinatii)

  // Ex. 3b – se filtrează doar lista afișată, rezumatul rămâne pe toată lista
  const text = cautare.trim().toLowerCase()
  const afisate = destinatii.filter(
    (d) => d.oras.toLowerCase().includes(text) ||
      d.tara.toLowerCase().includes(text),
  )

  return (
    <main>
      <h1>City Explorer</h1>
      {/* Ex. 4 – montat temporar */}
      {/* <PanouStatistici /> */}
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={totalZile(nevizitate)}
      />
      <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
      <Cautare valoare={cautare} onChange={setCautare} />

      {/* Ex. 3c – aplicație goală vs. căutare fără rezultate */}
      {destinatii.length === 0 ? (
        <p className="gol">Nu există nicio destinație. Adaugă prima din formular.</p>
      ) : afisate.length === 0 ? (
        <p className="gol">Niciun rezultat pentru „{cautare.trim()}”.</p>
      ) : (
        <ListaDestinatii destinatii={afisate} onToggle={handleToggle} />
      )}

      {/* Ex. 5c – paginarea */}
      {totalPagini > 1 && (
        <div className="paginare">
          <button
            type="button"
            disabled={pagina === 1 || incarcare}
            onClick={() => setPagina((p) => p - 1)}
          >
            Înapoi
          </button>
          <span>pagina {pagina} din {totalPagini}</span>
          <button
            type="button"
            disabled={pagina === totalPagini || incarcare}
            onClick={() => setPagina((p) => p + 1)}
          >
            Înainte
          </button>
        </div>
      )}
    </main>
  )
}
