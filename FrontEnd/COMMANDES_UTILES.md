# 🛠️ Commandes Utiles - Memora Magnet

## 📦 Installation et Démarrage

### Installation des dépendances

```bash
npm install
```

### Démarrage en développement

```bash
npm start
```

Le site sera accessible sur http://localhost:3000

### Build pour production

```bash
npm run build
```

Les fichiers seront générés dans le dossier `build/`

### Test du build en local

```bash
npm run build
npx serve -s build
```

---

## 🔍 Outils d'Analyse et Tests

### 1. Analyser la taille du bundle

```bash
npm install -g source-map-explorer

npm run build

source-map-explorer 'build/static/js/*.js'
```

Cela ouvrira une visualisation interactive de la taille du bundle

### 2. Test Lighthouse (Performance, SEO, Accessibilité)

```bash
npm install -g lighthouse

npm run build
npx serve -s build

lighthouse http://localhost:3000 --view
```

### 3. Bundle Analyzer (Alternative)

```bash
npm install --save-dev webpack-bundle-analyzer

npm run build -- --stats

npx webpack-bundle-analyzer build/bundle-stats.json
```

### 4. Test des Web Vitals

Dans le navigateur, ouvrez la console et tapez :

```javascript
webVitals.getCLS(console.log);
webVitals.getFID(console.log);
webVitals.getLCP(console.log);
```

---

## 🧪 Tests SEO

### Valider les Structured Data

```bash
curl -X GET "https://memoraa.onrender.com" > test.html

open https://validator.schema.org/
```

### Test du Sitemap

```bash
curl https://memoraa.onrender.com/sitemap.xml
```

### Test du Robots.txt

```bash
curl https://memoraa.onrender.com/robots.txt
```

---

## 🖼️ Optimisation des Images

### Installer les outils

```bash
npm install -g sharp-cli
npm install -g imagemin-cli
```

### Convertir en WebP

```bash
sharp -i input.jpg -o output.webp
```

### Compresser toutes les images

```bash
cd src/assets

imagemin *.{jpg,png} --out-dir=optimized --plugin=mozjpeg --plugin=pngquant
```

### Redimensionner les images

```bash
sharp -i input.jpg -o output.jpg resize 1920 1080
```

---

## 🚀 Optimisations Avancées

### Précharger les ressources critiques

Dans `public/index.html`, ajoutez avant `</head>` :

```html
<link rel="preload" as="image" href="/logo512.png" />
<link
  rel="preload"
  as="font"
  href="/fonts/your-font.woff2"
  type="font/woff2"
  crossorigin
/>
```

### Activer la compression Gzip (si serveur Node.js)

```bash
npm install compression

const compression = require('compression');
app.use(compression());
```

---

## 📊 Monitoring et Analytics

### Google Analytics (à ajouter dans index.html)

```html
<!-- Google Analytics -->
<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "GA_MEASUREMENT_ID");
</script>
```

### Google Search Console

1. Aller sur https://search.google.com/search-console
2. Ajouter la propriété : https://memoraa.onrender.com
3. Vérifier la propriété (plusieurs méthodes disponibles)
4. Soumettre le sitemap : https://memoraa.onrender.com/sitemap.xml

---

## 🔧 Variables d'Environnement

### Créer .env.local (développement)

```env
REACT_APP_API_URL=http://localhost:4001
NODE_ENV=development
```

### Créer .env.production (production)

```env
REACT_APP_API_URL=https://memoraa.onrender.com
NODE_ENV=production
GENERATE_SOURCEMAP=false
```

---

## 🐛 Débogage

### Vérifier les erreurs console en production

```javascript
if (process.env.NODE_ENV === "development") {
  console.log("Debug info");
}
```

### Analyser les erreurs 404

Dans Chrome DevTools > Network, filtrer par "404"

### Tester le lazy loading

Dans Chrome DevTools > Network, activer "Disable cache" et recharger

---

## 📱 Tests Mobile

### Simuler un appareil mobile (Chrome DevTools)

1. F12 pour ouvrir DevTools
2. Ctrl+Shift+M pour le mode responsive
3. Sélectionner un appareil (iPhone, iPad, etc.)

