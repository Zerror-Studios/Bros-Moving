import { groq } from 'next-sanity'

export const POSTS_QUERY = groq`*[_type == "post"] | order(coalesce(date, _createdAt) desc){
  _id,
  title,
  author,
  "slug": slug.current,
  date,
  coverImage
}`

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  author,
  "slug": slug.current,
  date,
  coverImage,
  details,
  seo
}`

export const POST_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)] | order(coalesce(date, _createdAt) desc){
  "slug": slug.current
}`
