import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useReducer, useState } from "react";

import {
  categoryData,
  FoodMenu,
  initialCurrentLocation,
} from "../utils/dataarray";
import { Reducers } from "./Reducers";
import useAppwrite from "../lib/useAppwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getAllUsers, getCurrentUser } from "../lib/appwrite";

const AppContext = React.createContext();

const initialState = {
  FoodArray: FoodMenu,
  foodList: FoodMenu,
  categories: categoryData,
  currentLocation: initialCurrentLocation,
  selectedCategory: null,
  dummycategory: FoodMenu,
  total: 0,
  navAmount: 0,
  currentFood: 0,
};

const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [allexpoPushToken, setAllExpoPushToken] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [updateUser, setUpdateUser] = useState(true);

  const { data: users, loading } = useAppwrite(getAllUsers);

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

  const [state, dispatch] = useReducer(Reducers, initialState);

  const [showCart, showCartF] = useState(false);

  function toggleCart(params) {
    showCartF(!showCart);
  }

  const handleSelectedCategory = (item) => {
    dispatch({ type: "SELECTEDCATEGORY", payload: item });
  };

  const increment = (id) => {
    dispatch({ type: "INCREASE", payload: id });
  };
  const decrement = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  };
  const handleCheckOut = () => {
    dispatch({ type: "CHECKOUT" });
  };

  useEffect(() => {
    dispatch({ type: "GETTOTAL" });
  }, [state.foodList]);

  const navigation = useNavigation();
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

        ...state,
        handleSelectedCategory,
        increment,
        toggleCart,
        showCart,
        decrement,
        navigation,
        handleCheckOut,
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
