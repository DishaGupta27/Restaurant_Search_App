# 🍴 Restaurant Search App  

A **modern and responsive React web application** built as part of the **Fastor Assignment**, allowing users to **log in, explore nearby restaurants**, and **superimpose a Fastor logo** dynamically on restaurant images — complete with **sharing and downloading features**.

---

## 🌐 Live Demo  
👉 [View Live on Netlify](https://your-app-name.netlify.app)  
*(Replace this with your actual Netlify URL)*

---

## 🧠 Project Overview  

The **Restaurant Search App** offers a smooth, interactive experience — from a simple OTP-based login to a rich restaurant discovery feature with superimposed branding and PWA-like sharing capabilities.

---

## ✨ Core Features  

### 🔐 Login System  
- Simple **mobile number login** on the first screen.  
- **OTP-based authentication** using fixed code `123456`.  
- Smooth navigation from login to OTP screen.

### 🍽️ Restaurant Discovery  
- REST API-based list of **nearby restaurants** using a JSON file.  
- **Use My Location** button to fetch real-time nearby places.  
- Displays restaurant name, address, distance, and more.  

### 🏞️ Image Superimposing  
- On selecting a restaurant, the **restaurant image** is displayed.  
- The **Fastor logo** appears **centered by default** on the image.  
- User can **drag and reposition** the logo anywhere on the image.  
- Supports:
  - 🖼️ **Download Image** (with logo)
  - 📤 **Share Image** to apps (PWA-enabled)

### 🎁 Bonus Feature  
✅ **Interactive Logo Positioning** — implemented using draggable logic for better UX.

---

## 🧱 Folder Structure  
Restaurant_Search_App/
│
├── public/
│ ├── _redirects # SPA route handling
│ ├── manifest.json # PWA manifest
│ ├── restaurants.json # Mock restaurant data (REST API)
│ └── vite.svg
│
├── src/
│ ├── assets/
│ │ ├── fastor-logo.png # Fastor brand logo
│ │ └── react.svg
│ │
│ ├── components/
│ │ ├── Button.jsx
│ │ ├── Login.jsx
│ │ ├── OTP.jsx
│ │ ├── RestaurantDetail.jsx
│ │ └── RestaurantsList.jsx
│ │
│ ├── styles/
│ │ └── theme.css # Custom theme and layout styles
│ │
│ ├── App.jsx
│ └── main.jsx
│
├── package.json
├── vite.config.js
├── vercel.json / netlify.toml
└── README.md


---

## ⚙️ Tech Stack  

| Category | Technology |
|-----------|-------------|
| Framework | React + Vite |
| Styling | Custom CSS / Theme.css |
| Deployment | Netlify / Vercel |
| Libraries | `react-router-dom`, `react-draggable`, `react-rnd` |
| Data | Static JSON REST API (restaurants.json) |
| PWA | Manifest + Share API + Download |

---

## 🧩 Installation & Setup  

### 1️⃣ Clone Repository  
```bash
git clone https://github.com/DishaGupta27/Restaurant_Search_App.git
cd Restaurant_Search_App
