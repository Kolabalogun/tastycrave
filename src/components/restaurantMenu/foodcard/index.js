import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

const Card = ({ food }) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FoodDetails", {
            food,
          });
        }}
        className="flex flex-row   justify-between   mt-3  "
      >
        <View>
          <Image
            source={{ uri: food?.image }}
            className=" w-24 h-20 rounded-md mb-5 overflow-hidden shadow-lg shadow-black/40 mr-4"
            resizeMode="cover"
          />
        </View>

        <View className="flex-1    ">
          <View className="justify-between  ">
            <View>
              <Text
                className="text-black-200 font-pmedium text-base
        "
              >
                {food?.name}
              </Text>

              <Text
                className="text-gray-400 font-pregular text-xs
        "
              >
                {food?.desc?.substring(0, 70)}...
              </Text>
            </View>

            <View className="flex-row space-x-1 mt-3  items-center">
              <FontAwesome6 name="naira-sign" size={13} color="black" />
              <Text className="font-pmedium text-[15px] mt-0.5">
                {food?.price}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View className="h-[0.5px]   bg-gray-500 mx-3 my-2 "></View>
    </View>
  );
};

export default Card;
