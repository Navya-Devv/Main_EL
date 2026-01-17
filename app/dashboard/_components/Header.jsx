"use client";

import {
  SignInButton,
  UserButton,
  SignedOut,
  SignedIn,
} from "@clerk/nextjs";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Target } from "lucide-react";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [controlNavbar]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "unset";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about-us", label: "About Us" },
    { href: "/dashboard/placement", label: "Placement Predictor" },
  ];

  return (
    <>
      {/* Header */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50
          bg-background/90 backdrop-blur-md
          border-b border-border
          transition-transform duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2"
            aria-label="Lakshya AI Home"
          >
            <Target className="text-primary" size={28} />
            <span className="text-xl font-bold text-foreground tracking-wide">
              Lakshya AI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-2">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                path={path}
                href={item.href}
                label={item.label}
                onClick={closeMobileMenu}
              />
            ))}
          </nav>

          {/* Desktop Auth */}
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background md:hidden pt-20">
          <nav className="flex flex-col gap-4 px-6">
            {navItems.map((item) => (
              <NavItem
                key={item.href}
                path={path}
                href={item.href}
                label={item.label}
                mobile
                onClick={closeMobileMenu}
              />
            ))}

            <div className="mt-6 border-t border-border pt-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    onClick={closeMobileMenu}
                    className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function NavItem({ path, href, label, mobile, onClick }) {
  const isActive = path === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        rounded-md transition-colors
        ${mobile ? "text-lg py-3 text-center" : "px-4 py-2"}
        ${
          isActive
            ? "bg-accent text-primary font-medium"
            : "text-muted-foreground hover:text-primary hover:bg-accent"
        }
      `}
    >
      {label}
    </Link>
  );
}

export default Header;
