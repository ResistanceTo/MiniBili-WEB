<div align="center">
  <img src="public/favicon-512.svg" alt="Mobile Landing Logo" width="120" height="120" style="border-radius: 24px;">

  <h1 style="margin-top: 24px;">🚀 Mobile App Landing Page</h1>

  <p style="font-size: 18px; color: #666; margin-bottom: 24px;">
    <strong>The ultimate modern landing page template for mobile applications</strong>
  </p>

  <p style="margin-bottom: 32px;">
    Built with cutting-edge technologies: <strong>Astro</strong>, <strong>React</strong>, <strong>TypeScript</strong> & <strong>Tailwind CSS</strong>
  </p>

  <p>
    <a href="https://landing.bohd4n.dev">
      <img src="https://img.shields.io/badge/demo-live-blue" alt="Live Demo">
    </a>
    <a href="https://github.com/bohd4nx/mobile-landing">
      <img src="https://img.shields.io/github/stars/bohd4nx/mobile-landing" alt="GitHub Stars">
    </a>
    <a href="https://github.com/bohd4nx/mobile-landing/network/members">
      <img src="https://img.shields.io/github/forks/bohd4nx/mobile-landing" alt="GitHub Forks">
    </a>
    <a href="https://github.com/bohd4nx/mobile-landing/issues">
      <img src="https://img.shields.io/github/issues/bohd4nx/mobile-landing" alt="GitHub Issues">
    </a>
    <a href="https://github.com/bohd4nx/mobile-landing/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/bohd4nx/mobile-landing" alt="License">
    </a>
  </p>
</div>

---

## Features

<table>
  <tr>
    <td>📱 <strong>Responsive Design</strong></td>
    <td>Perfectly optimized for all devices and screen sizes</td>
  </tr>
  <tr>
    <td>🖼️ <strong>Device Preview</strong></td>
    <td>Interactive toggle between iPhone and iPad screenshots with lightbox</td>
  </tr>
  <tr>
    <td>🎨 <strong>Modern UI/UX</strong></td>
    <td>Clean design with smooth Framer Motion animations</td>
  </tr>
  <tr>
    <td>🌗 <strong>Smart Theme System</strong></td>
    <td>Light/Dark/System theme with persistent storage</td>
  </tr>
  <tr>
    <td>📝 <strong>Markdown Support</strong></td>
    <td>Easy editing of Privacy Policy and Terms of Service</td>
  </tr>
  <tr>
    <td>🔍 <strong>SEO Optimized</strong></td>
    <td>Built-in meta tags and semantic HTML structure</td>
  </tr>
  <tr>
    <td>⚡ <strong>Lightning Fast</strong></td>
    <td>Astro's island architecture for optimal performance</td>
  </tr>
  <tr>
    <td>♿ <strong>Accessible</strong></td>
    <td>WCAG compliant with proper ARIA labels and keyboard navigation</td>
  </tr>
  <tr>
    <td>📊 <strong>User Reviews</strong></td>
    <td>Beautiful review cards with star ratings</td>
  </tr>
  <tr>
    <td>🔧 <strong>TypeScript</strong></td>
    <td>Full TypeScript support for better development experience</td>
  </tr>
</table>

## 🚀 Quick Start Guide

### 📋 Prerequisites

Make sure you have these installed:

- **Node.js** 20+
- **npm**, **yarn**, or **pnpm**

### ⚡ Installation

```bash
# Clone the repository
git clone https://github.com/bohd4nx/mobile-landing.git
cd mobile-landing

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

> 🎉 **That's it!** Your landing page will be running at `http://localhost:4321`

---

## 🎨 Customization Made Easy

### 1️⃣ **App Information** (`src/config/appInfo.ts`)

```typescript
export const appInfo = {
    title: "Your Amazing App", // Your app name
    description: "Transform your daily workflow with our revolutionary app", // Compelling description
    logo: {
        src: "favicon-512.svg" // Your app icon (SVG recommended)
    },
    storeLinks: {
        apple: "https://apps.apple.com/app/your-app", // App Store link
        google: "https://play.google.com/store/apps/details?id=your.app" // Google Play link
    }
};
```

### 2️⃣ **Features Section** (`src/config/features.ts`)

