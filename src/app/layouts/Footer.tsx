import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-1">
            <Link to={ROUTES.HOME} className="text-white text-lg font-bold tracking-tight mb-3 block">
              NOVA
            </Link>
            <p className="text-neutral-500 leading-relaxed max-w-xs">
              Designed beyond imagination. The premier next-generation smartphone experience engineered in 2026.
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-[11px]">Products</h4>
            <ul className="space-y-2.5">
              <li><a href="#nova-x" className="hover:text-white transition">NOVA X</a></li>
              <li><a href="#nova-x-pro" className="hover:text-white transition">NOVA X Pro</a></li>
              <li><a href="#nova-x-pro-max" className="hover:text-white transition">NOVA X Pro Max</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition">NOVA Watch</a></li>
              <li><a href="#ecosystem" className="hover:text-white transition">NOVA Buds</a></li>
            </ul>
          </div>

          {/* Store */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-[11px]">Store</h4>
            <ul className="space-y-2.5">
              <li><Link to={ROUTES.PRODUCTS} className="hover:text-white transition">Shop All</Link></li>
              <li><a href="#comparison" className="hover:text-white transition">Compare Models</a></li>
              <li><a href="#accessories" className="hover:text-white transition">Accessories</a></li>
              <li><a href="#trade-in" className="hover:text-white transition">Trade In</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-[11px]">Support</h4>
            <ul className="space-y-2.5">
              <li><a href="#support" className="hover:text-white transition">Contact Us</a></li>
              <li><a href="#support" className="hover:text-white transition">Warranty Policy</a></li>
              <li><a href="#support" className="hover:text-white transition">Shipping & Delivery</a></li>
              <li><a href="#support" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-[11px]">Company</h4>
            <ul className="space-y-2.5">
              <li><a href="#about" className="hover:text-white transition">About NOVA</a></li>
              <li><a href="#careers" className="hover:text-white transition">Careers</a></li>
              <li><a href="#privacy" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <p>© 2026 NOVA Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-400 cursor-pointer">Vietnam</span>
            <span className="hover:text-neutral-400 cursor-pointer">Privacy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Legal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
