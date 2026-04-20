# 📧 EmailJS Setup Guide

## What You Have Now

✅ Custom booking form that pops up
✅ Collects user info (name, email, date, time, message)
✅ Your email configured in `useContent.js` at line 211:
   `consultantEmail: 'info@gatewynconsultants.uk'`

## Setup Steps

### 1. Create EmailJS Account (FREE)
- Go to https://www.emailjs.com/
- Sign up with your email
- Verify your email

### 2. Add Email Service
- Go to "Email Services" → "Add New Service"
- Choose Gmail
- Connect your Gmail account
- Copy the **Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
- Go to "Email Templates" → "Create New Template"
- Use these variables in your template:

**For Consultant Email:**
```
Subject: New Booking from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Date: {{date}}
Time: {{time}}
Message: {{message}}
Meeting Link: {{meeting_link}}
```

**For User Email:**
```
Subject: Consultation Confirmed

Hi {{to_name}},

Your consultation is confirmed!
Date: {{date}}
Time: {{time}}
Google Meet Link: {{meeting_link}}

We'll see you then!
```

### 4. Get Your Keys
- Service ID: From Email Services page
- Template ID: From Email Templates page
- Public Key: Account → API Keys

### 5. Update BookingModal.jsx
Replace these lines (around line 21-24):
```javascript
'YOUR_SERVICE_ID'  → Your actual Service ID
'YOUR_TEMPLATE_ID' → Your actual Template ID  
'YOUR_PUBLIC_KEY'  → Your actual Public Key
```

## How It Works

1. User clicks "Book 15min Google Meet"
2. Form pops up
3. User fills details and submits
4. EmailJS sends 2 emails:
   - To YOU: info@gatewynconsultants.uk
   - To USER: their email address
5. Both get Google Meet link

## Your Email is Set Here

File: `src/hooks/useContent.js`
Line: 211
```javascript
consultantEmail: 'info@gatewynconsultants.uk'
```

To change it, just edit that line!