```typescript
import {FiStar, FiZap, FiShield, FiSmartphone} from "react-icons/fi";

export const features = [
    {
        title: "🎯 Smart Analytics",
        description: "Get detailed insights into your app usage with beautiful, actionable analytics",
        icon: FiStar
    },
    {
        title: "⚡ Lightning Speed",
        description: "Experience blazing-fast performance optimized for modern devices",
        icon: FiZap
    },
    {
        title: "🔒 Bank-Level Security",
        description: "Your data is protected with industry-leading security measures",
        icon: FiShield
    },
    {
        title: "📱 Cross-Platform",
        description: "Works seamlessly across iOS, Android, and web platforms",
        icon: FiSmartphone
    }
];
```

### 3️⃣ **Screenshots Setup**

#### 📸 **Adding Your Screenshots**

1. **iPhone Screenshots** → `public/screenshots/iphone/`
    - Aspect ratio: `9:16`
    - Recommended width: `260px`
    - Format: PNG or WEBP

2. **iPad Screenshots** → `public/screenshots/ipad/`
    - Aspect ratio: `4:3`
    - Recommended width: `360px`
    - Format: PNG or WEBP

#### ⚙️ **Update Configuration** (`src/config/screenshots.ts`)

```typescript
export const screenshots = {
    iphone: [
        "screenshots/iphone/home.png",
        "screenshots/iphone/features.png",
        "screenshots/iphone/profile.png"
    ],
    ipad: [
        "screenshots/ipad/dashboard.png",
        "screenshots/ipad/analytics.png",
        "screenshots/ipad/settings.png"
    ]
};
```

### 4️⃣ **User Reviews** (`src/config/reviews.ts`)

```typescript
export const reviews = [
    {
        author: "Sarah Johnson",
        rating: 5,
        text: "This app completely transformed how I manage my daily tasks. The interface is intuitive and the performance is outstanding! 🚀",
        avatar: "avatars/sarah.jpg" // Optional
    },
    {
        author: "Mike Chen",
        rating: 5,
        text: "I've tried dozens of similar apps, but this one stands out with its unique features and reliability. Highly recommended! ⭐"
    }
];
```

### 5️⃣ **FAQ Section** (`src/config/faq.ts`)

```typescript
export const faq = [
    {
        question: "Is the app free to use?",
        answer: "Yes! The app is completely free with optional premium features for advanced users."
    },
    {
        question: "Which devices are supported?",
        answer: "Our app supports iOS 14+, Android 8+, and modern web browsers."
    },
    {
        question: "How do I get customer support?",
        answer: "You can reach our support team 24/7 through the in-app chat or email us at support@yourapp.com"
    }
];
```

### 6️⃣ **Social Media Links** (`src/config/socialLinks.ts`)

```typescript
import {RiInstagramFill, RiTwitterXFill, RiTelegram2Fill, RiYoutubeFill} from "react-icons/ri";

export const socialLinks = [
    {
        url: "https://instagram.com/yourapp",
        icon: RiInstagramFill,
        label: "Follow us on Instagram"
    },
    {
        url: "https://twitter.com/yourapp",
        icon: RiTwitterXFill,
        label: "Follow us on Twitter"
    },
    {
        url: "https://t.me/yourapp",
        icon: RiTelegram2Fill,
        label: "Join our Telegram"
    },
    {
        url: "https://youtube.com/@yourapp",
        icon: RiYoutubeFill,
        label: "Subscribe to our YouTube"
    }
];
```

---

## 📄 Content Pages

### 🔒 **Privacy Policy & Terms**

Edit these Markdown files to customize your legal pages:

- **Privacy Policy**: `src/pages/content/privacy.md`
- **Terms of Service**: `src/pages/content/terms.md`

---

## 🌐 Deployment Options

### 🟡 **Vercel** (Recommended)

```bash
npm install -g vercel
vercel --prod
```

### 🟢 **GitHub Pages**

```bash
# Update astro.config.mjs
export default defineConfig({
  site: 'https://username.github.io',
  base: '/repository-name',
});
```

### 🔵 **Custom Server**

```bash
npm run build
# Upload dist/ folder to your server
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by <a href="https://t.me/bohd4nx">Bohdan</a></p>

  <p>
    <sub>If you found this project helpful, please consider giving it a ⭐</sub>
  </p>

  <p>
    <a href="https://github.com/bohd4nx/mobile-landing/issues">Report Bug</a>
    ·
    <a href="https://github.com/bohd4nx/mobile-landing/issues">Request Feature</a>
    ·
    <a href="https://landing.bohd4n.dev">View Demo</a>
  </p>
</div>