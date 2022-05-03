import React, { useState, createContext, useEffect } from "react";
import useAuth from "../hooks/useAuth";

let idList = {};

const contextdata = {
  idList: idList,
  setIdList: () => {},
};

export const FavoriteContext = createContext(contextdata);

function FavoriteContextProvider({ children }) {
  const [idList, setIdList] = useState({});
  const isLogin = useAuth().isAuthenticated;
  const userName = useAuth().user?.username;

  useEffect(() => {
    let list = {};
    try {
      list = JSON.parse(localStorage.getItem(userName)) || {};
    } catch (error) {
      list = {};
    }
    isLogin ? setIdList(list) : setIdList({});
  }, [isLogin, userName]);

  useEffect(() => {
    localStorage.setItem(userName, JSON.stringify(idList));
  }, [idList, userName]);

  return (
    <FavoriteContext.Provider
      value={{
        idList: idList,
        setIdList: setIdList,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContextProvider;
