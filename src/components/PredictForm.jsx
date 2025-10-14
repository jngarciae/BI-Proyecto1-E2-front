import {useState} from 'react'
import { postPredict } from '../utils_api'

export default function PredictForm(){
  const [input, setInput] = useState('Ejemplo de texto para clasificar')
  const [list, setList] = useState([])
  const [out, setOut] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  function add(){
    if(!input.trim()) return
    setList(prev => [...prev, input.trim()])
    setInput('')
  }
  function clear(){ setList([]); setOut(null); setErr(null) }

  async function submit(){
    setLoading(true); setErr(null); setOut(null);
    try{
      const res = await postPredict(list.length? list : [input])
      setOut(res)
    }catch(e){ setErr(String(e)) }
    finally{ setLoading(false) }
  }

  // ---- NUEVO: resumen amigable sobre las predicciones ----
  function FriendlySummaries({results}) {
    if (!results || results.length === 0) return null
    const showIndex = results.length > 1
    return (
      <div className="card" style={{background:'#eef7f1', border:'1px solid #cee6d4'}}>
        <h3 style={{marginTop:0, color:'var(--brand-700)'}}>Resumen</h3>
        <ol style={{margin:'0 0 0 18px', padding:0}}>
          {results.map((r, i) => {
            const entries = Object.entries(r.probabilities || {})
            const [bestClass, bestProb] = entries.sort((a,b)=>b[1]-a[1])[0] || [String(r.prediction), 1]
            const pct = (Number(bestProb) * 100).toFixed(1)
            const prefix = showIndex ? `Opinión ${i+1}: ` : 'La opinión '
            return (
              <li key={i} className="small" style={{marginBottom:6}}>
                {prefix}
                <strong>se clasifica en el ODS tipo {bestClass}</strong> con una probabilidad de <strong>{pct}%</strong>.
              </li>
            )
          })}
        </ol>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Predicción</h2>
      <div className="row">
        <div>
          <label>Texto</label>
          <textarea value={input} onChange={e=>setInput(e.target.value)} placeholder="Escribe un texto..."></textarea>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <button className="btn" onClick={add}>Agregar a lote</button>
            <button className="btn" onClick={clear}>Limpiar</button>
            <button className="btn" onClick={submit} disabled={loading}>{loading?'Prediciendo...':'Predecir'}</button>
          </div>
          <div className="helper">Puedes armar un lote de textos; si la lista está vacía, se usará el área de texto.</div>
        </div>
        <div>
          <label>Lote ({list.length})</label>
          <div className="card" style={{maxHeight:220, overflow:'auto'}}>
            {list.length === 0 && <div className="small">Vacío</div>}
            <ol>
              {list.map((t,i)=>(<li key={i} className="small">{t}</li>))}
            </ol>
          </div>
        </div>
      </div>
      <hr />
      {err && <div className="state-err">⚠ {err}</div>}
      {out && (
        <div>
          <div className="kpi">
            <div className="pill">Resultados: {out.length}</div>
          </div>

          
          <FriendlySummaries results={out} />

          <pre className="code" style={{marginTop:8}}>{JSON.stringify(out, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
