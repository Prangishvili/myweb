export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Oto Prangi",
    url: "https://otoprangi.com",
    email: "hello@otoprangi.com",
    telephone: "+995 593 26 11 77",
    jobTitle: "Senior Product Designer",
    knowsAbout: [
      "Product Design",
      "UI/UX Design",
      "Design Systems",
      "Digital Products",
      "Creative Direction",
      "User Experience",
      "Interface Design",
    ],
    sameAs: [
      "https://reply.gallery",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
