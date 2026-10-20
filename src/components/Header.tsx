import { useState, useEffect } from "react";
import { Menu, X, Calendar, MapPin, Users, HelpCircle, Newspaper, Info, Bookmark, ExternalLink } from "lucide-react";
import { OFFICIAL_REGISTRATION_URL } from "../data/scheduleData";

interface HeaderProps {
  bookmarkedCount: number;
  onOpenBookmarks: () => void;
  onOpenRegister: () => void;
}

export default function Header({ bookmarkedCount, onOpenBookmarks, onOpenRegister }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Sobre", href: "#sobre", icon: Info },
    { label: "Ciência Delas", href: "#ciencia-delas", icon: Sparkles, highlight: true },
    { label: "Programação", href: "#programacao", icon: Calendar },
    { label: "Palestrantes", href: "#palestrantes", icon: Users },
    { label: "Notícias", href: "#noticias", icon: Newspaper },
    { label: "Parceiros", href: "#parceiros", icon: Calendar },
    { label: "FAQ", href: "#faq", icon: HelpCircle },
    { label: "Local", href: "#localizacao", icon: MapPin },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5"
            : "bg-white/90 backdrop-blur-sm border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Brand wordmark / Logo */}
            <a
              href="#inicio"
              className="flex items-center gap-3 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#083D77] rounded-lg"
            >
              <img
                src="/logos/logo-unitins-quadrada.png"
                alt="UNITINS"
                className="w-9 h-9 object-contain rounded-md group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-[#083D77] whitespace-nowrap leading-tight">
                  X Mostra de Ciência e Tecnologia
                </span>
                <span className="text-[11px] text-slate-500 font-medium tracking-wide">
                  UNITINS · Augustinópolis & Araguatins
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`transition-colors whitespace-nowrap shrink-0 relative py-1 ${
                    item.highlight
                      ? "text-pink-600 font-bold hover:text-pink-700 flex items-center gap-1 border-b-2 border-pink-500"
                      : "hover:text-[#083D77] hover:border-b-2 hover:border-[#38B6FF]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions (Bookmarks & Direct Registration Link) */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onOpenBookmarks}
                aria-label="Ver meu roteiro de atividades salvas"
                className="relative inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-[#083D77] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#083D77]"
                title="Meu Roteiro"
              >
                <Bookmark className="w-5 h-5" />
                {bookmarkedCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#38B6FF] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
                    {bookmarkedCount}
                  </span>
                )}
              </button>

              <a
                href={OFFICIAL_REGISTRATION_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#083D77] hover:bg-[#062c57] active:scale-[0.98] rounded-lg transition-all shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#083D77] focus-visible:ring-offset-2 whitespace-nowrap"
              >
                <span>Inscrever-se</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#083D77]"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 flex flex-col p-6 animate-slide-in-right">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <img
                  src="/logos/logo-unitins-quadrada.png"
                  alt="UNITINS"
                  className="w-7 h-7 object-contain"
                />
                <span className="font-bold text-sm text-[#083D77]">X Mostra C&T 2026</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:text-[#083D77] hover:bg-slate-50 transition-colors"
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookmarks();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#083D77] bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Bookmark className="w-4 h-4" />
                <span>Meu Roteiro ({bookmarkedCount} salvas)</span>
              </button>

              <a
                href={OFFICIAL_REGISTRATION_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#083D77] hover:bg-[#062c57] rounded-lg transition-colors shadow-xs"
              >
                <span>Inscrever-se no Evento</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
