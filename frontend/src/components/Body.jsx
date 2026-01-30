import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      if (user) return;
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.status === 401) {
        navigate("/", { replace: true });
      } else {
        navigate("/Error");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);


  if(loading && !user) return (
    <div className="w-full h-screen flex justify-center items-center">
      <span className="loading loading-bars loading-xl"></span>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-14">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
