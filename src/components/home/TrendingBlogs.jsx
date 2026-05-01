"use client";
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { Link } from 'next-view-transitions';
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
gsap.registerPlugin(SplitText);

const BLOGS = [
    {
        id: 1,
        title: "High Five Friday: Kingsley Okoroafo from Calgary North, AB",
        author: "Becky Livingston",
        slug: "becky-livingston",
        date: "23 April, 2026",
        image: "/images/blogpage/blog1.png"
    },
    {
        id: 2,
        title: "Celebrating Excellence: Kingsley Okoroafo | High Five Friday",
        author: "Becky Livingston",
        slug: "becky-livingston",
        date: "23 April, 2026",
        image: "/images/blogpage/blog2.png"
    },
    {
        id: 3,
        title: "High Five Friday Feature: Kingsley Calgary North, AB",
        author: "Becky Livingston",
        slug: "becky-livingston",
        date: "23 April, 2026",
        image: "/images/blogpage/blog3.png"
    },
    {
        id: 4,
        title: "High Five Friday: Kingsley Okoroafo from Calgary North, AB",
        author: "Becky Livingston",
        slug: "becky-livingston",
        date: "23 April, 2026",
        image: "/images/blogpage/blog1.png"
    },
    {
        id: 5,
        title: "Celebrating Excellence: Kingsley Okoroafo | High Five Friday",
        author: "Becky Livingston",
        slug: "becky-livingston",
        date: "23 April, 2026",
        image: "/images/blogpage/blog2.png"
    },
    {
        id: 6,
        title: "High Five Friday Feature: Kingsley Calgary North, AB",
        author: "Becky Livingston",
        slug: "becky-livingston",
        date: "23 April, 2026",
        image: "/images/blogpage/blog3.png"
    },
];

const TrendingBlogs = () => {

    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);

    return (
        <>
            <div className=" w-full padding bg-[#F9F6F3]">
                <div className=" max_width_layout w-full flex items-end justify-between">
                    <h2 className='text-3xl md:text-5xl  font-semibold '>Read Latest Blog</h2>
                    <div className="flex items-end gap-x-2">

                        {/* PREV */}
                        <button
                            disabled={isBeginning}
                            onClick={() => swiperRef.current?.slidePrev()}
                            className={`size-10  border-black/30 center rounded-full border transition-all duration-300
                                ${isBeginning
                                    ? " opacity-40 cursor-not-allowed!"
                                    : " group hover:bg-[#F5344F] hover:border-[#F5344F]"
                                }`}
                        >
                            <img
                                src="/icons/arrow-right.svg"
                                className={`w-4 rotate-180 group-hover:invert-100 `}
                                alt="loading"
                            />
                        </button>

                        {/* NEXT */}
                        <button
                            disabled={isEnd}
                            onClick={() => swiperRef.current?.slideNext()}
                            className={`size-10  border-black/30 center rounded-full border transition-all duration-300
                                ${isEnd
                                    ? " opacity-40 cursor-not-allowed!"
                                    : " group hover:bg-[#F5344F] hover:border-[#F5344F]"
                                }`}
                        >
                            <img
                                src="/icons/arrow-right.svg"
                                className="w-4 group-hover:invert-100"
                                alt="loading"
                            />
                        </button>

                    </div>
                </div>

                <div className=" max_width_layout mt-14 w-full ">
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        spaceBetween={30}
                        slidesPerView={3}
                        grabCursor={true}
                        className="cursor-grab active:cursor-grabbing"
                        breakpoints={{
                            0: {
                                slidesPerView: 1.1,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {BLOGS.map((blog, i) => (
                            <SwiperSlide key={i} className=' group space-y-5 '>
                                <Link href={`/blog/${blog.slug}`} key={i} className="space-y-5">
                                    <img src={blog.image} className='w-full group-hover:scale-95 transition-all duration-300' alt="loading" />
                                    <div className="flex w-full justify-between">
                                        <div className="flex items-center gap-x-2">
                                            <img src="/icons/form_person.svg" className='w-5' alt="loading" />
                                            <p className='text-base md:text-lg text-[#6B6E73] transition-all duration-300  group-hover:text-[#090A0C]'>{blog.author}</p>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <img src="/icons/red_calender.svg" className='w-5' alt="loading" />
                                            <p className='text-base md:text-lg text-[#6B6E73] transition-all duration-300  group-hover:text-[#090A0C]'>{blog.date}</p>
                                        </div>
                                    </div>
                                    <h3 className='text-2xl group-hover:text-[#F5344F]  transition-all duration-300 leading-tight group-hover:underline font-semibold'>{blog.title}</h3>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </>
    )
}

export default TrendingBlogs