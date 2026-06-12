"use client";

import { RiArrowDownSLine } from '@remixicon/react'
import { Flip } from 'gsap/Flip'
import gsap from 'gsap'
import React, { useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import { useSearchParams, useRouter } from 'next/navigation'
import BlogCard from '../common/BlogCard';

gsap.registerPlugin(Flip)

const ALL_FILTER = {
    _id: 'all',
    title: 'All',
    slug: 'all',
}

const getFilterSlug = (item) => item?.slug || item?._id

const postHasFilter = (postItems = [], activeFilter) => {
    if (activeFilter === ALL_FILTER.slug) return true

    return postItems.some((item) => getFilterSlug(item) === activeFilter)
}

const BlogsGrid = ({ posts = [], services = [], categories = [] }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isServiceOpen, setIsServiceOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [activeService, setActiveService] = useState(searchParams.get('service') || ALL_FILTER.slug);
    const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || ALL_FILTER.slug);
    const gridRef = useRef(null);
    const flipState = useRef(null);

    useEffect(() => {
        setActiveService(searchParams.get('service') || ALL_FILTER.slug);
        setActiveCategory(searchParams.get('category') || ALL_FILTER.slug);
    }, [searchParams]);

    const serviceOptions = useMemo(() => [ALL_FILTER, ...(services || [])], [services])
    const categoryOptions = useMemo(() => [ALL_FILTER, ...(categories || [])], [categories])

    const activeServiceLabel = serviceOptions.find((item) => getFilterSlug(item) === activeService)?.title || 'Services'
    const activeCategoryLabel = categoryOptions.find((item) => getFilterSlug(item) === activeCategory)?.title || 'Categories'

    const filteredPosts = useMemo(() => {
        return posts.filter((post) => {
            const matchesService = postHasFilter(post.services, activeService)
            const matchesCategory = postHasFilter(post.categories, activeCategory)

            return matchesService && matchesCategory
        })
    }, [activeCategory, activeService, posts])

    const toggleService = () => {
        setIsServiceOpen((prev) => !prev);
        setIsCategoryOpen(false);
    };

    const toggleCategory = () => {
        setIsCategoryOpen((prev) => !prev);
        setIsServiceOpen(false);
    };

    const applyFilter = (filterType, value) => {
        if (gridRef.current) {
            flipState.current = Flip.getState(gridRef.current.querySelectorAll('[data-blog-card]'))
        }

        flushSync(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (value === ALL_FILTER.slug) {
                params.delete(filterType);
            } else {
                params.set(filterType, value);
            }
            router.push(`/blogs?${params.toString()}`, { scroll: false });

            if (filterType === 'service') {
                setActiveService(value);
            } else if (filterType === 'category') {
                setActiveCategory(value);
            }
            setIsServiceOpen(false)
            setIsCategoryOpen(false)
        })
    }

    const clearFilters = () => {
        if (gridRef.current) {
            flipState.current = Flip.getState(gridRef.current.querySelectorAll('[data-blog-card]'))
        }

        flushSync(() => {
            router.push('/blogs', { scroll: false });
            setActiveService(ALL_FILTER.slug)
            setActiveCategory(ALL_FILTER.slug)
            setIsServiceOpen(false)
            setIsCategoryOpen(false)
        })
    }

    useLayoutEffect(() => {
        if (!flipState.current || !gridRef.current) return

        const cards = gridRef.current.querySelectorAll('[data-blog-card]')

        const animation = Flip.from(flipState.current, {
            targets: cards,
            duration: 0.65,
            ease: 'power3.inOut',

            // IMPORTANT
            absolute: false,

            stagger: 0.035,

            onEnter: (elements) => {
                gsap.fromTo(
                    elements,
                    {
                        opacity: 0,
                        scale: 0.92,
                        y: 24,
                    },
                    {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.45,
                        ease: 'power3.out',
                        clearProps: "all"
                    }
                )
            },

            onLeave: (elements) => {
                gsap.to(elements, {
                    opacity: 0,
                    scale: 0.92,
                    y: -18,
                    duration: 0.3,
                    ease: 'power2.in',
                })
            },

            onComplete: () => {
                gsap.set(cards, {
                    clearProps: "all"
                })
            }
        })

        return () => {
            animation?.kill()
        }
    }, [filteredPosts])

    return (
        <>
            <div className="w-full padding">
                <div className=" max_width_layout w-full flex border-b border-black/10 pb-5 items-end justify-between">
                    <h2 className='text-3xl md:text-5xl  font-semibold '>Blogs<sup className='text-base md:text-lg'>({filteredPosts.length})</sup> </h2>
                    <div className="relative flex items-end gap-x-4">

                        <button
                            onClick={toggleService}
                            className={`flex w-fit items-center gap-x-1 pr-1 md:pr-2 md:gap-x-2 font-medium border rounded-full px-4 h-10 md:h-11 transition-colors ${activeService !== ALL_FILTER.slug ? 'border-[#F5344F] bg-[#F5344F] text-white' : 'border-black/30'}`}
                        >
                            {activeService === ALL_FILTER.slug ? 'Services' : activeServiceLabel}
                            <RiArrowDownSLine
                                className={`${isServiceOpen ? "rotate-180" : ""} transition-all duration-300`}
                            />
                        </button>

                        <button
                            onClick={toggleCategory}
                            className={`flex w-fit items-center gap-x-1 pr-1 md:pr-2 md:gap-x-2 font-medium border rounded-full px-4 h-10 md:h-11 transition-colors ${activeCategory !== ALL_FILTER.slug ? 'border-[#F5344F] bg-[#F5344F] text-white' : 'border-black/30'}`}
                        >
                            {activeCategory === ALL_FILTER.slug ? 'Categories' : activeCategoryLabel}
                            <RiArrowDownSLine
                                className={`${isCategoryOpen ? "rotate-180" : ""} transition-all duration-300`}
                            />
                        </button>

                        <div
                            data-lenis-prevent
                            className={`${isServiceOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "translate-y-2 opacity-0 pointer-events-none"} transition-all duration-150 absolute left-0 top-[110%] w-full z-10 custom_scroller max-h-[26vh] border overflow-y-auto border-black/10 bg-white rounded-xl shadow-md`}
                        >
                            {serviceOptions.map((item) => {
                                const slug = getFilterSlug(item)

                                return (
                                    <button
                                        key={item._id || slug}
                                        onClick={() => applyFilter('service', slug)}
                                        className={`  block text-left w-full p-3 border-b hover:bg-[#F5344F] hover:text-white cursor-pointer border-black/10 transition-colors ${activeService === slug ? 'bg-[#F5344F] text-white' : ''}`}
                                    >
                                        {item.title}
                                    </button>
                                )
                            })}
                        </div>

                        <div
                            data-lenis-prevent
                            className={`${isCategoryOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "translate-y-2 opacity-0 pointer-events-none"} transition-all duration-150 absolute left-0 top-[110%] w-full z-10 custom_scroller max-h-[26vh] border overflow-y-auto border-black/10 bg-white rounded-xl shadow-md`}
                        >
                            {categoryOptions.map((item) => {
                                const slug = getFilterSlug(item)

                                return (
                                    <button
                                        key={item._id || slug}
                                        onClick={() => applyFilter('category', slug)}
                                        className={`  block text-left w-full p-3 border-b hover:bg-[#F5344F] hover:text-white cursor-pointer border-black/10 transition-colors ${activeCategory === slug ? 'bg-[#F5344F] text-white' : ''}`}
                                    >
                                        {item.title}
                                    </button>
                                )
                            })}
                        </div>

                    </div>
                </div>
                <div
                    ref={gridRef}
                    className="min-h-[50vw] relative max_width_layout w-full grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 gap-y-5 md:gap-y-12 pt-5 md:pt-10"
                >
                    {filteredPosts.map((blog, i) => (
                        <div data-blog-card data-flip-id={blog._id ?? blog.slug ?? i} key={blog._id ?? blog.slug ?? i}>
                            <BlogCard blog={blog} className={"bg-white"} />
                        </div>
                    ))}

                    {!filteredPosts.length && (
                        <div className="absolute inset-0 center flex-col mt-5 md:mt-10 rounded-2xl border border-black/10 bg-white p-8 text-center">
                            <p className="text-lg font-semibold">No blogs found for this filter.</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 font-medium text-[#F5344F] underline"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default BlogsGrid
