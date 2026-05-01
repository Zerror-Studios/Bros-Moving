"use client";
import { useQuoteStore } from '@/store/useQuoteStore';
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react'
import Button from '../common/Button';
gsap.registerPlugin(ScrollTrigger);

const highlights = [
    {
        id: 1,
        title: "5-Star Reputation Since Day One",
        description:
            "Our commitment to excellence isn't just a claim—it's documented. We've maintained a perfect 5-star Google rating by treating every box as if it were our own heritage.",
        icon: "/images/aboutpage/trust_star.svg",
    },
    {
        id: 2,
        title: "The Stress-Free Process",
        description:
            "Our kinetic methodology ensures seamless movement without the friction. From careful planning to precise execution, we handle every detail with expertise and efficiency.",
        icon: "/images/aboutpage/trust_scale.svg",
    },
    {
        id: 3,
        title: "Highly Trained Pros",
        description:
            "More than just movers, we are specialists in precision and safety. Every move is guided by structured planning, strict safety procedures, and expert handling techniques.",
        icon: "/images/aboutpage/trust_car.svg",
    },
    {
        id: 4,
        title: "Transparent Communication",
        description:
            "We understand how frustrating unexpected costs can be. That's why we operate with complete transparency—no hidden charges, no surprise fees.",
        icon: "/images/aboutpage/trust_circle.svg",
    },
];

const OurMission = () => {
    const { open } = useQuoteStore();

    const container = useRef()

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=1500",
                pin: true,
                scrub: true,
                // markers: true,
            },
        });
        if (window.innerWidth < 750) {
            tl.fromTo(
                ".mission_card",
                {
                    rotate: (i) => [15, -15, 20, -20][i],
                },
                {
                    rotate: (i) => [0, 0, 0, 0][i],
                    stagger: 0.3,
                    ease: "power3.out",
                }
            );
            tl.from(
                ".mission_card",
                {
                    y: "100vh",
                    stagger: 0.3,
                    ease: "power3.out",
                }, "<"
            );
        } else {
            tl.fromTo(
                ".mission_card",
                {
                    rotate: (i) => [15, -15, 20, -20][i],
                },
                {
                    rotate: (i) => [0, 0, 0, 0][i],
                    stagger: 0.1,
                    ease: "power3.out",
                }
            );
            tl.from(
                ".mission_card",
                {
                    x: "150vw",
                    stagger: 0.1,
                    ease: "power3.out",
                }, "<"
            );
        }
    }, { scope: container });

    return (
        <>
            <div className="w-full padding">
                <div className=" max_width_layout w-full flex flex-col md:flex-row items-stretch  relative gap-x-44">
                    <div className=" max-sm:hidden h-full absolute left-1/2 -translate-x-1/2 w-[1px] bg-black/10"></div>
                    <div className="md:w-1/2  flex flex-col justify-between">
                        <div className="">
                            <h2 className='text-3xl md:text-5xl  font-semibold w-[80%] '>Our Mission </h2>
                            <p className='text-[#6B6E73] text-base md:hidden md:text-lg mt-2 leading-tight  '>To turn the stress of relocation into the excitement of a new beginning by providing uncompromising care and precision.</p>
                            <p className='text-[#6B6E73] text-base max-sm:hidden md:text-lg mt-2 leading-tight  '>To turn the stress of relocation into the excitement of a new <br /> beginning by providing uncompromising care and precision.</p>
                        </div>
                        <div className=" space-y-5 max-sm:my-8 md:space-y-10">
                            <div className="flex items-start gap-x-4">
                                <img src="/icons/red_smile.svg" className='w-12' alt="loading" />
                                <div className="">
                                    <h3 className='text-2xl leading-none font-semibold'>Happy Faces Guaranteed</h3>
                                    <p className='text-[#6B6E73] leading-tight mt-3 md:w-[80%]'>Our success is measured in smiles. Every tailored service is designed to ensure you walk into your new home with complete peace of mind.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-x-4">
                                <img src="/icons/red_dollar.svg" className='w-12' alt="loading" />
                                <div className="">
                                    <h3 className='text-2xl leading-none font-semibold'>Competitive & Affordable</h3>
                                    <p className='text-[#6B6E73] leading-tight mt-3 md:w-[80%]'>Premium service shouldn't come with a prohibitive price tag. We offer the best value in Regina without sacrificing quality.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2  ">
                        <img src="/images/aboutpage/mission_img.png" className='w-full' alt="loading" />
                    </div>
                </div>
            </div>
            <div ref={container} className='mission_section_paren w-full relative h-screen overflow-hidden '>

                <img className='w-full h-full' src="/images/aboutpage/trust_bg.png" alt="loading" />

                <div className=" padding w-full  h-full flex gap-y-10 flex-col justify-center items-center  absolute top-0 left-0 z-10 ">
                    <div className="text-center text-white">
                        <h2 className='text-3xl md:text-5xl  font-semibold text-center '>Built on Precision & Trust</h2>
                        <p className=' text-base md:text-lg mt-2 leading-tight  '>Why thousands of families choose Bros Moving Inc. for their most important transitions.</p>
                    </div>
                    <div className=" max_width_layout relative w-full max-sm:h-[65%] flex max-sm:justify-center md:grid grid-cols-4 items-center gap-x-5">
                        {highlights.map((highlight, i) => (
                            <div key={i} className={`mission_card max-sm:absolute max-sm:w-[80vw] p-8  w-full aspect-3/4 ${highlight.className} `}>
                                <img src="/images/aboutpage/trust_card_bg.png" className=' inset-0 absolute w-full' alt="loading" />
                                <div className="relative z-10 flex flex-col justify-center gap-y-5 items-center h-full text-center w-full">
                                    <img src={highlight.icon} alt="loading" />
                                    <h3 className='text-2xl font-semibold w-[80%]'>{highlight.title}</h3>
                                    <p className='text-[#6B6E73]'>{highlight.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* <Button onClick={open} variant="white">
              Get an estimate now!
            </Button> */}
                </div>
            </div>
        </>
    )
}

export default OurMission