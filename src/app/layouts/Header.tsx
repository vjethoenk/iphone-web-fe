import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Menu, X, User, LogOut, Shield, Smartphone, ShoppingCart } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { useCartStore } from "@/features/cart/stores/cart.store";
import { useAuthStore, useLogout, UserRole } from "@/features/auth";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartItems = useCartStore((state) => state.getTotalCount());
  const { user, isAuthenticated } = useAuthStore();
  const { logout } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: ROUTES.HOME },
    { name: "iPhone", path: `${ROUTES.PRODUCTS}?category=iphone` },
    { name: "iPad", path: `${ROUTES.PRODUCTS}?category=ipad` },
    { name: "Mac", path: `${ROUTES.PRODUCTS}?category=macbook` },
    { name: "Accessories", path: `${ROUTES.PRODUCTS}?category=accessories` },
  ];

  const userRoles = (user?.roles || []).map((role) =>
    typeof role === "string" ? role : role?.name
  );
  const isAdmin = userRoles.includes(UserRole.ADMIN);
  const isStaff = userRoles.includes(UserRole.STAFF);

  const isLinkActive = (linkPath: string) => {
    const currentPath = `${location.pathname}${location.search}`;
    return currentPath === linkPath;
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/85 border-b border-slate-200/70 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to={ROUTES.HOME}
          className="flex items-center gap-2.5 group"
          aria-label="iPhoneStore Home"
        >
          {/* Phone Icon Badge — slate tone */}
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center shadow-md shadow-slate-900/20 group-hover:shadow-lg group-hover:shadow-slate-900/30 group-hover:scale-105 transition-all duration-300">
            <Smartphone className="w-5 h-5 text-white" strokeWidth={2.2} />
            {/* Tiny notch/dot detail */}
            <span className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-white/60" />
          </div>

          <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-slate-700 transition-colors">
            iPhone<span className="text-slate-500">Store</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-600 tracking-wide uppercase">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                className={`relative py-2 transition-colors duration-200 ${
                  active ? "text-slate-900" : "hover:text-slate-900"
                }`}
              >
                {link.name}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-slate-900 transition-all duration-300 ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/admin"
              className="text-slate-900 font-bold hover:text-slate-700 flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
          {isStaff && !isAdmin && (
            <Link
              to="/staff"
              className="text-emerald-700 font-bold hover:text-emerald-800 flex items-center gap-1 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              Staff
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Search products"
            className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(ROUTES.CART)}
            aria-label={`Shopping cart with ${totalCartItems} items`}
            className="relative p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalCartItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-br from-slate-900 to-slate-700 text-white text-[10px] font-bold flex items-center justify-center shadow-md shadow-slate-900/30 ring-2 ring-white">
                {totalCartItems > 99 ? "99+" : totalCartItems}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-slate-50 border border-slate-200">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-slate-700 max-w-[100px] truncate">
                  {user?.username}
                </span>
              </div>
              <button
                onClick={logout}
                title="Đăng xuất"
                className="p-2 rounded-full text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-all"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              aria-label="Account login"
              className="p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              <User className="w-4 h-4" />
            </Link>
          )}



          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 rounded-full text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl px-6 py-6 space-y-1 animate-in slide-in-from-top-2 duration-300">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);

            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  active
                    ? "text-slate-900 bg-slate-100 border-l-2 border-slate-900"
                    : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-all"
            >
              <Shield className="w-4 h-4" />
              Admin Dashboard
            </Link>
          )}
          {isStaff && !isAdmin && (
            <Link
              to="/staff"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-all"
            >
              <Shield className="w-4 h-4" />
              Staff Portal
            </Link>
          )}

          <div className="pt-4 mt-2 border-t border-slate-200 flex items-center justify-between">
            {isAuthenticated ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Đăng xuất
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <User className="w-4 h-4" />
                Đăng nhập
              </Link>
            )}
            <span className="text-xs font-medium text-slate-400">Vietnam (VND)</span>
          </div>
        </div>
      )}
    </header>
  );
};