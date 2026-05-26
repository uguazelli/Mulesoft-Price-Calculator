# MuleSoft Cost & Utilization Risk Calculator

Plain Node.js + Express app for VeriDataPro lead generation. The calculator captures MuleSoft footprint inputs, returns directional utilization and renewal-risk signals, and saves leads to CSV.

## Run Locally

```bash
npm install
npm start
```

The app listens on `http://localhost:3000` by default.

Environment variables:

- `PORT`: server port, default `3000`
- `LEADS_CSV_PATH`: CSV output path, default `data/leads.csv`

## Endpoints

- `GET /`: calculator frontend
- `POST /api/calculate`: validates input, saves the lead, and returns the assessment JSON
- `GET /health`: basic health check for deployment

## Tests

```bash
npm test
npm run test:e2e
```

The app provides directional optimization signals only. It does not provide official MuleSoft or Salesforce pricing.
