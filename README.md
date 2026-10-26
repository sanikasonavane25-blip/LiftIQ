# LiftIQ website

The official LiftIQ concept-stage startup website, built with React and Vite.

## Run locally

```bash
npm install
npm run dev
```

The production build can be checked with:

```bash
npm run lint
npm run build
```

## Reference documents

The visitor-facing PDFs are stored in `public/documents/`:

- `LiftIQ_Brochure (1).pdf`
- `LiftIQ_Startup_Prof.pdf`

Document paths are centralized in `src/App.jsx` so filenames can be updated in one place.

## Contact form

The contact form validates its required fields and email format in the browser. It currently shows a clear frontend-demo message rather than claiming that an inquiry was sent. A real mail or form-service endpoint must be connected before production submission handling is enabled.

The startup profile does not provide a verified LiftIQ LinkedIn URL, so no LinkedIn link is presented as official.
