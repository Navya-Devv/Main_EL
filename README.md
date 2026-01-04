

---

#  Lakshya AI – Intelligent Interview Mocker

Lakshya AI is an **AI-powered interview preparation platform** designed to help candidates confidently prepare for **technical and behavioral interviews**.
It simulates real interview scenarios, analyzes responses (including facial cues), and provides **instant, actionable AI feedback** to help users improve with every attempt.

---

##  Preview

<img width="1465" height="825" alt="Lakshya AI Preview" src="https://github.com/user-attachments/assets/e97491be-3b83-4958-b977-48498e32b8f9" />

---

##  Features

* **AI Mock Interviews**
  Generates dynamic, role-specific interview questions using **Google Gemini AI**.

* **Video & Facial Analysis**
  Real-time face detection and confidence analysis powered by **face-api.js**.

* **Speech-to-Text Support**
  Answer interviews naturally using voice; built-in speech recognition converts speech to text.

* **Instant AI Feedback**
  Get immediate ratings (1–10) and detailed feedback for every response.

* **Learning Hub**
  Curated free resources for **DSA, System Design, Aptitude, and Interview Prep**.

* **Secure Authentication**
  User authentication and profile management handled via **Clerk**.

* **Progress Tracking**
  Interview history, scores, and performance metrics stored in the database.

---

##  Tech Stack

* **Framework:** Next.js 14 (App Router)
* **Styling:** Tailwind CSS + shadcn/ui
* **AI Model:** Google Gemini API
* **Authentication:** Clerk
* **Database:** PostgreSQL (via Drizzle ORM)
* **Video Analysis:** face-api.js
* **Icons:** Lucide React

---

##  Getting Started

Follow the steps below to run the project locally.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/lakshya-ai.git
cd lakshya-ai
```

---

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env.local` file in the project root and add the following:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Google Gemini AI
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key

# Database (PostgreSQL - Neon / Supabase / Local)
DATABASE_URL=postgresql://user:password@host:port/dbname
```

---

### 4️⃣ Download Face API Models

Facial analysis requires model weights from `face-api.js`.

1. Download the models from:
   [https://github.com/justadudewhohacks/face-api.js/tree/master/weights](https://github.com/justadudewhohacks/face-api.js/tree/master/weights)
2. Place all files inside:

```
public/models/
```

---

### 5️⃣ Run the Development Server

```bash
npm run dev
```

Open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🗄️ Database Setup (Drizzle ORM)

### Push Schema to Database

```bash
npx drizzle-kit push
```

### Open Drizzle Studio

```bash
npx drizzle-kit studio
```

---

## 📌 Notes

* This project uses **client-side AI interactions** for interview flow.
* Make sure your **camera and microphone permissions** are enabled for full functionality.
* Suitable for **students, job seekers, and professionals** preparing for interviews.

---

## 📄 License

This project is intended for **educational and personal use**.
Feel free to fork and extend it.

---

## 🙌 Acknowledgements

* Google Gemini API
* Clerk Authentication
* face-api.js
* Next.js & Tailwind CSS ecosystem

---

