"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { Link } from 'next-view-transitions'
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Button from './Button';
import { useQuoteStore } from '@/store/useQuoteStore';
import { RiCloseLine, RiMenu3Line } from '@remixicon/react';
gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  {
    label: "Home",
    href: "/"
  },
  {
    label: "About",
    href: "/about"
  },
  {
    label: "Services",
    href: "/services"
  },
  {
    label: "Blogs",
    href: "/blogs"
  },
  {
    label: "Contact",
    href: "/contact"
  },
]
const Header = () => {
  const [isMobileMenu, setIsMobileMenu] = useState(false)

  const { open } = useQuoteStore();
  const pathname = usePathname();

  useGSAP(() => {

    gsap.to(".header", {
      opacity: 1,
      delay: 3
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".header",
        start: "bottom top",
        end: "+=150",
        scrub: true,
      },
    });
    tl.to(".header", {
      backgroundColor: "#090A0C",
      paddingTop: "0.6rem",
    });
    tl.to(".header_inner", {
      paddingBottom: "0.6rem",
    }, "<");

  });

  useEffect(() => {
    if (isMobileMenu === true) {
      const openTl = gsap.timeline();
      openTl.to(".mobile_menu", {
        left: 0,
        duration: 1,
        ease: "expo.inOut"
      })
      openTl.to(".mob_menu_anim", {
        transform: "translateY(0)",
        stagger: 0.1
      })
    } else {
      const closeTl = gsap.timeline();
      closeTl.to(".mob_menu_anim", {
        transform: "translateY(-100%)",
        stagger: 0.1
      })
      closeTl.to(".mobile_menu", {
        left: "100%",
        duration: 1,
        ease: "expo.inOut"
      })
      closeTl.to(".mob_menu_anim", {
        transform: "translateY(100%)",
        duration: 0.01
      })
    }
  }, [isMobileMenu])

  return (
    <>

      <div className="mobile_menu md:hidden fixed top-0 left-full w-full h-[100svh] bg-white z-500">
        <button onClick={() => setIsMobileMenu(false)} className='p-3 text-white rounded-full md:hidden absolute top-5 right-5 bg-[#F5344F]' ><RiCloseLine size={16} /></button>
        <nav className=" w-full h-full flex flex-col uppercase text-3xl  font-medium gap-y-5  justify-center items-center gap-x-10">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;

            return (
              <div onClick={() => setIsMobileMenu(false)} key={i} className="w-fit flex flex-col overflow-hidden group cursor-pointer">
                <Link href={link.href} className=" mob_menu_anim relative translate-y-full">
                  {link.label}

                  <span
                    className={`
              absolute left-0 bottom-0 h-[1.5px] rounded-full w-full bg-white
              transition-transform duration-300 ease-out
              ${isActive ? "scale-x-100 origin-left" : "scale-x-0 origin-left group-hover:scale-x-100"}
            `}
                  ></span>
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      <div className={`header ${pathname === "/" ? "opacity-0" : ""} w-full px-4 md:px-24 pt-4 md:pt-12 z-100  fixed  top-0 left-0 will-change-transform`}>
        <div className=" header_inner w-full max_width_layout flex items-center pb-4  justify-between border-b border-white/20 ">
          <Link href='/' className=" w-[20%] md:w-[30%]  ">
            <img src="/logo.svg" className='' alt="loading" />
          </Link>
          <nav className=" hidden md:flex  w-[40%] text-white justify-center items-center gap-x-10">
            {navLinks.map((link, i) => {
              const isActive = pathname === link.href;

              return (
                <div key={i} className="w-fit flex flex-col group cursor-pointer">
                  <Link href={link.href} className="relative">
                    {link.label}

                    <span
                      className={`
              absolute left-0 bottom-0 h-[1.5px] rounded-full w-full bg-white
              transition-transform duration-300 ease-out
              ${isActive ? "scale-x-100 origin-left" : "scale-x-0 origin-left group-hover:scale-x-100"}
            `}
                    ></span>
                  </Link>
                </div>
              );
            })}
          </nav>
          <div className=" hidden md:flex w-[30%] shrink-0 items-center gap-x-5 justify-end leading-none">
            <button className=' text-white flex whitespace-nowrap items-center group gap-x-2'>
              <img src="/icons/call.svg" className='w-5' alt="loading" />
              <p className='relative'>
                +1 (800) 123-4567
                <span
                  className={`
                  absolute left-0 bottom-[-3px] h-[1.5px] rounded-full w-full bg-white
                  transition-transform duration-300 ease-out
                  origin-left scale-x-0 group-hover:scale-x-100
                  `}
                ></span>
              </p>
            </button>
            <Button onClick={open} variant="white">
              Get an estimate now!
            </Button>
          </div>

          <button onClick={() => setIsMobileMenu(true)} className='p-3 bg-white rounded-full md:hidden ' ><RiMenu3Line size={16} /></button>
        </div>
      </div>
    </>
  )
}

export default Header