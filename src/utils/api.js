import {
  getSidingPrice,
  getInteriorPrice,
  getFlooringPrice,
  getExteriorPrice,
  getServicesPrice,
  getColorPrice,
  getColorOptions,
  getServicesOptions,
  getSizeOptions,
  getInteriorOptions,
  getSidingOptions,
  getExteriorOptions,
  returnPricingOfSize,
} from "./_DATA";

export function getInitialData(key) {
  const data = {
    Siding: getSidingOptions(),
    Interior: getInteriorOptions(),
    Sizing: getSizeOptions(),
    Exterior: getExteriorOptions(),
    Services: getServicesOptions(),
    Colors: getColorOptions(),
  };
  return data[key];
}

export function getPricingOptions(key) {
  return {
    Siding: getSidingPrice,
    Interior: getInteriorPrice,
    Sizing: getFlooringPrice,
    Exterior: getExteriorPrice,
    Services: getServicesPrice,
    Colors: getColorPrice,
  };
}

export function getPriceOfSize(sizing) {
  return returnPricingOfSize(sizing);
}
