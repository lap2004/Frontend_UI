import { Protected, userLogin, userMe, userSignup } from "../apis/auth";
import { useGetAPI, usePostAPI, usePutAPI } from "./hookApi";

const useUserLogin = () => {
  const {
    loading,
    post: postUserLogin,
    error,
    setError,
  } = usePostAPI(userLogin);
  return {
    loading,
    postUserLogin,
    error,
    setError,
  };
};

const useUserSignup = () => {
  const {
    loading,
    post: postUserSignup,
    error,
    setError,
  } = usePostAPI(userSignup);
  return {
    loading,
    postUserSignup,
    error,
    setError,
  };
};

const useUserMe = () => {
  const { loading, get: getuserMe, error, setError } = useGetAPI(userMe);
  return {
    loading,
    getuserMe,
    error,
    setError,
  };
};

const useProtectedProtected = () => {
  const {
    loading,
    get: postProtectedProtected,
    error,
    setError,
  } = useGetAPI(Protected);
  return {
    loading,
    postProtectedProtected,
    error,
    setError,
  };
};
export { useProtectedProtected, useUserLogin, useUserMe,useUserSignup };
