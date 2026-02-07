import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/slices/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      // Handle Error Case
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1> No Connections Found</h1>;

  return (
    <div className="my-8 px-4">
      <h1 className="text-center text-3xl font-bold text-white mb-6">
        Connections
      </h1>

      <div className="space-y-3">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <div
              key={firstName + lastName}
              className="group flex items-center gap-4
                     bg-base-300 rounded-lg px-4 py-3
                     max-w-xl mx-auto
                     shadow-sm
                     transition-all duration-200
                     hover:shadow-md hover:scale-[1.02]"
            >
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

              <div className="flex-1 min-w-0">
                <h2 className="font-semibold text-base truncate">
                  {firstName} {lastName}
                </h2>

                {age && gender && (
                  <p className="text-xs text-gray-400">
                    {age}, {gender}
                  </p>
                )}

                <p
                  className="text-sm text-gray-300
                         truncate
                         transition-all duration-200
                         group-hover:whitespace-normal
                         group-hover:overflow-visible"
                  title={about}
                ></p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Connections;
