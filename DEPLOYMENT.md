# Deployment Guide

## 🚀 Quick Deploy Options

### Vercel (Recommended)

1. **Install Vercel CLI**
\`\`\`bash
npm install -g vercel
\`\`\`

2. **Deploy**
\`\`\`bash
vercel
\`\`\`

3. **Production Deploy**
\`\`\`bash
vercel --prod
\`\`\`

**Vercel Dashboard**: Connect your GitHub repo for automatic deployments on push.

### Netlify

1. **Build the project**
\`\`\`bash
npm run build
\`\`\`

2. **Deploy via Netlify CLI**
\`\`\`bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
\`\`\`

3. **Or use Netlify Dashboard**: Drag and drop the `dist` folder.

### GitHub Pages

1. **Install gh-pages**
\`\`\`bash
npm install -D gh-pages
\`\`\`

2. **Add to package.json**
\`\`\`json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
\`\`\`

3. **Deploy**
\`\`\`bash
npm run deploy
\`\`\`

### Docker

1. **Create Dockerfile**
\`\`\`dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
\`\`\`

2. **Build and Run**
\`\`\`bash
docker build -t visionpad .
docker run -p 3000:3000 visionpad
\`\`\`

### AWS S3 + CloudFront

1. **Build**
\`\`\`bash
npm run build
\`\`\`

2. **Upload to S3**
\`\`\`bash
aws s3 sync dist/ s3://your-bucket-name --delete
\`\`\`

3. **Configure CloudFront** for CDN distribution

## 🔧 Environment Setup

1. Copy `.env.example` to `.env`
2. Fill in required values (optional features)
3. Environment variables are prefixed with `VITE_`

## 📊 Performance Tips

### Build Optimizations
- Vite automatically code-splits
- Tree-shaking removes unused code
- Assets are hashed for caching

### CDN Configuration
- Set long cache headers for static assets
- Use gzip/brotli compression
- Enable HTTP/2

### Monitoring
- Add error tracking (Sentry)
- Performance monitoring (Web Vitals)
- Analytics (privacy-friendly options)

## 🔐 Security Checklist

- [ ] Environment variables not committed
- [ ] HTTPS enabled
- [ ] CSP headers configured
- [ ] CORS properly set up
- [ ] Dependencies updated
- [ ] Security headers added

## 🌐 Custom Domain

### Vercel
\`\`\`bash
vercel domains add yourdomain.com
\`\`\`

### Netlify
Add domain in Netlify dashboard → Domain settings

## 📱 PWA Setup (Future)

Add to `vite.config.ts`:
\`\`\`typescript
import { VitePWA } from 'vite-plugin-pwa'

export default {
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'VisionPad',
        short_name: 'VisionPad',
        theme_color: '#3B82F6'
      }
    })
  ]
}
\`\`\`
