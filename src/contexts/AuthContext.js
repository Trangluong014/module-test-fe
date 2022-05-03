import { createContext, useReducer, useRef } from "react";
import apiService from "../app/apiService";

const initialState = {
  isAuthenticated: false,
  user: null,
};

let addAcessToken = function (config) {
  return { ...config, headers: { ...config.headers, accesstoken: "123" } };
};
let tokenInterceptor;

const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const axios = useRef(apiService);

  const login = async (username, callback) => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: { username } },
    });
    console.log(axios);
    tokenInterceptor = axios.current.interceptors.request.use(
      addAcessToken,
      null,
      {
        synchronous: true,
      }
    );
    callback();
  };

  const logout = async (callback) => {
    dispatch({ type: LOGOUT });
    axios.current.interceptors.request.eject(tokenInterceptor);
    if (callback) {
      callback();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
