"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Image from "next/image";

const teamData = [
    {
        name: "Alex Melton",
        role: "CEO & Founder",
        img: "/images/aboutpage/team_members/img1.png",
    },
    {
        name: "Lori Bautista",
        role: "Marketing manager",
        img: "/images/aboutpage/team_members/img2.png",
    },
    {
        name: "Florine Joyce",
        role: "Director",
        img: "/images/aboutpage/team_members/img3.png",
    },
    {
        name: "Alex Melton",
        role: "CEO & Founder",
        img: "/images/aboutpage/team_members/img1.png",
    },
    {
        name: "Lori Bautista",
        role: "Marketing manager",
        img: "/images/aboutpage/team_members/img2.png",
    },
    {
        name: "Florine Joyce",
        role: "Director",
        img: "/images/aboutpage/team_members/img3.png",
    },
];

const OurTeam = () => {
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);
    const swiperRef = useRef(null);

    return (
        <div className="w-full padding">
            <div className="w-full max_width_layout">

                {/* Header */}
                <div className="w-full md:flex items-end justify-between">
                    <h2 className="text-3xl max-sm:hidden md:text-5xl  font-semibold">
                        Meet Our Expert <br /> Team Member
                    </h2>
                    <h2 className="text-3xl md:hidden md:text-5xl  font-semibold">
                        Meet Our Expert Team Member
                    </h2>

                    <p className="text-base max-sm:hidden md:text-lg leading-tight text-[#6B6E73]">
                        Our expert team combines experience, precision, and dedication to
                        <br /> ensure your belongings are handled with care.
                    </p>
                    <p className="text-base max-sm:mt-2 md:hidden md:text-lg leading-tight text-[#6B6E73]">
                        Our expert team combines experience, precision, and dedication to ensure your belongings are handled with care.
                    </p>

                    {/* Buttons */}
                    <div className=" max-sm:mt-2 flex items-end max-sm:justify-end gap-x-2">

                        {/* PREV */}
                        <button
                            disabled={isBeginning}
                            onClick={() => swiperRef.current?.slidePrev()}
                            className={`size-10  border-black/30 center rounded-full border transition-all duration-300
                                ${isBeginning
                                    ? " opacity-40 cursor-not-allowed!"
                                    : " group hover:bg-[#F5344F] hover:border-[#F5344F]"
                                }`}
                        >
                            <img
                                src="/icons/arrow-right.svg"
                                className={`w-4 rotate-180 group-hover:invert-100 `}
                                alt="loading"
                            />
                        </button>

                        {/* NEXT */}
                        <button
                            disabled={isEnd}
                            onClick={() => swiperRef.current?.slideNext()}
                            className={`size-10  border-black/30 center rounded-full border transition-all duration-300
                                ${isEnd
                                    ? " opacity-40 cursor-not-allowed!"
                                    : " group hover:bg-[#F5344F] hover:border-[#F5344F]"
                                }`}
                        >
                            <img
                                src="/icons/arrow-right.svg"
                                className="w-4 group-hover:invert-100"
                                alt="loading"
                            />
                        </button>

                    </div>
                </div>

                {/* Swiper */}
                <div className="md:mt-8">
                    <Swiper
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        onSlideChange={(swiper) => {
                            setIsBeginning(swiper.isBeginning);
                            setIsEnd(swiper.isEnd);
                        }}
                        slidesPerView={3}
                        grabCursor={true}
                        className="cursor-grab active:cursor-grabbing"
                        breakpoints={{
                            0: {
                                slidesPerView: 1.1,
                                spaceBetween: 10,
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                        }}
                    >
                        {teamData.map((member, i) => (
                            <SwiperSlide key={i} className=" pt-6 md:pt-12 group  relative">
                                <div className="w-full relative text-center">
                                    <div className="w-full  flex items-end justify-center relative ">
                                        <img src="/images/aboutpage/team_card_bg.png" className="absolute inset-0 w-full" alt="loading" />
                                        <img src="/images/aboutpage/team_card_bg_red.png" className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 inset-0 w-full" alt="loading" />
                                        <Image width={400} height={400} src={member.img} className="w-[81%] origin-bottom group-hover:scale-105 transition-all duration-300 relative z-10" alt="loading" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl  mt-5 font-semibold">
                                        {member.name}
                                    </h3>
                                    <p className="text-[#6B6E73]">{member.role}</p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default OurTeam;