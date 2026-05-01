import React from 'react'

export const associations = [
    {
        id: "01",
        title: "Canadian Association of Movers",
        description:
            "Proud member of the Canadian Association of Movers, upholding industry standards and best practices.",
        logo: "/images/cam-logo.png",
    },
    {
        id: "02",
        title: "Canadian Association of Movers",
        description:
            "Proud member of the Canadian Association of Movers, upholding industry standards and best practices.",
        logo: "/images/cam-logo.png",
    },
    {
        id: "03",
        title: "Canadian Association of Movers",
        description:
            "Proud member of the Canadian Association of Movers, upholding industry standards and best practices.",
        logo: "/images/cam-logo.png",
    },
    {
        id: "04",
        title: "Canadian Association of Movers",
        description:
            "Proud member of the Canadian Association of Movers, upholding industry standards and best practices.",
        logo: "/images/cam-logo.png",
    },
];

const OurCertificates = () => {
    return (
        <>
            <div className="w-full padding pb-0! bg-[#F9F6F3]">
                <div className=" max_width_layout w-full">
                    <div className=" w-full md:flex items-end justify-between">
                        <h2 className='text-3xl md:text-5xl  font-semibold '>Our certifications</h2>
                        <p className='text-base md:text-lg max-sm:mt-2 leading-tight text-[#6B6E73]'>Proudly awarded for our commitment to quality <br /> and customer satisfaction.</p>
                    </div>

                    <div className="w-full pt-10 md:pt-20">
                        {associations.map((association, i) => (
                            <div
                                key={association.id}
                                className="w-full hover:px-5 transition-all duration-300 grid grid-cols-8 max-sm:gap-x-3 md:flex justify-between md:items-center py-7 md:py-5 border-t border-black/10"
                            >
                                <p className='text-[#6B6E73] max-sm:col-span-1 text-base md:text-lg'>0{i + 1}</p>
                                <h3 className='text-2xl md:w-[20%] leading-tight max-sm:col-span-7 font-semibold'>{association.title}</h3>
                                <div className=" max-sm:col-span-1 md:w-[10%]  center">
                                    <img src="/images/aboutpage/certifcate_logo.png" alt="loading" />
                                </div>
                                <p className=' max-sm:col-span-7 max-sm:mt-2 md:w-[30%] leading-tight text-[#6B6E73]'>{association.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default OurCertificates