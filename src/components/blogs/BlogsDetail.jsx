"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { Link } from 'next-view-transitions';
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from 'next/image';
import { BlogsData } from '../utils/BlogsData';
import { useParams } from 'next/navigation';
gsap.registerPlugin(SplitText);

const BlogsDetail = () => {
    const [deskLoaded, setDeskLoaded] = useState(false);
    const [mobLoaded, setMobLoaded] = useState(false);
    const isLoaded = deskLoaded || mobLoaded;
    const { slug } = useParams()
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);
    const container = useRef();

    const blog = BlogsData.find((blog) => blog.slug === slug)
    const currentIndex = BlogsData.findIndex((blog) => blog.slug === slug);
    const prevIndex = currentIndex === 0 ? BlogsData.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === BlogsData.length - 1 ? 0 : currentIndex + 1;

    const prevSlug = BlogsData[prevIndex].slug;
    const nextSlug = BlogsData[nextIndex].slug;

    useGSAP(() => {
        const titleSplit = new SplitText(".hero_title", {
            type: "lines",
            linesClass: "line"
        });

        const descSplit = new SplitText(".hero_desc", {
            type: "lines",
            linesClass: "line"
        });

        const wrapLines = (lines) => {
            lines.forEach(line => {
                const wrapper = document.createElement("div");
                wrapper.classList.add("line-parent");

                line.parentNode.insertBefore(wrapper, line);
                wrapper.appendChild(line);
            });
        };

        wrapLines(titleSplit.lines);
        wrapLines(descSplit.lines);

        // animation
        gsap.set([...titleSplit.lines, ...descSplit.lines], {
            yPercent: 100
        });
        gsap.set(".hero_text", {
            opacity: 1
        });

        if (!isLoaded) return;

        gsap.to(titleSplit.lines, {
            yPercent: -8,
            duration: 1,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.4
        });

        gsap.to(descSplit.lines, {
            yPercent: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.05,
            delay: 0.6
        });
        gsap.to(".icon_anim", {
            opacity: 1,
            ease: "power3.out",
            delay: 0.8
        });

    }, { scope: container, dependencies: [isLoaded] });

    return (
        <>
            <div ref={container} className="w-full p-3 md:p-5 center relative text-center">
                <div className="  max_width_layout absolute bottom-20 md:bottom-32 flex flex-col justify-center items-center text-[#F9F6F3]">
                    <div className=" hero_text opacity-0 flex flex-col justify-center items-center">
                        <h1 className=' hero_title  text-4xl md:text-7xl max-sm:w-[90vw]  font-semibold'>{blog.title}</h1>
                    </div>
                    <div className=" hero_text opacity-0 w-fit mt-5  flex gap-x-5 h-fit  ">
                        <div className="flex items-center gap-x-2">
                            <img src="/icons/white_person.svg" className='w-5 icon_anim opacity-0' alt="" />
                            <p className=' hero_desc text-base md:text-lg'>{blog.author}</p>
                        </div>
                        <div className="w-[1px] bg-white h-8 icon_anim opacity-0"></div>
                        <div className="flex items-center gap-x-2">
                            <img src="/icons/white_calender.svg" className='w-5 icon_anim opacity-0' alt="" />
                            <p className=' hero_desc text-base md:text-lg'>{blog.date}</p>
                        </div>
                    </div>
                </div>
                <Image width={1920} height={1080} onLoadingComplete={() => setDeskLoaded(true)} className={` max-sm:hidden w-full opacity-0 transition-all duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`} src="/images/blogpage/blog_detail_img.png" alt="" />
                <Image height={1920} width={1080} onLoadingComplete={() => setMobLoaded(true)} className={` md:hidden w-full opacity-0 transition-all duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`} src="/images/blogpage/mob_blog_detail_img.png" alt="" />
                <div className={`w-full absolute  pointer-events-none transition-all  skeleton duration-300 inset-0 p-3 md:p-5 ${isLoaded ? "opacity-0" : "opacity-100"} `}>
                    <img className='w-full max-sm:hidden' src="/images/page_hero_skeleton.png" alt="" />
                    <img className='w-full md:hidden' src="/images/mob_page_hero_skeleton.png" alt="" />
                </div>
            </div>

            <div className=" max_width_layout  md:w-[60%] padding md:px-0! pb-10! border-b border-black/10 mx-auto space-y-8">
                {blog?.BlogDetailData.map((blog, i) => (
                    <div key={i} className="">
                        <h3 className='text-2xl font-semibold'>{i + 1}. {blog.heading}</h3>
                        <p className='text-base leading-tight mt-2 md:text-lg text-[#6B6E73]'>{blog.content}</p>
                        {blog.images && (
                            <div className="w-full grid grid-cols-2 gap-x-3 md:gap-x-10 mt-8">
                                {blog?.images.map((item, i) => (
                                    <div key={i} className="w-full">
                                        <img src={item} alt="" className='w-full' />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className=" max_width_layout md:w-[60%] padding py-0! mx-auto flex items-center justify-between mt-5 md:mt-10 mb-5 md:mb-24">
                <Link href={`/blog/${prevSlug}`} className=' group hover:pl-2 pl-0 transition-all duration-300 flex w-fit items-center gap-x-0 hover:gap-x-2 font-medium border border-black/30 leading-none   rounded-full px-4 h-10  md:h-11'>
                    <div className={`group-hover:scale-100 group-hover:p-2.5 transition-all duration-300 scale-0  p-0 overflow-hidden bg-[#090A0C] rounded-full  `}>
                        <img
                            src="/icons/arrow-right.svg"
                            className="w-4 invert-100 rotate-180"
                            alt="arrow"
                        />
                    </div>
                    Previous Blog
                </Link>
                <Link href={`/blog/${nextSlug}`} className=' group hover:pr-2 pr-0 transition-all duration-300 flex w-fit items-center gap-x-0 hover:gap-x-2 font-medium border border-black/30 leading-none   rounded-full px-4 h-10  md:h-11'>
                    Next Blog
                    <div className={`group-hover:scale-100 group-hover:p-2.5 transition-all duration-300 scale-0  p-0 overflow-hidden bg-[#090A0C] rounded-full  `}>
                        <img
                            src="/icons/arrow-right.svg"
                            className="w-4 invert-100"
                            alt="arrow"
                        />
                    </div>
                </Link>
            </div>

            <div className=" w-full padding bg-[#F9F6F3]">
                <div className=" max_width_layout w-full flex items-end justify-between">
                    <h2 className='text-3xl md:text-5xl  font-semibold '>Read Latest Blog</h2>
                    <div className="flex items-end gap-x-2">

                        {/* PREV */}
                        <button
                            disabled={isBeginning}
                            onClick={() => swiperRef.current?.slidePrev()}
                            className={` size-8  md:size-10  border-black/30 center rounded-full border transition-all duration-300
                                ${isBeginning
                                    ? " opacity-40 cursor-not-allowed!"
                                    : " group hover:bg-[#F5344F] hover:border-[#F5344F]"
                                }`}
                        >
                            <img
                                src="/icons/arrow-right.svg"
                                className={`w-4 rotate-180 group-hover:invert-100 `}
                                alt=""
                            />
                        </button>

                        {/* NEXT */}
                        <button
                            disabled={isEnd}
                            onClick={() => swiperRef.current?.slideNext()}
                            className={` size-8  md:size-10  border-black/30 center rounded-full border transition-all duration-300
                                ${isEnd
                                    ? " opacity-40 cursor-not-allowed!"
                                    : " group hover:bg-[#F5344F] hover:border-[#F5344F]"
                                }`}
                        >
                            <img
                                src="/icons/arrow-right.svg"
                                className="w-4 group-hover:invert-100"
                                alt=""
                            />
                        </button>

                    </div>
                </div>

                <div className=" max_width_layout mt-6 md:mt-14 w-full ">
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
                        {BlogsData.map((blog, i) => (
                            <SwiperSlide key={i} className=' group space-y-5 '>
                                <Link href={`/blog/${blog.slug}`} key={i} className="space-y-5">
                                    <img src={blog.image} className='w-full group-hover:scale-95 transition-all duration-300' alt="" />
                                    <div className="flex w-full justify-between">
                                        <div className="flex items-center gap-x-2">
                                            <img src="/icons/form_person.svg" alt="" />
                                            <p className='text-base md:text-lg text-[#6B6E73] transition-all duration-300  group-hover:text-[#090A0C]'>{blog.author}</p>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            <img src="/icons/red_calender.svg" alt="" />
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

export default BlogsDetail