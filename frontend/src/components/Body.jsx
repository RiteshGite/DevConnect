import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);

  const fetchUser = async () => {
    try {
      if(user) return;
      const res = await axios.get(`${BASE_URL} + /profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.user));
    } catch(err) {
      if(err.status === 401) {
        navigate("/login", { replace: true });
      } else {
        navigate("/Error");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Body;
