import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  UserCheck,
  Settings,
  Apple,
  Search,
  Bell,
  ChevronDown,
  Sparkles,
  Smartphone,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const sidebarNavigation: NavigationItem[] = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: Smartphone },
  { name: "Categories", href: "/admin/categories", icon: Package },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart, badge: "12" },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Users", href: "/admin/users", icon: UserCheck },
  { name: "Settings", href: "/admin/settings", icon: Settings },
  
];

const settingsNavigation = [
  { name: "Colors", href: "/admin/settings/colors" },
  { name: "Storages", href: "/admin/settings/storages" },
  { name: "Banners", href: "/admin/settings/banners" },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Header */}
      <div className="flex h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-40 px-4 lg:px-6 justify-between items-center shadow-xs">
        {/* Left Branding */}
        <div className="flex items-center gap-3">
          <Link
            to="/admin"
            className="flex items-center gap-2.5 group transition-transform active:scale-95"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600 p-0.5 shadow-md shadow-indigo-500/20">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Apple className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
              </div>
            </div>
            <div>
              <span className="font-bold text-slate-900 tracking-tight text-base flex items-center gap-1.5">
                iPhone Store <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-600 border border-indigo-200">Admin</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Global Quick Search & User Profile */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm, đơn hàng..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition-all"
            />
          </div>

          <button
            type="button"
            className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600"></span>
          </button>

          <div className="h-4 w-[1px] bg-slate-200"></div>

          {/* User badge */}
          <div className="flex items-center gap-2.5 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-xs">
              AD
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-800 leading-tight">Admin Console</p>
              <p className="text-[10px] text-slate-500">admin@iphonestore.com</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-slate-200 bg-slate-50/70 flex-shrink-0 hidden md:flex flex-col justify-between p-4">
          <div className="space-y-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 px-3 mb-2">
                Main Menu
              </p>
              <nav className="space-y-1">
                {sidebarNavigation.map((item) => {
                  const isActive =
                    location.pathname === item.href ||
                    (item.href !== "/admin" && location.pathname.startsWith(item.href));
                  const Icon = item.icon;

                  const isSettings = item.href === "/admin/settings";

                  return (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group",
                        isActive
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-200/80 shadow-xs"
                          : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/60"
                        )}
                      >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            "w-4 h-4 transition-colors",
                            isActive
                              ? "text-indigo-600"
                              : "text-slate-400 group-hover:text-slate-700"
                          )}
                        />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                            isActive
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                      </Link>
                      {isSettings && isActive && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-indigo-200 pl-3">
                          {settingsNavigation.map((subItem) => {
                            const isSubItemActive = location.pathname === subItem.href;
                            return <Link key={subItem.href} to={subItem.href} className={cn("block rounded-lg px-3 py-2 text-xs font-medium transition-colors", isSubItemActive ? "bg-indigo-100 text-indigo-700" : "text-slate-500 hover:bg-slate-200/60 hover:text-slate-900")}>{subItem.name}</Link>;
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Sidebar Footer info card */}
          <div className="rounded-xl p-3 bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span className="text-xs font-semibold text-slate-800">System Live</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-snug">
              API endpoint: <code className="text-[10px] text-indigo-600 font-mono">localhost:8080</code>
            </p>
          </div>
        </aside>

        {/* Content Outlet Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/40 flex flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
