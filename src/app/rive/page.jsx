"use client";

import React, { useRef } from "react";
import { useRive, Layout, Fit, Alignment } from "@rive-app/react-canvas";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const RiveBlock = ({ src, className }) => {
  const containerRef = useRef(null);

  const { RiveComponent, rive } = useRive({
    src,
    autoplay: false, // control manually
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  useGSAP(() => {
    if (!rive || !containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 50%",
      end: "bottom 30%",
      onEnter: () => rive.play(),
    });
  }, [rive]);

  return (
    <div ref={containerRef} className={`w-full h-screen center ${className}`}>
      <div className="w-full h-full">
        <RiveComponent />
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <div className="w-full pb-20 bg-[#F5F4DF]">
      {/* Intro */}
      <div className="w-full h-screen center">
        <p className="text-3xl">Scroll Down</p>
      </div>

      {/* Rive Sections */}
      <RiveBlock src="/rive/joby_rive_specs-diagram_back_desktop.riv" />
      <RiveBlock src="/rive/joby_rive_specs-diagram_performance_desktop.riv" />
      <RiveBlock src="/rive/joby_rive_specs-diagram_side_desktop.riv" />
    </div>
  );
};

export default Page;