import { serverRuntimeConfig } from "next.config.js";
import { NextRequest, NextResponse } from "next/server";

type Site = {
  domain: string;
  root_path: string;
  site_paths: string;
  is_default_site?: boolean;
};

type SiteList = Site[];

export const setUpMultisite = async (request: NextRequest) => {
  try {
    const domain = request.headers.get("host");
    const path = request.nextUrl.pathname;

    const defaultSite: Site = {
      is_default_site: true,
      domain: "localhost",
      root_path: "/",
      site_paths: "^/((?!api|_next/static|_next/image|favicon.ico).*)",
    };

    const defaultSiteList = [defaultSite];
    const siteList: SiteList = serverRuntimeConfig?.siteList ?? defaultSiteList;

    for (const site of siteList) {
      if (
        domain.match(site.domain) !== null ||
        site?.is_default_site === true
      ) {
        if (path.match(site?.site_paths ?? defaultSite.site_paths)) {
          const newUrl = `${site.root_path}${path}`;
          return NextResponse.rewrite(new URL(newUrl, request.url));
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
