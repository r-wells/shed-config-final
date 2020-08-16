import { SET_PRICE } from "./../actions/price";

export default function priceReducer(state = null, action) {
  switch (action.type) {
    case SET_PRICE:
      return action.id;
    default:
      return state;
  }
}
