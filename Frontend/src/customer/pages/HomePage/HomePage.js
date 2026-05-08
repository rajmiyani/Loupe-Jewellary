import React, { useContext, useEffect, useRef, useState } from "react";
import MainCarousel from "../../components/Carousel/MainCarousel";
import HomeSectionCarousel from "../../components/HomeSectionCarousel/HomeSectionCarousel";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalContext } from "../../../context/modal/modalContext";
import HomeSectionCategory from "../../components/Section_card/HomeSectionCategory";
import SpotlightCTA from "./components/SpotlightCTA";
import AnimatedStats from "./components/AnimatedStats";
import CraftsmanshipSection from "./components/CraftsmanshipSection";
import BespokeServices from "./components/BespokeServices";
import FeaturedCollections from "./components/FeaturedCollections";
import MetalSelector from "./components/MetalSelector";
import SocialLookbook from "./components/SocialLookbook";

const HomePage = () => {
  const [hoverFirst, setHoverFirst] = useState(false);
  const [hoverSecond, setHoverSecond] = useState(false);
  const [hoverThird, setHoverThird] = useState(false);
  const location = useLocation();
  const modal = useContext(ModalContext);
  const navigate = useNavigate();

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
    }, { threshold: 0.18 });
    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="page-fade" onLoad={() => {
      if (location.pathname === "/login" || location.pathname === "/register") {
        modal.openModal();
      }
    }}>
      <div className="zoom-in">
        <MainCarousel />
      </div>

      {/* Hero spotlight CTA */}
      <div className="px-5 lg:px-10 mt-10 reveal">
        <SpotlightCTA />
      </div>

      <div className="space-y-10 py-20 flex flex-col justify-center px-5 lg:px-10">

        <HomeSectionCarousel
          sectionLabel={"Best Sellers"}
          sectionName={"Best of Loupe"}
          sectionDisc={
            "Browse through your favorite categories. We've got them all!"
          }
          _id="best-of-loupe"
        />



        <div className="reveal">
          <HomeSectionCategory />
        </div>

        <HomeSectionCarousel
          sectionName={"New Arrivals"}
          sectionLabel={"New Arrivals"}
          sectionDisc={"Our latest releases, just for you !!"}
          _id="new-arrivals"
        />

        {/* New Bespoke Services Section */}
        <div className="reveal">
          <BespokeServices />
        </div>

        {/* Luxury Social Lookbook */}
        <div className="reveal my-20">
          <SocialLookbook />
        </div>

        <div className="flex justify-center items-center px-5 reveal">
          <div className="w-full h-[70vh] flex justify-center items-center gap-5 flex-wrap">
            <img
              onClick={() => navigate('/all-jewellery/category/necklace')}
              src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711733524/dailwear-jewellery_ti8wdt.webp"
              alt="necklace"
              className="w-5/12 h-full object-contain rounded-lg cursor-pointer flex-grow"
            />
            <img
              onClick={() => navigate('/gold/earrings/stud?type=gold')}
              src="https://res.cloudinary.com/deq0hxr3t/image/upload/v1711733523/latest-earrings_osmidc.webp"
              alt="earrings"
              className="w-5/12 h-full object-contain rounded-md cursor-pointer flex-grow"
            />
          </div>
        </div>

        {/* Animated stats section */}
        <div className="reveal">
          <AnimatedStats />
        </div>

        <HomeSectionCarousel
          sectionName={"Recommended for you"}
          sectionLabel={"Recommended"}
          sectionDisc={
            "Discover products tailored to your preferences and interests!"
          }
          _id="reccomanded"
        />
        {/* <HomeSectionCarousel data={best_sellers} sectionName={"Best of Loupe"} sectionDisc={"Browse through your favorite categories. We've got them all!"}/> */}
      </div>
    </div>
  );
};

export default HomePage;
