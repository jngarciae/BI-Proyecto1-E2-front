const BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export async function getHealth(){
  const res = await fetch(`${BASE}/health`);
  if(!res.ok) throw new Error('Health error');
  return res.json();
}

export async function getInfo(){
  const res = await fetch(`${BASE}/info`);
  if(!res.ok) throw new Error('Info error');
  return res.json();
}

export async function postPredict(instances){
  const res = await fetch(`${BASE}/predict`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({instances: instances.map(t => ({text: t}))})
  });
  if(!res.ok){
    const text = await res.text();
    throw new Error(text || 'Predict error');
  }
  return res.json();
}

export async function postRetrain(file){
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${BASE}/retrain`, { method: 'POST', body: fd });
  if(!res.ok){
    const text = await res.text();
    throw new Error(text || 'Retrain error');
  }
  return res.json();
}

export async function postReset(){
  const res = await fetch(`${BASE}/reset`, { method: 'POST' });
  if(!res.ok){
    const text = await res.text();
    throw new Error(text || 'Reset error');
  }
  return res.json();
}
