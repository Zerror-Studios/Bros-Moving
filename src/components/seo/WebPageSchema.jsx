const WebPageSchema = ({ name, description, url }) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,

    url: url,
    name: name,
    description: description,

    isPartOf: {
      "@type": "WebSite",
      "@id": `${url}#website`,
    },

    about: {
      "@type": "Organization",
      name: "Wrexon",
    },

    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${url}/images/og.png`,
    },

    inLanguage: "en-IN",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default WebPageSchema;