import { useState, type FormEvent } from 'react'
import type { Message } from './types'
import logo from './assets/khanya-logo.svg'
import './App.css'

function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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