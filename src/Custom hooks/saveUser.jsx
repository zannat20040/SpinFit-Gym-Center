import axios from 'axios';
import React from 'react';
import swal from 'sweetalert';

const saveUser = (user) => {
    const userInfo = {
        email: user?.email,
        name: user?.displayName,
        role: "member",
        roleAssignmnetDate: new Date(),
      };

      axios
        .post("https://server-psi-tawny-84.vercel.app/users", userInfo)
        .then((res) => {
          if(res.data.res.insertedId){
            swal(
              "Congratulations!",
              "You have taken the first step towards an amazing journey",
              "success"
            );
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
};

export default saveUser;