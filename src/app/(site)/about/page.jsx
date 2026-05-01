import AboutParagraph from '@/components/about/AboutParagraph'
import OurCertificates from '@/components/about/OurCertificates'
import OurMission from '@/components/about/OurMission'
import OurTeam from '@/components/about/OurTeam'
import PageHero from '@/components/common/PageHero'
import WebPageSchema from '@/components/seo/WebPageSchema'
import { Const } from '@/components/utils/Constants'
import React from 'react'


export const aboutMetadata = {
  title: "About Bro's Moving Inc | Trusted Moving Company",

  description:
    "Learn about Bro's Moving Inc — a professional moving company known for reliable service, affordable pricing, and customer satisfaction.",

  keywords: [
    "about moving company",
    "professional movers company",
    "trusted movers",
    "moving company Regina",
    "Bro's Moving Inc about",
  ],

  robots: "index, follow",

  openGraph: {
    title: "About Bro's Moving Inc",
    description:
      "Trusted movers delivering safe, efficient, and stress-free relocation services.",
    url: `${Const.ClientLink}/about`,
    siteName: "Bro's Moving Inc",
    type: "website",
    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "About Bro's Moving Inc",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About Bro's Moving Inc",
    description:
      "Reliable and professional moving services for homes and businesses.",
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
        name="About Bro's Moving Inc"
        description="Discover Bro's Moving Inc — professional movers offering efficient and affordable relocation services."
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