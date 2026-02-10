import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import UserCard from "./UserCard";

const SmartMatches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  // 🔥 Fetch only when user clicks button
  const fetchSmartMatches = async () => {
    try {
      setStarted(true);
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/user/smart-matches`, {
        withCredentials: true,
      });

      // force array (safe)
      setMatches(Array.isArray(res.data.matches) ? res.data.matches : []);
    } catch (err) {
      toast.error("Failed to load smart matches");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 Remove card locally (used by UserCard if needed)
  const removeMatch = (userId) => {
    setMatches((prev) =>
      Array.isArray(prev) ? prev.filter((u) => u._id !== userId) : [],
    );
  };

  // 🎨 Dynamic match color based on percentage
  const getMatchColor = (score) => {
    if (score >= 70) {
      return "bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.8)]";
    }
    if (score >= 40) {
      return "bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.8)]";
    }
    return "bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.8)]";
  };

  return (
    <div className="min-h-screen">
      {/* ================= HERO / INTRO ================= */}
      {!started && (
        <div className="max-w-3xl mx-auto text-center mt-20">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Discover Developers That Truly Match You
          </h1>

          <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
            We analyze your skills and compare them with other developers to
            find people who genuinely align with your tech stack.
            <br />
            No randomness. No noise. Just meaningful connections.
          </p>

          <button
            onClick={fetchSmartMatches}
            className="btn btn-primary btn-wide text-base tracking-wide"
          >
            Find Smart Matches 🚀
          </button>
        </div>
      )}

      {/* ================= LOADING ================= */}
      {started && loading && (
        <div className="flex justify-center items-center h-[60vh]">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* ================= NO MATCHES ================= */}
      {started && !loading && matches.length === 0 && (
        <div className="text-center text-gray-400 mt-20">
          No smart matches found right now 🤷‍♂️
        </div>
      )}

      {/* ================= MATCHES GRID ================= */}
      {started && !loading && matches.length > 0 && (
        <>
          <div className="flex flex-col items-center justify-center text-center my-14">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Find Your Perfect Dev Match ✨
            </h2>

            <p className="text-gray-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Based on your skills and experience, we’ve handpicked developers
              who align closely with your tech journey. Less noise. Better
              connections.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 sm:px-8 pb-12">
            {matches.map((user) => (
              <div key={user._id} className="relative group">
                {/* ⭐ MATCH PERCENTAGE BADGE */}
                <div className="absolute top-3 z-20">
                  <span
                    className={`
                      badge px-4 py-2 text-sm font-bold
                      backdrop-blur-md
                      ${getMatchColor(user.matchScore)}
                    `}
                  >
                    {user.matchScore}% Match
                  </span>
                </div>

                {/* Card */}
                <div className="transition-transform duration-300 group-hover:-translate-y-1">
                  <UserCard user={user} onRemove={removeMatch} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SmartMatches;
