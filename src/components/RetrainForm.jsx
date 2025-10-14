import {useState} from 'react'
import { postRetrain, postReset } from '../utils_api'

export default function RetrainForm(){
  const [file, setFile] = useState(null)
  const [out, setOut] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  async function submit(){
    if(!file){ setErr('Adjunta un CSV'); return }
    setLoading(true); setErr(null); setOut(null);
    try{
      const res = await postRetrain(file)
      setOut(res)
    }catch(e){ setErr(String(e)) }
    finally{ setLoading(false) }
  }

  async function handleReset(){
    setLoading(true); setErr(null);
    try{
      await postReset()
      setOut(null) // limpiamos métricas mostradas
    }catch(e){ setErr(String(e)) }
    finally{ setLoading(false) }
  }

  return (
    <div className="card">
      <h2>Reentrenar modelo</h2>
      <div className="row">
        <div>
          <label>Sube un CSV (dos columnas: text,label)</label>
          <input type="file" accept=".csv" onChange={e=>setFile(e.target.files?.[0] || null)} />
        </div>
        {/* Contenedor con ambos botones al mismo nivel; 'Reiniciar' alineado a la derecha */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 8 }}>
          <button className="btn" onClick={submit} disabled={loading}>
            {loading ? 'Entrenando...' : 'Entrenar'}
          </button>
          <button
            className="btn"
            onClick={handleReset}
            disabled={loading}
            style={{ background: 'var(--error)', color: '#fff' }}
            title="Elimina el modelo guardado"
          >
            Reiniciar
          </button>
        </div>
      </div>
      <hr />
      {err && <div className="state-err">⚠ {err}</div>}
      {out && (
        <div>
          <div className="kpi">
            <div className="pill">Macro F1: {out?.macro?.f1_score}</div>
            <div className="pill">Macro Precision: {out?.macro?.precision}</div>
            <div className="pill">Macro Recall: {out?.macro?.recall}</div>
          </div>
          <h3>Métricas por clase</h3>
          <pre className="code">{JSON.stringify(out?.per_class, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
