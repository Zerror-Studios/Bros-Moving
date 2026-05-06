"use client";
import React from 'react'
import Button from './Button';
import { Link } from 'next-view-transitions';
import { useQuoteStore } from '@/store/useQuoteStore';
import Image from 'next/image';

const footerData = [
  {
    title: "Services",
    links: [
      { label: "Residential Moving", href: "/services" },
      { label: "Commercial Moving", href: "/services" },
      { label: "Packing & Unpacking", href: "/services" },
      { label: "Storage Services", href: "/services" },
      { label: "Specialty Moving", href: "/services" },
    ],
  },
  {
    title: "Locations",
    links: [
      { label: "Regina", href: "" },
      { label: "Winnipeg", href: "" },
      { label: "Alberta", href: "" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Blogs", href: "/blogs" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/" },
      { label: "Terms of Service", href: "/" },
      { label: "Privacy Policy", href: "/" },
    ],
  },
];
const Footer = () => {
  const { open } = useQuoteStore();

  return (
    <>
      <div className="w-full  bg-[#090A0C] padding pb-6!">
        <div className=" max_width_layout w-full relative flex items-center">
          <div className=" px-5 md:px-16 max-sm:py-12  absolute inset-0 w-full flex flex-col md:flex-row items-center justify-between">
            <div className="w-full space-y-2 md:space-y-5 text-white">
              <h2 className='text-3xl md:text-5xl  font-semibold '>Ready for a Stress- <br />Free Move?</h2>
              <p className='text-base md:text-lg leading-tight text-[#F9F6F3]'>Hear Directly from Our Customers About Their <br /> Smooth and Stress-Free Moving Experiences</p>
            </div>
            <div className=" w-full md:w-[25%]  md:flex flex-col items-end leading-none space-y-2 md:space-y-5">
              <Button variant="white" onClick={open}>
                Get an estimate now!
              </Button>
              <button className=' w-fit flex text-white items-center gap-x-2 px-4 py-3 border font-medium border-white rounded-full'><img src="/icons/call.svg" className='w-5' alt="loading" /> (555) 123-4567</button>
            </div>
          </div>
          <Image width={1000} height={500} src="/images/fotter_red_box.png" className='w-full max-sm:hidden' alt="loading" />
          <img src="/images/mob_footer_red_box.png" className='w-full md:hidden' alt="loading" />
        </div>

        <div className=" max-sm:text-sm max_width_layout w-full relative text-[#F9F6F3]">

          <div className="absolute inset-0 w-full flex md:items-center  md:px-16 ">
            <div className=" w-full h-fit md:flex justify-between">
              <div className="w-full center py-6 border-b border-white/20 md:hidden!">
                <img className='w-28 md:hidden' src="/logo.svg" alt="loading" />
              </div>
              <div className=" w-fit grid grid-cols-2 font-light md:flex max-sm:gap-x-5 max-sm:border-b border-white/20 pr-10 max-sm:py-6 md:flex-col justify-between">
                <img className='w-28 max-sm:hidden' src="/logo.svg" alt="loading" />
                <p className='leading-tight  md:hidden'>Fast, reliable & stress-free moving  services across the country.</p>
                <p className='leading-tight max-sm:hidden'>Fast, reliable & stress-free moving <br /> services across the country.</p>
                <div className=" max-sm:space-y-2">
                  <div className="flex items-center gap-x-2">
                    <img src="/icons/red_dialer.svg" alt="loading" className='w-5' />
                    <p className=''>(555) 123-4567</p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    <img src="/icons/red_mail.svg" alt="loading" className='w-5' />
                    <p className=''>info@brosmoving.com</p>
                  </div>
                </div>
              </div>
              <div className=" grid grid-cols-2  max-sm:mt-6 md:flex gap-y-10 md:gap-x-16">
                {footerData.map((item, i) => (
                  <div key={i} className="col-span-1">
                    <p className='text-base md:text-lg mb-4 uppercase text-[#F5344F] font-semibold'>{item.title}</p>
                    <div className="flex flex-col gap-y-2 font-light">
                      {item.links.map((link, j) => (
                        <Link href={link.href} key={j} className=' md:hover:underline'>{link.label}</Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <img src="/images/footer_outline.svg" className='w-full max-sm:hidden' alt="loading" />
          <img src="/images/mob_footer_outline.svg" className='w-full md:hidden ' alt="loading" />
        </div>

        <div className="w-full center text-center">
          <p className='text-[#F9F6F3] max-sm:text-xs max-sm:w-[60%]  font-light'>© 2024 Bro's Moving. All rights reserved. Licensed and Insured.</p>
        </div>
      </div>
    </>
  )
}

export default Footer