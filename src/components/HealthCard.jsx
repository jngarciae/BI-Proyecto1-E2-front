import {useEffect, useState} from 'react'
import { getHealth } from '../utils_api'

export default function HealthCard(){
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true); setErr(null);
    try{
      const res = await getHealth()
      setData(res)
    }catch(e){ setErr(String(e)) }
    finally{ setLoading(false) }
  }

  useEffect(()=>{ load() },[])

  const renderEstado = () => {
    if (!data) return null
    const modelPresent = Boolean(data.model_present)
    const text = modelPresent
      ? data.status
      : 'Ok pero sin modelo. Sugerido empezar el entrenamiento'
    const style = modelPresent
      ? { }
      : { color: '#d97706', fontWeight: 700 } // naranja
    return <span style={style} className={modelPresent ? 'state-ok' : ''}>{text}</span>
  }

  return (
    <div className="card">
      <h2>Salud del servicio</h2>
      <p className="small">Consulta el endpoint <code>/health</code> y muestra metadatos del modelo.</p>
      <button className="btn" onClick={load} disabled={loading}>{loading ? 'Cargando...' : 'Actualizar'}</button>
      <hr />
      {err && <div className="state-err">⚠ {err}</div>}
      {data && (
        <div className="grid">
          <div className="col-6"><strong>Estado:</strong> {renderEstado()}</div>
          <div className="col-6"><strong>Modelo presente:</strong> {String(data.model_present)}</div>
          <div className="col-12">
            <details open>
              <summary><strong>Meta</strong></summary>
              <pre className="code">{JSON.stringify(data.meta, null, 2)}</pre>
            </details>
          </div>
        </div>
      )}
    </div>
  )
}
