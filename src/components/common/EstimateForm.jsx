"use client";

import { useQuoteStore } from "@/store/useQuoteStore";
import { RiCloseLine } from "@remixicon/react";
import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EstimateForm = () => {
    const { isOpen, close } = useQuoteStore();
    const inputRef = useRef(null);
    const [isHomeOpen, setIsHomeOpen] = useState(false);

    const [estimate, setEstimate] = useState(null);
    const [loading, setLoading] = useState(false);
    const [bookingLoading, setBookingLoading] = useState(false);


    const HOME_OPTIONS = [
        "1 Bedroom",
        "2 Bedroom",
        "3 Bedroom",
        "4+ Bedroom",
    ];

    const [form, setForm] = useState({
        fromZip: "",
        toZip: "",
        date: "",
        homeSize: "",
        phone: "",
    });

    const handleClear = () => {
        setEstimate(null)
        setForm({
            fromZip: "",
            toZip: "",
            date: "",
            homeSize: "",
            phone: "",
        });
    }

    const handleChange = (field, value) => {
        if (["fromZip", "toZip", "homeSize"].includes(field)) {
            setEstimate(null);
        }
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const BEDROOM_HOURS = {
        "1 Bedroom": 2,
        "2 Bedroom": 3,
        "3 Bedroom": 5,
        "4+ Bedroom": 9,
    };

    const calculateEstimate = async () => {
        try {
            if (
                !form.fromZip ||
                !form.toZip ||
                !form.homeSize
            ) {
                 toast.error("Please fill all fields");
                return;
            }
            setLoading(true);


            const res = await fetch(
                "/api/calculate-distance",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        fromZip: form.fromZip,
                        toZip: form.toZip,
                    }),
                }
            );

            const data = await res.json();

            if (data.error) {
                 toast.error(data.error);
                return;
            }
            console.log(data)
            const kms = data.kms;

            const movingCost = kms.toFixed(1) * 3.8;

            const hours =
                BEDROOM_HOURS[form.homeSize] || 0;

            const laborCost =
                hours * 139;

            const total =
                movingCost + laborCost;

            setEstimate({
                kms,
                movingCost,
                laborCost,
                hours,
                total,
            });
        } catch (err) {
            toast.error(err.message || "Estimate calculation failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const bookEstimate = async () => {
        try {
            if (!estimate) {
                toast.error("Please calculate an estimate before booking.");
                return;
            }

            if (
                !form.fromZip ||
                !form.toZip ||
                !form.date ||
                !form.homeSize ||
                !form.phone
            ) {
                toast.error("Please fill all fields before booking.");
                return;
            }

            setBookingLoading(true);

            const res = await fetch("/api/book-estimate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    form,
                    estimate,
                }),
            });

            const data = await res.json();

            if (!res.ok || data.error) {
                toast.error(data.error || "Booking failed. Please try again.");
                return;
            }

            toast.success("Booking confirmed successfully.");
            handleClear();
            close();
        } catch (err) {
            toast.error(err.message || "Booking failed. Please try again.");
        } finally {
            setBookingLoading(false);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        await calculateEstimate();
    };

    useEffect(() => {
        if (isOpen) {
            if (window.lenis) window.lenis.stop();
        } else {
            if (window.lenis) window.lenis.start();
        }
    }, [isOpen])


    return (
        <>

            <ToastContainer position="top-right" autoClose={3000} />



            <div
                className={`w-full fixed inset-0 padding h-screen z-[110] 
      bg-black/40 backdrop-blur-[8px] transition-all duration-300
      ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
            >   

                <div className="max_width_layout w-full flex justify-center items-center h-full">

                    <form
                        onSubmit={handleSubmit}
                        className={` w-full  md:w-[35%] bg-white rounded-[2rem] p-6 md:p-8 shadow-lg 
          transition-all duration-300
          ${isOpen ? "scale-100 " : "scale-95"}`}
                    >

                        <div className="w-full flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold">
                                    Get an estimate now!
                                </h2>
                                <p className="text-[#6B6E73] leading-tight  ">
                                    Fill in your move details to get an instant estimate.
                                </p>
                            </div>

                            <div
                                onClick={close}
                                className="p-1 border rounded-full hover:bg-[#F5344F] cursor-pointer hover:text-white transition-all duration-300 hover:scale-125"
                            >
                                <RiCloseLine size={14} />
                            </div>
                        </div>
                        <div data-lenis-prevent className={` ${estimate ? "h-[50vh] pr-3 overflow-y-scroll pb-5" : ""}  my-8 transition-all duration-300 custom_scroller `}>

                            <div className="w-full flex gap-4  relative rounded-xl">

                                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded-full">
                                    <div className="w-10 h-10 flex items-center justify-center bg-[#F5344F] rounded-full shadow-[0px_6px_10px_rgba(245,52,79,0.25)]">
                                        <img src="/icons/swap_arrow.svg" className="w-4" alt="arrow" />
                                    </div>
                                </div>

                                {/* From */}
                                <div className="w-1/2 bg-[#F5F2EF] rounded-xl p-4 space-y-2">
                                    <label className="text-sm text-[#6B6E73] font-medium">From Zip</label>
                                    <input
                                        type="text"
                                        value={form.fromZip}
                                        onChange={(e) => handleChange("fromZip", e.target.value)}
                                        placeholder="Enter zip"
                                        className="w-full bg-transparent outline-none text-xl font-semibold"
                                    />
                                </div>

                                {/* To */}
                                <div className="w-1/2 bg-[#F5F2EF] rounded-xl p-4 space-y-2 text-right">
                                    <label className="text-sm text-[#6B6E73] font-medium">To Zip</label>
                                    <input
                                        type="text"
                                        value={form.toZip}
                                        onChange={(e) => handleChange("toZip", e.target.value)}
                                        placeholder="Enter zip"
                                        className="w-full bg-transparent outline-none text-xl font-semibold text-right"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-8">

                                {/* Date */}
                                <div className="w-1/2">
                                    <label
                                        htmlFor="moving-date"
                                        className="font-medium mb-2 text-[#0F172A] block"
                                    >
                                        Moving Date
                                    </label>

                                    <div
                                        onClick={() => inputRef.current?.showPicker?.()}
                                        className="flex items-center justify-between bg-[#F5F2EF] rounded-full px-4 py-3 cursor-pointer"
                                    >
                                        <input
                                            id="moving-date" // ✅ link to label
                                            ref={inputRef}
                                            type="date"
                                            value={form.date}
                                            onChange={(e) => handleChange("date", e.target.value)}
                                            className={`bg-transparent outline-none ${form.date ? "text-[#0F172A]" : "text-[#6B6E73]"
                                                } font-medium w-full appearance-none pointer-events-none`}
                                        />

                                        <img
                                            alt="" // ✅ decorative icon
                                            src="/icons/calender.svg"
                                            className="w-5 opacity-60 pointer-events-none"
                                        />
                                    </div>
                                </div>

                                {/* Home Size */}
                                <div className="w-1/2 relative">
                                    <label className="font-medium mb-2 text-[#0F172A] block">
                                        Home Size
                                    </label>

                                    <div
                                        onClick={() => setIsHomeOpen((prev) => !prev)}
                                        className="flex items-center justify-between bg-[#F5F2EF] rounded-full px-4 py-3 cursor-pointer"
                                    >
                                        <span className={`w-full font-medium ${form.homeSize ? "text-black" : "text-[#6B6E73]"}`}>
                                            {form.homeSize || "Home size"}
                                        </span>
                                        <img alt="arrow" src="/icons/drop_arrow.svg" className="w-4 opacity-60" />
                                    </div>

                                    {/* Dropdown */}
                                    <div
                                        className={`absolute left-0 top-[110%] w-full z-10 border border-black/10 bg-white rounded-xl shadow-md overflow-hidden transition-all duration-150 ${isHomeOpen
                                            ? "opacity-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 translate-y-2 pointer-events-none"
                                            }`}
                                    >
                                        {HOME_OPTIONS.map((item, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    handleChange("homeSize", item);
                                                    setIsHomeOpen(false);
                                                }}
                                                className="w-full p-3 border-b hover:bg-[#F5344F] hover:text-white cursor-pointer border-black/10"
                                            >
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8">
                                <label className="font-medium mb-2 text-[#0F172A] block">
                                    Phone Number
                                </label>
                                <div className="flex items-center justify-between bg-[#F5F2EF] rounded-full px-4 py-3">
                                    <input
                                        type="tel"
                                        value={form.phone}
                                        onChange={(e) => handleChange("phone", e.target.value)}
                                        placeholder="+(123) 456 7890"
                                        className="bg-transparent outline-none text-[#0F172A] font-medium w-full"
                                    />
                                    <img alt="phone" src="/icons/phone.svg" className="w-5 opacity-60" />
                                </div>
                            </div>

                            {estimate && (
                                <>
                                    <div className="mt-6 rounded-2xl bg-[#F5F2EF] p-5 space-y-2">
                                        <div className="flex justify-between">
                                            <span>Distance</span>
                                            <span>{estimate.kms.toFixed(1)} km</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Moving Cost</span>
                                            <span>${estimate.movingCost.toFixed(2)}</span>
                                        </div>

                                        <div className="flex justify-between">
                                            <span>Labor Cost</span>
                                            <span>${estimate.laborCost.toFixed(2)}</span>
                                        </div>

                                        <div className="border-t pt-3 flex justify-between text-lg font-semibold">
                                            <span>Total Estimate</span>
                                            <span>${estimate.total.toFixed(2)}</span>
                                        </div>

                                    </div>
                                    <div className="w-full flex justify-end">
                                        <button type="button" onClick={handleClear} className="hover:underline text-xs capitalize pr-1 mt-2">clear Details</button>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="flex gap-x-2">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`group ${estimate ? "w-1/2" : "w-full"} bg-[#090A0C] hover:bg-white hover:text-[#090A0C] hover:font-medium border border-[#090A0C] text-white py-3 rounded-full flex items-center justify-center gap-2 text-base md:text-lg transition-all duration-300`}
                            >
                                {loading ? "Calculating..." : "Calculate Cost"}
                            </button>
                            {estimate && (
                                <button
                                    type="button"
                                    onClick={bookEstimate}
                                    disabled={bookingLoading}
                                    className={`group ${estimate ? "w-1/2" : "w-0"} bg-[#F5344F] hover:bg-white hover:text-[#F5344F] hover:font-medium border border-[#F5344F] text-white py-3 rounded-full flex items-center justify-center gap-2 text-base md:text-lg transition-all duration-300`}
                                >
                                    {bookingLoading ? "Booking..." : "Book Now"}
                                </button>
                            )}
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default EstimateForm;
