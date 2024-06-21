import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import ScreenLayout from "../layout/screenlayout";
import Header from "../components/common/navbar";
import { images } from "../constants";
import { FontAwesome5, FontAwesome6, MaterialIcons } from "@expo/vector-icons";

import Address from "../components/checkout/Address";
import Payment from "../components/checkout/Payment";
import CustomButton from "../components/common/custombutton";
import { useNavigation } from "@react-navigation/native";

const Checkout = () => {
  const navigation = useNavigation();

  const [tab, setTab] = useState("Address");

  const [address, setAddress] = useState("");
  const [saveAddress, setSaveAddress] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [addDesc, setAddDesc] = useState("");

  return (
    <ScreenLayout>
      <View>
        <Header
          title={"Checkout"}
          fn={() => navigation.goBack()}
          img={"back"}
          img2={images.logoSmall}
        />
      </View>

      <View className=" m-4  flex-row justify-between items-center">
        <TouchableOpacity className="items-center">
          <View className="rounded-full border border-secondary-100 bg-secondary-100 p-3">
            <FontAwesome6 name="cart-plus" size={17} color={"#fff"} />
          </View>

          <Text className="text-secondary-100 font-pmedium text-xs my-1">
            Cart
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View className="rounded-full border border-secondary-100 bg-secondary-100 p-3">
            <FontAwesome5 name="house-damage" size={17} color={"#fff"} />
          </View>

          <Text className="text-secondary-100 font-pmedium text-xs my-1">
            Address
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="items-center">
          <View
            className={`rounded-full border border-secondary-100 ${
              tab === "Address" ? "" : "bg-secondary-100"
            } p-3`}
          >
            <MaterialIcons
              name="payments"
              size={17}
              color={tab === "Address" ? "#FF9001" : "#fff"}
            />
          </View>

          <Text
            className={`${
              tab === "Address" ? "text-gray-400" : "text-secondary-100"
            } font-pmedium text-xs my-1`}
          >
            Payment
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="relative" showsVerticalScrollIndicator={false}>
        <View>
          {tab === "Address" ? (
            <Address
              setTab={setTab}
              setAddDesc={setAddDesc}
              addDesc={addDesc}
              setPhoneNumber={setPhoneNumber}
              phoneNumber={phoneNumber}
              setSaveAddress={setSaveAddress}
              saveAddress={saveAddress}
              setAddress={setAddress}
              address={address}
            />
          ) : tab === "Payment" ? (
            <Payment
              setTab={setTab}
              address={address}
              phoneNumber={phoneNumber}
              addDesc={addDesc}
            />
          ) : (
            <View>
              <View className="    min-h-[70vh] w-full items-center p-4 rounded-lg bg-white">
                <Image
                  source={images.success}
                  resizeMode="cover"
                  className="h-72 w-full"
                />
                <View className="my-4 ">
                  <Text className="text-3xl text-center font-pregular text-black-100 ">
                    <Text className="  text-secondary-100 ">Yay! 🙌 </Text>
                    your Order has been success
                  </Text>

                  <Text className=" mt-2 text-center text-sm font-pregular  text-gray-400 ">
                    Your order is being processed and will soon be en rotue.
                  </Text>

                  <CustomButton
                    title={`Back to Home`}
                    handlePress={() => navigation.navigate("Home")}
                    containerStyles="mt-7"
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <View></View>
    </ScreenLayout>
  );
};

export default Checkout;
