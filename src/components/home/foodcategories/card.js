import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const Card = ({ category }) => {
  return (
    <TouchableOpacity className="items-center space-y-2 mr-3">
      <View
        className={`p-4 rounded-xl items-center justify-center ${
          category?.name === "Fruits"
            ? "bg-[#e3f8d7]"
            : category?.name === "Meal"
            ? "bg-[#ffebe6]"
            : category?.name === "Vegetables"
            ? "bg-[#ebf9ff]"
            : category?.name === "Drinks"
            ? "bg-[#d2e4ee]"
            : "bg-[#fde9dc]"
        } `}
      >
        <Image
          source={{ uri: category?.image }}
          className="w-16 h-16  "
          resizeMode={category?.name === "Noodles" ? "contain" : "cover"}
        />
      </View>
      <Text className="font-pmedium">{category?.name}</Text>
    </TouchableOpacity>
  );
};

export default Card;
