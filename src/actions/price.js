export const SET_PRICE = "SET_PRICE";

function addPrice(price) {
  return {
    type: SET_PRICE,
    price,
  };
}

export function handleAddPrice(price) {
  // console.log("price", price);
  return (dispatch) => {
    dispatch(addPrice(price));
  };
}
