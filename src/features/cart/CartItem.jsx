import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import {
  decreaseQuantity,
  deleteItem,
  getQuantity,
  increaseQuantity,
} from "./CartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();
  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }

  function handleIncrement() {
    dispatch(increaseQuantity(pizzaId));
  }

  function handleDecrement() {
    dispatch(decreaseQuantity(pizzaId));
  }
  const quantityId = useSelector(getQuantity(pizzaId));

  return (
    <li className="sm:flex sm:items-center sm:gap-10 sm:justify-between border-b-2 py-4 ">
      <p>
        {quantity}&times; {name}
      </p>
      <div className="flex items-center gap-5 justify-between mt-2">
        <p className="text-sm">{formatCurrency(totalPrice)}</p>
        <div className="flex space-x-1 gap-1 items-center">
          <button className="btn py-1 px-2.5" onClick={handleDecrement}>
            -
          </button>
          <span className="font-medium text-sm">{quantityId}</span>
          <button className="btn py-1 px-2.5" onClick={handleIncrement}>
            +
          </button>
        </div>
        <button className="btn text-sm py-1 px-3" onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  );
}

export default CartItem;
