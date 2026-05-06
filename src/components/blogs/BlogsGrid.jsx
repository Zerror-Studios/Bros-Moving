"use client";
import { RiArrowDownSLine } from '@remixicon/react'
import { Link } from 'next-view-transitions';
import React, { useState } from 'react'
import { urlFor } from '@/sanity/lib/image';
import { formatPostDate } from '@/components/utils/formatPostDate';
import Image from 'next/image';
import BlogCard from '../common/BlogCard';

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
                        <BlogCard key={blog._id ?? i} blog={blog} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default BlogsGrid