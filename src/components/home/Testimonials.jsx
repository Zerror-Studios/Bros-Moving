"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Image from 'next/image';
import React, { useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)


const testimonials = [
    {
        name: "Greta Charles",
        role: "Studio Manager",
        image: "/images/homepage/testimonials/img1.png",
        text: "Absolutely outstanding service from start to finish. The team was efficient, careful, and incredibly professional. Everything arrived in perfect condition—highly recommended!",
    },
    {
        name: "Daniel Brooks",
        role: "Product Designer",
        image: "/images/homepage/testimonials/img2.png",
        text: "Truly impressive experience from beginning to end. The crew was punctual, attentive, and extremely professional. Every item was handled with care—would definitely recommend!",
    },
    {
        name: "Sophia Turner",
        role: "Marketing Lead",
        image: "/images/homepage/testimonials/img3.png",
        text: "Fantastic service delivered throughout the entire process. The staff was organized, responsive, and very professional. All belongings were delivered safely—highly recommended!",
    },
    {
        name: "Liam Carter",
        role: "Creative Director",
        image: "/images/homepage/testimonials/img4.png",
        text: "Exceptional support from the very beginning to completion. The team was quick, detail-oriented, and highly professional. Everything reached safely without issues—strongly recommended!",
    },
    {
        name: "Olivia Bennett",
        role: "Business Consultant",
        image: "/images/homepage/testimonials/img5.png",
        text: "Wonderful experience across the entire journey. The crew was efficient, polite, and extremely professional. All items were delivered securely and on time—highly recommended!",
    },
    {
        name: "Noah Williams",
        role: "Operations Manager",
        image: "/images/homepage/testimonials/img6.png",
        text: "Great service provided from start to finish. The team was careful, organized, and very professional. Everything was transported safely and smoothly—definitely recommended!",
    },
];
const Testimonials = () => {

    const testimonialsContainer = useRef(null);

    useGSAP(() => {
        const container = document.querySelector(".max_width_layout"); // FIXED
        const slider = document.querySelector(".testimonials_slider");

        const totalWidth = slider.scrollWidth;
        const visibleWidth = container.offsetWidth;

        const moveX = totalWidth - visibleWidth;

        gsap.to(
            slider,
            {
                x: -moveX,
                ease: "none",
                scrollTrigger: {
                    trigger: testimonialsContainer.current,
                    start: "top top",
                    end: `+=${moveX}`,
                    pin: true,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }
        );
    }, { scope: testimonialsContainer });

    return (
        <>
            <div ref={testimonialsContainer} className=" testimonials_paren w-full h-screen padding  flex flex-col max-sm:py-24! justify-between md:justify-center gap-y-10">
                <div className="w-full  md:text-center">
                    <h2 className='text-3xl md:text-5xl  font-semibold '>What Our Customers Say</h2>
                    <p className='text-base leading-tight mt-2 md:text-lg text-[#6B6E73]'>Hear Directly from Our Customers About Their Smooth and Stress-Free Moving Experiences</p>
                </div>

                <div className=" w-full max_width_layout overflow-hidden rounded-3xl flex">
                    <div className=" testimonials_slider   flex gap-x-5">
                        {testimonials.map((item, i) => (
                            <div className="bg-[#F9F6F3] rounded-3xl p-10 flex flex-col max-sm:gap-y-20 justify-between w-[90vw] md:w-[40vw] max-sm:h-[60svh] md:aspect-4/3" key={i}>
                                <div className="flex gap-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <img key={i} src="/icons/gold_star.svg" alt="loading" />
                                    ))}
                                </div>
                                <p className='text-[#6B6E73] text-2xl md:text-3xl'>{item.text}</p>

                                <div className="flex gap-x-2 items-center">
                                    <div className="size-14 relative center rounded-full overflow-hidden">
                                        <Image fill className='cover object-top' src="/images/homepage/testimonials/img1.png" alt="loading" />
                                    </div>
                                    <div className="">
                                        <p className='text-2xl  font-semibold'>{item.name}</p>
                                        <p className='text-[#6B6E73]'>{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonials