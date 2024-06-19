import { View, Text, Image } from "react-native";
import React from "react";
import getTimeOfDay from "../../../utils/timeOfTheDay";
import { useGlobalContext } from "../../../context/useGlobalContext";

const Header = () => {
  const { user } = useGlobalContext();
  return (
    <View className="flex justify-between items-start flex-row mb-5">
      <View>
        <Text className="font-pmedium text-sm text-black-100">
          {getTimeOfDay()},
        </Text>
        <Text className="text-2xl font-psemibold text-black-200 capitalize">
          {user?.username}
        </Text>
      </View>

      <View className="w-10 h-10 border border-secondary-200 rounded-lg flex justify-center items-center">
        <Image
          source={{ uri: user?.avatar }}
          className="w-[85%] h-[85%] rounded-lg"
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

export default Header;
