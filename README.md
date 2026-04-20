# � Gatewyn Consultants — Study Abroad Website

A modern, fully-featured study abroad consulting website built with **React + Vite**, styled with **Tailwind CSS**, featuring a custom booking system with **EmailJS** integration for Google Meet scheduling.

> **Professional study abroad consulting platform for UK, Canada, Australia & Europe**

---

## 🎨 Design System

| Element | Value |
|---------|-------|
| **Primary Navy** | `#142845` |
| **Gold Accent** | `#E7CD87` |
| **Background** | White with smooth gradients |
| **Display Font** | Cormorant Garamond |
| **Body Font** | Outfit |
| **Border Radius** | 24px (rounded-3xl) |

---

## ✨ Key Features

### 🎯 Core Functionality
- ✅ **Custom Booking System** — Google Meet scheduling with email notifications
- ✅ **EmailJS Integration** — Automated emails to consultant & user
- ✅ **Dynamic Content** — All content managed via `useContent.js`
- ✅ **Responsive Design** — Optimized for mobile, tablet & desktop
- ✅ **Scroll Animations** — Smooth reveal effects throughout
- ✅ **Modal System** — Legal terms, privacy policy, booking form
- ✅ **Floating Action Buttons** — WhatsApp & Back-to-top
- ✅ **Instagram Feed** — Social proof with latest posts
- ✅ **Testimonials Carousel** — Student success stories
- ✅ **FAQ Accordion** — Expandable Q&A section
- ✅ **Video Section** — Embedded YouTube content
- ✅ **No Text Selection** — Professional copy protection

### 📧 Booking System Features
- Custom modal with form validation
- Date picker (prevents past dates)
- Time slot selection (9 AM - 6 PM)
- Google Meet link generation
- Dual email notifications (consultant + user)
- Demo mode (works without EmailJS setup)
- Console logging for testing
- Success animation & confirmation

---

## 📁 Project Structure

```
immigration-site/
├── public/
│   └── logo.jpg                    ← Company logo
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              ← Navigation with mobile menu
│   │   ├── Hero.jsx                ← Hero section with stats
│   │   ├── About.jsx               ← About company section
│   │   ├── Services.jsx            ← Service cards
│   │   ├── VideoSection.jsx        ← YouTube embed + gallery
│   │   ├── VisaTypes.jsx           ← Country visa information
│   │   ├── Process.jsx             ← Application process steps
│   │   ├── Testimonials.jsx        ← Student reviews carousel
│   │   ├── FAQ.jsx                 ← Accordion Q&A
│   │   ├── InstagramFeed.jsx       ← Instagram posts grid
│   │   ├── Contact.jsx             ← Contact form + info
│   │   ├── BookingModal.jsx        ← 🆕 Google Meet booking
│   │   ├── Footer.jsx              ← Footer with links
│   │   ├── FloatingButtons.jsx     ← WhatsApp + Back-to-top
│   │   └── LegalModal.jsx          ← Privacy & Terms modal
│   ├── hooks/
│   │   ├── useContent.js           ← 🎯 All website content
│   │   └── useReveal.js            ← Scroll reveal animations
│   ├── styles/
│   │   └── index.css               ← Global styles + animations
│   ├── App.jsx                     ← Main app component
│   └── main.jsx                    ← Entry point
├── EMAILJS_SETUP_GUIDE.md          ← 📧 Email setup instructions
├── package.json
└── README.md
```

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Visit: **http://localhost:5173/**

### 3. Build for Production

```bash
npm run build
npm run preview
```

---

## 📧 EmailJS Setup (Optional)

The booking system works in **demo mode** by default (logs to console). To enable email sending:

### Step 1: Create EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com/)
2. Sign up (free tier available)
3. Verify your email

### Step 2: Configure Service
1. Add Email Service (Gmail recommended)
2. Connect your account
3. Copy **Service ID**

### Step 3: Create Template
1. Create new Email Template
2. Add template variables (see `EMAILJS_SETUP_GUIDE.md`)
3. Copy **Template ID**

### Step 4: Get Public Key
1. Go to Account → API Keys
2. Copy **Public Key**

### Step 5: Update Code
Edit `src/components/BookingModal.jsx` (lines 24-26):

```javascript
const SERVICE_ID = 'service_abc123';      // Your Service ID
const TEMPLATE_ID = 'template_xyz789';    // Your Template ID
const PUBLIC_KEY = 'your_public_key';     // Your Public Key
```

**Full guide:** See `EMAILJS_SETUP_GUIDE.md`

---

## 🎯 Content Management

