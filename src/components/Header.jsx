export default function Header({onNav, current}){
  const items = [
    {key:'health', label:'Salud del servicio'},
    {key:'predict', label:'Predicción'},
    {key:'retrain', label:'Reentrenar'},
    {key:'info', label:'Info del modelo'}
  ];
  return (
    <div className="header">
      <div>
        <h1>Analítica de Textos • ONU ODS<span className="badge">Etapa 2</span></h1>
        <div className="subtitle">Demo en React - API FastAPI</div>
      </div>
      <nav className="nav">
        {items.map(it => (
          <button key={it.key} className="btn" onClick={()=>onNav(it.key)} aria-pressed={current===it.key}>
            {it.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
