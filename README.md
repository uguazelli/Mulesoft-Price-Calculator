# VeriDataPro Integration Tools

Plain Node.js + Express app for VeriDataPro lead generation. It currently includes three no-framework tools:

- MuleSoft Cost & Utilization Risk Calculator
- API Readiness Assessment Tool
- Flat File Validation Tool

The MuleSoft and API readiness tools capture qualified lead details, return directional diagnostic reports, and save submissions to CSV. The flat file validator runs fully in the browser and does not upload files to the server.

## Run Locally

```bash
npm install
npm start
```

The app listens on these paths by default:

- `http://localhost:3000/mulesoft-calculator`
- `http://localhost:3000/api-readiness-assessment`
- `http://localhost:3000/file-validator`

Environment variables:

- `PORT`: server port, default `3000`
- `BASE_PATH`: MuleSoft calculator URL path, default `/mulesoft-calculator`
- `LEADS_CSV_PATH`: MuleSoft CSV output path, default `data/leads.csv`
- `API_READINESS_BASE_PATH`: API readiness tool URL path, default `/api-readiness-assessment`
- `API_READINESS_CSV_PATH`: API readiness CSV output path, default `data/api-readiness-leads.csv`
- `FILE_VALIDATOR_BASE_PATH`: flat file validator URL path, default `/file-validator`

## Endpoints

- `GET /mulesoft-calculator`: calculator frontend
- `POST /mulesoft-calculator/api/calculate`: validates input, saves the lead, and returns the assessment JSON
- `GET /api-readiness-assessment`: API readiness assessment frontend
- `POST /api-readiness-assessment/api/assess`: validates input, saves the lead, and returns the readiness report JSON
- `GET /file-validator`: client-side flat file validation frontend
- `GET /health`: basic health check for deployment
- `GET /mulesoft-calculator/health`: tool-level health check
- `GET /api-readiness-assessment/health`: tool-level health check
- `GET /file-validator/health`: tool-level health check

## Project Structure

```text
public/
  shared/                         # logo and shared CSS
  tools/
    mulesoft-calculator/          # MuleSoft frontend
    api-readiness/                # API readiness frontend
    file-validator/               # flat file validator frontend

src/
  app.js                          # Express app composition
  server.js                       # local/server entrypoint
  shared/                         # shared routing, CSV, and path helpers
  tools/
    mulesoft-calculator/          # MuleSoft API, validation, scoring, CSV store
    api-readiness/                # readiness API, validation, scoring, CSV store
    file-validator/               # static tool registration only; analysis runs in browser
```

## Tests

```bash
npm test
npm run test:e2e
```

The MuleSoft calculator provides directional optimization signals only. It does not provide official MuleSoft or Salesforce pricing.
