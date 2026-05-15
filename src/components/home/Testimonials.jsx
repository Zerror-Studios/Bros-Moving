"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Image from 'next/image';
import React, { useRef } from 'react'
gsap.registerPlugin(ScrollTrigger)


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
                    end: `bottom bottom`,
                    // pin: true,
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            }
        );
    }, { scope: testimonialsContainer });

    return (
        <div ref={testimonialsContainer} id='review-section' className='w-full h-[400vh]'>
            <div className=" sticky top-0 testimonials_paren w-full h-screen padding  flex flex-col max-sm:py-24! justify-between md:justify-center gap-y-10">
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
                                        <Image fill className='cover object-top' src={item.img} alt="loading" />
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
        </div>
    )
}

export default Testimonials