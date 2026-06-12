import PageHero from '@/components/common/PageHero'
import WebPageSchema from '@/components/seo/WebPageSchema'
import ServicesScroll from '@/components/services/ServicesScroll'
import { Const } from '@/components/utils/Constants'
import React from 'react'


export const metadata  = {
  title:
    "Professional Moving Services in Regina | Bros Moving Inc.",

  description:
    "Explore residential, commercial, office, long-distance, packing, storage, junk removal, white glove delivery, and specialty moving services from Bros Moving Inc. across Saskatchewan and Canada.",

  keywords: [
    "moving services Regina",
    "residential moving services",
    "commercial moving services",
    "office moving services",
    "long distance movers Canada",
    "packing and unpacking services",
    "storage services Regina",
    "specialty item movers",
    "white glove furniture delivery",
    "junk removal services",
    "professional movers Saskatchewan",
    "licensed moving company",
    "affordable movers Regina",
    "Bros Moving Inc services",
  ],

  robots: "index, follow",

  openGraph: {
    title:
      "Professional Moving Services | Bros Moving Inc.",

    description:
      "Trusted moving services for homes, offices, businesses, and long-distance relocations with packing, storage, junk removal, and specialty moving solutions.",

    url: `${Const.ClientLink}/services`,
    siteName: "Bros Moving Inc.",
    type: "website",

    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "Bros Moving Inc. Services",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Moving Services | Bros Moving Inc.",

    description:
      "Reliable residential, commercial, office, packing, storage, and long-distance moving services across Saskatchewan and Canada.",

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
  name="Professional Moving Services | Bros Moving Inc."
  description="Explore trusted residential, commercial, office, long-distance, packing, storage, junk removal, white glove delivery, and specialty moving services from Bros Moving Inc."
  url={`${Const.ClientLink}/services`}
/>
      <PageHero
        title={"Bros Moving Reliable Moving Services"}
        description={"Trusted moving solutions for homes and businesses across Saskatchewan."}
        image={"/images/servicepage/service_hero.png"}
        mobImage={"/images/servicepage/mob_service_hero.png"}
      />
      <ServicesScroll />
    </>
  )
}

export default ServicesPage