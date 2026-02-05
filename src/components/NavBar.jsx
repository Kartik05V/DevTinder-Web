import { useSelector } from "react-redux";
import { USER_ICON } from "../utils/constants";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const userLogoUrl = !user ? USER_ICON : user.data.photoUrl;

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">👩‍💻 DevTinder</a>
      </div>
      <div className="flex items-center gap-2">
        {user && (
          <span className="hidden sm:block mr-2 font-medium">
            Hi, {user.data.firstName}
          </span>
        )}

        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={userLogoUrl}
                //src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
