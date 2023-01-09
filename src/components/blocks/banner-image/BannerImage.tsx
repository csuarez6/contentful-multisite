import Image from 'next/image';
import { IPromoBlock } from '@/lib/interfaces/promo-content-cf.interface';
import { classNames } from '@/utils/functions';

const BannerImage: React.FC<IPromoBlock> = ({ image, view }) => {
    if (!image) return;

    const bannerHeightClass = () => {
        switch (view.bannerHeight) {
            case "Small":
                return "h-[146px]";
            case "Medium":
                return "h-[163px]";
            default:
                return "h-[466px]";
        }
    };

    return (
        <section className='grid'>
            <div className="container mx-auto">
                <div className={view.bannerWidth === "Large" ? "-mx-[50vw]" : "relative"}>
                    <div className={
                        classNames(
                            "mx-auto relative",
                            view.bannerWidth === "Large" ? "w-screen" : "w-full",
                            bannerHeightClass()
                        )}
                    >
                        <figure className="relative w-full h-full">
                            <Image
                                className="w-full h-full object-cover object-center"
                                alt={image.title ?? 'Imagen de banner'}
                                src={image.url}
                                width={1440}
                                height={466}
                                priority
                            />
                        </figure>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BannerImage;
