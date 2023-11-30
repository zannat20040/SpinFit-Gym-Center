import React, { useContext } from "react";
import Button from "../Shared Component/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RouteLabel from "../Shared Component/RouteLabel";
import { AuthContext } from "../AuthProvider/AuthProvider";
import GoogleSignIn from "../Shared Component/GoogleSignIn";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithPass, googleSignIn } = useContext(AuthContext);
  const HandleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    loginWithPass(email, password)
      .then((userCredential) => {
        swal("Good job!", "Logged in successfully!", "success");
        navigate(
          location?.state?.redirectTo ? location?.state?.redirectTo : "/"
        );
      })
      .catch((error) => {
        swal("Opps!", error.message, "error");
      });
  };

  return (
    <>
      <RouteLabel label={"login"}></RouteLabel>
      <Helmet>
        <title>SpinFit | Login</title>
      </Helmet>
      <div className="container max-w-lg mx-auto h-screen ">
        <form onSubmit={HandleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white tracking-wider">
                Your Email
              </span>
            </label>
            <input
              type="email"
              placeholder="username@site.com"
              className="input input-bordered rounded-none"
              required
              name="email"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text text-white tracking-wider">
                Your Password
              </span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered rounded-none"
              required
              name="password"
            />
          </div>
          <div className="form-control mt-6">
            <Button label={"Continue"}></Button>
          </div>
        </form>
        <div className="flex gap-4 justify-center px-2 mt-4 text-white font-roboto">
          <p>Don't you have any account? </p>
          <Link to="/signup" className="text-[#dde244]  font-medium  ">
            Signup
          </Link>
        </div>
        <div className="divider text-white">OR</div>

        <GoogleSignIn label={"Continue with Google"}></GoogleSignIn>
      </div>
    </>
  );
};

export default Login;
