import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useGlobalContext } from "../../context/useGlobalContext";

import CustomButton from "../common/custombutton";
import { config, createDoc } from "../../lib/appwrite";
import { sendPushNotification } from "../../lib/notification";

const Payment = ({ setTab, address, phoneNumber, addDesc }) => {
  const { cart: carts, setCart, user } = useGlobalContext();

  const [loading, setLoading] = useState(false);

  const foodNames = carts
    ?.filter((food) => food?.name)
    .map((food) => food.name)
    .join(", ");

  const totalPrice = carts?.reduce(
    (sum, item) => sum + item?.price * (item?.value || 1),
    0
  );

  const handleProceed = async () => {
    setLoading(true);
    try {
      const updatedForm = {
        item: foodNames,
        price: totalPrice,
        address,
        paymentMethod: "Cash",
        users: user?.$id,
        phone: phoneNumber,
        addressDesc: addDesc,
      };
      await createDoc(updatedForm, config.ordersCollectionId);

      setCart([]);
      setTab("Success");

      const message = {
        title: "🎉 New Order Alert!",
        body: "Your order has been placed and is speeding its way to you! 🚐✨",
      };

      await sendPushNotification([user?.expo_Id], message);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Error while processing order. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="mb-10 ">
      <View className={`space-y-3 mt-2  `}>
        <Text className="text-base text-black-100 font-pmedium">
          Shipping to
        </Text>

        <TouchableOpacity
          onPress={() => setTab("Address")}
          className="flex-row items-center   bg-white w-full   p-4   rounded-xl border-[1px]  border-[#b4b4b4] focus:border-secondary-100"
        >
          <View className="mr-3">
            <FontAwesome6 name="dot-circle" size={16} color="#FF9C01" />
          </View>

          <View className="flex-1">
            <Text className="text-sm text-black-100   font-pmedium">
              Address
            </Text>

            <Text className="text-sm mt-1 text-gray-500 font-pmedium">
              {address}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className={`space-y-3 mt-6  `}>
        <Text className="text-base text-black-100 font-pmedium">
          Payment Method
        </Text>

        <TouchableOpacity className="flex-row items-center   bg-white w-full   p-4   rounded-xl border-[1px]  border-[#b4b4b4] focus:border-secondary-100">
          <View className="mr-3">
            <MaterialIcons name="payments" size={18} color="#FF9C01" />
          </View>

          <View className="flex-1">
            <Text className="text-sm text-black-100   font-pmedium">Card</Text>

            <Text className="text-xs mt-1 text-gray-500   font-pregular">
              Payment through Card is curretly not available 😔
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center   bg-white w-full   p-4   rounded-xl border-[1px]  border-[#b4b4b4] focus:border-secondary-100">
          <View className="mr-3">
            <MaterialIcons name="payments" size={18} color="#49c77f" />
          </View>

          <View className="flex-1">
            <Text className="text-sm text-black-100   font-pmedium">
              Cash on Delivery
            </Text>
          </View>
          <View className="ml-3">
            <AntDesign name="checkcircle" size={18} color="#49c77f" />
          </View>
        </TouchableOpacity>
      </View>

      <View className={`space-y-3 mt-6  `}>
        <Text className="text-base text-black-100 font-pmedium">Fee</Text>

        <View className="    bg-white w-full   p-4   rounded-xl border-[1px]  border-[#b4b4b4] focus:border-secondary-100">
          <View className="flex-row items-center     ">
            <View className="mr-3">
              <Ionicons name="fast-food" size={18} color="#FF9C01" />
            </View>

            <View className="flex-1">
              <Text className="text-sm text-black-100   font-pmedium">
                Food
              </Text>

              <Text className="text-xs mt-1 text-gray-500   font-pregular">
                {foodNames}
              </Text>
            </View>

            <View className="flex-row space-x-0.5 ml-3  items-center">
              <FontAwesome6 name="naira-sign" size={12} color="black" />
              <Text className="font-pmedium text-[14px] mt-0.5">
                {totalPrice}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center    mt-4 ">
            <View className="mr-3">
              <MaterialCommunityIcons
                name="truck-delivery"
                size={18}
                color="#49c77f"
              />
            </View>

            <View className="flex-1">
              <Text className="text-sm text-black-100   font-pmedium">
                Delivery Fee
              </Text>

              <Text className="text-xs mt-1 text-gray-500   font-pregular">
                Order will be delivered in 15 - 30 minutes
              </Text>
            </View>

            <View className="flex-row space-x-0.5 ml-3  items-center">
              <FontAwesome6 name="naira-sign" size={12} color="black" />
              <Text className="font-pmedium text-[14px] mt-0.5">{300}</Text>
            </View>
          </View>

          <View className="flex-row items-center    mt-6 ">
            <View className="mr-3">
              <MaterialCommunityIcons
                name="star-three-points"
                size={18}
                color="#49c77f"
              />
            </View>

            <View className="flex-1">
              <Text className="text-sm text-black-100   font-pmedium">
                Total
              </Text>
            </View>

            <View className="flex-row space-x-0.5 ml-3  items-center">
              <FontAwesome6 name="naira-sign" size={12} color="black" />
              <Text className="font-pmedium text-[14px] mt-0.5">
                {totalPrice + 300}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <CustomButton
        title={`Checkout`}
        handlePress={handleProceed}
        containerStyles="mt-7"
        isLoading={loading}
      />
    </View>
  );
};

export default Payment;
