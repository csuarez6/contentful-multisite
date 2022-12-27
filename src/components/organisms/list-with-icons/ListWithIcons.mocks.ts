import {
  IPromoContent
} from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  iconPosition: 'top',
  cta:{
    href: '#',
    name: 'button'
  }
};

const iconLeft: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  iconSize: 'medium',
  promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  iconPosition: 'left'
};

const iconLeftRounded: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  iconPosition: 'left',
  iconSize: 'small',
  bgIconRounded: 'bg-neutral-90'
};

const iconLeftNoTitle: IPromoContent = {
  promoIcon: 'invoice-filled',
  promoDescription: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  iconPosition: 'left'
};

const iconLeftNoDescription: IPromoContent = {
  promoTitle: 'Title',
  promoIcon: 'invoice-filled',
  iconPosition: 'left'
};

export const mockListWithIconsProps = {
  data,
  iconLeft,
  iconLeftRounded,
  iconLeftNoTitle,
  iconLeftNoDescription
};