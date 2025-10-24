import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "Memora Magnet - Magnets Personnalisés de Qualité Premium",
  description = "Memora Magnet - Solution innovante de magnets personnalisés pour réfrigérateur. Créez vos magnets personnalisés avec vos photos préférées. Service rapide, qualité premium.",
  keywords = "magnets personnalisés, magnets photo, magnets réfrigérateur, magnets sur mesure, impression magnets, memora, cadeaux personnalisés, décoration réfrigérateur",
  ogImage = "/logo512.png",
  ogType = "website",
  canonicalUrl,
  structuredData,
}) => {
  const siteUrl = "https://memoraa.onrender.com";
  const fullUrl = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <link rel="canonical" href={fullUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Memora Magnet" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

