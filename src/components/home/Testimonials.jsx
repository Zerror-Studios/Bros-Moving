"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
if (typeof window !== "undefined") {
    if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }
}


export const testimonials = [
    {
        id: 1,
        name: "Becky Lashinski",
        role: "Verified Customer",
        img: "/images/homepage/testimonials/becky.png",
        text: "These guys were on time, efficient, careful, and extremely friendly. They handled our heavy furniture perfectly and made the entire moving process smooth and stress-free.",
    },
    {
        id: 2,
        name: "Harrison",
        role: "Verified Customer",
        img: "/images/homepage/testimonials/harrison.png",
        text: "Mani and his team were professional, efficient, and incredibly careful with all of our belongings. They worked tirelessly and made our house move completely hassle-free.",
    },
    {
        id: 3,
        name: "Victoria Oppenlander",
        role: "Local Guide",
        img: "/images/homepage/testimonials/victoria.png",
        text: "Fantastic moving experience from start to finish. The team arrived prepared, communicated clearly, and handled everything with care while working quickly and professionally.",
    },
    {
        id: 4,
        name: "Rajinderpal Bhullar",
        role: "Verified Customer",
        img: "/images/homepage/testimonials/Rajinderpal.png",
        text: "The crew was super friendly and worked quickly to get everything packed and loaded safely. Every item arrived without a scratch and the service exceeded expectations.",
    },
    {
        id: 5,
        name: "Saravanan Ramachandran",
        role: "Local Guide",
        img: "/images/homepage/testimonials/Saravanan.png",
        text: "Great experience with Bros Moving during our move from Regina to Edmonton. Pickup and delivery were on time, pricing was fair, and the whole process felt seamless.",
    },
    {
        id: 6,
        name: "Carla Anderson",
        role: "Verified Customer",
        img: "/images/homepage/testimonials/Carla.png",
        text: "Bros Moving delivered excellent service with hardworking movers who completed everything faster than expected. The move even came in below the original quote.",
    },
];

const TestimonialCard = ({ item }) => (
    <div className="bg-[#F9F6F3] rounded-3xl p-6 sm:p-10 flex flex-col gap-y-6 sm:gap-y-0 justify-between w-full min-h-[280px] sm:min-h-0 sm:w-[40vw] sm:aspect-4/3">
        <div className="flex gap-x-1">
            {[...Array(5)].map((_, i) => (
                <img key={i} src="/icons/gold_star.svg" alt="star" />
            ))}
        </div>
        <p className='text-[#6B6E73] text-lg sm:text-2xl md:text-3xl'>{item.text}</p>
        <div className="flex gap-x-2 items-center">
            <div className="size-12 sm:size-14 relative center rounded-full overflow-hidden shrink-0">
                <Image fill className='cover object-top' src={item.img} alt={item.name} />
            </div>
            <div>
                <p className='text-lg sm:text-2xl font-semibold'>{item.name}</p>
                <p className='text-[#6B6E73] text-sm sm:text-base'>{item.role}</p>
            </div>
        </div>
    </div>
);

const Testimonials = () => {

    const testimonialsContainer = useRef(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile breakpoint (matches Tailwind's sm: 640px)
    useEffect(() => {
        const mql = window.matchMedia("(max-width: 639px)");
        const handleChange = (e) => setIsMobile(e.matches);
        setIsMobile(mql.matches);
        mql.addEventListener("change", handleChange);
        return () => mql.removeEventListener("change", handleChange);
    }, []);

    // GSAP horizontal scroll — only runs on desktop
    useGSAP(() => {
        if (isMobile) return;

        const container = document.querySelector(".max_width_layout");
        const slider = document.querySelector(".testimonials_slider");
        if (!container || !slider) return;

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
                    end: `bottom bottom`,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }
        );
    }, { scope: testimonialsContainer, dependencies: [isMobile] });

    return (
        <div ref={testimonialsContainer} id='review-section' className={`w-full ${isMobile ? 'h-auto' : 'h-[400vh]'}`}>
            <div className={`${isMobile ? '' : 'sticky top-0'} testimonials_paren w-full ${isMobile ? '' : 'h-screen'} padding flex flex-col py-16 sm:py-0 justify-center gap-y-8 sm:gap-y-10`}>
                <div className="w-full sm:text-center">
                    <h2 className='text-3xl md:text-5xl font-semibold'>What Our Customers Say</h2>
                    <p className='text-base leading-tight mt-2 md:text-lg text-[#6B6E73]'>Hear Directly from Our Customers About Their Smooth and Stress-Free Moving Experiences</p>
                </div>

                {/* Mobile: Swiper Slider */}
                {isMobile && (
                    <div className="w-full overflow-hidden">
                        <Swiper
                            slidesPerView={1.1}
                            spaceBetween={12}
                            className="testimonials_swiper !overflow-visible"
                        >
                            {testimonials.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <TestimonialCard item={item} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}

                {/* Desktop: GSAP horizontal scroll */}
                {!isMobile && (
                    <div className="w-full max_width_layout overflow-hidden rounded-3xl flex">
                        <div className="testimonials_slider flex gap-x-5">
                            {testimonials.map((item, i) => (
                                <TestimonialCard key={i} item={item} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Testimonials