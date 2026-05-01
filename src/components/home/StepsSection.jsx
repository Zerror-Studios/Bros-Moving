"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react'
import Button from '../common/Button';
import { useQuoteStore } from '@/store/useQuoteStore';
gsap.registerPlugin(ScrollTrigger);

const StepsSection = () => {
  const { open } = useQuoteStore();
  const stepsContainer = useRef()

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stepsContainer.current,
        start: "top top",
        end: "+=1500",
        pin: true,
        scrub: true,
        // markers: true,
      },
    });
    if (window.innerWidth < 750) {
      tl.fromTo(
        ".steps_card",
        {
          rotate: (i) => [15, -15, 20, -20][i],
        },
        {
          rotate: (i) => [0, 0, 0, 0][i],
          stagger: 0.3,
          ease: "power3.out",
        }
      );
      tl.from(
        ".steps_card",
        {
          y: "100vh",
          stagger: 0.3,
          ease: "power3.out",
        }, "<"
      );
    } else {
      tl.fromTo(
        ".steps_card",
        {
          rotate: (i) => [15, -15, 20, -20][i],
        },
        {
          rotate: (i) => [0, 0, 0, 0][i],
          stagger: 0.1,
          ease: "power3.out",
        }
      );
      tl.from(
        ".steps_card",
        {
          x: "150vw",
          stagger: 0.1,
          ease: "power3.out",
        }, "<"
      );
    }
  }, { scope: stepsContainer });

  return (
    <>
      <div ref={stepsContainer} className=" steps_section_paren w-full  h-screen relative overflow-hidden">
        <img className='w-full h-full' src="/images/homepage/steps_section/steps_bg.png" alt="loading" />

        <div className=" padding w-full  h-full flex gap-y-10 flex-col justify-center items-center  absolute top-0 left-0 z-10 ">
          <div className="text-center">
            <h2 className='text-3xl md:text-5xl  font-semibold text-center text-white '>Simple Steps to Get Moving</h2>
            <p className=' text-white text-base md:text-lg mt-2 leading-tight  '>Reliable moving services built on care, efficiency, and clear  communication.</p>
          </div>
          <div className=" max_width_layout relative w-full max-sm:h-[65%] flex max-sm:justify-center md:grid grid-cols-4 items-center gap-x-5">

            <div className=" steps_card  max-sm:absolute max-sm:w-[80vw] steps_card_1 w-[100%]  text-white  overflow-hidden aspect-3/4 bg-[#F9F6F3] rounded-2xl flex flex-col justify-between p-7">
              <div className="w-full absolute inset-0 z-[1] h-full">
                <img className='w-full' src="/images/homepage/steps_section/img1.png" alt="loading" />
              </div>
              <div className="size-10 relative z-10 center leading-none font-medium bg-white text-[#F5344F] rounded-full text-base md:text-lg">
                01
              </div>
              <div className="relative z-10">
                <h3 className='text-2xl font-semibold mb-2'>Book Your Move</h3>
                <p className='leading-tight'>Your move, handled with care and precision.</p>
              </div>

            </div>

            <div className=" steps_card  max-sm:absolute max-sm:w-[80vw] steps_card_2 w-[100%]    overflow-hidden aspect-3/4 bg-[#F9F6F3] rounded-2xl flex flex-col justify-between p-7">
              <div className="w-full absolute inset-0 z-[1] h-full">
                <img className='w-full' src="/images/homepage/steps_section/img2.png" alt="loading" />
              </div>
              <div className="w-full  relative z-10 flex items-center gap-x-4">
                <div className="size-10  center leading-none font-medium bg-white text-[#F5344F] rounded-full text-base md:text-lg">
                  02
                </div>
                <h3 className='text-2xl font-semibold '>Packing & Prep</h3>
              </div>
              <div className="relative z-10">
                <p className='leading-tight text-[#6B6E73]'>Our experts arrive with premium materials to secure your belongings for safe transit.</p>
              </div>

            </div>

            <div className="steps_card  max-sm:absolute max-sm:w-[80vw] steps_card_3 w-[100%]    overflow-hidden aspect-3/4 bg-[#F9F6F3] rounded-2xl flex flex-col justify-between p-7">
              <div className="w-full absolute inset-0 z-[1] h-full">
                <img className='w-full' src="/images/homepage/steps_section/img3.png" alt="loading" />
              </div>
              <div className="size-10 relative z-10 center leading-none font-medium bg-white text-[#F5344F] rounded-full text-base md:text-lg">
                03
              </div>
              <div className="relative z-10">
                <h3 className='text-2xl font-semibold mb-2'>Loading & Transport</h3>
                <p className='leading-tight text-[#6B6E73]'>Efficient loading into state-of-the-art trucks followed by GPS-tracked transportation.</p>
              </div>

            </div>

            <div className="steps_card  max-sm:absolute max-sm:w-[80vw] steps_card_4 w-[100%]    overflow-hidden aspect-3/4 bg-[#F9F6F3] rounded-2xl  p-7">
              <div className="w-full absolute inset-0 z-[1] h-full">
                <img className='w-full' src="/images/homepage/steps_section/img4.png" alt="loading" />
              </div>
              <div className="w-full  relative z-10 flex items-center gap-x-4">
                <div className="size-10  center leading-none font-medium bg-white text-[#F5344F] rounded-full text-base md:text-lg">
                  04
                </div>
              </div>
              <div className="relative z-10">
                <h3 className='text-2xl font-semibold mt-4 mb-2'>Unloading & Setup</h3>
                <p className='leading-tight text-[#6B6E73]'>Final placement and assembly in your new space. We don't leave until you're settled.</p>
              </div>

            </div>
          </div>
          {/* <Button onClick={open} variant="white">
              Get an estimate now!
            </Button> */}
        </div>
      </div>
    </>
  )
}

export default StepsSection