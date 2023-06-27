import uuid from 'react-uuid';
import Icon, { IIcon } from '@/components/atoms/icon/Icon';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, } from "swiper";
import Image from 'next/image';
import { classNames } from '@/utils/functions';

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

const VideoBlock: React.FC<IPromoBlock> = ({ title, subtitle, featuredContentsCollection, view, blockId, sysId }) => {
    if (!featuredContentsCollection) return;
    const uui = uuid();
    const allowTouchMove = view?.isSlider ?? true;
    const hasVideo = featuredContentsCollection?.items?.some(el => el?.externalLink?.includes('www.youtube.com'));

    const linkEmbebed = (str: string) => {
        if (str.includes('www.youtube.com') && str.includes("watch?v=")) {
            return `${BASE_URL}/${str.split("watch?v=")[1]}`;
        } else {
            return str;
        }
    };

    return (
        <section id={blockId ? blockId : sysId} className='section grid grid-cols-1 gap-7 md:gap-9'>
            {(title || subtitle) && (
                <div className='flex flex-col gap-[22px] lg:gap-6 mb-5 text-center'>
                    {title && <h2 className="text-blue-dark text-size-subtitle1 md:text-2xl lg:text-4xl">{title}</h2>}
                    {subtitle && <div className="text-blue-dark text-sm lg:text-base"><p>{subtitle}</p></div>}
                </div>
            )}
            {featuredContentsCollection?.items?.length > 0 && (
                <div className='relative w-full'>
                    {allowTouchMove &&
                        <div className='flex justify-center items-center absolute h-9 w-9 lg:h-16 lg:w-16 left-0 sm:left-5 md:left-[30px] top-1/2 transform -translate-y-1/2 z-10'>
                            <div className={`prevSlide${uui} bg-blue-dark-90 h-9 w-9 lg:h-16 lg:w-16 rounded-full cursor-pointer flex items-center justify-center`}>
                                <Icon {...iconLeft} />
                            </div>
                        </div>
                    }
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={0}
                        slidesPerGroup={1}
                        loopFillGroupWithBlank={true}
                        modules={[Pagination, Navigation]}
                        navigation={{
                            nextEl: `.nextSlide${uui}`,
                            prevEl: `.prevSlide${uui}`
                        }}
                        loop={true}
                        className={classNames(
                            "relative w-full",
                            hasVideo && "aspect-[1026/492] h-auto"
                        )}
                    >
                        {featuredContentsCollection.items.map((link, i) => (
                            <SwiperSlide key={i} className="w-full h-full rounded-xl overflow-hidden" >
                                {({ isActive }) => (
                                    < div className='relative w-full h-full'>
                                        {isActive && link?.externalLink &&
                                            <iframe
                                                id={'swipper' + (i)}
                                                className={classNames(
                                                    'w-full',
                                                    hasVideo && "absolute left-0 top-0 h-full"
                                                )}
                                                src={`${linkEmbebed(link.externalLink)}`}
                                                title={link.name}
                                                frameBorder="0"
                                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                                height={link.iframeHeight ?? "560"}
                                                width="349"
                                            >
                                            </iframe>
                                        }
                                        {link?.promoImage &&
                                            <figure className="w-full h-full object-cover">
                                                <Image
                                                    className="w-full h-full"
                                                    src={link?.promoImage?.url}
                                                    alt={link?.promoImage?.title}
                                                    width={link?.promoImage?.width}
                                                    height={link?.promoImage?.height}
                                                />
                                            </figure>
                                        }
                                    </div>
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {allowTouchMove &&
                        <div className='flex justify-center items-center absolute right-0 h-9 w-9 lg:h-16 lg:w-16 sm:right-5 md:right-[30px] top-1/2 transform -translate-y-1/2 z-10'>
                            <div className={`nextSlide${uui} bg-blue-dark-90 h-9 w-9 lg:h-16 lg:w-16 rounded-full cursor-pointer flex items-center justify-center`}>
                                <Icon {...iconRight} />
                            </div>
                        </div>
                    }
                </div>
            )}
        </section >
    );
};

export default VideoBlock;