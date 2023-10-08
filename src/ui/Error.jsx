import { useNavigate, useRouteError } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <div className="flex space-y-2 flex-col items-center justify-center h-screen">
      <img src="public/noun-sad-1740167.png" alt="" className="h-32" />
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="font-medium stroke-neutral-500">
        {error.data || error.message}
      </p>
      <button className="link" onClick={() => navigate(-1)}>
        &larr; Go back
      </button>
    </div>
  );
}

export default NotFound;
