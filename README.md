# Dionce AI Company Website

A modern, responsive company website for **Dionce AI** - an Agentic AI platform that empowers teams to design, test, and ship AI-driven workflows and applications within 1 hour.

## 🚀 Features

- **Modern Design**: Futuristic AI/tech-focused theme with glassmorphism effects
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Smooth Animations**: Scroll-based transitions and hover effects
- **Component-Based Architecture**: Clean, modular Angular components
- **SEO Optimized**: Semantic HTML and proper meta tags

## 📋 Sections

1. **Landing Page** - Hero section with company tagline and CTA buttons
2. **About Us** - Company mission, vision, timeline, and values
3. **Platform** - Complete Agent Lifecycle overview with 8 detailed subsections
4. **Use Cases** - Industry-specific applications and use cases
5. **Pricing** - Three-tier pricing plans (Free, Pro, Enterprise)
6. **Contact** - Demo request form and contact information

## 🛠️ Technology Stack

- **Angular 17+** - Latest Angular framework with standalone components
- **TypeScript** - Type-safe development
- **SCSS** - Advanced styling with variables and mixins
- **Phosphor Icons** - Modern icon library
- **Google Fonts** - Inter and Poppins typography

## 📦 Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Add Favicon** (Optional)
   - Place your favicon.ico file in the `src/` directory
   - Or update the favicon link in `src/index.html`

2. **Development Server**
   ```bash
   npm start
   ```
   Navigate to `http://localhost:4200/`

3. **Build for Production**
   ```bash
   npm run build
   ```
   The build artifacts will be stored in the `dist/` directory.

## 🎨 Design System

### Color Palette
- **Primary Dark**: `#0a0e27`
- **Primary Blue**: `#1a1f3a`
- **Accent Cyan**: `#00d9ff`
- **Accent Purple**: `#8b5cf6`
- **White**: `#ffffff`

### Typography
- **Primary Font**: Inter
- **Secondary Font**: Poppins

### Spacing
- Uses CSS custom properties for consistent spacing
- Responsive breakpoints at 768px and 968px

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── header/          # Navigation header
│   │   └── footer/          # Site footer
│   ├── pages/
│   │   ├── home/            # Landing page
│   │   ├── about/           # About us page
│   │   ├── platform/        # Platform overview
│   │   ├── use-cases/       # Use cases showcase
│   │   ├── pricing/         # Pricing plans
│   │   └── contact/         # Contact form
│   ├── app.component.ts     # Root component
│   └── app.routes.ts        # Routing configuration
├── styles.scss              # Global styles and variables
└── index.html               # Main HTML file
```

## 🔧 Configuration

### Environment Variables
Currently, the project uses placeholder data. To integrate with a backend:

1. Create `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8000/api'
   };
   ```

2. Update contact form service to use the API endpoint

### API Integration Points

The following components are ready for API integration:

- **Contact Form** (`contact.component.ts`): Currently uses a mock submission. Replace with actual API call.
- **Pricing Plans**: Can be made dynamic by fetching from an API
- **Use Cases**: Can be populated from a CMS or API

## 🎯 Key Features Implementation

### Agent Lifecycle Visualization
The platform page includes a circular diagram showing the complete agent lifecycle:
1. Design
2. Test
3. Deploy
4. Monitor
5. Optimize

### Responsive Navigation
- Desktop: Horizontal navigation bar
- Mobile: Hamburger menu with slide-in drawer

### Form Handling
- Contact form with validation
- Success/error states
- Ready for backend integration

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in `dist/dionce-ai-website/` can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📝 Customization

### Updating Content
- **Company Info**: Update `footer.component.ts` and `contact.component.ts`
- **Features**: Modify arrays in respective component TypeScript files
- **Pricing**: Update `pricing.component.ts` plans array
- **Use Cases**: Modify `use-cases.component.ts` industries array

### Styling
- Global variables in `src/styles.scss`
- Component-specific styles in each component's `.scss` file
- Color scheme can be changed via CSS custom properties

## 🔗 External Links

- **Website**: https://dionce.ai
- **LinkedIn**: https://www.linkedin.com/company/dionce/

## 📄 License

This project is proprietary software for Dionce AI.

## 👥 Support

For questions or support, contact:
- Email: contact@dionce.ai
- Website: https://dionce.ai

---

**Built with ❤️ for Dionce AI**

