import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Search, Menu, X, User, LogOut, Shield } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useCartStore } from "@/features/cart/stores/cart.store";
import { useAuthStore, useLogout, UserRole } from "@/features/auth";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalCount());
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useLogout();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", path: ROUTES.PRODUCTS },
    { name: "iPhone", path: `${ROUTES.PRODUCTS}/iphone` },
    { name: "iPad", path: `${ROUTES.PRODUCTS}/ipad` },
    { name: "Mac", path: `${ROUTES.PRODUCTS}/mac` },
    { name: "Accessories", path: `${ROUTES.PRODUCTS}/accessories` },
  ];

  const userRoles = (user?.roles || []).map((role: any) =>
    typeof role === "string" ? role : role?.name
  );
  const isAdmin = userRoles.includes(UserRole.ADMIN);
  const isStaff = userRoles.includes(UserRole.STAFF);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-black/80 border-b border-neutral-200/50 dark:border-neutral-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to={ROUTES.HOME}
          className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2 group"
          aria-label="iPhoneStore Home"
        >
          <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-300 dark:to-white bg-clip-text text-transparent group-hover:opacity-80 transition">
            iPhone Store
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-neutral-600 dark:text-neutral-300 tracking-wide uppercase">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-black dark:hover:text-white transition duration-200"
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
          {isStaff && !isAdmin && (
            <Link
              to="/staff"
              className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              Staff
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Search products"
            className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition p-1"
          >
            <Search className="w-4 h-4" />
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300 hidden sm:inline-block">
                {user?.username}
              </span>
              <button
                onClick={logout}
                title="Đăng xuất"
                className="text-neutral-600 dark:text-neutral-300 hover:text-red-600 dark:hover:text-red-400 transition p-1"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              aria-label="Account login"
              className="text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition p-1"
            >
              <User className="w-4 h-4" />
            </Link>
          )}

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
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-medium text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition"
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-bold text-blue-600 dark:text-blue-400"
            >
              Admin Dashboard
            </Link>
          )}
          {isStaff && !isAdmin && (
            <Link
              to="/staff"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-lg font-bold text-emerald-600 dark:text-emerald-400"
            >
              Staff Portal
            </Link>
          )}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="text-sm font-medium text-red-600 dark:text-red-400"
              >
                Đăng xuất ({user?.username})
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-black"
              >
                Tài khoản (Đăng nhập)
              </Link>
            )}
            <span className="text-xs text-neutral-400">Vietnam (VND)</span>
          </div>
        </div>
      )}
    </header>
  );
};
