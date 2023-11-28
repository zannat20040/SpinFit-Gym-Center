import React, { useContext } from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from "sweetalert";
import { updateProfile } from "firebase/auth";
import { imgUpload } from "../Utils/imageUpload";
import SignupLayout from "../Authentication/SignupLayout";

const Signup = () => {
  const { createWithPass } = useContext(AuthContext);

  const HandleSignup = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
   const image = form.photo.files[0];
    const photo = await imgUpload(image)    

    console.log(name, email, password, url);

    createWithPass(email, password)
      .then((userCredential) => {
        const user = userCredential.user
        swal("Good job!", "Signed up successfully!", "success");
        // navigate(location?.state?.redirectTo? location?.state?.redirectTo : '/')

        updateProfile(user ,{
          displayName: name,
          photoURL: photo
        })
          .then(() => {
          })
          .catch((error) => {
            console.log(error);
          });

      })
      .catch((error) => {
        swal("Opps!", error.message , "error");
      });
  };

  return (
    <>
      <RouteLabel label={"signup"}></RouteLabel>
      {/* <SignupLayout HandleSignup={HandleSignup}></SignupLayout> */}
      <div className="container max-w-lg mx-auto h-screen">
      <form className="card-body p-2" onSubmit={HandleSignup}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
              name="name"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo </span>
            </label>
            <input
              type="file"
              className="file-input file-input-bordered w-full "
              placeholder="photo url"
              required
              name="photo"
              accept="image/*"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
            name="email"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
            name="password"
          />
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-outline bg-green-900 text-white">
            Signup
          </button>
        </div>
      </form>
      </div>
    </>
  );
};

export default Signup;
