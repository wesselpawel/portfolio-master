"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Don't show footer on admin pages, login pages, etc.
  const hideFooterRoutes = ["/admin", "/login", "/register", "/user"];

  const shouldHideFooter = hideFooterRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
