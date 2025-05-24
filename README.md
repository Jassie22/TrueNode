# True Node Website

A modern, responsive website for True Node, a tech development company specializing in web solutions, app development, AI integration, and data analysis for small businesses.

## Project Structure

```
TrueNode/
├── src/                    # Source files
│   ├── app/                # Next.js app router pages
│   │   ├── layout.tsx      # Root layout component with Google Analytics
│   │   ├── page.tsx        # Home page component
│   │   ├── globals.css     # Global styles and Tailwind directives
│   │   ├── error.tsx       # Error boundary component
│   │   ├── not-found.tsx   # 404 page component
│   │   ├── privacy-policy/ # Privacy policy page
│   │   └── api/            # API routes
│   ├── components/         # React components
│   │   ├── Navbar.tsx      # Site navigation header with mobile menu
│   │   ├── HeroSection.tsx # Landing hero section with animations
│   │   ├── HeroStats.tsx   # Animated statistics component
│   │   ├── ServicesSection.tsx # Services showcase section
│   │   ├── ServiceCard.tsx # Individual service card component
│   │   ├── GoogleReadySection.tsx # SEO checklist section
│   │   ├── TechnologyReel.tsx # Animated technology showcase
│   │   ├── PortfolioSection.tsx # Portfolio and case studies
│   │   ├── TeamSection.tsx # Team members showcase
│   │   ├── ContactSection.tsx # Contact form with validation
│   │   ├── Footer.tsx      # Site footer with social links
│   │   ├── ChatbotPopup.tsx # AI-powered chatbot interface
│   │   ├── MemoryGame.tsx  # Interactive memory game
│   │   ├── CalendlyWidget.tsx # Meeting booking widget
│   │   └── GoogleAnalytics.tsx # Google Analytics integration
│   ├── styles/             # Additional CSS styles
│   │   ├── globals.css     # Additional global styles
│   │   ├── enhanced.css    # Enhanced component styles
│   │   └── COLOR_PALETTE.md # Color scheme documentation
│   ├── lib/                # Utility libraries
│   └── types/              # TypeScript type definitions
├── public/                 # Static assets
│   ├── images/             # Image files
│   │   ├── icons/          # Various service and social icons
│   │   ├── team/           # Team member photos
│   │   ├── final-mockups/  # Portfolio mockup images
│   │   ├── website-icon.svg # Service icons
│   │   ├── app-icon.svg
│   │   ├── ai-icon.svg
│   │   ├── data-icon.svg
│   │   ├── audit-icon.svg
│   │   ├── ecommerce-icon.svg
│   │   ├── branding-icon.svg
│   │   ├── support-icon.svg
│   │   ├── facebook.svg    # Social media icons
│   │   ├── twitter.svg
│   │   ├── linkedin.svg
│   │   └── instagram.svg
│   ├── icons/              # Favicon and app icons
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   └── apple-icon.svg
│   ├── sounds/             # Audio files for interactions
│   ├── sitemap.xml         # SEO sitemap
│   ├── robots.txt          # Search engine directives
│   ├── site.webmanifest    # PWA manifest
│   └── contact.php         # Contact form backend
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Features

- **Responsive Design**: Optimized for all device sizes (mobile, tablet, desktop)
- **Modern UI/UX**: Clean aesthetics with advanced animations using GSAP and Framer Motion
- **Interactive Elements**: 
  - AI-powered chatbot with conversation history
  - Interactive memory game
  - Animated technology showcase
  - Dynamic portfolio section
- **SEO Optimized**: 96-point SEO checklist section, sitemap, robots.txt
- **Performance Focused**: Fast loading with optimized images and animations
- **Contact Integration**: 
  - Advanced contact form with validation
  - Calendly booking widget
  - PHP backend for form processing
- **Team Showcase**: Dynamic team member profiles
- **3D Elements**: Three.js integration for enhanced visuals
- **Analytics**: Google Analytics integration
- **PWA Ready**: Service worker and manifest for app-like experience

## Technology Stack

- **Next.js 14**: React framework with app router
- **TypeScript**: Typed JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework with custom configuration
- **GSAP**: Advanced animation library for complex animations
- **Framer Motion**: React animation library for smooth interactions
- **Three.js**: 3D graphics library for enhanced visuals
- **React**: JavaScript library for building user interfaces
- **Heroicons**: Beautiful hand-crafted SVG icons
- **React Icons**: Popular icon library integration
- **Canvas Confetti**: Celebration animations
- **React Intersection Observer**: Scroll-based animations

## Getting Started

1. **Prerequisites**
   - Node.js (v18 or later)
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/Jassie222/TrueNodeWeb
   
   # Navigate to the project directory
   cd TrueNode
   
   # Install dependencies
   npm install
   # or
   yarn install
   ```

3. **Development**
   ```bash
   # Start the development server
   npm run dev
   # or
   yarn dev
   ```
   
   The site will be available at [http://localhost:3308](http://localhost:3308)

4. **Building for Production**
   ```bash
   # Create a production build
   npm run build
   # or
   yarn build
   
   # Start the production server
   npm run start
   # or
   yarn start
   ```

## Key Components

### Interactive Features
- **ChatbotPopup**: AI-powered customer service chatbot
- **MemoryGame**: Interactive game for user engagement
- **CalendlyWidget**: Integrated meeting booking system

### Content Sections
- **HeroSection**: Dynamic landing with animations and statistics
- **ServicesSection**: Comprehensive service showcase
- **GoogleReadySection**: SEO checklist with animated elements
- **TechnologyReel**: Animated technology stack display
- **PortfolioSection**: Case studies and portfolio showcase
- **TeamSection**: Team member profiles and expertise

### Navigation & Layout
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Contact information and social links
- **ContactSection**: Advanced form with validation and backend

## Customization

### Content
- Update text content in individual components
- Replace team photos in `public/images/team/`
- Update portfolio mockups in `public/images/final-mockups/`
- Modify service offerings in `ServicesSection.tsx`

### Styling
- Colors and themes in `tailwind.config.js`
- Global styles in `src/app/globals.css` and `src/styles/globals.css`
- Color palette documentation in `src/styles/COLOR_PALETTE.md`

### Features
- Chatbot responses in `ChatbotPopup.tsx`
- Contact form backend in `public/contact.php`
- Google Analytics tracking ID in `GoogleAnalytics.tsx`

## Development Notes

- Development server runs on port 3308 (configured in package.json)
- Contact form requires PHP backend configuration
- Google Analytics integration requires tracking ID setup
- Calendly widget requires account configuration

---

© 2024 True Node. All Rights Reserved. 