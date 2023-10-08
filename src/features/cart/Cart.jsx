import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { clearCart, getCart } from "./CartSlice";
import EmptyCart from "./EmptyCart";

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = useSelector(getCart);
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  function handleClearCart() {
    dispatch(clearCart());
  }
  if (!cart.length) return <EmptyCart />;

  return (
    <div className="mt-2">
      <Link
        to="/menu"
        className=" text-blue-600 hover:text-blue-700 hover:underline"
      >
        &larr; Back to menu
      </Link>

      <h2 className="text-xl mt-3 font-medium">Your cart, {user}</h2>
      <ul className="">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="space-x-2 mt-6">
        <Link className="btn border-2 border-yellow-300" to="/order/new">
          Order pizzas
        </Link>
        <button
          onClick={handleClearCart}
          className="btn bg-transparent text-stone-600 py-2 hover:bg-slate-200 shadow-none border-2"
        >
          Clear cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
