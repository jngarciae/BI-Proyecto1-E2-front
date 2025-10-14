import { useState } from 'react'
import Header from './components/Header'
import HealthCard from './components/HealthCard'
import PredictForm from './components/PredictForm'
import RetrainForm from './components/RetrainForm'
import InfoPanel from './components/InfoPanel'

export default function App(){
  const [tab, setTab] = useState('health')
  return (
    <div className="container">
      <Header current={tab} onNav={setTab} />
      {tab==='health' && <HealthCard />}
      {tab==='predict' && <PredictForm />}
      {tab==='retrain' && <RetrainForm />}
      {tab==='info' && <InfoPanel />}
      <footer>© {new Date().getFullYear()} Etapa 2 — Front React (Vite)</footer>
    </div>
  )
}
