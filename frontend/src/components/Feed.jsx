import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Shimmer from "./Simmer";
import UserCard from "./UserCard"

const Feed = () => {

  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const getFeed = async () => {
    try {
      if(feed) return;
      const res = await axios.get(`${BASE_URL}/feed`, { withCredentials: true });
      if (res.data.message === "No Users Found") {
        setError("You have seen all the Developers")
      } else {
        dispatch(addFeed(res.data?.feed)); 
      }
      setLoading(false);
    } catch (err) {
      if(err) {
        return <Navigate to="/error" />;
      }
    }
  }
  useEffect(() => {
    getFeed();
  }, []);

  if(loading && !feed) return (
    <div className="p-16 flex justify-center items-center">
      <Shimmer count={1}/>
    </div>
  );

  return error ? (
    <div className="">{error}</div>
  ) : (
    <div className="flex justify-center md: py-24">
      <UserCard user={feed[0]} />
    </div>
  );

}

export default Feed;