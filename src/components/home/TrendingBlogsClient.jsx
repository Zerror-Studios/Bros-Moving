"use client";

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";
import BlogCard from '../common/BlogCard';

const TrendingBlogsClient = ({ posts }) => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);

    return (
        <div className="w-full padding bg-[#F9F6F3] ">
            <div className="max_width_layout w-full flex items-end justify-between">
                <h2 className="text-3xl md:text-5xl font-semibold">
                    Read Latest Blog
                </h2>

                <div className="flex items-end gap-x-2">
                    {/* PREV */}
                    <button
                        aria-label="Previous slide"
                        disabled={isBeginning}
                        onClick={() => swiperRef.current?.slidePrev()}
                        className={`prev_button size-10 border-black/30 center rounded-full border transition-all duration-300
      ${isBeginning
                                ? "opacity-40 cursor-not-allowed"
                                : "group hover:bg-[#F5344F] hover:border-[#F5344F]"
                            }`}
                    >
                        <Image
                            src="/icons/arrow-right.svg"
                            width={16}
                            height={16}
                            className="rotate-180 group-hover:invert"
                            alt="" // keep empty because aria-label handles it
                        />
                    </button>

                    {/* NEXT */}
                    <button
                        aria-label="Next slide"
                        disabled={isEnd}
                        onClick={() => swiperRef.current?.slideNext()}
                        className={`next_button size-10 border-black/30 center rounded-full border transition-all duration-300
      ${isEnd
                                ? "opacity-40 cursor-not-allowed"
                                : "group hover:bg-[#F5344F] hover:border-[#F5344F]"
                            }`}
                    >
                        <Image
                            src="/icons/arrow-right.svg"
                            width={16}
                            height={16}
                            className="group-hover:invert"
                            alt=""
                        />
                    </button>
                </div>
            </div>

            <div className="max_width_layout mt-14 w-full">
                {!posts || posts.length === 0 ? (
                    <div className="w-full py-10 flex justify-center items-center text-center">
                        <p className="text-[#6B6E73] text-xl font-medium">No blogs found.</p>
                    </div>
                ) : (
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
                        grabCursor
                        className="cursor-grab active:cursor-grabbing"
                        breakpoints={{
                            0: { slidesPerView: 1.1, spaceBetween: 10 },
                            640: { slidesPerView: 3, spaceBetween: 30 },
                        }}
                    >
                        {posts.map((blog, i) => (
                            <SwiperSlide key={i} className="group space-y-5">
                                <BlogCard key={blog._id ?? i} blog={blog} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default TrendingBlogsClient;