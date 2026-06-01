"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";
const PHONE = "(832) 605-0493";
const LOGO_URL = "/images/logo.png";

type NavLink = { label: string; href: string };
type NavMenu = { label: string; href?: string; items?: NavLink[] };

const menus: NavMenu[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    items: [
      { label: "Interior Painting", href: "/interior-painting" },
      { label: "Exterior Painting", href: "/exterior-painting" },
      { label: "Cabinet Painting", href: "/cabinet-painting" },
      { label: "Drywall Repair", href: "/interior-painting/drywall-repair" },
      { label: "Fence Staining", href: "/exterior-painting/fence-staining" },
      { label: "Stucco Maintenance", href: "/exterior-painting/stucco-maintenance" },
      { label: "All Painting Services", href: "/services" },
    ],
  },
  {
    label: "Pricing",
    items: [
      { label: "Pricing Overview", href: "/pricing" },
      { label: "Interior Prices", href: "/pricing/interior-prices" },
      { label: "Exterior Prices", href: "/pricing/exterior-prices" },
      { label: "Cabinet Prices", href: "/pricing/cabinet-prices" },
    ],
  },
  {
    label: "Portfolio",
    items: [
      { label: "All Projects", href: "/portfolio" },
      { label: "Interior", href: "/portfolio/interior-painting" },
      { label: "Exterior", href: "/portfolio/exterior-painting" },
      { label: "Cabinet", href: "/portfolio/cabinet-painting" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Our Story", href: "/our-story" },
      { label: "Our Vision", href: "/our-vision" },
      { label: "Core Values", href: "/core-values" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Warranty", href: "/warranty" },
      { label: "Service Areas", href: "/service-areas" },
      { label: "Paint It Forward", href: "/paint-it-forward" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Financing", href: "/financing" },
      { label: "Color Tips", href: "/color-consultation" },
      { label: "What to Expect", href: "/project-expectations" },
      { label: "Blog", href: "/blog" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(label);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 150);
  };
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Trust / rating strip */}
      <div className="bg-[#1a2e44] text-white text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
          <Link href="/testimonials" className="flex items-center gap-1.5 hover:text-white/80">
            <span className="text-yellow-400 tracking-tight" aria-hidden>★★★★★</span>
            <span className="font-semibold">5.0</span>
            <span className="hidden sm:inline text-white/70">· Trusted by Fort Bend homeowners</span>
          </Link>
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="tel:+18326050493" className="hover:text-white/80 font-medium">(832) 605-0493</a>
            <Link href="/contact" className="hidden sm:inline bg-[#4B83B2] hover:bg-[#3a6a96] px-3 py-1 rounded font-semibold transition-colors">
              Free Estimate
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src={LOGO_URL}
              alt="The Proud Paintbrush logo"
              width={220}
              height={80}
              className="h-20 w-auto"
              priority
              quality={90}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-5">
            {menus.map((menu) =>
              menu.items ? (
                <div
                  key={menu.label}
                  className="relative"
                  onMouseEnter={() => open(menu.label)}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    className="flex items-center gap-1 text-[#1a2e44] hover:text-[#4B83B2] font-medium text-sm transition-colors"
                    onClick={() => setOpenMenu((o) => (o === menu.label ? null : menu.label))}
                    aria-expanded={openMenu === menu.label}
                  >
                    {menu.label}
                    <Chevron open={openMenu === menu.label} />
                  </button>
                  {openMenu === menu.label && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                      {menu.items.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2 text-sm text-[#1a2e44] hover:bg-[#f8f9fa] hover:text-[#4B83B2] transition-colors"
                          onClick={() => setOpenMenu(null)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={menu.label}
                  href={menu.href!}
                  className="text-[#1a2e44] hover:text-[#4B83B2] font-medium text-sm transition-colors"
                >
                  {menu.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop right side */}
          <div className="hidden xl:flex items-center gap-4">
            <a
              href="tel:+18326050493"
              className="text-[#1a2e44] font-semibold text-sm hover:text-[#4B83B2] transition-colors"
            >
              {PHONE}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4B83B2] hover:bg-[#3a6a96] text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              Schedule Your Estimate
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="xl:hidden p-2 text-[#1a2e44] hover:text-[#4B83B2] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="xl:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {menus.map((menu) =>
            menu.items ? (
              <div key={menu.label}>
                <button
                  className="flex items-center justify-between w-full text-[#1a2e44] font-medium py-2 hover:text-[#4B83B2] transition-colors"
                  onClick={() =>
                    setMobileExpanded((m) => (m === menu.label ? null : menu.label))
                  }
                  aria-expanded={mobileExpanded === menu.label}
                >
                  {menu.label}
                  <Chevron open={mobileExpanded === menu.label} />
                </button>
                {mobileExpanded === menu.label && (
                  <div className="pl-4 space-y-1 mt-1 mb-2">
                    {menu.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block text-sm text-[#4B83B2] py-1.5 hover:text-[#3a6a96] transition-colors"
                        onClick={closeMobile}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={menu.label}
                href={menu.href!}
                className="block text-[#1a2e44] font-medium py-2 hover:text-[#4B83B2] transition-colors"
                onClick={closeMobile}
              >
                {menu.label}
              </Link>
            )
          )}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <a href="tel:+18326050493" className="block text-[#1a2e44] font-semibold text-sm">
              {PHONE}
            </a>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-[#4B83B2] hover:bg-[#3a6a96] text-white font-semibold text-sm px-5 py-3 rounded-lg text-center transition-colors"
            >
              Schedule Your Estimate
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
