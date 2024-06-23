import { useGlobalContext } from "../context/useGlobalContext";
import Checkout from "../screens/checkout";
import CreateFood from "../screens/createFood";
import CreateRestaurant from "../screens/createRestaurant";
import FoodDetails from "../screens/fooddetails";
import Login from "../screens/login";
import Orders from "../screens/orders";
import Register from "../screens/register";
import RestaurantMenu from "../screens/restaurantMenu";
import Search from "../screens/search";
import Users from "../screens/users";
import TabNavigations from "./tab/tab";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { ActivityIndicator, Platform, SafeAreaView } from "react-native";
import { useEffect, useRef, useState } from "react";
import { config, getAllDocs } from "../lib/appwrite";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Restaurants from "../screens/restaurants";
import Notification from "../screens/notification";
import Contact from "../screens/contact";
import Help from "../screens/help";
import Foods from "../screens/foods";
import Onboarding from "../screens/onboarding";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;
      if (!projectId) {
        Alert.alert("Project ID not found");
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log("Expo push token:", token);
    } catch (e) {
      console.error("Error fetching push token:", e);
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}

const Stack = createNativeStackNavigator();

const Navigations = () => {
  const { user } = useGlobalContext();

  const { setExpoPushToken, setUser } = useGlobalContext();

  const [loading, setLoading] = useState(true);

  const [tokenFromAsStorage, setTokenFromAsStorage] = useState(null);

  const storeData = async (value) => {
    try {
      setExpoPushToken(value);
      await AsyncStorage.setItem("@expoID", value);
    } catch (e) {
      console.log(e);
    }
  };

  const [notification, setNotification] = useState(null);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  const [isSignedIn, setIsSignedIn] = useState(null);

  const initializeNotifications = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) {
      storeData(token);
      setExpoPushToken(token);
    } else {
      Alert.alert("Network", "Network Error, Please reload the Application");
    }

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
  };

  const getData = async () => {
    setLoading(true);
    try {
      const value = await AsyncStorage.getItem("@IsUserSignedInn");
      const token = await AsyncStorage.getItem("@expoID");

      if (token) {
        setExpoPushToken(token);
        setTokenFromAsStorage(token);
      } else {
        setTokenFromAsStorage(null);
        initializeNotifications();
      }

      if (value) {
        setIsSignedIn(true);
        setUser(JSON.parse(value));
      } else {
        setIsSignedIn(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!tokenFromAsStorage) {
      initializeNotifications();
    }

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [tokenFromAsStorage]);

  const [appStatus, setAppStatus] = useState(null);

  const getAppStatuss = async () => {
    try {
      const res = await getAllDocs(1, config.statusCollectionId);

      if (res && res.length > 0) {
        setAppStatus(res[0]?.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppStatuss();

    if (appStatus !== null) {
      getData();
    }
  }, [appStatus]);

  if (loading || !appStatus)
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-primary h-full">
        <ActivityIndicator size={"large"} color={"#FF9C01"} />
      </SafeAreaView>
    );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={"Tabs"}
    >
      {!user ? (
        <>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />

          <Stack.Screen name="Register" component={Register} />
        </>
      ) : (
        <>
          <Stack.Screen name="Tabs" component={TabNavigations} />

          <Stack.Screen name="RestaurantMenu" component={RestaurantMenu} />

          <Stack.Screen name="FoodDetails" component={FoodDetails} />

          <Stack.Screen name="Search" component={Search} />

          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Users" component={Users} />
          <Stack.Screen name="CreateRestaurant" component={CreateRestaurant} />
          <Stack.Screen name="CreateFood" component={CreateFood} />

          <Stack.Screen name="Restaurants" component={Restaurants} />
          <Stack.Screen name="Foods" component={Foods} />

          <Stack.Screen name="Notification" component={Notification} />

          <Stack.Screen name="Contact" component={Contact} />

          <Stack.Screen name="Help" component={Help} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Navigations;
