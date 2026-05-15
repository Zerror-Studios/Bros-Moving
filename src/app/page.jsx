import ExpertSection from '@/components/home/ExpertSection'
import Hero from '@/components/home/Hero'
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
  title:
    "Bros Moving Inc. | Trusted Moving Company in Regina & Saskatchewan",

  description:
    "Bros Moving Inc. is a licensed and insured moving company in Regina offering residential, commercial, office, long-distance, packing, storage, junk removal, and specialty moving services across Saskatchewan and Canada.",

  keywords: [
    "Bros Moving Inc",
    "moving company Regina",
    "Regina movers",
    "Saskatchewan moving company",
    "residential moving services",
    "commercial moving services",
    "office moving services",
    "long distance movers Canada",
    "packing and unpacking services",
    "storage services Regina",
    "specialty item movers",
    "piano movers Regina",
    "junk removal services",
    "white glove furniture delivery",
    "licensed and insured movers",
    "affordable movers Saskatchewan",
    "professional movers Canada",
  ],

  robots: "index, follow",

  metadataBase: new URL(Const.ClientLink),

  openGraph: {
    title:
      "Bros Moving Inc. | Professional & Stress-Free Moving Services",

    description:
      "Trusted Regina movers providing residential, commercial, office, packing, storage, junk removal, and long-distance moving services across Saskatchewan and Canada.",

    url: `${Const.ClientLink}/`,
    siteName: "Bros Moving Inc.",
    type: "website",

    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "Bros Moving Inc. Moving Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Bros Moving Inc. | Reliable Residential & Commercial Movers",

    description:
      "Licensed and insured movers offering safe, affordable, and stress-free moving services across Saskatchewan and Canada.",

    images: [`${Const.ClientLink}/og.png`],
  },

  alternates: {
    canonical: `${Const.ClientLink}/`,
  },

  other: {
    image_src: `${Const.ClientLink}/og.png`,
  },
};

const HomePage = () => {
  return (
    <>

      <WebPageSchema
        name="Bros Moving Inc. | Professional Moving Services in Regina"
        description="Bros Moving Inc. is a trusted licensed and insured moving company offering residential, commercial, office, long-distance, packing, storage, junk removal, and specialty moving services across Saskatchewan and Canada."
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