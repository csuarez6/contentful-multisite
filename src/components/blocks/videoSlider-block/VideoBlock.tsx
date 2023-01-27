import Icon, { IIcon } from '@/components/atoms/icon/Icon';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import "swiper/css";
import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, } from "swiper";

const BASE_URL = "https://www.youtube.com/embed";
const iconLeft: IIcon = {
    icon: 'arrow-left',
    size: 60,
    className: 'z-10'
};

const iconRight: IIcon = {
    icon: 'arrow-right',
    size: 60,
    className: 'z-10'
};


const VideoBlock: React.FC<IPromoBlock> = ({ title, subtitle, links }) => {
    if(!links) return;

    const linkEmbebed = (str: string) => {
        if (!str.includes('www.youtube.com')) return new Error('add a video youtube link');
        if (str.includes("watch?v=")) {
            return `${BASE_URL}/${str.split("watch?v=")[1]}`;
        } else {
            return str;
        }
    };
    
    return (
        <section>
            {(title || subtitle) && (
                <div className='flex flex-col  gap-[22px] lg:gap-6 mb-5 text-center'>
                    {title && <h2 className="text-blue-dark text-size-subtitle1 md:text-2xl lg:text-4xl">{title}</h2>}
                    {subtitle && <div className="text-blue-dark text-sm lg:text-base"><p>{subtitle}</p></div>}
                </div>
            )}
            <div className='relative w-full'>
                <div className='flex justify-center items-center absolute left-0 sm:left-5 md:left-[30px] top-0 bottom-0 z-10'>
                    <div className='prevSlide bg-blue-dark-90 h-9 w-9 lg:h-16 lg:w-16 rounded-full cursor-pointer flex items-center justify-center'>
                        <Icon {...iconLeft} />
                    </div>
                </div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    slidesPerGroup={1}
                    loopFillGroupWithBlank={true}
                    modules={[Pagination, Navigation]}
                    navigation={{
                        nextEl: `.nextSlide`,
                        prevEl: `.prevSlide`
                    }}
                    loop={links.length > 1 ? true : false}
                    className="relative w-full h-auto max-h-[492px]"
                >
                    {links?.map((link, i) => (
                        <SwiperSlide key={i} className="w-full h-auto">
                            <div className='relative pb-[53.5%] pt-[25px] h-0'>
                                <iframe
                                    className='rounded-xl absolute left-0 top-0 h-full w-full max-h-[492px]'
                                    src={`${linkEmbebed(link.href)}`}
                                    title={link.name}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                    height="560"
                                    width="349"
                                >
                                </iframe>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='flex justify-center items-center absolute right-0 sm:right-5 md:right-[30px] top-0 bottom-0 z-10'>
                    <div className={`nextSlide bg-blue-dark-90 h-9 w-9 lg:h-16 lg:w-16 rounded-full cursor-pointer flex items-center justify-center`}>
                        <Icon {...iconRight} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VideoBlock;