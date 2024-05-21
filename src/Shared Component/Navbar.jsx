import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/spinfit-removebg-preview.png";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from "sweetalert";
import { FaBarsStaggered } from "react-icons/fa6";

const Navbar = () => {
  const { user, signOutProfile, setuser } = useContext(AuthContext);
  const HandleLogout = () => {
    signOutProfile()
      .then(() => {
        swal("Good job!", "Logged out successfully!", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const navList = (
    <>
      <NavLink
        to="/"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "active tracking-widest py-2 text-center duration-300 transition-all ease-in-out"
            : "py-2 text-center"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/gallery"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "active tracking-widest py-2 text-center duration-300 transition-all ease-in-out"
            : "py-2 text-center"
        }
      >
        Gallery
      </NavLink>
      <NavLink
        to="/trainer"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "active tracking-widest py-2 text-center duration-300 transition-all ease-in-out"
            : "py-2 text-center"
        }
      >
        Trainer
      </NavLink>
      <NavLink
        to="/classes"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "active tracking-widest py-2 text-center duration-300 transition-all ease-in-out"
            : "py-2 text-center"
        }
      >
        Classes
      </NavLink>
      <NavLink
        to="/community"
        className={({ isActive, isPending }) =>
          isPending
            ? "pending"
            : isActive
            ? "active tracking-widest py-2 text-center duration-300 transition-all ease-in-out"
            : "py-2 text-center"
        }
      >
        Forums
      </NavLink>
    </>
  );

  const [dropDownState, setDropDownState] = useState(false);
  const dropDownMenuRef = useRef();

  useEffect(() => {
    const closeDropDown = (e) => {
      if (!dropDownMenuRef?.current?.contains(e?.target)) {
        setDropDownState(false);
      }
    };

    document.addEventListener("mousedown", closeDropDown);

    return () => {
      document.removeEventListener("mousedown", closeDropDown);
    };
  }, []);

  return (
    <nav className=" bg-slate-900 sticky top-0 z-50  ">
     <div className="container mx-auto flex items-center justify-between px-4 py-2 text-white ">
     <div className="scale-100 cursor-pointer rounded-2xl px-3 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-110">
        <Link>
          <img src={logo} alt="" className="h-16" />
        </Link>
      </div>
      <ul className="hidden items-center justify-between gap-10 md:flex">
        {navList}
        <div className="dropdown dropdown-end profile ">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full border-2 ">
              {user ? (
                <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://cdn3.vectorstock.com/i/1000x1000/13/17/male-avatar-profile-picture-gold-member-silhouette-vector-5351317.jpg"
                />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3  shadow menu menu-sm dropdown-content space-y-3 p-4 w-52 bg-slate-900"
          >
            <NavLink
              to="/dashboard"
              className={({ isActive, isPending }) =>
                isPending
                  ? "pending"
                  : isActive
                  ? "active duration-300 transition-all ease-in-out"
                  : ""
              }
             
            >
              DashBoard
            </NavLink>
            {user ? (
              <NavLink
                to="/"
                onClick={HandleLogout}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "active duration-300 transition-all ease-in-out"
                    : ""
                }
              >
                Log out
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/signup"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "active duration-300 transition-all ease-in-out"
                      : ""
                  }
                >
                  Sign up
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? " duration-300 transition-all ease-in-out"
                      : ""
                  }
                >
                  Log in
                </NavLink>
              </>
            )}
          </ul>
        </div>
      </ul>

      <div
        ref={dropDownMenuRef}
        onClick={() => setDropDownState(!dropDownState)}
        className="relative flex transition-transform md:hidden"
      >
        <FaBarsStaggered className="text-white" />
        {dropDownState && (
          <ul className="p-3 z-10  gap-2  bg-slate-900  absolute right-0 top-14 flex w-[250px] flex-col     text-white ">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar mt-2 mx-auto "
            >
              <div className="w-10 rounded-full border-2 ">
                {user ? (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.photoURL}
                  />
                ) : (
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://cdn3.vectorstock.com/i/1000x1000/13/17/male-avatar-profile-picture-gold-member-silhouette-vector-5351317.jpg"
                  />
                )}
              </div>
            </label>
            {navList}

            <div className="flex flex-col justify-center items-center">
              <NavLink
                to="/dashboard"
                className={({ isActive, isPending }) =>
                  isPending
                    ? "pending"
                    : isActive
                    ? "active tracking-widest py-2 text-center"
                    : "py-2 text-center"
                }
              >
                DashBoard
              </NavLink>
              {user ? (
                <NavLink
                  to="/"
                  onClick={HandleLogout}
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? "active tracking-widest py-2 text-center"
                      : "py-2 text-center"
                  }
                >
                  Log out
                </NavLink>
              ) : (
                <>
                  <NavLink
                    to="/signup"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "active tracking-widest py-2 text-center"
                        : "py-2 text-center"
                    }
                  >
                    Sign up
                  </NavLink>
                  <NavLink
                    to="/login"
                    className={({ isActive, isPending }) =>
                      isPending
                        ? "pending"
                        : isActive
                        ? "active tracking-widest py-2 text-center"
                        : "py-2 text-center"
                    }
                  >
                    Log in
                  </NavLink>
                </>
              )}
            </div>
          </ul>
        )}
      </div>
     </div>
    </nav>

    // <div className="relative ">
    //   <div className="sticky bg-slate-900 top-0 z-50">
    //     <div className="container mx-auto">
    //       <div className="navbar text-white font-roboto ">
    //         <div className="flex-1">
    //           <Link>
    //             <img src={logo} alt="" className="h-16" />
    //           </Link>
    //         </div>
    //         <div className="flex-none gap-2">
    //           <div className="form-control">
    //             <ul className="menu menu-horizontal px-1 flex gap-4 ">
    //               {navList}
    //             </ul>
    //           </div>
    //           <div className="dropdown dropdown-end profile">
    //             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
    //               <div className="w-10 rounded-full border-2 ">
    //                 {
    //                   user ? <img
    //                   alt="Tailwind CSS Navbar component"
    //                   src={user?.photoURL}
    //                 /> : <img
    //                 alt="Tailwind CSS Navbar component"
    //                 src="https://cdn3.vectorstock.com/i/1000x1000/13/17/male-avatar-profile-picture-gold-member-silhouette-vector-5351317.jpg"
    //               />
    //                 }
    //               </div>
    //             </label>
    //             <ul
    //               tabIndex={0}
    //               className="mt-3  shadow menu menu-sm dropdown-content space-y-3 p-4 w-52 bg-slate-900"
    //             >
    //               <NavLink
    //                 to="/dashboard"
    //                 className={({ isActive, isPending }) =>
    //                   isPending ? "pending" : isActive ? "active" : ""
    //                 }
    //               >
    //                 DashBoard
    //               </NavLink>
    //               {user ? (
    //                 <NavLink
    //                   onClick={HandleLogout}
    //                   className={({ isActive, isPending }) =>
    //                     isPending ? "pending" : isActive ? "active" : ""
    //                   }
    //                 >
    //                   Log out
    //                 </NavLink>
    //               ) : (
    //                 <>
    //                   <NavLink
    //                     to="/signup"
    //                     className={({ isActive, isPending }) =>
    //                       isPending ? "pending" : isActive ? "active" : ""
    //                     }
    //                   >
    //                     Sign up
    //                   </NavLink>
    //                   <NavLink
    //                     to="/login"
    //                     className={({ isActive, isPending }) =>
    //                       isPending ? "pending" : isActive ? "active" : ""
    //                     }
    //                   >
    //                     Log in
    //                   </NavLink>
    //                 </>
    //               )}
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Navbar;
