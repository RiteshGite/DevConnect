import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeFromRequests } from "../utils/requests";
import { BASE_URL } from "../utils/constants";
import toast from "react-hot-toast";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);

  const [loading, setLoading] = useState(true);

  const handleButtonClick = async (status, id) => {
    try {
      await axios.post(
        `${BASE_URL}/request/review/${status}/${id}`,
        {},
        { withCredentials: true },
      );
      dispatch(removeFromRequests(id));
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data?.requests || null));
      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests && loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!requests || !requests.length)
    return (
      <div className="flex justify-center items-center font-bold p-24 text-center min-h-screen">
        <h4>No Pending Requests</h4>
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto p-4 min-h-screen mb-32">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Requests
      </h2>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.fromUserId._id}
            className="card bg-base-200 shadow-md flex flex-col sm:flex-row"
          >
            {/* Avatar */}
            <figure className="p-4 flex justify-center sm:justify-start">
              <img
                src={request.fromUserId.photoUrl}
                alt="profile"
                className="w-16 h-16 rounded-full"
              />
            </figure>

            {/* Info */}
            <div className="card-body p-4 text-center sm:text-left">
              <h3 className="font-semibold text-lg">
                {request.fromUserId.firstName} {request.fromUserId.lastName}
              </h3>

              <p className="text-sm opacity-70">{request.fromUserId.about}</p>

              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                {request.fromUserId.skills.map((skill, index) => (
                  <span key={index} className="badge badge-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 p-4 sm:items-center sm:mr-6">
              <button
                className="btn btn-error w-full sm:w-auto"
                onClick={() => handleButtonClick("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-primary w-full sm:w-auto"
                onClick={() => handleButtonClick("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
