import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionsSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    if (connections) return;
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      console.log(res.data.connections);
      dispatch(addConnections(res?.data?.connections || []));
      setLoading(false);
    } catch (err) {
      navigate("/error");
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (loading && !connections)
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 md: min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Connections</h2>

      <div className="space-y-4">
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="card card-side bg-base-200 shadow-md"
          >
            <figure className="p-4">
              <img
                src={connection.photoUrl}
                alt="profile"
                className="w-14 h-14 rounded-full"
              />
            </figure>

            <div className="card-body p-4">
              <h3 className="font-semibold text-lg">
                {connection.firstName} {connection.lastName}
              </h3>

              <p className="text-sm opacity-70">{connection.about}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                {connection.skills.map((skill, index) => (
                  <span key={index} className="badge badge-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
