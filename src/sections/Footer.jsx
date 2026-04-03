export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-copy">
          © {year} <span style={{ color: 'var(--clr-primary-light)' }}>PARTANX</span> — All rights reserved
        </div>

        <div className="footer-links">
          {['Privacy', 'Terms', 'Instagram', 'Twitter', 'LinkedIn'].map((l) => (
            <a key={l} href="#">{l}</a>
          ))}
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--clr-text-muted)' }}>
          Built with ❤️ & Three.js
        </div>
      </div>
    </footer>
  );
}
