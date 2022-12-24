import { IPromoContent } from "@/lib/interfaces/promo-content-cf.interface";
import Link from "next/link";

const InformativeGridCard: React.FC<IPromoContent> = ({
  title,
  description,
  cta,
}) => {
  return (
    <article className="text-center w-full px-6 py-12">
      {(title || description) && (
        <div className="grid gap-8">
          {title && <h3 className="text-blue-dark">{title}</h3>}
          {description &&
            <div className="richtext">
              <p className="text-lg text-grey-30">{description}</p>
              <br /><br />
              <p className="text-xl text-blue-dark font-semibold">Desde</p>
              <br /><br />
              <p className="text-5xl text-blue-dark font-semibold">$ 10.000</p>
            </div>
          }
          {cta && (
            <div className="flex justify-center">
              <Link href={cta.href}>
                <a className="button text-button">
                  {cta.name}
                </a>
              </Link>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default InformativeGridCard;
