import {
  Alert,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import ScreenLayout from "../layout/screenlayout";
import FormField from "../components/common/formfield";
import { images } from "../constants";
import { useGlobalContext } from "../context/useGlobalContext";
import CustomButton from "../components/common/custombutton";

import { createUser } from "..//lib/appwrite";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";
import { useNavigation } from "@react-navigation/native";
import { sendPushNotification } from "../lib/notification";

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

const Register = ({ navigation }) => {
  const { setUser, setIsLoggedIn, expoPushToken, storeData, setExpoPushToken } =
    useGlobalContext();

  const [notification, setNotification] = useState(null);
  const notificationListener = useRef(null);
  const responseListener = useRef(null);

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token ?? "")
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

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
  }, []);

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { email, password, username } = form;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const submit = async () => {
    if (!email || !username || !password) {
      Alert.alert("Error", "Please fill in all required fields");

      return;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    if (username.length < 3) {
      Alert.alert("Error", "Username must be more than 2 characters");
      return;
    }
    if (username.length > 10) {
      Alert.alert("Error", "Username must be less than 10 characters");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be more than 8 characters");
      return;
    }

    setSubmitting(true);

    try {
      const result = await createUser(
        email.trim(),
        password.trim(),
        username.trim(),
        expoPushToken
      );

      setIsLoggedIn(true);
      setUser(result);

      storeData(JSON.stringify(result));

      Alert.alert("Success", "User signed in successfully");

      const message = {
        title: "Tastycrave",
        body: "Welcome to Tastycrave! Delicious food delivered to your doorstep. 🛍😊",
      };

      await sendPushNotification([expoPushToken], message);

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error trying to sign up. Please try again");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScreenLayout>
      <ScrollView>
        <View
          className="w-full flex justify-center h-full   my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logoSmall}
            resizeMode="contain"
            className="w-[45px] h-[45px]"
          />

          <Text className="text-2xl font-semibold text-black-200 mt-6 font-psemibold">
            Sign Up to Tastycrave
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-black-100 font-pregular">
              Have an account already?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text className="text-sm font-psemibold text-secondary">
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default Register;
