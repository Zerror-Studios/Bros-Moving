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
                    setMapActive(false);
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
                            <p className='text-[#6B6E73]'>Call Support</p>
                            <p className='text-base md:text-lg font-semibold'>+1 306-551-1911</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-x-4 rounded-xl md:rounded-3xl bg-[#F9F6F3] p-3 md:p-7">
                        <img src="/icons/contact_mail.svg" className=' w-14 md:w-20' alt="loading" />
                        <div className="space-y-2 leading-none">
                            <p className='text-[#6B6E73]'>Write us</p>
                            <p className='text-base md:text-lg font-semibold'>
                                brosmovingregina@gmail.com
                            </p>
                        </div>
                    </div>
                    <div className="w-full flex items-center gap-x-4 rounded-xl md:rounded-3xl bg-[#F9F6F3] p-3 md:p-7">
                        <img src="/icons/contact_map.svg" className=' w-14 md:w-20' alt="loading" />
                        <div className="space-y-2 leading-none">
                            <p className='text-base md:text-lg font-semibold'>139 Birchwood Crescent, Regina, SK S4S 5S3, Canada</p>
                        </div>
                    </div>
                </div>

                <div
                    ref={mapRef}
                    className="max_width_layout relative w-full mt-5 md:mt-10 rounded-xl md:rounded-3xl aspect-square md:aspect-2/1 overflow-hidden"
                >
                    {!mapActive && (
                        <Button
                            onClick={() => setMapActive(true)}
                            variant="white"
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                        >
                            Click to interact with map
                        </Button>
                    )}

                    <iframe
                        title="Office location on Google Maps"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2417.457325570417!2d-104.6020304!3d50.398291699999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8731234955c10dfb%3A0x50b6f94bd891bc1a!2sBros%20Moving%20Inc.!5e1!3m2!1sen!2sin!4v1778846620616!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        className={`${mapActive
                            ? "pointer-events-auto brightness-100 blur-[0px]"
                            : "pointer-events-none brightness-75 blur-[1px]"
                            }`}
                    />
                </div>
            </div>
        </>
    )
}

export default MapsInfo