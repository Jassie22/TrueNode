# True Node Website

A modern, responsive website for True Node, a tech development company specializing in web solutions, app development, AI integration, and data analysis for small businesses.

## Project Structure

```
true-node-website/
├── src/                    # Source files
│   ├── app/                # Next.js app router pages
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page component
│   ├── components/         # React components
│   │   ├── Header.tsx      # Site navigation header
│   │   ├── HeroSection.tsx # Landing hero section
│   │   ├── AboutSection.tsx # About section
│   │   ├── ServicesSection.tsx # Services section
│   │   ├── ContactSection.tsx  # Contact form section
│   │   └── Footer.tsx      # Site footer
│   ├── styles/             # CSS styles
│   │   └── globals.css     # Global styles and Tailwind directives
│   └── types/              # TypeScript type definitions
│       └── react-app.d.ts  # Custom type declarations
├── public/                 # Static assets
│   └── images/             # Image files
│       ├── website-icon.svg # Icons for services
│       ├── app-icon.svg
│       ├── ai-icon.svg
│       ├── data-icon.svg
│       ├── facebook.svg    # Social media icons
│       ├── twitter.svg
│       ├── linkedin.svg
│       ├── instagram.svg
│       └── hero-bg.jpg     # Hero background image
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── postcss.config.js       # PostCSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── README.md               # Project documentation
```

## Features

- Responsive design for all device sizes (mobile, tablet, desktop)
- Modern UI with clean aesthetics using Tailwind CSS
- GSAP animations for enhanced user experience
- Smooth scrolling navigation
- Mobile-friendly hamburger menu
- Contact form with validation
- SEO optimized
- Fast loading performance

## Technology Stack

- **Next.js**: React framework for server-rendered applications
- **TypeScript**: Typed JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **GSAP**: Animation library for advanced animations
- **React**: JavaScript library for building user interfaces

## Getting Started

1. **Prerequisites**
   - Node.js (v14 or later)
   - npm or yarn

2. **Installation**
   ```bash
   # Clone the repository
   git clone https://github.com/Jassie222/TrueNodeWeb
   
   # Navigate to the project directory
   cd true-node-website
   
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
   
   The site will be available at [http://localhost:3000](http://localhost:3000)

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

## Customization

### Content
- Update text content in the components
- Replace placeholder images with your own
- Update the contact form submission logic

### Styling
- Colors can be modified in `tailwind.config.js`
- Global styles can be adjusted in `src/styles/globals.css`
- Component-specific styles are within each component file

## Notes

- You need to add an actual hero background image file (`hero-bg.jpg`) to the public/images directory
- Social media links in the footer need to be updated with your actual profiles

---

© 2024 True Node. All Rights Reserved. 