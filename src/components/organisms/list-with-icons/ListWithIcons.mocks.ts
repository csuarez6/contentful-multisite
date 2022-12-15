import {
  IPromoContent
} from "@/lib/interfaces/promo-content-cf.interface";

const data: IPromoContent = {
  title: 'Title',
  icon: 'invoice-filled',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  iconPosition: 'top',
  url: '#',
  ctaLabel: 'button'
};

const iconLeft: IPromoContent = {
  title: 'Title',
  icon: 'invoice-filled',
  iconSize: 'medium',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  iconPosition: 'left'
};

const iconLeftRounded: IPromoContent = {
  title: 'Title',
  icon: 'invoice-filled',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  iconPosition: 'left',
  iconSize: 'small',
  bgIconRounded: 'bg-neutral-90'
};

const iconLeftNoTitle: IPromoContent = {
  icon: 'invoice-filled',
  description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do tempor incididunt ut labore et dolore magna aliqua.',
  iconPosition: 'left'
};

const iconLeftNoDescription: IPromoContent = {
  title: 'Title',
  icon: 'invoice-filled',
  iconPosition: 'left'
};

export const mockListWithIconsProps = {
  data,
  iconLeft,
  iconLeftRounded,
  iconLeftNoTitle,
  iconLeftNoDescription
};