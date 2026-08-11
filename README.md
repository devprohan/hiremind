# HireMind

### AI Smart Career & Placement Platform

HireMind is an AI-powered career and placement platform designed
to help students analyze their resumes, identify skill gaps,
match their profiles with job descriptions, prepare for interviews,
and build personalized career roadmaps.

## Overview

The platform combines a modern full-stack web application with
Google Gemini AI to provide intelligent career guidance.

Users can upload their resumes, receive AI-powered ATS analysis,
compare their resumes with job descriptions, generate interview
questions, and get a personalized career roadmap based on their
skills and career goals.

## Features

### 🔐 Authentication & User Management
- User registration and login
- JWT-based authentication
- Protected frontend and backend routes
- User profile management
- Secure password handling

### 📄 AI Resume Analyzer
- Upload resumes in PDF format
- Cloudinary-based resume storage
- Automatic PDF text extraction
- AI-powered resume analysis using Google Gemini
- ATS score generation
- Skill detection
- Missing skill identification
- Strengths and weaknesses analysis
- AI-generated improvement suggestions

### 🎯 AI Job Match
- Compare resume with a job description
- Generate AI-powered job match score
- Identify matched skills
- Identify missing skills
- Generate actionable recommendations

### 🎤 AI Interview Preparation
- Generate interview questions using AI
- Generate questions based on the candidate's resume and skills
- Prepare candidates for technical interviews
- Role-focused interview preparation

### 🛣️ AI Career Roadmap
- Enter a career goal
- Analyze existing skills and missing skills
- Generate a personalized career roadmap
- Get an AI-generated learning path

### 📊 Dashboard & Analytics
- Total resumes
- Highest ATS score
- Average ATS score
- Resume processing status
- Recent resumes
- Skills analytics

### 👤 Profile Management
- Update personal information
- College and branch details
- Graduation year and CGPA
- Manage skills
- Add GitHub and LinkedIn profiles
- Update profile bio

### 🔒 Security
- JWT authentication
- Protected API routes
- Authenticated resume operations
- Environment-based secret management

## 🏗️ System Architecture

HireMind follows a full-stack architecture where the React frontend
communicates with the Node.js and Express.js backend through REST APIs.

The backend handles authentication, resume processing, database
operations, and communication with external services such as
Google Gemini and Cloudinary.

### Architecture Overview

```text
                    ┌──────────────────────┐
                    │      User            │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React Frontend     │
                    │   + Tailwind CSS     │
                    └──────────┬───────────┘
                               │
                         REST API / Axios
                               │
                               ▼
                    ┌──────────────────────┐
                    │   Node.js + Express  │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
      ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
      │   MongoDB    │ │  Cloudinary  │ │ Google Gemini│
      │   Database   │ │ File Storage │ │  AI Service  │
      └──────────────┘ └──────────────┘ └──────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   AI Results & Data  │
                    │   returned to UI     │
                    └──────────────────────┘
```

## 📂 Project Structure
```text
            HireMind/
            │
            ├── client/hiremind
            │   ├── src/
            │   │   ├── components/
            │   │   ├── pages/
            │   │   ├── services/
            │   │   └── ...
            │   │
            │   └── ...
            │
            ├── server/
            │   ├── src/
            │   │   ├── Config/
            │   │   ├── Controllers/
            │   │   ├── Middlewares/
            │   │   ├── Models/
            │   │   ├── Routes/
            │   │   ├── Services/
            │   │   ├── Utils/
            │   │   └── app.js
            │   │
            │   └── server.js
            │
            ├── .gitignore
            └── README.md  
```          

## 🚀 Installation & Setup

### Backend Setup
- cd server
- npm install
- npm run dev


### Frontend Setup
- cd client/hiremind
- npm install
- npm run dev

## 🔮 Future Scope

- AI-powered mock interviews
- Voice-based interview practice
- Job recommendation system
- Resume builder
- LinkedIn profile analysis
- Job application tracking
- Interview performance analytics
- Personalized learning recommendations

## 👨‍💻 Contributors

This project was collaboratively developed by:

- **Rohan Fande** – Backend Development, AI Integration, Database Design
- **Ashwini Hedau** – Frontend Development, UI/UX Design, Data Integration


## 📄 License

This project is developed for educational and portfolio purposes.