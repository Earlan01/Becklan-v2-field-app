# Deploy Becklan V2 Field App (CORS-safe)
*Build:* 2025-10-27T18:49:09.919154Z

1) Create a GitHub repo and copy **mobile_pwa/** to the repo root.
2) Settings → Pages → Deploy from branch (`main`, `/ (root)`).
3) Open the Pages URL; **Install** to phone (PWA).

Notes:
- **POST** uses `Content-Type: text/plain` to avoid CORS preflight. Server parses JSON from `e.postData.contents`.
- Service Worker cache bumped to **v2** to force clients to update.
- API Base URL pre-filled to your live endpoint:
  https://script.google.com/macros/s/AKfycbzVRWHJ7ApOyrEzPOb51k66eF7e0u4ZvD6RXXiW2Wl4ceHyKmcB0zSvJ2GU5BuxQVzD/exec
