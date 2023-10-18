export const GENESYS_CONSTANTS = {
  URL_CALLBACK: process.env.URL_GENESYS_CALLBACK,
  URL_TOKEN: process.env.URL_GENESYS_TOKEN,
  CLIENT_ID: process.env.GENESYS_CLIENT_ID,
  CLIENT_SECRET: process.env.GENESYS_CLIENT_SECRET,
  SCRIPT_ID: "c7c7571a-26fc-4e07-a71b-5674033bf9e4",
  QUEUE_ID_VANTILISTO: "8fc67852-01fb-4b0e-9288-b89ee8676d74",
  QUEUE_ID_GASODOMESTICOS: "fef00de0-82a9-4154-820f-282be85b9f37",
  QUEUE_ID_SERVIHOGAR: "e706a90b-8f52-4da1-b6a4-aa3be8398ac2",
  QUEUE_ID_NUEVO_PUNTO: "48c10d80-ea08-4a87-89bc-1c90203cb171",
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
