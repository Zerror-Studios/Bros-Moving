import PageHero from '@/components/common/PageHero'
import Testimonials from '@/components/home/Testimonials'
import VideoSection from '@/components/home/VideoSection'
import WebPageSchema from '@/components/seo/WebPageSchema'
import ServicesScroll from '@/components/services/ServicesScroll'
import React from 'react'


export const servicesMetadata = {
  title: "Moving Services | Bro's Moving Inc",

  description:
    "Explore Bro's Moving Inc services including local & long-distance moving, junk removal, packing, furniture delivery, and assembly for homes and businesses.",

  keywords: [
    "moving services",
    "local moving",
    "long distance movers",
    "junk removal services",
    "packing services",
    "furniture delivery",
    "office moving services",
    "residential moving",
  ],

  robots: "index, follow",

  openGraph: {
    title: "Bro's Moving Inc Services",
    description:
      "Complete moving solutions including packing, junk removal, and relocation services.",
    url: `${Const.ClientLink}/services`,
    siteName: "Bro's Moving Inc",
    type: "website",
    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "Moving Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Moving Services | Bro's Moving Inc",
    description:
      "Professional moving services tailored for residential and commercial needs.",
    images: [`${Const.ClientLink}/og.png`],
  },

  alternates: {
    canonical: `${Const.ClientLink}/services`,
  },
};

const ServicesPage = () => {
  return (
    <>

      <WebPageSchema
        name="Moving Services | Bro's Moving Inc"
        description="Professional moving services including packing, junk removal, delivery, and relocation."
        url={`${Const.ClientLink}/services`}
      />
      <PageHero
        title={"Bro's Moving Reliable Moving Services"}
        description={"Trusted moving solutions for homes and businesses across Saskatchewan."}
        image={"/images/servicepage/service_hero.png"}
        mobImage={"/images/servicepage/mob_service_hero.png"}
      />
      <ServicesScroll />
      {/* <VideoSection /> */}
      {/* <Testimonials /> */}
    </>
  )
}

export default ServicesPage