"use client";
import { useGSAP } from '@gsap/react'
import { RiStarLine } from '@remixicon/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import SplitText from 'gsap/dist/SplitText'
import React, { useRef } from 'react'
if (typeof window !== 'undefined') { gsap.registerPlugin(SplitText, ScrollTrigger); }

const AboutParagraph = () => {
    useGSAP(() => {
        const split = SplitText.create(".split_para", {
            type: "words",
        });
        gsap.from(split.words, {
            opacity: .2,
            ease: "expo.out",
            duration: 0.01,
            stagger: 0.01,
            scrollTrigger: {
                trigger: ".about_para_paren",
                start: "top 70%",
                end: "top 10%",
                scrub: true
            }
        })

    });

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
                                    ? Math.floor(el.innerText) + "+"
                                    : Math.floor(el.innerText) + (target === 12 ? "+" : "");
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    });

    return (
        <>
            <div ref={sectionRef} className=" about_para_paren w-full  padding pb-0!">
                <div className=" max_width_layout w-full flex flex-col items-center text-center border-b pb-10 md:pb-20 border-black/10">
                    <h2 className='split_para text-2xl md:text-4xl font-medium md:w-[70%]'>
                        Bros Moving provides trusted residential, commercial, office, and long-distance
                        moving services across Saskatchewan and beyond. From careful packing and secure
                        transportation to unloading and setup, our experienced movers handle every
                        detail with professionalism, efficiency, and extra care to deliver a smooth
                        and stress-free moving experience.
                    </h2>
                    <div className="w-full mt-10 md:mt-20 flex items-center justify-center">
                        <div className="">
                            <h2
                                ref={(el) => (countersRef.current[0] = el)}
                                data-target="1100"
                                className='text-3xl md:text-5xl  font-semibold'>0</h2>
                            <p className='text-[#6B6E73] text-base md:text-lg   '>Moves Completed</p>
                        </div>
                        <div className=" border-l border-r border-black/10 px-5 md:px-14 mx-5 md:mx-14">
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
                            <p className='text-[#6B6E73] text-base md:text-lg   '>Customer Reviews</p>
                        </div>
                        <div className="">
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
            </div>
        </>
    )
}

export default AboutParagraph