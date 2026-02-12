import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connections";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const connections = useSelector((store) => store.connections);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.connections || null));
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
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!connections)
    return (
      <div className="flex justify-center items-center font-bold p-24 text-center min-h-screen">
        <h4>No Connections</h4>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 min-h-screen mb-32 mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Connections</h2>

      {loading && !connections && (
        <div className="flex justify-center mt-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {!loading && !connections && (
        <div className="flex justify-center items-center font-bold flex-1 text-center mt-32">
          <h4>No Connections</h4>
        </div>
      )}

      {connections && (
        <div className="space-y-4">
          {connections.map((connection) => (
            <div
              key={connection._id}
              className="card bg-base-200 shadow-md flex flex-col sm:flex-row"
            >
              <figure className="p-4 flex justify-center sm:justify-start flex-shrink-0">
                <img
                  src={connection.photoUrl}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
              </figure>

              <div className="card-body p-4 text-center sm:text-left">
                <h3 className="font-semibold text-lg">
                  {connection.firstName} {connection.lastName}
                </h3>

                <p className="text-sm opacity-70">{connection.about}</p>

                <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                  {connection.skills.map((skill, index) => (
                    <span key={index} className="badge badge-outline">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="card-actions p-4 justify-center sm:justify-end flex items-center">
                <Link
                  to={`/chat/${connection._id}`}
                  className="btn btn-primary"
                >
                  Chat
                </Link>
              </div>
              
            </div>
          ))}
        </div>
      )}
    </div>
  );

};

export default Connections;
