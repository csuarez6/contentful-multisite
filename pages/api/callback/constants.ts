export const GENESYS_CONSTANTS = {
  URL_CALLBACK: "https://api.mypurecloud.com/api/v2/conversations/callbacks",
  URL_TOKEN: "https://login.mypurecloud.com/oauth/token",
  CLIENT_ID: process.env.GENESYS_CLIENT_ID,
  CLIENT_SECRET: process.env.GENESYS_CLIENT_SECRET
};

export const CALLBACK_TYPES: object = {
  "instalacion-gasodomesticos": "Instalación Gasodomésticos",
  "mantenimiento-gasodomesticos": "Mantenimiento Gasodomésticos",
  "reparacion-gasodomesticos": "Reparación Gasodomésticos",
  "comercio/instalacion-gasodomesticos": "Instalación Gasodomésticos - Comercio",
  "comercio/mantenimiento-gasodomesticos": "Mantenimiento Gasodomésticos - Comercio",
  "comercio/reparacion-gasodomesticos": "Reparación Gasodomésticos - Comercio",
  "servihogar": "Servihogar",
  "nuevo-punto": "Nuevo Punto",
  "rpo": "Revisión Periódica Obligatoria",
  "producto": "Producto",
  "gasodomesticos": "Productos Gasodomésticos",
  "vantilisto": "Catálogo Vantilisto"
};