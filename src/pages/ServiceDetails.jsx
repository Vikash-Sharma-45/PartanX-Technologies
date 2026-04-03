import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import Footer from '../sections/Footer';
import Skills from '../sections/Skills';

// Extend the services data for detailed pages.
const servicesDetailsData = {
  'web-development': {
    title: 'Web Development',
    heroDesc: 'Crafting stunning, high-performance web applications tailored to your freelancing business goals.',
    color: 'linear-gradient(135deg, #7c3aed, #f472b6)',
    emoji: '💻',
    features: [
      {
        name: 'Custom React & Vite Sites',
        desc: 'Blazing fast single-page applications built on modern tooling for the ultimate user experience.'
      },
      {
        name: 'Interactive 3D UI',
        desc: 'Immersive 3D environments using Three.js to captivate visitors and showcase your brand.'
      },
      {
        name: 'Performance Optimization',
        desc: 'Achieving perfect lighthouse scores to ensure instant load times and better SEO ranking.'
      },
      {
        name: 'Responsive Design',
        desc: 'Pixel-perfect UI that looks and feels premium across all devices and screen sizes.'
      }
    ]
  },
  'social-media-management': {
    title: 'Social Media Management',
    heroDesc: 'Data-driven content strategies that organically grow your audience and build your brand.',
    color: 'linear-gradient(135deg, #06b6d4, #10b981)',
    emoji: '📱',
    features: [
      {
        name: 'Content Strategy',
        desc: 'We plan and execute content calendars tailored exactly to what your target audience wants.'
      },
      {
        name: 'Community Engagement',
        desc: 'Building and nurturing loyal communities around your brand to drive trust and conversions.'
      },
      {
        name: 'Analytics & Reporting',
        desc: 'Monthly performance breakdowns and growth metrics so you are always in the loop.'
      },
      {
        name: 'Visual Asset Creation',
        desc: 'Designing eye-catching graphics, reels, and stories that stand out in crowded feeds.'
      }
    ],
    skills: [
      {
        icon: '🎨',
        title: 'Content & Creative',
        skills: [
          { name: 'Content Creation (Canva/PS)', pct: 95 },
          { name: 'Video Editing (CapCut/Pr)', pct: 92 },
          { name: 'Copywriting & Hooks', pct: 94 },
          { name: 'Trend & Hashtag Research', pct: 90 },
        ],
      },
      {
        icon: '📈',
        title: 'Strategy & Ads',
        skills: [
          { name: 'Social Media Strategy', pct: 92 },
          { name: 'Social Media Advertising', pct: 88 },
          { name: 'Analytics & Tracking', pct: 90 },
          { name: 'Brand Positioning', pct: 85 },
        ],
      },
      {
        icon: '💼',
        title: 'Business & Management',
        skills: [
          { name: 'Client Management', pct: 95 },
          { name: 'Content Calendars', pct: 92 },
          { name: 'Community Engagement', pct: 90 },
          { name: 'Tools (Trello, Notion)', pct: 88 },
        ],
      },
    ]
  }
};

export default function ServiceDetails() {
  const { id } = useParams();
  const service = servicesDetailsData[id];

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column' }}>
        <h2>Service not found</h2>
        <Link to="/" style={{ color: 'var(--clr-accent)', marginTop: '1rem' }}>Go Back Home</Link>
      </div>
    );
  }

  return (
    <>
      <CustomCursor />
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        
        {/* Simple Navbar for Inner Pages */}
        <nav style={{ padding: '2rem max(2rem, calc((100vw - 1280px)/2 + 2rem))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="navbar-logo" style={{ textDecoration: 'none' }}>PARTANX</Link>
          <Link to="/" style={{ color: 'var(--clr-text)', textDecoration: 'none', background: 'rgba(255,255,255,0.05)', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.9rem' }}>
            ← Back to Home
          </Link>
        </nav>

        {/* Hero Section */}
        <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: service.color,
            filter: 'blur(100px)',
            opacity: 0.15,
            zIndex: -1,
            borderRadius: '50%'
          }} />
          
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>{service.emoji}</span>
            <h1 className="h1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem' }}>
              {service.title}
            </h1>
            <p style={{ color: 'var(--clr-text-muted)', maxWidth: 600, margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.6 }}>
              {service.heroDesc}
            </p>
          </motion.div>
        </section>

        {/* Features Grid */}
        <section className="container" style={{ padding: '4rem 2rem', flexGrow: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {service.features.map((feature, i) => (
              <motion.div 
                key={feature.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  background: 'rgba(6,6,14,0.6)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: '1rem',
                  padding: '2rem'
                }}
              >
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--clr-text)' }}>{feature.name}</h3>
                <p style={{ color: 'var(--clr-text-muted)', lineHeight: 1.6 }}>{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {id === 'web-development' && <Skills />}
        {id === 'social-media-management' && <Skills categories={service.skills} />}

        {/* Call to Action */}
        <section style={{ textAlign: 'center', padding: '4rem 2rem', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Ready to start your project?</h2>
          <Link to="/" style={{ 
            display: 'inline-block',
            background: 'var(--clr-text)',
            color: 'var(--clr-bg)',
            padding: '1rem 2rem',
            borderRadius: '100px',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem'
          }}>
            Contact Us Today
          </Link>
        </section>

        <Footer />
      </div>
    </>
  );
}
