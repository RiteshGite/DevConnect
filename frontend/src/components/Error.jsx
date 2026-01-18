import { useNavigate } from "react-router-dom";

const Error = () => {
    const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md text-center">
        <img
          src="shark.avif"
          alt="Unexpected error"
          className="mx-auto mb-6 w-60"
        />

        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Something went wrong
        </h1>

        <p className="text-gray-600 text-base mb-6">
          We’re experiencing a temporary issue. Please refresh the page or try
          again later.
        </p>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 rounded-md bg-black text-white text-sm hover:bg-gray-800 transition"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default Error;
