import AboutParagraph from '@/components/about/AboutParagraph'
import OurCertificates from '@/components/about/OurCertificates'
import OurMission from '@/components/about/OurMission'
import OurTeam from '@/components/about/OurTeam'
import PageHero from '@/components/common/PageHero'
import WebPageSchema from '@/components/seo/WebPageSchema'
import { Const } from '@/components/utils/Constants'
import React from 'react'


export const metadata  = {
  title:
    "About Bros Moving Inc. | Trusted Movers in Regina & Saskatchewan",

  description:
    "Learn about Bros Moving Inc., a licensed and insured moving company in Regina trusted for residential, commercial, office, and long-distance moving services across Saskatchewan.",

  keywords: [
    "about Bros Moving Inc",
    "Regina moving company",
    "trusted movers Saskatchewan",
    "licensed movers Regina",
    "insured moving company",
    "professional movers Canada",
    "residential movers Regina",
    "commercial moving company",
    "experienced moving team",
    "local movers Saskatchewan",
  ],

  robots: "index, follow",

  openGraph: {
    title:
      "About Bros Moving Inc. | Reliable & Professional Moving Services",

    description:
      "Discover Bros Moving Inc., a trusted Regina-based moving company known for safe, affordable, and stress-free moving services across Saskatchewan and Canada.",

    url: `${Const.ClientLink}/about`,
    siteName: "Bros Moving Inc.",
    type: "website",

    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "About Bros Moving Inc.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "About Bros Moving Inc. | Trusted Movers in Saskatchewan",

    description:
      "Professional residential, commercial, office, and long-distance movers delivering reliable and stress-free relocation services.",

    images: [`${Const.ClientLink}/og.png`],
  },

  alternates: {
    canonical: `${Const.ClientLink}/about`,
  },
};

const AboutPage = () => {
  return (
    <>
      <WebPageSchema
        name="About Bros Moving Inc."
        description="Bros Moving Inc. is a licensed and insured moving company in Regina providing trusted residential, commercial, office, packing, and long-distance moving services across Saskatchewan and Canada."
        url={`${Const.ClientLink}/about`}
      />
      <PageHero
        title={"Moving You Forward with Care"}
        description={"We help you move forward with care, making every relocation smooth and stress-free."}
        image={"/images/aboutpage/about_hero.png"}
        mobImage={"/images/aboutpage/mob_about_hero.png"}
      />
      <AboutParagraph />
      <OurMission />
      <OurCertificates />
      <OurTeam />
    </>
  )
}

export default AboutPage