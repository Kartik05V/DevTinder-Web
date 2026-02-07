import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/slices/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });

      dispatch(addRequests(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="text-center text-xl font-bold text-white mt-6 mb-6">
        {" "}
        No Requests Found
      </h1>
    );

  return (
    <div className="my-8 px-4">
      <h1 className="text-center text-3xl font-bold text-white mb-6">
        Connection Requests
      </h1>

      <div className="space-y-3">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="group flex items-center justify-between gap-4
                     bg-base-300 rounded-lg px-4 py-3
                     max-w-2xl mx-auto
                     shadow-sm
                     transition-all duration-200
                     hover:shadow-md hover:scale-[1.02]"
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-4 min-w-0">
                {/* Avatar */}
                <div className="avatar shrink-0">
                  <div className="mask mask-squircle w-16 h-16">
                    <img
                      src={
                        photoUrl ||
                        "https://img.daisyui.com/images/profile/demo/distracted1@192.webp"
                      }
                      alt="profile"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="min-w-0">
                  <h2 className="font-semibold text-base truncate">
                    {firstName} {lastName}
                  </h2>

                  {age && gender && (
                    <p className="text-xs text-gray-400">
                      {age}, {gender}
                    </p>
                  )}

                  <p
                    className="text-sm text-gray-300 truncate
                           transition-all duration-200
                           group-hover:whitespace-normal
                           group-hover:overflow-visible"
                    title={about}
                  >
                    {about || "No bio"}
                  </p>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex gap-2 shrink-0">
                <button className="btn btn-sm btn-outline btn-error">
                  Reject
                </button>
                <button className="btn btn-sm btn-primary btn-outline">
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Requests;
