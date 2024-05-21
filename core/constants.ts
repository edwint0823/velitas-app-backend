export const priceTypeOptions: Array<string> = ['detal', 'mayorista'];
export const minimumSizeBulkPriceNameParam: string = 'minimum_size_bulk_price';
export const defaultMinimumSizeBulkPrice: number = 10;
export const timeZoneDayjs: string = 'es-mx';
export const timeToDoOneCandleNameParam: string = 'time_to_do_one_candle';
export const minimumDaysToDoOrder: number = 2;
export const orderCreateNameStatus: string = 'Creado';
export const monthMaxDelivery: number = 11;
export const dayMaxDelivery: number = 7;
export const minutesOfHour: number = 60;
export const workingHours: number = 8;

export const QUERYS = {
  callGetCodeOrderFunction: 'SELECT generate_order_code() as new_code',
};
export const commonStatusErrorMessages = {
  badRequestMessage: 'Error de validación de campos',
  internalServerErrorMessage: 'Error interno del servidor',
  unauthorizedErrorMessage: 'Usuario no autorizado',
  forbiddenErrorMessage: 'No tiene permiso para realizar la acción',
};

export const bagDocumentationLabels = {
  listOperation: {
    summary: 'Listar las bolsas disponibles',
    success: 'Listado de bolsas',
  },
};

export const bagErrorMessages = {
  serviceErrors: {
    getAvailable: {
      default: 'Error al obtener el listado de bolsas',
    },
  },
};

export const candleOptionDocumentationLabels = {
  listOperation: {
    summary: 'Optener listado de opciones de vela junto con la cantidad minima de items para usar precio mayorista',
    success: 'Listado de velas',
  },
};
export const candleOptionErrorMessages = {
  serviceErrors: {
    get: {
      default: 'Error al obtener el listado de opciones',
    },
  },
};

export const configurationDocumentationLabels = {
  findOperation: {
    summary: 'Buscar el valor de un parámetro por el nombre del mismo',
    success: 'Valor del parámetro encontrado',
    paramNameDescription: 'nombre del parámetro ',
  },
};

export const configurationErrorMessages = {
  serviceErrors: {
    findByName: {
      default: 'Error al obtener el valor del parámetro seleccionado',
    },
  },
};

export const customerDocumentationLabels = {
  findOperation: {
    summary: 'Buscar un cliente por correo electrónico',
    success: 'Cliente encontrado',
    emailParamDescription: 'correo electrónico del cliente ',
  },
  createOperation: {
    summary: 'Crear un cliente',
    success: 'Cliente creado',
    emailParamDescription: 'correo electrónico del cliente ',
    nameParamDescription: 'Nombre del cliente',
    phoneParamDescription: 'Número telefónico del cliente',
    priceTypeParamDescription: 'Tipo de catalogo para precios',
  },
};

export const customerValidationMessages = {
  createOperation: {
    emailRequired: 'El correo del cliente es requerido',
    emailIsString: 'El correo electrónico del cliente debe ser una cadena de caracteres',
    nameRequired: 'El nombre del cliente es requerido',
    nameIsString: 'El nombre del cliente debe ser una cadena de caracteres',
    phoneRequired: 'El número telefónico del cliente es requerido',
    priceTypeIn: 'El tipo de precio debe estar dentro de uno de los siguientes valores:',
  },
};

export const customerErrorMessages = {
  serviceErrors: {
    create: {
      default: 'Error al crear el cliente',
    },
  },
};

export const customerSuccessMessages = {
  service: {
    create: 'cliente creado correctamente',
  },
};

