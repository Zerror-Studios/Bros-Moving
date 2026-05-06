"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import React, { useRef } from 'react'
import Button from '../common/Button';
import { useQuoteStore } from '@/store/useQuoteStore';
import Image from 'next/image';
gsap.registerPlugin(ScrollTrigger);

const VideoSection = () => {
    const { open } = useQuoteStore();
    const videocontainer = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: videocontainer.current,
                start: "top bottom",
                end: "top top",
                scrub: true,
                // markers: true,
            },
        })
        tl.to(".video_inner", {
            width: "100%",
            height: "100%",
            ease: "linear",
            borderRadius: "0rem",
        })
        tl.to(".info_vid_sec", {
            opacity: 1
        }, "<")
    }, { scope: videocontainer })
    return (
        <div ref={videocontainer} className=' video_paren center w-full h-screen overflow-hidden'>
            <div className="w-full  h-full overflow-hidden relative z-10 center">
                <div className=" absolute h-full inset-0  w-full flex flex-col justify-center">
                    <div className="  flex flex-col items-center justify-center w-full space-y-5">
                        <h2 className='text-3xl md:text-5xl  font-semibold text-center text-white '>Worry-Free Moving with Full <br /> Insurance Coverage</h2>
                        <Button variant="glass" onClick={open} >
                            Get an estimate now!
                        </Button>
                    </div>
                    <div className=" info_vid_sec opacity-0 padding absolute bottom-20 md:bottom-24 w-full py-0!  flex items-end">
                        <div className="w-full max_width_layout border-b  pb-5 border-white/40 ">
                            <div className="w-full text-[#ffffff] flex flex-col-reverse max-sm:gap-y-5 md:flex-row  items-center justify-between ">
                                <p className=' max-sm:hidden text-base md:text-lg '>We provide full insurance coverage to keep your belongings safe, <br /> giving you complete peace of mind throughout your move.</p>
                                <p className=' text-center md:hidden text-base md:text-lg '>We provide full insurance coverage to keep your belongings safe, giving you complete peace of mind throughout your move.</p>
                                <Image width={900} height={300} src="/images/homepage/smart_moving/trust_logo.png" className=' w-1/2 md:w-[20%]' alt="loading" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" absolute video_inner w-[85%] md:w-[60%] h-[50%] rounded-3xl overflow-hidden">
                <video poster='/images/hero_video_poster_.webp' loop autoPlay muted playsInline src="/videos/hero_video.mp4" className='cover' alt="loading" />
            </div>
        </div>
    )
}

export default VideoSection