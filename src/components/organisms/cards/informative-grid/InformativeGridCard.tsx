import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";

const InformativeGridCard: React.FC<IPromoContent> = ({
  promoTitle,
  promoDescription,
  cta,
  ctaLabel,
  externalLink,
  internalLink
}) => {
  return (
    <article className="text-center w-full px-6 py-12">
      {(promoTitle || promoDescription) && (
        <div className="grid gap-8">
          {promoTitle && <h3 className="text-blue-dark">{promoTitle}</h3>}
          {promoDescription &&
            <div className="richtext">
              <div className="text-lg text-grey-30">{documentToReactComponents(promoDescription.json)}</div>
              <br /><br />
              <p className="text-xl text-blue-dark font-semibold">Desde</p>
              <br /><br />
              <p className="text-5xl text-blue-dark font-semibold">$ 10.000</p>
            </div>
          }
          {cta?.href && (
            <div className="flex justify-center">
              <Link href={cta.href}>
                <a className="button text-button">
                  {cta.name}
                </a>
              </Link>
            </div>
          )}
          {ctaLabel &&
            <div className="flex justify-center">
              <Link href={externalLink ? externalLink : internalLink.slug} className='button text-button'>
                {ctaLabel}
              </Link>
            </div>
          }
        </div>
      )}
    </article>
  );
};

export default InformativeGridCard;
