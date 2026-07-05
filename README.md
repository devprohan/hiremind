# 🎯 Feature: Resume Analysis :
PDF
 ↓
Cloudinary
 ↓
MongoDB
 ↓
Download PDF
 ↓
Extract Text
 ↓
Gemini
 ↓
ATS Score
 ↓
Save Analysis
 ↓
Response

# 🎯 Feature: Job Match AI :

                User Dashboard

                     │
                     ▼

          Paste Job Description

                     │
                     ▼

             Click "Match Resume"

                     │
                     ▼

          Backend (Node + Express)

                     │
                     ▼

         Get Latest Resume From MongoDB

                     │
                     ▼

      Resume Text + Job Description

                     │
                     ▼

                 Gemini AI

                     │
                     ▼

        ----------------------------

        Match Score : 88%

        Matched Skills
        ✔ React
        ✔ Node.js
        ✔ Express

        Missing Skills
        ❌ Docker
        ❌ AWS

        Suggestions
        • Learn Docker
        • Add AWS project
        • Improve Resume Keywords

        ----------------------------

                     │
                     ▼

             Save Result (Optional)

                     │
                     ▼

               Send Response

# 🎯 AI Interview Question Generator Flow :

                User Dashboard
                       │
                       ▼
          Select "Interview Generator"
                       │
                       ▼
          Enter Target Job Role (Optional)
                       │
                       ▼
      POST /api/interview/generate
                       │
                       ▼
            Backend (Node.js + Express)
                       │
                       ▼
     Authenticate User using JWT Token
                       │
                       ▼
      Fetch Latest Resume from MongoDB
                       │
                       ▼
 Resume Analysis + Extracted Skills + Job Role
                       │
                       ▼
            Google Gemini AI
                       │
                       ▼
      Generate Personalized Questions
                       │
                       ▼
        ┌─────────────────────────────┐
        │ Technical Questions (10)    │
        │ Behavioral Questions (5)    │
        │ HR Questions (5)            │
        └─────────────────────────────┘
                       │
                       ▼
         Return JSON Response to Client
                       │
                       ▼
      Frontend Displays Questions