# 🌍 AI Travel Concierge (RAG-Based Chatbot)

An intelligent **AI-powered Travel Assistant** that helps users get travel-related information using **Retrieval-Augmented Generation (RAG)**.

---

## 🚀 Project Overview

The **AI Travel Concierge** is a smart chatbot system designed to:
- Answer travel-related queries
- Utilize uploaded documents (PDFs, guides, etc.)
- Provide **context-aware responses**
- Combine **LLM + Vector Database + Retrieval-Augmented Generation**

---

## 🧠 Tech Stack

### 🔹 Frontend
- React.js
- Material UI (MUI)
- React Markdown

### 🔹 Backend
- Python (FastAPI)
- LangChain (RAG pipeline)
- FAISS / Chroma *(Vector Database - In Progress)*

---

AI-Travel-Concierge/
│
├── backend/ # FastAPI + RAG logic
├── frontend/ # React Chat UI
└── README.md


---

## ✅ Work Completed

- ✔ Project setup (Frontend + Backend)
- ✔ Virtual environment configuration
- ✔ Chat UI development (React + MUI)
- ✔ Frontend ↔ Backend API integration
- ✔ Markdown response rendering
- ✔ Basic chatbot functionality
- ✔ Initial RAG pipeline design

---

## 🔄 Work In Progress

- ⏳ Document upload feature (PDF/Text processing)
- ⏳ Vector database integration (FAISS/Chroma)
- ⏳ Full RAG pipeline (retrieval + context-aware responses)
- ⏳ Deployment setup

---

## ⚙️ Features

- 💬 Interactive Chat Interface  
- 📄 Document-based Question Answering (RAG)  
- ⚡ FastAPI backend for AI responses  
- 🎨 Clean and responsive UI (Material Design)  
- 🧠 Context-aware intelligent answers  

---


## 🧪 How to Run Locally

### 🔹 1. Clone Repository

```bash
git clone https://github.com/your-username/AI-Travel-Concierge.git
cd AI-Travel-Concierge
```

---
## Setup Backend

cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload

---
## Setup Frontend
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev


## 🏗️ Project Structure
