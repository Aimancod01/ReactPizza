import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="px-4 py-3 rounded shadow-lg my-20 space-y-6 bg-gray-200 flex flex-col items-center">
      <Link to="/menu" className="link">
        &larr; Back to menu
      </Link>

      <p className="px-2 text-center font-bold mb-10 text-3xl">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
