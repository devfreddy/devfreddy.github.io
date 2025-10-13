# Troubleshooting Guide

> Common issues and solutions for DevFreddy Portfolio development

**Last Updated**: 2025-10-12

---

## Development Issues

### Vite Dev Server Won't Start

**Symptoms:**
- `npm run dev` fails
- Port 5173 already in use
- Module resolution errors

**Solutions:**

1. **Check if port is in use:**
   ```bash
   lsof -i :5173
   # Kill the process if needed
   kill -9 <PID>
   ```

2. **Clear Vite cache:**
   ```bash
   cd frontend-project
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Reinstall dependencies:**
   ```bash
   cd frontend-project
   rm -rf node_modules package-lock.json
   npm install
   ```

---

### Build Fails

**Symptoms:**
- `npm run build` throws errors
- Missing dependencies
- Import errors

**Solutions:**

1. **Check for missing dependencies:**
   ```bash
   npm install
   ```

2. **Verify import paths:**
   - Ensure all imports use correct relative paths
   - Check for circular dependencies
   - Verify file extensions (.jsx, .js)

3. **Clear build cache:**
   ```bash
   rm -rf dist
   npm run build
   ```

4. **Check for ESLint errors:**
   ```bash
   npm run lint
   ```

---

### Hot Module Replacement (HMR) Not Working

**Symptoms:**
- Changes don't reflect in browser
- Need to manually refresh
- Console shows HMR errors

**Solutions:**

1. **Check Vite config:**
   - Verify `@vitejs/plugin-react` is configured
   - Ensure HMR is not disabled

2. **Restart dev server:**
   ```bash
   # Ctrl+C to stop, then
   npm run dev
   ```

3. **Clear browser cache:**
   - Hard refresh (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)

---

## Deployment Issues

### GitHub Pages Shows 404

**Symptoms:**
- Site loads but routes show 404
- Refresh on any route breaks
- Direct navigation to routes fails

**Solutions:**

1. **Verify 404.html exists:**
   ```bash
   ls -la 404.html
   ```

2. **Check BrowserRouter configuration:**
   - Ensure using BrowserRouter (not HashRouter)
   - Verify 404.html redirects properly

3. **Rebuild and redeploy:**
   ```bash
   ./build-and-deploy.sh
   ```

---

### Deployment Script Fails

**Symptoms:**
- `./build-and-deploy.sh` errors
- Build succeeds but deploy fails
- Git push rejected

**Solutions:**

1. **Check script permissions:**
   ```bash
   chmod +x build-and-deploy.sh
   ```

2. **Verify Git status:**
   ```bash
   git status
   # Ensure no conflicts
   ```

3. **Manual deployment:**
   ```bash
   cd frontend-project
   npm run build
   cp -r dist/* ../
   cp dist/index.html ../404.html
   git add .
   git commit -m "Deploy: Update site"
   git push origin main
   ```

---

## Component Issues

### Chakra UI Components Not Styled

**Symptoms:**
- Components appear unstyled
- Theme not applied
- Dark mode not working

**Solutions:**

1. **Check Provider setup:**
   - Verify `<Provider>` wraps app in [main.jsx](frontend-project/src/main.jsx)
   - Ensure theme is imported and configured

2. **Verify Emotion dependencies:**
   ```bash
   npm list @emotion/react @emotion/styled
   ```

3. **Check for CSS conflicts:**
   - Review custom CSS that might override Chakra styles
   - Ensure no global styles breaking components

---

### Framer Motion Animations Not Working

**Symptoms:**
- No animations visible
- Elements appear static
- Console shows motion errors

**Solutions:**

1. **Check framer-motion version:**
   ```bash
   npm list framer-motion
   ```

2. **Verify motion components:**
   - Ensure using `motion.div`, not regular `div`
   - Check animation props are correct

3. **Check for CSS conflicts:**
   - `transform` or `opacity` in CSS can conflict
   - Use `!important` sparingly

4. **Respect reduced motion:**
   ```javascript
   // Check if user prefers reduced motion
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
   ```

---

### D3.js Particle Background Issues

**Symptoms:**
- Particles don't render
- Performance issues
- Canvas errors

**Solutions:**

1. **Check canvas creation:**
   - Verify canvas element exists in DOM
   - Ensure proper dimensions set

2. **Performance optimization:**
   ```javascript
   // Reduce particle count on mobile
   const particleCount = window.innerWidth < 768 ? 20 : 50
   ```

3. **Clean up on unmount:**
   - Ensure D3 animations are cancelled
   - Remove event listeners

---

## State Management Issues

### Zustand Store Not Updating

**Symptoms:**
- State changes don't reflect in UI
- Store mutations not working
- Components not re-rendering

**Solutions:**

1. **Check store usage:**
   ```javascript
   // Correct way
   const { setState } = useStore()
   setState({ key: value })

   // Incorrect - direct mutation
   useStore.getState().key = value // ❌ Don't do this
   ```

2. **Verify selectors:**
   ```javascript
   // Proper selector usage
   const value = useStore((state) => state.value)
   ```

3. **Check for shallow comparison issues:**
   - Zustand uses shallow comparison
   - Nested objects may need special handling

---

### localStorage Issues with Banner State

**Symptoms:**
- Banner state not persisting
- Cross-tab sync not working
- State resets unexpectedly

**Solutions:**

1. **Check localStorage availability:**
   ```javascript
   if (typeof window !== 'undefined' && window.localStorage) {
     // Safe to use localStorage
   }
   ```

2. **Verify storage events:**
   - Ensure event listeners are set up correctly
   - Check browser compatibility

3. **Clear localStorage:**
   ```javascript
   localStorage.removeItem('bannerDismissed')
   ```

---

## Performance Issues

### Slow Initial Load

**Symptoms:**
- Long time to first paint
- Slow Time to Interactive
- Poor Lighthouse scores

**Solutions:**

1. **Optimize bundle size:**
   ```bash
   npm run build
   # Check dist/ size
   du -sh dist/
   ```

2. **Implement code splitting:**
   - Use React.lazy for route-based splitting
   - Lazy load heavy components

3. **Optimize images:**
   - Use WebP format
   - Implement lazy loading
   - Use appropriate sizes

---

### Particle Background Causing Lag

**Symptoms:**
- Janky animations
- High CPU usage
- Poor mobile performance

**Solutions:**

1. **Reduce particle count on mobile:**
   ```javascript
   const isMobile = window.innerWidth < 768
   const particleCount = isMobile ? 15 : 50
   ```

2. **Use requestAnimationFrame properly:**
   ```javascript
   const animate = () => {
     // Animation logic
     requestAnimationFrame(animate)
   }
   ```

3. **Pause when not visible:**
   - Use Intersection Observer
   - Pause animations when page hidden

---

## Routing Issues

### React Router Routes Not Working

**Symptoms:**
- Navigation doesn't change page
- Routes return 404
- Links broken

**Solutions:**

1. **Check Router setup:**
   - Verify BrowserRouter is used
   - Ensure Routes and Route components properly configured

2. **Verify route paths:**
   ```javascript
   // Correct
   <Route path="/cocktails" element={<CocktailsPage />} />

   // Incorrect
   <Route path="cocktails" element={<CocktailsPage />} /> // Missing leading /
   ```

3. **Check for conflicting routes:**
   - Order matters - specific routes before catch-all
   - Use `*` for 404 catch-all

---

## Build & Dependency Issues

### NPM Install Fails

**Symptoms:**
- Dependency conflicts
- Peer dependency warnings
- Installation errors

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Use legacy peer deps (if needed):**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Check Node version:**
   ```bash
   node --version
   # Should be 24.4.1 (from Volta config)
   ```

4. **Remove lock file and retry:**
   ```bash
   rm package-lock.json
   npm install
   ```

---

## Browser-Specific Issues

### Safari Rendering Issues

**Symptoms:**
- Layout breaks in Safari
- Animations don't work
- Features missing

**Solutions:**

1. **Check for Safari-specific CSS issues:**
   - Use `-webkit-` prefixes where needed
   - Test flexbox/grid compatibility

2. **Verify JavaScript features:**
   - Check for Safari support of modern features
   - Add polyfills if necessary

3. **Test in Safari Technology Preview:**
   - Helps identify upcoming changes

---

### Mobile Browser Issues

**Symptoms:**
- Touch events don't work
- Viewport issues
- Performance problems

**Solutions:**

1. **Add viewport meta tag:**
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   ```

2. **Test on real devices:**
   - iOS Safari
   - Chrome Mobile
   - Samsung Internet

3. **Optimize for mobile:**
   - Reduce particle count
   - Simplify animations
   - Lazy load images

---

## Getting Help

### Debugging Steps

1. **Check console for errors:**
   - Open DevTools (F12)
   - Look for red errors
   - Check network tab for failed requests

2. **Use React DevTools:**
   - Install React DevTools extension
   - Inspect component tree
   - Check props and state

3. **Check git history:**
   ```bash
   git log --oneline -20
   git diff HEAD~1
   ```

4. **Review recent session notes:**
   - Check `docs/sessions/` for recent changes
   - Look for similar issues solved before

### Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Chakra UI Documentation](https://chakra-ui.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [D3.js Documentation](https://d3js.org/)

### Contact

If you encounter an issue not listed here:
1. Document the problem in this file
2. Include symptoms, solutions tried, and resolution
3. Update the feature documentation if feature-specific

---

## Common Patterns

### Debugging React Components

```javascript
// Add debug logging
useEffect(() => {
  console.log('Component mounted', { props, state })
  return () => console.log('Component unmounted')
}, [])
```

### Checking Build Output

```bash
# Build and check output
npm run build
ls -lah dist/

# Check bundle size
du -sh dist/assets/*
```

### Verifying Deployment

```bash
# Check what's deployed
git log origin/main -1 --oneline

# Verify files in root
ls -la *.html *.js *.css
```

---

*Keep this document updated as you encounter and solve new issues!*
