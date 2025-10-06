# 🚀 Guide de Déploiement - Memora

## Problème actuel

Votre frontend est déployé sur Vercel mais essaie de se connecter à un backend local (localhost:4001), ce qui est impossible.

## ✅ Solution : Déployer le backend

### Option 1 : Déploiement sur Vercel (Recommandé)

#### 1. Préparer le backend pour Vercel

```bash
cd backend
npm install
```

#### 2. Créer un compte Vercel

- Allez sur https://vercel.com
- Connectez votre compte GitHub

#### 3. Déployer le backend

1. **Import Project** sur Vercel
2. **Sélectionnez votre repo** GitHub
3. **Dossier** : `backend`
4. **Framework** : Node.js
5. **Build Command** : `npm install`
6. **Output Directory** : `.`
7. **Install Command** : `npm install`

#### 4. Variables d'environnement

Dans Vercel Dashboard → Settings → Environment Variables :

```
NODE_ENV=production
MONGODB_URI=votre_mongodb_uri
JWT_SECRET=votre_jwt_secret
```

#### 5. Récupérer l'URL

Après déploiement, Vercel vous donnera une URL comme :
`https://votre-backend-username.vercel.app`

### Option 2 : Déploiement sur Railway

#### 1. Créer un compte Railway

- Allez sur https://railway.app
- Connectez votre compte GitHub

#### 2. Déployer le backend

1. **New Project** → **Deploy from GitHub repo**
2. **Sélectionnez votre repo**
3. **Dossier** : `backend`
4. **Variables d'environnement** :
   ```
   NODE_ENV=production
   MONGODB_URI=votre_mongodb_uri
   JWT_SECRET=votre_jwt_secret
   ```

### Option 3 : Déploiement sur Render

#### 1. Créer un compte Render

- Allez sur https://render.com
- Connectez votre compte GitHub

#### 2. Déployer le backend

1. **New** → **Web Service**
2. **Connect GitHub** → Sélectionnez votre repo
3. **Dossier** : `backend`
4. **Build Command** : `npm install`
5. **Start Command** : `npm start`

## 🔧 Configuration du Frontend

### 1. Mettre à jour l'URL du backend

Dans `FrontEnd/src/constants/api.js` :

```javascript
export const BASE_URL = "https://votre-backend-url.vercel.app/";
```

### 2. Redéployer le frontend

```bash
cd FrontEnd
npm run build
# Puis redéployez sur Vercel
```

## 🧪 Test en local

### 1. Backend local

```bash
cd backend
npm start
# Vérifiez : http://localhost:4001
```

### 2. Frontend local

```bash
cd FrontEnd
npm start
# Vérifiez : http://localhost:3000
```

## 🔍 Vérifications

### 1. Backend déployé

- ✅ URL accessible : `https://votre-backend.vercel.app`
- ✅ CORS configuré pour Vercel
- ✅ Variables d'environnement définies

### 2. Frontend déployé

- ✅ URL mise à jour dans `api.js`
- ✅ Redéployé sur Vercel
- ✅ Pas d'erreurs CORS

## 🚨 Erreurs courantes

### CORS Error

- Vérifiez que l'URL Vercel est dans `allowedOrigins`
- Redéployez le backend après modification CORS

### Network Error

- Vérifiez que l'URL du backend est correcte
- Vérifiez que le backend est déployé et accessible

### Environment Variables

- Vérifiez que toutes les variables sont définies
- Redéployez après modification des variables

## 📞 Support

Si vous avez des problèmes :

1. Vérifiez les logs de déploiement
2. Testez l'URL du backend directement
3. Vérifiez la console du navigateur pour les erreurs
