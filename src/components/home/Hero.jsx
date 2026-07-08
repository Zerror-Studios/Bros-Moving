"use client";
import React, { useRef } from 'react'
import Button from '../common/Button'
import gsap from 'gsap';
import SplitText from 'gsap/dist/SplitText';
import { useGSAP } from '@gsap/react';
import { useQuoteStore } from '@/store/useQuoteStore';
import CustomEase from 'gsap/dist/CustomEase';
gsap.registerPlugin(SplitText, CustomEase);

const Hero = () => {
    CustomEase.create("custom", "0.77, 0, 0.175, 1");
    const { open } = useQuoteStore();
    const container = useRef();

    useGSAP(() => {
        const line2Split = new SplitText(".line2a", {
            type: "chars",
            charsClass: "word"
        });

        const line3Split = new SplitText(".line3a", {
            type: "chars",
            charsClass: "word"
        });
        const descSplit = new SplitText(".hero_desc", {
            type: "lines",
            linesClass: "line-wrapper"
        });

        descSplit.lines.forEach(line => {
            const wrapper = document.createElement("div");
            wrapper.style.overflow = "hidden";
            wrapper.style.display = "block";
            wrapper.style.width = "fit-content";

            line.parentNode.insertBefore(wrapper, line);
            wrapper.appendChild(line);
        });

        gsap.set([...line2Split.chars, ...line3Split.chars, ...descSplit.lines], {
            yPercent: 100
        });

        const tl = gsap.timeline({ delay: 0.5 })

        tl.to(".line1a", {
            transform: "translateY(-100%)",
            ease: "custom",
            duration: .8
        })
        tl.to(".line2a", {
            transform: "translateY(-8%)",
            ease: "custom",
            duration: .8
        }, "<")
        tl.to(line2Split.chars, {
            yPercent: 0,
            stagger: 0.025,
            ease: "custom"
        }, "<0.1");
        tl.to(".line2a", {
            transform: "translateY(-108%)",
            ease: "custom",
            duration: .8
        })
        tl.to(".line3a", {
            transform: "translateY(-8%)",
            ease: "custom",
            duration: .8
        }, "<")
        tl.to(line3Split.chars, {
            yPercent: 0,
            stagger: 0.01,
            ease: "custom"
        }, "<0.1");
        tl.to(".line3a", {
            color: "white",
            ease: "custom",
            duration: .8
        })

        tl.to(".vide_pren", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: .9, ease: "custom" }, "<");
        tl.to(".hero_video", { scale: 1, duration: .8, ease: "custom" }, "<");

        tl.to(descSplit.lines, {
            yPercent: 0,
            duration: 1,
            ease: "custom",
            stagger: 0.05,
        }, "<0.2");
        tl.to(".quote_btn_paren", {
            opacity: 1,
            ease: "custom",
        }, "<0.4");

    }, { scope: container });


    return (
        <>
            <div ref={container} className="w-full  h-screen  relative p-2 md:p-5">
                <div style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }} className="vide_pren w-full h-full overflow-hidden rounded-2xl md:rounded-4xl">
                    <video poster='/images/hero_poster.png' loop autoPlay muted playsInline src="/videos/hero_video.mp4" className={` hero_video scale-[3] cover brightness-95`} alt="loading" />
                </div>
                <div className="w-full padding absolute  h-full  inset-0">
                    <div className=" max_width_layout  w-full  h-full">
                        <div className=" flex flex-col justify-end h-full  pb-5 md:pb-0 text-white">
                            <div className=" space-y-6 md:space-y-10">
                                <div className="space-y-6 md:space-y-10">
                                    <h1 className="text-4xl md:text-7xl md:w-1/2 font-semibold">
                                        <div className='block overflow-hidden  relative'>
                                            <div aria-hidden="true" className=' line1a whitespace-nowrap text-black'>Hi</div>
                                            <div aria-hidden="true" className=' line2a translate-y-full absolute inset-0 whitespace-nowrap text-[#F5344F]'>We’re Bros moving</div>
                                            <div aria-hidden="true" className=' line3a translate-y-full absolute inset-0 whitespace-nowrap text-[#090A0C]'>Fast, Reliable</div>
                                        </div>
                                        <div className='block overflow-hidden'>
                                            <div aria-hidden="true" className='line3a whitespace-nowrap text-[#090A0C] translate-y-full'>& Stress-Free</div>
                                        </div>
                                        <div className='block overflow-hidden'>
                                            <div aria-hidden="true" className="line3a whitespace-nowrap text-[#090A0C] translate-y-full">
                                                Moving Services
                                            </div>
                                        </div>
                                    </h1>

                                    <p aria-hidden="true" className="hero_desc leading-tight text-base md:text-lg ">
                                        Local & long-distance moving with professional  <br />packing and guaranteed safety.
                                    </p>
                                </div>
                                <div className=" quote_btn_paren opacity-0 flex gap-x-2">
                                    <Button onClick={open} variant="primary">
                                        Get an estimate now!
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subtract absolute z-10 pointer-events-none w-[70vw] md:w-[80vw] h-6 md:h-10 bg-white bottom-[calc(0.5rem-1px)] md:bottom-[calc(1.25rem-1px)] left-1/2 -translate-x-1/2"></div>
            </div>
        </>
    )
}

export default Hero