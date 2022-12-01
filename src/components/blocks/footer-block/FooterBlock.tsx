import Image from "next/image";
import { IFooter } from "@/lib/interfaces/footer-cf.interface";
import Icon from "@/components/atoms/icon/Icon";

const FooterBlock: React.FC<IFooter> = ({
  title,
  menu,
  social,
  footerText,
}) => {
  return (
    <footer
      id="footer"
      className="bg-gradient-footer overflow-x-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="xl:container mx-auto">
        <div className="py-12 px-2 sm:px-4 lg:px-8 2xl:px-[46px] lg:pt-10 lg:pb-[62px]">
          <div className="xl:flex xl:gap-32 pb-10">
            <div className="xl:max-w-xs pt-0.5">
              <p className="title is-1 text-white">{title}</p>
            </div>
            <div className="pt-12 grid xl:grow xl:pt-0">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
                {menu &&
                  menu.map((menuItem) => (
                    <div key={menuItem.name}>
                      <h3 className="text-white">{menuItem.name}</h3>
                      <ul role="list" className="pt-[10px] space-y-3">
                        {menuItem.list.map((listItem) => (
                          <li key={listItem.name}>
                            <a
                              href={listItem.href}
                              className="text-base text-white hover:underline"
                            >
                              {listItem.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <ul className="flex flex-wrap justify-center pt-4 pb-2 gap-16">
            {social &&
              social.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="text-white hover:text-neutral-90"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon
                      icon={item.name}
                      className="h-[46px] w-[46px] p-[7px]"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
          </ul>
          <hr className="min-w-[100vw] -mx-[50vw] border-t-[0.5px] border-neutral-70" />
          <div className="pt-10 flex flex-col sm:flex-row justify-between gap-16">
            <div>
              <p className="text-size-p2 text-white">{footerText}</p>
            </div>
            <div className="w-[311px] mt-1 shrink-0">
              <figure className="relative w-100">
                <Image
                  src="/images/industria-y-comercio-logo.png"
                  alt="Industria y Comercio"
                  layout="responsive"
                  width={622}
                  height={150}
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock;
