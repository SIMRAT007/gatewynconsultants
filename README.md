# 🌐 GlobalVisa — Immigration Website + Admin CMS

A modern, animated single-page immigration website built with **React + Vite**, styled with **Tailwind CSS**, and powered by **Firebase** (Firestore + Auth).

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Navy | `#142845` |
| Gold Accent | `#E7CD87` |
| Background | `#0c1c30` |
| Font Display | Cormorant Garamond |
| Font Body | Outfit |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── Services.jsx
│   ├── VisaTypes.jsx
│   ├── Process.jsx
│   ├── FAQ.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── admin/
│       ├── AdminLogin.jsx       ← Firebase Auth secured
│       ├── AdminDashboard.jsx   ← Full CMS
│       └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx          ← Firebase Auth context
├── hooks/
│   ├── useContent.js            ← Firestore read/write
│   └── useReveal.js             ← Scroll reveal
├── styles/
│   └── index.css
├── firebase.js                  ← ⚠️ Update with your config
├── App.jsx
└── main.jsx
```

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable **Firestore Database** (Start in test mode for development)
4. Enable **Authentication → Email/Password**
5. Create an admin user: Authentication → Users → Add User
6. Go to **Project Settings → Your Apps → Web** → Copy the config

### 3. Update Firebase Config

Edit `src/firebase.js` and replace placeholder values:

```js
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 4. Firestore Security Rules (Recommended)

In Firebase Console → Firestore → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read for site content
    match /siteContent/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 5. Run Development Server

```bash
npm run dev
```

### 6. Build for Production

```bash
npm run build
npm run preview
```

---

## 🔐 Admin Panel

- **URL:** `/admin`
- **Login:** Use the email/password you created in Firebase Auth
- **Dashboard:** `/admin/dashboard` (protected, redirects to login if not authenticated)

### What you can edit in Admin:
- ✅ Hero section (badge, heading, subheading, CTA buttons, stats, image URL)
- ✅ Services (add/edit/delete service cards)
- ✅ Visa Types / Education section (countries, visa types, descriptions)
- ✅ Process steps
- ✅ FAQ (add/edit/delete questions)
- ✅ Contact info (email, phone, address, hours)
- ✅ Site Images (all image URLs — paste from imgbb or any host)
- ✅ Footer (company name, tagline, copyright, links)

---

## 🖼️ Image Management

Upload images to [imgbb.com](https://imgbb.com) (free image hosting) or any CDN/image host, then paste the **direct image URL** into the Admin Panel → Site Images section.

---

## 🌍 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Deploy the `dist/` folder
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

---

## 📦 Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | UI framework |
| Vite 5 | Build tool |
| Tailwind CSS 3 | Styling |
| Firebase Firestore | Content database |
| Firebase Auth | Admin authentication |
| React Router v6 | Client-side routing |
| React Hot Toast | Notifications |
| Lucide React | Icons |
| Cormorant Garamond | Display font |
| Outfit | Body font |

---

## ✨ Features

- 🎭 Animated hero with floating particles and globe SVG
- 📜 Scroll-triggered reveal animations throughout
- 🌍 Interactive visa types education section (expandable cards)
- 📋 Animated process steps with connecting lines
- ❓ Smooth accordion FAQ
- 📬 Contact form with country selector
- 🔒 Secure admin panel with Firebase Email/Password auth
- 📝 Full CMS — edit all content live from admin dashboard
- 🖼️ External image URL management (imgbb compatible)
- 📱 Fully responsive mobile design
- ✨ Gold shimmer text effects
- 🌑 Dark luxury aesthetic with grain overlay

---

*Built with ❤️ — GlobalVisa Immigration Services*