export const orderDocumentationLabels = {
  createOperation: {
    summary: 'Crear pedido con su detalle y bolsas a necesitar',
    success: 'Pedido creada',
    emailCustomerParamDescription: 'Correo electrónico del cliente',
    nameCustomerParamDescription: 'Nombre del cliente',
    phoneCustomerParamDescription: 'Número de teléfono del cliente',
    priceTypeCustomerParamDescription: 'Tipo de catalogo para precios',
    nameListNameParamDescription: 'Nombre de una vela',
    packAloneNameListParamDescription: '¿Empacar en bolsa x1?',
    deceasedNameListParamDescription: '¿Es difunto?',
    petNameListParamDescription: '¿Es una mascota?',
    candleOptionIdCandleParamDescription: 'ID de opción de vela',
    nameListCandleParamDescription: 'Lista de nombres',
    priceCandleParamDescription: 'Precio de la vela',
    quantityCandleParamDescription: 'Cantidad de velas',
    observationCandleParamDescription: 'Observación de la vela o nombres',
    customerParamDescription: 'Información del cliente ',
    deliveryAddressParamDescription: 'Dirección de entrega del pedido ',
    additionalInfoParamDescription: 'Información adicional del pedido',
    candlesParamDescription: 'Lista de velas',
  },
  findByCodeOperation: {
    summary: 'Buscar un pedido y su detalle por el código de pedido',
    success: 'Pedido encontrado',
    codeParamDescription: 'código del pedido',
  },
  paginateListOperation: {
    summary: 'Listado paginado de pedidos',
    success: 'Pedido encontrado',
    pageSizeParamDescription: 'Cantidad de items por pagina',
    pageNumberParamDescription: 'Número de pagina',
    ordersCodeParamDescription: 'Listado de códigos de pedido',
    deliveryDateBeginParamDescription: 'Fecha inicial de fecha estimada de entrega',
    deliveryDateEndParamDescription: 'Fecha final de fecha estimada de entrega',
    createAtBeginParamDescription: 'Fecha inicial para fecha de creación del pedido',
    createdAtEndParamDescription: 'Fecha final para fecha de creación del pedido',
    customerNameParamDescription: 'Nombre del cliente',
  },
  updateStatusOperation: {
    summary: 'Actualizar el estado de un pedido en especifico',
    success: 'Estado del pedido actualizado',
    orderCodeParamDescription: 'Código del pedido',
    newStatusIdParamDescription: 'Id del nuevo estado para el pedido',
  },
  updateOrderAndDetailOperation: {
    summary: 'Actualizar información del pedido y sus detalles',
    success: 'Pedido Actualizado correctamente',
    orderCodeParamDescription: 'Código del pedido',

    nameListNameParamDescription: 'Nombre de una vela',
    packAloneNameListParamDescription: '¿Empacar en bolsa x1?',
    deceasedNameListParamDescription: '¿Es difunto?',
    petNameListParamDescription: '¿Es una mascota?',

    candleOptionIdCandleParamDescription: 'ID de opción de vela',
    candleTypeIdCandleParamDescription: 'ID del tipo de vela seleccionada',
    nameListCandleParamDescription: 'Lista de nombres',
    priceCandleParamDescription: 'Precio de la vela',
    quantityCandleParamDescription: 'Cantidad de velas',
    observationCandleParamDescription: 'Observación de la vela o nombres',
    candlesParamDescription: 'Lista de velas',
    deliveryAddressParamDescription: 'Dirección de entrega del pedido ',
    additionalInfoParamDescription: 'Información adicional del pedido',

    deliveryPriceParamDescription: 'Precio del domicilio',
  },
  getOrderDetailsAndBagsOperation: {
    summary:
      'Obtener la información del pedido , su detalle , los pagos realizados y la cantidad de bolsas a necesitar',
    success: 'Información del pedido y la cantidad de bolsas a necesitar',
    orderCodeParamDescription: 'Código del pedido',
  },
  editOrderAndDetailsOperations: {
    summary: 'Obtener la información del pedido y su detalle para edición del pedido',
    success: 'Información del pedido a editar',
    orderCodeParamDescription: 'Código del pedido',
  },
  exportExcelOperation: {
    summary: 'Obtener la información del pedido en una hoja de calculo de excel',
    success: 'Hoja de calculo de excel con información del pedido',
    orderCodeParamDescription: 'Código del pedido',
  },
};
export const orderValidationMessages = {
  createOperation: {
    emailCustomerRequired: 'El correo del cliente es requerido',
    emailCustomerIsString: 'El correo electrónico del cliente debe ser una cadena de caracteres',
    nameCustomerRequired: 'El nombre del cliente es requerido',
    nameCustomerIsString: 'El nombre del cliente debe ser una cadena de caracteres',
    phoneCustomerRequired: 'El número telefónico  del cliente es requerido',
    phoneCustomerIsString: 'El número telefónico del cliente debe ser una cadena de caracteres',
    priceTypeCustomerIsIn: 'El tipo de precio debe estar dentro de uno de los siguientes valores:',

    nameNameListIsString: 'El nombre de la vela debe ser una cadena de caracteres',
    nameNameListRequired: 'El nombre de la vela es requerido',

    candleOptionIdCandleIsInt: 'La opción de vela seleccionada debe ser un número',
    candleOptionIdCandleRequired: 'Debe seleccionar un diseño de vela',
    priceCandleIsPositive: 'El precio de la vela debe ser un número positivo',
    priceCandleRequired: 'El precio de la vela es requerido',
    quantityCandleIsInt: 'La cantidad de velas debe ser un número entero',
    quantityCandleIsPositive: 'La cantidad de velas debe ser un número positivo',
    quantityCandleRequired: 'La cantidad de velas es requerido',
    observationCandleIsString: 'La Observación debe ser un string ',
    candleNotEmpty: 'Debe agregar al menos una vela al pedido',

    deliveryAddressIsRequired: 'La dirección de entrega del pedido es obligatoria',
    deliveryAddressIsString: 'La dirección de entrega del pedido debe ser una cadena de caracteres',

    additionalInfoIsString: 'La información adicional del pedido debe ser una cadena de caracteres',
  },
  paginateListOperation: {
    orderCodeIsArray: 'El listado de Números de pedidos deben ser una lista',
    orderCodeRequired: 'El listado de Números de pedido debe tener al menos un item',
    orderCodeIsNumber: 'Todos los códigos de pedido deben ser números',
    deliveryDateBeginRequired: 'La fecha inicial de entrega es requerida',
    deliveryDateBeginIsDate: 'La fecha inicial de entrega debe ser una fecha',
    deliveryDateEndIsDate: 'La fecha final de entrega debe ser una fecha',
    createdAtBeginRequired: 'La fecha inicial de creación del pedido es requerida',
    createdAtBeginIsDate: 'La fecha inicial de creación del pedido debe ser una fecha',
    createdAtEndIsDate: 'La fecha final de creación del pedido debe ser una fecha',
    customerNameIsString: 'El nombre del cliente debe ser una cadena de texto',
  },
  updateOrderAndDetailOperation: {
    nameNameListIsString: 'El nombre de la vela debe ser una cadena de caracteres',
    nameNameListRequired: 'El nombre de la vela es requerido',
    packAloneNameListIsBoolean: 'El empacado x1 debe ser un booleano',
    deceasedNameListIsBoolean: 'Si es un difunto debe definirse con un booleano',
    petNameListIsBoolean: 'Si es una mascota debe definirse con un booleano',

    candleOptionIdCandleIsInt: 'La opción de vela seleccionada debe ser un número',
    candleOptionIdCandleRequired: 'Debe seleccionar un diseño de vela',
    candleTypeIdCandleIsInt: 'El tipo de vela de la opción seleccionada debe ser un número',
    candleTypeIdCandleRequired: 'Debe seleccionar un tipo de vela',
    priceCandleIsPositive: 'El precio de la vela debe ser un número positivo',
    priceCandleRequired: 'El precio de la vela es requerido',
    quantityCandleIsInt: 'La cantidad de velas debe ser un número entero',
    quantityCandleIsPositive: 'La cantidad de velas debe ser un número positivo',
    quantityCandleRequired: 'La cantidad de velas es requerido',
    observationCandleIsString: 'La Observación debe ser un string ',
    candleNotEmpty: 'El pedido debe tener al menos una vela',

    deliveryAddressIsRequired: 'La dirección de entrega del pedido es obligatoria',
    deliveryAddressIsString: 'La dirección de entrega del pedido debe ser una cadena de caracteres',

    additionalInfoIsString: 'La información adicional del pedido debe ser una cadena de caracteres',

    deliveryPriceIsNumber: 'El precio del domicilio debe ser un numero',
    deliveryPriceIsPositive: 'El precio del domicilio debe ser un numero positivo',
  },
};
export const orderErrorMessages = {
  repository: {
    codeGenerate: 'Error al generar el código de la orden',
  },
  service: {
    create: {
      default: 'Error al crear el pedido',
    },
    findByCode: {
      orderNotFound: 'No se encontró la pedido con el código proporcionado',
    },
    updateStatus: {
      isNotSuperuser: 'No tiene permisos para actualizar el estado del pedido',
      orderAlreadyCanceled: 'No se puede actualizar el estado del pedido si ya ha sido cancelado',
      orderAlreadyInProduction: 'El pedido no se puede cancelar ya que esta producción',
      notAbleToUpdateUnderStatus: 'No se puede cambiar el estado del pedido a uno anterior ',
      orderNotFound: 'No se encontró el pedido con el código proporcionado',
      default: 'Error al actualizar el estado del pedido',
    },
    updateOrderAndDetails: {
      isNotSuperuser: 'No tiene permisos para actualizar el contenido del pedido',
      orderNotFound: 'Pedido no encontrado',
      orderAlreadyCanceled: 'El pedido no se puede actualizar ya que esta cancelado',
      default: 'Error al actualizar el pedido',
    },
  },
};
export const orderSuccessMessages = {
  service: {
    updateStatus: {
      default: 'Estado del pedido actualizado con éxito',
    },
    updateOrderAndDetails: {
      default: 'Pedido actualizado con éxito',
    },
  },
};

