import { IFooter } from "@/lib/interfaces/footer-cf.interface";

const FooterBlock: React.FC<IFooter> = ({
  title,
  menu,
  social,
  footerText
}) => {
  return (
    <footer id="footer" className="bg-white container mx-auto" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:flex xl:gap-32">
          <div className="xl:max-w-xs">
            <p className="font-bold text-2xl sm:text-3xl md:text-4xl xl:text-5xl xl:leading-tight text-gray-500">
              {title}
            </p>
          </div>
          <div className="mt-12 grid xl:grow xl:mt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 md:gap-8">
              {menu && menu.map((menuItem) => (
                <div key={menuItem.name}>
                  <h3 className="text-base font-medium text-gray-900">{menuItem.name}</h3>
                  <ul role="list" className="mt-4 space-y-4">
                    {menuItem.list.map((listItem) => (
                      <li key={listItem.name}>
                        <a href={listItem.href} className="text-base text-gray-500 hover:text-gray-900">
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
        <ul className="flex flex-wrap justify-center mt-16 mb-4 gap-20">
          {social && social.map((item) => (
            <li key={item.name}>
              <a href={item.href} className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-[30px] w-[30px]" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
        <div className="pt-12 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-16">
          <div>
            <p className="text-base text-gray-400">{footerText}</p>
          </div>
          <div className="w-64 shrink-0">
            <figure className="my-2">
              <img src="https://via.placeholder.com/256x55" alt="Logo Industria y Comercio" />
            </figure>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock;