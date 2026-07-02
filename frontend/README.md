# Enterprise Command Center UI (Next.js 15)

This is the frontend application for the **Industrial AI Operating System (Unified Asset & Operations Brain)**, built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion.

## ✨ Features
- **Executive Command Center**: Live operational dashboard showing graph nodes, active telemetry, and AI Triage alerts.
- **Interactive Graph Inspector**: Real-time visual layout of Neo4j topological relationships and asset dependencies.
- **GraphRAG Copilot Chat**: Streaming AI chat with inline citations, confidence scoring, and document paragraph synchronization.
- **Root Cause Analysis (RCA) View**: Interactive fault trees and scheduled maintenance work order automation.
- **Compliance Audit Center**: Live tracking against OISD-105 and Factory Act regulations.

---

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env.local` file in this directory (`frontend/`) to configure your API keys and backend URL:
```env
# Gemini API Key for AI Copilot streaming
GEMINI_API_KEY=your_gemini_api_key_here

# Backend API URL (defaults to localhost:8000 if omitted)
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```
*Note: Do NOT commit `.env.local` to git.*

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open **[http://localhost:3000](http://localhost:3000)** with your browser to see the live command center.

---

## 🎨 Design System
- **Dark-First Enterprise Theme**: Optimized for industrial control rooms and low-eye-strain environments.
- **Glassmorphic Components**: Sleek layered panels using Tailwind blur utilities.
- **Micro-animations**: Powered by Framer Motion for smooth slide-out inspectors and alert transitions.
