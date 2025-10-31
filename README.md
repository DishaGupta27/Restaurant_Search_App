# Fastor Restaurant Finder

Fastor is a web application that helps users discover restaurants near their location. Users can log in with their mobile number, receive an OTP for verification, and explore various restaurants.

## 🌐 Live Demo  
👉 [View Live on Netlify](https://nearbyrestaurantsearchapp.netlify.app/)

---

## 🧠 Project Overview  

The App offers a smooth, interactive experience — from a simple OTP-based login to a rich restaurant discovery feature with superimposed branding and PWA-like sharing capabilities.

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

```
Fastor_Assignment/
├── Restaurant_Search_App/
│   ├── Restaurant_Search/
│   │   ├── public/
│   │   │   └── restaurants.json
│   │   ├── src/
│   │   │   ├── assets/
│   │   │   │   └── fastor-logo.png
│   │   │   ├── components/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── OTP.jsx
│   │   │   │   ├── RestaurantDetail.jsx
│   │   │   │   └── RestaurantsList.jsx
│   │   │   ├── App.js
│   │   │   ├── index.js
│   │   │   └── styles.css
│   │   └── package.json
└── README.md
```

## Installation

To clone the repository and run the application locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Fastor_Assignment.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Fastor_Assignment/Restaurant_Search_App/Restaurant_Search
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

## ⚙️ Tech Stack  

| Category | Technology |
|-----------|-------------|
| Framework | React + Vite |
| Styling | Custom CSS / Theme.css |
| Deployment | Netlify / Vercel |
| Libraries | `react-router-dom`, `react-rnd` |
| Data | Static JSON REST API (restaurants.json) |
| PWA | Manifest + Share API + Download |

---
