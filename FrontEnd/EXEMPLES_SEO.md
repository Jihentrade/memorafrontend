# Exemples d'Utilisation du Composant SEO

Ce document contient des exemples pour ajouter le composant SEO optimisé à vos différentes pages.

## 📄 Page Contact

```jsx
import SEO from '../../components/SEO';
import { getBreadcrumbSchema } from '../../utils/structuredData';

function ContactPage() {
  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://memoraa.onrender.com/' },
    { name: 'Contact', url: 'https://memoraa.onrender.com/contact' }
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <SEO
        title="Contactez-Nous - Memora Magnet | Service Client Réactif"
        description="Contactez l'équipe Memora Magnet pour toute question sur vos magnets personnalisés. Service client disponible 7j/7. Réponse rapide garantie."
        keywords="contact memora, service client magnets, commander magnets personnalisés, questions magnets photo"
        canonicalUrl="/contact"
        structuredData={breadcrumbSchema}
      />
      {/* Contenu de la page contact */}
    </>
  );
}
```

---

## 🛍️ Page Produit / Création de Magnet

```jsx
import SEO from '../../components/SEO';
import { getProductSchema, getBreadcrumbSchema } from '../../utils/structuredData';

function DropzonePage() {
  const productData = {
    name: "Magnet Photo Personnalisé",
    description: "Créez votre magnet personnalisé avec vos photos préférées. Qualité premium, impression haute définition.",
    price: "9.99",
    image: "/logo512.png",
    url: "/aimants-photo-carrés"
  };

  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://memoraa.onrender.com/' },
    { name: 'Créer mon Magnet', url: 'https://memoraa.onrender.com/aimants-photo-carrés' }
  ];

  const productSchema = getProductSchema(productData);
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [productSchema, breadcrumbSchema]
  };

  return (
    <>
      <SEO
        title="Créer Mon Magnet Personnalisé - Upload Photo | Memora Magnet"
        description="Uploadez vos photos et créez vos magnets personnalisés en quelques clics. Éditeur simple et intuitif. Aperçu en temps réel."
        keywords="créer magnet photo, upload photo magnet, personnaliser magnet, éditeur photo magnet, magnet sur mesure"
        canonicalUrl="/aimants-photo-carrés"
        structuredData={combinedSchema}
        ogType="product"
      />
      {/* Contenu de la page */}
    </>
  );
}
```

---

## 🛒 Page Panier

```jsx
import SEO from '../../components/SEO';

function CartPage() {
  return (
    <>
      <SEO
        title="Mon Panier - Memora Magnet"
        description="Finalisez votre commande de magnets personnalisés. Paiement sécurisé, livraison rapide en 72h."
        canonicalUrl="/panier"
        ogType="website"
      />
      {/* Contenu du panier */}
    </>
  );
}
```

---

## ⭐ Page Avis Clients

```jsx
import SEO from '../../components/SEO';
import { getBreadcrumbSchema } from '../../utils/structuredData';

function ReviewsPage() {
  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://memoraa.onrender.com/' },
    { name: 'Avis Clients', url: 'https://memoraa.onrender.com/avis-clients' }
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <SEO
        title="Avis Clients - Memora Magnet | Témoignages et Notes"
        description="Découvrez les avis de nos clients satisfaits sur nos magnets personnalisés. Plus de 50 clients satisfaits, note moyenne 4.9/5."
        keywords="avis memora magnet, témoignages clients, avis magnets personnalisés, satisfaction clients"
        canonicalUrl="/avis-clients"
        structuredData={breadcrumbSchema}
      />
      {/* Contenu des avis */}
    </>
  );
}
```

---

## 🚚 Page Expédition

```jsx
import SEO from '../../components/SEO';
import { getBreadcrumbSchema, getFAQSchema } from '../../utils/structuredData';

function ShippingPage() {
  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://memoraa.onrender.com/' },
    { name: 'Expédition', url: 'https://memoraa.onrender.com/expedition' }
  ];

  const faqData = [
    {
      question: "Quels sont les délais de livraison ?",
      answer: "Nous livrons vos magnets personnalisés en 72h partout en France métropolitaine."
    },
    {
      question: "Quels sont les frais de livraison ?",
      answer: "La livraison est gratuite pour toute commande supérieure à 30€. En dessous, les frais sont de 4.90€."
    },
    {
      question: "Puis-je suivre mon colis ?",
      answer: "Oui, vous recevrez un numéro de suivi par email dès l'expédition de votre commande."
    }
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  const faqSchema = getFAQSchema(faqData);
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumbSchema, faqSchema]
  };

  return (
    <>
      <SEO
        title="Livraison et Expédition - Memora Magnet | Livraison 72h"
        description="Informations sur la livraison de vos magnets personnalisés. Livraison rapide en 72h, suivi de colis, livraison gratuite dès 30€."
        keywords="livraison magnets, expédition magnets personnalisés, délai livraison, frais livraison magnets"
        canonicalUrl="/expedition"
        structuredData={combinedSchema}
      />
      {/* Contenu de la page expédition */}
    </>
  );
}
```

