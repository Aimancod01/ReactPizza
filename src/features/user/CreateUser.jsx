import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
    setUsername("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="text-stone-700 text-sm mb-3 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input w-96"
      />

      {username !== "" && (
        <div>
          <button className="btn mt-5">Start ordering</button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
