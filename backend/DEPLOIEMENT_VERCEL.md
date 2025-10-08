# 🚀 GUIDE DE DÉPLOIEMENT VERCEL - CODE PROMO

## ⚠️ PROBLÈME : Le code promo ne fonctionne pas sur Vercel

Le code promo fonctionne en local mais pas en production sur Vercel.

---

## ✅ SOLUTION EN 4 ÉTAPES

### ÉTAPE 1 : Vérifier les variables d'environnement sur Vercel

1. **Allez sur** https://vercel.com/
2. **Connectez-vous** à votre compte
3. **Sélectionnez votre projet** backend
4. **Allez dans** : Settings → Environment Variables
5. **Vérifiez que ces variables existent** :

```
MONGODB_URL = mongodb+srv://Trad2307:Trad2307@cluster0.jaovzp2.mongodb.net/Memora
MONGO_URL = mongodb+srv://Trad2307:Trad2307@cluster0.jaovzp2.mongodb.net/Memora
PORT = 4001
NODE_ENV = production
```

⚠️ **IMPORTANT** : Si ces variables n'existent pas, ajoutez-les !

---

### ÉTAPE 2 : Redéployer le backend sur Vercel

Le backend sur Vercel utilise l'ancien code (sans la route verifyPromoCode).

**Option A : Via Git (RECOMMANDÉ)**

1. **Commitez les changements** :

   ```bash
   git add .
   git commit -m "Ajout fonctionnalité code promo"
   git push origin main
   ```

2. **Vercel va automatiquement déployer** le nouveau code

**Option B : Redéploiement manuel**

1. Allez sur le dashboard Vercel
2. Sélectionnez votre projet backend
3. Cliquez sur "Deployments"
4. Cliquez sur "Redeploy" sur le dernier déploiement

---

### ÉTAPE 3 : Créer le code promo dans la base de données de PRODUCTION

Le code OUMA98 existe peut-être seulement dans votre base de données locale !

**Méthode 1 : Via MongoDB Compass**

1. Ouvrez MongoDB Compass
2. Connectez-vous à : `mongodb+srv://Trad2307:Trad2307@cluster0.jaovzp2.mongodb.net/`
3. Sélectionnez la base de données : `Memora`
4. Ouvrez la collection : `codereductions`
5. Vérifiez si le code `OUMA98` existe
6. Si non, cliquez sur "Add Data" → "Insert Document"
7. Ajoutez :
   ```json
   {
     "code": "OUMA98",
     "reduction": 10,
     "actif": true
   }
   ```

**Méthode 2 : Via script**

Créez un fichier `addPromoProduction.js` :

```javascript
require("dotenv").config();
const mongoose = require("mongoose");

const addPromo = async () => {
  try {
    // Connexion à la base de production
    const mongoUrl =
      "mongodb+srv://Trad2307:Trad2307@cluster0.jaovzp2.mongodb.net/Memora";
    await mongoose.connect(mongoUrl);

    console.log("✅ Connecté à MongoDB Production");

    // Vérifier si le code existe
    const existing = await mongoose.connection.db
      .collection("codereductions")
      .findOne({ code: "OUMA98" });

    if (existing) {
      console.log("⚠️  Le code OUMA98 existe déjà");
      console.log("   Actif:", existing.actif);

      // Mettre à jour si inactif
      if (!existing.actif) {
        await mongoose.connection.db
          .collection("codereductions")
          .updateOne({ code: "OUMA98" }, { $set: { actif: true } });
        console.log("✅ Code activé !");
      }
    } else {
      // Créer le code
      await mongoose.connection.db.collection("codereductions").insertOne({
        code: "OUMA98",
        reduction: 10,
        actif: true,
      });
      console.log("✅ Code OUMA98 créé avec succès !");
    }

    await mongoose.connection.close();
  } catch (error) {
    console.error("❌ Erreur:", error.message);
  }
};

addPromo();
```

Exécutez :

```bash
node addPromoProduction.js
```

---

### ÉTAPE 4 : Tester sur Vercel

1. **Attendez** que le déploiement soit terminé (2-3 minutes)
2. **Allez sur votre application** en production
3. **Testez le code promo** OUMA98
4. **Ouvrez la console du navigateur** (F12) pour voir les logs

---

## 🔍 VÉRIFICATIONS

### Vérifier que le déploiement est terminé

Sur Vercel Dashboard :

- Status doit être "Ready" (pas "Building")
- Pas d'erreurs dans les logs

### Vérifier les logs de déploiement

1. Allez sur Vercel → Deployments
2. Cliquez sur le dernier déploiement
3. Regardez les "Build Logs"
4. Cherchez des erreurs

### Vérifier que la route existe

Testez directement l'API :

```bash
curl -X POST https://votre-backend.vercel.app/client/verifyPromoCode \
  -H "Content-Type: application/json" \
  -d '{"code":"OUMA98"}'
```

Réponse attendue :

```json
{
  "success": true,
  "reduction": 10,
  "message": "Code promo appliqué avec succès! Réduction de 10%"
}
```

---

## 🐛 PROBLÈMES COURANTS

### Erreur 404 sur /client/verifyPromoCode

**Cause** : Le backend n'a pas été redéployé avec le nouveau code

**Solution** :

1. Commitez et poussez le code sur Git
2. Attendez le redéploiement automatique
3. Vérifiez que le déploiement est terminé

### "Code promo invalide ou expiré"

**Cause** : Le code n'existe pas dans la base de données de production

**Solution** :

1. Connectez-vous à MongoDB Compass
2. Vérifiez la collection `codereductions`
3. Ajoutez le code OUMA98 si absent

### CORS Error

**Cause** : L'URL du frontend n'est pas autorisée

**Solution** :
Vérifiez `backend/src/middlewares/cors.js` et ajoutez votre URL de production :

```javascript
const allowedOrigins = [
  "http://localhost:3000",
  "https://votre-frontend.vercel.app", // ← Ajoutez votre URL
];
```

---

## 📝 CHECKLIST AVANT DE TESTER

- [ ] Variables d'environnement configurées sur Vercel
- [ ] Code poussé sur Git (git push)
- [ ] Déploiement Vercel terminé (status "Ready")
- [ ] Code OUMA98 existe dans la base de données de production
- [ ] Code OUMA98 a le champ `actif: true`
- [ ] Pas d'erreurs dans les logs de déploiement

---

## 🆘 BESOIN D'AIDE ?

Si ça ne fonctionne toujours pas :

1. Envoyez-moi l'URL de votre backend Vercel
2. Copiez les logs de déploiement
3. Dites-moi ce que vous voyez dans la console du navigateur
4. Faites une capture d'écran de l'erreur
