import { Link } from 'next-view-transitions';
import React from 'react'
import Button from '../common/Button';
import Image from 'next/image';

const services = [
    {
        id: 1,
        title: "Residential Moving",
        description: "Apartments, houses, condos — we handle it all with care.",
        unfill_icon: "/icons/services/home_unfill.svg",
        fill_icon: "/icons/services/home_fill.svg",
        className: "col-span-3",
        img: "/images/blogpage/blog1.png"
    },
    {
        id: 2,
        title: "Commercial Moving",
        description: "White-glove relocation for your most precious spaces.",
        unfill_icon: "/icons/services/apartment_unfill.svg",
        fill_icon: "/icons/services/apartment_fill.svg",
        className: "col-span-3",
        img: "/images/blogpage/blog2.png"
    },
    {
        id: 3,
        title: "Packing & Unpacking",
        description: "We pack it right and unpack it fast, so you can settle in without hassle.",
        unfill_icon: "/icons/services/box_unfill.svg",
        fill_icon: "/icons/services/box_fill.svg",
        className: "col-span-2",
        img: "/images/blogpage/blog4.png"
    },
    {
        id: 4,
        title: "Storage Services",
        description: "Safe, secure, and flexible storage you can trust.",
        unfill_icon: "/icons/services/shelf_unfill.svg",
        fill_icon: "/icons/services/shelf_fill.svg",
        className: "col-span-2",
        img: "/images/blogpage/blog3.png"
    },
    {
        id: 5,
        title: "Specialty Moving",
        description: "Expert care for your most valuable and delicate items.",
        unfill_icon: "/icons/services/calender_unfill.svg",
        fill_icon: "/icons/services/calender_fill.svg",
        className: "col-span-2",
        img: "/images/blogpage/blog5.png"
    },
];

const ServicesSection = () => {
    return (
        <>
            <div className="w-full  mt-14 md:mt-32 padding  bg-[#F9F6F3]">
                <div className=" max_width_layout w-full md:flex items-end">
                    <h2 className='text-3xl md:text-5xl  font-semibold mb-5 md:w-[80%] '>Smart Logistics Solutions <br /> for Every Move</h2>
                    <Button variant="outline" href={"/services"}>
                        Explore All Services
                    </Button>
                </div>

                <div className=" max-sm:pb-5 scroller_none max_width_layout w-full flex max-sm:overflow-x-scroll md:grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-8 mt-8 md:mt-12">
                    {services.map((service, i) => (
                        <div key={i} className={` group shrink-0 relative overflow-hidden w-[90%] md:w-full h-[45vh] md:h-[50vh] group hover:text-white transition-colors duration-300 bg-white p-10 rounded-2xl ${service.className}`}>
                            {service.img && (
                                <div className="absolute group-hover:opacity-100 brightness-90 transition-opacity duration-300 opacity-0  inset-0 cover">
                                    <Image fill src={service.img} className='cover' alt="loading" />
                                </div>
                            ) 
                            }
                            <div className=" relative h-full w-full flex flex-col justify-between">
                                <div className="size-24  relative center">
                                    <Image fill src={service.unfill_icon} className=' opacity-0 w-full' alt="loading" />
                                    <Image fill src={service.unfill_icon} className=' opacity-100 group-hover:opacity-0 transition-opacity duration-300  absolute w-full' alt="loading" />
                                    <Image fill src={service.fill_icon} className=' opacity-0 group-hover:opacity-100 transition-opacity duration-300  absolute w-full' alt="loading" />
                                </div>
                                <div className="">
                                    <h3 className=' text-2xl md:text-3xl  font-semibold leading-none'>{service.title}</h3>
                                    <div
                                        className="grid  transition-all duration-300  grid-rows-[1fr]   group-hover:grid-rows-[1fr] "
                                    >
                                        <p className="overflow-hidden leading-tight mt-2 text-[#6B6E73] group-hover:text-white transition-colors duration-300">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <Link href={"/services"} className=' absolute top-1/2 center -translate-y-1/2 -right-9 group-hover:right-3 transition-all duration-300 hover:backdrop-blur-sm  hover:bg-transparent hover:border-white border-2 border-[#F5344F] bg-[#F5344F] px-3 h-24 rounded-full'>
                                <img src="/icons/arrow-right.svg" className='invert-100 -rotate-90' alt="loading" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default ServicesSection