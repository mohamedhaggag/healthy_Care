export async function sendChat(messages) {
  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages })
  })

  const data = await resp.json().catch(() => ({}))
  if (!resp.ok) {
    throw new Error(data?.error || 'Request failed')
  }
  return data.reply || ''
}



