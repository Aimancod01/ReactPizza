// Test ID: IIDSAT
import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import OrderItem from "../order/OrderItem";

function Order() {
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mt-5 space-y-8">
      <div className="sm:flex items-center sm:gap-12 sm:justify-between">
        <h2 className="text-xl font-medium">Order #{id} Status</h2>

        <div className="mt-2 space-x-2">
          {priority && (
            <span className="uppercase bg-red-500 text-sm font-semibold px-2 py-1 rounded-lg text-white">
              Priority
            </span>
          )}
          <span className="uppercase bg-green-500 text-sm font-semibold px-2 py-1 rounded-lg text-white">
            {status} order
          </span>
        </div>
      </div>

      <div className="bg-stone-300 px-5 py-3 rounded text-sm shadow-lg">
        <p className="font-bold">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>

      <ul className="space-y-4">
        {cart.map((item) => (
          <OrderItem item={item} key={item.id} />
        ))}
      </ul>

      <div className="bg-stone-300 rounded shadow-lg mb-2 px-4 py-4">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="mt-2 font-medium">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
