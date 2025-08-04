import React from "react";
import HeroSection from "../components/HeroSection";
import CategoriesShow from "../components/CategoriesShow";
import BestSeller from "../components/BestSeller";
import LatestCollection from "../components/LatestCollection";
import OurPolicy from "../components/OurPolicy";
import NewsletterBox from "../components/Newsletter";

const Home = () => {
  return (
    <>
      <HeroSection />
      <CategoriesShow/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </>
  );
};

export default Home;
