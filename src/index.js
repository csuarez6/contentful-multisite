export const setUpMultisite = (request, config) => {
  try {
    const domain = request?.headers?.get("host");
    const path = request?.nextUrl?.pathname;

    const defaultSite = {
      is_default_site: true,
      domain: "localhost",
      root_path: "/",
      site_paths: "^/((?!api|_next/static|_next/image|favicon.ico).*)",
    };

    const defaultSiteList = [defaultSite];
    const siteList = config?.siteList ?? defaultSiteList;

    for (const site of siteList) {
      if (
        domain?.match(site?.domain) !== null ||
        site?.is_default_site === true
      ) {
        if (path.match(site?.site_paths ?? defaultSite?.site_paths)) {
          const newUrl = `${site?.root_path}${path}`;
          return new URL(newUrl, request?.url);
        }
        break;
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
