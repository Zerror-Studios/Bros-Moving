import PageHero from '@/components/common/PageHero'
import ContactForm from '@/components/contact/ContactForm'
import MapsInfo from '@/components/contact/MapsInfo'
import WebPageSchema from '@/components/seo/WebPageSchema';
import { Const } from '@/components/utils/Constants';
import React from 'react'

export const metadata  = {
  title:
    "Contact Bros Moving Inc. | Get a Free Moving Quote Today",

  description:
    "Contact Bros Moving Inc. for residential, commercial, office, long-distance, packing, storage, junk removal, and specialty moving services across Saskatchewan and Canada.",

  keywords: [
    "contact Bros Moving Inc",
    "Regina moving company contact",
    "get moving quote",
    "book moving services",
    "moving company Regina",
    "residential movers contact",
    "commercial moving quote",
    "long distance moving services",
    "packing services Regina",
    "junk removal services",
    "office movers Saskatchewan",
    "licensed movers Canada",
    "affordable movers Regina",
  ],

  robots: "index, follow",

  openGraph: {
    title:
      "Contact Bros Moving Inc. | Reliable Moving Services",

    description:
      "Reach out to Bros Moving Inc. for professional moving, packing, storage, junk removal, and relocation services with transparent pricing and trusted support.",

    url: `${Const.ClientLink}/contact`,
    siteName: "Bros Moving Inc.",
    type: "website",

    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "Contact Bros Moving Inc.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Contact Bros Moving Inc. | Book Professional Movers",

    description:
      "Get in touch for trusted residential, commercial, office, and long-distance moving services across Saskatchewan and Canada.",

    images: [`${Const.ClientLink}/og.png`],
  },

  alternates: {
    canonical: `${Const.ClientLink}/contact`,
  },
};

const page = () => {
  return (
    <>
      <WebPageSchema
        name="Contact Bros Moving Inc."
        description="Contact Bros Moving Inc. for trusted residential, commercial, office, packing, storage, junk removal, and long-distance moving services across Saskatchewan and Canada."
        url={`${Const.ClientLink}/contact`}
      />
      <PageHero
        title={"Contact Bro’s Moving Experts"}
        description={"Our experienced team at Bro’s Moving is here to guide you every step of the way. "}
        image={"/images/contactpage/contact_hero.png"}
        mobImage={"/images/contactpage/mob_contact_hero.png"}
      />
      <ContactForm />
      <MapsInfo />
    </>
  )
}

export default page