All website content is centralized in **`src/hooks/useContent.js`**

### Edit Content Sections:

```javascript
// Consultant email for booking notifications
consultantEmail: 'info@gatewynconsultants.uk'

// Contact information
email: 'info@gatewynconsultants.uk'
phone: '+44 77 6900 3706'
whatsapp: '+44 77 6900 3706'

// Social media
instagram: 'https://www.instagram.com/gatewynconsultants'
```

### Available Content Sections:
- `hero` — Hero section with badge, heading, CTA buttons
- `about` — Company info, highlights, features
- `services` — Service cards with icons
- `visaTypes` — Country visa information
- `process` — Application steps
- `testimonials` — Student reviews (6 testimonials)
- `faq` — Frequently asked questions
- `videoSection` — YouTube video + gallery
- `instagram` — Instagram posts (6 posts)
- `contact` — Contact info + booking
- `footer` — Footer links and social media

---

## 🎨 Customization

### Change Colors

Edit `src/styles/index.css`:

```css
:root {
  --primary: #142845;    /* Navy blue */
  --gold: #E7CD87;       /* Golden accent */
}
```

### Update Logo

Replace `public/logo.jpg` with your logo (recommended: 200x200px)

### Modify Images

All images use Unsplash URLs in `useContent.js`. Replace with your own:

```javascript
image: 'https://your-image-url.com/photo.jpg'
```

### Change Fonts

Edit `src/styles/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font');
```

---

## 📱 Responsive Breakpoints

| Device | Breakpoint | Layout |
|--------|-----------|--------|
| Mobile | < 640px | Single column, stacked |
| Tablet | 640px - 1024px | 2 columns |
| Desktop | > 1024px | Full grid layout |

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
# Deploy the `dist/` folder via Netlify UI
```

### GitHub Pages
```bash
npm run build
# Push `dist/` folder to gh-pages branch
```

---

## 📦 Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 18.3.1 | UI framework |
| **Vite** | 5.4.21 | Build tool & dev server |
| **Tailwind CSS** | 3.4.17 | Utility-first styling |
| **EmailJS** | 4.4.1 | Email sending service |
| **Lucide React** | 0.468.0 | Icon library |
| **React Hot Toast** | 2.4.1 | Toast notifications |

---

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

---

## 📊 Website Sections

1. **Navbar** — Sticky navigation with mobile menu
2. **Hero** — Eye-catching intro with CTA buttons
3. **About** — Company overview with stats
4. **Services** — 6 service cards with icons
5. **Video Section** — YouTube embed + image gallery
6. **Visa Types** — Country-specific visa info (6 countries)
7. **Process** — 5-step application journey
8. **Testimonials** — 6 student success stories
9. **FAQ** — 6 common questions
10. **Instagram Feed** — 6 latest posts
11. **Contact** — Booking form + contact info
12. **Footer** — Links, social media, legal

---

## 🎯 Key Components

### BookingModal
- Custom Google Meet scheduling
- Form validation
- EmailJS integration
- Success animation
- Demo mode support

### FloatingButtons
- WhatsApp chat button
- Scroll-to-top button
- Responsive sizing
- High z-index (50)

### LegalModal
- Privacy Policy
- Terms & Conditions
- High z-index (9999)
- Scrollable content

---

## 🔒 Security Features

- ✅ No text selection/copying
- ✅ Email validation
- ✅ Date validation (no past dates)
- ✅ Form sanitization
- ✅ Secure email transmission

---

## 📈 Performance

- ⚡ Vite for fast HMR
- 🎨 Tailwind CSS purging
- 📦 Code splitting
- 🖼️ Lazy image loading
- ⚙️ Optimized builds

---

## 🐛 Troubleshooting

### White Screen / 504 Error
```bash
pkill -f vite
npm run dev
```

### EmailJS Not Working
- Check `BookingModal.jsx` has correct keys
- Verify EmailJS service is active
- Check browser console for errors
- Test in demo mode first

### Images Not Loading
- Verify image URLs are accessible
- Check CORS settings
- Use HTTPS URLs

---

## � Support

**Company:** Gatewyn Consultants  
**Email:** info@gatewynconsultants.uk  
**Phone:** +44 77 6900 3706  
**Location:** United Kingdom

---

## 📄 License

This project is proprietary software for Gatewyn Consultants.

---

## 🙏 Credits

- **Design & Development:** Custom built
- **Icons:** Lucide React
- **Images:** Unsplash
- **Fonts:** Google Fonts

---

**Built with ❤️ for Gatewyn Consultants — Your Gateway to Global Education**
