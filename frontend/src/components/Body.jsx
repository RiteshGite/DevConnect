import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const fetchUser = async () => {
    try {
      const user = await axios.get(
        BASE_URL + "/profile/view", 
        { withCredentials: true }
      );
      dispatch(addUser(user.data.user));
      navigate("/feed");
    } catch (err) {
      if(err.status === 401){
        navigate("/login");
      } else {
        navigate("/Error");
      }
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Body;
