import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const usersData = () => {
    const {user} = useContext(AuthContext)
    // const [userInfo, setUserInfo] = useState([]);

    const {
      data: userInfo,
      refetch,
      isLoading,
    } = useQuery({
      queryKey: ["user Info"],
      queryFn: async () => {
        const response = await axios.get(
          `http://localhost:5000/users?email=${user?.email}`
        );
        return response.data;
      },
      refetchInterval: 100,
    });
    
  return  {data:userInfo, isLoading,refetch}
};

export default usersData;