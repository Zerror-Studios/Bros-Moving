import BlogsDetail from '@/components/blogs/BlogsDetail'
import React from 'react'
import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { POST_BY_SLUG_QUERY, POST_SLUGS_QUERY, POSTS_QUERY } from '@/sanity/lib/queries'

const BlogDetailPage = async ({ params }) => {
  const { slug } = await Promise.resolve(params)

  const [{ data: post }, { data: slugs = [] }, { data: latestPosts = [] }] = await Promise.all([
    sanityFetch({ query: POST_BY_SLUG_QUERY, params: { slug } }),
    sanityFetch({ query: POST_SLUGS_QUERY }),
    sanityFetch({ query: POSTS_QUERY }),
  ])

  if (!post) notFound()

  const slugList = slugs.map((s) => s.slug).filter(Boolean)
  const currentIndex = slugList.findIndex((s) => s === slug)
  const prevIndex = currentIndex <= 0 ? slugList.length - 1 : currentIndex - 1
  const nextIndex = currentIndex === slugList.length - 1 ? 0 : currentIndex + 1

  const prevSlug = slugList.length ? slugList[prevIndex] : null
  const nextSlug = slugList.length ? slugList[nextIndex] : null

  return (
    <>
      <BlogsDetail
        post={post}
        prevSlug={prevSlug}
        nextSlug={nextSlug}
        latestPosts={latestPosts}
      />
    </>
  )
}

export default BlogDetailPage