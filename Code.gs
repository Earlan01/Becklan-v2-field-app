// ===== Becklan V2 Web App API (Google Apps Script) =====
var BMSV2_CONFIG = {
  SPREADSHEET_ID: 'PUT_YOUR_SPREADSHEET_ID_HERE',
  SHEETS: { STOCK:'Medication Stock', SALES:'Sales Records', PURCHASES:'Purchases Records', SERVICES:'Patient Services' },
  TIMEZONE: 'Africa/Freetown'
};
function getSS(){ var id=(BMSV2_CONFIG.SPREADSHEET_ID||'').trim(); if(id && id!=='PUT_YOUR_SPREADSHEET_ID_HERE'){ return SpreadsheetApp.openById(id);} var active=SpreadsheetApp.getActiveSpreadsheet(); if(active) return active; throw new Error("Set SPREADSHEET_ID or bind this script to your Sheet."); }
function getSheet(name){ var sh=getSS().getSheetByName(name); if(!sh) throw new Error("Missing sheet: "+name); return sh; }
function n_(v){ return Number(v||0); }
function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function doGet(e){ var p=(e&&e.parameter&&e.parameter.path)||''; var q=(e&&e.parameter&&e.parameter.query)||''; if(p==='stock/search') return json_(stockSearch_(q)); return json_({ok:true, api:'becklan-v2', ts:new Date()}); }
function doPost(e){ var d={}; try{ d=JSON.parse(e.postData.contents||"{}"); }catch(err){} var p=d.path||''; if(p==='record/sale') return json_(recordSale_(d)); if(p==='record/purchase') return json_(recordPurchase_(d)); if(p==='record/service') return json_(recordService_(d)); return json_({ok:false, error:'Unknown path'}); }
function stockSearch_(q){ var s=getSheet(BMSV2_CONFIG.SHEETS.STOCK), v=s.getDataRange().getValues(); if(v.length<2) v=[v[0]]; var h=v.shift()||[]; var iName=h.indexOf('Product Name'), iStr=h.indexOf('Strength'), iForm=h.indexOf('Dosage Form'), iBal=h.indexOf('Closing Balance'), iExp=h.indexOf('Expiry Date'); q=String(q||'').toLowerCase(); var res=v.filter(function(r){ var name=((r[iName]||'')+' '+(r[iStr]||'')+' '+(r[iForm]||'')).toLowerCase(); return q ? name.indexOf(q)>=0 : true; }).map(function(r){ re...
function recordSale_(d){ var sh=getSheet(BMSV2_CONFIG.SHEETS.SALES); sh.appendRow([new Date(), d.receipt||'', d.staff||'', d.product||'', d.strength||'', d.form||'', d.qty||0, d.price||0, n_(d.qty)*n_(d.price), d.payment||'Cash', d.customer||'', d.location||'', d.remarks||'', 'Synced']); return {ok:true}; }
function recordPurchase_(d){ var sh=getSheet(BMSV2_CONFIG.SHEETS.PURCHASES); sh.appendRow([new Date(), d.supplier||'', d.product||'', d.qty||0, d.cost||0, n_(d.qty)*n_(d.cost), d.batch||'', d.expiry||'', d.invoice||'', d.received_by||'', d.remarks||'']); return {ok:true}; }
function recordService_(d){ var sh=getSheet(BMSV2_CONFIG.SHEETS.SERVICES); sh.appendRow([new Date(), d.patient||'', d.sex||'', d.age||'', d.address||'', d.diagnosis||'', d.medication||'', d.dosage||'', d.service_type||'', d.fee||0, d.staff||'', d.remarks||'']); return {ok:true}; }
