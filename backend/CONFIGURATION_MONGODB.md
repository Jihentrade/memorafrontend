# 🗄️ CONFIGURATION MONGODB

## ❌ PROBLÈME ACTUEL

Le serveur ne peut pas se connecter à MongoDB :
```
ERREUR CONNEXION DB: connect ECONNREFUSED ::1:27017
```

Vous avez **2 solutions** :

---

## ✅ SOLUTION 1 : MongoDB Atlas (RECOMMANDÉ - Gratuit et Cloud)

C'est la solution la plus simple, pas besoin d'installer MongoDB !

### Étapes :

1. **Allez sur** https://www.mongodb.com/cloud/atlas/register

2. **Créez un compte gratuit** (M0 - Free tier)

3. **Créez un cluster** :
   - Cliquez sur "Build a Database"
   - Sélectionnez "M0 Free"
   - Choisissez une région proche (ex: AWS / Frankfurt)
   - Cliquez sur "Create"

4. **Configurez l'accès** :
   - Username: `admin`
   - Password: `memora123` (ou votre propre mot de passe)
   - Cliquez sur "Create User"

5. **Autorisez toutes les IP** :
   - Dans "Network Access"
   - Cliquez sur "Add IP Address"
   - Sélectionnez "Allow access from anywhere" (0.0.0.0/0)
   - Cliquez sur "Confirm"

6. **Récupérez l'URL de connexion** :
   - Retournez sur "Database"
   - Cliquez sur "Connect"
   - Sélectionnez "Connect your application"
   - Copiez l'URL (ressemble à) :
   ```
   mongodb+srv://admin:<password>@cluster0.xxxxx.mongodb.net/memora_magnet?retryWrites=true&w=majority
   ```

7. **Remplacez `<password>`** par votre mot de passe réel

8. **Mettez à jour le fichier `.env`** :
   Ouvrez `backend/.env` et modifiez la ligne MONGODB_URL :
   ```
   MONGODB_URL=mongodb+srv://admin:memora123@cluster0.xxxxx.mongodb.net/memora_magnet?retryWrites=true&w=majority
   ```

9. **Redémarrez le serveur** :
   - Arrêtez le serveur (Ctrl+C)
   - Relancez : `npm start`
   - Vous devriez voir : ✅ Base de données connectée avec succès !

---

## ✅ SOLUTION 2 : MongoDB Local (Si vous préférez)

### Étapes :

1. **Téléchargez MongoDB Community Server** :
   https://www.mongodb.com/try/download/community

2. **Installez MongoDB** :
   - Sélectionnez "Complete"
   - Cochez "Install MongoDB as a Service"
   - Cochez "Install MongoDB Compass" (interface graphique)

3. **Démarrez MongoDB** :
   - Sur Windows, MongoDB démarre automatiquement comme service
   - Ou ouvrez MongoDB Compass et connectez-vous à `mongodb://localhost:27017`

4. **Le fichier `.env` est déjà configuré** pour localhost :
   ```
   MONGODB_URL=mongodb://localhost:27017/memora_magnet
   ```

5. **Redémarrez le serveur** :
   - Arrêtez le serveur (Ctrl+C)
   - Relancez : `npm start`
   - Vous devriez voir : ✅ Base de données connectée avec succès !

---

## 🧪 TESTER LA CONNEXION

Après avoir configuré MongoDB, redémarrez le serveur et vérifiez :

### Dans le terminal backend :
```
✅ Base de données connectée avec succès !
```

### Créer les codes promo :
```bash
npm run create-promo
```

### Tester l'API :
```bash
npm run test-promo
```

Vous devriez voir :
```
✅ Succès: { success: true, reduction: 10, ... }
```

---

## 📝 FICHIER .ENV COMPLET

Votre fichier `.env` devrait ressembler à ça :

```env
PORT=4001

# Option 1 : MongoDB Atlas (Cloud)
MONGODB_URL=mongodb+srv://admin:votreMotDePasse@cluster0.xxxxx.mongodb.net/memora_magnet?retryWrites=true&w=majority

# Option 2 : MongoDB Local
# MONGODB_URL=mongodb://localhost:27017/memora_magnet

# JWT (optionnel pour le moment)
JWT_SECRET=votre_secret_jwt_ici

# Email (optionnel pour le moment)
EMAIL_USER=votre_email@gmail.com
EMAIL_PASS=votre_mot_de_passe_app
```

---

## 🚨 PROBLÈMES FRÉQUENTS

### "Authentication failed"
- Vérifiez que le mot de passe dans l'URL est correct
- N'oubliez pas de remplacer `<password>` par le vrai mot de passe

### "MongooseServerSelectionError"
- Vérifiez que vous avez autorisé votre IP dans Atlas
- Vérifiez votre connexion internet

### "connect ECONNREFUSED localhost:27017"
- MongoDB local n'est pas démarré
- Utilisez MongoDB Atlas à la place (plus simple)

---

## 💡 MA RECOMMANDATION

**Utilisez MongoDB Atlas** (Solution 1) car :
- ✅ Gratuit pour toujours (tier M0)
- ✅ Aucune installation nécessaire
- ✅ Accessible de partout
- ✅ Sauvegardes automatiques
- ✅ Parfait pour le développement et la production

---

## 📞 BESOIN D'AIDE ?

Si vous avez des problèmes :
1. Dites-moi quelle solution vous choisissez (Atlas ou Local)
2. Envoyez-moi les logs du terminal quand vous faites `npm start`
3. Dites-moi à quelle étape vous bloquez

