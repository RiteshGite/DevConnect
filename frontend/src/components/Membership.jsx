import { CheckCircle, Crown } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const makePayment = async (planType) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/payment/create-checkout-session`,
      { planType },
      { withCredentials: true },
    ); 
    window.location.href = res.data.url;
  } catch (err) {
    console.log("err = ", err);
  }
}

const Membership = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex w-full flex-col lg:flex-row gap-6 px-4 py-8 max-w-5xl mx-auto">
        {/* Silver Membership */}
        <div className="card bg-neutral-200 text-neutral-900 shadow-xl w-full lg:w-1/2">
          <div className="card-body items-center text-center p-6">
            <h2 className="card-title text-xl sm:text-2xl">
              Silver Membership
            </h2>
            <p className="text-sm opacity-70">For basic visibility</p>

            <ul className="text-left space-y-2 mt-4 w-full max-w-xs">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                100 requests/day
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                Blue Tick
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />3 Months
              </li>
            </ul>

            <button
              className="btn btn-outline btn-primary mt-6 w-full sm:w-auto"
              onClick={() => {
                makePayment("Silver");
              }}
            >
              Choose Silver
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="divider lg:divider-horizontal my-2 lg:my-0">OR</div>

        {/* Gold Membership */}
        <div className="card bg-warning text-warning-content shadow-xl w-full lg:w-1/2">
          <div className="card-body items-center text-center p-6">
            <h2 className="card-title text-xl sm:text-2xl flex items-center gap-2">
              <Crown className="w-6 h-6" />
              Gold Membership
            </h2>
            <p className="text-sm opacity-90">Maximum reach & priority</p>

            <ul className="text-left space-y-2 mt-4 w-full max-w-xs">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Unlimited requests
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                DevTinder Badge
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Profile Priority
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />6 Months
              </li>
            </ul>

            <button
              className="btn btn-neutral mt-6 w-full sm:w-auto"
              onClick={() => {
                makePayment("Gold");
              }}
            >
              Choose Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
