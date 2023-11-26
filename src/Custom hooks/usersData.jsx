import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import axios from 'axios';

const usersData = () => {
    const {user} = useContext(AuthContext)
    const [userInfo, setUserInfo] = useState([]);

    useEffect(() => {
       axios
          .get(`http://localhost:5000/users?email=${user?.email}`)
          .then((res) => {
            setUserInfo(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
    },[]);
    
  return  userInfo
};

export default usersData;