export const statusDocumentationLabels = {
  listOperation: {
    summary: 'Listado de status con orden mayor o igual a la dispuesta',
    success: 'Listado de status',
    orderParam: 'orden del status',
  },
};

export const paymentDocumentationLabels = {
  getPaymentsByOrderCode: {
    summary: 'Listar los pagos realizados ha un pedido',
    success: 'Listado de pagos',
    orderCodeParamDescription: 'Código del pedido',
  },
  createOperation: {
    summary: 'Agregar un pago a un pedido',
    success: 'Pago creado correctamente',

    orderCodeParamDescription: 'Código del pedido',
    amountParamDescription: 'Valor del pago',
    bankEntityIDParamDescription: 'Id de la entidad bancaria donde se hizo el pago',
  },
};
export const paymentValidationMessages = {
  createOperation: {
    orderCodeRequired: 'El código del pedido es requerido',
    orderCodeIsString: 'El código del pedido debe ser una cadena de texto',

    amountIsNumber: 'El valor del pago debe ser un número',
    amountRequired: 'El valor del pago es requerido',
    amountIsPositive: 'El valor del pago debe ser un número positivo',

    bankEntityIdIsInt: 'El id del banco debe ser un número entero',
    bankEntityIdRequired: 'El id del banco es requerido',
  },
};
export const paymentErrorMessages = {
  service: {
    create: {
      unauthorized: 'No tiene permiso para realizar esta acción',
      orderNotFound: 'No se encontró el pedido con el numero proporcionado',
      paymentExceed: 'El valor del pago a registrar excede el faltante por pagar',
    },
  },
};

