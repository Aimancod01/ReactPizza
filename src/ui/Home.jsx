import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import { useNavigate } from "react-router-dom";

function Home() {
  const user = useSelector((state) => state.user.username);
  const navigate = useNavigate();
  return (
    <div className="my-20  text-center">
      <h1 className="mb-8 px-4 md:text-3xl text-xl text-stone-700 font-bold">
        The best pizza.
        <br />
        <span className="text-yellow-400">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {user === "" ? (
        <CreateUser />
      ) : (
        <button className="btn" onClick={() => navigate("/menu")}>
          Continue Ordering,{user}
        </button>
      )}
    </div>
  );
}

export default Home;
