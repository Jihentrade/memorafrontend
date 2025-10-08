# 🚀 GUIDE DE DÉMARRAGE - BACKEND

## ⚠️ PROBLÈME RÉSOLU

Le problème était que le serveur démarrait sur le **port 3000** mais le frontend essayait de se connecter au **port 4001**.

**C'est maintenant corrigé !** ✅

## 📋 ÉTAPES À SUIVRE (Dans l'ordre !)

### 1️⃣ Créer les codes promo

Ouvrez un terminal dans le dossier `backend` et exécutez :

```bash
npm run create-promo
```

Vous devriez voir :

```
✓ Connecté à MongoDB
✓ Code promo créé : PROMO10 - Réduction : 10%
✓ Code promo créé : PROMO20 - Réduction : 20%
✓ Code promo créé : PROMO50 - Réduction : 50%
```

### 2️⃣ Démarrer le serveur backend

**IMPORTANT : Arrêtez tout serveur backend qui tourne actuellement !**

- Trouvez le terminal où le serveur tourne
- Appuyez sur `Ctrl + C` pour l'arrêter

Ensuite, dans le dossier `backend`, exécutez :

```bash
npm start
```

**OU** (recommandé pour le développement) :

```bash
npm run dev
```

Vous devriez voir :

```
==================================================
🚀 Serveur backend démarré !
==================================================
📡 URL: http://localhost:4001
==================================================
```

**✅ Si vous voyez ce message, le serveur est prêt !**

### 3️⃣ Tester l'API (recommandé)

Dans un **NOUVEAU terminal** (laissez le serveur tourner), exécutez :

```bash
npm run test-promo
```

Vous devriez voir :

```
🧪 Test de vérification du code promo...

Test 1: Code valide (PROMO10)
✅ Succès: { success: true, reduction: 10, message: '...' }
```

**✅ Si ce test fonctionne, votre backend est 100% opérationnel !**

### 4️⃣ Tester dans le navigateur

1. Allez sur votre page panier : `http://localhost:3000/panier` (ou l'URL de votre panier)
2. Ouvrez la console du navigateur (F12)
3. Dans le champ "Code de réduction", entrez : **PROMO10**
4. Cliquez sur "Appliquer"

**Résultat attendu :**

Dans la console, vous verrez :

```
🎯 Début de la vérification du code promo: PROMO10
🔍 Vérification du code promo: PROMO10
✅ Réponse reçue: { success: true, reduction: 10, ... }
✅ Code promo valide! Réduction: 10
```

Dans l'interface :

- ✅ Message vert : "Code promo appliqué avec succès! Réduction de 10%"
- ✅ Ligne de réduction visible : "Réduction (10%) -4.50 Dt"
- ✅ Total recalculé automatiquement

## 🔧 Commandes disponibles

| Commande               | Description                          |
| ---------------------- | ------------------------------------ |
| `npm start`            | Démarre le serveur (port 4001)       |
| `npm run dev`          | Démarre le serveur avec plus de logs |
| `npm run create-promo` | Crée les codes promo de test         |
| `npm run test-promo`   | Teste l'API de vérification          |

## 🐛 En cas de problème

### Erreur : "Port déjà utilisé"

```
❌ Le port 4001 est déjà utilisé
```

**Solution :**

1. Trouvez le terminal où un serveur tourne déjà
2. Arrêtez-le avec `Ctrl + C`
3. Relancez `npm start`

### Erreur : "Cannot find module"

```
Error: Cannot find module './app'
```

**Solution :**

- Vous n'êtes pas dans le bon dossier
- Faites `cd backend` puis relancez

### Erreur : "MongoDB connection failed"

```
❌ MongoDB: Non configuré
```

**Solution :**

- Vérifiez que votre fichier `.env` contient `MONGODB_URL`
- Vérifiez que MongoDB est en ligne

### Toujours une erreur 404 ?

**Vérifiez ces points dans l'ordre :**

1. ✅ Le serveur backend tourne-t-il ?
   - Regardez si vous voyez "Serveur backend démarré !"
2. ✅ Sur quel port tourne-t-il ?

   - Vous devez voir "http://localhost:4001"
   - Si c'est un autre port, modifiez `FrontEnd/src/constants/api.js`

3. ✅ Le test API fonctionne-t-il ?

   - Exécutez `npm run test-promo`
   - Si ça fonctionne, le problème vient du frontend

4. ✅ Le frontend utilise-t-il le bon port ?
   - Ouvrez `FrontEnd/src/constants/api.js`
   - Vérifiez que `BASE_URL = "http://localhost:4001/"`

## 📞 Besoin d'aide ?

Si ça ne marche toujours pas, envoyez-moi :

1. Le résultat de `npm run test-promo`
2. Les logs du terminal backend (tout le texte affiché)
3. Les logs de la console du navigateur (F12)
4. Une capture d'écran de l'erreur
