"use client";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { Link } from 'next-view-transitions';
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { formatPostDate } from '@/components/utils/formatPostDate';
import BlogCard from '../common/BlogCard';
import TrendingBlogsClient from '../home/TrendingBlogsClient';
gsap.registerPlugin(SplitText);

const BlogsDetail = ({ post, prevSlug, nextSlug, latestPosts = [] }) => {
    const [deskLoaded, setDeskLoaded] = useState(false);
    const [mobLoaded, setMobLoaded] = useState(false);
    const isLoaded = deskLoaded || mobLoaded;
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);
    const container = useRef();

    const heroImgUrl = post?.coverImage
        ? urlFor(post.coverImage).width(1920).height(1080).fit('crop').url()
        : "/images/blogpage/blog_detail_img.png";
    const heroMobImgUrl = post?.coverImage
        ? urlFor(post.coverImage).width(1080).height(1920).fit('crop').url()
        : "/images/blogpage/mob_blog_detail_img.png";

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
            <div ref={container} className="w-full p-3 md:p-5 center h-screen relative text-center">
                <div className={` ${isLoaded ? "" : "skeleton"} w-full h-full overflow-hidden relative  text-center center rounded-2xl md:rounded-4xl`}>
                    <div className="  max_width_layout absolute bottom-20 z-10 flex flex-col justify-center items-center text-[#F9F6F3]">
                        <div className=" hero_text opacity-0 flex flex-col justify-center items-center">
                            <h1 className=' hero_title  text-4xl md:text-7xl max-sm:w-[90vw]  font-semibold'>{post?.title}</h1>
                        </div>
                        <div className=" hero_text opacity-0 w-fit mt-5  flex gap-x-5 h-fit  ">
                            <div className="flex items-center gap-x-2">
                                <img src="/icons/white_person.svg" className='w-5 icon_anim opacity-0' alt="loading" />
                                <p className=' hero_desc text-base md:text-lg'>{post?.author || "Bro's Moving"}</p>
                            </div>
                            <div className="w-[1px] bg-white h-8 icon_anim opacity-0"></div>
                            <div className="flex items-center gap-x-2">
                                <img src="/icons/white_calender.svg" className='w-5 icon_anim opacity-0' alt="loading" />
                                <p className=' hero_desc text-base md:text-lg'>{formatPostDate(post?.date)}</p>
                            </div>
                        </div>
                    </div>
                    <Image fill onLoad={() => setDeskLoaded(true)} className={` max-sm:hidden w-full opacity-0 transition-all duration-300 ${isLoaded ? "opacity-100!" : "opacity-0"}`} src={heroImgUrl} unoptimized alt={post?.title ?? ""} />
                    <Image fill onLoad={() => setMobLoaded(true)} className={` md:hidden w-full opacity-0 transition-all duration-300 ${isLoaded ? "opacity-100!" : "opacity-0"}`} src={heroMobImgUrl} unoptimized alt={post?.title ?? ""} />
                    <div className="subtract absolute z-10 pointer-events-none w-[70vw] md:w-[80vw] h-6 md:h-10 bg-white bottom-[-1px] left-1/2 -translate-x-1/2"></div>
                </div>
            </div>

            <div className=" max_width_layout  md:w-[60%] padding md:px-0! pb-10! border-b border-black/10 mx-auto space-y-8">
                {post?.details?.length ? (
                    post.details.map((section, i) => (
                        <div key={section._key ?? i} className="">
                            <h3 className='text-2xl font-semibold'>{i + 1}. {section.heading}</h3>
                            {section.content ? (
                                <p className='text-base leading-tight mt-2 md:text-lg text-[#6B6E73] whitespace-pre-line'>{section.content}</p>
                            ) : null}
                            {section.images?.length ? (
                                <div className="w-full grid grid-cols-2 gap-x-3 md:gap-x-10 mt-8">
                                    {section.images.map((img, j) => {
                                        const src = img ? urlFor(img).width(900).url() : null
                                        if (!src) return null
                                        return (
                                            <div key={img._key ?? j} className="w-full rounded-2xl overflow-hidden relative aspect-5/4.5">
                                                <div className="subtract-small absolute z-10 pointer-events-none w-[80%] h-5 bg-[#fff] bottom-[-1px] left-1/2 -translate-x-1/2"></div>
                                                <Image
                                                    fill
                                                    unoptimized
                                                    src={src}
                                                    className='cover'
                                                    alt="Blog image"
                                                />
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : null}
                        </div>
                    ))
                ) : (
                    <p className='text-base leading-tight mt-2 md:text-lg text-[#6B6E73]'>
                        No content yet.
                    </p>
                )}
            </div>

            <div className=" max_width_layout md:w-[60%] md:px-0!  padding py-0! mx-auto flex items-center justify-between mt-5 md:mt-10 mb-5 md:mb-24">
                <Link href={prevSlug ? `/blog/${prevSlug}` : '/blogs'} className=' group hover:pl-2 pl-0 transition-all duration-300 flex w-fit items-center gap-x-0 hover:gap-x-2 font-medium border border-black/30 leading-none   rounded-full px-4 h-10  md:h-11'>
                    <div className={`group-hover:scale-100 group-hover:p-2.5 transition-all duration-300 scale-0  p-0 overflow-hidden bg-[#090A0C] rounded-full  `}>
                        <img
                            src="/icons/arrow-right.svg"
                            className="w-4 invert-100 rotate-180"
                            alt="arrow"
                        />
                    </div>
                    Previous Blog
                </Link>
                <Link href={nextSlug ? `/blog/${nextSlug}` : '/blogs'} className=' group hover:pr-2 pr-0 transition-all duration-300 flex w-fit items-center gap-x-0 hover:gap-x-2 font-medium border border-black/30 leading-none   rounded-full px-4 h-10  md:h-11'>
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

            <TrendingBlogsClient posts={latestPosts} swiperRef={swiperRef} setIsBeginning={setIsBeginning} setIsEnd={setIsEnd} />
        </>
    )
}

export default BlogsDetail