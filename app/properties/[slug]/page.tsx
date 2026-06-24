import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Check,
  FileText,
  Globe,
  Layers3,
  MapPin,
  Ruler,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getProperty, propertyCatalog } from "../../../lib/property-catalog";
import PropertyGallery from "../../../components/property/PropertyGallery";

export function generateStaticParams() {
  return propertyCatalog.map(({ slug }) => ({ slug }));
}

function optionsFor(model: string) {
  if (model === "Land Banking") return ["300sqm", "500sqm", "1500sqm", "3000sqm"];
  if (model === "Co-Ownership") return ["1 share", "3 shares", "5 shares", "10 shares"];
  if (model === "Flex") return ["Starter", "Growth", "Premium"];
  return ["1 unit", "2 units", "3 units"];
}

function planFor(model: string) {
  if (model === "Co-Ownership") return ["Income plan", "Capital growth"];
  if (model === "Flex") return ["Starter plan", "Upgrade plan"];
  return ["Outright", "Installment"];
}

function docPack(model: string) {
  if (model === "Land Banking") return ["Brochure", "Layout", "Survey plan", "Contract of sale"];
  if (model === "Co-Ownership") return ["Brochure", "Ownership guide", "Agreement", "Payout schedule"];
  if (model === "Flex") return ["Brochure", "Upgrade guide", "Allocation note", "Contract"];
  return ["Brochure", "Layout", "Contract of sale", "Title summary"];
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const related = propertyCatalog.filter((item) => item.slug !== property.slug).slice(0, 3);
  const sizes = optionsFor(property.model);
  const plans = planFor(property.model);
  const docs = docPack(property.model);
  const headline = property.model === "Co-Ownership" ? "Co-ownership offerings" : property.model === "Land Banking" ? "Full ownership offerings" : `${property.model} offerings`;

  return (
    <main className="npl propertyDetail">
      <div className="propertyDetail__nav">
        <a href="/#properties"><ArrowLeft size={17} /> Back to properties</a>
        <img src="/assets/nrffn-logo-blue.png" alt="NRFFN" />
      </div>

      <section className="propertyDetail__heroGrid">
        <div className="propertyDetail__media">
          <PropertyGallery images={[property.hero, ...property.gallery]} name={property.name} />
        </div>

        <aside className="propertyDetail__offer">
          <div className="propertyDetail__offer-top">
            <span className="propertyDetail__eyebrow">{property.model}</span>
            <span className="propertyDetail__pill"><ShieldCheck size={14} /> Verified</span>
          </div>
          <h1>{property.name}</h1>
          <p className="propertyDetail__lead"><MapPin size={17} /> {property.location}</p>
          <div className="propertyDetail__hero-meta">
            <div>
              <small>From</small>
              <b>{property.price}</b>
            </div>
            <div>
              <small>Return</small>
              <b>{property.roi}</b>
            </div>
          </div>

          <div className="propertyDetail__block">
            <span className="propertyDetail__block-label">{headline}</span>
            <div className="propertyDetail__chips">
              {sizes.map((size, index) => (
                <button key={size} className={`propertyDetail__chip${index === 0 ? " active" : ""}`} type="button">
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="propertyDetail__block">
            <span className="propertyDetail__block-label">Plan type</span>
            <div className="propertyDetail__switch">
              {plans.map((plan, index) => (
                <button key={plan} className={`propertyDetail__switch-btn${index === 0 ? " active" : ""}`} type="button">
                  {plan}
                </button>
              ))}
            </div>
          </div>

          <div className="propertyDetail__summary">
            <div className="propertyDetail__summary-head">
              <span><TrendingUp size={14} /> Investment summary</span>
              <b>{property.model === "Full Ownership" ? "Own it outright" : property.model === "Co-Ownership" ? "Own a share" : "Start small"}</b>
            </div>
            <div className="propertyDetail__summary-row">
              <span>List price</span>
              <b>{property.price}</b>
            </div>
            <div className="propertyDetail__summary-row">
              <span>Projected return</span>
              <b>{property.roi}</b>
            </div>
            <div className="propertyDetail__summary-row total">
              <span>Total due</span>
              <b>{property.price}</b>
            </div>
          </div>

          <div className="propertyDetail__actions">
            <a href="#docs" className="npl-btn npl-btn--ghost"><FileText size={17} /> View documents</a>
            <a href="/login?role=Client&next=/client/properties" className="npl-btn npl-btn--success"><Building2 size={17} /> Buy / Invest</a>
          </div>
        </aside>
      </section>

      <div className="propertyDetail__layout">
        <div className="propertyDetail__main">
          <section className="propertyDetail__section">
            <span className="propertyDetail__eyebrow">About this property</span>
            <h2>Designed for secure, long-term value</h2>
            <p>{property.description}</p>
            <p>
              This listing is presented as a polished investment offering with the same NRFFN brand language used
              across the rest of the platform, so buyers can review the view flow before they commit.
            </p>
          </section>

          <section className="propertyDetail__section">
            <span className="propertyDetail__eyebrow">Basic details</span>
            <h2>Quick facts</h2>
            <div className="propertyDetail__facts">
              <article><span className="propertyDetail__fact-ic"><Ruler size={18} /></span><div><small>Topography</small><b>{property.model === "Land Banking" ? "Dry land" : "Developed land"}</b></div></article>
              <article><span className="propertyDetail__fact-ic"><Globe size={18} /></span><div><small>Purpose</small><b>{property.model === "Full Ownership" ? "Residential" : property.model === "Co-Ownership" ? "Income property" : "Growth asset"}</b></div></article>
              <article><span className="propertyDetail__fact-ic"><MapPin size={18} /></span><div><small>Map location</small><b>Not yet pinned</b></div></article>
            </div>
          </section>

          <section className="propertyDetail__section">
            <span className="propertyDetail__eyebrow">Amenities</span>
            <h2>What comes with the offering</h2>
            <div className="propertyDetail__feature-grid propertyDetail__feature-grid--chips">
              {property.features.map((feature) => <div key={feature}><Check size={16} /> {feature}</div>)}
            </div>
          </section>

          <section className="propertyDetail__section" id="docs">
            <span className="propertyDetail__eyebrow">Documents</span>
            <h2>Supporting files</h2>
            <div className="propertyDetail__docs">
              {docs.map((doc) => (
                <div className="propertyDetail__doc" key={doc}>
                  <span className="propertyDetail__fact-ic"><FileText size={18} /></span>
                  <div><b>{doc}</b><p>Open the property file for more detail</p></div>
                  <a href="/client/documents" aria-label={`Open ${doc}`}><ArrowRight size={16} /></a>
                </div>
              ))}
            </div>
          </section>

          <section className="propertyDetail__section" id="inspection">
            <span className="propertyDetail__eyebrow">Inspection</span>
            <h2>Location and inspection</h2>
            <div className="propertyDetail__location">
              <MapPin size={22} />
              <div>
                <b>{property.location}</b>
                <p>Book a guided physical or virtual inspection with an NRFFN property adviser.</p>
              </div>
              <a href="https://wa.me/2348000000000?text=I%20would%20like%20to%20book%20a%20property%20inspection" className="npl-btn npl-btn--ghost">Book inspection</a>
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
            <h3>Payment plan</h3>
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
              <div>
                <span>{item.model}</span>
                <h3>{item.name}</h3>
                <p>{item.location}</p>
                <a href={`/properties/${item.slug}`}>View property</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
