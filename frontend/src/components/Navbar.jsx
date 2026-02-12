import { User, Users, Inbox, LogOut, Home, ChessQueen, Brain, Search} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";
import axios from "axios";
import { removeFeed } from "../utils/feedSlice";
import { removeConnections } from "../utils/connections";
import { removeRequests } from "../utils/requests";
import { Crown, Sparkles} from "lucide-react";
import { useState } from "react";


const Navbar = () => {
  const [searchText, setSearchText] = useState("");
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ================= MEMBERSHIP LOGIC =================
  const silverActive = user?.memberships?.Silver?.active;
  const goldActive = user?.memberships?.Gold?.active;

  // Gold > Silver priority
  const membershipBadge = goldActive ? "Gold" : silverActive ? "Silver" : null;

  // ================= LOGOUT =================
  const handleLogOut = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeFeed());
      dispatch(removeConnections());
      dispatch(removeRequests());
      toast.success("Logged out successfully");
      navigate("/login", { replace: true });
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

    const handleSearch = (e) => {
      e.preventDefault();
      if (!searchText.trim()) return;
      navigate(`/search?query=${searchText}`);
      setSearchText("");
    };

  return (
    <div className="navbar bg-base-200 border-b border-base-300 px-3 sm:px-6 fixed z-50">
      {/* ================= LEFT ================= */}
      <div className="flex-1">
        <Link
          to={user ? "/feed" : "/login"}
          className="flex items-center gap-3 sm:gap-4 cursor-pointer w-fit"
        >
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-6 sm:w-7 rounded-full ring-2 ring-offset-2">
              <img src="/DevLogo.png" alt="DevConnect Logo" />
            </div>
          </div>

          {/* Brand + Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight">
              Dev<span className="text-primary">Connect</span>
            </h2>
          </div>
        </Link>
      </div>

      {/* ================= RIGHT ================= */}
      {user && (
        <>
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center bg-slate-900 border border-slate-700 rounded-lg px-3 py-1"
          >
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="bg-transparent outline-none text-sm text-white placeholder-gray-500 w-40"
            />
          </form>
          <div className="mx-7">
            {membershipBadge === "Gold" && (
              <Crown className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]" />
            )}

            {membershipBadge === "Silver" && (
              <Crown className="w-6 h-6 text-gray-300 drop-shadow-[0_0_6px_rgba(209,213,219,0.9)]" />
            )}
          </div>
          <div className="text-gray-200 text-sm sm:text-lg mr-3 sm:mr-10 hidden md:block">
            Welcome,{" "}
            <span className="text-gray-50 font-semibold">{user.firstName}</span>
          </div>

          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost avatar p-0">
              <div className="ring-primary ring-offset-base-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full ring-2 ring-offset-2">
                <img
                  src={
                    user.photoUrl ||
                    "https://imgs.search.brave.com/PixY8_zgl8cU1m2y47bf0V-2jOluOmEHOR4564ScsUA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzY0LzY3LzI3/LzM2MF9GXzY0Njcy/NzM2X1U1a3BkR3M5/a2VVbGw4Q1JRM3Az/WWFFdjJNNnFrVlk1/LmpwZw"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 w-44 sm:w-52 rounded-box bg-base-100 shadow"
            >
              {/* Membership label */}
              {membershipBadge === "Gold" && (
                <div className="flex justify-start mb-2">
                  <Crown className="w-6 h-6 text-yellow-400 drop-shadow-[0_0_6px_rgba(250,204,21,0.9)]" />
                  <span className="ml-2 font-bold">Gold Member</span>
                </div>
              )}

              {membershipBadge === "Silver" && (
                <div className="flex justify-start mb-2">
                  <Crown className="w-6 h-6 text-gray-300 drop-shadow-[0_0_6px_rgba(209,213,219,0.9)]" />
                  <span className="ml-2 font-bold">Silver Member</span>
                </div>
              )}

              <li>
                <Link
                  to="/feed"
                  className="hover:scale-105 hover:bg-primary hover:text-white transition-transform duration-200"
                >
                  <Home className="w-4 h-4 sm:w-5 sm:h-5" />
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="hover:scale-105 hover:bg-primary hover:text-white transition-transform duration-200"
                >
                  <User className="w-4 h-4 sm:w-5 sm:h-5" />
                  Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/smart-matches"
                  className="hover:scale-105 hover:bg-primary hover:text-white transition-transform duration-200"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                  Smart Matches
                </Link>
              </li>

              <li>
                <Link
                  to="/connections"
                  className="hover:scale-105 hover:bg-primary hover:text-white transition-transform duration-200"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                  Connections
                </Link>
              </li>

              <li>
                <Link
                  to="/requests"
                  className="hover:scale-105 hover:bg-primary hover:text-white transition-transform duration-200"
                >
                  <Inbox className="w-4 h-4 sm:w-5 sm:h-5" />
                  Requests
                </Link>
              </li>

              <li>
                <Link
                  to="/membership"
                  className="hover:scale-105 hover:bg-primary hover:text-white transition-transform duration-200"
                >
                  <ChessQueen className="w-4 h-4 sm:w-5 sm:h-5" />
                  Membership
                </Link>
              </li>

              <li onClick={handleLogOut}>
                <div className="text-error hover:bg-gray-700 hover:scale-105 hover:font-bold transition-transform duration-200">
                  <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                  Logout
                </div>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