### Test Mobile-Friendly Google

```bash
open https://search.google.com/test/mobile-friendly
```

Entrer : https://memoraa.onrender.com

---

## 🎨 Optimisation CSS

### Supprimer le CSS non utilisé

```bash
npm install -g purgecss

purgecss --css build/static/css/*.css --content build/index.html build/static/js/*.js --output build/static/css/
```

### Minifier le CSS (automatique avec CRA)

Déjà fait par Create React App lors du build

---

## 🔐 Sécurité

### Analyser les vulnérabilités

```bash
npm audit

npm audit fix
```

### Mettre à jour les dépendances

```bash
npm outdated

npm update
```

---

## 📈 Performance Tips

### 1. Vérifier la taille des images

```bash
du -sh src/assets/*
```

Les images > 500KB doivent être compressées

### 2. Analyser le temps de build

```bash
time npm run build
```

### 3. Cache busting (automatique avec CRA)

Les fichiers générés ont des hash pour le cache busting

---

## 🌐 Tests Cross-Browser

### BrowserStack (service payant)

https://www.browserstack.com/

### LambdaTest (essai gratuit)

https://www.lambdatest.com/

### Tester sur différents navigateurs localement

- Chrome
- Firefox
- Safari (Mac)
- Edge

---

## 📦 Déploiement

### Vercel (recommandé pour React)

```bash
npm install -g vercel

vercel
```

### Netlify

```bash
npm install -g netlify-cli

netlify deploy --prod
```

### Render (pour les apps fullstack)

1. Connecter le repo GitHub
2. Configurer le build command : `npm run build`
3. Configurer le publish directory : `build`

---

## 🔄 Git et Versioning

### Commit des changements

```bash
git add .
git commit -m "feat: Optimisation SEO et Performance"
git push
```

### Tag pour release

```bash
git tag -a v1.0.0 -m "Version 1.0.0 - Optimisations SEO et Performance"
git push --tags
```

---

## 📊 Scripts NPM Personnalisés

Vous pouvez ajouter ces scripts dans `package.json` :

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "analyze": "source-map-explorer 'build/static/js/*.js'",
    "lighthouse": "lighthouse http://localhost:3000 --view",
    "serve": "serve -s build",
    "build:serve": "npm run build && npm run serve",
    "audit": "npm audit && lighthouse http://localhost:3000"
  }
}
```

Usage :

```bash
npm run analyze

npm run lighthouse

npm run build:serve
```

---

## 🎯 Checklist Avant Déploiement

- [ ] `npm run build` sans erreurs
- [ ] Tests Lighthouse (scores > 90)
- [ ] Tests sur mobile
- [ ] Vérification des images (toutes optimisées)
- [ ] Vérification SEO (meta tags, sitemap, robots.txt)
- [ ] Test des liens (aucun 404)
- [ ] Vérification console (pas d'erreurs)
- [ ] Test cross-browser
- [ ] Variables d'environnement configurées
- [ ] Google Analytics configuré

---

## 📚 Ressources

### Documentation React

https://react.dev/

### Create React App

https://create-react-app.dev/

### Web.dev (Google)

https://web.dev/

### MDN Web Docs

https://developer.mozilla.org/

---

## 💡 Tips Supplémentaires

### Activer le Service Worker (PWA)

Dans `src/index.js`, changez :

```javascript
serviceWorkerRegistration.register();
```

### Précharger les routes importantes

```jsx
import { lazy } from "react";

const Accueil = lazy(() =>
  import(/* webpackPrefetch: true */ "./pages/Accueil")
);
```

### Utiliser React.memo pour éviter les re-renders

```jsx
import { memo } from "react";

const MyComponent = memo(function MyComponent(props) {
  return <div>{props.content}</div>;
});
```

---

**Besoin d'aide ?**

- `SEO_PERFORMANCE_GUIDE.md` - Guide complet
- `EXEMPLES_SEO.md` - Exemples de code
- `RESUME_MODIFICATIONS.md` - Résumé des modifications

---

**Dernière mise à jour :** 24 Octobre 2025
