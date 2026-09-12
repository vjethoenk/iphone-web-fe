import React from "react";
import { FeaturedProductSection } from "./components/FeaturedProductSection";
import { ProductShowcaseSection } from "./components/ProductShowcaseSection";
import { TechnologySection } from "./components/TechnologySection";
import { CameraSection } from "./components/CameraSection";
import { PerformanceSection } from "./components/PerformanceSection";
import { EcosystemSection } from "./components/EcosystemSection";
import { CTASection } from "./components/CTASection";
import HeroBanner from "./components/HeroBanner";

export const HomePage: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      <HeroBanner />
      <FeaturedProductSection />
      <ProductShowcaseSection />
      {/* <ComparisonSection /> */}
      <TechnologySection />
      <CameraSection />
      <PerformanceSection />
      <EcosystemSection />
      <CTASection />
    </div>
  );
};
