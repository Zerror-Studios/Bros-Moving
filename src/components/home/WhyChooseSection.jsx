"use client";
import React from 'react'
import Button from '../common/Button';
import { useQuoteStore } from '@/store/useQuoteStore';
import Image from 'next/image';

const features = [
    {
        id: 1,
        title: "Professional & Trained Movers",
        icon: "/icons/why_choose/people.svg",
    },
    {
        id: 2,
        title: "Fully Equipped Trucks",
        icon: "/icons/why_choose/truck.svg",
    },
    {
        id: 3,
        title: "Transparent Pricing",
        icon: "/icons/why_choose/dollar.svg",
    },
    {
        id: 4,
        title: "On-Time Guaranteed Service",
        icon: "/icons/why_choose/clock.svg",
    },
    {
        id: 5,
        title: "Careful Handling of Belongings",
        icon: "/icons/why_choose/care.svg",
    },
];

const WhyChooseSection = () => {
    const { open } = useQuoteStore();
    return (
        <div className='w-full padding py-12! md:py-24! bg-[#F9F6F3] '>
            <div className="w-full  max_width_layout flex flex-col-reverse max-sm:gap-y-10 md:flex-row items-stretch   relative gap-x-44   ">
                <div className=" max-sm:hidden h-full absolute left-1/2 -translate-x-1/2 w-[1px] bg-black/10"></div>
                <div className=" w-full relative rounded-xl overflow-hidden md:w-1/2  ">
                    <div className="subtract absolute z-10 pointer-events-none rotate-90 scale-y-[-1] w-[70vw] md:w-[30vw] h-6 md:h-10 bg-[#F9F6F3] -right-[37%] top-1/2 -translate-y-1/2"></div>
                    <Image
                        src="/images/homepage/why_choose.webp"
                        alt="Why choose Bros Moving"
                        fill
                        className="cover"
                    />
                </div>
                <div className=" w-full md:w-1/2 gap-y-8 flex flex-col justify-between">
                    <div>
                        <h2 className='text-3xl md:text-5xl font-semibold md:w-[80%]'>
                            Why Choose Bro&apos;s Moving?
                        </h2>

                        <p className='text-[#6B6E73] text-base md:text-lg mt-2 leading-tight'>
                            From careful packing to on-time delivery, we provide reliable moving
                            services designed to make every relocation smooth, safe, and stress-free.
                        </p>
                    </div>
                    <div className="max-sm:my-4">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center hover:pl-3 py-1 md:py-3 hover:bg-[#ffffff] rounded-lg transition-all duration-300 hover:text-[#F5344F]  gap-x-4">
                                <div className="size-12 relative">
                                    <Image
                                        fill
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="cover"
                                    />
                                </div>
                                <p className='text-base md:text-lg font-semibold'>{feature.title}</p>

                            </div>
                        ))}
                    </div>
                    <Button variant="outline" onClick={open}>
                        Get a Free Quote Today
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseSection