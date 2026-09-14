import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

type FooterLink = { label: string; href: string; to?: string };
type FooterColumn = { title: string; links: FooterLink[] };

const COLUMNS: FooterColumn[] = [
  {
    title: "Sản phẩm",
    links: [
      { label: "iPhone", href: "#iphone", to: ROUTES.PRODUCTS },
      { label: "Mac", href: "#mac" },
      { label: "iPad", href: "#ipad" },
      { label: "Watch", href: "#watch" },
      { label: "AirPods", href: "#airpods" },
      { label: "Phụ kiện", href: "#accessories" },
    ],
  },
  {
    title: "Cửa hàng",
    links: [
      { label: "Tìm cửa hàng", href: "#find-store" },
      { label: "Genius Bar", href: "#genius" },
      { label: "Today at Apple", href: "#today" },
      { label: "Thu cũ đổi mới", href: "#trade-in" },
      { label: "Kiểm tra đơn hàng", href: "#order" },
    ],
  },
  {
    title: "Dịch vụ",
    links: [
      { label: "iCloud+", href: "#icloud" },
      { label: "Apple Music", href: "#apple-music" },
      { label: "Apple TV+", href: "#apple-tv" },
      { label: "Apple Pay", href: "#apple-pay" },
      { label: "Hỗ trợ", href: "#support" },
    ],
  },
  {
    title: "Công ty",
    links: [
      { label: "Tin tức", href: "#newsroom" },
      { label: "Tuyển dụng", href: "#careers" },
      { label: "Nhà đầu tư", href: "#investors" },
      { label: "Đạo đức & Tuân thủ", href: "#ethics" },
      { label: "Liên hệ", href: "#contact" },
    ],
  },
];

const SOCIALS = [
  { label: "Facebook", href: "#facebook" },
  { label: "Instagram", href: "#instagram" },
  { label: "YouTube", href: "#youtube" },
  { label: "X", href: "#x" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-black text-white overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[80%]  blur-3xl" />

      {/* Big brand wordmark */}
      <div className="relative max-w-[1280px] mx-auto px-6 pt-20 pb-10">
        <div className="flex items-end justify-between flex-wrap gap-6 mb-16">
          <h2
            className="text-[14vw] md:text-[10vw] lg:text-[8rem] font-semibold leading-none tracking-tighter
                       bg-gradient-to-b from-white via-white/80 to-white/20 bg-clip-text text-transparent select-none"
          >
            Apple
          </h2>
          <div className="text-right text-[12px] text-white/40 max-w-[240px] leading-relaxed">
            <p>Designed in California.</p>
            <p>Made for the world.</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent mb-14" />

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-12">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-medium mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3.5 text-[14px]">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/60">
                          →
                        </span>
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="group inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors duration-300"
                      >
                        <span className="relative">
                          {link.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
                        </span>
                        <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white/60">
                          →
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Socials + Newsletter */}
        <div className="mt-16 pt-10 border-t border-white/10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              Theo dõi chúng tôi
            </p>
            <div className="flex flex-wrap gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="px-4 py-2 rounded-full border border-white/15 text-[12px] text-white/70
                             hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="md:text-right">
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 mb-4">
              Đăng ký nhận tin
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 border-b border-white/20 focus-within:border-white transition-colors pb-2 max-w-[320px] w-full md:ml-auto"
            >
              <input
                type="email"
                placeholder="Email của bạn"
                className="flex-1 bg-transparent text-[14px] text-white placeholder-white/30 outline-none"
              />
              <button
                type="submit"
                className="text-[12px] uppercase tracking-wider text-white/70 hover:text-white transition-colors"
              >
                Gửi →
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-white/40">
          <p>© 2026 Apple Inc. Bảo lưu mọi quyền.</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href="#privacy" className="hover:text-white transition-colors">Quyền riêng tư</a>
            <a href="#terms" className="hover:text-white transition-colors">Điều khoản</a>
            <a href="#sales" className="hover:text-white transition-colors">Bán hàng & Hoàn tiền</a>
            <a href="#legal" className="hover:text-white transition-colors">Pháp lý</a>
            <a href="#sitemap" className="hover:text-white transition-colors">Sơ đồ</a>
          </div>
          <span className="hover:text-white cursor-pointer transition-colors">🇻🇳 Việt Nam</span>
        </div>
      </div>
    </footer>
  );
};
