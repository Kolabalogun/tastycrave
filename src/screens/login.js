import {
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import CustomButton from "../components/common/custombutton";

import { checkIfUserIsInDB, getCurrentUser, signIn } from "..//lib/appwrite";

import ScreenLayout from "../layout/screenlayout";
import FormField from "../components/common/formfield";
import { images } from "../constants";
import { useGlobalContext } from "../context/useGlobalContext";

const Login = ({ navigation }) => {
  const { setUser, setIsLoggedIn, storeData } = useGlobalContext();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const submit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all required fields");

      return;
    }

    setSubmitting(true);

    try {
      const res = await checkIfUserIsInDB(email.trim());

      if (res.length === 0)
        return Alert.alert("Error", "Invalid Email or Password");

      await signIn(email.trim(), password.trim());

      const result = await getCurrentUser();

      setIsLoggedIn(true);
      storeData(JSON.stringify(result));

      setUser(result);

      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Invalid Credentials");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <ScreenLayout>
      <ScrollView>
        <View
          className="w-full flex justify-center h-full  my-6"
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
            Log in to Tastycrave
          </Text>

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
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-sm text-black-100 font-pregular">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text className="text-sm font-psemibold text-secondary">
                Signup
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenLayout>
  );
};

export default Login;
