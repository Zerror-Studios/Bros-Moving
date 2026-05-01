import ExpertSection from '@/components/home/ExpertSection'
import Hero from '@/components/home/Hero'
import MovingSolution from '@/components/home/MovingSolution'
import ServicesSection from '@/components/home/ServicesSection'
import StepsSection from '@/components/home/StepsSection'
import Testimonials from '@/components/home/Testimonials'
import TrendingBlogs from '@/components/home/TrendingBlogs'
import VideoSection from '@/components/home/VideoSection'
import WhyChooseSection from '@/components/home/WhyChooseSection'
import WebPageSchema from '@/components/seo/WebPageSchema'
import { Const } from '@/components/utils/Constants'
import React from 'react'


export const metadata = {
  title: "Bro's Moving Inc | Reliable Moving & Junk Removal Services",

  description:
    "Bro's Moving Inc offers professional local & long-distance moving, junk removal, packing, furniture delivery, and assembly services. Safe, affordable, and stress-free moving solutions for homes and businesses.",

  keywords: [
    "Bro's Moving Inc",
    "moving company Regina",
    "local movers",
    "long distance moving services",
    "junk removal service",
    "furniture delivery",
    "packing and moving services",
    "office relocation services",
    "residential movers",
    "affordable movers near me",
    "professional movers Canada"
  ],

  robots: "index, follow",

  metadataBase: new URL(Const.ClientLink),

  openGraph: {
    title: "Bro's Moving Inc | Safe & Reliable Moving Services",
    description:
      "Trusted moving company offering packing, junk removal, and relocation services. Professional, efficient, and affordable.",
    url: `${Const.ClientLink}/`,
    siteName: "Bro's Moving Inc",
    type: "website",
    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "Bro's Moving Inc Moving Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Bro's Moving Inc | Moving & Junk Removal Experts",
    description:
      "Professional movers for homes & businesses. Safe, affordable, and stress-free moving services.",
    images: [`${Const.ClientLink}/og.png`],
  },

  alternates: {
    canonical: `${Const.ClientLink}/`,
  },

  other: {
    "image_src": `${Const.ClientLink}/og.png`,
  },
};

const HomePage = () => {
  return (
    <>

      <WebPageSchema
        name="Bro's Moving Inc | Moving & Junk Removal Services"
        description="Professional moving company offering local & long-distance relocation, junk removal, packing, furniture delivery, and assembly services."
        url={`${Const.ClientLink}/`}
      />

      <Hero />
      <ExpertSection />
      <ServicesSection />
      <StepsSection />
      <WhyChooseSection />
      <Testimonials />
      <VideoSection />
      <TrendingBlogs />
    </>
  )
}

export default HomePage