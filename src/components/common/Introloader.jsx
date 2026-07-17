"use client";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import SplitText from 'gsap/dist/SplitText';
import React from 'react'
import Button from './Button';
if (typeof window !== 'undefined') { gsap.registerPlugin(SplitText); }

const Introloader = () => {

    useGSAP(() => {
        const anim_words = SplitText.create(".intr_txt", {
            type: "words, chars",
        });
        const anim_words2 = SplitText.create(".short_txt", {
            type: "words, chars",
        });

        const tl = gsap.timeline({ delay: 0.5 });

        tl.to(".hello_txt", { yPercent: -100, ease: "power2.out" })
            .to(".hello_txt", { yPercent: -200, ease: "power2.out" }, ">+=0.2")

            .to(anim_words.words, {
                yPercent: -100,
                ease: "power2.out",
                stagger: 0.02,
            }, "<")

            .to(anim_words.words, {
                yPercent: -200,
                ease: "power2.out",
                stagger: 0.02,
            })

            .to(anim_words2.words, {
                yPercent: -100,
                ease: "power2.out",
                stagger: 0.02,
            }, "<")

            .set(".introloader_fix", { display: "none" });

    });

    return (
        <>
            <div className=" introloader_fix w-full fixed inset-0 h-screen z-100  bg-[#f1f1f1] pointer-events-none padding flex items-center">
                <div className=" max_width_layout h-full w-full flex items-center justify-between">
                    <div className="  flex flex-col justify-end h-full  pb-5 md:pb-0 text-white  space-y-6 md:space-y-10">
                        <div className="  space-y-6 md:space-y-10">
                            <h1 className="text-4xl md:text-7xl md:w-1/2 font-semibold">
                                ⁠We make <br /> moving reliable & <br /> stress-free
                            </h1>

                            <p className=" leading-tight text-base md:text-lg ">
                                Local & long-distance moving with professional  <br />packing and guaranteed safety.
                            </p>
                        </div>
                        <div className="  opacity-0 pointer-events-none  flex gap-x-2">
                            <Button onClick={open} variant="primary">
                                Get an estimate now!
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Introloader