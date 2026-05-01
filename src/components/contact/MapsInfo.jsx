"use client";
import React, { useEffect, useRef, useState } from 'react'
import Button from '../common/Button';

const MapsInfo = () => {
    const mapRef = useRef(null);
    const [mapActive, setMapActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.intersectionRatio < 0.5) {
                    setMapActive(false); // 👈 reset when less than half visible
                }
            },
            {
                threshold: [0, 0.5, 1],
            }
        );

        if (mapRef.current) observer.observe(mapRef.current);

        return () => observer.disconnect();
    }, []);
    return (
        <>
            <div className="w-full padding pt-0!">
                <div className=" max_width_layout w-full grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-10">
                    <div className="w-full flex items-center gap-x-4 rounded-xl md:rounded-3xl bg-[#F9F6F3] p-3 md:p-7">
                        <img src="/icons/contact_dialer.svg" className=' w-14 md:w-20' alt="loading" />
                        <div className="space-y-2 leading-none">
                            <p className='text-[#6B6E73]'>Call Support Centre</p>
                            <p className='text-base md:text-lg font-semibold'>(555) 123-4567</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-x-4 rounded-xl md:rounded-3xl bg-[#F9F6F3] p-3 md:p-7">
                        <img src="/icons/contact_mail.svg" className=' w-14 md:w-20' alt="loading" />
                        <div className="space-y-2 leading-none">
                            <p className='text-[#6B6E73]'>Write us</p>
                            <p className='text-base md:text-lg font-semibold'>info@brosmoving.com</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-x-4 rounded-xl md:rounded-3xl bg-[#F9F6F3] p-3 md:p-7">
                        <img src="/icons/contact_map.svg" className=' w-14 md:w-20' alt="loading" />
                        <div className="space-y-2 leading-none">
                            <p className='text-base md:text-lg font-semibold'>123 Albert Street, Regina, SK S4P 2N5, Canada</p>
                        </div>
                    </div>
                </div>

                <div ref={mapRef} className=" max_width_layout relative  w-full mt-5 md:mt-10 rounded-xl md:rounded-3xl aspect-square md:aspect-2/1 overflow-hidden">

                    {!mapActive && (
                        <Button onClick={() => setMapActive(true)} variant='white' className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                            Click to interact with map
                        </Button>
                    )}

                    <iframe
                        src="https://www.google.com/maps?q=52.3756,4.9032&z=15&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        className={`${mapActive ? "pointer-events-auto brightness-100 blur-[0px]" : "pointer-events-none brightness-75 blur-[1px]"}`}
                    />
                </div>
            </div>
        </>
    )
}

export default MapsInfo