import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card bg-base-100 shadow-xl max-w-md w-full text-center">
        <div className="card-body">
          <XCircle className="w-16 h-16 text-error mx-auto" />

          <h2 className="text-2xl font-bold mt-4">Payment Not Completed</h2>

          <p className="text-gray-500 mt-2">
            Your payment was not completed. No money was deducted.
          </p>

          <div className="alert alert-warning mt-4 text-sm">
            This can happen due to network issues, bank decline, or if you
            cancelled the payment.
          </div>

          <div className="flex gap-4 mt-6 justify-center">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/membership")}
            >
              Try Again
            </button>

            <button className="btn btn-outline" onClick={() => navigate("/")}>
              Go Home
            </button>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Need help? Contact support@devtinder.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