export const paymentSuccessMessages = {
  service: {
    create: {
      default: 'Pago registrado con éxito',
    },
  },
};
export const bankEntityDocumentationLabels = {
  listOperation: {
    summary: 'Obtener listado de entidades bancarias disponibles',
    success: 'Listado de entidades bancarias',
  },
};

export const bagInventoryDocumentationLabels = {
  updateInventoryQuantityOperation: {
    summary: 'Aumentar o disminuir la cantidad de inventario de una bolsa',
    success: 'Cantidad actualizada con éxito',
    bagIdParamDescription: 'id de la bolsa la cual se quiere modificar la cantidad de inventario',
    quantityParamDescription: 'Cantidad de inventario a aumentar o disminuir',
    isEntryParamDescription: 'Si se desea aumentar o disminuir la cantidad',
    observationParamDescription: 'Descripción del motivo por el cual se agrega o se quita inventario de la bolsa',
  },
  listInventory: {
    summary: 'Listar el inventario bolsas',
    success: 'Listado de inventario de bolsas',
    nameParamDescription: 'Nombre de una bolsa a filtrar',
  },
};

export const bagInventoryValidationMessages = {
  updateInventoryQuantityOperation: {
    quantityRequired: 'La cantidad que se desea agregar o quitar es requerida',
    quantityIsInt: 'La cantidad debe ser un número entero',
    quantityIsPositive: 'La cantidad debe ser un número positivo',

    isEntryRequired: 'Debe definir si el movimiento de inventario es para adicionar o substraer',
    isEntryIsBoolean: 'Si es una entrada de inventario o no debe ser un booleano',

    observationIsRequired: 'La descripción del movimiento de inventario es requerida ',
    observationIsString: 'La descripción del movimiento de inventario debe ser una cadena de caracteres ',
  },
  listInventory: {
    nameIsString: 'El nombre de la vela debe ser una cadena de caracteres',
  },
};

