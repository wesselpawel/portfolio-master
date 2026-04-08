"use client";
import { useEffect, useState } from "react";
import useWindowDimensions from "../useWidth";
import { usePathname } from "next/navigation";
import ProductsWide from "./ProductsWide";
import ProductsMobile from "./ProductsMobile";
import HeaderComponent from "./HeaderComponent";
export default function Header({ jobsList }: { jobsList: any[] }) {
  const { width } = useWindowDimensions();
  const [hovered, setHovered] = useState("");
  const [productsOpen, setProductsOpen] = useState(false);
  const handleMouseEnter = (target: string) => {
    setHovered(target);
  };
  const handleMouseLeave = () => {
    setHovered("");
  };

  const [menuShow, setMenuShow] = useState(false);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let previousScrollPosition = window.scrollY;

    const scrollListener = () => {
      const currentScrollPosition = window.scrollY;
      const isScrolledDown = previousScrollPosition < currentScrollPosition;
      previousScrollPosition = currentScrollPosition;

      setShowHeader(
        isScrolledDown && currentScrollPosition > 100 ? false : true
      );
    };

    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);
  const pathname = usePathname();
  return (
    <div className={``}>
      {/* PRODUCTS TAB OPENED WIDE */}
      <ProductsWide
        width={width}
        setProductsOpen={setProductsOpen}
        jobs={jobsList}
        hovered={hovered}
        handleMouseLeave={handleMouseLeave}
        handleMouseEnter={handleMouseEnter}
      />
      {/* PRODUCTS TAB OPENED MOBILE */}
      <ProductsMobile
        jobs={jobsList}
        menuShow={menuShow}
        setProductsOpen={setProductsOpen}
        setMenuShow={setMenuShow}
        productsOpen={productsOpen}
        setHovered={setHovered}
      />
      {/* HEADER */}
      <HeaderComponent
        showHeader={showHeader}
        menuShow={menuShow}
        hovered={hovered}
        productsOpen={productsOpen}
        setProductsOpen={setProductsOpen}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
        width={width}
        setMenuShow={setMenuShow}
        setHovered={setHovered}
      />
    </div>
  );
}
