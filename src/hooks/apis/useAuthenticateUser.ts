import { useState } from "react";
import { useAppDispatch } from "../useReduxHooks";
import { populateUserData } from "src/services/redux/slices/auth";


const DUMMY_USERS = [{
  username: `test1@skool.com`,
  password: `password`,
  profile: {
    id: 1,
    firstname: `Test`,
    lastname: `Skool`,
    avatar: require("src/assets/images/avatars/user-female.png")
  }
}, {
  username: `test2@skool.com`,
  password: `password2`,
  profile: {
    id: 2,
    firstname: `User`,
    lastname: `Skool`,
    avatar: require("src/assets/images/avatars/user-male.png")
  }
}]

const useAuthenticateUser = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch()
  const useLogin = async (data: {username: string, password: string}) => {
    try {
      for (const user of DUMMY_USERS) {
        if (user.username === data.username && user.password === data.password) {
          dispatch(populateUserData(user.profile))
          return {
            status: 200,
            statusText: `success`,
            message: `Login successful`,
            user: user.profile
          }
        }
      }
      return {
        status: 404,
        statusText: `error`,
        message: `Invalid username or password`,
        user: null
      }
    } catch (error) {
      return {
        status: 500,
        statusText: `error`,
        message: `Login failed`,
        user: null
      }
    } 
  };

  return { 
    useLogin, 
    loading
  };
};

export default useAuthenticateUser;