export const bagInventoryErrorMessages = {
  service: {
    addOrRemoveBagInventory: {
      default: 'Error al agregar o quitar inventario de la bolsa',
      unauthorized: 'No tiene permiso para modificar el inventario de la bolsa',
      bagNotFound: 'La bolsa proporcionada no existe',
    },
  },
};

export const bagInventorySuccessMessages = {
  service: {
    addOrRemoveBagInventory: {
      default: 'La modificación al inventario de la bolsa se ha realizado correctamente',
    },
  },
};

export const candleInventoryDocumentationLabels = {
  addOrRemoveInventoryOperation: {
    summary: 'Aumentar o disminuir la cantidad de inventario de una vela',
    success: 'Cantidad actualizada con éxito',
    candleTypeIdParamDescription: 'id de la vela la cual se quiere modificar la cantidad de inventario',
    quantityParamDescription: 'Cantidad de inventario a aumentar o disminuir',
    isEntryParamDescription: 'Si se desea aumentar o disminuir la cantidad',
    observationParamDescription: 'Descripción del motivo por el cual se agrega o se quita inventario de la vela',
  },
  listOperation: {
    summary: 'Obtener el listado de velas con el inventario actual',
    success: 'Listado de velas y su inventario',
    nameParamDescription: 'Nombre de la vela a buscar',
  },
};

export const candleInventoryValidationMessages = {
  addOrRemoveInventoryOperation: {
    quantityRequired: 'La cantidad que se desea agregar o quitar es requerida',
    quantityIsInt: 'La cantidad debe ser un número entero',
    quantityIsPositive: 'La cantidad debe ser un número positivo',

    isEntryRequired: 'Debe definir si el movimiento de inventario es para adicionar o substraer',
    isEntryIsBoolean: 'Si es una entrada de inventario o no debe ser un booleano',

    observationIsRequired: 'La descripción del movimiento de inventario es requerida ',
    observationIsString: 'La descripción del movimiento de inventario debe ser una cadena de caracteres',
  },
  listOperation: {
    nameIsString: 'El nombre a buscar debe ser una cadena de caracteres',
  },
};

export const candleInventoryErrorMessages = {
  service: {
    addOrRemoveCandleInventory: {
      default: 'Error al agregar o quitar inventario de la vela',
      unauthorized: 'No tiene permiso para modificar el inventario de la vela',
      candleNotFound: 'La vela proporcionada no existe',
    },
  },
};

export const candleInventorySuccessMessages = {
  service: {
    addOrRemoveCandleInventory: {
      default: 'La modificación al inventario de la vela se ha realizado correctamente',
    },
  },
};

export const cashMovementsDocumentationsLabels = {
  listAllOperations: {
    summary: 'listar todos los movimientos de dinero que se han realizado',
    success: 'Listado de los movimientos de dinero',
    pageSizeParamDescription: 'Cantidad de items por página',
    pageNumberParamDescription: 'Número de página',
    entryMovementParamDescription: 'Filtrar solo los movimientos de entrada',
    outMovementParamDescription: 'Filtrar solo los movimientos de salida',
    bankEntityIdParamDescription: 'Filtrar por id de banco',
    createdAtBeginParamDescription: 'Filtrar fecha inicial de creación del movimiento',
    createdAtEndParamDescription: 'Filtrar fecha final de creación del movimiento',
    ordersCodeParamDescription: 'Listado de código de pedido de movimiento separado por ,',
  },
  createOutMovementOperation: {
    summary: 'Crear un gasto sobre un banco especifico',
    success: 'Gasto creado con éxito',
    bankIdParamDescription: 'ID del banco al cual se le registrará el gasto',
    amountParamDescription: 'Valor del gasto a registrar',
    conceptParamDescription: 'Concepto del gasto a registrar',
  },
};

