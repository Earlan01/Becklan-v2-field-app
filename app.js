// PWA client for Becklan V2 API (CORS-safe)
const DEFAULT_URL = "https://script.google.com/macros/s/AKfycbzVRWHJ7ApOyrEzPOb51k66eF7e0u4ZvD6RXXiW2Wl4ceHyKmcB0zSvJ2GU5BuxQVzD/exec";
const baseUrlEl = document.getElementById('baseUrl');
const statusEl = document.getElementById('status');
const qEl = document.getElementById('q');
const resultsEl = document.getElementById('results');
const typeEl = document.getElementById('type');

if (!localStorage.getItem('bms_base_url')) { localStorage.setItem('bms_base_url', DEFAULT_URL); }
baseUrlEl.value = localStorage.getItem('bms_base_url') || DEFAULT_URL;
baseUrlEl.addEventListener('change', () => localStorage.setItem('bms_base_url', baseUrlEl.value.trim()));

typeEl.addEventListener('change', () => {
  for (const id of ['formSale','formPurchase','formService']) document.getElementById(id).style.display = 'none';
  document.getElementById('form' + typeEl.value.charAt(0).toUpperCase() + typeEl.value.slice(1)).style.display = 'block';
});

const ok = (m) => { statusEl.textContent = m; statusEl.className = 'ok'; };
const err = (m) => { statusEl.textContent = m; statusEl.className = 'err'; };
const base = () => (baseUrlEl.value || DEFAULT_URL).trim().replace(/\/$/, '');

async function getJSON(url){ const r = await fetch(url, {method:'GET'}); if(!r.ok) throw new Error('HTTP '+r.status); return r.json(); }
async function postJSON(url, body){ 
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(body), redirect: 'follow', cache: 'no-store' });
  if(!r.ok) throw new Error('HTTP '+r.status); return r.json();
}

document.getElementById('btnSearch').addEventListener('click', async () => {
  resultsEl.innerHTML = '';
  try{ const data = await getJSON(base() + '?path=stock/search&query=' + encodeURIComponent(qEl.value));
    data.results.forEach(item => { const li = document.createElement('li'); li.textContent = `${item.name} ${item.strength} ${item.form} — balance: ${item.balance} (exp: ${item.expiry||'—'})`; resultsEl.appendChild(li); });
    ok(`Found ${data.results.length} item(s).`);
  }catch(e){ err('Search failed: ' + e.message); }
});

document.getElementById('btnSale').addEventListener('click', async () => {
  try{ const payload = { path:'record/sale', product: document.getElementById('saleProduct').value, qty: Number(document.getElementById('saleQty').value||0), price: Number(document.getElementById('salePrice').value||0), staff: document.getElementById('saleStaff').value, payment:'Cash' }; const data = await postJSON(base(), payload); if(data.ok) ok('Sale recorded.'); else err('Sale failed.'); }catch(e){ err('Sale failed: ' + e.message); }
});

document.getElementById('btnPurchase').addEventListener('click', async () => {
  try{ const payload = { path:'record/purchase', product: document.getElementById('purProduct').value, qty: Number(document.getElementById('purQty').value||0), cost: Number(document.getElementById('purCost').value||0), supplier: document.getElementById('purSupplier').value }; const data = await postJSON(base(), payload); if(data.ok) ok('Purchase recorded.'); else err('Purchase failed.'); }catch(e){ err('Purchase failed: ' + e.message); }
});

document.getElementById('btnService').addEventListener('click', async () => {
  try{ const payload = { path:'record/service', patient: document.getElementById('svcPatient').value, fee: Number(document.getElementById('svcFee').value||0), diagnosis: document.getElementById('svcDiagnosis').value, staff: document.getElementById('svcStaff').value, service_type: document.getElementById('svcType').value, medication: document.getElementById('svcMedication').value }; const data = await postJSON(base(), payload); if(data.ok) ok('Service recorded.'); else err('Service failed.'); }catch(e){ err('Service failed: ' + e.message); }
});

if('serviceWorker' in navigator){ window.addEventListener('load', () => navigator.serviceWorker.register('service-worker.js').catch(()=>{})); }
