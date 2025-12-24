import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/chat', async (req, res) => {
  try {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return res.status(500).json({
        error:
          'OPENAI_API_KEY is missing. Create a .env file in the project root and set OPENAI_API_KEY=your_key'
      })
    }

    const { messages } = req.body || {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'messages[] is required' })
    }

    const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini'

    const openaiResp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages,
        temperature: 0.7
      })
    })

    // OpenAI normally returns JSON, but network/security middleware can return HTML/text.
    const rawText = await openaiResp.text().catch(() => '')
    const data = (() => {
      try {
        return rawText ? JSON.parse(rawText) : {}
      } catch {
        return {}
      }
    })()
    if (!openaiResp.ok) {
      const upstreamMsg =
        data?.error?.message ||
        (rawText && rawText.trim().slice(0, 500)) ||
        'OpenAI request failed'

      const hint =
        typeof upstreamMsg === 'string' &&
        upstreamMsg.includes('does not have access to model')
          ? `Model "${model}" is not available for this API key/project. Set OPENAI_MODEL in .env to a model you have access to.`
          : ''

      return res.status(openaiResp.status).json({
        error: hint ? `${upstreamMsg}\n\n${hint}` : upstreamMsg
      })
    }

    const reply = data?.choices?.[0]?.message?.content ?? ''
    return res.json({ reply })
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Server error' })
  }
})

const port = Number(process.env.PORT || 3001)
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`AI server listening on http://localhost:${port}`)
})


