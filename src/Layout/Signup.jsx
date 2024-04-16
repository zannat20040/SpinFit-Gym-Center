import React, { useContext } from "react";
import RouteLabel from "../Shared Component/RouteLabel";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from "sweetalert";
import { updateProfile } from "firebase/auth";
import { imgUpload } from "../Utils/imageUpload";
import SignupLayout from "../Authentication/SignupLayout";
import axios from "axios";
import { Helmet } from "react-helmet-async";

const Signup = () => {
  const { createWithPass, loading, setLoading } = useContext(AuthContext);

  const HandleSignup = async (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.photo.files[0];
    const photo = await imgUpload(image);
   
    createWithPass(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userInfo = {
          email: email,
          name: name,
          role: "member",
          roleAssignmnetDate: new Date().toISOString().split('T')[0],
        };
  
        axios
          .post("https://server-psi-tawny-84.vercel.app/users", userInfo)
          .then((res) => {
              swal(
                "Congratulations!",
                "You have taken the first step towards an amazing journey",
                "success"
              );
          })
          .catch((error) => {
            console.log(error);
          });
        // navigate(location?.state?.redirectTo? location?.state?.redirectTo : '/')
        updateProfile(user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setLoading(false)
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setLoading(false)
        swal("Opps!", error.message, "error");
      });
  };


  return (
    <>
    <Helmet>
        <title>SpinFit | Signup</title>
      </Helmet>
      <RouteLabel label={"signup"}></RouteLabel>
      <SignupLayout HandleSignup={HandleSignup}></SignupLayout>
  
    </>
  );
};

export default Signup;
