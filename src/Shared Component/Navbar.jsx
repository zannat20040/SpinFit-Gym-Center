import React, { useContext, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../assets/images/spinfit-removebg-preview.png";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from "sweetalert";

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
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/gallery "
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Gallery
      </NavLink>
      <NavLink
        to="/trainer "
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Trainer
      </NavLink>
      <NavLink
        to="/classes"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Classes
      </NavLink>
      <NavLink
        to="/community"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }
      >
        Forums
      </NavLink>
    </>
  );

  return (
    <div className="relative ">
      <div className="sticky bg-slate-900 top-0 z-50">
        <div className="container mx-auto">
          <div className="navbar text-white font-roboto ">
            <div className="flex-1">
              <Link>
                <img src={logo} alt="" className="h-16" />
              </Link>
            </div>
            <div className="flex-none gap-2">
              <div className="form-control">
                <ul className="menu menu-horizontal px-1 flex gap-4 ">
                  {navList}
                </ul>
              </div>
              <div className="dropdown dropdown-end profile">
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
                <ul
                  tabIndex={0}
                  className="mt-3  shadow menu menu-sm dropdown-content space-y-3 p-4 w-52 bg-slate-900"
                >
                  <NavLink
                    to="/dashboard"
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                  >
                    DashBoard
                  </NavLink>
                  {user ? (
                    <NavLink
                      onClick={HandleLogout}
                      className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                      }
                    >
                      Log out
                    </NavLink>
                  ) : (
                    <>
                      <NavLink
                        to="/signup"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                      >
                        Sign up
                      </NavLink>
                      <NavLink
                        to="/login"
                        className={({ isActive, isPending }) =>
                          isPending ? "pending" : isActive ? "active" : ""
                        }
                      >
                        Log in
                      </NavLink>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
