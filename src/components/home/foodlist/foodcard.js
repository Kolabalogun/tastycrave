import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import { useGlobalContext } from "../../../context/useGlobalContext";
import { initialCurrentLocation } from "../../../utils/dataarray";

const FoodCard = ({ food }) => {
  const { navigation } = useGlobalContext();

  const currentLocation = initialCurrentLocation;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          food,
          currentLocation,
        });
      }}
      className="rounded-xl my-2 "
    >
      <View className="relative">
        <Image
          source={{
            uri: food.photo,
          }}
          style={{ height: 200, borderRadius: 10 }}
          resizeMode="contain"
        />

        <View className="bg-[#edfdff] opacity-60 absolute bottom-0 left-[-2] w-[100px] rounded-tr-xl rounded-bl-xl py-2">
          <Text className="text-center font-medium text-[17px]">
            {food.status}
          </Text>
        </View>
      </View>

      <Text className="text-xl pt-1.5 font-medium">{food.name}</Text>

      <View className="flex-row justify-between w-[140px]">
        <Text className="text-[17px] ">4.8</Text>
        <Text className="text-[17px] ">Snacks</Text>
        <Text className="text-[17px] ">${food.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;
