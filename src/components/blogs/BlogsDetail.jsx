"use client";

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { Link } from 'next-view-transitions';
import React, { useRef, useState } from 'react'
import "swiper/css";
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { formatPostDate } from '@/components/utils/formatPostDate';
import TrendingBlogsClient from '../home/TrendingBlogsClient';
if (typeof window !== 'undefined') { gsap.registerPlugin(SplitText); }

const renderContentItems = (items = []) => {
    const blocks = [];
    let pointGroup = [];

    const flushPoints = () => {
        if (!pointGroup.length) return;

        blocks.push(
            <ul key={`points-${blocks.length}`} className="list-disc pl-5 space-y-2">
                {pointGroup.map((item, idx) => (
                    <li key={item._key ?? `${item.label}-${idx}`} className="text-base md:text-lg text-[#6B6E73] leading-relaxed">
                        {item.label}
                    </li>
                ))}
            </ul>
        );
        pointGroup = [];
    };

    items.forEach((item, index) => {
        if (item?.type === "point") {
            pointGroup.push(item);
            return;
        }

        flushPoints();

        if (item?.label) {
            blocks.push(
                <p key={item._key ?? `para-${index}`} className="text-base leading-relaxed md:text-lg text-[#6B6E73] whitespace-pre-line">
                    {item.label}
                </p>
            );
        }
    });

    flushPoints();

    return blocks;
};

const BlogsDetail = ({ post, prevSlug, nextSlug, latestPosts = [] }) => {
    const [deskLoaded, setDeskLoaded] = useState(false);
    const [mobLoaded, setMobLoaded] = useState(false);
    const isLoaded = deskLoaded || mobLoaded;
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);
    const container = useRef();

    const heroImage = post?.hero_img || post?.coverImage;
    const heroImgUrl = heroImage
        ? urlFor(heroImage).width(1920).height(1080).fit('crop').url()
        : "/images/blogpage/blog_detail_img.png";
    const heroMobImgUrl = heroImage
        ? urlFor(heroImage).width(1080).height(1920).fit('crop').url()
        : "/images/blogpage/mob_blog_detail_img.png";
    const postTitle = post?.heroTitle || post?.title || post?.coverTitle || "";

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
                        {((post?.categories && post.categories.length > 0) || (post?.services && post.services.length > 0)) && (
                            <div className="hero_text opacity-0 flex flex-wrap gap-2 justify-center mb-5 icon_anim">
                                {post.categories?.map((cat) => (
                                    <Link
                                        key={cat._id ?? cat.slug}
                                        href={`/blogs?category=${cat.slug}`}
                                        className="text-xs md:text-sm font-semibold border border-white/30 hover:border-white hover:bg-white hover:text-[#090A0C] transition-all duration-300 rounded-full px-3 py-1 bg-white/10 backdrop-blur-xs text-[#F9F6F3]"
                                    >
                                        {cat.title}
                                    </Link>
                                ))}
                                {post.services?.map((srv) => (
                                    <Link
                                        key={srv._id ?? srv.slug}
                                        href={`/blogs?service=${srv.slug}`}
                                        className="text-xs md:text-sm font-semibold border border-[#F5344F]/40 hover:border-[#F5344F] hover:bg-[#F5344F] transition-all duration-300 rounded-full px-3 py-1 bg-[#F5344F]/20 backdrop-blur-xs text-[#F9F6F3]"
                                    >
                                        {srv.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                        <div className=" hero_text opacity-0 flex flex-col justify-center items-center">
                            <h1 className=' hero_title  text-4xl md:text-7xl max-sm:w-[90vw]  font-semibold'>{postTitle}</h1>
                        </div>
                        <div className=" hero_text opacity-0 w-fit mt-5  flex gap-x-5 h-fit  ">
                            <div className="flex items-center gap-x-2">
                                <img src="/icons/white_person.svg" className='w-5 icon_anim opacity-0' alt="loading" />
                                <p className=' hero_desc text-base md:text-lg'>{post?.author || "Bros Moving"}</p>
                            </div>
                            <div className="w-[1px] bg-white h-8 icon_anim opacity-0"></div>
                            <div className="flex items-center gap-x-2">
                                <img src="/icons/white_calender.svg" className='w-5 icon_anim opacity-0' alt="loading" />
                                <p className=' hero_desc text-base md:text-lg'>{formatPostDate(post?.publishDate || post?.date)}</p>
                            </div>
                        </div>
                    </div>
                    <Image fill onLoad={() => setDeskLoaded(true)} className={` max-sm:hidden w-full cover opacity-0 transition-all duration-300 ${isLoaded ? "opacity-100!" : "opacity-0"}`} src={heroImgUrl} unoptimized alt={postTitle} />
                    <Image fill onLoad={() => setMobLoaded(true)} className={` md:hidden w-full cover opacity-0 transition-all duration-300 ${isLoaded ? "opacity-100!" : "opacity-0"}`} src={heroMobImgUrl} unoptimized alt={postTitle} />
                    <div className="subtract absolute z-10 pointer-events-none w-[70vw] md:w-[80vw] h-6 md:h-10 bg-white bottom-[-1px] left-1/2 -translate-x-1/2"></div>
                </div>
            </div>

            <div className=" max_width_layout  md:w-[60%] padding md:px-0! pb-10! border-b border-black/10 mx-auto space-y-12">
                {post?.introSection ? (
                    <div className="border-b border-black/10 pb-8 space-y-3">
                        {post.introSection.heading && (
                            <h2 className="text-2xl md:text-3xl font-bold text-[#090A0C]">{post.introSection.heading}</h2>
                        )}
                        {post.introSection.content?.map((item, index) => (
                            <p key={index} className="text-base md:text-lg text-[#6B6E73] leading-relaxed whitespace-pre-line">{item}</p>
                        ))}
                    </div>
                ) : null}

                {post?.sections?.length ? (
                    post.sections.map((section, i) => (
                        <div key={section._key ?? i} className="space-y-5">
                            <h3 className='text-2xl md:text-3xl font-bold text-[#090A0C]'>{i + 1}. {section.title}</h3>

                            {section.contents?.length ? (
                                <div className="space-y-4">
                                    {renderContentItems(section.contents)}
                                </div>
                            ) : null}

                            {section.innerSections?.length ? (
                                <div className="mt-6 space-y-6">
                                    {section.innerSections.map((innerSection, pIdx) => (
                                        <div key={innerSection._key ?? pIdx} className="p-5 md:p-6 rounded-2xl border border-black/10 bg-white shadow-xs space-y-4">
                                            <h4 className="text-lg md:text-xl font-bold text-[#F5344F] border-b border-black/5 pb-2">
                                                {innerSection.InnerTitle}
                                            </h4>
                                            {innerSection.contents?.length ? renderContentItems(innerSection.contents) : null}
                                        </div>
                                    ))}
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
