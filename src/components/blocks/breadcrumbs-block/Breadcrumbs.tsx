import React from "react";
import CustomLink from "@/components/atoms/custom-link/CustomLink";
import Icon from "@/components/atoms/icon/Icon";
import { IPromoBlock } from "@/lib/interfaces/promo-content-cf.interface";

const Breadcrumbs: React.FC<IPromoBlock> = ({ ctaCollection }) => {
  return (
    <section className="py-6">
      <nav>
        <ul className="flex gap-0.5 flex-wrap">
          {ctaCollection?.items.map((el, i) => (
            <li
              key={`${el.name ?? el.promoTitle}-${i}`}
              className="items-center gap-0.5 hidden [&:nth-last-child(n+2):nth-last-child(-n+3)]:flex md:flex"
            >
              {Boolean(i) && (
                <Icon icon="arrow-right" className="h-6 w-6" />
              )}
              {i + 1 !== ctaCollection.items.length ? (
                <CustomLink
                  content={el}
                  linkClassName="flex items-center text-[#466072] font-semibold hover:underline leading-none"
                >
                  {el.promoTitle ?? el.name}
                </CustomLink>
              ) : (
                <p className="text-blue-dark font-semibold leading-none">
                  {el.promoTitle ?? el.name}
                </p>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
};

export default Breadcrumbs;
