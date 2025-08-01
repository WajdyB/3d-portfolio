# 3D Portfolio - Interactive Three.js Portfolio

A stunning, interactive 3D portfolio website built with Three.js, GSAP, and Next.js. Features a rotating cube navigation system where each face represents a different portfolio section.

## 🌟 Features

### 3D Interactive Experience
- **Rotating 3D Cube**: Smooth, interactive cube with 6 faces representing portfolio sections
- **Orbit Controls**: Drag to rotate, zoom in/out functionality
- **Hover Effects**: Dynamic face highlighting and scaling on hover
- **Click Interactions**: Smooth animations when clicking cube faces

### Portfolio Sections
- **About**: Personal introduction and skills overview
- **Projects**: Showcase of development projects with links
- **Skills**: Interactive skill bars and technology stack
- **Contact**: Contact form and social media links
- **Blog**: Latest blog posts and articles
- **Resume**: Professional experience and downloadable CV

### Animations & Effects
- **GSAP Animations**: Smooth transitions and micro-interactions
- **Loading Screen**: Animated loading experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **WebGL Fallback**: Graceful degradation for unsupported browsers

### Technical Features
- **Performance Optimized**: Efficient rendering and memory management
- **Responsive**: Works seamlessly across all device sizes
- **Accessible**: Keyboard navigation and screen reader support
- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/3d-portfolio.git
   cd 3d-portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 14 with App Router
- **3D Graphics**: Three.js with WebGL
- **Animations**: GSAP (GreenSock Animation Platform)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📱 Browser Support

- **Chrome**: 51+
- **Firefox**: 53+
- **Safari**: 10+
- **Edge**: 79+

*Note: WebGL support is required for the 3D experience. A fallback page is provided for unsupported browsers.*

## 🎨 Customization

### Updating Portfolio Content

1. **Personal Information**: Edit the content in `components/portfolio-sections.tsx`
2. **Cube Colors**: Modify the `sections` array in `components/scene.tsx`
3. **Styling**: Update Tailwind classes or add custom CSS
4. **3D Scene**: Adjust lighting, camera, and cube properties in `components/scene.tsx`

### Adding New Sections

1. Add a new section to the `sections` array in `components/scene.tsx`
2. Create the corresponding content in `components/portfolio-sections.tsx`
3. Update the cube geometry if needed (currently supports 6 faces)

## 📊 Performance Optimization

- **Efficient Rendering**: Uses requestAnimationFrame for smooth 60fps
- **Memory Management**: Proper cleanup of Three.js resources
- **Responsive Images**: Optimized image loading and sizing
- **Code Splitting**: Next.js automatic code splitting
- **Bundle Optimization**: Tree shaking and minification

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file for any API keys or configuration:

\`\`\`env
NEXT_PUBLIC_SITE_URL=https://yourportfolio.com
NEXT_PUBLIC_CONTACT_EMAIL=your@email.com
\`\`\`

### Deployment

#### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically with each push

#### Other Platforms
The app can be deployed to any platform that supports Node.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** - Amazing 3D library
- **GSAP** - Powerful animation library
- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS framework

## 📞 Support

If you have any questions or need help with setup:

- 📧 Email: your@email.com
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/3d-portfolio/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/yourusername/3d-portfolio/discussions)

---

**Made with ❤️ and lots of ☕**

*This portfolio template is designed to showcase your skills in an interactive and engaging way. Feel free to customize it to match your personal brand and style!*
