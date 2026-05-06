"use client"
import { RiArrowDownSLine } from '@remixicon/react'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'

const ContactForm = () => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        service: "",
        note: ""
    });
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const SERVICES = [
        "Residential Moving",
        "Commercial Moving",
        "Packing & Unpacking",
        "Storage Services",
        "Specialty Moving"
    ];

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };


    const handleSelect = (e, item) => {
        e.stopPropagation();
        setForm((prev) => ({ ...prev, service: item }));
        setOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!dropdownRef.current?.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <div className="w-full padding pb-5! md:pb-10!">
                <div className=" max_width_layout w-full flex flex-col md:flex-row items-stretch border-b border-black/10 pb-5 md:pb-14  relative gap-x-44 ">
                    <div className=" max-sm:hidden h-[calc(100%-3.5rem)] absolute left-1/2 -translate-x-1/2 w-[1px] bg-black/10"></div>
                    <div className=" w-full md:w-1/2 flex flex-col justify-between">
                        <div className="">
                            <h2 className='text-3xl md:text-5xl  font-semibold md:w-[80%] '>Have question? <br />We’re Here to Help!</h2>
                            <p className='text-[#6B6E73] leading-tight text-base md:text-lg mt-2  '>Our expertise and personalized approach ensure you make well-informed decisions, turning your dreams into reality.</p>
                        </div>
                        <form
                            onSubmit={handleSubmit}
                            className="w-full max-sm:mt-5 space-y-3 md:space-y-5"
                        >
                            {/* Full Name */}
                            <div className="flex items-center gap-x-2 border rounded-full px-4 py-3 hover:px-6 hover:border-[#F5344F] transition-all duration-300 border-black/10">
                                <img className='w-5' src="/icons/form_person.svg" alt="loading" />
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Full name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full bg-transparent outline-none placeholder:text-[#6B6E73]"
                                />
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-x-2 border rounded-full px-4 py-3 hover:px-6 hover:border-[#F5344F] transition-all duration-300 border-black/10">
                                <img className='w-5' src="/icons/form_dialer.svg" alt="loading" />
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone number"
                                    value={form.phone}
                                    onChange={handleChange}
                                    className="w-full bg-transparent outline-none placeholder:text-[#6B6E73]"
                                />
                            </div>

                            {/* Services Dropdown */}
                            <div
                                ref={dropdownRef}
                                className="flex relative items-center gap-x-2 border rounded-full px-4 py-3 hover:px-6 hover:border-[#F5344F] transition-all duration-300 border-black/10 cursor-pointer"
                                onClick={() => setOpen((prev) => !prev)}
                            >
                                <img className="w-5" src="/icons/form_setting.svg" alt="loading" />

                                {/* Selected Value */}
                                <span className={`w-full ${form.service ? "text-black" : "text-[#6B6E73]"}`}>
                                    {form.service || "Services"}
                                </span>

                                <RiArrowDownSLine
                                    className={`opacity-40 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                                />

                                {/* Dropdown */}
                                <div
                                    data-lenis-prevent
                                    className={` ${open ? "opacity-100  pointer-events-auto" : "opacity-0 pointer-events-none"}  transition-opacity duration-150 absolute left-0 top-[110%] w-full z-10 custom_scroller h-[26vh] border overflow-y-auto border-black/10 bg-white rounded-xl shadow-md`}
                                >
                                    {SERVICES.map((item, i) => (
                                        <div
                                            key={i}
                                            onClick={(e) => handleSelect(e, item)}
                                            className="w-full p-3 border-b hover:bg-[#F5344F] hover:text-white transition-colors duration-100 cursor-pointer border-black/10"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Note */}
                            <div className="flex items-start gap-x-2 border rounded-2xl px-4 py-3 hover:px-6 hover:border-[#F5344F] transition-all duration-300 border-black/10">
                                <img className='w-5' src="/icons/form_note.svg" alt="loading" />
                                <textarea
                                    data-lenis-prevent
                                    name="note"
                                    placeholder="Additional note"
                                    value={form.note}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full custom_scroller pr-3 bg-transparent outline-none placeholder:text-[#6B6E73] resize-none"
                                />
                            </div>

                            {/* Button */}
                            <button type='submit' className='w-full leading-none center  gap-x-2  text-white rounded-full p-4 bg-[#F5344F]'>  Send Message <img src="/icons/arrow-right.svg" className='w-5 invert-100' alt="loading" /> </button>

                        </form>
                    </div>
                    <div className=" w-full  max-sm:mt-10 md:w-1/2 flex items-center  ">
                        <Image height={600} width={400} src="/images/contactpage/contact_form_img.png" className='w-full' alt="loading" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactForm