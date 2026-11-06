import { useState, type FormEvent , useEffect} from 'react'
import type { Message, OllamaResponse } from './types'
import logo from './assets/khanya-logo.svg'
import { getStats } from './utils/stats'
import { OLLAMA_URL, MODEL, SYSTEM_PROMPT } from './config'
import { loadMessages, saveMessages } from './utils/storage'

import './App.css'

function App() {
const [messages, setMessages] = useState<Message[]>(loadMessages)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
  saveMessages(messages)
}, [messages])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
    const res = await fetch(OLLAMA_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: MODEL,
    system: SYSTEM_PROMPT,
    prompt: text,
    stream: false,
  }),
})

      if (!res.ok) throw new Error(`Ollama error: ${res.status}`)

      const data: OllamaResponse = await res.json()

     const aiMessage: Message = {
  id: crypto.randomUUID(),
  role: 'assistant',
  content: data.response,
  stats: getStats(data),
}
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: 'Could not reach Ollama. Is it running?',
      }

      setMessages((prev) => [...prev, errorMessage])
      console.error(error)
    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Khanya logo" className="app-logo" />
      </header>

      <main className="chat">
        {messages.length === 0 && !isLoading ? (
          <div className="empty-state">
            <h2>Sawubona! I'm Khanya ✨</h2>
            <p>Ask me anything to get started.</p>
          </div>
        ) : (
        messages.map((msg) => (
  <div key={msg.id} className={`message-row ${msg.role}`}>
    <div className={`message ${msg.role}`}>{msg.content}</div>

    {msg.stats && (
      <div className="message-stats">
        ⏱ {msg.stats.totalDuration.toFixed(2)}s · ⚡{' '}
        {msg.stats.tokensPerSecond.toFixed(1)} tokens/sec
      </div>
    )}
  </div>
))
        )}

        {isLoading && (
          <div className="message assistant loading">
            <span className="spinner"></span>
            Khanya is thinking...
          </div>
        )}
      </main>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Khanya..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!input.trim() || isLoading}>
          Send
        </button>
      </form>
    </div>
  )
}

export default App