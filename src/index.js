import { serverRuntimeConfig } from "next.config.js";

export const setUpMultisite = (request) => {
  try {
    const config = serverRuntimeConfig?.siteList;
    const domain = request?.headers?.get("host");
    const path = request?.nextUrl?.pathname;

    console.log("The domain is:", domain);
    console.log("The path is:", path);
    
    const defaultSite = {
      is_default_site: true,
      domain: "localhost",
      root_path: "/",
      site_paths: ".*"
    };

    const siteList = config ?? [defaultSite];

    for (const site of siteList) {
      if (
        domain.match(site?.domain) !== null ||
        site?.is_default_site === true
      ) {
        if (path.match(site?.site_paths ?? defaultSite?.site_paths)) {
          const newUrl = new URL(`${site?.root_path}${path}`, request?.url);
          console.log("The newUrl is:", newUrl);
          return NextResponse.rewrite(newUrl);
        }
      }
    }
  } catch (error) {
    console.error(
      "An error has ocurred in the setUpMultisite service, more details:",
      error
    );
    throw new Error("An error in setUpMultisite service");
  }
};
