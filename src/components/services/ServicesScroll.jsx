"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react'
import Button from '../common/Button';
import { useQuoteStore } from '@/store/useQuoteStore';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

export const SERVICES = [
    {
        id: "residential-moving",
        title: "Residential Moving",
        desc: "Apartments, houses, condos — we handle it all with care.",
        image: "/images/servicepage/service1.png",
        innerServices: [
            "Pre-move survey and planning",
            "Packing of household items (room-wise)",
            "Safe loading and transportation",
            "Unloading and placement at new home",
            "Furniture dismantling & reassembly",
            "Fragile item protection (glass, electronics)",
            "Optional insurance coverage",
            "Unpacking and setup assistance"
        ]
    },

    {
        id: "commercial-moving",
        title: "Commercial Moving",
        desc: "Efficient office relocation with minimal downtime.",
        image: "/images/servicepage/service2.png",
        innerServices: [
            "Office relocation planning & coordination",
            "Packing of office equipment and documents",
            "IT equipment handling (computers, servers)",
            "Minimal downtime execution",
            "Labeling and inventory management",
            "Secure transportation",
            "Reinstallation and setup",
            "After-move support and setup"
        ]
    },

    {
        id: "packing-unpacking",
        title: "Packing & Unpacking",
        desc: "High-quality materials and expert care for all items.",
        image: "/images/servicepage/service3.png",
        innerServices: [
            "High-quality packing material",
            "Professional wrapping techniques",
            "Fragile item specialty packing",
            "Organization by room",
            "Full or partial packing options",
            "Careful unpacking at destination",
            "Disposable packing materials"
        ]
    },

    {
        id: "storage-services",
        title: "Storage Services",
        desc: "Safe, secure, and flexible storage solutions.",
        image: "/images/servicepage/service4.png",
        innerServices: [
            "Short-term and long-term storage options",
            "Secure, climate-controlled units",
            "24/7 surveillance and security systems",
            "Inventory tracking and management",
            "Easy access and retrieval",
            "Pest-free storage units",
            "Suitable for household and commercial goods"
        ]
    },

    {
        id: "specialty-moving",
        title: "Specialty Moving",
        desc: "Handling delicate, valuable, and unique items with care.",
        image: "/images/servicepage/service5.png",
        innerServices: [
            "Piano and heavy item moving",
            "Artwork and antiques handling",
            "Vehicle transportation",
            "Sensitive equipment relocation",
            "Custom packing solutions",
            "Extra safety measures for high-value items",
            "White-glove moving service"
        ]
    }
];

const ServicesScroll = () => {
    const { open } = useQuoteStore();
    const container = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            defaults: { ease: "linear" },
            scrollTrigger: {
                trigger: ".left_scroll",
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                // markers: true,
            },
        });

        tl.to(".serv_img1", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        })
            .to(".serv_img2", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }, "<")
            .to(".serv_img2", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            })
            .to(".serv_img3", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }, "<")
            .to(".serv_img3", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            })
            .to(".serv_img4", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }, "<")
            .to(".serv_img4", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            })
            .to(".serv_img5", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            }, "<")
    }, { scope: container });

    return (
        <>
            <div ref={container} className="service-scroll-paren w-full padding py-0!">
                <div className="w-full max_width_layout">
                    <div className="w-full flex items-stretch  relative gap-x-32 ">
                        <div className=" left_scroll w-full md:w-1/2  flex flex-col space-y-10 md:space-y-24 py-10 md:py-24 justify-between">
                            {SERVICES.map((service, i) => (
                                <div key={i} className="  space-y-5 md:space-y-10">
                                    <div className="">
                                        <h2 className='text-3xl md:text-5xl  font-semibold w-[80%] '>{service.title}</h2>
                                        <p className='text-[#6B6E73] text-base md:text-lg mt-2  '>{service.desc}</p>
                                    </div>
                                    <div className="">
                                        {service.innerServices.map((feature, i) => (
                                            <div key={i} className="flex items-center hover:pl-3 py-2 md:py-3 rounded-lg hover:bg-[#F9F6F3] transition-all duration-300 hover:text-[#F5344F]  gap-x-4">
                                                <img src="/icons/red_check.svg" className='' alt="loading" />
                                                <p className='text-base md:text-lg font-semibold leading-none'>{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button onClick={open} variant='outline'> Get an estimate now!</Button>
                                </div>
                            ))}
                        </div>
                        <div className="w-1/2 max-sm:hidden sticky flex items-center top-0 h-screen  ">
                            <Image height={600} width={500} preload src={SERVICES[0].image} style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }} className='  serv_img1 w-full absolute' alt="loading" />
                            <Image height={600} width={500} preload src={SERVICES[1].image} style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }} className='serv_img2 w-full absolute' alt="loading" />
                            <Image height={600} width={500} preload src={SERVICES[2].image} style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }} className='serv_img3 w-full absolute' alt="loading" />
                            <Image height={600} width={500} preload src={SERVICES[3].image} style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }} className='serv_img4 w-full absolute' alt="loading" />
                            <Image height={600} width={500} preload src={SERVICES[4].image} style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }} className='serv_img5 w-full absolute' alt="loading" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServicesScroll