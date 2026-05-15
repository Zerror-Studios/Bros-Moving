import BlogsGrid from '@/components/blogs/BlogsGrid'
import PageHero from '@/components/common/PageHero'
import React from 'react'
import { sanityFetch } from '@/sanity/lib/live'
import { BLOG_FILTERS_QUERY, POSTS_QUERY } from '@/sanity/lib/queries'
import WebPageSchema from '@/components/seo/WebPageSchema'
import { Const } from '@/components/utils/Constants'

export const metadata  = {
  title:
    "Moving Tips, Packing Guides & Relocation Advice | Bros Moving Inc. Blog",

  description:
    "Explore expert moving tips, packing guides, storage advice, and relocation resources from Bros Moving Inc. to make every move smooth, safe, and stress-free.",

  keywords: [
    "moving tips",
    "packing guides",
    "moving blog",
    "relocation advice",
    "moving checklist",
    "packing and moving tips",
    "long distance moving guide",
    "office relocation tips",
    "storage moving advice",
    "moving company blog",
    "how to move safely",
    "Bros Moving blog",
    "Regina moving tips",
    "Saskatchewan movers",
  ],

  robots: "index, follow",

  openGraph: {
    title:
      "Moving Tips & Relocation Guides | Bros Moving Inc. Blog",

    description:
      "Helpful moving resources, packing tips, and expert relocation advice from trusted professional movers.",

    url: `${Const.ClientLink}/blog`,
    siteName: "Bros Moving Inc.",
    type: "website",

    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "Bros Moving Inc. Blog",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Moving Tips & Packing Guides | Bros Moving Inc.",

    description:
      "Discover expert moving advice, packing strategies, and relocation guides for a stress-free moving experience.",

    images: [`${Const.ClientLink}/og.png`],
  },

  alternates: {
    canonical: `${Const.ClientLink}/blog`,
  },
};

const page = async () => {
    const [{ data: posts = [] }, { data: filters = {} }] = await Promise.all([
        sanityFetch({ query: POSTS_QUERY }),
        sanityFetch({ query: BLOG_FILTERS_QUERY }),
    ])
    return (
        <>
            <WebPageSchema
  name="Bros Moving Inc. Blog"
  description="Read expert moving tips, packing guides, storage advice, and relocation insights from Bros Moving Inc. for safer and stress-free moving experiences."
  url={`${Const.ClientLink}/blog`}
/>
            <PageHero
                title={"Discover Our Latest Stories"}
                description={"Explore a collection of the latest news, practical guides, and industry insights—all in one place."}
                image={"/images/blogpage/blog_hero.png"}
                mobImage={"/images/blogpage/mob_blog_hero.png"}
            />
            <BlogsGrid
                posts={posts}
                services={filters.services}
                categories={filters.categories}
            />
        </>
    )
}

export default page
