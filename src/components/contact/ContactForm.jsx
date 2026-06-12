"use client"
import { RiArrowDownSLine } from '@remixicon/react'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactForm = () => {
    const [form, setForm] = useState({
        name: "",
        phone: "",
        service: "",
        note: ""
    });
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!form.name.trim()) {
            toast.error("Please enter your name.");
            return;
        }
        if (!form.phone.trim()) {
            toast.error("Please enter your phone number.");
            return;
        }
        if (!form.service) {
            toast.error("Please select a service.");
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong. Please try again.');
            }

            toast.success("Message sent successfully!");
            setForm({
                name: "",
                phone: "",
                service: "",
                note: ""
            });
        } catch (error) {
            toast.error(error.message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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

            <ToastContainer position="top-right" autoClose={3000} />

            <div className="w-full padding pb-5! md:pb-10!">
                <div className=" max_width_layout w-full flex flex-col md:flex-row items-stretch border-b border-black/10 pb-5 md:pb-14  relative gap-x-44 ">
                    <div className=" max-sm:hidden h-[calc(100%-3.5rem)] absolute left-1/2 -translate-x-1/2 w-[1px] bg-black/10"></div>
                    <div className=" w-full md:w-1/2 flex flex-col gap-y-8 justify-between">
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
                            <button 
                                type='submit' 
                                disabled={isSubmitting}
                                className={`w-full leading-none center gap-x-2 text-white rounded-full p-4 bg-[#F5344F] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#d02c43]'} transition-colors duration-200`}
                            >  
                                {isSubmitting ? 'Sending...' : 'Send Message'} 
                                {!isSubmitting && <img src="/icons/arrow-right.svg" className='w-5 invert-100' alt="loading" />}
                            </button>

                        </form>
                    </div>
                    <div className=" w-full  max-sm:mt-10 rounded-2xl overflow-hidden md:w-1/2 flex items-center  relative ">
                    <div className="subtract absolute z-10 pointer-events-none rotate-90  w-[70vw] md:w-[25vw] h-6 md:h-10 left-[-30%] bg-[#fff] top-1/2 -translate-y-1/2"></div>
                        <Image fill src="/images/aboutpage/mission_img.webp" className='cover' alt="loading" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactForm