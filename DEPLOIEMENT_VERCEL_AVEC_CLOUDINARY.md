# 🚀 Déploiement sur Vercel avec Cloudinary

## 🎯 Pourquoi Cloudinary pour Vercel ?

### ❌ Le problème avec Vercel :

- Vercel est **serverless** (sans serveur permanent)
- Le système de fichiers est **temporaire**
- Les fichiers uploadés dans `uploads/` **disparaissent** après quelques heures
- À chaque déploiement, le dossier `uploads/` est **réinitialisé**

### ✅ La solution : Cloudinary

- Service cloud de stockage d'images
- **Gratuit** jusqu'à 25 GB et 25k transformations/mois
- **CDN intégré** (images ultra-rapides partout dans le monde)
- **Persistant** (les images restent pour toujours)
- **Optimisation automatique** (compression, redimensionnement)

---

## 📋 Étape 1 : Créer un compte Cloudinary

### 1. Inscription

1. Allez sur https://cloudinary.com/users/register/free
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Récupérer vos identifiants

1. Connectez-vous à https://cloudinary.com/console
2. Sur le dashboard, vous verrez :
   ```
   Cloud name: xxxxx
   API Key: xxxxx
   API Secret: xxxxx
   ```
3. **Copiez ces 3 valeurs** (vous en aurez besoin)

---

## 📋 Étape 2 : Configuration locale

### 1. Mettre à jour votre fichier `.env`

Ajoutez ces lignes dans `backend/.env` :

```env
# Configuration existante
MONGODB_URL=mongodb+srv://...
PORT=4001
NODE_ENV=development

# NOUVEAU : Configuration Cloudinary
CLOUDINARY_CLOUD_NAME=votre_cloud_name_ici
CLOUDINARY_API_KEY=votre_api_key_ici
CLOUDINARY_API_SECRET=votre_api_secret_ici
```

**Remplacez** les valeurs par celles copiées depuis votre dashboard Cloudinary.

### 2. Tester en local (mode développement)

Le système est intelligent :

- **En développement** (NODE_ENV=development) → Utilise le dossier `uploads/` local
- **En production** (NODE_ENV=production ou sur Vercel) → Utilise Cloudinary

Pour tester Cloudinary en local, modifiez temporairement `.env` :

```env
NODE_ENV=production
```

Puis redémarrez le serveur :

```bash
cd backend
node server.js
```

Vous devriez voir :

```
📦 Mode PRODUCTION : Utilisation de Cloudinary
```

Créez une commande avec des images, puis vérifiez sur Cloudinary :

1. Allez sur https://cloudinary.com/console/media_library
2. Vous devriez voir vos images dans le dossier `memora_magnet/commandes/`

**N'oubliez pas de remettre NODE_ENV=development après le test !**

---

## 📋 Étape 3 : Déploiement sur Vercel

### 1. Variables d'environnement sur Vercel

1. Allez sur votre projet Vercel : https://vercel.com/dashboard
2. Sélectionnez votre projet backend
3. Allez dans **Settings** → **Environment Variables**
4. Ajoutez ces variables :

| Name                    | Value               | Environment                      |
| ----------------------- | ------------------- | -------------------------------- |
| `MONGODB_URL`           | `mongodb+srv://...` | Production, Preview, Development |
| `NODE_ENV`              | `production`        | Production                       |
| `CLOUDINARY_CLOUD_NAME` | Votre cloud name    | Production, Preview, Development |
| `CLOUDINARY_API_KEY`    | Votre API key       | Production, Preview, Development |
| `CLOUDINARY_API_SECRET` | Votre API secret    | Production, Preview, Development |

**IMPORTANT** : Cliquez sur "Save" après chaque variable !

### 2. Vérifier vercel.json

Votre `backend/vercel.json` devrait ressembler à ça :

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ],
  "env": {
    "NODE_ENV": "production"
  }
}
```

### 3. Déployer

```bash
# Depuis le dossier backend
git add .
git commit -m "feat: Ajout de Cloudinary pour le stockage des images"
git push

# Vercel va automatiquement déployer
```

Ou utilisez la commande Vercel CLI :

```bash
vercel --prod
```

---

## 📋 Étape 4 : Vérification

### 1. Test de fonctionnement

1. Allez sur votre application déployée
2. Créez une nouvelle commande avec des images
3. Vérifiez que les images s'affichent
4. Ouvrez la console du navigateur (F12), vous devriez voir :
   ```
   ✅ URL Cloudinary: https://res.cloudinary.com/...
   ```

### 2. Vérifier sur Cloudinary

1. Allez sur https://cloudinary.com/console/media_library
2. Ouvrez le dossier `memora_magnet/commandes/`
3. Vous devriez voir toutes vos images !

---

## 🎨 Avantages de Cloudinary

### ✅ Ce que vous gagnez :

1. **Persistance** : Les images ne disparaissent jamais
2. **Performance** : CDN mondial (images rapides partout)
3. **Optimisation** : Compression automatique (vos pages chargent plus vite)
4. **Transformation** : Les images sont redimensionnées à 2000x2000 max
5. **Sauvegarde** : Cloudinary garde vos images en sécurité
6. **Gratuit** : 25 GB gratuits (largement suffisant pour commencer)

### 📊 Limites du plan gratuit :

- **Stockage** : 25 GB
- **Bande passante** : 25 GB/mois
- **Transformations** : 25,000/mois
- **Vidéos** : 500 MB

Pour un projet de taille moyenne, c'est largement suffisant !

---

## 🔧 Comment ça fonctionne ?

### Mode développement (local) :

```
Client upload image
    ↓
Backend reçoit l'image
    ↓
Multer sauvegarde dans uploads/
    ↓
MongoDB stocke: "images-123456.jpg"
    ↓
Frontend affiche: http://localhost:4001/uploads/images-123456.jpg
```

### Mode production (Vercel) :

```
Client upload image
    ↓
Backend reçoit l'image
    ↓
Multer + Cloudinary uploadent sur Cloudinary
    ↓
MongoDB stocke: "https://res.cloudinary.com/.../image.jpg"
    ↓
Frontend affiche: https://res.cloudinary.com/.../image.jpg
```

---

## 🛠️ Dépannage

### Problème : Images ne s'uploadent pas sur Cloudinary

**Solution** :

1. Vérifiez que les variables d'environnement sont bien définies sur Vercel
2. Consultez les logs Vercel : https://vercel.com/dashboard → Votre projet → Deployments → Logs
3. Cherchez des erreurs contenant "cloudinary"

### Problème : "Invalid API key"

**Solution** :

1. Vérifiez que CLOUDINARY_API_KEY et CLOUDINARY_API_SECRET sont corrects
2. Pas d'espaces avant/après les valeurs
3. Redéployez après avoir modifié les variables

### Problème : Images s'affichent en local mais pas sur Vercel

**Solution** :

1. Vérifiez la console du navigateur (F12)
2. L'URL doit commencer par `https://res.cloudinary.com/`
3. Si l'URL est `http://localhost:4001/uploads/`, les variables d'environnement ne sont pas chargées

### Problème : "Cannot find module 'cloudinary'"

**Solution** :

```bash
cd backend
npm install cloudinary multer-storage-cloudinary
git add package.json package-lock.json
git commit -m "fix: Ajout des dépendances Cloudinary"
git push
```

---

## 📱 Migration des images existantes

Si vous avez déjà des images dans `uploads/` en local, vous pouvez les migrer vers Cloudinary :

```javascript
// Créer un script: backend/migrateToCloudinary.js
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function migrateImages() {
  const uploadsDir = path.join(__dirname, "uploads");
  const files = fs.readdirSync(uploadsDir);

  for (const file of files) {
    const filePath = path.join(uploadsDir, file);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: "memora_magnet/commandes",
      });
      console.log(`✅ ${file} → ${result.secure_url}`);
    } catch (error) {
      console.error(`❌ ${file}:`, error.message);
    }
  }
}

migrateImages();
```

Puis exécutez :

```bash
node migrateToCloudinary.js
```

---

## 📚 Ressources utiles

- **Dashboard Cloudinary** : https://cloudinary.com/console
- **Documentation** : https://cloudinary.com/documentation
- **Vercel Dashboard** : https://vercel.com/dashboard
- **Support Cloudinary** : https://support.cloudinary.com

---

## ✅ Checklist de déploiement

- [ ] Compte Cloudinary créé
- [ ] Identifiants Cloudinary récupérés
- [ ] Variables d'environnement ajoutées au fichier `.env` local
- [ ] Test en local avec NODE_ENV=production
- [ ] Variables d'environnement ajoutées sur Vercel
- [ ] Code déployé sur Vercel
- [ ] Test de création d'une commande en production
- [ ] Images visibles dans Cloudinary Media Library
- [ ] Images s'affichent dans l'application

---

**Vous êtes maintenant prêt pour la production ! 🎉**
