import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from '../components/CustomCursor';
import Footer from '../sections/Footer';

import imgVikash from '../assets/Vikash.jpeg';
import imgAbhishek from '../assets/Abhishek.jpeg';
import imgHariom from '../assets/Hariom.jpeg';
import imgAnshi from '../assets/Anshi.jpeg';
import imgSidharth from '../assets/Sidharth.jpeg';
import imgVansh from '../assets/Vansh.jpeg';

const foundingMembersRow1 = [
  {
    name: 'Vikash Sharma',
    role: 'Founder & CEO',
    image: imgVikash,
    bio: "Visionary leader with a deep technical root in full-stack development, driving PartanX's mission to redefine the digital landscape with innovation and precision.",
    linkedin: 'https://www.linkedin.com/in/vikash-sharma-291366306/'
  },
  {
    name: 'Abhishek Shahi',
    role: 'Co-Founder',
    image: imgAbhishek,
    bio: "Technological architect and co-pilot at PartanX, specializing in building high-performance systems and managing the core technical vision of the agency.",
    objectPosition: 'center center',
    linkedin: 'https://www.linkedin.com/in/abhishek-shahi-ab5a8a366?utm_source=share_via&utm_content=profile&utm_medium=member_android'
  }
];

const foundingMembersRow2 = [
  {
    name: 'Hariom Dhar Dwivedi',
    role: 'Business Analytics & Legal Advisor',
    image: imgHariom,
    bio: 'Strategic thinker bridging the gap between data analytics and legal compliance, ensuring PartanX operates with precision and sustainable growth.',
    linkedin: 'https://www.linkedin.com/in/hariom-dhar-dwivedi-989678368?utm_source=share_via&utm_content=profile&utm_medium=member_android'
  },
  {
    name: 'Anshi Rao',
    role: 'Sales Manager',
    image: imgAnshi,
    bio: 'Dynamic relationship builder focused on identifying client needs and driving growth through strategic partnerships and value-driven sales solutions.',
    linkedin: 'https://www.linkedin.com/in/anshi-rao-68173b349?utm_source=share_via&utm_content=profile&utm_medium=member_android'
  },
  {
    name: 'Sidharth Singh',
    role: 'Social Media Manager',
    image: imgSidharth,
    bio: 'Creative strategist dedicated to building impactful digital presences and high-engagement social campaigns that connect brands with their audience.',
    linkedin: 'https://www.linkedin.com/company/partanx/'
  },
  {
    name: 'Vansh Maurya',
    role: 'Lead Developer',
    image: imgVansh,
    bio: 'Full-stack specialist and coding lead, focusing on core application architecture and high-performance backend systems.',
    linkedin: 'https://www.linkedin.com/in/vansh-maurya-7742b8315/'
  }
];
const TeamCard = ({ member, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.1 }}
    transition={{ duration: 0.6, delay: i * 0.15 }}
    style={{
      background: 'rgba(6,6,14,0.6)',
      border: '1px solid rgba(255,255,255,0.05)',
      borderRadius: '1rem',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}
  >
    <div style={{ height: '280px', overflow: 'hidden' }}>
      <img
        src={member.image}
        alt={member.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: member.objectPosition || 'center 10%',
          transition: 'transform 0.5s ease',
          cursor: 'pointer',
          display: 'block'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      />
    </div>
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: '1.4rem', color: 'var(--clr-text)', marginBottom: '0.25rem' }}>{member.name}</h3>
          <div style={{ color: 'var(--clr-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.05em', marginBottom: '1rem' }}>
            {member.role}
          </div>
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#0077b5',
              background: 'rgba(255,255,255,0.05)',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '6px',
              transition: 'all 0.3s ease',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#0077b5';
              e.currentTarget.style.color = 'white';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.color = '#0077b5';
            }}
            title="LinkedIn Profile"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        )}
      </div>
      <p style={{ color: 'var(--clr-text-muted)', lineHeight: 1.6, fontSize: '0.95rem' }}>
        {member.bio}
      </p>
    </div>
  </motion.div>
);
export default function AboutPage() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

        <main style={{ flexGrow: 1 }}>

          {/* Section 1: Company Introduction */}
          <section style={{ padding: '6rem 2rem 4rem', textAlign: 'center', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
              zIndex: -1, borderRadius: '50%'
            }} />
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Company Introduction</div>
              <h1 className="h1" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '1.5rem 0' }}>
                We Are <span className="text-gradient">PartanX</span>
              </h1>
              <p style={{ color: 'var(--clr-text-muted)', maxWidth: 700, margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8 }}>
                PartanX is a forward-thinking digital agency specializing in high-performance web development,
                interactive 3D design, and data-driven social media management. We don't just build websites
                or run campaigns; we craft immersive digital ecosystems that empower brands to thrive in the modern era.
              </p>
            </motion.div>
          </section>

          {/* Section 2: Establishment */}
          <section className="container" style={{ padding: '4rem 2rem' }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                borderRadius: '1.5rem',
                padding: '4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', zIndex: 0 }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div className="section-label">Our Story</div>
                <h2 className="h2" style={{ margin: '1rem 0' }}>How It All <span style={{ color: '#06b6d4' }}>Began</span></h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--clr-text-muted)', lineHeight: 1.8, maxWidth: '800px' }}>
                  <p>
                    Established in November 2025 with a vision to break the mold of template-driven websites, PartanX started as a passion project
                    between tech enthusiasts who believed the web should be an exciting place.
                  </p>
                  <p>
                    From a small remote desk, we quickly grew into a collective of developers, designers, and strategists.
                    Today, we partner with clients worldwide, bringing their boldest ideas to life through cutting-edge code,
                    creative direction, and impactful social strategies.
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 3: Founding Members */}
          <section className="container" style={{ padding: '4rem 2rem 8rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="section-label" style={{ justifyContent: 'center' }}>Meet The Team</div>
              <h2 className="h2" style={{ marginTop: '1rem' }}>Founding <span className="text-gradient">Members</span></h2>
            </div>

            {/* Row 1: 2 Members (Centered) */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2.5rem',
              marginBottom: '2.5rem'
            }}>
              {foundingMembersRow1.map((member, i) => (
                <div key={member.name} style={{ width: '100%', maxWidth: '400px' }}>
                  <TeamCard member={member} i={i} />
                </div>
              ))}
            </div>

            {/* Row 2: 3 Members (Centered) */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '2.5rem'
            }}>
              {foundingMembersRow2.map((member, i) => (
                <div key={member.name} style={{ width: '100%', maxWidth: '350px' }}>
                  <TeamCard member={member} i={i + 2} />
                </div>
              ))}
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
