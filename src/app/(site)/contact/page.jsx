import PageHero from '@/components/common/PageHero'
import ContactForm from '@/components/contact/ContactForm'
import MapsInfo from '@/components/contact/MapsInfo'
import WebPageSchema from '@/components/seo/WebPageSchema';
import { Const } from '@/components/utils/Constants';
import React from 'react'

export const contactMetadata = {
  title: "Contact Bro's Moving Inc | Book Moving Services",

  description:
    "Contact Bro's Moving Inc for reliable moving, junk removal, packing, and delivery services. Get a free quote today for residential and commercial moves.",

  keywords: [
    "contact movers",
    "book moving service",
    "moving company contact",
    "get moving quote",
    "junk removal contact",
    "Bro's Moving contact",
  ],

  robots: "index, follow",

  openGraph: {
    title: "Contact Bro's Moving Inc",
    description:
      "Reach out to book professional moving and junk removal services. Fast response and affordable pricing.",
    url: `${Const.ClientLink}/contact`,
    siteName: "Bro's Moving Inc",
    type: "website",
    images: [
      {
        url: `${Const.ClientLink}/og.png`,
        width: 1200,
        height: 630,
        alt: "Contact Bro's Moving Inc",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Bro's Moving Inc",
    description:
      "Book your move or request a quote for reliable moving services.",
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
        name="Contact Bro's Moving Inc"
        description="Get in touch with Bro's Moving Inc for moving, packing, and junk removal services."
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