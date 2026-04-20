import { useState, useEffect } from 'react';

// Default content (used as fallback if Firestore is empty)
const DEFAULT_CONTENT = {
  hero: {
    badge: '🎓 Study Abroad & Visa Consultants',
    heading: 'Your Gateway to\nGlobal Education',
    subheading: 'Expert guidance for admissions, visas, and SOP preparation for UK, Canada, Australia, and Europe.',
    cta_primary: 'Free Profile Assessment',
    cta_secondary: 'Book Consultation',
    stats: [
      { value: '2k+', label: 'Students Placed' },
      { value: '95%', label: 'Visa Success' },
      { value: '4', label: 'Key Destinations' },
      { value: '100+', label: 'Partner Universities' }
    ],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80'
  },
  about: {
    badge: 'About Us',
    heading: 'Your Trusted Study Abroad Partner',
    subheading: 'Helping students achieve their dreams of international education',
    description: 'With over 18 years of experience, Gatewyn Consultants has successfully guided thousands of students to prestigious universities across the UK, Canada, Australia, and Europe. Our team of certified education consultants provides personalized guidance at every step of your study abroad journey.',
    highlights: [
      {
        icon: 'Award',
        number: '2000+',
        label: 'Students Placed',
        description: 'Successfully placed in top universities worldwide'
      },
      {
        icon: 'TrendingUp',
        number: '95%',
        label: 'Visa Success Rate',
        description: 'Industry-leading approval rates'
      },
      {
        icon: 'Globe',
        number: '100+',
        label: 'Partner Universities',
        description: 'Across UK, Canada, Australia & Europe'
      },
      {
        icon: 'Users',
        number: '18+',
        label: 'Years Experience',
        description: 'Trusted expertise in study abroad consulting'
      }
    ],
    features: [
      {
        icon: 'CheckCircle',
        title: 'Expert Guidance',
        description: 'Certified consultants with in-depth knowledge of international education systems'
      },
      {
        icon: 'Shield',
        title: 'Transparent Process',
        description: 'Clear communication and honest advice at every stage'
      },
      {
        icon: 'Clock',
        title: 'Timely Support',
        description: 'Quick responses and proactive application management'
      },
      {
        icon: 'Heart',
        title: 'Personalized Care',
        description: 'Tailored solutions based on your unique profile and goals'
      }
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    stats: {
      title: 'Our Track Record',
      items: [
        { value: '2000+', label: 'Students Counselled' },
        { value: '95%', label: 'Visa Success Rate' },
        { value: '100+', label: 'University Partners' },
        { value: '4.9/5', label: 'Client Rating' }
      ]
    }
  },
  services: {
    heading: 'Our Services',
    subheading: 'Comprehensive support for your study abroad journey',

    items: [
      {
        icon: 'GraduationCap',
        title: 'University Admissions',
        description: 'Expert guidance for securing admissions to top universities in UK, Canada, Australia, and Europe.',
        tag: 'Most Popular'
      },
      {
        icon: 'FileText',
        title: 'SOP & Document Prep',
        description: 'Professional Statement of Purpose writing and complete documentation assistance for visa applications.',
        tag: 'Expert Writers'
      },
      {
        icon: 'Plane',
        title: 'Student Visa Processing',
        description: 'Complete visa application support with high success rates for UK, Canada, Australia, and European countries.',
        tag: '95% Success Rate'
      },
      {
        icon: 'Users',
        title: 'Profile Assessment',
        description: 'Free comprehensive evaluation of your academic profile and personalized university recommendations.',
        tag: 'Free Service'
      },
      {
        icon: 'BookOpen',
        title: 'Course Selection',
        description: 'Personalized guidance to choose the right course and university matching your career goals.',
        tag: ''
      },
      {
        icon: 'Calendar',
        title: 'Pre-Departure Support',
        description: 'Complete assistance with accommodation, travel arrangements, and settling in your destination country.',
        tag: ''
      }
    ]
  },
  visaTypes: {
    heading: 'Understanding Visa Categories',
    subheading: 'Explore immigration pathways to your dream destination',
    badge: 'Education Hub',
    educationalGuide: {
      title: 'Educational Guide:',
      description: 'Immigration regulations change frequently. This guide is for general awareness. Always consult our certified consultants for advice tailored to your profile.'
    },
    items: [
      {
        country: 'Canada',
        flag: '🇨🇦',
        visas: ['Express Entry', 'Provincial Nominee', 'Family Sponsorship', 'Study Permit'],
        description: 'Canada offers one of the most transparent points-based immigration systems. Express Entry manages applications for skilled workers through a Comprehensive Ranking System (CRS) score.',
        processing: '6–8 months',
        difficulty: 'Moderate'
      },
      {
        country: 'United States',
        flag: '🇺🇸',
        visas: ['H-1B Visa', 'EB-5 Investor', 'F-1 Student', 'Green Card'],
        description: 'The US immigration system encompasses over 185 visa categories. The H-1B is among the most sought-after work visas for specialty occupations requiring specialized knowledge.',
        processing: '12–24 months',
        difficulty: 'Complex'
      },
      {
        country: 'Australia',
        flag: '🇦🇺',
        visas: ['Skilled Independent', 'Employer Sponsored', 'Student Visa', 'Partner Visa'],
        description: 'Australia\'s SkillSelect system uses an Expression of Interest (EOI) model. Points are allocated based on age, English proficiency, skilled employment, and qualifications.',
        processing: '8–12 months',
        difficulty: 'Moderate'
      },
      {
        country: 'United Kingdom',
        flag: '🇬🇧',
        visas: ['Skilled Worker', 'Graduate Route', 'Student Visa', 'Global Talent'],
        description: 'Post-Brexit UK immigration uses a points-based system. The Skilled Worker visa requires sponsorship from a licensed employer and meeting salary thresholds.',
        processing: '3–8 weeks',
        difficulty: 'Moderate'
      },
      {
        country: 'Germany',
        flag: '🇩🇪',
        visas: ['EU Blue Card', 'Job Seeker Visa', 'Skilled Worker', 'Student Visa'],
        description: 'Germany actively recruits skilled workers through its Skilled Immigration Act. The EU Blue Card provides a pathway for highly qualified non-EU professionals.',
        processing: '1–3 months',
        difficulty: 'Easy–Moderate'
      },
      {
        country: 'New Zealand',
        flag: '🇳🇿',
        visas: ['Skilled Migrant', 'Accredited Employer', 'Working Holiday', 'Investor Visa'],
        description: 'New Zealand\'s Skilled Migrant Category uses a points-based selection system. Candidates with a job offer, high qualifications, or work experience in shortage occupations score higher.',
        processing: '4–6 months',
        difficulty: 'Moderate'
      }
    ]
  },
  process: {
    heading: 'Your Immigration Journey',
    subheading: 'A structured roadmap from consultation to approval',
    steps: [
      {
        number: '01',
        title: 'Free Consultation',
        description: 'Discuss your profile, goals, and eligibility with our certified immigration consultants.'
      },
      {
        number: '02',
        title: 'Document Assessment',
        description: 'We review and prepare all necessary documentation to maximize your application strength.'
      },
      {
        number: '03',
        title: 'Application Filing',
        description: 'Our experts submit your application with precision, ensuring compliance with all requirements.'
      },
      {
        number: '04',
        title: 'Status Tracking',
        description: 'Real-time updates on your application status with proactive response to any queries.'
      },
      {
        number: '05',
        title: 'Visa Approval',
        description: 'Receive your visa with our full support for pre-departure planning and settlement guidance.'
      }
    ]
  },
  testimonials: {
    badge: 'Success Stories',
    heading: 'What Our Students Say',
    subheading: 'Real experiences from students who achieved their study abroad dreams',
    items: [
      {
        name: 'Priya Sharma',
        role: 'MBA Student',
        university: 'University of Toronto, Canada',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
        rating: 5,
        text: 'Gatewyn Consultants made my dream of studying in Canada a reality! Their team guided me through every step - from university selection to visa approval. The SOP they helped me craft was exceptional. Highly recommended!',
        country: '🇨🇦',
        course: 'MBA',
        year: '2024'
      },
      {
        name: 'Rahul Mehta',
        role: 'Computer Science Student',
        university: 'University of Manchester, UK',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
        rating: 5,
        text: 'The entire process was smooth and transparent. They helped me secure admission to my dream university in the UK with a scholarship! Their expertise in visa documentation is unmatched. Thank you team!',
        country: '🇬🇧',
        course: 'MSc Computer Science',
        year: '2023'
      },
      {
        name: 'Ananya Patel',
        role: 'Engineering Student',
        university: 'University of Melbourne, Australia',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
        rating: 5,
        text: 'I was confused about which country to choose for my masters. Gatewyn provided excellent counseling and helped me make the right decision. Now I\'m studying in Australia and couldn\'t be happier!',
        country: '🇦🇺',
        course: 'Masters in Engineering',
        year: '2024'
      },
      {
        name: 'Arjun Singh',
        role: 'Business Analytics Student',
        university: 'Technical University of Munich, Germany',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80',
        rating: 5,
        text: 'Professional, knowledgeable, and always available to answer questions. They helped me navigate the complex German visa process with ease. Got my visa in just 6 weeks! Excellent service.',
        country: '🇩🇪',
        course: 'MSc Business Analytics',
        year: '2023'
      },
      {
        name: 'Sneha Reddy',
        role: 'Healthcare Management Student',
        university: 'University of British Columbia, Canada',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80',
        rating: 5,
        text: 'From the first consultation to landing in Canada, Gatewyn was with me every step. Their post-visa support for accommodation and travel was incredibly helpful. Truly a one-stop solution!',
        country: '🇨🇦',
        course: 'Healthcare Management',
        year: '2024'
      },
      {
        name: 'Vikram Joshi',
        role: 'Data Science Student',
        university: 'University of Sydney, Australia',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80',
        rating: 5,
        text: 'Best decision I made was choosing Gatewyn Consultants. They secured me admission to a top-ranked university with a 50% scholarship. Their team is professional, responsive, and genuinely cares about students.',
        country: '🇦🇺',
        course: 'MSc Data Science',
        year: '2023'
      }
    ],
    stats: {
      totalReviews: '500+',
      averageRating: '4.9',
      successRate: '95%',
      countries: '15+'
    }
  },
  faq: {
    heading: 'Frequently Asked Questions',
    subheading: 'Answers to the most common immigration questions',
    items: [
      {
        question: 'How long does the immigration process take?',
        answer: 'Processing times vary significantly by country and visa type. Canada\'s Express Entry typically takes 6–8 months, while UK Skilled Worker visas can be processed in 3–8 weeks. We provide accurate timelines during your consultation.'
      },
      {
        question: 'What documents are required for a skilled worker visa?',
        answer: 'Common requirements include a valid passport, educational certificates, work experience letters, language test results (IELTS/TOEFL), medical examinations, and police clearance certificates. Specific requirements vary by destination country.'
      },
      {
        question: 'Can my family accompany me on a work visa?',
        answer: 'Most destination countries allow principal visa holders to bring their spouse/partner and dependent children. Family members typically receive open work permits or student permits depending on the country.'
      },
      {
        question: 'What is a points-based immigration system?',
        answer: 'A points-based system (used by Canada, Australia, New Zealand, and UK) assigns scores based on factors like age, education, work experience, language proficiency, and job offers. Candidates meeting threshold scores receive invitations to apply.'
      },
      {
        question: 'Do I need a job offer to immigrate?',
        answer: 'Not always. Several pathways like Canada\'s Federal Skilled Worker, Australia\'s Skilled Independent, and Germany\'s Job Seeker Visa do not require a pre-arranged job offer, though having one significantly strengthens your application.'
      },
      {
        question: 'What is the difference between PR and citizenship?',
        answer: 'Permanent Residency (PR) grants the right to live and work indefinitely in a country without being a citizen. Citizenship provides additional rights including voting, a passport, and consular protection. PR is typically a prerequisite for citizenship applications.'
      }
    ]
  },
  videoSection: {
    badge: 'Watch & Learn',
    heading: 'See Our Immigration Process In Action',
    description: [
      'From your first consultation to the moment you receive your visa approval — watch real client journeys and discover how our dedicated team of experts guides students through every step of their study abroad adventure.',
    ],
    highlights: [
      { number: '15K+', label: 'Successful Applications' },
      { number: '50+', label: 'Destination Countries' },
      { number: '18+', label: 'Years in Business' },
      { number: '98%', label: 'Client Satisfaction' }
    ],
    videoUrl: 'https://www.youtube.com/embed/E7wJTI-1dvQ',
    thumbnailImage: 'https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=700&q=80',
    videoCaption: {
      badge: 'Client Success Story',
      title: 'From India to Canada — Express Entry Journey'
    },
    galleryImages: [
      { img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&q=80', label: 'Flights & Travel' },
      { img: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&q=80', label: 'City Life' },
      { img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80', label: 'Our Team' },
      { img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80', label: 'Happy Clients' }
    ]
  },
  instagram: {
    badge: '📸 Follow Our Journey',
    heading: 'Student Life & Success Stories',
    subheading: 'Follow us on Instagram for daily updates, tips, and student experiences',
    username: '@gatewynconsultants',
    profileUrl: 'https://www.instagram.com/gatewynconsultants',
    posts: [
      {
        id: 1,
        image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80',
        caption: '🎓 Congratulations to our students who got admission to University of Toronto! Your hard work paid off! 🇨🇦',
        likes: 234,
        comments: 18,
        date: '2 days ago'
      },
      {
        id: 2,
        image: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=600&q=80',
        caption: '✈️ Pre-departure orientation session for our UK-bound students. Excited to see you all succeed! 🇬🇧',
        likes: 189,
        comments: 12,
        date: '4 days ago'
      },
      {
        id: 3,
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80',
        caption: '📚 Workshop on SOP writing - Learn how to craft a winning Statement of Purpose! Register now 👆',
        likes: 312,
        comments: 25,
        date: '5 days ago'
      },
      {
        id: 4,
        image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&q=80',
        caption: '🎉 Visa approved! Another success story from our Melbourne-bound student. Congratulations! 🇦🇺',
        likes: 267,
        comments: 21,
        date: '1 week ago'
      },
      {
        id: 5,
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80',
        caption: '💼 Career fair at our office - Meet representatives from top universities! Save your spot 📅',
        likes: 198,
        comments: 14,
        date: '1 week ago'
      },
      {
        id: 6,
        image: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=600&q=80',
        caption: '🌍 Study abroad destinations guide - Which country is right for you? Link in bio! 🔗',
        likes: 421,
        comments: 34,
        date: '2 weeks ago'
      }
    ],
    stats: {
      followers: '12.5K',
      posts: '850+',
      engagement: '8.2%'
    },
    cta: {
      text: 'Follow us for daily updates',
      buttonText: 'Follow on Instagram'
    }
  },
  contact: {
    heading: 'Get in Touch',
    subheading: 'Ready to start your study abroad journey? Contact us today.',
    email: 'info@gatewynconsultants.uk',
    consultantEmail: 'info@gatewynconsultants.uk', // Email where booking notifications will be sent
    phone: '+44 77 6900 3706',
    whatsapp: '+44 77 6900 3706',
    calendly: 'calendly.com/gatewynconsultants-info/15min',
    address: 'United Kingdom',
    hours: 'Mon–Sat: 9AM – 7PM GMT',
    helpBox: {
      emoji: '💬',
      title: 'Still have questions?',
      description: 'Our immigration experts are available Monday–Friday 9AM to 6PM.',
      buttonText: 'Contact Us'
    }
  },
  footer: {
    logo: {
      image: '/logo.jpg',
      text: 'Gatewyn',
      highlight: 'Consultants',
      icon: 'Globe'
    },
    tagline: 'Your trusted partner for study abroad success.',
    navigation: {
      title: 'Navigate',
      links: [
        { label: 'Services', href: '#services' },
        { label: 'Visa Guide', href: '#visa-types' },
        { label: 'Process', href: '#process' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Contact', href: '#contact' }
      ]
    },
    destinations: {
      title: 'Destinations',
      countries: [
        { name: '🇨🇦 Canada', href: '#visa-types' },
        { name: '🇺🇸 United States', href: '#visa-types' },
        { name: '🇦🇺 Australia', href: '#visa-types' },
        { name: '🇬🇧 United Kingdom', href: '#visa-types' },
        { name: '🇩🇪 Germany', href: '#visa-types' },
        { name: '🇳🇿 New Zealand', href: '#visa-types' }
      ]
    },
    contact: {
      title: 'Contact',
      items: [
        { icon: 'Mail', text: 'info@gatewynconsultants.uk', type: 'email' },
        { icon: 'Phone', text: '+44 77 6900 3706', type: 'phone' },
        { icon: 'MapPin', text: 'United Kingdom', type: 'address' }
      ]
    },
    social: {
      links: [
        { platform: 'Linkedin', icon: 'Linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
        { platform: 'Twitter', icon: 'Twitter', url: 'https://twitter.com', label: 'Twitter' },
        { platform: 'Facebook', icon: 'Facebook', url: 'https://facebook.com', label: 'Facebook' },
        { platform: 'Youtube', icon: 'Youtube', url: 'https://youtube.com', label: 'YouTube' }
      ]
    },
    copyright: '© 2024 Gatewyn Consultants (OPC) Pvt. Ltd. All rights reserved.',
    legalLinks: [
      { 
        label: 'Privacy Policy',
        sections: [
          { type: 'date', text: 'Last updated: April 2024' },
          { type: 'heading', text: '1. Information We Collect' },
          { type: 'paragraph', text: 'We collect information you provide directly to us, including name, email address, phone number, and any other information you choose to provide when using our immigration consultation services.' },
          { type: 'heading', text: '2. How We Use Your Information' },
          { type: 'paragraph', text: 'We use the information we collect to provide, maintain, and improve our services, to communicate with you about your immigration applications, and to comply with legal obligations.' },
          { type: 'heading', text: '3. Information Sharing' },
          { type: 'paragraph', text: 'We do not sell your personal information. We may share your information with immigration authorities as required for processing your applications, and with service providers who assist us in our operations.' },
          { type: 'heading', text: '4. Data Security' },
          { type: 'paragraph', text: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.' },
          { type: 'heading', text: '5. Your Rights' },
          { type: 'paragraph', text: 'You have the right to access, correct, or delete your personal information. Contact us at info@gatewynconsultants.uk to exercise these rights.' }
        ]
      },
      { 
        label: 'Terms of Service',
        sections: [
          { type: 'date', text: 'Last updated: April 2024' },
          { type: 'heading', text: '1. Acceptance of Terms' },
          { type: 'paragraph', text: 'By accessing and using Gatewyn Consultants\' services, you accept and agree to be bound by these Terms of Service.' },
          { type: 'heading', text: '2. Services Provided' },
          { type: 'paragraph', text: 'We provide immigration consultation services including visa application assistance, document preparation, and educational guidance. We do not guarantee visa approval as final decisions rest with immigration authorities.' },
          { type: 'heading', text: '3. Client Responsibilities' },
          { type: 'paragraph', text: 'Clients must provide accurate and complete information, respond to requests in a timely manner, and comply with all immigration laws and regulations.' },
          { type: 'heading', text: '4. Fees and Payment' },
          { type: 'paragraph', text: 'Service fees are outlined in your consultation agreement. Payment terms and refund policies are specified in our Refund Policy.' },
          { type: 'heading', text: '5. Limitation of Liability' },
          { type: 'paragraph', text: 'Gatewyn Consultants is not liable for visa refusals or delays caused by immigration authorities, incomplete client information, or factors beyond our control.' }
        ]
      },
      { 
        label: 'Refund Policy',
        sections: [
          { type: 'date', text: 'Last updated: April 2024' },
          { type: 'heading', text: '1. Refund Eligibility' },
          { type: 'paragraph', text: 'Refunds may be requested within 7 days of service commencement if no substantial work has been completed on your application.' },
          { type: 'heading', text: '2. Non-Refundable Services' },
          { type: 'paragraph', text: 'Government fees, third-party charges, and services already rendered are non-refundable. Document preparation fees are non-refundable once documents have been submitted.' },
          { type: 'heading', text: '3. Refund Process' },
          { type: 'paragraph', text: 'To request a refund, contact us at info@gatewynconsultants.uk with your service agreement details. Refunds are processed within 14 business days of approval.' },
          { type: 'heading', text: '4. Visa Refusal' },
          { type: 'paragraph', text: 'Visa refusals by immigration authorities do not automatically qualify for refunds, as our services involve professional consultation and application preparation regardless of outcome.' },
          { type: 'heading', text: '5. Cancellation' },
          { type: 'paragraph', text: 'Clients may cancel services at any time. Refunds for cancellations are calculated based on work completed and expenses incurred.' }
        ]
      },
      { 
        label: 'Cookie Policy',
        sections: [
          { type: 'date', text: 'Last updated: April 2024' },
          { type: 'heading', text: '1. What Are Cookies' },
          { type: 'paragraph', text: 'Cookies are small text files stored on your device when you visit our website. They help us provide a better user experience and analyze website traffic.' },
          { type: 'heading', text: '2. Types of Cookies We Use' },
          { type: 'paragraph', text: 'Essential Cookies: Required for website functionality and security.' },
          { type: 'paragraph', text: 'Analytics Cookies: Help us understand how visitors use our website to improve user experience.' },
          { type: 'paragraph', text: 'Preference Cookies: Remember your settings and preferences for future visits.' },
          { type: 'heading', text: '3. Managing Cookies' },
          { type: 'paragraph', text: 'You can control and delete cookies through your browser settings. Note that disabling cookies may affect website functionality.' },
          { type: 'heading', text: '4. Third-Party Cookies' },
          { type: 'paragraph', text: 'We may use third-party services like Google Analytics that set their own cookies. These are governed by their respective privacy policies.' }
        ]
      }
    ]
  },
  siteImages: {
    heroBackground: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1800&q=80',
    aboutImage: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&q=80',
    teamImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80'
  }
};

// Hook to get content from Firestore (with fallback to defaults)
export function useContent(section) {
  const [content] = useState(DEFAULT_CONTENT[section]);
  const [loading] = useState(false);

  return { content, loading };
}

export { DEFAULT_CONTENT };
