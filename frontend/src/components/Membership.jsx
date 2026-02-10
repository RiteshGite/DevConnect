import { CheckCircle, Crown, Sparkles, Clock } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Membership = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const silver = user?.memberships?.Silver;
  const gold = user?.memberships?.Gold;

  const [loadingPlan, setLoadingPlan] = useState(null);

  // ================= UTILS =================
  const getDaysLeft = (expiryDate) => {
    if (!expiryDate) return 0;
    const diff = new Date(expiryDate) - new Date();
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const silverDaysLeft = getDaysLeft(silver?.expiresAt);
  const goldDaysLeft = getDaysLeft(gold?.expiresAt);

  // ================= PAYMENT =================
  const handleBuyClick = async (planType) => {
    try {
      setLoadingPlan(planType);
      const res = await axios.post(
        `${BASE_URL}/payment/create-checkout-session`,
        { planType },
        { withCredentials: true },
      );
      window.location.href = res.data.url;
    } catch (err) {
      setLoadingPlan(null);
      toast.error("Something went wrong");
    }
  };

  // ================= FEATURES =================
  const silverFeatures = [
    "Profile priority boost",
    "Silver Highlight",
    "DevConnect Silver badge",
  ];

  const goldFeatures = [
    "Highest Profile priority",
    "Gold Highlight",
    "DevConnect Gold badge",
  ];

  useEffect(() => {
     const fetchProfile = async () => {
       try {
         const res = await axios.get(`${BASE_URL}/profile/view`, {
           withCredentials: true,
         });
         console.log(res.data.user);
         dispatch(addUser(res.data.user));
       } catch (err) {
         toast.error("Something went wrong");
       }
     };

    fetchProfile();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-black to-neutral-900 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full">
        {/* ================= HEADER ================= */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white">
            Upgrade Your <span className="text-primary">DevConnect</span>{" "}
            Experience
          </h1>
          <p className="text-neutral-400 mt-3">
            More visibility. More matches. More power.
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ================= SILVER CARD ================= */}
          <div className="relative rounded-2xl bg-gradient-to-b from-neutral-800 to-neutral-900 border border-neutral-700 p-8 hover:scale-[1.02] transition-all duration-300">
            {/* Active badge */}
            {silver?.active && (
              <div className="absolute top-4 right-4 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Active
              </div>
            )}

            <h2 className="text-2xl font-semibold text-white mb-2 flex items-center gap-2">
              <Crown className="w-6 h-6 text-gray-300 drop-shadow-[0_0_6px_rgba(209,213,219,0.9)]" />
              Silver Membership
            </h2>

            <p className="text-neutral-400 mb-4">Perfect to get noticed</p>

            <div className="mb-4">
              <span className="text-4xl font-bold text-white">₹499</span>
              <span className="text-neutral-400"> / 3 months</span>

              {silver?.active && (
                <div className="mt-2 text-sm text-primary font-semibold">
                  ⏳ {silverDaysLeft} days left{" "}
                  <span className="text-neutral-400">
                    (expires on {formatDate(silver.expiresAt)})
                  </span>
                </div>
              )}
            </div>

            <ul className="space-y-3 font-medium">
              {silverFeatures.map((feature, index) => (
                <li key={index} className="flex gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleBuyClick("Silver")}
              disabled={loadingPlan === "Silver"}
              className="btn btn-outline btn-primary w-full mt-8 disabled:opacity-60"
            >
              {loadingPlan === "Silver"
                ? "Processing..."
                : silver?.active
                  ? "Extend Silver"
                  : "Choose Silver"}
            </button>
          </div>

          {/* ================= GOLD CARD ================= */}
          <div className="relative rounded-2xl bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 p-8 text-black shadow-2xl hover:scale-[1.04] transition-all duration-300">
            {/* Popular badge */}
            <div className="absolute -top-4 right-6 bg-black text-yellow-400 px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Most Popular
            </div>

            {/* Active badge */}
            {gold?.active && (
              <div className="absolute top-1 left-4 bg-black/80 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Active
              </div>
            )}

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-2">
              <Crown className="w-6 h-6 text-red-600 transition hover:drop-shadow-[0_0_10px_rgba(220,38,38,1)]" />
              Gold Membership
            </h2>

            <p className="opacity-80 mb-4">Maximum reach & priority</p>

            <div className="mb-4">
              <span className="text-4xl font-bold">₹999</span>
              <span className="opacity-80"> / 6 months</span>

              {gold?.active && (
                <div className="mt-2 text-sm font-bold">
                  ⏳ {goldDaysLeft} days left{" "}
                  <span className="opacity-80 font-medium">
                    (expires on {formatDate(gold.expiresAt)})
                  </span>
                </div>
              )}
            </div>

            <ul className="space-y-3 font-medium">
              {goldFeatures.map((feature, index) => (
                <li key={index} className="flex gap-2">
                  <CheckCircle className="w-5 h-5" />
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleBuyClick("Gold")}
              disabled={loadingPlan === "Gold"}
              className="btn bg-black text-yellow-400 w-full mt-8 disabled:opacity-70"
            >
              {loadingPlan === "Gold"
                ? "Redirecting..."
                : gold?.active
                  ? "Extend Gold 🚀"
                  : "Go Gold 🚀"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Membership;