export const cashMovementsValidationsMessages = {
  listAllOperations: {
    entryMovementIsBoolean: 'El filtro de movimientos de entrada debe ser un boleano',
    outMovementIsBoolean: 'El filtro de movimientos de salida debe ser un boleano',
    bankEntityIdIsNumber: 'El identificador del banco debe ser un número',
    createdAtBeginIsDate: 'La fecha inicial de creación debe ser una fecha valida',
    createdAtEndIsDate: 'La fecha final de creación debe ser una fecha valida',
    ordersCodeIsArray: 'El listado de Números de pedidos deben ser una lista',
    orderCodeRequired: 'El listado de Números de pedido debe tener al menos un item',
    orderCodeIsStringNumber: 'Todos los códigos de pedido deben ser números',
  },
  createOutMovementOperation: {
    bankEntityIdIsRequired: 'EL identificador del banco es requerido',
    bankEntityIdIsInt: 'El identificador del banco debe ser un número entero',
    amountIsRequired: 'El monto a registrar es requerido',
    amountIsNumber: 'El monto a registrar debe ser un número',
    conceptIsRequired: 'El concepto a registrar para el gasto requerido',
    conceptIsString: 'El concepto a registrar debe ser una cadena de caracteres',
  },
};

export const cashMovementsErrorMessages = {
  service: {
    createOutMovement: {
      default: 'Error al crear el gasto',
      bankDoesNotExist: 'EL banco proporcionado no existe',
    },
  },
};

export const cashMovementsSuccessMessages = {
  service: {
    createOutMovement: {
      default: 'Gasto registrado con éxito',
    },
  },
};

export const cashInventoryDocumentationLabels = {
  listOperation: {
    summary: 'Listar el inventario de dinero físico',
    success: 'Listado de inventario de dinero físico',
    nameParamDescription: 'Nombre del item a buscar',
  },
  findOperation: {
    summary: 'Buscar por id un item de inventario de dinero físico',
    success: 'Información del item obtenida',
    idParamDescription: 'Id del item a actualizar',
  },
  updateQuantityOperation: {
    summary: 'Actualizar la cantidad de inventario de dinero físico',
    success: 'Cantidad actualizada con éxito',
    idParamDescription: 'Id del item a actualizar',
    quantityParamDescription: 'Cantidad de inventario a actualizar',
  },
};

export const cashInventoryValidationMessages = {
  listOperation: {
    nameIsString: 'El nombre debe ser una cadena de texto',
  },
  updateQuantityOperation: {
    quantityRequired: 'La cantidad a actualizar es requerida',
    quantityIsInt: 'La cantidad deber ser un número entero',
    quantityIsPositive: 'La cantidad debe ser un número positivo',
  },
};

export const cashInventoryErrorMessages = {
  service: {
    findCashInventory: {
      inventoryItemNotFound: 'El item de inventario de dinero físico no existe',
    },
    updateQuantity: {
      default: 'Error al actualizar la cantidad',
      inventoryItemNotFound: 'El item de inventario de dinero físico no existe',
    },
  },
};

export const cashInventorySuccessMessages = {
  service: {
    updateQuantity: {
      default: 'Cantidad actualizada con éxito',
    },
  },
};

export interface IAuthUser {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_superuser: boolean;
  id: number;
  permissions: string[];
}

export interface IUserInfoInDb {
  email: string;
  first_name: string;
  last_name: string;
  id: number;
}

export const maxStatusToCancel = {
  name: 'impreso',
  order: 4,
};

export const statusCanceled = {
  name: 'Cancelado',
  order: 0,
};

export const statusForCandleInventoryMovement = {
  name: 'En Proceso de marcado',
  order: 5,
};

export const statusForBagInventoryMovement = {
  name: 'En Proceso de Empaquetado',
  order: 7,
};

export const quantityCandleInventoryLowStock = 300;
export const quantityBagInventoryLowStock = 100;
export const inventoryStatusNames = {
  lowStock: 'STOCK BAJO',
  inStock: 'EN STOCK',
  outOfStock: 'AGOTADO',
};
