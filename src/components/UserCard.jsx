// const UserCard = ({ user }) => {
//   const { firstName, lastName, photoUrl, age, gender, about } = user;
//   return (
//     <div className="card bg-base-300 w-96 shadow-xl">
//       <figure>
//         <img src={photoUrl} alt="photo" />
//       </figure>
//       <div className="card-body">
//         <h2 className="card-title">{firstName + " " + lastName}</h2>
//         {age && gender && <p>{age + ", " + gender}</p>}
//         <p>{about}</p>
//         <div className="card-actions justify-center my-4">
//           <button className="btn btn-primary">Ignore</button>
//           <button className="btn btn-secondary">Interested</button>
//         </div>
//       </div>
//     </div>
//   );
// };

import axios from "axios";
import { removeUserFromFeed } from "../utils/slices/feedSlice";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="card relative w-full max-w-sm h-[76vh] overflow-hidden rounded-xl shadow-xl">
      <img
        src={photoUrl}
        alt={`${firstName} ${lastName}`}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 flex h-full flex-col justify-end bg-linear-to-t from-black/80 via-black/30 to-transparent p-5 text-white">
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}
        </h2>

        {age && gender && (
          <p className="text-sm opacity-90">
            {age}, {gender}
          </p>
        )}

        <p className="mt-1 text-sm line-clamp-2">{about}</p>

        <div className="mt-4 flex justify-center gap-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
