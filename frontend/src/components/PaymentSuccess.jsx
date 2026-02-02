import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full text-center">
        <div className="card-body">
          <CheckCircle className="w-16 h-16 text-success mx-auto" />

          <h2 className="text-2xl font-bold mt-4">Payment Successful 🎉</h2>

          <p className="text-gray-500 mt-2">
            Thank you for upgrading your DevTinder membership.
          </p>

          <div className="alert alert-info mt-4 text-sm">
            Your membership will be activated within a few seconds. Please don’t
            refresh the page.
          </div>

          <button
            className="btn btn-primary mt-6"
            onClick={() => navigate("/profile")}
          >
            Go to Profile
          </button>

          <p className="text-xs text-gray-400 mt-4">
            If your membership does not activate within 2 minutes, please
            contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
