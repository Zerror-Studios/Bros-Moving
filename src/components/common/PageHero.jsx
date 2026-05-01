"use client";
import React, { useRef, useState } from 'react'
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
gsap.registerPlugin(SplitText);

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
            <div ref={container} className="w-full p-3 md:p-5 center relative md:text-center">
                <div className=" hero_text max_width_layout opacity-0  flex flex-col items-center absolute z-20 bottom-20 md:bottom-32 text-[#F9F6F3]">
                    <h1 className=' hero_title  text-4xl md:text-7xl max-sm:w-[90vw]  font-semibold'>{title}</h1>
                    <p className=' hero_desc mt-2 leading-tight max-sm:w-[90vw]  text-base md:text-lg '>{description}</p>
                </div>
                <Image width={1920} height={1080} onLoadingComplete={() => setDeskLoaded(true)} className={` max-sm:hidden w-full opacity-0 relative z-10 transition-all duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`} src={image} alt="loading" />
                <Image height={1920} width={1080} onLoadingComplete={() => setMobLoaded(true)} className={` md:hidden w-full opacity-0 relative z-10 transition-all duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`} src={mobImage} alt="loading" />
                <div className={`w-full absolute  pointer-events-none transition-all  skeleton duration-300 inset-0 p-3 md:p-5 ${isLoaded ? "opacity-0" : "opacity-100"} `}>
                    <img className='w-full max-sm:hidden' src="/images/page_hero_skeleton.png" alt="loading" />
                    <img className='w-full md:hidden' src="/images/mob_page_hero_skeleton.png" alt="loading" />
                </div>
            </div>
        </>
    )
}

export default PageHero