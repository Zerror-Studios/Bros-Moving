"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Button from "../common/Button";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const HOTSPOTS = [
    {
        id: 1,
        title: "Regina",
        subtitle: "Saskatchewan, CA",
        top: "40%",
        left: "35%",
    },
    {
        id: 2,
        title: "Winnipeg",
        subtitle: "Manitoba, CA", // ✅ fixed
        top: "30%",
        left: "30%",
    },
    {
        id: 3,
        title: "Alberta",
        subtitle: "Canada", // ✅ cleaner (province)
        top: "43%",
        left: "45%",
    },
];
const ExpertSection = () => {
    const [activeId, setActiveId] = useState(null);
    const sectionRef = useRef(null);
    const countersRef = useRef([]);

    useGSAP(() => {
        const ctx = gsap.context(() => {
            countersRef.current.forEach((el) => {
                const target = +el.getAttribute("data-target");

                gsap.fromTo(
                    el,
                    { innerText: 0 },
                    {
                        innerText: target,
                        duration: 2,
                        ease: "power2.out",
                        snap: { innerText: 1 },
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                        onUpdate: function () {
                            el.innerText =
                                target >= 1000
                                    ? Math.floor(el.innerText / 1000) + "K+"
                                    : Math.floor(el.innerText) + (target === 15 ? "+" : "");
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    });

    return (
        <div ref={sectionRef} className='w-full padding py-0! my-8 md:my-14'>
            <div className="max_width_layout w-full flex flex-col-reverse max-sm:gap-y-10 md:flex-row items-stretch relative gap-x-32">

                <div className=" max-sm:hidden h-full absolute left-1/2 -translate-x-1/2 w-[1px] bg-black/10"></div>

                <div className=" w-full md:w-1/2 relative" >

                    {HOTSPOTS.map((item) => (
                        <div
                            key={item.id}
                            style={{ top: item.top, left: item.left }}
                            className={`absolute z-50 flex items-center gap-x-2 ${activeId === item.id ? "z-100" : ""}`}
                            onMouseLeave={() => setActiveId(null)}
                        >

                            {/* DOT */}
                            <div
                                className="relative  cursor-pointer flex items-center justify-center"
                                onMouseEnter={() => setActiveId(item.id)}
                            >
                                {/* Ripple */}
                                <span className="absolute inline-flex size-4 rounded-full bg-white opacity-75 animate-ping"></span>
                                <span className="relative size-4 bg-white text-black/50 rounded-full flex items-center justify-center text-sm">
                                    +
                                </span>
                            </div>

                            {/* TOOLTIP */}
                            <div
                                className={`transition-all duration-300 p-3 bg-white rounded-lg shadow-md
                                        ${activeId === item.id
                                        ? "opacity-100 translate-y-0"
                                        : "opacity-0 translate-y-3 pointer-events-none"
                                    }`}
                            >
                                <p className="font-medium text-xl">{item.title}</p>
                                <p className="text-[#6B6E73]">{item.subtitle}</p>
                            </div>
                        </div>
                    ))}

                    <Image width={800} height={600} className='' src="/images/homepage/expert_map.webp" alt="loading" />

                    <div className="w-full mt-10 flex items-center justify-between">

                        <div>
                            <h2
                                ref={(el) => (countersRef.current[0] = el)}
                                data-target="12000"
                                className='text-3xl md:text-5xl  font-semibold'
                            >
                                0
                            </h2>
                            <p className='text-[#6B6E73] text-sm md:text-lg'>Moves Completed</p>
                        </div>

                        <div>
                            <div className="flex gap-x-1">
                                <h2
                                    ref={(el) => (countersRef.current[1] = el)}
                                    data-target="24"
                                    className='text-3xl md:text-5xl  font-semibold'
                                >
                                    0
                                </h2>
                                <h2
                                    className='text-3xl md:text-5xl  font-semibold'
                                >
                                    /
                                </h2>
                                <h2
                                    ref={(el) => (countersRef.current[2] = el)}
                                    data-target="7"
                                    className='text-3xl md:text-5xl  font-semibold'
                                >
                                    0
                                </h2>
                            </div>
                            <p className='text-[#6B6E73] text-sm md:text-lg'>Customer Support</p>
                        </div>

                        <div>
                            <h2
                                ref={(el) => (countersRef.current[3] = el)}
                                data-target="15"
                                className='text-3xl md:text-5xl  font-semibold'
                            >
                                0
                            </h2>
                            <p className='text-[#6B6E73] text-sm md:text-lg'>Years Experience</p>
                        </div>

                    </div>
                </div>

                {/* RIGHT */}
                <div className=" w-full md:w-1/2 flex flex-col max-sm:space-y-5 justify-between">
                    <div>
                        <h2 className='  text-3xl md:text-5xl  font-semibold'>
                            Expert Movers Serving Regina, Winnipeg & Alberta
                        </h2>
                        <p className='text-[#6B6E73] text-base md:text-lg mt-2 md:mt-8'>
                            At Bro’s Moving, we proudly deliver reliable, stress-free moving services across Regina, Winnipeg, Saskatchewan, and Alberta. Whether you're relocating your home, office, or handling a long-distance move, our experienced team ensures every step is handled with care and precision.
                            <br /><br />
                            From careful packing and secure transportation to timely delivery and setup, we focus on making your move smooth and hassle-free. Our commitment to professionalism, transparent pricing, and customer satisfaction has made us a trusted choice for individuals and businesses alike.
                        </p>
                    </div>

                    <Button variant="outline" href={"/about"}>
                        Discover More
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExpertSection;