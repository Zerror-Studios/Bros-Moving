import { sanityFetch } from '@/sanity/lib/live'
import { POSTS_QUERY } from '@/sanity/lib/queries'
import TrendingBlogsClient from './TrendingBlogsClient';

const TrendingBlogs = async () => {
  const { data: posts = [] } = await sanityFetch({
    query: POSTS_QUERY,
  });

  return <TrendingBlogsClient posts={posts} />;
};

export default TrendingBlogs;