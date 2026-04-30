# Agentic Blog Generation 🚀

Agentic Blog Generation is a powerful, AI-driven application that generates high-quality, structured, and SEO-friendly blog posts instantly. It features a modern, glassmorphic Next.js frontend and an intelligent FastAPI backend powered by LangGraph and Groq.

## ✨ Features

- **Agentic AI Generation**: Leverages LangGraph workflows to intelligently draft titles and content.
- **Multi-Language Support**: Generate blogs in English (default), Hindi, or French with localized cultural adaptations.
- **Premium User Interface**: A beautifully designed, fully responsive Next.js frontend featuring glassmorphism, dynamic animations, and dark mode.
- **Secure Authentication**: Integrated Firebase Authentication allowing users to seamlessly sign up, log in, and manage their sessions securely.
- **My Blogs Dashboard**: Save your generated masterpieces directly to your local dashboard for future reading.
- **Markdown Rendering**: Automatically parses and renders AI-generated markdown into beautiful, readable typography.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication**: [Firebase Auth](https://firebase.google.com/)
- **Icons**: SVG Heroicons/Custom paths

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **AI Orchestration**: [LangGraph](https://python.langchain.com/v0.1/docs/langgraph/)
- **LLM Provider**: [Groq](https://groq.com/)
- **State Management**: Pydantic

---

## 🚀 Getting Started

Follow these instructions to run the project locally on your machine.

### Prerequisites
- Python 3.10+
- Node.js 18+
- A Groq API Key (for the backend)
- A Firebase Project (for frontend authentication)

### 1. Backend Setup

1. Navigate to the root directory (`c:\AgenticBlogGeneration`).
2. Activate your virtual environment:
   ```bash
   .\.venv\Scripts\activate
   ```
   *(Or simply use `uv` if you have it installed: `uv run app.py`)*
3. Ensure you have your `.env` file set up in the root directory with your AI provider keys (e.g., `LANGCHAIN_API_KEY`, `GROQ_API_KEY`).
4. Start the FastAPI server:
   ```bash
   python app.py
   ```
   The backend will start running on `http://localhost:8000`.

### 2. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file in the `frontend` directory and add your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-domain.firebaseapp.com"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-project-id.firebasestorage.app"
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-sender-id"
   NEXT_PUBLIC_FIREBASE_APP_ID="your-app-id"
   ```
4. Start the Next.js development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000`.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).

Build with Dinesh @
