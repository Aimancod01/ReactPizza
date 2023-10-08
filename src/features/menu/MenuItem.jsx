import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import { addItems, deleteItem, getQuantity } from "../cart/CartSlice";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  function handleCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItems(newItem));
  }
  function handleDelete() {
    dispatch(deleteItem(id));
  }
  const quantityId = useSelector(getQuantity(id));
  const inCart = quantityId > 0;

  return (
    <li className="my-2 px-2 py-2 flex gap-4 border-b border-stone-200">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "grayscale opacity-70" : ""} `}
      />
      <div className="flex flex-col grow">
        <p className="font-bold">{name}</p>
        <p className="text-sm italic capitalize text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div
          className="mt-auto flex items-center justify-between
        "
        >
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase text-stone-500">Sold out</p>
          )}
          {inCart && (
            <button className="btn" onClick={handleDelete}>
              Delete
            </button>
          )}
          {!soldOut && !inCart && (
            <button className="btn text-sm" onClick={handleCart}>
              Add to cart
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
