"use client";
import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Button from "../common/Button";
import Image from "next/image";
import { RiStarLine } from "@remixicon/react";

if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

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
                                    ? Math.floor(el.innerText ) + "+"
                                    : Math.floor(el.innerText) + (target === 12 ? "+" : "");
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
                                data-target="1100"
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
                                    data-target="5"
                                    className='text-3xl md:text-5xl  font-semibold'
                                >
                                    0
                                </h2>
                                <h2
                                    className='text-3xl md:text-5xl  font-semibold'
                                >
                                    <RiStarLine />
                                </h2>
                            </div>
                            <p className='text-[#6B6E73] text-sm md:text-lg'>Customer Reviews</p>
                        </div>

                        <div>
                            <h2
                                ref={(el) => (countersRef.current[3] = el)}
                                data-target="12"
                                className='text-3xl md:text-5xl  font-semibold'
                            >
                                0
                            </h2>
                            <p className='text-[#6B6E73] text-sm md:text-lg'>Trained Movers</p>
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
                            Bros Moving Inc. is a Regina-based licensed and insured moving company
                            trusted across Saskatchewan for delivering safe, reliable, and stress-free
                            moving services. Since day one, we have proudly maintained a 5-star reputation
                            on Google through our commitment to professionalism, transparency, and customer satisfaction.
                            <br /><br />
                            Our experienced movers are highly trained to handle residential, commercial,
                            office, and long-distance moves with proper moving procedures and extra care.
                            From packing and loading to transportation and setup, we tailor every move to
                            fit your specific needs while ensuring your belongings arrive safely and on time.
                            <br /><br />
                        </p>
                    </div>

                    <Button variant="outline" onClick={() => {
                        document
                            .getElementById("review-section")
                            ?.scrollIntoView({ behavior: "smooth" });
                    }}>
                        See Customer Reviews
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ExpertSection;