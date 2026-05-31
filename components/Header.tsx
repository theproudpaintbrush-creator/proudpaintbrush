"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";
const PHONE = "(832) 605-0493";
const LOGO_URL = "/images/logo.png";

const services = [
  { label: "Interior Painting", href: "/interior-painting" },
  { label: "Exterior Painting", href: "/exterior-painting" },
  { label: "Cabinet Painting", href: "/cabinet-painting" },
  { label: "Drywall Repair", href: "/interior-painting/drywall-repair" },
  { label: "Fence Staining", href: "/exterior-painting/fence-staining" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/our-story" },
  { label: "Blog", href: "/blog" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Service Areas", href: "/exterior-painting" },
  { label: "FAQ", href: "/faq" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
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
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-[#1a2e44] hover:text-[#4B83B2] font-medium text-sm transition-colors"
            >
              Home
            </Link>

            {/* Services dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-1 text-[#1a2e44] hover:text-[#4B83B2] font-medium text-sm transition-colors"
                onMouseEnter={openServices}
                onMouseLeave={closeServices}
                onClick={() => setServicesOpen((o) => !o)}
                aria-expanded={servicesOpen}
              >
                Services
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {servicesOpen && (
                <div
                  className="absolute top-full left-0 w-52 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-4 py-2 text-sm text-[#1a2e44] hover:bg-[#f8f9fa] hover:text-[#4B83B2] transition-colors"
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1a2e44] hover:text-[#4B83B2] font-medium text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right side */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:+18326050493`}
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
            className="lg:hidden p-2 text-[#1a2e44] hover:text-[#4B83B2] transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          <Link
            href="/"
            className="block text-[#1a2e44] font-medium py-2 hover:text-[#4B83B2] transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Home
          </Link>
          <div>
            <button
              className="flex items-center justify-between w-full text-[#1a2e44] font-medium py-2 hover:text-[#4B83B2] transition-colors"
              onClick={() => setServicesOpen((o) => !o)}
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {servicesOpen && (
              <div className="pl-4 space-y-2 mt-1">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="block text-sm text-[#4B83B2] py-1 hover:text-[#3a6a96] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-[#1a2e44] font-medium py-2 hover:text-[#4B83B2] transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <a
              href="tel:+18326050493"
              className="block text-[#1a2e44] font-semibold text-sm"
            >
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
