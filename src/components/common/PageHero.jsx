"use client";
import React, { useRef, useState } from 'react'
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
if (typeof window !== 'undefined') { gsap.registerPlugin(SplitText); }

const PageHero = ({ title, description, image, mobImage }) => {

    const [deskLoaded, setDeskLoaded] = useState(false);
    const [mobLoaded, setMobLoaded] = useState(false);
    const isLoaded = deskLoaded || mobLoaded;

    const container = useRef();

    useGSAP(() => {
        const titleSplit = new SplitText(".hero_title", {
            type: "lines",
            linesClass: "line"
        });

        const descSplit = new SplitText(".hero_desc", {
            type: "lines",
            linesClass: "line"
        });

        const wrapLines = (lines) => {
            lines.forEach(line => {
                const wrapper = document.createElement("div");
                wrapper.classList.add("line-parent");

                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });
        };

        wrapLines(titleSplit.lines);
        wrapLines(descSplit.lines);

        gsap.set([...titleSplit.lines, ...descSplit.lines], {
            yPercent: 100
        });
        gsap.set(".hero_text", {
            opacity: 1
        });

        if (!isLoaded) return;

        gsap.to(titleSplit.lines, {
            yPercent: -8,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.4
        });

        gsap.to(descSplit.lines, {
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.6
        });

    }, { scope: container, dependencies: [isLoaded] });

    return (
        <>
            <div ref={container} className="w-full p-3 md:p-5 center h-screen relative text-center">
                <div className={` ${isLoaded ? "" : "skeleton"} w-full h-full overflow-hidden relative  text-center center rounded-2xl md:rounded-4xl`}>
                    <div className=" hero_text max_width_layout opacity-0  flex flex-col items-center absolute z-20 bottom-20 md:bottom-32 text-[#F9F6F3]">
                        <h1 aria-hidden="true" className=' hero_title  text-4xl md:text-7xl max-sm:w-[90vw]  font-semibold'>{title}</h1>
                        <p aria-hidden="true" className=' hero_desc mt-2 leading-tight max-sm:w-[90vw]  text-base md:text-lg '>{description}</p>
                    </div>
                    <Image fill onLoad={() => setDeskLoaded(true)} className={` max-sm:hidden cover w-full opacity-0 relative z-10 transition-all duration-300 ${isLoaded ? "opacity-100!" : "opacity-0"}`} src={image} alt="loading" />
                    <Image fill onLoad={() => setMobLoaded(true)} className={` md:hidden cover w-full opacity-0 relative z-10 transition-all duration-300 ${isLoaded ? "opacity-100!" : "opacity-0"}`} src={mobImage} alt="loading" />
                    <div className="subtract absolute z-10 pointer-events-none w-[70vw] md:w-[80vw] h-6 md:h-10 bg-white bottom-[-1px] left-1/2 -translate-x-1/2"></div>
                </div>
            </div>
        </>
    )
}

export default PageHero