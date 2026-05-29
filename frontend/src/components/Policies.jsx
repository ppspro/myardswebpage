import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';

const policyDocuments = {
  terms: {
    title: 'Terms of Service',
    description: 'Rules and regulations for using the Myards ecosystem.',
    sections: [
      { id: 'eligibility', title: '1. Eligibility & Accounts' },
      { id: 'services', title: '2. Services Offered' },
      { id: 'orders', title: '3. Orders & Pricing' },
      { id: 'payments', title: '4. Payments & Refunds' },
      { id: 'conduct', title: '5. Partner Code of Conduct' },
      { id: 'governing-law', title: '6. Governing Law' },
    ],
    content: (
      <>
        <section id="eligibility">
          <h2>1. Eligibility & Accounts</h2>
          <p>Welcome to Myards, operated by Visital Technologies Pvt. Ltd. By accessing our services, you confirm you are at least 18 years of age. Users under 18 may only use Myards under active parental/guardian supervision.</p>
          <p>Registration as a Partner (Restaurant or Rider) requires valid verification of government-issued credentials under Indian standard laws (FSSAI, GSTIN, Aadhaar, PAN). You are entirely responsible for all actions taken under your account credentials.</p>
        </section>
        <hr className="divider" />
        <section id="services">
          <h2>2. Services Offered</h2>
          <p>Myards functions as a hyperlocal technology aggregator. We facilitate: food ordering, grocery ordering, delivery dispatch, restaurant discovery, and payment gateway facilitation.</p>
          <p>We do not prepare food, set restaurant pricing, or own retail inventories. All physical quality checks and product hygiene compliance remain the absolute liability of the respective Merchant Partners.</p>
        </section>
        <hr className="divider" />
        <section id="orders">
          <h2>3. Orders & Pricing</h2>
          <p>All listings and pricing details are provided directly by onboarded Merchant Partners. While we strive to maintain menu accuracy, differences between restaurant-displayed rates and platform rates may occur due to surge fees, packaging, and delivery premiums.</p>
          <p>Order placement constitutes a contract between the Customer and the Merchant. Myards reserves the right to reject orders in cases of suspicious payment activity or customer unavailability.</p>
        </section>
        <hr className="divider" />
        <section id="payments">
          <h2>4. Payments & Refunds</h2>
          <p>Payments can be made via UPI, major credit/debit cards, Netbanking, or mobile wallets. Refund processes are handled strictly in accordance with our Refund Policy.</p>
          <p>In cases of cancellations after restaurant preparation has initiated, users may be charged a fee equivalent to 100% of the order value to compensate the merchant and logistics partner.</p>
        </section>
        <hr className="divider" />
        <section id="conduct">
          <h2>5. Partner Code of Conduct</h2>
          <p>To compete effectively in the Indian food-tech market, Myards upholds strict delivery SLAs, hygiene rules, and professional decorum. Abuse of support channels, route manipulation, or passenger harassment will lead to immediate, permanent account suspension.</p>
        </section>
        <hr className="divider" />
        <section id="governing-law">
          <h2>6. Governing Law</h2>
          <p>These terms and all disputes arising from platform use are governed by and construed in accordance with the laws of India. Legal jurisdiction lies exclusively within the courts of Bhubaneswar, Odisha.</p>
        </section>
      </>
    )
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'How we collect, manage, and safeguard user and partner data.',
    sections: [
      { id: 'collection', title: '1. Information Collection' },
      { id: 'utilization', title: '2. Data Utilization' },
      { id: 'sharing', title: '3. Data Sharing' },
      { id: 'retention', title: '4. Storage & Retention' },
      { id: 'rights', title: '5. User Data Rights' },
    ],
    content: (
      <>
        <section id="collection">
          <h2>1. Information Collection</h2>
          <p>We collect direct registration data (names, email addresses, phone numbers, delivery coordinates) and hardware data (IP addresses, OS versions, unique device identifiers).</p>
          <p>For KYC onboarding, we process Aadhaar cards, PAN cards, FSSAI certificates, bank IFSC numbers, and cancelled cheques. Real-time GPS location tracking runs persistently in the background during active order delivery.</p>
        </section>
        <hr className="divider" />
        <section id="utilization">
          <h2>2. Data Utilization</h2>
          <p>Collected details are utilized to: route orders efficiently, complete mandatory merchant tax compliance, compute weekly rider payouts, check platform security threats, and provide proactive support assistance.</p>
        </section>
        <hr className="divider" />
        <section id="sharing">
          <h2>3. Data Sharing</h2>
          <p>We do not sell personal data. Necessary variables are shared only with logistics handlers, verification agencies, payment processors, and regulatory compliance units (such as tax audits).</p>
        </section>
        <hr className="divider" />
        <section id="retention">
          <h2>4. Storage & Retention</h2>
          <p>KYC files are stored inside encrypted local servers. We retain critical database records for as long as required under Indian IT and financial retention frameworks.</p>
        </section>
        <hr className="divider" />
        <section id="rights">
          <h2>5. User Data Rights</h2>
          <p>Users may review, update, or request purging of their profile data by sending an inquiry to our designated privacy officer at <strong>privacy@myards.in</strong>.</p>
        </section>
      </>
    )
  },
  refunds: {
    title: 'Refund & Cancellation',
    description: 'Guidelines on payment reversals and order cancellation windows.',
    sections: [
      { id: 'cancellation', title: '1. Order Cancellation' },
      { id: 'eligibility', title: '2. Refund Eligibility' },
      { id: 'timelines', title: '3. Reversal Timelines' },
    ],
    content: (
      <>
        <section id="cancellation">
          <h2>1. Order Cancellation</h2>
          <p>Orders can only be cancelled within the first 60 seconds of submission. Once a restaurant accepts the order or the preparation phase starts, cancellations will attract a 100% cancellation charge.</p>
        </section>
        <hr className="divider" />
        <section id="eligibility">
          <h2>2. Refund Eligibility</h2>
          <p>Refunds are initiated if: the restaurant fails to fulfill orders, items are completely missing/damaged, or the delivery rider fails to arrive at the coordinates. Minor taste discrepancies do not qualify for cash reversals.</p>
        </section>
        <hr className="divider" />
        <section id="timelines">
          <h2>3. Reversal Timelines</h2>
          <p>Reversed amounts are sent back to the source payment method. UPI transfers clear in 2-5 days, credit/debit cards in 5-10 business days, and wallet points instantly.</p>
        </section>
      </>
    )
  },
  delivery: {
    title: 'Delivery Partner Terms',
    description: 'Agreements for riders joining the logistics fleet.',
    sections: [
      { id: 'status', title: '1. Contractor Status' },
      { id: 'rules', title: '2. Operations & Safety' },
      { id: 'payouts', title: '3. Earnings & Payouts' },
    ],
    content: (
      <>
        <section id="status">
          <h2>1. Contractor Status</h2>
          <p>Riders act as independent service providers. This partnership does not constitute an employer-employee relationship under Indian labor regulations.</p>
        </section>
        <hr className="divider" />
        <section id="rules">
          <h2>2. Operations & Safety</h2>
          <p>All riders must maintain valid driving permits, wear standard safety helmets, and comply with speed limits. Using fake GPS applications or tampering with packaging seals will result in immediate termination.</p>
        </section>
        <hr className="divider" />
        <section id="payouts">
          <h2>3. Earnings & Payouts</h2>
          <p>Earnings depend on route distances, surge timings, and customer tip add-ons. Payments are audited and sent directly to linked bank accounts weekly.</p>
        </section>
      </>
    )
  },
  merchant: {
    title: 'Merchant Agreement',
    description: 'Legal terms for restaurant and grocery store listing.',
    sections: [
      { id: 'standards', title: '1. Food Standards' },
      { id: 'fees', title: '2. Commissions & Fees' },
      { id: 'termination', title: '3. Suspension Rights' },
    ],
    content: (
      <>
        <section id="standards">
          <h2>1. Food Standards</h2>
          <p>All merchant partners must maintain active FSSAI licensing and observe strict hygiene protocols. Menu descriptions and allergy alerts must be explicitly highlighted.</p>
        </section>
        <hr className="divider" />
        <section id="fees">
          <h2>2. Commissions & Fees</h2>
          <p>Myards charges an agreed commission rate on every successful order value. Standard payment processing fees and logistics facilitation fees are deducted from payouts.</p>
        </section>
        <hr className="divider" />
        <section id="termination">
          <h2>3. Suspension Rights</h2>
          <p>We reserve the right to remove listings from the platform in cases of repeated negative ratings, bad hygiene audits, or fraud.</p>
        </section>
      </>
    )
  }
};

