import React, { useContext, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ModalContext } from "../../../context/modal/modalContext";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";

// New Premium Components
import HeroSection from "./components/HeroSection";
import CollectionCircles from "./components/CollectionCircles";
import BestSellerSection from "./components/BestSellerSection";
import StyleStory from "./components/StyleStory";
import TrustBanner from "./components/TrustBanner";
import SocialFeed from "./components/SocialFeed";

const HomePage = () => {
  const location = useLocation();
  const modal = useContext(ModalContext);

  // Intersection Observer for scroll reveal
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const nodes = containerRef.current.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: 0.15 });
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="page-fade overflow-x-hidden"
      onLoad={() => {
        if (location.pathname === "/login" || location.pathname === "/register") {
          modal.openModal();
        }
      }}
    >
      {/* Hero Section */}
      <section>
        <HeroSection />
      </section>

      {/* 2. Shop by Category (Auto Slider) */}
      <section className="reveal">
        <CollectionCircles />
      </section>

      {/* 3. Best Seller Slider */}
      <section className="reveal">
        <BestSellerSection />
      </section>

      {/* Style Stories - Lifestyle Grid */}
      <section className="reveal">
        <StyleStory />
      </section>

      {/* 4. Brand Trust Features */}
      <section className="reveal">
        <TrustBanner />
      </section>

      {/* 5. Social Feed */}
      <section className="reveal">
        <SocialFeed />
      </section>
    </div>
  );
};

export default HomePage;
