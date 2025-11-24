# GitHub Pages Deployment Guide

## Quick Fix for Blank Screen Issue

The blank screen on GitHub Pages is typically caused by routing issues. Here's what has been fixed:

### Changes Made:

1. **Updated `vite.config.js`** - Added proper base path configuration
2. **Created `404.html`** - Handles SPA routing for GitHub Pages
3. **Updated `index.html`** - Added routing redirect script
4. **Created GitHub Actions workflow** - Automated deployment

## Deployment Steps

### Option 1: Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Copy 404.html to dist folder:**
   - On Linux/Mac: `cp 404.html dist/`
   - On Windows: `copy 404.html dist\`

3. **Deploy to GitHub Pages:**
   - Go to your repository settings
   - Navigate to Pages section
   - Set source to "Deploy from a branch"
   - Select branch: `main` or `master`
   - Select folder: `/dist`
   - Click Save

4. **Enable GitHub Pages:**
   - Make sure GitHub Pages is enabled in repository settings
   - The site should be available at `https://alexdolls.github.io/`

### Option 2: Automated Deployment (GitHub Actions)

The `.github/workflows/deploy.yml` file has been created for automated deployment.

1. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Actions:**
   - Go to repository Settings → Actions → General
   - Enable "Read and write permissions" for GitHub Actions
   - Enable "Allow GitHub Actions to create and approve pull requests"

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"

The workflow will automatically build and deploy on every push to main.

## Troubleshooting

### Still seeing blank screen?

1. **Check browser console** (F12) for errors
2. **Verify 404.html is in dist folder** after build
3. **Check GitHub Pages settings** - make sure it's pointing to `/dist` folder
4. **Clear browser cache** and hard refresh (Ctrl+Shift+R)
5. **Check network tab** - ensure assets are loading correctly

### Common Issues:

- **CORS errors**: SWAPI should work fine, but if you see CORS errors, check the API endpoint
- **404 errors**: Make sure `404.html` is copied to the dist folder
- **Asset loading errors**: Check that `base: '/'` is set in vite.config.js

## Testing Locally

Before deploying, test the production build locally:

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to verify everything works.

