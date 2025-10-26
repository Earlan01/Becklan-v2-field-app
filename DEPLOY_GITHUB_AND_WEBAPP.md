# Deploy Becklan V2 – API & Field App
*Build:* 2025-10-26T22:43:49.783257Z

## A) Apps Script Web App (API)
1. Open your Becklan V2 Sheet → Extensions → Apps Script.
2. Create **Code.gs** and paste `backend/Code.gs`.
3. Set `SPREADSHEET_ID` if standalone; otherwise open from the Sheet.
4. Deploy → New deployment → Web app → Execute as **Me**, Access **Anyone with the link**.
5. Copy the `/exec` URL.

## B) GitHub Pages (Field App)
1. New GitHub repo (e.g., `becklan-v2-field-app`).
2. Copy contents of `mobile_pwa/` into repo root.
3. Commit & push → Settings → Pages → Deploy from branch (`main`, `/ (root)`).
4. Open the Pages URL, add to Home Screen. Icon uses your Becklan logo.

