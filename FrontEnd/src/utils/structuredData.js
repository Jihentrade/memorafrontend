export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Memora Magnet",
  url: "https://memoraa.onrender.com",
  logo: "https://memoraa.onrender.com/logo512.png",
  description:
    "Memora Magnet - Solution innovante de magnets personnalisés pour réfrigérateur. Créez vos magnets personnalisés avec vos photos préférées.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Service Client",
    availableLanguage: ["French"],
  },
  sameAs: [],
});

export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Memora Magnet",
  url: "https://memoraa.onrender.com",
  description:
    "Créez vos magnets personnalisés avec vos photos préférées. Service rapide, qualité premium, livraison garantie.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://memoraa.onrender.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
});

export const getProductSchema = (product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name || "Magnet Personnalisé",
  description:
    product.description ||
    "Magnet personnalisé de haute qualité pour votre réfrigérateur",
  image: product.image || "https://memoraa.onrender.com/logo512.png",
  brand: {
    "@type": "Brand",
    name: "Memora Magnet",
  },
  offers: {
    "@type": "Offer",
    url: product.url || "https://memoraa.onrender.com",
    priceCurrency: "EUR",
    price: product.price || "0",
    availability: "https://schema.org/InStock",
    seller: {
      "@type": "Organization",
      name: "Memora Magnet",
    },
  },
});

export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Memora Magnet",
  image: "https://memoraa.onrender.com/logo512.png",
  "@id": "https://memoraa.onrender.com",
  url: "https://memoraa.onrender.com",
  telephone: "",
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: "",
    addressLocality: "",
    postalCode: "",
    addressCountry: "FR",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "00:00",
    closes: "23:59",
  },
});

export const getFAQSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

