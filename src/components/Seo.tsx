import { Helmet } from "react-helmet-async";
import { STUDIO, META } from "@/constants/site";

export function Seo() {
  const title = `${STUDIO.full} — Arquitetura contemporânea`;
  const description = STUDIO.tagline;

  const ld = {
    "@context": "https://schema.org",
    "@type": "ArchitecturalService",
    name: STUDIO.full,
    url: META.url,
    image: META.ogImage,
    email: STUDIO.email,
    telephone: STUDIO.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: STUDIO.address,
    },
    sameAs: [STUDIO.instagram],
  };

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={META.url} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={META.url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={META.ogImage} />
      <meta property="og:locale" content="pt_BR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={META.ogImage} />

      <meta name="theme-color" content="#f8f8f6" />
      <script type="application/ld+json">{JSON.stringify(ld)}</script>
    </Helmet>
  );
}
