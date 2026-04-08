import Hero from "@/components/hero/Hero";
import HeroIntroAds from "@/components/google-ads/HeroIntroAds";
import PricingPlans from "@/components/google-ads/PricingPlans";
import HowItWorks from "@/components/google-ads/HowItWorks";
import FaqAds from "@/components/google-ads/FaqAds";
import References from "@/components/google-ads/References";
import Image from "next/image";

export default function GoogleAdsPage() {
  return (
    <>
      <div className="w-screen overflow-x-hidden">
        <div className="font-sans w-full bg-[#222222] pb-48 h-full">
          <div className="z-[30] fixed h-screen w-full left-0 top-0">
            <Hero />
          </div>

          <main className="font-sans overflow-visible relative items-center min-h-screen grid grid-cols-1 z-30">
            <section className={`w-full h-max z-50`}>
              <HeroIntroAds />
              <PricingPlans />
              <HowItWorks />
              <FaqAds />
              <References />
            </section>
          </main>
        </div>
      </div>
    </>
  );
}
