import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useCartStore } from "@/features/cart/stores/cart.store";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalCount());
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: ROUTES.PRODUCTS },
    { name: "Iphone", path: `${ROUTES.PRODUCTS}/nova-x` },
    { name: "iPad", path: `${ROUTES.PRODUCTS}/nova-x-pro` },
    { name: "Mac", path: "#comparison" },
    { name: "Accessories", path: "#support" }, 
    { name: "Support", path: "#support" }, 
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-neutral-200/50 dark:border-neutral-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2 group"
          aria-label="Iphone Home"
        >
          <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-300 dark:to-white bg-clip-text text-transparent group-hover:opacity-80 transition">
            Iphone Store
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-600 dark:text-neutral-300 tracking-wide uppercase">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className="hover:text-black dark:hover:text-white transition duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <button
            aria-label="Search products"
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition p-1"
          >
            <Search className="w-4 h-4" />
          </button>

          <Link
            to={ROUTES.LOGIN}
            aria-label="Account login"
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition p-1 hidden sm:block"
          >
            <User className="w-4 h-4" />
          </Link>

          <button
            onClick={() => navigate(ROUTES.CART)}
            aria-label={`Shopping cart with ${totalCartItems} items`}
            className="relative text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition p-1"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                {totalCartItems}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition p-1"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-6 py-6 space-y-4 animate-fade-in">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <Link
              to={ROUTES.LOGIN}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black"
            >
              Account
            </Link>
            <span className="text-xs text-neutral-400">Vietnam (VND)</span>
          </div>
        </div>
      )}
    </header>
  );
};
