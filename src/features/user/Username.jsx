import { useSelector } from "react-redux";

function Username() {
  const user = useSelector((state) => state.user.username);
  return <div className="text-sm font-bold hidden md:block">{user}</div>;
}

export default Username;
