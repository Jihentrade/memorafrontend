# Fonctionnalités d'Upload d'Images et Gestion des Commandes

## Nouvelles Fonctionnalités Implémentées

### 1. Upload d'Images côté Backend

#### Middleware d'Upload (`backend/src/middlewares/upload.js`)

- Configuration Multer pour l'upload de fichiers
- Support jusqu'à 9 images par commande
- Validation des types de fichiers (images uniquement)
- Limite de taille : 5MB par fichier
- Stockage dans le dossier `uploads/`

#### Modèle de Commande Mis à Jour

- Champ `images` modifié pour accepter un tableau de chemins d'images
- Validation mise à jour pour au moins une image

#### Contrôleur de Commande

- Nouvelle fonction `createCommande` avec support d'upload d'images
- Gestion des erreurs d'upload
- Génération automatique des numéros de commande
- Sauvegarde des chemins d'images dans la base de données

#### Service de Commande

- Récupération des commandes avec informations client (populate)
- Support des relations entre commandes et clients

### 2. Interface Client Mise à Jour

#### Service de Commande (`FrontEnd/src/services/commande.services.js`)

- Fonction `createCommandeWithImages` pour l'upload d'images
- Gestion des FormData pour l'envoi de fichiers
- Intégration avec l'API backend

#### Page ProductPreview (`FrontEnd/src/pages/ProductPreview/ProductPreview.jsx`)

- Nouvelle page pour la prévisualisation et création de commandes
- Upload automatique des images vers le backend
- Gestion des états de chargement et d'erreur
- Redirection après création de commande

#### Page Dropzone

- Redirection vers ProductPreview au lieu de FridgePreview
- Conservation de la fonctionnalité de sélection d'images

### 3. Interface d'Administration

#### Page CommandesAdmin (`FrontEnd/src/pages/CommandesAdmin/CommandesAdmin.jsx`)

- Affichage de toutes les commandes avec informations client
- Recherche et filtrage des commandes
- Visualisation des détails de commande avec images
- Interface responsive avec Material-UI

#### Fonctionnalités de l'Interface Admin

- **Liste des commandes** : Affichage en grille avec informations essentielles
- **Recherche** : Par numéro de commande, nom, email, montant
- **Détails de commande** : Modal avec informations complètes
- **Visualisation d'images** : Affichage des images uploadées par le client
- **Informations client** : Nom, prénom, email, téléphone, adresse

### 4. Configuration Backend

#### Serveur de Fichiers Statiques

- Route `/uploads` pour servir les images uploadées
- Configuration dans `app.js`

#### Routes Mises à Jour

- Route `/commandes` pour l'interface d'administration
- Intégration dans le routeur principal

## Utilisation

### Pour les Clients

1. Sélectionner jusqu'à 9 images sur la page Dropzone
2. Prévisualiser le produit sur ProductPreview
3. Cliquer sur "Créer la commande" pour uploader les images
4. Les images sont automatiquement sauvegardées sur le serveur

### Pour les Administrateurs

1. Accéder au Dashboard Admin
2. Cliquer sur "Accéder aux Commandes"
3. Voir toutes les commandes avec images et informations client
4. Utiliser la recherche pour filtrer les commandes
5. Cliquer sur "Voir" pour afficher les détails complets

## Structure des Fichiers

### Backend

```
backend/
├── src/
│   ├── middlewares/
│   │   └── upload.js (nouveau)
│   ├── controllers/
│   │   └── commandecontroller.js (modifié)
│   ├── services/
│   │   └── commandeservices.js (modifié)
│   └── models/
│       └── commandemodel.js (modifié)
├── uploads/ (nouveau dossier)
└── app.js (modifié)
```

### Frontend

```
FrontEnd/src/
├── services/
│   └── commande.services.js (nouveau)
├── pages/
│   ├── ProductPreview/ (nouveau)
│   │   ├── ProductPreview.jsx
│   │   └── index.js
│   └── CommandesAdmin/ (nouveau)
│       ├── CommandesAdmin.jsx
│       └── index.js
└── routes/
    └── routerConfig.jsx (modifié)
```

## Dépendances Ajoutées

### Backend

- `multer` : Pour l'upload de fichiers

### Frontend

- Aucune nouvelle dépendance (utilise les packages existants)

## Notes Techniques

- Les images sont stockées dans le dossier `uploads/` du backend
- Les chemins d'images sont sauvegardés dans la base de données
- L'interface admin affiche les images via l'URL `http://localhost:4000/uploads/[nom_fichier]`
- Support des formats d'image : JPEG, JPG, PNG, GIF
- Limite de taille : 5MB par image
- Maximum 9 images par commande
