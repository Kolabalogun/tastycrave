import { Text, TouchableOpacity } from "react-native";
import React from "react";

const Tab = ({ setSelectedCategory, selectedCategory, category }) => {
  return (
    <TouchableOpacity
      onPress={() => setSelectedCategory(category)}
      className={`mb-4 mr-4 border-[2px] border-secondary-200  categorys-center rounded-full
 ${selectedCategory === category ? "bg-secondary-200 " : "bg-white"}`}
    >
      <Text
        className={`py-1 px-4 font-pmedium  mt-1
   ${selectedCategory === category ? "text-white " : " text-secondary-200 "}`}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );
};

export default Tab;
