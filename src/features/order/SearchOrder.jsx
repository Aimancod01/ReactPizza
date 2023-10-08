import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;
    navigate(`/order/${query}`);
    setQuery("");
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="md:mr-44  rounded-full focus:ring focus:ring-stone-300 placeholder:text-[14px] sm:placeholder:text-base px-4 py-2 outline-none bg-yellow-100 text-sm w-24 sm:w-64 transition-all duration-200 hover:shadow-md placeholder:text-stone-400 shadow-yellow-200"
      />
    </form>
  );
}

export default SearchOrder;
