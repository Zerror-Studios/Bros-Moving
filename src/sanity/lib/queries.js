import { groq } from 'next-sanity'

export const POSTS_QUERY = groq`*[_type == "post"] | order(coalesce(publishDate, _createdAt) desc){
  _id,
  coverTitle,
  "title": coalesce(coverTitle, heroTitle),
  description,
  author,
  "slug": slug.current,
  publishDate,
  "date": publishDate,
  "services": services[]->{
    _id,
    title,
    "slug": slug.current
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  },
  "coverImage": cover_img{
    asset->
  }
}`

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  coverTitle,
  "title": coalesce(heroTitle, coverTitle),
  heroTitle,
  description,
  author,
  "slug": slug.current,
  publishDate,
  "date": publishDate,
  "services": services[]->{
    _id,
    title,
    "slug": slug.current
  },
  "categories": categories[]->{
    _id,
    title,
    "slug": slug.current
  },
  "coverImage": cover_img{
    asset->
  },
  cover_img{
    asset->
  },
  hero_img{
    asset->
  },
  introSection,
  sections,
}`

export const POST_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(coalesce(publishDate, _createdAt) desc){
  "slug": slug.current
}`

export const BLOG_FILTERS_QUERY = groq`{
  "services": *[_type == "service"] | order(title asc){
    _id,
    title,
    "slug": slug.current
  },
  "categories": *[_type == "category"] | order(title asc){
    _id,
    title,
    "slug": slug.current
  }
}`
