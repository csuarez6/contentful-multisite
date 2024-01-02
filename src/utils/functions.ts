import { HOME_SLUG } from "@/constants/url-paths.constants";
import { INavigation } from "@/lib/interfaces/menu-cf.interface";
import { LineItem } from "@commercelayer/sdk";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

export const classColumns = (columns = 1, ignoreCols = []) => {
  const classes = ["grid-cols-1"];
  if (columns > 1 && !ignoreCols.includes(2)) classes.push("md:grid-cols-2");
  if (columns > 2 && !ignoreCols.includes(3)) classes.push("lg:grid-cols-3");
  if (columns > 3 && !ignoreCols.includes(4)) classes.push("xl:grid-cols-4");
  if (columns > 4 && !ignoreCols.includes(5)) classes.push("2xl:grid-cols-5");
  return classes.join(" ");
};

export const classColumnsFlex = {
  1: "listIcons-grill-1",
  2: "listIcons-grill-2",
  3: "listIcons-grill-3",
  4: "listIcons-grill-4",
  5: "listIcons-grill-5"
};

export const showProductTotal = (productPrice, installPrice, warrantyPrice) => {
  const productPriceTmp = productPrice ?? 0;
  const installPriceTmp = (installPrice && installPrice.length > 0) ? installPrice[0].total_amount_float : 0;
  const warrantyPriceTmp = (warrantyPrice && warrantyPrice.length > 0) ? warrantyPrice[0].total_amount_float : 0;
  return productPriceTmp + installPriceTmp + warrantyPriceTmp;
};

