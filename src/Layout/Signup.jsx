import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Shared Component/Button";
import RouteLabel from "../Shared Component/RouteLabel";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { imgUpload } from "../Shared Component/imageUpload";
import swal from "sweetalert";
import { updateProfile } from "firebase/auth";
import GoogleSignIn from "../Shared Component/GoogleSignIn";

const Signup = () => {

  const { createWithPass } = useContext(AuthContext);
  const HandleSignup = async(e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
   const image = form.photo.files[0];
    const photo = await imgUpload(image)    

   
    console.log(name, email, password, photo);

    createWithPass(email, password)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
      swal("Congratulations!", 'You have taken the first step towards an amazing journey' , "success");

      updateProfile(user ,{
        displayName: name,
        photoURL: photo
      })
        .then((res) => {
        })
        .catch((error) => {
          console.log(error);
        });

    })
    .catch((error) => {
      swal("Sorry!", error.message , "error");
    });

  };

  return (
    <>
      <RouteLabel label={'signup'}></RouteLabel>
      <div className="container max-w-lg mx-auto h-screen ">
        <form className="card-body p-2 " onSubmit={HandleSignup}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-400 font-roboto ">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-white tracking-wider">
                  Full name
                </span>
              </label>
              <input
                type="text"
                placeholder="name"
                className="input input-bordered rounded-none"
                required
                name="name"
              />
            </div>
            <div className="form-control">
              <label className="label ">
                <span className="label-text rounded-none text-white tracking-wider">
                  Profile Image{" "}
                </span>
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full rounded-none "
                placeholder="photo url"
                required
                name="photo"
                accept="image/*"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white tracking-wider">
                Email
              </span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered rounded-none"
              required
              name="email"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white tracking-wider">
                Password
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
          <div className="form-control mt-6 text-center">
            <Button label={"Register now"}></Button>
          </div>
        </form>
        <div className="flex gap-4 justify-center px-2 mt-4 text-white font-roboto">
          <p>Already have and account? </p>
          <Link to="/login" className="text-[#dde244] font-medium  ">
            Login
          </Link>
        </div>

        <div className="divider text-white">OR</div>

        <div className="flex gap-4 justify-center items-center px-2 mt-4 ">
          <GoogleSignIn label={"Continue with Google"}></GoogleSignIn>
        </div>
      </div>
    </>
  );
};

export default Signup;
