import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Menu = ({ handlePress, icon, title }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      className="justify-between py-1 border-b-black-200 border-b-[1px]  flex-row items-center"
    >
      <View>
        <Text className=" py-4 text-black flex-col  capitalize text-sm font-pmedium">
          {title}
        </Text>
      </View>

      <View>{icon}</View>
    </TouchableOpacity>
  );
};

export default Menu;
