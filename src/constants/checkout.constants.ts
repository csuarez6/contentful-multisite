export enum VantiOrderMetadata {
    /**
     * Buy flow Meta
     */
    IsVerified = 'isVerified',
    HasPersonalInfo = 'hasPersonalInfo',
    HasAddresses = 'hasAddresses',
    
    /**
     * Client Meta
     */
    name = 'name',
    LastName = 'lastName',
    recapchaResponse = "recapchaResponse"
}

export const PSE_STEPS_TO_VERIFY = [
    VantiOrderMetadata.IsVerified,
    VantiOrderMetadata.HasPersonalInfo,
    VantiOrderMetadata.HasAddresses
];

export const PRICE_VALIDATION_ID = "price_validation";
export const STOCK_VALIDATION_ID = "stock_validation";

export const ADD_CART_422_ERROR_MSG = "Has superado la cantidad máxima de unidades disponibles para este producto o el valor máximo permitido por orden. Sin embargo, ¡puedes continuar con los productos que ya has agregado a tu carrito!";
export const FINAL_422_ERROR_MSG = "Parece que has superado el valor máximo permitido por pedido. Para continuar, te recomendamos eliminar algunas unidades de tu carrito. Si el problema persiste, no dudes en ponerte en contacto con nuestro equipo de soporte para obtener ayuda adicional.";
export const ADD_CART_GENERAL_ERROR_MSG = "Parece que hubo un problema al intentar agregar más unidades del artículo. Por favor, inténtalo de nuevo. Si el problema persiste, no dudes en ponerte en contacto con nuestro equipo de soporte para obtener ayuda adicional.";
export const REMOVE_CART_GENERAL_ERROR_MSG = "Parece que hubo un problema al intentar remover unidades del artículo. Intenta eliminar el producto de tu carrito y agrégalo nuevamente. Si el problema persiste, no dudes en ponerte en contacto con nuestro equipo de soporte para obtener ayuda adicional.";
export const NEXT_STEP_ERROR_MSG = "Parece que hubo un problema al continuar con la compra. Por favor, refresca la página e inténtalo de nuevo. Si el problema persiste, no dudes en ponerte en contacto con nuestro equipo de soporte para obtener ayuda adicional.";
export const CHANGED_PRODUCTS_ERROR_MSG = "Parece que algunos productos de tu orden han tenido algunos cambios de especificaciones, por favor compruebalos y evalua si deseas continuar con ellos.";

export const STATE_HELP_TEXT = "Unicamente se muestran los departamentos con cobertura, si tu departamento no se encuentra en la lista ponte en contacto con el administrador y consulta las posibilidades que tienen para tí";
export const CITY_HELP_TEXT = "Unicamente se muestran los municipios con cobertura, si tu municipio no se encuentra en la lista ponte en contacto con el administrador y consulta las posibilidades que tienen para tí";
