import { useState, type FormEvent } from 'react'
import type { Message , OllamaResponse } from './types'
import logo from './assets/khanya-logo.svg'

import './App.css'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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

  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'qwen2.5:0.5b',
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
}

  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Khanya logo" className="app-logo" />
      </header>

      <main className="chat">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h2>Sawubona! I'm Khanya </h2>
            <p>Ask me anything to get started.</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.role}`}>
              {msg.content}
            </div>
          ))
        )}
      </main>

      <form className="chat-input" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Khanya..."
        />
        <button type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  )
}

export default App