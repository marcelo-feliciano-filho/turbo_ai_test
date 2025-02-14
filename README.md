# 🚀 Turbo AI Test

A **full-stack web application** built with **React (Next.js) for the frontend** and **Django (Django REST Framework) for the backend**. Users can **sign up, log in, and manage categorized notes**.

---

## 📌 Features

- **🔐 Authentication** – Secure signup/login with JWT.
- **📝 Notes Management** – Create, edit, delete categorized notes.
- **🎨 Category-Based UI** – Notes are color-coded by category.
- **🚀 API Integration** – Frontend communicates with a Django REST API.
- **📄 Swagger API Docs** – Auto-generated API documentation.

---

## 📌 Tech Stack

### **Frontend**
- **Next.js (React + TypeScript)**
- **Tailwind CSS** for styling
- **Axios** for API requests

### **Backend**
- **Django & Django REST Framework**
- **PostgreSQL** for database
- **JWT** for authentication
- **Swagger (drf-yasg)** for API documentation

---

## 📌 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/marcelo-feliciano-filho/turbo_ai_test.git
cd turbo_ai_test
```

### **2️⃣ Setup & Run Backend (Django)**
```sh
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
➡️ **Backend Running at:** `http://127.0.0.1:8000/`  
➡️ **Swagger API Docs:** `http://127.0.0.1:8000/swagger/`

### **3️⃣ Setup & Run Frontend (React/Next.js)**
```sh
cd frontend
npm install
npm run dev
```
➡️ **Frontend Running at:** `http://localhost:3000/`

---

## 📌 API Documentation (Swagger)
The API is documented using **Swagger UI**.  
Access API docs at:  
🔗 **[http://127.0.0.1:8000/swagger/](http://127.0.0.1:8000/swagger/)**  


---
🌐 **GitHub:** [github.com/marcelo-feliciano-filho](https://github.com/marcelo-feliciano-filho)  

🚀 **Thank you for checking out Turbo AI Test!** 🚀
