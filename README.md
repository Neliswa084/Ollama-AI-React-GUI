# Khanya ✨

**Khanya** ("light" in isiZulu) is a simple AI chatbot built with React + TypeScript. It talks to an AI model running locally on your PC with Ollama.

## Features

- Chat UI with user and AI message bubbles
- Sends prompts to the local Ollama API
- Loading spinner while Khanya is thinking
- Shows response time and tokens per second under each reply
- System prompt that gives Khanya its name, role and the user's name
- Chat history saved in localStorage (survives page refresh)
- Clear chat button

## Tech Stack

- React + TypeScript (Vite)
- Ollama
- Model: `qwen2.5:0.5b` (397 MB)

## Requirements

- Node.js
- Ollama installed and running, with the model downloaded:

```
ollama pull qwen2.5:0.5b
```

## Run the app

```
npm install
npm run dev
```

Then open the link shown in the terminal.

## How it works

The app sends your prompt to `http://localhost:11434/api/generate`. Ollama runs it through the model and returns the reply, along with timing data:

- **Duration** = `total_duration` ÷ 1,000,000,000 (nanoseconds to seconds)
- **Tokens/sec** = `eval_count` ÷ (`eval_duration` ÷ 1,000,000,000)

To change your name or Khanya's behaviour, edit `src/config.ts`.
