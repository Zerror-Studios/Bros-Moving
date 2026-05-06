"use client";
import React from 'react'
import Button from '../common/Button';
import { useQuoteStore } from '@/store/useQuoteStore';
import Image from 'next/image';

export const features = [
    {
        id: 1,
        title: "Professional & trained movers",
        icon: "/icons/why_choose/people.svg",
    },
    {
        id: 2,
        title: "Fully equipped trucks",
        icon: "/icons/why_choose/truck.svg",
    },
    {
        id: 3,
        title: "Transparent pricing (no hidden fees)",
        icon: "/icons/why_choose/dollar.svg",
    },
    {
        id: 4,
        title: "On-time guaranteed service",
        icon: "/icons/why_choose/clock.svg",
    },
    {
        id: 5,
        title: "Careful handling of belongings",
        icon: "/icons/why_choose/care.svg",
    },
    {
        id: 6,
        title: "Customers get free insurance",
        icon: "/icons/why_choose/protection.svg",
    },
];

const WhyChooseSection = () => {
    const { open } = useQuoteStore();
    return (
        <div className='w-full padding py-12! md:py-24! bg-[#F9F6F3] '>
            <div className="w-full  max_width_layout flex flex-col-reverse max-sm:gap-y-10 md:flex-row items-stretch   relative gap-x-44   ">
                <div className=" max-sm:hidden h-full absolute left-1/2 -translate-x-1/2 w-[1px] bg-black/10"></div>
                <div className=" w-full md:w-1/2  ">
                    <Image
                        src="/images/homepage/why_choose.png"
                        alt="Why choose Bros Moving"
                        width={800}
                        height={600}
                        className="w-full h-auto"
                    />
                </div>
                <div className=" w-full md:w-1/2 flex flex-col justify-between">
                    <div className="">
                        <h2 className='text-3xl md:text-5xl  font-semibold md:w-[80%] '>Why Choose Bro's Moving?</h2>
                        <p className='text-[#6B6E73] text-base md:text-lg mt-2 leading-tight  '>Reliable moving services built on care, efficiency, and clear <br /> communication.</p>
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
                        Get an estimate now!
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseSection