import { groq } from 'next-sanity'

export const POSTS_QUERY = groq`*[_type == "post"] | order(coalesce(date, _createdAt) desc){
  _id,
  title,
  author,
  "slug": slug.current,
  date,
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
  coverImage{
    asset->
  }
}`

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  author,
  "slug": slug.current,
  date,
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
  coverImage{
    asset->
  },
  details,
  seo
}`

export const POST_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(coalesce(date, _createdAt) desc){
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
