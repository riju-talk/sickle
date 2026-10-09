import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Overview", href: "#hero" },
  { label: "Problem", href: "#problem" },
  { label: "Phase 1", href: "#existing" },
  { label: "Phase 2", href: "#phase2" },
  { label: "Data & Splits", href: "#phase2-data" },
  { label: "Model", href: "#phase2-model" },
  { label: "Results", href: "#phase2-results" },
  { label: "Pipeline", href: "#pipeline" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy-900/95 backdrop-blur-md" : "bg-navy-900"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <a href="#hero" className="font-heading font-bold text-lg text-brand-green tracking-wide">SICKLE++</a>
          <div className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <button key={link.label} onClick={() => handleNavClick(link.href)} className="text-xs font-semibold tracking-widest uppercase text-gray-300 hover:text-white">
                {link.label}
              </button>
            ))}
          </div>
          <button className="lg:hidden text-gray-300" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden border-t border-white/10 py-3 space-y-1">
            {links.map((link) => (
              <button key={link.label} onClick={() => handleNavClick(link.href)} className="block w-full text-left px-3 py-2 text-sm text-gray-300 hover:text-white">
                {link.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
