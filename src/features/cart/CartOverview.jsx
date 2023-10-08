import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartOverview() {
  const totalPizza = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.quantity, 0)
  );
  const totalPizzaPrice = useSelector((state) =>
    state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0)
  );

  if (!totalPizza) return;

  return (
    <div className="flex items-center justify-between p-4 bg-stone-800 text-stone-200 uppercase">
      <p className="text-stone-300 font-semibold space-x-4">
        <span>{totalPizza} pizzas</span>
        <span>${totalPizzaPrice}</span>
      </p>
      <Link className="hover:underline" to="cart">
        Open cart &rarr;
      </Link>
    </div>
  );
}

export default CartOverview;
