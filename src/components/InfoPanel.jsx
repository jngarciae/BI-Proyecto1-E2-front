import {useEffect, useState} from 'react'
import { getInfo } from '../utils_api'

export default function InfoPanel(){
  const [data, setData] = useState(null)
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  async function load(){
    setLoading(true); setErr(null);
    try{
      const res = await getInfo()
      setData(res)
    }catch(e){ setErr(String(e)) }
    finally{ setLoading(false) }
  }
  useEffect(()=>{ load() },[])

  return (
    <div className="card">
      <h2>Información del modelo</h2>
      <button className="btn" onClick={load} disabled={loading}>{loading?'Cargando...':'Actualizar'}</button>
      <hr />
      {err && <div className="state-err">⚠ {err}</div>}
      {data && (
        <div className="grid">
          <div className="col-6"><strong>API:</strong> {data.api}</div>
          <div className="col-6"><strong>Modelo:</strong> {data.model_file}</div>
          <div className="col-6"><strong>spaCy cargado:</strong> {String(data.spacy_loaded)}</div>
          <div className="col-6"><strong>NLTK stopwords:</strong> {String(data.nltk_stopwords_available)}</div>
          <div className="col-12"><strong>Actualizado:</strong> {data.updated_at || 'N/D'}</div>
        </div>
      )}
    </div>
  )
}