export const generateAmountCents = (line_items: LineItem[]) => {
  return line_items.map((line_item: LineItem) => {
    return {
      ...line_item,
      product_amount_float: showProductTotal(
        line_item?.total_amount_float,
        line_item?.["installlation_service"],
        line_item?.["warranty_service"]
      )
    };
  });
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const getBackgroundColorClass = (name) => {
  switch (name) {
    case "Blanco":
      return {
        background: "bg-white",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
    case "Negro":
      return {
        background: "bg-black",
        title: "text-white",
        text: "text-white"
      };
    case "Gris":
      return {
        background: "bg-grey-120",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
    case "Gris Claro":
      return {
        background: "bg-grey-100",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
    case "Azul":
      return {
        background: "bg-neutral-80",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
    case "Azul Degradado":
      return {
        background: "bg-gradient-blue",
        title: "text-white",
        text: "text-white"
      };
    case "Degradado 1":
      return {
        background: "bg-gradient-1",
        title: "text-white",
        text: "text-white"
      };
    case "Degradado 2":
      return {
        background: "bg-gradient-2",
        title: "text-blue-dark",
        text: "text-neutral-30 drop-shadow-[0_1px_1px_rgb(255,255,255,0.65)] shadow-white"
      };
    case "Degradado 3":
      return {
        background: "bg-gradient-3",
        title: "text-blue-dark",
        text: "text-neutral-30 drop-shadow-[0_1px_1px_rgb(255,255,255,0.65)] shadow-white"
      };
    case "Degradado 4":
      return {
        background: "bg-gradient-4",
        title: "text-blue-dark",
        text: "text-blue-dark drop-shadow-[0_1px_1px_rgb(255,255,255,0.65)] shadow-white"
      };
    case "Degradado 5":
      return {
        background: "bg-gradient-5",
        title: "text-white",
        text: "text-white"
      };
    case "Degradado 6":
      return {
        background: "bg-gradient-6",
        title: "text-white",
        text: "text-white"
      };
    case "Degradado 7":
      return {
        background: "bg-gradient-7",
        title: "text-white",
        text: "text-white"
      };
    case "Degradado 8":
      return {
        background: "bg-gradient-8",
        title: "text-white",
        text: "text-white"
      };
    case "Azul Degradado Oscuro":
      return {
        background: "bg-gradient-blue-dark",
        title: "text-white",
        text: "text-white"
      };
    case "Azul profundo":
      return {
        background: "bg-sky-900",
        title: "text-white",
        text: "text-white"
      };
    case "Azul Oscuro":
      return {
        background: "bg-blue-dark",
        title: "text-white",
        text: "text-white"
      };
    case "Verde":
      return {
        background: "bg-green-900",
        title: "text-white",
        text: "text-white"
      };
    case "Violeta":
      return {
        background: "bg-indigo-900",
        title: "text-white",
        text: "text-white"
      };
    default:
      return {
        background: "bg-transparent",
        title: "text-blue-dark",
        text: "text-neutral-30"
      };
  }
};

export const getTextAlignClass = (align) => {
  switch (align) {
    case "Izquierda":
      return "text-left";
    case "Centrado":
      return "text-center";
    default:
      return "text-center";
  }
};

export const getButtonType = (type) => {
  switch (type) {
    case "Primario":
      return "button-primary";
    case "Secundario":
      return "button-secondary";
    case "Contorno":
      return "button-outline";
    default:
      return "text-button";
  }
};

export const getAlign = (name) => {
  switch (name) {
    case "Centro":
      return "center";
    case "Izquierda":
      return "left";
    case "Derecha":
      return "right";
    default:
      return "center";
  }
};

export const scrollContent = (idContainer: string) => {
  document
    .querySelector("#" + idContainer)
    .scrollIntoView({ behavior: "smooth", block: "start" });
};

export const isGasAppliance = (marketId: string) => {
  return marketId && marketId === process.env.NEXT_PUBLIC_COMMERCELAYER_GASODOMESTICOS_MARKET_ID;
};

export const isVantilisto = (marketId: string) => {
  return marketId && marketId === process.env.NEXT_PUBLIC_COMMERCELAYER_VANTILISTO_MARKET_ID;
};

export const isAvailableGasAppliance = (marketId: string, priceGasodomestico: string, productsQuantityGasodomestico: string) => {
  if (isGasAppliance(marketId)) {
    return priceGasodomestico != null && productsQuantityGasodomestico != null && Number(productsQuantityGasodomestico) > 0;
  }
  return false;
};

export const isAvailableVantilisto = (marketId: string, priceVantiListo: string, productsQuantityVantiListo: string) => {
  if (isVantilisto(marketId)) {
    return priceVantiListo != null && productsQuantityVantiListo != null && Number(productsQuantityVantiListo) > 0;
  }
  return false;
};

export const formatPrice = (value) => {
  const isValidValue = value ?? 0;
  return "$" + new Intl.NumberFormat('de-DE', { minimumFractionDigits: 0 }).format(isValidValue);
};

export const getElementOffset = (el) => {
  let top = 0, left = 0;

  do {
    if (!isNaN(el.offsetTop)) top += el.offsetTop;
    if (!isNaN(el.offsetLeft)) left += el.offsetLeft;
    el = el.offsetParent;
  } while (el);

  return { top, left };
};

export const hasItems = (object: any) => {
  return !!(object?.items?.[0]);
};

export const findMenu = (props: INavigation, firstPath: string, asPath: string) => {
  const { mainNavCollection, secondaryNavCollection } = props;
  let { name } = props;
  let menuKey = firstPath;
  const ProductName = asPath.split("=")[1];
  let firstLevelMenu: any, folder: string, currentMenu: any;

  // To find the Navegation Content for Hogares (Default)
  let secondLevelMenu = mainNavCollection?.items.find(
    (el) => el.internalLink?.slug === HOME_SLUG
  );

  // To find the Navigation Content for the current path
  if (mainNavCollection?.items?.some((el) => el.internalLink?.slug === firstPath)) {
    secondLevelMenu = mainNavCollection?.items.find(
      (el) => el.internalLink?.slug === firstPath
    );
  }

  // To find the Navigation Content if it's a Secondary Content (Like "Conocenos" or "Contactanos") 
  if (secondaryNavCollection?.items?.some((el) => el.internalLink?.slug === firstPath)) {
    secondLevelMenu = secondaryNavCollection?.items.find(
      (el) => el.internalLink?.slug === firstPath
    );
  }

  // To find the items of a folder, like the "Empresas" case
  if (mainNavCollection?.items.some((el) => el.secondaryNavCollection?.items.length > 0)) {
    menuKey = firstPath;
    firstLevelMenu = mainNavCollection?.items.find(
      (el) => el.secondaryNavCollection?.items.length > 0
    )?.secondaryNavCollection;
  }

  // To find the Navigation Content for a subitem like "Comercio", "Instituciones" or "Industria"
  if (firstLevelMenu?.items.some((el) => el.internalLink?.slug === firstPath)) {
    secondLevelMenu = firstLevelMenu?.items?.find(
      (el) => el.internalLink?.slug === firstPath
    );
    folder = "Empresas";
  }

  // If there aren't items in the secondLevel set the default menu (Hogares) this happens with Contáctanos for example  
  if (!(secondLevelMenu?.mainNavCollection?.items?.length)) {
    menuKey = HOME_SLUG;
    folder = "";
    secondLevelMenu = mainNavCollection?.items.find(
      (el) => el.internalLink?.slug === HOME_SLUG
    );
  }

  // To get the current Menu, this is for the MegaMenu
  secondLevelMenu?.mainNavCollection?.items?.map((item) => {
    item?.mainNavCollection?.items?.map((subItem) => {
      if (ProductName) name = ProductName.charAt(0).toUpperCase() + ProductName.slice(1);
      if (subItem.mainNavCollection?.items.some((el) => el?.name === name)) {
        if (item.mainNavCollection.items.some((itemEl) => itemEl.name === subItem.name)) {
          currentMenu = item.name;
        }
      }
    });
    if (item?.mainNavCollection?.items.length === 0 && item?.name === name) {
      currentMenu = item?.name;
    }
  });

  // Set by default the manuKey with Hogares
  if (
    !mainNavCollection?.items?.some((el) => el.internalLink?.slug === firstPath) &&
    !secondaryNavCollection?.items?.some((el) => el.internalLink?.slug === firstPath) &&
    !firstLevelMenu?.items.some((el) => el.internalLink?.slug === firstPath)
  ) {
    menuKey = HOME_SLUG;
  }

  return { firstLevelMenu, secondLevelMenu, menuKey, folder, currentMenu };
};

export const GtmId = process.env.NEXT_PUBLIC_GTM_ID;
export const GaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
