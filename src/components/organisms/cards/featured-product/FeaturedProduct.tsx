import { IProductDetails } from '@/lib/interfaces/product-cf.interface';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon, { IIcon } from '@/components/atoms/icon/Icon';

const icon: IIcon = {
    size: 23,
    icon: 'pray',
    className: 'z-10'
};

const FeaturedProduct: React.FC<IProductDetails> = ({
    productName,
    state,
    cta,
    price,
    priceBefore,
    rating,
    promotion,
    description,
    images,
    paymentMethods,
}) => {
    return (
        <article className='bg-white p-6 rounded-[10px] shadow-card-overview flex flex-col gap-6 w-full'>
            {(state || promotion || images) && (
                <div className='flex flex-col gap-2'>
                    {(state || promotion) &&
                        <div className='flex gap-1'>
                            {state &&
                                <div className='bg-lucuma-80 text-grey-10 uppercase px-2 py-1 flex items-center text-center rounded-lg text-sm font-medium'>
                                    <p>{state}</p>
                                </div>
                            }
                            {promotion &&
                                <div className='bg-category-sky-blue text-grey-10 uppercase px-2 py-1 flex items-center text-center rounded-lg text-sm font-medium'>
                                    <p>{promotion} de descuento</p>
                                </div>
                            }
                        </div>
                    }
                    {(images || cta) && (
                        <div className='relative aspect-[336/291]'>
                            {images &&
                                <figure className='aspect-[336/291]'>
                                    <Image alt={images[0].title || 'card'} src={images[0].url} fill className='w-full h-full' />
                                </figure>
                            }
                            {cta &&
                                <Link href={cta.href}>
                                    <a className='absolute bottom-0 left-0 px-[18px] py-[9px] bg-lucuma rounded-[20px] z-10'>{cta?.name}</a>
                                </Link>
                            }
                        </div>
                    )}
                </div>
            )}
            {productName && (
                <div className='flex flex-col gap-[25px]'>
                    <div className='flex flex-col gap-[7px]'>
                        <div className='flex justify-between flex-wrap items-center gap-1'>
                            {productName && <h3 className='text-blue-dark title is-4'>{productName}</h3>}
                            <div className='flex items-center gap-[13px] mr-1'>
                                <figure>
                                    <Image
                                        src='/images/star.png'
                                        width={15}
                                        height={15}
                                        alt='star'
                                        priority
                                    />
                                </figure>
                                {rating &&
                                    <div className='text-blue-dark text-size-subtitle2 font-bold'>
                                        <p>{rating}/5</p>
                                    </div>
                                }
                            </div>
                        </div>
                        {description &&
                            <div className='text-size-small text-blue-dark'>
                                <p>{description}</p>
                            </div>
                        }
                    </div>
                    {(price || priceBefore) &&
                        <div className='flex flex-col gap-[6px]'>
                            {priceBefore && <p className='title is-4 line-through text-blue-dark'>{priceBefore}</p>}
                            {price && <p className='title is-2 text-blue-dark'>{price}</p>}
                        </div>
                    }
                    <div className='flex bg-neutral-90 text-grey-10 items-center rounded-lg w-fit uppercase py-1 px-2 gap-[7px] text-sm -mt-0.5'>
                        <span className='w-6 h-6 shrink-0 flex items-center'>
                            <Icon {...icon} />
                        </span>
                        <p>Envio gratuito express</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <div className='text-size-p2'>
                            <p>Puedes pagar con:</p>
                        </div>
                        <div className='flex gap-1'>
                            {paymentMethods?.map((el) => (
                                <p className='title is-5 text-grey-10 bg-neutral-90 rounded-lg px-2 py-1' key={`${el.name}-${productName}`}>
                                    {el.name}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
};

export default FeaturedProduct;