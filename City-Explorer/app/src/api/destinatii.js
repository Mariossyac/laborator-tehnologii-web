const API_URL = 'http://localhost:3001'
const PE_PAGINA = 20

// Ex. 1a – verifică response.ok și oprește execuția cu statusul primit
async function verifica(response) {
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }
  return response.json()
}

// Ex. 5c – cere o singură pagină și întoarce obiectul primit, nu doar lista
export async function getDestinatii(pagina) {
  const response = await fetch(
    `${API_URL}/destinatii?_page=${pagina}&_per_page=${PE_PAGINA}`,
  )
  return verifica(response)
}

// Ex. 1a – trimite o destinație nouă; serverul o întoarce cu id-ul generat
export async function postDestinatie(d) {
  const response = await fetch(`${API_URL}/destinatii`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(d),
  })
  return verifica(response)
}

// Ex. 1a – schimbă doar câmpul vizitat
export async function patchVizitat(id, vizitat) {
  const response = await fetch(`${API_URL}/destinatii/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vizitat }),
  })
  return verifica(response)
}
