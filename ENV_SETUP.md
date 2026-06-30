# Environment Setup

Create a file named `.env.local` in the `frontend` root directory with your API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your Gemini API key from Google AI Studio: https://aistudio.google.com/app/apikey

The AI Copilot panel will call the stream API endpoint, which uses this key. All other panels use mock data and work without it.

Do NOT commit `.env.local` to git. Make sure `.gitignore` includes `.env.local`.
