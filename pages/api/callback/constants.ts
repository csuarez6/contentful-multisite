export const GENESYS_CONSTANTS = {
  URL_CALLBACK: process.env.URL_GENESYS_CALLBACK,
  URL_TOKEN: process.env.URL_GENESYS_TOKEN,
  CLIENT_ID: process.env.GENESYS_CLIENT_ID,
  CLIENT_SECRET: process.env.GENESYS_CLIENT_SECRET,
  SCRIPT_ID: process.env.GENESYS_SCRIPT_ID,
  QUEUE_ID_VANTILISTO: process.env.GENESYS_QUEUE_ID_VANTILISTO,
  QUEUE_ID_GASODOMESTICOS: process.env.GENESYS_QUEUE_ID_GASODOMESTICOS,
  QUEUE_ID_SERVIHOGAR: process.env.GENESYS_QUEUE_ID_SERVIHOGAR,
  QUEUE_ID_NUEVO_PUNTO: process.env.GENESYS_QUEUE_ID_NUEVO_PUNTO,
};

export const CALLBACK_TYPES: object = {
  "instalacion-gasodomesticos": {
    typeName: "Instalación Gasodomésticos",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "mantenimiento-gasodomesticos": {
    typeName: "Mantenimiento Gasodomésticos",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "reparacion-gasodomesticos": {
    typeName: "Reparación Gasodomésticos",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "comercio/instalacion-gasodomesticos": {
    typeName: "Instalación Gasodomésticos - Comercio",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "comercio/mantenimiento-gasodomesticos": {
    typeName: "Mantenimiento Gasodomésticos - Comercio",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "comercio/reparacion-gasodomesticos": {
    typeName: "Reparación Gasodomésticos - Comercio",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "servihogar": {
    typeName: "Servihogar",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_SERVIHOGAR
  },
  "nuevo-punto": {
    typeName: "Nuevo Punto",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_NUEVO_PUNTO
  },
  "rpo": {
    typeName: "Revisión Periódica Obligatoria",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "producto": {
    typeName: "Producto",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "gasodomesticos": {
    typeName: "Productos Gasodomésticos",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_GASODOMESTICOS
  },
  "vantilisto": {
    typeName: "Catálogo Vantilisto",
    queueId: GENESYS_CONSTANTS.QUEUE_ID_VANTILISTO
  },
};
