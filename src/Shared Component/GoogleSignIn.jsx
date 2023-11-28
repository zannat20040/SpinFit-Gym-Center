import React, { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import swal from "sweetalert";
import Button from "./Button";
import axios from "axios";

const GoogleSignIn = () => {
  const { loading, setLoading, user } = useContext(AuthContext);
  const { googleSignIn } = useContext(AuthContext);
  const HandleGoogleSignin = () => {
    googleSignIn()
      .then((result) => {
        console.log(result);
        swal(
          "Congratulations!",
          "You have taken the first step towards an amazing journey",
          "success"
        );

        const userInfo = {
          email: result?.user?.email,
          name: result?.user?.displayName,
          role: "member",
          roleAssignmnetDate: new Date().toISOString().split("T")[0],
        };

        axios
          .post("http://localhost:5000/users", userInfo)
          .then((res) => {
            console.log(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        swal("Sorry!", error.message, "error");
      });
  };

  return (
    <div
      className="flex gap-4 justify-center items-center px-2 mt-6 w-full "
      onClick={HandleGoogleSignin}
    >
      <Button label={"continue with google"}></Button>
    </div>
  );
};

export default GoogleSignIn;
