import { urlFor } from '@/sanity/lib/image'
import { Link } from 'next-view-transitions'
import Image from 'next/image'
import React from 'react'
import { formatPostDate } from '../utils/formatPostDate'

const BlogCard = ({ blog, className="bg-[#F9F6F3]" }) => {
    return (
        <Link href={`/blog/${blog.slug}`} className=" group relative space-y-3 md:space-y-5 ">
            <div className=" aspect-5/4.5 group-hover:scale-95 transition-all duration-300 rounded-2xl overflow-hidden relative w-full">
                <div className={`subtract-small absolute z-10 pointer-events-none w-[65%] h-3 md:h-5  bottom-[-1px] left-1/2 -translate-x-1/2 ${className}`}></div>
                <Image
                    fill
                    unoptimized
                    src={blog?.coverImage ? urlFor(blog.coverImage).url() : "/images/blogpage/blog1.png"}
                    className='cover'
                    alt={blog?.title ?? "Blog image"}
                />
            </div>
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
    )
}

export default BlogCard
