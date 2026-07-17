"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react'
import Button from '../common/Button';
import { useQuoteStore } from '@/store/useQuoteStore';
import Image from 'next/image';
if (typeof window !== 'undefined') { gsap.registerPlugin(ScrollTrigger); }

const SERVICES = [
    {
        id: "residential-moving",
        title: "Residential Moving",
        desc: "Trusted residential moving services for homes, condos, apartments, and seasonal properties across Saskatchewan, Manitoba, and Ontario.",
        image: "/images/servicepage/resedential.png",
        innerServices: [
            "Apartment and condo moving",
            "Household and seasonal property relocation",
            "Safe packing and unpacking",
            "Furniture wrapping and padding",
            "Heavy item hauling with extra care",
            "Secure transportation services",
            "Loading and unloading assistance",
            "On-time delivery and setup support",
        ],
    },

    {
        id: "commercial-moving",
        title: "Commercial Moving",
        desc: "Organized and efficient commercial moving services for retail stores, warehouses, food stores, and business spaces.",
        image: "/images/servicepage/commercial.png",
        innerServices: [
            "Retail store relocation",
            "Warehouse moving services",
            "Food store and commercial space moving",
            "Strategic move planning and execution",
            "Organized packing and transportation",
            "Safe handling of business equipment",
            "Smooth office-to-office transitions",
            "Experienced commercial moving team",
        ],
    },

    {
        id: "office-moving",
        title: "Office Moving",
        desc: "Professional office moving solutions for confidential documents, electronics, desks, and office equipment.",
        image: "/images/servicepage/office.png",
        innerServices: [
            "Confidential document packing",
            "Computer and electronics moving",
            "Desk and office furniture relocation",
            "Professional labeling systems",
            "Protective packing materials",
            "Quick office relocation services",
            "Safe transportation of office assets",
            "Minimal downtime moving process",
        ],
    },

    {
        id: "long-distance-moving",
        title: "Long Distance Moving",
        desc: "Reliable long-distance moving services across all provinces in Canada with stress-free transportation and handling.",
        image: "/images/servicepage/long_distance.png",
        innerServices: [
            "Province-to-province moving",
            "Packing and unpacking assistance",
            "Loading and unloading services",
            "Professional labeling solutions",
            "Secure transportation services",
            "Experienced movers and drivers",
            "Safe delivery across Canada",
            "Stress-free relocation experience",
        ],
    },

    {
        id: "specialty-item-moving",
        title: "Specialty Item Moving",
        desc: "Expert handling for pianos, antiques, appliances, hot tubs, restaurant equipment, and valuable specialty items.",
        image: "/images/servicepage/speciality.png",
        innerServices: [
            "Piano moving services",
            "Heavy appliance relocation",
            "Antique and Italian decor handling",
            "Fragile electronics transportation",
            "Hot tub and bathtub moving",
            "Restaurant oven and equipment moving",
            "Custom wrapping and protection",
            "Experienced specialty item movers",
        ],
    },

    {
        id: "packing-unpacking",
        title: "Packing & Unpacking",
        desc: "Professional packing and unpacking services using high-quality materials to keep your belongings safe and organized.",
        image: "/images/servicepage/packing.png",
        innerServices: [
            "Full-service packing solutions",
            "Fragile item wrapping and protection",
            "High-quality packing materials",
            "Professional box labeling",
            "Organized unpacking services",
            "Furniture wrapping assistance",
            "Safe handling of valuables",
            "Packing material cleanup support",
        ],
    },

    {
        id: "senior-moving",
        title: "Senior Moving",
        desc: "Friendly and respectful moving services for senior citizens with extra care and a 10% first-move discount.",
        image: "/images/servicepage/senior.png",
        innerServices: [
            "Retirement home relocation",
            "Senior care residence moving",
            "Careful packing and transportation",
            "Friendly and supportive movers",
            "Safe handling of personal belongings",
            "Stress-free moving assistance",
            "Extra care for seniors",
            "10% discount on first move",
        ],
    },

    {
        id: "white-glove-delivery",
        title: "White Glove Furniture Delivery",
        desc: "Premium white glove delivery services for furniture, appliances, and electronics with assembly and placement included.",
        image: "/images/servicepage/white_glove.png",
        innerServices: [
            "Furniture delivery services",
            "Appliance and electronics delivery",
            "Professional furniture assembly",
            "In-home placement assistance",
            "Packaging garbage removal",
            "Modern tools and equipment",
            "Trusted by furniture stores",
            "Careful handling of new purchases",
        ],
    },

    {
        id: "junk-removal",
        title: "Junk Removal",
        desc: "Affordable junk removal and waste management services included with your move to save time, effort, and money.",
        image: "/images/servicepage/junk_removal.png",
        innerServices: [
            "Affordable junk removal services",
            "Waste management solutions",
            "Post-move cleanup assistance",
            "Furniture and junk hauling",
            "Convenient disposal services",
            "Time-saving moving support",
            "Residential junk removal",
            "Commercial junk disposal",
        ],
    },
];

const ServicesScroll = () => {
    const { open } = useQuoteStore();
    const container = useRef();

    useGSAP(() => {
        const images = gsap.utils.toArray(".service_image");

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

        images.forEach((img, index) => {
            if (index === 0) return;

            tl.to(images[index - 1], {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            })
                .to(
                    img,
                    {
                        clipPath:
                            "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    },
                    "<"
                );
        });
    }, { scope: container });

    return (
        <div
            ref={container}
            className="service-scroll-paren w-full padding py-0!"
        >
            <div className="w-full max_width_layout">
                <div className="w-full flex items-stretch relative gap-x-32">

                    {/* LEFT CONTENT */}
                    <div className="left_scroll w-full md:w-1/2 flex flex-col space-y-10 md:space-y-24 py-10 md:py-24 justify-between">
                        {SERVICES.map((service, i) => (
                            <div key={i} className="space-y-5 md:space-y-10">

                                <div>
                                    <h2 className="text-3xl md:text-5xl font-semibold w-[80%]">
                                        {service.title}
                                    </h2>

                                    <p className="text-[#6B6E73] text-base md:text-lg mt-2">
                                        {service.desc}
                                    </p>
                                </div>

                                <div>
                                    {service.innerServices.map((feature, j) => (
                                        <div
                                            key={j}
                                            className="flex items-center hover:pl-3 py-2 md:py-3 rounded-lg hover:bg-[#F9F6F3] transition-all duration-300 hover:text-[#F5344F] gap-x-4"
                                        >
                                            <img
                                                src="/icons/red_check.svg"
                                                alt="loading"
                                            />

                                            <p className="text-base md:text-lg font-semibold leading-none">
                                                {feature}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Button onClick={open} variant="outline">
                                    Get an estimate now!
                                </Button>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT IMAGES */}
                    <div className="w-1/2 max-sm:hidden sticky flex items-center top-0 h-screen overflow-hidden">
                        <div className="relative w-full rounded-2xl overflow-hidden aspect-square">
                            <div className="subtract absolute z-10 pointer-events-none rotate-90  w-[70vw] md:w-[25vw] h-6 md:h-10 left-[-30%] bg-[#fff] top-1/2 -translate-y-1/2"></div>
                            {SERVICES.map((service, i) => (
                                <Image
                                    key={i}
                                    fill
                                    preload
                                    src={service.image}
                                    alt={service.title}
                                    className="service_image  absolute cover"
                                    style={{
                                        clipPath:
                                            i === 0
                                                ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                                                : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesScroll;