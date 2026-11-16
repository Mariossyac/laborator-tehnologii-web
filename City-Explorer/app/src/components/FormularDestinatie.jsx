import { useState } from 'react'

const valoriGoale = { oras: '', tara: '', zile: '' }

// Ex. 2b – întoarce mesajele de eroare; un câmp corect nu apare în obiect
function valideaza(valori) {
  const erori = {}

  if (valori.oras.trim().length < 2) {
    erori.oras = 'Orașul are cel puțin două caractere.'
  }

  if (valori.tara.trim() === '') {
    erori.tara = 'Țara este obligatorie.'
  }

  const zile = Number(valori.zile)
  if (valori.zile === '' || !Number.isInteger(zile) || zile < 1 || zile > 30) {
    erori.zile = 'Numărul de zile este între 1 și 30.'
  }

  return erori
}

export default function FormularDestinatie({ onAdd, seTrimite }) {
  const [valori, setValori] = useState(valoriGoale)
  const [erori, setErori] = useState({})
  const [eroareServer, setEroareServer] = useState('')

  // Ex. 2a – un singur onChange pentru toate câmpurile, după atributul name
  function handleChange(event) {
    const { name, value } = event.target
    setValori((curent) => ({ ...curent, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    const gasite = valideaza(valori)
    setErori(gasite)

    // Ex. 2c – dacă există erori, nu se trimite nimic
    if (Object.keys(gasite).length > 0) {
      return
    }

    try {
      setEroareServer('')
      await onAdd({
        oras: valori.oras.trim(),
        tara: valori.tara.trim(),
        zile: Number(valori.zile),
        vizitat: false,
      })
      setValori(valoriGoale)
    } catch (error) {
      setEroareServer(`Destinația nu a fost salvată: ${error.message}`)
    }
  }

  return (
    <form className="formular" onSubmit={handleSubmit} noValidate>
      <div className="camp">
        <input
          name="oras"
          placeholder="Oraș"
          value={valori.oras}
          onChange={handleChange}
          className={erori.oras ? 'invalid' : ''}
        />
        {erori.oras && <p className="eroare-camp">{erori.oras}</p>}
      </div>

      <div className="camp">
        <input
          name="tara"
          placeholder="Țară"
          value={valori.tara}
          onChange={handleChange}
          className={erori.tara ? 'invalid' : ''}
        />
        {erori.tara && <p className="eroare-camp">{erori.tara}</p>}
      </div>

      <div className="camp">
        <input
          name="zile"
          type="number"
          placeholder="Zile"
          value={valori.zile}
          onChange={handleChange}
          className={erori.zile ? 'invalid' : ''}
        />
        {erori.zile && <p className="eroare-camp">{erori.zile}</p>}
        {eroareServer && <p className="eroare-camp">{eroareServer}</p>}
      </div>

      <button type="submit" disabled={seTrimite}>
        {seTrimite ? 'Se trimite...' : 'Adaugă'}
      </button>
    </form>
  )
}
