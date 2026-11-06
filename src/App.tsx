import logo from './assets/khanya-logo.svg' 
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <img src={logo} alt="Khanya logo" className="app-logo" />
      </header>
      <main>
        <p>Your local AI assistant</p>
      </main>
    </div>
  )
}

export default App