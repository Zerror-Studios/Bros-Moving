import BlogsGrid from '@/components/blogs/BlogsGrid'
import PageHero from '@/components/common/PageHero'
import React from 'react'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'

const page = async () => {
    const { data: posts = [] } = await sanityFetch({
        query: POSTS_QUERY,
    })
    return (
        <>
            <PageHero
                title={"Discover Our Latest Stories"}
                description={"Explore a collection of the latest news, practical guides, and industry insights—all in one place."}
                image={"/images/blogpage/blog_hero.png"}
                mobImage={"/images/blogpage/mob_blog_hero.png"}
            />
            <BlogsGrid posts={posts} />
        </>
    )
}

export default page