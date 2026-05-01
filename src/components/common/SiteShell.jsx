"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ViewTransitions } from "next-view-transitions";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import EstimateForm from "@/components/common/EstimateForm";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import LenisScroll from "@/components/common/LenisScroll";

gsap.registerPlugin(ScrollTrigger);

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith("/studio");

  useEffect(() => {
    if (isStudio) {
      return;
    }

    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
      if (window.lenis) {
        window.lenis.resize();
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [isStudio, pathname]);

  if (isStudio) {
    return children;
  }

  return (
    <ViewTransitions>
      <LenisScroll>
        <EstimateForm />

        <header>
          <Header />
        </header>

        <main>{children}</main>

        <footer>
          <Footer />
        </footer>
      </LenisScroll>
    </ViewTransitions>
  );
}
