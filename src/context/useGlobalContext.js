import React, { useContext, useEffect, useState } from "react";

import useAppwrite from "../lib/useAppwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config, getAllDocs, getCurrentUser } from "../lib/appwrite";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [allexpoPushToken, setAllExpoPushToken] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [updateUser, setUpdateUser] = useState(true);

  const { data: users, loading } = useAppwrite(() =>
    getAllDocs(40, config.userCollectionId)
  );

  useEffect(() => {
    const getExpoIDs = () => {
      if (!loading) {
        const filteredExpoId = users
          .filter((user) => user.expo_Id)
          .map((user) => user.expo_Id);

        // Remove duplicates using a Set and convert back to array
        const uniqueExpoIds = Array.from(new Set(filteredExpoId));
        setAllExpoPushToken(uniqueExpoIds);
      }
    };
    getExpoIDs();
  }, [users, loading]);

  // Define the function to check the current user
  const checkCurrentUser = async () => {
    setIsLoading(true);
    try {
      const user = await getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
        storeData(JSON.stringify(user));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Call the function in useEffect
  useEffect(() => {
    checkCurrentUser();
  }, [updateUser]);

  const storeData = async (value) => {
    try {
      if (value === null) {
        await AsyncStorage.removeItem("@IsUserSignedInn");
      } else {
        await AsyncStorage.setItem("@IsUserSignedInn", value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const [cart, setCart] = useState([]);

  return (
    <AppContext.Provider
      value={{
        expoPushToken,
        setExpoPushToken,
        allexpoPushToken,
        user,
        setUpdateUser,
        setIsLoggedIn,
        isLoggedIn,
        cart,
        setCart,
        checkCurrentUser,
        setUser,
        storeData,
        isLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
