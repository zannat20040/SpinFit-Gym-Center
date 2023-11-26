import React, { useContext } from "react";
import { FaBars } from "react-icons/fa6";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Dashboard = () => {
    const {user} = useContext(AuthContext)
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-2  flex flex-col items-end justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="uppercase tracking-widest  btn btn-outline bg-[#dde244] rounded-none lg:hidden"
          >
            <FaBars />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-[#dde244] text-base-content">
            {/* Sidebar content here */}
            <li>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full border-2 ">
                    {
                      user ? <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    /> : <img
                    alt="Tailwind CSS Navbar component"
                    src="https://cdn3.vectorstock.com/i/1000x1000/13/17/male-avatar-profile-picture-gold-member-silhouette-vector-5351317.jpg"
                  />
                    }
                  </div>
                </label>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
