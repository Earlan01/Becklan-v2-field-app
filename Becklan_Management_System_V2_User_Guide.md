# Becklan Management System V2 – User Guide
*Build:* 2025-10-26T22:43:49.783029Z

## Overview
Becklan V2 unifies stock, sales, purchases, and patient services with daily reporting and a mobile Field App (PWA).

## Required Google Sheet Tabs
- Medication Stock
- Sales Records
- Purchases Records
- Patient Services
- Daily Summary
- Dashboard

## Web App API (Apps Script)
Deploy the `backend/Code.gs` as a Web App. Set `SPREADSHEET_ID` if standalone. Copy the `/exec` URL.

**Endpoints**
- `GET  {WEB_APP_URL}?path=stock/search&query=para`
- `POST {WEB_APP_URL}` with JSON body:
  - `{"path":"record/sale", "product":"Paracetamol", "qty":2, "price":2.5, "staff":"FS-01"}`
  - `{"path":"record/purchase", "product":"Paracetamol", "qty":100, "cost":1.5, "supplier":"WellBodi"}`
  - `{"path":"record/service", "patient":"Mariama K.", "fee":25, "diagnosis":"Malaria", "staff":"FS-01", "service_type":"Injection", "medication":"Artemether 80mg"}`

## Field App (PWA)
Host `mobile_pwa/` on GitHub Pages. The API Base URL is prefilled to your current Web App URL.
- **Search**: query stock
- **Sale/Purchase/Service**: record transactions
- **Service Performed**: captured as `service_type`

## Daily Reporting & Alerts
Use your existing Apps Script automations to send daily summary emails/WhatsApp and hourly stock/expiry alerts.

## Troubleshooting
- If search returns empty, verify tab names & headers in the Sheet.
- If API errors, confirm the script is bound or `SPREADSHEET_ID` is set.
- For PWA issues, refresh cache or reinstall after new deploys.
