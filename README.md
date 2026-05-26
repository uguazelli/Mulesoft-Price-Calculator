# MuleSoft Cost & Utilization Risk Calculator

Plain Node.js + Express app for VeriDataPro lead generation. The calculator captures MuleSoft footprint inputs, returns directional utilization and renewal-risk signals, and saves leads to CSV.

## Run Locally

```bash
npm install
npm start
```

The app listens on `http://localhost:3000/mulesoft-calculator` by default.

Environment variables:

- `PORT`: server port, default `3000`
- `BASE_PATH`: URL path where the tool is mounted, default `/mulesoft-calculator`
- `LEADS_CSV_PATH`: CSV output path, default `data/leads.csv`

## Endpoints

- `GET /mulesoft-calculator`: calculator frontend
- `POST /mulesoft-calculator/api/calculate`: validates input, saves the lead, and returns the assessment JSON
- `GET /health`: basic health check for deployment
- `GET /mulesoft-calculator/health`: tool-level health check

## Tests

```bash
npm test
npm run test:e2e
```

The app provides directional optimization signals only. It does not provide official MuleSoft or Salesforce pricing.
