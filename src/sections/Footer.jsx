export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          © {year} <span style={{ color: 'var(--clr-primary-light)' }}>PARTANX TECHNOLOGIES</span> — All rights reserved
        </div>

        <div className="footer-links">
          {[
            { name: 'Instagram', url: 'https://www.instagram.com/tech.partanx' },
            { name: 'Twitter', url: 'https://x.com/PartanX_' },
            { name: 'LinkedIn', url: 'https://www.linkedin.com/company/partanx/' },
            { name: 'Privacy', url: '#' },
            { name: 'Terms', url: '#' }
          ].map((l) => (
            <a key={l.name} href={l.url} target={l.url !== '#' ? "_blank" : undefined} rel={l.url !== '#' ? "noopener noreferrer" : undefined}>
              {l.name}
            </a>
          ))}
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--clr-text-muted)' }}>
          Built with ❤️ & Three.js
        </div>
      </div>
    </footer>
  );
}