const Policies = () => {
  const { tab } = useParams();
  const navigate = useNavigate();
  const activeTab = tab && policyDocuments[tab] ? tab : 'terms';
  const doc = policyDocuments[activeTab];

  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sectionRefs = useRef({});

  // Auto-highlight Center Section on Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    doc.sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [activeTab]);

  const handleTabChange = (tabKey) => {
    setMobileMenuOpen(false);
    navigate(`/policies/${tabKey}`);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  return (
    <div className="z-policy-layout">
      {/* Mobile Sticky Header */}
      <header className="z-mobile-header">
        <button 
          className="z-hamburger-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="z-mobile-title">{doc.title}</span>
        <div style={{ width: 24 }} /> {/* Spacer to align title center */}
      </header>

      {/* Left Sidebar (Global Navigation) */}
      <aside className={`z-left-sidebar ${mobileMenuOpen ? 'active' : ''}`} aria-label="Global Policy Navigation">
        <div className="z-sidebar-header">
          <Link to="/" className="z-logo">Myards Policies</Link>
          <p className="z-sidebar-subtitle">Visital Technologies</p>
        </div>
        <nav className="z-sidebar-nav">
          {Object.keys(policyDocuments).map((key) => (
            <button
              key={key}
              onClick={() => handleTabChange(key)}
              className={`z-nav-item ${activeTab === key ? 'active' : ''}`}
            >
              <span>{policyDocuments[key].title}</span>
              <ChevronRight size={16} className="z-chevron" />
            </button>
          ))}
        </nav>
      </aside>

      {/* Backdrop for mobile menu */}
      {mobileMenuOpen && (
        <div className="z-backdrop" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Center Column (Main Content) */}
      <main className="z-center-content">
        <article className="z-article">
          <header className="z-article-header">
            <h1>{doc.title}</h1>
            <p className="z-lead">{doc.description}</p>
          </header>
          <div className="z-markdown-body">
            {doc.content}
          </div>
        </article>
      </main>

      {/* Right Sidebar (In-Page Table of Contents) */}
      <aside className="z-right-sidebar" aria-label="Table of Contents">
        <div className="z-toc-wrapper">
          <p className="z-toc-title">ON THIS PAGE</p>
          <nav className="z-toc-nav">
            {doc.sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollToSection(s.id)}
                className={`z-toc-item ${activeSection === s.id ? 'active' : ''}`}
              >
                {s.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default Policies;