---

## 🏢 Page Admin Dashboard (No Index)

```jsx
import SEO from '../../components/SEO';
import { Helmet } from 'react-helmet-async';

function DashboardAdmin() {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <SEO
        title="Dashboard Admin - Memora Magnet"
        description="Tableau de bord administrateur"
        canonicalUrl="/dashboardAdmin"
      />
      {/* Contenu du dashboard */}
    </>
  );
}
```

---

## 📖 Page À Propos (si vous en créez une)

```jsx
import SEO from '../../components/SEO';
import { getOrganizationSchema, getBreadcrumbSchema } from '../../utils/structuredData';

function AboutPage() {
  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://memoraa.onrender.com/' },
    { name: 'À Propos', url: 'https://memoraa.onrender.com/a-propos' }
  ];

  const organizationSchema = getOrganizationSchema();
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [organizationSchema, breadcrumbSchema]
  };

  return (
    <>
      <SEO
        title="À Propos de Memora Magnet | Notre Histoire et Valeurs"
        description="Découvrez l'histoire de Memora Magnet, entreprise spécialisée dans les magnets personnalisés depuis 5 ans. Qualité, innovation et satisfaction client."
        keywords="à propos memora, histoire memora magnet, entreprise magnets personnalisés, valeurs memora"
        canonicalUrl="/a-propos"
        structuredData={combinedSchema}
      />
      {/* Contenu de la page à propos */}
    </>
  );
}
```

---

## 📝 Page Blog (Article)

```jsx
import SEO from '../../components/SEO';
import { getBreadcrumbSchema } from '../../utils/structuredData';

function BlogArticle({ article }) {
  const breadcrumbItems = [
    { name: 'Accueil', url: 'https://memoraa.onrender.com/' },
    { name: 'Blog', url: 'https://memoraa.onrender.com/blog' },
    { name: article.title, url: `https://memoraa.onrender.com/blog/${article.slug}` }
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbItems);
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "description": article.excerpt,
    "image": article.image,
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate,
    "author": {
      "@type": "Organization",
      "name": "Memora Magnet"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Memora Magnet",
      "logo": {
        "@type": "ImageObject",
        "url": "https://memoraa.onrender.com/logo512.png"
      }
    }
  };
  
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [articleSchema, breadcrumbSchema]
  };

  return (
    <>
      <SEO
        title={`${article.title} - Blog Memora Magnet`}
        description={article.excerpt}
        keywords={article.keywords}
        canonicalUrl={`/blog/${article.slug}`}
        structuredData={combinedSchema}
        ogType="article"
        ogImage={article.image}
      />
      {/* Contenu de l'article */}
    </>
  );
}
```

---

## 🎨 Utilisation du Composant OptimizedImage

### Exemple Simple
```jsx
import OptimizedImage from '../../components/OptimizedImage';

<OptimizedImage
  src={customerImage}
  alt="Client satisfait avec son magnet personnalisé"
  width="400"
  height="400"
  loading="lazy"
  className="customer-image"
/>
```

### Exemple avec Placeholder Personnalisé
```jsx
<OptimizedImage
  src={productImage}
  alt="Magnet photo 10x15cm"
  width="800"
  height="600"
  loading="lazy"
  placeholder="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' fill='%23999' font-size='20'%3EChargement...%3C/text%3E%3C/svg%3E"
  style={{ borderRadius: '8px' }}
/>
```

### Exemple avec Event Handler
```jsx
<OptimizedImage
  src={heroImage}
  alt="Magnets personnalisés sur réfrigérateur"
  width="1920"
  height="1080"
  loading="eager"
  onLoad={() => console.log('Image chargée')}
  style={{ width: '100%', height: 'auto' }}
/>
```

---

## ⚡ Bonnes Pratiques

### 1. Toujours fournir un title unique
Chaque page doit avoir un title unique et descriptif de 50-60 caractères.

### 2. Description optimisée
La meta description doit faire 150-160 caractères et inclure un appel à l'action.

### 3. Mots-clés pertinents
Utilisez des mots-clés naturels et pertinents pour la page.

### 4. URL canonique
Toujours spécifier l'URL canonique pour éviter le contenu dupliqué.

### 5. Structured Data
Ajoutez des structured data appropriées selon le type de page.

### 6. Images Alt Text
Toujours ajouter des alt texts descriptifs pour toutes les images.

---

## 🔍 Vérification

Après avoir ajouté le SEO à une page, vérifiez :

1. **Google Rich Results Test** : https://search.google.com/test/rich-results
2. **Schema Markup Validator** : https://validator.schema.org/
3. **Open Graph Debugger** : https://www.opengraph.xyz/
4. **Meta Tags Checker** : https://metatags.io/

---

**Besoin d'aide ?** Consultez le fichier `SEO_PERFORMANCE_GUIDE.md` pour plus d'informations.

