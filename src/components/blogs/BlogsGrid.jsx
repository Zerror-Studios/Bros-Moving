"use client";
import { RiArrowDownSLine } from '@remixicon/react'
import { Link } from 'next-view-transitions';
import React, { useState } from 'react'
import { urlFor } from '@/sanity/lib/image';
import { formatPostDate } from '@/components/utils/formatPostDate';

const SERVICES = [
    "Residential Moving",
    "Commercial Moving",
    "Packing & Unpacking",
    "Storage Services",
    "Specialty Moving"
];
const BlogsGrid = ({ posts = [] }) => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isSortOpen, setIsSortOpen] = useState(false);

    const toggleCategory = () => {
        setIsCategoryOpen((prev) => !prev);
        setIsSortOpen(false); // close other dropdown
    };

    const toggleSort = () => {
        setIsSortOpen((prev) => !prev);
        setIsCategoryOpen(false); // close other dropdown
    };
    return (
        <>
            <div className="w-full padding">
                <div className=" max_width_layout w-full flex border-b border-black/10 pb-5 items-end justify-between">
                    <h2 className='text-3xl md:text-5xl  font-semibold '>Blogs<sup className='text-base md:text-lg'>({posts.length})</sup> </h2>
                    <div className="relative flex items-end gap-x-4">

                        <button
                            onClick={toggleCategory}
                            className='flex w-fit items-center gap-x-1 pr-1 md:pr-2  md:gap-x-2 font-medium border border-black/30 rounded-full px-4 h-10 md:h-11'
                        >
                            Categories
                            <RiArrowDownSLine
                                className={`${isCategoryOpen ? "rotate-180" : ""} transition-all duration-300`}
                            />
                        </button>

                        <button
                            onClick={toggleSort}
                            className='flex w-fit items-center gap-x-1 pr-1 md:pr-2  md:gap-x-2 font-medium border border-black/30 rounded-full px-4 h-10 md:h-11'
                        >
                            Sort By
                            <RiArrowDownSLine
                                className={`${isSortOpen ? "rotate-180" : ""} transition-all duration-300`}
                            />
                        </button>

                        <div
                            data-lenis-prevent
                            className={`${isCategoryOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "  translate-y-2  opacity-0 pointer-events-none"} transition-all duration-150 absolute left-0 top-[110%] w-full z-10 custom_scroller h-[26vh] border overflow-y-auto border-black/10 bg-white rounded-xl shadow-md`}
                        >
                            {SERVICES.map((item, i) => (
                                <div
                                    key={i}
                                    className="w-full p-3 border-b hover:bg-[#F5344F] hover:text-white cursor-pointer border-black/10"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>

                        <div
                            data-lenis-prevent
                            className={`${isSortOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "  translate-y-2  opacity-0 pointer-events-none"} transition-all duration-150 absolute left-0 top-[110%] w-full z-10 custom_scroller h-[26vh] border overflow-y-auto border-black/10 bg-white rounded-xl shadow-md`}
                        >
                            {["Newest", "Oldest", "Popular", "Trending", "Featured"].map((item, i) => (
                                <div
                                    key={i}
                                    className="w-full p-3 border-b hover:bg-[#F5344F] hover:text-white cursor-pointer border-black/10"
                                >
                                    {item}
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
                <div className=" max_width_layout w-full grid-cols-2 grid md:grid-cols-3 gap-3 md:gap-8 gap-y-5 md:gap-y-12 pt-5 md:pt-10">
                    {posts.map((blog, i) => (
                        <Link href={`/blog/${blog.slug}`} key={blog._id ?? i} className=" group space-y-3 md:space-y-5 ">
                            <img
                                src={blog?.coverImage ? urlFor(blog.coverImage).width(1200).height(900).fit('crop').url() : "/images/blogpage/blog1.png"}
                                className='w-full group-hover:scale-95 transition-all duration-300'
                                alt={blog?.title ?? "Blog image"}
                            />
                            <div className=" max-sm:space-y-1 md:flex w-full justify-between">
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/form_person.svg" className='w-5' alt="loading" />
                                    <p className='text-sm md:text-lg text-[#6B6E73] transition-all duration-300  group-hover:text-[#090A0C]'>{blog.author || "Bro's Moving"}</p>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <img src="/icons/red_calender.svg" className='w-5' alt="loading" />
                                    <p className='text-sm md:text-lg text-[#6B6E73] transition-all duration-300  group-hover:text-[#090A0C]'>{formatPostDate(blog.date)}</p>
                                </div>
                            </div>
                            <h3 className=' text-base md:text-2xl group-hover:text-[#F5344F]  transition-all duration-300 leading-tight group-hover:underline font-semibold'>{blog.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default BlogsGrid