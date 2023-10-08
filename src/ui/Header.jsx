import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

export default function Header() {
  return (
    <div className="flex items-center justify-between bg-yellow-400 uppercase px-4 py-3 border-b space-y-1 border-stone-400">
      <Link to="/" className="tracking-widest font-semibold">
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </div>
  );
}
