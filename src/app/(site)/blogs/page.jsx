import BlogsGrid from '@/components/blogs/BlogsGrid'
import PageHero from '@/components/common/PageHero'
import React from 'react'
import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import WebPageSchema from '@/components/seo/WebPageSchema'

export const blogMetadata = {
    title: "Moving Tips & Guides | Bro's Moving Inc Blog",

    description:
        "Read expert moving tips, packing guides, and relocation advice from Bro's Moving Inc to make your move easier and stress-free.",

    keywords: [
        "moving tips",
        "packing tips",
        "moving blog",
        "relocation advice",
        "how to move safely",
        "moving checklist",
    ],

    robots: "index, follow",

    openGraph: {
        title: "Moving Tips & Guides | Blog",
        description:
            "Helpful guides and expert advice for stress-free moving and packing.",
        url: `${Const.ClientLink}/blog`,
        siteName: "Bro's Moving Inc",
        type: "website",
        images: [
            {
                url: `${Const.ClientLink}/og.png`,
                width: 1200,
                height: 630,
                alt: "Moving Blog",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Moving Tips & Guides",
        description:
            "Learn expert strategies for smooth and safe moving.",
        images: [`${Const.ClientLink}/og.png`],
    },

    alternates: {
        canonical: `${Const.ClientLink}/blog`,
    },
};

const page = async () => {
    const { data: posts = [] } = await sanityFetch({
        query: POSTS_QUERY,
    })
    return (
        <>
            <WebPageSchema
                name="Bro's Moving Blog"
                description="Expert tips, guides, and insights on moving, packing, and relocation."
                url={`${Const.ClientLink}/blog`}
            />
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