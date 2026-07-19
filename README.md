# 🎯 AI Treasure Hunt Creator

An AI-powered **generative treasure hunt and scavenger hunt clue generator** with gamification features. Perfect for educational institutions, events, and entertainment!

**Created for:** Samsung Innovation Campus (SIC) - AI/ML Specialization Project

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Deployment Guide](#-deployment-guide)
- [Usage Examples](#-usage-examples)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎨 Overview

**AI Treasure Hunt Creator** is a full-stack web application that generates customized treasure hunts and scavenger hunts using **Google Gemini 2.x API**. It combines:

- 🤖 **AI-Powered Clue Generation** - Dynamic, context-aware clues
- 🎮 **Gamification** - Leaderboards, timers, progressive QR reveals
- 📜 **Certificates** - Auto-generated e-certificates for winners & participants
- 🎭 **Multiple Themes** - Fun, Academic, Comic, Rhymes, Riddles, Cryptic Puzzles, Emoji Connection
- 📱 **Multi-Platform** - Works on desktop, tablet, and mobile
- 🎯 **Age-Appropriate** - Content filtered for Kids, Teens, Adults

### Why This Project is Impressive:

✅ **Production-Ready Architecture** - Scalable microservices design  
✅ **Real-time Features** - Live leaderboard, progressive QR reveals  
✅ **AI Integration** - Intelligent clue generation with constraints  
✅ **Full CRUD Operations** - Hunt management system  
✅ **Automated Certificate Generation** - Personalized e-certificates  
✅ **Cloud-Native** - Serverless deployment on Vercel & Render  
✅ **Security** - Firebase authentication, API key management  
✅ **Responsive Design** - Mobile-first approach with Tailwind CSS  

---

## ⭐ Features

### Core Features

| Feature | Status | Details |
|---------|--------|---------|
| **AI Clue Generation** | ✅ | Google Gemini 2.x generates context-aware clues |
| **Age Constraints** | ✅ | Kids (5-12), Teens (13-17), Adults (18+) |
| **Academic/Non-Academic** | ✅ | Toggle between educational and fun content |
| **8 Clue Maximum** | ✅ | Enforced limit per hunt |
| **Printable Clue Cards** | ✅ | PDF export with custom templates |
| **Online Registration** | ✅ | Participant signup system |
| **Indoor/Outdoor Mode** | ✅ | Location-specific clues |

### Advanced Features

| Feature | Status | Details |
|---------|--------|---------|
| **Multiple Themes** | ✅ | Fun, Academic, Comic, Rhymes, Riddles, Cryptic, Emoji |
| **Leaderboard** | ✅ | Real-time rankings with filtering |
| **Progressive QR Timer** | ✅ | QR code reveals bit-by-bit with timer |
| **E-Certificates** | ✅ | Winner & Participant certificates |
| **Cloudinary Integration** | ✅ | Image storage & CDN delivery |
| **Firebase Firestore** | ✅ | Real-time database sync |
| **Responsive UI** | ✅ | Mobile-optimized with Framer Motion animations |

---

## 🛠 Tech Stack

### Frontend
- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Router** - Navigation
- **QR Code JS** - QR generation
- **jsPDF** - Certificate generation

### Backend
- **FastAPI** - Python web framework
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation
- **Google Gemini 2.x API** - AI clue generation
- **Firebase Admin SDK** - Database & authentication
- **Cloudinary SDK** - Image storage
- **python-dotenv** - Environment management

### Database & Storage
- **Firebase Firestore** - NoSQL database
- **Firebase Authentication** - User management
- **Cloudinary** - Image CDN & storage

### Deployment
- **Vercel** - Frontend hosting
- **Render** - Backend API hosting
- **Firebase** - Database & auth
- **Cloudinary** - Image storage

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER (Vercel)                   │
│  React + Tailwind CSS + Framer Motion (ai-treasure.vercel)  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Hunt Creator │ Clue Cards │ Leaderboard │ Timer │ etc │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────┬──────────────────────────────────────┘
                      │ HTTPS Requests
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                    API LAYER (Render)                        │
│              FastAPI + Python Backend                        │
│                                                               │
│  ┌─────────────┬──────────────┬──────────────────────────┐  │
│  │   Routes    │   Services   │   Middleware             │  │
│  │ /hunts      │ Gemini AI    │ Auth, CORS, Logging      │  │
│  │ /clues      │ Firebase     │ Error Handling           │  │
│  │ /scores     │ QR Generator │ Rate Limiting            │  │
│  │ /certs      │ PDF Creator  │                          │  │
│  └─────────────┴──────────────┴──────────────────────────┘  │
└─────────────┬──────────────┬──────────────┬─────────────────┘
              │              │              │
    ┌─────────▼──┐  ┌────────▼────┐  ┌─────▼─────────┐
    │  Firebase  │  │  Gemini API │  │  Cloudinary   │
    │ Firestore  │  │  (AI Clues) │  │  (Storage)    │
    │            │  │             │  │               │
    │ • Hunts    │  │ • Generate  │  │ • Certificates│
    │ • Users    │  │   clues     │  │ • Images      │
    │ • Scores   │  │ • Validate  │  │ • Logos       │
    │ • Certs    │  │   themes    │  │               │
    └────────────┘  └─────────────┘  └───────────────┘
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 16+ & npm/yarn
- Python 3.9+
- Git
- Google Gemini API key
- Firebase project
- Cloudinary account

### Step 1: Clone Repository

```bash
git clone https://github.com/Bhavitha2107/ai-treasure-hunt-creator.git
cd ai-treasure-hunt-creator
```

### Step 2: Frontend Setup

```bash
cd frontend
npm install
# or
yarn install

# Create .env.local
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Step 3: Backend Setup

```bash
cd backend
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env
cp .env.example .env
# Edit .env with your keys
```

### Step 4: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project
3. Enable Firestore Database
4. Enable Authentication (Email/Password)
5. Download service account key (backend)
6. Get web config (frontend)

### Step 5: Gemini API Setup

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create API key
3. Add to `.env` files

### Step 6: Cloudinary Setup

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Copy Cloud Name, API Key, API Secret
3. Add to backend `.env`

### Step 7: Run Applications

**Terminal 1 - Backend:**
```bash
cd backend
uvicorn app.main:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

Frontend: http://localhost:3000  
Backend: http://localhost:8000  
API Docs: http://localhost:8000/docs  

---

## 🔐 Environment Variables

### Frontend (.env.local)

```env
REACT_APP_FIREBASE_API_KEY=your_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project
REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_id
REACT_APP_FIREBASE_APP_ID=your_app_id

REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

### Backend (.env)

```env
# Gemini AI
GEMINI_API_KEY=your_gemini_key

# Firebase
FIREBASE_PROJECT_ID=your_project
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_email

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# Server
DEBUG=False
SECRET_KEY=your_secret_key
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.vercel.app
```

---

## 📡 API Documentation

### Base URL: `http://localhost:8000/api/v1`

### Authentication
All endpoints require Firebase token in header:
```
Authorization: Bearer <firebase_token>
```

### Endpoints

#### 1. Create Hunt
**POST** `/hunts/create`

```json
{
  "title": "Campus Scavenger Hunt",
  "description": "Find hidden items around campus",
  "theme": "fun",
  "age_group": "teens",
  "academic": false,
  "location_type": "outdoor",
  "num_clues": 5,
  "difficulty": "medium"
}
```

**Response:**
```json
{
  "hunt_id": "hunt_123",
  "title": "Campus Scavenger Hunt",
  "clues": [
    {
      "clue_id": 1,
      "text": "Find where students gather for coffee...",
      "hint": "It's near the library",
      "qr_code": "QR_DATA"
    }
  ],
  "status": "created"
}
```

#### 2. Generate Clues
**POST** `/clues/generate`

```json
{
  "hunt_id": "hunt_123",
  "theme": "riddles",
  "count": 5
}
```

#### 3. Get Leaderboard
**GET** `/leaderboard/{hunt_id}?limit=10`

```json
{
  "hunt_id": "hunt_123",
  "standings": [
    {
      "rank": 1,
      "player_name": "Alex",
      "score": 1000,
      "time": "12:34"
    }
  ]
}
```

#### 4. Generate Certificate
**POST** `/certificates/generate`

```json
{
  "hunt_id": "hunt_123",
  "participant_name": "John Doe",
  "position": "winner",
  "date": "2024-07-19"
}
```

#### 5. Submit Answer
**POST** `/scores/submit`

```json
{
  "hunt_id": "hunt_123",
  "clue_id": 1,
  "answer": "library",
  "time_taken": 300
}
```

---

## 💾 Database Schema

### Firestore Collections

#### `hunts/`
```
hunts/{huntId}
├── title: string
├── description: string
├── creator_id: string
├── theme: enum(fun|academic|comic|rhyme|riddle|cryptic|emoji)
├── age_group: enum(kids|teens|adults)
├── academic: boolean
├── location_type: enum(indoor|outdoor)
├── num_clues: number
├── difficulty: enum(easy|medium|hard)
├── clues: array
├── status: enum(draft|active|completed)
├── created_at: timestamp
├── updated_at: timestamp
└── max_clues: number = 8
```

#### `users/`
```
users/{userId}
├── email: string
├── name: string
├── profile_picture: string
├── hunts_created: array
├── hunts_participated: array
├── total_score: number
├── created_at: timestamp
└── updated_at: timestamp
```

#### `scores/`
```
scores/{scoreId}
├── hunt_id: string
├── user_id: string
├── clues_solved: array
├── total_score: number
├── time_taken: number
├── rank: number
├── certificate_url: string
├── created_at: timestamp
└── completed_at: timestamp
```

#### `certificates/`
```
certificates/{certId}
├── hunt_id: string
├── user_id: string
├── participant_name: string
├── position: enum(winner|participant)
├── pdf_url: string
├── issued_date: timestamp
└── created_at: timestamp
```

---

## 🌐 Deployment Guide

### Frontend Deployment (Vercel)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from frontend directory
cd frontend
vercel --prod

# Set environment variables in Vercel dashboard
```

**Vercel Dashboard Steps:**
1. Connect GitHub repo
2. Set environment variables (.env.local values)
3. Deploy on push to main

### Backend Deployment (Render)

**1. Create Render Account** - https://render.com

**2. Create Web Service:**
- Connect GitHub repo
- Runtime: Python 3.9
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn app.main:app --host 0.0.0.0`

**3. Add Environment Variables** in Render dashboard

**4. Deploy:**
```bash
git push origin main
# Render auto-deploys on push
```

### Firebase Deployment

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize (in project root)
firebase init hosting

# Deploy
firebase deploy
```

---

## 💡 Usage Examples

### Example 1: Creating a Treasure Hunt

1. Click **"Create New Hunt"**
2. Fill in details:
   - Title: "Library Treasure Hunt"
   - Theme: "Riddles"
   - Age Group: "Teens"
   - Location: "Indoor"
   - Clues: 5
3. Click **"Generate with AI"**
4. AI generates 5 clues for the library
5. Download as **Printable PDF**
6. Share registration link with participants

### Example 2: Playing a Hunt

1. Register with name and email
2. Start hunt - Timer begins
3. Receive first clue
4. Submit answer when found
5. If correct → QR code reveals progressively
6. Move to next clue
7. Complete all clues → View rank on leaderboard
8. Download certificate

### Example 3: AI Clue Generation

**Input:**
- Theme: "Cryptic Puzzles"
- Location: "School Campus"
- Age: "Kids"
- Academic: True

**AI Output:**
```
Clue 1: "I have keys but no lock. I have space but no room. What am I?"
Answer: Keyboard

Clue 2: "The more you take, the more you leave behind. What am I?"
Answer: Footsteps
```

---

## 📁 Project Structure

```
ai-treasure-hunt-creator/
│
├── frontend/                          # React + Tailwind + Framer Motion
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── HuntCreator/
│   │   │   │   ├── HuntForm.jsx
│   │   │   │   ├── ThemeSelector.jsx
│   │   │   │   └── AgeSelector.jsx
│   │   │   ├── ClueCard/
│   │   │   │   ├── ClueDisplay.jsx
│   │   │   │   ├── QRCodeDisplay.jsx
│   │   │   │   └── AnswerInput.jsx
│   │   │   ├── Leaderboard/
│   │   │   │   ├── LeaderboardTable.jsx
│   │   │   │   └── RankingCard.jsx
│   │   │   ├── Timer/
│   │   │   │   └── CountdownTimer.jsx
│   │   │   ├── Certificate/
│   │   │   │   └── CertificateDisplay.jsx
│   │   │   └── Navigation/
│   │   │       └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── CreateHunt.jsx
│   │   │   ├── JoinHunt.jsx
│   │   │   ├── HuntPlay.jsx
│   │   │   ├── Leaderboard.jsx
│   │   │   ├── Results.jsx
│   │   │   └── Certificate.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── firebase.js
│   │   │   └── qrGenerator.js
│   │   ├── hooks/
│   │   │   ├── useHunt.js
│   │   │   ├── useAuth.js
│   │   │   └── useTimer.js
│   │   ├── utils/
│   │   │   └── validators.js
│   │   ├── App.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── backend/                            # FastAPI + Python
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── config.py
│   │   ├── dependencies.py
│   │   ├── models/
│   │   │   ├── hunt.py
│   │   │   ├── user.py
│   │   │   ├── score.py
│   │   │   └── certificate.py
│   │   ├── routes/
│   │   │   ├── hunts.py
│   │   │   ├── clues.py
│   │   │   ├── scores.py
│   │   │   ├── leaderboard.py
│   │   │   └── certificates.py
│   │   ├── services/
│   │   │   ├── gemini_service.py
│   │   │   ├── firebase_service.py
│   │   │   ├── qr_service.py
│   │   │   ├── certificate_service.py
│   │   │   └── cloudinary_service.py
│   │   └── utils/
│   │       ├── validators.py
│   │       ├── decorators.py
│   │       └── helpers.py
│   ├── tests/
│   ├── requirements.txt
│   ├── .env.example
│   ├── Dockerfile
│   └── main.py
│
├── docs/
│   ├── API_DOCUMENTATION.md
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   └── CONTRIBUTING.md
│
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci-cd.yml
│
├── LICENSE
└── README.md
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 🎓 Project Info

- **Created for:** Samsung Innovation Campus (SIC)
- **Specialization:** AI/ML
- **Year:** 2024
- **Author:** Bhavitha2107

---

## 📞 Support & Contact

For questions or issues:
- Open an issue on GitHub
- Email: bhavitha2107@example.com
- LinkedIn: [Your LinkedIn]

---

## 🙏 Acknowledgments

- Google Gemini API for AI capabilities
- Firebase for backend services
- Cloudinary for image management
- React community & ecosystem

**Made with ❤️ for learners, by learners.**
