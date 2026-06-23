import { ArrowLeft, Building2, Calendar, Check, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { notFound } from "next/navigation";
import { getProperty, propertyCatalog } from "../../../lib/property-catalog";

export function generateStaticParams() {
  return propertyCatalog.map(({ slug }) => ({ slug }));
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const related = propertyCatalog.filter((item) => item.slug !== property.slug).slice(0, 3);

  return (
    <main className="npl propertyDetail">
      <div className="propertyDetail__nav">
        <a href="/#properties"><ArrowLeft size={17} /> Back to properties</a>
        <img src="/assets/nrffn-logo-blue.png" alt="NRFFN" />
      </div>

      <section className="propertyDetail__hero">
        <img src={property.hero} alt={property.name} />
        <div className="propertyDetail__hero-copy">
          <span className="propertyDetail__eyebrow">{property.model}</span>
          <h1>{property.name}</h1>
          <p><MapPin size={17} /> {property.location}</p>
          <div className="propertyDetail__hero-meta"><b>{property.price}</b><span>{property.roi}</span></div>
          <div className="propertyDetail__actions">
            <a href="#inspection" className="npl-btn npl-btn--secondary"><Calendar size={17} /> Book inspection</a>
            <a href="/client/properties" className="npl-btn npl-btn--success"><Building2 size={17} /> Buy / Invest</a>
          </div>
        </div>
      </section>

      <div className="propertyDetail__layout">
        <div className="propertyDetail__main">
          <section className="propertyDetail__section">
            <span className="propertyDetail__eyebrow">Property overview</span>
            <h2>Designed for secure, long-term value</h2>
            <p>{property.description}</p>
          </section>

          <section className="propertyDetail__gallery" aria-label="Property gallery">
            {property.gallery.map((image, index) => <img src={image} alt={`${property.name} view ${index + 1}`} key={image} />)}
          </section>

          <section className="propertyDetail__section">
            <h2>Features</h2>
            <div className="propertyDetail__feature-grid">
              {property.features.map((feature) => <div key={feature}><Check size={17} /> {feature}</div>)}
            </div>
          </section>

          <section className="propertyDetail__section" id="inspection">
            <h2>Location and inspection</h2>
            <div className="propertyDetail__location">
              <MapPin size={22} />
              <div><b>{property.location}</b><p>Book a guided physical or virtual inspection with an NRFFN property adviser.</p></div>
              <a href="https://wa.me/2348000000000?text=I%20would%20like%20to%20book%20a%20property%20inspection" className="npl-btn npl-btn--secondary">Book inspection</a>
            </div>
          </section>
        </div>

        <aside className="propertyDetail__aside">
          <div className="propertyDetail__panel">
            <span className="propertyDetail__panel-icon"><TrendingUp size={20} /></span>
            <h3>Investment highlights</h3>
            <ul>{property.highlights.map((item) => <li key={item}><Check size={15} /> {item}</li>)}</ul>
          </div>
          <div className="propertyDetail__panel">
            <span className="propertyDetail__panel-icon"><Calendar size={20} /></span>
            <h3>Installment plan</h3>
            <ul>{property.installment.map((item) => <li key={item}><Check size={15} /> {item}</li>)}</ul>
          </div>
          <div className="propertyDetail__panel propertyDetail__panel--success">
            <ShieldCheck size={24} />
            <h3>NRFFN verified</h3>
            <p>Property records, location data and available documentation have been reviewed before listing.</p>
          </div>
        </aside>
      </div>

      <section className="propertyDetail__related">
        <span className="propertyDetail__eyebrow">More opportunities</span>
        <h2>Related properties</h2>
        <div className="propertyDetail__related-grid">
          {related.map((item) => (
            <article className="propertyDetail__related-card" key={item.slug}>
              <img src={item.hero} alt={item.name} />
              <div><span>{item.model}</span><h3>{item.name}</h3><p>{item.location}</p><a href={`/properties/${item.slug}`}>View Property</a></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
