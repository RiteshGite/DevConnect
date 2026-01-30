import { CheckCircle, Crown } from "lucide-react";

const Membership = () => {
  return (
    <div className="flex w-full flex-col lg:flex-row gap-6 p-6">
      {/* Silver Membership */}
      <div className="card bg-neutral-200 text-neutral-900 shadow-xl grow">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-xl">Silver Membership</h2>
          <p className="text-sm opacity-70">For basic visibility</p>

          <ul className="text-left space-y-2 mt-4">
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
            className="btn btn-outline btn-primary mt-4"
          >
            Choose Silver
          </button>
        </div>
      </div>

      <div className="divider lg:divider-horizontal">OR</div>

      {/* Gold Membership */}
      <div className="card bg-warning text-warning-content shadow-xl grow">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-xl flex items-center gap-2">
            <Crown className="w-6 h-6" />
            Gold Membership
          </h2>
          <p className="text-sm opacity-90">Maximum reach & priority</p>

          <ul className="text-left space-y-2 mt-4">
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
            className="btn btn-neutral mt-4"
          >
            Choose Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Membership;
