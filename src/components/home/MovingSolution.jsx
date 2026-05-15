import React from 'react'


const MovingSolution = () => {
    return (
        <>
            <div className="w-full padding">
                <div className=" max_width_layout w-full flex items-end justify-between">
                    <h2 className='text-3xl md:text-5xl  font-semibold '>Smart Moving Solutions <br /> for Every Need</h2>
                    <p className='text-base md:text-lg text-[#6B6E73]'>Every move is different, which is why we offer <br /> tailored solutions to match your specific needs.</p>
                    <div className="flex items-end gap-x-4">
                        <button className=' size-10 center  border border-black/30 rounded-full '> <img src="/icons/arrow-right.svg" className='w-4 rotate-180' alt="loading" /> </button>
                        <button className=' size-10 center bg-[#F5344F] rounded-full '> <img src="/icons/arrow-right.svg" className='w-4 invert-100' alt="loading" /> </button>
                    </div>
                </div>

                <div className=" max_width_layout w-full mt-14 flex justify-between">
                    <div className="w-1/2 relative">
                        <div className="absolute bottom-16 px-10 w-full flex items-center justify-between">
                            <div className="text-white">
                                <h3 className='text-2xl md:text-3xl  font-semibold mb-2'>Long Distance Moving</h3>
                                <p className=' text-base md:text-lg leading-tight'>Coast-to-coast with tracking.</p>
                            </div>
                            <button className=' size-14 center bg-[#F5344F] rounded-full '> <img src="/icons/arrow-right.svg" className='w-6 invert-100' alt="loading" /> </button>
                        </div>
                        <img className='w-full' src="/images/homepage/smart_moving/img1.png" alt="loading" />
                    </div>
                    <div className="w-1/2 pl-44 space-y-5">
                        <img className='w-full' src="/images/homepage/smart_moving/img2.png" alt="loading" />
                        <div className="">
                            <h3 className='text-2xl md:text-3xl  font-semibold mb-2'>Long Distance Moving</h3>
                            <p className=' text-base md:text-lg leading-tight'>Coast-to-coast with tracking.</p>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default MovingSolution