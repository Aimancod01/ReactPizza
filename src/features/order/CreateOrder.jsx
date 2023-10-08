import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "../cart/CartSlice";
import store from "../../Store";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

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

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const {
    username,
    status: addressStatus,
    position,
    address,
  } = useSelector((state) => state.user);
  const isLoading = navigation.state === "submitting";
  const formError = useActionData();
  const dispatch = useDispatch();
  const isLoadingAddress = addressStatus === "loading";
  return (
    <div className="mt-5">
      <h2 className="text-xl font-medium mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5">
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            defaultValue={username}
            required
            className="input mt-2"
          />
        </div>

        <div className="my-5">
          <label>Phone number</label>
          <div className="mt-2">
            <input type="tel" name="phone" required className="input" />
            {formError?.phone && (
              <p className="mt-2 bg-red-200 rounded-md px-2 text-sm text-red-600">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative">
          <label>Address</label>
          <div className="my-2">
            <input
              className="w-full text-sm text-neutral-500 font-medium rounded-full px-3 py-2 transition-all duration-150 outline-none focus:ring focus:ring-yellow-400"
              type="text"
              name="address"
              required
              disabled={isLoadingAddress}
              defaultValue={address}
            />
          </div>
          {!position.latitude && !position.longitude && (
            <button
              disabled={isLoadingAddress}
              className="btn absolute top-8 right-0"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get Address
            </button>
          )}
        </div>

        <div className="my-5 space-x-2 flex items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="w-5 h-4 accent-yellow-400 outline-none"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button className="btn" disabled={isLoading}>
            {isLoading ? "Placing Order..." : "Order Now"}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please give us your correct phone number!";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
