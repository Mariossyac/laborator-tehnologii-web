// Ex. 3a – câmp de căutare controlat; textul stă în starea lui App
export default function Cautare({ valoare, onChange }) {
  return (
    <div className="cautare">
      <input
        type="search"
        placeholder="Caută după oraș sau țară"
        value={valoare}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  )
}
