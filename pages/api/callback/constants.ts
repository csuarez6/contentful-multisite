export const GENESYS_CONSTANTS = {
  URL_CALLBACK: "https://api.mypurecloud.com/api/v2/conversations/callbacks",
  URL_TOKEN: "https://login.mypurecloud.com/oauth/token",
  CLIENT_ID: process.env.GENESYS_CLIENT_ID,
  CLIENT_SECRET: process.env.GENESYS_CLIENT_SECRET
};

export const CALLBACK_TYPES: object = {
  "mantenimiento-y-reparacion": "Mantenimiento y reparación",
  "servihogar": "Servihogar",
  "nuevo-punto": "Nuevo Punto",
  "rpo": "Revisión Periódica Obligatoria",
  "producto": "Producto",
  "instalacion-gasodomesticos": "Instalación Gasodomésticos",
  "gasodomesticos": "Productos Gasodomésticos",
  "vantilisto": "Catálogo Vantilisto"
};