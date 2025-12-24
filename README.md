# healthy_Care (Vue 3 + Vite)

## Environment variables

The OpenAI API key is loaded from a **`.env`** file (project root). Create it by copying `env.example`:

```bash
cp env.example .env
```

Then set:

- `OPENAI_API_KEY=...`
- *(optional)* `OPENAI_MODEL=...`
- *(optional)* `PORT=3001`

## Run

Install deps:

```bash
npm install
```

Start the frontend (Vite):

```bash
npm run dev
```

Start the backend API server:

```bash
node server/index.js
```
